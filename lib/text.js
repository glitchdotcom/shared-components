import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sizes } from './system'; 

const getSpace = (prop, key, defaultValue) => (props) => {
  if (!props[prop] || !(key in props[prop])) return defaultValue
  return `var(--space-${props[prop][key]})`
}

const margin = styled.css`
  margin-top: ${getSpace('margin', 'top', 0)};
  margin-bottom: ${getSpace('margin', 'bottom', 0)};
  margin-left: ${getSpace('margin', 'left', 'auto')};
  margin-right: ${getSpace('margin', 'right', 'auto')};
`

const padding = styled.css`
  padding-top: ${getSpace('padding', 'top', 0)};
  padding-bottom: ${getSpace('padding', 'bottom', 0)};
  padding-left: ${getSpace('padding', 'left', 0)};
  padding-right: ${getSpace('padding', 'right', 0)};
`

const spacePropType = PropTypes.shape({
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
})

export const Box = styled.div`
  ${margin}
  ${padding}
`

Box.PropTypes = {
  margin: spacePropType,
  padding: spacePropType,
}

export const P = styled.p`
  ${({ size }) => sizes[size] || 'font-size: inherit'};
  font-weight: normal;
  ${margin}
  ${padding}
  & + & {
    margin-top: ${getSpace('top', 'var(--space-1)')};
  }
`
P.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes)),
  margin: spacePropType,
  padding: spacePropType,
}

const defaultSizes = {
  h1: "huge",
  h2: "bigger",
  h3: "big",
  h4: "normal",
  h5: "small",
  h6: "tiny",
}

const H = styled.h1`
  ${({ size, as }) => sizes[size] || `font-size: ${defaultSizes[as]}`};
  font-weight: bold;
  ${margin}
  ${padding}
`

H.propTypes = {
  as: PropTypes.oneOf(Object.keys(defaultSizes)).isRequired,
  size: PropTypes.oneOf(Object.keys(sizes)),
  margin: spacePropType,
  padding: spacePropType,
}

export const StoryText = () => (
  <>
    <H as="h1">Giant heading</H>
    <H as="h2" margin={{ top: 3, bottom: 4 }}>h2 with lots of margin</H>
    <H as="h3" size="tiny">Semantic h3, tiny font</H>
    <P>Many p tags in a row</P>
    <P>With automatic margins between them</P>
    <P>But no exterior margins</P>
  </>
)