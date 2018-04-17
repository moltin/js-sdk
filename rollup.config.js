import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'

const pkg = require('./package.json')

export default {
  input: 'src/moltin.js',
  watch: {
    include: 'src/**'
  },
  external: ['es6-promise', 'fetch-everywhere'],
  plugins: [
    resolve({
      browser: true,
      jsnext: true
    }),
    commonjs(),
    buble({
      exclude: 'package.json',
      objectAssign: 'Object.assign'
    }),
    uglify(),
    json()
  ],
  output: [
    {
      file: pkg['cjs:main'],
      exports: 'named',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.browser,
      exports: 'named',
      format: 'umd',
      name: 'moltin',
      globals: {
        inflected: 'inflected'
      }
    }
  ]
}
