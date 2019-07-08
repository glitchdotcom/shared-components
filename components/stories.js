import React from 'react';
import ReactDOM from 'react-dom';
import * as button from './button';

const modules = [button];
const stories = [];

for (const module of modules) {
  for (const [name, value] of Object.entries(module)) {
    if (name.startsWith('story_')) {
      stories.push({ name: name.replace(/^story_/, ''), Component: value });
    }
  }
}

const AppContainer = () => (
  <main>
    {stories.map(({ name, Component }) => (
      <section id={name} key={name}>
        <h1>{name}</h1>
        <Component />
      </section>
    ))}
  </main>
);

const root = document.getElementById('root');
ReactDOM.render(<AppContainer />, root);
