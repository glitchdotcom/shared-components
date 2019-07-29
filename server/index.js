const express = require('express');
const app = express();

const { getBundle } = require('./rollup');

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'styled-components': 'styled',
  'prop-types': 'PropTypes',
  'react-textarea-autosize': 'TextareaAutosize',
};

app.use(express.static('public'));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/stories.js', async (req, res) => {
  const output = await getBundle('/app/lib/stories.js', { format: 'iife', output: { name: 'glitchComponentLibrary' }, globals });
  res.type('js');
  res.send(output);
});

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
