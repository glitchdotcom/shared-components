const sucrase = require('rollup-plugin-sucrase');

module.exports = {
  external: ['react', 'react-dom', 'prop-types', 'styled-components'],
  input: '/app/components/index.js',
  output: [
    {
      file: 'build/main.js',
      format: 'cjs',
    },
    {
      file: 'build/module.js',
      format: 'esm',
    }
  ],
  plugins: [
    // transpiler just for JSX -> JS
    // use babel + plugins on the _consumer_ side, if needed
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
}
