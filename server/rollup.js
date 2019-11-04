const rollup = require('rollup');

const rollupConfig = require('../rollup.config');
const { watchFiles } = require('./watch');

async function build({ filePath, bundleOptions, additionalConfig = {} }) {
  const bundle = await rollup.rollup({
    ...rollupConfig,
    ...additionalConfig,
    output: undefined,
    input: filePath,
  });
  const {
    output: [{ code, modules }],
  } = await bundle.generate(bundleOptions);
  return {
    code,
    filesToWatch: Object.keys(modules)
      .filter((fileName) => fileName.startsWith(__dirname))
      .sort(),
  };
}

function subscribe(config, filesToWatch) {
  const unsubscribe = watchFiles(filesToWatch, (eventType) => {
    cache[config.filePath] = build(config).then((result) => {
      if (eventType === 'rename' || filesToWatch.length !== result.filesToWatch.length) {
        unsubscribe();
        subscribe(config, result.filesToWatch);
      }
      return result.code;
    });
  });
}

async function buildAndWatch(config) {
  const { code, filesToWatch } = await build(config);
  subscribe(config, filesToWatch);
  return code;
}

const cache = {};

function getBundle(filePath, bundleOptions, additionalConfig) {
  if (!cache[filePath]) {
    cache[filePath] = buildAndWatch({ filePath, bundleOptions, additionalConfig });
  }
  return cache[filePath];
}

module.exports = { getBundle };
