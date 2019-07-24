import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withProps } from './util';
import { Box } from './box';

export const Progress = withProps(
  styled.progress`
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
  `,
  { 'data-module': 'Progress' },
);
Progress.propTypes = {
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export const StoryProgress = () => (
  <Box mx={0} style={{ width: '10rem' }}>
    <Box my={1} padding={1} rounded variant="highlight">
      <Progress value={30} max={100}>
        30%
      </Progress>
    </Box>
    <Box my={1} padding={1} rounded variant="info">
      <Progress value={70} max={100}>
        70%
      </Progress>
    </Box>
  </Box>
);
