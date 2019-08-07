import React from 'react';
import { useCallbackProxy } from './callback-proxy';

export const useEscape = (open, onClose) => {
  const memoOnClose = useCallbackProxy(onClose);

  React.useEffect(() => {
    if (!open) return undefined;

    const handler = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        memoOnClose(e);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, memoOnClose]);
};

export const useFocusTrap = () => {
  const first = React.useRef();
  const last = React.useRef();
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Tab' && !e.shiftKey && e.target === last.current) {
        e.preventDefault();
        first.current.focus();
      }
      if (e.key === 'Tab' && e.shiftKey && e.target === first.current) {
        e.preventDefault();
        last.current.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return { first, last };
};

export const onArrowKeys = (e, index, options) => {
  if (!options.length) return null;

  let offset = 0;
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    offset = -1;
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    offset = 1;
  }
  if (offset === 0) return null;
  e.preventDefault();
  return (index + offset + options.length) % options.length;
};
