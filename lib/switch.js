import React from 'react';
import styled, { css } from 'styled-components';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

const SwitchBody = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: var(--space-2);
  border: 2px solid var(--colors-primary);
  font-weight: bold;
  font-size: var(--fontSizes-small);
  padding: 0 var(--space-1);
  height: var(--space-3);
  width: calc(var(--space-4) + var(--space-2));
  &:focus-within {
    box-shadow 0 0 4px blue;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    border-radius: var(--space-2);
    background-color: var(--colors-background);
    height: calc(var(--space-3) - 4px);
    width: calc(var(--space-3) - 4px);
  }
  ${({ active }) =>
    active
      ? css`
          color: var(--colors-success-text);
          background-color: var(--colors-success-background);
          padding-right: var(--space-3);
          &:after {
            right: 0;
          }
        `
      : css`
          color: var(--colors-tertiary-text);
          background-color: var(--colors-tertiary-background);
          padding-left: var(--space-3);
          &:after {
            left: 0;
          }
        `}
`;

const HiddenCheckbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  position: absolute;
  opacity: 0;
`;

export const Switch = ({ value, onChange }) => (
  <SwitchBody active={value}>
    <HiddenCheckbox checked={value} onChange={(e) => onChange(e.target.checked)} />
    {value ? 'On' : 'Off'}
  </SwitchBody>
);

export const StorySwitch = () => (
  <>
    <p>The Switch component is a large toggle element that functions like a checkbox.</p>
    <CodeExample>
    </CodeExample>
  </>
)