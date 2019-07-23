import styled from 'styled-components';
import { withProps } from './util';

// used in popovers and overlays

const Section = styled.section`
  padding: var(--space-1);
  border-top: 1px solid var(--colors-border);
  &:first-child {
    border-top: none;
  }
  // TODO: why doesnt '& + & { ... }' work here?
`;

export const Info = withProps(styled(Section)`
  color: var(--colors-primary);
  background-color: var(--colors-secondaryBackground);
`, { 'data-module': "Info" });

export const Actions = withProps(styled(Section)`
  color: var(--colors-primary);
  background-color: var(--colors-background);
`, { 'data-module': 'Actions' });

export const DangerZone = withProps(styled(Section)`
  color: var(--colors-warning-text);
  background-color: var(--colors-warning-background);
`, { 'data-module': 'DangerZone'});
