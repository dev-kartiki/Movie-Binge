// src/hooks/useDebounce.js
import { useState, useEffect } from "react";

/**
 * Custom hook for debouncing a value.
 * 
 * @param {any} value - The value to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {any} - The debounced value.
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if the value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect if value or delay changes

  return debouncedValue;
};

export default useDebounce;
