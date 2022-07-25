import { babel } from '@rollup/plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import filesize from 'rollup-plugin-filesize'
import dts from 'rollup-plugin-dts'

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
  plugins: [json(), filesize()]
}

const babelRollupPlugin = babel({
  babelHelpers: 'bundled',
  exclude: ['package.json', 'node_modules/**']
})

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
      /*
        babel plugin should be placed after commonjs
       https://github.com/rollup/plugins/tree/master/packages/babel#using-with-rollupplugin-commonjs
      */
      babelRollupPlugin,
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
    plugins: [...baseConfig.plugins, babelRollupPlugin],
    output: {
      file: pkg['cjs:main'],
      format: 'cjs',
      exports: 'named'
    },
    external: [...baseConfig.external, ...Object.keys(pkg.dependencies || {})]
  },
  {
    ...baseConfig,
    plugins: [...baseConfig.plugins, babelRollupPlugin],
    output: {
      file: pkg.module,
      format: 'es'
    },
    external: [...baseConfig.external, ...Object.keys(pkg.dependencies || {})]
  },
  {
    input: 'src/moltin.d.ts',
    output: [{ file: 'dist/moltin.d.ts', format: 'es' }],
    plugins: [dts()]
  }
]
