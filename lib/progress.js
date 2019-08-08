import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CodeExample, PropsDefinition, Prop } from './story-utils';

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
`;
Progress.propTypes = {
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export const StoryProgress = () => (
  <>
    <p>
      The Progress component renders a styled <code>{`<progress>`}</code> element that matches the surrounding text color and background.
    </p>
    <CodeExample>{`<Progress max={100} value={30}>30%</Progress>`}</CodeExample>
    <PropsDefinition>
      <Prop name="value" required>
        A number between 0 and the value of "max" that indicates how much of the task has been completed.
      </Prop>
      <Prop name="max" required>
        The maxiumum value of the progress indicator.
      </Prop>
    </PropsDefinition>
    <div style={{ width: '10rem' }}>
      <div style={{ backgroundColor: 'var(--colors-secondaryBackground)', padding: 'var(--space-1)' }}>
        <p>Secondary background styles</p>
        <Progress value={30} max={100}>
          30%
        </Progress>
      </div>
      <div style={{ color: 'var(--colors-notice-text)', backgroundColor: 'var(--colors-notice-background)', padding: 'var(--space-1)' }}>
        <p>Notification styles</p>
        <Progress value={70} max={100}>
          70%
        </Progress>
      </div>
    </div>
  </>
);
