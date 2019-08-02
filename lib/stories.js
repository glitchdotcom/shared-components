import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { RootStyle } from './system';
import * as themes from './themes';

import * as avatar from './avatar';
import * as button from './button';
import * as grid from './grid';
import * as icon from './icon';
import * as loader from './loader';
import * as textInput from './text-input';
import * as visuallyHidden from './visually-hidden';

const modules = [avatar, button, grid, icon, loader, textInput, visuallyHidden];

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
  max-width: 1200px;
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
