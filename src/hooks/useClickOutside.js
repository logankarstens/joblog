import { useEffect } from 'react'

export const useClickOutside = (ref, callback, addEventListener ) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  }

  useEffect(() => {
    if (addEventListener)
      document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  })
}