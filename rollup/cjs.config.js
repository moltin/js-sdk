/* jshint node: true */

import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const pkg = require('../package.json');

export default {
  entry: 'src/moltin.js',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      skip: [
        'fetch-everywhere',
        'es6-promise'
      ]
    }),
    commonjs(),
    buble(),
    uglify()
  ],
  dest: pkg['main'],
  format: 'cjs',
  sourceMap: true
};
