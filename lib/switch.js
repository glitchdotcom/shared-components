import React from 'react';
import styled, { css } from 'styled-components';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

const ShuttleBody = styled.span`
  position: relative;
  display: inline-block;
  height: var(--space-3);
  width: var(--space-5);
  font-weight: bold;
  font-size: var(--fontSizes-small);
`;

const ShuttleLabel = styled.span`
  display: inline-block;
  width: var(--space-4);
  padding: var(--space-1) var(--space-2);
`;

const Knob = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: var(--space-2);
  background-color: var(--colors-background);
  height: var(--space-3);
  width: var(--space-3);
`;

const Shuttle = (props) => (
  <ShuttleBody {...props}>
    <ShuttleLabel style={{ color: 'var(--colors-success-text)', backgroundColor: 'var(--colors-success-background)', textAlign: 'right' }}>
      On
    </ShuttleLabel>
    <ShuttleLabel style={{ color: 'var(--colors-tertiary-text)', backgroundColor: 'var(--colors-tertiary-background)', textAlign: 'left' }}>
      Off
    </ShuttleLabel>
    <Knob />
  </ShuttleBody>
);

const SwitchBody = styled.label`
  position: relative;
  display: inline-block;
  border-radius: var(--space-2);
  border: 2px solid var(--colors-primary);
  height: var(--space-3);
  width: 6em;
  vertical-align: middle;
  overflow: hidden;
  &:focus-within {
    box-shadow 0 0 4px blue;
  }
  & Shuttle {
    transform: ${({ active }) => active ? 'translateX(-50%)' : 'translateX(50%)'};
  }
`;

const HiddenCheckbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  position: absolute;
  opacity: 0;
`;

export const Switch = ({ value, onChange }) => (
  <SwitchBody active={value}>
    <HiddenCheckbox checked={value} onChange={(e) => onChange(e.target.checked)} />
    <Shuttle />
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
