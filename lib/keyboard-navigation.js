import React from 'react';

export const onArrowKeys = (e, index, options) => {
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
