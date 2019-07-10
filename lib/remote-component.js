import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const amdExports = {};

function defineDefine() {
  if (window.define) return;
  window.define = (moduleName, deps, fn) => {
    const module = {
      exports: {},
      react: React,
      'prop-types': PropTypes,
      'styled-components': styled,
    };
    fn(...deps.map((name) => module[name]));
    amdExports[moduleName] = module.exports;
  };
  window.define.amd = true;
}

async function loadAMDModule(src) {
  defineDefine();
  // TODO: can this be replaced with `await import(src)` without webpack trying to intercept it?
  await new Promise((resolve, reject) => {
    const scriptTag = document.createElement('script');
    scriptTag.src = src;
    scriptTag.type = "module";
    scriptTag.onload = resolve;
    scriptTag.onerror = reject;
    document.body.appendChild(scriptTag);
  });
  return amdExports[src];
}

export function createRemoteComponent(url, componentName) {
  console.warn(`You are rendering a component from '${url}'. You should remove this before merging into production.`);

  const componentPromise = loadAMDModule(url).then((module) => module[componentName])

  return (props) => {
    // using setComponent({ value: Component }) as state value because React interprets
    // setComponent(Component) as setComponent((prevState) => nextState)
    const [{ value: Component }, setComponent] = React.useState({ value: null });
    React.useEffect(() => {
      componentPromise.then((loadedComponent) => {
        setComponent({ value: loadedComponent })
      })
    }, []);
    if (!Component) return null;
    return <Component {...props} />;
  };
}
