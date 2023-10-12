import {
  convertToK,
  dateFormatter,
  delay,
  getTotalPages,
  request,
  timeSince,
  toId,
} from '@/lib/utils';
import { describe, expect, it, vi } from 'vitest';

describe('delay', () => {
  it('should reject the promise after the given seconds', async () => {
    vi.useFakeTimers();
    const sec = 5; // Delay in seconds

    const promise = delay(sec);
    vi.advanceTimersByTime(sec * 1000);

    await expect(promise).rejects.toThrowError(
      `Request took too long! Timeout after ${sec} second`
    );
  });
});

describe('request', () => {
  type MockedResponse = {
    message: string;
  };
  const fetchSpy = vi.spyOn(global, 'fetch');

  const resolveStub = Promise.resolve(
    new Response(JSON.stringify({ message: 'Successful' }), { status: 200 })
  );

  const notFoundStub = Promise.resolve(
    new Response(JSON.stringify({ message: 'Not found' }), { status: 404 })
  );

  it('should fetch data successfully', async () => {
    fetchSpy.mockReturnValue(resolveStub);
    const url = 'https://sample-api.com/users';
    const data = await request<MockedResponse>(url);

    expect(data.message).toBe('Successful');
  });

  it('should throw an error for invalid URL', async () => {
    fetchSpy.mockReturnValue(notFoundStub);
    const url = 'https://invalid-url';

    await expect(request(url)).rejects.toThrowError(
      'Error (404): {"message":"Not found"}'
    );
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });
});

describe('getTotalPages', () => {
  it('should return correct number of pages', () => {
    const length = 25;
    const totalPages = getTotalPages(length);

    expect(totalPages).toBe(3);
  });

  it('should return 0 pages for empty length', () => {
    const length = 0;
    const totalPages = getTotalPages(length);

    expect(totalPages).toBe(0);
  });
});

describe('toId', () => {
  it('should return the correct formatted string', () => {
    const text = 'Hello World';
    const id = toId(text);

    expect(id).toBe('hello_world');
  });

  it('should handle empty text', () => {
    const text = '';
    const id = toId(text);

    expect(id).toBe('');
  });
});

describe('dateFormatter', () => {
  it('should return the correct formatted date', () => {
    const date = '01-01-2023';
    const formattedDate = dateFormatter(date);

    expect(formattedDate).toBe('Jan 1, 2023');
  });

  it('should handle invalid date', () => {
    const date = 'invalid-date';
    const formattedDate = dateFormatter(date);

    expect(formattedDate).toBe('Invalid Date');
  });
});

describe('timeSince', () => {
  it('should return the correct time since (minutes)', () => {
    const tenMinutesAgo = new Date();
    tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

    const timeSinceValue = timeSince(tenMinutesAgo);

    expect(timeSinceValue).toBe('10 mins ago');
  });

  it('should return the correct time since (hours)', () => {
    const twoHoursAgo = new Date();
    twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

    const timeSinceValue = timeSince(twoHoursAgo);

    expect(timeSinceValue).toBe('2 hours ago');
  });

  it('should return the correct time since (days)', () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const timeSinceValue = timeSince(threeDaysAgo);

    expect(timeSinceValue).toBe('3 days ago');
  });

  it('should return the correct time since (months)', () => {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const timeSinceValue = timeSince(twoMonthsAgo);

    expect(timeSinceValue).toBe('2 months ago');
  });

  it('should return the correct time since (years)', () => {
    const oneYearAndOneMonthAgo = new Date();

    oneYearAndOneMonthAgo.setFullYear(oneYearAndOneMonthAgo.getFullYear() - 1);
    oneYearAndOneMonthAgo.setMonth(oneYearAndOneMonthAgo.getMonth() - 1);

    const timeSinceValue = timeSince(oneYearAndOneMonthAgo);

    expect(timeSinceValue).toBe('1 years ago');
  });

  it('should handle invalid time', () => {
    const time = 'invalid-time';
    const timeSinceValue = timeSince(time);

    expect(timeSinceValue).toBe('NaN sec ago');
  });
});

describe('convertToK', () => {
  it('should convert large numbers to million (M)', () => {
    const value = 1500000;
    const convertedValue = convertToK(value);

    expect(convertedValue).toBe('1.5M');
  });

  it('should convert large numbers to thousand (K)', () => {
    const value = 2500;
    const convertedValue = convertToK(value);

    expect(convertedValue).toBe('2.50K');
  });

  it('should not convert small numbers', () => {
    const value = 100;
    const convertedValue = convertToK(value);

    expect(convertedValue).toBe(value);
  });
});
