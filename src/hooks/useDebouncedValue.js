import { useEffect, useState } from "react";

// Returns `value` once it has stopped changing for `delay` ms.
const useDebouncedValue = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounced;
};

export default useDebouncedValue;
