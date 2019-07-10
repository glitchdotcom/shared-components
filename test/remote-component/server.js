const { getBundle } = require('../../server/rollup');


const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'styled-components': 'styled',
  'prop-types': 'PropTypes',
  '@glitch/components': `window["https://power-passenger.glitch.me/module.js"]`,
};

const serveTest = (app) => {
  app.get('/test/remote-component/index.js', async (req, res) => {
    const output = await getBundle('/app/test/remote-component/index.js', { format: 'iife', globals });
    res.type('js');
    res.send(output);
  });
  
  app.get('/test/remote-component', (req, res) => {
    res.sendFile('/app/test/remote-component/index.html')
  })
}

module.exports = { serveTest }
