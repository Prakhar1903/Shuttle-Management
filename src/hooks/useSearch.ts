import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for handling debounced search input
 * @param delay The debounce delay in milliseconds
 */
export function useSearch(delay: number = 300) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), delay);
    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setDebouncedTerm('');
  }, []);

  return { searchTerm, setSearchTerm, debouncedTerm, clearSearch };
}
