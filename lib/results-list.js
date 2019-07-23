import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { onArrowKeys } from './keyboard-navigation';
import { UnstyledButton } from './button';

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
              active: value === item.id,
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
  children: (props) => <DefaultResultItem {...props} />,
  onKeyDown: () => {},
}

export const ResultItem = styled.span`
  font-size: var(--fontSizes-normal);
  color: var(--colors-primary);
  background-color: var(--colors-background);
  position: relative;
  padding: var(--space-1);
  ${({ active }) => active && styled.css`
    color: var(--colors-selected-text);
    background-color: var(--colors-selected-background);
    ${ResultDescription} {
      color: var(--colors-selected-secondary);
    }
  `}
`

ResultItem.defaultProps = {
  as: UnstyledButton,
}

export const ResultDescription = styled.span`
  display: block;
  color: var(--colors-secondary);
  word-break: break-word;
  font-family: var(--fonts-mono);
  font-size: var(--fontSizes-tiny);
  line-height: 1.5;
  padding-top: var(--space-1);
`
export const ResultInfo = styled.span`
  display: block;
  padding-left: var(--space-2);
  width: 100%;
`
export const ResultName = styled.span`
  font-size: var(--fontSizes-small);
`

const DefaultResultItem = React.forwardRef(({ item, ...props  }, ref) => (
  <ResultItem ref={ref} {...props}>
    <ResultInfo>
      <ResultName>{item.label}</ResultName>
      {item.description && <ResultDescription>{item.description}</ResultDescription>}
    </ResultInfo>
  </ResultItem>
))

const resultOptions = [
  { id: 1, label: 'power-passenger', description: 'take 2 on glitch component library' },
  { id: 2, label: 'fan-coal', description: 'The Glitch community site' },
]

export const StoryResultsList = () => {
  const [value, onChange] = React.useState(resultOptions[0].id)
  return (
    <ResultsList value={value} onChange={onChange} options={resultOptions} />
  ) 
}