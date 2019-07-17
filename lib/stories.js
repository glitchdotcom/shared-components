import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { RootStyle } from './system';
import * as themes from './theme';

import * as button from './button';
import * as segmentedButton from './segmented-button';
import * as icon from './icon';
import * as popover from './popover/index';
import * as overlay from './overlay';
import * as checkboxButton from './checkbox-button';
import * as textInput from './text-input';

const modules = [button, segmentedButton, checkboxButton, popover, overlay, icon, textInput];

const stories = [];
for (const module of modules) {
  for (const [name, value] of Object.entries(module)) {
    if (name.startsWith('story_')) {
      stories.push({ name: name.replace(/^story_/, '').replace(/_/g, ' '), Component: value });
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
        {stories.map(({ name, Component }) => (
          <section id={name} key={name}>
            <h1>{name}</h1>
            <Component />
          </section>
        ))}
        <h2>Themes</h2>
        <Select value={value} onChange={onChange} options={themeOptions} />
      </Main>
    </ThemeProvider>
  );
};

const root = document.getElementById('root');
ReactDOM.render(<AppContainer />, root);
