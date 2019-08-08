import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Progress = styled.progress.attrs(() => ({ 'data-module': 'Progress' }))`
  appearance: none;
  display: block;
  height: 0.75em;
  width: 100%;
  border: 1px solid currentColor;
  background-color: transparent; // firefox
  border-radius: var(--rounded);

  // ugly prefixes sadly required
  &::-webkit-progress-bar {
    background-color: transparent;
  }
  &::-webkit-progress-value {
    background-color: currentColor;
    border-radius: calc(var(--rounded) - 2px);
  }
  &::-moz-progress-bar {
    background-color: currentColor;
    border-radius: calc(var(--rounded) - 2px);
  }
`
Progress.propTypes = {
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export const StoryProgress = () => (
  <>
    <p>
      The Progress component renders a progress bar that matches the 
    </p>
    <div style={{ width: '10rem' }}>
      <div style={{ backgroundColor: 'var(--colors-secondaryBackground)', padding: 'var(--space-1)' }}>
        <Progress value={30} max={100}>
          30%
        </Progress>
      </div>
      <div style={{ color: 'var(--colors-notice-text)', backgroundColor: 'var(--colors-notice-background)', padding: 'var(--space-1)' }}>
        <Progress value={70} max={100}>
          70%
        </Progress>
      </div>
    </div>
  </>
);

