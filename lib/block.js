import styled from 'styled-components';

// used in popovers and overlays

const Section = styled.section`
  padding: var(--space-1);
  border-top: 1px solid var(--colors-border);
  &:first-child {
    border-top: none;
  }
  // TODO: why doesnt '& + & { ... }' work here?
`

export const Info = styled(Section)`
  color: var(--colors-primary);
  background-color: var(--colors-secondaryBackground);
`;

export const Actions = styled(Section)`
  color: var(--colors-primary);
  background-color: var(--colors-background);
`;

export const DangerZone = styled(Section)`
  color: var(--colors-warning-text);
  background-color: var(--colors-warning-background);
`;
