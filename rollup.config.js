import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import filesize from 'rollup-plugin-filesize'

import pkg from './package.json'

const { NODE_ENV } = process.env

const config = {
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
    })
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

if (NODE_ENV === 'production') {
  config.plugins.push(uglify())
}

if (process.env.SERVE === 'true') {
  config.plugins.push(
    serve({ contentBase: ['dist', 'examples'], open: true }),
    livereload()
  )
}

config.plugins.push(json(), filesize())

export default config
