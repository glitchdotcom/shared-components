import React from 'react';
import styled, { css } from 'styled-components';
import { IconButton } from './icon-button';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

// used in popovers and overlays

const TitleWrap = styled.header`
  display: flex;
  align-items: baseline;
  font-size: var(--fontSizes-big);
  padding: var(--space-1);
  background-color: var(--colors-secondaryBackground);
`;
const TitleContent = styled.h2`
  flex: 1 0 auto;
  margin: 0;
  padding: 0 var(--space-1);
  font-size: var(--fontSizes-big);
`;

export const Title = ({ children, onBack, onBackRef, onClose, onCloseRef, ...props }) => (
  <TitleWrap data-module="Title" {...props}>
    {onBack && <IconButton onClick={onBack} ref={onBackRef} icon="chevronLeft" label="Back" />}
    <TitleContent>{children}</TitleContent>
    {onClose && <IconButton onClick={onClose} ref={onCloseRef} icon="x" label="Close" />}
  </TitleWrap>
);

const variants = {
  info: css`
    color: var(--colors-primary);
    background-color: var(--colors-secondaryBackground);
  `,
  actions: css`
    color: var(--colors-primary);
    background-color: var(--colors-background);
  `,
  warning: css`
    color: var(--colors-warning-text);
    background-color: var(--colors-warning-background);
  `,
};

const Section = styled.section`
  padding: var(--space-1);
  ${({ variant }) => variants[variant]};
  border-top: 1px solid var(--colors-border);
  &:first-child {
    border-top: none;
  }
`;

export const Info = (props) => <Section data-module="Info" variant="info" {...props} />;

export const Actions = (props) => <Section data-module="Actions" variant="actions" {...props} />;

export const DangerZone = (props) => <Section data-module="DangerZone" variant="actions" {...props} />;

export const StoryBlocks_for_Overlay_and_Popover_content = () => (
  <>
    <p>The Title, Info, Actions, and DangerZone components are used for rendering sections in Overlay and Popover components.</p>
    <CodeExample>{`<Title onBack={onBack}>Your Projects</Title>`}</CodeExample>
  </>
);
