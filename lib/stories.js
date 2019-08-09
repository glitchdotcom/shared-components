import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import * as themes from './themes';
import { code, CodeExample } from './story-utils';

import * as animationContainer from './animation-container';
import * as avatar from './avatar';
import * as block from './block';
import * as button from './button';
import * as buttonGroup from './button-group';
import * as checkboxButton from './checkbox-button';
import * as icon from './icon';
import * as iconButton from './icon-button';
import * as loader from './loader';
import * as mark from './mark';
import * as overlay from './overlay';
import * as popover from './popover';
import * as system from './system';
import * as textInput from './text-input';
import * as themePreview from './theme-preview';
import * as visuallyHidden from './visually-hidden';

const modules = [
  animationContainer,
  avatar,
  block,
  button,
  buttonGroup,
  checkboxButton,
  icon,
  iconButton,
  loader,
  mark,
  overlay,
  popover,
  system,
  textInput,
  visuallyHidden,
];

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
  code {
    font-family: var(--fonts-mono);
    font-size: 1em;
  }
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

const SectionH = styled.h2`
  color: var(--colors-secondary);
  padding: 0 0 var(--space-1);
  margin: 0 auto var(--space-2);
`;

const themeOptions = Object.entries(themes).map(([name, theme]) => ({ id: name, label: name }));

const AppContainer = () => {
  const [themeID, setThemeID] = React.useState(themeOptions[0].id);

  return (
    <Main>
      <RootStyle theme={themes[themeID]} />
      <header>
        <h1>Glitch Shared Components</h1>
        <p>This is a library of React components used on Glitch's community site and editor.</p>
        <Select value={themeID} onChange={(id) => setThemeID(id)} options={themeOptions} />
        <h2>Basic setup</h2>
        <p>
          These components are designed to work with multiple themes. In order to use these components, you will need to inject a theme using the{' '}
          <a href="#Story_RootStyle_and_LocalStyle">RootStyle or LocalStyle</a> components.
        </p>
        <CodeExample>
          {code`
            import React from 'react'
            import ReactDOM from 'react-dom'
            import { RootStyle, lightTheme, Button } from '@fogcreek/shared-components'
            
            ReactDOM.render(
              <main>
                <RootStyle theme={lightTheme} />
                <Button onClick={() => alert('clicked')}>Click Me</Button>
              </main>,
              document.getElementById('root')
            )
          `}
        </CodeExample>
      </header>

      {modules.map((module, i) => (
        <div key={i}>
          {Object.entries(module).map(
            ([name, Component]) =>
              name.startsWith('Story') && (
                <Section id={name} key={name}>
                  <SectionLink href={`#${name}`}>
                    <SectionH>{name.replace(/_/g, ' ').replace('Story', '')}</SectionH>
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
