import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { onArrowKeys } from './keyboard-navigation';
import { UnstyledButton } from './button';
import { withProps } from './util'

const ScrollContainer = styled.div`
  ${({ scroll }) => scroll && styled.css`
    overflow-y: scroll;
    max-height: 14rem;
  `}
`

const ResultsListContainer = styled.ul`
  margin: 0;
  padding: var(--space-1);
  list-style-type: none;
`

const ResultsListItemWrap = styled.li`
  & + & {
    border-top: 1px solid var(--colors-border);
  }
`

export const ResultsList = React.forwardRef(({ scroll, value, options, onChange, onKeyDown, children, ...props }, ref) => {
  const refs = React.useRef([]);
  
  const handleKeyDown = (index) => (e) => {
    onKeyDown(e); // propagate other events, e.g. Esc key
    const nextIndex = onArrowKeys(e, index, options);
    if (nextIndex === null) return;
    onChange(options[nextIndex].id, e);
    refs.current[nextIndex].focus();
  }
  
  return (
    <ScrollContainer data-module="ResultsList" scroll={scroll} {...props}>
      <ResultsListContainer>
        {options.map((item, i) => (
          <ResultsListItemWrap key={item.id}>
            {children({
              item,
              ref: (el) => {
                refs.current[i] = el;
              },
              tabIndex: value === item.id ? 0 : -1,
              onKeyDown: handleKeyDown(i),
            })}
          </ResultsListItemWrap>
        ))}
      </ResultsListContainer>
    </ScrollContainer>
  )
});

ResultsList.defaultProps = {
  onKeyDown: () => {},
}

export const ResultInfo = withProps(styled.span`
  display: block;
  padding-left: var(--space-2);
  width: 100%;
`, { 'data-module': "ResultInfo" })

export const ResultName = withProps(styled.span`
  font-size: var(--fontSizes-small);
`, { 'data-module': "ResultName" })

export const ResultDescription = withProps(styled.span`
  display: block;
  color: var(--colors-secondary);
  word-break: break-word;
  font-family: var(--fonts-mono);
  font-size: var(--fontSizes-tiny);
  line-height: 1.5;
  padding-top: var(--space-1);
`, { 'data-module': "ResultDescription" })

export const ResultItem = withProps(styled.span`
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
`, { 'data-module': "ResultItem" })

ResultItem.defaultProps = {
  as: UnstyledButton,
}


const resultOptions = [
  { id: 1, domain: 'power-passenger', description: 'take 2 on glitch component library' },
  { id: 2, domain: 'fan-coal', description: 'The Glitch community site' },
]

const Container = styled.div`
  
`

export const StoryResultsList = () => {
  const [value, onChange] = React.useState(resultOptions[0].id)
  return (
    <Container>
      <ResultsList value={value} onChange={(e) => onChange(e)} options={resultOptions}>
        {({ item, ...props }) => (
          <ResultItem as="a" href={`/~${item.domain}`} {...props}>
            <ResultInfo>
              <ResultName>{item.domain}</ResultName>
              {item.description && <ResultDescription>{item.description}</ResultDescription>}
            </ResultInfo>
          </ResultItem>
        )}
      </ResultsList>
    </Container>
  ) 
}