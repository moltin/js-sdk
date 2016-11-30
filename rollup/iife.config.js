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
      browser: true
    }),
    commonjs(),
    buble(),
    uglify()
  ],
  context: 'window',
  dest: pkg['browser'],
  format: 'iife',
  sourceMap: true,
  moduleName: 'moltin',
  globals: {
    'fetch-everywhere': 'fetch',
    'es6-promise': 'Promise'
  }
};
