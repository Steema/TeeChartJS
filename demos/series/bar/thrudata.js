var Chart1
var posXLabel, posYLabel
var scroller
var textColor = '141476'

init()

function init() {
  draw()
  resizeScroller(scroller)
}

window.addEventListener('resize', function (event) {
  resizeScroller(scroller)
})

function draw() {
  //init chart
  Chart1 = new Tee.Chart('canvas')

  changeTheme(Chart1, 'dark')

  Chart1.panel.margins.top = 12

  var readings = new Tee.Line()
  var minmaxes = new Tee.HighLowBar()
  var avgDates = new Array()

  var readings2 = new Tee.Line()
  var readings3 = new Tee.Line()
  var readings4 = new Tee.Line()

  var numVals = 864

  Chart1.addSeries(minmaxes)

  Chart1.addSeries(readings) //.addRandom(864);
  Chart1.addSeries(readings2)
  Chart1.addSeries(readings3)

  for (i = 1; i < 4; i++) {
    Chart1.series.items[i].format.stroke.size = 3
  }

  for (i = 0; i < numVals; i++) {
    readings.data.values[i] = 230 - Math.random() * 10
    readings2.data.values[i] = 0.6 - Math.random() * 0.6
    readings3.data.values[i] = 50 - Math.random() * 45
  }

  var tst = document.getElementById('tst')

  let ypos = document.getElementById('yposBar')
  for (i = 1; i < 4; i++) {
    var s = Chart1.series.items[i]
    var p = s.pointer
    p.visible = 'true'
    p.width = 3
    p.height = 3
    switch (i) {
      case 1:
        p.style = 'sphere'
        break
      case 2:
        p.style = 'triangle'
        break
      default:
        p.style = 'rectangle'
    }

    if (i > 0) {
      var br = document.createElement('br')
      ypos.appendChild(br)
    }
    posYLabel = document.createElement('span')
    posYLabel.id = 'ypos' + i
    ypos.appendChild(posYLabel)
  }

  //var axis1=Chart1.axes.right;
  var axis1 = Chart1.axes.add(false, true)
  var axis2 = Chart1.axes.add(false, true)
  var axis3 = Chart1.axes.add(false, true)

  // Setup axis positions as % percent:

  axis1.start = 0
  axis1.end = 100
  axis2.start = 0
  axis2.end = 100
  axis3.start = 0
  axis3.end = 100

  axis1.position = -1
  axis2.position = -6
  axis3.position = -11

  axis1.visible = true
  axis1.ticks.stroke.fill = 'rgba(203,203,203,1.0)'
  axis2.ticks.stroke.fill = 'rgba(203,203,203,1.0)'
  axis3.ticks.stroke.fill = 'rgba(203,203,203,1.0)'

  axis2.grid.visible = false
  axis3.grid.visible = false

  axis1.format.stroke.fill = 'white'
  axis1.labels.format.font.fill = 'white'

  axis1.format.stroke.fill = readings.format.fill
  axis2.format.stroke.fill = readings2.format.fill
  axis3.format.stroke.fill = readings3.format.fill
  axis2.labels.format.font.fill = 'white'
  axis3.labels.format.font.fill = 'white'

  axis1.title.text = 'Axis 1'
  axis2.title.text = 'Axis 2'
  axis3.title.text = 'Axis 3'

  axis1.title.text = 'Volts'
  axis1.labels.roundFirst = true
  axis1.title.visible = false
  axis1.setMinMax(0, 300)
  axis1.grid.format.stroke.size = 0.5

  Chart1.series.items[0].vertAxis = axis1
  Chart1.series.items[1].vertAxis = axis1
  Chart1.series.items[2].vertAxis = axis2
  Chart1.series.items[3].vertAxis = axis3

  Chart1.series.items[0].title = 'A1 Range'
  Chart1.series.items[1].title = 'A1'
  Chart1.series.items[2].title = 'B1'
  Chart1.series.items[3].title = 'C1'

  var startDateTime = new Date().getTime() - numVals * 5000

  for (t = 0; t < readings.count(); t++) {
    avgDates[t] = new Date(startDateTime)
    startDateTime = startDateTime + 5000
  }

  readings.data.x = avgDates
  readings2.data.x = avgDates
  readings3.data.x = avgDates
  readings.format.shadow.visible = false

  Chart1.axes.bottom.setMinMax(readings.data.x[650].getTime(), readings.data.x[690].getTime())

  for (var i = 0; i < Chart1.series.items[1].data.values.length - 1; i++) {
    var rand = Math.random() * (readings.data.values[i] / 5)
    var min, max

    if (readings.data.values[i] > readings.data.values[i + 1]) {
      min = readings.data.values[i + 1] - Math.floor(Math.random() * (readings.data.values[i] / 5.0))
      max = readings.data.values[i] + Math.floor(Math.random() * (readings.data.values[i] / 5.0))
    } else {
      min = readings.data.values[i] - Math.floor(Math.random() * (readings.data.values[i] / 5.0))
      max = readings.data.values[i + 1] + Math.floor(Math.random() * (readings.data.values[i] / 5.0))
    }

    minmaxes.data.values[i] = max + 5
    minmaxes.data.lows[i] = min - 5
  }

  minmaxes.data.x = avgDates

  Chart1.draw()

  Chart1.series.items[0].cursor = 'pointer'

  Chart1.series.items[0].colorEach = false
  Chart1.series.items[0].format.fill = 'rgba(123,123,123,0.5)'
  //Chart1.series.items[0].format.stroke.fill = "rgba(203,203,203,1.0)";
  //Chart1.series.items[0].format.round.x = 0;
  //Chart1.series.items[0].format.round.y = 0;
  Chart1.series.items[0].format.gradient.visible = false
  Chart1.series.items[0].marks.visible = false

  //Chart1.series.items[0].barSize=100;
  //Chart1.series.items[0].offset=100;

  minmaxes.rects = true
  minmaxes.closeArea = false
  minmaxes.format.shadow.visible = false

  readings.pointer.visible = true
  readings.pointer.width = 3
  readings.pointer.height = 3

  Chart1.panel.margins.right = 15

  //Axes
  Chart1.axes.bottom.labels.roundFirst = true
  Chart1.axes.bottom.title.text = 'Bottom Axis'
  Chart1.axes.bottom.title.format.font.fill = 'rgba(0,0,0,0.6)'
  Chart1.axes.bottom.title.format.font.setSize(20)
  Chart1.axes.bottom.title.visible = false
  //Chart1.axes.bottom.labels.dateFormat = "dd/MM/yy";
  Chart1.axes.bottom.labels.dateFormat = 'H:M:ss' //"H:M:s:L";

  Chart1.axes.bottom.grid.visible = false
  Chart1.axes.bottom.ticks.stroke.fill = 'rgba(203,203,203,1.0)'
  Chart1.axes.bottom.format.stroke.size = 0.5
  Chart1.walls.visible = false

  //Title
  Chart1.title.visible = false
  Chart1.title.text = 'Readings'

  //Legend
  Chart1.legend.visible = false
  // annotation (alternative title)
  a1 = new Tee.Annotation(Chart1)
  a1.format.fill = 'rgba(0,0,0,0.0)'
  a1.format.stroke.fill = 'rgba(0,0,0,0.0)'
  a1.format.font.style = '20px Tahoma'
  a1.format.font.fill = 'rgba(255,85,0,0.8)'
  a1.text = 'Readings'

  // annotation (alternative title)
  a2 = new Tee.Annotation(Chart1)
  a2.format.fill = 'rgba(0,0,0,0.0)'
  a2.format.stroke.fill = 'rgba(0,0,0,0.0)'
  a2.format.font.style = '12px Arial'
  a2.format.font.fill = 'rgba(255,115,0,0.9)'
  a2.text = ' VOLTAGE - KEY POINTS'

  Chart1.draw() //get positions

  a1.position.x = Chart1.axes.bottom.calc((Chart1.axes.bottom.minimum + Chart1.axes.bottom.maximum) / 2) - 100
  a1.position.y = 8
  Chart1.tools.add(a1)
  a2.position.x = Chart1.axes.bottom.calc((Chart1.axes.bottom.minimum + Chart1.axes.bottom.maximum) / 2) - 100
  a2.position.y = 30
  Chart1.tools.add(a2)

  //tooltip
  tip = new Tee.ToolTip(Chart1)
  tip.autoHide = true
  tip.render = 'dom'
  tip.domStyle = 'padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; '
  tip.domStyle = tip.domStyle + 'background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; '
  tip.domStyle = tip.domStyle + 'border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;'

  Chart1.tools.add(tip)

  tip.onhide = function () {
    scaling = 0
    poindex = -1
  }

  tip.ongettext = function (tool, text, series, index) {
    var s = '<font face="verdana" color="black" size="1"><strong>' + new Date(xValue).toLocaleTimeString('es-ES') + '</strong></font>'
    return s
  }

  Chart1.zoom.enabled = false
  //Chart1.scroll.mouseButton = 0;
  Chart1.scroll.direction = 'horizontal'
  var t = new Tee.CursorTool(Chart1)
  t.direction = 'vertical'
  var xValue
  t.vertAxis = axis1
  t.format.stroke.fill = 'white'
  Chart1.tools.add(t)

  posXLabel = document.getElementById('xpos')

  t.onchange = function (p) {
    xValue = Chart1.axes.bottom.fromPos(p.x)
    //posXLabel.textContent='X Value = '+xValue.toFixed(2);
    posXLabel.textContent = 'Time: ' + new Date(xValue).toLocaleTimeString('es-ES')
    for (var i = 1; i < Chart1.series.items.length; i++) {
      posYLabel = document.getElementById('ypos' + i)
      posYLabel.textContent = Chart1.series.items[i].title + ': ' + interpolateLineSeries(Chart1.series.items[i], xValue).toFixed(2)
    }

    Chart1.draw()
    resizeScroller(scroller)
  }

  //scroller
  scroller = new Tee.Scroller('canvas2', Chart1)
  scroller.onChanging = function (s, min, max) {
    var mi = new Date(min).toLocaleTimeString('es-ES'),
      ma = new Date(max).toLocaleTimeString('es-ES')
    document.getElementById('dataRange').innerHTML = '<font face="arial" size="2" color="white">Showing data from ' + mi + ' to ' + ma + '</font>'
  }

  scroller.axes.visible = true
  scroller.panel.transparent = false
  scroller.panel.format.fill = 'rgba(90,90,90,0.5)'
  scroller.walls.visible = true
  scroller.walls.back.format.fill = 'rgba(90,90,90,0.5)'
  scroller.panel.format.gradient.visible = false

  scroller.scroller.back.fill = 'black'

  Chart1.ondraw = function () {
    var xs = this.axes.bottom.calc(xValue)
    var ys = null
    var ys2 = null
    var text,
      text2 = null

    if (xs > this.axes.bottom.calc(this.axes.bottom.minimum) && xs < this.axes.bottom.calc(this.axes.bottom.maximum)) {
      for (var i = 0; i < this.series.items.length; i++) {
        if (i == 0) {
          var index
          for (index = 0; index < this.series.items[i].data.values.length; index++) {
            if (this.series.items[i].data.x[index] > xValue) break
          }
          ys = axis1.calc(this.series.items[i].data.values[index - 1])
          text = 'Max: ' + axis1.fromPos(ys).toFixed(2) + ' V'
          ys2 = axis1.calc(this.series.items[i].data.lows[index - 1])
          text2 = 'Min: ' + axis1.fromPos(ys2).toFixed(2) + ' V'
        } else if (i == 1) {
          ys = axis1.calc(interpolateLineSeries(this.series.items[i], xValue))
          text = 'A1: ' + axis1.fromPos(ys).toFixed(2) + ' V'
        } else if (i == 2) {
          ys = axis2.calc(interpolateLineSeries(this.series.items[i], xValue))
          text = 'B1: ' + axis2.fromPos(ys).toFixed(2) + ' V'
        } else {
          ys = axis3.calc(interpolateLineSeries(this.series.items[i], xValue))
          text = 'C1: ' + axis3.fromPos(ys).toFixed(2) + ' V'
        }

        var f = new Tee.Format(this)
        f.stroke.fill = 'white'
        f.fill = this.series.items[i].format.fill
        f.ellipse(xs, ys, 8, 8)

        var width = f.textWidth(text)
        var rect = new Tee.Rectangle()
        var xLoc = xs - width - 14

        f.stroke.fill = f.fill

        if (xLoc - Chart1.axes.bottom.calc(Chart1.axes.bottom.minimum) < 1) xLoc = xLoc + width + 24

        rect.set(xLoc, ys - 8, width + 2, 16)
        f.rectangle(rect)
        rect.set(xLoc, ys - 6, width + 2, 16) //text rect

        f.font.fill = 'white'
        f.font.style = '12px Tahoma'
        f.drawText(rect, text)
        //f.text

        if (ys2 != null) {
          width = f.textWidth(text2)
          rect = new Tee.Rectangle()
          xLoc = xs - width - 14

          f.stroke.fill = 'white'
          f.fill = this.series.items[i].format.fill

          f.ellipse(xs, ys2, 8, 8)

          if (xLoc - Chart1.axes.bottom.calc(Chart1.axes.bottom.minimum) < 1) xLoc = xLoc + width + 24
          rect.set(xLoc, ys2 - 8, width + 2, 16)
          f.stroke.fill = ''

          f.rectangle(rect)
          rect.set(xLoc, ys2 - 6, width + 2, 16) //text rect

          f.font.fill = 'white'
          f.font.style = '12px Tahoma'

          f.drawText(rect, text2)
          ys2 = null
        }
      }
    }

    resizeScroller(scroller)
  }
}

