import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CodeExample, PropsDefinition, Prop } from './story-utils';

const Image = React.forwardRef(({ src, defaultSrc, props }, ref) => {
  const [activeSrc, setActiveSrc] = React.useState(src || defaultSrc);
  React.useEffect(() => {
    setActiveSrc(src);
  }, [src]);

  const onError = () => {
    if (defaultSrc && activeSrc !== defaultSrc) {
      setActiveSrc(defaultSrc);
    }
  };

  return <img ref={ref} src={activeSrc} onError={onError} {...props} />;
});

const variants = {
  circle: styled.css`
    border-radius: var(--rounded);
  `,
  roundrect: styled.css`
    border-radius: 100%;
  `,
};

export const Avatar = styled(Image).attrs(() => ({ 'data-module': 'Avatar' }))`
  display: block;
  width: 100%;
  height: auto;
  ${({ variant }) => variants[variant]}
`;

Avatar.propTypes = {
  src: PropTypes.string,
  defaultSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)).isRequired,
};

export const StoryAvatar = () => (
  <>
    <p>The Avatar component renders an avatar-shaped image with a fallback src.</p>
    <CodeExample>{`<Avatar variant="circle" src={user.avatarThumbnailUrl} defaultSrc={DEFAULT_USER_AVATAR} alt={user.name} />`}</CodeExample>
    <PropsDefinition>
      <Prop name="src">The source for the avatar image.</Prop>
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
);

const ANON_AVATAR_URL = 'https://cdn.glitch.com/f6949da2-781d-4fd5-81e6-1fdd56350165%2Fanon-user-on-project-avatar.svg?1488556279399';
const user = {
  name: 'Justin Falcone',
  avatarThumbnailUrl: 'https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/user-avatar/560e4b07-a70b-4f87-b8d4-699d738792d0-small.jpg',
}

const Grid = styled.div`
  display: grid;
  grid-gap: var(--space-1);
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  margin: var(--space-1) auto;
`;

const Profile = styled.div`
  color: var(--colors-tertiary-text);
  background-color: var(--colors-tertiary-background);
  border-radius: var(--rounded);
  padding: var(--space-1);
  display: flex;
`

export const StoryAvatar_sizes = () => (
  <>
    <p>Avatars are block-level elements and are sized to fit their container.</p>
    <Grid>
      
    </Grid>
  </>
);
