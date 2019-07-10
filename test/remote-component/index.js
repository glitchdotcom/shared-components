import React from 'react';
import ReactDOM from 'react-dom';
import { createRemoteComponent } from '@glitch/components'

const Button = createRemoteComponent('https://power-passenger.glitch.me/module.js', 'Button')
const onClick = () => console.log('clicked')
  
const AppContainer = () => (
  <main>
    <h1>Test remote component</h1>
    <Button onClick={onClick}>Click me</Button>
  </main>
)
  
const root = document.getElementById('root');
ReactDOM.render(<AppContainer />, root);
