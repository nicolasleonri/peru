#!/usr/bin/env python3
"""
Promote QA translations to production.

Merges es-qa.json keys into es.json and copies data.version.qa to data.version.production.
Also detects manual edits in qu-qa and ay-qa by comparing with qu and ay.
"""

import json
import os
import sys


def deep_merge(base, updates):
    """
    Deep merge updates into base dict.
    Updates overwrite base values at leaf level.
    """
    result = base.copy()
    for key, value in updates.items():
        if key in result and isinstance(result[key], dict) and isinstance(value, dict):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    return result


def sort_nested_dict(d):
    """Recursively sort a nested dictionary by keys."""
    if isinstance(d, dict):
        return {k: sort_nested_dict(v) for k, v in sorted(d.items())}
    return d


def count_keys(d, count=0):
    """Count total leaf keys in nested dict."""
    for v in d.values():
        if isinstance(v, dict):
            count = count_keys(v, count)
        else:
            count += 1
    return count


def flatten_dict(d, parent_key='', sep='.'):
    """Flatten a nested dict into dot-separated keys."""
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep).items())
        else:
            items.append((new_key, v))
    return dict(items)


def find_differing_keys(qa_data, prod_data, key_prefixes):
    """
    Find keys that exist in both QA and prod but have different values.
    Only checks keys matching the given prefixes.
    """
    qa_flat = flatten_dict(qa_data)
    prod_flat = flatten_dict(prod_data)

    differing = []
    for key, qa_value in qa_flat.items():
        # Only check keys matching our target prefixes
        if not any(key.startswith(prefix) for prefix in key_prefixes):
            continue

        # Key exists in both and values differ
        if key in prod_flat and prod_flat[key] != qa_value:
            differing.append(key)

    return differing


def main():
    # Script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # i18n folder is at ../i18n (sibling to scripts/)
    i18n_dir = os.path.join(script_dir, "..", "i18n")

    es_qa_file = os.path.join(i18n_dir, "es-qa.json")
    es_file = os.path.join(i18n_dir, "es.json")
    qu_qa_file = os.path.join(i18n_dir, "qu-qa.json")
    qu_file = os.path.join(i18n_dir, "qu.json")
    ay_qa_file = os.path.join(i18n_dir, "ay-qa.json")
    ay_file = os.path.join(i18n_dir, "ay.json")
    manual_edits_file = os.path.join(i18n_dir, "manual_edits.json")

    # Key prefixes we care about for manual edit detection
    key_prefixes = ["quiz.questions.", "quiz.topics.", "explanations.parties.", "explanations.candidates."]

    qa_files = [f for f in os.listdir(i18n_dir) if f.endswith("-qa.json")]
    if not qa_files:
        print("Error: No *-qa.json files found")
        sys.exit(1)

    # Detect manual edits in qu and ay (before overwriting production files)
    manual_edits = {"qu": [], "ay": []}

    # Compare qu-qa with qu
    if os.path.exists(qu_qa_file) and os.path.exists(qu_file):
        print(f"\nComparing {qu_qa_file} with {qu_file}...")
        with open(qu_qa_file, "r", encoding="utf-8") as f:
            qu_qa = json.load(f)
        with open(qu_file, "r", encoding="utf-8") as f:
            qu_prod = json.load(f)

        qu_diffs = find_differing_keys(qu_qa, qu_prod, key_prefixes)
        manual_edits["qu"] = qu_diffs
        print(f"  -> Found {len(qu_diffs)} differing keys in Quechua")
    else:
        print(f"\nSkipping Quechua comparison (files not found)")

    # Compare ay-qa with ay
    if os.path.exists(ay_qa_file) and os.path.exists(ay_file):
        print(f"Comparing {ay_qa_file} with {ay_file}...")
        with open(ay_qa_file, "r", encoding="utf-8") as f:
            ay_qa = json.load(f)
        with open(ay_file, "r", encoding="utf-8") as f:
            ay_prod = json.load(f)

        ay_diffs = find_differing_keys(ay_qa, ay_prod, key_prefixes)
        manual_edits["ay"] = ay_diffs
        print(f"  -> Found {len(ay_diffs)} differing keys in Aymara")
    else:
        print(f"Skipping Aymara comparison (files not found)")

    # Write manual edits file
    total_edits = len(manual_edits["qu"]) + len(manual_edits["ay"])
    if total_edits > 0:
        with open(manual_edits_file, "w", encoding="utf-8") as f:
            json.dump(manual_edits, f, ensure_ascii=False, indent=2)
        print(f"\nWrote {manual_edits_file}")
        print(f"  -> Total manual edits detected: {total_edits}")
    else:
        # Write empty file to signal no edits
        with open(manual_edits_file, "w", encoding="utf-8") as f:
            json.dump({"qu": [], "ay": []}, f)
        print(f"\nNo manual edits detected")

    # Merge all QA files into production counterparts
    for qa_filename in sorted(qa_files):
        qa_path = os.path.join(i18n_dir, qa_filename)
        lang = qa_filename.replace("-qa.json", "")
        prod_filename = f"{lang}.json"
        prod_path = os.path.join(i18n_dir, prod_filename)

        print(f"\nLoading {qa_path}...")
        with open(qa_path, "r", encoding="utf-8") as f:
            qa_data = json.load(f)
        print(f"  -> Loaded {count_keys(qa_data)} QA keys")

        if os.path.exists(prod_path):
            print(f"Loading {prod_path}...")
            with open(prod_path, "r", encoding="utf-8") as f:
                prod_data = json.load(f)
            print(f"  -> Loaded {count_keys(prod_data)} existing production keys")
        else:
            print(f"{prod_path} not found, creating new file")
            prod_data = {}

        qa_version = qa_data.get("data", {}).get("version", {}).get("qa", "")
        if not qa_version:
            print(f"Warning: No data.version.qa found in {qa_filename}")

        merged = deep_merge(prod_data, qa_data)

        if "data" not in merged:
            merged["data"] = {}
        if "version" not in merged["data"]:
            merged["data"]["version"] = {}
        if qa_version:
            merged["data"]["version"]["production"] = qa_version

        sorted_merged = sort_nested_dict(merged)

        with open(prod_path, "w", encoding="utf-8") as f:
            json.dump(sorted_merged, f, ensure_ascii=False, indent=2)

        print(f"Wrote {prod_path}")
        print(f"  -> Total keys: {count_keys(sorted_merged)}")
        if qa_version:
            print(f"  -> Production version set to: {qa_version}")

    # Output for GitHub Actions
    print(f"\n::set-output name=manual_edits_count::{total_edits}")


if __name__ == "__main__":
    main()
