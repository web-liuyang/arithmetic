import path from 'path';

const resolveRoot = (url) => {
  return path.resolve('.', url);
};

import babel from '@rollup/plugin-babel';

import { uglify } from 'rollup-plugin-uglify';

const BABEL = babel({
  extensions: ['.js', '.ts'],
  exclude: 'node_modules/**',
  babelHelpers: 'bundled',
  presets: ['@babel/preset-env'],
});

const UGLIFY = uglify();

export default {
  input: resolveRoot('src/index.js'),
  output: [
    {
      // name: 'index.cjs.js',
      file: resolveRoot('dist/index.cjs.js'),
      format: 'cjs',
    },
    {
      // name: 'index.es.js',
      file: resolveRoot('dist/index.es.js'),
      format: 'es',
    },
  ],
  plugins: [BABEL, UGLIFY],
};
