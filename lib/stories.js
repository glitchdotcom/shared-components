import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import * as themes from './themes';

import * as avatar from './avatar';
import * as button from './button';
import * as checkboxButton from './checkbox-button';
import * as icon from './icon';
import * as loader from './loader';
import * as mark from './mark';
import * as system from './system';
import * as textInput from './text-input';
import * as themePreview from './theme-preview';
import * as visuallyHidden from './visually-hidden';

const modules = [avatar, button, checkboxButton, icon, loader, mark, system, textInput, themePreview, visuallyHidden];

const { RootStyle } = system;

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

const themeOptions = Object.entries(themes).map(([name, theme]) => ({ id: name, label: name }));

const AppContainer = () => {
  const [themeID, setThemeID] = React.useState(themeOptions[0].id);
  const theme = themes[themeID];

  return (
    <Main>
      <RootStyle theme={theme} />
      <h1>Glitch Shared Components</h1>
      <p>This is a library of React components used on Glitch's community site and editor.</p>
      <Select value={theme} onChange={(id) => setThemeID(id)} options={themeOptions} />
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
  );
};

const root = document.getElementById('root');
ReactDOM.render(<AppContainer />, root);
