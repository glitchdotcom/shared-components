import React from 'react';
import styled, { css } from 'styled-components';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';


const ShuttleWrap = styled.span`
  position: relative;
  hei
`

const Shuttle = (props) => (
  <ShuttleWrap {...props}>
    <ShuttleLabel variant="success">On</ShuttleLabel>
    <ShuttleLabel variant="tertiary">Off</ShuttleLabel>
    <Knob />
  </ShuttleWrap>  
)

const SwitchBody = styled.label`
  position: relative;
  display: inline-block;
  border-radius: var(--space-2);
  border: 2px solid var(--colors-primary);
  font-weight: bold;
  font-size: var(--fontSizes-small);
  padding: 0 var(--space-1);
  height: var(--space-3);
  width: 6em;
  vertical-align: middle;
  padding-top: var(--space-1);
  overflow: hidden;
  &:focus-within {
    box-shadow 0 0 4px blue;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0
    border-radius: var(--space-2);
    background-color: var(--colors-background);
    height: calc(var(--space-3) - 4px);
    width: calc(var(--space-3) - 4px);
    transition: transform 0.3s;
  }
  ${({ active }) =>
    active
      ? css`
          color: var(--colors-success-text);
          background-color: var(--colors-success-background);
          
          &:after {
            transform: translateX(190%);
          }
        `
      : css`
          color: var(--colors-tertiary-text);
          background-color: var(--colors-tertiary-background);
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

export const StorySwitch = () => {
  const [value, onChange] = React.useState(false);
  return (
    <>
      <p>The Switch component renders a checkbox styled as a large toggle switch with "On" and "Off" labels.</p>
      <CodeExample>{code`<Switch value={showOptions} onChange={setShowOptions} />`}</CodeExample>
      <PropsDefinition>
        <Prop name="value" required>
          Whether the button is checked. <code>true</code> or <code>false</code>.
        </Prop>
        <Prop name="onChange" required>
          A callback function, which is called with the input's new value on change events.
        </Prop>
      </PropsDefinition>

      <h3>
        Notifications settings <Switch value={value} onChange={onChange} />
      </h3>
    </>
  );
};
