import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { onArrowKeys } from './keyboard-navigation';
import { UnstyledButton } from './button';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

const ScrollContainer = styled.div`
  border: 1px solid var(--colors-border);
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
`;

const ResultItemWrap = styled.li`
  border-bottom: 1px solid var(--colors-border);
  &:last-of-type {
    border-bottom: none;
  }
`;

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
              buttonProps: {
                ref: (el) => {
                  refs.current[i] = el;
                },
                tabIndex: getTabIndex(i),
                onKeyDown: handleKeyDown(i),
              },
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

export const ResultInfo = styled.span.attrs(() => ({ 'data-module': 'ResultInfo' }))`
  display: block;
  padding-left: var(--space-2);
  width: 100%;
`;

export const ResultName = styled.span.attrs(() => ({ 'data-module': 'ResultName' }))`
  font-size: var(--fontSizes-small);
`;

export const ResultDescription = styled.span.attrs(() => ({ 'data-module': 'ResultDescription' }))`
  display: block;
  color: var(--colors-secondary);
  word-break: break-word;
  font-family: var(--fonts-mono);
  font-size: var(--fontSizes-tiny);
  line-height: 1.5;
  padding-top: var(--space-1);
`;

// This is defined as a <span>, but is actually <UnstyledButton> by default,
// and could also work as an <a>.
// Its defined as a span here so that it doesn't inherit the PropTypes of UnstyledButton
// when its being used as an <a>.
export const ResultItem = styled.span.attrs(() => ({ 'data-module': 'ResultItem' }))`
  display: flex;
  width: 100%;
  font-size: var(--fontSizes-normal);
  color: var(--colors-primary);
  background-color: ${props => props.private ? "var(--colors-private-background);" : "var(--colors-background);"};
  position: relative;
  padding: var(--space-1);
  text-decoration: none;
  margin: var(--space-1) 0;

  &:focus,
  button:focus &,
  a:focus & {
    box-shadow: 0 0 0 1px white, 0 0 0 3px var(--colors-focused);
    outline-color: transparent;
    color: var(--colors-selected-text);
    background-color: var(--colors-selected-background);

    ${ResultDescription} {
      color: var(--colors-selected-secondary);
    }
  }
  &:hover,
  button:hover &,
  a:hover & {
    background-color: var(--colors-secondaryBackground);
    text-decoration: none;
  }
  &:active,
  button:active &,
  a:active & {
    color: var(--colors-selected-text);
    background-color: var(--colors-selected-background);
  }
`;

ResultItem.defaultProps = {
  as: UnstyledButton,
};

const resultOptions = [
  { id: 1, domain: 'power-passenger', description: 'take 2 on glitch component library', private: false },
  { id: 2, domain: 'fan-coal', description: 'The Glitch community site', private: true },
  { id: 3, domain: 'shared-components', description: 'how meta', private: false },
];

const Container = styled.div`
  width: 20rem;
`;

export const StoryResultsList = () => {
  const [value, onChange] = React.useState(null);
  return (
    <>
      <p>
        The ResultsList component renders a keyboard-navigable list of buttons or links, with optional scrolling. It is intended to be used with the
        components ResultItem, ResultInfo, ResultName and ResultDescription.
      </p>
      <CodeExample>
        {code`
          <ResultsList value={value} onChange={onChange} options={resultOptions}>
            {({ item, buttonProps }) => (
              <ResultItem onClick={() => addProjectToCollection(item.id)} {...buttonProps}>
                <ResultInfo>
                  <ResultName>{item.name}</ResultName>
                  <ResultDescription>{item.description}</ResultDescription>
                </ResultInfo>
              </ResultItem>
            )}
          </ResultsList>
        `}
      </CodeExample>
      <PropsDefinition>
        <Prop name="scroll">
          Whether the list should scroll. <code>true</code> or <code>false</code>.
        </Prop>
        <Prop name="options" required>
          The list of items to render. All items must have a unique value for the "id" property.
        </Prop>
        <Prop name="value" required>
          The id of the currently focused item.
        </Prop>
        <Prop name="onChange" required>
          A callback function called when an item is selected via the arrow keys.
        </Prop>
        <Prop name="children">
          A render prop that renders each item, which passes in an object with the following properties:
          <dl>
            <dt>item</dt>
            <dd>The item to render.</dd>
            <dt>buttonProps</dt>
            <dd>
              An object containing the props needed to control focus and keyboard navigation on the result items: "ref", "tabIndex" and "onKeyDown".
            </dd>
          </dl>
        </Prop>
      </PropsDefinition>
      <Container>
        <ResultsList value={value} onChange={(id) => onChange(id)} options={resultOptions}>
          {({ item, buttonProps }) => (
            <ResultItem as="a" href={`https://glitch.com/~${item.domain}`} private={item.private} {...buttonProps}>
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
