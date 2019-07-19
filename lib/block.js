import styled from 'styled-components';

// used in popovers and overlays

const Section = styled.section`
  & + & {
    border-top: 1px solid var(--colors-border);
  }
`

export const Info = styled(Section)`
  color: var(--colors-primary);
  background-color: var(--colors-secondaryBackground);
  padding: var(--space-1);
  border-top: 1px solid var(--colors-border);
`;

export const Actions = styled(Section)`
  color: var(--colors-primary);
  background-color: var(--colors-background);
  padding: var(--space-1);
`;

export const DangerZone = styled(Section)`
  color: var(--colors-warning-text);
  background-color: var(--colors-warning-background);
  padding: var(--space-1);
`;
