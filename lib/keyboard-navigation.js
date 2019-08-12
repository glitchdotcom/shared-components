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
