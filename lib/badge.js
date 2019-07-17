import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const badge = styled.span`
  font-family: var(--font-sans);
  font-size: var(--fontSizes-tiny);
  font-weight: 600;
  vertical-align: top;
  display: inline;
  margin-left: 3px;
  color: white;
  padding-top: 2px;
  padding-right: 5px;
  padding-bottom: 0;
  padding-left: 5px;
  border-radius: 5px;
  background: tertiary;
  &.success
    background-color: success
  &.warning
    background-color: warning
  &.error
    background-color: error
`

const cx = classNames.bind(styles);

export const TYPES = ['success', 'warning', 'error', 'private'];

/**
 * Badge Component
 */
const Badge = ({ type, children }) => {
  const className = cx({ badge: true, [type]: true });
  return <div className={className}>{children}</div>;
};

Badge.propTypes = {
  /** element(s) to display in the tag */
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(TYPES),
};

Badge.defaultProps = {
  type: null,
};

export default Badge;

