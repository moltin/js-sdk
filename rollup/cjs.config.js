import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

const pkg = require('./package.json');

export default {
  entry: 'src/moltin.js',
  plugins: [
    resolve({
      jsnext: true,
    }),
    commonjs(),
    buble({
      exclude: 'package.json',
    }),
    uglify(),
    json(),
  ],
  external: [
    'fetch-everywhere',
    'es6-promise',
  ],
  dest: pkg['cjs:main'],
  exports: 'named',
  format: 'cjs',
  sourceMap: true,
};
