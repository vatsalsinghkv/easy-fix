export const BASE_URL = 'https://api.github.com';
export const ISSUE_URL = `${BASE_URL}/search/issues`;
export const LABELS = ['easy', 'first', 'good'];
export const QUERIES = [''];
export const LANGUAGES = [
  'javascript',
  'css',
  'html',
  'typescript',
  'python',
  'java',
  'all',
];
export const SORT_BY = [
  { sortKey: 'updated', displayKey: 'updated', direction: 'asc' },
  { sortKey: 'comments', displayKey: 'activity', direction: 'asc' },
];
export const DEFAULT_SORT_BY = {
  sortKey: 'updated',
  displayKey: 'updated',
  direction: 'asc',
};
export const DEFAULT_LANGUAGE = 'all';
export const ISSUE_PER_PAGE = 10;
export const MAX_ISSUES_ALLOWED = 1000;
export const TIMEOUT_SEC = 10;
export const TOTAL_SIBLING_BUTTONS = 1;
