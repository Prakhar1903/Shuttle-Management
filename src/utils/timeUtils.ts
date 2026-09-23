/**
 * Time manipulation utilities for Shuttle Management System
 */

export const TIMELINE_START_HOUR = 6;  // 06:00 AM
export const TIMELINE_END_HOUR = 22;    // 10:00 PM
export const TIMELINE_TOTAL_HOURS = TIMELINE_END_HOUR - TIMELINE_START_HOUR; // 16 hours
export const TIMELINE_TOTAL_MINUTES = TIMELINE_TOTAL_HOURS * 60; // 960 minutes

/**
 * Converts HH:mm time string to minutes from midnight
 */
export function timeToMinutes(time: string): number {
  if (!time) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

/**
 * Converts minutes from midnight to HH:mm string
 */
export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

/**
 * Calculates the percentage position on a timeline (6:00 to 22:00 = 16 hours)
 */
export function getTimelinePosition(time: string): number {
  const minutes = timeToMinutes(time);
  const startMinutes = TIMELINE_START_HOUR * 60;
  const clamped = Math.max(startMinutes, Math.min(TIMELINE_END_HOUR * 60, minutes));
  return ((clamped - startMinutes) / TIMELINE_TOTAL_MINUTES) * 100;
}

/**
 * Calculates the width percentage of a time range on the timeline
 */
export function getTimelineWidth(startTime: string, endTime: string): number {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const duration = Math.max(0, endMinutes - startMinutes);
  return (duration / TIMELINE_TOTAL_MINUTES) * 100;
}

/**
 * Formats time for display (keeps 24h format)
 */
export function formatTime(time: string): string {
  return time;
}

/**
 * Gets current time as HH:mm
 */
export function getCurrentTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

/**
 * Formats a date string for display (e.g. "Dec 16, 2024")
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Array of 16 hourly intervals: 6, 7, 8, ..., 21
 */
export const TIMELINE_HOURLY_SLOTS = Array.from({ length: TIMELINE_TOTAL_HOURS }, (_, i) => i + TIMELINE_START_HOUR);
