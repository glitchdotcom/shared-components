import styled from 'styled-components';
import { withDataModule } from './util';

// used in popovers and overlays

const Section = styled.section`
  padding: var(--space-1);
  border-top: 1px solid var(--colors-border);
  &:first-child {
    border-top: none;
  }
  // TODO: why doesnt '& + & { ... }' work here?
`;

export const Info = withDataModule("Info", styled(Section)`
  color: var(--colors-primary);
  background-color: var(--colors-secondaryBackground);
`);

export const Actions = withDataModule("Actions", styled(Section)`
  color: var(--colors-primary);
  background-color: var(--colors-background);
`);

export const DangerZone = withDataModule("DangerZone", styled(Section)`
  color: var(--colors-warning-text);
  background-color: var(--colors-warning-background);
`);
