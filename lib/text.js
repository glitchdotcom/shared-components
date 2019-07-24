import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sizes, whitespace, spacePropTypes, getSpace } from './system';

const textVariants = {
  primary: styled.css`
    color: inherit;
  `,
  secondary: styled.css`
    color: var(--local-colors-secondary, --colors-secondary);
  `,
}

export const P = styled.p`
  ${({ size }) => sizes[size] || 'font-size: inherit'};
  font-weight: normal;
  ${whitespace}
  ${({ variant }) => textVariants[variant]}
  & + & {
    margin-top: ${getSpace(['marginTop', 'mt', 'marginY', 'my', 'margin'], 'var(--space-1)')};
  }
`;
P.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes)),
  variant: PropTypes.oneOf(Object.keys(textVariants)),
  ...spacePropTypes,
};
P.defaultProps = {
  variant: "primary",
}

const defaultSizes = {
  h1: 'huge',
  h2: 'bigger',
  h3: 'big',
  h4: 'normal',
  h5: 'small',
  h6: 'tiny',
};

export const H = styled.h1`
  ${({ size, as }) => sizes[size] || `font-size: var(--fontSizes-${defaultSizes[as]})`};
  font-weight: bold;
  ${whitespace}
  ${({ variant }) => textVariants[variant]}
`;
H.propTypes = {
  as: PropTypes.oneOf(Object.keys(defaultSizes)).isRequired,
  size: PropTypes.oneOf(Object.keys(sizes)),
  variant: PropTypes.oneOf(Object.keys(textVariants)),
  ...spacePropTypes,
};
H.defaultProps = {
  variant: "primary",
}

export const StoryText = () => (
  <>
    <H as="h1">Giant heading</H>
    <H as="h2" my={4} variant="secondary">
      h2 with lots of margin and secondary color
    </H>
    <H as="h3" size="tiny">
      Semantic h3, tiny font
    </H>
    <P>Many p tags in a row</P>
    <P>With automatic margins between them</P>
    <P>But no exterior margins</P>
    <H as="h4" paddingLeft={2}>
      h4 with leftpadding
    </H>
  </>
);
