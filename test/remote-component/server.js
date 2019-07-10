const { getBundle } = require('../../server/rollup');

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'styled-components': 'styled',
  'prop-types': 'PropTypes',
  '@glitch/components': 'glitch-component-library'
};

const serveTest = (app) => {
  app.get('/stories.js', async (req, res) => {
    const output = await getBundle('/app/test/remote-component/index.js', { format: 'iife', output: { name: 'test' }, globals });
    res.type('js');
    res.send(output);
  });
}

module.exports = { serveTest }
