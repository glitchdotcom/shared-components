import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { onArrowKeys } from './keyboard-navigation';
import { UnstyledButton } from './button';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

const ScrollContainer = styled.div`
  ${({ scroll }) =>
    scroll &&
    css`
      overflow-y: scroll;
      max-height: 14rem;
    `}
`;

const ResultsListContainer = styled.ul`
  margin: 0;
  padding: var(--space-1);
  list-style-type: none;
  border: 1px solid var(--colors-border);
`;

const ResultItemWrap = styled.li``;

export const ResultsList = React.forwardRef(({ scroll, value, options, onChange, onKeyDown, children, ...props }, ref) => {
  const refs = React.useRef([]);

  const handleKeyDown = (index) => (e) => {
    onKeyDown(e); // propagate other events, e.g. Esc key
    const nextIndex = onArrowKeys(e, index, options);
    if (nextIndex === null) return;
    onChange(options[nextIndex].id, e);
  };

  const currentIndex = options.findIndex((opt) => opt.id === value);
  React.useEffect(() => {
    const element = refs.current[currentIndex];
    if (element) element.focus();
  }, [currentIndex]);

  const getTabIndex = (i) => {
    if (value === null && i === 0) return 0;
    if (value === options[i].id) return 0;
    return -1;
  };

  return (
    <ScrollContainer data-module="ResultsList" scroll={scroll} {...props}>
      <ResultsListContainer>
        {options.map((item, i) => (
          <ResultItemWrap key={item.id}>
            {children({
              item,
              ref: (el) => {
                refs.current[i] = el;
              },
              tabIndex: getTabIndex(i),
              onKeyDown: handleKeyDown(i),
            })}
          </ResultItemWrap>
        ))}
      </ResultsListContainer>
    </ScrollContainer>
  );
});
ResultsList.propTypes = {
  scroll: PropTypes.bool,
  value: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
    }).isRequired,
  ),
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  children: PropTypes.func.isRequired,
};
ResultsList.defaultProps = {
  onKeyDown: () => {},
};

export const ResultInfo = styled.span.attrs(() => ({ 'data-module': 'ResultInfo'}))`
  display: block;
  padding-left: var(--space-2);
  width: 100%;
`

export const ResultName = styled.span.attrs(() => ({ 'data-module': 'ResultName' }))`
  font-size: var(--fontSizes-small);
`

export const ResultDescription = styled.span.attrs(() => ({ 'data-module': 'ResultDescription' }))`
  display: block;
  color: var(--colors-secondary);
  word-break: break-word;
  font-family: var(--fonts-mono);
  font-size: var(--fontSizes-tiny);
  line-height: 1.5;
  padding-top: var(--space-1);
`

// This is defined as a <span>, but is actually <UnstyledButton> by default,
// and could also work as an <a>.
// Its defined as a span here so that it doesn't inherit the PropTypes of UnstyledButton
// when its being used as an <a>.
export const ResultItem = styled.span.attrs(() => ({ 'data-module': 'ResultItem' }))`
  display: flex;
  width: 100%;
  font-size: var(--fontSizes-normal);
  color: var(--colors-primary);
  background-color: var(--colors-background);
  position: relative;
  padding: var(--space-1);
  text-decoration: none;
  &:focus {
    color: var(--colors-selected-text);
    background-color: var(--colors-selected-background);
    ${ResultDescription} {
      color: var(--colors-selected-secondary);
    }
  }
  ${ResultItemWrap} + ${ResultItemWrap} & {
    border-top: 1px solid var(--colors-border);
  }
`

ResultItem.defaultProps = {
  as: UnstyledButton,
};

const resultOptions = [
  { id: 1, domain: 'power-passenger', description: 'take 2 on glitch component library' },
  { id: 2, domain: 'fan-coal', description: 'The Glitch community site' },
];

const Container = styled.div`
  width: 20rem;
`;

export const StoryResultsList = () => {
  const [value, onChange] = React.useState(null);
  return (
    <>
      <p>
        The ResultsList component renders a keyboard-navigable list of buttons or links, with optional scrolling.
        It is intended to be used with components composed from ResultItem, ResultInfo, ResultName and ResultDescription.
      </p>
      <CodeExample>
        {code`
          <ResultsList value={value} onChange={(e) => onChange(e)} options={resultOptions}>
          {({ item, ...props }) => (
            <ResultItem onClick={() => addProjectToCollection(item.id)} {...props}>
              <ResultInfo>
                <ResultName>{item.name}</ResultName>
                <ResultDescription>{item.description}</ResultDescription>
              </ResultInfo>
            </ResultItem>
          )}
        </ResultsList>
        `}
      </CodeExample>
      <Container>
        <ResultsList value={value} onChange={(e) => onChange(e)} options={resultOptions}>
          {({ item, ...props }) => (
            <ResultItem as="a" href={`https://glitch.com/~${item.domain}`} {...props}>
              <ResultInfo>
                <ResultName>{item.domain}</ResultName>
                {item.description && <ResultDescription>{item.description}</ResultDescription>}
              </ResultInfo>
            </ResultItem>
          )}
        </ResultsList>
      </Container>
    </>
  );
};

