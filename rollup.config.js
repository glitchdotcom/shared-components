const babel = require('rollup-plugin-babel');

module.exports = {
  external: ['prop-types', 'react', 'react-dom', 'react-textarea-autosize', 'styled-components'],
  output: [
    {
      file: 'build/main.js',
      format: 'cjs',
    },
    {
      file: 'build/module.js',
      format: 'esm',
    },
  ],
  plugins: [
    // transpiler just for JSX -> JS
    babel({
      exclude: 'node_modules/**',
      plugins: ['styled-components', '@babel/plugin-transform-react-jsx'],
    }),
    // these might be needed eventually, but are not currently required
    //resolve({ preferBuiltins: false }),
    //commonjs(),
    //json(),
  ],
};
