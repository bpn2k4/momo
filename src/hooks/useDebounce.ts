import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay: number = 200) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay)
    return () => {
      clearTimeout(timeout)
    }
  }, [])
  return debouncedValue
}

export default useDebounce