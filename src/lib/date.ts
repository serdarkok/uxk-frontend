import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with UTC and timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Get the current date/time in UTC
 * @returns Dayjs object in UTC
 */
export const nowUTC = () => dayjs.utc();

/**
 * Parse a UTC date string from database and convert to a Date object
 * with the same calendar date (ignoring time component)
 * @param date - UTC date string from database
 * @returns Dayjs object representing the same calendar date
 */
export const toUTC = (date?: string | Date | null) => {
  if (!date) return null;
  // Parse as UTC and keep the date components
  return dayjs.utc(date);
};

/**
 * Convert a UTC date string from database to a Date object for DatePicker
 * This ensures the DatePicker shows the same calendar date as stored in UTC
 * @param date - UTC date string from database (e.g., "2025-12-18T00:00:00.000Z")
 * @returns Date object with the same calendar date in local timezone
 */
export const utcStringToLocalDate = (date?: string | null): Date | undefined => {
  if (!date) return undefined;
  
  // Parse the UTC string and extract date components
  const utcDate = dayjs.utc(date);
  const year = utcDate.year();
  const month = utcDate.month(); // 0-indexed
  const day = utcDate.date();
  
  // Create a local Date with the same calendar date
  return new Date(year, month, day);
};

/**
 * Format a date as UTC ISO string (for API requests)
 * @param date - Date string, Date object, or Dayjs object
 * @returns ISO string in UTC format (YYYY-MM-DDTHH:mm:ss.sssZ)
 */
export const toUTCString = (date?: string | Date | dayjs.Dayjs | null): string | null => {
  if (!date) return null;
  return dayjs(date).utc().toISOString();
};

/**
 * Format a date for display (YYYY-MM-DD in UTC)
 * @param date - Date string, Date object, or Dayjs object
 * @returns Formatted date string (YYYY-MM-DD)
 */
export const formatDateUTC = (date?: string | Date | dayjs.Dayjs | null): string | null => {
  if (!date) return null;
  return dayjs(date).utc().format('YYYY-MM-DD');
};

/**
 * Format a date with time for display (YYYY-MM-DD HH:mm in UTC)
 * @param date - Date string, Date object, or Dayjs object
 * @returns Formatted date-time string
 */
export const formatDateTimeUTC = (date?: string | Date | dayjs.Dayjs | null): string | null => {
  if (!date) return null;
  return dayjs(date).utc().format('YYYY-MM-DD HH:mm');
};

/**
 * Parse a date input and return as UTC ISO string for database storage
 * This extracts the calendar date (year, month, day) and creates a UTC date at midnight,
 * ignoring the timezone of the input Date object.
 * @param date - Date string from input (e.g., from DatePicker)
 * @returns UTC ISO string or null
 */
export const parseInputDateToUTC = (date?: string | Date | null): string | null => {
  if (!date) return null;
  
  // If it's a Date object, extract the local calendar date components
  // and create a UTC date with those same numbers
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed
    const day = date.getDate();
    // Create UTC date with the same calendar date
    return dayjs.utc().year(year).month(month).date(day).startOf('day').toISOString();
  }
  
  // For strings, parse and treat as UTC
  return dayjs.utc(date).startOf('day').toISOString();
};

/**
 * Convert UTC date string to local timezone for display
 * @param date - UTC date string from database
 * @returns Dayjs object in local timezone
 */
export const utcToLocal = (date?: string | Date | null) => {
  if (!date) return null;
  return dayjs.utc(date).local();
};

/**
 * Check if a date is valid
 * @param date - Date to check
 * @returns boolean
 */
export const isValidDate = (date?: string | Date | null): boolean => {
  if (!date) return false;
  return dayjs(date).isValid();
};

/**
 * Get date difference in days
 * @param date1 - First date
 * @param date2 - Second date (default: now)
 * @returns Number of days difference
 */
export const daysDiff = (date1: string | Date, date2?: string | Date): number => {
  const d1 = dayjs.utc(date1);
  const d2 = date2 ? dayjs.utc(date2) : dayjs.utc();
  return d2.diff(d1, 'day');
};

// Export dayjs instance for advanced usage
export { dayjs };
