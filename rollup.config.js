import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import filesize from 'rollup-plugin-filesize'

import pkg from './package.json'

const { NODE_ENV = 'development' } = process.env
const isProd = NODE_ENV === 'production'
const isDev = NODE_ENV === 'development' && process.env.SERVE === 'true'

const baseConfig = {
  input: 'src/moltin.js',
  watch: {
    include: 'src/**'
  },
  external: ['es6-promise', 'fetch-everywhere'],
  plugins: [
    json(),
    babel({
      exclude: ['package.json', '**/node_modules/**'],
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-stage-3'
      ]
    }),
    filesize()
  ]
}

export default [
  {
    ...baseConfig,
    output: {
      name: 'moltin',
      exports: 'named',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      ...baseConfig.plugins,
      resolve({ browser: true }),
      commonjs(),
      isProd &&
        uglify({
          compress: {
            warnings: false
          }
        }),
      isDev && serve({ contentBase: ['dist', 'examples'], open: true }),
      isDev && livereload()
    ].filter(Boolean)
  },
  {
    ...baseConfig,
    output: {
      file: pkg['cjs:main'],
      format: 'cjs',
      exports: 'named'
    },
    external: [...baseConfig.external, ...Object.keys(pkg.dependencies || {})]
  },
  {
    ...baseConfig,
    output: {
      file: pkg.module,
      format: 'es'
    },
    external: [...baseConfig.external, ...Object.keys(pkg.dependencies || {})]
  }
]
