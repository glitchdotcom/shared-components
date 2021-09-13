const express = require('express');
const app = express();
const path = require('path');

const { getBundle } = require('./rollup');
const { serveTest } = require('../test/remote-component/server');
const dotenv = require('dotenv');

dotenv.config();

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'styled-components': 'styled',
  'prop-types': 'PropTypes',
};

app.use(express.static('public'));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
 
app.get('/stories.js', async (req, res) => {
  const output = await getBundle(path.resolve(__dirname, '../lib/stories.js'), { format: 'iife', output: { name: 'glitchComponentLibrary' }, globals });
  res.type('js');
  res.send(output);
});

app.get('/module.js', async (req, res) => {
  const fullUrl = `https://${req.get('host')}${req.originalUrl}`;
  const output = await getBundle(path.resolve(__dirname, '../lib/index.js'), {
    format: 'umd',
    name: 'glitchComponentLibrary',
    amd: { id: fullUrl, define: 'defineSharedComponent' },
    exports: 'named',
    globals,
  });
  res.type('js');
  res.send(output);
});

serveTest(app);

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
