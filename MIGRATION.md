# Migration Guide

This guide will help you migrate your projects from TeeChartJS version 3 to version 4, highlighting breaking changes, new features, and recommended migration steps.

## TeeChartJS v3 to v4

### Dropped Legacy Browsers:

IE8 and earlier are no longer supported.

### Only one import statement

All code is now imported from `teechart.js` instead of multiple files.

### ChartEditor in `teechart.js`

The ChartEditor is now included in the main `TeeChart.js` file.

#### Old usage:

```javascript
const chartEditor = new ChartEditor('editor', Chart1)
```

#### New usage:

```javascript
const chartEditor = new Tee.ChartEditor('editor', Chart1)
```

For further assistance, contact [Steema Support](https://www.steema.com/support) or open an issue on GitHub.
