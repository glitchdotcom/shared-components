import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CodeExample, PropsDefinition, Prop } from './story-utils';

const variants = {
  circle: styled.css`
    border-radius: var(--rounded);
  `,
  roundrect: styled.css`
    border-radius: 100%;
  `
}

const Image = React.forwardRef(({ src, defaultSrc, props }, ref) => {
  const [activeSrc, setActiveSrc] = React.useState(src || defaultSrc)
  React.useEffect(() => {
    setActiveSrc(src)
  }, [src])
  
  const onError = () => {
    if (defaultSrc && activeSrc !== defaultSrc) {
      setActiveSrc(defaultSrc)
    }
  }
  
  return (
    <img ref={ref} src={activeSrc} onError={onError} {...props} />
  )
})



export const Avatar = styled(Image).attrs(() => ({ 'data-module': 'Avatar'}))`
  width: 1em;
  height: 1em;
  ${({ variant }) => variants[variant]}
`

Avatar.propTypes = {
  src: PropTypes.string,
  defaultSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)).isRequired,
}

export const StoryAvatar = () => (
  <>
    <p>The Avatar component renders an avatar-shaped image with a fallback src.</p>
    <CodeExample>{`<Avatar variant="circle" src={user.avatarThumbnailUrl} defaultSrc={DEFAULT_USER_AVATAR} alt={user.name} />`}</CodeExample>
    <PropsDefinition>
      <Prop name="src">
        The source for the avatar image.
      </Prop>
      <Prop name="defaultSrc" required>
        The fallback source for the avatar image, if "src" is not present or returns an error.
      </Prop>
      <Prop name="alt" required>
        The alt text for the avatar image. 
      </Prop>
      <Prop name="variant" required>
        The shape of the avatar image: "circle" or "roundrect".
      </Prop>
    </PropsDefinition>
  </>
)

export const StoryAvatar_sizes = () => (
  <>
    <p>Avatar sizes </p>
  </>
)