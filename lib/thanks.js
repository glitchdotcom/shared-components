import React from 'react';
import PropTypes from 'prop-types';
import Icon from './icon';
import styled from 'styled-components';

const Container = styled.p`
  margin: 0;
  font-size: var(--fontSizes-small);
  white-space: nowrap;
`

const thanksText = (count) => {
  if (count === 1) return 'Thanked once';
  if (count === 2) return 'Thanked twice';  
  return `Thanked ${count} times`;
};

const ThanksLong = ({ count, ...props }) => (
  <Container data-module="Thanks" {...props}>
    {thanksText(count)}
    &nbsp;
    <Icon name="sparklingHeart" />
  </Container>
);

const ThanksShort = ({ count, ...props }) => (
  <Container data-module="Thanks" {...props}>
    <Icon name="sparklingHeart" />
    &nbsp;
    {count}
  </Container>
);

export const Thanks = ({ count, short, ...props }) => {
  if (count <= 0) return null;
  if (short) return <ThanksShort count={count} {...props} />;
  return <ThanksLong count={count} {...props} />;
};

Thanks.propTypes = {
  count: PropTypes.number.isRequired,
  short: PropTypes.bool,
};

Thanks.defaultProps = {
  short: false,
};

export const StoryThanks = () => (
  <>
    <Thanks count={1} />
    <Thanks count={2} />
    <Thanks count={3} />
    <Thanks count={3} short />
  </div>
)