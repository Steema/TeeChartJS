import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import fs from 'fs'
import path from 'path'
import glob from 'glob'

const UMD_DIST = 'dist'
const UMD_FILES = ['src/teechart.js']
const UMD_NOT_MODIFIED = ['src/excanvas/canvas.text.js', 'src/excanvas/excanvas_text.js', 'src/plugins/*']

function copyRecursiveSync(src, dest) {
  const stat = fs.statSync(src)

  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true })
    for (const item of fs.readdirSync(src)) {
      const srcPath = path.join(src, item)
      const destPath = path.join(dest, item)
      copyRecursiveSync(srcPath, destPath)
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(src, dest)
  }
}

function copyStatic() {
  return {
    name: 'umd-copy-static',
    buildStart() {
      for (const pattern of UMD_NOT_MODIFIED) {
        const matches = glob.sync(pattern, { nodir: false })
        for (const f of matches) {
          const relative = path.relative('src', f)
          const to = path.join(UMD_DIST, relative)
          copyRecursiveSync(f, to)
        }
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
