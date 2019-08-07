import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResultsList, ResultItem, ResultInfo, ResultName, ResultDescription } from './results-list';
import { TextInput } from './text-input';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

const FloatingResultsList = styled(ResultsList)`
  position: absolute;
  width: 100%;
  z-index: 1;
  background-color: var(--colors-background);
  display: none;
`;

const Container = styled.span`
  display: block;
  position: relative;
  &:focus-within ${FloatingResultsList} {
    display: block;
  }
`;

export const SearchResults = ({ value, options, onChange, onKeyDown, children, ...props }) => {
  const [focused, setFocused] = React.useState(null);
  const inputFocused = () => {
    setFocused(null);
  };
  const firstOptionFocused = () => {
    if (options.length) {
      setFocused(options[0].id);
    }
  };

  return (
    <Container data-module="SearchResults">
      <TextInput
        type="search"
        variant="opaque"
        value={value}
        onChange={onChange}
        onFocus={inputFocused}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault(); // don't clear the search results
            e.target.blur();
          }
          if (e.key === 'ArrowDown') firstOptionFocused();
          onKeyDown(e);
        }}
        {...props}
      />
      <FloatingResultsList
        value={focused}
        onChange={(id) => setFocused(id)}
        options={options}
        onKeyDown={(e) => {
          if (e.key === 'Escape') e.target.blur();
        }}
      >
        {children}
      </FloatingResultsList>
    </Container>
  );
};
SearchResults.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
    }).isRequired,
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};
SearchResults.defaultProps = {
  onKeyDown: () => {},
};

const resultOptions = [
  { id: 2, type: 'project', domain: 'community', description: 'The Glitch community site' },
  { id: 3, type: 'project', domain: 'jet-accelerator', description: 'Feature: results list' },
  { id: 1, type: 'project', domain: 'power-passenger', description: 'take 2 on glitch component library' },
];

export const StorySearchResults = () => {
  const [query, setQuery] = React.useState('');
  const filteredOptions = React.useMemo(() => {
    const options = resultOptions.filter((opt) => opt.domain.includes(query.trim()));
    return options;
  }, [query]);

  const searchForQuery = (e) => {
    e.preventDefault();
    window.location = `https://glitch.com/search?q=${query}`;
  };

  return (
    <>
      <p>
        The SearchResults component combines a search TextInput with a ResultsList to make a search box with result previews. Tab toggles from the
        search box to the results, and arrow keys navigate the results.
      </p>
      <CodeExample>
        {code`
          <SearchResults label="projects search" value={query} onChange={setQuery} options={filteredOptions}>
            {({ item, buttonProps }) => (
              <ResultItem onClick={() => selectProject(item.id)} {...buttonProps}>
                <ResultInfo>
                  <ResultName>{item.domain}</ResultName>
                  {item.description && <ResultDescription>{item.description}</ResultDescription>}
                </ResultInfo>
              </ResultItem>
            )}
          </SearchResults>
        `}
      </CodeExample>
      <PropsDefinition>
        <Prop name="label" required>
          The label for the search box input.
        </Prop>
        <Prop name="value" required>
          The value of the search box input.
        </Prop>
        <Prop name="onChange" required>
          A callback function, which is called with the input's new value on change events.
        </Prop>
        <Prop name="options" required>
          The list of items to render. All items must have a unique value for the "id" property. You will probably want to generate or filter this
          list based on the query, but filtering is not handled by this component.
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

      <form onSubmit={searchForQuery}>
        <SearchResults label="projects search" value={query} onChange={(q) => setQuery(q)} options={filteredOptions}>
          {({ item, buttonProps }) => (
            <ResultItem as="a" href={`https://glitch.com/~${item.domain}`} {...buttonProps}>
              <ResultInfo>
                <ResultName>{item.domain}</ResultName>
                {item.description && <ResultDescription>{item.description}</ResultDescription>}
              </ResultInfo>
            </ResultItem>
          )}
        </SearchResults>
      </form>
    </>
  );
};

export const StorySearchResults_with_multiple_result_types = () => {
  const [query, setQuery] = React.useState('');
  const filteredOptions = React.useMemo(() => {
    const options = resultOptions.filter((opt) => opt.domain.includes(query.trim()));
    if (query.trim().length) {
      options.push({ type: 'showAllResults', id: 'showAllResults' });
    }
    return options;
  }, [query]);

  const searchForQuery = (e) => {
    e.preventDefault();
    window.location = `https://glitch.com/search?q=${query}`;
  };

  return (
    <>
      <p>You can render different kinds of results in a single list.</p>
      <CodeExample>
        {code`
          <SearchResults label="search" value={query} onChange={setQuery} options={filteredOptions}>
            {({ item, buttonProps }) => ({
              project: () => <ProjectItem project={item} {...buttonProps} />,
              showAllResults: () => <ShowAllResults query={query} {...buttonProps} />,
            })[item.type]()}
          </SearchResults>
        `}
      </CodeExample>
      <form onSubmit={searchForQuery}>
        <SearchResults label="projects search" value={query} onChange={(q) => setQuery(q)} options={filteredOptions}>
          {({ item, buttonProps }) =>
            ({
              project: () => (
                <ResultItem as="a" href={`https://glitch.com/~${item.domain}`} {...buttonProps}>
                  <ResultInfo>
                    <ResultName>{item.domain}</ResultName>
                    {item.description && <ResultDescription>{item.description}</ResultDescription>}
                  </ResultInfo>
                </ResultItem>
              ),
              showAllResults: () => (
                <ResultItem as="a" href={`https://glitch.com/search?q=${query}`} {...buttonProps}>
                  <ResultInfo>
                    <ResultName>Show all results for "{query}"</ResultName>
                  </ResultInfo>
                </ResultItem>
              ),
            }[item.type]())
          }
        </SearchResults>
      </form>
    </>
  );
};
