import {
  DEFAULT_LABELS,
  ISSUE_PER_PAGE,
  ISSUE_URL,
  QUERIES,
  TIMEOUT_SEC,
} from '@/lib/utils/config';
import { Label } from '@/models/Label';
import { Language } from '@/models/Language';
import { Ordering } from '@/models/Ordering';
import { SortingTag } from '@/models/SortingTag';

const PAT = import.meta.env.VITE_REACT_APP_GITHUB_PAT;

/**
 * Returns a rejected Promise after given seconds
 * @async
 * @param {number} sec - How much time before rejecting promise
 * @returns {Promise} Settled (Rejected) Promise
 */

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
 * @returns {Number} Total pages
 */

export const getTotalPages = (length: number) => {
  return Math.ceil(length / ISSUE_PER_PAGE);
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
  lang: Language,
  page: number,
  sort: SortingTag,
  order: Ordering,
  label: Label
) => {
  const langQuery = lang && lang !== 'all' ? `+language:${lang}` : '';
  const defaultLabelQuery = `+label:${DEFAULT_LABELS.join(',')}`;
  const labelQuery =
    label && label.toLocaleLowerCase() !== 'none'
      ? `${defaultLabelQuery},${label}`
      : defaultLabelQuery;

  const searchParams = {
    order,
    page,
    per_page: ISSUE_PER_PAGE,
    q: `${QUERIES}+${langQuery}${labelQuery}`,
    sort,
  };

  const url = new URL(ISSUE_URL);

  Object.entries(searchParams).forEach(([key, value]) => {
    if (!value) return;
    url.searchParams.set(key, value.toString());
  });
  // Unfortunately, this hack is needed because
  // the API is not parsing the URL correctly :(
  url.search = decodeURIComponent(url.search);

  return url.toString();
};
