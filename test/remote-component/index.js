import React from 'react';
import ReactDOM from 'react-dom';
import styled, { ThemeProvider } from 'styled';
import { darkTheme, RootStyle, createRemoteComponent } from '@fogcreek/shared-components';

const Icon = createRemoteComponent('https://sour-environment.glitch.me/module.js', 'Icon');

const Main = styled.main`
  margin: 0 auto;
  padding: var(--space-2);
  max-width: 1200px;
`;

const AppContainer = () => (
  <ThemeProvider theme={darkTheme}>
    <Main>
      <RootStyle />
      <h1>Test remote component</h1>
      <Icon icon="pushpin" size="huge" />
    </Main>
  </ThemeProvider>
);

const root = document.getElementById('root');
ReactDOM.render(<AppContainer />, root);
