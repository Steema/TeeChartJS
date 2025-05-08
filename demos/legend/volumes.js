var Chart1, a2, tip
var hasAnimated = false
var years = ['Jan', 'Feb', 'Mar', 'Apr', 'May']

var sNames = ['Garry Dam', 'Wesley Valley', 'Chamber Falls', 'Joe Dale', 'Bower Reservoir', 'Whiteshead', 'Duff Lake']

var dataIn = []
dataIn[6] = [12.9, 14.34, 15.21, 17.62, 13.34]
dataIn[5] = [72.73, 79.13, 75.82, 76.15, 69.51]
dataIn[4] = [11.12, 12.52, 14.38, 15.31, 14.03]
dataIn[3] = [140.96, 148.09, 153.15, 154.12, 142.56]
dataIn[2] = [53.12, 57.53, 61.34, 61.09, 58.0]
dataIn[1] = [131, 134.31, 133.61, 137.21, 132.43]
dataIn[0] = [43.0, 45.5, 52.5, 51.3, 48.91]

function draw() {
  Chart1 = new Tee.Chart('canvas')

  Chart1.zoom.enabled = false
  Chart1.scroll.enabled = false

  for (i = 0; i < dataIn.length; i++) {
    Chart1.addSeries(new Tee.Area())
    Chart1.series.items[i].data.values = dataIn[i]
    Chart1.series.items[i].data.labels = years
    Chart1.series.items[i].title = sNames[i]
    Chart1.series.items[i].stacked = true

    Chart1.series.items[i].colorEach = false

    Chart1.series.items[i].format.gradient.visible = false
    Chart1.series.items[i].format.stroke.fill = 'rgba(0,0,0,0.1)'
    Chart1.series.items[i].format.shadow.visible = false

    Chart1.series.items[i].useOrigin = true
    Chart1.series.items[i].origin = 0
  }

  Chart1.series.items[0].marks.visible = false

  Chart1.series.items[0].cursor = 'pointer'

  changeTheme(Chart1, 'minimal')
  Chart1.applyPalette('seawash')

  Chart1.axes.left.title.text = 'Volume (M m3)'
  Chart1.axes.left.title.format.font.style = '17px Tahoma'
  Chart1.axes.left.title.format.font.fill = 'rgb(0,0,0)'
  Chart1.axes.left.format.stroke.fill = 'rgba(0,255,0,0)'
  Chart1.axes.left.ticks.visible = false
  Chart1.axes.left.increment = 100
  Chart1.axes.left.labels.fixedDecimals = true
  Chart1.axes.left.labels.decimals = 0
  Chart1.axes.left.labels.labelStyle = 'value'
  Chart1.axes.left.labels.valueFormat = true

  Chart1.axes.bottom.labels.format.font.fill = 'rgb(30,30,30)'
  Chart1.axes.left.labels.format.font.fill = Chart1.axes.bottom.labels.format.font.fill
  Chart1.legend.format.font.fill = Chart1.axes.bottom.labels.format.font.fill

  Chart1.axes.bottom.grid.centered = true
  Chart1.axes.bottom.ticks.visible = false

  Chart1.axes.bottom.setMinMax(-0.5, 4.5)

  Chart1.title.text = 'Reservoir Water Volumes (millions m3)'
  Chart1.title.format.font.style = '18px Tahoma'
  Chart1.title.format.font.fill = 'rgb(0,0,0)'
  Chart1.title.format.font.textAlign = 'left'
  Chart1.title.format.font.gradient.visible = false

  Chart1.walls.left.size = 10
  Chart1.walls.bottom.size = 10

  Chart1.legend.visible = false
  Chart1.legend.format.stroke.fill = 'white'
  Chart1.legend.transparent = false

  Chart1.panel.margins.bottom = 40
  Chart1.panel.margins.left = 10

  //tooltip
  tip = new Tee.ToolTip(Chart1)
  tip.render = 'dom'
  tip.delay = 3000
  tip.autoHide = true
  //tip.findPoint = true;
  tip.domStyle = 'padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; '
  tip.domStyle = tip.domStyle + 'background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; '
  tip.domStyle = tip.domStyle + 'border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;'

  Chart1.tools.add(tip)
  tip.onhide = function () {
    scaling = 0
    poindex = -1
  }
  tip.ongettext = function (tool, text, series, index) {
    var t,
      s = '',
      ser

    s += '<font face="verdana" color="darkblue" size="1">Month: <strong>' + Chart1.series.items[0].data.labels[index] + '</strong></font>'

    for (t = 0; t < Chart1.series.count(); t++) {
      s += '<br/>'
      ser = Chart1.series.items[t]
      s +=
        '<font face="verdana" color="#004000" size="1"><b>' +
        ser.title +
        ':</b></font> <font face="verdana" color="red" size="1">' +
        Chart1.axes.left.labels.formatValueString(ser.data.values[index]) +
        '</font>'
    }
    return s
  }

  //Chart1.axes.bottom.grid.visible=true;
  //animation
  animation = new Tee.SeriesAnimation()
  animation.duration = 900
  animation.kind = 'each'
  fadeAnimation = new Tee.FadeAnimation()
  fadeAnimation.duration = 500
  fadeAnimation.fade.series = true
  fadeAnimation.fade.marks = true
  animation.mode = 'linear'
  fadeAnimation.mode = 'linear'
  animation.items.push(fadeAnimation)

  animation.animate(Chart1)

  animation.onstop = function (a) {
    hasAnimated = true

    for (i = 0; i < Chart1.series.items.length; i++) {
      Chart1.series.items[i].format.transparency = 0.15
    }
  }

  Chart1.series.items[1].onbeforedraw = function () {
    //
  }

  Chart1.ondraw = function () {
    var inc = 20 //line height

    var x1 = Chart1.axes.bottom.calc(Chart1.axes.bottom.minimum),
      y1 = Chart1.axes.left.calc(0),
      width = Chart1.axes.bottom.calc(Chart1.axes.bottom.maximum)
    height = 0

    yStart = y1

    // X,Y, Width, Height
    var myFormat = new Tee.Format(Chart1)

    myFormat.stroke.size = 0.5

    Chart1.axes.bottom.calcAxisScale()
    var xInc = (Chart1.axes.bottom.maximum - Chart1.axes.bottom.minimum) / Chart1.series.items[0].data.values.length //Chart1.axes.bottom.increm;
    if (xInc < 0.5) xInc = 0.5
    var xPos = Chart1.axes.bottom.minimum

    for (i = 0; i < Chart1.series.items.length; i++) {
      y1 = y1 + inc
      //horiz grid lines
      myFormat.rectangle(0, y1, width, height)
      myFormat.font.style = Chart1.axes.bottom.labels.format.font.style
      myFormat.font.fill = Chart1.axes.bottom.labels.format.font.fill
      Chart1.ctx.font = myFormat.font.style

      if (i < Chart1.series.items.length) {
        rr = new Tee.Rectangle(40, y1 + 3, 80, 20)
        myFormat.fill = Chart1.series.items[i].format.fill //  "rgb(255,0,0)";
        myFormat.rectangle(5, y1 + 3, 14, 14) //symbol
        myFormat.font.textAlign = 'center'
        myFormat.drawText(rr, Chart1.series.items[i].title) //series title

        x1 = Chart1.axes.bottom.calc(Chart1.axes.bottom.minimum)
        xPos = Chart1.axes.bottom.minimum

        var incSize = Chart1.axes.bottom.calc(Chart1.axes.bottom.minimum + xInc) - x1

        //myFormat.font.textAlign = "left";

        if (hasAnimated) {
          //don't plot ascending, animated values
          for (j = 0; j < Chart1.series.items[i].data.values.length; j++) {
            rr = new Tee.Rectangle(x1, y1 + 3, incSize, 20)
            myFormat.drawText(rr, '' + Chart1.series.items[i].data.values[j])

            xPos = xPos + xInc
            x1 = Chart1.axes.bottom.calc(xPos)
          }
        }
      }
    }

    y1 = y1 + inc
    myFormat.rectangle(0, y1, width, height)

    x1 = Chart1.axes.bottom.calc(Chart1.axes.bottom.minimum)
    xPos = Chart1.axes.bottom.minimum

    //left start line
    myFormat.rectangle(0, Chart1.axes.left.calc(0) + inc, 0, y1 - yStart - inc)

    while (x1 < Chart1.axes.bottom.calc(Chart1.axes.bottom.maximum)) {
      //vertical delimitating lines
      myFormat.rectangle(x1, Chart1.axes.left.calc(0), 0, y1 - yStart)

      xPos = xPos + xInc
      x1 = Chart1.axes.bottom.calc(xPos)
    }

    //final right close line
    myFormat.rectangle(Chart1.axes.bottom.calc(Chart1.axes.bottom.maximum), Chart1.axes.left.calc(0), 0, y1 - yStart)
  }

  Chart1.draw()
}

function setSize(value) {
  Chart1.series.items[0].barSize = value
  Chart1.draw()
}

function setRightPanelMargin() {
  if (Chart1.legend.visible && Chart1.legend.position == 'right') Chart1.panel.margins.right = 0
  else Chart1.panel.margins.right = 10

  Chart1.draw()
}
