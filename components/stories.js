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
console.log(modules)

const AppContainer = () => (
  <main>
    {stories.map(({ name, Component }) => (
      <section id={name} key={name}>
        <Component />
      </section>
    ))}
  </main>
);

const root = document.getElementById('root');
ReactDOM.render(<AppContainer />, root);
