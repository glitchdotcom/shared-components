import styled from 'styled-components';

export const CodeExample = styled.div`
  font-family: var(--fonts-mono);
  font-size: var(--fontSizes-big);
  background-color: var(--colors-secondaryBackground);
  padding: var(--space-2);
  
`;

// trim indentation for multiline strings
export const code = (...args) => {
  const base = String.raw(...args)
  const lines = base.split('\n')
  if (lines.length === 1) return lines[0].trim()
  const [initialWhitespace] = lines[1].match(/^\s*/)
  return lines
    .map(line => line.slice(initialWhitespace.length))
    .join('\n')
}