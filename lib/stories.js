import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import * as themes from './themes';
import { code, CodeExample } from './story-utils';

import * as animationContainer from './animation-container';
import * as avatar from './avatar';
import * as badge from './badge';
import * as block from './block';
import * as button from './button';
import * as buttonGroup from './button-group';
import * as checkboxButton from './checkbox-button';
import * as icon from './icon';
import * as iconButton from './icon-button';
import * as loader from './loader';
import * as mark from './mark';
import * as notification from './notification';
import * as overlay from './overlay';
import * as popover from './popover';
import * as progress from './progress';
import * as resultsList from './results-list';
import * as searchResults from './search-results';
import * as system from './system';
import * as textInput from './text-input';
import * as themePreview from './theme-preview';
import * as toggle from './toggle';
import * as tooltip from './tooltip';
import * as visuallyHidden from './visually-hidden';
import * as optimisticInputs from './optimistic-inputs';

const modules = [
  animationContainer,
  avatar,
  badge,
  block,
  button,
  buttonGroup,
  checkboxButton,
  icon,
  iconButton,
  loader,
  mark,
  notification,
  optimisticInputs,
  overlay,
  popover,
  progress,
  resultsList,
  searchResults,
  system,
  textInput,
  themePreview,
  toggle,
  tooltip,
  visuallyHidden,  
];

const { RootStyle } = system;

const Select = ({ value, options, onChange }) => (
  // eslint-disable-next-line jsx-a11y/no-onchange
  <select value={value} onChange={(e) => onChange(e.target.value, e)}>
    {options.map(({ id, label }) => (
      <option key={id} value={id}>
        {label}
      </option>
    ))}
  </select>
);


const Wrapper = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
`;

const Nav = styled.div`
  position: sticky;
  top: 5em;
  height: calc(100vh - 5em);
  overflow: auto;
  flex: 0 0 15%;
  border-right: 1px solid var(--colors-border);  
  @media (max-width: 1200px){
    display: none;
  }
`;

const NavLink = styled.a`
  margin: 0.5em 0;
  display: block;
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Main = styled.main`
  flex: 0 0 85%;
  padding: var(--space-2);
  max-width: 900px;
  code {
    font-family: var(--fonts-mono);
    font-size: 1em;
  }
  @media (max-width: 1200px){
    max-width: 1200px;
    flex: inherit;
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
  color: var(--colors-primary);
  padding: 0 0 var(--space-1);
  margin: 0 auto var(--space-2);
`;

const themeOptions = Object.entries(themes).map(([name]) => ({ id: name, label: name }));

const AppContainer = () => {
  const [themeID, setThemeID] = React.useState(themeOptions[0].id);

  return (
    <>
    <Wrapper>
      <Nav>
        {modules.map((module) => (
          Object.entries(module).map(
            ([name], i) => 
              (name.startsWith('Story') && !name.includes('_')) && (
                <NavLink href={`#${name}`} key={name+i}>
                  {name.replace(/_/g, ' ').replace('Story', '')}
                </NavLink>
              )
            ) 
          ),
        )}
      </Nav>
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
            import { RootStyle, lightTheme, Button } from '@glitchdotcom/shared-components'
            
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
    </Wrapper>
    </>
  );
};

const root = document.getElementById('root');
ReactDOM.render(<AppContainer />, root);
