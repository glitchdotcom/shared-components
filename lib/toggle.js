import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';
import { VisuallyHidden } from './visually-hidden';

const ShuttleBody = styled.span`
  position: relative;
  display: inline-block;
  height: var(--space-3);
  width: var(--space-5);
  font-weight: 600;
  font-size: var(--fontSizes-small);
  transition: transform 0.3s;
  transform: translateX(-40%);
  transform: ${({ active }) => active && 'translateX(0%)'};
`;

const ShuttleLabel = styled.span`
  display: inline-block;
  text-align: center;
  width: var(--space-4);
`;
const OnLabel = styled(ShuttleLabel)`
  color: var(--colors-success-text);
  background-color: var(--colors-success-background);
  padding: var(--space-1) var(--space-2) var(--space-1) var(--space-1);
`;
const OffLabel = styled(ShuttleLabel)`
  color: var(--colors-tertiary-text);
  background-color: var(--colors-tertiary-background);
  padding: var(--space-1) var(--space-1) var(--space-1) var(--space-2);
`;

const Knob = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: var(--space-2);
  background-color: var(--colors-background);
  height: calc(var(--space-3) - 4px);
  width: calc(var(--space-3) - 4px);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`;

const nbsp = ' ';

const Shuttle = ({ trueLabel, falseLabel, ...props }) => (
  <ShuttleBody {...props}>
    <OnLabel>{trueLabel || nbsp}</OnLabel>
    <OffLabel>{falseLabel || nbsp}</OffLabel>
    <Knob />
  </ShuttleBody>
);

const ToggleBody = styled.label`
  position: relative;
  display: inline-block;
  border-radius: var(--space-2);
  border: 2px solid var(--colors-primary);
  height: var(--space-3);
  width: calc(var(--space-4) + var(--space-2));
  vertical-align: middle;
  overflow: hidden;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  &:focus-within {
    box-shadow: 0 0 4px blue;
  }
`;

export const Toggle = ({ value, onChange, label, disabled, trueLabel, falseLabel, ...props }) => (
  <ToggleBody {...props} disabled={disabled}>
    <VisuallyHidden>
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} aria-label={label} disabled={disabled} />
    </VisuallyHidden>
    <Shuttle active={value} aria-hidden="true" trueLabel={trueLabel} falseLabel={falseLabel} />
  </ToggleBody>
);
Toggle.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  trueLabel: PropTypes.string,
  falseLabel: PropTypes.string,
};
Toggle.defaultProps = {
  disabled: false,
  trueLabel: '',
  falseLabel: '',
};

const ToggleHeader = styled.header`
  display: flex;
  align-items: center;
  h3 {
    margin-right: var(--space-2);
  }
`;

export const StoryToggle = () => {
  const [value, onChange] = React.useState(false);
  const [value1, onChange1] = React.useState(false);
  return (
    <>
      <p>The Toggle component renders a checkbox styled as a large toggle switch with "On" and "Off" labels.</p>
      <CodeExample>{code`<Toggle value={notificationsEnabled} onChange={setNotificationsEnabled} label="Enable notifications" />`}</CodeExample>
      <PropsDefinition>
        <Prop name="value" required>
          Whether the button is checked. <code>true</code> or <code>false</code>.
        </Prop>
        <Prop name="onChange" required>
          A callback function, which is called with the input's new value on change events.
        </Prop>
        <Prop name="label" required>
          A label that describes the value that is being toggled
        </Prop>
        <Prop name="disabled">
          Disable the input and gray out the toggle if <code>true</code>.
        </Prop>
        <Prop name="trueLabel">Label to render on the side of the toggle visible when value is true.</Prop>
        <Prop name="falseLabel">Label to render on the side of the toggle visible when value is false.</Prop>
      </PropsDefinition>

      <ToggleHeader>
        <h3>Notifications settings</h3> <Toggle value={value} onChange={onChange} label="Enable notifications" />
      </ToggleHeader>
      <ToggleHeader>
        <h3>Disabled toggle</h3> <Toggle value={value} onChange={onChange} label="Enable notifications" disabled />
      </ToggleHeader>

      <h3>Custom colors</h3>
      <p>The toggle colors come from the theme CSS variables:</p>
      <table>
        <tbody>
          <tr>
            <th>element</th>
            <th>css variable</th>
          </tr>
          <tr>
            <td>false side text</td>
            <td>
              <code>--colors-tertiary-text</code>
            </td>
          </tr>
          <tr>
            <td>false side background</td>
            <td>
              <code>--colors-tertiary-background</code>
            </td>
          </tr>
          <tr>
            <td>true side text</td>
            <td>
              <code>--colors-success-text</code>
            </td>
          </tr>
          <tr>
            <td>true side background</td>
            <td>
              <code>--colors-success-background</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>These colors can be overridden by the parent component:</p>
      <CodeExample>{code`
        <div style={{ 
          '--colors-success-background': 'blue', 
          '--colors-success-text': 'white',
        }}>
          <Toggle value={value} onChange={onChange} label="Enable notifications" trueLabel="On" falseLabel="Off" />
        </div>
      `}</CodeExample>
      <div style={{ '--colors-success-background': 'blue', '--colors-success-text': 'white' }}>
        <Toggle value={value1} onChange={onChange1} label="Enable notifications" trueLabel="On" falseLabel="Off" />
      </div>
    </>
  );
};
