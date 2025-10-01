export let label = [
  'none',
  'hacktoberfest',
  'hacktoberfest2025',
  'gsoc',
  'good first issue',
  'bug',
  'enhancement',
  'documentation',
  'easy fix',
] as const;

export const sortedLabels = [...label];

export type Label = (typeof label)[number];
