/**
 * Custom Tolgee extractor for quiz and explanations keys.
 * Extracts keys from:
 * - quiz.questions.*
 * - quiz.topics.*
 * - explanations.parties.*.*
 * - explanations.candidates.*.*
 */

export default function extractor(code, fileName) {
  const keys = [];
  const warnings = [];

  // Only process es-qa.json or es.json
  if (!fileName.endsWith('es-qa.json') && !fileName.endsWith('es.json')) {
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
    // Silently skip files that aren't valid JSON
    return { keys, warnings };
  }

  // Extract quiz.questions.* keys
  if (data.quiz?.questions) {
    for (const [id, value] of Object.entries(data.quiz.questions)) {
      keys.push({
        keyName: `quiz.questions.${id}`,
        defaultValue: typeof value === 'string' ? value : undefined,
        line: 1,
      });
    }
  }

  // Extract quiz.topics.* keys
  if (data.quiz?.topics) {
    for (const [id, value] of Object.entries(data.quiz.topics)) {
      keys.push({
        keyName: `quiz.topics.${id}`,
        defaultValue: typeof value === 'string' ? value : undefined,
        line: 1,
      });
    }
  }

  // Extract explanations.parties.*.* keys
  if (data.explanations?.parties) {
    for (const [partyId, topics] of Object.entries(data.explanations.parties)) {
      if (typeof topics === 'object' && topics !== null) {
        for (const [topicId, value] of Object.entries(topics)) {
          keys.push({
            keyName: `explanations.parties.${partyId}.${topicId}`,
            defaultValue: typeof value === 'string' ? value : undefined,
            line: 1,
          });
        }
      }
    }
  }

  // Extract explanations.candidates.*.* keys
  if (data.explanations?.candidates) {
    for (const [candidateId, topics] of Object.entries(data.explanations.candidates)) {
      if (typeof topics === 'object' && topics !== null) {
        for (const [topicId, value] of Object.entries(topics)) {
          keys.push({
            keyName: `explanations.candidates.${candidateId}.${topicId}`,
            defaultValue: typeof value === 'string' ? value : undefined,
            line: 1,
          });
        }
      }
    }
  }

  return { keys, warnings };
}