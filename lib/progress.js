import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withProps } from './util';

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

const Container = styled.div`
  margin: var(--space-1) 0;
  padding: var(--space-1);
  border-radius: var(--rounded);
  background-color: var(--colors-secondaryBackground);
  width: 10rem;
`;

export const StoryProgress = () => (
  <>
    <Container>
      <Progress value={30} max={100}>
        30%
      </Progress>
    </Container>
    <Container style={{ color: 'var(--colors-info-text)', backgroundColor: 'var(--colors-info-background)' }}>
      <Progress value={70} max={100}>
        70%
      </Progress>
    </Container>
  </>
);
