import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import fs from 'fs'
import path from 'path'

const UMD_DIST = 'dist/umd'
const UMD_FILES = ['src/date.format.js', 'src/teechart-3d.js', 'src/teechart-data.js', 'src/teechart-gauges.js', 'src/teechart-maps.js', 'src/teechart.js']
const UMD_NOT_MODIFIED = ['src/excanvas/canvas.text.js', 'src/excanvas/excanvas_text.js', 'src/teechart-editor.js', 'src/teechart-svg.js', 'src/teechart-table.js']

function copyStatic() {
  return {
    name: 'umd-copy-static',
    buildStart() {
      for (const f of UMD_NOT_MODIFIED) {
        const to = path.join(UMD_DIST, path.relative('src', f))
        fs.mkdirSync(path.dirname(to), { recursive: true })
        fs.copyFileSync(f, to)
      }
    }
  }
}

export default UMD_FILES.map(file => ({
  input: file,
  output: {
    file: path.join(UMD_DIST, path.basename(file, '.js') + '.min.js'),
    format: 'umd',
    name: 'Tee',
    sourcemap: true
  },
  plugins: [resolve(), terser(), copyStatic()]
}))
