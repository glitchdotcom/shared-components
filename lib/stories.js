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
import * as segmentedButton from './segmented-button';
import * as textInput from './text-input';
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
  segmentedButton,
  textInput,
  thanks,
];

const stories = [];
for (const module of modules) {
  for (const [name, value] of Object.entries(module)) {
    if (name.startsWith('Story')) {
      stories.push({ name: name.replace(/^Story/, '').replace(/_/g, ' '), Component: value });
    }
  }
}

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

const AppContainer = () => {
  const [value, onChange] = React.useState(themeOptions[0].id);
  return (
    <ThemeProvider theme={themes[value]}>
      <Main>
        <RootStyle />
        <h2>Themes</h2>
        <Select value={value} onChange={(val) => onChange(val)} options={themeOptions} />
        {stories.map(({ name, Component }) => (
          <section id={name} key={name}>
            <h1>{name}</h1>
            <Component />
          </section>
        ))}
      </Main>
    </ThemeProvider>
  );
};

const root = document.getElementById('root');
ReactDOM.render(<AppContainer />, root);
