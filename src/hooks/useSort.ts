import { useState, useMemo } from 'react';
import type { SortConfig } from '../types';

/**
 * Hook for sorting arrays of objects
 * @param items Array of items to sort
 * @param defaultKey Default sorting key
 */
export function useSort<T>(items: T[], defaultKey?: string) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(
    defaultKey ? { key: defaultKey, direction: 'asc' } : null
  );

  const sortedItems = useMemo(() => {
    if (!sortConfig) return items;

    return [...items].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortConfig.key];
      const bVal = (b as Record<string, unknown>)[sortConfig.key];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      let comparison = 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else {
        comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      }

      return sortConfig.direction === 'desc' ? -comparison : comparison;
    });
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  return { sortedItems, sortConfig, requestSort };
}
