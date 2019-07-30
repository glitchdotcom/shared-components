import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CodeExample } from './story-utils';

const variants = {
  circle: styled.css`
    border-radius: var(--rounded);
  `,
  roundrect: styled.css`
    border-radius: 100%;
  `
}

const Image = React.forwardRef(({ src, defaultSrc, props }, ref) => {
  const [activeSrc, setActiveSrc] = React.useState(src)
  
  
  return (
    <img ref={ref} src={activeSrc} {...props} />
  )
})



export const Avatar = styled.img.attrs(() => ({ 'data-module': 'Avatar'}))`
  width: 1em;
  height: 1em;
  ${({ variant }) => variants[variant]}
`

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)).isRequired,
}

export const StoryAvatar = () => (
  <>
    <p>The Avatar component renders </p>
  </>
)