import { ISSUE_PER_PAGE, ISSUE_URL, QUERIES, TIMEOUT_SEC } from '@/lib/utils/config';
import { Label } from '@/models/Label';
import { Language } from '@/models/Language';
import { Ordering } from '@/models/Ordering';
import { SortingTag } from '@/models/SortingTag';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Returns a rejected Promise after given seconds
 * @async
 * @param {number} sec - How much time before rejecting promise
 * @returns {Promise} Settled (Rejected) Promise
 */

const PAT = import.meta.env.VITE_REACT_APP_GITHUB_PAT;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = async (sec: number): Promise<never> => {
  return new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(
        new Error(`Request took too long! Timeout after ${sec} second(s)`)
      );
    }, sec * 1000);
  });
};

/**
 * Fetches data from given url
 * @async
 * @param {String} url
 * @returns {Promise} Data - Settled Promise
 */

export const request = async <T>(url: string): Promise<T> => {
  const headers = {
    ...(PAT ? { Authorization: `token ${PAT}` } : null),
    'Content-Type': 'application/json',
  };

  const request = fetch(url, { headers });

  const res = await Promise.race([request, delay(TIMEOUT_SEC)]);

  const text = await res.text();

  if (!res.ok) {
    return Promise.reject(`Error (${res.status}): ${text}`);
  }

  // TODO: This is not ideal, the Response should be validated using Zod
  return JSON.parse(text) as T;
};

/**
 * Returns total pages according to the no of data el
 * @param {Number} length - Number of data
 * @param {Number} itemsPerPage - Number of items per page (optional)
 * @returns {Number} Total pages
 */

export const getTotalPages = (
  length: number,
  itemsPerPage: number = ISSUE_PER_PAGE
) => {
  return Math.ceil(length / itemsPerPage);
};

/**
 * Returns a string by joining a the given sentence with underscores
 * @param {String} text - text to be formatted
 * @returns {String} id - joined with _
 */

export const toId = (text: string) => text.toLowerCase().replace(/\s/g, '_');

export const dateFormatter = (
  date: number | string,
  language: string = navigator.language || 'en-US'
) => {
  try {
    const parsedDate = new Date(date);

    return parsedDate.toLocaleDateString(language, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch (error) {
    console.error('Something went wrong while trying to format date: ' + date);
    console.error(error);

    return 'Invalid Date';
  }
};

export const timeSince = (time: number | string | Date) => {
  const currentDate = new Date().getTime();
  const givenDate = new Date(time).getTime();
  const seconds = Math.floor((currentDate - givenDate) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' mins ago';
  }
  return Math.floor(seconds) + ' sec ago';
};

export const convertToK = (value: number) => {
  if (value >= 1000000) {
    return value / 1000000 + 'M';
  }

  if (value >= 1000) {
    return (value / 1000).toFixed(2) + 'K';
  }
  return value;
};

export const composeUrl = (
  languages: Language[],
  page: number,
  sort: SortingTag,
  order: Ordering,
  labels: Label[],
  itemsPerPage: number = ISSUE_PER_PAGE
) => {
  const hasAll = !languages || languages.length === 0 || languages.includes('all');
  const qParts: string[] = [QUERIES.replace(/\+/g, ' ')];

  if (!hasAll) {
    const formatLanguage = (l: string) => {
      switch (l) {
        case 'javascript':
          return 'JavaScript';
        case 'typescript':
          return 'TypeScript';
        case 'css':
          return 'CSS';
        case 'html':
          return 'HTML';
        case 'python':
          return 'Python';
        case 'java':
          return 'Java';
        case 'go':
          return 'Go';
        case 'shell':
          return 'Shell';
        case 'rust':
          return 'Rust';
        case 'haskell':
          return 'Haskell';
        case 'r':
          return 'R';
        case 'dart':
          return 'Dart';
        case 'ruby':
          return 'Ruby';
        default:
          return l;
      }
    };
    const specific = languages.filter((l) => l !== 'all').map(formatLanguage);
    if (specific.length === 1) {
      qParts.push(`language:${specific[0]}`);
    } else if (specific.length > 1) {
      const langGroup = specific.map((l) => `language:${l}`).join(' OR ');
      qParts.push(`(${langGroup})`);
    }
  }

  const labelsToUse = labels?.includes('none') ? [] : labels ?? [];
  const formatLabel = (l: string) => (l.includes(' ') ? `"${l}"` : l);
  if (labelsToUse.length > 0) {
    const csv = labelsToUse.map(formatLabel).join(',');
    qParts.push(`label:${csv}`);
  }

  const searchParams = {
    order,
    page,
    per_page: itemsPerPage,
    q: qParts.join(' '),
    sort,
  };

  const url = new URL(ISSUE_URL);

  Object.entries(searchParams).forEach(([key, value]) => {
    if (!value) return;
    url.searchParams.set(key, value.toString());
  });
  console.log({ url: url.toString() });
  return url.toString();
};
