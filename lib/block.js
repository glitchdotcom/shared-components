import React from 'react';
import styled from 'styled-components';
import { withProps } from './util';
import { IconButton } from './icon-button';

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

const Section = styled.section`
  padding: var(--space-1);
  border-top: 1px solid var(--colors-border);
  &:first-child {
    border-top: none;
  }
  // TODO: why doesnt '& + & { ... }' work here?
`;

export const Info = withProps(
  styled(Section)`
    color: var(--colors-primary);
    background-color: var(--colors-secondaryBackground);
  `,
  { 'data-module': 'Info' },
);

export const Actions = withProps(
  styled(Section)`
    color: var(--colors-primary);
    background-color: var(--colors-background);
  `,
  { 'data-module': 'Actions' },
);

export const DangerZone = withProps(
  styled(Section)`
    color: var(--colors-warning-text);
    background-color: var(--colors-warning-background);
  `,
  { 'data-module': 'DangerZone' },
);
