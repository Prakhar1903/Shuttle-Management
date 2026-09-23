/**
 * Converts HH:mm time string to minutes from midnight
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
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
  const startMinutes = 6 * 60; // 6:00 AM
  const endMinutes = 22 * 60;  // 10:00 PM
  const totalMinutes = endMinutes - startMinutes;
  return Math.max(0, Math.min(100, ((minutes - startMinutes) / totalMinutes) * 100));
}

/**
 * Calculates the width percentage of a time range on the timeline
 */
export function getTimelineWidth(startTime: string, endTime: string): number {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const totalMinutes = (22 - 6) * 60; // 16 hours
  return Math.max(0, ((endMinutes - startMinutes) / totalMinutes) * 100);
}

/**
 * Formats time for display (adds AM/PM if needed)
 */
export function formatTime(time: string): string {
  return time; // Keep 24h format as shown in screenshots
}

/**
 * Gets current time as HH:mm
 */
export function getCurrentTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

/**
 * Formats a date string for display
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Timeline hours array for rendering
 */
export const TIMELINE_HOURS = Array.from({ length: 17 }, (_, i) => i + 6); // 6:00 to 22:00
