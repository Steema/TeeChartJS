# TeeChartJS - Installation & Build Guide

## Prerequisites

- **Node.js** (recommended version: 18.x or higher)
- **npm** (comes bundled with Node.js)

Download Node.js from: https://nodejs.org/

## Install dependencies

Open a terminal in the project root folder and run:

```sh
npm install
```

This will install all required dependencies for building and development.

## Generate minified files (build)

To minify all JavaScript files in the `source` folder and generate files in the `src` folder, run:

```sh
npm run build:umd
```

This will create a minified file for each source file in `source`.

## Relevant folder structure

- `demos/` : Demo applications and examples
- `source/` : JavaScript source code
- `src/` : Generated minified files
- `package.json` : Dependency and script configuration
- `rollup.config.js` : Build configuration with Rollup

---

If you encounter any issues, make sure Node.js is properly installed and you are running the commands from the project root.
