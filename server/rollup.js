const path = require('path');
const rollup = require('rollup');

const { watchFiles } = require('./watch');

async function build({ filePath, external, bundleOptions }) {
  const css = [];
  const rollupConfig = {
    input: filePath,
    external,
    plugins: [
      sucrase({
        include: ['**/*.js'],
        exclude: ['node_modules/**'],
        transforms: ['jsx']
      }),
      // these might be needed eventually, but are not currently required
      //resolve({ preferBuiltins: false }),
      //commonjs(),
      //json(),
    ],
  };

  const bundle = await rollup.rollup(rollupConfig);
  const {
    output: [{ code, modules }],
  } = await bundle.generate(bundleOptions);
  return {
    code,
    filesToWatch: Object.keys(modules)
      .filter((fileName) => fileName.startsWith('/app/'))
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

function getBundle(filePath, { external, bundleOptions }) {
  if (!cache[filePath]) {
    cache[filePath] = buildAndWatch({ filePath, external, bundleOptions });
  }
  return cache[filePath];
}

module.exports = { getBundle };