function scrollerRedraw() {
  scroller.scroller.min = Chart1.axes.bottom.minimum
  scroller.scroller.max = Chart1.axes.bottom.maximum
  resizeScroller(scroller)
}

function fiveMin() {
  var midPoint = Chart1.axes.bottom.minimum + (Chart1.axes.bottom.maximum - Chart1.axes.bottom.minimum) / 2
  Chart1.axes.bottom.setMinMax(midPoint - 150000, midPoint + 150000)
  Chart1.draw()
  scrollerRedraw()
}
function fifteenMin() {
  var midPoint = Chart1.axes.bottom.minimum + (Chart1.axes.bottom.maximum - Chart1.axes.bottom.minimum) / 2
  Chart1.axes.bottom.setMinMax(midPoint - 450000, midPoint + 450000)
  Chart1.draw()
  scrollerRedraw()
}
function halfHour() {
  var midPoint = Chart1.axes.bottom.minimum + (Chart1.axes.bottom.maximum - Chart1.axes.bottom.minimum) / 2
  Chart1.axes.bottom.setMinMax(midPoint - 900000, midPoint + 900000)
  Chart1.draw()
  scrollerRedraw()
}
function allTime() {
  Chart1.axes.bottom.setMinMax(Chart1.series.items[1].data.x[0].getTime(), Chart1.series.items[0].data.x[Chart1.series.items[1].data.values.length - 1].getTime())
  Chart1.draw()
  scrollerRedraw()
}

