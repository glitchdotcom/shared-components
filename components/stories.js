import React from 'react';
import ReactDOM from 'react-dom';
import * as button from './button';

const modules = [button];
const stories = [];

for (const module of modules) {
  for (const [name, value] of Object.entries(module)) {
    if (name.startsWith('stories_')) {
      stories.push({ name: name.replace(/^stories_/, ''), Component: value });
    }
  }
}

const AppContainer = () => (
  <main>
    {stories.map(({ name, Component }) => (
      <section id={name} key={name}>
        <Component />
      </section>
    ))}
  </main>
);

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<AppContainer />, root);
});
