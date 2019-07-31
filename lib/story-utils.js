import React from 'react';
import styled from 'styled-components';

export const CodeExample = styled.pre`
  font-family: var(--fonts-mono);
  font-size: var(--fontSizes-big);
  background-color: var(--colors-secondaryBackground);
  padding: var(--space-2);
`;

// trim indentation for multiline strings
export const code = (strings, ...interpolations) => {
  const base = strings.reduce((l, r) => `${l}${interpolations.shift()}${r}`);
  const lines = base.split('\n');
  if (lines.length === 1) return lines[0].trim();
  const [initialWhitespace] = lines[1].match(/^\s*/);
  return lines
    .map((line) => line.slice(initialWhitespace.length))
    .join('\n')
    .trim();
};

export const PropsDefinition = ({ children }) => (
  <>
    <h3>props</h3>
    <dl>{children}</dl>
  </>
);

export const Prop = ({ name, required, children }) => (
  <>
    <dt>
      {name} {required && <em>(required)</em>}
    </dt>
    <dd>{children}</dd>
  </>
);
