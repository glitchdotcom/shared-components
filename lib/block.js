import React from 'react';
import styled, { css } from 'styled-components';
import { IconButton } from './icon-button';
import { CodeExample, PropsDefinition, Prop } from './story-utils';

const sectionVariants = {
  info: css`
    color: var(--colors-primary);
    background-color: var(--colors-secondaryBackground);
    border-top: 1px solid var(--colors-border);
  `,
  actions: css`
    color: var(--colors-primary);
    background-color: var(--colors-background);
    border-top: 1px solid var(--colors-border);
  `,
  warning: css`
    color: var(--colors-warning-text);
    background-color: var(--colors-warning-background);
    border-top: 1px solid var(--colors-border);
  `,
  banner: css`
    color: var(--colors-primary);
    background-color: var(--colors-background);
  `,
  alignrightbanner: css`
    text-align: right;
  `,
};

const titleVariants = {
  normal: css`
    color: var(--colors-primary);
    background-color: var(--colors-secondaryBackground);
  `,
  banner: css`
    color: var(--colors-primary);
    background-color: var(--colors-background);
  `,
};

// used in popovers and overlays

const TitleWrap = styled.header`
  display: flex;
  align-items: baseline;
  font-size: var(--fontSizes-small);
  padding: var(--space-1);
  ${({ variant }) => titleVariants[variant]};
`;

const TitleContent = styled.h2`
  flex: 1 1 auto;
  margin: 0;
  padding: 0;
  font-size: var(--fontSizes-small);
`;

TitleWrap.defaultProps = {
  variant: 'normal',
};

export const Title = ({ children, onBack, onBackRef, variant, onClose, onCloseRef, ...props }) => (
  <TitleWrap data-module="Title" variant={variant} {...props}>
    {onBack && <IconButton onClick={onBack} ref={onBackRef} icon="chevronLeft" label="Back" />}
    <TitleContent>{children}</TitleContent>
    {onClose && <IconButton onClick={onClose} ref={onCloseRef} icon="x" label="Close" />}
  </TitleWrap>
);

const Section = styled.section`
  padding: var(--space-1);
  margin: 0;
  ${({ variant }) => sectionVariants[variant]};
  &:first-child {
    border-top: none;
  }
`;

export const Info = (props) => <Section data-module="Info" variant="info" {...props} />;

export const Actions = (props) => <Section data-module="Actions" variant="actions" {...props} />;

export const DangerZone = (props) => <Section data-module="DangerZone" variant="warning" {...props} />;

const Container = styled.div`
  margin: var(--space-1) 0;
  font-size: var(--fontSizes-small);
  border-radius: var(--rounded);
  overflow: hidden;
  border: 1px solid var(--colors-border);
  box-shadow: var(--popShadow);
  width: 400px;
`;

export const Story_Blocks_for_Overlay_and_Popover_content = () => (
  <>
    <p>The Title component is used for rendering headers in Overlay and Popover components.</p>
    <CodeExample>{`<Title onBack={onBack}>Your Projects</Title>`}</CodeExample>
    <PropsDefinition>
      <Prop name="onBack">
        A callback function typically called to render the previous view in a multi-page popover; when present, this renders a "chevronLeft" icon
        button.
      </Prop>
      <Prop name="onClose">A callback function typically called to close the popover or overlay; when present, this renders an "x" icon button.</Prop>
      <Prop name="onBackRef">A ref to the "onBack" button.</Prop>
      <Prop name="onCloseRef">A ref to the "onClose" button.</Prop>
      <Container>
        <Title onBack={() => console.log('onBack')}>Your Projects</Title>
      </Container>
    </PropsDefinition>
    <p>
      The Info, Actions, and DangerZone components are used for rendering sections in Overlay and Popover components. They have no component-specific
      props.
    </p>
    <Container>
      <Info>
        <p>The Info section is used for explanatory text or form fields.</p>
      </Info>
      <Actions>
        <p>The Actions section is used for buttons and results lists.</p>
      </Actions>
      <DangerZone>
        <p>The DangerZone section is used for destructive actions (e.g. deleting projects).</p>
      </DangerZone>
    </Container>
  </>
);
