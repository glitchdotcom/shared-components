import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled';
import { lightTheme, RootStyle, createRemoteComponent } from '@glitch/shared-components';

const Icon = createRemoteComponent('https://power-passenger.glitch.me/module.js', 'Icon');

const AppContainer = () => (
  <ThemeProvider theme={lightTheme}>
    <main>
      <RootStyle />
      <h1>Test remote component</h1>
      <Icon icon="pushpin" size="huge" />
    </main>
  </ThemeProvider>
);

const root = document.getElementById('root');
ReactDOM.render(<AppContainer />, root);
