import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CodeExample, PropsDefinition, Prop } from './story-utils';

const Image = React.forwardRef(({ src, defaultSrc, ...props }, ref) => {
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
  roundrect: styled.css`
    border-radius: var(--rounded);
  `,
  circle: styled.css`
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

const Flex = styled.div`
  display: flex;
  
`

const DEFAULT_PROJECT_AVATAR_URL = 'https://cdn.glitch.com/c53fd895-ee00-4295-b111-7e024967a033%2Ffallback-project-avatar.svg?1528812220123';
const project = {
  name: 'veil-can',
  avatarUrl: 'https://cdn.glitch.com/project-avatar/e3c4a224-de97-4253-b0d0-384c1b7be699.png?1564496385010',
}

const ANON_AVATAR_URL = 'https://cdn.glitch.com/f6949da2-781d-4fd5-81e6-1fdd56350165%2Fanon-user-on-project-avatar.svg?1488556279399';
const user = {
  name: 'Justin Falcone',
  avatarUrl: 'https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/user-avatar/560e4b07-a70b-4f87-b8d4-699d738792d0-large.jpg',
}

export const StoryAvatar_variants = () => (
  <Flex>
    <div>
      <h3>circle</h3>
      <Avatar variant="circle" src={user.avatarUrl} defaultSrc={ANON_AVATAR_URL} alt={user.name} />
    </div>
    <div>
      <h3>roundrect</h3>
      <Avatar variant="roundrect" src={project.avatarUrl} defaultSrc={DEFAULT_PROJECT_AVATAR_URL} alt={project.domain} />
    </div>
  </Flex>
)


const Container = styled.div`
  color: var(--colors-tertiary-text);
  background-color: var(--colors-tertiary-background);
  border-radius: var(--rounded);
  padding: var(--space-1);
  margin: var(--space-1) 0;
`

export const StoryAvatar_sizes = () => (
  <>
    <p>Avatars are block-level elements and are sized to fit their container.</p>
    <Container style={{ width: '80px' }}>
      <Avatar variant="circle" src={user.avatarUrl} defaultSrc={ANON_AVATAR_URL} alt={user.name} />
    </Container>
    <Container style={{ width: '300px' }}>
      <Avatar variant="circle" src={user.avatarUrl} defaultSrc={ANON_AVATAR_URL} alt={user.name} />
    </Container>
  </>
);
