import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled';
import { lightTheme, RootStyle, createRemoteComponent } from '@glitch/components'

const Button = createRemoteComponent('https://power-passenger.glitch.me/module.js', 'Button')
const onClick = () => console.log('clicked')

const AppContainer = () => (
  <ThemeProvider theme={lightTheme}>
    <main>
      <RootStyle />
      <h1>Test remote component</h1>
      <Button onClick={onClick}>Click me</Button>
    </main>
  </ThemeProvider>
)
  
const root = document.getElementById('root');
ReactDOM.render(<AppContainer />, root);
