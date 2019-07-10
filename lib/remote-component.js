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
  const onLoad = [];
  let loadedComponent = null;

  loadAMDModule(url).then((module) => {
    loadedComponent = module[componentName];
    onLoad.forEach((callback) => callback());
  });

  return (props) => {
    const [{ value: Component }, setComponent] = React.useState({ value: loadedComponent });
    React.useEffect(() => {
      onLoad.push(() => setComponent({ value: loadedComponent }));
    }, []);
    if (!Component) return null;
    return <Component {...props} />;
  };
}
