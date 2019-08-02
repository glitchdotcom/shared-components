import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { UnstyledButton } from './button';
import { Icon } from './icon';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

const IconButtonWrap = styled.span`
  padding: var(--opticalPadding);
  border-radius: var(--rounded);
  display: inline-block;
  line-height: 1;
  &:hover {
    background-color: var(--colors-hover);
  }
`;
const ButtonIcon = styled(Icon)`
  color: var(--colors-secondary);
  &:hover {
    color: var(--colors-primary);
  }
`;

export const IconButton = React.forwardRef(({ icon, label, iconProps, ...props }, ref) => (
  <IconButtonWrap data-module="IconButton" aria-label={label} ref={ref} {...props}>
    <ButtonIcon icon={icon} {...iconProps} />
  </IconButtonWrap>
));

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  iconProps: PropTypes.object,
};
IconButton.defaultProps = {
  type: 'button',
  as: UnstyledButton,
};

export const StoryIconButton = () => (
  <>
    <p>
      The IconButton component renders an Icon as an accessible button with a label.
    </p>
    <CodeExample>{`<IconButton icon="x" label="Close notification" onClick={onClose} />`}</CodeExample>
    <PropsDefinition>
      <Prop name="icon" required>
        The name of the icon to render.
      </Prop>
      <Prop name="label" required>
        The ARIA label of the button.
      </Prop>
      <Prop name="iconProps">
        Additional props to pass to the Icon component.
      </Prop>
    </PropsDefinition>
    <p>
      All other props are passed to the button wrapper.
    </p>
    <IconButton icon="x" label="Close notification" onClick={() => console.log('Close notification')} />
    &nbsp;
    <IconButton icon="chevronDown" label="Project options" onClick={() => console.log('Project options')} />
  </>
);
