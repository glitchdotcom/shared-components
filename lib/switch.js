import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

const ShuttleBody = styled.span`
  position: relative;
  display: inline-block;
  height: var(--space-3);
  width: var(--space-5);
  font-weight: bold;
  font-size: var(--fontSizes-small);
  transition: transform 0.3s;
  transform: translateX(-40%);
  transform: ${({ active }) => active && 'translateX(0%)'};
`;

const ShuttleLabel = styled.span`
  display: inline-block;
  width: var(--space-4);
`;
const OnLabel = styled(ShuttleLabel)`
  color: var(--colors-success-text);
  background-color: var(--colors-success-background);
  text-align: right;
  padding: var(--space-1) calc(var(--space-2) + var(--space-1)) var(--space-1) 0;
`
const OffLabel = styled(ShuttleLabel)`
  color: var(--colors-tertiary-text);
  background-color: var(--colors-tertiary-background);
  text-align: left;
  padding: var(--space-1) 0 var(--space-1) calc(var(--space-2) + var(--space-1));
`

const Knob = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: var(--space-2);
  background-color: var(--colors-background);
  height: calc(var(--space-3) - 4px);
  width: calc(var(--space-3) - 4px);
  box-shadow: 0 0 4px rgba(0,0, 0,0.1);
`;

const Shuttle = (props) => (
  <ShuttleBody {...props}>
    <OnLabel>
      On
    </OnLabel>
    <OffLabel>Off</OffLabel>
    <Knob />
  </ShuttleBody>
);

const SwitchBody = styled.label`
  position: relative;
  display: inline-block;
  border-radius: var(--space-2);
  border: 2px solid var(--colors-primary);
  height: var(--space-3);
  width: calc(var(--space-4) + var(--space-2));
  vertical-align: middle;
  overflow: hidden;
  &:focus-within {
    box-shadow 0 0 4px blue;
  }
`;

const HiddenCheckbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  position: absolute;
  opacity: 0;
`;

export const Switch = ({ value, onChange, label, ...props }) => (
  <SwitchBody {...props}>
    <HiddenCheckbox checked={value} onChange={(e) => onChange(e.target.checked)} aria-label={label} />
    <Shuttle active={value} aria-hidden="true" />
  </SwitchBody>
);
Switch.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export const StorySwitch = () => {
  const [value, onChange] = React.useState(false);
  return (
    <>
      <p>The Switch component renders a checkbox styled as a large toggle switch with "On" and "Off" labels.</p>
      <CodeExample>{code`<Switch value={enabled} onChange={setShowOptions} label="Show notifoptions" />`}</CodeExample>
      <PropsDefinition>
        <Prop name="value" required>
          Whether the button is checked. <code>true</code> or <code>false</code>.
        </Prop>
        <Prop name="onChange" required>
          A callback function, which is called with the input's new value on change events.
        </Prop>
        <Prop name="label" required>
          A label that describes the value that is being toggle
        </Prop>
      </PropsDefinition>

      <h3>
        Notifications settings <Switch value={value} onChange={onChange} />
      </h3>
    </>
  );
};
