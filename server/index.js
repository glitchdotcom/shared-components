const express = require('express');
const app = express();

const { getBundle } = require('./rollup');

app.use(express.static('public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const external = ['glitch-component-library', 'react', 'react-dom', 'prop-types', 'styled-components'];

app.get('/stories.js', async (req, res) => {
  const output = await getBundle(
    '/app/components/stories.js', 
    { external, bundleOptions: { format: 'iife', output: { name: 'glitchComponentLibrary' } } }
  );
  res.type('js');
  res.send(output);
});

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
