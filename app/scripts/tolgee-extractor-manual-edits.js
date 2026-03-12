/**
 * Custom Tolgee extractor for manual edits detection.
 * Extracts keys from manual_edits.json that were manually edited in qu-qa or ay-qa.
 */

export default function extractor(code, fileName) {
  const keys = [];
  const warnings = [];

  // Only process manual_edits.json
  if (!fileName.endsWith('manual_edits.json')) {
    return { keys, warnings };
  }

  // Skip if content doesn't look like JSON
  const trimmed = code.trim();
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
    return { keys, warnings };
  }

  let data;
  try {
    data = JSON.parse(code);
  } catch (e) {
    // Silently skip invalid JSON
    return { keys, warnings };
  }

  // Extract keys from qu and ay arrays
  const allKeys = new Set();

  if (Array.isArray(data.qu)) {
    data.qu.forEach(key => allKeys.add(key));
  }

  if (Array.isArray(data.ay)) {
    data.ay.forEach(key => allKeys.add(key));
  }

  // Convert to Tolgee key format
  for (const keyName of allKeys) {
    keys.push({
      keyName,
      line: 1,
    });
  }

  return { keys, warnings };
}