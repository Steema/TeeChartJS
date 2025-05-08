import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js', // Ahora el entrypoint es el archivo que importa todos los módulos
  output: {
    file: 'dist/teechart.umd.min.js',
    format: 'umd',
    name: 'TeeChart', // Cambia el nombre global si es necesario
    sourcemap: true
  },
  plugins: [resolve(), commonjs(), terser()]
}