function interpolateLineSeries(s, xval) {
  var yValues = s.data.values
  var len = yValues.length
  var xValues = []

  if (s.data.x) xValues = s.data.x
  else {
    for (i = 0; i < len; i++) xValues[i] = i
  }

  var index
  for (index = 0; index < len; index++) {
    if (xValues[index] > xval) break
  }

  if (index < 1) index = 1
  else if (index >= len) index = len - 1

  var dx = xValues[index] - xValues[index - 1]
  var dy = yValues[index] - yValues[index - 1]

  if (dx != 0) return (dy * (xval - xValues[index - 1])) / dx + yValues[index - 1]
  else return 0
}

function resizeScroller(aScroller) {
  if (aScroller != null) {
    var chart = aScroller.target
    var parentStyle = window.getComputedStyle(chart.canvas.parentElement, null)
    var w = Math.floor(
      chart.canvas.parentElement.offsetWidth -
        (parseFloat(parentStyle.paddingLeft) + parseFloat(parentStyle.paddingRight) + parseFloat(parentStyle.borderLeftWidth) + parseFloat(parentStyle.borderRightWidth))
    )
    w -= Math.floor(chart.canvas.width - chart.chartRect.getRight()) - 5
    var h = 100
    var l = chart.chartRect.x
    aScroller.canvas.setAttribute('width', w + 'px')
    aScroller.canvas.setAttribute('height', h + 'px')
    aScroller.setBounds(l, 0, w - l - 5, h)

    aScroller.draw()
  }
}
