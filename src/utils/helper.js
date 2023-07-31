import { ISSUE_PER_PAGE, TIMEOUT_SEC } from './config';

/**
 * Returns a rejected Promise after given seconds
 * @async
 * @param {number} sec - How much time before rejecting promise
 * @returns {Promise} Settled (Rejected) Promise
 */

const timeout = async (sec) =>
  new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${sec} second`));
    }, sec * 1000);
  });

/**
 * Fetches data from given url
 * @async
 * @param {String} url
 * @returns {Promise} Data - Settled Promise
 */

// Async func always returns Promise (resolved or Rejected)
export const FETCH = async (url) => {
  // Consuming Promise using Await | .then()
  const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
  const data = await res.json();
  if (!res.ok) throw new Error(`Error (${res.status}): ${data.message}`);

  // Returns Resolved value (Promise)
  return data;
};

/**
 * Returns total pages according to the no of data el
 * @param {Number} length - Number of data
 * @returns {Number} Total pages
 */

export const getTotalPages = (length) => Math.ceil(length / ISSUE_PER_PAGE);

/**
 * Returns a string by joining a the given sentence with underscores
 * @param {String} text - text to be formatted
 * @returns {String} id - joined with _
 */

export const toId = (text) => text.toLowerCase().replace(' ', '_');

export const dateFormatter = (date) => {
  return new Intl.DateTimeFormat(
    navigator.language || navigator.userLanguage || 'en-US',
    { day: 'numeric', month: 'short', year: 'numeric' }
  ).format(new Date(date));
};

export const timeSince = (time) => {
  const currentDate = new Date();
  const givenDate = new Date(time);
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

export const convertToK = (value) => {
  if (value >= 1000000) {
    value = value / 1000000 + 'M';
  } else if (value >= 1000) {
    value = (value / 1000).toFixed(2) + 'K';
  }
  return value;
};
