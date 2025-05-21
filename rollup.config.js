import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import fs from 'fs'
import path from 'path'

const UMD_DIST = 'src'
const UMD_FILES = ['source/teechart.js']
const UMD_NOT_MODIFIED = ['source/excanvas/canvas.text.js', 'source/excanvas/excanvas_text.js']

function copyStatic() {
  return {
    name: 'umd-copy-static',
    buildStart() {
      for (const f of UMD_NOT_MODIFIED) {
        const to = path.join(UMD_DIST, path.relative('source', f))
        fs.mkdirSync(path.dirname(to), { recursive: true })
        fs.copyFileSync(f, to)
      }
    }
  }
}

export default UMD_FILES.map(file => ({
  input: file,
  output: {
    file: path.join(UMD_DIST, 'teechart.js'),
    format: 'umd',
    name: 'Tee',
    sourcemap: true
  },
  plugins: [resolve(), terser(), copyStatic()]
}))
