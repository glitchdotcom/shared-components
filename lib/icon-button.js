import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { UnstyledButton } from './button';
import { Icon } from './icon';
import { sizes } from './system';

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
  <IconButtonWrap data-module="IconButton" aria-label="label" ref={ref} {...props}>
    <ButtonIcon icon={icon} {...iconProps} />
  </IconButtonWrap>
));

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  iconProps: PropTypes.object,
  type: PropTypes.string,
};
IconButton.defaultProps = {
  type: 'button',
  as: UnstyledButton,
};

const noop = () => {};
export const StoryIconButton = () => (
  <>
    <IconButton icon="x" label="Close notification" onClick={noop} />
    &nbsp;
    <IconButton icon="chevronDown" label="Project options" onClick={noop} />
  </>
);

