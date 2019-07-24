import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { UnstyledButton } from './button';
import { icons, Icon } from './icon';
import { sizes } from './system';
import { withProps } from './util';

const IconButtonWrap = styled.span`
  padding: var(--opticalPadding);
  border-radius: var(--rounded);
  display: inline-block;
  line-height: 1;
  ${({ size }) => sizes[size]}
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

export const IconButton = React.forwardRef(({ icon, label, size, iconProps, ...props }, ref) => (
  <IconButtonWrap data-module="IconButton" aria-label="label" ref={ref} size={size} {...props}>
    <ButtonIcon icon={icon} {...iconProps} />
  </IconButtonWrap>
));

IconButton.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(sizes)),
  iconProps: PropTypes.object,
  type: PropTypes.string,
};
IconButton.defaultProps = {
  type: 'button',
  size: 'normal',
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
