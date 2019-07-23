import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { RootStyle } from './system';
import * as themes from './theme';

import * as animationContainer from './animation-container';
import * as badge from './badge';
import * as button from './button';
import * as checkboxButton from './checkbox-button';
import * as icon from './icon';
import * as loader from './loader';
import * as mark from './mark';
import * as notification from './notification';
import * as overlay from './overlay';
import * as popover from './popover';
import * as progress from './progress';
import * as resultsList from './results-list';
import * as searchResults from './search-results';
import * as segmentedButton from './segmented-button';
import * as textInput from './text-input';
import * as text from './text';
import * as thanks from './thanks';

const modules = [
  animationContainer,
  badge,
  button,
  checkboxButton,
  icon,
  loader,
  mark,
  notification,
  overlay,
  popover,
  progress,
  resultsList,
  searchResults,
  segmentedButton,
  textInput,
  text,
  thanks,
];

const getStories = (module) => {
  const stories = [];
  for (const [name, value] of Object.entries(module)) {
    if (name.startsWith('Story')) {
      stories.push({
        id: name.replace(/^Story/, '').toLowerCase(),
        name: name.replace(/^Story/, '').replace(/_/g, ' '),
        Component: value,
      });
    }
  }
};

const { ThemeProvider } = styled;
const themeOptions = Object.entries(themes).map(([name, theme]) => ({ id: name, label: name }));

const Select = ({ value, options, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value, e)}>
    {options.map(({ id, label }) => (
      <option key={id} value={id}>
        {label}
      </option>
    ))}
  </select>
);

const Main = styled.main`
  margin: 0 auto;
  padding: var(--space-2);
  max-width: 1080px;
`;

const SectionLink = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Section = styled.section`
  padding: var(--space-3) 0;
`;

const SectionH = styled.h1`
  color: var(--colors-secondary);
  padding: 0 0 var(--space-1);
  //border-bottom: 1px solid var(--colors-border);
  margin: 0 auto var(--space-2);
`;

const Code = styled.pre`
  font-family: var(--fonts-mono);
  border-radius: var(--rounded);
  background-color: var(--colors-secondaryBackground);
  padding: var(--space-1);
  margin-top: var(--space-2);
  overflow: scroll;
`;

const PropTypes = ({ props }) => (
  <ul>
    {Object.entries(props).map(([key, value]) => (
      <li key={key}>
        {key}: {value.toString()}
      </li>
    ))}
  </ul>
);

const AppContainer = () => {
  const [value, onChange] = React.useState(themeOptions[0].id);
  return (
    <ThemeProvider theme={themes[value]}>
      <Main>
        <RootStyle />
        <SectionH>Themes</SectionH>
        <Select value={value} onChange={(val) => onChange(val)} options={themeOptions} />
        {modules.map((module, i) => (
          <div key={i}>
            {Object.entries(module).map(
              ([name, Component]) =>
                name.startsWith('Story') && (
                  <Section id={name} key={name}>
                    <SectionLink href={`#${name}`}>
                      <SectionH as="h2">{name.replace(/_/g, ' ').replace('Story', '')}</SectionH>
                    </SectionLink>
                    <Component />
                  </Section>
                ),
            )}
          </div>
        ))}
      </Main>
    </ThemeProvider>
  );
};

const root = document.getElementById('root');
ReactDOM.render(<AppContainer />, root);
