import { TIMEOUT_SEC } from './config';

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
