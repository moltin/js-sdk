/* eslint import/no-unresolved: "off",
          import/no-extraneous-dependencies: "off"
*/

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
      browser: true,
      jsnext: true,
    }),
    commonjs(),
    buble({
      exclude: 'package.json',
    }),
    uglify(),
    json(),
  ],
  dest: pkg.browser,
  exports: 'named',
  format: 'umd',
  moduleName: 'moltin',
  context: 'self',
};
