import { Label } from '@/models/Label';
import { Language } from '@/models/Language';
import { Ordering } from '@/models/Ordering';
import { SortingTag } from '@/models/SortingTag';

export const BASE_URL = 'https://api.github.com';
export const ISSUE_URL = `${BASE_URL}/search/issues`;
export const INITIAL_LABELS = ['easy', 'first', 'good'];
export const QUERIES = ['state:open'].join('+');

export const DEFAULT_LANGUAGE: Language = 'all';
export const DEFAULT_ORDERING: Ordering = 'desc';
export const DEFAULT_LABEL: Label = 'hacktoberfest';
export const DEFAULT_PAGE = 1;
export const DEFAULT_SORTING_TAG: SortingTag = 'best-match';
export const DEFAULT_ISSUES_PER_PAGE = 10;
export const AVAILABLE_ISSUES_PER_PAGE = [5, 10, 20, 50];
export const ISSUE_PER_PAGE = 10; // Keep for backward compatibility
export const MAX_ISSUES_ALLOWED = 1000;
export const TIMEOUT_SEC = 10;
export const TOTAL_SIBLING_BUTTONS = 2;
