import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { CodeExample, PropsDefinition, Prop } from './story-utils';
import { TextInput } from './text-input';

const Image = React.forwardRef(({ src, defaultSrc, alt, ...props }, ref) => {
  const [activeSrc, setActiveSrc] = React.useState(src || defaultSrc);
  React.useEffect(() => {
    setActiveSrc(src || defaultSrc);
  }, [src, defaultSrc]);

  const onError = () => {
    if (defaultSrc && activeSrc !== defaultSrc) {
      setActiveSrc(defaultSrc);
    }
  };

  return <img ref={ref} src={activeSrc} onError={onError} alt={alt} {...props} />;
});

Image.displayName = 'Image';

const variants = {
  roundrect: css`
    border-radius: var(--rounded);
  `,
  circle: css`
    border-radius: 100%;
  `,
  square: css``,
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
        The shape of the avatar image: "circle" or "roundrect" or "square".
      </Prop>
    </PropsDefinition>
  </>
);

const Container = styled.div`
  color: var(--colors-tertiary-text);
  background-color: var(--colors-tertiary-background);
  border-radius: var(--rounded);
  padding: var(--space-1);
  margin: var(--space-1) 0;
`;

const Flex = styled(Container)`
  display: flex;
  width: 300px;
  > * {
    flex: 1 1 auto;
    text-align: center;
  }
  > * + * {
    margin-left: var(--space-1);
  }
`;

const DEFAULT_PROJECT_AVATAR_URL = 'https://cdn.glitch.com/c53fd895-ee00-4295-b111-7e024967a033%2Ffallback-project-avatar.svg?1528812220123';
const project = {
  domain: 'veil-can',
  avatarUrl: 'https://cdn.glitch.com/project-avatar/e3c4a224-de97-4253-b0d0-384c1b7be699.png?1564496385010',
};

export const StoryAvatar_sizes = () => (
  <>
    <p>Avatars are block-level elements and are sized to fit their container.</p>
    <Container style={{ width: '80px' }}>
      <Avatar variant="roundrect" src={project.avatarUrl} defaultSrc={DEFAULT_PROJECT_AVATAR_URL} alt={project.domain} />
    </Container>
    <Container style={{ width: '300px' }}>
      <Avatar variant="roundrect" src={project.avatarUrl} defaultSrc={DEFAULT_PROJECT_AVATAR_URL} alt={project.domain} />
    </Container>
  </>
);

export const StoryAvatar_variants = () => (
  <Flex>
    <div>
      <h3>roundrect</h3>
      <Avatar variant="roundrect" src={project.avatarUrl} defaultSrc={DEFAULT_PROJECT_AVATAR_URL} alt={project.domain} />
    </div>
    <div>
      <h3>circle</h3>
      <Avatar variant="circle" src={project.avatarUrl} defaultSrc={DEFAULT_PROJECT_AVATAR_URL} alt={project.domain} />
    </div>
    <div>
      <h3>square</h3>
      <Avatar variant="square" src={project.avatarUrl} defaultSrc={DEFAULT_PROJECT_AVATAR_URL} alt={project.domain} />
    </div>
  </Flex>
);

const AvatarContainer = styled.div`
  width: 100px;
  margin: var(--space-2);
`;

export const StoryAvatar_defaultSrc = () => {
  const [src, setSrc] = React.useState(null);
  return (
    <>
      <p>If src is not present or the image at the URL does not load, Avatar shows the image at defaultSrc instead.</p>
      <div>
        <TextInput value={src} onChange={setSrc} placeholder="img src" label="img src" />
      </div>
      <AvatarContainer>
        <Avatar variant="square" src={src} defaultSrc={DEFAULT_PROJECT_AVATAR_URL} alt="" />
      </AvatarContainer>
    </>
  );
};
