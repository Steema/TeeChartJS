'use strict'

/**
 * @preserve TeeChart(tm) for JavaScript(tm)
 * @fileOverview TeeChart for JavaScript(tm)
 * v3.10 Jun 2024
 * Copyright(c) 2012-2024 by Steema Software SL. All Rights Reserved.
 * http://www.steema.com
 *
 * Licensed with commercial and non-commercial attributes,
 * specifically: http://www.steema.com/licensing/html5
 *
 * JavaScript is a trademark of Oracle Corporation.
 */

/**
 * @author <a href="mailto:david@steema.com">Steema Software</a>
 * @version 2.7
 */

import { Point, pointInLine } from './base/point.js'
import './utils/date-format.js'

/**
 * @namespace TeeChart namespace, contains all classes and methods.
 */
export const Tee = {}

/*global exports, window, requestAnimFrame, Image, clearTimeout, HTMLTextAreaElement,
clearInterval, parseText, document, parseXML, parseJSON, navigator, setInterval,
HTMLInputElement, HTMLCanvasElement */
;(function () {
  if (typeof exports !== 'undefined') exports.Tee = Tee

  if (typeof window !== 'undefined') {
    window.requestAnimFrame = (function (/*callback*/) {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60, new Date().getTime())
        }
      )
    })()
  }

  // IE8 does not support defineProperty, so just in case:
  var obDefP
  try {
    Object.defineProperty({}, 'x', {})
    obDefP = Object.defineProperty
  } catch (e) {}

  // For "IE < 9" :
  // http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc
  // Add ECMA262-5 Array methods if not supported natively
  //
  if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf = function (find, i /*opt*/) {
      if (i === undefined) i = 0
      if (i < 0) i += this.length
      if (i < 0) i = 0
      for (var n = this.length; i < n; i++) if (i in this && this[i] === find) return i
      return -1
    }
  }

  Tee.Point = Point

  /**
   * @memberOf Tee
   * @public
   * @constructor
   * @class Represents a rectangle with origin xy position, width and height
   * @param {Number} x The position of left side of rectangle.
   * @param {Number} y The position of top side of rectangle.
   * @param {Number} width Amount of rectangle width.
   * @param {Number} height Amount of rectangle height.
   * @property {Number} x The position of left side of rectangle.
   * @property {Number} y The position of top side of rectangle.
   * @property {Number} width Amount of rectangle width.
   * @property {Number} height Amount of rectangle height.
   */
  Tee.Rectangle = function (x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    /**
     * Sets Rectangle properties.
     * @memberOf Tee.Rectangle
     * @param {Number} x The position of left side of rectangle.
     * @param {Number} y The position of top side of rectangle.
     * @param {Number} width Amount of rectangle width.
     * @param {Number} height Amount of rectangle height.
     */
    this.set = function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    }

    /**
     * Sets Rectangle properties from rectangle r parameter.
     * @public
     * @memberOf Tee.Rectangle
     * @param {Tee.Rectangle} r The Rectangle instance to copy values from.
     */
    this.setFrom = function (r) {
      this.x = r.x
      this.y = r.y
      this.width = r.width
      this.height = r.height
    }

    /**
     * @returns {Number} Returns the position in pixels of the right side of the
     * rectangle.
     */
    this.getRight = function () {
      return this.x + this.width
    }

    /**
     * @returns {Number} Returns the position in pixels of the bottom side of the
     * rectangle.
     */
    this.getBottom = function () {
      return this.y + this.height
    }

    /**
     * @param {Number} value Defines the position of top side of rectangle.
     */
    this.setTop = function (value) {
      this.height -= value - this.y
      this.y = value
    }

    /**
     * @param {Number} value Defines the position of bottom side of rectangle.
     */
    this.setBottom = function (value) {
      this.height = value - this.y
    }

    /**
     * @param {Number} value Defines the position of left side of rectangle.
     */
    this.setLeft = function (value) {
      this.width -= value - this.x
      this.x = value
    }

    /**
     * @param {Number} value Defines the position of right side of rectangle.
     */
    this.setRight = function (value) {
      this.width = value - this.x
    }

    /**
     * @returns {Boolean} Returns if {@link Tee.Point} p is inside the rectangle.
     * @param {Tee.Point} p XY position to test.
     */
    this.contains = function (p) {
      return p.x >= this.x && p.x <= this.x + this.width && p.y >= this.y && p.y <= this.y + this.height
    }

    /**
     *
     * @param {Number} x Horizontal pixels.
     * @param {Number} y Vertical pixels.
     */
    this.offset = function (x, y) {
      this.x += x
      this.y += y
    }
  }

  function Rectangle(x, y, width, height) {
    return new Tee.Rectangle(x, y, width, height)
  }

  /**
   * Sets Rectangle properties.
   * @memberOf Tee.Rectangle
   * @param {Number} x The position of left side of rectangle.
   * @param {Number} y The position of top side of rectangle.
   * @param {Number} width Amount of rectangle width.
   * @param {Number} height Amount of rectangle height.
   */
  /*Rectangle.prototype.set=function(x,y,width,height) {
  this.x=x;
  this.y=y;
  this.width=width;
  this.height=height;
  };*/

  /**
   * Sets Rectangle properties from rectangle r parameter.
   * @public
   * @memberOf Tee.Rectangle
   * @param {Tee.Rectangle} r The Rectangle instance to copy values from.
   */
  /*Rectangle.prototype.setFrom=function(r) {
    this.x=r.x;
    this.y=r.y;
    this.width=r.width;
    this.height=r.height;
  };*/

  /**
   * @returns {Number} Returns the position in pixels of the right side of the
   * rectangle.
   */
  //Rectangle.prototype.getRight=function() { return this.x+this.width; };

  /**
   * @returns {Number} Returns the position in pixels of the bottom side of the
   * rectangle.
   */
  //Rectangle.prototype.getBottom=function() { return this.y+this.height; };

  /**
   * @param {Number} value Defines the position of top side of rectangle.
   */
  /*Rectangle.prototype.setTop=function(value) {
    this.height -= (value-this.y);
    this.y=value;
  };*/

  /**
   * @param {Number} value Defines the position of bottom side of rectangle.
   */
  /*Rectangle.prototype.setBottom=function(value) {
    this.height = value - this.y;
  };*/

  /**
   * @param {Number} value Defines the position of left side of rectangle.
   */
  /*Rectangle.prototype.setLeft=function(value) {
    this.width -= (value-this.x);
    this.x=value;
  };*/

  /**
   * @param {Number} value Defines the position of right side of rectangle.
   */
  /*Rectangle.prototype.setRight=function(value) {
    this.width = value - this.x;
  };*/

  /**
   * @returns {Boolean} Returns if {@link Tee.Point} p is inside the rectangle.
   * @param {Tee.Point} p XY position to test.
   */
  /*Rectangle.prototype.contains=function(p) {
    return (p.x>=this.x) && (p.x<=(this.x+this.width)) &&
          (p.y>=this.y) && (p.y<=(this.y+this.height));
  };*/

  /**
   *
   * @param {Number} x Horizontal pixels.
   * @param {Number} y Vertical pixels.
   */
  /*Rectangle.prototype.offset=function(x,y) {
    this.x+=x;
    this.y+=y;
  };*/

  /**
   * @memberOf Tee
   * @constructor
   * @class Values for each side (left, top, right and bottom) as percentage margins.
   * @property {Number} [left=2] Amount of left margin as percent of chart width.
   * @property {Number} [top=2] Amount of top margin as percent of chart height.
   * @property {Number} [right=2] Amount of right margin as percent of chart width.
   * @property {Number} [bottom=2] Amount of bottom margin as percent of chart height.
   */
  function Margins() {
    this.left = this.right = this.top = this.bottom = 2

    /*
     * @private
     */
    this.apply = function (r) {
      var w = r.width,
        h = r.height

      r.x += w * this.left * 0.01
      r.width -= w * Math.min(100, this.left + this.right) * 0.01

      r.y += h * this.top * 0.01
      r.height -= h * Math.min(100, this.top + this.bottom) * 0.01
    }
  }

  /**
   * @constructor
   * @class Abstract base class to represent a "tool"
   * @param {Tee.Chart} chart The parent chart this tool belongs to.
   * @property {Boolean} [active=true] Determines if this tool will be painted or enabled.
   */
  Tee.Tool = function (chart) {
    this.chart = chart
    this.active = true
  }

  /**
   * @constructor
   * @augments Tee.Tool
   * @class Base abstract class to perform Animations.
   * @property {Number} [duration=500] Duration in milliseconds of the animation.
   * @property {boolean} [loop=false] When true, the animation never stops (starts again when finished).
   * @property {boolean} [running=false] Read-only, returns if the animation is currently running.
   * @property {Tee.Animation[]} items Sub-animations that are executed in parallel with self.
   * @property {boolean} [autoDraw=true] When true, the animation repaints the chart at every step.
   */
  Tee.Animation = function (target, onstep) {
    Tee.Tool.call(this, target)

    this.active = true
    this.mode = 'linear'
    this.duration = 500
    this.items = []

    this.autoDraw = true
    this.loop = false
    this.running = false

    this.onstart = null
    this.onstop = null

    if (target)
      if (target instanceof Tee.Chart) this.chart = target
      else if (target instanceof Tee.Animation) {
        this.chart = target.chart
        target.items.push(this)
      }

    var o = null

    this._dostart = function () {
      this.init = new Date().getTime()

      o.start()
      for (var t = 0, i; (i = o.items[t++]); )
        if (i.active) {
          i.chart = o.chart
          i.start()
        }

      o.chart.draw()
      requestAnimFrame(this.step, this)
    }

    this.animate = function (chart) {
      if (!this.running) {
        this.running = true

        if (chart) this.chart = chart

        o = this
        this._dostart()
      }
    }

    this.start = function () {
      if (this.onstart) this.onstart()
    }
    this.stop = function () {
      if (this.onstop) this.onstop()
    }

    this.doStep = function (f) {
      if (onstep) onstep(f)
    }

    this.step = function () {
      var now = new Date().getTime(),
        t,
        i,
        tmp = (now - o.init) / o.duration,
        f = o.mode == 'linear' ? tmp : Math.pow(2, 10 * (tmp - 1))

      if (f >= 0 && f < 1) {
        if (o.running) {
          o.doStep(f)

          for (t = 0; (i = o.items[t++]); )
            if (i.active) {
              i.chart = o.chart
              i.doStep(f)
            }

          if (o.autoDraw) o.chart.draw()

          requestAnimFrame(o.step, o)
        }
      } else {
        o.stop()
        for (t = 0; (i = o.items[t++]); )
          if (i.active) {
            i.chart = o.chart
            i.stop()
          }

        if (o.onstop) o.onstop(o)

        if (o.loop) o._dostart()
        else {
          o.running = false
          o.chart.draw()
        }
      }
    }
  }

  Tee.Animation.prototype = new Tee.Tool()

  /**
   * @constructor
   * @class Draws a glow animation behind the bounds rectangle property
   * @param {Number} duration Animation duration in milliseconds.
   * @param {Tee.Rectangle} bounds The rectangle to apply the animation.
   * @param {Tee.Format} format The formatting properties to paint the bounds rectangle.
   */
  function AnimateHover(duration, bounds, format) {
    this.format = format
    this.bounds = bounds

    var o = this,
      s = format.shadow

    this.old = new Shadow()
    this.old.set(s)

    s.visible = true
    s.color = 'rgba(0,255,0,0.1)'
    s.blur = 10
    s.width = 0
    s.height = 0

    this.enabled = true

    var a = new Tee.Animation(format.chart, function (f) {
      if (!o.enabled) return

      if (f < 1) o.format.shadow.color = 'rgba(0,255,0,' + f.toString() + ')'
      else if (o.autoHide) o.restore()
    })

    a.duration = duration
    a.animate()

    this.restore = function () {
      this.format.shadow.set(this.old)
      this.enabled = false
    }
  }

  Tee.Tool.prototype.mousedown = function () {}
  Tee.Tool.prototype.mousemove = function () {}
  Tee.Tool.prototype.mouseout = function () {}
  Tee.Tool.prototype.clicked = function () {
    return false
  }
  Tee.Tool.prototype.draw = function () {}

  /**
   * @constructor
   * @memberOf Tee
   * @class Colors and direction to fill areas with gradients
   * @param {Tee.Chart} chart The parent chart this gradient object belongs to.
   * @property {Boolean} [visible=false] Determines if contents will be filled using this gradient.
   * @property {Color[]} colors Array of colors to define the gradient.
   * @property {String} [direction="topbottom"] Defines the gradient orientation
   * ("topbottom", "bottomtop", "leftright", "rightleft", "radial", "diagonalup", "diagonaldown").
   * @property {Number[]} stops Array of percentages from 0 to 1, for each color in colors array.
   * @property {Point} offset For radial gradients, moves the center xy position.
   */
  function Gradient(chart) {
    this.chart = chart
    this.visible = false

    this.colors = ['white', 'silver']
    this.direction = 'topbottom'
    this.stops = null
    this.offset = { x: 0, y: 0 }

    /**
     * @returns {CanvasGradient} Returns a canvas gradient
     */
    this.create = function (r, color) {
      return this.rect(r.x, r.y, r.width, r.height, color)
    }

    /**
     * @returns {CanvasGradient} Returns a canvas gradient
     */
    this.rect = function (x, y, width, height, color) {
      var g,
        c = this.chart.ctx,
        l = c.createLinearGradient

      if (this.direction == 'topbottom') g = l.call(c, x, y, x, y + height)
      else if (this.direction == 'bottomtop') g = l.call(c, x, y + height, x, y)
      else if (this.direction == 'leftright') g = l.call(c, x, y, x + width, y)
      else if (this.direction == 'rightleft') g = l.call(c, x + width, y, x, y)
      else if (this.direction == 'radial') {
        var px = x + width * 0.5 + this.offset.x,
          py = y + height * 0.5 + this.offset.y,
          rad = Math.max(width, height)

        g = c.createRadialGradient(px, py, 0, px, py, rad)
      } else if (this.direction == 'diagonalup') g = l.call(c, x, y + height, x + width, y)
      else g = l.call(c, x, y, x + width, y + height)

      if (color) this.setEndColor(color)
      //this.colors[0]=color;  // pie inverted effect

      var t,
        co = this.colors,
        len = co.length,
        s = this.stops,
        sl = s ? s.length : 0

      if (len > 1) for (t = 0; t < len; t++) g.addColorStop(sl <= t ? t / (len - 1) : s[t], co[t])
      else g.addColorStop(0, len > 0 ? co[0] : 'white')

      return g
    }
  }

  /**
   * @memberOf Tee.Gradient
   * Sets color to all gradient colors except first color.
   * @param {Color} color The color to set.
   */
  Gradient.prototype.setEndColor = function (color) {
    if (color && color !== '') for (var t = 1, l = this.colors.length; t < l; t++) this.colors[t] = color
  }

  /**
   * @constructor
   * @memberOf Tee
   * @class Color and parameters to draw shadows behind areas
   * @param {Tee.Chart} chart The parent chart this shadow object belongs to.
   * @property {Boolean} [visible=false] Determines if contents will be filled with a backdrop shadow or not.
   * @property {Number} [blur=4] Amount of softness effect.
   * @property {Color} [color="DimGray"] The color used to draw the shadow.
   * @property {Number} [width=4] Amount in pixels to translate the shadow in horizontal direction.
   * @property {Number} [height=4] Amount in pixels to translate the shadow in vertical direction.
   */
  function Shadow(chart) {
    this.chart = chart
    this.visible = false
    this.blur = 4
    this.color = 'rgba(80,80,80,0.75)'
    this.width = 4
    this.height = 4

    this.prepare = function (c) {
      if (this.visible) {
        c.shadowBlur = this.blur
        c.shadowColor = this.color
        c.shadowOffsetX = this.width
        c.shadowOffsetY = this.chart.isAndroid ? -this.height : this.height
      } else c.shadowColor = 'transparent'
    }
  }

  Shadow.prototype.set = function (s) {
    this.visible = s.visible
    this.color = s.color
    this.blur = s.blur
    this.width = s.width
    this.height = s.height
  }

  /**
   * @constructor
   * @memberOf Tee
   * @class Image and url to draw images
   * @param {Tee.Chart} chart The parent chart this image object belongs to.
   * @property {Boolean} visible When true, the image is displayed.
   * @property {URL} [url=""] The source url to retrieve the image.
   * @property {HTMLImage} image The <a href="http://www.w3.org/2003/01/dom2-javadoc/org/w3c/dom/html2/HTMLImageElement.html">
   * html DOM Image component</a> to store or retrieve the image.
   */
  function ChartImage(chart) {
    this.url = ''
    this.repeat = 'no-repeat'
    this.backFill = false
    this.chart = chart
    this.visible = true

    this.tryDraw = function (x, y, width, height) {
      if (!this.image) {
        this.image = new Image()

        this.image.onload = function () {
          chart.draw()
        }
      }

      if (this.image.src === '') {
        chart = this.chart
        this.image.src = this.url
      } else if (chart.ctx.drawImage) {
        // Threejs check
        if (this.repeat == 'repeat') {
          var pattern = chart.ctx.createPattern(this.image, 'repeat')
          chart.ctx.fillStyle = pattern
          chart.ctx.fillRect(x, y, width, height)
        } else {
          chart.ctx.drawImage(this.image, x, y, width, height)
        }
      }
    }
  }

  /**
   * @constructor
   * @memberOf Tee
   * @class Color and properties to draw lines
   * @param {Tee.Chart} chart The parent chart this stroke object belongs to.
   * @property {Color} fill Defines the color used to fill the stroke lines.
   * @property {Number} [size=1] Defines the size in pixels of the stroke lines.
   * @property {String} [join="round"] Controls how to paint unions between lines. (miter, round, bevel)
   * @property {String} [cap="square"] Controls how to paint ending line points. (square, round, butt)
   */
  function Stroke(chart) {
    this.chart = chart
    this.fill = 'black'
    this.size = 1
    this.join = 'round'
    this.cap = 'square'
    this.dash = null

    this._g = null

    if (obDefP)
      obDefP(this, 'gradient', {
        get: function () {
          if (!this._g) this._g = new Gradient(this.chart)
          return this._g
        }
      })
    else this._g = this.gradient = new Gradient(chart)

    this.prepare = function (fill, c) {
      c = c || this.chart.ctx
      var g = this._g

      c.strokeStyle = g && g.visible ? g.create(this.chart.bounds) : fill ? fill : this.fill

      c.lineWidth = this.size
      c.lineJoin = this.join
      c.lineCap = this.cap

      c.shadowColor = 'transparent'

      if (c.setLineDash) c.setLineDash(this.dash || [])
      // [] --> Safari WebKit exception
      else if (c.mozCurrentTransform) c.mozDash = this.dash
      else if (this.chart.isChrome) c.webkitLineDash = this.dash
    }

    /*
     * @private
     */
    this.setChart = function (chart) {
      this.chart = chart
      if (this._g) this._g.chart = chart
    }
  }

  /**
   * @memberOf Tee
   * @constructor
   * @class Style and fill properties to display text
   * @param {Tee.Chart} chart The parent chart this font object belongs to.
   * @property {String} [style="11px Tahoma"] Font family, size and attributes.
   * @property {Color} [fill="black"] Color used to fill texts using this font.
   * @property {Tee.Shadow} shadow Attributes to fill a shadow behind text.
   * @property {Tee.Stroke} stroke Attributes to draw an outline around text.
   * @property {String} [textAlign="center"] Defines to draw text at left, right or center inside container.
   */
  function Font(chart) {
    this.chart = chart

    this.style = '11px Tahoma'

    this._g = null

    if (obDefP)
      obDefP(this, 'gradient', {
        get: function () {
          if (!this._g) this._g = new Gradient(this.chart)
          return this._g
        }
      })
    else this._g = this.gradient = new Gradient(chart)

    this.fill = 'black'

    this._sh = null

    if (obDefP)
      obDefP(this, 'shadow', {
        get: function () {
          if (!this._sh) this._sh = new Shadow(this.chart)
          return this._sh
        }
      })
    else this._sh = this.shadow = new Shadow(chart)

    this._s = null

    if (obDefP)
      obDefP(this, 'stroke', {
        get: function () {
          if (!this._s) {
            this._s = new Stroke(this.chart)
            this._s.fill = ''
          }
          return this._s
        }
      })
    else {
      this._s = this.stroke = new Stroke(chart)
      this._s.fill = ''
    }

    this.textAlign = 'center'
    this.baseLine = 'alphabetic'
  }

  /**
   * @returns {Number} Returns the size of font, or 20 if it can't be guessed.
   */
  Font.prototype.getSize = function () {
    var s = this.style.split(' '),
      t,
      res
    for (t = 0; t < s.length; t++) {
      res = parseFloat(s[t])
      if (res) return res
    }

    return 20
  }

  Font.prototype.setSize = function (value) {
    var tmp = '',
      s = this.style.split(' '),
      t
    for (t = 0; t < s.length; t++) parseFloat(s[t]) ? (tmp += value.toString() + 'px ') : (tmp += s[t] + ' ')

    this.style = tmp
  }

  Font.prototype.prepare = function () {
    var c = this.chart.ctx
    c.textAlign = this.textAlign
    c.textBaseline = this.baseLine

    if (this._sh) this._sh.prepare(c)

    if (c.font != this.style)
      // speed opt.
      c.font = this.style
  }

  /**
   * @private
   **/
  Font.prototype.setChart = function (chart) {
    this.chart = chart
    if (this._g) this._g.chart = chart
    if (this._sh) this._sh.chart = chart
    if (this._s) this._s.setChart(chart)
  }

  /**
   * Draws a dashed line.
   * @param {Number} x Starting line horizontal position in pixels.
   * @param {Number} y Starting line vertical position in pixels.
   * @param {Number} x2 Ending line horizontal position in pixels.
   * @param {Number} y2 Ending line vertical position in pixels.
   * @param {Number[]} [da] Optional array of dash offsets.
   */
  function dashedLine(ctx, x, y, x2, y2, da) {
    if (!da) da = [10, 5]

    ctx.save()

    var dx = x2 - x,
      dy = y2 - y,
      len = Math.sqrt(dx * dx + dy * dy),
      rot = Math.atan2(dy, dx)
    ctx.translate(x, y)
    ctx.moveTo(0, 0)
    ctx.rotate(rot)
    var dc = da.length,
      di = 0,
      draw = true
    x = 0
    while (len > x) {
      x += da[di++ % dc]
      if (x > len) x = len
      draw ? ctx.lineTo(x, 0) : ctx.moveTo(x, 0)
      draw = !draw
    }
    ctx.restore()
  }

  /**
   * @constructor
   * @public
   * @class Contains visual parameters like fill, shadow, image, font.
   * @param {Tee.Chart} chart The parent chart this format object belongs to.
   * @property {Tee.Gradient} gradient Gradient properties to fill contents.
   * @property {Color} fill Color used to paint contents interior.
   * @property {Tee.Stroke} stroke Properties to draw lines around boundaries.
   * @property {Tee.Shadow} shadow Properties to draw a backdrop shadow.
   * @property {Tee.Font} font Properties to fill text.
   * @property {Boolean} doSuperNums Default false. When true renders font as superscript.
   * @property {Boolean} doSubNums Default false. When true renders font as subscript.
   * @property {Tee.ChartImage} image Image to fill background.
   * @property {Tee.Point} round Width and height of rectangle rounded corners.
   * @property {Number} transparency Controls the transparency, from 0 (opaque) to 1 (transparent).
   */
  Tee.Format = function (chart) {
    this.chart = chart

    this.gradient = new Gradient(chart)
    this.fill = 'rgb(200,200,200)'

    this.stroke = new Stroke(chart)

    this.round = { x: 0, y: 0 }
    this.transparency = 0

    this.doSuperNums = false
    this.doSubNums = false

    this.font = new Font(chart)

    this._img = null

    if (obDefP)
      obDefP(this, 'image', {
        get: function () {
          if (!this._img) this._img = new ChartImage(this.chart)
          return this._img
        }
      })
    else this._img = this.image = new ChartImage(chart)

    this.shadow = new Shadow(chart)

    /**
     * Draws a rectangle with rounded corners
     * @param {Number} x Position in pixels of left side of rectangle.
     * @param {Number} y Position in pixels of top side of rectangle.
     * @param {Number} width Amount in pixels of rectangle width.
     * @param {Number} height Amount in pixels of rectangle height.
     * @param {Number} xr Amount in pixels of corners radius width.
     * @param {Number} yr Amount in pixels of corners radius height.
     * @param {Boolean[]} [corners] Optional, defines to paint top-left, top-right, bottom-left and bottom-right corners.
     */
    this.roundRect = function (ctx, x, y, width, height) {
      if (ctx.roundRect) {
        ctx.roundRect(x, y, width, height, this.round.x, this.round.y)
        return
      }

      var r = x + width,
        b = y + height,
        xr = this.round.x,
        yr = this.round.y,
        c = this.round.corners

      if (height < 0) {
        y = b
        b = y - height
      }

      if (width < 0) {
        x = r
        r = x - width
      }

      if (2 * xr > width) xr = width * 0.5
      if (2 * yr > height) yr = height * 0.5

      !c || c[0] ? ctx.moveTo(x + xr, y) : ctx.moveTo(x, y)

      if (!c || c[1]) {
        ctx.lineTo(r - xr, y)
        ctx.quadraticCurveTo(r, y, r, y + yr)
      } else ctx.lineTo(r, y)

      if (!c || c[2]) {
        ctx.lineTo(r, b - yr)
        ctx.quadraticCurveTo(r, b, r - xr, b)
      } else ctx.lineTo(r, b)

      if (!c || c[3]) {
        ctx.lineTo(x + xr, b)
        ctx.quadraticCurveTo(x, b, x, b - yr)
      } else ctx.lineTo(x, b)

      if (!c || c[0]) {
        ctx.lineTo(x, y + yr)
        ctx.quadraticCurveTo(x, y, x + xr, y)
      } else ctx.lineTo(x, y)

      ctx.closePath()
    }

    /**
     * @returns {Number} Returns the height in pixels of a given text using current font size and attributes.
     */
    this.textHeight = function (/*text*/) {
      return this.font.getSize() * 1.3

      //var s=document.createElement("span");
      //s.font=this.font.style;
      //s.textContent=text;
      //return s.offsetHeight;

      //return 20;
    }

    /**
     * @returns {Number} Returns the width in pixels of a given text using current font size and attributes.
     */
    this.textWidth = function (text) {
      return this.chart.ctx.measureText(text).width
    }

    this.fillBack = function (c, getbounds, x, y, width, height) {
      if (this.gradient.visible) {
        c.fillStyle = getbounds ? this.gradient.create(getbounds()) : this.gradient.rect(x, y, width, height)
        c.fill()
      } else if (this.fill !== '') {
        c.fillStyle = this.fill
        c.fill()
      }
    }

    // (Firefox bottleneck)

    this.draw = function (c, getbounds, x, y, width, height) {
      var i = this._img,
        oldtransp

      if (typeof x === 'object') {
        y = x.y
        width = x.width
        height = x.height
        x = x.x
      }

      if (this.transparency > 0) {
        oldtransp = c.globalAlpha
        c.globalAlpha = (1 - this.transparency) * oldtransp
      }

      this.shadow.prepare(c)

      if (i && i.visible && i.url !== '') {
        c.save()
        c.clip()

        if (i.backFill == true) {
          this.fillBack(c, getbounds, x, y, width, height)
        }

        if (getbounds) {
          var r = getbounds()
          i.tryDraw(r.x, r.y, r.width, r.height)
        } else i.tryDraw(x, y, width, height)

        c.restore()
      } else {
        this.fillBack(c, getbounds, x, y, width, height)
      }

      if (this.stroke.fill !== '') {
        this.stroke.prepare()
        c.stroke()
      }

      if (this.transparency > 0) c.globalAlpha = oldtransp
    }

    this.subNums = function (str) {
      var newStr = ''

      for (var i = 0; i < str.length; i++) {
        //  Get the code of the current character
        var code = str.charCodeAt(i)
        if (code >= 48 && code <= 57) {
          //  If it's between "0" and "9", offset the code ...
          newStr += String.fromCharCode(code + 8272)
        } else {
          //   ... otherwise keep the character
          newStr += str[i]
        }
      }

      return newStr
    }

    this.superNums = function (str) {
      var newStr = ''

      for (var i = 0; i < str.length; i++) {
        //  Get the code of the current character
        var code = str.charCodeAt(i)
        if (code == 48 || (code >= 52 && code <= 57)) {
          //  If it's between "0" and "9", offset the code ...
          newStr += String.fromCharCode(code + 8256)
        } else if (code == 49) newStr += String.fromCharCode(185)
        else if (code == 50) newStr += String.fromCharCode(178)
        else if (code == 51) newStr += String.fromCharCode(179)
        else {
          //   ... otherwise keep the character
          newStr += str[i]
        }
      }

      return newStr
    }

    this.drawText = function (bounds, text) {
      var g = this.font._g,
        c = this.chart.ctx,
        s = this.font._s,
        a = this.font.textAlign,
        x = bounds.x,
        y = bounds.y

      function xy(text) {
        c.fillText(text, x, y)

        if (s && s.fill !== '') {
          s.prepare()
          c.strokeText(text, x, y)
        }
      }

      if (this.font.lineThrough) {
        c.beginPath()
        c.moveTo(bounds.x, bounds.y + bounds.height * 0.4)
        c.lineTo(bounds.x + bounds.width, bounds.y + bounds.height * 0.4)
        c.stroke()
        c.closePath()
      }

      c.fillStyle = g && g.visible && bounds ? g.create(bounds) : this.font.fill

      if (a == 'center') x += 0.5 * bounds.width
      else if (a == 'right' || a == 'end') x += bounds.width

      var rows = (text + '').split('\n'),
        l = rows.length

      if (l > 1) {
        var h = this.textHeight(rows[0])

        for (var t = 0; t < l; t++) {
          if (this.doSuperNums) xy(this.superNums(rows[t]))
          else if (this.doSubNums) xy(this.subNums(rows[t]))
          else xy(rows[t])

          y += h
        }
      } else {
        if (this.doSuperNums) xy(this.superNums(text))
        else if (this.doSubNums) xy(this.subNums(text))
        else xy(text)
      }
    }

    this.rectangle = function (x, y, width, height) {
      if (this.transparency < 1) {
        if (typeof x === 'object') this.rectangle(x.x, x.y, x.width, x.height)
        else {
          this.rectPath(x, y, width, height)
          this.draw(this.chart.ctx, null, x, y, width, height)
        }
      }
    }

    // Returns "r" rectangle around points xy array.

    this.polygonBounds = function (points, r) {
      var x0 = 0,
        y0 = 0,
        x1 = 0,
        y1 = 0,
        l = points.length,
        p,
        t

      if (l > 0) {
        x0 = x1 = points[0].x
        y0 = y1 = points[0].y

        for (t = 1; t < l; t++) {
          p = points[t].x
          if (p < x0) x0 = p
          else if (p > x1) x1 = p
          p = points[t].y
          if (p < y0) y0 = p
          else if (p > y1) y1 = p
        }
      }

      r.x = x0
      r.y = y0
      r.width = x1 - x0
      r.height = y1 - y0
    }

    var tmp = new Rectangle()

    this.polygon = function (points) {
      var c = this.chart.ctx,
        l = points.length,
        t

      c.beginPath()
      c.moveTo(points[0].x, points[0].y)

      for (t = 1; t < l; t++) c.lineTo(points[t].x, points[t].y)

      c.closePath()

      var _this = this

      this.draw(c, function () {
        _this.polygonBounds(points, tmp)
        return tmp
      })
    }
  }

  Tee.Format.prototype.ellipsePath = function (c, cx, cy, width, height) {
    /*
    var w=width*0.5, top=centerY-height, bot=centerY+height;

    c.beginPath();
    c.moveTo(centerX, top);
    c.bezierCurveTo(centerX + w, top, centerX + w, bot, centerX, bot);
    c.bezierCurveTo(centerX - w, bot, centerX - w, top, centerX, top);
    c.closePath();
    */

    if (this.chart.__webgl) {
      c.z = this.z
      c.depth = this.depth
      c.ellipsePath(cx, cy, width, height)
    } else {
      c.save()
      c.translate(cx, cy)
      c.scale(width * 0.5, height * 0.5)
      c.beginPath()
      c.arc(0, 0, 1, 0, 2 * Math.PI, false)
      //c.scale(height*0.5,width*0.5);
      c.restore()
    }
  }

  Tee.Format.prototype.ellipse = function (cx, cy, width, height) {
    var c = this.chart.ctx
    this.ellipsePath(c, cx, cy, width, height)
    this.draw(c, null, cx - width * 0.5, cy - height * 0.5, width, height)
  }

  Tee.Format.prototype.sphere = function (cx, cy, width, height) {
    if (this.chart.__webgl) {
      var ctx = this.chart.ctx
      ctx.depth = this.depth
      ctx.z = this.z

      if (this.gradient.visible) ctx.fillStyle = this.gradient.colors[this.gradient.colors.length - 1]

      ctx.sphere(cx, cy, width, height)
    } else this.ellipse(cx, cy, width, height)
  }

  Tee.Format.prototype.cylinder = function (r, topradius, vertical, inverted) {
    if (this.chart.__webgl) {
      var ctx = this.chart.ctx
      ctx.depth = this.depth
      ctx.z = this.z
      ctx.image = this.image
      ctx.cylinder(r, topradius, vertical, inverted)
      return
    } else if (topradius == 1) this.cube(r)
    else {
      var w = r.width,
        h = r.height

      if (vertical) this.polygon([new Point(r.x + w * 0.5, r.y), new Point(r.x, r.y + h), new Point(r.x + w, r.y + h)])
      else this.polygon([new Point(r.x + w, r.y + h * 0.5), new Point(r.x, r.y), new Point(r.x, r.y + h)])
    }
  }

  Tee.Format.prototype.cube = function (r) {
    var a = this.chart.aspect,
      is3D = a.view3d,
      w,
      h,
      old,
      ax = 0,
      ay = 0

    if (is3D) {
      if (this.chart.__webgl) {
        var ctx = this.chart.ctx
        ctx.depth = this.depth
        ctx.z = this.z
        ctx.cube(r, this.round.x)
        return
      }

      var z = this.z,
        depth = this.depth

      ;(ax = z * a._orthox), (ay = -z * a._orthoy)

      w = r.x + r.width
      h = r.y + r.height

      var dx = depth * a._orthox,
        dy = -depth * a._orthoy

      old = this.shadow.visible
      this.shadow.visible = false

      var ww = w + dx,
        hh = r.y + dy

      if (depth > 0) {
        this.polygon([
          { x: w, y: r.y },
          { x: ww, y: hh },
          { x: ww, y: h + dy },
          { x: w, y: h }
        ])

        if (r.width > 0)
          this.polygon([
            { x: r.x, y: r.y },
            { x: r.x + dx, y: hh },
            { x: ww, y: hh },
            { x: w, y: r.y }
          ])
      }
    }

    this.rectPath(r.x + ax, r.y + ay, r.width, r.height)

    if (is3D) this.shadow.visible = old
  }

  Tee.Format.prototype.rectPath = function (x, y, width, height) {
    var c = this.chart.ctx

    c.beginPath()

    if (this.round.x > 0 && this.round.y > 0) this.roundRect(c, x, y, width, height)
    else c.rect(x, y, width, height)
  }

  /**
   * @private
   */
  Tee.Format.prototype.setChart = function (chart) {
    this.chart = chart
    this.shadow.chart = chart
    this.gradient.chart = chart
    this.font.setChart(chart)
    if (this._img) this._img.chart = chart
    this.stroke.setChart(chart)
  }

  /**
   * @constructor
   * @augments Tee.Tool
   * @class Represents a rectangle containing text
   * @param {Tee.Chart} chart The parent chart this annotation belongs to.
   * @param {String} text The text to draw inside the annotation.
   * @param {Number} [x=10] Optional left side position in pixels.
   * @param {Number} [y=10] Optional top side position in pixels.
   * @property {Tee.Margins} margins Properties to control spacing between text and rectangle boundaries.
   * @property {Boolean} visible When true, the annotation is displayed.
   * @property {Boolean} transparent When true, the annotation background is not displayed. Only the text is painted.
   * @property {Tee.Format} format Properties to control the annotation background and text appearance.
   */
  Tee.Annotation = function (chart, text, x, y) {
    Tee.Tool.call(this, chart)

    /**
     * @property {Tee.Point} position Top-left coordinates of annotation rectangle.
     * @default x:10, y:10
     */
    this.position = new Point(x || 10, y || 10)

    var m = (this.margins = new Margins())

    this.items = []

    var b = (this.bounds = new Rectangle())
    this.visible = true
    this.transparent = false
    this.text = text || ''
    this.isDom = false
    this.domElement = null
    this.domStyle = 'border-radius: 5px;border: 2px solid #faad44;background: #FFF;padding:5px;'
    var f = (this.format = new Tee.Format(chart))

    f.font.textAlign = 'center'
    f.font.baseLine = 'top'
    f.fill = 'beige'
    f.round = { x: 4, y: 4 }
    f.stroke.fill = 'silver'
    f.shadow.visible = true

    f.depth = 0.05
    f.z = 0.5

    var fontH, thisH, over

    this.getDOMHeight = function () {
      return this.domElement == null ? 0 : this.domElement.offsetHeight
    }
    this.getDOMWidth = function () {
      return this.domElement == null ? 0 : this.domElement.offsetWidth
    }
    this.moveTo = function (x, y) {
      this.position.x = x
      this.position.y = y

      this.resize()
    }

    function isEmpty(str) {
      return !str || 0 === str.length
    }

    this.shouldDraw = function () {
      return this.visible && !isEmpty(this.text)
    }

    this.resize = async function () {
      if (isEmpty(this.text)) return

      f.font.prepare()

      this.rows = this.text.split('\n')
      fontH = f.textHeight(this.text)

      var l = this.rows.length

      thisH = fontH * l + m.top

      var w,
        h = thisH + m.bottom

      if (l > 1) {
        w = 0
        while (l--) w = Math.max(w, f.textWidth(this.rows[l] + 'W'))
      } else w = f.textWidth(this.text + 'W')

      w += m.left + m.right

      var pos = this.position,
        p = pos.y + thisH,
        t,
        i
      /*
    for(t=0; i=this.items[t++];)
    {
      var bi=i.bounds;
      i.resize();
      h+=bi.height;
      w=Math.max(w,bi.width);
      bi.x=pos.x;
      bi.y=p;
      p+=bi.height;
    }

    for(t=0; i=this.items[t++];)
      i.bounds.width=w-m.right;
      */
      b.set(pos.x, pos.y, w, h)
    }

    this.add = function (text) {
      var a = new Tee.Annotation(this.chart, text)

      this.items.push(a) //[this.items.length]=a;
      a.transparent = true
      return a
    }

    this.doDraw = async function () {
      if (!isEmpty(this.text)) {
        if (this.isDom) {
          await this.drawDOMText()
        } else {
          if (this.transparent) this.chart.ctx.z = f.z
          else if (this.chart.aspect.view3d && this.format.depth > 0) {
            var oldz = f.z
            f.z -= this.format.depth * 0.5
            f.cube(b)
            f.draw(this.chart.ctx, null, b)
            f.z = oldz
          } else {
            this.chart.ctx.z = f.z
            f.rectangle(b)
          }

          var old,
            ft = this.format.transparency,
            ctx = this.chart ? this.chart.ctx : null

          if (ft > 0) {
            old = ctx.globalAlpha
            ctx.globalAlpha = (1 - ft) * old
          }

          f.font.prepare()

          b.y += m.top + 0.1 * fontH
          b.x += m.left

          var w = b.width
          b.width -= m.right

          /*
      if (this.transform) {
       ctx.save();
       this.transform(b);
      }
      */

          f.drawText(b, this.text)

          //if (this.transform) ctx.restore();

          b.x = this.position.x
          b.y = this.position.y
          b.width = w

          if (ft > 0) ctx.globalAlpha = old
        }
        /*
    for(var t=0, i; i=this.items[t++];)
       i.doDraw();
       */
      }
    }

    /**
     * @returns {Boolean} Returns if {@link Tee.Point} p is inside this Annotation bounds.
     */
    this.clicked = function (p) {
      return this.visible && b.contains(p) // (&& this.text!="")
    }

    this.doMouseMove = function (p) {
      this.mouseinside = this.clicked(p)

      if (this.mouseinside) {
        if (this.cursor) this.chart.newCursor = this.cursor

        if (!this.wasinside) over = new AnimateHover(250, b, f)
      } else if (this.wasinside) {
        over.restore()
        this.chart.draw()
      }

      this.wasinside = this.mouseinside
    }

    this.mousemove = function (p) {
      if (this.cursor && this.cursor != 'default') this.doMouseMove(p)
    }

    this.forceDraw = function () {
      this.resize()
      this.doDraw()
    }

    this.setChart = function (chart) {
      this.chart = chart
      this.format.setChart(chart)
    }

    this.drawDOMText = async function () {
      if (this.domElement) await this.resize() //when awaited, actions a correct update on DOM text (!)

      var rect = this.chart.canvas.getBoundingClientRect()
      var opacity = this.transparent ? 'opacity:0;' : 'opacity:1;'
      if (!this.domElement) {
        this.domElement = document.createElement('div')
        document.body.appendChild(this.domElement)
      }
      //this.chart.canvas.setAttribute('style', 'z-index:1;');
      if (this.visible == false)
        this.domElement.setAttribute(
          'style',
          'visibility:hidden; position:absolute;top:' +
            (this.position.y + rect.top) +
            'px;left:' +
            (this.position.x + rect.left) +
            'px;display:block;z-index:10000;' +
            this.domStyle +
            opacity
        )
      else
        this.domElement.setAttribute(
          'style',
          'visibility:visible; position:absolute;top:' +
            (this.position.y + rect.top) +
            'px;left:' +
            (this.position.x + rect.left) +
            'px;display:block;z-index:10000;' +
            this.domStyle +
            opacity
        )
      if (this.domElement.innerHTML != this.text) this.domElement.innerHTML = this.text
    }
  }

  Tee.Annotation.prototype = new Tee.Tool()

  Tee.Annotation.prototype.draw = async function () {
    if (this.isDom) await this.drawDOMText()
    else if (this.visible) this.forceDraw()
  }

  /**
   * @constructor
   * @augments Tee.Tool
   * @class Allows dragging series data by mouse or touch
   * @param {Tee.Chart} chart The parent chart this tool belongs to.
   * @property {Tee.Series} [series=null] A series to be dragged, or null to drag all.
   */
  Tee.DragTool = function (chart) {
    Tee.Tool.call(this, chart)

    this.series = null

    var ta = (this.target = { series: null, index: -1 })

    this.clicked = function () {
      ta.series = null
      ta.index = -1
    }

    var p = new Point(0, 0)

    this.Point = p

    this.mousedown = function (event) {
      var s = this.chart.series.items,
        t,
        len = s.length

      this.chart.calcMouse(event, p)

      ta.series = null
      ta.index = -1

      if (this.series && this.series.visible) {
        ta.index = this.series.clicked(p)
        if (ta.index != -1) ta.series = this.series
      } else
        for (t = 0; t < len; t++) {
          if (s[t].visible) {
            ta.index = s[t].clicked(p)
            if (ta.index != -1) {
              ta.series = s[t]
              break
            }
          }
        }

      return ta.index != -1
    }

    this.mousemove = function (p) {
      if (ta.index != -1) {
        var s = ta.series,
          tmp = s.mandatoryAxis.fromPos(s.yMandatory ? p.y : p.x)

        if (this.onchanging) tmp = this.onchanging(this, tmp)

        s.data.values[ta.index] = tmp

        if (this.onchanged) this.onchanged(this, tmp)
        this.chart.draw()
      }
    }
  }

  Tee.DragTool.prototype = new Tee.Tool()

  /**
   * @constructor
   * @augments Tee.Tool
   * @class Draws mouse draggable horizontal and / or vertical lines inside axes
   * @param {Tee.Chart} chart The parent chart this cursor tool belongs to.
   * @property {String} direction Determines if the cursor will be displayed as "vertical", "horizontal" or "both".
   * @property {Tee.Format} format Properties to control the cursor lines stroke appearance.
   * @property {Tee.Point} size The size of cursor, {x:0, y:0} means lines will cover full axes bounds.
   * @property {boolean} followMouse When true the cursor follows mouse movement over the chart.
   */
  Tee.CursorTool = function (chart) {
    Tee.Tool.call(this, chart)

    this.direction = 'both' // "vertical", "horizontal", "both"
    this.size = new Point(0, 0)

    this.followMouse = true
    this.dragging = -1

    this.format = new Tee.Format(chart)

    this.horizAxis = chart ? chart.axes.bottom : null
    this.vertAxis = chart ? chart.axes.left : null

    var old,
      r = new Rectangle()

    this.over = function (p) {
      var res = -1
      if (r.contains(p)) {
        var v = Math.abs(old.x - p.x) < 3,
          h = Math.abs(old.y - p.y) < 3,
          d = this.direction
        if (d == 'both' && v && h) res = 0
        else if (v && (d == 'both' || d == 'vertical')) res = 1
        else if (h && (d == 'both' || d == 'horizontal')) res = 2
      }
      return res
    }

    this.calcRect = function () {
      var cr = chart.chartRect,
        h = this.horizAxis,
        v = this.vertAxis

      r.x = h ? h.startPos : cr.x
      r.width = h ? h.endPos - r.x : cr.width

      r.y = v ? v.startPos : cr.y
      r.height = v ? v.endPos - r.y : cr.height
    }

    var pp = new Point(0, 0)

    this.mousedown = function (p) {
      this.chart.calcMouse(p, pp)
      this.dragging = this.followMouse ? -1 : this.over(pp)
      return this.dragging > -1
    }

    this.clicked = function () {
      this.dragging = -1
    }

    this.mousemove = function (p) {
      var d = this.dragging,
        fm = this.followMouse

      if (fm || d > -1) {
        if (!old) old = new Point()

        if (old.x != p.x || old.y != p.y) {
          this.calcRect()

          if (r.contains(p)) {
            if (fm || d === 0 || d === 1) old.x = p.x
            if (fm || d === 0 || d === 2) old.y = p.y

            if (this.render == 'full') this.chart.draw()
            else {
              //Restore initial canvas before drawing cursor to clean previous position

              if (canvasCopy)
                if (this.render == 'copy') this.chart.ctx.drawImage(canvasCopy, 0, 0)
                else {
                  var b = chart.bounds
                  ctxCopy.clearRect(b.x, b.y, b.width, b.height)
                }

              this.dodraw(this.render == 'copy' ? this.chart.ctx : ctxCopy)
            }

            if (this.onchange) this.onchange(p)

            return
          }
        }
      }

      var o = this.over(p)

      if (old && o > -1) {
        this.chart.newCursor = o === 0 ? 'move' : o === 1 ? 'e-resize' : 'n-resize'
      } else this.chart.newCursor = 'default'
    }

    this.render = 'copy'

    var canvasCopy, ctxCopy

    this.setRender = function (r) {
      this.render = r

      if (canvasCopy) {
        this.resetCopy()
        this.chart.draw()
      }
    }

    this.resetCopy = function () {
      var ca = this.chart.canvas

      if (this.render == 'layer') {
        canvasCopy.style.position = 'absolute'
        ca.parentNode.appendChild(canvasCopy)

        canvasCopy.setAttribute('left', ca.offsetLeft + 'px')
        canvasCopy.setAttribute('top', ca.offsetTop + 'px')

        canvasCopy.style.left = ca.offsetLeft
        canvasCopy.style.top = ca.offsetTop

        canvasCopy.style.zIndex = 10
        canvasCopy.style.pointerEvents = 'none'
      } else if (canvasCopy.parentNode) canvasCopy.parentNode.removeChild(canvasCopy)
    }

    this.draw = function () {
      if (this.render == 'full') this.dodraw(this.chart.ctx)
      else {
        if (!canvasCopy) {
          canvasCopy = this.chart.canvas.cloneNode()
          this.resetCopy()
          ctxCopy = canvasCopy.getContext('2d') // ,{alpha:false} (opaque canvas)
        }

        if (this.render == 'copy') {
          //var b=chart.bounds;
          //ctxCopy.clearRect(b.x,b.y,b.width,b.height);
          ctxCopy.drawImage(chart.canvas, 0, 0)

          this.dodraw(this.chart.ctx)
        } else this.dodraw(ctxCopy)
      }
    }

    this.dodraw = function (c) {
      var d = this.direction,
        both = d == 'both',
        p

      this.calcRect()

      if (!old) old = new Point(r.x + 0.5 * r.width, r.y + 0.5 * r.height)

      c.beginPath()

      if (both || d == 'vertical') {
        p = this.size.y * 0.5
        c.moveTo(old.x, p === 0 ? r.y : old.y - p)
        c.lineTo(old.x, p === 0 ? r.y + r.height : old.y + p)
      }

      if (both || d == 'horizontal') {
        p = this.size.x * 0.5
        c.moveTo(p === 0 ? r.x : old.x - p, old.y)
        c.lineTo(p === 0 ? r.x + r.width : old.x + p, old.y)
      }

      this.format.stroke.prepare(this.format.stroke.fill, c)
      c.stroke()
    }
  }

  Tee.CursorTool.prototype = new Tee.Tool()

  /**
   * @constructor
   * @augments Tee.Tool
   * @class Shows an annotation when mouse is over a series data point
   * @param {Tee.Chart} chart The parent chart this tooltip belongs to.
   * @property {Boolean} [autoHide=false] When true, the tooltip is automatically removed after "delay" milliseconds.
   * @property {Number} [delay=1000] Amount of milliseconds to wait before removing the last displayed tooltip (when "autoHide" is true).
   * @property {Number} [animated=100] Duration in milliseconds to animate the movement of tooltip from old to new position.
   * @property {Boolean} [findPoint=false] When true, the tooltip jumps to the nearest point.
   * @property {Boolean} [realTime=false] When true, unmoved tip provides live updates on changing point values.
   */
  Tee.ToolTip = function (chart) {
    Tee.Annotation.call(this, chart)
    this.pointer = {
      fill: 'Green',
      firstCircleRadius: '2',
      secondCircleRadius: '5',
      visible: false,
      firstCircleOpacity: '1',
      secondCircleOpacity: '0.4',
      animationVisible: true,
      animationDuration: 200
    }
    this.visible = false
    this.findPoint = false

    /**
     * @private
     */
    this.currentSeries = null
    /**
     * @private
     */
    this.currentIndex = -1

    this.realTime = false
    /**
     * @private
     */
    this.timID = null

    this.autoHide = false
    this.delay = 1000
    this.animated = 100
    this.autoRedraw = true
    this.render = 'dom'
    this.domStyle = 'padding:5px; margin-left:5px; background-color:#FFF; border-radius:4px 4px; color:#222;'

    this.hide = async function () {
      var isDom = this.render === 'dom'

      if (this.visible || isDom) {
        if (this.onhide) this.onhide(this)

        this.visible = false

        if (this.autoRedraw)
          if (isDom) Tee.DOMTip.hide()
          else this.chart.draw()

        this.currentIndex = -1
        this.currentSeries = null
      }
    }

    var redraw = function (args) {
      if (args) args[0].hide()
    }

    this.mousemove = async function (p) {
      var li = this.chart.series,
        len = li.count(),
        ser = null,
        index = -1
      if (this.chart.chartRect.contains(p))
        for (var t = len - 1; t >= 0; t--) {
          var s = li.items[t]

          if (s.visible) {
            index = s.clicked(p)
            if (index == -1 && s.continuous) {
              index = Math.round(this.chart.axes.bottom.fromSizeCalcIndex(p.x - this.chart.axes.bottom.startPos))
              var distance, oldDistance
              for (var n = 0; n < len; n++) {
                distance = Math.abs(li.items[n].data.values[index] - this.chart.axes.left.fromPos(p.y))
                if (n == 0) {
                  oldDistance = distance
                  s = li.items[n]
                } else if (distance < oldDistance) {
                  s = li.items[n]
                }
              }
            }

            if (index != -1) {
              ser = s
              this.currP = p
              break
            }
          }
        }
      else {
        index = -1
        this.currP = undefined
      }
      if (index == -1) {
        this.currP = undefined
        this.hide()

        this.currentIndex = -1
        this.currentSeries = null
      } else if (index != this.currentIndex || ser != this.currentSeries || this.realTime) {
        this.currentIndex = index
        this.currentSeries = ser

        if (ser) {
          await this.refresh(ser, index)

          if (this.autoHide && this.delay > 0) {
            clearTimeout(this.timID)
            this.timID = await window.setTimeout(redraw, this.delay, [this])
          }
        }
      }
    }

    var o = null

    function step() {
      function changeTo(f) {
        o.moveTo(o.oldX + f * o.deltaX, o.oldY + f * o.deltaY)
        if (o.autoRedraw) o.chart.draw()
      }

      var now = new Date().getTime(),
        f = (now - o.init) / o.animated

      if (f < 1) {
        changeTo(f)
        window.requestAnimFrame(step, o)
      } else changeTo(1)
    }

    this.refresh = async function (series, index) {
      var isDom = this.render === 'dom'
      this.visible = !isDom

      this.text = series.markText(index)

      if (this.ongettext) this.text = await this.ongettext(this, this.text, series, index)

      if (this.text !== '') {
        this.resize()

        var p = new Point()
        series.calc(index, p)

        p.x -= this.bounds.width * 0.5
        p.y -= 1.5 * this.bounds.height

        if (p.x < 0) p.x = 0
        if (p.y < 0) p.y = 0

        if (!isDom && !this.autoHide && this.animated > 0 && !isNaN(this.position.x) && !isNaN(this.position.y)) {
          this.oldX = this.position.x
          this.oldY = this.position.y

          this.deltaX = p.x - this.oldX
          this.deltaY = p.y - this.oldY

          this.init = new Date().getTime()
          o = this
          window.requestAnimFrame(step, this)
        } else {
          this.moveTo(p.x, p.y)

          if (this.autoRedraw)
            if (isDom) Tee.DOMTip.show(this.text, 'auto', this.chart.canvas, this.domStyle, this)
            else this.chart.draw()
        }

        if (this.onshow) this.onshow(this, series, index)
      }
    }
  }

  Tee.ToolTip.prototype = new Tee.Annotation()

  /**
   * @memberOf Tee.Chart
   * @constructor
   * @class Contains a list with all "tools"
   * @param {Tee.Chart} chart The parent chart this tool list belongs to.
   * @property {Tee.Tool[]} items Array of Tee.Tool objects.
   */
  function Tools(chart) {
    this.chart = chart
    this.items = []

    this.draw = function () {
      for (var t = 0, s; (s = this.items[t++]); )
        if (s.active)
          if (s instanceof Tee.ToolTip) {
            if (s.currP != undefined && s.realTime) s.mousemove(s.currP)
            else s.draw()
          } else s.draw()
    }

    this.mousemove = function (p) {
      for (var t = 0, s; (s = this.items[t++]); )
        if (s.active) {
          s.currP = undefined
          s.mousemove(p)
        }
    }

    this.mousedown = function (event) {
      for (var t = 0, s, done = false; (s = this.items[t++]); )
        if (s.active) {
          if (s.mousedown(event)) done = true
        }

      return done
    }

    this.mouseout = function () {
      for (var t = 0, s; (s = this.items[t++]); ) if (s.active) s.mouseout()
    }

    this.clicked = function (p) {
      var l = this.items.length

      for (var t = l, s, done = false; (s = this.items[--t]); ) {
        if (s.active && s.clicked(p)) {
          done = true

          if (s.onclick) done = s.onclick(s, p.x, p.y)
        }
      }

      return done
    }

    /**
     * @returns {Tee.Tool} Returns the tool parameter.
     */
    this.add = function (tool) {
      this.items.push(tool)
      return tool
    }
  }

  // http://simple.wikipedia.org/wiki/Rainbow
  Tee.RainbowPalette = function () {
    return ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#6600FF', '#8B00FF']
  }

  /**
   * @constructor
   * @class Contains an array of colors to be used as series data fill color
   * @param {Color[]} colors The array of colors to build the palette.
   */
  Tee.Palette = function (colors) {
    this.colors = colors
  }

  /**
   * @returns {String} Returns the index'th color in colors array (mod length
   * if index is greater than number of colors).
   * @param {Integer} index The position inside colors array (circular, if index is greater than colors length).
   */
  Tee.Palette.prototype.get = function (index) {
    return this.colors[index == -1 ? 0 : index % this.colors.length]
  }

  /**
   * @constructor
   * @memberOf Tee.Chart
   * @class Controls how to zoom chart axes by mouse or touch drag
   * @param {Tee.Chart} chart The parent chart this zoom object belongs to.
   * @property {Boolean} enabled Allows chart zoom by mouse/touch dragging.
   * @property {Number} mouseButton Defines the mouse button that can be used to zoom (0=Left button, etc).
   * @property {Tee.Format} format Properties to control the appearance of rectangle that appears while dragging.
   * @property {String} [direction="both"] Allows chart zoom in horizontal, vertical or both directions.
   */
  function Zoom(chart) {
    this.chart = chart

    /**
     * @private
     */
    this.active = false

    this.enabled = true

    /**
     * @private
     */
    this.done = false

    this.touching = false
    this.direction = 'both'

    /**
     * When true, zoom rectangle maintains same width to height proportion of Chart.
     */
    this.keepAspect = false

    this.mouseButton = 0
    this.wheel = { enabled: false, factor: 1 }

    var f = (this.format = new Tee.Format(chart))
    f.fill = 'rgba(255,255,255,0.5)'
    f.stroke.fill = 'darkgray'
    f.stroke.size = 2

    //c.ctx.globalCompositeOperation="source-over";

    var r = new Rectangle()

    this.change = function (pos) {
      if (!this.old) this.old = new Point()

      var old = this.chart.oldPos

      this.old.x = pos.x - old.x

      if (this.keepAspect) {
        var r = this.chart.chartRect
        this.old.y = this.old.x * (r.height / r.width)
      } else this.old.y = pos.y - old.y
    }

    function check(z) {
      var c = z.chart.chartRect,
        d = z.direction,
        b = d === 'both'
      r.set(c.x, c.y, c.width, c.height)

      if (z.old) {
        if (b || d === 'horizontal') {
          if (z.old.x < 0) {
            r.x = z.chart.oldPos.x + z.old.x
            r.width = -z.old.x
          } else {
            r.x = z.chart.oldPos.x
            r.width = z.old.x
          }
        }

        if (b || d === 'vertical') {
          if (z.old.y < 0) {
            r.y = z.chart.oldPos.y + z.old.y
            r.height = -z.old.y
          } else {
            r.y = z.chart.oldPos.y
            r.height = z.old.y
          }
        }
      }

      return r
    }

    this.draw = function () {
      f.rectangle(check(this))
    }

    this.apply = function () {
      if (this.old.x < 0 || this.old.y < 0) {
        this.reset()

        if (this.onreset) this.onreset()
      } else {
        check(this)

        if (r.width > 3 && r.height > 3) {
          var d = this.direction,
            b = d === 'both'

          this.chart.axes.each(function () {
            if (this.horizontal) {
              if (b || d === 'horizontal') this.calcMinMax(r.x, r.x + r.width)
            } else if (b || d === 'vertical') this.calcMinMax(r.y + r.height, r.y)
          })

          return true
        }
      }

      return false
    }

    this.reset = function () {
      this.chart.axes.each(function () {
        this.automatic = true
      })
    }
  }

  /**
   * @constructor
   * @memberOf Tee.Chart
   * @class Controls how to scroll chart axes by mouse or touch drag
   * @param {Tee.Chart} chart The parent chart this scroll object belongs to.
   * @property {Boolean} [enabled=true] Allows chart scroll by mouse/touch dragging.
   * @property {Number} [mouseButton=2] Defines the mouse button that can be used to scroll (2=Right button, etc).
   * @property {String} [direction="both"] Determines if scroll is allowed in "horizontal", "vertical" or "both" directions.
   */
  function Scroll(chart) {
    this.chart = chart

    /**
     * @private
     */
    this.active = false

    this.enabled = true

    /**
     * @private
     */
    this.done = false

    this.mouseButton = 2
    this.direction = 'both' // horizontal,vertical,both

    /**
     * @private
     */
    this.position = new Point(0, 0)
  }

  /**
   * @memberOf Tee.Chart
   * @constructor
   * @augments Tee.Annotation
   * @class Displays text at top or bottom chart sides
   * @param {Tee.Chart} chart The parent chart this title object belongs to.
   * @param {Color} fontColor The color to fill the title text.
   * @param {Boolean} [expand=false] When true, title background is aligned to panel.
   */
  function Title(chart, fontColor) {
    Tee.Annotation.call(this, chart)
    this.transparent = true

    this._expand = false

    if (obDefP)
      obDefP(this, 'expand', {
        get: function () {
          return this._expand
        },
        set: function (value) {
          this._expand = value
          if (!this._expand) {
            var ff = this.format
            ff.round.x = 8
            ff.round.y = 8
            ff.round.corners = null
            ff.stroke.fill = 'black'
          }
        }
      })
    else this._expand = this.expand = false

    var f = this.format.font,
      s = f.shadow,
      p = this.position
    s.visible = true
    s.width = 2
    s.height = 2
    s.blur = 8

    f.style = '18px Tahoma'
    f.fill = fontColor

    this.padding = 4

    this.calcRect = function (fromTop) {
      this.resize()

      var h = this.transparent ? 1 : 2,
        b = this.bounds,
        size = b.height + h * this.padding,
        r = chart.chartRect

      if (fromTop) {
        p.y = r.y

        if (r.automatic) r.setTop(r.y + size)
      } else {
        p.y = r.y + r.height - b.height - this.padding

        if (r.automatic) r.height -= size
      }

      if (r.height < 0) r.height = 0

      p.x = 0.5 * (chart.canvas.width - b.width)
    }

    this.tryDraw = function (top) {
      if (this.shouldDraw()) {
        this.calcRect(top)

        var b = this.bounds,
          ctx = this.chart.ctx,
          groups = ctx.beginParent

        this.visual = groups ? ctx.beginParent() : null

        if (this._expand) {
          var f = chart.panel.format
          p.x = f.stroke.fill !== '' ? f.stroke.size : 0
          p.y = top ? p.x : chart.canvas.height - (f.shadow.visible ? f.shadow.height : 0) - p.x - b.height //+1; <-- only when panel border round?

          b.width = chart.canvas.width - (f.shadow.visible ? f.shadow.width : 0) - 2 * p.x

          var ff = this.format
          ff.round.x = f.round.x
          ff.round.y = f.round.y
          ff.round.corners = [top, top, !top, !top]
          ff.stroke.fill = ''

          this.transparent = false
        }

        b.x = p.x
        b.y = p.y

        this.doDraw()

        if (groups) ctx.endParent()
      }
    }
  }

  Title.prototype = new Tee.Annotation()

  /**
   * @memberOf Tee.Chart
   * @constructor
   * @public
   * @class Defines the visual properties for chart background
   * @param {Tee.Chart} chart The parent chart this panel object belongs to.
   * @property {Tee.Margins} margins Controls the spacing between background panel to chart contents.
   * @property {Tee.Format} format Visual properties to paint the chart panel background.
   * @property {Boolean} transparent Determines if panel background will be filled or not.
   */
  function Panel(chart) {
    var f = (this.format = new Tee.Format(chart))
    f.round.x = 12
    f.round.y = 12
    f.stroke.size = 3
    f.gradient.visible = true
    f.gradient.direction = 'bottomtop'
    f.shadow.visible = true
    f.stroke.fill = '#606060'

    this.transparent = !!chart.__webgl

    this.margins = new Margins()

    this.clear = function () {
      var b = chart.bounds
      chart.ctx.clearRect(b.x, b.y, b.width, b.height)
    }

    this.draw = function () {
      if (this.transparent || chart.__webgl) this.clear()
      else {
        var r = chart.chartRect,
          sh = f.shadow

        if (sh.visible) {
          r.width -= 0.5 * Math.abs(sh.width) + 2
          r.height -= 0.5 * Math.abs(sh.height) + 2

          if (sh.width < 0) r.x -= sh.width
          if (sh.height < 0) r.y -= sh.height
        }

        var s = 0

        if (f.stroke.fill !== '') {
          s = f.stroke.size
          if (s > 1) {
            s *= 0.5
            r.x += s
            r.y += s
            r.width -= 2 * s
            r.height -= 2 * s
          }
        }

        if (sh.visible || f.round.x > 0 || f.round.y > 0) this.clear()

        f.rectangle(r)

        if (s > 0) {
          r.x += s
          r.y += s
          r.width -= 2 * s
          r.height -= 2 * s
        }
      }
    }
  }

  /**
   * @memberOf Tee.Chart
   * @constructor
   * @public
   * @class Properties to display a rectangle panel around chart axes
   * @param {Tee.Chart} chart The parent chart this wall object belongs to.
   * @property {Tee.Format} format Defines visual properties to paint this wall.
   * @property {Boolean} [visible=true] Determines if this wall will be displayed or not.
   */
  function Wall(chart) {
    var f = (this.format = new Tee.Format(chart))
    f.fill = '#E6E6E6'
    f.stroke.fill = 'black'
    f.z = 0
    f.depth = 0

    this.visible = true
    this.bounds = new Rectangle()
    this.size = 0

    this.draw = function () {
      f.cube(this.bounds)
      f.draw(chart.ctx, null, this.bounds)
    }
  }

  /**
   * @returns {Number} Returns the integer part of value, without decimals, rounded to lower.
   */
  function trunc(value) {
    return value | 0
  }

  /**
   * @memberOf Tee.Chart
   * @constructor
   * @class Defines a scale from minimum to maximum, to transform series points into chart canvas pixels coordinates.
   * @param {Tee.Chart} chart The chart object this axis object belongs to.
   * @param {Boolean} horizontal Determines if axis is horizontal or vertical.
   * @param {Boolean} otherSide Determines if axis is at top/right or bottom/left side of chart.
   * @property {Tee.Format} format Visual properties to draw the axis line.
   * @property {Tee.Chart.Axis-Labels} labels Properties to display axis labels at tick increments.
   * @property {Tee.Chart.Axis-Grid} grid Properties to display grid lines at tick increments.
   * @property {Tee.Chart.Axis-Ticks} ticks Properties to display tick lines at each increment.
   * @property {Tee.Chart.Axis-Ticks} innerTicks Properties to display tick lines at each increment, inside chart.
   * @property {Tee.Chart.Axis-Ticks} minorTicks Properties to display small tick lines between ticks.
   * @property {Tee.Chart.Axis-Title} title Properties to display text that describes the axis.
   */
  function Axis(chart, horizontal, otherSide) {
    this.chart = chart
    this.visible = true
    this.inverted = false
    this.horizontal = horizontal
    this.otherSide = otherSide
    this.bounds = new Rectangle()

    this.position = 0

    this.format = new Tee.Format(chart)
    this.format.stroke.size = 2
    this.format.depth = 0.2

    this.custom = false

    this.z = otherSide ? 1 : 0

    this.maxLabelDepth = 0

    /**
     * @constructor
     * @public
     * @class Displays text to annotate axes
     * @param {Tee.Chart} chart The chart object this axis labels object belongs to.
     * @property {Tee.Format} format Defines the visual properties to paint the axis title.
     * @property {Boolean} [visible=true] Determines if axis labels will be displayed or not.
     * @property {String} dateFormat="shortDate" Configures string format for date & time labels
     * @property {Number} rotation=0 Defines the label rotation angle from 0 to 360 degree.
     * @property {String} labelStyle="auto" Determines label contents from series data ("auto", "value", "mark", "text").
     * @property {Number} decimals=2 Defines the number of decimals for floating-point numeric labels.
     * @property {Boolean} alternate=false When true, labels are displayed at alternate positions to fit more labels in the same space.
     * @property {String} wordWrap="no" Determines if replace label white spaces with new line ("auto", "yes", "no").
     */
    function Labels(chart, axis) {
      this.chart = chart
      this.format = new Tee.Format(chart)
      this.decimals = 2
      this.fixedDecimals = false
      this.padding = 4
      this.separation = 10 // %
      this.visible = true
      this.rotation = 0
      this.alternate = false
      this.maxWidth = 0

      this.wordWrap = 'no' // auto,yes,no

      this.roundFirst = true
      this.labelStyle = 'auto' // auto,value,mark,text

      this.dateFormat = 'shortDate'

      this.checkStyle = function () {
        var st = this.labelStyle,
          s = axis.firstSeries

        this._text = null
        this._textlabels = null

        if (st == 'auto') {
          if (s.data.labels.length > 0 && s.associatedToAxis(axis) && axis.horizontal == s.notmandatory.horizontal) {
            this._text = s

            /*    if ((this.chart.series.items.length > 1) && (this.chart.series.items[0] instanceof Tee.Bar) 
                                    && (this.chart.series.items[0].stacked == "sideAll")){
        
				var li=chart.series.items, t, tt, ser;
				this._textlabels=this._text.data.labels;
				for(t=1; ser=li[t++];){
				   if (ser.visible && ser.associatedToAxis(axis)) {
					 for(tt=0; tt < ser.data.values.length; tt++){  
					   this._textlabels.push(ser.data.labels[tt]);
				     }
			       }
                }

                if (s === undefined)
                  s="";
            }*/
          }
        } else if (st == 'mark' || st == 'text') this._text = s
      }

      this.formatValueString = function (value) {
        if (this.valueFormat) {
          var DecimalSeparator = Number('1.2').toLocaleString().substr(1, 1)

          var AmountWithCommas = (value * 1).toLocaleString()
          var arParts = String(AmountWithCommas).split(DecimalSeparator)
          var intPart = arParts[0]

          var padding = ''
          if (this.decimals > 0)
            for (var i = 0; i < this.decimals; i++) {
              padding = padding + '0'
            }

          var decPart = arParts.length > 1 ? arParts[1] : ''
          decPart = (decPart + padding).substr(0, this.decimals)

          if (decPart.length > 0) return intPart + DecimalSeparator + decPart
          else return intPart
        } else return value.toFixed(this.decimals)
      }

      /**
       * @returns {String} Returns the series label that corresponds to a given value, (or the value if no label exists).
       */
      this.getLabel = function (value) {
        var v = trunc(value),
          s,
          data

        if (this._text && v == value) {
          data = this._text.data

          if (data.x) v = data.x.indexOf(v)

          var li = chart.series.items,
            t,
            ser

          //specific case: check for non-std sideAll labelling
          if (li.length > 0 && li[0] instanceof Tee.Bar && li[0].stacked == 'sideAll') {
            s = data.labels[value]
          } else {
            s = data.labels[v]
          }

          // Last resort, try to find labels from any series in axis:

          if (!s) {
            for (t = 0; (ser = li[t++]); )
              if (ser != this._text) {
                if (ser.visible && ser.associatedToAxis(axis)) {
                  s = ser.data.labels[v]
                  if (s) break
                }
              }

            if (s === undefined) s = ''
          }
        } else if (axis.dateTime) {
          if (Date.prototype.format)
            // script: src/date.format.js
            s = new Date(value).format(this.dateFormat)
          else s = new Date(value).toDateString() // fallback
        } else s = this.formatValueString(value)

        if (this.wordWrap != 'no' && this.wordWrap != false) {
          s = s.replace(/ /g, '\n')
        }

        if (this.ongetlabel) {
          s = this.ongetlabel(value, s)
          this.format.font.prepare() // <-- in case user code at ongetlabel event has changed the font.
        }

        return '' + s
      }

      /**
       * @returns {Number} Returns the width in pixels of value converted to string.
       */
      this.width = function (value) {
        var oldFixDec = this.fixedDecimals //check widest label when sizing
        this.fixedDecimals = true
        var tmpWidth = this.format.textWidth(this.getLabel(value))
        this.fixedDecimals = oldFixDec
        return tmpWidth
      }
    }

    this.labels = new Labels(chart, this)
    var f = this.labels.format.font

    /**
     * Changes the axis maximum and minimum values
     * @param {Number} delta The positive or negative amount to scroll.
     */
    this.scroll = function (delta) {
      this.automatic = false
      if (this.inverted) delta = -delta
      this.minimum += delta
      this.maximum += delta
    }

    if (horizontal) {
      f.textAlign = 'center'
      f.baseLine = otherSide ? 'bottom' : 'top'
    } else {
      f.textAlign = otherSide ? 'left' : 'right'
      f.baseLine = 'middle'
    }

    /**
     * @constructor
     * @class Format and parameters to display a grid of lines at axes increments
     * @param {Tee.Chart} chart The chart object this axis grid object belongs to.
     * @property {Tee.Format} format Visual properties to draw axis grids.
     * @property {Boolean} [visible=true] Determines if grid lines will be displayed or not.
     * @property {Boolean} [centered=false] Determines if grid lines are displayed at axis label positions or at middle between labels.
     * @property {Boolean} [lineDash=false] Draws grid lines using dash-dot segments or solid lines.
     */
    function Grid(chart) {
      this.chart = chart
      var f = (this.format = new Tee.Format(chart))
      f.stroke.fill = 'silver'
      f.stroke.cap = 'butt'
      f.fill = ''
      this.visible = true
      this.lineDash = false
    }

    this.grid = new Grid(chart)

    /**
     * @constructor
     * @class Stroke parameters to draw small lines at axes labels positions
     * @param {Tee.Chart} chart The chart object this axis ticks object belongs to.
     * @property {Tee.Stroke} stroke Defines the visual attributes used to draw the axis ticks.
     * @property {Number} [length=4] The length of ticks in pixels.
     */
    function Ticks(chart) {
      this.chart = chart
      this.stroke = new Stroke(chart)
      this.stroke.cap = 'butt'
      this.visible = true
      this.length = 4
    }

    this.ticks = new Ticks(chart)

    this.innerTicks = new Ticks(chart)
    this.innerTicks.visible = false

    var m = (this.minorTicks = new Ticks(chart))
    m.visible = false
    m.length = 2
    m.count = 3

    /**
     * @constructor
     * @augments Tee.Annotation
     * @class Text and formatting properties to display near axes
     * @param {Tee.Chart} chart The chart object this axis title object belongs to.
     * @param {Boolean} [transparent=true] Determines if axis title will be displayed or not.
     */
    function Title(chart) {
      Tee.Annotation.call(this, chart)
      this.padding = 4
      this.transparent = true
      this.rotation = 0
      this.format.font.textAlign = 'center'

      this.drawIt = function (textAlign, x, y, rotation) {
        this.format.font.textAlign = textAlign

        if (rotation === 0) {
          this.position.x = x
          this.position.y = y
          this.forceDraw()
        } else {
          var ctx = chart.ctx
          ctx.save()

          ctx.translate(x, y)
          ctx.rotate((-rotation * Math.PI) / 180)

          this.position.x = 0
          this.position.y = 0

          this.forceDraw()
          ctx.restore()
        }
      }
    }

    Title.prototype = new Tee.Annotation()

    this.title = new Title(chart)
    if (!horizontal) this.title.rotation = otherSide ? 270 : 90

    this.automatic = true
    this.minimum = 0
    this.maximum = 0
    this.increment = 0
    this.log = false

    this.startPos = 0
    this.endPos = 0

    this.start = 0 // %
    this.end = 100 // %

    this.axisSize = 0

    this.scale = 0
    this.increm = 0

    function calcWordWrap(f, s) {
      var r = 0,
        w,
        ss = s.split(' '),
        t

      for (t = 0; t < ss.length; t++) {
        w = f.textWidth(ss[t])
        if (w > r) r = w
      }

      return r
    }

    function toRadians(angle) {
      return angle * (Math.PI / 180)
    }

    /**
     * @returns {Number} Returns the approximated width in pixels of largest axis label.
     */
    this.minmaxLabelWidth = function (adjust) {
      var l = this.labels,
        f = l._text,
        w = 0,
        s,
        wordWrap
      var la = this.labels,
        l

      if (f !== null && f !== undefined) {
        wordWrap = l.wordWrap == 'auto' || l.wordWrap == 'yes'

        la.format.font.prepare()

        for (var t = 0, le = f.data.labels.length; t < le; t++) {
          s = f.data.labels[t]
          if (l.ongetlabel) s = l.ongetlabel(t, s)

          if (s) w = Math.max(w, wordWrap ? calcWordWrap(l.format, s) : l.format.textWidth(s))
        }
      } else {
        var mi = this.roundMin(),
          ma = this.maximum
        w = Math.max(l.width(mi), l.width(0.5 * (mi + ma)))

        w = Math.max(w, l.width(0.0000001))
        w = Math.max(w, l.width(ma))
      }

      //adjust for rotation (if any). Are we adjusting or spacing?
      if (l.rotation == 0) {
        if ((this.horizontal && adjust) || (!this.horizontal && !adjust)) {
          w = la.format.textHeight('Wj')
        }
      } else if (this.horizontal) {
        if (adjust) {
          w = Math.abs(Math.sin(toRadians(l.rotation)) * w)
        } else {
          w = Math.abs(Math.cos(toRadians(l.rotation)) * w)
        }
      } else {
        if (adjust) {
          w = Math.abs(Math.cos(toRadians(l.rotation)) * w)
        } else {
          w = Math.abs(Math.sin(toRadians(l.rotation)) * w)
        }
      }

      //guarantee minimum spacing
      if (w < la.format.textHeight('Wj')) w = la.format.textHeight('Wj')
      return w
    }

    this.checkRange = function () {
      if (this.maximum - this.minimum < this.minAxisRange) this.maximum = this.minimum + this.minAxisRange
    }

    this.checkMinMax = function () {
      var s = this.chart.series,
        h = this.horizontal

      if (this.automatic) {
        this.minimum = h ? s.minXValue(this) : s.minYValue(this)
        this.maximum = h ? s.maxXValue(this) : s.maxYValue(this)

        this.checkRange()
      }
    }

    /**
     * @returns {Number} Returns if any visible series has less than n values.
     * Only called from Axis calcIncrement, to avoid axis label increments to be
     * smaller than series number of points.
     */
    function anySeriesHasLessThan(c, n) {
      var t, s, isY

      for (t = 0; (s = c.chart.series.items[t++]); ) {
        if (s.visible && s.sequential) {
          isY = s.yMandatory

          if ((isY && c.horizontal) || (!isY && !c.horizontal)) {
            if (s.associatedToAxis(c)) {
              if (s.count() <= n) return true
            }
          }
        }
      }

      return false
    }

    /**
     * @returns {Number} Returns the next bigger value in the sequence 1,2,5,10,20,50...
     */
    function nextStep(value) {
      if (!isFinite(value)) return 1
      else if (value >= 10) return 10 * nextStep(0.1 * value)
      else if (value < 1) return 0.1 * nextStep(value * 10)
      else return value < 2 ? 2 : value < 5 ? 5 : 10
    }

    /**
     * @returns {Number} Returns the best appropriate distance between axis labels.
     */
    function calcIncrement(c, maxLabelSize) {
      if (c.maximum == c.minimum) return 1
      else {
        var tmp = c.axisSize / maxLabelSize,
          less = anySeriesHasLessThan(c, tmp)
        tmp = Math.abs(c.maximum - c.minimum) / (tmp + 1)
        return less ? Math.max(1, tmp) : nextStep(tmp)
      }
    }

    this.calcAxisScale = function () {
      var range = this.maximum - this.minimum
      if (range === 0) range = 1
      else if (this.log) range = Math.log(range)

      this.scale = this.axisSize / range
    }

    this.calcScale = function () {
      var la = this.labels,
        l

      la.format.font.prepare()
      l = this.minmaxLabelWidth(false)

      if (la.alternate) l *= 0.5

      l *= 1 + la.separation * 0.02

      this.increm = this.increment === 0 ? calcIncrement(this, l) : this.increment

      if (this.increm <= 0) this.increm = 0.1
      else if (this.increm > 0 && this.increm <= 0.00000001) this.increm = 0.00000001
    }

    /**
     * @returns {Boolean} Returns the first visible series associated to this axis, or null if any.
     */
    this.hasAnySeries = function () {
      var li = this.chart.series.items,
        t,
        s,
        d,
        h

      for (t = 0; (s = li[t++]); ) {
        // DB fix Sep-2013, empty series should not be considered:
        if (s.visible && s.associatedToAxis(this) && (s.__alwaysDraw || s.count() > 0)) {
          // Remember now if series "s" has date-time values:

          h = this.horizontal
          if (s.yMandatory) h = !h

          d = h ? s.data.values : s.data.x
          this.dateTime = d && d.length > 0 && d[0] instanceof Date

          return s
        }
      }

      return null
    }

    this.drawAxis = function () {
      var t = this,
        f = t.format,
        c = t.chart.ctx,
        pos = t.axisPos,
        start = t.startPos,
        end = t.endPos

      var rad = 20 * f.depth,
        r

      if (this.chart.aspect.view3d && rad > 0) {
        if (horizontal) r = { x: start, y: pos - rad * 0.5, width: end - start, height: rad }
        else r = { x: pos - rad * 0.5, y: start, width: rad, height: end - start }

        var old = this.z
        f.z = old - f.depth * 0.5
        f.cylinder(r, 1, !horizontal)
        f.draw(c, null, r)
        f.z = old
      } else {
        c.z = this.z

        c.beginPath()

        if (horizontal) {
          c.moveTo(start, pos)
          c.lineTo(end, pos)
        } else {
          c.moveTo(pos, start)
          c.lineTo(pos, end)
        }

        f.stroke.prepare()
        c.stroke()
      }
    }

    this.drawGrids = function () {
      var c = this.chart.ctx,
        p,
        r = this.chart.chartRect,
        f = this.grid.format,
        x1,
        y1,
        x2,
        y2,
        v,
        vmin = this.roundMin()

      if (this.grid.centered) {
        var tmp = this.increm * 0.5
        if (vmin - tmp >= this.minimum) vmin -= tmp
        else vmin += tmp
      }

      var a = this.chart.aspect,
        is3d = a.view3d,
        isOrtho = is3d && a.orthogonal,
        off3d = is3d ? 1 : 0

      c.beginPath()

      if (horizontal) {
        y1 = this.bounds.y - off3d
        y2 = otherSide ? r.getBottom() - 1 : r.y + 1
      } else {
        x1 = this.bounds.x + off3d
        x2 = otherSide ? r.x + 1 : r.getRight() - 1
      }

      var oldpos,
        pos = -1

      if (f.fill !== '') {
        v = vmin

        var old = f.stroke.fill
        f.stroke.fill = ''

        while (v <= this.maximum) {
          p = this.calc(v)

          if (pos % 2 === 0) horizontal ? f.rectangle(oldpos, y2, p - oldpos, y1 - y2) : f.rectangle(x1, oldpos, x2 - x1, p - oldpos)

          oldpos = p

          v += this.increm
          pos++
        }

        f.stroke.fill = old
        c.fillStyle = ''
      }

      v = vmin

      if (isOrtho)
        if (horizontal) {
          y1 -= a._orthoy
          y2 -= a._orthoy
        } else {
          x1 += a._orthox
          x2 += a._orthox
        }

      var isCustomDash = f.stroke.dash && !c.setLineDash && !c.mozCurrentTransform

      c.z = is3d ? this.chart.walls.back.format.z - 0.01 : 0

      while (v <= this.maximum) {
        pos = this.calc(v)

        horizontal ? (x1 = x2 = pos) : (y1 = y2 = pos)

        if (isOrtho) {
          if (horizontal) {
            x1 += a._orthox
            x2 += a._orthox
          } else {
            y1 -= a._orthoy
            y2 -= a._orthoy
          }
        }

        // TODO: lineZ (3D grid sides)

        if (is3d && !this.otherSide && c.lineZ) c.lineZ(x1, y1, 0, c.z)

        if (isCustomDash) dashedLine(c, x1, y1, x2, y2)
        else {
          c.moveTo(x1, y1)
          c.lineTo(x2, y2)
        }

        v += this.increm
      }

      f.stroke.prepare()
      f.shadow.prepare(c)

      c.stroke()
    }

    function truncFloat(n) {
      return n - (n % 1)
    }

    /**
     * @returns {Number} Returns the axis minimum value rounded according the axis increment distance.
     */
    this.roundMin = function () {
      // OLD: var v=trunc(this.minimum/this.increm);

      // NEW: Fix against rounding precision of "trunc" (|0) operator:

      if (this.increm === 0 || !this.labels.roundFirst) return this.minimum
      else {
        //var v = parseFloat(new Number(this.minimum/this.increm).toFixed(0));

        var v = truncFloat(this.minimum / this.increm)

        return this.increm * (this.minimum <= 0 ? v : 1 + v)
      }
    }

    this.drawTicks = function (t, factor, mult) {
      var v = this.roundMin(),
        tl = 1 + t.length,
        tl2 = 1

      if ((horizontal && otherSide) || (!horizontal && !otherSide)) {
        tl = -tl
        tl2 = -1
      }

      tl *= factor
      tl2 *= factor

      tl += this.axisPos
      tl2 += this.axisPos

      var p,
        inc,
        n = 1,
        cou = 0

      if (mult === 0) inc = this.increm
      else {
        n += mult
        inc = this.increm / n
      }

      var c = this.chart.ctx

      c.beginPath()

      while (v <= this.maximum) {
        if (mult === 0 || cou++ % n !== 0) {
          p = this.calc(v)

          if (horizontal) {
            c.moveTo(p, tl2)
            c.lineTo(p, tl)
          } else {
            c.moveTo(tl2, p)
            c.lineTo(tl, p)
          }
        }

        v += inc
      }

      t.stroke.prepare()

      t.z = this.z
      c.z = t.z

      c.stroke()
    }

    this.drawTitle = function () {
      var l = this.labels,
        tmpX,
        tmpY,
        titleBounds = this.title.bounds,
        rotation = this.title.rotation,
        //ctx=this.chart.ctx,
        textAlign = 'center'

      if (this.title.text !== '') {
        if (horizontal) {
          tmpY = this.title.padding

          if (this.ticks.visible) tmpY += this.ticks.length

          if (l.visible) {
            l.format.font.prepare()
            var h = this.maxLabelDepth
            if (l.alternate) h *= 2
            tmpY += h
          }

          tmpX = this.startPos + this.axisSize * 0.5

          if (this.otherSide) tmpY = -tmpY - titleBounds.height

          tmpY = this.axisPos + tmpY

          if (rotation === 0) {
            tmpX -= titleBounds.width * 0.5
          } else {
            tmpX += titleBounds.height * (this.otherSide ? -0.5 : 0.5)
            if (!this.otherSide) tmpY += 1.5 * titleBounds.height
            textAlign = this.otherSide ? 'near' : rotation === 270 ? 'near' : 'far'
          }
        } else {
          tmpX = this.title.padding

          if (this.ticks.visible) tmpX += this.ticks.length

          if (l.visible) {
            var w = l.maxWidth
            if (l.alternate) w *= 2
            tmpX += w
          }

          tmpY = this.startPos + 0.5 * this.axisSize

          if (rotation === 0) {
            tmpX = this.axisPos + (this.otherSide ? tmpX : -tmpX)
            tmpY -= 0.5 * titleBounds.height
            textAlign = this.otherSide ? 'near' : 'far'
          } else {
            tmpX += titleBounds.height
            tmpX = this.axisPos + (this.otherSide ? tmpX : -tmpX)
            tmpY += titleBounds.width * (this.otherSide ? -0.5 : 0.5)
          }
        }

        this.title.drawIt(textAlign, tmpX, tmpY, rotation)

        //      chart.ctx.rect(tmpX,tmpY,titleBounds.width,titleBounds.height);
        //      chart.ctx.stroke();
      }
    }

    this.rotatedWidth = function (l, w) {
      return Math.abs(Math.sin(toRadians(l.rotation)) * w)
    }

    this.drawLabel = function (value, r) {
      var l = this.labels,
        s = l.getLabel(value)

      /*
    if (this.firstSeries && (this.firstSeries.notmandatory==this))
       s=l.getLabel(this.firstSeries,value);
    else
       s=l.getLabel(null,value);
    */

      r.width = l.format.textWidth(s)
      if (r.width > l.maxWidth) l.maxWidth = r.width

      if (l.rotation == 0) this.horizontal ? (r.x -= 0.5 * r.width) : (r.y += r.height * 0.5)
      else {
        var c = this.chart.ctx
        c.save()
        c.translate(r.x, r.y)
        c.rotate((-Math.PI * l.rotation) / 180)
        c.textAlign = 'right'

        if (this.horizontal) {
          var xDisplacement = this.rotatedWidth(l, r.width) * 0.5
          var yDisplacement = this.rotatedWidth(l, r.height) * 0.5 - 4
          if (l.rotation >= 220) this.otherSide ? (r.x = xDisplacement * -1) : (r.x = xDisplacement)
          else this.otherSide ? (r.x = xDisplacement + 4) : (r.x = xDisplacement * -1)

          this.otherSide ? (r.y = yDisplacement) : (r.y = yDisplacement * -1)
        } else {
          var xDisplacement = this.rotatedWidth(l, r.width)
          //var yDisplacement = (this.rotatedWidth(l, r.height));

          this.otherSide ? (r.x = xDisplacement) : (r.x = 30)
          r.y = -8
        }
      }

      if (l.format.font.textAlign == 'right') r.x -= r.width

      l.format.z = this.z * this.chart.walls.back.format.z

      l.format.drawText(r, s)

      if (l.rotation !== 0) this.chart.ctx.restore()
    }

    this.drawLabels = function () {
      var v = this.roundMin(),
        r = new Rectangle(),
        c = this.axisPos,
        l = this.labels
      //var v=(this.minimum<this.maximum) ? this.roundMin() : this.minimum, r=new Rectangle(), c=this.axisPos, l=this.labels;

      l.maxWidth = 0
      l.format.font.prepare()

      var tl = this.ticks.visible ? this.ticks.length : 0

      tl += l.padding

      if (this.horizontal) this.otherSide ? (c -= tl) : (c += tl)
      else this.otherSide ? (c += tl) : (c -= tl)

      var oldc = c

      r.height = l.format.textHeight('Wj')

      var alter = l.alternate,
        w = alter ? (this.horizontal ? -this.minmaxLabelWidth(true) : this.minmaxLabelWidth(true)) : 0,
        p

      // TODO: if ongetlabels .... (loop for user-custom labels position and text)

      while (v <= this.maximum) {
        p = this.calc(v)

        if (this.horizontal) {
          r.x = p
          r.y = c // -r.height*0.5;
        } else {
          r.x = c
          r.y = p - r.height * 0.5
        }

        if (alter) c = c == oldc ? (this.otherSide ? oldc + w : oldc - w) : oldc

        this.drawLabel(v, r)
        v += this.increm
      }
    }

    /**
     * @returns {Number} Returns the position in pixels for a given value, using the axis scales.
     */
    this.calc = function (value) {
      var p

      if (value !== value)
        // isNaN() <-- slow
        p = 0
      else if (this.log) {
        value -= this.minimum
        p = value <= 0 ? 0 : Math.log(value) * this.scale
      } else p = (value - this.minimum) * this.scale

      if (this.horizontal) return this.inverted ? this.endPos - p : this.startPos + p
      else return this.inverted ? this.startPos + p : this.endPos - p
    }

    /**
     * @returns {Number} Returns the axis value for a given position in pixels.
     */
    this.fromPos = function (p) {
      var i = this.horizontal
      if (this.inverted) i = !i
      return this.minimum + (i ? p - this.startPos : this.endPos - p) / this.scale
    }

    this.fromSize = function (p) {
      return p / this.scale
    }
    /**
     * @returns {Number} Returns the index of a given position in pixels (only works in bottom axes).
     */
    this.fromSizeCalcIndex = function (p) {
      var index = -1
      if (this.dateTime == true) {
        var i = 0,
          inc = 0,
          actualValue = ((this.maximum - this.minimum) / this.axisSize) * p + this.minimum

        if (this.chart.series.items[0].data.x.length > 1) {
          inc = this.chart.series.items[0].data.x[1].getTime() - this.chart.series.items[0].data.x[0].getTime()
        }
        while (index == -1 && i < this.chart.series.items[0].data.x.length) {
          if (this.chart.series.items[0].data.x[i].getTime() + inc / 2 > actualValue && actualValue + inc / 2 > this.chart.series.items[0].data.x[i].getTime()) {
            index = i
          } else i++
        }
      } else {
        index = p / this.scale + this.minimum
        if (this.chart.series.items[0].data.values.length < index || index < -0.5) index = -1
      }
      return index
    }
    /**
     * @returns {Number} Returns the size in pixels of a given value, using the axis scales.
     */
    this.calcSize = function (value) {
      return Math.abs(this.calc(value) - this.calc(0))
    }

    /**
     * @param {Number} p1 Position in pixels to be axis minimum.
     * @param {Number} p2 Position in pixels to be axis maximum.
     */
    this.calcMinMax = function (p1, p2) {
      this.automatic = false

      var a = this.fromPos(p1),
        b = this.fromPos(p2),
        tmp
      if (a > b) {
        tmp = a
        a = b
        b = tmp
      }

      this.minimum = a
      this.maximum = b

      this.checkRange()
    }

    this.minAxisRange = 0.0000000001

    this.setMinMax = function (min, max) {
      this.automatic = false

      this.minimum = min
      this.maximum = max

      this.checkRange()
    }
  }

  Axis.adjustRect = function () {
    var s = 0,
      l = this.labels,
      b = this.chart.chartRect,
      ti = this.title,
      hasTitle

    // Recalc firstSeries even if this axis is not visible:
    this.firstSeries = this.hasAnySeries()

    if (!this.visible) return

    if (this.firstSeries && this.visible) {
      this.checkMinMax()

      l.checkStyle()

      hasTitle = ti.shouldDraw()
      if (hasTitle) ti.resize()

      if (b.automatic && !this.custom) {
        if (l.visible) {
          l.format.font.prepare()
          s = this.minmaxLabelWidth(true)
          this.maxLabelDepth = s

          if (l.alternate) s *= 2
          s += l.padding
        }

        if (this.ticks.visible) s += this.ticks.length

        if (hasTitle) s += ti.bounds.height //+ti.padding;

        if (this.horizontal) this.otherSide ? b.setTop(b.y + s) : (b.height -= s)
        else this.otherSide ? (b.width -= s) : b.setLeft(b.x + s)
      }
    }
  }

  Axis.prototype.setPos = function (a, b) {
    this.startPos = a + this.start * b * 0.01
    this.endPos = a + this.end * b * 0.01
    this.axisSize = this.endPos - this.startPos
  }

  /**
   * Axis rect calcs. Returns current ChartRect.
   */
  Axis.calcRect = function () {
    if (!this.firstSeries) return

    this.checkMinMax()

    // Calc bounds
    var b = this.chart.chartRect,
      bo = this.bounds,
      h = this.horizontal

    if (h) {
      bo.y = this.otherSide ? b.y : b.y + b.height
      bo.width = b.width
      this.setPos(b.x, b.width)
    } else {
      bo.x = this.otherSide ? b.x + b.width : b.x
      bo.height = b.height
      this.setPos(b.y, b.height)
    }

    this.calcAxisScale()

    var tmp = this.chart.series

    //specific case: check for non-std sideAll scaling
    if (tmp.items.length > 0) {
      if (this.automatic) {
        var s = tmp.items[0]

        if (s instanceof Tee.Bar && s.notmandatory == this && s.stacked == 'sideAll') {
          s.notmandatory.minimum = -0.5
          s.notmandatory.maximum = s.countAll(false) - 0.5
        }
      }
    }

    // Calculate axis margins:
    if (this.automatic) {
      var s = this.chart.series,
        m = h ? s.horizMargins() : s.vertMargins(),
        hasX = m.x > 0,
        hasY = m.y > 0

      if (hasX) this.minimum -= this.fromSize(m.x)

      if (hasY) this.maximum += this.fromSize(m.y)

      if (hasX || hasY) this.calcAxisScale()
    }

    this.calcScale()

    // Calc pos

    var v = (h ? b.height : b.width) * this.position * 0.01,
      w = this.chart.walls,
      wallsize = 0,
      haswalls = w.visible && this.chart.aspect.view3d

    if (h) {
      if (haswalls && w.bottom.visible) wallsize = w.bottom.size
      this.axisPos = this.otherSide ? b.y + v : b.getBottom() + wallsize - v
    } else {
      if (haswalls && w.left.visible) wallsize = w.left.size
      this.axisPos = this.otherSide ? b.getRight() - v : b.x - wallsize + v
    }
  }

  Axis.draw = function () {
    if (this.visible && this.firstSeries) {
      this.z = this.otherSide ? this.chart.walls.back.format.z : 0

      //guarantee centre label for one-value axes.
      if (Math.abs(this.maximum - this.minimum) <= 0.000000001 /*widen beyond this.minAxisRange*/) {
        var diff = Math.abs(this.minimum) < 0.000000001 ? 0.00000001 : this.minimum / 10000000

        if (this.minimum != this.minimum - diff || this.maximum != this.minimum + diff) {
          this.setMinMax(this.minimum - diff, this.maximum + diff)
          if (this.chart != null) this.chart.draw()
        }
      }

      if (this.format.stroke.fill !== '') this.drawAxis()

      // Protect against infinite loop:
      if (this.roundMin() + 1000 * this.increm > this.maximum) {
        if (this.grid.visible) this.drawGrids()
        if (this.ticks.visible) this.drawTicks(this.ticks, 1, 0)
        if (this.innerTicks.visible) this.drawTicks(this.innerTicks, -1, 0)
        if (this.minorTicks.visible) this.drawTicks(this.minorTicks, 1, Math.max(0, this.minorTicks.count))
        if (this.labels.visible) this.drawLabels()
      }

      if (this.title.shouldDraw()) this.drawTitle()
    }
  }

  /**
   * @memberOf Tee.Chart
   * @constructor
   * @class Displays a list of chart series data
   * @param {Tee.Chart} chart The parent chart this legend object belongs to.
   * @property {Number} align Legend position as offset % of chart size. Default 0.
   * @property {Number} padding Percent of chart size pixels to leave as margin from legend.
   * @property {Boolean} transparent Determines to draw or not the legend background.
   * @property {Tee.Format} format Formatting properties to draw legend background and items.
   * @property {Tee.Format} hover Limited Formatting properties for mouseover hover of text. Offers color and enabled.
   * @property {Tee.Annotation} title Draws a title on top of legend.
   * @property {Rectangle} bounds Defines the legend position in pixels.
   * @property {String} position Automatic position legend ("left", "top", "right" or "bottom").
   * @property {Boolean} visible Defines to draw or not the legend.
   * @property {Boolean} inverted When true, legend items are displayed in inverted order.
   * @property {Boolean} fontColor Determines to fill each legend item text using series or point colors.
   * @property {Stroke} dividing Draws a line between legend items.
   * @property {Symbol} symbol Properties to draw a small indicator next to each legend item.
   * @property {String} legendStyle Determines to draw all visible series names or first visible series points. ("auto", "series", "values").
   * @property {String} activeStyle Determines the style to draw legend items when series are clicked. ("none", "checkbox", "lineThorugh", "opacity").
   * @property {String} textStyle What to draw at each legend item for series values: "auto", "valuelabel", "label", "value", "percent", "index", "labelvalue", "percentlabel", "valuepercent"
   */
  function Legend(chart) {
    this.chart = chart

    this.transparent = false

    this.useStrokeColor = false

    this.activeStyle = 'none'

    var f = (this.format = new Tee.Format(chart))
    f.fill = 'white'
    f.round.x = 8
    f.round.y = 8
    f.font.baseLine = 'top'
    f.shadow.visible = true

    f.z = 0
    f.depth = 0.05

    this.title = new Tee.Annotation(chart)
    this.title.transparent = true

    this.bounds = new Rectangle()
    this.position = 'right' // left, top, right, bottom, custom
    this.visible = true
    this.inverted = false

    this.padding = 5 // margin from legend to axes edge, percent of legend size

    this.margin = 5 // margin from legend to chart edge, percent of legend size

    this.align = 0 // % default = 0

    this.fontColor = false

    var d = (this.dividing = new Stroke(chart))
    d.fill = '' //"rgb(220,220,220)";
    d.cap = 'butt'

    this.over = -1

    /**
     * @constructor
     * @public
     * @class Displays a symbol at chart legend for each legend item
     * @param {Tee.Chart} chart The parent chart this legend symbol object belongs to.
     * @property {String} string Draws a rectangle shape or a line as a symbol.
     */
    function Symbol(chart) {
      this.chart = chart

      var f = (this.format = new Tee.Format(chart)),
        s = f.shadow

      s.visible = true
      s.color = 'silver'
      s.width = 2
      s.height = 2

      f.depth = 0.01

      this.width = 8
      this.height = 8
      this.padding = 8 // "100%"

      this.style = 'rectangle' // "line"
      this.visible = true

      function tryHover(series, index) {
        if (series.hover.enabled) {
          var sv = chart.legend.showValues()

          if ((sv && series.over == index) || (!sv && series.over >= 0)) return series.hover
        }

        return null
      }

      this.draw = function (series, index, x, y) {
        var c = chart.ctx,
          fhover = tryHover(series, index),
          old = f.fill,
          olds = f.stroke

        f.fill = series.legendColor(index)

        c.z = -0.01

        switch (this.style) {
          case 'rectangle':
            if (fhover) f.stroke = fhover.stroke // ??

            if (this.chart.aspect.view3d) {
              var r = {
                x: x,
                y: y - this.height * 0.5 - 1,
                width: this.width,
                height: this.height
              }

              old = f.z

              var oldz = c.z

              f.z = c.z - f.depth

              f.cube(r)
              f.draw(c, null, r)

              f.z = old
              c.z = oldz
            } else f.rectangle(x, y - this.height * 0.5 - 1, this.width, this.height)
            break
          case 'triangle':
            if (fhover) f.stroke = fhover.stroke

            f.polygon([new Point(x + this.width * 0.5, y - this.height * 0.5), new Point(x + this.width, y + this.height * 0.5), new Point(x, y + this.height * 0.5)])

            break
          case 'ellipse':
            if (fhover) f.stroke = fhover.stroke

            f.ellipse(x + this.width * 0.5, y, this.width, this.height)
            break
          default:
            //"line"
            c.beginPath()
            c.moveTo(x, y)
            c.lineTo(x + this.width, y)

            if (fhover) fhover.stroke.prepare()
            else f.stroke.prepare(f.fill)

            c.stroke()
            break
        }

        f.fill = old
        f.stroke = olds
      }
    }

    /*
     * Contains properties to paint a visual representation near each legend item.
     */
    this.symbol = new Symbol(chart)

    this.itemHeight = 10
    this.innerOff = 0

    this.legendStyle = 'auto' // auto, series, values, ...
    this.textStyle = 'auto' // valuelabel, label, value, percent, index, labelvalue, percentlabel

    this.hover = new Tee.Format(chart)
    this.hover.enabled = true
    this.hover.font.fill = 'red'

    /**
     * @returns {Number} Returns the width in pixels of legend items, including text and symbols if visible.
     */
    this.totalWidth = function () {
      var w = itemWidth + 8,
        s = this.symbol
      if (s.visible) w += s.width + s.padding
      return w
    }

    var titleHeight = 0

    this._space = function () {
      return this.bounds.y + titleHeight + this.margin * chart.bounds.height * 0.01
    }

    /**
     * @returns {Number} Returns the maximum number of vertical rows using the available height.
     */
    this.availRows = function () {
      var h = this._space() + this.itemHeight * 0.5
      if (!h) h = 0
      return trunc((chart.bounds.getBottom() - h) / this.itemHeight)
    }

    function seriesCount(legend) {
      return legend.showHidden ? chart.series.items.length : chart.series.visibleCount()
    }

    /**
     * @returns {Number} Returns the number of legend items that should be displayed.
     */
    this.itemsCount = function () {
      var ss = chart.series,
        result = seriesCount(this),
        rr = chart.bounds

      if (result === 0) return 0

      var st = this.legendStyle

      if (st === 'values' && result > 0) result = ss.firstVisible().legendCount()
      else {
        if ((st === 'auto' && result > 1) || st === 'series') {
          var t
          for (t = 0; t < ss.items.length; t++) if (!ss.items[t].legend.visible) result--
        } else if (result == 1) result = ss.firstVisible().legendCount()
      }

      if (this.isVertical()) {
        if ((0.5 + result) * this.itemHeight > rr.height - this._space()) result = this.availRows()
      } else {
        this.rows = 1

        var total = this.totalWidth(),
          pad = this.calcPadding(rr)

        var chartW = rr.width - 2 * pad

        if (result * total > chartW) {
          var w = rr.x + pad
          if (!w) w = 0

          this.perRow = trunc(chartW / total)

          if (result > this.perRow) {
            this.rows = 1 + trunc(result / this.perRow)

            if (this.rows * this.itemHeight > rr.height - this.bounds.y) {
              this.rows = this.availRows()
              result = this.rows * this.perRow
            }
          }
        } else this.perRow = result
      }

      return result
    }

    /**
     * @returns {Boolean} Returns if legend shows series titles or a series values.
     */
    this.showValues = function () {
      return this.legendStyle === 'values' || (this.legendStyle === 'auto' && seriesCount(this) == 1)
    }

    /**
     * @returns {String} Returns the index'th legend text string.
     */
    this.itemText = function (series, index) {
      var res = series.legendText(index, this.textStyle, false, true)
      return this.ongettext ? this.ongettext(this, series, index, res) : res
    }

    this.calcItemPos = function (index, pos) {
      var i = this.itemHeight,
        b = this.bounds
      pos.x = b.x
      pos.y = b.y + this.innerOff

      if (this.isVertical()) {
        pos.x += b.width - 6 - this.innerOff
        pos.y += i * 0.4 + index * i + titleHeight
      } else {
        pos.x += this.innerOff + (1 + (index % this.perRow)) * this.totalWidth()
        pos.y += i * (trunc(index / this.perRow) + 0.25)
      }
    }

    this.calcItemRect = function (index, r) {
      var i = this.itemHeight,
        b = this.bounds
      r.height = i
      r.x = b.x
      r.y = b.y

      if (this.isVertical()) {
        r.width = b.width
        r.y += i * 0.4 + index * i + titleHeight
      } else {
        r.width = this.totalWidth()
        r.x += this.innerOff + (index % this.perRow) * r.width
        r.y += i * (trunc(index / this.perRow) + 0.25)
      }
    }

    var rMouse = new Rectangle()

    this.mousedown = function (p) {
      if (this.over !== -1 && this.activeStyle !== 'none') {
        for (let t = 0; t < chart.series.items.length; t++) {
          const currentSeries = chart.series.items[t]
          if (t === this.over) {
            currentSeries.visible = !currentSeries.visible
            chart.draw()
            break
          }
        }
      }

      if (this.onclick && this.over !== -1) {
        if (this.showValues()) {
          this.onclick(chart.series.firstVisible(), this.over)
        } else {
          var ss = chart.series.items,
            l = ss.length,
            c = 0
          for (var t = 0; t < l; t++)
            if (this.showHidden || ss[t].visible) {
              if (c == this.over) {
                this.onclick(ss[t], -1)
                break
              } else c++
            }
        }

        return true
      }

      return false
    }

    this.mousemove = function (p) {
      var n = this.over

      if (this.bounds.contains(p)) {
        var c = this.itemsCount()
        for (var t = 0; t < c; t++) {
          this.calcItemRect(t, rMouse)
          if (rMouse.contains(p)) {
            n = t
            break
          }
        }
      } else n = -1

      if (n != this.over) {
        if (this.onhover) this.onhover(this.over, n)

        this.over = n

        var o = this.chart
        window.requestAnimFrame(function () {
          o.draw()
        })
      }

      if (this.onclick) this.chart.newCursor = n === -1 ? 'default' : 'pointer'
    }

    this.drawSymbol = function (series, index, itemPos) {
      this.symbol.draw(series, index, itemPos.x - itemWidth - this.symbol.width - this.symbol.padding, itemPos.y + this.itemHeight * 0.4)
    }

    var itemPos = { x: 0, y: 0 },
      r = new Rectangle(),
      aligns

    this.drawItem = function (text, series, index, isSeries) {
      var stopLegend = false

      var vertical = this.isVertical()

      // Add active style to legend item
      this.showHidden = this.activeStyle !== 'none'

      this.calcItemPos(index, itemPos)

      r.x = itemPos.x
      r.y = itemPos.y

      if (vertical) r.y -= this.chart.isMozilla ? 0 : 2
      else if (this.chart.isMozilla) r.y++
      else r.y--

      var old = f.font.fill

      if (!series.visible && this.activeStyle === 'opacity') {
        f.font.fill = 'silver'
      } else {
        if (this.over == index) f.font.fill = this.hover.enabled ? this.hover.font.fill : old
        else if (this.fontColor) f.font.fill = this.showValues() ? series.legendColor(index) : series.format.fill
      }

      if (this.activeStyle === 'linethrough' && !series.visible) f.font.lineThrough = true
      else f.font.lineThrough = false

      var c = this.chart.ctx

      if (isSeries) {
        f.font.textAlign = 'start'
        r.x -= itemWidths[0]
        c.textAlign = f.font.textAlign

        var symbolWidth = this.symbol.width

        var getLegendArgs = { text, index, r, symbolWidth, stopLegend: false }

        if (this.onbeforedrawLegendItem) this.onbeforedrawLegendItem(getLegendArgs)

        if (getLegendArgs.stopLegend) stopLegend = true

        text = getLegendArgs.text

        const prevStrokStyle = f.stroke.fill
        if (!this.showValues()) {
          if (this.activeStyle === 'checkbox') {
            let x = r.x - 2,
              y = r.y + 4

            c.beginPath()
            c.moveTo(x, y)
            c.lineTo(x + 8.5, y)
            c.lineTo(x + 8.5, y + 8.5)
            c.lineTo(x, y + 8.5)
            c.lineTo(x, y)
            // set stroke color to series color
            c.strokeStyle = 'black'
            c.stroke()
            c.closePath()

            // add 10 to x to avoid overlapping with the text
            r.x += 12

            // draw a checkmark if the series is visible
            if (series.visible) {
              c.beginPath()
              c.moveTo(x + 2, y + 4)
              c.lineTo(x + 4, y + 6)
              c.lineTo(x + 7, y + 3)
              c.stroke()
              c.closePath()
            }
          }
        }

        c.strokeStyle = prevStrokStyle

        if (!stopLegend) f.drawText(r, text)
      } else {
        if (!(text instanceof Array)) text = [text]

        if (vertical) {
          var l = text.length,
            oldW = r.width,
            sep = f.textWidth(' ')
          while (l--) {
            f.font.textAlign = aligns[l] ? 'start' : 'end'
            r.x -= itemWidths[l]

            c.textAlign = f.font.textAlign

            var symbolWidth = this.symbol.width

            var getLegendArgs = {
              text,
              index,
              r,
              symbolWidth,
              stopLegend: false
            }

            if (this.onbeforedrawLegendItem) this.onbeforedrawLegendItem(getLegendArgs)

            if (getLegendArgs.stopLegend) stopLegend = true

            text = getLegendArgs.text

            if (!stopLegend) f.drawText(r, text[l])

            r.width -= itemWidths[l] + sep
          }
          r.width = oldW
        } else {
          f.font.textAlign = 'start'
          r.x -= itemWidth
          c.textAlign = f.font.textAlign

          var symbolWidth = this.symbol.width

          var getLegendArgs = {
            text,
            index,
            r,
            symbolWidth,
            stopLegend: false
          }

          if (this.onbeforedrawLegendItem) this.onbeforedrawLegendItem(getLegendArgs)

          if (getLegendArgs.stopLegend) stopLegend = true

          text = getLegendArgs.text

          if (!stopLegend) f.drawText(r, text.join(' '))
        }
      }

      if (!stopLegend) {
        f.font.fill = old

        var hassymbol = !series.isColorEach || this.showValues()

        if (this.symbol.visible && hassymbol) this.drawSymbol(series, index, itemPos)

        if (index > 0 && this.dividing.fill !== '') {
          var b = this.bounds
          c.beginPath()

          if (this.isVertical()) {
            c.moveTo(b.x, r.y - 2)
            c.lineTo(b.getRight(), r.y - 2)
          } else {
            var xx = r.x - itemWidth - 4,
              sy = this.symbol
            if (sy.visible) xx -= sy.width + sy.padding
            c.moveTo(xx, b.y)
            c.lineTo(xx, b.getBottom())
          }

          this.dividing.prepare()
          c.stroke()
        }
      }
    }

    /**
     * @returns {Boolean} Returns if index'th series is visible and has been displayed at legend.
     */
    this.drawSeries = function (index, order) {
      let currentSeries = chart.series.items[index]
      if ((this.showHidden || currentSeries.visible) && currentSeries.legend.visible) {
        this.drawItem(currentSeries.titleText(index), currentSeries, order, true)
        return true
      } else return false
    }

    this.draw = function () {
      var c = this.itemsCount(),
        len,
        t,
        ti = this.title,
        ctx = chart.ctx,
        old,
        ft = this.format.transparency,
        vertical = this.isVertical()

      if (c > 0) {
        var groups = ctx.beginParent
        this.visual = groups ? ctx.beginParent() : null

        f.cube(this.bounds) //avoids first Legend item being dropped from format in WebGL transparent Legends

        if (!this.transparent) {
          f.draw(ctx, null, this.bounds)
        }

        if (ft > 0) {
          old = ctx.globalAlpha
          ctx.globalAlpha = (1 - ft) * old
        }

        if (vertical && titleHeight > 0) {
          ti.bounds.x = this.bounds.x - 4
          ti.bounds.y = this.bounds.y
          ti.doDraw()
        }

        f.font.prepare()

        r.width = itemWidth
        r.height = this.itemHeight

        if (this.showValues()) {
          var s = chart.series.firstVisible(),
            order = 0
          len = c

          switch (this.textStyle) {
            case 'auto':
            case 'percentlabel':
            case 'valuelabel':
              aligns = [false, true]
              break
            case 'labelpercent':
            case 'labelvalue':
              aligns = [true, false]
              break
            case 'label':
              aligns = [true]
              break
            case 'valuepercent':
              aligns = [true, false]
              break
            default:
              aligns = [false]
              break
          }

          if (this.inverted) while (len--) this.drawItem(this.itemText(s, len), s, order++)
          else for (t = 0; t < len; t++) this.drawItem(this.itemText(s, t), s, t)
        } else {
          len = chart.series.count()
          if (vertical) len = Math.min(len, this.availRows())
          c = 0

          aligns = [true]

          if (this.inverted)
            while (len--) {
              if (this.drawSeries(len, c)) c++
            }
          else for (t = 0; t < len; t++) if (this.drawSeries(t, c)) c++
        }

        if (ft > 0) ctx.globalAlpha = old

        if (groups) ctx.endParent()
      }
    }

    var itemWidth, itemWidths

    /**
     * @returns {Number} Returns the maximum width in pixels of all legend items text.
     */
    this.calcWidths = function () {
      var s,
        t,
        d,
        c,
        l = chart.series,
        text

      itemWidth = 0
      itemWidths = [0, 0]

      if (this.showValues()) {
        s = l.firstVisible()
        c = this.itemsCount()

        for (t = 0; t < c; t++) {
          text = this.itemText(s, t)
          if (!(text instanceof Array)) text = [text]

          if (text.length > 0) {
            d = f.textWidth(text[0])
            if (d > itemWidths[0]) itemWidths[0] = d

            if (text.length > 1) {
              d = f.textWidth(text[1])
              if (d > itemWidths[1]) itemWidths[1] = d
            }
          }
        }
      } else {
        c = l.count()

        for (t = 0; t < c; t++) {
          s = l.items[t]

          if (this.showHidden || s.visible) {
            d = f.textWidth(s.titleText(t))
            if (d > itemWidths[0]) itemWidths[0] = d
          }
        }
      }

      itemWidth = itemWidths[0] + itemWidths[1]
    }

    /**
     * @returns {Number} Returns the distance in pixels between legend and chart bounds.
     */
    this.calcPadding = function (r) {
      // var p=this.padding, n = parseFloat( (p.indexOf("%") == -1) ? p : p.substring(0,p.length-1));

      return 0.01 * this.padding * (this.isVertical() ? r.width : r.height)
    }

    /**
     * @returns {Boolean} Returns if legend orientation is vertical.
     */
    this.isVertical = function () {
      var p = this.position
      return p === 'right' || p === 'left'
    }

    this.calcrect = function () {
      var titleWidth = 0,
        t = this.title,
        r = chart.chartRect,
        a = this.align,
        b = this.bounds,
        vert = this.isVertical()

      if (t.shouldDraw()) {
        t.resize()
        titleHeight = t.bounds.height
        titleWidth = t.bounds.width
      } else titleHeight = 0

      if (vert) b.y = a === 0 ? r.y : chart.bounds.height * a * 0.01
      else b.x = a === 0 ? r.x : chart.bounds.width * a * 0.01

      f.font.prepare()
      this.itemHeight = f.textHeight('Wj')

      this.calcWidths()

      var pad = this.calcPadding(r),
        s,
        co = this.itemsCount()

      if (vert) {
        s = this.symbol.visible ? this.symbol.width + this.symbol.padding : 0

        b.width = Math.max(titleWidth, 12 + itemWidth + s)

        b.height = (0.5 + co) * this.itemHeight + titleHeight

        if (b.width - 6 > titleWidth) t.bounds.width = b.width - 6
      } else {
        b.width = pad + this.perRow * this.totalWidth()
        b.x += 0.5 * (r.width - b.width)
        b.height = this.itemHeight * (this.rows + 0.25)
      }

      if (f.stroke.fill !== '') {
        s = +f.stroke.size
        if (s > 1) {
          b.width += s
          b.height += s
          this.innerOff = s * 0.5
        }
      }

      // Resize chartRect:

      if (co === 0) return

      if (this.position === 'right') {
        b.x = r.getRight() - b.width - this.margin * b.width * 0.01
        if (r.automatic) r.setRight(Math.max(r.x, b.x - pad))
      } else if (this.position === 'left') {
        b.x = r.x
        if (r.automatic) r.setLeft(b.x + b.width + pad)
      } else if (this.position === 'top') {
        b.y = r.y + pad
        if (r.automatic) r.setTop(b.getBottom() + pad)
      } else {
        b.y = r.getBottom() - b.height - pad
        if (r.automatic) r.setBottom(b.y - pad)
      }
    }
  }

  /**
   * @memberOf Tee.Series
   * @constructor
   * @augments Tee.Annotation
   * @class Formatting properties to display annotations near series data points
   * @param {Tee.Series} series The parent series this marks object belongs to.
   * @param {Tee.Chart} chart The parent chart this marks object belongs to.
   * @property {Tee.Format} arrow Displays a line from mark to corresponding series point.
   * @property {Number} [arrow.length=10] Distance in pixels from mark to corresponding series point.
   * @property {Boolean} [arrow.underline=false] Draws a line under mark text.
   * @property {String} [style="auto"] Determines the text to display inside mark.
   * @property {Boolean} visible Defines if series marks are to be displayed or not.
   * @property {Number} [drawEvery=1] Controls how many marks to skip in between. (Useful for large series).
   */
  function Marks(series, chart) {
    Tee.Annotation.call(this, chart)
    this.series = series

    var arrow = (this.arrow = new Tee.Format(chart))
    arrow.visible = true
    arrow.length = 10
    arrow.underline = false
    arrow.z = 0.5
    arrow.depth = 0.1

    this.style = 'auto' // "value", "percent", "label", "valuelabel", "percentlabel" ...

    this.drawEvery = 1
    this.visible = false
    this.format.z = 0.5

    /*
     * @private
     */
    this.setChart = function (chart) {
      this.chart = chart
      this.format.setChart(chart)
      arrow.setChart(chart)
    }

    this.drawPolar = function (center, radius, angle, index) {
      var text = this.series.markText(index),
        px = center.x + Math.cos(angle) * radius,
        py = center.y + Math.sin(angle) * radius,
        c = this.chart.ctx

      this.text = text
      this.resize()

      var b = this.bounds,
        p2x,
        p2y,
        p = this.position

      radius += arrow.length
      ;(p2x = center.x + Math.cos(angle) * radius), (p2y = center.y + Math.sin(angle) * radius)

      if (p2x - b.width < 0) p2x -= p2x - b.width - 4

      if (Math.abs(p2x - center.x) < b.width) p.x = p2x - b.width * 0.5
      else p.x = p2x < center.x ? p2x - b.width : p2x

      if (Math.abs(p2y - center.y) < b.height) p.y = p2y - b.height * 0.5
      else p.y = p2y < center.y ? p2y - b.height : p2y

      c.beginPath()
      c.moveTo(px, py)
      c.lineTo(p2x, p2y)

      if (arrow.underline) {
        if (p2y <= p.y || p2y >= p.y + b.height) {
          c.moveTo(p.x, p2y)
          c.lineTo(p.x + b.width, p2y)
        }
      }

      arrow.stroke.prepare()
      if (arrow.visible) c.stroke()

      this.draw()
    }

    this.canDraw = function (x, y, index, inverted) {
      var s = this.series.markText(index)

      if (s && s !== '' && (this.showZero || s !== '0')) {
        this.text = s
        this.resize()

        var factor = inverted ? -1 : 1,
          r = this.bounds,
          m = this.series.yMandatory

        if (m) {
          r.x = x - r.width * 0.5
          r.y = y - factor * (arrow.length + (inverted ? 0 : r.height))
        } else {
          r.x = x + factor * arrow.length
          if (inverted) r.x -= r.width
          r.y = y - r.height * 0.5
        }

        this.position.x = r.x
        this.position.y = r.y

        return true
      } else return false
    }

    this.drawMark = function (x, y, index, inverted) {
      if (this.canDraw(x, y, index, inverted)) {
        this.draw()

        if (arrow.visible) {
          var r = this.bounds,
            m = this.series.yMandatory

          var rbot = inverted ? r.y : r.getBottom(),
            c = this.chart.ctx,
            is3d = this.chart.aspect.view3d

          if (m) {
            if (is3d) {
              var rr = { x: x - 3, y: rbot, width: 6, height: y - rbot }

              arrow.z = this.format.z - arrow.depth * 0.5

              arrow.cylinder(rr, 1, true)
              arrow.draw(this.chart.ctx, null, rr)

              return
            } else {
              c.beginPath()

              c.moveTo(x, rbot)
              c.lineTo(x, y)

              if (arrow.underline) {
                c.moveTo(r.x, rbot)
                c.lineTo(r.x + r.width, rbot)
              }
            }
          } else {
            var py = r.y + r.height * 0.5

            c.beginPath()
            c.moveTo(x, py)

            if (inverted) r.x += r.width
            c.lineTo(r.x, py)

            if (arrow.underline) {
              c.moveTo(r.x, r.y + r.height)
              c.lineTo(r.x + (inverted ? -r.width : r.width), r.y + r.height)
            }
          }

          arrow.stroke.prepare()
          c.stroke()
        }
      }
    }
  }

  Marks.prototype = new Tee.Annotation()

  /**
   * @returns {Number} Returns the sum of all values in the array or typed-array parameter.
   * @param {Array|ArrayBuffer} a The array or typed-array to sum.
   */
  /*
function ArraySum(a){
  var sum=0, len=a.length;
  while(len--) sum+=a[len];
  return sum;
}
*/

  /**
   * @returns {Number} Returns the sum of all absolute values in the array or typed-array parameter.
   * @param {Array|ArrayBuffer} a The array or typed-array to do absolute sum.
   */
  function ArraySumAbs(a) {
    var sum = 0,
      len = a.length
    while (len--) sum += a[len] > 0 ? a[len] : -a[len]
    return sum
  }

  if (!('map' in Array.prototype)) {
    Array.prototype.map = function (mapper, that /*opt*/) {
      var other = new Array(this.length)
      for (var i = 0, n = this.length; i < n; i++) if (i in this) other[i] = mapper.call(that, this[i], i, this)

      return other
    }
  }
  if (!('filter' in Array.prototype)) {
    Array.prototype.filter = function (filter, that /*opt*/) {
      var other = [],
        v
      for (var i = 0, n = this.length; i < n; i++) if (i in this && filter.call(that, (v = this[i]), i, this)) other.push(v)

      return other
    }
  }

  /**
   * removes nulls that Math.max/min.apply doesn't handle correctly
   */
  function removeEmptyArrayElements(arr) {
    if (!isArray(arr)) {
      return arr
    } else {
      return arr
        .filter(function (elem) {
          return elem !== null
        })
        .map(removeEmptyArrayElements)
    }
  }

  function isArray(obj) {
    return obj && obj.constructor == Array
  }

  /**
   * @returns {Number} Returns the maximum value in the array or typed-array parameter.
   * @param {Array|ArrayBuffer} a The array or typed-array of numbers.
   */
  function ArrayMax(a) {
    var arr = removeEmptyArrayElements(a)
    var max = -Number.MAX_VALUE
    arr.forEach(function (e) {
      if (max < e) {
        max = e
      }
    })
    if (Object.prototype.toString.call(max) === '[object Date]') {
      max = max.getTime()
    }
    return max
  }
  /**
   * @returns {Number} Returns the minimum value in the array or typed-array parameter.
   * @param {Array|ArrayBuffer} a The array or typed-array of numbers.
   */
  function ArrayMin(a) {
    var arr = removeEmptyArrayElements(a)
    var min = Number.MAX_VALUE
    arr.forEach(function (e) {
      if (min > e) {
        min = e
      }
    })
    if (Object.prototype.toString.call(min) === '[object Date]') {
      min = min.getTime()
    }
    return min
  }

  /**
   * @constructor
   * @class Base abstract class to define a series of data
   * @param {Object|Tee.Chart|Number[]} o An array of numbers, or a chart or datasource object.
   * @property {Tee.Chart} chart The parent chart this Series object belongs to.
   * @property {Number[]} data.values Array of numbers as main series data.
   * @property {String[]} data.labels Array of strings used to display at axis labels, legend and marks.
   * @property {Tee.Format} format Visual properties to display series data.
   * @property {Boolean} [visible=true] Determines if this series will be displayed or not.
   * @property {String} [cursor="default"] Defines the mouse cursor to show when mouse is over a series point.
   * @property {Object} data Contains all series data values, labels, etc.
   * @property {Tee.Series.Marks} marks Displays annotations near series points.
   * @property {Boolean} [colorEach="auto"] Paints points using series fill color, or each point with a different color
   * from series palette or chart palette color array.
   * @property {String} [horizAxis="bottom"] Defines the horizontal axis associated with this series.
   * @property {String} [vertAxis="left"] Defines the horizontal axis associated with this series.
   */
  Tee.Series = function (o, o2) {
    this.chart = null
    this.data = { values: [], labels: [], source: null }

    this.sortedOptions = {
      sortedDrawAnimation: new Tee.Animation(),
      sortedValues: [],
      sortedValuesIndices: [],
      originalValues: [],
      sortedLabels: [],
      originalLabels: [],
      sorted: false,
      ascending: true,
      sorting: false,
      sortingAnimationType: 'verticalchange'
    }
    this.yMandatory = true
    this.horizAxis = 'bottom'
    this.vertAxis = 'left'
    this.legend = { visible: true }
    this.legendStrokeColor = false

    this.sequential = true

    var f = (this.format = new Tee.Format(this.chart)),
      ho = (this.hover = new Tee.Format(this.chart)),
      s = ho.shadow
    this.sortedOptions.sortedDrawAnimation.duration = 500
    this.sortedOptions.sortedDrawAnimation.mode = 'linear'
    f.fill = ''
    f.stroke.fill = ''
    this.visible = true

    // Hover
    ho.stroke.size = 0.3
    ho.fill = ''
    ho.stroke.fill = 'red'

    s.visible = true
    s.blur = 10
    s.width = 0
    s.height = 0

    this.cursor = 'default'
    this.over = -1

    this.marks = new Marks(this, this.chart)

    this.palette = new Tee.Palette()
    this.paletteName = 'opera'
    this.themeName = 'default'

    this.colorEach = 'auto'
    this.useAxes = true
    this.decimals = 2

    this._paintAxes = true
    this._paintWalls = true

    this.sortValues = function () {
      this.sortedOptions.sorting = true
      var indices = [],
        values = this.data.values,
        ascending = this.sortedOptions.ascending
      this.sortedOptions.sortedLabels = []
      for (var i = 0; i < this.data.values.length; i++) {
        indices.push(i)
      }
      indices.sort(function (a, b) {
        return ascending ? values[a] - values[b] : values[b] - values[a]
      })
      this.sortedOptions.originalValues = this.data.values.slice()
      this.sortedOptions.originalLabels = this.data.labels.slice()
      for (var i = 0; i < indices.length; i++) {
        this.sortedOptions.sortedLabels.push(this.data.labels[indices[i]] ? this.data.labels[indices[i]] : indices[i])
      }
      this.sortedOptions.sortedValuesIndices = indices
      this.sortedOptions.sortedValues = this.data.values.slice().sort(function (a, b) {
        return ascending ? a - b : b - a
      })
      this.sortedOptions.sorting = false
      return this.sortedOptions.sortedValues.slice()
    }

    this.drawSortedValues = function (sorted) {
      var animation = this.sortedOptions.sortedDrawAnimation
      if (this.sortedOptions.sorted != sorted && !this.sortedOptions.sorting && animation && !animation.running) {
        this.sortedOptions.sorted = sorted
        var data = this.data
        if (sorted) this.sortValues()
        var prevValues = sorted ? this.sortedOptions.originalValues.slice() : this.sortedOptions.sortedValues.slice()
        var values = this.data.values
        var endValues = sorted ? this.sortedOptions.sortedValues.slice() : this.sortedOptions.originalValues.slice()

        if (
          !(
            values.length == endValues.length &&
            values.every(function (v, i) {
              return v === endValues[i]
            })
          )
        ) {
          animation.chart = this.chart

          animation.doStep = function (f) {
            if (f < 1) {
              for (var i = 0; i < prevValues.length; i++) {
                values[i] = prevValues[i] + (endValues[i] - prevValues[i]) * f
              }
            }
          }

          animation.onstop = function () {
            for (var i = 0; i < prevValues.length; i++) {
              values[i] = endValues[i]
            }
            animation.running = false
          }

          animation.onstart = function () {
            animation.running = true
          }
          animation.animate()
        }
        this.data.labels = sorted ? this.sortedOptions.sortedLabels.slice() : this.sortedOptions.originalLabels.slice()
        this.chart.draw()
      }
    }

    this.init = function (o, o2) {
      if (typeof o === 'object') {
        if (o) {
          if (o instanceof Array) {
            this.data.values = o

            if (o2 instanceof Array) this.data.labels = o2
          } else if (o instanceof Tee.Chart) {
            this.chart = o
            if (o2 instanceof Array) this.data.values = o2
          } else {
            this.data.source = o
            this.refresh()
          }
        }
      }
    }

    this.init(o, o2)

    /**
     * @returns {String} Returns the color of index point in series, using series palette or chart palette.
     */
    this.getFill = function (index, f) {
      var p = this.palette,
        c = p && p.colors ? p.get(index) : null
      if (c === null) return this.isColorEach || !f ? this.chart.palette.get(index) : f.fill
      else return c
    }

    /**
     * @returns {boolean} Returns true when the index'th series value is null and should not be painted.
     */
    this.isNull = function (index) {
      return this.data.values[index] === null
    }

    /**
     * @returns {CanvasGradient} Returns a canvas gradient using color, or color if gradient is not visible.
     */
    this.getFillStyle = function (r, color) {
      return f.gradient.visible ? f.gradient.create(r, color) : color
    }

    this.title = ''

    this.titleText = function (index) {
      return this.title || 'Series ' + index.toString()
    }

    this.refresh = function (failure) {
      if (this.data.source) {
        if (this.data.source instanceof HTMLTextAreaElement) {
          parseText(this.data, this.data.source.value)

          if (this.chart) this.chart.draw()
        } else if (this.data.source instanceof HTMLInputElement) {
          Tee.doHttpRequest(
            this,
            this.data.source.value,
            function (target, data) {
              parseText(target.data, data)
              target.chart.draw()
            },
            function (status, statusText) {
              if (failure) failure(this, status, statusText)
            }
          )
        } else if (failure) failure(this)
      } else if (this.data.xml) {
        parseXML(this, this.data.xml)
        this.chart.draw()
      } else if (this.data.json) {
        parseJSON(this, this.data.json)
        this.chart.draw()
      }
    }

    /**
     * @returns {String} Returns the series index'th data label, or the value if no label exists at that index.
     */
    this.valueOrLabel = function (index) {
      var s = this.data.labels[index]

      if (!s || s === '') s = this.valueText(index)

      return s
    }

    /**
     * @returns {String} Returns a percentual representation of the series index'th value, on total of series values.
     */
    this.toPercent = function (index) {
      var v = this.data.values
      return ((100 * Math.abs(v[index])) / ArraySumAbs(v)).toFixed(this.decimals) + ' %'
    }

    /**
     * @returns {String} Returns the text string to show at series marks, for a given series point index.
     */
    this.markText = function (index) {
      var m = this.marks,
        res = this.dataText(index, m.style, false)
      return m.ongettext ? m.ongettext(this, index, res) : res
    }

    /**
     * @returns {Boolean} Returns if series is associated to axis, either horizontal or vertical.
     */
    this.associatedToAxis = function (axis) {
      if (axis.horizontal) return this.horizAxis == 'both' || this._horizAxis == axis
      else return this.vertAxis == 'both' || this._vertAxis == axis
    }

    this.bounds = function (r) {
      var h = this._horizAxis,
        v = this._vertAxis

      r.x = h.calc(this.minXValue())
      r.width = h.calc(this.maxXValue()) - r.x

      r.y = v.calc(this.maxYValue())
      r.height = v.calc(this.minYValue()) - r.y
    }

    this.calcStack = function (index, p, value) {
      var sum = this.pointOrigin(index, false) + value,
        tmp,
        a = this.mandatoryAxis

      p.x = this.notmandatory.calc(this.data.x ? this.data.x[index] : index)

      if (this.isStack100) {
        tmp = this.pointOrigin(index, true)
        p.y = tmp === 0 ? a.endPos : a.calc((sum * 100.0) / tmp)
      } else p.y = a.calc(sum)

      if (!this.yMandatory) {
        tmp = p.x
        p.x = p.y
        p.y = tmp
      }
    }

    /**
     * @returns {Number} Returns the sum of all previous visible series index'th value, for stacking.
     */
    this.pointOrigin = function (index, sumAll) {
      var res = 0,
        t,
        s,
        li = this.chart.series.items,
        v,
        tmp

      for (t = 0; t < li.length; t++) {
        s = li[t]

        if (!sumAll && s == this) break
        else if (s.stacked != 'no') {
          v = s.data.values

          if (s.visible && s.constructor == this.constructor && v.length > index) {
            tmp = v[index]

            // Protect against undefined (NaN)
            if (tmp !== undefined) res += sumAll && tmp < 0 ? -tmp : tmp
          }
        }
      }

      return res
    }

    this.doHover = function (index) {
      var o = this.chart
      if (index != this.over) {
        if (o.onhover) o.onhover(this, index)

        this.over = index

        if (this.hover.enabled)
          window.requestAnimFrame(function () {
            o.draw()
          })
      }
    }
  }

  /*
   * @private
   */
  Tee.Series.prototype.initZ = function (index, total) {
    var f = this.format
    f.z = index / total
    f.depth = 1 / total
    this.marks.format.z = f.z + f.depth * 0.5
  }

  /*
   * @private
   */
  Tee.Series.prototype.setChart = function (series, chart) {
    series.chart = chart

    series.recalcAxes()

    series.format.setChart(chart)
    series.marks.setChart(chart)
    series.hover.setChart(chart)
  }

  Tee.Series.prototype.calc = function (index, p) {
    var d = this.data,
      x = this.notmandatory.calc(d.x ? d.x[index] : index),
      y = this.mandatoryAxis.calc(d.values[index])

    p.x = this.yMandatory ? x : y
    p.y = this.yMandatory ? y : x
  }

  Tee.Series.prototype.recalcAxes = function () {
    var a = this.chart.axes

    if (this.horizAxis instanceof Axis) this._horizAxis = this.horizAxis
    else this._horizAxis = this.horizAxis == 'top' ? a.top : a.bottom

    if (this.vertAxis instanceof Axis) this._vertAxis = this.vertAxis
    else this._vertAxis = this.vertAxis == 'right' ? a.right : a.left

    this.mandatoryAxis = this.yMandatory ? this._vertAxis : this._horizAxis
    this.notmandatory = this.yMandatory ? this._horizAxis : this._vertAxis
  }

  // Pending for solution (gauges.bounds) :
  Tee.Series.prototype.getRect = function () {
    return new Rectangle()
  }

  Tee.Series.prototype.clicked = function () {
    return -1
  }

  Tee.Series.prototype.fixedFloatToLocal = function (value, decimals) {
    var fixed = value.toFixed(decimals)
    var localeVal = value.toLocaleString(this.chart.language)

    if (fixed.indexOf('.') != -1) {
      var n = 1.1
      n = n.toLocaleString(this.chart.language).substring(1, 2)
      var fractions = fixed.substring(fixed.indexOf('.') + 1) //zero based idx
      return localeVal.substring(0, localeVal.indexOf(n) == -1 ? localeVal.length : localeVal.indexOf(n)) + n + fractions
    } else return value
  }

  /**
   * @returns {String} Returns the text string for a given series point index value.
   */
  Tee.Series.prototype.valueText = function (index) {
    var vv = this.data._old || this.data.values,
      d = vv[index]

    if (d) {
      if (d instanceof Date) return d.format ? d.format(this.dateFormat) : d.toString()
      else if (this.valueFormat) return d.toLocaleString(this.chart.language)
      else if (trunc(d) == d) return this.fixedFloatToLocal(d, 0).toString()
      else return this.fixedFloatToLocal(d, this.decimals).toString()
    } else return '0'
  }

  Tee.Series.prototype.labelOrTitle = function (index) {
    return this.data.labels[index] || this.title
  }

  Tee.Series.prototype.mousedown = function () {
    return false
  }

  Tee.Series.prototype.mousemove = function (p) {
    if (this.hover.enabled || this.cursor != 'default') {
      var tmp = this.clicked(p)

      this.doHover(tmp)

      if (this.cursor != 'default' && tmp != -1) {
        if (!this.chart.newCursor) this.chart.newCursor = this.cursor
        return
      }
    }

    var m = this.marks

    if (m.visible) {
      var len = this.data.values.length,
        p2 = new Point(),
        t

      for (t = 0; t < len; t += m.drawEvery)
        if (!this.isNull(t)) {
          this.markPos(t, p2)

          if (m.canDraw(p2.x, p2.y, t)) {
            if (m.bounds.contains(p)) {
              this.doHover(t)
              break
            }
          }
        }
    }
  }

  Tee.Series.prototype.mouseout = function () {}

  Tee.Series.prototype.markPos = function (t, p) {
    this.calc(t, p)
    return false
  }

  Tee.Series.prototype.drawMarks = function () {
    var len = this.data.values.length,
      p = new Point(),
      t,
      inv

    for (t = 0; t < len; t += this.marks.drawEvery)
      if (!this.isNull(t)) {
        inv = this.markPos(t, p)
        this.marks.drawMark(p.x, p.y, t, inv)
      }
  }

  Tee.Series.prototype.horizMargins = function () {}
  Tee.Series.prototype.vertMargins = function () {}

  /**
   * @returns {Number} Returns the minimum value of series x values, or zero if no x values exist.
   */
  Tee.Series.prototype.minXValue = function () {
    return this.data.x && this.data.x.length > 0 ? ArrayMin(this.data.x) : 0
  }

  /**
   * @returns {Number} Returns the minimum value of series data values, or zero if no values exist.
   */
  Tee.Series.prototype.minYValue = function () {
    var v = this.data.values
    return v.length > 0 ? ArrayMin(v) : 0
  }

  /**
   * @returns {Number} Returns the maximum value of series x values, or data length minus one, if no x values exist.
   */
  Tee.Series.prototype.maxXValue = function () {
    if (this.data.x) return this.data.x.length > 0 ? ArrayMax(this.data.x) : 0
    else {
      var len = this.data.values.length
      return len === 0 ? 0 : len - 1
    }
  }

  /**
   * @returns {Number} Returns the maximum value of series values, or zero if no values exist.
   */
  Tee.Series.prototype.maxYValue = function () {
    var v = this.data.values,
      l = v.length,
      t,
      value,
      res

    if (l > 0) {
      res = ArrayMax(v)

      if (res !== res) {
        // isNan, protect against
        for (t = 0; t < l; t++) {
          value = v[t]

          if (value !== undefined) {
            if (res !== res) res = value
            else if (value > res) res = value
          }
        }
      }

      return res === res ? res : 0
    } else return 0
  }

  Tee.Series.prototype.calcColorEach = function () {
    this.isColorEach = this.colorEach == 'yes'
  }

  /**
   * @returns {Number} Returns the maximum of all series values, or sum of all stacked values.
   */
  Tee.Series.prototype.stackMaxValue = function () {
    if (this.stacked == '100') return 100
    else {
      var temp = Tee.Series.prototype.maxYValue

      if (this.stacked == 'no') return temp.call(this)
      else {
        var res = temp.call(this),
          v = this.data.values,
          len = v.length,
          value

        while (len--) {
          value = v[len]
          if (value === undefined) value = 0
          res = Math.max(res, this.pointOrigin(len, false) + value)
        }

        return res
      }
    }
  }

  /**
   * @returns {String} Returns the text string to show for a given series point index.
   * @param {Number} index The point position in series data array.
   * @param {String} style Defines how text is returned: "auto", "value", "percent", "percentlabel",
   * "valuelabel", "label", "index", "labelvalue", "labelpercent", "valuepercent"
   */
  Tee.Series.prototype.dataText = function (index, style, title, asArray) {
    function calcRet(a, b) {
      if (asArray) return l ? [a, b] : [a, '']
      else return a + (b ? ' ' + b : '')
    }

    var l = title ? this.labelOrTitle(index) : this.data.labels[index]

    if (style == 'value') return this.valueText(index)
    else if (style == 'percent') return this.toPercent(index)
    else if (style == 'percentlabel') return calcRet(this.toPercent(index), l)
    else if (style == 'valuelabel' || style == 'auto') return calcRet(this.valueText(index), l)
    else if (style == 'label') return l || ''
    else if (style == 'index') return index.toFixed(0)
    else if (style == 'labelvalue') return calcRet(l, this.valueText(index))
    else if (style == 'labelpercent') return calcRet(l, this.toPercent(index))
    else if (style == 'valuepercent') return this.valueText(index) + ' ' + this.toPercent(index)
    else return this.valueOrLabel(index)
  }

  /**
   * @returns {String} Returns the text string to show for a given series point index.
   * @param {Number} index The point position in series data array.
   * @param {String} style Defines how text is returned: "auto", "value", "percent", "percentlabel",
   * "valuelabel", "label", "index", "labelvalue", "labelpercent", "valuepercent"
   */
  Tee.Series.prototype.legendText = Tee.Series.prototype.dataText

  /**
   * @returns {Number} Returns the number of series data values.
   */
  Tee.Series.prototype.count = function () {
    return this.data.values.length
  }

  /**
   * @returns {Number} Returns the number of items to show at legend.
   */
  Tee.Series.prototype.legendCount = function () {
    return this.count()
  }

  /**
   * @returns {Color} Returns the color of index'th legend symbol.
   */
  Tee.Series.prototype.legendColor = function (index) {
    return this.isColorEach && index != -1 ? this.getFill(index) : this.legendStrokeColor ? this.format.stroke.fill : this.format.fill
  }

  Tee.Series.prototype.addRandom = function (count, range, x) {
    if (!range) range = 1000
    if (!count) count = 5

    var d = this.data
    d.values.length = count

    if (x) d.x = new Array(count)

    if (count > 0) {
      d.values[0] = Math.random() * range

      if (x) d.x[0] = Math.random() * range

      for (var t = 1; t < count; t++) {
        d.values[t] = d.values[t - 1] + Math.random() * range - range * 0.5
        if (x) d.x[t] = Math.random() * range
      }
    }

    return this
  }

  /**
   * @returns {Array} Returns an array of series data indices sorted according to sortBy parameter.
   */
  Tee.Series.prototype.doSort = function (sortBy, ascending) {
    if (sortBy == 'none') return null
    else {
      var d = this.data.values,
        len = d.length,
        sorted = new Array(len),
        t = 0
      for (; t < len; t++) sorted[t] = t

      if (sortBy == 'labels') {
        d = this.data.labels

        var A,
          B,
          before = ascending ? -1 : 1,
          after = ascending ? 1 : -1

        sorted.sort(function (a, b) {
          A = d[a].toLowerCase()
          B = d[b].toLowerCase()
          return A < B ? before : A == B ? 0 : after
        })
      } else
        sorted.sort(
          ascending
            ? function (a, b) {
                return d[a] - d[b]
              }
            : function (a, b) {
                return d[b] - d[a]
              }
        )

      return sorted
    }
  }

  /**
   * @memberOf Tee.Chart
   * @constructor
   * @class Contains a list of chart series objects
   * @param {Tee.Chart} chart The parent chart this list of series belongs to.
   * @property {Tee.Series[]} items The array containing series instances.
   */
  function SeriesList(chart) {
    this.chart = chart
    this.items = []

    /**
     * @returns {Number} Returns the total number of series in chart, visible or not.
     */
    this.count = function () {
      return this.items.length
    }

    /**
     * @returns {Boolean} Returns if {@link Tee.Point} p parameter is over any series point.
     */
    this.clicked = function (p) {
      var done = false

      this.each(function (s) {
        if (s.visible && s.onclick) {
          var index = s.clicked(p)
          if (index != -1) done = s.onclick(s, index, p.x, p.y)
        }
      })

      return done
    }

    this.mousedown = function (event) {
      for (var t = 0, s, done = false; (s = this.items[t++]); )
        if (s.visible) {
          if (s.mousedown(event)) done = true
        }

      return done
    }

    this.mousemove = function (p) {
      for (var t = 0, s; (s = this.items[t++]); ) if (s.visible) s.mousemove(p)

      /*
    var len=this.items.length, s;

    while(len--) {
      s=this.items[len];
      if (s.visible)
          s.mousemove(p);
    }
    */
    }

    this.mouseout = function () {
      this.each(function (s) {
        if (s.visible) s.mouseout()
      })
    }

    /**
     * Counts how many visible series exist of the same class type.
     * @returns {Number} Returns the number of visible series in chart of the same type as this.
     */
    this.visibleCount = function (s, c, res) {
      var r = 0,
        it = this.items,
        len = it.length,
        i

      while ((len--, (i = it[len])))
        if (i.visible && (!c || i instanceof c)) {
          if (res && i == s) res.index = r
          r++
        }
      if (res) {
        res.total = r
        res.index = r - 1 - res.index
      }
      return r
    }

    this.beforeDraw = function () {
      this.each(function (s) {
        if (s.useAxes) s.recalcAxes()

        s.calcColorEach()
      })
    }

    /**
     * @returns {Boolean} Returns if any visible series in chart needs axes to be represented.
     */
    this.anyUsesAxes = function () {
      var len = this.items.length,
        s
      while (len--) {
        s = this.items[len]
        if (s.visible && s.useAxes) return true
      }

      return false
    }

    /**
     * @returns {Tee.Series} Returns the first visible series in chart, or null if any.
     */
    this.firstVisible = function () {
      for (var t = 0, s; (s = this.items[t++]); ) if (s.visible) return s
      return null
    }

    /**
     * Calculates the maximum amount of vertical margins in pixels from all series.
     * @returns {Tee.Point} Returns the maximum top/bottom distance in pixels that all series need to be separated from axes.
     */
    this.vertMargins = function () {
      var result,
        li = this.items,
        len = li.length,
        s,
        t

      if (len > 0) {
        result = { x: 0, y: 0 }
        s = { x: 0, y: 0 }
        li[0].vertMargins(result)

        for (t = 1; t < len; t++) {
          if (li[t].data.values.length > 0) {
            s.x = s.y = 0
            li[t].vertMargins(s)
            if (s.x > result.x) result.x = s.x
            if (s.y > result.y) result.y = s.y
          }
        }
      }
      return result
    }

    /**
     * Calculates the maximum amount of horizontal margins in pixels from all series
     * @returns {Tee.Point} Returns the maximum left/right distance in pixels that all series need to be separated from axes.
     */
    this.horizMargins = function () {
      var result,
        li = this.items,
        len = li.length,
        s,
        t

      if (len > 0) {
        result = { x: 0, y: 0 }
        s = { x: 0, y: 0 }
        li[0].horizMargins(result)

        for (t = 1; t < len; t++) {
          if (li[t].data.values.length > 0) {
            s.x = s.y = 0
            li[t].horizMargins(s)

            if (s.x > result.x) result.x = s.x
            if (s.y > result.y) result.y = s.y
          }
        }
      }
      return result
    }

    /**
     * @returns {Number} Returns the minimum of all visible non-empty series associated to axis, minimum x values.
     */
    this.minXValue = function (axis) {
      var result = Infinity,
        v
      this.eachAxis(axis, function (s) {
        v = s.minXValue()
        if (v < result) result = v
      })
      return result
    }

    /**
     * @returns {Number} Returns the minimum of all visible series mininum data values.
     */
    this.minYValue = function (axis) {
      var result = Infinity,
        v
      this.eachAxis(axis, function (s) {
        v = s.minYValue()
        if (v < result) result = v
      })
      return result
    }

    /**
     * @returns {Number} Returns the maximum of all visible series maximum x values.
     */
    this.maxXValue = function (axis) {
      var result = -Infinity,
        v
      this.eachAxis(axis, function (s) {
        v = s.maxXValue()
        if (v > result) result = v
      })
      return result
    }

    /**
     * @returns {Number} Returns the maximum of all visible series maximum data values.
     */
    this.maxYValue = function (axis) {
      var result = -Infinity,
        v
      this.eachAxis(axis, function (s) {
        v = s.maxYValue()
        if (v > result) result = v
      })
      return result
    }

    function axisStrokeSize(axis) {
      if (axis.visible && axis.firstSeries) {
        var s = axis.format.stroke
        return s.fill === '' ? 0 : s.size * 0.5
      } else return 0
    }

    this.draw = function () {
      var len = this.items.length,
        ch = this.chart,
        c = ch.ctx,
        a = ch.aspect,
        t,
        s

      if (len > 0) {
        for (t = 0; t < len; t++) {
          s = this.items[t]
          if (s.visible && s.beforeDraw) s.beforeDraw()
        }

        var shouldClip = a.clip && this.anyUsesAxes(),
          axes = ch.axes

        if (shouldClip) {
          var chr = ch.chartRect,
            ax = axisStrokeSize(axes.left),
            ay = axisStrokeSize(axes.top),
            r = {
              x: chr.x + ax,
              y: chr.y + ay,
              width: chr.width - axisStrokeSize(axes.right),
              height: chr.height - axisStrokeSize(axes.bottom)
            }

          a.clipRect(r)
        }

        try {
          var groups = c.beginParent

          for (t = 0; t < len; t++) {
            s = this.items[t]

            if (s.visible) {
              var old = c.globalAlpha
              c.globalAlpha = 1 - s.format.transparency

              if (s.transform) {
                c.save()
                s.transform()
              }

              s.visual = groups ? c.beginParent() : null

              if (s.onbeforedraw) s.onbeforedraw(s)

              s.draw()

              if (groups) c.endParent()

              if (s.ondraw) s.ondraw(s)

              if (s.transform) c.restore()

              c.globalAlpha = old
            }
          }
        } finally {
          if (shouldClip)
            //a.clipRect(ch.bounds);
            c.restore()
        }

        for (t = 0; t < len; t++) {
          s = this.items[t]

          if (s.visible && s.marks.visible) {
            if (s.transform) {
              c.save()
              s.transform()
            }

            s.drawMarks()

            if (s.transform) c.restore()
          }
        }
      }
    }
  }

  /**
   * @type SeriesList
   */
  /* Calls f function parameter for each series in list */
  SeriesList.prototype.each = function (f) {
    var l = this.items.length,
      t = 0
    for (; t < l; t++) f(this.items[t])
  }

  SeriesList.prototype.eachAxis = function (axis, func) {
    var len = this.items.length,
      s
    while (len--) {
      s = this.items[len]
      if (s.visible && (!axis || s.associatedToAxis(axis)) && (s.__alwaysDraw || s.count() > 0)) func(s)
    }
  }

  /**
   * @memberOf Tee.Chart
   * @constructor
   * @class Contains four axis objects: left, top, right and bottom
   * @property {Boolean} [visible=true] Draws or not all the chart axis objects.
   * @property {Number} [transparency=0] Applies transparency to all axes in chart, from 0 to 1.
   * @param {Tee.Chart} chart The parent chart this axes object belongs to.
   */
  function Axes(chart) {
    this.chart = chart
    this.visible = true

    this.transparency = 0

    /**
     * @public
     * @type Tee.Chart.Axis
     */
    this.left = new Axis(chart, false, false)

    /**
     * @public
     * @type Tee.Chart.Axis
     */
    this.top = new Axis(chart, true, true)

    /**
     * @public
     * @type Tee.Chart.Axis
     */
    this.right = new Axis(chart, false, true)

    /**
     * @public
     * @type Tee.Chart.Axis
     */
    this.bottom = new Axis(chart, true, false)

    this.items = [this.left, this.top, this.right, this.bottom]
    this.each = function (f) {
      for (var t = 0, a; (a = this.items[t++]); ) f.call(a)
    }

    /**
     * Creates and adds a new custom Axis
     */
    this.add = function (horiz, other) {
      var a = new Axis(chart, horiz, other)
      a.custom = true
      this.items.push(a)
      return a
    }
  }

  /**
   * @example
   * var Chart1 = new Tee.Chart("canvas");
   * Chart1.addSeries(new Tee.Bar([1,2,3,4]));
   * Chart1.draw();
   * @constructor
   * @class The main Chart class
   * @param {String|HTMLCanvasElement} [canvas] Optional canvas id or <a href="https://www.w3.org/wiki/HTML/Elements/canvas">element</a>.
   * @property {HTMLCanvasElement} canvas The <a href="https://www.w3.org/wiki/HTML/Elements/canvas">canvas</a> where this chart will paint to.
   * @property {Tee.Rectangle} bounds The rectangle where this chart will be painted inside canvas.
   * @property {Tee.Palette} palette The list of colors to use as default colors for series and points.
   * @property {Tee.Chart.Aspect} aspect Contains properties related to 3D and graphics parameters.
   * @property {Tee.Chart.Panel} panel Contains properties used to fill the chart background.
   * @property {Tee.Chart.Walls} walls Contains properties used to draw chart walls around axes.
   * @property {Tee.Chart.Axes} axes Contains a list of axis used to draw series.
   * @property {Tee.Chart.Legend} legend Contains properties to control the legend, a panel showing the list of series or values.
   * @property {Tee.Chart.SeriesList} series Contains a list of Tee.Series objects that belong to this chart.
   * @property {Tee.Chart.Title} title Properties to draw text at top side of chart.
   * @property {Tee.Chart.Title} footer Properties to draw text at bottom side of chart.
   * @property {Tee.Chart.Zoom} zoom Properties to control mouse/touch dragging to zoom chart axes scales.
   * @property {Tee.Chart.Scroll} scroll Properties to control mouse/touch dragging to scroll or pan contents inside chart axes.
   * @property {Tee.Chart.Tools} tools Contains a list of Tee.Tool objects that belong to this chart.
   */
  Tee.Chart = function (canvas, data, type) {
    var ua = typeof navigator != 'undefined' ? navigator.userAgent.toLowerCase() : ''
    /**
     * @constant
     * @private
     */
    this.isChrome = ua.indexOf('chrome') > -1
    /**
     * @constant
     * @private
     */
    this.isAndroid = ua.indexOf('android') > -1
    /**
     * @constant
     * @private
     */
    this.isMozilla = typeof window !== 'undefined' && window.mozRequestAnimationFrame

    this.language = window.navigator.userLanguage || window.navigator.language

    if (canvas) {
      if (typeof HTMLCanvasElement !== 'undefined' && canvas instanceof HTMLCanvasElement) this.canvas = canvas
      else if (typeof canvas == 'string') this.canvas = document.getElementById(canvas)
      else this.canvas = canvas
    }

    if (!this.canvas) {
      this.canvas = document.createElement('canvas')
      this.canvas.width = 600
      this.canvas.height = 400
    }

    var c = this.canvas
    var isNLc = false

    this.__webgl = c.__webgl

    if (c.__webgl || c.clientWidth === 0) this.bounds = new Rectangle(0, 0, c.width, c.height)
    else {
      this.bounds = new Rectangle(0, 0, c.clientWidth, c.clientHeight)
      c.width = c.clientWidth
      c.height = c.clientHeight
    }

    this.chartRect = new Rectangle()
    this.chartRect.automatic = true
    this.chartRect.setFrom(this.bounds)

    this.palette = new Tee.Palette(['#4466a3', '#f39c35', '#f14c14', '#4e97a8', '#2b406b', '#1d7b63', '#b3080e', '#f2c05d', '#5db79e', '#707070', '#f3ea8d', '#b4b4b4'])

    /**
     * @memberOf Tee.Chart
     * @class Contains properties related to canvas and 2D / 3D
     * @param {Tee.Chart} chart The parent chart this aspect object belongs to.
     * @property {Boolean} clip When true, series contents will be restricted to paint inside axes boundaries.
     */
    this.aspect = {
      chart: this,
      view3d: this.__webgl,
      ortogonal: !this.__webgl,
      rotation: 0,
      elevation: 315,
      perspective: 50,
      clip: true,

      _orthox: 10,
      _orthoy: 8,

      /**
       * @param {Tee.Rectangle} r The rectangle object to apply clipping.
       */
      clipRect: function (r) {
        var c = this.chart.ctx
        c.save()

        c.beginPath()

        if (this.view3d) c.rect(r.x, r.y - this._orthoy, r.width + this._orthox, r.height + this._orthoy)
        else c.rect(r.x, r.y, r.width, r.height)

        c.clip()
        //c.closePath();
      }
    }

    var aspect = this.aspect

    /*
     * Properties to paint the chart background
     */
    this.panel = new Panel(this)

    /**
     * @memberOf Tee.Chart
     * @constructor
     * @class Contains left, right, bottom and back wall objects
     * @param {Tee.Chart} chart The parent chart this walls object belongs to.
     * @property {Boolean} [visible=true] Determines if walls will be displayed or not.
     * @property {Tee.Chart.Wall} back Visual properties to paint the back wall.
     */
    this.walls = {
      chart: this,
      visible: true,
      left: new Wall(this),
      right: new Wall(this),
      bottom: new Wall(this),
      back: new Wall(this),

      draw: function (r, aspect) {
        var old,
          ctx = this.chart.ctx,
          t = this.transparency,
          groups = ctx.beginParent

        this.visual = groups ? ctx.beginParent() : null

        if (t > 0) {
          old = ctx.globalAlpha
          ctx.globalAlpha = (1 - t) * old
        }

        var backBounds = this.back.bounds
        backBounds.setFrom(r)

        if (aspect.view3d) {
          var bottomsize = this.bottom.visible ? this.bottom.size : 0,
            leftsize = this.left.size

          if (leftsize > 0) {
            backBounds.x -= leftsize
            backBounds.width += leftsize
          }

          if (bottomsize > 0) backBounds.height += bottomsize

          this.left.bounds.set(r.x - leftsize, r.y, leftsize, r.height + bottomsize)
          this.bottom.bounds.set(r.x, r.getBottom(), r.width, bottomsize)

          this.back.format.depth = this.back.size
        }

        !this.back.visible || this.back.draw()

        if (this.chart.aspect.view3d) {
          if (this.left.visible) this.left.draw()
          if (this.bottom.visible) this.bottom.draw()
          if (this.right.visible) this.right.draw()
        }

        if (t > 0) ctx.globalAlpha = old

        if (groups) ctx.endParent()
      }
    }

    var bf = this.walls.back.format
    bf.fill = 'rgb(240,240,240)'
    bf.shadow.visible = true
    bf.z = 1

    var lw = this.walls.left
    lw.format.fill = '#BBAA77'
    lw.format.depth = 1
    lw.size = 2

    var bof = this.walls.bottom
    bof.format.depth = 1
    bof.size = 2

    this.walls.right.visible = false

    /*
     * Four axes
     */
    this.axes = new Axes(this)

    /*
     * Properties to paint a list of series or values.
     */
    this.legend = new Legend(this)

    /*
     * List of Tee.Series objects that this chart contains.
     */
    this.series = new SeriesList(this)

    this.title = new Title(this, 'blue')
    this.title.text = 'TeeChart'
    this.title.format.z = 1

    this.subtitle = new Title(this, 'blue')
    this.subtitle.format.z = 1

    this.footer = new Title(this, 'red')
    this.footer.format.z = 0

    this.subfooter = new Title(this, 'red')
    this.subfooter.format.z = 0

    this.zoom = new Zoom(this)
    this.scroll = new Scroll(this)

    this.tools = new Tools(this)

    /**
     * @private
     */
    this.oldPos = new Point()

    /**
     * @private
     * @returns {Tee.Point} Returns the xy local coordinates from a mouse or touch event
     */
    this.calcMouse = function (e, p) {
      p.x = e.clientX
      p.y = e.clientY

      var element = this.canvas,
        r

      // IE, Moz3+, Chr, Op9.5+, Saf4+
      if (element.getBoundingClientRect) {
        r = element.getBoundingClientRect()
        p.x -= r.left
        p.y -= r.top
      } //earlier Moz.
      else if (element.offsetParent)
        do {
          p.x -= element.offsetLeft
          p.y -= element.offsetTop
          element = element.offsetParent
        } while (element)
    }

    var pMove = new Point(0, 0)

    this.domousemove = function (event) {
      var c = this.chart
      if (!c.ctx) return false

      event = event || window.event

      if (event.touches) event = event.touches[event.touches.length - 1]

      c.calcMouse(event, pMove)

      if (c.scroll.active) {
        var d = c.scroll.direction,
          both = d == 'both',
          delta

        if (both || d == 'horizontal') {
          delta = c.axes.bottom.fromSize(c.oldPos.x - pMove.x)
          c.axes.top.scroll(delta)
          c.axes.bottom.scroll(delta)
        }

        if (both || d == 'vertical') {
          delta = -c.axes.left.fromSize(c.oldPos.y - pMove.y)
          c.axes.left.scroll(delta)
          c.axes.right.scroll(delta)
        }

        c.oldPos.x = pMove.x
        c.oldPos.y = pMove.y

        c.scroll.done = true

        if (c.onscroll) c.onscroll(event)

        if (c.scroll.done)
          window.requestAnimFrame(function () {
            c.draw()
          })

        return false
      } else if (c.zoom.active) {
        if (pMove.x != c.oldPos.x || pMove.y != c.oldPos.y) {
          c.zoom.change(pMove)

          window.requestAnimFrame(function () {
            c.draw()
          })

          c.zoom.done = true
        }

        return false
      } else {
        c.newCursor = null
        c.tools.mousemove(pMove)
        c.series.mousemove(pMove)
        c.legend.mousemove(pMove)
        c.title.mousemove(pMove)
        if (c.mousemove) c.mousemove(pMove)

        var s = this.chart.canvas.style

        if (c.newCursor) {
          if (s.cursor != c.newCursor) {
            c.oldCursor = s.cursor
            s.cursor = c.newCursor
          }
        } else if (c.oldCursor !== undefined && s.cursor != c.oldCursor) s.cursor = c.oldCursor

        return true
      }
    }

    var p = new Point(0, 0)

    this.domousedown = function (event) {
      event = event || window.event
      var done = false,
        c = this.chart

      c.calcMouse(event.touches ? event.touches[0] : event, p)
      var inRect = c.series.anyUsesAxes() && c.chartRect.contains(p)

      doubleTap(c)
      if (c.zoom.enabled) {
        twoFingersZoom(c, c.zoom)
      }

      var inRect = c.series.anyUsesAxes() && c.chartRect.contains(p)

      if (event.touches) {
        //alert("touch! "+event.touches.length.toString());
        // two-finger pinch to zoom, one finger to scroll

        if (event.touches.length > 1) {
          // c.zoom.active=c.zoom.enabled && inRect;
          //if (c.zoom.active)
          c.scroll.active = false
        } else {
          c.scroll.active = c.scroll.enabled && inRect
          if (c.scroll.active) c.zoom.active = false
        }
      } else {
        c.zoom.active = event.button == c.zoom.mouseButton && c.zoom.enabled && inRect
        c.scroll.active = event.button == c.scroll.mouseButton && c.scroll.enabled && inRect
      }

      c.zoom.done = false
      c.scroll.done = false
      c.oldPos = p

      if (event.button === 0) {
        // c.zoom.mouseButton)
        done = c.tools.mousedown(event)
        if (!done) {
          done = c.series.mousedown(event)

          if (!done) done = c.legend.mousedown(event)
        }
        if (!done) if (c.mousedown) done = c.mousedown(event)

        c.canvas.oncontextmenu = null
      } else if (event.button == 2)
        c.canvas.oncontextmenu = function () {
          return false
        }

      if (done) c.zoom.active = c.scroll.active = false
      else done = c.zoom.active || c.scroll.active

      if (event.preventDefault) event.preventDefault()
      else event.cancelBubble = true

      if (done) {
        // IE < 9 : "fromElement"
        var target = event.target || event.fromElement

        if (target && target.setPointerCapture && event.pointerId) target.setPointerCapture(event.pointerId)
      }

      return !done
    }

    this.domouseup = function (event) {
      event = event || window.event
      var c = this.chart,
        done
      c.zoom.active = false
      c.scroll.active = false

      if (c.zoom.done && !c.zoom.touching) {
        if (c.zoom.apply()) if (c.onzoom) c.onzoom()

        c.draw()

        done = true
      } else {
        done = c.scroll.done
        if (!done) {
          done = c.series.clicked(c.oldPos)
          if (!done) {
            done = c.tools.clicked(c.oldPos)
            if (!done) {
              done = c.title.clicked(c.oldPos)
              if (done && c.title.onclick) c.title.onclick(c.title)
            }
          }
          if (!done) if (c.mouseup) done = c.mouseup(event)
        }
      }

      c.zoom.old = null

      c.zoom.done = false
      c.scroll.done = false

      if (done)
        if (event.preventDefault) event.preventDefault()
        else event.cancelBubble = true
      else c.canvas.oncontextmenu = null

      // IE < 9 : "fromElement"
      var target = event.target || event.fromElement

      if (target && target.releasePointerCapture && event.pointerId) target.releasePointerCapture(event.pointerId)
    }

    /*
  if (c.addEventListener) {
    c.addEventListener("mousedown", this.domousedown, false);
    c.addEventListener("touchstart", this.domousedown, false);
    c.addEventListener("mousemove", this.domousemove, false);
    c.addEventListener("touchmove", this.domousemove, false);
    c.addEventListener("mouseup", this.domouseup, false);
    c.addEventListener("touchstop", this.domouseup, false);
  }
  else {
    // IE <9 attachEvent

    if (c.attachEvent) {
      c.attachEvent("onmousedown", this.domousedown);
      c.attachEvent("ontouchstart", this.domousedown);
      c.attachEvent("onmousemove", this.domousemove);
      c.attachEvent("ontouchmove", this.domousedown);
      c.attachEvent("onmouseup", this.domouseup);
      c.attachEvent("ontouchstop", this.domousedown);
    }
  }
  */

    c.onpointerdown = c.ontouchstart = this.domousedown
    c.onpointerup = c.ontouchend = this.domouseup
    c.onpointermove = c.ontouchmove = this.domousemove

    // Mouse wheel default to zoom / unzoom axes:

    this._doWheel = function (event) {
      function applyAxis(a) {
        var axisrange = a.maximum - a.minimum

        if (axisrange > 0) {
          var range = delta * axisrange * 0.05
          a.setMinMax(a.minimum + range, a.maximum - range)
        }
      }

      var c = this.chart

      if (!c.zoom.wheel.enabled) {
        for (var t = 0, s; (s = c.tools.items[t++]); ) if (s instanceof Tee.ToolTip && s.active) s.hide()

        return
      }

      event = event || window.event

      var delta = c.zoom.wheel.factor * (event.wheelDelta ? event.wheelDelta / 120 : event.detail ? -event.detail / 3 : 0)

      if (Math.abs(delta) > 0) {
        var p = { x: 0, y: 0 }
        c.calcMouse(event, p)

        if (c.chartRect.contains(p)) {
          c.axes.each(function () {
            applyAxis(this)
          })

          c.draw()

          event.returnValue = false
          if (event.preventDefault) event.preventDefault()
        }

        for (var t = 0, s; (s = c.tools.items[t++]); ) if (s instanceof Tee.ToolTip && s.active) s.mousemove(p)
      }
    }

    if (c.addEventListener) c.addEventListener('DOMMouseScroll', this._doWheel, false)

    c.onmousewheel = this._doWheel

    // Alternative to canvas lack of mouse setCapture:

    c.onmouseout = function (e) {
      if (e && !e.target.setCapture) this.chart.scroll.active = false

      this.chart.series.mouseout()
      this.chart.tools.mouseout()
    }

    /**
     * @returns {Tee.Series} Returns the series parameter
     * @param {Tee.Series} series The series object to add to chart.
     */
    this.addSeries = function (series) {
      series.setChart(series, this)
      if (series.donutArray != null && series.donutArray !== 'undefined') series.linkDonutsToChart()

      var li = this.series.items,
        n = li.indexOf(series)

      if (n == -1) n = li.push(series) - 1

      if (series.title === '') series.title = 'Series' + (1 + n).toString()

      if (series.format.fill === '') series.format.fill = this.palette.get(n)

      return series
    }

    this.removeSeries = function (series) {
      var li = this.series.items,
        n = li.indexOf(series)
      if (li != -1) li.splice(n, 1)
    }

    c.chart = this

    function newSeries(v) {
      var St = type || Tee.Bar,
        s = c.chart.addSeries(new St(c.chart))
      s.data.values = v
    }

    if (data && data.length > 0) {
      if (data[0] instanceof Array) for (var t = 0; t < data.length; t++) newSeries(data[t])
      else newSeries(data)
    }

    /**
     * @returns {Tee.Series} Returns the index'th series in chart series list
     * @param {Integer} index The index of the chart series list to obtain.
     */
    this.getSeries = function (index) {
      return this.series.items[index]
    }

    /**
     * Main Chart draw method. Repaints all chart contents.
     */
    this.draw = function (ctx) {
      var series = this.series,
        r = this.chartRect

      this.ctx = ctx || (this.canvas.getContext ? this.canvas.getContext('2d') : null) //,{alpha:false} (opaque canvas)
      ctx = this.ctx

      if (!ctx) throw 'Canvas does not provide Context'

      if (Tee.Scroller && this instanceof Tee.Scroller) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      }

      if (r.automatic) r.setFrom(this.bounds)

      var len = series.items.length,
        s,
        paintAxes = false,
        paintWalls = false,
        maxZ = 1,
        visCount = series.visibleCount(),
        tmp = 0

      while (len--) {
        s = series.items[len]

        if (s.visible) {
          s.initZ(tmp, visCount)
          tmp++

          if (s._paintAxes) paintAxes = true
          if (s._paintWalls) paintWalls = true

          if (s.maxZ && s.maxZ > maxZ) maxZ = s.maxZ
        }
      }

      this.walls.left.format.depth = maxZ
      this.walls.bottom.format.depth = maxZ
      this.walls.back.format.z = maxZ

      this.panel.draw()

      if (r.automatic) this.panel.margins.apply(r)

      this.title.tryDraw(true)
      this.subtitle.tryDraw(true)
      this.footer.tryDraw(false)
      this.subfooter.tryDraw(false)

      series.beforeDraw()

      if (this.legend.visible) {
        this.legend.calcrect()
        this.legend.draw()
      }

      if (aspect.view3d && !this.__webgl) {
        r.y += aspect._orthoy
        r.height -= aspect._orthoy
        r.width -= aspect._orthox
      }

      var ax = this.axes,
        oldt

      if (this.series.anyUsesAxes()) {
        ax.each(Axis.adjustRect)
        ax.each(Axis.calcRect)

        if (this.walls.visible && paintWalls) this.walls.draw(r, this.aspect)

        if (ax.visible && paintAxes) {
          if (ax.transparency > 0) {
            oldt = ctx.globalAlpha
            ctx.globalAlpha = (1 - ax.transparency) * oldt
          }

          var groups = ctx.beginParent
          ax.visual = groups ? ctx.beginParent() : null

          ax.each(Axis.draw)

          if (groups) ctx.endParent()

          if (ax.transparency > 0) ctx.globalAlpha = oldt
        }
      }

      this.series.draw()
      this.tools.draw()

      if (this.zoom.active && !this.zoom.touching) this.zoom.draw()

      if (this.ondraw) this.ondraw(this)

      this.isNLc = false
      if (this.isNLc) {
        var f = new Tee.Format(this)
        var msg = 'TeeChart Evaluation (c)Steema Software 2021'
        var tw
        var ctx = this.ctx
        ctx.save()
        ctx.font = '13px Courier'
        tw = f.textWidth(msg)
        var rText = {
          x: this.chartRect.x + this.chartRect.width / 2 - tw / 2,
          y: this.bounds.height / 2,
          width: tw,
          height: f.textHeight('H')
        }
        ctx.translate(this.chartRect.x + this.chartRect.width / 2, this.bounds.height / 2)
        ctx.rotate((-30 * Math.PI) / 180)
        ctx.translate(-(this.chartRect.x + this.chartRect.width / 2), -(this.bounds.height / 2))
        f.font.fill = 'rgba(64,108,128, 0.55)'
        f.drawText(rText, msg)
        ctx.restore()
      }
    }

    /**
     * Paints chart to image parameter, as PNG or JPEG picture made from canvas.
     * @param {String} image The id of an Image HTML component.
     * @param {String} format Can be "image/png" or "image/jpeg"
     * @param {Number} quality From 0% to 100%, jpeg compression quality.
     */
    this.toImage = function (image, format, quality) {
      var i = document.getElementById(image)
      if (i) i.src = format !== '' ? this.canvas.toDataURL(format, quality) : this.canvas.toDataURL()
    }
  }

  /**
   * @constructor
   * @augments Tee.Series
   * @class Base abstract class to draw data as vertical or horizontal bars
   * @property {Number} [sideMargins=100] Defines the percent of bar size to use as spacing between axes.
   * @property {Boolean} [useOrigin=true] Determines if {Tee.CustomBar#origin} value is used as bar minimum.
   * @property {Number} [origin=0] Defines the value to use as bar minimum.
   * @property {Number} [barSize=70] Defines the percent size of bars on available space.
   * @property {Number} [customBarSize=0] Defines the custom bar size in pixels.
   * @property {Number} [offset=0] Defines the percent bar size to offset each bar.
   * @property {String} [barStyle="bar"] Which shape to draw ("bar", "ellipse", "line").
   * @property {Boolean} [stacked="no"] Use "no", "yes", "100", "sideAll", "self", "side" to define stack behaviour with other BarSeries.
   */
  Tee.CustomBar = function (o, o2) {
    Tee.Series.call(this, o, o2)

    this.sideMargins = 100
    this.useOrigin = true
    this.origin = 0
    this.continuous = false

    this.marks.visible = true
    this.marks.location = 'end'

    this.hover.enabled = true

    this.offset = 0 // %
    this.barSize = 70 // %
    this.customBarSize = 0
    this.barStyle = 'bar' // "ellipse"
    var percent = 1
    var f = this.format
    f.fill = ''
    f.stroke.fill = 'black'
    f.shadow.visible = true
    f.round.x = 4
    f.round.y = 4
    f.gradient.visible = true

    f.depth = 1

    this.stacked = 'no' // "yes", "100", "sideAll", "self", "side"

    this.drawBar = function (r, barStyle) {
      var old = f.depth,
        oldz = f.z,
        ctx = this.chart.ctx

      if (!barStyle) barStyle = this.barStyle

      f.depth = (0.5 * Math.min(this.yMandatory ? r.width : r.height, 200)) / 100 // 200=Three.totalDepth !!

      if (r.width > 0 && r.height > 0) {
        if (this.stacked !== 'side') f.z = f.z + 0.5 * (1 - f.depth)

        if (barStyle === 'bar') {
          f.cube(r)
        } else if (barStyle === 'line') {
          var pos

          ctx.beginPath()
          ctx.z = f.z + f.depth * 0.5

          if (this.yMandatory) {
            pos = r.x + 0.5 * r.width

            ctx.moveTo(pos, r.y)
            ctx.lineTo(pos, r.y + r.height)

            //f.rectPath(pos,r.y,1,r.height);
          } else {
            pos = r.y + 0.5 * r.height

            ctx.moveTo(r.x, pos)
            ctx.lineTo(r.x + r.width, pos)

            //f.rectPath(r.x,pos,r.width,1);
          }
        } else if (barStyle === 'cylinder') f.cylinder(r, 1, this.yMandatory)
        else if (barStyle === 'cone') f.cylinder(r, 0, this.yMandatory)
        else if (barStyle === 'ellipsoid' && this.chart.__webgl) {
          ctx.depth = f.depth
          ctx.z = f.z
          ctx.image = this.image
          ctx.ellipsoid(r, this.yMandatory)
        } else {
          f.z += 0.5 * f.depth
          f.ellipsePath(this.chart.ctx, r.x + r.width * 0.5, r.y + r.height * 0.5, r.width, r.height)
        }

        f.depth = old
        f.z = oldz

        return true
      } else return false
    }

    /**
     * @returns {Number} Returns the number of visible Tee.CustomBar series that are displayed before this series.
     */
    this.countAll = function (upToThis) {
      var i = this.chart.series.items,
        res = 0,
        len = i.length,
        t,
        s

      for (t = 0; t < len; t++) {
        s = i[t]

        if (s == this && upToThis) break
        else if (s.visible && s.constructor == this.constructor) res += s.data.values.length
      }

      return res
    }

    var offset = new Point(),
      originPos,
      bar = new Rectangle(),
      visibleBar = { total: 0, index: 0 }

    this._margin = 0

    this.calcBarOffset = function (axisSize) {
      var barSize = axisSize,
        all = this.stacked == 'sideAll'

      this.countall = all ? this.countAll(true) : 0

      var tmpLen,
        len = all ? this.countAll() : this.data.values.length

      if (len > 1) barSize /= len

      if (this.stacked == 'no') {
        barSize /= visibleBar.total
        offset.x = (this.customBarSize > 0 ? this.customBarSize : barSize * this.barSize * 0.01) * (visibleBar.total == 1 ? -0.5 : visibleBar.index - visibleBar.total * 0.5)
        tmpLen = visibleBar.total
      } else {
        offset.x = -barSize * 0.5
        tmpLen = 1
      }

      offset.y = this.customBarSize > 0 ? this.customBarSize : barSize * this.barSize * 0.01

      this._margin = 0.5 * tmpLen * offset.y + this.sideMargins * (tmpLen * (barSize - offset.y)) * 0.005

      if (this.stacked != 'no') offset.x += this.offset * barSize * 0.01 + (barSize - offset.y) * 0.5
    }

    this.calcStackPos = function (t, p) {
      var v, tmp, a

      if (this.isStacked) {
        this.calcStack(t, p, this.data.values[t])
        ;(v = this.pointOrigin(t, false)), (a = this.mandatoryAxis)

        if (this.isStack100) {
          tmp = this.pointOrigin(t, true)
          originPos = tmp === 0 ? a.endPos : a.calc((v * 100.0) / tmp)
        } else originPos = a.calc(v)
      } else {
        this.calc(t, p)

        if (this.stacked == 'sideAll') {
          tmp = this.notmandatory.calc(this.countall + t)
          if (this.yMandatory) p.x = tmp
          else p.y = tmp
        }
      }
    }

    var hasPaintedOver = false

    this.drawSortedValues = function (sorted) {
      var animation = this.sortedOptions.sortedDrawAnimation
      if (this.sortedOptions.sorted != sorted && !this.sortedOptions.sorting && animation && !animation.running) {
        this.sortedOptions.sorted = sorted
        var data = this.data
        if (this.sortedOptions.sorted) this.sortValues()

        var prevValues = this.sortedOptions.sorted ? this.sortedOptions.originalValues.slice() : this.sortedOptions.sortedValues.slice()
        var values = this.data.values
        var endValues = this.sortedOptions.sorted ? this.sortedOptions.sortedValues.slice() : this.sortedOptions.originalValues.slice()

        var series = this
        var sortedOptions = this.sortedOptions
        animation.chart = this.chart
        if (sortedOptions.sortingAnimationType == 'horizontalchange') {
          animation.doStep = function (f) {
            //do with draw
            if (f < 1) {
              percent = f
              series.draw()
            }
          }

          animation.onstop = function () {
            percent = 1
            if (sortedOptions.sorted)
              for (var i = 0; i < prevValues.length; i++) {
                values[i] = endValues[i]
              }
            //animation.running = false;
          }
          animation.onstart = function () {
            if (!sortedOptions.sorted)
              for (var i = 0; i < prevValues.length; i++) {
                values[i] = endValues[i]
              }
            //animation.running = true;
          }
        } else {
          animation.doStep = function (f) {
            //do with draw
            if (f < 1) {
              for (var i = 0; i < prevValues.length; i++) {
                values[i] = prevValues[i] + (endValues[i] - prevValues[i]) * f
              }
            }
          }

          animation.onstop = function () {
            percent = 1
            for (var i = 0; i < prevValues.length; i++) {
              values[i] = endValues[i]
            }
            animation.running = false
          }
          animation.onstart = function () {
            animation.running = true
          }
        }
        animation.animate()

        this.data.labels = this.sortedOptions.sorted ? this.sortedOptions.sortedLabels.slice() : this.sortedOptions.originalLabels.slice()

        this.chart.draw()
      }
    }
    this.draw = function () {
      var len = this.data.values.length

      if (len > 0) {
        this.initOffsets()

        var p = new Point(),
          c = this.chart.ctx

        if (!this.hover.enabled) {
          f.stroke.prepare()
          f.shadow.prepare(c)
        }

        var hover = this.hover.enabled,
          isLine = this.barStyle === 'line',
          _styles = this.data.styles

        if (hover && this.format.image.url != null) {
          this.hover.image.url = this.format.image.url
          this.hover.image.repeat = this.format.image.repeat
          this.hover.image.backFill = this.format.image.backFill
        }

        f.z = 0 //B407 init
        for (var t = 0; t < len; t++)
          if (!this.isNull(t)) {
            this.calcStackPos(t, p)

            var sortedP = new Tee.Point()

            if (percent < 1) {
              this.calcStackPos(
                this.sortedOptions.sortedValuesIndices.findIndex(function (x) {
                  return x == t
                }),
                sortedP
              )
              if (this.sortedOptions.sorted) p.x = (-p.x + sortedP.x) * percent + p.x
              else p.x = (p.x - sortedP.x) * percent + sortedP.x
            }

            if (this.onbeforedrawPoint) this.onbeforedrawPoint(t)

            this.calcBarBounds(p, bar, offset, originPos instanceof Array ? originPos[t] : originPos)

            this.barRectangle = bar
            var pointPainted = this.drawBar(bar, _styles ? _styles[t] : null)

            var isover = hover && this.over == t,
              ff = isover ? this.hover : f

            c.fillStyle = this.getFillStyle(bar, this.getFill(t, ff.fill === '' ? f : ff))

            if (!this.format.gradient.visible) ff.fill = c.fillStyle

            if (hover) ff.shadow.prepare(c)

            if (isover) {
              if (this.format.image.url != null && !hasPaintedOver) {
                //prevent fill flicker for first hover
                hasPaintedOver = true
                f.draw(c, null, bar)
              } else c.fill()
            }

            if (pointPainted) {
              ff.draw(c, null, bar)

              if (isLine || ff.stroke.fill !== '') {
                if (hover) ff.stroke.prepare()

                if (!isover && isLine) c.strokeStyle = c.fillStyle

                c.shadowColor = 'transparent'

                c.stroke()

                if (ff.shadow.visible) c.shadowColor = ff.shadow.color
              }
            }
          }
      }
    }

    this.calcColorEach = function () {
      this.chart.series.visibleCount(this, Tee.CustomBar, visibleBar)
      this.isColorEach = this.colorEach == 'yes' || (this.colorEach == 'auto' && visibleBar.total == 1)
    }

    this.initOffsets = function () {
      var nomand = this.notmandatory,
        mand = this.mandatoryAxis,
        range = this.yMandatory ? this.maxXValue() - this.minXValue() : this.maxYValue() - this.minYValue()

      if (this.stacked == 'sideAll') this.calcBarOffset(nomand.axisSize)
      else this.calcBarOffset(range === 0 ? nomand.axisSize : nomand.calcSize(range))

      if (this.useOrigin) {
        if (this.origin instanceof Array) {
          originPos = []
          for (var t = 0; t < this.origin.length; t++) {
            originPos[t] = mand.calc(this.origin[t])
          }
        } else {
          originPos = mand.calc(this.origin)
        }
      } else if (this.yMandatory) originPos = mand.inverted ? mand.startPos : mand.endPos
      else originPos = mand.inverted ? mand.endPos : mand.startPos

      var st = this.stacked

      this.isStacked = st !== 'no' && st !== 'sideAll' && st !== 'side'
      this.isStack100 = st === '100'
    }

    /**
     * @returns {Number} Returns the index of series bar that contains {@link Tee.Point} p parameter.
     */
    this.clicked = function (p) {
      this.initOffsets()

      var p2 = new Point(),
        len = this.data.values.length,
        t

      for (t = 0; t < len; t++)
        if (!this.isNull(t)) {
          this.calcStackPos(t, p2)
          this.calcBarBounds(p2, bar, offset, originPos instanceof Array ? originPos[t] : originPos)

          if (bar.contains(p)) return t
        }

      return -1
    }

    this.markPos = function (t, p) {
      var yMand = this.yMandatory,
        op = offset.x + offset.y * 0.5,
        m = this.marks

      this.calcStackPos(t, p)

      if (this.stacked == 'sideAll') {
        var tmp = this.notmandatory.calc(this.countall + t)
        yMand ? (p.x = tmp) : (p.y = tmp)
      }

      var inv = this.useOrigin && this.data.values[t] < (this.origin instanceof Array ? this.origin[t] : this.origin)
      if (this.mandatoryAxis.inverted) inv = !inv

      // Marks location

      if (m.location == 'center') {
        this.calcBarBounds(p, bar, offset, originPos instanceof Array ? originPos[t] : originPos)

        if (m.canDraw(p.x, p.y, t, inv)) {
          if (yMand) p.y = bar.y + bar.height * 0.5 + m.bounds.height * 0.5
          else p.x = bar.x + bar.width * 0.5 - m.bounds.width * 0.5
        }
      }

      var a = this.chart.aspect,
        is3d = a.view3d,
        wx = 0,
        wy = 0

      if (is3d && a.orthogonal) {
        wx = a._orthox * 0.5
        wy = a._orthoy * 0.5
      }

      if (yMand) {
        p.x += is3d ? op + wx : op
        if (is3d) p.y -= wy
      } else {
        p.y += is3d ? op - wy : op
        if (is3d) p.x += wx
      }

      return inv
    }

    /*
  this.drawMarks=function() {
    var len=this.data.values.length, m=this.marks, p=new Point(), inv;

    if (len>0)
      for(var t=0; t<len; t+=m.drawEvery)
        if (!this.isNull(t)) {
          inv=this.markPos(t,p);
          m.drawMark(p.x, p.y, t, inv);
        }
  }
  */

    this.labelOrTitle = function (index) {
      var s = this.title,
        l = this.data.labels[index]
      return visibleBar.total > 1 ? s || l : this.parent.labelOrTitle(index)
    }

    this.initZ = function (index, total) {
      var s,
        f = this.format

      if (this.stacked !== 'side') {
        f.z = 0
        f.depth = 1

        while (index > 1) {
          index--
          s = this.chart.series.items[index]

          if (s.visible && s.constructor == this.constructor) {
            f.z = s.z
            f.depth = s.depth
            break
          }
        }
      } else Tee.Series.prototype.initZ.call(this, index, total)

      this.marks.format.z = f.z + f.depth * 0.5
    }
  }

  Tee.CustomBar.prototype = new Tee.Series()
  Tee.CustomBar.prototype.parent = Tee.Series.prototype
  Tee.CustomBar.constructor = Tee.CustomBar

  /**
   * @constructor
   * @augments Tee.CustomBar
   * @class Draws data as vertical bars
   */
  Tee.Bar = function (o, o2) {
    Tee.CustomBar.call(this, o, o2)

    this.calc = function (index, p) {
      this.isStacked ? this.calcStack(index, p, this.data.values[index]) : this.parent.calc.call(this, index, p)
    }

    this.horizMargins = function (p) {
      this.initOffsets()
      p.x = this._margin
      p.y = this._margin
    }

    this.vertMargins = function (p) {
      var m = this.marks,
        st = this.format.stroke,
        hasNeg = this.minYValue() < (this.origin instanceof Array ? ArrayMin(this.origin) : this.origin)

      if (m.visible && m.location !== 'center') {
        p.y = m.arrow.length + m.format.textHeight('Wj') + m.margins.top + m.margins.bottom
        st = m.format.stroke
      }

      if (st.fill !== '') p.y += 2 * st.size + 1

      if (hasNeg) p.x = p.y
    }

    this.maxXValue = function () {
      return this.stacked === 'sideAll' ? this.countAll() - 1 : this.parent.maxXValue.call(this)
    }

    this.minYValue = function () {
      var res = this.parent.minYValue.call(this)
      return this.useOrigin ? Math.min(this.origin instanceof Array ? ArrayMin(this.origin) : this.origin, res) : res
    }

    this.maxYValue = function () {
      if (this.stacked === 'sideAll' || this.stacked === 'side') {
        var res = 0,
          s,
          ss = this.chart.series.items,
          l = ss.length,
          t,
          val

        for (t = 0; t < l; t++) {
          s = ss[t]
          if (s.visible && s.constructor === this.constructor) {
            val = s.parent.maxYValue.call(s)
            if (val > res) res = val
          }
        }

        return res
      } else return this.stackMaxValue()
    }

    this.calcBarBounds = function (p, bar, offset, originPos) {
      bar.x = p.x + offset.x
      bar.width = offset.y

      if (this._vertAxis.inverted) {
        bar.y = originPos
        bar.height = p.y - bar.y
      } else {
        bar.y = p.y
        bar.height = originPos - p.y
      }

      if (bar.height < 0) {
        bar.y += bar.height
        bar.height = -bar.height
      }
    }
  }

  Tee.Bar.prototype = new Tee.CustomBar()
  Tee.Bar.prototype.parent = Tee.CustomBar.prototype

  /**
   * @constructor
   * @augments Tee.CustomBar
   * @class Draws data as horizontal bars
   */
  Tee.HorizBar = function (o, o2) {
    Tee.CustomBar.call(this, o, o2)

    this.yMandatory = false
    this.format.gradient.direction = 'rightleft'

    /**
     * @returns {Number} Returns the maximum width in pixels of series marks texts.
     */
    this.maxMarkWidth = function () {
      var res = 0,
        f,
        t,
        m = this.marks,
        l = this.count(),
        n

      if (m.visible) {
        f = this.marks.format
        f.font.prepare()

        for (t = 0; t < l; t += m.drawEvery)
          if (!this.isNull(t)) {
            n = f.textWidth(this.markText(t) + 'W')
            if (n > res) res = n
          }
      }
      return res
    }

    this.horizMargins = function (p) {
      var m = this.marks,
        st = this.format.stroke,
        hasNeg = this.minXValue() < this.origin

      if (m.visible && m.location !== 'center') {
        p.y = m.arrow.length + this.maxMarkWidth() + m.margins.left + m.margins.right
        st = m.format.stroke
      }

      if (st.fill !== '') p.y += 2 * st.size + 1

      if (hasNeg) p.x = p.y
    }

    this.vertMargins = function (p) {
      this.initOffsets()
      p.x += this._margin
      p.y += this._margin
    }

    this.maxYValue = function () {
      return this.stacked == 'sideAll' ? this.countAll() - 1 : this.parent.maxXValue.call(this)
    }

    this.minYValue = function () {
      return this.stacked == 'sideAll' ? 0 : this.parent.minXValue.call(this)
    }

    this.minXValue = function () {
      var res = this.parent.minYValue.call(this)
      return this.useOrigin ? Math.min(this.origin, res) : res
    }

    this.maxXValue = function () {
      return this.stackMaxValue()
    }

    this.calcBarBounds = function (p, bar, offset, originPos) {
      bar.y = p.y + offset.x
      bar.height = offset.y

      if (this._horizAxis.inverted) {
        bar.x = p.x
        bar.width = originPos - p.x
      } else {
        bar.x = originPos
        bar.width = p.x - bar.x
      }

      if (bar.width < 0) {
        bar.x += bar.width
        bar.width = -bar.width
      }
    }
  }

  Tee.HorizBar.prototype = new Tee.CustomBar()
  Tee.HorizBar.prototype.parent = Tee.CustomBar.prototype

  /**
   * @constructor
   * @augments Tee.HorizBar
   * @class Draws a HorizBar with states in background and one limit.
   * @property {object}[limit] limit contains the properties of the limit.
   * @property {object}[states] states contains the properties of the states.
   */
  Tee.Bullet = function (o, o2) {
    Tee.HorizBar.call(this, [o[0]], o2 ? [o2[0]] : [])

    this.barSize = 25
    /**
     * @property {number}[origin: 38] it contains the origin of the limit.
     * @property {number}[width: 0.2] it contains the width of the limit.
     * @property {number}[height: 35] it contains the height of the limit.
     * @property {string}[color: "red"] it contains the color of the limit.
     * @property {object}[bar: null] it contains the limit bar.
     */
    this.limit = {
      origin: 38,
      width: 0.2,
      height: 35,
      color: 'red',
      bar: null
    }
    this.marks.visible = false
    /**
     * @property {array}[colors: ["#111", "#444", "#777", "#BBB", "#EEE"]] it contains the colors of the states.
     * @property {array}[values: [10, 10, 10, 10, 10]] it contains the values of the states.
     * @property {array}[barStates: []] it contains the bar array of the states.
     * @property {number}[barSize: 50] it contains the size of the states.
     * @property {boolean}[gradientVisible: false] it contains if the gradient will be visible or not.
     */
    this.states = {
      colors: ['#111', '#444', '#777', '#BBB', '#EEE'],
      values: [10, 10, 10, 10, 10],
      barStates: [],
      barSize: 50,
      gradientVisible: false
    }
    createStatesBars(this.states, this.origin)
    function createStatesBars(states, origin) {
      var sumStatesValues = 0
      if (states.values.length > 0) {
        states.barStates.push(createBarState(states.values[0], sumStatesValues + origin, states.barSize, states.colors[0], states.colors[0], states.gradientVisible))
        sumStatesValues += states.values[0]
        for (var i = 1; i < states.values.length; i++) {
          states.barStates.push(
            createBarState(
              states.values[i],
              sumStatesValues + origin,
              states.barSize,
              states.colors[(i - 1) % states.colors.length],
              states.colors[i % states.values.length],
              states.gradientVisible
            )
          )
          sumStatesValues += states.values[i]
        }
      }
    }

    this.minValue = function () {
      if (this.states.barStates.length >= 1) return this.states.barStates[0].origin
      else return 0
    }
    this.maxValue = function () {
      if (this.states.barStates.length >= 1) return this.states.barStates[this.states.barStates.length - 1].data.values[0]
      else return 0
    }
    function createBarState(value, origin, barSize, color1, color2, gradientVis) {
      var values = [value + origin]
      var bar = new Tee.HorizBar(values)
      bar.stacked = 'side'
      bar.origin = origin
      bar.barSize = barSize
      bar.marks.visible = false
      bar.format.round.x = 0
      bar.format.round.y = 0
      bar.format.gradient.colors = [color1, color2]
      if (gradientVis) {
        bar.format.gradient.direction = 'leftright'
        bar.format.gradient.visible = true
      } else {
        bar.format.gradient.visible = false
        bar.format.fill = color2
        bar.palette.colors = [color2]
      }
      bar.format.shadow.visible = false
      bar.format.stroke.fill = 'rgba(0,0,0,0.0)'

      return bar
    }
    this.parentDraw = this.draw
    this.draw = function () {
      var minVal, maxVal
      minVal = this.minValue()
      maxVal = this.maxValue()
      this.chart.zoom.reset = function () {
        this.chart.axes.each(function () {
          this.automatic = true
        })
        this.chart.axes.bottom.setMinMax(minVal, maxVal)
      }
      this.states.barStates = []
      createStatesBars(this.states, this.origin)
      for (var i = 0; i < this.states.barStates.length; i++) {
        if (this.chart) this.states.barStates[i].setChart(this.states.barStates[i], this.chart)
        this.states.barStates[i].draw()
      }
      this.limit.bar = createBarState(this.limit.width, this.limit.origin + this.origin, this.limit.height, this.limit.color, this.limit.color, false)
      this.limit.bar.setChart(this.limit.bar, this.chart)
      this.limit.bar.draw()
      this.parentDraw()
    }
  }
  Tee.Bullet.prototype = new Tee.HorizBar()
  Tee.Bullet.prototype.parent = Tee.HorizBar.prototype
  /**
   * @constructor
   * @augments Tee.Series
   * @class Base abstract class for line, area, scatter plots
   * @property {Tee.CustomSeries-Pointer} pointer Paints a visual representation at each point position.
   * @property {String} stacked Defines if multiple series are displayed one on top of each other.
   * @property {Number} smooth Draws lines between points as diagonals (value 0) or smooth curves (value > 0 < 1).
   * @property {Boolean} [stairs=false] Draws lines between points in stairs mode instead of diagonals.
   * @property {Boolean} [invertedStairs=false] Draws lines between points in inverted stairs mode instead of diagonals.
   */
  Tee.CustomSeries = function (o, o2) {
    Tee.Series.call(this, o, o2)

    this.stacked = 'no' // "yes", "100"
    this.stairs = false
    this.invertedStairs = false

    this.continuous = true //allows tooltip interpolation between points
    this.clickTolerance = 3 //distance for click sensitivity

    this.hover.enabled = true
    this.hover.line = false

    /*
     * @private
     */
    this.isStacked = false
    this.isStack100 = false

    this.smooth = 0

    /**
     * @constructor
     * @public
     * @class Formatting properties to draw symbols at series data positions
     * @property {Number} [width=12] The horizontal size in pixels
     * @property {Number} [height=12] The vertical size in pixels
     * @property {Tee.Format} format Visual properties to paint pointers.
     * @property {Boolean} [colorEach=false] Determines if pointers will be filled using a different color
     * for each point in series.
     * @property {String} [style="rectangle"] The shape to draw at pointer positions
     */
    function Pointer(chart, series) {
      /*
       * @private
       */
      this.setChart = function (chart) {
        this.chart = chart
        this.format.setChart(chart)
      }

      this.chart = chart

      this.inflateMargins = true

      /*
       * Visual properties to paint pointers
       */
      var f = (this.format = new Tee.Format(chart))

      f.shadow.visible = false
      f.fill = ''
      f.gradient.colors = ['white', 'white', 'white']
      f.gradient.visible = true
      f.shadow.visible = true

      /*
       * Determines if pointers will be displayed.
       */
      this.visible = false

      this.colorEach = false

      /*
       * Visual style of pointer ("rectangle", "cylinder", "cone", "ellipse", "sphere", "triangle", "diamond", "downtriangle", "cross", "x").
       */
      this.style = 'rectangle'

      this.width = 12
      this.height = 12

      this.draw = function (p, index, f, fill) {
        var c = this.chart.ctx

        f.z = series.format.z

        if (this.transform) {
          c.save()
          this.transform(p.x, p.y, index)
        }

        var w = this.width * 0.5,
          h = this.height * 0.5,
          r

        if (this.style == 'cube') {
          r = {
            x: p.x - w,
            y: p.y - h,
            width: this.width,
            height: this.height
          }

          var wh = Math.max(w, h) / 50 // 50=totalDepth !

          f.z = (series.format.z + series.format.depth) * 0.5 - wh * 0.5
          f.depth = wh

          f.cube(r)
          f.draw(c, null, r)
        } else if (this.style == 'rectangle') f.rectangle(p.x - w, p.y - h, this.width, this.height)
        else if (this.style == 'ellipse') f.ellipse(p.x, p.y, this.width, this.height)
        else if (this.style == 'sphere') {
          f.depth = series.format.depth
          f.sphere(p.x, p.y, this.width, this.height)
        } else if (this.style == 'cylinder') {
          r = {
            x: p.x - w,
            y: p.y - h,
            width: this.width,
            height: this.height
          }

          // Remember gradient properties:
          var g = f.gradient,
            oldDir = g.direction,
            oldColors = g.colors.slice(0)

          // Set gradient to resemble cylinder:
          g.direction = 'leftright'
          g.colors = [g.colors[1], g.colors[0], g.colors[1]]

          f.cylinder(r, 1, true)
          f.draw(c, null, r)

          // Restore gradient properties:
          g.direction = oldDir
          g.colors = oldColors
        } else if (this.style == 'cone') {
          r = {
            x: p.x - w,
            y: p.y - h,
            width: this.width,
            height: this.height
          }

          // Draw cylinder with top radius 0% to create a cone:
          f.cylinder(r, 0, true)

          f.draw(c, null, r)
        } else if (this.style == 'triangle') f.polygon([new Point(p.x, p.y - h), new Point(p.x - w, p.y + h), new Point(p.x + w, p.y + h)])
        else if (this.style == 'downtriangle') f.polygon([new Point(p.x, p.y + h), new Point(p.x - w, p.y - h), new Point(p.x + w, p.y - h)])
        else if (this.style == 'diamond') f.polygon([new Point(p.x, p.y - h), new Point(p.x - w, p.y), new Point(p.x, p.y + h), new Point(p.x + w, p.y)])
        else {
          c.beginPath()

          if (this.style == 'cross') {
            c.moveTo(p.x - w, p.y)
            c.lineTo(p.x + w, p.y)
            c.moveTo(p.x, p.y - h)
            c.lineTo(p.x, p.y + h)
          }
          if (this.style == 'x') {
            c.moveTo(p.x - w, p.y - h)
            c.lineTo(p.x + w, p.y + h)
            c.moveTo(p.x - w, p.y + h)
            c.lineTo(p.x + w, p.y - h)
          }

          f.stroke.prepare(fill)
          c.stroke()
        }

        if (this.transform) c.restore()
      }

      this.setSize = function (size) {
        this.width = size
        this.height = size
      }
    }

    /*
     * Visual indication at series point positions.
     */
    this.pointer = new Pointer(this.chart, this)

    this.maxYValue = function () {
      return this.stackMaxValue()
    }

    this.calc = function (index, p) {
      this.isStacked ? this.calcStack(index, p, this.data.values[index]) : Tee.Series.prototype.calc.call(this, index, p)
    }

    this.calcColorEach = function () {
      this.isColorEach = this.colorEach == 'yes' || this.pointer.colorEach || this.colorEachLine == 'yes' || this.colorEachLine == true
    }

    this.initZ = function (index, total) {
      var s,
        f = this.format

      if (this.stacked !== 'no') {
        f.z = 0
        f.depth = 1

        while (index > 1) {
          index--
          s = this.chart.series.items[index]

          if (s.visible && s.constructor == this.constructor) {
            f.z = s.z
            f.depth = s.depth
            break
          }
        }
      } else Tee.Series.prototype.initZ.call(this, index, total)

      this.marks.z = f.z + f.depth * 0.5
    }
  }

  Tee.CustomSeries.prototype = new Tee.Series()

  Tee.CustomSeries.prototype.drawPointers = function () {
    var len = this.data.values.length,
      f = this.pointer.format,
      isEach = this.colorEach == 'yes' || this.pointer.colorEach

    if (!isEach) if (f.fill === '') f.fill = this.format.fill

    var p = new Point(),
      g = f.gradient,
      t,
      fill = f.fill,
      old = fill

    if (!isEach && g.visible) g.setEndColor(fill)

    for (t = 0; t < len; t++)
      if (!this.isNull(t)) {
        this.calc(t, p)

        fill = this.getFill(t, f)

        if (fill != old) {
          g.visible ? g.setEndColor(fill) : (f.fill = fill)
          old = fill
        }

        this.getSize(t)

        if (this.onbeforedrawpointer) this.onbeforedrawpointer(t, this.pointer)

        this.pointer.draw(p, t, f, fill)

        if (this.hover.enabled && this.over == t) this.pointer.draw(p, t, this.hover, fill)
      }

    if (isEach) f.fill = old
  }

  /**
   * @private
   */
  Tee.CustomSeries.prototype.setChart = function (series, chart) {
    var tmp = Tee.Series.prototype.setChart
    tmp(series, chart)
    series.pointer.setChart(chart)
  }

  /**
   * @returns {Number} Returns the index of the series point that contains p {@link Tee.Point} parameter.
   */
  Tee.CustomSeries.prototype.clicked = function (p) {
    var p1 = new Point(),
      p2 = new Point(),
      len = this.data.values.length,
      t

    // Line+Pointer only acts when this.hover.line=true

    if (this.drawLine && len > 0 && (this.hover.line || !this.pointer.visible)) {
      this.calc(0, p1)

      for (
        t = 1;
        t < len;
        t++ // if (!this.isNull(t))  <--- pending
      ) {
        this.calc(t, p2)

        if (this.stairs) {
          var p1a

          if (this.invertedStairs) p1a = new Point(p2.x, p1.y)
          else p1a = new Point(p1.x, p2.y)

          if (pointInLine(p, p1, p1a, this.clickTolerance) || pointInLine(p, p1a, p2, this.clickTolerance)) return t
        } else if (pointInLine(p, p1, p2, this.clickTolerance))
          // near-line tolerance in pixels
          return t

        p1.x = p2.x
        p1.y = p2.y
      }
    }

    if (this.pointer.visible) {
      var r = new Rectangle(),
        po = this.pointer

      for (t = len - 1; t >= 0; t--)
        if (!this.isNull(t)) {
          this.calc(t, r)
          this.getSize(t)
          r.x -= po.width * 0.5
          r.width = po.width
          r.y -= po.height * 0.5
          r.height = po.height

          if (r.contains(p)) return t
        }
    }

    return -1
  }

  Tee.CustomSeries.prototype.horizMargins = function (p) {
    var po = this.pointer,
      s = po.format.stroke
    if (po.visible && po.inflateMargins) p.x = p.y = (s.fill !== '' ? s.size : 0) + 1 + po.width * 0.5
  }

  Tee.CustomSeries.prototype.vertMargins = function (p) {
    var po = this.pointer,
      s = po.format.stroke
    if (po.visible && po.inflateMargins) p.x = p.y = (s.fill !== '' ? s.size : 0) + 1 + po.height * 0.5
  }

  Tee.CustomSeries.prototype.getSize = function () {}

  /**
   * @constructor
   * @augments Tee.CustomSeries
   * @class Draws series data as a contiguous polyline between points
   * @property {Boolean} [stairs=false] Determines if lines between points are direct (diagonals) or as stairs (horizontal and vertical).
   */
  Tee.Line = function (o, o2) {
    Tee.CustomSeries.call(this, o, o2)

    this.drawLine = true

    this.treatNulls = 'dontPaint'

    this.colorEachLine = 'no'

    var f = this.format
    f.shadow.visible = true
    f.shadow.blur = 10
    f.lineCap = 'round'

    this.doDrawLine = function (c) {
      var p = new Point(),
        oldX,
        oldY,
        len = this.data.values.length,
        t,
        smop,
        s,
        begin = 0,
        end = len,
        no = this.notmandatory

      if (!this.smooth && !this.data.x) {
        begin = Math.max(0, trunc(no.minimum) - 1)
        end = Math.min(len, trunc(no.maximum) + 2)
      }

      var a = this.chart.aspect,
        is3d = a.view3d

      // ***** mods #2609 start here ******
      var isEach = this.colorEachLine == 'yes' || this.colorEachLine == true

      f.fill = this.getFill(0, f)

      if (!isEach) if (f.fill === '') f.fill = this.format.fill

      c.beginPath() //clear c

      if (this.smooth > 0 && typeof Tee.drawSpline !== 'undefined') {
        smop = new Array(2 * len)

        for (t = 0; t < len; t++) {
          this.calc(t, p)

          smop[2 * t] = p.x
          smop[2 * t + 1] = p.y
        }

        if (c.spline) c.spline(smop)
        else Tee.drawSpline(c, smop, this.smooth, true)
      } else {
        var noNulls = this.treatNulls !== 'skip'

        var g = f.gradient
        var fill = f.stroke.fill
        var old = fill

        if (!isEach && g.visible) g.setEndColor(f.stroke.fill)

        var stSeg = f.stroke
        stSeg.prepare(stSeg.fill)

        for (t = begin; t < end; t++)
          if (this.isNull(t)) {
            if (noNulls) begin = -1 // Dont Paint until next non-null
          } else {
            this.calc(t, p)

            if (isEach) {
              if (isEach && t != begin) c.beginPath()

              fill = this.getFill(t, f)

              if (fill != old) {
                g.visible ? g.setEndColor(fill) : (f.fill = fill)
                old = fill
              }

              if (t == begin || begin === -1) {
                c.moveTo(p.x, p.y)
                begin = 0
              } else if (this.stairs) {
                if (this.invertedStairs) {
                  c.moveTo(oldX, oldY)
                  c.lineTo(p.x, oldY)
                  c.lineTo(p.x, p.y)
                } else {
                  c.moveTo(oldX, oldY)
                  c.lineTo(oldX, p.y)
                  c.lineTo(p.x, p.y)
                }
              } else {
                c.moveTo(oldX, oldY)
                c.lineTo(p.x, p.y)
              }

              c.strokeStyle = fill
              c.stroke()
            } else {
              if (t == begin || begin === -1) {
                c.moveTo(p.x, p.y)
                begin = 0
              } else if (this.stairs) {
                if (this.invertedStairs) c.lineTo(p.x, oldY)
                else c.lineTo(oldX, p.y)

                c.lineTo(p.x, p.y)
              } else c.lineTo(p.x, p.y)
            }

            oldX = p.x
            oldY = p.y

            if (isEach && t != begin) c.closePath()
          }
      }

      var st = f.stroke

      // Chrome bug with shadow and stroke size == 1
      if (this.chart.isChrome && f.shadow.visible) st.size = Math.max(1.1, st.size)

      c.z = f.z
      c.depth = f.depth

      s = st.fill
      if (s === '') s = f.fill

      st.prepare(s)
      f.shadow.prepare(c)

      if (is3d) {
        c.fillStyle = f.fill
        c.fill()
      }

      if (!isEach) if (s !== '') c.stroke()
    }

    this.draw = function () {
      var len = this.data.values.length

      if (len > 0) {
        this.isStacked = this.stacked != 'no'
        this.isStack100 = this.stacked == '100'

        if (this.drawLine) this.doDrawLine(this.chart.ctx)

        if (this.pointer.visible) this.drawPointers()
      }
    }
  }

  Tee.Line.prototype = new Tee.CustomSeries()

  /**
   * @constructor
   * @augments Tee.Line
   * @class Draws series data as points at vertical and horizontal axes positions
   */
  Tee.PointXY = function (o, o2) {
    Tee.Line.call(this, o, o2)
    this.hover.enabled = true
    this.pointer.visible = true
    this.drawLine = false
  }

  Tee.PointXY.prototype = new Tee.Line()

  Tee.Series.prototype.cellRect = function (r, act, series) {
    var visible = { total: 0, index: -1 }
    r.setFrom(this.chart.chartRect)
    this.chart.series.visibleCount(this, series, visible)

    if (act && visible.total > 1) {
      var cols = Math.round(Math.sqrt(visible.total)),
        rows = Math.round(visible.total / cols)

      if (r.width > r.height) {
        var tmp = cols
        cols = rows
        rows = tmp
      }

      r.width /= cols
      r.x += 1.03 * (visible.index % cols) * r.width

      r.height /= rows
      r.y += 1.03 * trunc(visible.index / cols) * r.height

      // % spacing between multiple series
      r.width *= 0.94
      r.height *= 0.94
    }

    return r
  }

  /**
   * @constructor
   * @augments Tee.Series
   * @class Draws series data as slices of a circle
   * @property {Number} [rotation=0] Rotates all slices by specified degree from 0 to 360.
   * @property {Number[]} explode Determines percent of separation from each slice to pie center.
   * @property {Boolean} [clockwise = true] Direction of Values.
   */
  Tee.Pie = function (o, o2) {
    Tee.Series.call(this, o, o2)

    this.marks.style = 'percent'

    this.donut = 0
    this.rotation = 0
    this.colorEach = 'yes'
    this.useAxes = false
    this.continuous = false
    this.angleWidth = 360
    this.maxRadius = 100
    var f = this.format
    f.stroke.fill = 'black'
    f.shadow.visible = true
    f.gradient.visible = true
    f.gradient.direction = 'radial'
    f.gradient.colors = ['white', 'white', 'white']

    this.hover.enabled = true

    this.sort = 'values'
    this.orderAscending = false

    this.explode = null

    this.marks.visible = true

    this.concentric = false
    this.clockwise = true

    /**
     * @returns {Number} Returns the index'th pie slice value.
     */
    this.getValue = function (index) {
      return this.data.values[index]
    }

    this.calcCenter = function (t, radius, mid, center) {
      if (this.explode) {
        var v = this.explode[t]
        if (v) {
          v = radius * v * 0.01
          center.x += v * Math.cos(mid)
          center.y += v * Math.sin(mid)
        }
      }
    }

    this.clicked = function (p) {
      var c = this.chart.ctx,
        len = this.data.values.length,
        t,
        index

      //IE8 ExCanvas does not support "isPointInPath"

      if (c.isPointInPath) {
        endAngle = angle = (Math.PI * this.rotation) / 180.0

        for (t = 0; t < len; t++) {
          index = sorted ? sorted[t] : t

          if (!this.isNull(index)) {
            this.slice(c, index)

            if (c.isPointInPath(p.x, p.y)) return index
          }
        }
      }

      return -1
    }

    var total,
      piex,
      piey,
      radius,
      donutRadius,
      center = { x: 0, y: 0 },
      sorted,
      angle,
      endAngle,
      hoverang

    function calcPos(angle, p) {
      p.x = center.x + Math.cos(angle) * donutRadius
      p.y = center.y + Math.sin(angle) * donutRadius
    }

    // Return Pie radius, and returns pie center xy at "c" parameter
    this.getCenter = function (c) {
      c.x = center.x
      c.y = center.y
      return radius
    }

    this.slice = function (c, index) {
      var p = new Point()

      var a = (Math.PI * 2 * (Math.abs(this.data.values[index]) / total)) / (360 / this.angleWidth)
      endAngle += this.clockwise ? a : -a
      center.x = piex
      center.y = piey
      this.calcCenter(index, radius, (angle + endAngle) * 0.5, center)

      if (this.donut === 0) {
        p.x = center.x
        p.y = center.y
      } else calcPos(angle, p)

      var webgl = this.chart.__webgl

      if (webgl) {
        calcPos(2 * Math.PI - angle, p)
        c.slice(p, center, radius, angle, endAngle, donutRadius, f.tube, f.beveled)
      } else {
        c.beginPath()
        c.moveTo(p.x, p.y)
        c.arc(center.x, center.y, radius, angle, endAngle, !this.clockwise)

        if (this.donut !== 0) {
          calcPos(endAngle, p)
          c.lineTo(p.x, p.y)
          c.arc(center.x, center.y, donutRadius, endAngle, angle, this.clockwise)
        }

        c.closePath()
      }

      if (index == this.over) hoverang = angle

      angle = endAngle
    }

    this.fill = function (i) {
      return this.getFillStyle(new Tee.Rectangle(center.x - radius, center.y - radius, radius * 2, radius * 2), this.getFill(i))
    }

    this.slices = function (shadow) {
      var c = this.chart.ctx,
        len = this.data.values.length,
        t,
        index

      endAngle = angle = (Math.PI * this.rotation) / 180.0

      // TODO: Replace with overriden Tee.Format.slice
      c.z = 0.5
      c.depth = 1

      for (t = 0; t < len; t++) {
        index = sorted ? sorted[t] : t

        if (this.onbeforedrawPoint) this.onbeforedrawPoint(index)

        if (!this.isNull(index)) {
          this.slice(c, index)

          if (shadow) f.shadow.prepare(c)
          else c.fillStyle = this.fill(index)

          c.fill()

          if (!shadow) {
            var st = f.stroke

            if (st.fill !== '') {
              st.prepare()
              c.stroke()
            }
          }
        }
      }
    }

    var r = new Rectangle()

    this.draw = function () {
      var len = this.data.values.length

      if (len > 0) {
        var h = 0,
          m = this.marks

        if (f.shadow.visible) h += 2 * f.shadow.height

        if (m.visible) {
          m.format.font.prepare()
          h += m.format.textHeight('Wj') + m.arrow.length * 0.5
        }

        this.cellRect(r, !this.concentric, Tee.Pie)

        piex = r.x + r.width * 0.5
        piey = r.y + r.height * 0.5

        radius = r.width * 0.5
        var r2 = (r.height - 2 * h) * 0.5

        if (r2 < 0) r2 = 0
        if (r2 < radius) radius = r2

        donutRadius = radius * this.donut * 0.01
        radius = radius / (100 / this.maxRadius)
        total = ArraySumAbs(this.data.values)

        sorted = this.doSort(this.sort, this.orderAscending)

        if (!this.chart.__webgl) this.slices(true)

        this.slices(false)

        if (this.hover.enabled && this.over != -1) {
          var st = this.hover
          if (st.stroke.fill !== '') {
            endAngle = angle = hoverang

            var c = this.chart.ctx
            this.slice(c, this.over)
            c.fillStyle = this.fill(this.over)
            st.draw(c, null, r)
          }
        }
      }
    }

    this.drawMarks = function () {
      var endAngle = (Math.PI * this.rotation) / 180.0,
        angle = endAngle,
        mid,
        v = this.data.values,
        len = v.length,
        index,
        t,
        a

      this.marks.format.z = 0.5

      for (t = 0; t < len; t += this.marks.drawEvery) {
        index = sorted ? sorted[t] : t

        if (!this.isNull(index)) {
          a = Math.PI * 2 * (Math.abs(v[index]) / total)
          endAngle += this.clockwise ? a : -a
          mid = (angle + endAngle) * 0.5
          center.x = piex
          center.y = piey
          this.calcCenter(t, radius, mid, center)
          this.marks.drawPolar(center, radius, mid, index)
          angle = endAngle
        }
      }
    }
  }

  Tee.Pie.prototype = new Tee.Series()

  /**
   * @constructor
   * @augments Tee.CustomSeries
   * @class Draws series data as filled mountain segments between points
   * @property {Boolean} [useOrigin=false] Determines if {Tee.Area#origin} value is used as area minimum.
   * @property {Number} [origin=0] Defines the value to use as area minimum.
   */
  Tee.Area = function (o, o2) {
    Tee.CustomSeries.call(this, o, o2)

    this.useOrigin = false
    this.origin = 0
    this.drawLine = true
    this.closeArea = true

    var f = this.format
    f.shadow.visible = true
    f.lineCap = 'round'
    f.stroke.fill = 'black'
    f.fill = ''
    f.beveled = true

    f.depth = 1
    f.z = 0.5

    var r = new Rectangle()

    this.draw = function () {
      var len = this.data.values.length

      if (len > 0) {
        var a = this.mandatoryAxis,
          nm = this.notmandatory,
          originPos,
          isY = this.yMandatory

        if (this.useOrigin) originPos = a.calc(this.origin)
        else if ((isY && a.inverted) || (!isY && !a.inverted)) originPos = a.startPos
        else originPos = a.endPos

        this.isStacked = this.stacked != 'no'
        this.isStack100 = this.stacked == '100'

        var start,
          p = new Point(),
          old,
          t,
          c = this.chart.ctx,
          smop,
          doStack = this.isStacked, // && (visibleBar.index>0),
          begin = 0,
          end = len

        if (!this.smooth && !this.data.x) {
          begin = Math.max(0, trunc(nm.minimum) - 1)
          end = Math.min(len, trunc(nm.maximum) + 2)
        }

        c.depth = f.depth
        c.z = f.z

        var closePoint

        c.beginPath()

        if (this.smooth > 0 && typeof Tee.drawSpline !== 'undefined') {
          smop = new Array(2 * len)

          for (t = 0; t < len; t++) {
            this.calc(t, p)

            smop[2 * t] = p.x
            smop[2 * t + 1] = p.y
          }

          start = isY ? smop[0] : smop[1]

          if (c.spline) c.spline(smop, true)
          else Tee.drawSpline(c, smop, this.smooth, true)

          if (doStack) {
            var tmp = 0

            for (t = len - 1; t >= 0; t--) {
              this.calcStack(t, p, 0)
              smop[tmp++] = p.x
              smop[tmp++] = p.y
            }

            c.lineTo(smop[0], smop[1])

            if (c.spline) c.spline(smop, true)
            else Tee.drawSpline(c, smop, this.smooth, false)
          }
        }
        //  if (!this.isNull(t)) <-- pending
        else {
          this.calc(begin, p)
          c.moveTo(p.x, p.y)
          start = isY ? p.x : p.y
          old = isY ? p.y : p.x

          if (this.stairs)
            for (t = begin + 1; t < end; t++) {
              this.calc(t, p)
              c.lineTo(p.x, old)
              c.lineTo(p.x, p.y)
              old = isY ? p.y : p.x
            }
          else
            for (t = begin + 1; t < end; t++) {
              this.calc(t, p)
              c.lineTo(p.x, p.y)
            }
        }

        if (doStack) {
          if (this.smooth === 0)
            for (t = end - 1; t >= begin; t--) {
              this.calcStack(t, p, 0)
              if (this.stairs) {
                c.lineTo(p.x, old)
                c.lineTo(p.x, p.y)
                old = isY ? p.y : p.x
              } else c.lineTo(p.x, p.y)
            }
        } else {
          if (isY) {
            if (this.closeArea) {
              c.lineTo(p.x, originPos)
              c.lineTo(start, originPos)
            } else closePoint = p
          } else {
            c.lineTo(originPos, p.y)
            c.lineTo(originPos, start)
          }
        }

        if (!this.closeArea) {
          var st = f.stroke
          var s = st.fill
          st.prepare(s)
          c.stroke()
          c.lineTo(closePoint.x, originPos)
          c.lineTo(start, originPos)
          var tmpStrokeFill = f.stroke.fill
          f.stroke.fill = '#00FF0000'
        }

        c.closePath()

        var g = f.gradient
        if (g.visible) g.colors[g.colors.length - 1] = f.fill

        this.bounds(r)

        if (c.__webgl) c.beveled = f.beveled

        f.draw(c, null, r)

        if (!this.closeArea) f.stroke.fill = tmpStrokeFill

        if (this.pointer.visible) this.drawPointers()
      }
    }

    this.minYValue = function () {
      var v = this.yMandatory ? Tee.Series.prototype.minYValue.call(this) : Tee.Series.prototype.minXValue.call(this)
      return this.yMandatory ? (this.useOrigin ? Math.min(v, this.origin) : v) : v
    }

    this.minXValue = function () {
      var v = this.yMandatory ? Tee.Series.prototype.minXValue.call(this) : Tee.Series.prototype.minYValue.call(this)
      return this.yMandatory ? v : this.useOrigin ? Math.min(v, this.origin) : v
    }

    this.maxYValue = function () {
      var v = this.yMandatory ? this.stackMaxValue() : Tee.Series.prototype.maxXValue.call(this)
      return this.yMandatory ? (this.useOrigin ? Math.max(v, this.origin) : v) : v
    }

    this.maxXValue = function () {
      var v = this.yMandatory ? Tee.Series.prototype.maxXValue.call(this) : this.stackMaxValue()
      return this.yMandatory ? v : this.useOrigin ? Math.max(v, this.origin) : v
    }

    this.vertMargins = function (p) {
      if (this.yMandatory && f.stroke.fill !== '') p.y += f.stroke.size + 2
    }

    this.horizMargins = function (p) {
      if (!this.yMandatory && f.stroke.fill !== '') p.y += f.stroke.size + 2
    }
  }

  Tee.Area.prototype = new Tee.CustomSeries()

  Tee.HighLowBar = function (o, o2) {
    Tee.CustomSeries.call(this, o, o2)

    this.useOrigin = false
    this.origin = 0
    this.drawLine = true
    this.closeArea = true

    var f = this.format
    f.shadow.visible = true
    f.lineCap = 'round'
    f.stroke.fill = 'black'
    f.fill = ''
    f.beveled = true

    this.maxmin = new Tee.Format(f.chart)
    var b = this.maxmin
    b.shadow.visible = false
    b.lineCap = 'round'
    b.stroke.fill = 'red'
    b.fill = ''
    b.beveled = true

    f.depth = 1
    f.z = 0.5

    this.data.lows = []

    this.addRandom = function (count) {
      var d = this.data

      if (!count) count = 5

      d.values.length = count

      d.x = null
      d.lows = []
      d.lows.length = count

      if (count > 0) {
        for (var t = 0; t < count; t++) {
          d.values[t] = Math.random() * 1000
          d.lows[t] = 50 + Math.random() * 150
        }
      }
    }

    this.calcLows = function (index, p) {
      this.isStacked ? this.calcStack(index, p, this.data.lows[index]) : Tee.Series.prototype.calc.call(this, index, p)
    }

    var r = new Rectangle()

    this.draw = function () {
      var len = this.data.values.length

      if (len > 0) {
        var a = this.mandatoryAxis,
          nm = this.notmandatory,
          originPos,
          isY = this.yMandatory

        if (this.useOrigin) originPos = a.calc(this.origin)
        else if ((isY && a.inverted) || (!isY && !a.inverted)) originPos = a.startPos
        else originPos = a.endPos

        this.isStacked = this.stacked != 'no'
        this.isStack100 = this.stacked == '100'

        var start,
          p = new Point(),
          old,
          t,
          c = this.chart.ctx,
          smop,
          doStack = this.isStacked, // && (visibleBar.index>0),
          begin = 0,
          end = len

        if (!this.smooth && !this.data.x) {
          begin = Math.max(0, trunc(nm.minimum) - 1)
          end = Math.min(len, trunc(nm.maximum) + 2)
        }

        c.depth = f.depth
        c.z = f.z

        var closePoint
        var maxP = []
        var minP = []
        var idx = 0

        c.beginPath()

        if (this.smooth > 0 && typeof Tee.drawSpline !== 'undefined') {
          smop = new Array(2 * len)

          for (t = 0; t < len; t++) {
            this.calc(t, p)

            smop[2 * t] = p.x
            smop[2 * t + 1] = p.y
          }

          start = isY ? smop[0] : smop[1]

          if (c.spline) c.spline(smop, true)
          else Tee.drawSpline(c, smop, this.smooth, true)

          if (doStack) {
            var tmp = 0

            for (t = len - 1; t >= 0; t--) {
              this.calcStack(t, p, 0)
              smop[tmp++] = p.x
              smop[tmp++] = p.y
            }

            c.lineTo(smop[0], smop[1])

            if (c.spline) c.spline(smop, true)
            else Tee.drawSpline(c, smop, this.smooth, false)
          }
        }
        //  if (!this.isNull(t)) <-- pending
        else {
          this.calc(begin, p)
          c.moveTo(p.x, p.y)
          start = isY ? p.x : p.y
          old = isY ? p.y : p.x

          if (this.stairs)
            for (t = begin + 1; t < end; t++) {
              this.calc(t, p)
              c.lineTo(p.x, old)
              c.lineTo(p.x, p.y)
              old = isY ? p.y : p.x
            }
          else if (this.rects)
            for (t = begin; t < end; t++) {
              //var startPx = p.x;
              var lowP = p
              this.calc(t, p)
              var lowPY = this.mandatoryAxis.calc(this.data.lows[t])
              var nextPx = this.notmandatory.calc(this.data.x[t + 1])
              //this.calcLows(t, lowP);
              c.rect(p.x, p.y, nextPx - p.x, lowPY - p.y)
              //c.lineTo(p.x, old);
              //c.lineTo(p.x, p.y);
              old = isY ? p.y : p.x

              maxP[idx] = new Point(p.x, p.y)
              minP[idx] = new Point(p.x, lowPY)
              idx++
              maxP[idx] = new Point(nextPx, p.y)
              minP[idx] = new Point(nextPx, lowPY)
              idx++
            }
          else
            for (t = begin + 1; t < end; t++) {
              this.calc(t, p)
              c.lineTo(p.x, p.y)
            }
        }

        if (doStack) {
          if (this.smooth === 0)
            for (t = end - 1; t >= begin; t--) {
              this.calcStack(t, p, 0)
              if (this.stairs) {
                c.lineTo(p.x, old)
                c.lineTo(p.x, p.y)
                old = isY ? p.y : p.x
              } else c.lineTo(p.x, p.y)
            }
        } else {
          if (isY) {
            if (this.closeArea) {
              c.lineTo(p.x, originPos)
              c.lineTo(start, originPos)
            } else closePoint = p
          } else {
            c.lineTo(originPos, p.y)
            c.lineTo(originPos, start)
          }
        }

        //c.polygon(maxP);

        /*if (!this.closeArea) {
          var st = f.stroke;
          var s = st.fill;
          st.prepare(s);
          c.stroke();
          c.lineTo(closePoint.x, originPos);
          c.lineTo(start, originPos);
        }*/

        c.closePath()

        var g = f.gradient
        if (g.visible) g.colors[g.colors.length - 1] = f.fill

        this.bounds(r)

        if (c.__webgl) c.beveled = f.beveled

        f.draw(c, null, r)

        c.beginPath()
        for (t = 0; t < maxP.length; t++) {
          c.lineTo(maxP[t].x, maxP[t].y)
        }
        //if (maxP.length>0)
        //  c.moveTo(maxP[maxP.length-1].x+1, maxP[maxP.length-1].y+1);
        //c.closePath();
        f.stroke.prepare(f.fill, c)
        c.stroke()

        var oldStroke = f.stroke.fill
        var oldFill = f.fill
        var oldSize = f.stroke.size
        f.stroke.fill = 'white'
        f.stroke.size = 0.75
        f.fill = 'rgba(123,0,0,0.0)'
        f.draw(c, null, r)
        f.stroke.fill = oldStroke
        f.fill = oldFill
        f.stroke.size = oldSize

        c.beginPath()
        for (t = 0; t < minP.length; t++) {
          c.lineTo(minP[t].x, minP[t].y)
        }
        //if (minP.length>0)
        //c.moveTo(minP[minP.length-1].x+1, minP[minP.length-1].y+1);

        //c.closePath();

        var oldStroke = f.stroke.fill
        var oldFill = f.fill
        var oldSize = f.stroke.size
        f.stroke.fill = 'white'
        f.stroke.size = 0.75
        f.fill = 'rgba(123,0,0,0.0)'
        f.draw(c, null, r)
        f.stroke.fill = oldStroke
        f.fill = oldFill
        f.stroke.size = oldSize

        f.stroke.prepare(f.fill, c)
        c.stroke()

        //this.format.stroke.prepare(this.format.stroke.fill, c);
        //c.stroke();

        if (this.pointer.visible) this.drawPointers()
      }
    }

    this.minYValue = function () {
      var v = this.yMandatory ? Tee.Series.prototype.minYValue.call(this) : Tee.Series.prototype.minXValue.call(this)
      return this.yMandatory ? (this.useOrigin ? Math.min(v, this.origin) : v) : v
    }

    this.minXValue = function () {
      var v = this.yMandatory ? Tee.Series.prototype.minXValue.call(this) : Tee.Series.prototype.minYValue.call(this)
      return this.yMandatory ? v : this.useOrigin ? Math.min(v, this.origin) : v
    }

    this.maxYValue = function () {
      var v = this.yMandatory ? this.stackMaxValue() : Tee.Series.prototype.maxXValue.call(this)
      return this.yMandatory ? (this.useOrigin ? Math.max(v, this.origin) : v) : v
    }

    this.maxXValue = function () {
      var v = this.yMandatory ? Tee.Series.prototype.maxXValue.call(this) : this.stackMaxValue()
      return this.yMandatory ? v : this.useOrigin ? Math.max(v, this.origin) : v
    }

    this.vertMargins = function (p) {
      if (this.yMandatory && f.stroke.fill !== '') p.y += f.stroke.size + 2
    }

    this.horizMargins = function (p) {
      if (!this.yMandatory && f.stroke.fill !== '') p.y += f.stroke.size + 2
    }
  }

  Tee.HighLowBar.prototype = new Tee.CustomSeries()

  /**
   * @constructor
   * @augments Tee.Area
   * @class Horizontal area style
   */
  Tee.HorizArea = function (o, o2) {
    Tee.Area.call(this, o, o2)
    this.yMandatory = false
  }
  Tee.HorizArea.prototype = new Tee.Area()

  /**
   * @constructor
   * @augments Tee.Pie
   * @class Draws series data as slices of a circle, with a center hole
   * @property {Number} [donut=50] Percent of hole size relative to pie radius. From 0 to 100.
   */
  Tee.Donut = function (o, o2) {
    var lessDonutWidth = 100
    var donutArray = []
    Tee.Pie.call(this, o, o2)
    this.donut = 50

    this.refreshWidth = function () {
      if (this.concentric) {
        donutArray = this.chart.series.items
        var nVisibleDonuts = 0
        var n = 0
        for (var i = 0; i < donutArray.length; i++) {
          if (donutArray[i].visible) nVisibleDonuts++
        }
        if (lessDonutWidth == 100) getLessDonutWidth()
        for (var i = 0; i < donutArray.length; i++) {
          if (donutArray[i].visible) {
            donutArray[i].donut = lessDonutWidth + n * ((100 - lessDonutWidth) / nVisibleDonuts)
            n++
          }
        }
      }
    }
    function getLessDonutWidth() {
      for (var i = 0; i < donutArray.length; i++) {
        if (donutArray[i].donut < lessDonutWidth) lessDonutWidth = donutArray[i].donut
      }
    }
  }

  Tee.Donut.prototype = new Tee.Pie()

  /**
   * @constructor
   * @augments Tee.Donut
   * @class Draws comparative of values plotted as concentric circular bands
   * @property {Number} [rotation=270] Rotates all slices by specified degree from 0 to 360.
   * @property {Number} [angleWidth=values%] Indicates the width of the Donut/Pie/ActivityGauge in degrees form 0 to 360.
   */

  Tee.ActivityGauge = function (o, o2) {
    Tee.Donut.call(this, [], [])
    this.data = {
      values: o != null ? o : [],
      labels: o2 != null ? o2 : []
    }

    this.donutArray = []
    this.maxWidth = 230
    this.maxDrawWidth = this.maxWidth
    this.addRandom = function (count) {
      for (var i = 0; i < count; i++) {
        this.add(Math.floor(Math.random() * 20 + 10), String.fromCharCode(65 + i))
      }
      return this
    }
    this.maxValue = function () {
      var tmp = this.data.values[0]
      for (var i = 0; i < this.data.values.length; i++) {
        if (tmp < this.data.values[i]) tmp = this.data.values[i]
      }
      return tmp
    }

    if (o != null) {
      for (var i = 0; i < o.length; i++) {
        var donutCenterSize = 40
        var tmpDonut = donutCenterSize + ((100 - donutCenterSize) * i) / o.length
        var tmpMaxRadius = donutCenterSize + ((100 - donutCenterSize) * (i + 1)) / o.length
        var tmpAngleWidth = Math.abs((this.maxDrawWidth * o[o.length - 1 - i]) / this.maxValue())
        this.donutArray.push(createDonut(o[o.length - 1 - i], o2[o.length - 1 - i], tmpDonut, tmpMaxRadius, tmpAngleWidth))
      }
    }

    this.clicked = function (p) {
      var index = -1,
        i = 0
      while (i < this.donutArray.length && index == -1) {
        if (index == -1 && this.donutArray[i].clicked(p) != -1) index = this.donutArray.length - i - 1
        i++
      }
      return index
    }
    function createDonut(value, label, tmpDonut, maxRadius, angleWidth) {
      var donut = new Tee.Donut([value], [label])
      donut.concentric = true
      donut.marks.visible = false
      donut.format.shadow.visible = false
      donut.format.gradient.visible = false
      donut.donut = tmpDonut
      donut.maxRadius = maxRadius
      donut.angleWidth = angleWidth
      donut.rotation = 270
      donut.visible = false
      return donut
    }

    function copyFormat(donut, origin, colorNum) {
      var dF = donut.format
      var f = origin.format
      dF.fill = origin.chart.palette.colors[origin.donutArray.length - 1 - (colorNum % origin.chart.palette.colors.length)]
      dF.font.baseLine = f.font.baseLine
      dF.font.fill = f.font.fill
      dF.font.style = f.font.style
      dF.font.textAlign = f.font.textAlign
      dF.gradient.colors = [f.gradient.colors[0][colorNum]]
      dF.gradient.direction = f.gradient.direction
      dF.gradient.offset.x = f.gradient.offset.x
      dF.gradient.offset.y = f.gradient.offset.y
      dF.gradient.stops = f.gradient.stops
      dF.gradient.visible = f.gradient.visible
      dF.round.x = f.round.x
      dF.round.y = f.round.y
      dF.shadow.blur = f.shadow.blur
      dF.shadow.color = f.shadow.color
      dF.shadow.height = f.shadow.height
      dF.shadow.visible = f.shadow.visible
      dF.shadow.width = f.shadow.width
      dF.stroke.fill = f.stroke.fill.slice(0)
      dF.stroke.cap = f.stroke.cap
      dF.stroke.dash = f.stroke.dash
      dF.stroke.join = f.stroke.join
      dF.stroke.size = f.stroke.size
      dF.transparency = f.transparency
      donut.fill = function (i) {
        return dF.gradient.visible ? dF.gradient.colors : dF.fill
      }
    }
    this.recalcWidth = function () {
      for (var i = 0; i < this.donutArray.length; i++) {
        var donutCenterSize = 40
        this.donutArray[i].donut = donutCenterSize + ((100 - donutCenterSize) * i) / this.data.values.length
        this.donutArray[i].maxRadius = donutCenterSize + ((100 - donutCenterSize) * (i + 1)) / this.data.values.length
        this.donutArray[i].angleWidth = Math.abs((this.maxDrawWidth * this.data.values[this.data.values.length - 1 - i]) / this.maxValue())
      }
    }

    this.minValue = function () {
      var tmp = this.data.values[0]
      for (var i = 0; i < this.data.values.length; i++) {
        if (tmp > this.data.values[i]) tmp = this.data.values[i]
      }
      return tmp
    }
    this.add = function (value, label) {
      var donutTmp = createDonut(value, label, 0, 0, 0)
      this.donutArray.push(donutTmp)
      this.data.values.push(value)
      this.data.labels.push(label)
      if (this.chart != null) this.linkDonutsToChart()
    }
    this.draw = function () {
      for (var i = 0; i < this.donutArray.length; i++) {
        var c = this.donutArray[i].chart.ctx
        copyFormat(this.donutArray[i], this, i)
        c.fillStyle = this.donutArray[i].getFillStyle(this.donutArray[i].chart.chartRect, this.donutArray[i].format.fill)
        this.recalcWidth()
        this.donutArray[i].draw()
      }
    }
    this.linkDonutsToChart = function () {
      for (var i = 0; i < this.donutArray.length; i++) {
        this.donutArray[i].setChart(this.donutArray[i], this.chart)
      }
    }
  }
  Tee.ActivityGauge.prototype = new Tee.Donut()

  /**
   * @constructor
   * @augments Tee.Series
   * @class Draws series data as Gantt horizontal bars with start and end datetime values.
   * @property {Number} [height=70] Percent of gantt bar height. From 0 to 100.
   */
  Tee.Gantt = function (o, o2) {
    Tee.Series.call(this, o, o2)

    this.yMandatory = false

    this.dateFormat = 'mediumDate'

    this.hover.enabled = true
    this.hover.round.x = this.hover.round.y = 8

    this.nextTasks = []
    this.nextTasksStrokeStyle = 'Black'
    this.nextTasksPosition = 'back' //back, front
    this.colorEach = 'yes'

    this.data.start = this.data.values
    this.data.x = []
    this.data.end = []

    this.height = 70
    this.margin = new Point(6, 6)
    this.continuous = false
    var f = this.format
    f.shadow.visible = true
    f.round.x = f.round.y = 8
    f.stroke.fill = 'black'
    f.gradient.visible = true

    var r = new Rectangle(),
      _h

    this.addNextTask = function (point1, point2) {
      this.nextTasks.push([point1, point2])
    }

    this.addRandom = function (count) {
      if (!count) count = 5

      var d = this.data

      d.x.length = count
      d.start.length = count
      d.end.length = count

      if (count > 0) {
        var year = 2012,
          month,
          day

        for (var t = 0; t < count; t++) {
          d.x[t] = t

          month = trunc(Math.random() * 12)
          day = trunc(Math.random() * 10)
          d.start[t] = new Date(year, month, day)
          if (month < 5) month = 5 + trunc(Math.random() * 7)
          d.end[t] = new Date(year, month, day + Math.random() * 10)
        }
      }
    }

    this.bounds = function (index, r) {
      if (this.isNull(index)) return false
      else {
        this.calc(index, r)
        r.y -= _h * 0.5
        r.width = this.data.end ? this.mandatoryAxis.calcSize(this.data.end[index] - this.data.start[index]) : 0
        r.height = _h

        return true
      }
    }

    this.add = function (pos, label, start, end) {
      var d = this.data
      d.labels.push(label)
      d.x.push(pos)
      d.start.push(start)
      d.end.push(end)
    }

    this.clicked = function (p) {
      var len = this.data.values.length,
        t

      for (t = 0; t < len; t++) if (this.bounds(t, r) && r.contains(p)) return t

      return -1
    }

    this.draw = function () {
      var len = this.data.values.length,
        t,
        ff,
        hover = this.hover,
        oldFill = hover.fill,
        c = this.chart.ctx,
        punts = []
      if (this.nextTasksPosition == 'back') {
        drawLines(this)
      }
      _h = this.notmandatory.calcSize(this.height * 0.01)

      for (t = 0; t < len; t++)
        if (this.bounds(t, r)) {
          ff = hover.enabled && this.over === t ? hover : f
          ff.fill = this.getFillStyle(r, this.getFill(t, ff))
          ff.rectangle(r)
        }

      hover.fill = oldFill
      if (this.nextTasksPosition == 'front') {
        drawLines(this)
      }
      function drawLines(gantt) {
        for (var i = 0; i < gantt.nextTasks.length; i++) {
          c.beginPath()
          c.strokeStyle = gantt.nextTasksStrokeStyle
          c.lineWidth = 2
          c.fillStyle = '000000'
          punts.push(Math.round(gantt.chart.axes.bottom.calc(gantt.data.end[gantt.nextTasks[i][0]])))
          punts.push(Math.round(gantt.chart.axes.left.calc(gantt.data.x[gantt.nextTasks[i][0]])))
          punts.push(Math.round(gantt.chart.axes.bottom.calc(gantt.data.start[gantt.nextTasks[i][1]])))
          punts.push(Math.round(gantt.chart.axes.left.calc(gantt.data.x[gantt.nextTasks[i][1]])))

          c.moveTo(punts[0], punts[1])
          c.lineTo(punts[0] - (punts[0] - punts[2]) / 2, punts[1])
          c.lineTo(punts[0] - (punts[0] - punts[2]) / 2, punts[3])
          c.lineTo(punts[2], punts[3])

          c.stroke()

          punts = []
        }
      }
    }

    this.horizMargins = function (p) {
      p.x = this.margin.x
      p.y = this.margin.y
    }

    this.minYValue = function () {
      return this.parent.minXValue.call(this) - 0.5
    }

    this.maxYValue = function () {
      return this.parent.maxXValue.call(this) + 0.5
    }

    this.minXValue = function () {
      return ArrayMin(this.data.start)
    }

    this.maxXValue = function () {
      return ArrayMax(this.data.end)
    }
  }

  Tee.Gantt.prototype = new Tee.Series()
  Tee.Gantt.prototype.parent = Tee.Series.prototype

  /**
   * @constructor
   * @augments Tee.PointXY
   * @class Draws data as points, each one with a different size or radius
   * @property {Object} data Contains each bubble x, value and radius.
   * @property {Number[]} data.radius Defines each bubble radius value.
   */
  Tee.Bubble = function (o, o2) {
    Tee.PointXY.call(this, o, o2)

    var p = this.pointer
    p.colorEach = true
    p.style = 'sphere'
    p.format.gradient.visible = true
    p.format.gradient.direction = 'radial'

    /**
     * When true, horizontal and vertical edge margins are calculated.
     */
    this.inflate = true

    this.data.radius = []

    this.addRandom = function (count) {
      var d = this.data

      if (!count) count = 5

      d.values.length = count

      d.x = null
      d.radius = []
      d.radius.length = count

      if (count > 0) {
        for (var t = 0; t < count; t++) {
          d.values[t] = Math.random() * 1000
          d.radius[t] = 50 + Math.random() * 150
        }
      }
    }
  }

  Tee.Bubble.prototype.initZ = function () {
    this.parent.prototype.initZ.call(this)
    this.format.marks.z = this.format.z - 1
  }

  Tee.Bubble.prototype = new Tee.PointXY()

  Tee.Bubble.prototype.getSize = function (index) {
    var s = this.data.radius ? this._vertAxis.calcSize(this.data.radius[index]) : 0
    this.pointer.width = s
    this.pointer.height = s
  }

  Tee.Bubble.prototype.horizMargins = function (p) {
    this.calcWidth = function (index) {
      this.getSize(index)
      var res = 1 + this.pointer.width * 0.5,
        s = this.pointer.format.stroke
      if (s.fill !== '') res += s.size
      return res
    }

    if (this.pointer.visible && this.inflate) {
      p.x = this.calcWidth(0)
      p.y = this.calcWidth(this.count() - 1)
    }
  }

  Tee.Bubble.prototype.vertMargins = function (p) {
    this.calcHeight = function (index) {
      this.getSize(index)
      var res = 1 + this.pointer.height * 0.5,
        s = this.pointer.format.stroke
      if (s.fill !== '') res += s.size
      return res
    }

    if (this.pointer.visible && this.inflate) {
      var low,
        high,
        lowIndex = 0,
        highIndex = 0,
        l = this.count(),
        pos = { x: 0, y: 0 }

      if (l > 0) {
        this.calc(0, pos)
        low = high = pos.y

        for (var t = 1; t < l; t++) {
          this.calc(t, pos)

          if (pos.y < low) lowIndex = t
          else if (pos.y > high) highIndex = t
        }

        p.x = this.calcHeight(highIndex)
        p.y = this.calcHeight(lowIndex)
      }
    }
  }

  /**
   * @constructor
   * @augments Tee.Bar
   * @class Draws financial Volume data as thin Bar lines.
   */
  Tee.Volume = function (o, o2) {
    Tee.Bar.call(this, o, o2)

    this.barStyle = 'line'
    this.marks.visible = false
    this.colorEach = false
    var f = this.format
    f.shadow.visible = false
    f.gradient.visible = false
    f.stroke.fill = ''
  }
  Tee.Volume.prototype = new Tee.Bar()

  /**
   * @constructor
   * @augments Tee.PointXY
   * @class Draws financial OHLC data as Candle or CandleBar points.
   * @property {String} style Defines candle style ("candle", "bar", "openclose").
   */
  Tee.Candle = function (o, o2) {
    Tee.PointXY.call(this, o, o2)

    var f = this.format
    f.z = 0.5
    f.depth = 0.1

    this.pointer.width = 7
    this.pointer.format.stroke.visible = false

    var hi = (this.higher = this.pointer.format)
    hi.fill = 'green'

    var lo = (this.lower = new Tee.Format(this.chart))
    lo.fill = 'red'
    lo.stroke.visible = false

    this.style = 'candle'

    /*
     * @private
     */
    this.setChart = function (series, chart) {
      var tmp = Tee.PointXY.prototype.setChart
      tmp(series, chart)
      lo.setChart(chart)
    }

    this.draw = function () {
      var d = this.data,
        len = d.values.length,
        t,
        p = new Point(),
        po = this.pointer,
        w = po.width * 0.5,
        o,
        h,
        l,
        m = this.mandatoryAxis,
        y,
        he,
        c = this.chart.ctx,
        col,
        x,
        r

      c.z = f.z + f.depth * 0.5

      for (t = 0; t < len; t++)
        if (!this.isNull(t)) {
          this.calc(t, p)
          x = p.x

          o = m.calc(d.open[t])
          h = m.calc(d.high[t])
          l = m.calc(d.low[t])

          if (p.y > o) {
            y = o
            he = p.y - o
            col = lo
          } else {
            y = p.y
            he = o - y
            col = hi
          }

          if (this.style == 'bar') {
            c.beginPath()

            c.moveTo(x, h)
            c.lineTo(x, l)
            c.moveTo(x - w, o)
            c.lineTo(x, o)
            c.moveTo(x, p.y)
            c.lineTo(x + w, p.y)

            col.stroke.prepare(col.fill)

            c.stroke()
          } else {
            col.depth = w / 100 // totalDepth*0.5 !!
            col.z = f.z + f.depth * 0.5 - col.depth * 0.5

            r = { x: x - w, y: y, width: po.width, height: he }

            if (this.pointer.style === 'cylinder') col.cylinder(r, 1, true)
            else col.cube(r)

            col.draw(c, null, r)

            if (this.hover.enabled && this.over == t) this.hover.rectangle(x - w, y, po.width, he)
          }

          if (this.style != 'openclose')
            if (h < y || l > y + he) {
              c.z = f.z + f.depth * 0.5

              c.beginPath()

              c.moveTo(x, y)
              c.lineTo(x, h)

              c.moveTo(x, y + he)
              c.lineTo(x, l)

              if (this.hover.enabled && this.over == t) this.hover.stroke.prepare(col.fill)
              else col.stroke.prepare(col.fill)

              c.stroke()
            }
        }
    }

    this.minYValue = function () {
      return this.data.low.length > 0 ? ArrayMin(this.data.low) : 0
    }

    this.maxYValue = function () {
      return this.data.high.length > 0 ? ArrayMax(this.data.high) : 0
    }

    this.addRandom = function (count) {
      var d = this.data
      if (!count) count = 10
      d.values.length = count
      d.close = d.values
      if (d.open) d.open.length = count
      else d.open = new Array(count)
      if (d.high) d.high.length = count
      else d.high = new Array(count)
      if (d.low) d.low.length = count
      else d.low = new Array(count)

      if (count > 0) {
        var tmp = 25 + Math.random() * 100,
          o

        for (var t = 0; t < count; t++) {
          o = d.open[t] = tmp
          tmp = d.close[t] = tmp + Math.random() * 25 - 12.5
          d.high[t] = Math.max(o, tmp) + Math.random() * 15
          d.low[t] = Math.min(o, tmp) - Math.random() * 15
        }
      }
    }
  }

  Tee.Candle.prototype = new Tee.PointXY()

  Tee.Candle.prototype.clicked = function (p) {
    var w = this.pointer.width,
      m = this.mandatoryAxis,
      n = this.notmandatory,
      d = this.data,
      len = d.values.length,
      r = new Rectangle(),
      t,
      o,
      c

    r.width = w

    for (t = 0; t < len; t++)
      if (!this.isNull(t)) {
        r.x = n.calc(t) - w * 0.5
        ;(o = m.calc(d.open[t])), (c = m.calc(d.close[t]))
        r.y = o > c ? c : o
        r.height = Math.abs(o - c)

        if (r.contains(p)) return t
      }

    return -1
  }

  Tee.Candle.prototype.vertMargins = function () {}

  /**
   * @constructor
   * @augments Tee.CustomSeries
   * @class Draws values as Polar / Radar charts.
   * @property {Number} [rotation = 0] Rotates polar points, from 0 to 360 degree.
   * @property {Boolean} [clockwise = true] Direction of Values.
   */
  Tee.Polar = function (o, o2) {
    Tee.CustomSeries.call(this, o, o2)

    this.pointer.visible = true
    this.rotation = 0 // degress from 0 to 360

    this._paintAxes = false
    this._paintWalls = false
    this.continuous = false
    this.useOrigin = false
    this.origin = 0

    this.clockwise = true

    var p = { x: 0, y: 0 },
      pp,
      f = this.format,
      center = { x: 0, y: 0 },
      radius,
      pi180 = Math.PI / 180

    f.stroke.fill = 'black'
    f.z = 0.5

    this.calc = function (index, p) {
      var d = this.data,
        v = d.values[index],
        mand = this.mandatoryAxis

      var x = d.x ? d.x[index] : (360 * index) / d.values.length,
        dif = mand.inverted ? mand.maximum - v : v - mand.minimum,
        angle = this.clockwise ? pi180 * (this.rotation + x) : -(pi180 * (this.rotation + x)),
        rad = (dif * radius) / (mand.maximum - mand.minimum)

      p.x = center.x + Math.cos(angle) * rad
      p.y = center.y + Math.sin(angle) * rad
    }

    function tryDrawAxis(axis, px, py) {
      if (axis.visible) {
        var old = axis.axisPos
        axis.axisPos = px
        axis.startPos = py - radius
        axis.endPos = py + radius

        var oldz = axis.z
        axis.z = 1 - axis.chart.walls.back.size * 0.5 - 0.1

        axis.drawAxis()

        axis.axisPos = old
        axis.z = oldz
      }
    }

    function calcCenter(r, axis) {
      var rw = r.width,
        rh = r.height
      center.x = r.x + 0.5 * rw
      center.y = r.y + 0.5 * rh
      radius = Math.min(rw, rh) * 0.5

      if (axis.visible && axis.labels.visible) {
        var textH = axis.labels.format.textHeight('W')
        radius -= textH
      }
    }

    this.beforeDraw = function () {
      var oldz

      calcCenter(this.chart.chartRect, this.notmandatory)

      // Background:

      var walls = this.chart.walls

      if (walls.visible) {
        var wall = walls.back

        if (wall.visible) {
          var wallFormat = wall.format

          oldz = wallFormat.z
          wallFormat.z = 1
          wallFormat.ellipse(center.x, center.y, 2 * radius, 2 * radius)
          wallFormat.z = oldz
        }
      }

      if (this.chart.axes.visible) {
        var nomand = this.notmandatory,
          nomandgrid = nomand.grid.format.stroke,
          mand = this.mandatoryAxis,
          vmin = 0,
          ctx = this.chart.ctx,
          angle,
          labelincrem = 10,
          nomandrotation = nomand.rotation || 0

        // Axis Labels

        if (nomand.visible && nomand.labels.visible) {
          var rText = { x: 0, y: 0, width: 0, height: 0 },
            labelsF = nomand.labels.format,
            textH = labelsF.textHeight('W'),
            labelRadius = radius + textH * 0.8

          labelincrem = Math.max(10, 90 / trunc(radius / textH))

          oldz = labelsF.z
          labelsF.z = 0.6

          vmin = 0
          while (vmin < 360) {
            angle = this.clockwise ? pi180 * (vmin + nomandrotation) : -(pi180 * (vmin + nomandrotation))

            rText.x = center.x + Math.cos(angle) * labelRadius
            rText.y = center.y + Math.sin(angle) * labelRadius - textH * 0.5

            labelsF.drawText(rText, '' + vmin)

            vmin += labelincrem
          }

          labelsF.z = oldz
        }

        // line grids

        if (nomand.visible && nomand.grid.visible) {
          var gridincrem = nomand.increment || 10

          ctx.z = 1 - walls.back.size * 0.5 - 0.1
          ctx.beginPath()

          vmin = 0

          while (vmin < 360) {
            angle = pi180 * (vmin + nomandrotation)

            ctx.moveTo(center.x, center.y)
            ctx.lineTo(center.x + Math.cos(angle) * radius, center.y + Math.sin(angle) * radius)

            vmin += gridincrem
          }

          nomandgrid.prepare(nomandgrid.fill, ctx)
          ctx.stroke()
        }

        // circle grids

        if (mand.visible && mand.grid.visible) {
          vmin = mand.roundMin()

          var rad,
            mandgrid = mand.grid.format,
            gridstep = (2 * radius) / (mand.maximum - mand.minimum)

          oldz = mandgrid.z

          mandgrid.z = 1 - walls.back.size * 0.5 - 0.1
          ctx.z = mandgrid.z

          while (vmin < mand.maximum) {
            rad = (vmin - mand.minimum) * gridstep
            mandgrid.ellipse(center.x, center.y, rad, rad)
            vmin += mand.increm
          }

          mandgrid.z = oldz
        }

        tryDrawAxis(mand, center.x, center.y)
        tryDrawAxis(nomand, center.y, center.x)
      }
    }

    this.draw = function () {
      calcCenter(this.chart.chartRect, this.notmandatory)

      var len = this.data.values.length,
        t

      // Draw Points

      pp = []

      for (t = 0; t < len; t++)
        if (!this.isNull(t)) {
          this.calc(t, p)
          pp.push({ x: p.x, y: p.y })
        }

      len = pp.length

      if (len > 0) {
        if (this.style == 'bar') {
          var ctx = this.chart.ctx
          ctx.beginPath()

          for (t = 0; t < len; t++) {
            ctx.moveTo(center.x, center.y)
            ctx.lineTo(pp[t].x, pp[t].y)
          }

          this.format.stroke.prepare(this.format.fill, ctx)
          ctx.stroke()
        } else f.polygon(pp)

        if (this.pointer.visible) this.drawPointers()
      }
    }

    this.minYValue = function () {
      var v = Tee.Series.prototype.minYValue.call(this)
      return this.useOrigin ? Math.min(v, this.origin) : v
    }

    this.maxYValue = function () {
      var v = this.stackMaxValue()
      return this.useOrigin ? Math.max(v, this.origin) : v
    }
  }

  Tee.Polar.prototype = new Tee.CustomSeries()

  // String.trim:
  if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, '')
    }
  }

  /**
   * @constructor
   * @augments Tee.Series
   * @class Calculates each point color using point values and the palette colors array.
   */
  Tee.PaletteSeries = function (o, o2) {
    Tee.Series.call(this, o, o2)

    var palette = this.palette
    palette.colors = Tee.RainbowPalette()

    var rgb, numcolors

    this._min = 0
    this._range = 0

    this.prepareColors = function () {
      var p = palette.colors,
        color

      numcolors = p.length
      rgb = new Array(numcolors)

      for (var c = 0; c < numcolors; c++) {
        color = p[c].trim()

        if (color.length == 7)
          // #RRGGBB
          rgb[c] = {
            r: parseInt(color.substr(1, 2), 16),
            g: parseInt(color.substr(3, 2), 16),
            b: parseInt(color.substr(5, 2), 16),
            a: 0
          }
        else if (color.substr(0, 4) == 'rgb(') {
          var tmp = color.slice(4, color.length - 1).split(',')
          rgb[c] = { r: tmp[0], g: tmp[1], b: tmp[2], a: tmp[3] || 0 }
        }
      }
    }

    this.getColor = function (value) {
      var colorIndex = ((numcolors - 1) * ((value - this._min) / this._range)) | 0
      return rgb[palette.inverted ? numcolors - 1 - colorIndex : colorIndex]
    }

    /**
     * @returns {Number} Returns the number of items to show at legend.
     */
    this.legendCount = function () {
      return this.palette.colors ? this.palette.colors.length : 0
    }
  }

  Tee.PaletteSeries.prototype = new Tee.Series()

  /**
   * @returns {String} Returns the color of index'th legend symbol.
   */
  Tee.PaletteSeries.prototype.legendColor = function (index) {
    var p = this.palette,
      c = p.colors,
      i = p.inverted

    if (this.chart.legend.inverted) i = !i

    if (p.grayScale) {
      var tmp = ((index * 255) / c.length) | 0
      if (i) tmp = 255 - tmp
      return 'rgb(' + tmp + ',' + tmp + ',' + tmp + ')'
    } else return c ? c[i ? index : this.legendCount() - index - 1] : this.format.fill
  }

  /**
   * @returns {String} Returns the palette value of index'th legend symbol.
   */
  Tee.PaletteSeries.prototype.legendText = function (index /*,style,title,asArray*/) {
    index = -1 + this.legendCount() - index
    return (this._min + (index * this._range) / (this.palette.colors.length - 1)).toFixed(this.decimals)
  }

  // This script made by:
  // Michael Leigeber
  // http://www.scriptiny.com/
  // http://www.scriptiny.com/author/michael/

  Tee.DOMTip = (function () {
    var top = 3,
      left = 3,
      arrowtt,
      speed = 10,
      timer = 10,
      arrowWidth = 8,
      arrowStyleBefore,
      followCursor = false,
      arrowStyleAfter,
      arrowBorderWidth,
      tip,
      previousIndex,
      previousNearestSeries,
      domStylesBorderColor,
      domStylesBackgroundColor,
      arrowBorderRadius,
      endalpha = 97,
      alpha = 0,
      tt,
      ttstyle,
      h,
      animation,
      target,
      ie = typeof document !== 'undefined' && document.all ? true : false,
      width

    return {
      show: function (v, w, dest, domStyle, toolTip) {
        if (toolTip) {
          tip = toolTip
          if (!toolTip.findPoint) {
            arrowWidth = 0
            followCursor = true
          }
        }
        if (!tt) {
          arrowStyleAfter = document.createElement('style')
          arrowStyleBefore = document.createElement('style')

          domStylesBorderColor = ''
          tt = document.createElement('div')
          arrowtt = document.createElement('div')

          tt.setAttribute('id', 'teetip1')
          arrowtt.setAttribute('id', 'teetiparrow1')
          tt.className = 'teetip'
          arrowtt.className = 'teetiparrow'

          tt.setAttribute('style', domStyle)
          domStylesBorderColor = tt.style.getPropertyValue('border-color')
          domStylesBackgroundColor = tt.style.getPropertyValue('background-color')

          arrowBorderWidth = tt.style.getPropertyValue('border-width')
          arrowBorderRadius = tt.style.getPropertyValue('border-radius')

          arrowBorderRadius = arrowBorderRadius.substring(0, arrowBorderRadius.length - 2)

          if (arrowBorderWidth.length == 0) arrowBorderWidth = 0
          else {
            arrowBorderWidth = arrowBorderWidth.substring(0, arrowBorderWidth.length - 2)
            arrowBorderWidth = arrowBorderWidth * 2
          }

          arrowStyleBefore.innerHTML =
            '.teetiparrow{width:0;height:0;border: ' +
            arrowWidth +
            "px solid;position: absolute;content: '';border-color: " +
            domStylesBorderColor +
            ' transparent transparent transparent;bottom: -' +
            arrowWidth * 2 +
            'px;left: 25px;}'
          arrowStyleAfter.innerHTML =
            ".teetiparrow:after{content: ' ';position: absolute;width: 0;height: 0;left: -" +
            (arrowWidth - arrowBorderWidth / 2) +
            'px;bottom: ' +
            (arrowBorderWidth - (arrowWidth - 1)) +
            'px; border: ' +
            (arrowWidth - arrowBorderWidth / 2) +
            'px solid;border-color: ' +
            domStylesBackgroundColor +
            ' transparent transparent transparent;}'
          document.head.appendChild(arrowStyleBefore)
          document.head.appendChild(arrowStyleAfter)

          document.body.appendChild(tt)
          tt.appendChild(arrowtt)
          ttstyle = tt.style
          ttstyle.opacity = 0

          // IE only:
          if (ie) ttstyle.filter = 'alpha(opacity=0)'
        }

        target = dest

        ttstyle.display = 'block'
        ttstyle.position = 'absolute'
        tt.innerHTML = arrowtt.outerHTML + v
        ttstyle.width = w ? w + 'px' : 'auto'

        if (!w && ie) ttstyle.width = tt.offsetWidth

        if (tt.offsetWidth > 300) ttstyle.width = 300 + 'px'
        width = tt.offsetWidth
        h = parseInt(tt.offsetHeight, 10) + top
        if (tt.timer) clearInterval(tt.timer)
        tt.timer = setInterval(function () {
          Tee.DOMTip.fade(1)
        }, timer)

        document.onmousemove = this.pos
      },

      pos: function (e) {
        if (tip) {
          if (!tip.findPoint) {
            arrowWidth = 0
            followCursor = true
          } else {
            arrowWidth = 8
            followCursor = false
          }

          if (target) {
            var chart = target.chart
            var chartRect = chart.chartRect
            var horizontal = chart.axes.bottom.firstSeries ? !chart.axes.bottom.firstSeries.yMandatory : false
          }
          if (chart) {
            chart.draw()
            if (chart.series.items[0] instanceof Tee.Pie || followCursor || !target) {
              var d = document.documentElement,
                u = ie ? e.clientY + d.scrollTop : e.pageY,
                l = ie ? e.clientX + d.scrollLeft : e.pageX - width / 2 - 10 - arrowWidth
              arrowStyleBefore.innerHTML =
                '.teetiparrow{width:0;height:0;border: ' +
                arrowWidth +
                "px solid;position: absolute;content: '';border-color: " +
                domStylesBorderColor +
                ' ' +
                domStylesBorderColor +
                ' transparent transparent;bottom: -' +
                arrowWidth * 2 +
                'px;left: ' +
                (tt.getBoundingClientRect().width - arrowWidth * 2 - arrowBorderWidth / 2) +
                'px;}'
              arrowStyleAfter.innerHTML =
                ".teetiparrow:after{content: ' ';position: absolute;width: 0;height: 0;left: -" +
                (arrowWidth - arrowBorderWidth / 2) +
                'px;bottom: ' +
                (arrowBorderWidth - (arrowWidth - 1)) +
                'px; border: ' +
                (arrowWidth - arrowBorderWidth / 2) +
                'px solid;border-color: ' +
                domStylesBackgroundColor +
                ' ' +
                domStylesBackgroundColor +
                ' transparent transparent;}'
            } else {
              var index
              if (!horizontal) index = Math.round(chart.axes.bottom.fromSizeCalcIndex(e.clientX - chart.canvas.getBoundingClientRect().left - chart.axes.bottom.startPos))
              else index = Math.round(chart.axes.left.fromPos(e.layerY))
              var point = new Point()
              var distance, minDistance
              if (e.target == chart.canvas) {
                for (var n = 0; n < chart.series.items.length; n++) {
                  if (!horizontal) distance = Math.abs(chart.series.items[n].data.values[index] - chart.axes.left.fromPos(e.layerY))
                  else distance = Math.abs(chart.series.items[n].data.values[index] - chart.axes.bottom.fromPos(e.layerX))
                  if (n == 0) {
                    minDistance = distance
                    chart.series.items[n].calc(index, point)
                  } else if (distance < minDistance) {
                    chart.series.items[n].calc(index, point)
                    minDistance = distance
                  }
                }
              }
              var d = document.documentElement
              var marginTop = tt.style.marginTop.substring(0, tt.style.marginTop.length - 2)
              var marginLeft = tt.style.marginLeft.substring(0, tt.style.marginLeft.length - 2)
              var u = Math.round(
                point.y + window.scrollY + chart.canvas.getBoundingClientRect().top - tt.getBoundingClientRect().height - arrowWidth - marginTop + arrowBorderWidth / 2
              )
              var l = Math.round(point.x + window.scrollX + chart.canvas.getBoundingClientRect().left - tt.getBoundingClientRect().width / 2 - marginLeft - arrowBorderWidth / 2)

              if (l + width / 2 - chartRect.x > chartRect.width) {
                u = Math.round(
                  point.y + window.scrollY + chart.canvas.getBoundingClientRect().top - tt.getBoundingClientRect().height - arrowWidth * 2 - marginTop + arrowBorderWidth / 2
                )
                l = Math.round(point.x + window.scrollX + chart.canvas.getBoundingClientRect().left - tt.getBoundingClientRect().width - marginLeft)
                ttstyle.borderRadius = arrowBorderRadius + 'px ' + arrowBorderRadius + 'px 0px ' + arrowBorderRadius + 'px'
                arrowStyleBefore.innerHTML =
                  '.teetiparrow{width:0;height:0;border: ' +
                  arrowWidth +
                  "px solid;position: absolute;content: '';border-color: " +
                  domStylesBorderColor +
                  ' ' +
                  domStylesBorderColor +
                  ' transparent transparent;bottom: -' +
                  arrowWidth * 2 +
                  'px;left: ' +
                  (tt.getBoundingClientRect().width - arrowWidth * 2 - arrowBorderWidth / 2) +
                  'px;}'
                arrowStyleAfter.innerHTML =
                  ".teetiparrow:after{content: ' ';position: absolute;width: 0;height: 0;left: -" +
                  (arrowWidth - arrowBorderWidth / 2) +
                  'px;bottom: ' +
                  (arrowBorderWidth - (arrowWidth - 1)) +
                  'px; border: ' +
                  (arrowWidth - arrowBorderWidth / 2) +
                  'px solid;border-color: ' +
                  domStylesBackgroundColor +
                  ' ' +
                  domStylesBackgroundColor +
                  ' transparent transparent;}'
              } else if (l - width / 2 < chartRect.x) {
                l = Math.round(point.x + window.scrollX + chart.canvas.getBoundingClientRect().left - marginLeft)
                u = Math.round(
                  point.y + window.scrollY + chart.canvas.getBoundingClientRect().top - tt.getBoundingClientRect().height - arrowWidth * 2 - marginTop + arrowBorderWidth / 2
                )
                ttstyle.borderRadius = arrowBorderRadius + 'px ' + arrowBorderRadius + 'px ' + arrowBorderRadius + 'px 0px'
                arrowStyleBefore.innerHTML =
                  '.teetiparrow{width:0;height:0;border: ' +
                  arrowWidth +
                  "px solid;position: absolute;content: '';border-color: " +
                  domStylesBorderColor +
                  ' transparent transparent ' +
                  domStylesBorderColor +
                  ';bottom: -' +
                  arrowWidth * 2 +
                  'px;left: ' +
                  (0 - arrowBorderWidth / 2) +
                  'px;}'
                arrowStyleAfter.innerHTML =
                  ".teetiparrow:after{content: ' ';position: absolute;width: 0;height: 0;left: -" +
                  (arrowWidth - arrowBorderWidth / 2) +
                  'px;bottom: ' +
                  (arrowBorderWidth - (arrowWidth - 1)) +
                  'px; border: ' +
                  (arrowWidth - arrowBorderWidth / 2) +
                  'px solid;border-color: ' +
                  domStylesBackgroundColor +
                  ' transparent transparent ' +
                  domStylesBackgroundColor +
                  ';}'
              } else if (l) {
                ttstyle.borderRadius = arrowBorderRadius + 'px ' + arrowBorderRadius + 'px ' + arrowBorderRadius + 'px ' + arrowBorderRadius + 'px'
                arrowStyleBefore.innerHTML =
                  '.teetiparrow{width:0;height:0;border: ' +
                  arrowWidth +
                  "px solid;position: absolute;content: '';border-color: " +
                  domStylesBorderColor +
                  ' transparent transparent transparent;bottom: -' +
                  arrowWidth * 2 +
                  'px;left: ' +
                  (tt.getBoundingClientRect().width / 2 - arrowWidth) +
                  'px;}'
                arrowStyleAfter.innerHTML =
                  ".teetiparrow:after{content: ' ';position: absolute;width: 0;height: 0;left: -" +
                  (arrowWidth - arrowBorderWidth / 2) +
                  'px;bottom: ' +
                  (arrowBorderWidth - (arrowWidth - 1)) +
                  'px; border: ' +
                  (arrowWidth - arrowBorderWidth / 2) +
                  'px solid;border-color: ' +
                  domStylesBackgroundColor +
                  ' transparent transparent transparent;}'
              }
            }
            if (tip && tip.pointer.visible) {
              drawPoint()
              u -= tip.pointer.secondCircleRadius > tip.pointer.firstCircleRadius ? tip.pointer.secondCircleRadius : tip.pointer.firstCircleRadius
            }
          } else {
            var d = document.documentElement,
              u = ie ? e.clientY + d.scrollTop : e.pageY,
              l = ie ? e.clientX + d.scrollLeft : e.pageX - width / 2 - 10 - arrowWidth
          }
        } else {
          arrowWidth = 0
          followCursor = true
          var d = document.documentElement,
            u = ie ? e.clientY + d.scrollTop : e.pageY,
            l = ie ? e.clientX + d.scrollLeft : e.pageX - width / 2 - 10 - arrowWidth
          arrowStyleBefore.innerHTML =
            '.teetiparrow{width:0;height:0;border: ' +
            arrowWidth +
            "px solid;position: absolute;content: '';border-color: " +
            domStylesBorderColor +
            ' ' +
            domStylesBorderColor +
            ' transparent transparent;bottom: -' +
            arrowWidth * 2 +
            'px;left: ' +
            (tt.getBoundingClientRect().width - arrowWidth * 2 - arrowBorderWidth / 2) +
            'px;}'
          arrowStyleAfter.innerHTML =
            ".teetiparrow:after{content: ' ';position: absolute;width: 0;height: 0;left: -" +
            (arrowWidth - arrowBorderWidth / 2) +
            'px;bottom: ' +
            (arrowBorderWidth - (arrowWidth - 1)) +
            'px; border: ' +
            (arrowWidth - arrowBorderWidth / 2) +
            'px solid;border-color: ' +
            domStylesBackgroundColor +
            ' ' +
            domStylesBackgroundColor +
            ' transparent transparent;}'
        }
        if (u - h < 0) u = h
        if (l < 0) l = 0

        if (target) {
          var offsetLeft = target.offsetLeft
          var node = target
          while (node.offsetParent != null) {
            offsetLeft += node.offsetLeft
            node = node.offsetParent
          }

          if (l > offsetLeft + target.clientWidth - tt.offsetWidth - 25) l = offsetLeft + target.clientWidth - tt.offsetWidth - 25
        }

        // Try to hide tooltip when moving mouse outside target bounds:

        /*
      if (target) {
        if ((l>target.clientLeft) && (l<(target.clientLeft+target.clientWidth)) )
        {
        }
        else {
          Tee.DOMTip.hide();
          return;
        }
      }
      */
        if (followCursor) {
          ttstyle.top = u - h + 'px'
          ttstyle.left = l + left + 'px'
        } else {
          ttstyle.top = u /*- h*/ + 'px'
          ttstyle.left = l /*+ left*/ + 'px'
        }

        function animatePointer(point, c) {
          var pointer = tip.pointer
          animation = new Tee.Animation(tip, function (f) {
            if (f < 1) {
              tip.chart.draw()
              drawPointAt(point, pointer.secondCircleRadius * f, pointer.fill, pointer.secondCircleOpacity, c)
              drawPointAt(point, pointer.firstCircleRadius * f, pointer.fill, pointer.firstCircleOpacity, c)
            }
          })
          animation.onstop = function () {
            tip.chart.draw()
            drawPointAt(point, pointer.secondCircleRadius, pointer.fill, pointer.secondCircleOpacity, c)
            drawPointAt(point, pointer.firstCircleRadius, pointer.fill, pointer.firstCircleOpacity, c)
          }
          animation.duration = pointer.animationDuration
          animation.animate()
        }
        function drawPointAt(point, size, color, opacity, c) {
          c.strokeStyle = color
          c.fillStyle = color
          c.globalAlpha = opacity
          c.lineWidth = size
          c.beginPath()
          c.ellipse(point.x, point.y, size / 2, size / 2, 0, 0, 7, false)
          c.stroke()
        }
        function drawPoint() {
          if (e.target.chart) {
            e.target.chart.draw()
            var index
            var point = new Point()
            var distance, minDistance
            var nearestSeries
            var pointer = tip.pointer
            var color = tip.pointer.fill
            if (!horizontal) index = Math.round(chart.axes.bottom.fromSizeCalcIndex(e.clientX - chart.canvas.getBoundingClientRect().left - chart.axes.bottom.startPos))
            else index = Math.round(chart.axes.left.fromPos(e.layerY))
            if (e.target == chart.canvas) {
              for (var n = 0; n < chart.series.items.length; n++) {
                if (!horizontal) distance = Math.abs(chart.series.items[n].data.values[index] - chart.axes.left.fromPos(e.layerY))
                else distance = Math.abs(chart.series.items[n].data.values[index] - chart.axes.bottom.fromPos(e.layerX))
                if (n == 0) {
                  minDistance = distance
                  chart.series.items[n].calc(index, point)
                  nearestSeries = chart.series.items[n]
                } else if (distance < minDistance) {
                  chart.series.items[n].calc(index, point)
                  minDistance = distance
                  nearestSeries = chart.series.items[n]
                }
              }
            }

            var c = e.target.chart.ctx
            if (!previousNearestSeries) {
              previousNearestSeries = nearestSeries
            } else if (index != -1 && previousNearestSeries != nearestSeries) {
              previousNearestSeries = nearestSeries
              if (pointer.animationVisible) animatePointer(point, c) //here will go the animation
            }

            if ((index != -1 && !previousIndex) || index == -1) {
              previousIndex = index
            } else if (index != -1 && previousIndex != index) {
              previousIndex = index
              if (pointer.animationVisible) animatePointer(point, c) //here will go the animation
            }

            drawPointAt(point, pointer.secondCircleRadius, pointer.fill, pointer.secondCircleOpacity, c)
            drawPointAt(point, pointer.firstCircleRadius, pointer.fill, pointer.firstCircleOpacity, c)
          }
        }
      },

      fade: function (d) {
        var a = alpha

        if ((a !== endalpha && d === 1) || (a !== 0 && d === -1)) {
          var i = speed

          if (endalpha - a < speed && d == 1) i = endalpha - a
          else if (alpha < speed && d == -1) i = a

          alpha = a + i * d

          ttstyle.opacity = alpha * 0.01

          // IE only:
          if (ie) ttstyle.filter = 'alpha(opacity=' + alpha + ')'
        } else {
          clearInterval(tt.timer)
          if (d == -1) {
            ttstyle.display = 'none'
            document.onmousemove = null
          }
        }
      },

      hide: function () {
        if (tt) {
          clearInterval(tt.timer)
          tt.timer = setInterval(function () {
            Tee.DOMTip.fade(-1)
          }, timer)
          if (target && target.chart) target.chart.draw()
        }
      }
    }
  })()

  //*********** extras start ******************
  Tee.Chart.prototype.drawReflection = function () {
    var c = this.ctx,
      h = this.bounds.height

    c.scale(1, -1)
    c.translate(0, -h * 2)

    this.ondraw = null
    this.draw()
    c.translate(0, h * 2)
    c.scale(1, -1)

    var mirrorHeight = this.canvas.height - h,
      y = h,
      gradient = c.createLinearGradient(0, y, 0, y + mirrorHeight),
      color = this.reflectionColor

    gradient.addColorStop(0, colorAlpha(color, 0.5))
    gradient.addColorStop(1, colorAlpha(color, 1))
    c.fillStyle = gradient
    c.beginPath()
    c.shadowColor = 'transparent'
    c.rect(0, y, this.bounds.width, mirrorHeight)
    c.fill()

    this.ondraw = this.drawReflection
  }

  function colorAlpha(color, alpha) {
    return 'rgba( ' + color[0] + ', ' + color[1] + ', ' + color[2] + ', ' + alpha + ' )'
  }

  /*
  Copyright 2010 by Robin W. Spencer
  http://scaledinnovation.com/analytics/splines/aboutSplines.html

  Modifications by Steema Software.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You can find a copy of the GNU General Public License
    at http://www.gnu.org/licenses/.
*/

  Tee.drawSpline = function (ctx, pts, t, move, closed) {
    var cp = [],
      n = pts.length,
      i

    function point(x0, y0, x1, y1, x2, y2, t) {
      function square(x) {
        return x * x
      }

      var d = Math.sqrt(square(x1 - x0) + square(y1 - y0)),
        a = (t * d) / (d + Math.sqrt(square(x2 - x1) + square(y2 - y1))),
        b = t - a

      return [x1 + a * (x0 - x2), y1 + a * (y0 - y2), x1 - b * (x0 - x2), y1 - b * (y0 - y2)]
    }

    if (closed) {
      if (move) ctx.moveTo(pts[0], pts[1])

      pts.push(pts[0], pts[1], pts[2], pts[3])
      pts.unshift(pts[n - 1])
      pts.unshift(pts[n - 1])

      for (i = 0; i < n; i += 2) cp = cp.concat(point(pts[i], pts[i + 1], pts[i + 2], pts[i + 3], pts[i + 4], pts[i + 5], t))

      cp = cp.concat(cp[0], cp[1])

      for (i = 2; i < n + 2; i += 2) ctx.bezierCurveTo(cp[2 * i - 2], cp[2 * i - 1], cp[2 * i], cp[2 * i + 1], pts[i + 2], pts[i + 3])
    } else {
      for (i = 0; i < n - 4; i += 2) cp = cp.concat(point(pts[i], pts[i + 1], pts[i + 2], pts[i + 3], pts[i + 4], pts[i + 5], t))

      if (move) ctx.moveTo(pts[0], pts[1])

      ctx.quadraticCurveTo(cp[0], cp[1], pts[2], pts[3])

      for (i = 2; i < n - 5; i += 2) ctx.bezierCurveTo(cp[2 * i - 2], cp[2 * i - 1], cp[2 * i], cp[2 * i + 1], pts[i + 2], pts[i + 3])

      ctx.quadraticCurveTo(cp[2 * n - 10], cp[2 * n - 9], pts[n - 2], pts[n - 1])
    }
  }

  function modCustomAxes(c, featureColor, defaultStrokeColor) {
    for (var i = 0; i < c.axes.items.length; i++) {
      if (i > 3) {
        c.axes.items[i].labels.format.font.setSize(11)
        c.axes.items[i].format.stroke.fill = defaultStrokeColor
        c.axes.items[i].labels.format.font.fill = featureColor
        c.axes.items[i].title.format.font.fill = featureColor
        c.axes.items[i].title.format.font.setSize(20)
        c.axes.items[i].grid.visible = false
        c.axes.items[i].grid.format.stroke.size = 0.6
        c.axes.items[i].grid.format.stroke.fill = 'silver'
      }
    }
  }

  function defaultTheme(c) {
    var featureColor = 'rgba(0,0,0,1)'
    var defaultStrokeColor = 'rgba(39,79,105,0.8)'
    var backBlendColor = 'white'
    var seriesPenColor = 'white'

    c.title.format.font.style = '18px Verdana'
    c.walls.visible = true
    c.panel.format.shadow.visible = false
    c.panel.format.round.x = 8
    c.panel.format.round.y = 8
    c.panel.format.gradient.visible = true
    c.panel.format.gradient.colors = ['rgba(224,224,224,1.0)', 'white']
    c.panel.format.gradient.direction = 'diagonalup'
    c.panel.format.stroke.fill = 'rgba(204,204,204,1.0)'
    c.panel.format.stroke.size = 1

    applyPalette(c, 'opera')

    if (c.series.items.length > 0) {
      for (var i = 0; i < c.series.items.length; i++) {
        c.series.items[i].format.fill = c.palette.get(i)
        if (c.series.items[i].pointer != null) {
          c.series.items[i].pointer.format.fill = c.palette.get(i)
          c.series.items[i].pointer.format.stroke.fill = backBlendColor
        }
      }
    }

    c.axes.left.labels.format.font.setSize(11)
    c.axes.bottom.labels.format.font.setSize(11)
    c.axes.left.format.stroke.fill = defaultStrokeColor
    c.axes.bottom.format.stroke.fill = defaultStrokeColor
    c.axes.left.labels.format.font.fill = featureColor
    c.axes.bottom.labels.format.font.fill = featureColor
    c.axes.left.title.format.font.fill = featureColor
    c.axes.left.title.format.font.setSize(20)
    c.axes.bottom.title.format.font.fill = featureColor
    c.axes.bottom.title.format.font.setSize(20)
    c.axes.left.grid.visible = true
    c.axes.bottom.grid.visible = false

    c.axes.left.grid.format.stroke.size = 0.6
    c.axes.bottom.grid.format.stroke.size = 0.6
    c.axes.left.grid.format.stroke.fill = 'silver'
    c.axes.bottom.grid.format.stroke.fill = 'silver'

    c.axes.left.grid.visible = true
    c.axes.top.grid.visible = true
    c.axes.right.grid.visible = true
    c.axes.bottom.grid.visible = true

    if (c.axes.items.length > 0) {
      modCustomAxes(c, featureColor, defaultStrokeColor)
    }

    //legend
    c.legend.transparent = false
    c.legend.format.fill = 'white'
    c.legend.format.font.setSize(11)
    c.legend.format.font.fill = featureColor
    c.legend.fontColor = false

    //title
    c.title.format.font.fill = featureColor

    c.walls.visible = false
  }

  function twilightTheme(c) {
    var featureColor = 'rgba(224,224,224,0.6)'
    var defaultStrokeColor = 'rgba(39,79,105,0.8)'
    var backBlendColor = 'rgba(82,82,82,1)'
    var seriesPenColor = 'white'

    c.title.format.font.style = '18px Verdana'
    c.walls.visible = true
    c.panel.format.shadow.visible = false
    c.panel.format.round.x = 8
    c.panel.format.round.y = 8
    c.panel.format.gradient.visible = true
    c.panel.format.gradient.colors = ['rgba(99,99,99,1.0)', 'rgba(19,19,19,1.0)']
    c.panel.format.gradient.direction = 'topbottom'
    c.panel.format.stroke.fill = 'rgba(204,204,204,1.0)'
    c.panel.format.stroke.size = 1

    applyPalette(c, 'redRiver')

    if (c.series.items.length > 0) {
      for (var i = 0; i < c.series.items.length; i++) {
        c.series.items[i].format.fill = c.palette.get(i)
        if (c.series.items[i].pointer != null) {
          c.series.items[i].pointer.format.fill = c.palette.get(i)
          c.series.items[i].pointer.format.stroke.fill = backBlendColor
        }
      }
    }

    //axes
    c.axes.left.format.stroke.fill = featureColor
    c.axes.bottom.format.stroke.fill = featureColor
    c.axes.left.labels.format.font.setSize(11)
    c.axes.bottom.labels.format.font.setSize(11)
    c.axes.left.labels.format.font.fill = featureColor
    c.axes.bottom.labels.format.font.fill = featureColor
    c.axes.left.title.format.font.fill = featureColor
    c.axes.left.title.format.font.setSize(20)
    c.axes.bottom.title.format.font.fill = featureColor
    c.axes.bottom.title.format.font.setSize(20)
    c.axes.bottom.grid.visible = false
    c.axes.left.grid.visible = true
    c.axes.left.grid.format.stroke.fill = 'silver'
    c.axes.bottom.grid.format.stroke.fill = 'silver'

    if (c.axes.items.length > 0) {
      modCustomAxes(c, featureColor, defaultStrokeColor)
    }

    //legend
    c.legend.transparent = true
    c.legend.format.font.setSize(14)
    c.legend.format.font.fill = featureColor
    c.legend.format.fill = 'rgba(0,0,0,0.1)'

    //title
    c.title.format.shadow.visible = false
    var baseFontStyle = '18px Arial'
    c.title.format.font.style = baseFontStyle
    c.title.format.font.style = 'bold ' + baseFontStyle
    c.title.format.font.fill = featureColor
    c.title.format.font.shadow.visible = false

    c.walls.visible = false
  }

  function daybreakTheme(c) {
    var darkContrastColor = 'rgba(14,14,54,0.6)'
    var featureColor = 'rgba(224,224,224,0.6)'
    var defaultStrokeColor = 'rgba(39,79,105,0.8)'
    var backBlendColor = 'rgba(82,82,82,1)'
    var seriesPenColor = 'white'

    c.title.format.font.style = '18px Verdana'
    c.walls.visible = true
    c.panel.format.shadow.visible = false
    c.panel.format.round.x = 8
    c.panel.format.round.y = 8
    c.panel.format.gradient.visible = true
    c.panel.format.gradient.colors = ['rgba(201,204,242,1.0)', 'rgba(255,252,255,1.0)', 'rgba(21,21,23,1.0)']
    c.panel.format.gradient.direction = 'topbottom'
    c.panel.format.stroke.fill = 'rgba(204,204,204,1.0)'
    c.panel.format.stroke.size = 1

    applyPalette(c, 'redRiver')

    if (c.series.items.length > 0) {
      for (var i = 0; i < c.series.items.length; i++) {
        c.series.items[i].format.fill = c.palette.get(i)
        if (c.series.items[i].pointer != null) {
          c.series.items[i].pointer.format.fill = c.palette.get(i)
          c.series.items[i].pointer.format.stroke.fill = backBlendColor
        }
      }
    }

    //axes
    for (var i = 0; i < c.axes.items.length; i++) {
      var a = c.axes.items[i]
      a.format.stroke.fill = darkContrastColor
      a.labels.format.font.setSize(11)
      a.labels.format.font.fill = featureColor
      a.title.format.font.setSize(20)
      a.title.format.font.fill = featureColor
      a.grid.visible = i < 3
      a.grid.format.stroke.fill = 'silver'
    }

    //legend
    c.legend.transparent = true
    c.legend.format.font.setSize(14)
    c.legend.format.font.fill = 'silver'

    //title
    c.title.format.shadow.visible = false
    var baseFontStyle = '18px Arial'
    c.title.format.font.style = baseFontStyle
    c.title.format.font.style = 'bold ' + baseFontStyle
    c.title.format.font.fill = darkContrastColor
    c.title.format.font.shadow.visible = false

    c.walls.visible = false
  }

  function minimalTheme(c) {
    //designed with white background in mind
    c.title.transparent = true
    c.walls.visible = false
    c.footer.transparent = true
    c.panel.format.shadow.visible = false
    c.panel.format.stroke.fill = ''
    c.panel.format.round.x = 0
    c.panel.format.round.y = 0
    c.panel.format.gradient.visible = false
    c.panel.format.fill = 'white'

    var featureColor = 'rgba(124,124,144,0.9)'
    var defaultStrokeColor = 'rgba(39,79,105,0.8)'
    var invisibleStrokeColor = 'rgba(0,0,0,0.0)'
    var backBlendColor = 'white'
    var seriesPenColor = 'white'

    applyPalette(c, 'seaWash')

    if (c.series.items.length > 0) {
      for (var i = 0; i < c.series.items.length; i++) {
        c.series.items[i].format.fill = c.palette.get(i)
        if (c.series.items[i].pointer != null && c.series.items[i].pointer.format != null) {
          c.series.items[i].pointer.format.fill = c.palette.get(i)
          c.series.items[i].pointer.format.stroke.fill = backBlendColor
        }
      }
    }

    //axes
    for (var i = 0; i < c.axes.items.length; i++) {
      var a = c.axes.items[i]
      a.format.stroke.fill = defaultStrokeColor
      a.labels.format.font.setSize(14)
      a.labels.format.font.fill = featureColor
      a.title.format.font.setSize(20)
      a.title.format.font.fill = featureColor
    }

    /*c.series.each(function(series) {
    series.notmandatory.grid.visible=false;
  });*/

    for (i = 0; i < c.axes.items.length; i++) {
      if (!c.axes.items[i].horizontal) {
        c.axes.items[i].grid.visible = true
        c.axes.items[i].grid.format.stroke.size = 0.6
        c.axes.items[i].grid.format.stroke.fill = 'silver'
      } else {
        c.axes.items[i].grid.visible = false
        c.axes.items[i].grid.format.stroke.size = 0.6
        c.axes.items[i].grid.format.stroke.fill = 'silver'
      }
    }

    /*if (c.axes.items.length > 0) {
    modCustomAxes(c,featureColor,defaultStrokeColor)
  }*/

    //legend
    c.legend.transparent = true
    c.legend.format.font.setSize(14)
    c.legend.format.font.fill = featureColor

    //title
    c.title.format.shadow.visible = false
    var baseFontStyle = '18px Arial'
    c.title.format.font.style = baseFontStyle
    c.title.format.font.style = 'bold ' + baseFontStyle
    c.title.format.font.fill = featureColor
    c.title.format.font.shadow.visible = false
  }

  function excelTheme(c) {
    minimalTheme(c)

    var featureColor = 'rgba(0,0,0,0.9)'
    var defaultStrokeColor = 'rgba(39,79,105,0.8)'
    var backBlendColor = 'white'
    var seriesPenColor = 'white'

    applyPalette(c, 'excel')

    c.axes.left.grid.format.stroke.fill = featureColor
    c.axes.bottom.grid.format.stroke.fill = featureColor

    if (c.series.items.length > 0) {
      for (var i = 0; i < c.series.items.length; i++) {
        c.series.items[i].format.fill = c.palette.get(i)
        if (c.series.items[i].pointer != null) {
          c.series.items[i].pointer.format.fill = c.palette.get(i)
          c.series.items[i].pointer.format.stroke.fill = backBlendColor
        }
      }
    }
  }

  function darkTheme(c) {
    applyPalette(c, 'onBlack')

    var featureColor = 'rgba(224,224,224,0.6)'
    var defaultStrokeColor = 'rgba(39,79,105,0.8)'
    var backBlendColor = 'rgba(82,82,82,1)'
    var seriesPenColor = 'white'

    c.title.transparent = true
    c.legend.transparent = true
    c.footer.transparent = true

    //panel
    c.panel.format.shadow.visible = false
    c.panel.format.stroke.fill = ''
    c.panel.format.round.x = 0
    c.panel.format.round.y = 0
    c.panel.format.gradient.colors = ['rgba(0,0,0,1)', 'rgba(0,0,0,1)']
    c.panel.format.gradient.visible = true

    if (c.series.items.length > 0) {
      for (var i = 0; i < c.series.items.length; i++) {
        c.series.items[i].format.fill = c.palette.get(i)
        if (c.series.items[i].pointer != null) {
          c.series.items[i].pointer.format.fill = c.palette.get(i)
          c.series.items[i].pointer.format.stroke.fill = backBlendColor
        }
      }
    }

    //axes
    c.axes.left.format.stroke.fill = featureColor //defaultStrokeColor;
    c.axes.bottom.format.stroke.fill = featureColor //defaultStrokeColor;
    c.axes.left.labels.format.font.setSize(14)
    c.axes.bottom.labels.format.font.setSize(14)
    c.axes.left.labels.format.font.fill = featureColor
    c.axes.bottom.labels.format.font.fill = featureColor
    c.axes.left.title.format.font.fill = featureColor
    c.axes.left.title.format.font.setSize(20)
    c.axes.bottom.title.format.font.fill = featureColor
    c.axes.bottom.title.format.font.setSize(20)
    c.axes.bottom.grid.visible = false
    c.axes.left.grid.visible = true
    c.axes.left.grid.format.stroke.fill = 'silver'
    c.axes.bottom.grid.format.stroke.fill = 'silver'

    if (c.axes.items.length > 0) {
      modCustomAxes(c, featureColor, defaultStrokeColor)
    }

    //walls
    c.walls.visible = false

    //legend
    c.legend.transparent = true
    c.legend.format.font.setSize(14)
    c.legend.format.font.fill = featureColor

    //title
    c.title.format.shadow.visible = false
    var baseFontStyle = '18px Arial'
    c.title.format.font.style = baseFontStyle
    c.title.format.font.style = 'bold ' + baseFontStyle
    c.title.format.font.fill = featureColor
    c.title.format.font.shadow.visible = false
  }

  Tee.Chart.prototype.applyTheme = function (theme) {
    if (!theme || theme == '') this.applyTheme('default')
    else if (theme == 'default') defaultTheme(this)
    else if (theme == 'minimal') minimalTheme(this)
    else if (theme == 'excel') excelTheme(this)
    else if (theme == 'dark') darkTheme(this)
    else if (theme == 'twilight') twilightTheme(this)
    else if (theme == 'daybreak') daybreakTheme(this)

    this.themeName = theme
    this.draw()
  }

  Tee.Chart.prototype.applyPalette = function (paletteName) {
    applyPalette(this, paletteName)
  }

  function applyPalette(c, paletteName) {
    //default (Opera)
    var colorList = ['#4466a3', '#f39c35', '#f14c14', '#4e97a8', '#2b406b', '#1d7b63', '#b3080e', '#f2c05d', '#5db79e', '#707070', '#f3ea8d', '#b4b4b4']

    /*Castaway*/
    if (paletteName == 'castaway') colorList = ['#4466a3', '#E8D0A9', '#B7AFA3', '#C1DAD6', '#F5FAFA', '#ACD1E9', '#6D929B']
    /*ClassicPalette*/ else if (paletteName == 'classic')
      colorList = ['#0000FF', '#00FF00', '#00FFFF', '#FF0000', '#FF00FF', '#FFFF00', '#000080', '#008000', '#008080', '#800000', '#808000', '#808080']
    /*Cool*/ else if (paletteName == 'cool')
      colorList = [
        'rgba(43,64,107,1.0)',
        'rgba(59,84,140,1.0)',
        'rgba(68,102,163,1.0)',
        'rgba(78,151,168,1.0)',
        'rgba(93,183,158,1.0)',
        'rgba(65,160,138,1.0)',
        'rgba(43,146,125,1.0)',
        'rgba(29,123,99)'
      ]
    /*Excel*/ else if (paletteName == 'excel')
      colorList = [
        '#FF9999',
        '#663399',
        '#CCFFFF',
        '#FFFFCC',
        '#660066',
        '#8080FF',
        '#CC6600',
        '#FFCCCC',
        '#800000',
        '#FF00FF',
        '#00FFFF',
        '#FFFF00',
        '#800080',
        '#000080',
        '#808000',
        '#FF0000',
        '#FFCC00',
        '#FFFFCC',
        '#CCFFCC',
        '#00FFFF',
        '#FFCC99',
        '#CC99FF'
      ]
    /*GrayscalePalette*/ else if (paletteName == 'grayscale')
      colorList = [
        '#F0F0F0',
        '#E0E0E0',
        '#D0D0D0',
        '#C0C0C0',
        '#B0B0B0',
        '#A0A0A0',
        '#909090',
        '#808080',
        '#707070',
        '#606060',
        '#505050',
        '#404040',
        '#303030',
        '#202020',
        '#101010'
      ]
    /*MacOSPalette*/ else if (paletteName == 'macOS')
      colorList = [
        '#FFFFFF',
        '#FCF305',
        '#FF6402',
        '#DD0806',
        '#F20884',
        '#4600A5',
        '#0000D4',
        '#02ABEA',
        '#1FB714',
        '#006411',
        '#562C05',
        '#90713A',
        '#C0C0C0',
        '#808080',
        '#404040',
        '#000000'
      ]
    /*ModernPalette*/ else if (paletteName == 'modern')
      colorList = ['#FF9966', '#FF6666', '#99CCFF', '#669966', '#CCCC99', '#9966CC', '#CC6666', '#FFCC99', '#9966FF', '#CCCCCC', '#66FFCC', '#6699FF', '#996699', '#CCCCFF']
    /*OnBlack*/ else if (paletteName == 'onBlack') colorList = ['rgba(200,230,90,1.0)', 'rgba(90,150,220,1.0)', 'rgba(230,90,40,1.0)', 'rgba(230,160,15)']
    /*Opera - default*/ else if (paletteName == 'opera') colorList = colorList //do nothing, Opera is default.
    /*PastelsPalette*/ else if (paletteName == 'pastels')
      colorList = ['#CCFFFF', '#FFFFCC', '#CCCCFF', '#00CCCC', '#CCCCCC', '#009999', '#999999', '#DDCCCC', '#FFCC66', '#CCCCFF', '#FF9999', '#FFFF99', '#99CCFF', '#CCFFCC']
    /*Rainbow*/ else if (paletteName == 'rainbow') colorList = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#6600FF', '#8B00FF']
    /*RedRiver*/ else if (paletteName == 'redRiver') colorList = ['#DC5C05', '#FFC519', '#6EC5B8', '#FF9000', '#978B7D', '#C7BAA7'] //#FFAC00
    /*Rust*/ else if (paletteName == 'rust')
      colorList = [
        '#CBFFFA',
        '#7F3D17',
        '#7F5E17',
        '#22287F',
        '#DD1E2F',
        '#EBB035',
        '#06A2CB',
        '#218559',
        '#D0C6B1',
        '#B67721',
        '#68819E',
        '#747E80',
        '#D5E1DD',
        '#F7F3E8',
        '#F2583E',
        '#77BED2'
      ]
    /*SeaWash*/ else if (paletteName == 'seaWash')
      colorList = ['#DC5C05', '#FFAC00', '#6EC5B8', '#E8D0A9', '#978B7D', '#C7BAA7', '#C1DAD6', '#FFC99F', '#ACD1E9', '#6D929B', '#D3E397', '#FFF5C3']
    /*SolidPalette*/ else if (paletteName == 'solid') colorList = ['#0000FF', '#FF0000', '#00FF00', '#FFCC00', '#404040', '#FFFF00', '#FF00C0', '#FFFFFF']
    /*TeeChart*/ else if (paletteName == 'teechart')
      colorList = [
        'rgba(255,0,0,1.0)',
        'rgba(0,128,0,1.0)',
        'rgba(255,255,0,1.0)',
        'rgba(0,0,255,1.0)',
        'rgba(255,255,255,1.0)',
        'rgba(128,128,128,1.0)',
        'rgba(255,0,255,1.0)',
        'rgba(0,128,128,1.0)',
        'rgba(0,0,128,1.0)',
        'rgba(128,0,0,1.0)',
        'rgba(0,255,0,1.0)',
        'rgba(128,128,0,1.0)',
        'rgba(128,0,128,1.0)',
        'rgba(192,192,192,1.0)',
        'rgba(0,255,255,1.0)',
        'rgba(0,0,0,1.0)',
        'rgba(173,255,47,1.0)',
        'rgba(135,206,235,1.0)',
        'rgba(255,228,196,1.0)',
        'rgba(75,0,130,1.0)'
      ]
    /*Warm*/ else if (paletteName == 'warm')
      colorList = [
        'rgba(243,234,141,1.0)',
        'rgba(242,192,93,1.0)',
        'rgba(243,156,53,1.0)',
        'rgba(245,129,28,1.0)',
        'rgba(243,107,21,1.0)',
        'rgba(241,76,20,1.0)',
        'rgba(230,24,10,1.0)',
        'rgba(179,8,14)'
      ]
    /*WebPalette*/ else if (paletteName == 'web') colorList = ['#FFA500', '#0000CE', '#00CE00', '#FFFF40', '#40FFFF', '#FF40FF', '#FF4000', '#8080A5', '#808040']
    /*RainbowWidePalette*/ else if (paletteName == 'rainbowWide')
      colorList = [
        '#990000',
        '#C30000',
        '#EE0000',
        '#FF1A00',
        '#FF4600',
        '#FF7300',
        '#FF9F00',
        '#FFCB00',
        '#FFF700',
        '#E3F408',
        '#C3E711',
        '#A3DA1B',
        '#83CD25',
        '#63C02E',
        '#42B338',
        '#22A642',
        '#029A4B',
        '#0C876A',
        '#1A758A',
        '#2863AA',
        '#3650CB',
        '#443EEB',
        '#612AFF',
        '#9615FF',
        '#CC00FF'
      ]
    /*WindowsVistaPalette*/ else if (paletteName == 'windowsVista')
      colorList = [
        '#001FD2',
        '#E00201',
        '#1E6602',
        '#E8CD7E',
        '#AFABAC',
        '#A4D0D9',
        '#3D3B3C',
        '#95DD31',
        '#9E0001',
        '#DCF774',
        '#45FDFD',
        '#D18E74',
        '#A0D891',
        '#D57A65',
        '#9695D9'
      ]
    /*WindowsXPPalette*/ else if (paletteName == 'windowsxp')
      colorList = [
        'rgba(130,155,254,1.0)',
        'rgba(252,209,36,1.0)',
        'rgba(124,188,13,1.0)',
        'rgba(253,133,47,1.0)',
        'rgba(253,254,252,1.0)',
        'rgba(226,78,33,1.0)',
        'rgba(41,56,214,1.0)',
        'rgba(183,148,0,1.0)',
        'rgba(90,134,0,1.0)',
        'rgba(210,70,0,1.0)',
        'rgba(211,229,250,1.0)',
        'rgba(216,216,216,1.0)',
        'rgba(95,113,123,1.0)'
      ]
    /*VictorianPalette*/ else if (paletteName == 'victorian')
      colorList = ['#5DA5A1', '#C45331', '#E79609', '#F6E84A', '#B1A2A7', '#C9A784', '#8C7951', '#D8CDB7', '#086553', '#F7D87B', '#016484']

    c.paletteName = paletteName
    c.palette.colors = colorList

    if (c.series.items.length > 0) {
      for (var i = 0; i < c.series.items.length; i++) {
        c.series.items[i].format.fill = c.palette.get(i)
        if (c.series.items[i].pointer != null && c.series.items[i].pointer.format != null) {
          c.series.items[i].pointer.format.fill = c.palette.get(i)
        }
      }
    }

    c.draw()
  }

  function makeHttpObject() {
    try {
      return new XMLHttpRequest()
    } catch (error) {}
    try {
      return new ActiveXObject('Msxml2.XMLHTTP')
    } catch (error) {}
    try {
      return new ActiveXObject('Microsoft.XMLHTTP')
    } catch (error) {}

    throw new Error('Could not create HTTP request object.')
  }

  Tee.doHttpRequest = function (target, url, success, failure) {
    var request = makeHttpObject()
    if (request) {
      request.onreadystatechange = function () {
        if (request.readyState == 4) {
          if (request.status === 200 || request.status === 0) success(target, request.responseText)
          else if (failure) failure(request.status, request.statusText)
        }
      }
      request.open('GET', url, true)
      request.send(null)
    }
  }

  Tee.Slider = function (chart, position) {
    Tee.Tool.call(this, chart)

    var touchDragging = false

    var t = (this.thumb = new Tee.Format(chart))
    t.round = { x: 4, y: 4 }
    t.stroke.size = 0.5
    t.gradient.visible = false
    t.gradient.direction = 'leftright'
    t.shadow.visible = false

    var f = (this.back = new Tee.Format(chart))
    f.fill = 'white'
    f.gradient.visible = false
    f.stroke.fill = 'darkgrey'
    f.round = { x: 4, y: 4 }

    var g = (this.grip = new Tee.Format(chart))
    g.round = { x: 4, y: 4 }
    g.stroke.fill = 'rgb(20,20,20,1.0)'

    this.gripSize = 3

    var b = (this.bounds = { x: 10, y: 10, width: 200, height: 20 })
    this.transparent = false

    this.margin = 16 // %
    this.min = 0
    this.max = 100

    this.position = typeof position == 'undefined' ? 50 : position

    this.useRange = false
    this.thumbSize = 8
    this.horizontal = true
    this.cursor = 'pointer'
    this.delta = 0

    function contains(r, p) {
      return p.x >= r.x && p.x <= r.x + r.width && p.y >= r.y && p.y <= r.y + r.height
    }

    this.thumbRect = function (r) {
      var range = this.max - this.min,
        v = range > 0 ? (this.position - this.min) / range : 0

      if (this.horizontal) {
        r.width = this.thumbSize
        r.x = b.x + v * b.width - r.width * 0.5
        r.y = b.y
        r.height = b.height
      } else {
        r.height = this.thumbSize
        r.y = b.y + v * b.height - r.height * 0.5
        r.x = b.x
        r.width = b.width
      }
    }

    var r = {}

    this.gripRect = function (r) {
      if (this.horizontal) {
        var h = r.height * 0.2
        return { x: r.x - this.gripSize, y: r.y + r.height * 0.5 - h, width: 2 * this.gripSize, height: 2 * h }
      } else {
        var w = r.width * 0.2
        return { x: r.x + r.width * 0.5 - w, y: r.y - this.gripSize, width: 2 * w, height: 2 * this.gripSize }
      }
    }

    this.draw = function () {
      var d = this.horizontal ? b.height : b.width,
        m = d * this.margin * 0.01

      if (!this.transparent) {
        if (this.horizontal) this.back.rectangle(b.x, b.y + m, b.width, d - 2 * m)
        else this.back.rectangle(b.x + m, b.y, d - 2 * m, b.height)
      }

      if (this.onDrawThumb) this.onDrawThumb(this)

      this.thumbRect(r)

      if (this.invertThumb) {
        var th = this.thumb

        if (this.horizontal) {
          th.rectangle(b.x, b.y + m, r.x, b.height - 2 * m)
          th.rectangle(b.x + r.x + r.width, b.y + m, b.width, b.height - 2 * m)
        } else {
          th.rectangle(b.x + m, b.y, b.width - 2 * m, r.y)
          th.rectangle(b.x + m, b.y + r.y + r.height, b.width - 2 * m, b.height)
        }
      } else this.thumb.rectangle(r)

      if (this.useRange) {
        if (this.horizontal) {
          var r1 = this.gripRect(r)
          this.grip.rectangle(r1)
          r1.x += r.width
          this.grip.rectangle(r1)
        }
      }
    }

    this.clickAt = function (pos) {
      var off = this.horizontal ? b.x : b.y,
        s = this.horizontal ? b.width : b.height,
        ra = this.max - this.min,
        v

      v = this.min + Math.max(0, ((pos + this.delta - off) * ra) / s)

      if (v > this.max) v = this.max

      if (this.onChanging) {
        var v2 = this.onChanging(this, v)
        if (typeof v2 !== 'undefined') v = v2
      }

      if (v < this.min) v = this.min
      else if (v > this.max) v = this.max

      this.chart.newCursor = this.cursor

      if (this.position != v) {
        this.position = v

        //requestAnimFrame(function() { this.chart.draw(); });

        this.chart.draw()
      }
    }

    this.resized = function () {
      if (this.onChanging) this.onChanging(this, this.position)
      this.chart.draw()
      this.chart.newCursor = 'col-resize'
    }
    this.chart.canvas.addEventListener('touchstart', function (e) {
      touchDragging = true
      e.preventDefault()
    })
    this.chart.canvas.addEventListener('touchend', function (e) {
      touchDragging = false
      e.preventDefault()
    })
    this.mousemove = function (p) {
      var s = this.horizontal ? b.width : b.height,
        pp = this.horizontal ? p.x : p.y,
        ra = this.max - this.min

      this.thumbRect(r)

      if (this.resizeBegin && pp < r.x + r.width) {
        var old = this.thumbSize,
          dif = r.x - pp,
          v2 = 0.5 * ((dif * ra) / s)
        this.thumbSize += dif
        this.position -= v2

        if (this.position < this.min) {
          this.position = this.min
          this.thumbSize = old
        }

        this.resized()
      } else if (this.resizeEnd && pp > r.x) {
        var dif2 = r.x + r.width - pp,
          v3 = 0.5 * ((dif2 * ra) / s)
        this.thumbSize -= dif2
        this.position -= v3
        this.resized()
      } else if (this.dragging || touchDragging) {
        this.clickAt(pp)
      } else {
        var ingrip = false

        if (this.useRange) {
          var r1 = this.gripRect(r)
          ingrip = contains(r1, p)
          if (!ingrip) {
            r1.x += r.width
            ingrip = contains(r1, p)
          }
        }

        if (ingrip) this.chart.newCursor = 'col-resize'
        else if (contains(r, p)) this.chart.newCursor = this.cursor
      }
    }

    var p = { x: 0, y: 0 }

    this.mousedown = function (event) {
      this.thumbRect(r)
      this.chart.calcMouse(event, p)

      var r1 = this.gripRect(r)
      this.resizeBegin = this.useRange && contains(r1, p)
      r1.x += r.width

      this.resizeEnd = this.useRange && !this.resizeBegin && contains(r1, p)
      this.dragging = !this.resizeBegin && !this.resizeEnd && contains(r, p)

      if (!this.resizeBegin && !this.resizeEnd) {
        if (this.dragging) this.delta = this.horizontal ? r.x + r.width * 0.5 - p.x : r.y + r.height * 0.5 - p.y
        else if (contains(b, p)) {
          var tmp = this.horizontal ? r.width * 0.5 : r.height * 0.5
          this.delta = -tmp
          this.clickAt(tmp + (this.horizontal ? p.x : p.y))
        }
      }

      return this.dragging || this.resizeBegin || this.resizeEnd
    }

    this.clicked = function () {
      var d = this.dragging || this.resizeBegin || this.resizeEnd
      this.resizeBegin = this.resizeEnd = this.dragging = false
      this.delta = 0
      return d
    }

    this.mouseout = function () {
      this.resizeBegin = this.resizeEnd = this.dragging = false
    }
  }

  Tee.Slider.prototype = new Tee.Tool()

  Tee.Scroller = function (canvas, target) {
    Tee.Chart.call(this, canvas)

    this.target = target

    this.aspect.clip = false
    this.panel.transparent = true
    this.title.visible = false

    var scroller = (this.scroller = new Tee.Slider(this))
    scroller.useRange = true
    scroller.thumbSize = 100

    var u = scroller.thumb
    u.shadow.height = 0
    u.transparency = 0.6
    u.stroke.fill = 'black'
    u.shadow.visible = false

    scroller.horizontal = true
    var b = scroller.bounds
    b.x = 0
    b.y = 0
    b.width = this.bounds.width
    b.height = this.bounds.height
    scroller.margin = 0

    scroller.lock = false

    this.tools.add(scroller)

    var o = this

    target.ondraw = function () {
      if (!scroller.lock) o.draw()
    }
    target.onscroll = function () {
      var a = this.axes.bottom,
        li = this.series,
        mi = li.minXValue(),
        ma = li.maxXValue(),
        dif = a.maximum - a.minimum

      if (a.minimum < mi) {
        a.minimum = mi
        a.maximum = a.minimum + dif
      }
      if (a.maximum > ma) {
        a.maximum = ma
        a.minimum = a.maximum - dif
      }
    }

    this.useRange = function (value) {
      scroller.useRange = value
      this.draw()
    }

    this.invertThumb = function (value) {
      scroller.invertThumb = value
      this.draw()
    }

    scroller.onChanging = function (s, v) {
      var r = ((s.thumbSize * (s.max - s.min)) / s.bounds.width) * 0.5,
        li = target.series,
        mi = li.minXValue(),
        ma = li.maxXValue()

      if (v - r < mi) v = mi + r
      else if (v + r > ma) v = ma - r

      target.axes.bottom.setMinMax(v - r, v + r)
      this.lock = true

      //requestAnimFrame(function() {target.draw();});

      target.draw()
      this.lock = false

      if (o.onChanging) o.onChanging(o, v - r, v + r)

      return v
    }

    this.setBounds = function (x, y, width, height) {
      this.bounds.x = x
      this.bounds.y = y
      this.bounds.width = width
      this.bounds.height = height

      b.x = x
      b.y = y
      b.width = width
      b.height = height
    }

    scroller.onDrawThumb = function (s) {
      var r = target.chartRect,
        ctx = target.ctx
      var cRect = new Tee.Rectangle(scroller.bounds.x, scroller.bounds.y, scroller.bounds.width, scroller.bounds.height)
      target.chartRect = cRect
      target.ctx = scroller.chart.ctx

      function saveAxis(axis, data) {
        var res = { mi: axis.minimum, ma: axis.maximum, sp: axis.startPos, ep: axis.endPos }
        restoreAxis(axis, data)
        return res
      }

      function restoreAxis(axis, old) {
        axis.minimum = old.mi
        axis.maximum = old.ma
        axis.startPos = old.sp
        axis.endPos = old.ep
        axis.scale = (old.ep - old.sp) / (old.ma - old.mi)
      }

      var b = scroller.bounds,
        c = target,
        li = c.series,
        h,
        v

      s.min = li.minXValue()
      s.max = li.maxXValue()

      h = saveAxis(c.axes.bottom, { sp: b.x, ep: b.x + b.width, mi: s.min, ma: s.max })
      v = saveAxis(c.axes.left, { sp: b.y, ep: b.y + b.height, mi: li.minYValue(), ma: li.maxYValue() })

      var p = (h.mi + h.ma) * 0.5,
        dif = h.ma - h.mi,
        ra

      //if (s.position!=p) {
      s.thumbSize = (dif * s.bounds.width) / (s.max - s.min)
      ra = dif * 0.5
      if (o.onChanging) o.onChanging(o, p - ra, p + ra)
      s.position = p
      //}

      c.series.each(function (s) {
        if (s.visible && s.useAxes) {
          if (s.pointer != undefined) {
            //disable points in Scroller. Bug sizing
            var oldVisible = s.pointer.visible
            s.pointer.visible = false
            s.draw()
            s.pointer.visible = oldVisible
          } else s.draw()
        }
      })

      restoreAxis(c.axes.bottom, h)
      restoreAxis(c.axes.left, v)

      c.chartRect = r
      c.ctx = ctx
    }
  }

  Tee.Scroller.prototype = new Tee.Chart()

  Tee.SliderControl = function (canvas) {
    var tmp = new Tee.Chart(canvas)
    tmp.panel.transparent = true
    tmp.title.visible = false

    var s = new Tee.Slider(tmp)

    s.bounds.x = s.thumbSize + 1
    s.bounds.width = tmp.canvas.width - 2 * s.thumbSize - 2
    s.bounds.y = (tmp.canvas.height - s.bounds.height) * 0.5

    tmp.tools.add(s)
    return s
  }

  Tee.CheckBox = function (chart, text, checked) {
    Tee.Annotation.call(this, chart)

    this.transparent = true
    this.text = text
    this.checked = checked || true
    this.margins.left = 10

    this.cursor = 'pointer'

    this.check = new Tee.Format(chart)
    this.check.fill = 'white'

    this.draw = function () {
      Tee.Annotation.prototype.draw.call(this)

      var c = this.chart.ctx,
        x = this.position.x + 2

      var h = this.bounds.height * 0.6,
        y = this.position.y + (this.bounds.height - h) * 0.4

      this.check.rectangle(x, y, h, h)

      if (this.checked) {
        c.beginPath()
        c.moveTo(x + 3, y + 5)
        c.lineTo(x + 4, y + 8)
        c.lineTo(x + 7, y + 2)
        this.check.stroke.prepare()
        c.stroke()
      }
    }

    this.chart.canvas.addEventListener('touchstart', function () {})
    this.onclick = function (/*a,x,y*/) {
      this.checked = !this.checked
      if (this.onchange) this.onchange(this)
      return true
    }
  }

  Tee.CheckBox.prototype = new Tee.Annotation()
  //*********** extras end ********************

  //*********** animations start **************

  if (typeof exports !== 'undefined') exports.Tee = Tee

  /**
   * @constructor
   * @augments Tee.Animation
   * @class Fades in/out chart elements.
   */
  Tee.FadeAnimation = function (target) {
    Tee.Animation.call(this, target)

    this.kind = 'in' // in, out

    var o = this,
      fa

    this.fade = {}

    this.setTransp = function (value) {
      if (o.kind == 'out') value = 1 - value

      if (fa.legend) o.chart.legend.format.transparency = value

      if (fa.walls) o.chart.walls.transparency = value

      if (fa.series)
        o.chart.series.each(function (s) {
          s.format.transparency = value
        })

      if (fa.marks)
        o.chart.series.each(function (s) {
          s.marks.transparency = value
        })

      if (fa.title) o.chart.title.format.transparency = value

      if (fa.axes) o.chart.axes.transparency = value

      if (fa.panel) o.chart.panel.format.transparency = value
    }

    this.start = function () {
      fa = this.fade
      this.setTransp(1)
    }
    this.stop = function () {
      this.setTransp(0)
    }
    this.doStep = function (f) {
      o.setTransp(1 - f)
    }
  }

  Tee.FadeAnimation.prototype = new Tee.Animation()

  /**
   * @constructor
   * @augments Tee.Animation
   * @class Animates series data
   * @property {Tee.Series} series Optional Tee.Series object to animate. When null, all series and axes are animated.
   * @property {String} [kind="axis"] Animation style. Can be: axis, left, top, right, bottom, x, y, each, all, zoomin, zoomout.
   */
  Tee.SeriesAnimation = function (target) {
    Tee.Animation.call(this, target)

    if (target instanceof Tee.Series) {
      this.series = target
      this.chart = target.chart
    } else this.series = null

    this.oldmin = 0
    this.oldmax = 0
    this.oldauto = true

    var scaling = 1,
      o = this

    this.kind = 'axis' // "left", "right", "top", "bottom", "axis", "x", "y", "zoomin", "zoomout", "each", "all"

    function changeAxis(o, a, amount) {
      a.automatic = false
      var mid = (o.oldmin + o.oldmax) * 0.5,
        range = (o.oldmax - o.oldmin) * 0.5
      a.maximum = mid + amount * range
      a.minimum = mid - amount * range
    }

    /**
     * @returns {Tee.Axis} Returns the mandatory axis of the animated series, or null
     * if no visible series exist.
     */
    this.getAxis = function () {
      var s = this.series || this.chart.series.firstVisible()
      return s ? s.mandatoryAxis : null
    }

    this.getOtherAxis = function () {
      var s = this.series || this.chart.series.firstVisible()
      if (s) {
        if (s.yMandatory) {
          if (s.vertAxis === 'both') return this.chart.axes.right
        } else if (s.horizAxis === 'both') return this.chart.axes.top
      } else return null
    }

    this.doStep = function (f) {
      var a = o.getAxis(),
        a2 = o.getOtherAxis()
      if (a) {
        a.automatic = false
      }
      if (a2) {
        a2.automatic = false
      }

      if (o.kind == 'axis') {
        changeAxis(o, a, 1 + (1 - f) * 100)
        if (a2) changeAxis(o, a2, 1 + (1 - f) * 100)
      } else
        o.chart.series.each(function (s) {
          if (o.series && o.series !== s) return

          var v = s.data.values,
            old = s.data._old,
            t,
            len = v.length

          if (s instanceof Tee.ActivityGauge) {
            s.maxDrawWidth = s.maxWidth * f
          } else if (s instanceof Tee.Pie) {
            s.rotation = 360 * (1 - f)
            scaling = f
          } else if (o.kind == 'each') {
            var stepf = trunc(len * f)

            for (t = 0; t < stepf; t++) v[t] = old[t]

            if (stepf < len) v[stepf] = old[stepf] * (len * f - stepf)
          } else if (o.kind == 'all') {
            for (t = 0; t < len; t++) v[t] = old[t] * f
          } else if (o.kind != 'axis') {
            scaling = f
          }
        })
    }

    this.stop = function () {
      this.doStep(1)
      var a = o.getAxis(),
        a2 = o.getOtherAxis()

      if (a) {
        a.maximum = o.oldmax
        a.minimum = o.oldmin
        a.automatic = o.oldauto
      }
      if (a2) {
        a2.maximum = o.oldmax
        a2.minimum = o.oldmin
        a2.automatic = o.oldauto
      }

      o.chart.series.each(function (s) {
        if (s.transform) s.transform = null

        if (o.kind == 'each' || o.kind == 'all')
          if (s.data._old) {
            s.data.values = s.data._old
            s.data._old = null
          }
      })
    }

    this.start = function () {
      var a = this.getAxis(),
        a2 = this.getOtherAxis(),
        c = this.chart,
        ss = c.series.items,
        w = c.chartRect.width,
        h = c.chartRect.height,
        t,
        s,
        ww = c.bounds.width,
        hh = c.bounds.height

      if (ss.length === 0) return false

      this.oldmin = a.minimum
      this.oldmax = a.maximum
      this.oldauto = a.automatic

      for (t = 0; t < ss.length; t++) {
        s = ss[t]

        if (this.series && this.series !== s) continue

        if (s instanceof Tee.Pie)
          s.transform = function () {
            this.chart.ctx.scale(scaling, scaling)
          }
        else if (this.kind == 'each' || this.kind == 'all') {
          var v = s.data.values,
            tt,
            len = v.length
          s.data._old = v.slice(0)
          for (tt = 0; tt < len; tt++) v[tt] = 0
          a.automatic = false
          if (a2) a2.automatic = false
        } else if (this.kind == 'left')
          s.transform = function () {
            this.chart.ctx.translate(-w * (1 - scaling), 0)
          }
        else if (this.kind == 'right')
          s.transform = function () {
            this.chart.ctx.translate(w * (1 - scaling), 0)
          }
        else if (this.kind == 'x')
          s.transform = function () {
            this.chart.ctx.scale(scaling, 1)
          }
        else if (this.kind == 'y')
          s.transform = function () {
            this.chart.ctx.scale(1, scaling)
          }
        else if (this.kind == 'top')
          s.transform = function () {
            this.chart.ctx.translate(0, -h * (1 - scaling))
          }
        else if (this.kind == 'bottom')
          s.transform = function () {
            this.chart.ctx.translate(0, h * (1 - scaling))
          }
        else if (this.kind == 'zoomin')
          s.transform = function () {
            var ctx = this.chart.ctx
            ctx.translate(ww * 0.5, hh * 0.5)
            ctx.scale(scaling, scaling)
            ctx.translate(-ww * 0.5, -hh * 0.5)
          }
        else if (this.kind == 'zoomout')
          s.transform = function () {
            var ctx = this.chart.ctx
            ctx.translate(ww * 0.5, hh * 0.5)
            ctx.scale(2 - scaling, 2 - scaling)
            ctx.translate(-ww * 0.5, -hh * 0.5)
          }
      }

      if (this.kind == 'axis') {
        changeAxis(this, a, 100)
        if (a2) changeAxis(this, a2, 100)
      }
    }
  }

  Tee.SeriesAnimation.prototype = new Tee.Animation()

  /**
   * @constructor
   * @augments Tee.Animation
   * @class Animates Series marks items.
   */
  Tee.MarksAnimation = function (target) {
    Tee.Animation.call(this, target)

    if (target && target instanceof Tee.Series) {
      this.series = target
      this.chart = target.chart
    } else this.series = null

    this.current = -1

    var m = this.series.marks,
      o = this,
      old

    function marksText(series, index, result) {
      if (index <= o.current) return result
      else return ''
    }

    this.start = function () {
      old = m.ongettext
      m.ongettext = marksText
    }

    this.stop = function () {
      m.ongettext = old
      this.current = -1
    }

    this.doStep = function (f) {
      o.current = trunc(o.series.data.values.length * f)
    }
  }

  Tee.MarksAnimation.prototype = new Tee.Animation()

  //*********** animations end ****************

  /** TABLE */

  // -------------------------------------------------------------
  // TeeChart(tm) for JavaScript(tm)
  // v2.4 Feb 2018
  // Copyright(c) 2012-2017 by Steema Software SL. All Rights Reserved.
  // www.steema.com
  //
  // JavaScript is a trademark of Oracle Corporation.
  // -------------------------------------------------------------

  function isNumeric(v) {
    return parseFloat(v) == v
  }

  function cellText(cell) {
    return cell.textContent || cell.innerText // IE
  }

  Tee.Chart.prototype.fromTable = function (table, style, cols, header, labels) {
    function setTitleFooter(chart, cell) {
      if (cell) {
        var tmp = cellText(cell)

        if (chart.title.text === '') chart.title.text = tmp
        else chart.footer.text = tmp
      }
    }

    var h,
      st,
      c,
      r,
      l,
      row,
      col,
      cell,
      ta = table instanceof HTMLTableElement ? table : document.getElementById(table)

    if (ta) {
      if (header === null) header = -1
      if (labels === null) labels = -1

      this.series.items = []

      if (cols) {
        if (header > -1) {
          h = ta.rows[header]

          if (h) {
            for (c = labels + 1; (cell = h.cells[c]); c++) {
              this.addSeries(new style()).title = cell ? cellText(cell) : 'Series ' + c.toFixed(0)
            }

            if (labels > -1) setTitleFooter(this, h.cells[labels])
          }
        } else {
          h = ta.rows[0]

          if (h) {
            for (c = labels + 1; (cell = h.cells[c]); c++) {
              this.addSeries(new style()).title = 'Series ' + c.toFixed(0)
            }
          }
        }

        for (r = header + 1; (row = ta.rows[r]); r++) {
          if (row) {
            for (c = labels + 1; (col = row.cells[c]); c++) {
              st = cellText(col) === '' ? null : parseFloat(cellText(col))
              this.series.items[c - labels - 1].data.values.push(st)
            }

            if (labels > -1) {
              l = cellText(row.cells[labels])
              this.series.each(function (s) {
                s.data.labels.push(l)
              })
            }
          }
        }
      } else {
        for (r = header + 1; (row = ta.rows[r]); r++) {
          if (row)
            for (c = labels; (col = row.cells[c]); c++) {
              if (c == labels) {
                this.addSeries(new style()).title = col ? cellText(col) : 'Series ' + r.toFixed(0)
              } else {
                st = cellText(col) === '' ? null : parseFloat(cellText(col))
                this.series.items[r - header - 1].data.values.push(st)
              }
            }
        }

        if (header > -1) {
          row = ta.rows[header]

          for (c = labels + 1; (col = row.cells[c]); c++)
            this.series.each(function (s) {
              s.data.labels.push(cellText(col))
            })

          if (labels > -1) setTitleFooter(this, row.cells[labels])
        }
      }

      this.draw()
    }
  }

  Tee.Table = function (table, chart) {
    var _refresh = null

    this.header = 0
    this.firstCol = 0
    this.byCols = true

    var ta = table instanceof HTMLTableElement ? table : document.getElementById(table)

    this.table = ta

    function enableColResize() {
      if (table) {
        var row = tb.getElementsByTagName('tr')[0]
        if (row) {
          cols = row.getElementsByTagName('td')
          if (!cols || cols.length == 0) cols = row.getElementsByTagName('th')

          if (cols) {
            for (var i = 0; i < cols.length; i++) {
              var a = document.createElement('div')
              a.className = 'arrow-down'
              cols[i].appendChild(a)
            }
          }
        }
      }
    }

    function getStyle(x, styleProp) {
      if (x.currentStyle) return x.currentStyle[styleProp]
      else if (window.getComputedStyle) return document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp)
      else return ''
    }

    this.changeCell = function (cell) {
      if (!(cell instanceof HTMLTableCellElement)) cell = this

      var s = cellText(cell),
        l = Math.max(s.length, 5)

      cell.onclick = null

      var i = document.createElement('input')
      i.type = 'text'
      i.style.width = cell.clientWidth + 'px'

      i.onchange = changeValue
      i.onkeydown = keyDown
      i.onblur = changeValue
      i.value = cell.innerHTML

      i.className = 'inline-editor'

      cell.innerHTML = ''
      cell.appendChild(i)

      cell.firstChild.focus()
    }

    var _table = this

    function keyDown(e) {
      var key,
        text = this
      if (window.event) key = window.event.keyCode
      else if (e) key = e.which
      else return true

      var c = text.parentNode,
        r = c.parentNode,
        tbl = r.parentNode

      if (key == 27)
        // escape
        changeValue(text)
      else if (key == 13) {
        changeValue(text)
      }
      if (key == 9) {
        // tab
        if (e && e.shiftKey) {
          if (c.cellIndex > _table.firstCol) {
            changeValue(text)
            _table.changeCell(tbl.rows[r.rowIndex].cells[c.cellIndex - 1])
          } else if (r.rowIndex > 1) {
            changeValue(text)
            _table.changeCell(tbl.rows[r.rowIndex - 1].cells[r.cells.length - 1])
          }
        } else {
          if (c.cellIndex < r.cells.length - 1) {
            changeValue(text)
            _table.changeCell(tbl.rows[r.rowIndex].cells[c.cellIndex + 1])
          } else if (r.rowIndex < tbl.rows.length - 1) {
            changeValue(text)
            _table.changeCell(tbl.rows[r.rowIndex + 1].cells[1])
          }
        }
        return false
      } else if (key == 40) {
        // arrow down
        if (r.rowIndex < tbl.rows.length - 1) {
          changeValue(text)
          _table.changeCell(tbl.rows[r.rowIndex + 1].cells[c.cellIndex])
        }
      } else if (key == 38) {
        // arrow up
        if (r.rowIndex > _table.header) {
          changeValue(text)
          _table.changeCell(tbl.rows[r.rowIndex - 1].cells[c.cellIndex])
        }
      }

      return true
    }

    function changeValue(text) {
      if (this instanceof HTMLInputElement) text = this

      if (text.onchange) {
        text.onchange = null

        var cell = text.parentNode

        if (cell) {
          cell.innerHTML = text.value
          cell.onclick = _table.changeCell

          if (_refresh) _refresh(cell)
        }
      }
    }

    this.enableRowHighlight = function (color, panel) {
      if (typeof panel == 'string') panel = document.getElementById(panel)

      if (ta)
        for (var t = 0; t < ta.rows.length; t++) {
          ta.rows[t].onmouseover = function () {
            this.style.backgroundColor = color

            if (panel) panel.style.visibility = 'visible'
          }

          ta.rows[t].onmouseout = function () {
            this.style.backgroundColor = '#FFFFFF'

            if (panel) panel.style.visibility = 'hidden'
          }
        }
    }

    function refreshCell(cell) {
      var byCols = _table.byCols,
        ser,
        row,
        index,
        s = cell.innerHTML

      if (byCols) {
        row = cell.parentNode.rowIndex
        index = cell.cellIndex
      } else {
        row = cell.cellIndex
        index = cell.parentNode.rowIndex
      }

      if (row == 1) {
        // header row
        if (index == 1) {
          // title
          if (s != chart.footer.text) {
            chart.footer.text = s
            chart.draw()
          }
        } else {
          ser = chart.series.items[index - 2]
          if (s != ser.title) {
            ser.title = s
            chart.draw()
          }
        }
      } else {
        row -= 2

        if (index == 1) {
          // labels
          ser = chart.series.items[0]
          if (s != ser.data.labels[row]) {
            chart.series.each(function (s1) {
              s1.data.labels[row] = s
            })

            chart.draw()
          }
        } else {
          ser = chart.series.items[index - 2]
          var n = parseFloat(s)

          if (n != ser.data.values[row]) {
            ser.data.values[row] = n
            chart.draw()
          }
        }
      }
    }

    this.enableEditing = function (enable, refresh) {
      _refresh = refresh || refreshCell

      if (ta) for (var r = 0, row; (row = ta.rows[r]); r++) if (row) for (var c = 0, col; (col = row.cells[c]); c++) if (col) col.onclick = enable ? this.changeCell : null
    }

    // TODO: replace cell.className
    function dohoverCell(cell, active) {
      if (active) {
        cell.style.backgroundColor = 'gold'
        cell.style.color = 'white'
      } else {
        cell.style.backgroundColor = ''
        cell.style.color = ''
      }
    }

    this.pointToCell = function (series, index) {
      var s = series.chart.series.items.indexOf(series) + 2

      if (_table.byCols) return ta.rows[index + 2].cells[s]
      else return ta.rows[s].cells[index + 2]
    }

    this.hoverCell = function (series, index) {
      if (series.over != -1) dohoverCell(_table.pointToCell(series, series.over), false)

      if (index != -1) dohoverCell(_table.pointToCell(series, index), true)
    }

    function orderToIndex(i) {
      var n = -1

      for (var t = 0; t < chart.series.count(); t++) {
        if (chart.series.items[t].visible) {
          n++
          if (n == i) return t
        }
      }

      return -1
    }

    this.legendHover = function (old, index) {
      var tbl = ta,
        bycols = _table.byCols,
        pos = 1,
        c = chart

      if (c.legend.showValues()) {
        var s = c.series.firstVisible()
        pos = 2 + c.series.items.indexOf(s)
        bycols = !bycols
      }

      // non-visible series --> index old ??

      if (bycols) {
        if (old != -1) dohoverCell(ta.rows[pos].cells[orderToIndex(old) + 2], false)
        if (index != -1) dohoverCell(ta.rows[pos].cells[orderToIndex(index) + 2], true)
      } else {
        if (old != -1) dohoverCell(ta.rows[old + 2].cells[pos], false)
        if (index != -1) dohoverCell(ta.rows[index + 2].cells[pos], true)
      }
    }
  }

  function parseText(data, text) {
    data.values = []
    data.labels = []

    var v = text.split('\n'),
      len = v.length

    if (len > 0) {
      for (var t = 0; t < len; t++) {
        var s = v[t],
          fields = s.split(','),
          anyNumber = false

        for (var f = 0; f < fields.length; f++) {
          s = parseFloat(fields[f])
          if (s && !isNaN(s)) {
            anyNumber = true
            break
          }
        }

        if (anyNumber) {
          if (fields.length == 1) {
            s = parseFloat(s)
            if (isNaN(s)) s = 0
          } else if (fields.length == 2) {
            s = parseFloat(fields[0])
            if (isNaN(s)) s = 0
            data.labels[t] = fields[1]
          } else if (fields.length == 3) {
            s = parseFloat(fields[1])
            if (isNaN(s)) s = 0

            data.labels[t] = fields[2]
          }

          data.values[t] = s
        } else data.values[t] = 0
      }
    }
  }

  function loadXML(xml) {
    if (window.DOMParser) return new DOMParser().parseFromString(xml, 'text/xml')
    // Internet Explorer
    else {
      xmlDoc = new ActiveXObject('Microsoft.XMLDOM')
      xmlDoc.async = false
      xmlDoc.loadXML(xml)
      return xmlDoc
    }
  }

  Tee.Series.prototype.loadXML = function (xml) {
    this.data.xml = xml
    this.refresh()
  }

  function parseXML(series, xml, seriesTag, pointTag) {
    var data = series.data
    data.values = []
    data.labels = []

    seriesTag = seriesTag || 'series'

    var doc = loadXML(xml.value),
      n

    var s = doc.getElementsByTagName(seriesTag)[0]
    if (s) {
      n = s.getAttribute('color')
      if (n) series.color = n

      n = s.getAttribute('name')
      if (n) series.title = n

      n = s.getAttribute('metric')
      if (n) data.title = n

      pointTag = pointTag || 'point'

      var points = s.getElementsByTagName(pointTag)
      if (points) {
        for (var t = 0; t < points.length; t++) {
          n = points[t].getAttribute('name')
          if (n) data.labels.push(n)

          n = points[t].getAttribute('value')
          data.values.push(parseFloat(n))

          n = points[t].getAttribute('x')
          if (n) data.x.push(parseFloat(n))
        }
      }
    }
  }

  Tee.Series.prototype.loadJSON = function (json) {
    this.data.json = json
    this.refresh()
  }

  function parseJSON(series, json, seriesTag, pointTag) {
    var data = series.data,
      tmp
    data.values = []
    data.labels = []

    seriesTag = seriesTag || 'series'

    var o = typeof json.value === 'string' ? JSON.parse(json.value) : json.value

    if (o.series) {
      if (o.series.name != '') series.title = o.series.name
      if (o.series.color != '') series.format.fill = o.series.color

      if (o.series.metric != '') {
        data.title = o.series.metric

        tmp = series.mandatoryAxis.title
        if (tmp.text == '') tmp.text = data.title
      }

      if (o.series.category != '') {
        tmp = series.notmandatory.title
        if (tmp.text == '') tmp.text = o.series.category
      }

      var p = o.series.point,
        pp

      if (p) {
        for (var t = 0; t < p.length; t++) {
          pp = p[t]

          data.values.push(pp.value)

          if (pp.name !== undefined) data.labels[t] = pp.name

          if (pp.x !== undefined) {
            if (!data.x) data.x = []
            data.x[t] = pp.x
          }

          if (pp.color && pp.color !== '') {
            if (!series.palette.colors) series.palette.colors = []
            series.palette.colors[t] = pp.color
          }
        }
      }
    }
  }

  /** END TABLE */

  /*TOUCH FUNCTIONS*/
  /**
   * Double tap function reset the axes of the chart if canvas is double tapped.
   */
  function doubleTap(chart) {
    var canvas = chart.canvas
    var timeout
    var lastTap = 0
    canvas.addEventListener('touchend', function (e) {
      var currentTime = new Date().getTime()
      var tapLength = currentTime - lastTap
      clearTimeout(timeout)
      if (tapLength < 600 && tapLength > 100) {
        chart.zoom.reset()
        chart.draw()
      } else {
        timeout = setTimeout(function () {
          clearTimeout(timeout)
        }, 600)
      }
      lastTap = currentTime
      e.preventDefault()
    })
  }

  /**
   * Zoom the axes of the chart changing the min and the max value when two fingers are touching and moving in the canvas.
   */

  function twoFingersZoom(chart, zoom) {
    var canvas = chart.canvas
    var timer
    var maxDistX = 0,
      minDistX = 0,
      maxDistY = 0,
      minDistY = 0
    var newMinDistX = 0,
      newMaxDistX = 0,
      newMinDistY = 0,
      newMaxDistY = 0
    var oldMinDistX = 0,
      oldMaxDistX = 0,
      oldMinDistY = 0,
      oldMaxDistY = 0
    var touches = []
    var touchedMoreThanOnceStart
    var pMinX, pMinY, pMaxX, pMaxY
    var iniMinX, iniMinY, iniMaxX, iniMaxY
    touchedMoreThanOnceStart = false
    timer = setInterval(touchZoom, 100)

    function touchZoom() {
      var len = touches.length
      if (len > 1) {
        var tmp = 0
        var touch1 = touches[0]
        var touch2 = touches[1]
        zoom.touching = true
        if (!touchedMoreThanOnceStart) {
          iniMinX = touch1.pageX
          iniMaxX = touch2.pageX
          iniMinY = touch1.pageY
          iniMaxY = touch2.pageY

          if (iniMinX > iniMaxX) {
            tmp = iniMinX
            iniMinX = iniMaxX
            iniMaxX = tmp
          }
          if (iniMinY > iniMaxY) {
            tmp = iniMinY
            iniMinY = iniMaxY
            iniMaxY = tmp
          }

          touchedMoreThanOnceStart = true
        } else {
          pMinX = touch1.pageX
          pMaxX = touch2.pageX
          pMinY = touch1.pageY
          pMaxY = touch2.pageY
          if (pMinX > pMaxX) {
            tmp = pMinX
            pMinX = pMaxX
            pMaxX = tmp
          }
          if (pMinY > pMaxY) {
            tmp = pMinY
            pMinY = pMaxY
            pMaxY = tmp
          }

          newMinDistX = pMinX - iniMinX
          newMinDistY = pMinY - iniMinY
          newMaxDistX = pMaxX - iniMaxX
          newMaxDistY = pMaxY - iniMaxY

          minDistX = oldMinDistX - newMinDistX
          minDistY = oldMinDistY - newMinDistY
          maxDistX = oldMaxDistX - newMaxDistX
          maxDistY = oldMaxDistY - newMaxDistY

          oldMinDistX = newMinDistX
          oldMinDistY = newMinDistY
          oldMaxDistX = newMaxDistX
          oldMaxDistY = newMaxDistY
        }
        if (zoom.direction == 'both' || zoom.direction == 'horizontal') {
          drawMinMaxBottom(chart.axes.bottom.startPos + minDistX, chart.axes.bottom.endPos + maxDistX)
        }
        if (zoom.direction == 'both' || zoom.direction == 'vertical') {
          drawMinMaxLeft(chart.axes.left.startPos + minDistY, chart.axes.left.endPos + maxDistY)
        }
      }
    }

    canvas.addEventListener('touchend', function () {
      if (touchedMoreThanOnceStart) {
        touchedMoreThanOnceStart = false
      }
      clearInterval(timer)
    })
    canvas.addEventListener('touchmove', function (event) {
      event.preventDefault()
      touches = event.touches
    })

    function drawMinMaxBottom(min, max) {
      chart.axes.top.calcMinMax(min, max)
      chart.axes.bottom.calcMinMax(min, max)
      chart.draw()
    }
    function drawMinMaxLeft(min, max) {
      chart.axes.right.calcMinMax(min, max)
      chart.axes.left.calcMinMax(min, max)
      chart.draw()
    }
  }

  /**
   * @constructor
   * @augments Tee.Series
   * plots a Sliced Treemap
   * @class plots a sliced Treemap.
   */
  Tee.Sliced = function (o, o2) {
    //1r algortime de treemap
    Tee.Series.call(this, o, o2)

    this.useAxes = false
    this.colorEach = 'yes'

    this.draw = function () {
      if (this.data && this.data.values && this.data.labels) {
        var ctx = this.chart.ctx

        this.calcColorEach()

        var values = this.data.values
        var labels = this.data.labels
        var total = values.reduce((total, value) => total + value, 0)

        var sortedMap = values
          .map((value, index) => ({
            value: value,
            label: labels[index]
          }))
          .sort((a, b) => b.value - a.value)

        var y = 0
        var canvasHeight = this.chart.chartRect.height
        var canvasWidth = this.chart.chartRect.width

        for (var i = 0; i < sortedMap.length; i++) {
          var item = sortedMap[i]
          var percentage = item.value / total
          var mida_corresponent = percentage * canvasHeight

          ctx.beginPath()
          ctx.fillStyle = this.getFill(i, this.format)
          ctx.fillRect(0, y, canvasWidth, y + mida_corresponent)

          ctx.strokeStyle = 'black'
          ctx.lineWidth = 2
          ctx.strokeRect(0, y, canvasWidth, y + mida_corresponent)

          ctx.closePath()

          ctx.fillStyle = 'white'
          ctx.font = '16px Arial'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(item.label, canvasWidth / 2, y + mida_corresponent / 2)

          ctx.stroke()

          y += mida_corresponent
        }
      }
    }
  }

  Tee.Sliced.prototype = new Tee.Series()

  /**
   * @constructor
   * @augments Tee.Series
   * @plots a Treemap
   * @class plots a squarified Treemap.
   */
  Tee.Treemap = function (o, o2) {
    Tee.Series.call(this, o, o2)

    var f = this.format
    f.stroke.fill = 'black'
    f.font.style = '16px Arial'

    this.fillStyle = 'white'
    this.lineWidth = 2

    this.palette = new Tee.Palette(['#4466a3', '#f39c35', '#f14c14', '#4e97a8', '#2b406b', '#1d7b63', '#b3080e', '#f2c05d', '#5db79e', '#707070', '#f3ea8d', '#b4b4b4'])

    this.useAxes = false

    this.drawNode = function (ctx, node, x, y, width, height, n) {
      if (!node || node.length === 0) {
        return
      }
      const children = node.children

      let posy = y
      let xoffset = x

      ctx.beginPath()
      ctx.fillStyle = this.palette.get(n)
      ctx.fillRect(xoffset, posy, width - xoffset, height - posy)
      ctx.strokeStyle = f.stroke.fill
      ctx.lineWidth = this.lineWidth
      ctx.strokeRect(xoffset, posy, width - xoffset, height - posy)
      ctx.fillStyle = this.fillStyle
      ctx.font = f.font.style
      ctx.textAlign = this.format.textAlign
      ctx.textBaseline = 'middle'
      if (this.marks.visible) {
        if (ctx.textAlign == 'center') {
          ctx.fillText(node.name, x + width / 2, posy + 10)
        }
      } else if (ctx.textAlign == 'left') {
        ctx.fillText(node.name, x, posy + 10)
      } else if (ctx.textAlign == 'right') {
        ctx.fillText(node.name, width - x, posy + 10)
      }

      if (children == null) return

      const childHeight = (height - posy - 10 * 2) / children.length
      posy += 10
      xoffset += 10

      for (const child of children) {
        this.drawNode(ctx, child, xoffset, posy, width - xoffset, childHeight + posy, ++n)
        posy += childHeight
      }
    }

    this.draw = function () {
      var ctx = this.chart.ctx

      var root = o

      var y = 0
      var canvasHeight = this.chart.chartRect.height
      var canvasWidth = this.chart.chartRect.width

      this.drawNode(ctx, root, 0, y, canvasWidth, canvasHeight, 0)
    }
  }

  Tee.Treemap.prototype = new Tee.Series()

  /**
   * @constructor
   * @augments Tee.Series
   * @class plots a LinearGauge.
   * @property {Number} increment default 20 sets label increment
   * @property {String} markSymbol defaulr '%'
   * @property {string[]} gradientColors default ['red','green']
   * @property {Number} animationIncrement default 1;
   * @property {Number} startValue sets startvalue for animated bar
   * @property {Number} finalValue sets startvalue for animated bar
   */
  Tee.LinearGauge = function (o, o2) {
    Tee.Series.call(this, o, o2)

    var f = this.format
    f.stroke.fill = 'black'
    f.stroke.size = 1
    f.font.style = '16px Arial'
    this.lineFill = '#000'
    this.txtHeight = f.textHeight('Wj')
    this.min = 0
    this.max = 100
    this.increment = 20
    this.markSymbol = '%'
    this.gradientColors = ['red', 'green']
    this.animationIncrement = 1

    this.startValue = o == undefined ? 0 : o
    this.finalValue = o2 == undefined ? 0 : o2
    this.value = this.startValue

    this.useAxes = false

    this.drawAll = function (value, ctx, gaugeX, gaugeY, gradient, gaugeWidth, gaugeHeight) {
      this.drawBar(value, ctx, gaugeX, gaugeY, gradient, gaugeWidth, gaugeHeight, true)
    }

    this.drawBar = function (value, ctx, gaugeX, gaugeY, gradient, gaugeWidth, gaugeHeight, first) {
      this.value = value

      for (let i = this.min; i <= this.max; i += this.increment) {
        const x = this.gaugeX + (this.gaugeWidth * i) / 100
        ctx.fillStyle = this.lineFill
        ctx.lineWidth = f.stroke.size
        ctx.moveTo(x, gaugeY - 5)
        ctx.lineTo(x, gaugeY + this.gaugeHeight + 5)
        //ctx.fillRect(x, gaugeY - 5, 1, this.gaugeHeight + 10);
        ctx.stroke()
        if (first) {
          ctx.font = this.chart.axes.bottom.labels.format.font.style
          var ltext = `${i}` + this.markSymbol
          ctx.fillText(ltext, x - f.textWidth(ltext) / 2, gaugeY - this.txtHeight)
          var ltext = ''
        }
      }

      ctx.fillStyle = gradient
      ctx.fillRect(this.gaugeX, gaugeY, this.gaugeWidth * (value / 100), this.gaugeHeight)

      //mark
      if (this.marks.visible) {
        ctx.fillStyle = this.marks.format.font.fill
        ctx.font = this.marks.format.font.style
        ctx.fillText(this.value, this.gaugeWidth * (value / 100) + 12, gaugeY + this.gaugeHeight / 2 - this.marks.format.textHeight('Wj') / 2)
      }

      ctx.strokeStyle = f.stroke.fill
      ctx.lineWidth = f.stroke.size
      ctx.strokeRect(this.gaugeX, gaugeY, this.gaugeWidth, this.gaugeHeight)
    }

    this.animateGauge = function (currentValue, targetValue, gradient, gaugeX, gaugeY, gaugeWidth, gaugeHeight, ctx, first) {
      if (currentValue != targetValue) {
        if (Math.abs(currentValue - targetValue) <= this.animationIncrement) currentValue = targetValue
        else if (currentValue < targetValue) currentValue += this.animationIncrement
        else currentValue -= this.animationIncrement

        if (first) this.drawAll(currentValue, ctx, this.gaugeX, gaugeY, gradient, this.gaugeWidth, this.gaugeHeight)
        else {
          ctx.clearRect(this.gaugeX, gaugeY, this.gaugeWidth, this.gaugeHeight)
          this.drawBar(currentValue, ctx, this.gaugeX, gaugeY, gradient, this.gaugeWidth, this.gaugeHeight, false)
        }
        requestAnimationFrame(() => this.animateGauge(currentValue, targetValue, gradient, gaugeX, gaugeY, gaugeWidth, gaugeHeight, ctx, false))
      }
      //else
      //  this.drawAll(currentValue, ctx, this.gaugeX, gaugeY,gradient,this.gaugeWidth,this.gaugeHeight);
    }

    this.draw = function () {
      var value = this.startValue
      var ctx = this.chart.ctx
      var height = this.chart.chartRect.height
      var width = this.chart.chartRect.width
      this.gaugeWidth = width - 20
      this.gaugeHeight = 30
      this.gaugeX = 30 //leave space for 1st label.
      var gaugeY = (height - this.gaugeHeight) / 2

      const gradient = ctx.createLinearGradient(0, 0, this.gaugeWidth, 0)
      gradient.addColorStop(0, this.gradientColors[0])
      gradient.addColorStop(1, this.gradientColors[1])

      if (this.animation == true) {
        let currentValue = value
        const targetValue = this.finalValue
        if (currentValue == targetValue) this.drawAll(o2, ctx, this.gaugeX, gaugeY, gradient, this.gaugeWidth, this.gaugeHeight)
        else this.animateGauge(currentValue, targetValue, gradient, this.gaugeX, gaugeY, this.gaugeWidth, this.gaugeHeight, ctx, true)
      } else {
        this.drawAll(o2, ctx, this.gaugeX, gaugeY, gradient, this.gaugeWidth, this.gaugeHeight)
      }
    }
  }

  Tee.LinearGauge.prototype = new Tee.Series()

  /** SVG */

  // -------------------------------------------------------------
  // TeeChart(tm) for JavaScript(tm)
  // v2.4 Feb 2018
  // Copyright(c) 2012-2017 by Steema Software SL. All Rights Reserved.
  // www.steema.com
  //
  // JavaScript is a trademark of Oracle Corporation.
  // -------------------------------------------------------------

  function StopColor(pos, color) {
    this.pos = pos
    this.color = color
  }

  function LinearGradient(x1, y1, x2, y2) {
    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
    this.colors = []

    this.addColorStop = function (pos, color) {
      this.colors.push(new StopColor(pos, color))
    }

    this.svgcolors = function () {
      var l = this.colors.length,
        res = ''
      for (var t = 0; t < l; t++) {
        res += '<stop offset="' + (100 * this.colors[t].pos).toFixed(0) + '%" style="stop-color:' + this.colors[t].color + '; stop-opacity:1" />'
      }

      return res
    }

    function coord(x) {
      return x == 0 ? '0%' : '1'
    }

    this.tosvg = function (id) {
      return (
        '<linearGradient id="' +
        id +
        '" x1="' +
        coord(this.x1) +
        '" y1="' +
        coord(this.y1) +
        '" x2="' +
        coord(this.x2) +
        '" y2="' +
        coord(this.y2) +
        '">"' +
        this.svgcolors() +
        '</linearGradient>'
      )
    }
  }

  function RadialGradient() {
    this.addColorStop = function (pos, color) {}
  }

  function Path(ctx) {
    this.ctx = ctx
    this.closed = false

    this.fill = function () {}
    this.stroke = function () {}
  }

  function RectPath(ctx, x, y, width, height) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.fill = function () {
      this.ctx.addSVG(
        '<rect x="' +
          this.x.toFixed(0) +
          '" y="' +
          this.y.toFixed(0) +
          '"  width="' +
          this.width.toFixed(0) +
          '" height="' +
          this.height.toFixed(0) +
          '" fill="' +
          this.ctx.svgFill() +
          '"/>'
      )
    }

    this.stroke = function () {}
  }

  function RoundRectPath(ctx, x, y, width, height, xr, yr) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.roundx = xr
    this.roundy = yr

    this.fillStroke = function (fill, stroke) {
      this.ctx.addSVG(
        '  <rect x="' +
          this.x.toFixed(0) +
          '" y="' +
          this.y.toFixed(0) +
          '"  width="' +
          this.width.toFixed(0) +
          '" height="' +
          this.height.toFixed(0) +
          '" rx="' +
          this.roundx.toFixed(0) +
          '" ry="' +
          this.roundy.toFixed(0) +
          '" fill="' +
          fill +
          '" stroke="' +
          stroke +
          '"/>'
      )
    }

    this.fill = function () {
      this.fillStroke(this.ctx.svgFill(), 'transparent')
    }

    this.stroke = function () {
      this.fillStroke('transparent', this.ctx.svgstroke())
    }
  }

  function Measure(text) {
    this.width = 10 * text.length
  }

  function Context(svg) {
    this.svg = svg

    this.defs = '<defs>'

    this.addSVG = function (text) {
      this.svg.svg += text
    }

    this.svgstroke = function () {
      return this.strokeStyle
    }

    this.svgFill = function () {
      if (this.fillStyle instanceof LinearGradient) return this.svg.defs.urlOf(this.fillStyle)
      else return this.fillStyle
    }

    this.currentPath = null

    this.globalAlpha = 1

    this.shadowBlur = 0
    this.shadowColor = 'DarkGrey'
    this.shadowOffsetX = 0
    this.shadowOffsetY = 0
    this.strokeStyle = 'black'
    this.fillStyle = 'black'
    this.lineWidth = 1
    this.lineJoin = ''
    this.lineCap = ''
    this.miterLimit = 0
    this.textAlign = 'left'
    this.textBaseline = 'bottom'
    this.font = '10px Arial'

    this.arc = function (cx, cy, radius, start, end, clockwise) {}
    this.arcTo = function () {}
    this.beginPath = function () {
      this.currentPath = new Path(this)
    }
    this.clearRect = function (x, y, width, height) {
      this.fillStyle = 'white'
      this.fillRect(0, 0, this.svg.width, this.svg.height)
    }
    this.clip = function () {}
    this.closePath = function () {
      this.currentPath.closed = true
    }
    this.createLinearGradient = function (x1, y1, x2, y2) {
      return new LinearGradient(x1, y1, x2, y2)
    }
    this.createRadialGradient = function (x1, y1, r1, x2, y2, r2) {
      return new RadialGradient(x1, y1, r1, x2, y2, r2)
    }
    this.drawImage = function (image, x, y, width, height) {}
    this.fill = function () {
      this.currentPath.fill()
    }
    this.fillRect = function (x, y, width, height) {
      new RectPath(this, x, y, width, height).fill()
    }

    this.fontsvg = function () {
      return 'font-family="Verdana" font-size="8pt"'
    }

    this.textAnchor = function () {
      if (this.textAlign == 'left') return ''
      else if (this.textAlign == 'center') return 'text-anchor="middle"'
      else return 'text-anchor="end"'
    }

    this.baseline = function () {
      if (this.textBaseline == 'bottom') return 'style="dominant-baseline:text-after-edge;"'
      else if (this.textBaseline == 'top') return 'style="dominant-baseline:text-before-edge;"'
      else return 'style="dominant-baseline:middle;"'
    }

    this.fillText = function (text, x, y) {
      this.addSVG(
        '<text x="' +
          x.toFixed(0) +
          '" y="' +
          y.toFixed(0) +
          '" ' +
          this.fontsvg() +
          ' ' +
          this.textAnchor() +
          ' ' +
          this.baseline() +
          ' fill="' +
          this.svgFill() +
          '">' +
          text +
          '</text>'
      )
    }

    this.measureText = function (text) {
      return new Measure(text)
    }
    this.moveTo = function (x, y) {
      this.x = x
      this.y = y
    }

    this.lineTo = function (x, y) {
      this.addSVG(
        '<line x1="' + this.x.toFixed(0) + '" y1="' + this.y.toFixed(0) + '" x2="' + x.toFixed(0) + '" y2="' + y.toFixed(0) + '" fill="none"  stroke="' + this.svgstroke() + '"/>'
      )
      this.x = x
      this.y = y
    }

    this.quadraticCurveTo = function (x1, y1, x2, y2) {}

    this.rect = function (x, y, width, height) {
      this.currentPath = new RectPath(this, x, y, width, height)
      return this.currentPath
    }
    this.restore = function () {}

    this.roundRect = function (x, y, width, height, xr, yr) {
      this.currentPath = new RoundRectPath(this, x, y, width, height, xr, yr)
      return this.currentPath
    }

    this.save = function () {}
    this.stroke = function () {
      this.currentPath.stroke()
    }

    this.strokeRect = function (x, y, width, height) {
      new RectPath(this, x, y, width, height).stroke()
    }
  }

  function SVGDef(id, def) {
    this.id = id
    this.def = def

    this.tosvg = function () {
      return def
    }
  }

  function SVGDefs(canvas) {
    this.items = []

    this.urlOf = function (item) {
      var i = this.items.indexOf(item)

      if (i == -1) {
        i = this.items.length
        var id = 'def' + i.toFixed(0)
        this.items.push(new SVGDef(id, item.tosvg(id)))
      }

      return 'url(#' + this.items[i].id + ')'
    }

    this.tosvg = function () {
      var l = this.items.length
      if (l > 0) {
        var s = '<defs>'
        for (var t = 0; t < l; t++) s += this.items[t].tosvg()
        return s + '</defs>'
      } else return ''
    }
  }

  function SVGCanvas(width, height) {
    this.defs = new SVGDefs(this)
    this.width = width
    this.clientWidth = width
    this.height = height
    this.clientHeight = height

    //'<?xml version="1.0" standalone="no"?>\
    //<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\

    this.header =
      '<svg version="1.1" baseProfile="full"\
           xmlns="http://www.w3.org/2000/svg"\
           xmlns:xlink="http://www.w3.org/1999/xlink"\
           width="' +
      width.toFixed(0) +
      'px" height="' +
      height.toFixed(0) +
      'px">'

    this.svg = ''

    this.getContext = function (style) {
      return new Context(this)
    }

    this.getSVG = function () {
      return this.header + this.defs.tosvg() + this.svg + '</svg>'
    }
  }

  /** END SVG */

  /** DATA **/

  /**
   * @preserve TeeChart(tm) for JavaScript(tm)
   * @fileOverview TeeChart for JavaScript(tm)
   * v3.10 Jun 2024
   * Copyright(c) 2012-2024 by Steema Software SL. All Rights Reserved.
   * http://www.steema.com
   *
   * Licensed with commercial and non-commercial attributes,
   * specifically: http://www.steema.com/licensing/html5
   *
   * JavaScript is a trademark of Oracle Corporation.
   */

  /**
   * @author <a href="mailto:david@steema.com">Steema Software</a>
   * @version 2.4
   */

  /*global window, exports, XMLHttpRequest, parser, Engine, self, document, xmlDoc, DOMParser, ActiveXObject */

  ;(function () {
    /**
     * @constructor
     * @class Main Tee.Data class to perform multi-dimensional queries and charts.
     */
    Tee.Data = function () {
      this.datasets = []

      //var engine=this;

      /**
       * @param {String} title The string identifier for this dataset.
       * @param {object} object The custom data for this dataset.
       * @param {String} [field=""] The object data optional field that contains an array.
       * @param {String} [id=""] The optional field in the array that uniquely identifies each array row.
       * @returns {Tee.Data.Dimension} Returns a top-level dimension.
       */
      this.addDataSet = function (title, object, field, id) {
        if (object && object.implementation)
          // IE ?? instanceof XMLDocument)
          object = xmlToJson(object)

        var d = new Tee.Data.Dimension(title, field, id)

        d.object = object
        d.dataset = d
        d.dimensions = []
        d.engine = this

        this.datasets.push(d)
        return d
      }

      this.addJSON = function (title, json, field, id) {
        return this.addDataSet(title, JSON.parse(json), field, id)
      }

      this.applyStyle = function (chart, index) {
        switch (index) {
          case 0: {
            chart.panel.transparent = false
            chart.panel.format.round.x = 0
            chart.panel.format.round.y = 0
            chart.panel.format.stroke.size = 2
            chart.panel.format.stroke.fill = 'darkgray'
            break
          }
        }
      }

      /**
  Groups small values into a single "other" value.
  Requires sorted data.values in DESCENDING order.
  If there are more than "max" number of values, the rest are grouped and
  removed.
*/
      this.groupOther = function (data, max, label) {
        var t,
          l = data.values.length,
          l2,
          r

        if (l > max) {
          ;(r = 0), (l2 = l - max)

          for (t = max; t < l; t++) r += data.values[t]

          data.values[max - 1] = r
          data.labels[max - 1] = label

          data.values.splice(max, l2)
          data.labels.splice(max, l2)
          data.code.splice(max, l2)

          return l2
        } else return -1
      }

      this.slider = function (chart, items, x, y, width, height) {
        var s = new Tee.Slider(chart)
        s.min = 0
        s.max = items.length - 1
        s.step = 1
        s.position = s.min
        s.useRange = false
        s.thumbSize = 12
        s.horizontal = true

        s.bounds.x = x
        s.bounds.y = y
        s.bounds.width = width
        s.bounds.height = height

        chart.tools.add(s)

        return s
      }

      // XML to JSON, adapted from:
      // http://stackoverflow.com/questions/7769829/tool-javascript-to-convert-a-xml-string-to-json

      var xmlToJson = function (xml) {
        var obj = {},
          s

        if (xml.nodeType == 1) {
          if (xml.attributes.length > 0) {
            //obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j)
              //obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
              obj[attribute.nodeName] = attribute.value
            }
          }
        } else if (xml.nodeType == 3) {
          obj = xml.nodeValue
        }
        if (xml.hasChildNodes()) {
          for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i)
            var nodeName = item.nodeName
            if (typeof obj[nodeName] == 'undefined') {
              if (nodeName === '#text')
                if (item.hasChildNodes()) obj[nodeName] = xmlToJson(item)
                else {
                  s = item.nodeValue.trim()
                  if (s !== '') obj = s
                }
              else if (nodeName == 'xml') obj = xmlToJson(item)
              else obj[nodeName] = xmlToJson(item)
            } else {
              if (typeof obj[nodeName].push == 'undefined') {
                var old = obj[nodeName]
                obj[nodeName] = []
                obj[nodeName].push(old)
              }
              obj[nodeName].push(xmlToJson(item))
            }
          }
        }
        return obj
      }

      this.loadXMLDoc = function (url) {
        var xhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
        xhttp.open('GET', url, false)
        xhttp.send()
        return xhttp.responseXML
      }

      this.loadXMLString = function (text) {
        if (window.DOMParser) {
          parser = new DOMParser()
          xmlDoc = parser.parseFromString(text, 'text/xml')
        } // Internet Explorer
        else {
          xmlDoc = new ActiveXObject('Microsoft.XMLDOM')
          xmlDoc.async = false
          xmlDoc.loadXML(text)
        }
        return xmlDoc
      }

      function accumulate(measure, value, total) {
        total.count++

        switch (measure) {
          case 'sum':
          case 'average':
            total.value += value
            break
          case 'high':
            if (total.count == 1 || value > total.value) total.value = value
            break
          case 'low':
            if (total.count == 1 || value < total.value) total.value = value
            break
        }
      }

      this.queryDim = function (m, dim, total) {
        //, masterdim) {

        var lin = m.dimension.getLinksTo(dim),
          //f, f2,
          t,
          tot2

        if (lin) {
          var lin0 = lin[0]

          m.initDims()

          var mfunc = typeof m.name === 'function' ? m.name : null

          m.dimension.traverse(function (o, index) {
            var f = null

            if (!m.name || m.consider(o)) {
              if (dim) {
                if (lin0.field === null && dim == lin0.dimension)
                  if (dim.hasID) f = dim.parent ? dim.data[dim.id] : o[dim.id]
                  else if (dim == m.dimension) f = index || total.length
                  else f = dim.field ? o[dim.field] : index
                else {
                  f = dim.searchAcross(lin, o)
                  if (f && dim.hasID) f = f[dim.id]
                }
              } else {
                f = m.dimension.title
                if (!f) {
                  f = m.dimension.dataset.object
                  if (m.dimension.field) f = f[m.dimension.field]
                }
              }

              if (f !== null && (!dim || dim.nulls || f !== '')) {
                var i = -1,
                  ti,
                  valo = mfunc ? mfunc(o) : m.name ? o[m.name] : o

                if (typeof valo === 'undefined') valo = null
                else {
                  if (typeof valo !== 'number') valo = parseFloat(valo)

                  if (valo !== valo)
                    // NaN
                    valo = null
                }

                //document.write(f[dim.id]+" "+valo+"<br/>");

                if (valo !== null) {
                  if (dim && dim.datetime) f = dim.datePart(f)

                  for (ti = 0; ti < total.length; ti++)
                    if (total[ti].id == f) {
                      i = ti

                      if (total[i].count === 0) {
                        total[i].count = 1
                        total[i].value = valo
                      } else accumulate(m.measure, valo, total[i])

                      break
                    }

                  if (i == -1) total.push({ id: f, value: valo, count: 1 })
                }
              }
            }

            return true
          })

          if (m.measure == 'count')
            for (t = 0; t < total.length; t++) {
              tot2 = total[t]
              tot2.value = tot2.count
            }
          else if (m.measure == 'average')
            for (t = 0; t < total.length; t++) {
              tot2 = total[t]
              if (tot2.count > 0) tot2.value = tot2.value / tot2.count
            }

          return true
        } else return false
      }

      function sumOfCount(total) {
        var res = 0,
          t
        for (t = 0; t < total.length; t++) res += total[t].count
        return res
      }

      function initTotal(total, Ids) {
        if (Ids) {
          var ttt = 0,
            l = Ids.length

          for (ttt = 0; ttt < l; ttt++) total.push({ id: Ids[ttt], value: 0, count: 0 })
        }
      }

      this.query = function (dimension, metric) {
        var m,
          metrics,
          dim,
          dimensions,
          total,
          totals = [],
          mt,
          dimt,
          //ttt,
          oldIds,
          dl,
          dim0

        metrics = metric instanceof Array ? metric : [metric]
        dimensions = dimension instanceof Array ? dimension : [dimension]

        dl = dimensions.length

        if (dl > 0) {
          dim0 = dimensions[0]

          var dim0sel = dim0 ? dim0.selected : null

          oldIds = []

          if (dim0sel) oldIds = dim0sel instanceof Array ? dim0sel : [dim0sel]
          else if (dim0 && (dim0.id || dim0.field)) oldIds = dim0.getIds()
        }

        for (mt = 0; mt < metrics.length; mt++) {
          m = metrics[mt]
          if (!m) continue

          for (dimt = dl - 1; dimt >= 0; dimt--) {
            dim = dimensions[dimt]

            if (dimt > 0) {
              if (!dim) continue

              var old = dim.selected,
                dimValues

              if (old) {
                if (!(old instanceof Array)) old = [old]

                if (dim.selectedInclude) dimValues = old
                else {
                  dimValues = dim.getIds()
                  for (var oldt = 0; oldt < old.length; oldt++) dimValues.splice(dimValues.indexOf(old[oldt]), 1)
                }
              } else dimValues = dim.getIds()

              for (var valt = 0; valt < dimValues.length; valt++) {
                dim.selected = dimValues[valt]

                if (!dim.nulls && dim.selected === '') continue

                total = []
                initTotal(total, oldIds)

                if (this.queryDim(m, dimensions[dimt - 1], total, dim)) {
                  if (dim.nulls || sumOfCount(total) > 0) totals.push({ metric: m, dimension: dim, values: total, master: dim.selected, masterdim: dimensions[dimt - 1] })
                }
              }

              dim.selected = old
              break
            } else {
              total = []
              initTotal(total, oldIds)

              if (this.queryDim(m, dim, total)) totals.push({ metric: m, dimension: dim, values: total, master: null })
            }
          }

          // Eliminate nulls:

          if (dl > 0 && dim0 && !dim0.nulls) {
            var dd,
              ddd = 0,
              res

            while (ddd < totals[0].values.length) {
              res = 0
              for (dd = 0; dd < totals.length; dd++) res += totals[dd].values[ddd].count

              if (res === 0) {
                for (dd = 0; dd < totals.length; dd++) totals[dd].values.splice(ddd, 1)
              } else ddd++
            }
          }
        }

        return totals
      }

      this.Chart = function (canvas, title) {
        var chart = new Tee.Chart(canvas)
        chart.engine = this
        chart.panel.margins.left = 0

        var tip = new Tee.ToolTip(chart)
        tip.render = 'dom'
        chart.tools.add(tip)

        tip.ongettext = function (tip, text, series, index) {
          var s = '',
            la = series.data.labels

          if (series.chart.series.count() > 1) s = '<br/>' + series.title

          if (series.data.x) {
            s += '<br/>' + series.data.x[index]
          }

          return text + ' ' + (la.length > 0 ? la[index] : '') + s
        }

        //chart.axes.each(function() { this.labels.valueFormat="0"; });

        var clickAnimation = new Tee.Animation()

        clickAnimation.onstart = function () {
          this.s.fill = 'yellow'
        }
        clickAnimation.onstop = function () {
          this.s.fill = this.old
        }
        clickAnimation.duration = 100
        clickAnimation.animateHover = function (chart) {
          this.s = chart.series.items[0].hover.stroke
          this.old = this.s.fill
          this.animate(chart)
        }

        chart.title.text = title

        chart.guessStyle = function (total) {
          if (this.defaultStyle) return this.defaultStyle
          else {
            return total.length > 30 ? Tee.Line : Tee.Bar
          }
        }

        chart.newSeries = function (metric, tot) {
          var total = tot.values,
            dimension = tot.dimension,
            masterTitle = tot.master

          if (!tot.masterdim) {
            if (masterTitle && dimension && dimension.id) masterTitle = masterTitle[dimension.id]
            else masterTitle = tot.master || tot.metric.title
          }

          // Add to series

          var SeriesStyle = chart.guessStyle(total),
            b = chart.addSeries(new SeriesStyle()),
            data = b.data

          b.title = '' + (masterTitle || '(none)')
          b.marks.style = 'value'
          b.cursor = 'pointer'

          //b.valueFormat="0";

          data.values = []
          data.labels = []
          data.code = []

          var tot2,
            lc = chart.series.items.length,
            res = [],
            f,
            label,
            t

          if (dimension && dimension.titles) {
            findLinkInDimension(dimension.titles, dimension, res)
          }

          if (lc > 1) {
            var bprev = chart.series.items[lc - 2],
              i,
              bdata = bprev.data

            for (t = 0; t < bdata.values.length; t++) {
              data.values.push(0)
              data.labels.push(bdata.labels[t])
              data.code.push(bdata.code[t])
            }

            for (t = 0; t < total.length; t++) {
              tot2 = total[t]
              i = bdata.code.indexOf(tot2.id)

              if (i == -1) {
                data.values.push(tot2.value)

                if (dimension && dimension.titles) {
                  f = dimension.searchAcross(res, tot2.id)
                  if (f) label = f[dimension.titles.id]
                  else label = ''
                } else label = tot2.id[dimension.id]

                data.labels.push(label)
                data.code.push(tot2.id)
              } else data.values[i] = tot2.value
            }
          } else {
            //var labeldim=dimension;
            //hasDim=(!tot.masterdim) && labeldim && labeldim.hasID;

            for (t = 0; t < total.length; t++) {
              tot2 = total[t]
              data.values.push(tot2.value)

              if (dimension && dimension.titles) {
                f = dimension.searchAcross(res, tot2.id)
                if (f) label = f[dimension.titles.id]
                else label = ''
              } else label = '' + tot2.id // (hasDim ? tot2.id[labeldim.id] : tot2.id);

              data.labels.push(label)
              data.code.push(tot2.id)
            }
          }

          if (SeriesStyle == Tee.CircularGauge) b.setValue(b.data.values[0])

          if (this.onnewseries) this.onnewseries(this, b)

          return b
        }

        chart.defaultStyle = null
        chart.animateChanges = false

        // Changes all series to style.
        // style can be a string of function from: Tee.Bar, Tee.Line, Tee.Pie, etc.

        chart.setSeriesStyle = function (style) {
          if (!style || style === '' || style === 'auto') {
            this.defaultStyle = null
            return
          }

          var s = this.series,
            newS,
            data,
            St

          if (typeof style === 'string') {
            St = eval(style)
          } else St = style

          this.defaultStyle = St

          for (var t = 0; t < s.items.length; t++) {
            data = s.items[t].data
            newS = new St()

            newS.setChart(newS, this) // addSeries ?
            newS.format.fill = s.items[t].format.fill

            newS.data = data
            s.items[t] = newS
          }

          this.draw()
        }

        // Creates a query based on dimension and metric, and adds the resulting
        // data to chart.
        // When dontRedraw = true, the chart will not be repainted.

        chart.fill = function (dimension, metric, dontRedraw) {
          this.fillQuery(this.engine.query(dimension, metric), dimension, metric, dontRedraw)
        }

        chart.fillQuery = function (totals, dimension, metric, dontRedraw) {
          var t,
            tot,
            m,
            old = chart.series.items

          chart.series.items = []

          if (totals) {
            for (t = 0; t < totals.length; t++) {
              tot = totals[t]
              m = tot.metric

              this.newSeries(m, tot).onclick = chart.engine._onclickseries

              if (chart.title.text === '' || typeof chart.title.text === 'undefined') chart.title.text = m.dimension.title

              if (!(metric instanceof Array)) {
                chart.legend.title.text = m.title + '\n' + m.measure
                chart.legend.title.format.font.textAlign = 'right'
              }

              var dim2 = dimension instanceof Array ? dimension[0] : dimension

              if (dim2 && dim2 != m.dataset) {
                chart.axes.bottom.title.text = dim2.datetime ? dim2.title + ' ' + dim2.dateKeys[dim2.datetime.selected] : dim2.title
              }
            }

            if (totals.length > 0) chart.axes.left.title.text = totals[0].metric.title
          }

          //chart.axes.bottom.title.text=dimension.title;

          var sort = this.sort

          if (sort.sortBy !== '') this.sortData(sort.sortBy, sort.order === 'ascending')

          if (sort.series !== '') this.sortSeries(sort.series == 'ascending')

          if (chart.animateChanges)
            if (old.length == chart.series.items.length) {
              var ss = chart.series.items[0],
                ssvalues = ss.data.values

              if (old[0].prototype == ss.prototype) {
                if (old[0].data.values.length == ssvalues.length) {
                  var newValues = ssvalues.slice(0),
                    val

                  var a = new Tee.Animation(chart, function (step) {
                    for (var t = 0; t < ssvalues.length; t++) {
                      val = old[0].data.values[t]
                      ssvalues[t] = val + (newValues[t] - val) * step
                    }
                  })

                  var oldauto = chart.axes.left.automatic
                  chart.axes.left.automatic = false

                  a.duration = 150
                  a.animate()

                  chart.axes.left.automatic = oldauto
                }
              }
            }

          if (!dontRedraw) chart.draw()
        }

        this.applyStyle(chart, 0)

        chart.animateClick = function () {
          clickAnimation.animateHover(chart)
        }

        this.onclickseries = null

        this._onclickseries = function (series, index) {
          var c = series.chart

          if (c.onclickseries) {
            c.animateClick()
            c.onclickseries(series, index)
          }
        }

        // Changes series items colors, setting "silver" to disabled ones.

        chart.setSeriesPalette = function (series, dimension) {
          var p = series.palette,
            l = series.count(),
            c = series.data.code,
            o
          p.colors = new Array(l)

          for (var t = 0; t < l; t++) {
            o = c[t]

            if (!dimension.isSelected(o)) p.colors[t] = 'silver'
          }
        }

        function totalOf(items, index) {
          var res = 0,
            tt
          for (tt = 0; tt < items.length; tt++) res += items[tt].data.values[index]
          return res
        }

        // Reorders all series points, using output order from the first series.
        // sortBy can be "values" or "labels"

        chart.sortData = function (sortBy, ascending) {
          var sorted,
            l = this.series.count(),
            s0 = this.series.items[0]

          if (l > 0) {
            if (l > 1 && sortBy == 'values') {
              var d = s0.data.values,
                len = d.length,
                t,
                items = this.series.items

              sorted = new Array(len)

              for (t = 0; t < len; t++) sorted[t] = t

              sorted.sort(function (a, b) {
                var ta = totalOf(items, a),
                  tb = totalOf(items, b)
                return ascending ? ta - tb : tb - ta
              })
            } else sorted = this.series.items[0].doSort(sortBy, ascending)

            this.series.each(function (s) {
              var data2 = { values: [], labels: [], code: [] },
                data = s.data,
                tt

              for (var t = 0; t < data.values.length; t++) {
                tt = sorted[t]
                data2.values.push(data.values[tt])
                data2.labels.push(data.labels[tt])
                data2.code.push(data.code[tt])
              }

              s.data = data2
            })
          }
        }

        // Re-orders all series in chart, based on series "title" text:

        chart.sortSeries = function (ascending) {
          var i = this.series.items,
            len = i.length

          if (len < 2) return

          var sorted = new Array(len),
            A,
            B,
            before = ascending ? -1 : 1,
            after = ascending ? 1 : -1,
            t

          for (t = 0; t < len; t++) sorted[t] = t

          sorted.sort(function (a, b) {
            A = i[a].title.toLowerCase()
            B = i[b].title.toLowerCase()
            return A < B ? before : A == B ? 0 : after
          })

          var newList = new Array(len)
          for (t = 0; t < len; t++) newList[t] = i[sorted[t]]

          this.series.items = newList
        }

        // For all series in chart, groups small values into an "Other" item.

        chart.groupOther = function (maxValues) {
          this.series.each(function (series) {
            var l = Engine.groupOther(series.data, maxValues, 'Other')
            if (l > -1) {
              series.data.code[l] = null
              series.data.code.splice(0, l)
            }
          })
        }

        chart.totalPoints = function () {
          var res = 0
          this.series.each(function (s) {
            res += s.data.values.length
          })
          return res
        }

        // "sortBy" can be: 'values' or 'labels' or '' (empty)

        chart.sort = { sortBy: '', order: 'descending', series: 'ascending' }

        chart.setPositionPercent = function (left, top, width, height) {
          function getParentWidth() {
            if (self.innerHeight) return self.innerWidth
            else if (document.documentElement && document.documentElement.clientHeight) return document.documentElement.clientWidth
            else if (document.body) return document.body.clientWidth
            else return 0
          }

          function getParentHeight() {
            if (self.innerHeight) return self.innerHeight
            else if (document.documentElement && document.documentElement.clientHeight) return document.documentElement.clientHeight
            else if (document.body) return document.body.clientHeight
            else return 0
          }

          var h = getParentHeight(),
            w = getParentWidth(),
            c = this.canvas,
            x = left * w * 0.01,
            y = top * h * 0.01

          width *= w * 0.01
          height *= h * 0.01

          width = width | 0
          height = height | 0

          c.style.position = 'absolute'
          c.style.left = x + 'px'
          c.style.top = y + 'px'
          c.style.width = width + 'px'
          c.style.height = height + 'px'

          c.setAttribute('width', width)
          c.setAttribute('height', height)

          this.bounds.width = width
          this.bounds.height = height
          this.draw()
        }

        if (Tee.SeriesAnimation) {
          var anim = (chart.animation = new Tee.SeriesAnimation(chart))
          anim.kind = 'zoomin'
          anim.duration = 300

          var fade = new Tee.FadeAnimation(chart)
          fade.fade.series = true
          anim.items.push(fade)
        }

        return chart
      }
    }

    /**
     * @constructor
     * @class Class to represent dimension data suitable to measure.
     * @param {Tee.Data.Dimension} dimension The parent dimension that owns this metric.
     * @param {String} title The string that identifies this metric.
     * @param {String} [name=""] The optional field string to obtain values to measure from dimension items.
     */
    Tee.Data.Metric = function (dimension, title, name) {
      this.name = name
      this.title = title || name
      this.dimension = dimension

      var dataset = (this.dataset = dimension.dataset),
        engine = dataset.engine

      this.measure = 'sum' // average, high, low, count

      this.initDims = function () {
        var t,
          l = engine.datasets.length,
          tt,
          d,
          ld,
          dd,
          dim = this.dimension

        this.allDims = []

        for (t = 0; t < l; t++) {
          d = engine.datasets[t].dimensions
          ld = d.length

          for (tt = 0; tt < ld; tt++) {
            dd = d[tt]

            if (dim != dd)
              if (!dim.hasParent(dd)) {
                if (dd.anySelected()) {
                  if (dd.dataset == dim.dataset) dd._link = null
                  else dd._link = dim.getLinksTo(dd)

                  this.allDims.push(dd)
                }
              }
          }
        }
      }

      this.consider = function (data) {
        var t,
          li = this.allDims.length,
          d,
          f //, d2;

        for (t = 0; t < li; t++) {
          d = this.allDims[t]

          if (d._link) {
            f = data //d.id ? data[id] : data;

            for (var links = 0; links < d._link.length; links++) {
              f = d.search(d._link[links], f)
            }

            if (f && d.id) f = f[d.id]
          } else f = data[d.field]

          //if (!f) return false;

          if (typeof f === 'undefined' || f === null) return false

          if (d.datetime) f = d.datePart(f)

          if (!d.inSelected(f)) return false
        }

        return true
      }
    }

    /**
     * @constructor
     * @class Class to represent a Dimension of data.
     * @param {String} title The string identifier for this dimension.
     * @param {String} field The field string to obtain dimension child items.
     * @param {String} [id=""] The optional field string to obtain unique identifiers for dimension child items.
     */
    Tee.Data.Dimension = function (title, field, id) {
      this.dataset = null
      this.parent = null

      this.engine = null

      this.subDimensions = []

      this.field = field
      this.id = id
      this.title = title || field

      this.nulls = true

      this.hasID = typeof id !== 'undefined' && id !== null && id !== ''

      this.metrics = []
      this.links = []

      this.selected = null
      this.select = null
      this.selectedInclude = true

      this.dateKeys = { c: 'Century', x: 'Decade', y: 'Year', m: 'Month', w: 'Weekday', d: 'Day' }

      /**
       * @returns {Tee.Data.Dimension} Creates and returns a new child dimension.
       * @param {String} title The string identifier for this dimension.
       * @param {String} field The field string to obtain dimension child items.
       * @param {String} [id=""] The optional field string to obtain unique identifiers for dimension child items.
       */
      this.addDimension = function (title, field, id) {
        return this.addSubDimension(this, title, field, id)
      }

      this.addSubDimension = function (parent, title, field, id) {
        var d = new Tee.Data.Dimension(title, field, id)

        d.engine = this.engine
        d.parent = parent

        if (parent) {
          d.dataset = parent.dataset

          if (d.dataset) d.index = d.dataset.dimensions.push(d)

          parent.subDimensions.push(d)
        }

        return d
      }

      /**
       * @returns {Tee.Data.Metric} Creates and returns a new metric for this dimension.
       * @param {String} title The string identifier for this metric.
       * @param {String} name The field string to obtain metric values from parent dimension items.
       * @param {String} [measure="sum"] The optional measure style for this metric.
       */
      this.addMetric = function (title, name, measure) {
        var r = new Tee.Data.Metric(this, title, name)

        if (measure) r.measure = measure

        this.metrics.push(r)
        return r
      }

      /**
  * @returns {object} Creates and returns a new link object that knows how to get
    from this origin dimension to destination {dimension} parameter.
  * @param {String|Array} field The string field(s) identifier(s) for this origin dimension.
  * @param {Tee.Data.Dimension} dimension The destination dimension.
  * @param {String|Array} datasetField The string field(s) identifier(s) for the destination dimension.
  */
      this.addLink = function (field, dimension, datasetField) {
        var l = { field: field, dimension: dimension, datasetField: datasetField, parent: this }
        this.links.push(l)
        return l
      }

      /**
       * @returns {boolean} Returns true when this dimension has {dimension} parameter as parent in the hierarchy.
       * @param {Tee.Data.Dimension} dimension The dimension to test as parent.
       */
      this.hasParent = function (dimension) {
        var d = this.parent
        while (d)
          if (d == dimension) return true
          else d = d.parent

        return false
      }

      /**
       * @returns {boolean} Returns true when data is a value of the current selected filter.
       * @param {object} data The value to check for.
       */
      this.inSelected = function (data) {
        //if (this.datetime) data=this.datePart(data);

        if (this.select) return this.select(data)
        else if (this.selected instanceof Array)
          //for (var tt=0; tt<this.selected.length; tt++)
          //  if (this.selected[tt]==data)
          //      return true;
          return this.selectedInclude ? this.selected.indexOf(data) != -1 : this.selected.indexOf(data) == -1
        else return this.selectedInclude ? this.selected == data : this.selected != data
      }

      /**
       * @returns {object} Search for an item with {id} as identifier and return it.
       * @param {object} id The identifier value to search for.
       */
      this.get = function (id) {
        var t = this.id,
          data,
          date = this.datetime,
          _this = this

        this.traverse(function (o) {
          if (date) o = _this.datePart(o)

          if (id == (t ? o[t] : o)) {
            data = o
            return false
          } else return true
        })

        return data
      }

      function trunc(value) {
        return value | 0
      }

      /**
       * @returns {Number} Returns the currently selected part of {date} parameter.
       * @param {Date} date The Date value.
       */
      this.datePart = function (date) {
        var da = this.datetime,
          s = da.selected

        if (typeof date == 'string') {
          var parts = date.match(/(\d+)/g)

          if (s == 'y') return parts[da.yearField || 2]
          else if (s == 'm') return parts[da.monthField || 0]
          else if (s == 'x') return 10 * trunc(parseInt(parts[2], 10) / 10)
          else if (s == 'd') return parts[da.dayField || 1]
          else if (s == 'w') return new Date(date).getDay()
        } else if (date instanceof Date) {
          if (s == 'y') return date.getFullYear()
          else if (s == 'm') return date.getMonth() + 1
          else if (s == 'x') return 10 * trunc(date.getFullYear() / 10)
          else if (s == 'd') return date.getDate()
          else if (s == 'w') return date.getDay()
        }

        return date
      }

      // Traverse dataset and return all object values for this Dimension:
      this.getValues = function () {
        var r = [],
          f = this.field,
          id = this.id,
          _this = this

        this.traverse(function (value) {
          if (id) value = f ? value[f] : value[id]

          if (_this.datetime) value = _this.datePart(value)

          if (r.indexOf(value) == -1) r.push(value)
          return true
        })

        return r
      }

      // Traverse dataset and return all unique "id" values for this Dimension:
      this.getIds = function () {
        var r = [],
          f,
          //d = this.dataset.object,
          //i=d.length, t,

          id = this.id,
          field = this.field,
          _this = this,
          p = this.parent ? this.parent : this

        p.traverse(function (value) {
          f = id ? value[id] : field ? value[field] : value
          if (_this.datetime) f = _this.datePart(f)

          if (_this.nulls || f) if (r.indexOf(f) == -1) r.push(f)

          return true
        })

        return r
      }

      /**
       * @returns {boolean} Returns true when {data} parameter is in the currently selected list.
       * @param {object} data The value to search.
       */
      this.isSelected = function (data) {
        if (this.select) return this.select(data)
        else if (this.selected) return this.inSelected(data)
        else return true
      }

      /**
       * @returns {boolean} Returns true when selected filter is not empty.
       */
      this.anySelected = function () {
        if (this.select) return true
        else {
          var s = this.selected

          if (s !== null && typeof s != 'undefined')
            if (s instanceof Array)
              for (var t = 0; t < s.length; t++) {
                if (s[t]) return true
              }
            else return true

          return false
        }
      }

      /**
       * Selects or unselects a given series index point value.
       * @param {Tee.Series} series The series to toggle its index point format.
       */
      this.toggleSelected = function (series, index) {
        if (!this.selected) this.selected = []

        var code = series.data.code[index]

        //if (this.id) code=code[this.id];

        var i = this.selected.indexOf(code)

        if (i === -1) this.selected.push(code)
        else {
          this.selected.splice(i, 1)
          if (this.selected.length === 0) this.selected = null
        }

        series.chart.setSeriesPalette(series, this)
      }

      /**
       * Traverses all items belonging to this dimension and calls the process function for each item.
       * @param {function} process The function that will get called for each item in the dimension.
       */
      this.traverse = function (process) {
        function traverseLevel(dataset, levelIndex) {
          function doProcess(da2, t2) {
            var tt, o3, kk

            if (da2 && typeof da2 === 'object') {
              // Traverse all "da2" object properties:
              // { A:123, B:456, C:789, D:....  }

              var k = Object.keys(da2),
                kl = k.length,
                lev2 = levels[0],
                hasSelected2 = lev2.anySelected()

              for (tt = 0; tt < kl; tt++) {
                kk = k[tt]

                if (!hasSelected2 || lev2.isSelected(kk)) {
                  o3 = da2[kk]
                  lev2.data = o3

                  if (!process(o3, kk)) return false
                }
              }

              return true
            } else return process(da2, t2)
          }

          var t,
            ml,
            lev = levels[levelIndex],
            hasSelected = lev.anySelected(),
            da = lev.field ? dataset[lev.field] : dataset,
            daSel = lev.parent ? dataset : da

          if (!hasSelected || lev.isSelected(lev.id ? daSel[lev.id] : daSel)) {
            lev.data = daSel

            if (da instanceof Array) {
              ml = da.length

              if (levelIndex > 0)
                for (t = 0; t < ml; t++) {
                  if (!traverseLevel(da[t], levelIndex - 1)) return false
                }
              else
                for (t = 0; t < ml; t++) {
                  if (!process(da[t], t)) return false
                }
            } else if (levelIndex > 0) {
              if (!doProcess(da)) return false
            } else if (!process(daSel)) return false
          }

          return true
        }

        var levels = [],
          di = this

        do {
          levels.push(di)
        } while ((di = di.parent))

        var o = this.dataset.object
        if (o) traverseLevel(o, levels.length - 1)
      }

      this.searchAcross = function (lin, o) {
        var f = o,
          tmp = this

        for (var links = 0; links < lin.length; links++) {
          f = tmp.search(lin[links], f, links > 0)

          if (links < lin.length - 1) {
            tmp = lin[links + 1].parent
            lin[links + 1].searchDimension = tmp
          }
        }

        if (f && this.engine.cache) {
          if (!o.cache) o.cache = []

          if (!o.cache[this.index]) o.cache[this.index] = f
        }

        return f
      }

      this.search = function (link, data, inverted) {
        if (data.cache && data.cache[this.index]) return data.cache[this.index]

        var f = null, // _this=this,
          values,
          ld,
          t,
          linkSearch = link.search,
          linkField = inverted ? link.field : link.datasetField,
          linkValues = inverted ? link.datasetField : link.field,
          isArray = linkValues instanceof Array

        if (isArray) {
          values = []

          for (t = 0; t < linkValues.length; t++) values.push(data[linkValues[t]])
        } else values = data[linkValues]

        ld = link.searchDimension || link.dimension

        do {
          ld.traverse(function (o) {
            if (linkSearch) {
              if (linkSearch(o, data)) {
                f = o
                return false
              }
            } else if (isArray) {
              var result = true

              for (t = 0; t < values.length; t++) {
                if (o[linkField[t]] !== values[t]) {
                  result = false
                  break
                }
              }

              if (result) {
                f = o
                return false
              }
            } else if (o[linkField] == values) {
              f = o
              return false
            }

            return true
          })

          if (!f) break
          else if (ld.dataset !== this.dataset) return f
          else if (ld !== this) {
            if (ld.parent) {
              ld = ld.parent
              f = ld.data
            } else break
          }
        } while (ld !== this)

        return f ? (this.id ? f : f[this.field]) : null
      }

      this.getLinksTo = function (dimension) {
        if (!dimension || dimension == this.dataset || dimension.dataset == this.dataset) return [{ field: null, dimension: dimension, datasetField: null, parent: this }]
        else {
          var res = [],
            d = findLinkInDimension(dimension, this, res)

          if (!d) d = findLinkInDimension(this, dimension, res)

          return d ? res : null
        }
      }
    }

    function findLinkInDimension(needle, haystack, res) {
      var d,
        t,
        _this = haystack,
        li,
        lil,
        need,
        r

      do {
        li = _this.links

        if (li) {
          lil = li.length
          for (t = 0; t < lil; t++) {
            d = li[t].dimension
            do {
              need = needle

              do {
                if (d == need) {
                  li[t].searchDimension = li[t].dimension
                  res.push(li[t])
                  return li[t]
                }
              } while ((need = need.parent))

              r = findLinkInDimension(needle, d, res)

              if (r) {
                res.unshift(li[t])
                return r
              } else {
                r = findLinkInDimension(d, needle, res)
                if (r) {
                  res.unshift(li[t])
                  return r
                }
              }
            } while ((d = d.parent))
          }
        }
      } while ((_this = _this.parent))

      li = haystack.subDimensions

      for (t = 0; t < li.length; t++) {
        r = findLinkInDimension(needle, li[t], res)
        if (r) return r
      }

      return null
    }
  }).call(this)

  /** END DATA */

  /** EDITOR */

  /**
   * @preserve TeeChart(tm) for JavaScript(tm)
   * @fileOverview TeeChart for JavaScript(tm)
   * v2.4 Feb 2018
   * Copyright(c) 2012-2017 by Steema Software SL. All Rights Reserved.
   * http://www.steema.com
   *
   * Licensed with commercial and non-commercial attributes,
   * specifically: http://www.steema.com/licensing/html5
   *
   * JavaScript is a trademark of Oracle Corporation.
   */

  /**
   * @author <a href="mailto:david@steema.com">Steema Software</a>
   * @version 2.4
   */
  ;('use strict')

  function FormatEditor(parent, format, id, showFont) {
    var s =
      '<div id="' +
      id +
      '" width="130">\
  <ul>\
    <li><a href="#ftabs-1">Fill</a></li>\
    <li><a href="#ftabs-2">Stroke</a></li>'

    if (showFont) s += '<li><a href="#ftabs-3">Font</a></li>'

    s +=
      '<li><a href="#ftabs-4">Gradient</a></li>\
      <li><a href="#ftabs-5">Shadow</a></li>\
      <li><a href="#ftabs-6">Image</a></li>\
  </ul>\
  <div id="ftabs-1">\
        Fill:\
        <input type="text" size="16" id="' +
      id +
      'ffill">\
          <div id="color_box">\
            <div id="' +
      id +
      'color_display" style="position: relative; left: 5px; width: 15px; height: 15px; cursor: pointer; border: 2px solid #000;">\
            </div>\
            <div id="' +
      id +
      'color_picker" style="display:none"></div>\
          </div>\
        </BR>\
        Transparency %:\
        <div id="ftransp" style="width=150px;"></div>\
  </div>\
  <div id="ftabs-2">\
        Stroke:\
        <input type="text" size="16" id="' +
      id +
      'fstroke">\
        <div id="' +
      id +
      'fstrokesize"></div>'

    if (showFont)
      s +=
        'Horiz Round:</br><div id="' +
        id +
        'fstrokeroundx"></div>\
        Vert Round:</br><div id="' +
        id +
        'fstrokeroundy"></div>'

    s +=
      'Join:\
        <select id="' +
      id +
      'fstroke_join">\
          <option value="round">Round</option>\
          <option value="miter">Miter</option>\
          <option value="bevel">Bevel</option>\
        </select>\
        Cap:\
        <select id="' +
      id +
      'fstroke_cap">\
          <option value="round">Round</option>\
          <option value="butt">Butt</option>\
          <option value="square">Square</option>\
        </select>\
  </div>'

    if (showFont)
      s +=
        '<div id="ftabs-3" style="display:' +
        showFont +
        '">\
        <input type="text" size="46" id="' +
        id +
        'ffontstyle">\
        <div id="' +
        id +
        'ffontsize"></div>\
        <div id="' +
        id +
        'ffontformat"></div>\
        </div>'

    s +=
      '<div id="ftabs-4">\
        <input type="checkbox" id="' +
      id +
      'fgradient" checked>Visible\
        Direction:</br>\
        <select id="' +
      id +
      'fgradient_direction">\
          <option value="topbottom">Top Bottom</option>\
          <option value="leftright">Left Right</option>\
          <option value="bottomtop" selected>Bottom Top</option>\
          <option value="rightleft">Right Left</option>\
          <option value="radial">Radial</option>\
          <option value="diagonalup">Diagonal Up</option>\
          <option value="diagonaldown">Diagonal Down</option>\
        </select>\
        Balance:\
        <div id="' +
      id +
      'fgradient_balance" style="width=150px;"></div>\
  </div>\
  <div id="ftabs-5">\
        <input type="checkbox" id="' +
      id +
      'fshadow">Visible</br>\
        Color:\
        <input type="text" size="16" id="' +
      id +
      'fshadowcolor">\
        <span>Width:</span>&nbsp;&nbsp;<div id="' +
      id +
      'fshadow_width" style="width=150px;"></div>\
        <span>Height:</span>&nbsp;&nbsp;<div id="' +
      id +
      'fshadow_height" style="width=150px;"></div>\
        <span>Blur:</span>&nbsp;&nbsp;<div id="' +
      id +
      'fshadow_blur" style="width=150px;"></div>\
  </div>\
  <div id="ftabs-6">\
  </div>\
  </div>'

    parent.innerHTML = s

    if (showFont) new FormatEditor(document.getElementById(id + 'ffontformat'), format.font, id + 'fontformat', false)

    id = '#' + id

    $(id).tabs()

    $(id + 'ffill')
      .val(format.fill)
      .keyup(function () {
        format.fill = this.value
        format.chart.draw()
      })
    $(id + 'fstroke')
      .val(format.stroke.fill)
      .keyup(function () {
        format.stroke.fill = this.value
        format.chart.draw()
      })
    $(id + 'fstrokesize').slider({
      value: format.stroke.size,
      slide: function (event, ui) {
        format.stroke.size = ui.value
        format.chart.draw()
      }
    })

    if (showFont) {
      $(id + 'fstrokeroundx').slider({
        value: format.round.x,
        slide: function (event, ui) {
          format.round.x = ui.value
          format.chart.draw()
        }
      })
      $(id + 'fstrokeroundy').slider({
        value: format.round.y,
        slide: function (event, ui) {
          format.round.y = ui.value
          format.chart.draw()
        }
      })
    }

    $(id + 'fstroke_join')
      .val(format.stroke.join)
      .change(function () {
        format.stroke.join = this.value
        format.chart.draw()
      })
    $(id + 'fstroke_cap')
      .val(format.stroke.cap)
      .change(function () {
        format.stroke.cap = this.value
        format.chart.draw()
      })

    $(id + 'fgradient')
      .attr('checked', format.gradient.visible)
      .click(function () {
        format.gradient.visible = this.checked
        format.chart.draw()
      })
    $(id + 'fgradient_direction')
      .val(format.gradient.direction)
      .change(function () {
        format.gradient.direction = this.value
        format.chart.draw()
      })

    $(id + 'fshadow')
      .attr('checked', format.shadow.visible)
      .click(function () {
        format.shadow.visible = this.checked
        format.chart.draw()
      })
    $(id + 'fshadowcolor')
      .val(format.shadow.color)
      .keyup(function () {
        format.shadow.color = this.value
        format.chart.draw()
      })
    $(id + 'fshadow_width').slider({
      value: format.shadow.width,
      min: -100,
      slide: function (event, ui) {
        format.shadow.width = ui.value
        format.chart.draw()
      }
    })
    $(id + 'fshadow_height').slider({
      value: format.shadow.height,
      min: -100,
      slide: function (event, ui) {
        format.shadow.height = ui.value
        format.chart.draw()
      }
    })
    $(id + 'fshadow_blur').slider({
      value: format.shadow.blur,
      max: 32,
      slide: function (event, ui) {
        format.shadow.blur = ui.value
        format.chart.draw()
      }
    })
    $(id + 'ftransp').slider({
      value: format.transparency,
      slide: function (event, ui) {
        format.transparency = ui.value
        format.chart.draw()
      }
    })
    $(id + 'fgradient_balance').slider({
      value: format.gradient.balance,
      slide: function (event, ui) {
        format.gradient.balance = ui.value * 0.01
        format.chart.draw()
      }
    })

    if (showFont) {
      $(id + 'ffontstyle')
        .val(format.font.style)
        .keyup(function () {
          format.font.style = this.value
          format.chart.draw()
        })
      $(id + 'ffontsize').slider({
        value: format.font.getSize(),
        slide: function (event, ui) {
          format.font.setSize(ui.value)
          format.chart.draw()
        }
      })
    }

    function colorChosen(color) {
      $(id + 'color_display').css('background', color)
      format.fill = color
      format.chart.draw()
    }

    $(id + 'color_picker').farbtastic({ callback: colorChosen, width: 150 })

    $(id + 'color_picker').dialog({
      autoOpen: false,
      modal: false
    })

    $(id + 'color_display').click(function (e) {
      $(id + 'color_picker').dialog('open') //slideToggle('fast');
    })
  }

  function AxisEditor(parent, axis, id) {
    var s =
      '<div id="' +
      id +
      '" width="130">\
  <ul>\
    <li><a href="#atabs-1">Axis</a></li>\
    <li><a href="#atabs-2">Labels</a></li>\
    <li><a href="#atabs-3">Grid</a></li>\
    <li><a href="#atabs-4">Ticks</a></li>\
  </ul>\
  <div id="atabs-1">\
    <input type="checkbox" id="' +
      id +
      '_visible">Visible\
    <input type="checkbox" id="' +
      id +
      '_inverted">Inverted\
    <input type="checkbox" id="' +
      id +
      '_auto">Automatic\
  </div>\
  <div id="atabs-2">\
    <input type="checkbox" id="' +
      id +
      'labels_visible">Visible\
    <div id="' +
      id +
      'labels-format"></div>\
  </div>\
  <div id="atabs-3">\
    <input type="checkbox" id="' +
      id +
      'grid_visible">Visible\
    <div id="' +
      id +
      'grid-format"></div>\
  </div>\
  <div id="atabs-4">\
    <input type="checkbox" id="' +
      id +
      'ticks_visible">Visible\
        Color:\
        <input type="text" size="16" id="' +
      id +
      'ticksstroke">\
        <div id="' +
      id +
      'tickslength"></div>\
        <div id="' +
      id +
      'tickssize"></div>\
        Join:\
        <select id="' +
      id +
      'ticks_join">\
          <option value="round">Round</option>\
          <option value="miter">Miter</option>\
          <option value="bevel">Bevel</option>\
        </select>\
        Cap:\
        <select id="' +
      id +
      'ticks_cap">\
          <option value="round">Round</option>\
          <option value="butt">Butt</option>\
          <option value="square">Square</option>\
        </select>\
  </div>\
  </div>'

    parent.innerHTML = s

    new FormatEditor(document.getElementById(id + 'labels-format'), axis.labels.format, id + 'labelsformat', true)
    new FormatEditor(document.getElementById(id + 'grid-format'), axis.grid.format, id + 'gridformat', false)

    id = '#' + id

    $(id).tabs()
    $(id + '_visible')
      .attr('checked', axis.visible)
      .click(function () {
        axis.visible = this.checked
        axis.chart.draw()
      })
    $(id + '_inverted')
      .attr('checked', axis.inverted)
      .click(function () {
        axis.inverted = this.checked
        axis.chart.draw()
      })
    $(id + '_auto')
      .attr('checked', axis.automatic)
      .click(function () {
        axis.automatic = this.checked
        axis.chart.draw()
      })
    $(id + 'labels_visible')
      .attr('checked', axis.labels.visible)
      .click(function () {
        axis.labels.visible = this.checked
        axis.chart.draw()
      })
    $(id + 'grid_visible')
      .attr('checked', axis.grid.visible)
      .click(function () {
        axis.grid.visible = this.checked
        axis.chart.draw()
      })
    $(id + 'ticks_visible')
      .attr('checked', axis.ticks.visible)
      .click(function () {
        axis.ticks.visible = this.checked
        axis.chart.draw()
      })

    $(id + 'ticks_join')
      .val(axis.ticks.stroke.join)
      .change(function () {
        axis.ticks.stroke.join = this.value
        axis.chart.draw()
      })
    $(id + 'ticks_cap')
      .val(axis.ticks.stroke.cap)
      .change(function () {
        axis.ticks.stroke.cap = this.value
        axis.chart.draw()
      })
    $(id + 'ticksstroke')
      .val(axis.ticks.stroke.fill)
      .keyup(function () {
        axis.ticks.stroke.fill = this.value
        axis.chart.draw()
      })
    $(id + 'tickslength').slider({
      value: axis.ticks.length,
      slide: function (event, ui) {
        axis.ticks.length = ui.value
        axis.chart.draw()
      }
    })
    $(id + 'tickssize').slider({
      value: axis.ticks.stroke.size,
      slide: function (event, ui) {
        axis.ticks.stroke.size = ui.value
        axis.chart.draw()
      }
    })
  }

  function ChartEditor(parent, chart) {
    if (!(parent instanceof HTMLElement)) parent = document.getElementById(parent)

    this.chart = chart

    function seriesItems() {
      var s = "'"
      var len = chart.series.items.length
      for (var t = 0; t < len; t++) s = s + '<option ' + (t == 0 ? 'selected' : '') + '>' + chart.series.items[t].title + '</option>'
      return s + "'"
    }

    parent.innerHTML =
      '<div id="tabs" width="130">\
  <ul>\
    <li><a href="#tabs-1">Series</a></li>\
    <li><a href="#tabs-2">Axes</a></li>\
    <li><a href="#tabs-3">Panel</a></li>\
    <li><a href="#tabs-4">Walls</a></li>\
    <li><a href="#tabs-5">Legend</a></li>\
    <li><a href="#tabs-6">Aspect</a></li>\
    <li><a href="#tabs-7">Titles</a></li>\
    <li><a href="#tabs-8">Touch</a></li>\
  </ul>\
  <div id="tabs-1">\
        <div style="float:left; width:20%;">\
        <select size="5" style="width:100px; height:20%">' +
      seriesItems() +
      '</select>\
        </div>\
        <div id="seriestabs" style="float:right; width:70%;">\
          <ul>\
            <li><a href="#series-formattab">Format</a></li>\
            <li><a href="#series-marks">Marks</a></li>\
            <li><a href="#series-general">General</a></li>\
          </ul>\
          <div id="series-formattab">\
            <input type="checkbox" id="series_visible">Visible\
            Color Each:\
            <select id="series_coloreach">\
              <option value="auto">Automatic</option>\
              <option value="yes">Yes</option>\
              <option value="no">No</option>\
            </select>\
            </br>Transparency %:\
            <div id="series_transp" style="width=150px;"></div></br>\
            <div id="series-format"></div>\
          </div>\
          <div id="series-marks">\
            <input type="checkbox" id="series_marks">Marks\
            <div id="series-marks-format"></div>\
          </div>\
          <div id="series-general">\
            Mouse Cursor:</br>\
            <select id="series_cursor" onchange="chart.series.items[0].cursor= document.getElementById(\'series_cursor\').value;">\
              <option value="default">Default</option>\
              <option value="pointer">Pointer</option>\
              <option value="crosshair">Crosshair</option>\
            </select>\
            </br>\
          </div>\
        </div>\
  </div>\
  <div id="tabs-2">\
        <input type="checkbox" id="axes_visible">Visible\
        </BR>\
        <div id="axistabs" width="130">\
          <ul>\
            <li><a href="#axis-left">Left</a></li>\
            <li><a href="#axis-bottom">Bottom</a></li>\
            <li><a href="#axis-right">Right</a></li>\
            <li><a href="#axis-top">Top</a></li>\
          </ul>\
          <div id="axis-left"></div>\
          <div id="axis-bottom"></div>\
          <div id="axis-right"></div>\
          <div id="axis-top"></div>\
        </div>\
  </div>\
  <div id="tabs-3">\
        <div id="panel-format"></div>\
        <input type="checkbox" id="panel_transp">Transparent\
        </br>\
        Bottom margin %:\
        <div id="margin_bottom" style="width:50px; float: left;"></div>\
        Left margin %:\
        <div id="margin_left" style="width:50px; float: left;"></div>\
        \
  </div>\
  <div id="tabs-4">\
        <input type="checkbox" id="walls_visible">Visible</BR>\
        <div id="backwall-format"></div>\
    \
  </div>\
  <div id="tabs-5">\
        <div style="float:left; width:20%;">\
          <input type="checkbox" id="legend_visible">Visible\
          <input type="checkbox" id="legend_inverted">Inverted</BR>\
          Legend style:</br>\
          <select id="legend_style">\
            <option value="auto">Auto</option>\
            <option value="series">Series</option>\
            <option value="values">Values</option>\
          </select>\
          </br>\
          Text style:</br>\
          <select id="legend_textstyle">\
            <option value="auto" selected>Auto</option>\
            <option value="valuelabel">Value and Label</option>\
            <option value="label">Label</option>\
            <option value="value">Value</option>\
            <option value="index">Index</option>\
            <option value="labelvalue">Label and Value</option>\
            <option value="percent">Percent</option>\
            <option value="percentlabel">Percent and Label</option>\
          </select>\
          </br>\
          Position:</br>\
          <select id="legend_position">\
            <option value="right">Right</option>\
            <option value="left">Left</option>\
            <option value="top">Top</option>\
            <option value="bottom">Bottom</option>\
          </select>\
          </br>\
          Padding:</br>\
          <div id="legend_padding"></div>\
          </br>\
          Vertical:</br>\
          <div id="legend_vertical"></div>\
          <input type="checkbox" id="legend_symbols">Symbols\
        </div>\
        <div id="legend-format" style="float:right;">\
        </div>\
  </div>\
  <div id="tabs-6">\
        <input type="checkbox" id="clip">Clip\
  </div>\
  <div id="tabs-7">\
        Title:\
        <input type="text" size="46" id="title_text">\
        <input type="checkbox" id="title_transp" checked>Transparent\
        <div id="title-format"></div>\
        </br>\
        Footer:\
        <input type="text" size="46" id="footer_text">\
        <input type="checkbox" id="footer_transp" checked>Transparent\
        <div id="footer-format"></div>\
  </div>\
  <div id="tabs-8">\
  </div>\
</div>'

    $('#tabs').tabs()
    $('#axistabs').tabs()
    $('#seriestabs').tabs()

    var s = chart.series.items[0]

    $('#series_visible')
      .attr('checked', s.visible)
      .click(function () {
        s.visible = this.checked
        s.chart.draw()
      })
    $('#series_coloreach')
      .val(s.colorEach)
      .change(function () {
        s.colorEach = this.value
        s.chart.draw()
      })
    $('#series_marks')
      .attr('checked', s.marks.visible)
      .click(function () {
        s.marks.visible = this.checked
        s.chart.draw()
      })
    new FormatEditor(document.getElementById('series-format'), s.format, 'seriesformat', false)
    new FormatEditor(document.getElementById('series-marks-format'), s.marks.format, 'seriesmarksformat', true)

    $('#title_text')
      .val(chart.title.text)
      .keyup(function () {
        chart.title.text = this.value
        chart.draw()
      })
    $('#footer_text')
      .val(chart.footer.text)
      .keyup(function () {
        chart.footer.text = this.value
        chart.draw()
      })

    $('#title_transp')
      .attr('checked', chart.title.transparent)
      .click(function () {
        chart.title.transparent = this.checked
        chart.draw()
      })
    $('#footer_transp')
      .attr('checked', chart.footer.transparent)
      .click(function () {
        chart.footer.transparent = this.checked
        chart.draw()
      })

    $('#clip')
      .attr('checked', chart.aspect.clip)
      .click(function () {
        chart.aspect.clip = this.checked
        chart.draw()
      })

    $('#axes_visible')
      .attr('checked', chart.axes.visible)
      .click(function () {
        chart.axes.visible = this.checked
        chart.draw()
      })

    new AxisEditor(document.getElementById('axis-left'), chart.axes.left, 'aleft')
    new AxisEditor(document.getElementById('axis-bottom'), chart.axes.bottom, 'abottom')
    new AxisEditor(document.getElementById('axis-right'), chart.axes.right, 'aright')
    new AxisEditor(document.getElementById('axis-top'), chart.axes.top, 'atop')

    $('#panel_transp')
      .attr('checked', chart.panel.transparent)
      .click(function () {
        chart.panel.transparent = this.checked
        chart.draw()
      })
    $('#walls_visible')
      .attr('checked', chart.walls.visible)
      .click(function () {
        chart.walls.visible = this.checked
        chart.draw()
      })

    new FormatEditor(document.getElementById('panel-format'), chart.panel.format, 'panelformat', false)
    new FormatEditor(document.getElementById('backwall-format'), chart.walls.back.format, 'backwallformat', false)
    new FormatEditor(document.getElementById('title-format'), chart.title.format, 'titleformat', true)
    new FormatEditor(document.getElementById('footer-format'), chart.footer.format, 'footerformat', true)
    new FormatEditor(document.getElementById('legend-format'), chart.legend.format, 'legendformat', true)

    $('#legend_visible')
      .attr('checked', chart.legend.visible)
      .click(function () {
        chart.legend.visible = this.checked
        chart.draw()
      })
    $('#legend_inverted')
      .attr('checked', chart.legend.inverted)
      .click(function () {
        chart.legend.inverted = this.checked
        chart.draw()
      })
    $('#legend_symbols')
      .attr('checked', chart.legend.symbol.visible)
      .click(function () {
        chart.legend.symbol.visible = this.checked
        chart.draw()
      })
    $('#legend_style')
      .val(chart.legend.legendStyle)
      .change(function () {
        chart.legend.legendStyle = this.value
        chart.draw()
      })
    $('#legend_textstyle')
      .val(chart.legend.legendTextStyle)
      .change(function () {
        chart.legend.legendTextStyle = this.value
        chart.draw()
      })
    $('#legend_position')
      .val(chart.legend.position)
      .change(function () {
        chart.legend.position = this.value
        chart.draw()
      })

    $('#legend_padding').slider({
      value: chart.legend.padding,
      slide: function (event, ui) {
        chart.legend.padding = ui.value
        chart.draw()
      }
    })

    $('#legend_vertical').slider({
      value: chart.legend.vertical,
      slide: function (event, ui) {
        chart.legend.vertical = ui.value
        chart.draw()
      }
    })

    $('#series_transp').slider({
      value: chart.series.items[0].format.transparency,
      slide: function (event, ui) {
        chart.series.items[0].format.transparency = ui.value
        chart.draw()
      }
    })

    $('#margin_bottom').slider({
      value: chart.panel.margins.bottom,
      slide: function (event, ui) {
        chart.panel.margins.bottom = ui.value
        chart.draw()
      }
    })
    $('#margin_left').slider({
      value: chart.panel.margins.left,
      slide: function (event, ui) {
        chart.panel.margins.left = ui.value
        chart.draw()
      }
    })

    /*
  $( "#panel-format" ).dialog({
        autoOpen: false,
        height: 200,
        width: 250,
        modal: false
        });
  $( "#panel_format" )
   .button()
   .click(function() {
   $( "#formateditor" ).dialog( "open" );
  });
  */
  }

  Tee.ChartEditor = ChartEditor

  /** END EDITOR */

  /** GAUGES */

  /**
   * @preserve TeeChart(tm) for JavaScript(tm)
   * @fileOverview TeeChart for JavaScript(tm)
   * v3.10 Jun 2024
   * Copyright(c) 2012-2024 by Steema Software SL. All Rights Reserved.
   * http://www.steema.com
   *
   * Licensed with commercial and non-commercial attributes,
   * specifically: http://www.steema.com/licensing/html5
   *
   * JavaScript is a trademark of Oracle Corporation.
   */

  /**
   * @author <a href="mailto:david@steema.com">Steema Software</a>
   * @version 2.4
   */

  /*global requestAnimFrame */
  ;(function () {
    /**
     * @constructor
     * @memberOf Tee
     * @class Parameters to draw a circular gauge meter.
     * @property {Number} [min=0] The minimum gauge range value.
     * @property {Number} [max=100] The maxnimum gauge range value.
     * @property {Number} [step=0] The increment between gauge range labels.
     * @property {Number} [value=0] The position of gauge hand inside the min max range.
     * @property {Number} [angle=280] Amount in degrees of the circular gauge size.
     * @property {Number} [rotation=0] Gauge rotation in degrees.
     * @property {Boolean} [rotateText=false] Gauge labels are rotated or not according to label angle position.
     * @property {String} [shape="circle"] Gauge style ("circle", "rectangle", "segment").
     * @property {Boolean} [drag.enabled=true] Allows mouse/touch dragging the Gauge hand to change current value.
     * @property {Tee.Format} bevel Formatting properties to outmost external gauge bevel.
     * @property {Tee.Format} center Formatting properties for center gauge symbol.
     */
    Tee.CircularGauge = function (o, o2) {
      Tee.Series.call(this, o, o2)

      this.useAxes = false // no axis

      // Range and value:

      this.min = 0
      this.max = 100
      this.step = 0
      this.value = 0

      // Rotation options:

      this.angle = 280 // degree
      this.rotation = 0 // degree
      this.rotateText = false
      this.shape = 'circle' // rectangle, segment

      this.drag = { enabled: true }

      var be = (this.bevel = new Tee.Format(this.chart))
      be.gradient.visible = true
      be.gradient.colors = ['white']
      be.shadow.visible = false
      be.visible = false
      be.stroke.fill = ''

      var ce = (this.center = new Tee.Format(this.chart))
      ce.stroke.fill = ''
      ce.gradient.visible = true
      ce.size = 10
      ce.visible = false
      ce.shadow.visible = true
      ce.gradient.offset = { x: 2, y: -2 }
      ce.location = { x: 0, y: 0 } // %

      ce.top = new Tee.Format(this.chart)
      ce.top.size = 40 // %
      ce.top.visible = true
      ce.top.stroke.fill = ''
      ce.top.gradient.colors = ['silver', 'white']
      ce.top.gradient.visible = true
      ce.top.gradient.direction = 'topbottom'

      var ti = (this.ticks = new Tee.Format(this.chart))
      ti.length = 6 // %
      ti.stroke.fill = 'silver'
      ti.visible = true
      ti.outside = true
      ti.triangle = false
      ti.fill = 'white'

      var tb = (this.ticksBack = new Tee.Format(this.chart))
      tb.stroke.fill = ''
      tb.fill = 'black'
      tb.gradient.visible = true
      tb.gradient.colors = ['red', 'yellow', 'green']
      tb.gradient.direction = 'rightleft'
      tb.visible = false
      tb.radius = 0

      var mi = (this.minor = new Tee.Format(this.chart))
      mi.stroke.fill = 'silver'
      mi.visible = true
      mi.count = 4
      mi.shape = '' // ellipse

      var mb = (this.minorBack = new Tee.Format(this.chart))
      mb.stroke.fill = ''
      mb.visible = false
      mb.fill = 'white'
      mb.gradient.visible = false
      mb.gradient.direction = 'leftright'
      mb.gradient.colors = ['green', 'yellow', 'red']
      mb.radius = 0

      this.hands = []

      this.addHand = function () {
        var han = new Tee.Format(this.chart)
        han.size = 6
        han.length = 60 // %
        han.back = 20 // %
        han.gradient.visible = true
        han.gradient.colors[0] = 'orange'
        han.shadow.visible = true
        han.shadow.blur = 12
        han.shadow.color = 'black'
        han.stroke.fill = ''

        han.pointer = true
        han.shape = 'needle' // "rectangle"

        han.visible = true

        this.hands.push(han)
        return han
      }

      var han = (this.hand = this.addHand())

      var b = (this.back = new Tee.Format(this.chart))
      b.fill = 'black'
      b.visible = true
      b.gradient.visible = true
      b.gradient.colors = ['rgba(255,126,95,0.8)', 'rgba(254,180,123,0.8)']
      b.stroke.fill = ''

      var po = (this.pointer = new Tee.Format(this.chart))
      po.size = 3
      po.fill = 'black'
      po.stroke.fill = ''
      po.visible = false

      var m = this.marks,
        mf = m.format
      m.location = { x: 0, y: 10 } // %
      m.visible = true
      mf.fill = 'black'
      mf.font.fill = 'black'
      mf.gradient.visible = true
      mf.gradient.colors = ['rgba(255,126,95,0.6)', 'rgba(254,180,123,0.6)']
      mf.shadow.visible = true
      mf.shadow.blur = 8
      mf.shadow.color = 'black'

      var f = this.format
      f.visible = true
      f.gradient.visible = true
      f.gradient.colors = ['white']
      f.shadow.visible = true
      f.font.style = '12px Verdana'
      f.font.fill = 'black'
      f.font.visible = true
      f.size = 2 // %
      f.round = { x: 6, y: 6 }

      f.padding = 0.5 // %

      this.units = new Tee.Annotation(this.chart)
      this.units.transparent = true
      this.units.format.font.fill = 'black'
      this.units.location = { x: 0, y: 24 } // %

      this.bounds = this.getRect()

      this.hover.enabled = true

      var oldValue,
        newValue,
        gauge = this

      this.animate = new Tee.Animation(this.chart, function (f) {
        gauge.value = oldValue + f * (newValue - oldValue)
        gauge.chart.draw()
      })

      this.animate.duration = 100
      this.animate.onstop = function () {
        gauge.value = newValue

        if (gauge.onchange) gauge.onchange(gauge)

        gauge.chart.draw()
      }

      var tick0, tick1, tickMin, tickText, initRot, endRot, cx, cy, cex, cey

      this.calcBounds = function () {
        return this.bounds.custom ? this.bounds : this.cellRect(this.bounds, true)
      }

      this.draw = function () {
        var ta = this.angle * 0.01745,
          r = this.calcBounds(),
          rax,
          ray

        cx = r.x + r.width * 0.5
        cy = r.y + r.height * 0.5

        if (this.bounds.custom) {
          rax = r.width
          ray = r.height
        } else ray = rax = Math.min(r.width, r.height)

        var tar = this,
          ctx = tar.chart.ctx,
          xx = 1.57,
          ra = rax

        initRot = tar.rotation * 0.01745 + (6.283 - ta) * 0.5
        while (initRot >= 6.283) initRot -= 6.283

        endRot = initRot + ta
        while (endRot >= 6.283) endRot -= 6.283

        function drawRange(t, p0, p1, start, end) {
          if (t.radius > 0) p1 = ra * t.radius * 0.01

          ctx.beginPath()
          ctx.arc(0, 0, p0, start, end, false)
          ctx.arc(0, 0, p1, end, start, true)

          t.draw(ctx, null, -p1, -p1, 2 * p1, 2 * p1)
        }

        this.drawHand = function (han) {
          han.value = this.limitValue(han.value)

          var ppos = this.inverted ? this.max - han.value + this.min : han.value,
            handRot = this.rotation * 0.01745 + (9.4248 - ta) * 0.5 + (ta * (ppos - this.min)) / range

          ;(cex = cx + rax * ce.location.x * 0.005), (cey = cy + ray * ce.location.y * 0.005)

          ctx.save()

          ctx.translate(cex, cey)
          ctx.rotate(handRot)

          var hs = han.size,
            rah = ra * han.back * 0.5 * 0.01,
            rad = Math.min(hs, 6),
            raend = ra * han.length * 0.5 * 0.01

          ctx.beginPath()

          if (hs > 1) {
            ctx.moveTo(-rah + rad, -hs)

            if (han.shape == 'needle') {
              ctx.quadraticCurveTo(-rah, -hs, -rah, -hs + rad)
              ctx.lineTo(-rah, hs - rad)
              ctx.quadraticCurveTo(-rah, hs, -rah + rad, hs)
              ctx.lineTo(raend, 0)
            } else {
              ctx.lineTo(-rah + rad, hs)
              ctx.lineTo(raend, hs)
              ctx.lineTo(raend, -hs)
            }

            ctx.closePath()
          } else {
            ctx.moveTo(-rah, 0)
            ctx.lineTo(raend, 0)
          }

          if (hs > 1) han.draw(ctx, null, -rah, -hs, rah + raend, 2 * hs)
          else {
            han.stroke.prepare()
            ctx.strokeStyle = han.fill
            ctx.stroke()
          }

          if (this.ondrawHand) this.ondrawHand(this, han)

          // Pointer:
          if (han.pointer && po.visible) po.ellipse((tickMin + tick1) * 0.5, 0, po.size, po.size)

          ctx.restore()
        }

        function tryBack(t, p0, p1) {
          if (t.visible && t.fill !== '') {
            if (t.ranges && t.ranges.length > 0) {
              var sx = xx,
                endsx,
                old = t.fill,
                oldg = t.gradient.visible,
                tartot = tar.max - tar.min,
                difRot = endRot - initRot

              t.gradient.visible = false

              if (tar.inverted) sx += difRot

              for (var r = 0; r < t.ranges.length; r++) {
                var item = Math.min(tar.max, t.ranges[r].value)

                var rangev = r === 0 ? item : item - t.ranges[r - 1].value + tar.min

                if (tar.inverted) endsx = sx - (difRot * (rangev - tar.min)) / tartot
                else endsx = sx + (difRot * (rangev - tar.min)) / tartot

                t.fill = t.ranges[r].fill

                if (t.fill !== '') {
                  if (tar.inverted) drawRange(t, p0, p1, endsx, sx)
                  else drawRange(t, p0, p1, sx, endsx)
                }

                sx = endsx

                if (item >= tar.max) break
              }

              t.fill = old
              t.gradient.visible = oldg
            } else drawRange(t, p0, p1, xx, xx + (endRot - initRot))
          }
        }

        function drawShape(fo) {
          if (fo.visible)
            if (tar.shape == 'circle') fo.ellipse(cx, cy, rax, ray)
            else if (tar.shape == 'segment') {
              ctx.beginPath()

              var minAngle = tar.units.visible ? 275 : 240,
                rot0 = xx + tar.rotation * 0.01745 + (6.283 - Math.max(minAngle, tar.angle) * 0.01745) * 0.5

              var halfx = 0.5 * rax,
                halfy = 0.5 * ray

              ctx.arc(cx, cy, halfx, rot0, rot0 + Math.max(minAngle * 0.01745, ta), false)
              ctx.closePath()
              fo.draw(ctx, null, cx - halfx, cy - halfy, rax, ray)
            } else fo.rectangle(cx - rax * 0.5, cy - ray * 0.5, rax, ray)

          return fo.visible
        }

        if (drawShape(f)) {
          rax *= 1 - f.size * 0.01
          ray *= 1 - f.size * 0.01
          if (!this.bounds.custom) {
            ra = ray = rax
          }
        }

        if (drawShape(this.bevel)) {
          rax *= 1 - f.size * 0.002
          ray *= 1 - f.size * 0.002
          if (!this.bounds.custom) {
            ra = ray = rax
          }
        }

        drawShape(b)

        var o = ti.outside,
          //a=this.mandatoryAxis,
          pos = this.min,
          range = this.max - this.min,
          step = this.step

        if (step === 0) step = range / 20

        step = Math.max(0.1, step)
        ;(tick1 = o ? ra * 0.48 : ra * 0.41),
          (tick0 = tick1 - ra * (ti.length * 0.01)),
          (tickText = o ? ra * 0.39 : this.rotateText ? ra * 0.46 : ra * 0.48),
          (tickMin = o ? ra * 0.45 : ra * 0.38)

        f.font.prepare()

        function trunc(value) {
          return value | 0
        }

        var fh = f.textHeight('Wj'),
          tickCount = range / step,
          textStep = Math.max(1, trunc(tickCount / ((ra * ta) / 6.283 / fh)))

        ctx.fillStyle = f.font.fill

        ctx.save()

        var cex2 = cx,
          cey2 = cy

        if (tar.bounds.custom)
          if (rax > ray) cey2 += (0.75 * ray * ray) / rax
          else cex2 += (0.75 * rax * rax) / ray

        ctx.translate(cex2, cey2)

        ctx.rotate(initRot)

        tryBack(tb, tick0, tick1)
        tryBack(mb, tickMin, tick1)

        function isHover(h, p, dif) {
          return h.enabled && h.valid ? (Math.abs(p - h.value) < dif ? h : null) : null
        }

        var roStep = (step * ta) / range / mi.count,
          totRot = initRot,
          offY = this.rotateText ? 0 : f.textHeight('Wj') * 0.3,
          tickIndex = 0

        if (!ti.visible && o) tickText = tickMin * 0.9

        while (pos <= this.max) {
          if (ti.visible) {
            var fTick = isHover(this.hover, pos, 0.2 * step) || ti

            ctx.beginPath()
            ctx.moveTo(0, tick0)

            if (ti.triangle) {
              ctx.lineTo(-3, tick1)
              ctx.lineTo(3, tick1)
              ctx.closePath()
              fTick.draw(ctx, -3, tick0, 3, tick1)
            } else {
              ctx.lineTo(0, tick1)

              fTick.stroke.prepare()
              ctx.stroke()
            }
          }

          if (f.font.visible && tickIndex % textStep === 0) {
            if (this.angle != 360 || pos + step <= this.max) {
              var ts = tickText - f.textHeight() * f.padding

              ctx.translate(0, ts)

              var rr = this.rotateText ? 3.1416 : totRot

              ctx.rotate(-rr)

              f.font.prepare()

              ctx.fillStyle = f.font.fill

              var ppos = tar.inverted ? this.max - pos + this.min : pos,
                st

              if (tar.ongetText) st = tar.ongetText(ppos)
              else if (trunc(ppos) == ppos) st = ppos.toFixed(0)
              else st = ppos.toFixed(this.decimals)

              ctx.fillText(st, 0, offY)

              ctx.rotate(rr)
              ctx.translate(0, -ts)
            }
          }

          if (mi.visible) {
            if (pos < this.max)
              for (var mit = 0; mit < mi.count; mit++) {
                ctx.rotate(roStep)

                if (mit < mi.count - 1) {
                  var miStep = step / mi.count,
                    nPos = pos + (mit + 1) * miStep,
                    fminTick = isHover(this.hover, nPos, 0.2 * miStep) || mi

                  if (nPos > this.max) break

                  if (mi.shape == 'ellipse') mi.ellipse(0, (tickMin + tick1) * 0.5, mi.size, mi.size)
                  else {
                    ctx.beginPath()
                    ctx.moveTo(0, tickMin)
                    ctx.lineTo(0, tick1)

                    fminTick.stroke.prepare()
                    ctx.stroke()
                  }
                }
              }
          } else ctx.rotate(roStep * mi.count)

          totRot += roStep * mi.count

          pos += step
          tickIndex++
        }

        ctx.restore()

        // marker
        //var m=this.marks;
        if (m.visible) {
          m.text = this.value.toFixed(this.decimals)
          m.resize()
          m.position.x = cx - m.bounds.width * 0.5 + m.location.x * rax * 0.01
          m.position.y = cy + m.location.y * ray * 0.01
          m.draw()
        }

        // units;
        var u = this.units
        if (u.visible) {
          u.resize()
          u.position.x = cx - u.bounds.width * 0.5 + u.location.x * rax * 0.01
          u.position.y = cy + u.location.y * ray * 0.01
          u.draw(ctx)
        }

        ctx.save()

        // hands

        han.value = this.value

        for (var h = 0; h < this.hands.length; h++) if (this.hands[h].visible) this.drawHand(this.hands[h])

        ctx.restore()

        // Center:

        if (ce.visible) {
          var ces = ra * ce.size * 0.01

          ce.ellipse(cex, cey, ces, ces)

          if (ce.top.visible) {
            var cet = ces * ce.top.size * 0.01
            ce.top.ellipse(cex, cey, cet, cet)
          }
        }
      }

      this.limitValue = function (v) {
        return Math.min(this.max, Math.max(this.min, v))
      }

      this.setValue = function (v) {
        v = this.limitValue(v)

        var res = this.value != v

        if (res) {
          if (this.animate.active && this.animate.duration > 0) {
            oldValue = this.value
            newValue = v
            this.animate.animate(this.chart)
          } else {
            this.value = v

            if (this.onchange) this.onchange(this)
          }
        }

        return res
      }

      this.onclick = function () {}

      this.clicked = function () {
        this.dragging = false
        return -1
      }

      this.inValue = function (p, r) {
        if (!r.contains(p)) return false

        var dx = p.x - cex,
          dy = p.y - cey,
          d = Math.sqrt(dx * dx + dy * dy)

        var ang = Math.atan2(dy, dx) - Math.PI * 0.5
        while (ang < 0) ang += 6.283

        var rIni, rEnd, val

        if (initRot > endRot) {
          rIni = endRot
          rEnd = initRot
          val = ang >= rEnd || ang <= rIni
        } else {
          rEnd = endRot
          rIni = initRot
          val = ang >= rIni && ang <= rEnd
        }

        if (val) {
          var res

          if (initRot > endRot)
            if (ang > rEnd) res = (ang - rEnd) / (6.283 - rEnd + rIni)
            else res = (6.283 - rEnd + ang) / (6.283 - rEnd + rIni)
          else res = (ang - rIni) / (rEnd - rIni)

          var v = this.min + (this.max - this.min) * res

          if (this.inverted) v = this.min + (this.max - this.min) * (1 - res)

          p.value = v

          p.inTicks = d >= Math.min(tick0, tickText) && d <= tick1

          return true
        } else {
          p.inTicks = false
          return false
        }
      }

      function changeHover(g, v) {
        if (g.hover.value != v) {
          g.hover.value = v
          g.hover.valid = v !== null
          requestAnimFrame(function () {
            g.chart.draw()
          })
        }
      }
      this.mousemove = function (p) {
        var r = this.calcBounds(),
          ok = this.inValue(p, r)
        if (this.dragging || (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && this.drag.enabled)) {
          if (ok && this.setValue(p.value)) this.chart.draw()

          this.chart.newCursor = 'pointer'
        } else if (p.inTicks && this.drag.enabled) {
          changeHover(this, p.value)
          this.chart.newCursor = 'pointer'
        } else changeHover(this, null)
      }

      var p = { x: 0, y: 0 }

      this.mousedown = function (e) {
        if (this.drag.enabled) {
          var r = this.calcBounds()
          this.chart.calcMouse(e, p)

          if (this.inValue(p, r)) {
            this.dragging = true

            this.hover.value = null
            this.hover.valid = false

            if (this.setValue(p.value)) this.chart.draw()
          } else this.dragging = false

          return this.dragging
        } else return false
      }
    }

    Tee.CircularGauge.prototype = new Tee.Series()

    /**
     * @private
     */
    Tee.CircularGauge.prototype.setChart = function (series, chart) {
      var tmp = Tee.Series.prototype.setChart
      tmp(series, chart)
      series.back.setChart(chart)
      series.center.setChart(chart)
      series.center.top.setChart(chart)
      series.ticks.setChart(chart)
      series.ticksBack.setChart(chart)
      series.minor.setChart(chart)
      series.minorBack.setChart(chart)
      series.hand.setChart(chart)
      series.units.setChart(chart)
      series.pointer.setChart(chart)
      series.bevel.setChart(chart)
    }

    /**
     *@constructor
     *@memberOf Tee
     *@class Parameters to draw a circular gauge meter.
     *@property {Number} [min=0] The minimum gauge range value.
     *@property {Number} [max=100] The maxnimum gauge range value.
     *@property {Number} [step=0] The increment between gauge range labels.
     *@property {Number} [value=0] The position of gauge hand inside the min max range.
     *@property {Number} [angle=280] Amount in degrees of the circular gauge size.
     *@property {Number} [rotation=0] Gauge rotation in degrees.
     *@property {Boolean} [rotateText=false] Gauge labels are rotated or not according to label angle position.
     *@property {String} [shape="circle"] Gauge style ("circle", "rectangle", "segment").
     *@property {Boolean} [drag.enabled=true] Allows mouse/touch dragging the Gauge hand to change current value.
     *@property {Tee.Format} bevel Formatting properties to outmost external gauge bevel.
     *@property {Tee.Format} center Formatting properties for center gauge symbol.
     */
    Tee.NumericGauge = function (o, o2) {
      Tee.Series.call(this, o, o2)

      this.useAxes = false // no axis
      this.legend.visible = false

      // Range and value:

      this.min = 0
      this.max = 100
      this.step = 0
      this.value = 0

      // Rotation options:
      this.angle = 280 // degree
      this.rotation = 0 // degree
      this.rotateText = false
      this.shape = 'rectangle' // rectangle, segment

      this.drag = { enabled: true }

      var be = (this.bevel = new Tee.Format(this.chart))
      be.gradient.visible = true
      be.gradient.colors = ['white']
      be.shadow.visible = false
      be.visible = false
      be.stroke.fill = ''

      var ce = (this.center = new Tee.Format(this.chart))
      ce.stroke.fill = ''
      ce.gradient.visible = true
      ce.size = 10
      ce.visible = false
      ce.shadow.visible = true
      ce.gradient.offset = { x: 2, y: -2 }
      ce.location = { x: 0, y: 0 } // %

      ce.top = new Tee.Format(this.chart)
      ce.top.size = 40 // %
      ce.top.visible = true
      ce.top.stroke.fill = ''
      ce.top.gradient.colors = ['silver', 'white']
      ce.top.gradient.visible = true
      ce.top.gradient.direction = 'topbottom'

      var ti = (this.ticks = new Tee.Format(this.chart))
      ti.length = 6 // %
      ti.stroke.fill = 'silver'
      ti.visible = true
      ti.outside = true
      ti.triangle = false
      ti.fill = 'white'

      var tb = (this.ticksBack = new Tee.Format(this.chart))
      tb.stroke.fill = ''
      tb.fill = 'black'
      tb.gradient.visible = true
      tb.gradient.colors = ['red', 'yellow', 'green']
      tb.gradient.direction = 'rightleft'
      tb.visible = false
      tb.radius = 0

      var mi = (this.minor = new Tee.Format(this.chart))
      mi.stroke.fill = 'silver'
      mi.visible = true
      mi.count = 4
      mi.shape = '' // ellipse

      var mb = (this.minorBack = new Tee.Format(this.chart))
      mb.stroke.fill = ''
      mb.visible = false
      mb.fill = 'white'
      mb.gradient.visible = false
      mb.gradient.direction = 'leftright'
      mb.gradient.colors = ['green', 'yellow', 'red']
      mb.radius = 0
      // shape background
      let shapeBackground = (this.back = new Tee.Format(this.chart))
      shapeBackground.fill = 'black'
      shapeBackground.visible = true
      shapeBackground.gradient.visible = false
      shapeBackground.gradient.colors = ['rgba(255,126,95,0.8)', 'rgba(254,180,123,0.8)']
      shapeBackground.stroke.fill = ''

      let pointer = (this.pointer = new Tee.Format(this.chart))
      pointer.size = 3
      pointer.fill = 'black'
      pointer.stroke.fill = ''
      pointer.visible = false

      var mf = this.marks.format
      mf.fill = 'black'
      mf.font.fill = 'black'
      mf.gradient.visible = true
      mf.gradient.colors = ['rgba(255,126,95,0.6)', 'rgba(254,180,123,0.6)']
      mf.shadow.visible = true
      mf.shadow.blur = 8
      mf.shadow.color = 'black'

      var f = this.format
      f.visible = true
      f.gradient.visible = true
      f.gradient.colors = ['white']
      f.shadow.visible = true
      f.font.style = '12px Verdana'
      f.font.fill = 'black'
      f.font.visible = true
      f.size = 2 // %
      f.round = { x: 6, y: 6 }

      f.padding = 0 // %

      this.units = new Tee.Annotation(this.chart)
      this.units.transparent = true
      this.units.format.font.fill = 'black'
      this.units.location = { x: 0, y: 24 } // %

      this.bounds = this.getRect()

      // markers (Text, Value and Units)
      this.markers = []
      this.addValueMarker = function () {
        let marker = new Tee.Format(this.chart)

        marker.fill = 'white'
        marker.font.fill = 'black'
        marker.font.style = '82px Arial'
        marker.stroke.color = 'white'
        marker.text = '0'

        marker.location = { x: 38, y: 6 } // %
        marker.position = { x: 30, y: 40 } // %
        marker.width = 60 // %
        marker.height = 88 // %

        marker.shape = 'rectangle'

        marker.visible = true

        this.markers.push(marker)
        return marker
      }
      let valueMarker = (this.valueMarker = this.addValueMarker())
      this.addTextMarker = function () {
        let marker = new Tee.Format(this.chart)

        marker.fill = 'white'
        marker.font.fill = 'black'
        marker.font.style = '40px Arial'
        marker.font.textAlign = 'left'
        marker.stroke.color = 'white'
        marker.text = 'FREQ'

        marker.location = { x: 1, y: 5 } // %
        marker.position = { x: 37, y: 25 } // %
        marker.width = 20 // %
        marker.height = 20 // %

        marker.shape = 'rectangle'

        marker.visible = true

        this.markers.push(marker)
        return marker
      }
      let textMarker = (this.textMarker = this.addTextMarker())
      this.addUnitsMarker = function () {
        let marker = new Tee.Format(this.Chart)
        marker.fill = 'white'
        marker.font.fill = 'black'
        marker.font.style = '40px Arial'
        marker.font.textAlign = 'left'
        marker.stroke.color = 'white'
        marker.text = 'Mhz'

        marker.location = { x: 1, y: 55 } // %
        marker.position = { x: 37, y: 32 } // %
        marker.width = 20 // %
        marker.height = 41 // %

        marker.shape = 'rectangle'

        marker.visible = true

        this.markers.push(marker)
        return marker
      }
      let unitsMarker = (this.unitsMarker = this.addUnitsMarker())

      this.hover.enabled = true

      var oldValue,
        newValue,
        gauge = this

      this.animate = new Tee.Animation(this.chart, function (f) {
        gauge.value = oldValue + f * (newValue - oldValue)
        gauge.chart.draw()
      })

      this.animate.duration = 100
      this.animate.onstop = function () {
        gauge.value = newValue

        if (gauge.onchange) gauge.onchange(gauge)

        gauge.chart.draw()
      }

      var tick0, tick1, tickMin, tickText, initRot, endRot, cx, cy, cex, cey

      this.calcBounds = function () {
        return this.bounds.custom ? this.bounds : this.cellRect(this.bounds, true)
      }

      this.draw = function () {
        let numericGauge = this,
          ctx = numericGauge.chart.ctx

        const bounds = this.calcBounds()

        function drawShape(back) {
          if (back.visible) {
            ctx.fillStyle = back.fill
            ctx.fillRect(0, 0, bounds.width, bounds.height)
            ctx.save()
          }
        }
        this.drawMarker = function (marker) {
          if (marker.visible) {
            // marker shape
            const shapeWidth = (bounds.width * marker.width) / 100
            const shapeHeight = (bounds.height * marker.height) / 100
            const shapeLocation = { x: (bounds.width * marker.location.x) / 100, y: (bounds.height * marker.location.y) / 100 }
            ctx.fillStyle = marker.fill
            ctx.fillRect(shapeLocation.x, shapeLocation.y, shapeWidth, shapeHeight)
            ctx.font = marker.font.style
            ctx.fillStyle = marker.font.fill
            // marker text
            const lblX = shapeLocation.x + (shapeWidth * marker.position.x) / 100
            const lblY = shapeLocation.y + (shapeHeight * marker.position.y) / 100
            ctx.fillText(marker.text, lblX, lblY)
            ctx.save()
          }
        }

        drawShape(this.back)
        this.markers.forEach(marker => this.drawMarker(marker))
      }

      this.limitValue = function (v) {
        return Math.min(this.max, Math.max(this.min, v))
      }

      this.setValue = function (v) {
        v = this.limitValue(v)

        var res = this.value != v

        if (res) {
          if (this.animate.active && this.animate.duration > 0) {
            oldValue = this.value
            newValue = v
            this.animate.animate(this.chart)
          } else {
            this.value = v

            if (this.onchange) this.onchange(this)
          }
        }
        this.valueMarker.text = v.toFixed()

        return res
      }

      this.onclick = function () {}

      this.clicked = function () {
        this.dragging = false
        return -1
      }

      this.inValue = function (p, r) {
        if (!r.contains(p)) return false

        var dx = p.x - cex,
          dy = p.y - cey,
          d = Math.sqrt(dx * dx + dy * dy)

        var ang = Math.atan2(dy, dx) - Math.PI * 0.5
        while (ang < 0) ang += 6.283

        var rIni, rEnd, val

        if (initRot > endRot) {
          rIni = endRot
          rEnd = initRot
          val = ang >= rEnd || ang <= rIni
        } else {
          rEnd = endRot
          rIni = initRot
          val = ang >= rIni && ang <= rEnd
        }

        if (val) {
          var res

          if (initRot > endRot)
            if (ang > rEnd) res = (ang - rEnd) / (6.283 - rEnd + rIni)
            else res = (6.283 - rEnd + ang) / (6.283 - rEnd + rIni)
          else res = (ang - rIni) / (rEnd - rIni)

          var v = this.min + (this.max - this.min) * res

          if (this.inverted) v = this.min + (this.max - this.min) * (1 - res)

          p.value = v

          p.inTicks = d >= Math.min(tick0, tickText) && d <= tick1

          return true
        } else {
          p.inTicks = false
          return false
        }
      }

      function changeHover(g, v) {
        if (g.hover.value != v) {
          g.hover.value = v
          g.hover.valid = v !== null
          requestAnimFrame(function () {
            g.chart.draw()
          })
        }
      }
      this.mousemove = function (p) {
        var r = this.calcBounds(),
          ok = this.inValue(p, r)
        if (this.dragging || (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && this.drag.enabled)) {
          if (ok && this.setValue(p.value)) this.chart.draw()

          this.chart.newCursor = 'pointer'
        } else if (p.inTicks && this.drag.enabled) {
          changeHover(this, p.value)
          this.chart.newCursor = 'pointer'
        } else changeHover(this, null)
      }

      var p = { x: 0, y: 0 }

      this.mousedown = function (e) {
        if (this.drag.enabled) {
          var r = this.calcBounds()
          this.chart.calcMouse(e, p)

          if (this.inValue(p, r)) {
            this.dragging = true

            this.hover.value = null
            this.hover.valid = false

            if (this.setValue(p.value)) this.chart.draw()
          } else this.dragging = false

          return this.dragging
        } else return false
      }
    }

    Tee.NumericGauge.prototype = new Tee.Series()

    /**
     * @private
     */
    Tee.NumericGauge.prototype.setChart = function (series, chart) {
      var tmp = Tee.Series.prototype.setChart
      tmp(series, chart)

      this.chart.panel.margins.bottom = 0
      this.chart.panel.margins.right = 0
      this.chart.panel.margins.top = 0
      this.chart.panel.margins.left = 0

      series.back.setChart(chart)
      series.center.setChart(chart)
      series.center.top.setChart(chart)
      series.ticks.setChart(chart)
      series.ticksBack.setChart(chart)
      series.minor.setChart(chart)
      series.minorBack.setChart(chart)
      series.units.setChart(chart)
      series.pointer.setChart(chart)
      series.bevel.setChart(chart)
    }
  })()

  /** END GAUGES */

  /** 3D */

  /**
   * @preserve TeeChart(tm) for JavaScript(tm)
   * @fileOverview TeeChart for JavaScript(tm)
   * v3.10 Jun 2024
   * Copyright(c) 2012-2024 by Steema Software SL. All Rights Reserved.
   * http://www.steema.com
   *
   * Licensed with commercial and non-commercial attributes,
   * specifically: http://www.steema.com/licensing/html5
   *
   * JavaScript is a trademark of Oracle Corporation.
   */

  /**
   * @author <a href="mailto:david@steema.com">Steema Software</a>
   * @version 2.4
   */

  /*global THREE, exports, window, document, navigator, HTMLCanvasElement */
  ;(function () {
    if (typeof exports !== 'undefined') exports.Tee = Tee

    /**
     * @constructor
     * @augments Tee.PaletteSeries
     * @class Draws a two dimensional grid of data as a "grid" (rows and columns of pixels),
     * using the palette property to calculate each pixel (grid cell) color.
     */
    Tee.ColorGrid = function (o, o2) {
      Tee.PaletteSeries.call(this, o, o2)

      this.smooth = true
      this.dataChanged = true

      var d, width, height, image, data, c2, ctx2, axis, axis2, x0, y0, x1, y1, min, max, range, InvRange255

      function optimize(smooth, style, ctx) {
        if (style) {
          // -webkit-optimize-contrast, (-o)(-moz)crisp-edges

          if (style.getPropertyValue('image-rendering') !== null) style.setProperty('image-rendering', smooth ? 'optimizeQuality' : 'optimizeSpeed', null)

          if (style.msInterpolationMode !== undefined) style.msInterpolationMode = smooth ? 'bicubic' : 'nearest-neighbor'
        }

        ctx.imageSmoothingEnabled = smooth
      }

      function square(x) {
        return x * x
      }

      this.addRandom = function (rows, cols) {
        var row, temp

        rows = rows || 200
        cols = cols || rows

        var d = (this.data.values = [])

        for (var y = 0; y < rows; y++) {
          row = new Array(cols)
          d[y] = row

          // Some sample function
          temp = 0.5 * square(Math.cos(y / (cols * 0.2)))

          for (var x = 0; x < cols; x++) row[x] = square(Math.cos(x / (rows * 0.2))) - Math.cos(x / (cols * 0.5)) + temp
        }

        this.dataChanged = true // <-- force recalculating pixel colors
      }

      function tryDrawGrid(s, c) {
        if (s.fill !== '') {
          var p,
            x,
            y,
            xInc = 1,
            yInc = 1

          xInc = Math.max((1 + (4 * width) / Math.abs(axis2.calc(width) - axis2.calc(0))) | 0, 1)
          yInc = Math.max((1 + (4 * height) / Math.abs(axis.calc(height) - axis.calc(0))) | 0, 1)

          c.beginPath()

          for (x = 1; x < width; x += xInc) {
            p = axis2.calc(x - 0.5)
            c.moveTo(p, y1)
            c.lineTo(p, y0)
          }

          for (y = 1; y < height; y += yInc) {
            p = axis.calc(y - 0.5)
            c.moveTo(x0, p)
            c.lineTo(x1, p)
          }

          s.prepare()
          c.stroke()
        }
      }

      function calcMinMax() {
        min = d[0][0]
        max = min

        var v, row

        for (var y = 0; y < height; y++) {
          row = d[y]
          for (var x = 0; x < width; x++) {
            v = row[x]
            if (v < min) min = v
            else if (v > max) max = v
          }
        }

        range = max - min

        InvRange255 = max == min ? 1 : 255 / (max - min)
      }

      this.fillPixels = function (alpha) {
        var index = 0,
          row,
          color,
          gray = this.palette.grayScale,
          inv = this.palette.inverted

        // Fill pixel data

        for (var y = 0; y < height; y++) {
          row = d[y]

          for (var x = 0; x < width; x++) {
            if (gray) {
              color = InvRange255 * (inv ? max - row[x] : row[x] - min)

              data[index++] = color
              data[index++] = color
              data[index++] = color
            } else {
              color = this.getColor(row[x])

              data[index++] = color.r
              data[index++] = color.g
              data[index++] = color.b
            }

            data[index++] = alpha
          }
        }
      }

      this.draw = function () {
        var c = this.chart.ctx

        if (width > 0) {
          if (!image || c2.width != width || c2.height != height) {
            if (!c2) c2 = document.createElement('canvas')

            // IE <9
            if (!c2 || !c2.getContext) return

            c2.width = width
            c2.height = height

            ctx2 = c2.getContext('2d')
            image = ctx2.getImageData(0, 0, width, height)
            data = image.data
          }

          if (this.dataChanged) {
            this.fillPixels(255 * (1 - this.format.transparency))
            this.dataChanged = false
          }

          ctx2.putImageData(image, 0, 0)

          optimize(this.smooth, this.chart.canvas.style, c)

          axis = this.mandatoryAxis
          axis2 = this.notmandatory

          y1 = axis.calc(-0.5)
          ;(y0 = axis.calc(height - 0.5)), (x0 = axis2.calc(-0.5))
          x1 = axis2.calc(width - 0.5)

          var cr = this.chart.chartRect,
            xPos = x0,
            yPos = y0,
            xScale = 1,
            yScale = 1

          if (axis.inverted) {
            yScale = -1
            yPos = -y1
          }

          if (axis2.inverted) {
            xScale = -1
            xPos = -x1 // #2120
          }

          c.scale(xScale, yScale)
          c.drawImage(ctx2.canvas, 0, 0, width, height, xPos, yPos, x1 - x0, y1 - y0)
          c.setTransform(1, 0, 0, 1, 0, 0)

          tryDrawGrid(this.format.stroke, c)
        }
      }

      /**
       * @returns {String} Returns the palette value of index'th legend symbol.
       */
      this.valueText = function (index) {
        var x = index % width,
          y = (index / width) | 0
        return this.data.values[y][x].toFixed(this.decimals)
      }

      this.minXValue = function () {
        return -0.5
      }
      this.maxXValue = function () {
        return width - 0.5
      }
      this.minYValue = function () {
        return -0.5
      }
      this.maxYValue = function () {
        return height - 0.5
      }

      this.recalcAxes = function () {
        Tee.Series.prototype.recalcAxes.call(this)

        d = this.data.values
        height = d.length
        width = height > 0 ? d[0].length : 0

        this.size = { x: width, y: height }

        if (width > 0 && this.dataChanged) {
          calcMinMax()

          this._min = min
          this._max = max
          this._range = range

          this.prepareColors()
        }
      }

      /**
       * @returns {Number} Returns the index of grid xy that contains {@link Tee.Point} p parameter.
       */
      this.clicked = function (p) {
        var x, y

        if (p.x >= x0 && p.x <= x1) {
          x = ((width * (p.x - x0)) / (x1 - x0)) | 0

          if (p.y >= y0 && p.y <= y1) {
            y = ((height * (p.y - y0)) / (y1 - y0)) | 0

            return y * width + x
          }
        }

        return -1
      }
    }

    Tee.ColorGrid.prototype = new Tee.PaletteSeries()

    /**
     * @constructor
     * @augments Tee.PaletteSeries
     * @class Draws a two dimensional grid of data as a "grid" (rows and columns of pixels),
     * using the palette property to calculate each pixel (grid cell) color.
     */
    Tee.Surface = function (o, o2) {
      Tee.ColorGrid.call(this, o, o2)

      var d, _sizeY

      this.grid = new Tee.Format(o).stroke

      this.wireFrame = false
      this.maxZ = 3

      this.getY = function (x, z) {
        return d[x][z]
      }

      this.draw = function () {
        if (this.size.x > 0 && this.size.y > 0) {
          d = this.data.values

          if (this.chart.__webgl) {
            var r = {}
            this.bounds(r)

            _sizeY = this.size.y - 1
            this.chart.ctx.surface(this.size, this.getY, r, this.wireFrame, this.grid.visible ? this.grid.fill : null, this.maxZ)
          }
        }
      }

      this.minXValue = function () {
        return 0
      }
      this.maxXValue = function () {
        return this.size.y
      }
      this.minYValue = function () {
        return this._min
      }
      this.maxYValue = function () {
        return this._max
      }
    }

    Tee.Surface.prototype = new Tee.ColorGrid()

    // Three.js

    /**
     *	@author zz85 / http://twitter.com/blurspline / http://www.lab4games.net/zz85/blog
     *
     *	Subdivision Geometry Modifier
     *		using Loop Subdivision Scheme
     *
     *	References:
     *		http://graphics.stanford.edu/~mdfisher/subdivision.html
     *		http://www.holmes3d.net/graphics/subdivision/
     *		http://www.cs.rutgers.edu/~decarlo/readings/subdiv-sg00c.pdf
     *
     *	Known Issues:
     *		- currently doesn't handle UVs
     *		- currently doesn't handle "Sharp Edges"
     *
     */

    let THREE = window.THREE || {}

    THREE.SubdivisionModifier = function (subdivisions) {
      this.subdivisions = subdivisions === undefined ? 1 : subdivisions
    }

    // Applies the "modify" pattern
    THREE.SubdivisionModifier.prototype.modify = function (geometry) {
      var repeats = this.subdivisions

      while (repeats-- > 0) {
        this.smooth(geometry)
      }

      delete geometry.__tmpVertices

      geometry.computeFaceNormals()
      geometry.computeVertexNormals()
    }
    ;(function () {
      // Some constants
      var WARNINGS = !true // Set to true for development
      var ABC = ['a', 'b', 'c']

      function getEdge(a, b, map) {
        var vertexIndexA = Math.min(a, b)
        var vertexIndexB = Math.max(a, b)

        var key = vertexIndexA + '_' + vertexIndexB

        return map[key]
      }

      function processEdge(a, b, vertices, map, face, metaVertices) {
        var vertexIndexA = Math.min(a, b)
        var vertexIndexB = Math.max(a, b)

        var key = vertexIndexA + '_' + vertexIndexB

        var edge

        if (key in map) {
          edge = map[key]
        } else {
          var vertexA = vertices[vertexIndexA]
          var vertexB = vertices[vertexIndexB]

          edge = {
            a: vertexA, // pointer reference
            b: vertexB,
            newEdge: null,
            // aIndex: a, // numbered reference
            // bIndex: b,
            faces: [] // pointers to face
          }

          map[key] = edge
        }

        edge.faces.push(face)

        metaVertices[a].edges.push(edge)
        metaVertices[b].edges.push(edge)
      }

      function generateLookups(vertices, faces, metaVertices, edges) {
        var i, il, face, edge

        for (i = 0, il = vertices.length; i < il; i++) {
          metaVertices[i] = { edges: [] }
        }

        for (i = 0, il = faces.length; i < il; i++) {
          face = faces[i]

          processEdge(face.a, face.b, vertices, edges, face, metaVertices)
          processEdge(face.b, face.c, vertices, edges, face, metaVertices)
          processEdge(face.c, face.a, vertices, edges, face, metaVertices)
        }
      }

      function newFace(newFaces, a, b, c) {
        newFaces.push(new THREE.Face3(a, b, c))
      }

      /////////////////////////////

      // Performs one iteration of Subdivision
      THREE.SubdivisionModifier.prototype.smooth = function (geometry) {
        var tmp = new THREE.Vector3()

        var oldVertices, oldFaces
        var newVertices, newFaces // newUVs = [];

        var n, l, i, il, j, k
        var metaVertices, sourceEdges

        // new stuff.
        var sourceEdges, newEdgeVertices, newSourceVertices

        oldVertices = geometry.vertices // { x, y, z}
        oldFaces = geometry.faces // { a: oldVertex1, b: oldVertex2, c: oldVertex3 }

        /******************************************************
         *
         * Step 0: Preprocess Geometry to Generate edges Lookup
         *
         *******************************************************/

        metaVertices = new Array(oldVertices.length)
        sourceEdges = {} // Edge => { oldVertex1, oldVertex2, faces[]  }

        generateLookups(oldVertices, oldFaces, metaVertices, sourceEdges)

        /******************************************************
         *
         *	Step 1.
         *	For each edge, create a new Edge Vertex,
         *	then position it.
         *
         *******************************************************/

        newEdgeVertices = []
        var other, currentEdge, newEdge, face
        var edgeVertexWeight, adjacentVertexWeight, connectedFaces

        for (i in sourceEdges) {
          currentEdge = sourceEdges[i]
          newEdge = new THREE.Vector3()

          edgeVertexWeight = 3 / 8
          adjacentVertexWeight = 1 / 8

          connectedFaces = currentEdge.faces.length

          // check how many linked faces. 2 should be correct.
          if (connectedFaces != 2) {
            // if length is not 2, handle condition
            edgeVertexWeight = 0.5
            adjacentVertexWeight = 0

            if (connectedFaces != 1) {
              if (WARNINGS) console.warn('Subdivision Modifier: Number of connected faces != 2, is: ', connectedFaces, currentEdge)
            }
          }

          newEdge.addVectors(currentEdge.a, currentEdge.b).multiplyScalar(edgeVertexWeight)

          tmp.set(0, 0, 0)

          for (j = 0; j < connectedFaces; j++) {
            face = currentEdge.faces[j]

            for (k = 0; k < 3; k++) {
              other = oldVertices[face[ABC[k]]]
              if (other !== currentEdge.a && other !== currentEdge.b) break
            }

            tmp.add(other)
          }

          tmp.multiplyScalar(adjacentVertexWeight)
          newEdge.add(tmp)

          currentEdge.newEdge = newEdgeVertices.length
          newEdgeVertices.push(newEdge)

          // console.log(currentEdge, newEdge);
        }

        /******************************************************
         *
         *	Step 2.
         *	Reposition each source vertices.
         *
         *******************************************************/

        var beta, sourceVertexWeight, connectingVertexWeight
        var connectingEdge, connectingEdges, oldVertex, newSourceVertex
        newSourceVertices = []

        for (i = 0, il = oldVertices.length; i < il; i++) {
          oldVertex = oldVertices[i]

          // find all connecting edges (using lookupTable)
          connectingEdges = metaVertices[i].edges
          n = connectingEdges.length
          //beta;

          if (n == 3) {
            beta = 3 / 16
          } else if (n > 3) {
            beta = 3 / (8 * n) // Warren's modified formula
          }

          // Loop's original beta formula
          // beta = 1 / n * ( 5/8 - Math.pow( 3/8 + 1/4 * Math.cos( 2 * Math. PI / n ), 2) );

          sourceVertexWeight = 1 - n * beta
          connectingVertexWeight = beta

          if (n <= 2) {
            // crease and boundary rules
            // console.warn('crease and boundary rules');

            if (n == 2) {
              if (WARNINGS) console.warn('2 connecting edges', connectingEdges)
              sourceVertexWeight = 3 / 4
              connectingVertexWeight = 1 / 8

              // sourceVertexWeight = 1;
              // connectingVertexWeight = 0;
            } else if (n == 1) {
              if (WARNINGS) console.warn('only 1 connecting edge')
            } else if (n == 0) {
              if (WARNINGS) console.warn('0 connecting edges')
            }
          }

          newSourceVertex = oldVertex.clone().multiplyScalar(sourceVertexWeight)

          tmp.set(0, 0, 0)

          for (j = 0; j < n; j++) {
            connectingEdge = connectingEdges[j]
            other = connectingEdge.a !== oldVertex ? connectingEdge.a : connectingEdge.b
            tmp.add(other)
          }

          tmp.multiplyScalar(connectingVertexWeight)
          newSourceVertex.add(tmp)

          newSourceVertices.push(newSourceVertex)
        }

        /******************************************************
         *
         *	Step 3.
         *	Generate Faces between source vertecies
         *	and edge vertices.
         *
         *******************************************************/

        newVertices = newSourceVertices.concat(newEdgeVertices)
        var sl = newSourceVertices.length,
          edge1,
          edge2,
          edge3
        newFaces = []

        for (i = 0, il = oldFaces.length; i < il; i++) {
          face = oldFaces[i]

          // find the 3 new edges vertex of each old face

          edge1 = getEdge(face.a, face.b, sourceEdges).newEdge + sl
          edge2 = getEdge(face.b, face.c, sourceEdges).newEdge + sl
          edge3 = getEdge(face.c, face.a, sourceEdges).newEdge + sl

          // create 4 faces.

          newFace(newFaces, edge1, edge2, edge3)
          newFace(newFaces, face.a, edge1, edge3)
          newFace(newFaces, face.b, edge2, edge1)
          newFace(newFaces, face.c, edge3, edge2)
        }

        // Overwrite old arrays
        geometry.vertices = newVertices
        geometry.faces = newFaces

        // console.log('done');
      }
    })()

    Tee.MyParametricGeometry = function (func, slices, stacks, useTris) {
      THREE.Geometry.call(this)

      var verts = this.vertices,
        faces = this.faces,
        uvs = this.faceVertexUvs[0]

      useTris = useTris === undefined ? false : useTris

      var i, il, j, p

      var stackCount = stacks + 1,
        sliceCount = slices + 1

      var invSlice = 1 / slices,
        invSlices = 1 / sliceCount,
        invStack = 1 / stacks,
        invStacks = 1 / stackCount

      for (i = 0; i <= stacks; i++) for (j = 0; j <= slices; j++) verts.push(new THREE.Vector3(i * invStack - 0.5, func(i, j), 0.5 - j * invSlice))

      var a, b, c, d, uva, uvb, uvc, uvd, j0, i0, j1, i1, is0, is1

      for (i = 0; i < stacks; i++) {
        i0 = i * invStacks
        i1 = (i + 1) * invStacks

        is0 = i * sliceCount
        is1 = (i + 1) * sliceCount

        for (j = 0; j < slices; j++) {
          a = is0 + j
          c = is1 + j

          j0 = j * invSlices
          j1 = j0 + invSlices

          uva = new THREE.Vector2(j0, i0)
          uvb = new THREE.Vector2(j1, i0)
          uvc = new THREE.Vector2(j0, i1)
          uvd = new THREE.Vector2(j1, i1)

          if (useTris) {
            b = a + 1
            d = c + 1

            faces.push(new THREE.Face3(a, b, c))
            faces.push(new THREE.Face3(b, d, c))

            uvs.push([uva, uvb, uvc])
            uvs.push([uvb, uvd, uvc])
          } else {
            faces.push(new THREE.Face4(a, a + 1, c + 1, c))
            uvs.push([uva, uvb, uvd, uvc])
          }
        }
      }

      // console.log(this);

      // magic bullet
      // var diff = this.mergeVertices();
      // console.log('removed ', diff, ' vertices by merging');

      //	this.computeCentroids();
      this.computeFaceNormals()
      this.computeVertexNormals()
    }

    if (typeof THREE !== 'undefined') {
      if (THREE.Geometry) {
        Tee.MyParametricGeometry.prototype = new THREE.Geometry()
      }
    }

    var supportsCanvas = typeof HTMLCanvasElement !== 'undefined'

    /**
     * @constructor
     * @class WebGL Three.js canvas context.
     */
    Tee.Three = function (id) {
      this.setEnabled = function (enable, chart) {
        if (enable) if (Detector && !Detector.webgl) return

        this.__webgl = enable

        if (enable) {
          if (renderer) {
            chart.__webgl = true
            chart.canvas.style.display = 'none'
            chart.canvas = this
            chart.ctx = this

            if (renderer && renderer.domElement) renderer.domElement.style.display = 'block'
          }
        } else {
          var d = container

          if (!altCanvas) {
            //if (d instanceof HTMLCanvasElement)
            //  altCanvas = d;
            //else

            if (supportsCanvas) {
              altCanvas = document.createElement('canvas')

              if (d instanceof HTMLCanvasElement) {
                d.parentElement.appendChild(altCanvas)
                altCanvas.style.background = d.style.background
              } else d.appendChild(altCanvas)
            } else {
              // try ExCanvas:

              if (typeof G_vmlCanvasManager != 'undefined') {
                altCanvas = document.createElement('canvas')
                altCanvas = G_vmlCanvasManager.initElement(altCanvas)
                d.appendChild(altCanvas)
              }
            }
          }

          if (altCanvas) {
            altCanvas.setAttribute('width', d.width) //d.style.width);
            altCanvas.setAttribute('height', d.height) //d.style.height);

            altCanvas.height = d.clientHeight
            altCanvas.width = d.clientWidth
          }

          if (renderer && renderer.domElement) renderer.domElement.style.display = 'none'
          else if (supportsCanvas && d instanceof HTMLCanvasElement) d.style.display = 'none'

          if (altCanvas) altCanvas.style.display = 'block'

          chart.canvas = altCanvas
          chart.ctx = null // altCanvas.getContext("2d");
          chart.__webgl = null

          chart.bounds.set(0, 0, altCanvas.width, altCanvas.height)

          if (altCanvas) {
            altCanvas.chart = chart
            altCanvas.onmousedown = altCanvas.ontouchstart = chart.domousedown
            altCanvas.onmouseup = altCanvas.ontouchstop = chart.domouseup
            altCanvas.onmousemove = altCanvas.ontouchmove = chart.domousemove
            altCanvas.onmousewheel = altCanvas.onmousewheel = chart._doWheel
          }
        }

        if (trackBall) trackBall.enabled = enable

        chart.aspect.view3d = enable

        chart.draw()
      }

      this.zPos = function () {
        return totalDepth * (1 - this.z - this.depth * 0.5)
      }

      this.Gradient = function () {
        this.colors = []
        this.stops = []

        this.addColorStop = function (stop, color) {
          this.stops.push(stop)
          this.colors.push(color)
        }
      }

      this.clearRect = function () {
        if (parent) {
          scene.remove(parent)

          //parent.dispose();
        }

        parent = new THREE.Object3D()

        scene.add(parent)

        this.needsRender = true
      }

      this.beginPath = function () {
        this.items = []
        this.closedPath = false
      }

      this.moveTo = function (x, y, z) {
        this.items.push({ kind: 0, x: x, y: y, z: z })
      }

      this.lineTo = function (x, y, z) {
        this.items.push({ kind: 1, x: x, y: y, z: z })
      }

      this.lineZ = function (x, y, z0, z1) {
        this.moveTo(x, y, z0)
        this.lineTo(x, y, z1)
      }

      // Code from examples/js/math/ColorConverter.js:
      function setHSV(color, h, s, v) {
        // https://gist.github.com/xpansive/1337890#file-index-js
        return color.setHSL(h, (s * v) / ((h = (2 - s) * v) < 1 ? h : 2 - h), h * 0.5)
      }

      // Code adapted from Three.js example:
      // http://stemkoski.github.com/Three.js/

      function addMesh(wireframe, m, size, r, geo, maxZ, zMin, zMax) {
        var material

        if (wireframe) {
          material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors })
          material.wireframe = wireframe
        } else material = m

        material.vertexColors = THREE.VertexColors

        if (!wireframe) material.side = THREE.DoubleSide

        var mesh = new THREE.Mesh(geo, material)

        var zRange = zMax - zMin
        if (zMax === zMin) zRange = 1

        var zOff = zMin + zRange * 0.5,
          heightRange = r.height / zRange

        mesh.position.set(r.x + 0.5 * (r.width - width), r.y + 0.5 * (r.height - height) - zOff * heightRange, -totalDepth * 0.5)

        mesh.scale.set(r.width, heightRange, totalDepth * maxZ)

        parent.add(mesh)

        //mesh.add(new THREE.AxisHelper(100));
      }

      this.surface = function (size, func, r, wireframe, grid, maxZ) {
        var useTriangles = true,
          geo = new Tee.MyParametricGeometry(func, size.x - 1, size.y - 1, useTriangles)

        geo.computeBoundingBox()

        var bou = geo.boundingBox,
          zMin = bou.min.y,
          zMax = bou.max.y,
          zRange = zMax - zMin,
          color,
          face,
          numberOfSides,
          vertexIndex,
          i,
          j,
          faceIndices = ['a', 'b', 'c', 'd'],
          vertices = geo.vertices

        for (i = 0; i < geo.vertices.length; i++) {
          color = new THREE.Color()
          setHSV(color, (0.7 * (zMax - vertices[i].y)) / zRange, 1, 0.9)

          geo.colors[i] = color
        }

        numberOfSides = useTriangles ? 3 : 4

        for (i = 0; i < geo.faces.length; i++) {
          face = geo.faces[i]

          for (j = 0; j < numberOfSides; j++) face.vertexColors[j] = geo.colors[face[faceIndices[j]]]
        }

        var m = new THREE.MeshLambertMaterial({
          color: 0xffffff,
          opacity: this.globalAlpha,
          wireframe: this.wireframe
          //, specular: 0x555555
          //, reflectivity:0.5
        })

        addMesh(wireframe, m, size, r, geo, maxZ, zMin, zMax)

        if (grid && !wireframe) {
          var gridm = new THREE.MeshBasicMaterial({ color: this.colorToInt(grid), opacity: this.globalAlpha })
          gridm.wireframe = true
          addMesh(false, gridm, size, r, geo, maxZ, zMin, zMax)
        }
      }

      this.slice = function (p, center, radius, angle0, angle1, donut, torus, beveled) {
        this.beveled = beveled === undefined ? false : beveled

        if (donut > 0) {
          this.path = 8
          this.p = p
          this.torus = torus

          this.center = center
          this.radius = radius
          this.angle0 = angle0
          this.angle1 = angle1
          this.donut = donut
          this.items = []
        } else {
          this.beginPath()
          this.moveTo(p.x, p.y)
          this.arc(center.x, center.y, radius, angle0, angle1, false)
          this.closePath()
        }
      }

      this.closePath = function () {
        this.closedPath = true
      }

      this.createLinearGradient = function () {
        return new this.Gradient()
      }
      this.createRadialGradient = function () {
        return new this.Gradient()
      }

      var textureCube

      this.getMaterial = function (envMap) {
        var g = null,
          color = g && g.visible ? g.colors[g.colors.length - 1] : this.fillStyle,
          image = this.image,
          texture = null

        /*
    if (image && image.visible && (image.url !== '')) {
       texture = new THREE.ImageUtils.loadTexture( image.url );
       texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
       texture.repeat.set( 10, 10 );

       this.image=null;
    }
    */

        if (envMap) {
          if (!textureCube) {
            var path = 'textures/pisa/',
              format = '.png',
              urls = [path + 'px' + format, path + 'nx' + format, path + 'py' + format, path + 'ny' + format, path + 'pz' + format, path + 'nz' + format]

            textureCube = THREE.ImageUtils.loadTextureCube(urls, null, function () {
              o.refresh()
            })
          }

          return new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: textureCube })
        } else
          return new THREE.MeshPhongMaterial({
            color: this.colorToInt(color),
            opacity: this.globalAlpha,
            wireframe: this.wireframe,
            specular: 0x555555,
            map: texture
            //, reflectivity:0.5
          })
      }

      this.spline = function (points, isShape) {
        this.items = []
        this.path = 0

        var t = 0

        if (isShape) {
          var p2 = []

          while (t < points.length) {
            p2.push(new THREE.Vector2(points[t], -points[t + 1]))
            t += 2
          }

          this.items.push({ kind: 12, p: p2 })
        } else {
          var sp = new THREE.SplineCurve3()

          while (t < points.length) {
            sp.points.push(new THREE.Vector3(points[t], -points[t + 1], 0))
            t += 2
          }

          this.items.push({ kind: 8, geo: sp })
        }
      }

      this.bezierCurveTo = function (a, b, c, d, e, f) {
        this.items.push({ kind: 11, a: a, b: b, c: c, d: d, e: e, f: f })
      }

      this.quadraticCurveTo = function (x0, y0, x1, y1) {
        this.items.push({ kind: 7, x: x0, y: y0, width: x1, height: y1 })
      }

      this.arc = function (cx, cy, radius, angle, endAngle, clockwise) {
        this.items.push({ kind: 4, x: cx, y: cy, radius: radius, angle: angle, endAngle: endAngle, clockwise: clockwise })
      }

      this.extrudeOptions = {
        amount: 1,
        bevelEnabled: false,
        bevelSegments: 16,
        steps: 12,
        curveSegments: 64,
        bevelThickness: 10,
        bevelSize: 8
      }

      this.getContext = function () {
        return this
      }

      this.beginParent = function () {
        oldParent = parent
        parent = new THREE.Object3D()
        oldParent.add(parent)
        return parent
      }

      this.endParent = function () {
        parent = oldParent
      }

      function addShape(s) {
        o.extrudeOptions.amount = totalDepth * o.depth

        var geometry

        if (o.depth == 0) geometry = new THREE.ShapeGeometry(s)
        else geometry = s.extrude(o.extrudeOptions) //new THREE.ExtrudeGeometry( s, o.extrudeOptions);

        var obj = THREE.SceneUtils.createMultiMaterialObject(geometry, [
          o.getMaterial()
          //, new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } )
        ])

        if (o.showShadows) {
          obj.receiveShadow = true
          obj.castShadow = true
        }

        return obj
      }

      // pending
      this.translate = function (x, y) {}
      this.rotate = function (angle) {}

      function roundRect(shape, x, y, width, height, radius) {
        shape.moveTo(x, y + radius)
        shape.lineTo(x, y + height - radius)
        shape.quadraticCurveTo(x, y + height, x + radius, y + height)
        shape.lineTo(x + width - radius, y + height)
        shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
        shape.lineTo(x + width, y + radius)
        shape.quadraticCurveTo(x + width, y, x + width - radius, y)
        shape.lineTo(x + radius, y)
        shape.quadraticCurveTo(x, y, x, y + radius)
      }

      this.fill = function () {
        var cube,
          shape,
          material = o.getMaterial(), //(this.path===5) || (this.path===7)),
          i = this.items,
          l = i.length,
          r = this.r

        if (l > 0) {
          if (i[0].kind == 8) {
            var radiusSegments = 8 // = 2 --> "tape" flat strip

            var tube = new THREE.TubeGeometry(i[0].geo, 100, 0.05 * totalDepth * this.depth, radiusSegments, false, false)
            var mesh = new THREE.Mesh(tube, material)
            mesh.position.set(-width * 0.5, height * 0.5, this.zPos())

            //mesh.scale.set(1,1,totalDepth*this.depth);

            parent.add(mesh)
          } else if (this.closedPath) {
            shape = new THREE.Shape()

            var ii, lastX, lastY

            for (var t = 0; t < l; t++) {
              ii = i[t]

              if (ii.kind == 0) {
                if (t == 0 || lastX !== ii.x || lastY !== -ii.y) {
                  lastX = ii.x
                  lastY = -ii.y

                  shape.moveTo(lastX, lastY)
                }
              } else if (ii.kind == 1) {
                if (t == 0 || lastX !== ii.x || lastY !== -ii.y) {
                  lastX = ii.x
                  lastY = -ii.y

                  shape.lineTo(lastX, lastY)
                }
              } else if (ii.kind == 4) {
                //var curve = new THREE.EllipseCurve( lastX, lastY, ii.radius, ii.radius,
                //                  2*Math.PI - ii.angle, 2*Math.PI - ii.endAngle, ii.clockwise );
                //shape.curves.push( curve );

                shape.absarc(lastX, lastY, ii.radius, 2 * Math.PI - ii.angle, 2 * Math.PI - ii.endAngle, ii.clockwise)
              } else if (ii.kind == 7) {
                shape.quadraticCurveTo(ii.x, ii.y, ii.width, ii.height)
              } else if (ii.kind == 11) {
                shape.bezierCurveTo(ii.a, -ii.b, ii.c, -ii.d, ii.e, -ii.f)
              } else if (ii.kind == 12) {
                shape.moveTo(ii.p[0].x, ii.p[0].y)
                shape.splineThru(ii.p)
              }
            }

            var old = this.extrudeOptions.bevelEnabled
            this.extrudeOptions.bevelEnabled = this.beveled

            if (this.beveled) {
              var tmpBevel = 0.02 * this.extrudeOptions.bevelSize
              this.depth -= tmpBevel
              this.z += tmpBevel * 0.5
            }

            // SLICE !!! if (shape.actions.length<4) return;

            var mesh = addShape(shape)

            mesh.position.set(-width * 0.5, height * 0.5, this.zPos() - totalDepth * this.depth * 0.5)
            parent.add(mesh)

            this.extrudeOptions.bevelEnabled = old
          } else {
            var geoplane = new THREE.Geometry(),
              pz = -totalDepth * this.depth,
              face,
              t

            material.side = THREE.DoubleSide

            for (t = 0; t < l; t++) {
              geoplane.vertices.push(new THREE.Vector3(i[t].x, -i[t].y, 0), new THREE.Vector3(i[t].x, -i[t].y, pz))

              if (t > 0) {
                face = new THREE.Face4(2 * (t - 1), 2 * t - 1, 2 * t + 1, 2 * t)
                geoplane.faces.push(face)
              }
            }

            geoplane.computeFaceNormals()

            var planeMesh = new THREE.Mesh(geoplane, material)
            planeMesh.position.set(-width * 0.5, height * 0.5, this.zPos() - pz * 0.5)
            parent.add(planeMesh)
          }
        } else if (this.depth == 0) {
          if (this.rx > 0) {
            shape = new THREE.Shape()
            roundRect(shape, r.x, -r.y, r.width, r.height, this.rx)

            var mesh = addShape(shape)
            mesh.position.set(-width * 0.5, -r.height + height * 0.5, this.zPos())
            parent.add(mesh)
          } else if (this.path == 6) {
            shape = new THREE.Shape()
            shape.absellipse(0, 0, r.width * 0.5, r.height * 0.5, 0, Math.PI * 2, true)

            var mesh = addShape(shape)
            mesh.position.set(this.cx - width * 0.5, -this.cy + height * 0.5, this.zPos())
            parent.add(mesh)
          } else {
            var plane = new THREE.PlaneGeometry(r.width, r.height)
            material.side = THREE.DoubleSide
            cube = new THREE.Mesh(plane, material)
            //cube.overdraw=true;
          }
        } else if (this.path == 5) {
          var cylGeo

          if (this.topRadius == 1) {
            if (!cachedCylinder) {
              cachedCylinder = new THREE.CylinderGeometry(1, 1, 1, 32, 1)

              //var smoother = new THREE.SubdivisionModifier(2);
              //smoother.modify( cachedCylinder );
            }

            cylGeo = cachedCylinder
          } else {
            if (!cachedCone) {
              cachedCone = new THREE.CylinderGeometry(0, 1, 1, 32, 1)

              //var smoother = new THREE.SubdivisionModifier(2);
              //smoother.modify( cachedCone);
            }

            cylGeo = cachedCone
          }

          cube = new THREE.Mesh(cylGeo, material)

          var tmpRad = 0.5 * Math.min(this.vertical ? r.width : r.height, totalDepth)

          cube.scale.x = tmpRad
          cube.scale.z = tmpRad
          cube.scale.y = this.vertical ? r.height : r.width

          if (!this.vertical) {
            cube.rotation.z = Math.PI * 0.5
            cube.rotation.y = Math.PI
          }
        } else if (this.path == 7) {
          // ellipsoid

          var eli

          if (!cachedEllipsoid) {
            cachedEllipsoid = new THREE.SphereGeometry(1, 32, 32)

            //var smoother = new THREE.SubdivisionModifier(2);
            //smoother.modify( cachedEllipsoid );
          }

          eli = cachedEllipsoid

          cube = new THREE.Mesh(eli, material)
          cube.scale.set(r.width * 0.5, r.height * 0.5, totalDepth * this.depth)
        } else if (this.path == 6) {
          shape = new THREE.Shape()
          shape.absellipse(0, 0, r.width * 0.5, r.height * 0.5, 0, Math.PI * 2, true)

          var mesh = addShape(shape)
          mesh.position.set(this.cx - width * 0.5, -this.cy + height * 0.5, this.zPos())
          parent.add(mesh)
        } else if (this.path == 8) {
          this.angle0 = 2 * Math.PI - this.angle0
          this.angle1 = 2 * Math.PI - this.angle1

          if (this.torus) {
            var range = Math.abs(this.angle1 - this.angle0),
              segments = Math.max(16, ((90 * Math.PI) / range) | 0),
              geoTorus = new Tee.TorusGeometry(this.radius - this.donut * 0.5, this.donut * 0.5, 16, segments, range)

            var torus = new THREE.Mesh(geoTorus, material)
            torus.position.set(this.center.x - width * 0.5, -this.center.y + height * 0.5, this.zPos() + this.donut)
            torus.rotation.z = this.angle1
            parent.add(torus)
          } else {
            shape = new THREE.Shape()
            shape.moveTo(this.p.x, this.p.y)
            shape.absarc(this.center.x, this.center.y, this.radius, this.angle0, this.angle1, true)
            shape.absarc(this.center.x, this.center.y, this.donut, this.angle0, this.angle1, false)

            var old = this.extrudeOptions.bevelEnabled
            this.extrudeOptions.bevelEnabled = this.beveled

            var mesh = addShape(shape)
            mesh.position.set(-width * 0.5, -height * 0.5, this.zPos())
            parent.add(mesh)

            this.extrudeOptions.bevelEnabled = old
          }
        } else {
          var geoCube

          if (cubeSegments === 1) {
            if (!cachedCube) cachedCube = new THREE.BoxGeometry(1, 1, 1)

            geoCube = cachedCube
          } else {
            if (!cachedSmoothCube) {
              cachedSmoothCube = new THREE.BoxGeometry(1, 1, 1, cubeSegments, cubeSegments, cubeSegments)

              var smoother = new THREE.SubdivisionModifier(2)
              smoother.modify(cachedSmoothCube)
            }

            geoCube = cachedSmoothCube
          }

          cube = new THREE.Mesh(geoCube, material)
          cube.scale.set(r.width, r.height, totalDepth * this.depth)
        }

        if (cube) {
          cube.position.set(r.x + r.width * 0.5 - width * 0.5, -(r.y + r.height * 0.5) + height * 0.5, this.zPos())

          if (this.showShadows) {
            cube.receiveShadow = true
            cube.castShadow = true
          }

          parent.add(cube)
        }
      }

      this.setLineDash = function (dash) {
        this.dash = dash
      }

      this.lineMaterial = function () {
        var m,
          params = { color: this.colorToInt(this.strokeStyle), opacity: this.globalAlpha }

        if (this.dash && this.dash.length > 0) {
          m = new THREE.LineDashedMaterial(params)

          m.dashSize = 3 // this.dash[0]
          m.gapSize = 1 // this.dash[1]
        } else {
          m = new THREE.LineBasicMaterial(params)
          //m = new THREE.MeshPhongMaterial(params);

          m.linecap = this.cap
          m.linejoin = this.join
        }

        m.linewidth = this.lineWidth

        return m
      }

      this.polygon = function (points, format) {
        var t,
          l = points.length,
          p,
          geometry,
          shape = new THREE.Shape(),
          z,
          obj

        // shape.fromPoints(points);  // scale.y = -1

        shape.moveTo(points[0].x, -points[0].y)
        for (t = 1; t < l; t++) {
          p = points[t]
          shape.lineTo(p.x, -p.y)
        }

        geometry = shape.makeGeometry()

        if (format.fill !== '') {
          this.fillStyle = format.fill

          if (this.depth > 0) obj = addShape(shape)
          else {
            var m = this.getMaterial()

            obj = new THREE.Mesh(geometry, m)

            if (!this.wireFrame) m.side = THREE.DoubleSide
          }

          z = totalDepth * (1 - this.z)
          obj.position.set(-width * 0.5, height * 0.5, z - this.depth * 0.5)

          if (this.showShadows) obj.castShadow = true

          parent.add(obj)
        }

        if (format.stroke.fill !== '') {
          geometry = new THREE.Geometry()

          for (t = 0; t < l; t++) {
            p = points[t]
            geometry.vertices.push(new THREE.Vector3(p.x, -p.y, 0))
          }

          var line = new THREE.Line(geometry, this.lineMaterial())

          z = totalDepth * (1 - this.z + this.depth)
          line.position.set(-width * 0.5, height * 0.5, z)
          parent.add(line)
        }
      }

      this.stroke = function () {
        var l = this.items.length,
          material = this.lineMaterial(),
          iz

        if (l > 0) {
          var i,
            line,
            geometry = new THREE.Geometry()

          for (var t = 0; t < l; t++) {
            i = this.items[t]

            iz = i.z === undefined ? this.z : i.z
            iz = totalDepth * (1 - iz)

            if (i.kind == 0) {
              if (geometry.vertices.length > 0) {
                line = new THREE.Line(geometry, material)
                parent.add(line)
              }
              geometry = new THREE.Geometry()
              geometry.vertices.push(new THREE.Vector3(i.x - width * 0.5, -i.y + height * 0.5, iz))
            } else if (i.kind == 1) geometry.vertices.push(new THREE.Vector3(i.x - width * 0.5, -i.y + height * 0.5, iz))
          }

          if (geometry.vertices.length > 0) {
            line = new THREE.Line(geometry, material)
            parent.add(line)
          }
        } else if (this.depth == 0) {
          var p = new THREE.Path(),
            r = this.r

          if (this.path == 0 || this.path == 1) {
            if (this.rx > 0) roundRect(p, r.x, -r.y - r.height, r.width, r.height, this.rx)
            else {
              p.moveTo(r.x, -r.y - r.height)
              p.lineTo(r.x + r.width, -r.y - r.height)
              p.lineTo(r.x + r.width, -r.y)
              p.lineTo(r.x, -r.y)
            }
          } else if (this.path == 6) p.absellipse(this.cx, -this.cy, r.width * 0.5, r.height * 0.5, 0, Math.PI * 2, true)

          line = new THREE.Line(p.createPointsGeometry(), material)
          line.position.set(-width * 0.5, height * 0.5, this.zPos())
          parent.add(line)
        }
      }

      this.measureText = function (text) {
        var res = privateCanvas.measureText(text)
        return { width: res.width * 1.4 } // res is read-only !!
      }

      this.roundRect = function (x, y, width, height, rx, ry) {
        this.path = 0
        this.r = { x: x, y: y, width: width, height: height }
        this.depth = 0
        this.rx = rx
        this.ry = ry
      }

      this.rect = function (x, y, width, height) {
        this.path = 0
        this.r = { x: x, y: y, width: width, height: height }
        this.depth = 0
        this.rx = 0
        this.ry = 0
      }

      this.cube = function (r, round) {
        this.path = 1
        this.r = r
        this.items = []
        cubeSegments = round > 0 ? 6 : 1
      }

      this.sphere = function (cx, cy, rx, ry) {
        if (!cachedSphere) cachedSphere = new THREE.SphereGeometry(1, 32, 32)

        var sphere = new THREE.Mesh(cachedSphere, this.getMaterial())
        sphere.position.set(cx - width * 0.5, -cy + height * 0.5, this.zPos())
        sphere.scale.set(0.5 * rx, 0.5 * ry, 0.5 * Math.min(rx, totalDepth))
        parent.add(sphere)
      }

      this.save = function () {}
      this.clip = function () {}
      this.restore = function () {}

      function stringToColor(color) {
        if (color.substr(0, 4) == 'rgb(') {
          var tmp = color.slice(4, color.length - 1).split(',')
          return tmp[2] | (tmp[1] << 8) | (tmp[0] << 16)
        } else
          switch (color) {
            case 'white':
              return 0xffffff
            case 'silver':
              return 0xe0e0e0
            case 'darkgray':
            case 'darkgrey':
              return 0x808080
            case 'black':
              return 0x0
            case 'red':
              return 0xff0000
            case 'green':
              return 0x00ff00
            case 'blue':
              return 0x0000ff
            default:
              return 0xffffff
          }
      }

      this.colorToInt = function (color) {
        var tmp = color instanceof this.Gradient ? color.colors[color.colors.length - 1] : color
        return tmp.substr(0, 1) == '#' ? parseInt(tmp.substr(1), 16) : stringToColor(tmp)
      }

      this.pyramid = function (r, vertical) {
        var points = [new THREE.Vector3(100, 0, 0), new THREE.Vector3(0, 100, 0), new THREE.Vector3(0, 0, 100), new THREE.Vector3(0, 0, 0)]

        var geo = new THREE.ConvexGeometry(points)
      }

      this.ellipsoid = function (r, vertical) {
        this.path = 7
        this.r = r
        this.vertical = vertical
        this.items = []
      }

      this.cylinder = function (r, topRadius, vertical) {
        this.path = 5
        this.r = r
        this.topRadius = topRadius
        this.vertical = vertical
        this.items = []
      }

      this.ellipsePath = function (cx, cy, w, h) {
        this.path = 6
        this.cx = cx
        this.cy = cy
        this.r = { x: cx, y: cy, width: w, height: h }
        this.items = []
      }

      function getFontSize(font) {
        var s = font.split(' '),
          t,
          res
        for (t = 0; t < s.length; t++) {
          res = parseFloat(s[t])
          if (res) return res
        }

        return 20
      }

      var SHADOW_MAP_WIDTH = 2048,
        SHADOW_MAP_HEIGHT = 1024

      this.addLight = function (kind, color, x, y, z, shadows) {
        var light = new kind(color)

        light.position.set(x, y, z) //.normalize();

        light.shadowsEnabled = shadows

        if (this.showShadows && shadows)
          if (light instanceof THREE.SpotLight || light instanceof THREE.DirectionalLight) {
            light.castShadow = true

            //light.shadowDarkness = 0.1;
            //light.shadowBias= -0.0002;

            //light.shadowMapWidth = SHADOW_MAP_WIDTH;
            //light.shadowMapHeight = SHADOW_MAP_HEIGHT;

            /*
        light.shadowCascade = true;
				light.shadowCascadeCount = 3;
				light.shadowCascadeNearZ = [ -1.000, 0.995, 0.998 ];
				light.shadowCascadeFarZ  = [  0.995, 0.998, 1.000 ];
				light.shadowCascadeWidth = [ 1024, 1024, 1024 ];
				light.shadowCascadeHeight = [ 1024, 1024, 1024 ];
        */
          }

        scene.add(light)
        this.lights.push(light)

        return light
      }

      function findTextCache(text, size) {
        var t,
          l = textCache.length,
          i
        for (t = 0; t < l; t++) {
          i = textCache[t]
          if (i.text === text && i.size === size) return i.obj
        }

        return null
      }

      this.fillText = function (theText, x, y) {
        if (theText === '') return

        var fontsize = getFontSize(this.font),
          text3d = findTextCache(theText, fontsize),
          centerOffset = 0

        if (!text3d) {
          text3d = new THREE.TextGeometry(theText, {
            size: fontsize,
            height: this.textDepth,
            curveSegments: 2,
            font: 'helvetiker'
          })

          text3d.computeBoundingBox()

          textCache.push({ text: theText, obj: text3d, size: fontsize })
        }

        //*** start sizing font check ***
        var sizeTxt = 'Wj'

        var calcText3DHeight = findTextCache(sizeTxt, fontsize)
        if (!calcText3DHeight)
          calcText3DHeight = new THREE.TextGeometry(sizeTxt, {
            size: fontsize,
            height: this.textDepth,
            curveSegments: 2,
            font: 'helvetiker'
          })

        calcText3DHeight.computeBoundingBox()
        var calcB = calcText3DHeight.boundingBox
        textCache.push({ text: sizeTxt, obj: calcText3DHeight, size: fontsize })
        //*** end sizing font check ***

        var b = text3d.boundingBox,
          w = b.max.x - b.min.x

        var h = calcB.max.y - calcB.min.y

        //calcB = null;

        if (this.textAlign === 'center') centerOffset = -0.5 * w
        else if (this.textAlign === 'right' || this.textAlign === 'end') centerOffset = -w

        var textMaterial = new THREE.MeshLambertMaterial({ color: this.colorToInt(this.fillStyle), opacity: this.globalAlpha, overdraw: false })

        var text = new THREE.Mesh(text3d, textMaterial)

        var hOffset = this.textBaseline === 'top' ? h : this.textBaseline == 'middle' ? h * 0.5 : 0

        text.position.x = x + centerOffset - width * 0.5
        text.position.y = -y + height * 0.5 - hOffset + (h - fontsize)
        text.position.z = 1 + totalDepth * (1 - this.z)

        text.rotation.x = 0
        text.rotation.y = Math.PI * 2

        parent.add(text)
      }

      this.update = function () {
        if (this.__webgl) {
          if (trackBall && trackBall.enabled) trackBall.update(1)

          if (this.needsRender) {
            if (this.hitTest) this.doHitTest()

            this.doRender()
          }
        }
      }

      this.setCamera = function (perspective) {
        if (camera) scene.remove(camera)

        if (perspective) camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)
        else camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0.1, 10000)

        this.camera = camera

        camera.lookAt(scene.position)

        //scene.add(camera);

        camera.position.set(0, 0, 800)

        if (trackBall) trackBall.object = camera

        this.refresh()
      }

      this.refresh = function () {
        this.needsRender = true
        this.update()
      }

      this.createTrackball = function () {
        if (renderer && typeof THREE.TrackballControls !== 'undefined') {
          trackBall = this.trackBall = new THREE.TrackballControls(camera, renderer.domElement)

          //trackBall = this.trackBall = new THREE.FirstPersonControls( camera, renderer.domElement );
          //trackBall = this.trackBall = new THREE.RollControls( camera, renderer.domElement );

          trackBall.enabled = true

          trackBall.keys = [65, 83, 68]
          trackBall.dynamicDampingFactor = 0.2

          var ua = typeof navigator != 'undefined' ? navigator.userAgent.toLowerCase() : ''
          if (ua.indexOf('mac os x') > -1) trackBall.zoomSpeed = 0.1 // Chrome Mac ?  (default: 1.2)

          /*
        trackBall.rotateSpeed = 1.0;
        trackBall.panSpeed = 0.8;

        trackBall.noZoom = false;
        trackBall.noPan = false;

        trackBall.staticMoving = true;
         */

          if (trackBall instanceof THREE.TrackballControls)
            trackBall.addEventListener('change', function () {
              o.needsRender = true
              //o.doRender();
            })
        }
      }

      function resizeContainer(width, height) {
        var tmp = container
        tmp.width = width
        tmp.height = height

        renderer.setSize(width, height)

        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }

      var isFull,
        oldFull = {}

      function fullScreenChanged() {
        if (isFull) {
          resizeContainer(oldFull.width, oldFull.height)
          isFull = false
        } else {
          oldFull.width = container.width
          oldFull.height = container.height
          resizeContainer(window.innerWidth, window.innerHeight)
          isFull = true
        }

        o.refresh()
      }

      document.addEventListener('fullscreenchange', fullScreenChanged, false)
      document.addEventListener('mozfullscreenchange', fullScreenChanged, false)
      document.addEventListener('webkitfullscreenchange', fullScreenChanged, false)

      this.fullScreen = function () {
        var tmp = container,
          ok = tmp.requestFullscreen || tmp.mozRequestFullscreen || tmp.webkitRequestFullscreen || tmp.msRequestFullScreen

        if (ok) ok.call(tmp)
      }

      this.onWindowResize = function () {
        if (camera instanceof THREE.PerspectiveCamera) camera.aspect = window.innerWidth / Math.max(1, window.innerHeight)

        camera.updateProjectionMatrix()

        if (renderer) renderer.setSize(window.innerWidth, window.innerHeight)
      }

      this.setShowShadows = function (value) {
        this.showShadows = value

        var t, light

        for (t = 0; t < this.lights.length; t++) {
          light = this.lights[t]

          if (light instanceof THREE.SpotLight || light instanceof THREE.DirectionalLight) if (light.shadowsEnabled) light.castShadow = this.showShadows
        }

        floor.receiveShadow = this.showShadows

        if (renderer) {
          renderer.shadowMapEnabled = this.showShadows
          renderer.shadowMapType = THREE.PCFSoftShadowMap

          if (this.showShadows) renderer.shadowMapAutoUpdate = true
        }
      }

      // Show light positions:

      this.setShowLights = function (value) {
        this.showLights = value

        var t,
          l = this.lights.length,
          light

        for (var t = 0; t < l; t++) {
          light = this.lights[t]

          if (light.__helper) {
            value = light.visible && this.showLights
            light.__helper.traverse(function (object) {
              object.visible = value
            })
          } else if (this.showLights) {
            if (light instanceof THREE.SpotLight) light.__helper = new THREE.SpotLightHelper(light, 16, 100)
            else if (light instanceof THREE.PointLight) light.__helper = new THREE.PointLightHelper(light, 16)
            else if (light instanceof THREE.DirectionalLight) light.__helper = new THREE.DirectionalLightHelper(light, 16, 100)
            else continue // unsupported light class

            scene.add(light.__helper)
          }
        }

        if (!this.needsRender) this.refresh()
      }

      this.showLight = function (index, show) {
        var light = this.lights[index]

        light.visible = show

        if (light.__helper) {
          show = show && this.showLights
          light.__helper.traverse(function (object) {
            object.visible = show
          })
        }

        this.refresh()
      }

      this.doHitTest = function () {
        /*
    var v = new THREE.Vector3( mouse.x, mouse.y, 1 );
    projector.unprojectVector( v, camera );

    var ray = new THREE.Ray( camera.position, v.subSelf( camera.position ).normalize() ),
        found = ray.intersectObjects( scene.children );

    if ( found.length > 0 ) {
        // found[0].object
    }
    else {
    }
    */
      }

      this.doRender = function () {
        //var v=new THREE.Vector3(0,0,0);
        //parent.traverse(function(o) { o.lookAt(o.localToWorld(v)); });

        if (renderer) {
          renderer.render(scene, camera)

          renderer.shadowMapAutoUpdate = false

          if (stats && stats.visible) stats.update()
        }

        this.needsRender = false
      }

      this.clearTextCache = function () {
        textCache = []
      }

      this.toogle = function (element, show) {
        element.visible = show

        if (element.visual) {
          element.visual.traverse(function (o) {
            o.visible = show
          })
          this.needsRender = true
        } else element.chart.draw()

        this.update()
      }

      this.isEnabled = function () {
        return this.__webgl
      }

      // INIT:

      //stats.setMode( 1 );
      //if (renderer)
      //   renderer.domElement.appendChild( stats.domElement );

      // If no Detector.js script is accessible, consider it ok:

      this.__webgl = typeof Detector === 'undefined' || (Detector && Detector.webgl)

      this.needsRender = true

      var totalDepth = 200

      this.showLights = false
      this.showShadows = false

      this.items = []
      this.closedPath = false
      this.z = 0
      this.textDepth = 0
      this.beveled = false

      var cubeSegments = 1,
        altCanvas

      var parent

      this.wireframe = false
      this.globalAlpha = 1

      var oldParent

      var cachedSphere, cachedCylinder, cachedCone, cachedCube, cachedSmoothCube, cachedEllipsoid

      var o = this

      var textCache = []

      var container = document.getElementById(id),
        width = container.clientWidth,
        height = container.clientHeight,
        scene,
        camera,
        renderer

      var tmpCanvas = null

      if (supportsCanvas && container instanceof HTMLCanvasElement) tmpCanvas = container

      // IE: tmpCanvas = container;

      if (this.__webgl) {
        scene = new THREE.Scene()

        //renderer = new THREE.CanvasRenderer({ canvas:container} );

        renderer = new THREE.WebGLRenderer({
          antialias: true,
          canvas: tmpCanvas,
          clearAlpha: 1
          // , preserveDrawingBuffer:true // (screenshots)
        })
      }

      var privateCanvas = null

      if (supportsCanvas) privateCanvas = document.createElement('canvas').getContext('2d')

      //container.addEventListener( 'resize', this.onWindowResize, false );

      this.width = width
      this.height = height
      this.camera = camera
      this.scene = scene
      this.renderer = renderer

      if (renderer) renderer.sortObjects = false
      else this.__webgl = false

      var stats = (this.stats = null)
      // IE8 :
      if (document.addEventListener) {
        if (typeof Stats !== 'undefined') {
          this.stats = new Stats()
          stats = this.stats
          stats.visible = true

          stats.setVisible = function (show) {
            stats.visible = show
            stats.domElement.style.display = show ? 'block' : 'none'
          }
        }
      }

      if (renderer) {
        //scene.fog = new THREE.FogExp2( 0x999999, 0.00025 );

        //scene.fog = new THREE.Fog( 0x999999, 1000, 10000 );

        renderer.setSize(width, height)

        if (this.showShadows) {
          renderer.shadowMapEnabled = true
          renderer.shadowMapSoft = true
        }
      }

      //  if (scene)
      //  scene.add(camera);

      var back = '#AAAA77'
      if (window.getComputedStyle) back = window.getComputedStyle(container).backgroundColor

      if (renderer) {
        renderer.setClearColor(this.colorToInt(back))

        if (container !== renderer.domElement) container.appendChild(renderer.domElement)

        /*
     renderer.gammaInput = true;
     renderer.gammaOutput = true;
     renderer.physicallyBasedShading = true;
     */
      }

      this.lights = []

      if (renderer) {
        this.addLight(THREE.SpotLight, 0xbbbbbb, -300, 300, 400, true)
        this.addLight(THREE.DirectionalLight, 0x888888, 400, 1800, 1600, false)
        this.addLight(THREE.PointLight, 0x888888, 500, 120, -500, false)

        this.setShowLights(this.showLights)

        var ambientLight = (this.ambientLight = new THREE.AmbientLight(0x222222))
        ambientLight.visible = false
        scene.add(ambientLight)

        var hemiLight = (this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5))
        //    hemiLight.color.setHSV( 0.6, 0.45, 1 );
        //    hemiLight.groundColor.setHSV( 0.1, 0.45, 0.95 );
        hemiLight.position.y = 500

        //hemiLight.shadowsEnabled=true;
        //hemiLight.castShadow=true;

        hemiLight.visible = false

        scene.add(hemiLight)

        var texture = null

        /*
    texture = THREE.ImageUtils.loadTexture( 'textures/charcoal.png' );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 10, 10 );
    */

        var floor = (this.floor = new THREE.Mesh( //new THREE.BoxGeometry( 10000, 10000, 10 ),
          new THREE.CylinderGeometry(4000, 4000, 50, 32, 1),
          new THREE.MeshLambertMaterial({
            color: this.colorToInt('silver'),

            map: texture,
            //  , map: THREE.ImageUtils.loadTexture('http://steema.us/files/jscript/beta/nov_2012/demos/images/metal.jpg')
            //  , ambient:0xFFFFFF
            //  , side:THREE.DoubleSide

            opacity: 0.9,
            transparent: true
          })
        ))

        //floor.material.map.wrapS = floor.material.map.wrapT = THREE.RepeatWrapping;
        //floor.material.map.repeat.set( 5, 5 );

        if (this.showShadows) floor.receiveShadow = true

        floor.position.y = -20 - height * 0.5

        //floor.rotation.x = - Math.PI / 2;

        scene.add(floor)

        //var axis = this.axis = new THREE.AxisHelper(1200);
        //scene.add(axis);

        var trackBall = (this.trackBall = null)

        this.setCamera(true)

        this.createTrackball()
      }

      this.needsRender = true
    }
  }).call(this)

  /** 3D */

  /** MAPS */

  /**
   * @preserve TeeChart(tm) for JavaScript(tm)
   * @fileOverview TeeChart for JavaScript(tm)
   * v3.10 Jun 2024
   * Copyright(c) 2012-2024 by Steema Software SL. All Rights Reserved.
   * http://www.steema.com
   *
   * Licensed with commercial and non-commercial attributes,
   * specifically: http://www.steema.com/licensing/html5
   *
   * JavaScript is a trademark of Oracle Corporation.
   */

  /**
   * @author <a href="mailto:david@steema.com">Steema Software</a>
   * @version 2.4
   */

  /*global document, exports */
  ;(function () {
    'use strict'

    if (typeof exports !== 'undefined') exports.Tee = Tee

    /**
     * @constructor
     * @class Generic base class to represent an SVG object.
     */
    Tee.SVGMap = function (id, left, top, width, height) {
      var d = document,
        map = this,
        ns = (this.ns = 'http://www.w3.org/2000/svg')

      this.svg = id ? d.getElementById(id) : d.createElement('SVG')

      this.size = { x: left, y: top, width: width, height: height }

      this.values = {}
      this.labels = []
      this.tooltip = { enabled: true }

      var sa = this.svg.setAttribute
      sa.call(this.svg, 'version', '1.2')
      sa.call(this.svg, 'baseProfile', 'tiny')

      sa.call(this.svg, 'viewBox', '' + left + ' ' + top + ' ' + width + ' ' + height)

      var content = (this.content = d.createElementNS(ns, 'g'))
      content.setAttribute('id', 'content')

      // css box-shadow not available for SVG elements:
      /*
  <defs>
    <filter id="f1" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceAlpha" dx="20" dy="20" />
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
  */

      this.svg.onmousemove = function (e) {
        if (!map.tooltip.enabled) return

        var items = this.ownerDocument.elementFromPoint(e.clientX, e.clientY),
          id = items.getAttribute('id'),
          s = map.labels[id],
          v = map.values[id]

        if (s === undefined) {
          if (map.onhoverout) map.onhoverout(id)
        } else {
          if (v !== undefined) s += '<br/>' + v

          Tee.DOMTip.show(s)

          if (map.onhover) map.onhover(id)
        }
      }

      this.svg.onmouseup = function (e) {
        var items = this.ownerDocument.elementFromPoint(e.clientX, e.clientY),
          id = items.getAttribute('id')

        if (map.onclick && id && id !== undefined && items !== this) map.onclick(id, items)
      }

      this.svg.onmouseout = function () {
        if (map.tooltip.enabled) Tee.DOMTip.hide()
      }

      var matrix = [1, 0, 0, 1, 0, 0]

      function zoom(factor) {
        for (var t = 0; t < matrix.length; t++) matrix[t] *= factor

        var b = map.svg.viewBox.baseVal

        matrix[4] += (1 - factor) * b.width * 0.5
        matrix[5] += (1 - factor) * b.height * 0.5

        content.setAttributeNS(null, 'transform', 'matrix(' + matrix.join(' ') + ')')
      }

      function createButton(id, x, y) {
        var group = d.createElementNS(ns, 'g')

        group.setAttribute('id', id)
        group.setAttribute('class', 'button')
        group.setAttribute('cursor', 'pointer')

        var r = d.createElementNS(ns, 'rect')

        r.setAttribute('x', x + left)
        r.setAttribute('y', y + top)
        r.setAttribute('width', 150)
        r.setAttribute('height', 150)
        r.setAttribute('rx', 40)
        r.setAttribute('style', 'fill:#CCAA22; stroke:black;')

        group.appendChild(r)
        map.svg.appendChild(group)

        return group
      }

      this.createRect = function (x, y, width, height) {
        var r = d.createElementNS(ns, 'rect')

        r.setAttribute('x', this.size.x + x)
        r.setAttribute('y', this.size.y + y)
        r.setAttribute('width', width)
        r.setAttribute('height', height)
        return r
      }

      this.addZoomButtons = function () {
        var top = 50,
          zoomin = createButton('zoomin', 25, top)

        zoomin.appendChild(this.createRect(45, top + 55, 110, 40))
        zoomin.appendChild(this.createRect(80, top + 20, 40, 110))
        zoomin.onclick = function () {
          zoom(1.1)
        }

        top += 240
        var zoomout = createButton('zoomout', 25, 250)
        zoomout.appendChild(this.createRect(45, top + 20, 110, 40))
        zoomout.onclick = function () {
          zoom(0.9)
        }
      }

      // Change all polygon colors according to a "colors" palette and each
      // polygon value.
      // Returns a legend (an array of: { min,max,color } )

      this.applyPalette = function (colors) {
        this.palette = colors

        var b = this.content.childNodes,
          l = b.length,
          i,
          v = this.values,
          min = Infinity,
          max = -min,
          hasValue,
          //lV=v.length,
          o,
          v2,
          v3,
          range = 0,
          result = []

        if (colors) {
          for (o in v) {
            v2 = v[o]
            if (v2 < min) min = v2
            else if (v2 > max) max = v2
          }

          range = (max - min) / colors.length

          for (i = 0; i < colors.length; i++) result.push({ min: min + i * range, max: min + (i + 1) * range, color: colors[i] })
        }

        // Traverse all polygons

        if (colors && range > 0)
          while ((i = b[--l])) {
            hasValue = v[i.id]

            if (hasValue) {
              v3 = ((hasValue - min) / range) | 0
              if (v3 == colors.length) v3--

              i.style.fill = colors[v3]
            } else i.style.fill = ''
          }
        else while ((i = b[--l])) i.style.fill = ''

        result.map = this
        return result
      }

      this.find = function (id) {
        return this.svg.ownerDocument.getElementById(id)
      }
    }

    /**
     * @constructor
     * @augments Tee.SVGMap
     * @class SVG LayoutMap.
     */
    Tee.LayoutMap = function (id, left, top, width, height) {
      var b = (this.bounds = { x: left || 0, y: top || 0, width: width || 10, height: height || 10 }),
        lat = 0,
        lon = 0

      Tee.SVGMap.call(this, id, 0, 0, b.width, b.height)

      this.size.offx = 0
      this.size.offy = 0

      var d = document,
        p,
        gg,
        txt,
        ns = this.ns,
        po = 'points',
        _this = this,
        content = this.content

      /**
       * Draws a path
       */
      this.nPPath = function (t, instruct, clr, wdth, ps) {
        //if ((!_this.filter) || (_this.filter.indexOf(t)!=-1)) {
        p = d.createElementNS(ns, 'path')
        p.setAttribute('d', instruct)
        p.setAttribute(po, ps)
        p.style.stroke = clr
        p.style.strokeWidth = wdth
        content.appendChild(p)
        //}
      }
      /*newpath = document.createElementNS("SVG","path");  
newpath.setAttribute("id", "pathIdD");  
newpath.setAttribute("d", "M 1,97.857143 C 19.285714,96.428571 24.016862,131.64801 90.714286,132.85714 140.78762,133.7649 202.79376,66.16041 202.79376,66.16041");  
newpath.setAttribute("stroke", "black");  
newpath.setAttribute("stroke-width", 3);  
newpath.setAttribute("opacity", 1);  
newpath.setAttribute("fill", "none");

document.getElementById("fullPageID").appendChild(newpath);*/

      /**
       * Draws a polygon
       * @param {string} t element id.
       * @param {point[]} ps Polygon points.
       */
      this.nP = function nP(t, ps) {
        if (!_this.filter || _this.filter.indexOf(t) != -1) {
          p = d.createElementNS(ns, 'polygon')
          p.setAttribute('id', t)
          p.setAttribute(po, ps)
          content.appendChild(p)
        }
      }

      /**
       * Draws a circle/ellipse
       * @param {string} t element id.
       * @param {number} aX Centre x location.
       * @param {number} aY Centre y location.
       * @param {number} aRX x radius.
       * @param {number} aRX y radius.
       */
      this.nC = function (t, aX, aY, aRX, aRY) {
        //circle/ellipse

        var shape = d.createElementNS(ns, 'ellipse')
        shape.setAttribute('cx', aX)
        shape.setAttribute('cy', aY)
        shape.setAttribute('rx', aRX)
        shape.setAttribute('ry', aRY)
        shape.setAttribute('id', t)
        //shape.setAttributeNS(null, "fill", aColor);

        content.appendChild(shape)
      }

      /**
       * Draws a polygon
       * @param {string} t element id.
       * @param {Color} clr Stroke color.
       * @param {number} wdth Stroke width.
       * @param {point[]} ps Polygon points.
       */
      this.nPEnh = function (t, clr, wdth, ps) {
        if (!_this.filter || _this.filter.indexOf(t) != -1) {
          p = d.createElementNS(ns, 'polygon')
          p.setAttribute('id', t)
          p.setAttribute(po, ps)
          p.style.stroke = clr
          p.style.strokeWidth = wdth
          content.appendChild(p)
        }
      }

      /*
  function nP(t, ps) {
    if ((!_this.filter) || (_this.filter.indexOf(t)!=-1)) {
      p=d.createElementNS(ns, "polygon");
      p.setAttribute("id", t);
      p.setAttribute(po,ps);
      content.appendChild(p);
    }
  }
*/

      /**
       * Draws a text element
       * @param {string} t element id.
       * @param {number} aX Text x location.
       * @param {number} aY Text y location.
       * @param {string} aFamily Font family.
       * @param {string} text Text to render.
       */
      this.nPTxt = function (t, aX, aY, aFamily, text) {
        if (!_this.filter || _this.filter.indexOf(t) != -1) {
          txt = d.createElementNS(ns, 'text')
          //txt.setAttribute("id", t);
          txt.setAttribute('textContent', text)
          txt.setAttribute('x', aX)
          txt.setAttribute('y', aY)
          //txt.setAttribute("fill", "blue");
          txt.setAttribute('font-family', aFamily)

          content.appendChild(txt)
        }
      }

      this.labels = { AF: 'PN' }

      this.svg.appendChild(content)
    }

    Tee.LayoutMap.prototype = new Tee.SVGMap()

    /**
     * @constructor
     * @augments Tee.SVGMap
     * @class SVG World Map (all countries).
     */
    Tee.WorldMap = function (id, left, top, width, height) {
      var b = (this.bounds = { x: left || -180, y: top || 85, width: width || 360, height: height || 145 }),
        lat = 2800 / 180,
        lon = 3600 / 360

      Tee.SVGMap.call(this, id, 100 + (b.x + 180) * lon, -200 + (90 - b.y) * lat, b.width * lon, b.height * lat)

      this.size.offx = 70
      this.size.offy = 283

      var d = document,
        p,
        ns = this.ns,
        po = 'points',
        //svg=this.svg,
        _this = this,
        content = this.content

      function nP(t, ps) {
        if (!_this.filter || _this.filter.indexOf(t) != -1) {
          p = d.createElementNS(ns, 'polygon')
          p.setAttribute('id', t)
          p.setAttribute(po, ps)
          content.appendChild(p)
        }
      }

      this.labels = {
        AF: 'Afghanistan',
        AL: 'Albania',
        DZ: 'Algeria',
        AS: 'American Samoa',
        AD: 'Andorra',
        AO: 'Angola',
        AI: 'Anguilla',
        AQ: 'Antarctica',
        AG: 'Antigua and Barbuda',
        AR: 'Argentina',
        AM: 'Armenia',
        AW: 'Aruba',
        AU: 'Australia',
        AT: 'Austria',
        AZ: 'Azerbaijan',
        BS: 'Bahamas',
        BH: 'Bahrain',
        BD: 'Bangladesh',
        BB: 'Barbados',
        BY: 'Belarus',
        BE: 'Belgium',
        BZ: 'Belize',
        BJ: 'Benin',
        BM: 'Bermuda',
        BT: 'Bhutan',
        BO: 'Bolivia',
        BA: 'Bosnia and Herzegovina',
        BW: 'Botswana',
        BV: 'Bouvet Island',
        BR: 'Brazil',
        IO: 'British Indian Ocean Territory',
        BN: 'Brunei Darussalam',
        BG: 'Bulgaria',
        BF: 'Burkina Faso',
        BI: 'Burundi',
        KH: 'Cambodia',
        CM: 'Cameroon',
        CA: 'Canada',
        CV: 'Cape Verde',
        KY: 'Cayman Islands',
        CF: 'Central African Republic',
        TD: 'Chad',
        CL: 'Chile',
        CN: 'China',
        CX: 'Christmas Island',
        CC: 'Cocos (Keeling) Islands',
        CO: 'Colombia',
        KM: 'Comoros',
        CG: 'Congo',
        CD: 'Congo',
        CK: 'Cook Islands',
        CR: 'Costa Rica',
        CI: "Cote d'Ivoire",
        HR: 'Croatia',
        CU: 'Cuba',
        CY: 'Cyprus',
        CZ: 'Czech Republic',
        DK: 'Denmark',
        DJ: 'Djibouti',
        DM: 'Dominica',
        DO: 'Dominican Republic',
        EC: 'Ecuador',
        EG: 'Egypt',
        SV: 'El Salvador',
        GQ: 'Equatorial Guinea',
        EL: 'Greece',
        ER: 'Eritrea',
        EE: 'Estonia',
        ET: 'Ethiopia',
        FK: 'Falkland Islands (Malvinas)',
        FO: 'Faroe Islands',
        FJ: 'Fiji',
        FI: 'Finland',
        FR: 'France',
        GF: 'French Guiana',
        PF: 'French Polynesia',
        TF: 'French Southern Territories',
        GA: 'Gabon',
        GM: 'Gambia',
        GE: 'Georgia',
        DE: 'Germany',
        GH: 'Ghana',
        GI: 'Gibraltar',
        GR: 'Greece',
        GL: 'Greenland',
        GD: 'Grenada',
        GP: 'Guadeloupe',
        GU: 'Guam',
        GT: 'Guatemala',
        GG: 'Guernsey',
        GN: 'Guinea',
        GW: 'Guinea-Bissau',
        GY: 'Guyana',
        HT: 'Haiti',
        HM: 'Heard Island and McDonald Islands',
        VA: 'Holy See (Vatican City State)',
        HN: 'Honduras',
        HK: 'Hong Kong',
        HU: 'Hungary',
        IS: 'Iceland',
        IN: 'India',
        ID: 'Indonesia',
        IR: 'Iran',
        IQ: 'Iraq',
        IE: 'Ireland',
        IM: 'Isle of Man',
        IL: 'Israel',
        IT: 'Italy',
        JM: 'Jamaica',
        JP: 'Japan',
        JE: 'Jersey',
        JO: 'Jordan',
        KZ: 'Kazakhstan',
        KE: 'Kenya',
        KI: 'Kiribati',
        KP: 'North Korea',
        KR: 'South Korea',
        KW: 'Kuwait',
        KG: 'Kyrgyzstan',
        LA: "Lao People's Democratic Republic",
        LV: 'Latvia',
        LB: 'Lebanon',
        LS: 'Lesotho',
        LR: 'Liberia',
        LY: 'Libyan Arab Jamahiriya',
        LI: 'Liechtenstein',
        LT: 'Lithuania',
        LU: 'Luxembourg',
        MO: 'Macao',
        MK: 'Macedonia',
        MG: 'Madagascar',
        MW: 'Malawi',
        MY: 'Malaysia',
        MV: 'Maldives',
        ML: 'Mali',
        MT: 'Malta',
        MH: 'Marshall Islands',
        MQ: 'Martinique',
        MR: 'Mauritania',
        MU: 'Mauritius',
        YT: 'Mayotte',
        MX: 'Mexico',
        FM: 'Micronesia',
        MD: 'Moldova',
        MC: 'Monaco',
        MN: 'Mongolia',
        ME: 'Montenegro',
        MS: 'Montserrat',
        MA: 'Morocco',
        MZ: 'Mozambique',
        MM: 'Myanmar',
        NA: 'Namibia',
        NR: 'Nauru',
        NP: 'Nepal',
        NL: 'Netherlands',
        AN: 'Netherlands Antilles',
        NC: 'New Caledonia',
        NZ: 'New Zealand',
        NI: 'Nicaragua',
        NE: 'Niger',
        NG: 'Nigeria',
        NU: 'Niue',
        NF: 'Norfolk Island',
        MP: 'Northern Mariana Islands',
        NO: 'Norway',
        OM: 'Oman',
        PK: 'Pakistan',
        PW: 'Palau',
        PS: 'Palestinian Territory',
        PA: 'Panama',
        PG: 'Papua New Guinea',
        PY: 'Paraguay',
        PE: 'Peru',
        PH: 'Philippines',
        PN: 'Pitcairn',
        PL: 'Poland',
        PT: 'Portugal',
        PR: 'Puerto Rico',
        QA: 'Qatar',
        RE: 'Reunion',
        RO: 'Romania',
        RU: 'Russian Federation',
        RW: 'Rwanda',
        SH: 'Saint Helena',
        KN: 'Saint Kitts and Nevis',
        LC: 'Saint Lucia',
        PM: 'Saint Pierre and Miquelon',
        VC: 'Saint Vincent and the Grenadines',
        WS: 'Samoa',
        SM: 'San Marino',
        ST: 'Sao Tome and Principe',
        SA: 'Saudi Arabia',
        SN: 'Senegal',
        RS: 'Serbia',
        SC: 'Seychelles',
        SL: 'Sierra Leone',
        SG: 'Singapore',
        SK: 'Slovakia',
        SI: 'Slovenia',
        SB: 'Solomon Islands',
        SO: 'Somalia',
        ZA: 'South Africa',
        GS: 'South Georgia and the South Sandwich Islands',
        ES: 'Spain',
        LK: 'Sri Lanka',
        SD: 'Sudan',
        SR: 'Suriname',
        SJ: 'Svalbard and Jan Mayen',
        SZ: 'Swaziland',
        SE: 'Sweden',
        CH: 'Switzerland',
        SY: 'Syrian Arab Republic',
        TW: 'Taiwan',
        TJ: 'Tajikistan',
        TZ: 'Tanzania',
        TH: 'Thailand',
        TL: 'Timor-Leste',
        TG: 'Togo',
        TK: 'Tokelau',
        TO: 'Tonga',
        TT: 'Trinidad and Tobago',
        TN: 'Tunisia',
        TR: 'Turkey',
        TM: 'Turkmenistan',
        TC: 'Turks and Caicos Islands',
        TV: 'Tuvalu',
        UG: 'Uganda',
        UA: 'Ukraine',
        AE: 'United Arab Emirates',
        GB: 'United Kingdom',
        US: 'United States',
        UM: 'United States Minor Outlying Islands',
        UY: 'Uruguay',
        UZ: 'Uzbekistan',
        VU: 'Vanuatu',
        VE: 'Venezuela',
        VN: 'Viet Nam',
        VG: 'Virgin Islands British',
        VI: 'Virgin Islands U.S.',
        WF: 'Wallis and Futuna',
        EH: 'Western Sahara',
        YE: 'Yemen',
        ZM: 'Zambia',
        ZW: 'Zimbabwe'
      }

      nP('EE', '2186,589 2180,585 2186,584 2190,587')
      nP(
        'EE',
        '2234,607 2225,607 2213,598 2203,602 2206,595 2197,594 2195,589 2199,588 2195,587 2194,585 2196,585 2194,584 2195,581 2208,576 2214,577 2215,575 2240,577 2242,580 2234,587 2235,596 2238,602 2236,602'
      )
      nP(
        'FI',
        '2250,433 2245,435 2248,436 2245,441 2247,446 2254,448 2261,454 2251,466 2262,484 2258,484 2256,491 2259,492 2257,495 2262,498 2260,501 2261,503 2266,506 2266,509 2260,513 2276,526 2273,532 2238,561 2225,566 2228,561 2227,560 2224,564 2218,564 2219,566 2217,564 2205,570 2197,570 2195,569 2192,572 2193,569 \
2191,571 2189,567 2191,564 2186,566 2184,566 2186,564 2174,560 2175,546 2177,546 2173,540 2174,535 2171,530 2174,524 2177,524 2175,521 2183,520 2183,516 2193,511 2205,497 2215,495 2213,486 2207,484 2206,483 2207,481 2202,482 2197,474 2200,467 2196,462 2198,458 2194,457 2195,451 2197,450 2188,443 2180,442 \
2166,433 2171,433 2170,431 2173,429 2177,430 2184,438 2192,440 2200,436 2209,440 2218,434 2217,430 2220,423 2225,420 2239,418 2251,424 2253,427 2248,430'
      )
      nP('EE', '2180,601 2182,597 2178,595 2180,594 2178,592 2189,590 2193,593 2184,596')
      nP('EC', '1040,1473 1042,1471 1044,1474 1048,1484 1046,1488 1041,1488 1041,1485 1045,1482')
      nP(
        'EC',
        '1203,1475 1200,1475 1204,1482 1204,1488 1202,1487 1201,1497 1190,1512 1178,1518 1174,1526 1173,1525 1169,1542 1166,1549 1163,1548 1160,1540 1155,1538 1151,1540 1153,1537 1151,1534 1154,1532 1153,1524 1157,1519 1158,1504 1157,1512 1155,1512 1156,1508 1153,1514 1147,1508 1146,1506 1149,1502 1147,1489 1150,1487 \
1152,1482 1153,1483 1151,1479 1155,1472 1156,1461 1166,1456 1168,1452 1175,1460 1179,1461 1182,1468 1191,1470 1194,1467'
      )
      nP(
        'IE',
        '1869,673 1869,671 1857,669 1857,667 1862,666 1860,664 1863,662 1859,662 1861,661 1858,656 1874,656 1872,655 1877,650 1871,649 1875,647 1874,645 1876,643 1881,641 1882,643 1882,641 1884,643 1882,646 1884,644 1885,639 1889,641 1886,644 1877,653 1883,658 1886,658 1889,654 1893,659 1896,658 1898,660 \
1895,661 1898,666 1897,670 1899,676 1894,685 1895,687 1889,686 1889,688 1883,689 1877,693 1875,692 1876,694 1866,698 1861,698 1863,694 1857,696 1863,692 1855,693 1856,690 1861,688 1854,687 1861,686 1860,684 1862,682 1871,680 1859,682 1866,673'
      )
      nP(
        'EG',
        '2287,1025 2286,1021 2284,1028 2286,1031 2287,1037 2296,1053 2295,1057 2299,1063 2300,1072 2312,1104 2319,1113 2315,1113 2317,1127 2329,1142 2275,1142 2275,1138 2273,1142 2210,1142 2210,1033 2207,1019 2210,1010 2209,1001 2212,997 2213,999 2220,997 2233,1001 2251,1009 2261,1002 2263,1003 2264,999 2270,998 \
2266,1000 2269,1000 2272,999 2270,997 2280,998 2282,1002 2279,998 2278,1002 2282,1005 2287,1006 2303,1001 2303,1002 2303,1003 2308,1020 2309,1029 2303,1056 2293,1043 2292,1037'
      )
      nP('FJ', '3748,1747 3739,1746 3738,1743 3741,1737 3748,1734 3752,1739 3753,1745')
      nP('FJ', '3766,1717 3761,1725 3765,1721 3765,1726 3759,1725 3753,1730 3751,1726')
      nP('AR', '1353,2254 1355,2252 1350,2252 1350,2247 1354,2249 1365,2248 1353,2259 1351,2260 1347,2258')
      nP(
        'AR',
        '1363,2262 1360,2258 1365,2252 1367,2254 1365,2250 1367,2250 1366,2248 1372,2246 1374,2248 1371,2248 1374,2251 1379,2249 1376,2251 1380,2252 1373,2255 1370,2258 1364,2256 1366,2260 1362,2259'
      )
      nP(
        'ER',
        '2381,1267 2384,1274 2392,1282 2388,1287 2385,1285 2369,1260 2363,1256 2353,1255 2351,1253 2345,1256 2340,1249 2336,1261 2333,1256 2326,1258 2325,1245 2330,1228 2330,1216 2335,1217 2336,1212 2343,1209 2347,1202 2358,1246 2359,1240 2362,1248 2372,1253'
      )
      nP(
        'ET',
        '2390,1308 2387,1313 2389,1319 2395,1331 2401,1338 2431,1353 2441,1353 2410,1399 2398,1400 2392,1403 2389,1408 2382,1410 2380,1413 2372,1414 2368,1409 2359,1415 2356,1422 2342,1419 2331,1407 2321,1406 2320,1404 2318,1401 2319,1393 2313,1392 2307,1373 2298,1358 2290,1354 2293,1346 2298,1347 2302,1344 2303,1314 \
2306,1309 2308,1312 2310,1310 2311,1295 2317,1283 2322,1282 2326,1258 2333,1256 2336,1261 2340,1249 2345,1256 2351,1253 2353,1255 2363,1256 2369,1260 2385,1285 2379,1296 2379,1307'
      )
      nP('SV', '1056,1267 1055,1266 1060,1259 1060,1256 1062,1256 1071,1265 1074,1263 1078,1264 1078,1271 1076,1275 1074,1275')
      nP('GF', '1411,1438 1415,1432 1417,1421 1413,1412 1412,1402 1415,1393 1418,1387 1428,1391 1437,1403 1437,1408 1439,1404 1440,1413 1428,1440 1420,1438 1416,1441')
      nP(
        'CZ',
        '2148,727 2145,728 2137,737 2132,737 2129,741 2110,735 2107,742 2098,739 2086,729 2084,725 2085,722 2080,715 2083,717 2089,714 2103,707 2103,704 2108,707 2111,705 2113,708 2123,710 2124,711 2122,714 2126,719 2130,717 2129,714 2137,715 2136,719 2146,721'
      )
      nP(
        'CF',
        '2235,1398 2231,1395 2225,1397 2215,1392 2213,1398 2207,1399 2204,1396 2194,1404 2189,1401 2183,1411 2166,1407 2158,1397 2154,1396 2145,1408 2146,1421 2145,1418 2142,1421 2134,1417 2126,1420 2122,1440 2121,1430 2112,1418 2111,1409 2107,1403 2105,1394 2106,1384 2104,1382 2108,1378 2115,1360 2119,1360 2125,1355 \
2128,1360 2136,1353 2146,1352 2151,1343 2149,1340 2150,1338 2164,1336 2177,1319 2177,1313 2185,1308 2189,1309 2197,1325 2195,1342 2202,1342 2202,1348 2208,1350 2213,1355 2212,1360 2224,1373 2225,1382 2232,1386'
      )
      nP('CU', '1163,1133 1161,1131 1160,1129 1163,1132')
      nP(
        'CU',
        '1187,1150 1191,1154 1200,1156 1199,1162 1207,1162 1215,1168 1213,1171 1205,1174 1205,1173 1205,1172 1204,1173 1204,1174 1179,1175 1185,1167 1184,1162 1175,1161 1171,1157 1169,1147 1164,1149 1156,1146 1151,1139 1147,1141 1138,1139 1134,1136 1139,1135 1137,1132 1128,1131 1122,1139 1117,1139 1116,1143 1111,1145 \
1111,1143 1106,1144 1112,1142 1111,1139 1114,1134 1124,1127 1144,1124 1156,1128 1163,1136 1170,1137 1183,1147 1181,1143 1185,1147 1182,1148 1184,1150 1186,1148'
      )
      nP('DK', '2046,620 2044,620 2042,618 2046,613 2053,612 2059,606 2066,604 2064,606 2065,611 2063,615 2051,614 2045,617')
      nP('CU', '1172,1136 1169,1134 1173,1135')
      nP('KY', '1142,1182 1143,1181 1145,1183')
      nP(
        'CO',
        '1177,1434 1179,1434 1186,1414 1183,1415 1184,1412 1182,1413 1184,1409 1181,1390 1184,1387 1181,1380 1183,1374 1177,1364 1179,1357 1180,1360 1184,1354 1181,1346 1182,1343 1189,1354 1187,1344 1193,1339 1195,1333 1200,1331 1201,1314 1208,1306 1213,1308 1210,1309 1212,1311 1215,1303 1223,1303 1234,1294 1235,1289 \
1237,1290 1239,1286 1244,1288 1245,1292 1243,1295 1237,1298 1231,1306 1223,1335 1226,1333 1229,1337 1233,1351 1232,1360 1236,1368 1255,1368 1264,1382 1278,1378 1282,1380 1278,1393 1278,1405 1280,1416 1284,1422 1278,1430 1285,1437 1288,1455 1286,1456 1286,1449 1282,1441 1277,1447 1275,1444 1275,1447 1258,1448 \
1258,1457 1264,1458 1265,1464 1256,1464 1256,1476 1260,1481 1263,1493 1257,1537 1253,1531 1249,1530 1256,1515 1253,1511 1248,1507 1243,1509 1239,1506 1234,1511 1227,1511 1225,1508 1225,1501 1221,1500 1221,1494 1214,1489 1212,1482 1209,1476 1203,1475 1194,1467 1191,1470 1182,1468 1179,1461 1175,1460 1168,1452 \
1166,1449 1168,1446 1170,1447 1170,1437 1175,1436'
      )
      nP(
        'CM',
        '2053,1414 2049,1412 2048,1403 2045,1405 2045,1401 2048,1395 2048,1385 2057,1375 2057,1371 2061,1368 2065,1370 2066,1367 2070,1372 2071,1376 2073,1376 2078,1367 2077,1364 2080,1359 2082,1347 2088,1341 2089,1332 2092,1329 2092,1322 2094,1320 2098,1307 2106,1299 2106,1290 2101,1287 2100,1276 2104,1276 2105,1281 \
2108,1283 2110,1291 2110,1311 2116,1323 2102,1323 2099,1328 2112,1346 2115,1356 2115,1360 2108,1378 2104,1382 2106,1384 2105,1394 2107,1403 2111,1409 2112,1418 2121,1430 2122,1440 2120,1448 2117,1444 2105,1441 2093,1441 2083,1438 2073,1439 2073,1441 2060,1441 2058,1438 2059,1424 2055,1416 2057,1415 2054,1411 \
'
      )
      nP(
        'CR',
        '1130,1329 1127,1331 1127,1337 1129,1339 1126,1348 1127,1352 1122,1342 1121,1342 1123,1347 1119,1344 1120,1337 1110,1329 1108,1323 1103,1320 1107,1326 1104,1329 1099,1324 1097,1317 1099,1313 1097,1309 1099,1306 1100,1304 1107,1309 1109,1306 1117,1312 1119,1309 1123,1318'
      )
      nP('CO', '1182,1408 1183,1409 1181,1410')
      nP('DK', '2075,642 2072,642 2070,635 2068,634 2075,632 2072,630 2077,630 2077,635 2079,631 2080,635 2080,631 2078,630 2086,629 2086,634 2081,638 2084,640 2080,643 2081,645')
      nP(
        'DK',
        '2041,634 2040,631 2041,633 2043,631 2040,630 2042,619 2046,623 2050,618 2050,621 2053,622 2051,620 2052,615 2063,615 2063,619 2058,620 2061,623 2069,623 2067,627 2065,628 2064,625 2062,627 2061,632 2058,632 2059,634 2055,634 2058,636 2057,637 2055,639 2056,642 2054,643 2057,646 2054,647 2051,647 2046,646 \
2046,643 2044,643 2046,639 2040,636'
      )
      nP(
        'DO',
        '1267,1196 1258,1195 1251,1199 1249,1196 1246,1198 1242,1208 1239,1202 1239,1197 1236,1193 1239,1191 1239,1176 1240,1174 1246,1173 1257,1177 1259,1183 1264,1182 1264,1184 1260,1186 1267,1187 1273,1193 1270,1199'
      )
      nP('DO', '1271,1199 1270,1200 1269,1199')
      nP('DK', '2059,637 2063,636 2064,638 2066,636 2067,643 2061,644 2056,637')
      nP('CU', '1176,1138 1174,1136 1174,1135')
      nP('CU', '1179,1143 1177,1140 1180,1141')
      nP('CU', '1177,1140 1176,1140 1177,1139')
      nP('CY', '2293,950 2285,951 2283,945 2306,936 2300,942 2301,947 2297,947')
      nP('CU', '1127,1150 1124,1148 1127,1148 1125,1145 1126,1143 1129,1144 1131,1148')
      nP(
        'IS',
        '1738,503 1743,500 1737,502 1734,497 1720,498 1718,496 1740,494 1741,491 1733,492 1741,487 1735,487 1737,485 1719,488 1713,487 1715,485 1720,486 1717,482 1723,485 1726,483 1719,481 1726,482 1720,479 1724,479 1722,477 1724,476 1734,481 1733,478 1728,476 1734,475 1726,474 1729,472 1744,479 1742,480 1745,480 \
1745,483 1741,483 1745,485 1747,492 1749,485 1752,484 1754,487 1755,485 1754,478 1757,477 1764,483 1764,478 1770,476 1778,485 1775,477 1782,479 1787,476 1793,478 1794,475 1793,472 1798,471 1805,477 1811,474 1807,477 1812,479 1810,483 1815,482 1813,487 1816,484 1822,486 1821,489 1823,490 1818,491 1824,493 \
1819,493 1822,495 1818,495 1821,496 1818,498 1813,497 1815,499 1813,500 1813,503 1809,505 1805,504 1794,511 1780,513 1779,516 1771,518 1757,516 1753,514 1755,513 1747,510 1731,512 1731,508 1738,509 1741,507 1739,506 1741,505 1745,503 1737,505'
      )
      nP(
        'ID',
        '3073,1517 3070,1520 3069,1517 3066,1518 3065,1504 3062,1501 3064,1493 3061,1488 3056,1486 3056,1483 3058,1484 3055,1482 3054,1477 3055,1476 3055,1472 3052,1469 3052,1461 3056,1452 3053,1455 3054,1450 3060,1442 3060,1449 3069,1460 3075,1457 3082,1458 3088,1450 3093,1450 3100,1455 3103,1452 3109,1452 3112,1444 \
3112,1439 3116,1436 3114,1434 3115,1430 3118,1428 3120,1411 3122,1408 3136,1408 3140,1410 3138,1411 3142,1418 3134,1419 3138,1422 3136,1425 3140,1427 3145,1438 3142,1442 3142,1445 3154,1458 3152,1461 3147,1461 3143,1456 3144,1461 3141,1462 3138,1472 3138,1481 3140,1480 3140,1485 3136,1486 3133,1492 3131,1489 \
3131,1494 3126,1500 3128,1500 3127,1506 3130,1507 3129,1512 3127,1511 3126,1518 3125,1516 3126,1521 3123,1528 3110,1536 3109,1527 3104,1524 3100,1526 3100,1521 3097,1522 3094,1518 3090,1525 3086,1523 3082,1527 3081,1515 3079,1519 3072,1519'
      )
      nP(
        'ID',
        '2989,1471 2997,1465 3000,1469 3001,1473 2996,1477 2998,1477 2996,1479 2999,1480 2997,1484 3000,1488 3007,1489 3008,1502 3012,1505 3008,1515 3012,1508 3019,1509 3021,1517 3024,1519 3021,1529 3023,1531 3020,1562 3016,1555 3015,1561 3009,1556 3010,1562 3009,1563 3002,1550 2986,1534 2985,1528 2979,1522 2972,1508 \
2966,1485 2959,1472 2954,1469 2951,1447 2940,1439 2939,1430 2932,1418 2928,1417 2918,1403 2915,1389 2919,1389 2926,1395 2938,1394 2946,1407 2946,1411 2963,1429 2962,1434 2963,1432 2964,1435 2965,1433 2972,1446 2971,1440 2974,1439 2977,1447 2984,1453 2987,1461 2992,1463 2994,1467 2987,1470'
      )
      nP(
        'IR',
        '2574,937 2572,949 2569,953 2570,956 2566,959 2567,967 2571,968 2567,975 2570,988 2570,999 2579,1001 2580,1006 2570,1023 2581,1043 2589,1048 2589,1063 2595,1064 2593,1072 2586,1073 2580,1078 2578,1094 2575,1096 2568,1093 2567,1090 2566,1093 2552,1091 2534,1085 2532,1069 2528,1064 2523,1064 2509,1074 2499,1071 \
2487,1061 2486,1057 2475,1052 2469,1038 2470,1036 2467,1034 2467,1029 2462,1018 2457,1021 2451,1017 2454,1015 2451,1014 2450,1021 2446,1022 2441,1014 2441,1006 2438,1006 2440,994 2435,985 2422,977 2423,972 2415,962 2417,957 2415,954 2418,953 2420,946 2423,944 2421,937 2424,934 2415,931 2409,914 2407,905 \
2403,902 2406,896 2404,895 2401,880 2405,880 2407,874 2409,876 2415,886 2423,888 2424,887 2426,888 2441,875 2445,880 2442,882 2444,886 2441,888 2447,895 2450,894 2452,906 2463,910 2465,914 2472,920 2481,922 2501,920 2497,918 2501,919 2502,918 2500,911 2508,909 2510,905 2516,900 2533,897 2536,902 2555,908 \
2556,912 2562,916 2565,921 2573,921'
      )
      nP(
        'ID',
        '3183,1498 3180,1502 3177,1501 3189,1521 3186,1527 3191,1536 3192,1535 3193,1539 3185,1541 3185,1546 3179,1545 3180,1535 3172,1526 3174,1522 3174,1515 3171,1513 3166,1518 3168,1522 3168,1544 3166,1551 3168,1558 3167,1556 3160,1559 3157,1555 3160,1538 3159,1526 3153,1527 3151,1515 3155,1510 3157,1502 3157,1492 \
3159,1487 3161,1483 3162,1486 3162,1475 3160,1473 3161,1470 3164,1463 3167,1458 3169,1462 3173,1453 3192,1461 3196,1459 3203,1461 3210,1455 3209,1453 3214,1448 3216,1449 3214,1457 3207,1467 3197,1469 3194,1466 3179,1465 3167,1467 3164,1474 3164,1483 3170,1494 3175,1495 3180,1485 3183,1488 3186,1485 3193,1485 \
3191,1483 3194,1482 3198,1483 3197,1489 3192,1487 3188,1496'
      )
      nP('HT', '1228,1192 1223,1189 1226,1188 1228,1191')
      nP(
        'HN',
        '1078,1271 1078,1264 1074,1263 1071,1265 1062,1256 1064,1252 1064,1246 1074,1236 1079,1233 1092,1236 1097,1233 1096,1232 1106,1232 1110,1236 1113,1235 1117,1240 1114,1239 1115,1242 1120,1245 1120,1242 1125,1247 1111,1253 1107,1250 1098,1265 1095,1262 1093,1266 1088,1266 1089,1273 1086,1278 1083,1278 1081,1273 \
1082,1271'
      )
      nP('HN', '1090,1228 1090,1227 1093,1226')
      nP(
        'HU',
        '2189,751 2180,758 2172,776 2162,779 2156,778 2148,782 2144,784 2136,783 2126,773 2123,768 2121,767 2125,765 2124,759 2127,757 2124,755 2130,755 2131,750 2138,754 2146,754 2148,753 2148,750 2156,747 2159,748 2166,742 2181,744 2186,748'
      )
      nP(
        'HR',
        '2150,798 2146,794 2129,791 2123,795 2118,793 2117,798 2121,803 2121,808 2132,819 2136,826 2129,820 2120,818 2111,808 2115,807 2110,802 2108,794 2104,791 2103,790 2099,799 2096,793 2096,788 2104,788 2106,785 2111,789 2113,784 2117,783 2116,777 2123,772 2126,773 2136,783 2144,784 2148,782 2149,787 2151,788 \
2150,790 2154,792 2152,792'
      )
      nP(
        'IT',
        '2087,811 2096,817 2100,831 2107,839 2121,842 2119,846 2120,849 2140,861 2145,869 2144,874 2140,872 2138,866 2129,864 2125,874 2131,880 2131,886 2126,889 2125,894 2121,902 2117,902 2116,897 2119,894 2118,891 2122,887 2117,871 2109,867 2107,861 2104,862 2104,860 2100,858 2097,852 2090,852 2076,836 2070,835 \
2071,833 2065,826 2060,810 2047,804 2040,812 2035,814 2036,808 2029,806 2028,802 2030,798 2026,794 2031,792 2027,784 2030,781 2038,782 2044,773 2044,777 2050,783 2052,773 2061,777 2060,772 2064,772 2064,767 2070,769 2071,766 2081,764 2084,770 2097,772 2093,776 2096,778 2094,780 2099,786 2097,786 2096,784 \
2091,784 2081,791 2085,796 2082,799 2083,806'
      )
      nP(
        'IL',
        '2307,993 2310,980 2311,975 2315,975 2317,973 2317,977 2317,981 2316,982 2316,985 2311,984 2310,994 2313,995 2309,1001 2315,999 2313,1012 2310,1028 2309,1029 2308,1020 2303,1003 2304,1000 2305,997 2306,996'
      )
      nP('IT', '2110,921 2086,908 2084,904 2085,901 2093,898 2097,901 2103,901 2116,897 2111,909 2113,916')
      nP('IT', '2043,882 2045,873 2043,872 2043,863 2041,861 2041,857 2045,858 2052,852 2055,854 2055,857 2058,863 2056,867 2055,884 2050,882 2050,886 2046,887 2045,885 2044,886')
      nP(
        'ID',
        '3375,1611 3364,1597 3366,1592 3364,1596 3357,1595 3354,1598 3355,1587 3351,1582 3357,1581 3353,1581 3350,1577 3356,1578 3351,1575 3346,1561 3348,1559 3345,1560 3345,1555 3311,1535 3311,1533 3314,1533 3311,1532 3306,1533 3301,1526 3303,1518 3299,1532 3293,1535 3292,1523 3284,1515 3291,1516 3297,1510 3301,1512 \
3301,1514 3304,1505 3287,1507 3283,1498 3274,1494 3277,1486 3288,1479 3299,1484 3304,1484 3307,1494 3305,1499 3306,1508 3309,1516 3309,1511 3311,1511 3311,1518 3313,1517 3313,1522 3315,1524 3320,1523 3328,1507 3336,1505 3336,1500 3343,1495 3362,1509 3375,1513 3375,1569 3373,1574 3375,1577'
      )
      nP('ID', '3213,1608 3216,1603 3237,1600 3229,1608 3217,1613 3208,1626 3199,1629 3201,1625 3200,1623 3202,1617')
      nP(
        'ID',
        '3064,1592 3052,1588 3045,1591 3029,1585 3027,1583 3028,1578 3015,1575 3018,1574 3024,1562 3031,1565 3036,1563 3040,1567 3046,1568 3049,1575 3056,1577 3067,1578 3073,1570 3075,1574 3089,1577 3089,1582 3092,1583 3091,1587 3095,1590 3104,1588 3108,1591 3107,1602 3110,1605 3096,1598 3090,1600 3080,1599'
      )
      nP(
        'IN',
        '2889,1142 2885,1116 2882,1116 2881,1125 2879,1128 2877,1123 2876,1125 2874,1117 2876,1110 2881,1110 2884,1106 2885,1098 2888,1099 2887,1096 2883,1094 2861,1092 2860,1079 2856,1081 2853,1076 2851,1078 2847,1072 2846,1074 2848,1076 2844,1079 2844,1084 2853,1092 2847,1094 2843,1101 2850,1108 2848,1117 2850,1119 \
2850,1123 2852,1124 2851,1127 2853,1140 2853,1141 2853,1148 2850,1149 2849,1139 2848,1149 2847,1143 2847,1148 2845,1145 2845,1149 2844,1140 2842,1136 2844,1141 2840,1146 2832,1151 2831,1155 2833,1162 2827,1172 2824,1171 2826,1173 2817,1177 2818,1175 2817,1174 2814,1179 2816,1178 2810,1185 2803,1198 2786,1216 \
2785,1224 2780,1228 2775,1227 2772,1236 2771,1232 2770,1236 2769,1234 2765,1237 2763,1247 2765,1270 2764,1267 2763,1268 2766,1272 2760,1298 2761,1318 2755,1318 2752,1329 2752,1333 2757,1335 2752,1334 2746,1336 2743,1347 2737,1352 2732,1347 2728,1340 2729,1338 2726,1333 2724,1323 2726,1330 2727,1330 2719,1302 \
2711,1281 2706,1255 2696,1231 2690,1192 2692,1187 2690,1188 2690,1183 2692,1184 2689,1181 2689,1174 2691,1160 2688,1151 2693,1146 2687,1147 2689,1142 2687,1142 2688,1139 2691,1138 2683,1138 2685,1140 2682,1143 2683,1144 2682,1144 2685,1148 2683,1154 2670,1162 2662,1155 2651,1138 2652,1135 2654,1138 2663,1134 \
2667,1125 2659,1131 2654,1129 2646,1120 2646,1118 2649,1114 2645,1118 2643,1118 2644,1115 2645,1113 2649,1112 2650,1107 2662,1109 2667,1105 2669,1108 2673,1105 2669,1086 2665,1086 2663,1082 2663,1073 2657,1070 2658,1064 2665,1051 2670,1056 2681,1052 2686,1040 2691,1036 2696,1022 2701,1019 2701,1016 2709,1005 \
2707,1004 2708,993 2716,988 2713,984 2709,984 2708,980 2706,980 2705,976 2702,973 2704,969 2702,965 2705,962 2701,960 2702,958 2700,955 2701,952 2706,949 2719,954 2727,950 2731,951 2732,945 2740,939 2743,939 2745,952 2752,956 2749,960 2750,968 2756,975 2757,980 2752,986 2750,982 2746,983 2750,992 2750,1002 \
2753,1000 2758,1007 2761,1007 2765,1010 2764,1013 2772,1018 2766,1025 2763,1039 2774,1046 2781,1054 2789,1056 2790,1059 2795,1062 2804,1059 2809,1062 2809,1066 2816,1071 2819,1069 2821,1073 2843,1076 2844,1071 2842,1065 2844,1054 2849,1050 2851,1051 2850,1058 2852,1062 2850,1064 2851,1067 2859,1071 2866,1068 \
2870,1070 2883,1069 2884,1061 2879,1059 2879,1055 2888,1054 2890,1049 2895,1047 2896,1042 2902,1041 2909,1031 2917,1036 2924,1029 2927,1033 2925,1038 2928,1036 2929,1040 2926,1044 2927,1046 2929,1044 2936,1048 2936,1052 2932,1058 2934,1065 2930,1061 2925,1063 2914,1072 2914,1081 2909,1091 2910,1096 2904,1114 \
2896,1111 2897,1123 2896,1127 2894,1126 2894,1131 2895,1138'
      )
      nP('IM', '1911,659 1915,654 1915,657')
      nP(
        'GA',
        '2093,1441 2091,1455 2102,1452 2105,1459 2099,1468 2098,1476 2105,1483 2104,1502 2101,1511 2098,1511 2097,1505 2094,1510 2090,1509 2086,1501 2084,1502 2084,1508 2075,1508 2075,1516 2079,1523 2079,1528 2074,1526 2071,1532 2056,1510 2060,1513 2061,1511 2056,1509 2053,1502 2055,1504 2055,1502 2052,1501 2049,1492 \
2052,1498 2055,1497 2052,1497 2053,1493 2052,1495 2050,1493 2047,1483 2050,1486 2052,1479 2053,1468 2054,1471 2059,1471 2053,1465 2054,1463 2055,1466 2055,1458 2058,1458 2073,1458 2073,1441 2073,1439 2083,1438'
      )
      nP(
        'GH',
        '1962,1383 1964,1383 1966,1387 1962,1387 1938,1402 1928,1397 1928,1396 1929,1397 1930,1396 1932,1396 1931,1389 1929,1387 1926,1374 1931,1354 1934,1350 1931,1337 1932,1330 1930,1312 1931,1308 1953,1309 1958,1306 1959,1306 1958,1313 1963,1319 1961,1331 1965,1332 1963,1341 1966,1348 1964,1369 1967,1376 1971,1381 \
1967,1387 1965,1384 1964,1382 1961,1382'
      )
      nP(
        'GE',
        '2378,842 2375,830 2361,820 2363,817 2377,822 2389,823 2400,832 2410,829 2418,833 2417,838 2425,842 2423,845 2428,851 2426,855 2414,849 2411,851 2402,853 2395,854 2389,847 2385,849 2376,848 2378,845'
      )
      nP(
        'GT',
        '1034,1255 1033,1254 1035,1246 1033,1243 1038,1231 1051,1231 1052,1226 1041,1214 1046,1213 1046,1205 1064,1205 1064,1234 1067,1234 1070,1237 1070,1233 1074,1236 1064,1246 1064,1252 1062,1256 1060,1256 1060,1259 1055,1266 1042,1263'
      )
      nP('GD', '1341,1289 1340,1292 1339,1290')
      nP('FO', '1892,539 1888,535 1893,536')
      nP(
        'FR',
        '2035,757 2033,759 2029,758 2019,777 2027,774 2030,781 2027,784 2031,792 2026,794 2030,798 2028,802 2029,806 2036,808 2035,814 2034,814 2033,815 2021,825 2010,820 2012,819 2010,817 2007,820 2006,817 2006,820 1999,817 1990,825 1989,828 1991,834 1979,835 1976,833 1977,832 1974,832 1966,828 1966,830 1954,829 \
1945,825 1945,822 1941,820 1945,816 1947,801 1949,800 1947,800 1948,787 1954,797 1951,788 1947,785 1948,782 1948,776 1941,773 1938,768 1939,765 1938,761 1942,762 1934,761 1935,758 1931,758 1932,756 1928,758 1919,752 1915,753 1912,750 1916,749 1913,745 1917,746 1915,745 1911,745 1911,743 1927,737 1932,743 \
1936,740 1939,743 1939,740 1945,741 1943,739 1943,732 1940,724 1946,725 1948,730 1957,731 1963,728 1960,727 1961,724 1974,718 1975,707 1985,704 1986,708 1991,708 1992,712 2001,716 2001,720 2004,721 2008,718 2008,723 2014,728 2017,727 2021,728 2023,728 2027,733 2042,736 2035,749'
      )
      nP('FO', '1892,549 1889,545 1892,546')
      nP(
        'GM',
        '1806,1270 1797,1271 1794,1272 1793,1269 1804,1269 1808,1265 1815,1271 1819,1269 1821,1271 1815,1274 1807,1269 1806,1272 1800,1272 1800,1275 1791,1277 1792,1270 1793,1273 1795,1273'
      )
      nP('FR', '2046,841 2046,833 2052,830 2054,826 2055,839 2052,850 2047,847 2049,845 2047,845')
      nP(
        'GY',
        '1392,1444 1384,1444 1382,1447 1374,1449 1369,1455 1364,1452 1359,1445 1359,1439 1357,1433 1358,1420 1361,1415 1360,1407 1355,1405 1357,1398 1356,1394 1349,1395 1343,1384 1345,1380 1346,1372 1354,1367 1351,1365 1350,1360 1358,1349 1357,1345 1366,1352 1372,1362 1370,1377 1374,1369 1385,1380 1384,1391 1384,1398 \
1378,1401 1376,1413 1380,1423 1384,1422 1385,1431'
      )
      nP(
        'GN',
        '1856,1345 1852,1348 1853,1337 1851,1336 1852,1333 1847,1323 1834,1324 1831,1333 1826,1337 1824,1329 1822,1329 1822,1323 1820,1325 1812,1316 1813,1310 1812,1313 1811,1309 1812,1307 1811,1308 1810,1308 1809,1311 1808,1308 1812,1300 1821,1297 1821,1292 1819,1290 1822,1288 1821,1282 1828,1283 1828,1285 1835,1288 \
1845,1286 1844,1290 1845,1292 1849,1289 1852,1294 1855,1289 1862,1292 1866,1289 1865,1285 1869,1287 1870,1298 1875,1302 1872,1308 1876,1307 1876,1315 1879,1320 1877,1323 1877,1330 1881,1336 1879,1341 1882,1347 1876,1346 1879,1353 1877,1359 1874,1359 1872,1357 1870,1364 1868,1365 1865,1361 1864,1362 1865,1357 \
1864,1348'
      )
      nP(
        'HT',
        '1212,1197 1214,1192 1229,1196 1233,1194 1228,1187 1229,1180 1222,1178 1222,1175 1228,1173 1239,1176 1239,1191 1236,1193 1239,1197 1239,1202 1236,1199 1222,1198 1217,1202'
      )
      nP('HT', '1230,1172 1227,1171 1228,1171')
      nP(
        'GL',
        '1727,421 1729,422 1719,423 1722,425 1715,425 1717,427 1712,428 1712,430 1706,430 1708,431 1702,432 1704,434 1694,439 1666,443 1667,445 1664,446 1659,443 1656,445 1657,447 1651,445 1654,448 1642,448 1640,446 1643,445 1638,445 1633,440 1632,442 1637,446 1634,446 1638,448 1637,451 1626,454 1627,455 1625,458 \
1622,458 1624,460 1618,464 1615,470 1614,468 1614,471 1611,474 1607,473 1605,474 1607,475 1606,476 1599,473 1602,477 1594,481 1594,478 1592,478 1588,482 1587,478 1586,483 1580,479 1586,474 1577,473 1581,475 1578,476 1579,476 1577,480 1573,479 1577,482 1575,485 1567,486 1564,483 1565,485 1557,486 1555,487 \
1560,488 1558,489 1560,491 1555,494 1552,492 1546,495 1554,504 1546,505 1544,504 1542,505 1552,508 1549,510 1552,514 1541,512 1550,517 1544,517 1546,520 1541,516 1539,517 1543,523 1537,521 1542,524 1540,524 1536,521 1538,524 1540,527 1534,527 1534,525 1532,529 1526,528 1536,534 1528,532 1535,536 1532,540 \
1536,539 1533,541 1536,541 1534,543 1529,543 1534,545 1533,546 1527,546 1532,547 1532,549 1525,549 1531,551 1527,551 1531,553 1521,553 1530,554 1527,556 1523,555 1530,557 1522,557 1530,559 1524,561 1525,563 1520,559 1521,561 1515,561 1524,563 1522,565 1526,564 1527,566 1524,566 1527,568 1516,567 1516,564 \
1513,567 1512,570 1508,569 1506,568 1513,561 1505,567 1511,558 1505,563 1506,560 1502,562 1504,559 1501,560 1498,561 1499,560 1505,556 1504,554 1500,558 1495,558 1505,551 1497,556 1501,552 1499,551 1499,549 1497,551 1498,553 1493,553 1489,558 1487,555 1475,557 1480,554 1473,555 1479,554 1475,552 1478,550 \
1473,552 1471,551 1473,549 1467,548 1475,546 1474,545 1464,546 1471,545 1466,544 1469,540 1465,544 1464,543 1465,541 1463,542 1469,538 1468,538 1467,536 1466,539 1460,539 1464,537 1461,537 1463,536 1459,536 1454,532 1458,527 1454,529 1460,523 1453,528 1456,524 1451,525 1451,523 1457,521 1451,521 \
1447,522 1446,519 1454,518 1450,516 1446,515 1452,514 1446,514 1445,515 1445,517 1442,513 1448,510 1443,512 1444,510 1441,509 1457,506 1452,506 1452,505 1443,508 1440,506 1444,506 1455,503 1448,500 1452,499 1456,502 1461,504 1457,501 1457,499 1455,498 1457,496 1452,498 1447,491 1451,498 1446,500 1447,498 \
1445,498 1437,506 1436,498 1445,494 1435,497 1437,495 1434,493 1436,491 1432,491 1431,489 1440,485 1452,484 1442,483 1432,488 1431,487 1432,485 1429,486 1431,484 1429,485 1430,482 1424,483 1439,478 1426,481 1428,479 1422,480 1444,467 1457,464 1448,464 1427,476 1421,477 1426,475 1421,476 1421,472 1433,471 \
1423,470 1431,469 1425,468 1429,467 1426,467 1427,466 1435,467 1428,466 1428,465 1420,465 1419,464 1425,464 1417,463 1419,461 1436,459 1445,462 1454,461 1442,459 1446,458 1437,458 1435,458 1419,458 1432,453 1455,457 1456,456 1449,455 1458,454 1447,455 1445,453 1453,451 1444,451 1447,450 1447,449 1441,450 \
1444,452 1440,454 1434,452 1441,449 1420,456 1421,455 1421,452 1427,449 1425,448 1436,449 1423,447 1424,446 1456,450 1443,446 1447,446 1445,443 1449,441 1441,443 1445,445 1433,446 1423,444 1448,440 1447,438 1451,437 1444,438 1447,435 1446,435 1446,432 1455,435 1450,432 1456,431 1452,431 1453,429 1446,431 \
1449,427 1455,426 1448,426 1449,424 1453,425 1449,423 1455,423 1451,420 1455,419 1434,418 1411,409 1416,406 1427,407 1452,414 1450,413 1452,411 1448,412 1444,410 1451,409 1443,408 1451,408 1449,406 1438,404 1448,404 1435,402 1442,400 1441,399 1432,401 1444,397 1427,398 1441,393 1425,393 1430,389 1424,391 \
1418,384 1421,383 1417,384 1423,391 1418,393 1419,394 1416,393 1418,397 1404,398 1398,394 1409,390 1413,385 1408,390 1404,390 1401,389 1410,383 1401,382 1414,382 1407,381 1411,379 1408,379 1410,377 1408,377 1411,376 1408,373 1400,373 1406,371 1402,370 1406,368 1396,364 1401,363 1396,359 1397,358 1393,358 \
1396,354 1384,357 1396,353 1389,352 1392,352 1395,350 1387,349 1385,347 1388,346 1387,345 1375,343 1378,341 1374,340 1374,338 1370,338 1375,336 1371,333 1373,333 1323,323 1317,326 1313,323 1310,325 1311,327 1303,326 1302,328 1298,327 1301,325 1299,324 1295,324 1292,327 1287,325 1283,326 1292,330 1271,327 \
1260,323 1277,318 1255,316 1261,313 1260,313 1251,317 1243,313 1255,310 1292,311 1295,311 1265,309 1280,308 1294,310 1290,307 1296,306 1289,303 1273,306 1269,303 1270,306 1264,307 1254,305 1262,302 1250,303 1257,301 1243,302 1242,302 1244,300 1226,296 1232,294 1228,294 1231,291 1268,286 1265,285 1273,282 \
1297,282 1308,275 1306,268 1319,266 1286,267 1282,263 1320,251 1329,257 1323,251 1346,251 1348,251 1344,248 1349,246 1342,242 1349,240 1367,240 1370,243 1392,248 1362,238 1398,234 1406,236 1401,234 1413,233 1421,236 1422,240 1419,245 1422,246 1422,243 1428,240 1427,238 1458,244 1461,244 1446,239 1463,239 \
1450,235 1446,231 1465,231 1511,242 1516,241 1508,238 1512,237 1509,235 1511,234 1534,235 1500,227 1536,227 1541,231 1541,228 1538,227 1542,227 1560,232 1556,227 1537,225 1498,225 1488,224 1497,224 1490,223 1497,222 1524,224 1503,221 1529,222 1518,220 1531,219 1572,227 1566,223 1589,221 1571,220 1569,217 \
1654,214 1702,219 1657,220 1639,222 1624,221 1633,222 1602,225 1605,225 1603,227 1609,226 1619,226 1622,224 1657,221 1707,221 1711,223 1699,226 1718,224 1720,225 1718,227 1724,225 1745,229 1733,233 1707,236 1642,235 1659,237 1627,242 1706,238 1704,242 1682,245 1686,246 1682,247 1685,247 1716,243 1718,238 \
1735,237 1738,239 1739,242 1736,246 1713,260 1759,243 1755,246 1778,246 1782,244 1780,242 1785,243 1783,240 1791,239 1811,239 1837,244 1818,251 1809,251 1807,252 1812,254 1798,257 1779,256 1773,259 1746,260 1797,261 1787,265 1761,264 1753,267 1755,267 1751,270 1755,272 1760,271 1756,270 1758,269 1765,267 \
1784,267 1776,272 1762,273 1760,280 1763,278 1766,278 1768,280 1765,279 1757,282 1759,284 1758,285 1746,286 1749,288 1744,289 1749,289 1745,294 1745,295 1741,296 1744,297 1738,303 1744,303 1741,305 1742,305 1750,298 1766,302 1769,304 1756,302 1749,303 1756,305 1752,305 1754,306 1748,305 1764,310 1774,308 \
1777,312 1775,316 1751,314 1748,314 1753,315 1741,315 1749,316 1742,319 1736,316 1731,318 1735,321 1740,320 1741,320 1738,321 1742,321 1739,322 1743,322 1741,325 1760,325 1761,328 1738,329 1760,330 1765,338 1762,341 1759,341 1757,339 1751,339 1736,334 1744,337 1733,336 1753,341 1741,341 \
1734,344 1752,343 1751,346 1752,348 1747,349 1764,348 1769,351 1761,355 1749,352 1737,350 1741,352 1733,354 1738,354 1733,357 1738,359 1740,364 1741,363 1739,358 1741,358 1756,360 1753,363 1755,366 1753,367 1743,367 1734,370 1718,363 1736,364 1718,361 1714,363 1714,366 1701,359 1711,366 1706,367 1698,370 \
1685,366 1683,367 1694,370 1681,372 1684,372 1683,375 1685,372 1694,371 1708,372 1698,377 1684,376 1695,378 1693,380 1702,376 1710,378 1712,381 1699,383 1705,383 1703,387 1706,383 1712,382 1733,390 1727,394 1739,393 1733,397 1734,400 1737,396 1742,398 1739,400 1741,402 1735,403 1741,403 1741,406 1739,407 \
1742,407 1743,408 1740,410 1743,412 1735,412 1733,406 1732,412 1725,412 1718,409 1716,404 1711,399 1700,396 1689,395 1685,392 1672,387 1674,389 1673,390 1685,393 1673,396 1699,397 1704,400 1690,405 1679,402 1682,405 1674,404 1679,406 1675,410 1666,412 1695,413 1672,418 1684,420 1689,415 1706,413 1705,415 \
1723,417 1737,417 1725,421'
      )
      nP('GP', '1341,1228 1342,1225 1345,1228 1341,1229 1340,1233 1339,1227')
      nP(
        'DE',
        '2035,757 2035,749 2042,736 2027,733 2023,728 2025,723 2021,718 2023,715 2019,709 2020,706 2018,704 2020,703 2022,698 2019,693 2028,690 2027,689 2030,684 2026,682 2030,680 2031,671 2033,670 2030,669 2032,665 2040,664 2040,668 2042,669 2043,666 2044,670 2046,662 2052,662 2058,667 2053,662 2048,660 2050,659 \
2048,658 2048,655 2045,655 2050,652 2045,647 2042,648 2044,644 2046,646 2051,647 2054,647 2059,648 2060,652 2058,653 2069,654 2070,654 2070,657 2067,659 2068,662 2074,661 2085,653 2089,653 2083,656 2090,654 2094,658 2097,657 2098,662 2102,664 2104,673 2101,677 2106,681 2105,684 2107,689 2106,693 2110,701 \
2108,707 2103,704 2103,707 2089,714 2083,717 2080,715 2085,722 2084,725 2086,729 2098,739 2097,743 2094,742 2094,745 2087,748 2091,756 2090,758 2087,755 2071,759 2064,757 2061,761 2059,757 2055,757 2045,753 2043,755 2045,756'
      )
      nP('GR', '2197,943 2195,942 2197,936 2198,938 2202,937 2203,941 2218,941 2218,944 2223,942 2221,946 2210,947')
      nP(
        'GR',
        '2171,885 2168,884 2167,887 2160,875 2162,876 2164,873 2163,871 2167,869 2170,862 2170,858 2187,853 2189,851 2203,847 2213,852 2222,850 2221,845 2224,845 2226,850 2223,852 2224,856 2221,860 2211,856 2197,860 2199,865 2204,869 2197,865 2200,869 2199,872 2197,867 2194,867 2197,872 2189,865 2189,861 2186,864 \
2186,871 2193,883 2191,884 2192,883 2189,880 2188,883 2191,885 2185,888 2201,898 2200,906 2195,900 2190,903 2195,909 2192,912 2187,907 2192,924 2186,919 2185,925 2181,916 2179,920 2177,919 2176,909 2171,903 2174,898 2178,896 2189,902 2192,899 2184,894 2172,896 2167,889 2171,888'
      )
      nP('BS', '1220,1158 1221,1154 1226,1152 1225,1157')
      nP('BZ', '1073,1215 1072,1225 1067,1234 1064,1234 1064,1205 1068,1201 1073,1195 1075,1199')
      nP('BZ', '1078,1213 1077,1211 1077,1209')
      nP(
        'BD',
        '2853,1140 2851,1127 2852,1124 2850,1123 2850,1119 2848,1117 2850,1108 2843,1101 2847,1094 2853,1092 2844,1084 2844,1079 2848,1076 2846,1074 2847,1072 2851,1078 2853,1076 2856,1081 2860,1079 2861,1092 2883,1094 2887,1096 2888,1099 2885,1098 2884,1106 2881,1110 2876,1110 2874,1117 2876,1125 2877,1123 2879,1128 \
2881,1125 2882,1116 2885,1116 2889,1142 2889,1153 2885,1151 2885,1156 2886,1161 2879,1134 2877,1130 2875,1133 2871,1132 2869,1118 2868,1121 2866,1121 2869,1124 2867,1130 2869,1137 2867,1141 2867,1138 2865,1144 2863,1144 2865,1139 2862,1141 2863,1135 2861,1144 2858,1146 2859,1137 2858,1142 2857,1138 2857,1145 \
2856,1142 2855,1147'
      )
      nP('SB', '3540,1585 3534,1582 3530,1573 3536,1577 3540,1584')
      nP(
        'BW',
        '2254,1808 2243,1814 2235,1825 2230,1829 2228,1839 2224,1844 2219,1846 2215,1860 2207,1862 2199,1859 2195,1854 2190,1854 2186,1867 2177,1878 2166,1877 2168,1863 2164,1850 2160,1846 2160,1805 2170,1805 2170,1749 2193,1744 2196,1752 2204,1744 2206,1745 2213,1741 2222,1767 2232,1776 2233,1782 2237,1782 2237,1791 \
2240,1798 2251,1802 2251,1805'
      )
      nP('BS', '1174,1094 1176,1094 1179,1104 1176,1108 1172,1103 1174,1103')
      nP(
        'BE',
        '2019,709 2023,715 2021,718 2017,722 2017,727 2014,728 2008,723 2008,718 2004,721 2001,720 2001,716 1992,712 1991,708 1986,708 1985,704 1989,701 1993,699 1998,702 2001,700 2002,701 2002,699 2010,698 2012,701 2018,703 2016,707'
      )
      nP('BS', '1213,1139 1218,1131 1218,1135')
      nP('BS', '1202,1110 1199,1101 1203,1109')
      nP('SB', '3543,1603 3540,1598 3537,1599 3539,1594 3543,1598')
      nP('SB', '3564,1602 3554,1593 3550,1587 3559,1594')
      nP('SB', '3573,1621 3564,1621 3561,1614 3569,1615')
      nP('SB', '3578,1611 3579,1618 3573,1610 3571,1599 3573,1599')
      nP(
        'BA',
        '2136,827 2136,826 2132,819 2121,808 2121,803 2117,798 2118,793 2123,795 2129,791 2146,794 2150,798 2154,797 2151,805 2156,810 2152,810 2155,815 2152,818 2149,818 2150,822 2147,822 2144,832 2140,829'
      )
      nP(
        'MM',
        '2923,1227 2917,1237 2916,1230 2915,1236 2914,1230 2913,1235 2911,1236 2913,1229 2909,1234 2911,1230 2908,1233 2908,1232 2910,1229 2909,1227 2905,1233 2909,1209 2905,1191 2903,1189 2903,1184 2901,1183 2902,1182 2903,1180 2899,1176 2900,1173 2894,1171 2894,1174 2892,1171 2893,1164 2891,1170 2891,1168 2891,1165 \
2889,1162 2890,1168 2885,1156 2885,1151 2889,1153 2889,1142 2895,1138 2894,1131 2894,1126 2896,1127 2897,1123 2896,1111 2904,1114 2910,1096 2909,1091 2914,1081 2914,1072 2925,1063 2930,1061 2934,1065 2932,1058 2936,1052 2936,1048 2938,1043 2944,1049 2946,1058 2947,1056 2950,1059 2951,1070 2950,1079 2949,1080 \
2950,1084 2945,1087 2938,1101 2940,1108 2938,1113 2952,1109 2950,1112 2952,1124 2959,1128 2955,1140 2963,1141 2965,1150 2974,1145 2974,1148 2970,1152 2968,1158 2969,1159 2966,1161 2964,1167 2958,1167 2957,1171 2954,1171 2953,1175 2943,1175 2940,1188 2941,1194 2936,1194 2939,1198 2941,1207 2948,1218 2950,1228 \
2952,1226 2949,1232 2949,1242 2945,1246 2955,1267 2954,1277 2959,1295 2951,1312 2950,1317 2948,1323 2947,1312 2950,1309 2950,1297 2952,1297 2949,1296 2950,1292 2948,1289 2950,1287 2949,1275 2945,1262 2944,1269 2941,1249 2939,1231 2940,1224 2937,1225 2932,1210 2931,1222 2927,1225 2925,1220 2925,1226'
      )
      nP(
        'BO',
        '1375,1777 1375,1772 1366,1765 1357,1764 1339,1769 1334,1783 1330,1808 1329,1805 1317,1805 1313,1818 1311,1808 1299,1806 1294,1801 1293,1806 1289,1808 1285,1817 1278,1817 1275,1794 1271,1788 1272,1784 1269,1781 1269,1776 1271,1773 1270,1770 1272,1766 1267,1759 1266,1745 1264,1744 1261,1737 1260,1733 1268,1719 \
1264,1717 1262,1709 1265,1703 1263,1696 1268,1687 1266,1680 1267,1667 1270,1662 1261,1638 1270,1641 1290,1623 1303,1619 1303,1643 1307,1654 1313,1661 1326,1664 1329,1669 1336,1671 1338,1677 1346,1677 1352,1681 1354,1701 1351,1701 1355,1706 1355,1718 1374,1719 1372,1724 1373,1733 1379,1738 1382,1748 1380,1760 \
1376,1771 1378,1774'
      )
      nP(
        'BY',
        '2278,688 2270,689 2266,695 2266,701 2262,698 2254,699 2251,695 2248,699 2243,695 2238,698 2232,694 2212,691 2204,692 2196,697 2196,689 2192,686 2199,679 2195,661 2204,662 2215,655 2218,658 2216,655 2218,647 2228,641 2225,640 2226,635 2236,633 2242,628 2254,630 2255,634 2263,632 2270,636 2268,640 2271,644 \
2268,648 2271,650 2274,656 2279,659 2278,663 2285,664 2288,668 2283,673 2275,672 2273,675 2276,678 2276,685'
      )
      nP(
        'BJ',
        '1995,1297 1994,1301 1998,1314 1990,1336 1987,1337 1986,1377 1982,1378 1976,1380 1977,1379 1975,1368 1975,1337 1973,1330 1973,1323 1967,1317 1968,1308 1974,1301 1979,1301 1983,1294 1983,1289 1988,1287'
      )
      nP(
        'AZ',
        '2426,888 2425,883 2427,882 2425,880 2426,878 2417,871 2420,870 2421,867 2416,864 2415,861 2417,858 2412,855 2413,854 2411,851 2414,849 2426,855 2428,851 2423,845 2425,842 2439,853 2447,843 2456,861 2463,863 2465,867 2461,866 2456,868 2454,878 2455,881 2453,886 2450,884 2450,894 2447,895 2441,888 2444,886 \
2442,882 2445,880 2441,875'
      )
      nP(
        'AL',
        '2170,858 2170,862 2167,869 2163,871 2164,873 2162,876 2160,875 2158,870 2153,864 2155,865 2153,861 2155,857 2154,850 2156,844 2154,843 2153,838 2156,831 2158,834 2161,832 2165,837 2166,842 2165,852'
      )
      nP('AZ', '2423,888 2415,886 2409,876 2409,875 2419,878')
      nP('AU', '3446,2080 3442,2074 3444,2072 3448,2075 3448,2079')
      nP(
        'AM',
        '2426,888 2424,887 2423,888 2419,878 2409,875 2404,870 2397,869 2397,864 2398,860 2395,854 2402,853 2411,851 2413,854 2412,855 2417,858 2415,861 2416,864 2421,867 2420,870 2417,871 2426,878 2425,880 2427,882 2425,883'
      )
      nP('AW', '1257,1285 1256,1283 1258,1286')
      nP('AG', '1339,1217 1338,1216 1339,1215 1340,1217')
      nP('AG', '1339,1209 1338,1208 1338,1206 1339,1208')
      nP(
        'DZ',
        '1872,1057 1872,1041 1888,1027 1893,1028 1895,1024 1904,1023 1910,1014 1923,1007 1921,1004 1921,996 1929,994 1930,990 1947,990 1947,986 1949,984 1945,980 1942,972 1941,950 1937,945 1945,941 1951,935 1959,934 1961,929 1971,923 1985,922 1988,919 1998,917 2007,918 2013,921 2023,915 2029,918 2032,915 2038,918 \
2046,917 2041,923 2043,925 2042,951 2035,960 2034,963 2037,973 2041,976 2043,983 2050,990 2055,1018 2053,1019 2058,1034 2057,1047 2059,1054 2057,1062 2059,1069 2058,1074 2053,1079 2060,1092 2060,1099 2062,1103 2075,1107 2079,1119 2034,1159 2017,1180 2002,1185 1993,1187 1990,1185 1992,1175 1977,1167 1975,1163 \
1971,1161 1971,1155 1911,1097 1892,1080 1872,1062 1872,1059'
      )
      nP(
        'AF',
        '2574,937 2582,939 2585,944 2589,942 2593,939 2593,933 2607,927 2610,914 2617,912 2619,908 2627,910 2634,913 2639,913 2642,917 2651,911 2655,914 2657,907 2663,908 2665,905 2663,902 2671,894 2675,897 2674,902 2678,902 2676,915 2679,921 2695,909 2700,909 2698,912 2699,913 2704,910 2711,912 2706,913 2708,916 \
2702,919 2688,919 2674,929 2678,940 2677,947 2672,953 2673,956 2673,960 2661,961 2665,971 2657,976 2654,985 2655,992 2650,997 2647,994 2643,994 2638,998 2640,1001 2629,1003 2626,1007 2624,1024 2602,1030 2586,1030 2570,1023 2580,1006 2579,1001 2570,999 2570,988 2567,975 2571,968 2567,967 2566,959 2570,956 \
2569,953 2572,949'
      )
      nP(
        'AT',
        '2064,767 2061,768 2055,764 2056,763 2055,761 2056,759 2055,757 2059,757 2061,761 2064,757 2071,759 2087,755 2090,758 2091,756 2087,748 2094,745 2094,742 2097,743 2098,739 2107,742 2110,735 2129,741 2128,745 2131,750 2130,755 2124,755 2127,757 2124,759 2125,765 2121,767 2105,774 2097,772 2084,770 2081,764 \
2071,766 2070,769'
      )
      nP(
        'AU',
        '3434,2130 3425,2129 3424,2127 3427,2126 3423,2125 3419,2120 3417,2110 3419,2114 3420,2111 3413,2099 3412,2087 3431,2094 3444,2087 3448,2089 3448,2109 3447,2105 3443,2119 3445,2120 3445,2124 3441,2122 3444,2121 3443,2120 3440,2118 3439,2122 3438,2119 3437,2125 3434,2123 3436,2125'
      )
      nP('BB', '1361,1277 1361,1272 1363,1275')
      nP('AI', '1325,1200 1326,1198 1326,1199')
      nP('AD', '1974,832 1977,832 1976,833 1974,834')
      nP(
        'AR',
        '1272,2262 1256,2257 1237,2257 1232,2249 1233,2236 1225,2238 1221,2228 1220,2220 1231,2208 1230,2203 1233,2202 1231,2195 1233,2188 1238,2185 1237,2179 1240,2177 1237,2168 1240,2166 1239,2161 1243,2156 1236,2148 1244,2148 1245,2144 1238,2142 1240,2135 1237,2127 1239,2124 1235,2121 1235,2110 1239,2107 1237,2087 \
1240,2081 1238,2079 1240,2075 1239,2070 1241,2070 1242,2059 1248,2055 1245,2041 1245,2028 1246,2023 1252,2018 1253,2013 1251,2004 1253,2003 1256,1990 1258,1989 1259,1976 1255,1973 1256,1969 1253,1959 1254,1954 1251,1949 1251,1943 1258,1928 1256,1915 1258,1912 1260,1901 1265,1894 1268,1882 1274,1879 1271,1873 \
1272,1867 1270,1857 1273,1852 1271,1847 1274,1841 1283,1835 1287,1820 1285,1817 1289,1808 1293,1806 1294,1801 1299,1806 1311,1808 1313,1818 1317,1805 1329,1805 1330,1808 1347,1832 1356,1835 1369,1847 1379,1852 1381,1858 1375,1868 1375,1875 1370,1882 1371,1885 1379,1884 1393,1889 1396,1885 1400,1887 1410,1871 \
1411,1859 1416,1857 1418,1860 1421,1869 1419,1882 1409,1888 1399,1898 1400,1901 1398,1901 1381,1928 1378,1933 1379,1939 1375,1954 1375,1962 1375,1971 1373,1972 1372,1978 1372,1994 1385,2005 1383,2015 1386,2020 1389,2020 1390,2029 1381,2047 1374,2053 1346,2061 1333,2058 1333,2065 1336,2067 1334,2066 1336,2068 \
1332,2080 1333,2086 1335,2085 1333,2089 1326,2093 1319,2093 1309,2087 1305,2089 1306,2107 1312,2110 1311,2112 1312,2113 1316,2112 1316,2110 1313,2110 1319,2107 1321,2115 1320,2118 1316,2119 1313,2114 1307,2116 1307,2118 1314,2121 1307,2125 1303,2131 1304,2141 1300,2147 1300,2151 1295,2151 1287,2155 1281,2166 \
1281,2173 1288,2181 1299,2184 1298,2193 1294,2194 1297,2193 1299,2196 1281,2212 1278,2217 1280,2215 1278,2226 1274,2228 1271,2225 1266,2227 1271,2226 1273,2229 1267,2232 1262,2243 1265,2241 1267,2250 1260,2251 1267,2251 1272,2261'
      )
      nP(
        'AO',
        '2200,1637 2201,1660 2199,1666 2200,1669 2180,1669 2180,1717 2182,1722 2195,1739 2168,1745 2149,1742 2144,1735 2100,1736 2091,1729 2085,1733 2077,1733 2077,1712 2080,1708 2085,1676 2089,1666 2094,1662 2098,1651 2097,1634 2089,1610 2093,1605 2094,1600 2088,1578 2082,1565 2091,1562 2126,1562 2129,1582 2136,1595 \
2154,1594 2155,1579 2166,1577 2165,1583 2178,1583 2179,1601 2178,1615 2183,1630 2182,1642 2186,1640 2199,1639'
      )
      nP('AU', '3274,1653 3269,1649 3268,1641 3271,1645 3276,1643 3276,1645 3277,1642 3279,1645')
      nP(
        'AU',
        '3480,1836 3482,1835 3492,1854 3494,1854 3494,1861 3497,1864 3495,1883 3501,1898 3501,1905 3495,1934 3495,1946 3490,1961 3479,1975 3478,1985 3474,1990 3473,2002 3472,2001 3466,2015 3464,2029 3465,2039 3459,2042 3442,2045 3433,2056 3427,2056 3428,2060 3429,2058 3429,2063 3426,2058 3419,2054 3420,2051 3419,2049 \
3417,2049 3414,2053 3412,2051 3416,2048 3414,2044 3408,2048 3412,2048 3411,2050 3400,2059 3388,2051 3382,2050 3380,2052 3370,2046 3362,2034 3363,2024 3355,2011 3361,2019 3355,2010 3356,2008 3358,2011 3358,2006 3345,2010 3349,2006 3350,2001 3345,1987 3342,2003 3333,2005 3335,1999 3339,2000 3339,1988 3344,1979 \
3343,1975 3345,1972 3342,1963 3342,1970 3339,1972 3336,1980 3328,1986 3324,1994 3322,1998 3324,1997 3324,2001 3315,1994 3316,1992 3319,1995 3311,1973 3307,1973 3305,1966 3307,1966 3306,1963 3303,1963 3304,1961 3300,1957 3298,1959 3292,1955 3286,1956 3276,1947 3254,1951 3237,1960 3224,1959 3207,1970 3201,1982 \
3196,1986 3194,1983 3185,1986 3184,1983 3164,1984 3157,1992 3153,1992 3142,2001 3143,2002 3123,1998 3120,1992 3114,1989 3113,1978 3117,1980 3121,1974 3119,1965 3120,1963 3121,1967 3121,1953 3114,1933 3112,1913 3105,1896 3103,1883 3096,1869 3096,1865 3100,1875 3102,1873 3097,1861 3098,1858 3101,1863 3101,1868 \
3102,1865 3104,1872 3106,1869 3106,1863 3097,1841 3101,1826 3100,1814 3104,1802 3105,1802 3105,1813 3107,1811 3110,1802 3118,1797 3131,1784 3140,1785 3145,1780 3152,1779 3154,1774 3160,1776 3174,1768 3182,1752 3187,1746 3186,1733 3193,1721 3200,1738 3200,1729 3203,1733 3203,1728 3198,1722 3201,1721 3200,1717 \
3203,1720 3203,1718 3208,1720 3213,1720 3208,1719 3211,1711 3208,1712 3208,1706 3210,1706 3211,1703 3216,1707 3215,1704 3213,1704 3214,1702 3212,1702 3215,1699 3216,1702 3216,1700 3218,1701 3215,1695 3217,1692 3219,1692 3220,1688 3220,1694 3221,1690 3223,1694 3224,1692 3225,1686 3224,1683 3226,1684 3227,1688 \
3229,1684 3230,1688 3233,1680 3238,1683 3246,1695 3244,1707 3245,1702 3247,1705 3246,1700 3247,1698 3249,1700 3248,1696 3249,1696 3255,1698 3256,1702 3256,1697 3261,1702 3261,1697 3264,1696 3261,1696 3260,1694 3262,1692 3258,1689 3261,1684 3262,1677 3267,1674 3265,1668 3269,1663 3271,1665 3270,1660 3273,1664 \
3272,1661 3274,1659 3274,1656 3279,1659 3288,1657 3288,1660 3289,1656 3292,1656 3291,1649 3289,1646 3285,1647 3282,1644 3284,1641 3286,1645 3286,1641 3288,1641 3291,1647 3293,1644 3296,1650 3303,1650 3303,1652 3306,1655 3312,1654 3317,1658 3323,1651 3321,1657 3325,1656 3325,1661 3327,1660 3328,1658 3326,1657 \
3330,1653 3331,1658 3332,1657 3334,1659 3329,1666 3329,1673 3328,1670 3324,1673 3323,1678 3325,1681 3318,1695 3319,1698 3332,1713 3342,1718 3346,1725 3355,1728 3357,1735 3366,1740 3373,1736 3377,1722 3381,1700 3379,1683 3381,1673 3380,1669 3382,1664 3384,1667 3382,1661 3380,1662 3383,1654 3385,1655 3386,1638 \
3391,1635 3390,1638 3392,1640 3393,1652 3397,1654 3395,1659 3400,1667 3400,1681 3402,1690 3405,1692 3410,1687 3411,1693 3418,1698 3419,1721 3424,1728 3425,1748 3428,1753 3427,1758 3436,1766 3439,1764 3441,1772 3443,1770 3449,1778 3449,1776 3452,1778 3454,1783 3453,1781 3452,1784 3457,1791 3462,1812 3463,1810 \
3465,1814 3464,1810 3465,1807 3471,1814 3471,1810 3473,1816 3473,1825 3477,1832'
      )
      nP('CA', '1134,525 1137,525 1137,529 1126,536 1119,537 1116,533 1122,526')
      nP('CA', '1164,631 1166,624 1163,632 1165,626 1161,632 1158,633 1161,628 1156,631 1161,621 1162,627 1163,621 1167,624')
      nP('CA', '1161,542 1158,546 1153,542 1153,538 1157,534 1162,534 1163,537')
      nP(
        'CG',
        '2146,1421 2146,1426 2141,1440 2137,1482 2128,1492 2122,1506 2122,1523 2119,1533 2115,1534 2106,1547 2104,1547 2104,1538 2097,1540 2097,1544 2094,1547 2091,1543 2087,1539 2080,1549 2077,1541 2071,1532 2074,1526 2079,1528 2079,1523 2075,1516 2075,1508 2084,1508 2084,1502 2086,1501 2090,1509 2094,1510 2097,1505 \
2098,1511 2101,1511 2104,1502 2105,1483 2098,1476 2099,1468 2105,1459 2102,1452 2091,1455 2093,1441 2105,1441 2117,1444 2120,1448 2122,1440 2126,1420 2134,1417 2142,1421 2145,1418'
      )
      nP(
        'CA',
        '1419,754 1422,757 1424,750 1429,749 1424,756 1426,759 1429,753 1431,758 1426,771 1421,771 1421,763 1415,768 1418,759 1415,753 1412,760 1413,756 1404,767 1400,767 1397,766 1409,757 1407,756 1408,754 1406,756 1403,755 1401,759 1398,759 1400,757 1395,758 1401,755 1398,755 1399,751 1395,756 1389,757 1377,755 \
1366,757 1363,752 1373,743 1365,742 1369,739 1367,741 1370,742 1373,733 1378,736 1375,733 1378,732 1375,732 1375,729 1377,727 1380,728 1377,725 1383,711 1385,711 1383,710 1388,706 1390,700 1398,696 1398,698 1403,697 1401,701 1396,700 1400,704 1396,709 1395,707 1395,711 1388,724 1388,727 1396,718 1402,721 \
1397,724 1396,726 1399,725 1396,729 1403,728 1404,730 1404,727 1406,727 1403,735 1412,727 1412,731 1417,728 1422,731 1421,735 1416,738 1419,738 1418,741 1421,740 1418,742 1421,744 1426,740 1427,742 1421,748 1418,747 1420,749 1418,750 1421,750'
      )
      nP(
        'CA',
        '844,383 848,380 857,382 852,379 857,378 848,374 858,375 865,380 869,381 868,384 873,389 873,393 877,395 877,393 882,390 877,387 872,371 876,371 874,368 884,371 887,369 902,378 900,377 905,388 911,395 909,403 920,410 926,411 924,410 925,409 939,415 940,417 945,416 947,422 942,424 941,420 938,424 933,420 \
928,422 930,424 929,426 920,424 925,427 923,432 932,426 936,428 933,431 938,432 937,434 926,437 904,435 903,435 906,433 891,431 892,428 889,426 882,434 870,435 864,438 822,442 824,441 818,437 819,433 818,431 819,431 789,428 780,419 803,415 829,416 837,415 840,414 815,408 779,410 770,404 804,396 773,398 \
771,397 777,394 766,395 763,392 768,387 773,385 769,382 772,379 808,368 815,371 815,376 809,380 820,379 819,377 825,374 843,378 836,384'
      )
      nP('CA', '963,436 959,434 971,429 969,427 971,427 970,425 975,427 972,425 976,420 993,429 993,433 995,431 997,436 1003,436 990,442 967,435')
      nP(
        'CA',
        '1284,793 1282,792 1282,787 1279,785 1279,764 1273,760 1268,762 1264,758 1256,770 1254,782 1248,792 1243,791 1241,795 1206,796 1192,809 1188,816 1169,816 1164,819 1166,828 1129,845 1124,840 1125,836 1131,832 1135,817 1131,790 1120,783 1121,780 1120,779 1116,779 1115,772 1110,773 1107,767 1072,746 1062,751 \
1048,749 1047,747 1041,750 1035,745 1032,747 1026,741 1018,742 1009,739 1007,731 1004,730 1004,735 727,735 725,734 724,735 723,735 722,731 726,729 722,730 723,725 719,728 719,729 714,726 715,724 717,727 719,725 716,720 716,718 714,717 715,719 714,720 715,723 710,724 706,719 707,720 708,717 707,715 711,713 \
704,715 706,706 703,714 699,713 700,709 697,714 692,711 698,709 698,704 697,709 693,710 692,707 689,707 692,706 682,706 684,708 679,705 682,704 688,702 676,703 683,700 677,700 679,696 688,695 680,695 681,692 678,697 675,695 676,692 682,685 687,690 685,685 687,684 682,684 685,679 684,677 684,680 678,686 \
675,687 675,682 674,685 675,681 670,686 672,683 673,677 670,678 669,673 664,667 673,671 675,668 666,666 666,663 669,662 667,661 668,659 662,665 661,669 654,662 654,658 659,656 653,658 649,654 650,650 655,655 655,651 652,647 658,645 654,644 659,638 656,636 653,645 652,641 653,634 654,631 653,628 636,621 \
633,617 634,614 631,613 632,612 620,593 604,580 604,576 599,573 590,576 592,577 589,578 588,582 584,583 581,584 579,586 578,581 562,568 563,564 554,567 544,565 544,424 562,426 581,435 600,439 602,439 598,436 606,435 611,439 612,439 608,433 623,427 625,424 640,420 642,422 649,416 654,418 657,415 660,417 \
645,425 644,424 642,425 634,426 619,437 625,439 621,436 629,437 625,433 632,432 638,427 639,429 642,427 641,429 642,428 643,425 643,429 645,426 645,432 650,424 665,419 662,421 665,424 671,420 671,417 679,416 672,413 674,410 682,415 692,426 700,429 703,427 698,428 701,424 706,423 702,422 706,419 \
702,419 710,417 709,423 714,423 710,428 720,428 725,421 738,422 783,436 795,437 791,435 799,434 814,442 815,445 802,446 803,449 799,450 804,452 831,454 844,452 854,449 858,453 864,453 867,459 868,455 870,459 875,460 876,463 869,462 883,474 877,465 879,463 879,467 881,465 884,467 878,459 879,457 875,454 \
878,450 876,448 891,447 890,444 898,443 899,439 890,441 889,445 887,443 876,445 879,447 867,445 872,440 893,435 900,438 901,442 900,443 906,444 910,449 921,447 921,449 933,453 972,452 968,450 969,448 974,451 980,455 984,452 979,449 968,444 978,443 975,441 977,441 986,445 991,444 988,449 996,445 994,454 \
991,457 994,457 993,460 994,461 1000,458 997,462 1001,461 1002,463 991,463 999,469 995,465 1003,464 1002,456 998,453 1001,448 1008,448 1019,441 1019,435 1011,438 1009,435 1015,432 1012,432 1013,429 1019,427 1017,431 1022,428 1020,428 1020,426 1013,427 1009,424 1007,425 996,422 990,417 990,414 993,410 \
997,411 995,410 997,408 989,407 992,402 990,402 990,400 995,398 1000,399 1000,396 996,395 1009,391 1003,390 1011,389 1009,392 1012,392 1011,394 1018,392 1017,394 1026,399 1027,402 1026,406 1034,410 1036,415 1038,414 1040,417 1033,416 1031,418 1036,419 1027,424 1038,426 1044,424 1040,426 1053,427 1049,427 \
1047,430 1041,429 1051,436 1050,442 1053,445 1058,438 1059,434 1063,430 1075,437 1078,444 1072,445 1072,450 1082,460 1081,462 1087,458 1090,459 1091,454 1097,448 1099,438 1108,438 1104,436 1111,434 1101,430 1102,427 1100,427 1101,422 1102,422 1100,421 1119,423 1133,424 1124,426 1134,428 1133,430 1143,431 \
1135,436 1142,436 1143,439 1136,443 1130,441 1133,445 1133,447 1136,446 1135,450 1144,457 1141,464 1121,474 1116,470 1117,466 1113,468 1112,465 1107,463 1109,464 1104,466 1110,465 1108,466 1112,469 1114,469 1119,476 1111,473 1110,474 1112,477 1104,475 1101,470 1088,471 1089,474 1097,477 1082,489 1075,489 \
1059,480 1041,480 1056,482 1065,489 1086,492 1075,507 1068,510 1063,507 1065,510 1060,508 1061,510 1057,508 1058,506 1054,507 1058,510 1053,509 1056,512 1054,515 1034,513 1018,506 1019,509 1018,510 1020,512 1023,512 1022,510 1035,514 1031,516 1038,514 1047,518 1049,523 1042,528 1031,527 1037,530 1028,532 \
1031,537 1024,534 1028,536 1021,539 1023,541 1019,540 1023,543 1016,548 1017,549 1009,562 1007,570 1008,583 1011,589 1013,588 1012,596 1014,588 1024,588 1031,610 1027,616 1046,611 1068,617 1080,629 1105,640 1102,645 1106,640 1133,643 1134,648 1132,655 1135,663 1135,671 1133,675 1140,683 1137,687 1141,687 \
1150,694 1152,700 1146,705 1155,701 1163,709 1159,704 1159,699 1163,695 1168,703 1168,696 1166,693 1170,688 1171,683 1168,681 1169,677 1165,667 1167,666 1165,664 1167,663 1165,661 1166,657 1163,657 1161,651 1158,650 1179,640 1189,629 1191,624 1191,612 1187,603 1182,597 1170,590 1170,585 1173,586 1179,579 \
1177,578 1178,574 1183,576 1181,573 1183,573 1182,571 1189,567 1180,569 1181,566 1179,563 1182,561 1178,560 1181,557 1174,558 1181,546 1176,544 1175,534 1183,531 1199,535 1197,537 1203,535 1211,538 1209,536 1219,532 1230,538 1229,542 1234,541 1236,544 1233,546 1241,545 1238,548 1242,552 1255,553 1257,557 \
1261,553 1263,557 1258,562 1260,569 1247,569 1260,572 1259,580 1264,581 1261,582 1263,583 1261,588 1258,584 1258,587 1255,588 1258,591 1264,586 1273,588 1274,593 1272,597 1263,603 1273,598 1276,591 1277,595 1275,599 1279,593 1279,601 1281,596 1290,592 1293,587 1297,590 1296,595 1298,590 1296,588 1299,587 \
1297,586 1303,584 1299,582 1301,579 1303,580 1301,577 1307,579 1301,574 1307,573 1304,571 1308,564 1312,565 1309,566 1313,567 1308,570 1315,569 1314,573 1315,577 1319,577 1316,579 1323,582 1316,584 1325,584 1323,585 1325,586 1324,587 1328,589 1321,595 1331,592 1328,596 1330,597 1323,600 1332,597 1334,599 \
1330,601 1335,600 1336,603 1338,605 1331,607 1338,609 1337,611 1343,613 1338,618 1340,620 1332,618 1336,617 1331,618 1340,621 1335,623 1340,625 1336,625 1343,626 1342,629 1344,629 1342,630 1348,632 1349,632 1348,634 1351,632 1350,636 1353,633 1351,636 1354,636 1352,640 1355,638 1350,645 1359,640 1357,643 \
1363,643 1358,649 1365,641 1363,645 1366,642 1368,647 1383,651 1381,654 1361,659 1371,657 1356,663 1355,665 1348,663 1356,667 1353,671 1371,660 1379,659 1372,657 1382,657 1386,663 1382,666 1384,668 1387,664 1392,663 1390,665 1397,666 1394,667 1399,670 1399,673 1395,675 1399,676 1396,678 1399,681 1392,681 \
1401,684 1395,683 1400,688 1387,699 1371,701 1367,705 1367,709 1357,716 1340,719 1341,717 1333,716 1292,716 1285,723 1283,730 1271,734 1260,748 1246,744 1259,749 1254,758 1243,769 1251,765 1262,751 1274,741 1294,732 1308,732 1315,737 1315,739 1311,737 1315,741 1314,743 1304,750 1298,747 1288,750 1293,749 \
1299,752 1300,756 1309,753 1310,754 1308,760 1303,764 1309,764 1308,768 1312,777 1318,778 1316,780 1320,783 1332,786 1338,782 1338,785 1344,788 1342,790 1347,791 1328,800 1322,802 1320,800 1320,804 1317,803 1318,800 1316,803 1315,802 1314,806 1302,819 1295,813 1295,805 1298,802 1295,804 1312,791 1315,796 \
1315,793 1323,790 1307,790 1314,783 1312,784 1309,779 1311,783 1309,786 1298,792 1296,791 1297,789 1292,794'
      )
      nP(
        'CA',
        '1101,480 1101,482 1104,482 1105,485 1103,486 1107,491 1110,487 1138,502 1140,507 1136,509 1147,508 1154,513 1145,518 1131,514 1132,511 1125,510 1125,506 1120,508 1120,513 1103,523 1100,522 1099,514 1084,515 1086,511 1094,508 1092,503 1095,487 1096,483'
      )
      nP('CA', '1190,461 1185,460 1183,453 1189,445 1198,444 1206,447 1205,457')
      nP(
        'CN',
        '2844,1054 2834,1054 2829,1050 2827,1053 2824,1049 2822,1053 2820,1047 2813,1047 2814,1043 2807,1040 2803,1033 2798,1034 2794,1027 2784,1020 2783,1016 2776,1016 2775,1021 2772,1018 2764,1013 2765,1010 2761,1007 2758,1007 2753,1000 2750,1002 2750,992 2746,983 2750,982 2752,986 2757,980 2756,975 2750,968 \
2749,960 2752,956 2745,952 2743,939 2740,939 2731,937 2728,932 2724,934 2721,930 2722,927 2721,921 2713,916 2708,916 2706,913 2711,912 2714,910 2711,906 2711,894 2705,891 2700,892 2698,879 2701,877 2700,874 2702,870 2711,866 2711,863 2714,864 2718,861 2719,866 2725,865 2731,856 2743,855 2746,850 2765,840 \
2765,838 2764,831 2768,827 2766,825 2770,823 2766,809 2767,799 2761,797 2779,790 2782,793 2788,793 2789,789 2785,787 2793,762 2809,765 2810,768 2818,764 2819,761 2818,751 2820,744 2828,742 2831,734 2836,734 2838,734 2841,733 2840,737 2843,739 2842,742 2853,750 2863,752 2872,766 2873,780 2869,787 2872,792 \
2898,796 2910,805 2917,806 2916,810 2918,811 2927,830 2958,832 2971,830 2981,833 2984,837 2997,842 3008,843 3008,846 3013,847 3038,834 3056,834 3068,829 3073,821 3083,815 3078,805 3083,794 3100,799 3109,790 3118,789 3125,785 3127,779 3132,774 3137,775 3138,772 3147,769 3163,770 3161,763 3149,750 3142,750 \
3137,755 3132,752 3123,755 3119,752 3119,748 3122,746 3122,742 3131,723 3142,727 3157,719 3157,715 3155,714 3164,696 3171,688 3171,682 3165,681 3164,678 3172,671 3200,667 3209,672 3220,674 3220,677 3225,679 3224,681 3230,688 3228,690 3233,699 3232,701 3234,700 3233,704 3237,709 3237,715 3240,717 3239,723 \
3242,726 3259,729 3266,737 3271,737 3269,741 3272,745 3271,749 3274,755 3289,755 3295,749 3308,744 3312,746 3310,750 3312,755 3306,760 3303,777 3296,789 3295,794 3294,795 3283,790 3279,796 3274,798 3277,810 3277,820 3275,827 3268,829 3270,834 3267,827 3263,826 3261,834 3258,834 3253,840 3245,841 3247,847 \
3246,850 3237,849 3233,844 3224,857 3208,869 3205,873 3196,874 3176,890 3175,887 3181,884 3181,881 3178,879 3176,878 3179,876 3178,874 3187,863 3184,860 3176,857 3168,868 3159,873 3153,883 3141,884 3139,891 3140,895 3145,899 3152,899 3154,903 3153,911 3156,914 3161,914 3171,903 3180,910 3185,908 3189,910 \
3189,918 3183,916 3171,922 3173,923 3171,925 3171,929 3167,930 3167,927 3165,928 3166,932 3160,937 3155,948 3166,956 3173,977 3172,982 3177,985 3183,995 3173,993 3170,990 3165,992 3162,987 3160,987 3162,990 3165,993 3171,991 3183,1007 3172,1016 3168,1015 3165,1018 3169,1017 3172,1020 3177,1017 3181,1022 \
3185,1023 3178,1030 3183,1027 3184,1033 3182,1034 3182,1031 3181,1034 3178,1034 3181,1036 3179,1037 3180,1041 3175,1039 3179,1041 3180,1047 3177,1049 3175,1046 3173,1052 3170,1050 3172,1053 3169,1063 3166,1062 3168,1064 3164,1068 3165,1072 3162,1074 3164,1070 3162,1072 3159,1070 3162,1075 3159,1075 3160,1077 \
3163,1076 3158,1082 3155,1080 3157,1083 3161,1082 3158,1086 3160,1091 3157,1088 3155,1090 3156,1094 3152,1093 3154,1098 3149,1098 3151,1100 3150,1104 3145,1102 3144,1105 3142,1105 3145,1108 3138,1114 3137,1115 3136,1117 3133,1117 3131,1122 3129,1121 3131,1123 3129,1124 3128,1128 3122,1131 3120,1129 3119,1132 \
3115,1130 3112,1134 3111,1130 3109,1131 3110,1134 3106,1134 3107,1135 3106,1138 3105,1137 3103,1136 3104,1134 3102,1135 3100,1129 3099,1126 3102,1125 3098,1126 3097,1129 3099,1139 3095,1133 3097,1139 3096,1141 3094,1139 3093,1144 3092,1142 3086,1146 3082,1143 3083,1146 3080,1145 3081,1148 3080,1149 3074,1149 \
3069,1154 3067,1151 3065,1159 3067,1159 3067,1162 3069,1165 3066,1168 3063,1169 3063,1166 3060,1158 3063,1150 3060,1149 3059,1146 3059,1150 3055,1151 3052,1145 3051,1148 3048,1143 3048,1148 3043,1149 3037,1148 3030,1141 3029,1135 3030,1129 3022,1128 3017,1122 3012,1124 3010,1130 3004,1130 3003,1134 3000,1130 \
2998,1133 2996,1130 2993,1135 2988,1130 2984,1136 2980,1134 2979,1139 2981,1155 2976,1154 2974,1148 2974,1145 2965,1150 2963,1141 2955,1140 2959,1128 2952,1124 2950,1112 2952,1109 2938,1113 2940,1108 2938,1101 2945,1087 2950,1084 2949,1080 2950,1079 2951,1070 2950,1059 2947,1056 2946,1058 2944,1049 2938,1043 \
2936,1048 2929,1044 2927,1046 2926,1044 2929,1040 2928,1036 2925,1038 2927,1033 2924,1029 2917,1036 2909,1031 2902,1041 2896,1042 2895,1047 2890,1049 2888,1054 2879,1055 2879,1052 2876,1050 2866,1050 2866,1048 2863,1047 2857,1051 2852,1062 2850,1058 2851,1051 2849,1050'
      )
      nP(
        'CD',
        '2200,1637 2199,1639 2186,1640 2182,1642 2183,1630 2178,1615 2179,1601 2178,1583 2165,1583 2166,1577 2155,1579 2154,1594 2136,1595 2129,1582 2126,1562 2091,1562 2084,1564 2082,1560 2085,1560 2085,1549 2091,1543 2094,1547 2097,1544 2097,1540 2104,1538 2104,1547 2106,1547 2115,1534 2119,1533 2122,1523 2122,1506 \
2128,1492 2137,1482 2141,1440 2146,1426 2146,1421 2145,1408 2154,1396 2158,1397 2166,1407 2183,1411 2189,1401 2194,1404 2204,1396 2207,1399 2213,1398 2215,1392 2225,1397 2231,1395 2235,1398 2244,1409 2248,1405 2253,1408 2255,1403 2257,1403 2269,1421 2268,1436 2273,1441 2260,1461 2256,1494 2253,1498 2251,1507 \
2249,1509 2250,1515 2253,1519 2254,1540 2254,1548 2257,1559 2256,1568 2263,1581 2268,1597 2249,1601 2249,1606 2244,1613 2247,1621 2247,1634 2244,1647 2250,1660 2255,1661 2255,1658 2258,1656 2258,1676 2256,1672 2250,1675 2245,1662 2237,1658 2232,1648 2230,1648 2229,1654 2220,1653 2214,1649 2214,1642 2205,1646 \
2204,1641'
      )
      nP(
        'CL',
        '1220,2251 1219,2244 1215,2245 1214,2240 1221,2237 1220,2235 1221,2233 1216,2239 1213,2234 1217,2235 1209,2230 1213,2228 1217,2231 1213,2226 1217,2228 1213,2224 1216,2222 1213,2221 1217,2220 1219,2223 1217,2219 1215,2219 1216,2215 1218,2217 1216,2213 1218,2212 1216,2212 1214,2219 1213,2218 1212,2209 1216,2208 \
1212,2206 1216,2205 1216,2203 1210,2197 1212,2196 1214,2200 1213,2196 1219,2197 1221,2200 1224,2198 1220,2195 1224,2196 1219,2193 1219,2189 1217,2194 1209,2192 1211,2190 1214,2193 1216,2191 1211,2188 1213,2185 1215,2187 1217,2182 1214,2178 1210,2178 1211,2180 1206,2178 1207,2173 1200,2177 1202,2177 1202,2180 \
1199,2177 1208,2168 1209,2164 1213,2163 1215,2164 1215,2168 1216,2166 1217,2168 1215,2169 1211,2169 1218,2171 1216,2169 1219,2171 1216,2175 1218,2175 1222,2167 1220,2166 1224,2161 1220,2163 1221,2158 1224,2156 1228,2158 1225,2156 1222,2155 1223,2153 1222,2151 1229,2147 1230,2143 1223,2138 1228,2133 1226,2132 \
1225,2128 1229,2122 1228,2114 1231,2114 1228,2110 1230,2109 1232,2113 1232,2106 1228,2105 1233,2101 1233,2097 1231,2102 1227,2098 1224,2103 1219,2102 1221,2099 1218,2098 1216,2090 1219,2076 1222,2074 1224,2067 1221,2052 1220,2034 1224,2033 1225,2026 1226,2026 1230,2013 1230,2009 1234,2002 1236,1988 1240,1981 \
1239,1972 1242,1965 1239,1937 1240,1929 1243,1924 1241,1909 1247,1889 1247,1883 1250,1869 1249,1862 1252,1855 1251,1846 1252,1828 1250,1827 1251,1821 1254,1818 1256,1796 1252,1750 1257,1748 1259,1744 1258,1740 1261,1737 1264,1744 1266,1745 1267,1759 1272,1766 1270,1770 1271,1773 1269,1776 1269,1781 1272,1784 \
1271,1788 1275,1794 1278,1817 1285,1817 1287,1820 1283,1835 1274,1841 1271,1847 1273,1852 1270,1857 1272,1867 1271,1873 1274,1879 1268,1882 1265,1894 1260,1901 1258,1912 1256,1915 1258,1928 1251,1943 1251,1949 1254,1954 1253,1959 1256,1969 1255,1973 1259,1976 1258,1989 1256,1990 1253,2003 1251,2004 1253,2013 \
1252,2018 1246,2023 1245,2028 1245,2041 1248,2055 1242,2059 1241,2070 1239,2070 1240,2075 1238,2079 1240,2081 1237,2087 1239,2107 1235,2110 1235,2121 1239,2124 1237,2127 1240,2135 1238,2142 1245,2144 1244,2148 1236,2148 1243,2156 1239,2161 1240,2166 1237,2168 1240,2177 1237,2179 1238,2185 1233,2188 1231,2195 \
1233,2202 1230,2203 1231,2208 1220,2220 1221,2228 1225,2238 1233,2236 1232,2249 1237,2257 1256,2257 1272,2262 1264,2260 1260,2265 1248,2268 1247,2283 1244,2285 1235,2282 1232,2278 1233,2275 1235,2278 1238,2275 1238,2278 1236,2280 1238,2279 1239,2275 1243,2273 1245,2269 1236,2274 1231,2273 1234,2274 1230,2277 \
1232,2280 1223,2274 1229,2276 1230,2274 1227,2273 1227,2269 1242,2266 1228,2265 1227,2266 1230,2267 1226,2269 1226,2273 1223,2273 1222,2272 1224,2270 1221,2269 1227,2264 1219,2267 1221,2265 1219,2257 1223,2260 1226,2258 1227,2261 1228,2258 1227,2260 1227,2258 1229,2256 1227,2263 1231,2261 1230,2256 1232,2253 \
1231,2252 1224,2248 1231,2253 1229,2254 1223,2251 1226,2253 1224,2255 1227,2254 1226,2255 1224,2258 1222,2252 1223,2259 1220,2254 1222,2257 1220,2253 1219,2253 1217,2247'
      )
      nP('CN', '3060,1199 3050,1195 3050,1182 3056,1173 3070,1170 3073,1172 3074,1177 3068,1185 3069,1190 3064,1196 3061,1196')
      nP('CA', '1322,723 1340,733 1326,732 1311,722')
      nP(
        'KH',
        '3039,1252 3037,1260 3040,1269 3039,1287 3027,1293 3028,1298 3022,1298 3025,1311 3021,1307 3014,1308 3012,1315 3008,1316 3006,1314 2999,1315 2998,1313 3000,1309 2999,1305 2994,1309 2993,1299 2994,1297 2992,1295 2992,1298 2987,1269 2989,1269 2995,1257 3011,1256 3014,1259 3015,1257 3017,1261 3024,1263 3025,1262 \
3023,1257 3029,1253 3032,1258'
      )
      nP('CA', '1352,786 1343,787 1341,781 1351,765 1354,768 1351,777 1353,776 1346,781 1349,780 1345,785 1352,781 1349,781 1359,779 1358,781')
      nP(
        'LK',
        '2780,1373 2775,1380 2768,1384 2763,1380 2759,1350 2760,1353 2761,1339 2764,1331 2763,1329 2768,1331 2762,1327 2762,1325 2767,1329 2765,1325 2769,1331 2775,1343 2774,1345 2776,1345 2781,1363'
      )
      nP(
        'TD',
        '2115,1360 2115,1356 2112,1346 2099,1328 2102,1323 2116,1323 2110,1311 2110,1291 2108,1283 2105,1281 2104,1276 2100,1276 2097,1270 2096,1267 2094,1256 2115,1218 2117,1173 2120,1167 2112,1150 2110,1127 2120,1120 2200,1180 2200,1237 2191,1237 2189,1239 2189,1246 2187,1252 2184,1254 2186,1260 2181,1266 2183,1272 \
2178,1281 2185,1283 2186,1298 2190,1303 2189,1309 2185,1308 2177,1313 2177,1319 2164,1336 2150,1338 2149,1340 2151,1343 2146,1352 2136,1353 2128,1360 2125,1355 2119,1360'
      )
      nP('BI', '2266,1509 2264,1516 2269,1518 2269,1522 2261,1538 2254,1540 2253,1519 2250,1515 2252,1512 2254,1516 2258,1515 2260,1508')
      nP(
        'CA',
        '1034,280 1029,279 1044,277 1025,276 1025,277 1017,279 1012,277 1005,279 998,277 1013,272 997,274 989,270 994,270 989,268 991,268 987,267 1012,268 1008,267 1015,266 1002,266 999,266 1003,265 989,263 1001,263 996,259 1018,260 1009,258 1014,257 1000,256 1004,255 1001,255 1004,253 1025,251 1012,249 1020,247 \
1037,251 1050,259 1048,260 1063,260 1065,261 1063,264 1068,266 1074,267 1069,265 1070,262 1079,262 1080,266 1075,266 1085,269 1081,271 1086,270 1081,275 1092,274 1095,275 1095,277 1099,274 1107,279 1089,284 1086,283 1086,285 1080,289 1076,286 1078,282 1074,283 1073,287 1077,290 1068,289 1070,292 1067,296 \
1056,289 1056,292 1061,296 1053,293 1048,294 1053,296 1051,296 1035,295 1026,291 1039,290 1023,290 1017,287 1025,287 1013,284 1052,280'
      )
      nP(
        'CA',
        '1111,309 1110,308 1121,308 1118,307 1133,297 1119,306 1108,306 1112,303 1106,304 1102,302 1105,301 1102,301 1113,300 1099,299 1115,296 1106,295 1110,293 1107,293 1110,290 1102,297 1095,298 1093,297 1097,293 1085,297 1080,296 1085,295 1081,295 1080,292 1087,290 1085,290 1089,286 1105,285 1133,290 1130,288 \
1133,287 1123,286 1139,286 1141,283 1131,285 1108,283 1122,283 1113,281 1105,274 1091,272 1092,269 1103,270 1091,268 1089,266 1091,264 1118,265 1134,270 1139,274 1157,274 1158,273 1141,272 1139,270 1142,269 1124,264 1176,260 1156,259 1191,255 1167,255 1172,251 1189,247 1167,252 1161,250 1165,252 1160,256 \
1147,258 1126,260 1124,260 1138,256 1120,257 1125,256 1123,256 1117,257 1119,259 1117,260 1105,261 1088,259 1100,254 1132,251 1099,252 1080,259 1061,255 1089,253 1108,249 1057,253 1052,251 1066,249 1056,248 1067,246 1083,246 1072,244 1051,248 1047,247 1060,244 1042,245 1041,244 1036,243 1051,240 1062,241 \
1064,240 1062,239 1075,237 1088,240 1084,239 1110,240 1087,235 1100,234 1102,234 1097,232 1105,231 1121,233 1126,236 1125,237 1137,238 1126,235 1129,234 1164,241 1129,232 1141,231 1132,229 1134,228 1150,230 1141,226 1171,228 1152,225 1157,224 1171,225 1178,224 1197,229 1194,231 1202,229 1182,223 1184,223 \
1212,223 1230,228 1231,227 1220,224 1239,222 1241,224 1248,225 1242,223 1254,221 1294,224 1270,229 1307,225 1309,225 1322,226 1318,227 1327,229 1323,231 1334,230 1346,233 1313,242 1275,244 1263,242 1273,245 1268,245 1271,246 1290,245 1254,251 1312,246 1281,254 1262,262 1254,263 1248,260 1253,263 1257,264 \
1255,265 1232,265 1237,266 1233,267 1251,267 1242,270 1247,270 1245,272 1234,273 1214,270 1208,271 1222,272 1225,275 1207,276 1207,277 1206,278 1185,275 1197,278 1176,278 1211,280 1208,281 1212,282 1178,280 1174,281 1195,282 1167,282 1179,283 1174,287 1189,283 1199,284 1192,286 1203,285 1209,288 1206,290 \
1189,291 1206,294 1187,295 1200,297 1197,299 1173,298 1172,300 1179,304 1174,308 1151,309 1137,303 1139,307 1144,308 1134,309 1138,311 1155,310 1152,312 1164,310 1166,312 1162,314 1169,316 1173,313 1177,314 1178,319 1172,322 1168,320 1163,324 1145,327 1148,322 1135,321 1138,318 1129,316 1135,322 1126,322 \
1122,317 1121,318 1124,322 1113,319 1114,322 1106,320 1112,324 1107,324 1092,323 1094,321 1090,319 1092,321 1088,323 1080,319 1082,323 1072,323 1071,316 1069,318 1071,320 1069,323 1069,320 1066,322 1059,320 1062,318 1060,316 1070,312 1088,311 1083,309 1087,308 1079,308 1079,305 1074,303 1075,301 1092,301 \
1096,303 1098,307'
      )
      nP(
        'CA',
        '720,400 714,393 702,390 704,389 694,389 704,380 704,376 709,375 706,373 717,362 712,361 707,353 739,350 758,355 757,358 763,355 763,359 768,355 779,355 801,367 763,379 761,383 757,385 752,385 753,387 750,390 751,393 748,396 737,397 726,403'
      )
      nP(
        'CA',
        '917,287 913,287 917,285 913,283 905,286 908,283 900,283 899,281 901,278 915,278 924,279 929,282 928,284 930,285 939,282 945,284 943,286 952,286 960,289 957,292 957,294 966,298 965,300 956,302 949,300 945,295 927,293 911,295 905,291 920,291 921,289 915,289 922,287'
      )
      nP('SB', '3588,1635 3589,1636 3583,1635 3578,1627 3586,1631')
      nP(
        'BR',
        '1261,1638 1250,1639 1251,1615 1243,1624 1235,1624 1233,1616 1224,1615 1227,1609 1216,1587 1219,1583 1219,1577 1225,1570 1224,1565 1228,1550 1237,1541 1247,1539 1249,1536 1253,1536 1254,1539 1257,1537 1263,1493 1260,1481 1256,1476 1256,1464 1265,1464 1264,1458 1258,1457 1258,1448 1275,1447 1275,1444 1277,1447 \
1282,1441 1286,1449 1286,1456 1288,1455 1293,1462 1301,1458 1301,1464 1306,1456 1316,1449 1317,1444 1323,1441 1323,1437 1316,1436 1315,1419 1309,1409 1315,1411 1316,1415 1323,1414 1328,1420 1329,1412 1347,1405 1351,1399 1349,1395 1356,1394 1357,1398 1355,1405 1360,1407 1361,1415 1358,1420 1357,1433 1359,1439 \
1359,1445 1364,1452 1369,1455 1374,1449 1382,1447 1384,1444 1392,1444 1398,1445 1396,1439 1397,1435 1400,1437 1407,1435 1411,1438 1416,1441 1420,1438 1428,1440 1440,1413 1442,1411 1443,1413 1442,1407 1446,1414 1450,1441 1453,1446 1458,1448 1458,1453 1456,1455 1458,1456 1444,1476 1441,1483 1438,1493 1433,1495 \
1430,1497 1434,1496 1435,1499 1443,1493 1449,1487 1449,1493 1450,1500 1449,1502 1444,1498 1443,1508 1444,1500 1447,1504 1447,1509 1449,1511 1450,1507 1449,1503 1450,1501 1453,1503 1464,1499 1462,1512 1465,1502 1466,1502 1468,1501 1470,1495 1473,1498 1475,1495 1472,1495 1474,1493 1475,1486 1480,1483 1483,1486 \
1483,1482 1488,1484 1488,1487 1489,1484 1491,1489 1492,1489 1495,1488 1495,1491 1498,1490 1500,1494 1503,1493 1503,1497 1504,1493 1504,1499 1509,1495 1508,1497 1512,1503 1511,1508 1513,1506 1514,1509 1511,1514 1510,1523 1513,1518 1514,1511 1517,1510 1514,1516 1524,1509 1545,1519 1545,1517 1558,1516 1573,1529 \
1586,1547 1604,1552 1609,1581 1609,1578 1610,1588 1604,1612 1594,1631 1588,1638 1586,1635 1587,1639 1585,1639 1586,1642 1584,1645 1584,1642 1577,1664 1573,1669 1571,1663 1569,1665 1569,1667 1570,1667 1567,1677 1567,1687 1568,1683 1567,1694 1569,1712 1566,1732 1566,1740 1561,1748 1560,1769 1548,1793 1548,1805 \
1540,1810 1537,1819 1527,1819 1527,1815 1525,1816 1525,1820 1517,1821 1521,1820 1519,1818 1511,1821 1512,1825 1508,1825 1503,1829 1503,1832 1498,1831 1495,1835 1494,1833 1477,1850 1478,1852 1475,1857 1476,1854 1470,1856 1474,1859 1470,1863 1471,1863 1471,1868 1469,1867 1472,1883 1471,1884 1472,1893 1470,1902 \
1469,1900 1469,1904 1460,1916 1450,1941 1436,1958 1436,1953 1438,1953 1444,1947 1446,1941 1447,1942 1451,1932 1451,1928 1447,1931 1444,1925 1444,1937 1443,1935 1442,1941 1437,1945 1435,1951 1435,1956 1431,1972 1423,1982 1422,1980 1422,1973 1426,1966 1418,1955 1405,1944 1401,1938 1397,1941 1397,1937 1389,1927 \
1385,1930 1381,1928 1398,1901 1400,1901 1399,1898 1409,1888 1419,1882 1421,1869 1418,1860 1416,1857 1411,1859 1415,1836 1411,1832 1403,1834 1401,1814 1398,1809 1393,1806 1388,1809 1377,1806 1379,1789 1375,1777 1378,1774 1376,1771 1380,1760 1382,1748 1379,1738 1373,1733 1372,1724 1374,1719 1355,1718 1355,1706 \
1351,1701 1354,1701 1352,1681 1346,1677 1338,1677 1336,1671 1329,1669 1326,1664 1313,1661 1307,1654 1303,1643 1303,1619 1290,1623 1270,1641'
      )
      nP('SB', '3570,1652 3568,1649 3565,1648 3566,1647 3570,1650')
      nP(
        'BG',
        '2240,841 2236,842 2231,839 2224,845 2221,845 2222,850 2213,852 2203,847 2189,851 2190,844 2184,836 2186,833 2184,828 2190,823 2185,818 2184,813 2187,807 2190,809 2189,813 2202,815 2215,816 2221,811 2230,808 2246,814 2246,819 2241,820 2240,823 2239,830 2235,834'
      )
      nP('BT', '2879,1055 2879,1059 2884,1061 2883,1069 2870,1070 2866,1068 2859,1071 2851,1067 2850,1064 2852,1062 2857,1051 2863,1047 2866,1048 2866,1050 2876,1050 2879,1052')
      nP(
        'CA',
        '951,368 950,365 944,363 955,362 957,361 952,361 955,359 963,363 983,361 986,364 979,366 984,368 977,370 971,373 971,376 981,374 985,378 983,380 989,378 992,382 987,384 990,385 990,387 987,388 991,388 988,390 990,390 990,392 974,394 972,393 972,390 970,393 975,396 968,400 963,399 959,392 949,386 937,384 \
928,377 934,372 942,378 951,378 952,377 951,373 955,375 949,371 958,371 939,366 946,365'
      )
      nP(
        'CA',
        '1044,369 1033,378 1012,377 1021,382 1014,388 1015,389 1011,388 1004,389 1003,387 1008,386 1004,387 1004,382 999,378 998,365 1001,362 1009,364 1002,359 1011,357 1054,360'
      )
      nP('CA', '1185,376 1160,377 1156,376 1155,370 1147,369 1147,363 1182,365 1196,375')
      nP(
        'CA',
        '1320,467 1322,466 1323,469 1328,465 1328,469 1331,465 1334,468 1332,465 1336,463 1336,465 1339,465 1344,470 1335,470 1341,472 1337,473 1342,474 1338,475 1328,474 1337,479 1327,477 1334,482 1328,480 1331,483 1328,483 1330,485 1327,483 1327,485 1325,485 1322,481 1323,484 1319,484 1323,485 1321,486 1324,488 \
1320,487 1323,490 1321,496 1313,492 1314,488 1311,493 1308,489 1312,487 1305,488 1310,484 1303,486 1309,483 1302,483 1309,480 1309,476 1313,474 1298,480 1297,479 1302,473 1296,477 1292,476 1292,473 1289,473 1288,470 1286,469 1288,471 1279,471 1285,473 1282,473 1285,474 1284,475 1277,471 1285,480 1278,481 \
1276,478 1274,476 1268,476 1273,480 1278,483 1276,487 1284,485 1282,487 1286,488 1282,489 1287,491 1285,493 1289,491 1290,498 1290,494 1295,496 1294,499 1299,497 1301,498 1300,500 1300,502 1305,502 1305,505 1300,505 1306,508 1305,509 1310,509 1307,512 1312,515 1310,520 1312,520 1310,521 1308,517 1304,512 \
1308,520 1306,521 1310,526 1304,525 1307,530 1305,531 1303,527 1297,525 1298,524 1292,524 1290,519 1291,524 1288,520 1288,522 1286,521 1287,518 1284,520 1278,513 1280,519 1267,513 1275,522 1280,523 1279,525 1281,524 1280,525 1283,525 1293,533 1293,535 1297,536 1295,538 1297,541 1271,536 1262,531 1261,529 \
1262,528 1254,528 1245,525 1247,522 1244,524 1239,522 1238,519 1235,518 1244,515 1237,512 1237,515 1233,514 1234,510 1231,512 1230,508 1229,510 1222,505 1222,503 1225,501 1223,499 1222,502 1222,500 1217,500 1216,504 1216,498 1212,501 1209,498 1211,497 1210,496 1206,497 1209,504 1198,500 1200,502 1197,502 \
1199,504 1189,505 1189,506 1174,501 1175,495 1183,491 1181,489 1183,489 1182,487 1198,491 1202,494 1200,495 1202,498 1203,496 1201,496 1204,493 1203,493 1202,493 1197,489 1221,487 1212,477 1234,460 1230,452 1227,450 1226,446 1221,445 1224,443 1218,444 1219,439 1215,438 1217,441 1216,442 1212,441 1209,438 \
1211,437 1207,437 1209,435 1207,435 1210,434 1208,433 1205,436 1201,434 1190,439 1190,434 1196,434 1200,431 1190,426 1194,424 1184,424 1188,423 1184,422 1186,420 1180,423 1179,416 1172,416 1165,412 1169,411 1166,409 1164,412 1160,413 1167,414 1169,419 1168,421 1138,417 1148,422 1146,423 1126,414 1139,421 \
1098,419 1090,415 1092,411 1089,414 1086,412 1084,413 1086,415 1077,415 1067,411 1061,405 1064,404 1060,402 1086,404 1077,400 1057,399 1056,395 1058,393 1055,389 1060,386 1057,386 1057,382 1061,379 1060,377 1062,377 1062,374 1066,369 1078,363 1090,361 1107,363 1097,368 1088,378 1093,382 1091,388 1094,392 \
1107,400 1088,404 1106,401 1107,403 1104,403 1108,405 1108,398 1111,397 1110,394 1103,394 1095,389 1103,385 1114,388 1106,384 1111,383 1100,382 1099,375 1116,377 1100,373 1104,372 1120,374 1104,370 1108,368 1112,370 1109,368 1114,367 1120,369 1116,366 1127,363 1141,363 1144,366 1144,370 1150,371 1150,375 \
1153,378 1142,385 1151,381 1147,386 1150,388 1145,388 1148,389 1146,391 1152,388 1151,386 1153,384 1159,387 1154,384 1158,381 1160,384 1159,386 1163,383 1166,385 1164,389 1171,391 1167,389 1167,386 1178,392 1167,385 1170,383 1172,386 1172,384 1186,387 1170,382 1180,377 1204,381 1207,385 1198,387 1193,390 \
1199,388 1204,388 1195,393 1197,393 1206,387 1215,389 1214,391 1202,394 1207,394 1202,396 1210,394 1205,396 1209,398 1205,401 1210,398 1209,396 1211,394 1215,393 1215,396 1219,392 1220,392 1213,398 1216,397 1214,401 1220,395 1220,398 1222,398 1217,403 1222,399 1226,400 1223,404 1231,394 1245,400 1230,406 \
1235,406 1231,410 1250,403 1251,405 1249,408 1242,410 1238,412 1238,414 1241,410 1245,411 1241,418 1246,410 1257,406 1259,406 1252,412 1262,407 1273,410 1272,413 1260,416 1255,418 1258,419 1252,421 1259,419 1260,417 1270,417 1258,422 1257,425 1274,417 1273,416 1275,415 1278,415 1285,423 1278,422 1256,426 \
1270,425 1289,429 1290,430 1289,432 1266,429 1264,430 1276,431 1267,431 1271,432 1266,434 1275,432 1279,434 1271,434 1279,437 1263,436 1276,439 1268,440 1282,441 1280,443 1290,442 1284,443 1278,445 1284,444 1286,444 1281,447 1286,445 1289,445 1287,449 1291,447 1295,449 1290,451 1293,452 1297,447 1297,455 \
1298,450 1302,449 1300,452 1303,455 1301,452 1302,451 1309,449 1305,454 1312,452 1313,453 1310,454 1314,453 1316,456 1312,457 1318,460 1309,459 1314,460 1309,461 1317,460 1310,464 1321,461 1319,464 1324,459 1327,460 1324,462 1324,464 1319,467'
      )
      nP('CA', '834,309 823,306 822,301 842,297 859,297 846,301 854,302 853,306')
      nP(
        'CA',
        '1044,331 1056,328 1059,330 1058,332 1064,332 1059,335 1068,337 1068,333 1080,337 1083,334 1092,337 1090,338 1117,331 1141,331 1157,335 1152,337 1160,337 1161,340 1152,343 1163,345 1153,345 1155,346 1154,350 1138,352 1127,350 1125,346 1121,345 1123,347 1121,350 1113,351 1107,351 1106,348 1104,351 1101,348 \
1100,351 1071,351 1072,347 1070,345 1067,349 1065,346 1063,347 1064,349 1061,350 1045,348 1048,345 1043,348 1044,349 1040,349 1035,347 1033,342 1035,341 1031,340 1035,335 1034,331 1025,323 1002,325 1007,324 994,321 1000,319 986,318 992,317 987,315 988,314 1001,313 1024,317 1020,323 1025,319 1042,318 \
1051,321 1040,321 1064,325 1040,325 1054,328 1044,328 1046,329'
      )
      nP(
        'CA',
        '791,320 784,320 785,323 779,325 774,322 777,317 771,317 770,318 771,320 765,321 769,323 765,327 758,324 759,326 757,327 760,329 751,331 746,326 745,329 724,327 729,323 739,322 750,317 763,309 787,309 788,308 783,307 790,305 801,309 792,311 797,314 791,314 796,318'
      )
      nP(
        'CA',
        '980,327 979,331 976,332 981,333 982,338 978,335 975,336 978,337 974,339 980,341 974,340 976,343 953,344 950,341 955,340 948,338 966,333 926,334 935,333 931,332 934,330 943,332 939,330 942,328 936,327 941,325 934,325 937,322 942,322 955,330 961,329 957,329 954,327 961,326 951,325 957,324 945,321 952,319 \
959,319 964,323 967,322 965,319 971,318 978,321 978,323'
      )
      nP(
        'CA',
        '833,331 840,331 842,336 866,336 867,333 854,330 862,327 851,323 867,316 871,318 868,319 869,322 874,324 871,328 879,329 875,332 883,330 886,333 889,332 886,329 892,328 899,329 901,334 898,336 899,338 895,343 883,345 877,342 871,345 867,343 827,353 810,349 846,340 831,342 832,341 828,339 827,342 816,343 \
817,339 821,337 814,337 813,340 809,340 812,341 811,342 804,344 802,341 798,344 792,340 778,340 782,336 805,333 782,335 786,332 806,330 787,330 792,326 808,326 795,324 806,321 813,322 815,326 825,325 838,330'
      )
      nP('LC', '1347,1267 1346,1264 1347,1261')
      nP(
        'SE',
        '2074,585 2076,586 2077,583 2076,576 2079,574 2078,572 2085,568 2085,562 2082,554 2086,554 2088,549 2081,543 2083,535 2080,531 2081,524 2079,520 2081,515 2089,508 2099,509 2101,502 2096,501 2105,489 2106,482 2105,477 2114,475 2113,472 2123,464 2123,460 2121,458 2127,451 2132,448 2139,450 2141,447 2141,441 \
2159,444 2162,442 2159,441 2163,437 2161,433 2166,433 2180,442 2188,443 2197,450 2195,451 2194,457 2198,458 2196,462 2200,467 2197,474 2202,482 2191,484 2184,481 2182,484 2184,486 2178,483 2182,486 2175,488 2177,491 2173,489 2176,492 2170,497 2176,503 2168,511 2157,518 2154,516 2150,522 2149,520 2143,524 \
2146,525 2142,528 2137,524 2140,530 2133,532 2134,534 2136,536 2133,540 2135,545 2131,545 2131,555 2134,560 2139,561 2144,564 2146,566 2143,565 2148,568 2151,571 2148,573 2151,573 2141,579 2138,579 2136,572 2134,574 2135,575 2136,574 2137,578 2134,575 2134,578 2125,575 2120,577 2128,577 2133,581 2137,581 \
2145,578 2146,580 2143,580 2143,583 2139,587 2136,582 2136,586 2133,588 2122,590 2129,592 2124,592 2128,597 2126,600 2127,601 2125,600 2127,604 2124,601 2127,607 2124,611 2126,614 2118,628 2107,627 2107,630 2102,632 2103,637 2102,639 2089,639 2090,635 2084,625 2088,626 2086,623 2089,623 2088,620 2083,616 \
2081,608 2079,608 2078,604 2077,604 2078,595 2075,596 2072,594 2071,585'
      )
      nP(
        'SD',
        '2326,1258 2322,1282 2317,1283 2311,1295 2310,1310 2308,1312 2306,1309 2303,1314 2302,1344 2298,1347 2293,1346 2290,1354 2298,1358 2307,1373 2313,1392 2319,1393 2318,1401 2320,1404 2304,1404 2300,1410 2295,1417 2291,1415 2284,1417 2282,1420 2279,1416 2276,1418 2272,1416 2269,1421 2257,1403 2255,1403 2253,1408 \
2248,1405 2244,1409 2235,1398 2232,1386 2225,1382 2224,1373 2212,1360 2213,1355 2208,1350 2202,1348 2202,1342 2195,1342 2197,1325 2189,1309 2190,1303 2186,1298 2185,1283 2178,1281 2183,1272 2181,1266 2186,1260 2184,1254 2187,1252 2189,1246 2189,1239 2191,1237 2200,1237 2200,1180 2200,1172 2210,1172 2210,1142 \
2273,1142 2275,1138 2275,1142 2329,1142 2330,1148 2334,1156 2332,1154 2335,1189 2347,1202 2343,1209 2336,1212 2335,1217 2330,1216 2330,1228 2325,1245'
      )
      nP(
        'TJ',
        '2711,912 2704,910 2699,913 2698,912 2700,909 2695,909 2679,921 2676,915 2678,902 2674,902 2675,897 2671,894 2663,902 2665,905 2663,908 2657,907 2655,914 2651,911 2642,917 2639,913 2646,898 2642,893 2643,886 2635,883 2636,879 2639,876 2647,877 2648,873 2651,872 2650,870 2652,869 2648,868 2655,868 2655,859 \
2659,861 2666,855 2670,860 2666,865 2672,867 2667,872 2667,870 2662,867 2657,869 2657,872 2655,872 2655,878 2667,877 2672,880 2677,877 2680,882 2683,880 2684,883 2686,880 2698,879 2700,892 2705,891 2711,894 2711,906 2714,910'
      )
      nP(
        'SY',
        '2317,981 2317,977 2317,973 2327,958 2324,954 2325,952 2320,951 2320,940 2318,937 2320,932 2322,934 2324,928 2327,928 2326,924 2327,918 2334,921 2343,917 2353,921 2368,914 2376,915 2383,912 2384,914 2374,926 2375,937 2371,955 2349,971 2329,987'
      )
      nP(
        'SO',
        '2380,1413 2382,1410 2389,1408 2392,1403 2398,1400 2410,1399 2441,1353 2431,1353 2401,1338 2395,1331 2389,1319 2387,1313 2390,1308 2392,1304 2393,1301 2404,1316 2410,1316 2418,1310 2425,1312 2435,1305 2442,1306 2462,1300 2469,1293 2474,1295 2471,1316 2475,1316 2470,1318 2469,1331 2459,1354 2451,1381 2440,1406 \
2421,1437 2406,1450 2396,1464 2376,1499 2371,1486 2371,1431'
      )
      nP('ES', '2002,874 1997,871 2001,870')
      nP(
        'ES',
        '1884,912 1884,905 1889,898 1886,894 1889,885 1883,876 1889,876 1890,871 1889,868 1891,863 1890,855 1897,847 1893,845 1893,841 1877,844 1877,838 1871,841 1870,842 1870,839 1873,835 1870,837 1872,834 1870,833 1872,830 1868,833 1870,829 1868,829 1866,825 1880,814 1888,818 1900,816 1914,820 1923,818 1927,820 \
1941,820 1945,822 1945,825 1954,829 1966,830 1966,828 1974,832 1974,834 1976,833 1979,835 1991,834 1992,836 1990,837 1991,843 1980,851 1969,855 1966,859 1968,860 1960,870 1956,879 1958,886 1961,890 1954,896 1950,905 1952,907 1943,910 1938,920 1915,920 1907,925 1906,929 1905,929 1903,931 1898,928 1895,921 \
1895,918 1889,913'
      )
      nP('ES', '1973,888 1971,887 1972,885 1975,884')
      nP('ES', '1983,878 1989,872 1994,875 1990,882 1986,878')
      nP(
        'TG',
        '1968,1308 1967,1317 1973,1323 1973,1330 1975,1337 1975,1368 1977,1379 1976,1380 1973,1380 1971,1381 1967,1376 1964,1369 1966,1348 1963,1341 1965,1332 1961,1331 1963,1319 1958,1313 1958,1306 1959,1306 1964,1308'
      )
      nP('TC', '1238,1145 1236,1143 1237,1143')
      nP(
        'TR',
        '2409,914 2404,916 2402,911 2389,910 2384,914 2383,912 2376,915 2368,914 2353,921 2343,917 2334,921 2327,918 2326,924 2327,928 2324,928 2322,934 2320,932 2318,926 2323,921 2321,917 2314,923 2307,919 2300,927 2288,931 2281,923 2271,918 2266,918 2264,928 2262,926 2257,929 2252,926 2251,921 2245,918 2240,923 \
2241,919 2234,921 2243,915 2233,916 2236,912 2232,911 2233,902 2223,897 2225,895 2224,891 2227,896 2232,894 2227,891 2231,888 2227,882 2230,878 2221,879 2222,872 2227,865 2231,864 2235,866 2239,865 2238,863 2240,863 2240,865 2251,865 2248,863 2260,860 2252,857 2252,852 2273,854 2283,845 2294,840 2308,842 \
2311,839 2313,845 2321,845 2325,852 2329,850 2344,857 2355,854 2362,857 2376,848 2385,849 2389,847 2395,854 2398,860 2397,864 2397,869 2404,870 2409,875 2409,876 2407,874 2405,880 2401,880 2404,895 2406,896 2403,902 2407,905'
      )
      nP(
        'TN',
        '2055,1018 2050,990 2043,983 2041,976 2037,973 2034,963 2035,960 2042,951 2043,925 2041,923 2046,917 2057,911 2058,914 2062,913 2061,914 2063,918 2061,919 2063,920 2070,915 2064,929 2070,936 2071,942 2067,951 2060,959 2063,966 2067,966 2067,969 2070,967 2071,973 2075,974 2075,985 2062,996 2061,1000 2062,1010 \
'
      )
      nP(
        'CH',
        '2030,781 2027,774 2019,777 2029,758 2033,759 2035,757 2045,756 2043,755 2045,753 2055,757 2056,759 2055,761 2054,764 2055,764 2061,768 2064,767 2064,772 2060,772 2061,777 2052,773 2050,783 2044,777 2044,773 2038,782'
      )
      nP('TT', '1349,1305 1350,1303 1350,1305')
      nP(
        'AE',
        '2525,1097 2523,1101 2521,1097 2519,1098 2519,1108 2521,1111 2516,1112 2513,1131 2487,1128 2477,1108 2482,1112 2487,1109 2497,1111 2502,1110 2522,1081 2523,1086 2524,1087 2525,1092'
      )
      nP(
        'TH',
        '2992,1298 2989,1290 2986,1290 2984,1284 2972,1282 2973,1271 2964,1271 2963,1290 2954,1317 2955,1334 2961,1333 2969,1365 2966,1356 2964,1357 2966,1362 2973,1370 2978,1370 2984,1379 2981,1387 2979,1384 2974,1388 2973,1386 2974,1379 2971,1379 2970,1375 2966,1372 2964,1377 2960,1370 2960,1366 2951,1353 2949,1347 \
2947,1351 2946,1349 2946,1335 2950,1317 2951,1312 2959,1295 2954,1277 2955,1267 2945,1246 2949,1242 2949,1232 2952,1226 2950,1228 2948,1218 2941,1207 2939,1198 2936,1194 2941,1194 2940,1188 2943,1175 2953,1175 2954,1171 2957,1171 2958,1167 2964,1167 2966,1166 2969,1170 2967,1176 2968,1179 2976,1179 2977,1186 \
2972,1209 2975,1210 2984,1199 2990,1205 2997,1196 3003,1197 3010,1210 3011,1224 3019,1237 3018,1254 3015,1257 3014,1259 3011,1256 2995,1257 2989,1269 2987,1269'
      )
      nP('TT', '1346,1310 1348,1310 1347,1320 1338,1322 1342,1318 1340,1312')
      nP('PR', '1298,1201 1285,1203 1284,1197 1286,1194 1298,1195 1301,1199')
      nP(
        'RU',
        '3391,747 3390,755 3395,762 3396,770 3399,768 3401,775 3399,780 3398,772 3391,770 3385,782 3383,772 3386,751 3383,739 3386,727 3385,712 3387,704 3381,692 3381,685 3384,675 3382,669 3387,667 3389,669 3391,667 3390,665 3393,664 3392,662 3391,665 3392,661 3388,656 3392,654 3395,658 3393,663 3398,676 3396,684 \
3397,697 3398,695 3399,698 3403,716 3412,741 3406,732 3397,729 3401,731 3395,733'
      )
      nP(
        'RU',
        '2238,561 2273,532 2276,526 2260,513 2266,509 2266,506 2261,503 2260,501 2262,498 2257,495 2259,492 2256,491 2258,484 2262,484 2251,466 2261,454 2254,448 2247,446 2245,441 2248,436 2245,435 2250,433 2261,426 2261,424 2269,426 2269,422 2278,424 2278,421 2281,422 2280,419 2291,423 2289,425 2281,424 2285,426 \
2283,428 2291,427 2288,429 2296,428 2293,430 2295,431 2291,435 2295,432 2298,429 2320,431 2371,453 2372,460 2375,462 2373,467 2361,475 2347,478 2305,471 2293,467 2287,462 2279,462 2294,469 2289,470 2296,471 2290,471 2298,473 2294,474 2302,475 2309,481 2310,483 2307,482 2307,487 2304,488 2310,497 2308,501 \
2335,512 2341,509 2340,504 2332,503 2325,495 2331,491 2345,496 2341,500 2346,497 2366,501 2364,495 2358,489 2358,486 2375,478 2382,471 2394,473 2398,476 2394,479 2399,476 2403,481 2402,476 2406,465 2398,459 2403,450 2402,450 2403,445 2394,439 2420,442 2426,447 2428,452 2415,453 2410,459 2417,461 2421,467 \
2427,466 2425,468 2438,464 2440,457 2439,455 2441,454 2452,455 2447,450 2453,451 2469,443 2482,441 2485,442 2483,443 2484,444 2488,442 2486,440 2487,439 2484,440 2499,434 2507,434 2497,435 2501,436 2498,439 2501,443 2493,445 2509,446 2515,441 2534,441 2543,436 2546,438 2544,436 2550,434 2554,434 2550,435 \
2556,438 2552,440 2552,443 2560,443 2561,442 2560,439 2571,435 2570,432 2567,432 2563,425 2570,421 2603,426 2612,429 2610,432 2612,430 2625,435 2632,436 2646,446 2653,436 2651,435 2654,435 2646,434 2642,430 2643,426 2632,423 2630,425 2631,419 2635,417 2633,416 2635,407 2629,407 2628,405 2631,403 2628,403 \
2646,391 2652,378 2655,375 2677,375 2690,378 2691,385 2686,393 2680,397 2688,401 2690,406 2690,413 2686,415 2689,421 2687,434 2698,442 2693,446 2694,451 2692,453 2682,460 2684,462 2676,465 2677,469 2669,471 2665,470 2669,468 2651,467 2656,471 2682,476 2685,475 2687,470 2700,464 2701,460 2709,454 2709,447 \
2705,443 2708,437 2728,434 2728,437 2735,441 2734,445 2736,446 2735,450 2733,452 2740,456 2753,455 2737,453 2738,447 2744,445 2740,441 2739,435 2722,430 2709,433 2699,431 2701,428 2697,423 2699,417 2705,409 2697,400 2692,398 2697,392 2712,387 2713,383 2710,376 2716,377 2719,380 2718,381 2719,385 2714,391 \
2717,394 2715,398 2731,403 2739,401 2746,406 2753,404 2748,404 2745,402 2745,400 2741,400 2742,398 2737,399 2725,395 2723,390 2731,388 2738,391 2743,391 2744,389 2742,387 2736,387 2747,383 2770,387 2769,388 2779,393 2795,393 2791,398 2785,400 2786,402 2784,404 2786,407 2783,410 2786,416 2784,410 2787,410 \
2789,405 2793,405 2792,412 2789,415 2793,418 2794,417 2792,414 2796,414 2800,412 2794,400 2799,394 2784,387 2784,385 2769,381 2770,379 2768,378 2770,374 2765,371 2768,370 2765,369 2769,366 2767,365 2833,361 2820,367 2830,374 2821,367 2834,364 2839,360 2836,361 2832,358 2836,358 2822,354 2827,352 2831,353 \
2830,354 2834,353 2820,349 2823,346 2832,349 2830,348 2836,344 2834,344 2840,343 2832,341 2842,342 2855,336 2904,329 2891,329 2894,327 2925,327 2919,330 2920,331 2956,325 2954,326 2961,328 2956,332 2954,335 2965,341 2961,336 2955,335 2962,330 2962,327 2951,321 2985,323 2972,320 2975,317 2971,315 2984,308 \
3006,302 3022,305 3026,308 3004,312 3022,311 3018,314 3038,315 3027,321 3042,320 3043,317 3074,317 3085,321 3082,323 3091,324 3089,325 3092,326 3089,328 3096,325 3099,331 3102,331 3099,335 3099,334 3087,331 3092,333 3092,335 3096,334 3101,337 3081,349 3059,354 3063,354 3045,364 3035,364 3031,369 3024,370 \
3015,377 3026,374 3025,372 3027,371 3047,370 3045,370 3058,367 3055,366 3061,367 3072,363 3059,362 3065,358 3073,360 3075,358 3079,358 3075,359 3086,363 3092,362 3092,359 3098,364 3095,367 3098,369 3098,372 3094,376 3095,378 3104,380 3095,376 3099,374 3099,370 3104,369 3098,366 3118,363 3150,365 3154,366 \
3148,366 3148,370 3162,375 3182,374 3184,375 3225,385 3228,383 3233,390 3235,391 3236,398 3237,390 3231,383 3241,384 3251,392 3256,392 3255,389 3259,393 3252,395 3256,395 3262,402 3270,406 3272,404 3275,408 3283,401 3286,401 3284,399 3291,390 3291,392 3301,397 3309,398 3324,394 3339,399 3342,402 3345,402 \
3342,400 3347,400 3343,398 3345,395 3364,397 3361,390 3358,390 3366,386 3355,385 3360,381 3375,380 3370,376 3372,375 3433,384 3414,382 3406,385 3409,386 3421,385 3434,384 3424,391 3425,388 3428,387 3422,385 3421,388 3423,390 3414,389 3417,391 3414,393 3418,394 3425,392 3437,384 3457,385 3466,391 3462,392 \
3458,390 3453,394 3472,397 3465,401 3480,399 3486,404 3482,404 3490,406 3524,402 3556,406 3566,413 3566,415 3563,417 3563,421 3575,425 3575,432 3579,434 3574,441 3581,435 3580,428 3583,426 3606,422 3634,427 3643,422 3648,426 3648,430 3659,433 3661,437 3672,438 3670,436 3676,433 3672,425 3667,425 3671,422 \
3670,417 3698,422 3700,420 3727,421 3754,428 3757,429 3752,429 3766,434 3766,493 3751,500 3753,498 3742,498 3735,493 3729,494 3735,494 3739,497 3726,495 3710,499 3726,496 3730,499 3727,501 3741,498 3740,501 3742,504 3749,505 3750,510 3753,510 3754,515 3749,516 3753,516 3753,519 3754,516 3756,519 3754,519 \
3760,522 3758,524 3761,527 3762,530 3757,532 3757,535 3739,531 3740,527 3738,529 3736,526 3735,529 3712,540 3713,541 3712,542 3701,543 3697,548 3693,548 3695,550 3689,551 3690,554 3686,553 3688,555 3672,563 3668,571 3658,560 3636,565 3627,572 3629,562 3615,568 3617,570 3614,573 3610,568 3607,572 3602,569 \
3602,571 3599,572 3599,575 3597,576 3599,579 3596,581 3597,584 3594,583 3596,585 3589,589 3585,599 3589,604 3591,600 3597,602 3596,607 3593,609 3593,617 3597,619 3599,627 3596,630 3592,627 3595,622 3589,624 3591,626 3586,628 3582,637 3586,648 3583,652 3573,652 3565,658 3563,665 3565,667 3563,667 3566,674 \
3561,671 3552,677 3552,676 3550,675 3549,680 3551,685 3548,691 3532,707 3528,682 3530,682 3526,677 3521,640 3524,620 3535,608 3533,604 3547,599 3562,587 3570,576 3584,567 3584,563 3602,556 3600,554 3606,549 3603,548 3606,543 3607,535 3612,532 3618,535 3616,533 3622,533 3609,529 3598,531 3597,533 3599,534 \
3597,535 3595,542 3598,544 3595,547 3594,544 3589,544 3573,558 3567,561 3569,554 3563,555 3569,540 3560,544 3558,541 3540,542 3532,546 3532,551 3507,571 3508,575 3506,578 3517,579 3512,583 3510,581 3505,584 3499,581 3494,586 3489,584 3478,587 3476,583 3488,581 3482,580 3479,576 3472,578 3469,577 3472,576 \
3461,573 3455,575 3457,578 3452,577 3454,579 3454,581 3447,578 3440,581 3430,578 3428,582 3425,582 3423,581 3424,578 3404,578 3386,584 3371,596 3369,602 3351,615 3342,627 3316,647 3322,651 3332,650 3332,663 3336,662 3337,659 3335,658 3336,657 3342,655 3338,658 3343,660 3337,667 3343,666 3350,660 3347,667 \
3349,667 3352,660 3351,656 3362,655 3370,665 3379,671 3376,675 3372,673 3377,677 3378,680 3376,684 3380,687 3378,690 3379,691 3371,700 3369,710 3370,718 3371,719 3369,722 3370,727 3366,743 3357,753 3345,778 3323,804 3316,818 3296,830 3287,828 3288,821 3284,825 3285,821 3282,821 3276,832 3271,831 3273,833 \
3271,836 3271,835 3270,834 3268,829 3275,827 3277,820 3277,810 3274,798 3279,796 3283,790 3294,795 3295,794 3296,789 3303,777 3306,760 3312,755 3310,750 3312,746 3308,744 3295,749 3289,755 3274,755 3271,749 3272,745 3269,741 3271,737 3266,737 3259,729 3242,726 3239,723 3240,717 3237,715 3237,709 3233,704 \
3234,700 3232,701 3233,699 3228,690 3230,688 3224,681 3225,679 3220,677 3220,674 3209,672 3200,667 3172,671 3164,678 3165,681 3171,682 3171,688 3164,696 3155,714 3157,715 3157,719 3142,727 3131,723 3126,720 3118,722 3112,717 3107,716 3092,727 3071,733 3049,730 3043,725 3043,721 3035,720 3030,715 3016,713 \
3000,718 2992,715 2986,711 2985,700 2962,694 2952,688 2943,698 2941,705 2946,712 2946,716 2944,719 2936,724 2924,720 2909,720 2906,712 2886,708 2859,721 2860,724 2854,728 2845,728 2841,733 2838,734 2836,734 2829,726 2830,723 2824,728 2815,726 2812,719 2805,716 2802,708 2797,705 2787,709 2777,709 2776,706 \
2773,706 2774,702 2769,700 2763,709 2741,671 2727,660 2726,658 2729,658 2730,653 2710,662 2707,665 2706,668 2701,665 2696,668 2694,665 2700,659 2695,661 2688,658 2689,660 2686,661 2687,658 2682,654 2684,658 2680,656 2674,658 2672,655 2674,655 2675,650 2672,648 2670,640 2664,643 2651,638 2652,640 2644,642 \
2645,644 2644,645 2617,650 2614,652 2614,655 2593,657 2588,659 2587,662 2576,659 2572,661 2574,663 2570,666 2577,667 2574,667 2573,670 2583,675 2572,675 2568,679 2572,685 2561,691 2578,701 2575,708 2568,710 2562,707 2557,713 2556,711 2548,708 2545,703 2539,703 2539,706 2536,707 2533,704 2526,704 2518,712 \
2508,705 2508,711 2506,712 2506,707 2495,698 2487,698 2485,693 2478,698 2474,698 2475,695 2469,694 2469,696 2467,695 2465,700 2456,703 2455,707 2448,711 2450,720 2449,721 2443,722 2436,714 2434,720 2430,722 2429,730 2431,733 2426,744 2432,746 2433,754 2443,755 2451,769 2446,770 2453,775 2448,779 2448,783 \
2447,781 2439,786 2436,784 2437,787 2435,784 2432,799 2428,803 2434,810 2436,814 2435,818 2438,813 2436,825 2447,843 2439,853 2425,842 2417,838 2418,833 2410,829 2400,832 2389,823 2377,822 2363,817 2361,820 2348,806 2343,805 2338,800 2335,800 2333,796 2326,793 2330,791 2327,790 2329,789 2332,792 2338,791 \
2336,786 2340,780 2346,779 2340,774 2338,770 2346,771 2345,768 2354,764 2352,761 2343,764 2344,757 2349,752 2359,752 2361,746 2357,741 2361,737 2358,735 2362,731 2362,726 2359,727 2344,719 2341,722 2335,714 2327,717 2322,714 2316,715 2314,704 2304,701 2301,695 2305,693 2299,685 2284,685 2283,689 2278,688 \
2276,685 2276,678 2273,675 2275,672 2283,673 2288,668 2285,664 2278,663 2279,659 2274,656 2271,650 2268,648 2271,644 2268,640 2270,636 2263,632 2255,634 2254,630 2242,628 2240,617 2237,616 2239,610 2234,607 2236,602 2238,602 2235,596 2234,587 2242,580 2240,577 2241,573 2244,575 2245,572 2249,573 2252,569 \
2263,570 2246,564 2245,561 2247,563 2246,560 2247,558'
      )
      nP(
        'ZA',
        '2125,1904 2131,1896 2134,1900 2134,1906 2142,1909 2151,1909 2156,1903 2160,1901 2160,1846 2164,1850 2168,1863 2166,1877 2177,1878 2186,1867 2190,1854 2195,1854 2199,1859 2207,1862 2215,1860 2219,1846 2224,1844 2228,1839 2230,1829 2235,1825 2243,1814 2254,1808 2266,1810 2273,1811 2280,1842 2280,1864 2274,1861 \
2269,1871 2268,1877 2275,1885 2280,1885 2280,1877 2282,1878 2284,1878 2289,1878 2284,1903 2274,1916 2260,1944 2239,1971 2225,1982 2217,1982 2217,1986 2210,1985 2208,1988 2185,1986 2178,1991 2165,1992 2160,1998 2153,1994 2153,1992 2148,1991 2148,1987 2145,1987 2144,1990 2144,1981 2138,1968 2143,1965 2143,1954 \
2133,1930'
      )
      nP('RU', '3460,786 3464,780 3470,778')
      nP('QA', '2476,1100 2475,1102 2473,1102 2472,1103 2469,1100 2469,1089 2474,1079 2477,1085')
      nP(
        'PH',
        '3195,1267 3197,1266 3197,1261 3204,1266 3199,1269 3203,1274 3201,1277 3206,1277 3205,1284 3202,1282 3204,1278 3201,1280 3197,1277 3196,1271 3189,1263 3190,1275 3188,1270 3181,1263 3177,1269 3173,1264 3170,1266 3170,1259 3173,1253 3169,1250 3169,1256 3166,1250 3165,1251 3161,1230 3163,1226 3165,1232 3168,1230 \
3167,1209 3170,1194 3175,1193 3183,1198 3185,1194 3187,1196 3185,1205 3189,1216 3188,1219 3184,1228 3185,1231 3179,1234 3180,1237 3178,1243 3181,1261 3186,1264 3186,1259 3187,1261 3189,1257 3192,1258 3195,1263'
      )
      nP(
        'RO',
        '2187,807 2185,803 2188,802 2185,800 2181,803 2174,799 2175,797 2174,795 2175,793 2168,788 2168,784 2162,779 2172,776 2180,758 2189,751 2192,749 2206,751 2209,755 2226,746 2230,748 2241,766 2243,771 2241,787 2242,789 2247,792 2254,789 2257,792 2256,798 2249,796 2248,801 2250,800 2249,801 2246,806 2246,814 \
2230,808 2221,811 2215,816 2202,815 2189,813 2190,809'
      )
      nP(
        'PH',
        '3198,1363 3195,1360 3195,1357 3192,1361 3192,1357 3190,1356 3185,1369 3183,1367 3186,1353 3193,1351 3194,1345 3197,1345 3198,1342 3202,1346 3203,1350 3201,1353 3206,1350 3208,1344 3211,1345 3212,1338 3215,1340 3219,1338 3218,1326 3226,1334 3227,1340 3225,1344 3228,1345 3228,1355 3230,1364 3227,1371 3226,1370 \
3226,1379 3222,1363 3220,1364 3218,1372 3221,1383 3218,1390 3216,1386 3216,1382 3213,1385 3205,1377 3204,1369 3207,1362 3204,1358 3198,1356'
      )
      nP('PH', '3152,1321 3157,1314 3156,1308 3158,1312 3157,1308 3159,1301 3159,1309 3161,1315 3156,1322 3151,1324 3151,1328 3147,1335 3135,1348 3140,1337')
      nP(
        'SN',
        '1821,1282 1806,1282 1802,1286 1791,1288 1790,1285 1793,1283 1793,1284 1794,1284 1802,1285 1805,1280 1802,1284 1798,1282 1793,1281 1791,1284 1791,1277 1800,1275 1800,1272 1806,1272 1807,1269 1815,1274 1821,1271 1819,1269 1815,1271 1808,1265 1804,1269 1793,1269 1794,1263 1791,1266 1791,1263 1795,1260 1791,1262 \
1787,1253 1783,1251 1790,1244 1793,1231 1796,1225 1815,1223 1820,1230 1825,1231 1830,1244 1836,1251 1839,1260 1838,1267 1845,1278 1845,1286 1835,1288 1828,1285 1828,1283'
      )
      nP('LS', '2255,1915 2252,1924 2244,1928 2241,1935 2238,1934 2234,1930 2230,1920 2242,1906 2247,1904 2249,1907')
      nP(
        'SL',
        '1856,1345 1853,1356 1844,1369 1834,1362 1837,1359 1834,1359 1829,1354 1829,1349 1827,1350 1826,1345 1828,1347 1830,1344 1827,1345 1826,1337 1831,1333 1834,1324 1847,1323 1852,1333 1851,1336 1853,1337 1852,1348'
      )
      nP(
        'SI',
        '2097,772 2105,774 2121,767 2123,768 2126,773 2123,772 2116,777 2117,783 2113,784 2111,789 2106,785 2104,788 2096,788 2096,787 2097,786 2099,786 2094,780 2096,778 2093,776'
      )
      nP('RU', '3434,805 3436,799 3444,792 3444,789 3446,792 3453,788 3453,791 3441,796')
      nP('RW', '2250,1515 2249,1509 2251,1507 2253,1498 2256,1494 2260,1495 2265,1489 2269,1505 2269,1509 2266,1509 2260,1508 2258,1515 2254,1516 2252,1512')
      nP('RU', '3426,803 3430,804 3419,815')
      nP('KN', '1330,1214 1329,1213 1328,1211')
      nP(
        'SA',
        '2481,1187 2449,1198 2424,1238 2424,1222 2405,1211 2400,1213 2394,1210 2393,1222 2389,1227 2384,1210 2377,1203 2373,1192 2368,1176 2357,1165 2352,1155 2351,1144 2351,1133 2345,1115 2335,1106 2332,1099 2333,1094 2312,1051 2306,1050 2310,1031 2321,1034 2328,1023 2336,1021 2341,1014 2331,999 2353,989 2365,992 \
2382,1005 2408,1033 2426,1035 2436,1036 2438,1043 2445,1043 2450,1054 2449,1057 2453,1058 2454,1060 2452,1060 2455,1065 2463,1072 2461,1071 2463,1077 2461,1081 2469,1100 2472,1103 2473,1102 2475,1104 2476,1103 2474,1107 2477,1108 2487,1128 2513,1131 2518,1142 2511,1172'
      )
      nP(
        'VE',
        '1357,1345 1358,1349 1350,1360 1351,1365 1354,1367 1346,1372 1345,1380 1343,1384 1349,1395 1351,1399 1347,1405 1329,1412 1328,1420 1323,1414 1316,1415 1315,1411 1309,1409 1315,1419 1316,1436 1323,1437 1323,1441 1317,1444 1316,1449 1306,1456 1301,1464 1301,1458 1293,1462 1288,1455 1285,1437 1278,1430 1284,1422 \
1280,1416 1278,1405 1278,1393 1282,1380 1278,1378 1264,1382 1255,1368 1236,1368 1232,1360 1233,1351 1229,1337 1226,1333 1223,1335 1231,1306 1237,1298 1243,1295 1237,1299 1241,1312 1235,1325 1240,1337 1246,1333 1246,1325 1241,1314 1241,1308 1256,1300 1258,1301 1258,1297 1254,1298 1254,1294 1256,1290 1260,1301 \
1268,1301 1272,1305 1275,1315 1294,1313 1298,1319 1306,1322 1320,1315 1314,1315 1314,1313 1338,1312 1328,1315 1327,1319 1329,1317 1330,1321 1327,1321 1329,1323 1330,1322 1331,1319 1333,1327 1335,1324 1335,1328 1336,1325 1335,1322 1339,1329 1339,1326 1341,1324 1348,1331 1345,1342 1345,1344 1342,1344 1341,1344 \
1346,1347 1348,1344'
      )
      nP('VE', '1304,1309 1302,1309 1304,1308')
      nP('VE', '1316,1310 1313,1307 1316,1308 1318,1305 1319,1308')
      nP('SZ', '2282,1878 2280,1877 2280,1885 2275,1885 2268,1877 2269,1871 2274,1861 2280,1864 2281,1871')
      nP('US', '395,1168 401,1172 405,1179 396,1188 394,1186 393,1176')
      nP(
        'UY',
        '1373,1977 1373,1972 1375,1972 1376,1969 1375,1962 1375,1954 1379,1939 1378,1933 1381,1928 1385,1930 1389,1927 1397,1937 1397,1941 1401,1938 1405,1944 1418,1955 1426,1966 1422,1973 1422,1980 1423,1982 1416,1995 1414,1994 1414,1996 1408,2000 1400,1997 1395,1999 1386,1992 1379,1993 1373,1984'
      )
      nP(
        'BF',
        '1968,1308 1964,1308 1958,1306 1953,1309 1931,1308 1930,1312 1932,1330 1927,1324 1923,1323 1916,1329 1912,1327 1908,1318 1904,1316 1904,1306 1907,1301 1906,1295 1915,1288 1914,1282 1917,1280 1916,1276 1919,1270 1925,1275 1927,1273 1926,1267 1930,1267 1931,1262 1934,1258 1939,1260 1939,1255 1948,1251 1952,1246 \
1961,1249 1961,1255 1965,1267 1972,1272 1969,1272 1969,1277 1975,1283 1981,1282 1982,1285 1980,1287 1983,1294 1979,1301 1974,1301'
      )
      nP('VC', '1345,1276 1344,1273 1346,1273')
      nP(
        'UZ',
        '2672,867 2666,865 2670,860 2666,855 2659,861 2655,859 2655,868 2648,868 2652,869 2650,870 2651,872 2648,873 2647,877 2639,876 2636,879 2635,883 2643,886 2642,893 2646,898 2639,913 2634,913 2627,910 2628,901 2618,897 2599,883 2586,870 2580,854 2563,850 2562,844 2564,844 2562,837 2554,835 2547,829 2543,831 \
2546,836 2542,833 2540,838 2535,838 2531,842 2532,852 2521,851 2521,795 2547,787 2573,807 2582,818 2594,816 2606,817 2611,814 2620,827 2623,826 2622,841 2627,841 2629,853 2641,853 2643,855 2642,859 2646,862 2648,862 2648,857 2652,850 2672,837 2675,838 2664,848 2676,854 2679,847 2684,856 2694,858 2688,863 \
2686,862 2686,865 2684,864 2679,869'
      )
      nP(
        'ZM',
        '2293,1684 2262,1699 2264,1709 2256,1709 2249,1714 2248,1723 2238,1729 2230,1744 2227,1746 2213,1741 2207,1737 2195,1739 2182,1722 2180,1717 2180,1669 2200,1669 2199,1666 2201,1660 2200,1637 2204,1641 2205,1646 2214,1642 2214,1649 2220,1653 2229,1654 2230,1648 2232,1648 2237,1658 2245,1662 2250,1675 2256,1672 \
2258,1676 2258,1656 2255,1658 2255,1661 2250,1660 2244,1647 2247,1634 2247,1621 2244,1613 2249,1606 2249,1601 2268,1597 2271,1603 2290,1615 2297,1632 2293,1637 2294,1641 2293,1645 2293,1656 2296,1660 2291,1663 2290,1673 2287,1678'
      )
      nP(
        'YE',
        '2448,1262 2441,1262 2428,1271 2417,1272 2410,1282 2396,1282 2390,1248 2388,1244 2389,1243 2389,1227 2393,1222 2394,1210 2400,1213 2405,1211 2424,1222 2424,1238 2449,1198 2481,1187 2489,1213 2492,1223 2484,1228 2483,1238 2452,1255'
      )
      nP(
        'RS',
        '2144,832 2147,822 2150,822 2149,818 2152,818 2155,815 2152,810 2156,810 2151,805 2154,797 2150,798 2152,792 2154,792 2150,790 2151,788 2149,787 2148,782 2156,778 2162,779 2168,784 2168,788 2175,793 2174,795 2175,797 2174,799 2181,803 2185,800 2188,802 2185,803 2187,807 2184,813 2185,818 2190,823 2184,828 \
2186,833 2184,836 2171,838 2166,842 2165,837 2161,832 2158,834 2156,831 2153,838 2154,843 2149,836 2145,834'
      )
      nP(
        'ZW',
        '2264,1709 2264,1714 2273,1715 2279,1721 2290,1725 2289,1728 2291,1750 2287,1759 2289,1761 2288,1767 2291,1774 2285,1784 2284,1792 2285,1795 2273,1811 2266,1810 2254,1808 2251,1805 2251,1802 2240,1798 2237,1791 2237,1782 2233,1782 2232,1776 2222,1767 2213,1741 2227,1746 2230,1744 2238,1729 2248,1723 2249,1714 \
2256,1709'
      )
      nP(
        'VN',
        '3008,1316 3012,1315 3014,1308 3021,1307 3025,1311 3022,1298 3028,1298 3027,1293 3039,1287 3040,1269 3037,1260 3039,1252 3038,1247 3040,1243 3035,1235 3038,1231 3032,1224 3030,1225 3029,1217 3015,1197 3015,1193 3002,1182 3004,1180 3003,1177 3010,1178 3013,1172 3007,1165 3010,1162 3004,1157 3000,1162 2995,1159 \
2992,1153 2993,1146 2990,1147 2984,1136 2988,1130 2993,1135 2996,1130 2998,1133 3000,1130 3003,1134 3004,1130 3010,1130 3012,1124 3017,1122 3022,1128 3030,1129 3029,1135 3030,1141 3037,1148 3043,1149 3037,1152 3037,1157 3035,1158 3030,1157 3031,1162 3029,1163 3028,1168 3023,1173 3019,1187 3028,1203 3027,1206 \
3030,1211 3041,1228 3045,1229 3045,1232 3047,1230 3046,1233 3052,1241 3058,1279 3055,1283 3057,1287 3055,1286 3056,1294 3055,1291 3053,1302 3043,1312 3036,1317 3031,1312 3029,1316 3031,1318 3027,1318 3031,1321 3029,1323 3026,1319 3030,1325 3024,1319 3029,1329 3021,1323 3025,1332 3018,1336 3013,1344 3011,1344 \
3012,1342 3011,1341 3012,1327 3014,1323'
      )
      nP(
        'NA',
        '2105,1815 2084,1758 2078,1746 2077,1733 2085,1733 2091,1729 2100,1736 2144,1735 2149,1742 2168,1745 2195,1739 2207,1737 2213,1741 2206,1745 2204,1744 2196,1752 2193,1744 2170,1749 2170,1805 2160,1805 2160,1846 2160,1901 2156,1903 2151,1909 2142,1909 2134,1906 2134,1900 2131,1896 2125,1904 2117,1896 2113,1885 \
2108,1861 2108,1851 2104,1836 2104,1822 2107,1822 2106,1814'
      )
      nP('VG', '1308,1207 1309,1206 1310,1206')
      nP(
        'EH',
        '1872,1062 1872,1082 1839,1082 1839,1120 1828,1128 1829,1152 1789,1152 1788,1161 1787,1159 1789,1143 1795,1133 1801,1113 1799,1117 1799,1115 1810,1101 1814,1079 1823,1071 1827,1057 1858,1057 1872,1057 1872,1059'
      )
      nP('WE', '2316,985 2316,995 2315,999 2309,1001 2313,995 2310,994 2311,984')
      nP('GB', '1896,658 1893,659 1889,654 1886,658 1883,658 1877,653 1886,644 1898,642 1902,648 1900,651 1903,650 1905,653 1904,654 1902,651 1903,656 1898,659')
      nP(
        'US',
        '604,590 600,578 599,580 601,583 598,581 603,595 602,597 599,593 595,594 596,592 593,587 596,586 592,584 592,588 583,584 583,587 588,587 590,589 589,590 591,590 594,594 589,593 590,595 587,596 568,583 569,582 557,577 559,570 561,576 561,573 565,572 559,569 550,574 540,572 541,570 540,567 536,570 526,568 \
515,570 504,565 507,559 501,564 495,562 497,559 491,560 493,558 487,559 492,557 486,555 491,553 480,556 478,556 478,552 477,557 473,555 476,550 473,554 472,553 469,554 472,554 470,557 466,558 471,558 471,560 467,563 473,560 474,563 470,566 472,566 469,570 463,569 461,572 459,568 457,572 458,574 457,573 \
456,570 456,575 453,573 453,575 450,578 451,574 448,578 448,576 444,581 434,580 443,573 439,575 434,573 440,564 439,559 449,554 463,557 453,552 461,547 457,547 453,551 447,550 437,555 429,565 422,565 427,569 420,572 423,574 420,575 419,573 416,578 412,579 413,579 411,583 421,587 412,592 413,594 410,595 \
412,595 411,598 403,599 400,604 397,603 396,606 388,610 390,612 388,615 379,617 377,619 378,620 369,623 367,626 372,626 368,630 367,627 366,630 359,632 356,636 357,633 355,632 348,638 340,640 338,638 341,637 337,635 332,641 333,643 328,644 326,641 327,645 321,643 322,646 319,648 320,643 327,640 335,632 \
350,633 347,630 349,625 363,618 367,618 366,615 370,610 376,606 379,607 376,605 377,598 382,597 378,594 385,582 382,586 371,591 367,587 368,585 373,586 368,582 367,586 365,585 364,589 366,592 364,594 357,585 354,588 350,584 337,591 331,590 336,588 335,584 337,583 333,582 336,577 331,569 331,566 329,567 \
331,561 334,559 332,559 327,565 327,570 312,572 301,563 303,561 299,561 306,557 310,558 308,561 313,558 316,561 319,558 314,557 317,556 301,556 305,553 301,551 306,545 301,548 300,551 299,553 294,549 295,547 291,546 294,544 292,542 296,542 296,538 300,533 306,533 304,531 308,528 305,530 304,527 306,524 \
310,524 307,522 309,521 322,524 330,516 341,517 345,511 341,503 338,503 345,498 341,495 325,504 321,499 319,500 322,501 321,503 315,500 302,503 292,501 283,491 292,490 271,484 290,476 298,477 294,476 309,470 313,470 316,471 315,471 314,475 311,476 316,478 335,480 338,475 343,476 338,473 334,475 334,471 \
327,466 330,465 337,472 351,473 351,469 336,470 334,468 338,465 336,464 316,462 312,455 284,444 289,443 291,436 316,432 322,428 323,423 333,414 335,415 332,417 354,410 351,412 355,415 355,412 360,411 352,409 360,406 362,406 359,407 374,406 386,399 397,401 391,405 393,408 402,402 403,404 405,402 407,404 \
407,406 411,407 430,406 428,409 432,409 427,410 436,410 434,412 462,411 504,419 521,417 544,424 544,565 554,567 563,564 562,568 578,581 579,586 581,584 584,583 588,582 589,578 592,577 590,576 599,573 604,576 604,580 620,593 632,612 631,613 634,614 633,617 636,621 653,628 654,631 652,633 654,641 650,646 \
647,648 647,646 645,648 644,644 649,640 643,643 648,640 645,640 645,634 642,631 644,628 635,632 636,633 636,635 633,636 632,634 636,627 634,625 629,620 630,617 626,617 626,613 619,612 623,609 620,609 621,606 618,604 624,607 619,602 623,601 617,603 616,600 617,597 615,600 613,598 614,594 616,592 614,592 \
612,597 609,594 606,594'
      )
      nP(
        'UA',
        '2279,773 2284,773 2287,771 2280,771 2280,766 2278,762 2279,771 2275,771 2276,768 2269,772 2263,782 2258,786 2257,783 2257,792 2254,789 2247,792 2242,789 2245,788 2245,785 2250,780 2250,773 2262,774 2259,772 2260,768 2256,766 2256,760 2252,759 2252,751 2238,744 2226,746 2209,755 2206,751 2192,749 2189,751 \
2186,748 2181,744 2184,738 2186,734 2189,735 2187,727 2201,712 2200,708 2201,707 2196,697 2204,692 2212,691 2232,694 2238,698 2243,695 2248,699 2251,695 2254,699 2262,698 2266,701 2266,695 2270,689 2278,688 2283,689 2284,685 2299,685 2305,693 2301,695 2304,701 2314,704 2316,715 2322,714 2327,717 2335,714 \
2341,722 2344,719 2359,727 2362,726 2362,731 2358,735 2361,737 2357,741 2361,746 2359,752 2349,752 2344,757 2343,764 2320,771 2310,779 2313,776 2312,774 2307,778 2306,780 2304,780 2306,778 2297,777 2302,781 2307,781 2305,784 2310,786 2312,791 2314,790 2307,779 2315,791 2327,790 2325,791 2325,794 2316,794 \
2300,805 2294,802 2296,801 2296,794 2285,790 2298,782 2297,778 2284,779 2278,776 2281,775 2275,772'
      )
      nP('US', '351,1145 351,1144 352,1142')
      nP('US', '264,522 259,522 256,525 247,518 242,518 243,519 250,521 237,519 234,517 235,512 243,516 250,514 257,519 266,520')
      nP('TW', '3165,1119 3174,1097 3179,1092 3184,1097 3172,1143 3164,1126')
      nP(
        'TZ',
        '2365,1631 2353,1642 2345,1645 2340,1643 2335,1650 2329,1648 2322,1650 2319,1645 2316,1648 2310,1648 2307,1641 2306,1625 2304,1620 2301,1616 2300,1620 2290,1615 2271,1603 2268,1597 2263,1581 2256,1568 2257,1559 2254,1548 2254,1540 2261,1538 2269,1522 2269,1518 2264,1516 2266,1509 2269,1509 2269,1505 2265,1489 \
2287,1488 2300,1488 2337,1518 2337,1526 2353,1544 2348,1564 2349,1569 2356,1579 2353,1587 2355,1591 2354,1598 2356,1608 2355,1607 2357,1612 2359,1624'
      )
      nP(
        'TM',
        '2627,910 2619,908 2617,912 2610,914 2607,927 2593,933 2593,939 2589,942 2585,944 2582,939 2574,937 2573,921 2565,921 2562,916 2556,912 2555,908 2536,902 2533,897 2516,900 2510,905 2508,909 2500,911 2499,893 2501,887 2497,881 2493,881 2493,883 2492,881 2494,876 2494,878 2498,878 2495,876 2497,871 2490,871 \
2491,874 2489,870 2488,864 2490,856 2492,859 2496,860 2497,857 2499,861 2505,861 2504,858 2508,858 2509,854 2502,849 2499,839 2491,841 2490,855 2486,845 2491,839 2503,836 2511,842 2516,851 2521,851 2532,852 2531,842 2535,838 2540,838 2542,833 2546,836 2543,831 2547,829 2554,835 2562,837 2564,844 2562,844 \
2563,850 2580,854 2586,870 2599,883 2618,897 2628,901'
      )
      nP(
        'GB',
        '1972,704 1962,709 1948,707 1935,712 1930,709 1925,711 1922,717 1915,715 1908,718 1907,721 1902,719 1911,711 1917,702 1929,702 1935,694 1926,699 1921,696 1916,697 1918,695 1909,696 1910,694 1906,694 1908,693 1907,691 1918,685 1918,676 1911,678 1917,672 1932,670 1928,667 1930,664 1928,661 1931,657 1927,658 \
1923,652 1925,647 1929,645 1923,645 1919,648 1915,646 1915,650 1910,647 1910,650 1907,646 1913,637 1910,634 1910,631 1914,631 1911,630 1911,628 1909,632 1907,631 1906,632 1910,626 1905,630 1904,639 1901,640 1903,625 1908,622 1905,623 1908,618 1902,622 1899,620 1903,619 1897,619 1904,615 1902,613 1905,613 \
1902,612 1905,611 1903,610 1904,608 1901,609 1900,606 1904,607 1901,605 1901,602 1908,602 1904,599 1906,598 1905,596 1908,596 1909,590 1912,591 1911,593 1929,590 1928,594 1919,601 1915,601 1921,602 1915,606 1918,605 1917,607 1926,604 1941,606 1934,621 1926,624 1930,623 1933,626 1922,629 1933,629 1943,636 \
1946,648 1958,658 1957,660 1961,666 1956,664 1952,664 1961,669 1963,674 1959,677 1963,678 1968,675 1976,679 1975,689 1971,690 1972,692 1963,698 1966,699 1968,700 1973,699'
      )
      nP(
        'UG',
        '2300,1488 2287,1488 2265,1489 2260,1495 2256,1494 2260,1461 2273,1441 2268,1436 2269,1421 2272,1416 2276,1418 2279,1416 2282,1420 2284,1417 2291,1415 2295,1417 2300,1410 2305,1418 2304,1422 2310,1435 2311,1445 2309,1455 2306,1457 2299,1472'
      )
      nP('US', '384,1156 380,1156 386,1155')
      nP('US', '375,1153 372,1153 370,1148 374,1147 376,1152')
      nP('US', '384,1161 383,1158 385,1159')
      nP('US', '389,1163 386,1159 387,1156 393,1160')
      nP('US', '292,563 296,565 297,571 291,573 278,567')
      nP('US', '1228,859 1216,861 1220,857 1233,853 1230,857 1238,855')
      nP(
        'US',
        '1196,923 1198,930 1194,926 1195,929 1190,931 1189,927 1189,932 1195,931 1196,936 1198,931 1199,937 1195,941 1186,938 1191,942 1189,946 1185,944 1186,946 1189,948 1192,945 1193,948 1183,953 1182,950 1182,953 1177,962 1177,959 1176,963 1168,965 1164,972 1163,971 1164,974 1162,976 1157,978 1157,981 1153,984 \
1149,983 1151,987 1150,987 1148,983 1149,988 1143,998 1144,999 1141,1009 1142,1017 1150,1044 1152,1054 1149,1042 1148,1040 1149,1046 1156,1070 1152,1094 1145,1095 1145,1092 1147,1093 1143,1085 1139,1082 1136,1074 1138,1071 1135,1073 1136,1067 1133,1069 1129,1060 1132,1053 1129,1051 1129,1057 1127,1054 \
1130,1038 1119,1023 1114,1020 1111,1021 1112,1023 1102,1026 1100,1021 1102,1021 1092,1016 1095,1016 1093,1014 1084,1016 1086,1015 1084,1014 1081,1017 1082,1014 1080,1017 1076,1018 1078,1017 1076,1011 1074,1017 1066,1015 1060,1019 1054,1016 1051,1018 1054,1021 1059,1019 1057,1021 1059,1023 1062,1021 1062,1025 \
1058,1027 1066,1034 1062,1038 1063,1034 1054,1028 1055,1030 1054,1035 1051,1032 1048,1035 1043,1033 1044,1031 1037,1024 1032,1028 1023,1025 1017,1026 1018,1022 1016,1024 1008,1031 1011,1028 1008,1028 1008,1025 1005,1026 1007,1031 1005,1034 1004,1036 993,1044 995,1042 989,1041 991,1045 989,1047 987,1044 \
987,1049 984,1049 985,1051 983,1054 980,1054 983,1057 981,1062 978,1060 981,1063 980,1069 984,1082 981,1084 964,1075 961,1066 960,1058 952,1047 949,1035 941,1025 932,1023 928,1025 924,1037 921,1036 910,1026 906,1013 891,995 873,995 873,1001 844,1001 807,984 808,980 783,983 780,971 773,965 771,965 769,960 \
748,953 748,944 736,926 736,918 731,913 729,908 731,904 731,907 734,909 730,902 732,900 740,901 731,899 729,903 725,900 726,900 717,887 716,873 711,867 714,849 709,828 711,821 713,820 711,820 716,787 715,778 723,777 714,776 714,771 715,774 715,771 717,770 713,767 716,766 713,766 707,744 715,748 727,748 \
728,752 723,759 726,759 724,758 729,751 730,754 728,756 729,760 728,759 727,762 724,763 726,764 731,759 731,749 729,747 731,746 727,743 730,741 727,735 1004,735 1004,730 1007,731 1009,739 1018,742 1026,741 1032,747 1035,745 1041,750 1047,747 1048,749 1062,751 1072,746 1107,767 1110,773 1115,772 1116,779 \
1120,779 1121,780 1120,783 1131,790 1135,817 1131,832 1125,836 1124,840 1129,845 1166,828 1164,819 1169,816 1188,816 1192,809 1206,796 1241,795 1243,791 1248,792 1254,782 1256,770 1264,758 1268,762 1273,760 1279,764 1279,785 1282,787 1282,792 1284,793 1286,796 1285,797 1287,798 1285,801 1275,804 1274,804 \
1270,806 1268,806 1268,802 1266,810 1261,813 1260,810 1259,814 1259,809 1258,815 1257,813 1255,814 1249,824 1248,830 1251,831 1246,836 1249,837 1253,845 1256,844 1254,840 1256,840 1257,846 1250,848 1249,845 1244,849 1245,844 1244,846 1242,844 1241,850 1227,851 1217,859 1218,857 1217,851 1217,856 1214,861 \
1214,864 1217,866 1212,881 1207,887 1207,883 1202,880 1201,877 1206,871 1200,876 1206,895 1197,914 1197,907 1200,901 1197,902 1198,895 1196,897 1194,895 1194,892 1197,891 1193,891 1195,889 1194,886 1193,888 1198,877 1190,882 1192,886 1191,890 1192,895 1189,891 1190,894 1193,900 1186,894 1184,895 1186,887 \
1183,896 1185,895 1194,902 1193,907 1185,898 1192,912 1189,909 1193,915 1192,916 1190,913 1184,912 1193,918 1196,917 1201,934 1196,920 1197,924'
      )
      nP('US', '358,1144 355,1142 356,1140 360,1139')
      nP('US', '1201,943 1200,943 1201,934')
      nP(
        'SK',
        '2181,744 2166,742 2159,748 2156,747 2148,750 2148,753 2146,754 2138,754 2131,750 2128,745 2129,741 2132,737 2137,737 2145,728 2148,727 2151,729 2155,726 2158,729 2158,732 2161,733 2163,729 2176,729 2186,734 2184,738'
      )
      nP(
        'LY',
        '2212,997 2209,1001 2210,1010 2207,1019 2210,1033 2210,1142 2210,1172 2200,1172 2200,1180 2120,1120 2110,1127 2102,1133 2095,1124 2079,1119 2075,1107 2062,1103 2060,1099 2060,1092 2053,1079 2058,1074 2059,1069 2057,1062 2059,1054 2057,1047 2058,1034 2053,1019 2055,1018 2062,1010 2061,1000 2062,996 2075,985 \
2075,974 2083,979 2092,977 2111,985 2117,1000 2133,1005 2150,1017 2156,1015 2160,1009 2161,1004 2159,995 2161,989 2166,983 2176,977 2191,982 2192,988 2210,992'
      )
      nP('LU', '2021,718 2025,723 2023,728 2021,728 2017,727 2017,722')
      nP(
        'ML',
        '1879,1320 1876,1315 1876,1307 1872,1308 1875,1302 1870,1298 1869,1287 1865,1285 1866,1289 1862,1292 1855,1289 1852,1294 1849,1289 1845,1292 1844,1290 1845,1286 1845,1278 1838,1267 1839,1260 1836,1251 1840,1249 1842,1239 1844,1238 1850,1246 1852,1241 1865,1241 1865,1237 1866,1240 1904,1240 1906,1227 1903,1225 \
1893,1097 1911,1097 1971,1155 1971,1161 1975,1163 1977,1167 1992,1175 1990,1185 1993,1187 2002,1185 2001,1226 1998,1237 1994,1242 1972,1243 1969,1248 1961,1249 1952,1246 1948,1251 1939,1255 1939,1260 1934,1258 1931,1262 1930,1267 1926,1267 1927,1273 1925,1275 1919,1270 1916,1276 1917,1280 1914,1282 1915,1288 \
1906,1295 1907,1301 1904,1306 1904,1316 1898,1320 1896,1312 1895,1314 1892,1313 1892,1317 1889,1317 1889,1320 1882,1316'
      )
      nP(
        'MG',
        '2424,1709 2430,1702 2432,1704 2430,1708 2433,1706 2431,1702 2435,1694 2435,1701 2439,1693 2441,1695 2438,1691 2440,1686 2441,1689 2441,1687 2440,1678 2442,1677 2444,1681 2444,1677 2449,1675 2451,1666 2448,1661 2450,1661 2454,1654 2455,1657 2453,1657 2456,1659 2460,1670 2463,1693 2466,1703 2465,1708 2463,1714 \
2460,1706 2457,1708 2460,1718 2459,1727 2455,1734 2455,1750 2432,1849 2413,1859 2401,1850 2397,1840 2398,1827 2394,1818 2393,1806 2396,1795 2399,1793 2406,1774 2400,1738 2405,1725 2405,1717 2410,1717 2413,1713 2414,1716 2415,1714 2417,1715 2418,1711 2422,1712 2422,1710 2426,1714'
      )
      nP(
        'LA',
        '3015,1257 3018,1254 3019,1237 3011,1224 3010,1210 3003,1197 2997,1196 2990,1205 2984,1199 2975,1210 2972,1209 2977,1186 2976,1179 2968,1179 2967,1176 2969,1170 2966,1166 2964,1167 2966,1161 2969,1159 2968,1158 2970,1152 2974,1148 2976,1154 2981,1155 2979,1139 2980,1134 2984,1136 2990,1147 2993,1146 2992,1153 \
2995,1159 3000,1162 3004,1157 3010,1162 3007,1165 3013,1172 3010,1178 3003,1177 3004,1180 3002,1182 3015,1193 3015,1197 3029,1217 3030,1225 3032,1224 3038,1231 3035,1235 3040,1243 3038,1247 3039,1252 3032,1258 3029,1253 3023,1257 3025,1262 3024,1263 3017,1261'
      )
      nP(
        'LV',
        '2171,623 2171,617 2174,614 2177,606 2186,603 2193,613 2198,615 2204,611 2203,602 2213,598 2225,607 2234,607 2239,610 2237,616 2240,617 2242,628 2236,633 2226,635 2211,627 2209,623 2202,626 2181,623 2170,629 2170,626'
      )
      nP('LB', '2320,951 2325,952 2324,954 2327,958 2317,973 2315,975 2311,975 2315,963')
      nP(
        'LR',
        '1852,1380 1850,1376 1844,1369 1853,1356 1856,1345 1864,1348 1865,1357 1864,1362 1865,1361 1868,1365 1870,1364 1872,1357 1874,1359 1876,1370 1873,1375 1880,1379 1881,1384 1885,1385 1884,1408 1868,1398'
      )
      nP(
        'LT',
        '2188,654 2189,647 2186,644 2173,641 2171,634 2170,633 2170,629 2181,623 2202,626 2209,623 2211,627 2226,635 2225,640 2228,641 2218,647 2216,655 2218,658 2215,655 2204,662 2195,661 2194,656'
      )
      nP(
        'MR',
        '1911,1097 1893,1097 1903,1225 1906,1227 1904,1240 1866,1240 1865,1237 1865,1241 1852,1241 1850,1246 1844,1238 1842,1239 1840,1249 1836,1251 1830,1244 1825,1231 1820,1230 1815,1223 1796,1225 1793,1231 1798,1206 1797,1188 1793,1182 1795,1181 1794,1181 1797,1169 1789,1155 1788,1161 1789,1152 1829,1152 1828,1128 \
1839,1120 1839,1082 1872,1082 1872,1062 1892,1080'
      )
      nP(
        'MA',
        '1937,945 1941,950 1942,972 1945,980 1949,984 1947,986 1947,990 1930,990 1929,994 1921,996 1921,1004 1923,1007 1910,1014 1904,1023 1895,1024 1893,1028 1888,1027 1872,1041 1872,1057 1858,1057 1827,1057 1830,1052 1844,1047 1856,1032 1862,1019 1860,1010 1861,1000 1866,989 1866,983 1873,972 1890,961 1900,934 \
1905,932 1905,933 1906,937 1912,943 1930,941 1929,942 1930,942 1931,944'
      )
      nP(
        'OM',
        '2544,1166 2543,1163 2540,1169 2538,1176 2539,1188 2529,1191 2525,1203 2516,1205 2512,1217 2502,1217 2492,1223 2489,1213 2481,1187 2511,1172 2518,1142 2513,1131 2516,1112 2521,1111 2519,1108 2519,1098 2521,1097 2523,1101 2525,1097 2532,1112 2547,1117 2555,1132 2560,1135 2555,1150 2550,1156 2547,1166'
      )
      nP('MT', '2105,934 2103,933 2104,932')
      nP('MQ', '1348,1256 1345,1250 1347,1251')
      nP(
        'MN',
        '3131,723 3122,742 3122,746 3119,748 3119,752 3123,755 3132,752 3137,755 3142,750 3149,750 3161,763 3163,770 3147,769 3138,772 3137,775 3132,774 3127,779 3125,785 3118,789 3109,790 3100,799 3083,794 3078,805 3083,815 3073,821 3068,829 3056,834 3038,834 3013,847 3008,846 3008,843 2997,842 2984,837 2981,833 \
2971,830 2958,832 2927,830 2918,811 2916,810 2917,806 2910,805 2898,796 2872,792 2869,787 2873,780 2872,766 2863,752 2853,750 2842,742 2843,739 2840,737 2841,733 2845,728 2854,728 2860,724 2859,721 2886,708 2906,712 2909,720 2924,720 2936,724 2944,719 2946,716 2946,712 2941,705 2943,698 2952,688 2962,694 \
2985,700 2986,711 2992,715 3000,718 3016,713 3030,715 3035,720 3043,721 3043,725 3049,730 3071,733 3092,727 3107,716 3112,717 3118,722 3126,720'
      )
      nP('MD', '2242,789 2241,787 2243,771 2241,766 2230,748 2226,746 2238,744 2252,751 2252,759 2256,760 2256,766 2260,768 2259,772 2262,774 2250,773 2250,780 2245,785 2245,788')
      nP('MK', '2170,858 2165,852 2166,842 2171,838 2184,836 2190,844 2189,851 2187,853')
      nP(
        'MW',
        '2293,1684 2287,1678 2290,1673 2291,1663 2296,1660 2293,1656 2293,1645 2294,1641 2293,1637 2297,1632 2290,1615 2300,1620 2301,1616 2304,1620 2306,1625 2307,1641 2310,1648 2307,1648 2304,1656 2306,1674 2311,1679 2320,1698 2319,1715 2315,1716 2312,1723 2313,1731 2311,1731 2312,1727 2305,1719 2303,1713 2306,1704 \
2306,1693 2304,1690 2297,1692'
      )
      nP('JP', '3297,926 3298,928 3296,927')
      nP(
        'JP',
        '3262,983 3263,980 3261,975 3264,978 3260,971 3262,972 3263,968 3268,967 3271,962 3274,963 3275,967 3281,966 3281,969 3279,972 3283,973 3284,978 3281,983 3277,1001 3275,1000 3275,1002 3271,1006 3272,1002 3270,998 3272,996 3270,996 3269,998 3270,1004 3266,1003 3267,997 3266,991 3270,985 3270,982 3269,982 \
3270,979 3266,974 3265,978 3267,978 3267,981 3266,982 3265,979'
      )
      nP('JP', '3300,961 3306,955 3310,958 3312,964 3308,967 3306,973 3302,968 3297,971 3294,980 3289,978 3290,973 3288,969 3284,971 3291,966 3293,960 3296,962')
      nP(
        'KP',
        '3220,891 3215,889 3218,877 3211,874 3210,877 3207,872 3208,869 3224,857 3233,844 3237,849 3246,850 3247,847 3245,841 3253,840 3258,834 3261,834 3263,826 3267,827 3270,834 3271,835 3271,836 3268,836 3261,846 3261,858 3239,875 3240,881 3238,880 3238,883 3248,891 3245,896 3235,897 3231,903 3229,904 3225,905 \
3220,901 3221,902 3217,906 3219,903 3214,902 3216,900 3211,899 3214,892'
      )
      nP('JP', '3261,1044 3258,1050 3255,1048')
      nP(
        'CI',
        '1906,1395 1909,1396 1900,1398 1884,1408 1885,1385 1881,1384 1880,1379 1873,1375 1876,1370 1874,1359 1877,1359 1879,1353 1876,1346 1882,1347 1879,1341 1881,1336 1877,1330 1877,1323 1879,1320 1882,1316 1889,1320 1889,1317 1892,1317 1892,1313 1895,1314 1896,1312 1898,1320 1904,1316 1908,1318 1912,1327 1916,1329 \
1923,1323 1927,1324 1932,1330 1931,1337 1934,1350 1931,1354 1926,1374 1929,1387 1931,1389 1932,1396 1930,1396 1927,1395 1928,1393 1926,1396 1919,1394 1922,1394 1921,1392'
      )
      nP(
        'JP',
        '3408,811 3413,812 3418,805 3415,814 3418,817 3417,817 3417,821 3423,820 3414,826 3405,827 3398,835 3397,842 3382,832 3374,836 3369,832 3367,837 3376,844 3371,843 3369,848 3365,849 3366,841 3362,837 3363,831 3370,825 3368,821 3376,824 3379,821 3378,815 3381,811 3382,801 3380,793 3381,789 3384,788 3396,803 \
'
      )
      nP(
        'IQ',
        '2353,989 2354,988 2351,987 2349,971 2371,955 2375,937 2374,926 2384,914 2389,910 2402,911 2404,916 2409,914 2415,931 2424,934 2421,937 2423,944 2420,946 2418,953 2415,954 2417,957 2415,962 2423,972 2422,977 2435,985 2440,994 2438,1006 2441,1006 2441,1014 2446,1022 2443,1021 2440,1021 2433,1021 2426,1035 \
2408,1033 2382,1005 2365,992'
      )
      nP('JP', '3350,897 3350,902 3347,904 3347,900')
      nP(
        'JP',
        '3281,951 3295,937 3298,939 3317,935 3316,938 3318,939 3325,936 3324,931 3331,920 3332,911 3338,908 3333,915 3335,915 3334,919 3338,920 3347,913 3359,899 3365,879 3365,873 3361,872 3365,867 3363,862 3367,859 3368,852 3371,853 3372,858 3373,856 3376,858 3377,854 3372,854 3374,848 3379,851 3379,862 3383,867 \
3385,878 3383,886 3380,889 3380,897 3375,895 3374,899 3374,916 3370,927 3373,935 3369,939 3368,944 3362,947 3366,938 3364,936 3361,939 3361,944 3360,942 3356,943 3356,948 3353,952 3352,947 3353,946 3352,944 3347,952 3335,953 3338,950 3334,947 3333,950 3333,945 3330,951 3334,955 3333,957 3328,958 3322,969 \
3315,963 3316,956 3319,953 3318,950 3307,950 3304,954 3291,958 3288,956 3285,965 3282,960 3273,962 3274,955 3277,955'
      )
      nP('KW', '2445,1043 2438,1043 2436,1036 2426,1035 2433,1021 2440,1021 2443,1028 2440,1027 2438,1031 2441,1031')
      nP(
        'KR',
        '3233,930 3229,929 3229,920 3227,922 3225,920 3227,917 3227,919 3228,918 3227,916 3229,918 3229,915 3232,920 3234,917 3232,915 3233,913 3231,914 3233,912 3229,906 3231,903 3235,897 3245,896 3248,891 3258,915 3258,931 3260,931 3258,939 3255,944 3250,944 3248,949 3244,946 3240,947 3242,949 3240,952 3239,948 \
3238,954 3235,953 3237,950 3233,955 3232,952 3230,957 3227,951 3230,952 3229,950 3231,949 3228,949 3226,944 3229,945 3228,941 3231,938 3229,936'
      )
      nP(
        'KZ',
        '2672,837 2652,850 2648,857 2648,862 2646,862 2642,859 2643,855 2641,853 2629,853 2627,841 2622,841 2623,826 2620,827 2611,814 2606,817 2594,816 2582,818 2573,807 2547,787 2521,795 2521,851 2516,851 2511,842 2503,836 2491,839 2486,845 2485,839 2488,830 2480,828 2478,823 2474,823 2474,819 2469,808 2464,806 \
2463,802 2477,803 2471,798 2475,790 2493,790 2488,787 2492,780 2493,776 2491,772 2493,770 2490,766 2486,765 2483,768 2473,764 2459,772 2454,772 2453,775 2446,770 2451,769 2443,755 2433,754 2432,746 2426,744 2431,733 2429,730 2430,722 2434,720 2436,714 2443,722 2449,721 2450,720 2448,711 2455,707 2456,703 \
2465,700 2467,695 2469,696 2469,694 2475,695 2474,698 2478,698 2485,693 2487,698 2495,698 2506,707 2506,712 2508,711 2508,705 2518,712 2526,704 2533,704 2536,707 2539,706 2539,703 2545,703 2548,708 2556,711 2557,713 2562,707 2568,710 2575,708 2578,701 2561,691 2572,685 2568,679 2572,675 2583,675 2573,670 \
2574,667 2577,667 2570,666 2574,663 2572,661 2576,659 2587,662 2588,659 2593,657 2614,655 2614,652 2617,650 2644,645 2645,644 2644,642 2652,640 2651,638 2664,643 2670,640 2672,648 2675,650 2674,655 2672,655 2674,658 2680,656 2684,658 2682,654 2687,658 2686,661 2689,660 2688,658 2695,661 2700,659 2694,665 \
2696,668 2701,665 2706,668 2707,665 2710,662 2730,653 2729,658 2726,658 2727,660 2741,671 2763,709 2769,700 2774,702 2773,706 2776,706 2777,709 2787,709 2797,705 2802,708 2805,716 2812,719 2815,726 2824,728 2830,723 2829,726 2836,734 2831,734 2828,742 2820,744 2818,751 2819,761 2818,764 2810,768 2809,765 \
2793,762 2785,787 2789,789 2788,793 2782,793 2779,790 2761,797 2767,799 2766,809 2770,823 2766,825 2768,827 2764,831 2765,838 2762,834 2757,834 2754,829 2732,826 2719,828 2705,822 2698,825 2697,834 2685,829 2676,829 2672,832'
      )
      nP('KW', '2443,1022 2445,1025 2443,1028 2442,1025')
      nP('JP', '3247,1069 3241,1080 3243,1072')
      nP(
        'JO',
        '2315,999 2316,995 2316,985 2316,982 2317,981 2329,987 2349,971 2351,987 2354,988 2353,989 2331,999 2341,1014 2336,1021 2328,1023 2321,1034 2310,1031 2310,1029 2310,1028 2313,1012'
      )
      nP('JM', '1190,1203 1185,1204 1184,1207 1172,1198 1177,1194 1184,1195 1193,1200 1194,1204')
      nP(
        'KG',
        '2765,838 2765,840 2746,850 2743,855 2731,856 2725,865 2719,866 2718,861 2714,864 2711,863 2711,866 2702,870 2700,874 2701,877 2698,879 2686,880 2684,883 2683,880 2680,882 2677,877 2672,880 2667,877 2655,878 2655,872 2657,872 2657,869 2662,867 2667,870 2667,872 2672,867 2679,869 2684,864 2686,865 2686,862 \
2688,863 2694,858 2684,856 2679,847 2676,854 2664,848 2675,838 2672,837 2672,832 2676,829 2685,829 2697,834 2698,825 2705,822 2719,828 2732,826 2754,829 2757,834 2762,834'
      )
      nP(
        'KE',
        '2300,1488 2299,1472 2306,1457 2309,1455 2311,1445 2310,1435 2304,1422 2305,1418 2300,1410 2304,1404 2320,1404 2321,1406 2331,1407 2342,1419 2356,1422 2359,1415 2368,1409 2372,1414 2380,1413 2371,1431 2371,1486 2376,1499 2374,1503 2370,1504 2370,1507 2367,1512 2363,1514 2362,1522 2355,1543 2353,1544 2337,1526 \
2337,1518'
      )
      nP(
        'NZ',
        '3678,2150 3671,2164 3673,2164 3669,2166 3660,2176 3649,2175 3647,2171 3644,2172 3641,2169 3633,2170 3635,2165 3630,2166 3630,2163 3635,2162 3633,2161 3636,2159 3633,2160 3634,2156 3638,2158 3636,2156 3639,2156 3635,2153 3639,2149 3641,2151 3640,2148 3649,2137 3662,2130 3674,2120 3677,2114 3681,2102 3686,2097 \
3687,2089 3692,2084 3696,2084 3692,2086 3696,2088 3697,2096 3706,2089 3704,2091 3705,2092 3704,2095 3707,2094 3705,2094 3706,2091 3709,2091 3708,2093 3706,2093 3709,2094 3706,2098 3708,2104 3699,2120 3693,2125 3693,2130 3696,2131 3697,2134 3690,2132 3681,2139 3678,2142'
      )
      nP(
        'PY',
        '1411,1859 1410,1871 1400,1887 1396,1885 1393,1889 1379,1884 1371,1885 1370,1882 1375,1875 1375,1868 1381,1858 1379,1852 1369,1847 1356,1835 1347,1832 1330,1808 1334,1783 1339,1769 1357,1764 1366,1765 1375,1772 1375,1777 1379,1789 1377,1806 1388,1809 1393,1806 1398,1809 1401,1814 1403,1834 1411,1832 1415,1836 \
'
      )
      nP('NZ', '3628,2235 3627,2237 3628,2239 3624,2239 3627,2235')
      nP('PG', '3469,1514 3464,1511 3469,1510')
      nP(
        'PE',
        '1261,1638 1270,1662 1267,1667 1266,1680 1268,1687 1263,1696 1265,1703 1262,1709 1264,1717 1268,1719 1260,1733 1261,1737 1258,1740 1259,1744 1257,1748 1252,1750 1243,1740 1241,1734 1206,1706 1197,1694 1192,1682 1194,1675 1185,1655 1183,1647 1180,1643 1166,1597 1156,1575 1144,1565 1147,1558 1144,1552 1145,1549 \
1142,1544 1143,1538 1153,1524 1154,1532 1151,1534 1153,1537 1151,1540 1155,1538 1160,1540 1163,1548 1166,1549 1169,1542 1173,1525 1174,1526 1178,1518 1190,1512 1201,1497 1202,1487 1204,1488 1204,1482 1200,1475 1203,1475 1209,1476 1212,1482 1214,1489 1221,1494 1221,1500 1225,1501 1225,1508 1227,1511 1234,1511 \
1239,1506 1243,1509 1248,1507 1253,1511 1256,1515 1249,1530 1253,1531 1257,1537 1254,1539 1253,1536 1249,1536 1247,1539 1237,1541 1228,1550 1224,1565 1225,1570 1219,1577 1219,1583 1216,1587 1227,1609 1224,1615 1233,1616 1235,1624 1243,1624 1251,1615 1250,1639'
      )
      nP('AN', '1274,1292 1273,1288 1275,1289')
      nP(
        'NZ',
        '3745,2060 3745,2065 3743,2062 3736,2064 3735,2067 3737,2071 3725,2095 3718,2100 3718,2097 3714,2097 3715,2094 3712,2096 3717,2087 3718,2078 3703,2065 3712,2058 3713,2049 3715,2047 3714,2043 3716,2042 3713,2037 3714,2035 3713,2036 3711,2032 3713,2034 3715,2032 3711,2031 3708,2023 3710,2025 3708,2021 3711,2019 \
3706,2018 3705,2014 3706,2022 3700,2009 3702,2005 3700,2008 3693,1992 3696,1992 3695,1994 3698,2001 3700,1998 3700,2000 3707,2002 3707,2005 3709,2004 3712,2013 3709,2013 3714,2020 3714,2028 3722,2034 3719,2023 3721,2023 3724,2027 3723,2029 3724,2028 3728,2040 3725,2039 3726,2040 3737,2046 3746,2039 3751,2041 \
3749,2054 3745,2057'
      )
      nP(
        'NI',
        '1099,1306 1079,1279 1083,1278 1086,1278 1089,1273 1088,1266 1093,1266 1095,1262 1098,1265 1107,1250 1111,1253 1125,1247 1122,1250 1124,1258 1120,1271 1121,1286 1120,1285 1120,1280 1118,1294 1119,1299 1117,1304 1119,1309 1117,1312 1109,1306 1107,1309 1100,1304'
      )
      nP('NZ', '3718,2028 3716,2028 3718,2027')
      nP('NZ', '3721,2021 3719,2017 3720,2017')
      nP(
        'PG',
        '3375,1611 3375,1577 3373,1574 3375,1569 3375,1513 3400,1525 3405,1531 3410,1531 3422,1546 3422,1556 3440,1563 3443,1569 3443,1574 3434,1575 3437,1586 3446,1595 3447,1602 3451,1610 3458,1609 3457,1616 3465,1618 3462,1621 3464,1625 3474,1627 3469,1629 3472,1632 3467,1634 3462,1629 3444,1626 3435,1616 3434,1613 \
3434,1609 3431,1609 3426,1595 3413,1591 3413,1588 3411,1589 3410,1586 3409,1590 3408,1588 3407,1591 3401,1586 3404,1593 3398,1592 3401,1597 3386,1597 3396,1601 3399,1605 3398,1609 3391,1614'
      )
      nP('PG', '3490,1531 3487,1526 3472,1515 3473,1512 3485,1522 3495,1535 3496,1539 3494,1546')
      nP(
        'GW',
        '1809,1296 1808,1293 1799,1297 1801,1292 1796,1294 1795,1291 1797,1288 1794,1290 1791,1288 1802,1286 1806,1282 1821,1282 1822,1288 1819,1290 1821,1292 1821,1297 1812,1300 1808,1308 1808,1305 1806,1308 1806,1304 1804,1305 1806,1301 1803,1303 1806,1298 1808,1299 1807,1298 1804,1299 1803,1297 1805,1294'
      )
      nP('PG', '3501,1649 3497,1644 3503,1648')
      nP(
        'PK',
        '2570,1023 2586,1030 2602,1030 2624,1024 2626,1007 2629,1003 2640,1001 2638,998 2643,994 2647,994 2650,997 2655,992 2654,985 2657,976 2665,971 2661,961 2673,960 2673,956 2672,953 2677,947 2678,940 2674,929 2688,919 2702,919 2708,916 2713,916 2721,921 2722,927 2721,930 2724,934 2728,932 2731,937 2740,939 \
2732,945 2731,951 2727,950 2719,954 2706,949 2701,952 2700,955 2702,958 2701,960 2705,962 2702,965 2704,969 2702,973 2705,976 2706,980 2708,980 2709,984 2713,984 2716,988 2708,993 2707,1004 2709,1005 2701,1016 2701,1019 2696,1022 2691,1036 2686,1040 2681,1052 2670,1056 2665,1051 2658,1064 2657,1070 2663,1073 \
2663,1082 2665,1086 2669,1086 2673,1105 2669,1108 2667,1105 2662,1109 2650,1107 2649,1112 2645,1113 2644,1115 2643,1113 2642,1116 2642,1113 2641,1115 2637,1113 2633,1103 2634,1100 2628,1099 2629,1094 2625,1087 2623,1089 2627,1091 2609,1092 2608,1094 2602,1092 2603,1090 2580,1096 2578,1094 2580,1078 2586,1073 \
2593,1072 2595,1064 2589,1063 2589,1048 2581,1043'
      )
      nP(
        'PA',
        '1151,1351 1156,1361 1148,1365 1145,1355 1144,1359 1141,1357 1139,1350 1129,1348 1127,1352 1126,1348 1129,1339 1127,1337 1127,1331 1130,1329 1134,1338 1138,1339 1137,1335 1141,1341 1144,1341 1160,1329 1166,1329 1166,1331 1176,1334 1182,1343 1181,1346 1184,1354 1180,1360 1179,1357 1177,1364 1172,1352 1175,1347 \
1178,1350 1175,1346 1172,1348 1171,1344 1166,1338 1166,1336 1159,1340 1158,1344'
      )
      nP(
        'PL',
        '2148,727 2146,721 2136,719 2137,715 2129,714 2130,717 2126,719 2122,714 2124,711 2123,710 2113,708 2111,705 2108,707 2110,701 2106,693 2107,689 2105,684 2106,681 2101,677 2104,673 2102,664 2106,663 2102,662 2102,661 2121,656 2125,652 2139,647 2147,650 2148,651 2144,649 2148,655 2156,653 2152,655 2158,653 \
2174,655 2188,654 2194,656 2195,661 2199,679 2192,686 2196,689 2196,697 2201,707 2200,708 2201,712 2187,727 2189,735 2186,734 2176,729 2163,729 2161,733 2158,732 2158,729 2155,726 2151,729'
      )
      nP('PG', '3439,1503 3437,1506 3430,1506 3431,1503')
      nP(
        'PT',
        '1871,841 1877,838 1877,844 1893,841 1893,845 1897,847 1890,855 1891,863 1889,868 1890,871 1889,876 1883,876 1889,885 1886,894 1889,898 1884,905 1884,912 1880,916 1869,916 1872,895 1867,895 1866,891 1870,889 1869,887 1868,890 1864,890 1865,880 1868,877 1872,860 1870,844'
      )
      nP('MX', '1086,1168 1086,1164 1088,1163')
      nP(
        'MY',
        '3148,1404 3150,1407 3144,1410 3141,1407 3140,1410 3136,1408 3122,1408 3120,1411 3118,1428 3115,1430 3114,1434 3116,1436 3112,1439 3112,1444 3109,1452 3103,1452 3100,1455 3093,1450 3088,1450 3082,1458 3075,1457 3069,1460 3060,1449 3060,1442 3063,1448 3067,1446 3070,1452 3072,1450 3077,1453 3073,1450 3077,1441 \
3075,1439 3076,1437 3077,1438 3078,1438 3078,1433 3094,1426 3104,1404 3110,1413 3112,1408 3111,1402 3114,1400 3114,1401 3115,1407 3117,1408 3115,1399 3119,1397 3117,1392 3122,1389 3131,1368 3132,1374 3135,1368 3136,1373 3141,1377 3139,1384 3144,1382 3145,1385 3143,1388 3147,1386 3156,1393 3154,1397 3146,1399 \
3146,1403'
      )
      nP('MX', '845,1191 844,1191 845,1190')
      nP(
        'NL',
        '2001,696 1996,694 2001,695 1998,693 2005,683 2014,686 2018,682 2018,681 2015,680 2017,677 2013,677 2013,674 2010,676 2012,679 2010,680 2010,681 2010,684 2007,676 2019,669 2027,668 2031,671 2030,680 2026,682 2030,684 2027,689 2028,690 2019,693 2022,698 2020,703 2018,704 2020,706 2019,709 2016,707 2018,703 \
2012,701 2010,698 2002,699 1994,697 2002,698 1999,696'
      )
      nP(
        'MY',
        '2967,1396 2967,1383 2964,1377 2966,1372 2970,1375 2971,1379 2974,1379 2973,1386 2974,1388 2979,1384 2981,1387 2984,1379 2993,1391 2997,1400 2997,1429 3001,1435 3006,1453 3003,1449 3003,1452 3001,1451 3000,1452 2998,1454 2997,1450 2976,1430 2976,1424 2970,1415 2972,1413 2969,1411 2969,1401'
      )
      nP(
        'MX',
        '978,1138 982,1149 981,1153 978,1142 984,1162 991,1174 996,1190 1004,1192 1011,1200 1036,1191 1037,1196 1041,1196 1044,1192 1041,1189 1048,1182 1051,1172 1052,1157 1071,1148 1083,1150 1084,1149 1082,1149 1085,1148 1088,1155 1081,1169 1081,1174 1078,1177 1079,1179 1082,1178 1079,1182 1081,1183 1077,1199 \
1075,1195 1075,1189 1073,1195 1068,1201 1064,1205 1046,1205 1046,1213 1041,1214 1052,1226 1051,1231 1038,1231 1033,1243 1035,1246 1033,1254 1028,1245 1012,1228 1015,1232 1009,1229 1010,1228 1008,1228 1007,1226 1005,1228 1007,1229 991,1238 978,1233 967,1224 958,1222 945,1213 936,1202 921,1197 915,1189 \
905,1182 898,1166 903,1163 900,1160 903,1156 903,1150 899,1142 897,1132 879,1104 875,1102 875,1097 874,1099 873,1096 875,1096 871,1095 867,1089 864,1089 867,1085 864,1088 861,1084 863,1077 864,1077 860,1071 857,1071 855,1065 850,1061 850,1054 844,1052 833,1037 833,1032 824,1011 824,1003 819,1001 815,996 \
813,998 804,992 807,996 806,1004 809,1021 818,1032 820,1038 823,1039 824,1044 826,1045 827,1054 831,1058 836,1072 838,1073 836,1068 839,1071 842,1085 848,1098 848,1107 851,1110 853,1107 861,1120 860,1125 855,1129 852,1118 834,1100 834,1086 831,1078 823,1071 823,1067 819,1071 805,1056 804,1054 815,1056 \
812,1054 814,1044 805,1031 798,1025 794,1009 788,998 789,994 783,983 808,980 807,984 844,1001 873,1001 873,995 891,995 906,1013 910,1026 921,1036 924,1037 928,1025 932,1023 941,1025 949,1035 952,1047 960,1058 961,1066 964,1075 981,1084 984,1082 979,1106 976,1133'
      )
      nP('MX', '803,1051 801,1049 802,1046')
      nP('MX', '832,1040 829,1038 832,1033')
      nP('MX', '891,1151 890,1150 890,1149')
      nP('MX', '889,1148 889,1147 890,1148')
      nP(
        'NP',
        '2844,1054 2842,1065 2844,1071 2843,1076 2821,1073 2819,1069 2816,1071 2809,1066 2809,1062 2804,1059 2795,1062 2790,1059 2789,1056 2781,1054 2774,1046 2763,1039 2766,1025 2772,1018 2775,1021 2776,1016 2783,1016 2784,1020 2794,1027 2798,1034 2803,1033 2807,1040 2814,1043 2813,1047 2820,1047 2822,1053 2824,1049 \
2827,1053 2829,1050 2834,1054'
      )
      nP(
        'NO',
        '2072,505 2077,501 2074,499 2082,495 2072,498 2077,496 2073,496 2080,493 2081,494 2084,493 2089,489 2084,492 2086,490 2082,491 2086,488 2083,485 2087,485 2085,483 2086,480 2091,481 2086,478 2101,474 2090,476 2095,475 2090,474 2091,473 2089,471 2092,471 2097,470 2092,470 2095,469 2092,468 2100,467 2095,465 \
2101,464 2107,462 2105,461 2117,461 2103,460 2110,455 2109,457 2114,457 2116,460 2115,457 2119,456 2112,456 2113,453 2118,454 2113,452 2107,454 2110,452 2107,452 2118,450 2119,449 2113,449 2120,445 2121,448 2125,452 2123,449 2127,448 2123,448 2125,446 2121,444 2128,447 2122,444 2131,443 2133,446 2132,443 \
2135,444 2134,443 2135,441 2124,441 2129,438 2136,439 2132,438 2138,438 2134,437 2138,436 2137,435 2134,435 2136,432 2141,432 2140,430 2141,429 2142,427 2150,430 2144,427 2148,426 2149,427 2154,431 2150,427 2152,425 2149,425 2152,422 2158,422 2155,428 2161,420 2164,420 2163,426 2159,430 2165,425 2168,427 \
2165,424 2166,422 2170,420 2169,421 2170,422 2173,419 2181,423 2178,418 2181,417 2173,415 2190,416 2183,418 2193,420 2195,419 2192,418 2196,413 2204,412 2202,410 2204,409 2207,409 2203,407 2206,407 2206,404 2219,406 2211,411 2213,413 2209,418 2212,418 2226,405 2227,405 2227,408 2224,409 2227,409 2225,413 \
2230,412 2233,410 2232,408 2236,407 2231,404 2237,402 2246,404 2238,407 2241,408 2237,410 2243,408 2239,412 2243,411 2241,418 2246,408 2251,406 2254,409 2261,408 2264,410 2260,411 2266,411 2271,415 2261,418 2246,417 2257,419 2254,421 2258,420 2255,424 2262,424 2262,421 2264,422 2264,424 2269,422 2269,426 \
2261,425 2261,426 2250,433 2248,430 2253,427 2251,424 2239,418 2225,420 2220,423 2217,430 2218,434 2209,440 2200,436 2192,440 2184,438 2177,430 2173,429 2170,431 2171,433 2166,433 2161,433 2163,437 2159,441 2162,442 2159,444 2141,441 2141,447 2139,450 2132,448 2127,451 2121,458 2123,460 2123,464 2113,472 \
2114,475 2105,477 2106,482 2105,489 2096,501 2101,502 2099,509 2089,508 2081,515 2079,520 2081,524 2080,531 2083,535 2081,543 2088,549 2086,554 2082,554 2085,562 2085,568 2078,572 2079,574 2076,576 2077,583 2076,586 2074,585 2067,582 2066,574 2067,571 2065,571 2065,576 2062,574 2065,580 2062,584 2058,585 \
2055,583 2056,585 2042,598 2025,599 2027,596 2019,594 2014,588 2015,584 2021,587 2026,584 2020,586 2018,584 2024,580 2019,580 2024,576 2014,580 2011,577 2014,574 2014,577 2022,572 2016,572 2021,565 2026,563 2025,568 2027,563 2030,562 2022,563 2017,570 2016,569 2016,567 2015,567 2017,564 2013,568 \
2011,564 2012,562 2014,563 2016,563 2016,559 2012,561 2009,557 2013,560 2012,558 2015,556 2010,557 2009,554 2023,553 2025,552 2031,557 2029,553 2034,552 2035,547 2032,550 2033,552 2026,551 2026,549 2024,552 2010,551 2012,552 2009,551 2016,549 2009,548 2017,548 2011,547 2013,546 2009,543 2013,541 2027,541 \
2014,540 2011,541 2013,539 2010,537 2014,539 2014,537 2023,538 2019,536 2023,534 2025,538 2026,533 2030,538 2030,535 2034,536 2027,532 2022,531 2030,530 2035,532 2037,531 2034,530 2041,529 2029,528 2029,525 2032,524 2034,526 2040,525 2045,530 2041,525 2038,524 2040,523 2045,527 2044,525 2046,525 2041,523 \
2049,521 2044,520 2045,520 2046,518 2054,519 2051,517 2055,515 2062,520 2060,518 2068,518 2067,517 2069,515 2066,516 2074,512 2070,511 2074,509 2073,508 2065,512 2070,512 2069,513 2060,517 2057,514 2060,513 2055,513 2061,510 2059,509 2066,504 2064,503 2068,504 2066,503 2069,500 2072,502'
      )
      nP('AN', '1266,1290 1265,1287 1267,1290 1269,1292')
      nP(
        'SR',
        '1415,1393 1412,1402 1413,1412 1417,1421 1415,1432 1411,1438 1407,1435 1400,1437 1397,1435 1396,1439 1398,1445 1392,1444 1385,1431 1384,1422 1380,1423 1376,1413 1378,1401 1384,1398 1384,1391 1387,1383 1398,1388 1398,1384 1408,1385 1407,1383 1417,1386'
      )
      nP(
        'MZ',
        '2273,1811 2285,1795 2284,1792 2285,1784 2291,1774 2288,1767 2289,1761 2287,1759 2291,1750 2289,1728 2290,1725 2279,1721 2273,1715 2264,1714 2264,1709 2262,1699 2293,1684 2297,1692 2304,1690 2306,1693 2306,1704 2303,1713 2305,1719 2312,1727 2311,1731 2313,1731 2312,1723 2315,1716 2319,1715 2320,1698 2311,1679 \
2306,1674 2304,1656 2307,1648 2310,1648 2316,1648 2319,1645 2322,1650 2329,1648 2335,1650 2340,1643 2345,1645 2353,1642 2365,1631 2367,1637 2365,1644 2365,1662 2367,1665 2365,1669 2367,1669 2366,1687 2368,1687 2367,1691 2369,1690 2369,1695 2366,1702 2368,1703 2367,1706 2352,1729 2339,1735 2330,1744 2329,1743 \
2330,1746 2323,1758 2321,1757 2309,1772 2307,1769 2308,1772 2307,1780 2312,1789 2314,1811 2315,1806 2316,1808 2316,1819 2314,1833 2316,1832 2315,1836 2311,1845 2288,1859 2286,1865 2289,1869 2290,1866 2289,1878 2284,1878 2282,1878 2281,1871 2280,1864 2280,1842'
      )
      nP(
        'NE',
        '2096,1267 2088,1270 2084,1276 2074,1272 2067,1272 2061,1274 2056,1280 2048,1279 2038,1272 2029,1278 2022,1267 2015,1264 2008,1266 2001,1270 2000,1278 1996,1285 1995,1297 1988,1287 1983,1289 1983,1294 1980,1287 1982,1285 1981,1282 1975,1283 1969,1277 1969,1272 1972,1272 1965,1267 1961,1255 1961,1249 1969,1248 \
1972,1243 1994,1242 1998,1237 2001,1226 2002,1185 2017,1180 2034,1159 2079,1119 2095,1124 2102,1133 2110,1127 2112,1150 2120,1167 2117,1173 2115,1218 2094,1256'
      )
      nP('NC', '3635,1811 3630,1809 3627,1804 3618,1798 3609,1786 3605,1776 3618,1786 3622,1794 3635,1806')
      nP(
        'NG',
        '2100,1276 2101,1287 2106,1290 2106,1299 2098,1307 2094,1320 2092,1322 2092,1329 2089,1332 2088,1341 2082,1347 2080,1359 2077,1364 2078,1367 2073,1376 2071,1376 2070,1372 2066,1367 2065,1370 2061,1368 2057,1371 2057,1375 2048,1385 2048,1395 2045,1401 2044,1402 2042,1400 2042,1405 2036,1406 2035,1402 2032,1405 \
2030,1402 2030,1407 2029,1402 2029,1407 2027,1402 2028,1408 2027,1404 2026,1408 2022,1409 2022,1406 2020,1409 2014,1399 2013,1393 2016,1390 2012,1391 2011,1389 2014,1389 2005,1378 1993,1376 1997,1374 1986,1377 1987,1337 1990,1336 1998,1314 1994,1301 1995,1297 1996,1285 2000,1278 2001,1270 2008,1266 2015,1264 \
2022,1267 2029,1278 2038,1272 2048,1279 2056,1280 2061,1274 2067,1272 2074,1272 2084,1276 2088,1270 2096,1267 2097,1270'
      )
      nP('VU', '3637,1701 3638,1707 3633,1709 3631,1694 3634,1702 3636,1698')

      this.svg.appendChild(content)
    }

    Tee.WorldMap.prototype = new Tee.SVGMap()

    /**
     * @constructor
     * @augments Tee.SVGMap
     * @class SVG USA Map (all US States).
     */
    Tee.USAMap = function (id) {
      this.bounds = { x: -124, y: 50, width: 58, height: 28 }
      Tee.SVGMap.call(this, id, 0, 300, 3550, 2100)

      this.size.offx = 270
      this.size.offy = -90

      var d = document,
        p,
        ns = this.ns,
        po = 'points',
        //svg=this.svg,
        content = this.content

      function nP(t, ps) {
        p = d.createElementNS(ns, 'polygon')
        p.setAttribute('id', t)
        p.setAttribute(po, ps)
        content.appendChild(p)
      }

      this.labels = {
        AL: 'Alabama',
        AK: 'Alaska',
        AZ: 'Arizona',
        AR: 'Arkansas',
        CA: 'California',
        CO: 'Colorado',
        CT: 'Connecticut',
        DE: 'Delaware',
        DC: 'District of Columbia',
        FL: 'Florida',
        GA: 'Georgia',
        HI: 'Hawaii',
        ID: 'Idaho',
        IL: 'Illinois',
        IN: 'Indiana',
        IA: 'Iowa',
        KS: 'Kansas',
        KY: 'Kentucky',
        LA: 'Louisiana',
        ME: 'Maine',
        MD: 'Maryland',
        MA: 'Massachusetts',
        MI: 'Michigan',
        MN: 'Minnesota',
        MS: 'Mississippi',
        MO: 'Missouri',
        MT: 'Montana',
        NE: 'Nebraska',
        NV: 'Nevada',
        NH: 'New Hampshire',
        NJ: 'New Jersey',
        NM: 'New Mexico',
        NY: 'New York',
        NC: 'North Carolina',
        ND: 'North Dakota',
        OH: 'Ohio',
        OK: 'Oklahoma',
        OR: 'Oregon',
        PA: 'Pennsylvania',
        RI: 'Rhode Island',
        SC: 'South Carolina',
        SD: 'South Dakota',
        TN: 'Tennessee',
        TX: 'Texas',
        UT: 'Utah',
        VT: 'Vermont',
        VA: 'Virginia',
        WA: 'Washington',
        WV: 'West Virginia',
        WI: 'Wisconsin',
        WY: 'Wyoming'
      }

      nP(
        'NV',
        '575,1144 565,1134 549,1119 530,1100 524,1094 524,1088 524,1085 524,1080 524,1067 524,1056 524,1033 524,909 524,840 563,840 566,840 634,840 706,840 707,840 771,840 828,840 874,840 888,840 888,924 888,1000 888,1017 888,1048 888,1121 888,1130 887,1167 887,1213 888,1264 888,1277 888,1330 888,1332 884,1338 \
882,1345 878,1347 876,1347 871,1343 872,1341 871,1339 869,1337 867,1335 863,1338 862,1338 858,1335 854,1337 852,1336 847,1339 846,1341 846,1343 846,1345 845,1349 848,1356 850,1358 850,1359 848,1361 849,1368 848,1371 850,1374 849,1377 850,1378 851,1381 850,1383 851,1387 849,1389 851,1395 854,1403 854,1407 \
856,1414 856,1418 855,1421 855,1422 852,1422 851,1423 854,1427 852,1430 852,1433 791,1366 775,1348 697,1267 656,1225 620,1188'
      )
      nP(
        'IN',
        '2581,1164 2580,1162 2579,1162 2579,1164 2581,1165 2582,1166 2581,1167 2578,1168 2577,1169 2575,1168 2574,1168 2573,1169 2575,1171 2575,1172 2574,1174 2572,1174 2571,1175 2570,1177 2570,1180 2571,1183 2570,1185 2569,1185 2567,1185 2566,1185 2565,1191 2563,1192 2562,1192 2561,1190 2562,1187 2561,1186 2560,1186 \
2558,1188 2556,1187 2553,1180 2552,1179 2550,1180 2547,1183 2545,1184 2542,1184 2540,1185 2539,1186 2537,1195 2535,1197 2533,1196 2532,1193 2530,1192 2527,1191 2525,1190 2522,1188 2518,1184 2514,1184 2510,1186 2504,1181 2503,1185 2505,1188 2505,1190 2504,1192 2501,1193 2499,1192 2500,1187 2498,1187 2497,1188 \
2495,1187 2491,1189 2489,1188 2486,1185 2485,1185 2484,1187 2484,1189 2486,1192 2485,1195 2484,1196 2483,1198 2479,1195 2478,1195 2475,1194 2475,1193 2477,1193 2478,1192 2475,1190 2474,1187 2477,1187 2478,1187 2478,1186 2475,1185 2475,1183 2476,1185 2478,1184 2477,1182 2479,1181 2478,1178 2479,1176 2478,1175 \
2477,1175 2478,1174 2482,1172 2482,1170 2479,1171 2479,1170 2482,1167 2483,1167 2484,1165 2484,1164 2481,1162 2481,1159 2481,1158 2485,1153 2485,1155 2487,1153 2487,1152 2488,1152 2488,1154 2489,1154 2490,1149 2493,1147 2495,1143 2496,1141 2495,1140 2495,1139 2499,1138 2500,1136 2501,1136 2501,1135 2500,1132 \
2501,1130 2502,1128 2503,1128 2503,1126 2503,1124 2505,1122 2508,1120 2510,1116 2510,1113 2509,1113 2510,1111 2508,1106 2507,1105 2508,1102 2509,1100 2509,1097 2508,1096 2505,1094 2506,1094 2505,1088 2504,1087 2503,1086 2503,1085 2501,1084 2501,1083 2500,1081 2502,1079 2504,1077 2505,1077 2505,1076 2505,1073 \
2504,1072 2504,1070 2504,1069 2503,1068 2505,1065 2508,1064 2508,1053 2508,1042 2508,1019 2508,995 2508,968 2508,967 2509,946 2509,923 2509,909 2509,899 2509,884 2509,863 2513,867 2516,867 2514,868 2517,870 2527,871 2545,863 2551,859 2570,859 2588,859 2598,859 2615,859 2623,859 2645,859 2652,859 2674,859 \
2676,860 2676,865 2676,879 2676,888 2676,900 2676,903 2676,925 2676,929 2676,947 2676,959 2676,979 2676,982 2676,1008 2675,1016 2675,1032 2675,1046 2675,1050 2675,1067 2675,1068 2675,1085 2674,1085 2670,1088 2670,1089 2671,1091 2673,1093 2674,1095 2673,1098 2671,1100 2671,1101 2672,1102 2676,1102 2676,1104 \
2676,1105 2674,1108 2675,1111 2665,1112 2662,1114 2659,1115 2656,1118 2654,1120 2651,1120 2647,1115 2643,1116 2638,1116 2636,1117 2636,1120 2638,1129 2638,1131 2637,1133 2635,1135 2632,1139 2626,1141 2624,1146 2623,1150 2622,1153 2618,1156 2615,1155 2614,1154 2612,1155 2611,1158 2608,1163 2608,1173 2607,1176 \
2605,1178 2602,1178 2600,1179 2599,1181 2596,1178 2591,1177 2587,1175 2585,1174 2585,1172 2584,1166'
      )
      nP(
        'UT',
        '887,1167 888,1130 888,1121 888,1048 888,1017 888,1000 888,924 888,840 952,839 1004,839 1006,839 1043,839 1071,840 1071,875 1071,902 1071,924 1131,924 1135,924 1193,924 1193,953 1193,991 1193,1038 1193,1050 1193,1063 1193,1137 1193,1158 1193,1166 1193,1188 1193,1210 1193,1264 1135,1264 1107,1264 1105,1263 \
1090,1263 1052,1263 998,1264 979,1264 958,1264 888,1264 887,1213'
      )
      nP('CA', '531,1512 544,1516 550,1513 553,1515 552,1517 541,1521 533,1521 530,1517 531,1515 528,1513')
      nP(
        'CA',
        '422,1164 414,1173 407,1172 402,1167 387,1173 384,1165 382,1161 380,1162 384,1170 377,1165 375,1169 371,1169 369,1166 372,1171 370,1177 374,1180 371,1184 373,1193 370,1194 360,1186 359,1188 351,1178 345,1176 343,1179 339,1179 344,1166 340,1153 337,1154 333,1142 322,1132 308,1114 296,1100 298,1090 290,1064 \
294,1047 292,1035 289,1024 278,1009 273,1000 258,988 258,981 255,972 272,926 270,913 274,898 275,885 270,862 264,858 266,852 266,839 290,840 309,839 326,839 384,839 435,840 470,840 524,840 524,909 524,1033 524,1056 524,1067 524,1080 524,1085 524,1088 524,1094 530,1100 549,1119 565,1134 575,1144 620,1188 \
656,1225 697,1267 775,1348 791,1366 852,1433 852,1438 852,1440 852,1444 855,1447 857,1453 858,1454 860,1455 862,1458 864,1466 864,1467 865,1468 867,1472 867,1477 867,1479 870,1479 872,1481 873,1483 874,1483 879,1487 881,1489 882,1491 883,1495 881,1495 876,1502 873,1503 871,1506 865,1509 864,1511 864,1515 \
859,1521 858,1522 860,1524 858,1530 859,1531 858,1533 859,1537 859,1540 860,1543 857,1545 858,1546 858,1550 857,1553 858,1555 854,1559 854,1561 852,1563 852,1565 851,1567 846,1568 847,1573 845,1577 849,1580 848,1582 849,1584 849,1589 847,1592 847,1595 850,1599 851,1599 852,1600 853,1600 856,1600 858,1600 \
862,1605 861,1608 862,1616 858,1619 858,1621 858,1622 857,1622 857,1623 856,1623 856,1624 855,1624 855,1625 853,1625 853,1626 848,1625 847,1625 846,1626 761,1635 699,1642 695,1627 699,1636 699,1630 695,1625 692,1630 689,1615 691,1612 687,1593 682,1583 670,1569 639,1539 631,1537 628,1543 621,1540 619,1537 \
622,1534 620,1528 613,1515 597,1516 588,1514 571,1505 568,1498 555,1486 547,1483 531,1484 523,1479 515,1478 495,1480 492,1474 484,1469 487,1458 485,1453 486,1445 483,1441 484,1435 486,1427 484,1421 471,1415 469,1411 471,1402 470,1397 463,1394 453,1380 446,1377 442,1365 435,1358 420,1333 408,1322 404,1299 \
407,1294 409,1297 413,1293 416,1279 414,1276 408,1267 397,1268 390,1263 384,1254 376,1243 377,1234 374,1223 370,1219 371,1204 371,1197 377,1195 380,1202 379,1204 379,1212 396,1225 403,1224 395,1221 389,1201 382,1197 382,1188 378,1186 378,1181 383,1177 401,1174 420,1177 422,1171 427,1171 427,1173 429,1173 \
427,1169 428,1167 422,1170'
      )
      nP('NY', '3322,966 3322,963 3326,956 3332,954 3332,958 3329,963 3324,966')
      nP(
        'CT',
        '3365,880 3366,868 3368,835 3394,836 3397,836 3408,836 3408,840 3411,839 3412,836 3421,837 3423,837 3427,837 3450,837 3453,837 3470,838 3471,839 3471,863 3471,870 3471,873 3470,889 3468,890 3468,895 3468,897 3467,897 3441,900 3438,900 3435,894 3435,901 3426,902 3403,901 3391,910 3357,924 3357,923 3353,916 \
3368,906 3364,899 3364,893'
      )
      nP(
        'PA',
        '3124,1033 3086,1032 3071,1032 3068,1032 3042,1032 3035,1032 3006,1033 3001,1033 2984,1033 2974,1033 2943,1033 2937,1033 2937,1012 2937,1007 2937,995 2937,975 2937,968 2937,955 2937,936 2937,933 2937,913 2937,883 2937,882 2937,852 2937,840 2984,817 2984,839 2993,839 3027,839 3035,839 3073,839 3079,839 \
3107,840 3115,839 3155,839 3157,839 3179,839 3205,839 3207,839 3246,840 3252,839 3254,840 3255,843 3258,844 3259,850 3264,851 3266,852 3267,852 3268,853 3270,855 3269,856 3269,858 3271,859 3271,862 3271,863 3272,870 3271,872 3271,873 3273,876 3274,878 3277,883 3279,883 3281,885 3281,886 3283,886 3288,888 \
3290,888 3291,888 3291,890 3293,892 3293,894 3288,898 3288,899 3286,900 3283,905 3283,907 3280,912 3278,915 3276,916 3276,917 3277,917 3275,919 3273,922 3271,923 3268,924 3266,926 3267,927 3270,932 3270,934 3271,935 3272,936 3269,938 3269,939 3269,942 3267,943 3265,943 3263,945 3263,948 3262,951 3264,952 \
3262,954 3263,955 3263,957 3263,959 3263,961 3264,962 3267,961 3270,963 3271,965 3271,970 3271,973 3274,975 3275,974 3277,975 3278,980 3279,981 3280,982 3282,984 3285,988 3291,994 3292,996 3290,998 3285,999 3283,1002 3278,1004 3276,1006 3272,1008 3271,1010 3270,1011 3268,1011 3266,1013 3266,1014 3267,1018 \
3266,1019 3264,1019 3260,1022 3259,1022 3254,1022 3249,1026 3246,1024 3239,1023 3236,1023 3232,1024 3229,1028 3228,1032 3227,1032 3205,1033 3200,1033 3179,1033 3165,1033 3153,1033 3139,1033'
      )
      nP(
        'RI',
        '3471,873 3471,870 3471,863 3471,839 3489,839 3496,838 3496,841 3496,849 3499,848 3499,850 3499,851 3498,855 3499,858 3500,859 3503,861 3506,864 3502,866 3497,861 3495,860 3497,864 3494,869 3493,883 3490,891 3475,896 3467,897 3468,896 3468,895 3468,890 3470,889'
      )
      nP('RI', '3503,871 3506,870 3505,884 3502,883 3498,886')
      nP('RI', '3507,867 3511,869 3512,882 3507,885')
      nP(
        'DE',
        '3232,1131 3231,1123 3231,1108 3229,1082 3228,1073 3228,1069 3228,1061 3227,1032 3228,1032 3229,1028 3232,1024 3236,1023 3239,1023 3246,1024 3249,1026 3250,1027 3249,1028 3247,1029 3246,1031 3246,1033 3245,1033 3238,1042 3241,1046 3239,1054 3243,1063 3250,1072 3251,1088 3255,1093 3256,1098 3263,1110 3270,1111 \
3272,1140 3271,1140 3269,1140 3254,1140 3232,1139'
      )
      nP(
        'MD',
        '3231,1123 3232,1131 3232,1139 3254,1140 3269,1140 3265,1147 3266,1155 3259,1161 3252,1173 3252,1177 3237,1179 3235,1181 3222,1180 3228,1170 3220,1164 3224,1159 3222,1158 3226,1156 3220,1157 3222,1148 3221,1147 3217,1155 3214,1155 3213,1151 3210,1157 3196,1142 3196,1138 3202,1132 3198,1128 3212,1130 3212,1126 \
3211,1128 3209,1127 3206,1119 3203,1118 3200,1114 3197,1113 3193,1121 3192,1119 3197,1108 3202,1114 3204,1112 3207,1103 3209,1103 3208,1102 3208,1098 3207,1100 3202,1096 3207,1084 3200,1086 3199,1083 3200,1076 3207,1067 3212,1063 3223,1062 3215,1060 3217,1054 3215,1049 3212,1045 3209,1048 3204,1060 3200,1062 \
3192,1060 3189,1074 3181,1073 3177,1072 3179,1074 3179,1077 3177,1078 3177,1080 3188,1084 3185,1102 3180,1114 3182,1118 3183,1134 3190,1145 3189,1149 3188,1151 3185,1150 3182,1144 3174,1140 3193,1161 3194,1175 3179,1160 3167,1159 3161,1145 3158,1153 3154,1151 3153,1142 3139,1145 3137,1143 3136,1137 3145,1124 \
3145,1121 3147,1119 3148,1118 3149,1118 3150,1118 3150,1112 3158,1103 3152,1097 3150,1094 3145,1100 3143,1097 3138,1096 3137,1091 3133,1088 3131,1088 3126,1088 3125,1087 3123,1085 3121,1084 3121,1080 3123,1079 3124,1075 3124,1074 3122,1073 3120,1071 3118,1068 3115,1068 3111,1067 3108,1067 3107,1066 3107,1065 \
3107,1063 3106,1062 3108,1060 3107,1060 3106,1058 3104,1057 3103,1056 3104,1056 3103,1054 3105,1055 3104,1053 3105,1052 3102,1052 3101,1051 3102,1050 3102,1049 3101,1049 3100,1050 3099,1047 3098,1046 3099,1046 3101,1046 3101,1045 3101,1042 3100,1043 3098,1041 3098,1043 3097,1043 3095,1041 3095,1042 3095,1044 \
3094,1042 3092,1043 3090,1041 3086,1036 3080,1035 3079,1036 3078,1037 3077,1038 3076,1039 3075,1041 3070,1039 3070,1040 3068,1040 3068,1042 3065,1041 3067,1044 3064,1043 3063,1044 3066,1047 3064,1047 3064,1048 3062,1050 3060,1049 3057,1050 3055,1048 3053,1049 3052,1048 3051,1048 3048,1046 3047,1045 3045,1044 \
3044,1043 3046,1042 3047,1041 3045,1041 3044,1039 3043,1040 3043,1042 3041,1044 3042,1046 3040,1046 3038,1049 3033,1055 3032,1057 3027,1053 3026,1053 3026,1054 3024,1054 3024,1056 3022,1058 3021,1059 3020,1060 3014,1064 3013,1066 3012,1068 3009,1069 3007,1071 3003,1076 3002,1076 3000,1077 3001,1033 3006,1033 \
3035,1032 3042,1032 3068,1032 3071,1032 3086,1032 3124,1033 3139,1033 3153,1033 3165,1033 3179,1033 3200,1033 3205,1033 3227,1032 3228,1061 3228,1069 3228,1073 3229,1082 3231,1108'
      )
      nP(
        'WV',
        '3016,1138 3014,1141 3011,1144 3001,1139 2998,1132 2991,1128 2989,1132 2990,1134 2988,1136 2989,1142 2986,1145 2986,1149 2984,1149 2981,1152 2981,1153 2982,1154 2982,1156 2980,1157 2974,1163 2975,1165 2973,1168 2974,1170 2972,1173 2971,1175 2969,1179 2966,1182 2963,1186 2962,1188 2959,1189 2959,1190 2959,1192 \
2956,1195 2956,1197 2954,1199 2954,1202 2951,1206 2951,1208 2951,1209 2954,1209 2956,1210 2954,1213 2950,1215 2949,1218 2950,1219 2952,1218 2952,1220 2948,1222 2948,1223 2945,1224 2943,1227 2940,1228 2939,1227 2939,1224 2938,1223 2936,1224 2933,1226 2926,1230 2925,1230 2924,1231 2923,1232 2922,1231 2920,1230 \
2920,1228 2917,1227 2916,1230 2917,1234 2917,1235 2912,1238 2910,1239 2909,1238 2909,1237 2907,1239 2899,1240 2894,1243 2889,1239 2886,1235 2884,1237 2883,1239 2879,1242 2878,1242 2877,1244 2874,1246 2867,1246 2865,1243 2863,1242 2862,1240 2860,1239 2858,1240 2857,1239 2856,1237 2855,1236 2853,1235 2851,1232 \
2852,1228 2848,1224 2848,1222 2850,1222 2851,1220 2849,1218 2848,1217 2845,1218 2844,1217 2844,1219 2842,1217 2838,1216 2838,1215 2839,1215 2839,1213 2837,1213 2836,1209 2834,1210 2832,1208 2829,1207 2827,1200 2827,1199 2826,1197 2822,1195 2821,1189 2820,1188 2816,1185 2817,1183 2818,1182 2818,1181 2815,1177 \
2811,1169 2807,1166 2807,1164 2809,1163 2810,1162 2809,1158 2811,1158 2812,1157 2811,1154 2812,1152 2810,1147 2811,1144 2812,1144 2813,1145 2817,1144 2822,1142 2823,1142 2827,1141 2828,1139 2829,1129 2830,1128 2834,1129 2836,1128 2836,1125 2835,1121 2836,1118 2834,1113 2835,1110 2838,1107 2838,1102 2841,1098 \
2842,1096 2843,1095 2844,1093 2847,1092 2848,1094 2851,1095 2853,1100 2851,1103 2852,1104 2853,1105 2855,1103 2857,1099 2858,1098 2860,1100 2861,1100 2860,1096 2861,1092 2858,1090 2858,1088 2858,1087 2860,1087 2862,1086 2863,1083 2862,1079 2864,1076 2865,1075 2866,1072 2867,1071 2873,1071 2874,1066 2875,1064 \
2880,1059 2881,1059 2882,1059 2885,1064 2887,1064 2891,1061 2894,1061 2894,1059 2896,1058 2897,1057 2901,1054 2902,1052 2906,1049 2906,1048 2909,1044 2912,1042 2913,1042 2915,1041 2916,1038 2916,1036 2918,1034 2918,1033 2917,1031 2916,1029 2919,1025 2919,1023 2920,1021 2921,1020 2920,1017 2920,1016 2921,1016 \
2922,1016 2923,1016 2923,1013 2924,1010 2924,1006 2926,996 2926,995 2928,992 2929,988 2932,985 2932,983 2932,977 2931,976 2931,975 2932,968 2931,966 2930,963 2928,961 2928,960 2930,957 2932,956 2934,957 2937,955 2937,968 2937,975 2937,995 2937,1007 2937,1012 2937,1033 2943,1033 2974,1033 2984,1033 3001,1033 \
3000,1077 3002,1076 3003,1076 3007,1071 3009,1069 3012,1068 3013,1066 3014,1064 3020,1060 3021,1059 3022,1058 3024,1056 3024,1054 3026,1054 3026,1053 3027,1053 3032,1057 3033,1055 3038,1049 3040,1046 3042,1046 3041,1044 3043,1042 3043,1040 3044,1039 3045,1041 3047,1041 3046,1042 3044,1043 3045,1044 3047,1045 \
3048,1046 3051,1048 3052,1048 3053,1049 3055,1048 3057,1050 3060,1049 3062,1050 3064,1048 3064,1047 3066,1047 3063,1044 3064,1043 3067,1044 3065,1041 3068,1042 3068,1040 3070,1040 3070,1039 3075,1041 3076,1039 3077,1038 3078,1037 3079,1036 3080,1035 3086,1036 3090,1041 3092,1043 3094,1042 3095,1044 3095,1042 \
3095,1041 3097,1043 3098,1043 3098,1041 3100,1043 3101,1042 3101,1045 3101,1046 3099,1046 3098,1046 3099,1047 3100,1050 3101,1049 3102,1049 3102,1050 3101,1051 3102,1052 3105,1052 3104,1053 3105,1055 3103,1054 3104,1056 3103,1056 3104,1057 3106,1058 3107,1060 3108,1060 3106,1062 3107,1063 3107,1065 3107,1066 \
3108,1067 3106,1070 3106,1073 3103,1077 3103,1082 3102,1083 3089,1071 3077,1061 3075,1058 3070,1055 3070,1061 3069,1063 3070,1064 3071,1065 3066,1072 3067,1073 3066,1076 3066,1077 3067,1079 3065,1081 3064,1084 3062,1084 3061,1086 3059,1089 3057,1091 3058,1092 3058,1093 3055,1097 3053,1095 3052,1098 3050,1100 \
3048,1102 3047,1100 3046,1100 3046,1101 3043,1104 3042,1108 3039,1114 3031,1107 3028,1111 3027,1112 3027,1114 3025,1119 3025,1123 3023,1122 3023,1123'
      )
      nP('MD', '3196,1102 3196,1097 3193,1097 3195,1099 3194,1101 3193,1100 3194,1104 3191,1106 3192,1097 3195,1090 3199,1096 3199,1100 3197,1098')
      nP('SC', '2922,1666 2925,1664 2928,1669 2919,1679')
      nP('MD', '3271,1140 3272,1140 3270,1151')
      nP('CA', '513,1524 509,1517 521,1514 526,1522 517,1527')
      nP('CA', '624,1618 620,1619 614,1612 609,1601 611,1600 613,1604')
      nP('CA', '609,1562 624,1568 628,1574 627,1577 618,1575 616,1567 612,1566')
      nP(
        'OH',
        '2769,1127 2768,1128 2767,1128 2766,1127 2766,1125 2763,1123 2758,1122 2755,1120 2754,1120 2748,1121 2747,1122 2746,1125 2746,1126 2744,1126 2742,1125 2739,1123 2737,1120 2735,1118 2733,1115 2730,1114 2727,1113 2721,1114 2719,1114 2714,1112 2711,1110 2710,1104 2709,1101 2707,1098 2705,1093 2703,1091 2701,1091 \
2699,1090 2699,1087 2697,1084 2695,1085 2693,1086 2688,1088 2687,1087 2684,1086 2679,1082 2676,1085 2675,1085 2675,1068 2675,1067 2675,1050 2675,1046 2675,1032 2675,1016 2676,1008 2676,982 2676,979 2676,959 2676,947 2676,929 2676,925 2676,903 2676,900 2676,888 2676,879 2676,865 2701,864 2703,864 2733,863 \
2739,863 2756,863 2776,871 2786,878 2798,879 2799,881 2781,885 2791,888 2803,886 2813,891 2826,888 2846,880 2849,882 2863,882 2879,871 2886,863 2908,852 2937,840 2937,852 2937,882 2937,883 2937,913 2937,933 2937,936 2937,955 2934,957 2932,956 2930,957 2928,960 2928,961 2930,963 2931,966 2932,968 2931,975 \
2931,976 2932,977 2932,983 2932,985 2929,988 2928,992 2926,995 2926,996 2924,1006 2924,1010 2923,1013 2923,1016 2922,1016 2921,1016 2920,1016 2920,1017 2921,1020 2920,1021 2919,1023 2919,1025 2916,1029 2917,1031 2918,1033 2918,1034 2916,1036 2916,1038 2915,1041 2913,1042 2912,1042 2909,1044 2906,1048 \
2906,1049 2902,1052 2901,1054 2897,1057 2896,1058 2894,1059 2894,1061 2891,1061 2887,1064 2885,1064 2882,1059 2881,1059 2880,1059 2875,1064 2874,1066 2873,1071 2867,1071 2866,1072 2865,1075 2864,1076 2862,1079 2863,1083 2862,1086 2860,1087 2858,1087 2858,1088 2858,1090 2861,1092 2860,1096 2861,1100 2860,1100 \
2858,1098 2857,1099 2855,1103 2853,1105 2852,1104 2851,1103 2853,1100 2851,1095 2848,1094 2847,1092 2844,1093 2843,1095 2842,1096 2841,1098 2838,1102 2838,1107 2835,1110 2834,1113 2836,1118 2835,1121 2836,1125 2836,1128 2834,1129 2830,1128 2829,1129 2828,1139 2827,1141 2823,1142 2822,1142 2817,1144 2813,1145 \
2812,1144 2811,1144 2809,1138 2806,1136 2804,1133 2802,1132 2798,1131 2796,1130 2795,1128 2794,1123 2793,1121 2794,1118 2792,1116 2791,1115 2787,1118 2784,1118 2782,1120 2779,1122 2777,1126 2775,1127 2771,1126'
      )
      nP('DC', '3152,1097 3158,1103 3150,1112 3151,1110 3150,1108 3150,1107 3150,1105 3149,1103 3148,1101 3145,1100 3150,1094')
      nP(
        'IL',
        '2476,1220 2475,1223 2461,1226 2458,1229 2454,1228 2451,1229 2449,1238 2449,1242 2452,1246 2454,1250 2453,1255 2451,1257 2450,1258 2448,1258 2446,1257 2442,1254 2438,1252 2435,1251 2434,1251 2427,1246 2423,1245 2419,1245 2415,1248 2412,1254 2410,1256 2409,1258 2408,1261 2410,1264 2411,1264 2407,1265 2406,1261 \
2404,1260 2403,1256 2402,1256 2400,1256 2400,1258 2403,1261 2403,1263 2402,1263 2400,1263 2395,1259 2396,1255 2393,1252 2392,1249 2390,1244 2390,1242 2389,1242 2387,1240 2387,1238 2388,1235 2390,1235 2392,1233 2393,1229 2391,1225 2389,1222 2387,1215 2388,1211 2387,1208 2388,1206 2387,1204 2383,1204 2378,1200 \
2378,1197 2377,1195 2374,1192 2367,1187 2366,1187 2366,1188 2364,1189 2362,1189 2359,1186 2360,1182 2357,1181 2355,1179 2350,1176 2350,1174 2345,1171 2342,1168 2340,1164 2337,1163 2335,1159 2335,1151 2336,1148 2337,1145 2339,1142 2342,1135 2342,1133 2343,1131 2347,1127 2347,1123 2345,1119 2346,1117 2348,1113 \
2349,1112 2350,1111 2351,1108 2350,1106 2343,1101 2341,1100 2338,1100 2333,1097 2329,1097 2325,1103 2323,1105 2319,1104 2317,1099 2315,1091 2314,1089 2316,1086 2314,1082 2314,1077 2313,1075 2313,1073 2310,1069 2306,1064 2300,1060 2294,1056 2293,1054 2291,1049 2287,1047 2284,1043 2277,1036 2274,1032 2274,1029 \
2273,1026 2269,1021 2269,1019 2270,1017 2270,1016 2269,1014 2267,1008 2266,1003 2265,998 2266,992 2266,988 2267,983 2269,977 2271,976 2273,976 2274,975 2273,971 2274,966 2273,964 2271,962 2271,960 2274,958 2281,955 2283,954 2287,953 2289,951 2289,949 2291,944 2291,938 2294,934 2298,931 2299,928 2299,918 \
2299,915 2297,912 2295,910 2293,909 2290,904 2290,901 2292,896 2293,890 2295,888 2297,888 2300,888 2306,886 2310,886 2314,886 2317,885 2321,881 2325,880 2330,879 2331,878 2332,876 2336,874 2337,873 2337,869 2338,863 2339,860 2342,858 2346,856 2348,845 2349,841 2349,836 2347,834 2348,830 2347,829 2346,829 \
2344,826 2338,823 2335,821 2333,819 2332,817 2332,810 2331,809 2328,806 2323,804 2321,800 2318,799 2318,797 2319,796 2332,796 2362,797 2368,797 2394,797 2397,797 2423,798 2433,798 2437,798 2462,798 2468,798 2492,798 2490,813 2495,826 2500,834 2504,852 2509,863 2509,884 2509,899 2509,909 2509,923 2509,946 \
2508,967 2508,968 2508,995 2508,1019 2508,1042 2508,1053 2508,1064 2505,1065 2503,1068 2504,1069 2504,1070 2504,1072 2505,1073 2505,1076 2505,1077 2504,1077 2502,1079 2500,1081 2501,1083 2501,1084 2503,1085 2503,1086 2504,1087 2505,1088 2506,1094 2505,1094 2508,1096 2509,1097 2509,1100 2508,1102 2507,1105 \
2508,1106 2510,1111 2509,1113 2510,1113 2510,1116 2508,1120 2505,1122 2503,1124 2503,1126 2503,1128 2502,1128 2501,1130 2500,1132 2501,1135 2501,1136 2500,1136 2499,1138 2495,1139 2495,1140 2496,1141 2495,1143 2493,1147 2490,1149 2489,1154 2488,1154 2488,1152 2487,1152 2487,1153 2485,1155 2485,1153 2481,1158 \
2481,1159 2481,1162 2484,1164 2484,1165 2483,1167 2482,1167 2479,1170 2479,1171 2482,1170 2482,1172 2478,1174 2477,1175 2478,1175 2479,1176 2478,1178 2479,1181 2477,1182 2478,1184 2476,1185 2475,1183 2475,1185 2478,1186 2478,1187 2477,1187 2474,1187 2475,1190 2478,1192 2477,1193 2475,1193 2475,1194 2478,1195 \
2476,1201 2472,1204 2470,1207 2470,1210 2472,1214'
      )
      nP(
        'ND',
        '1824,505 1807,505 1764,505 1754,505 1715,505 1624,505 1566,505 1563,505 1499,505 1499,476 1499,454 1499,445 1499,387 1499,381 1499,330 1499,297 1499,276 1498,246 1567,246 1623,246 1655,246 1735,246 1775,246 1807,246 1872,246 1916,246 1917,251 1919,256 1919,259 1919,261 1920,262 1919,262 1921,264 1921,266 \
1922,267 1922,269 1923,270 1923,271 1924,273 1923,277 1922,277 1922,278 1921,278 1921,281 1920,281 1920,282 1919,283 1921,284 1920,284 1920,285 1921,285 1921,286 1922,286 1921,293 1922,293 1922,295 1920,295 1921,296 1922,296 1920,297 1921,298 1922,299 1921,300 1922,300 1921,303 1923,303 1922,304 1923,305 \
1922,305 1923,306 1923,307 1921,308 1922,308 1922,311 1923,311 1921,312 1923,313 1922,313 1921,314 1921,315 1921,316 1923,317 1921,318 1922,318 1922,320 1924,322 1924,324 1926,326 1927,334 1929,337 1928,341 1930,341 1931,345 1931,347 1932,348 1934,350 1934,355 1937,358 1937,363 1939,364 1938,367 1939,369 \
1938,371 1939,373 1938,376 1939,378 1938,380 1939,380 1940,383 1939,385 1940,386 1939,388 1940,390 1939,393 1940,395 1940,401 1940,402 1941,407 1940,408 1941,412 1940,414 1940,415 1941,418 1942,418 1942,419 1943,420 1943,421 1944,421 1945,422 1943,426 1944,428 1942,431 1943,435 1943,440 1942,442 1943,447 \
1944,449 1945,450 1946,458 1947,460 1947,464 1949,465 1951,470 1953,470 1954,471 1954,480 1955,482 1955,484 1956,485 1957,492 1956,498 1957,504 1956,506 1915,505 1870,506 1868,506'
      )
      nP(
        'WY',
        '1498,865 1498,876 1498,891 1499,924 1445,925 1424,924 1367,924 1359,924 1327,924 1300,924 1262,924 1193,924 1135,924 1131,924 1071,924 1071,902 1071,875 1071,840 1071,797 1071,753 1071,730 1071,711 1071,671 1071,630 1071,613 1070,585 1109,585 1111,585 1135,585 1147,585 1219,585 1241,585 1264,585 1364,585 \
1378,585 1435,585 1438,585 1498,585 1498,621 1498,654 1498,657 1498,682 1498,712 1498,714 1498,754 1498,787 1498,839'
      )
      nP(
        'SD',
        '1576,755 1563,755 1532,755 1498,754 1498,714 1498,712 1498,682 1498,657 1498,654 1498,621 1498,585 1499,585 1499,567 1499,510 1499,505 1563,505 1566,505 1624,505 1715,505 1754,505 1764,505 1807,505 1824,505 1868,506 1870,506 1915,505 1956,506 1955,515 1954,516 1951,522 1940,530 1939,533 1939,535 1944,541 \
1946,546 1949,550 1954,551 1958,553 1962,557 1963,559 1963,561 1963,587 1963,602 1963,616 1963,624 1963,653 1963,682 1963,712 1954,712 1955,714 1955,718 1957,720 1959,722 1959,724 1958,728 1955,730 1956,732 1957,733 1956,734 1957,735 1961,736 1962,737 1963,744 1963,747 1963,748 1962,749 1959,750 1960,753 \
1959,756 1959,759 1958,762 1958,763 1957,767 1956,769 1955,768 1954,771 1952,773 1952,776 1953,779 1956,783 1958,783 1960,786 1961,790 1960,791 1961,791 1962,795 1964,798 1961,798 1957,795 1955,795 1954,796 1952,795 1952,793 1947,787 1948,785 1948,784 1947,783 1942,782 1941,782 1941,780 1935,777 1932,778 \
1931,778 1932,776 1931,775 1929,775 1922,774 1920,772 1917,770 1916,768 1915,767 1913,767 1911,766 1906,766 1902,767 1900,767 1899,766 1895,767 1891,766 1888,768 1885,767 1883,768 1881,767 1880,766 1875,767 1875,769 1873,772 1871,774 1869,774 1867,774 1861,771 1861,770 1860,768 1858,768 1850,765 1845,761 \
1841,760 1838,755 1792,755 1775,755 1734,755 1671,756 1619,755'
      )
      nP(
        'WI',
        '2495,588 2490,591 2490,596 2481,609 2481,612 2479,615 2482,619 2479,617 2478,621 2482,624 2485,624 2488,617 2494,615 2497,611 2504,599 2507,597 2507,600 2515,594 2519,601 2522,602 2518,612 2512,624 2508,642 2510,655 2502,661 2497,679 2498,697 2493,708 2492,716 2488,724 2487,738 2489,748 2487,752 2490,757 \
2491,768 2495,773 2493,783 2492,798 2468,798 2462,798 2437,798 2433,798 2423,798 2397,797 2394,797 2368,797 2362,797 2332,796 2319,796 2320,794 2319,792 2317,791 2315,785 2312,784 2303,782 2302,782 2297,779 2293,776 2292,773 2291,765 2288,761 2287,754 2287,748 2286,747 2287,742 2292,733 2293,731 2292,728 \
2286,724 2284,723 2284,719 2282,715 2283,712 2282,708 2282,704 2281,697 2281,693 2281,688 2279,683 2274,674 2271,671 2264,667 2262,667 2260,666 2257,664 2251,658 2245,653 2242,648 2240,645 2240,643 2239,641 2237,639 2230,634 2223,632 2220,631 2217,628 2216,624 2215,623 2204,621 2198,618 2197,615 2190,609 \
2186,606 2189,599 2189,597 2188,593 2189,592 2190,590 2189,585 2189,583 2187,579 2190,575 2190,572 2189,569 2189,567 2190,560 2192,558 2194,554 2196,551 2196,548 2195,546 2194,545 2191,538 2189,537 2184,537 2182,536 2181,530 2183,525 2185,523 2188,520 2190,514 2191,513 2192,509 2195,507 2202,504 2203,501 \
2207,502 2209,498 2213,499 2214,498 2215,495 2218,494 2218,487 2218,465 2218,444 2223,445 2230,437 2235,442 2240,442 2263,436 2305,419 2310,422 2310,425 2301,450 2313,445 2325,450 2333,452 2334,454 2339,453 2339,454 2339,455 2341,456 2342,457 2345,457 2348,462 2349,467 2351,469 2351,471 2362,474 2413,488 \
2420,491 2423,494 2431,498 2432,497 2433,497 2433,498 2436,497 2437,498 2439,498 2441,501 2442,501 2444,499 2445,499 2447,498 2449,498 2450,499 2450,500 2452,500 2455,501 2457,500 2460,503 2462,503 2464,503 2467,504 2469,504 2471,505 2473,506 2474,507 2474,509 2476,511 2473,514 2472,515 2475,518 2477,518 \
2481,517 2482,520 2488,521 2490,524 2492,524 2492,525 2494,527 2493,527 2491,528 2491,529 2494,533 2494,534 2493,537 2491,537 2492,539 2493,542 2491,545 2489,547 2489,550 2487,554 2488,554 2488,553 2490,555 2491,554 2495,555 2499,552 2502,554 2502,555 2498,562 2498,564 2497,565 2497,567 2496,568 2497,570 \
2500,573 2501,576 2506,577 2503,580 2503,586'
      )
      nP(
        'ID',
        '705,697 705,691 705,687 705,684 706,683 706,682 708,682 708,680 708,678 709,676 709,673 711,668 708,663 709,662 710,662 713,657 712,655 708,653 708,651 707,649 705,649 704,650 702,649 701,647 700,647 698,648 696,648 694,645 694,644 694,641 692,637 694,633 693,630 694,628 695,626 698,624 698,622 699,621 \
702,611 703,610 704,606 710,604 712,599 713,598 715,596 717,592 716,589 717,587 716,587 716,585 716,583 719,581 720,578 720,576 721,576 723,573 726,563 727,556 733,546 734,543 739,537 739,533 736,528 736,525 734,521 728,519 725,515 721,515 720,513 716,508 713,502 712,500 709,494 708,493 709,492 711,486 \
709,483 708,479 707,474 705,472 703,470 704,467 704,464 704,454 704,405 704,393 704,385 705,333 704,326 705,259 705,246 764,246 765,288 765,313 765,332 766,333 768,337 772,342 774,344 776,345 777,347 778,351 781,352 782,355 784,356 784,361 786,363 787,365 784,370 786,371 787,374 790,375 790,376 789,377 \
784,377 783,378 783,379 788,381 790,383 792,384 795,387 797,390 798,391 803,392 804,393 808,394 809,394 811,400 817,405 819,407 820,407 821,410 824,413 826,417 827,418 829,419 831,422 834,423 833,424 832,428 835,432 837,432 839,434 842,435 843,436 842,440 845,441 848,438 849,438 852,442 851,443 851,444 \
853,447 857,446 861,447 863,445 867,444 870,445 870,447 869,450 869,456 868,457 865,459 867,464 866,466 865,467 864,476 861,479 863,481 863,486 862,487 859,487 859,488 859,490 861,491 862,493 862,496 860,498 861,499 861,501 865,502 865,504 864,507 865,508 866,511 865,513 863,513 861,514 860,513 859,516 \
856,520 857,522 858,523 860,526 859,528 860,529 856,532 857,534 856,538 858,537 860,538 862,538 864,540 865,542 868,544 869,546 870,546 874,544 875,542 875,539 878,540 880,539 882,538 883,536 885,535 887,532 889,530 890,529 889,528 890,527 892,526 892,527 895,528 895,529 896,531 896,533 899,533 901,534 \
902,535 900,541 904,541 904,542 904,544 903,547 904,550 906,552 906,558 909,561 909,563 912,567 915,569 915,572 916,573 916,575 918,576 920,576 920,578 921,579 922,580 924,581 923,582 924,585 924,589 923,590 922,590 921,591 924,597 926,599 930,601 931,604 932,603 936,601 937,601 943,605 944,607 945,609 \
945,611 947,612 948,617 946,620 949,622 949,624 951,626 950,629 951,631 951,633 952,633 955,635 958,636 959,638 961,640 963,639 962,636 962,634 964,631 965,629 968,629 969,627 973,629 980,629 982,630 985,630 987,632 990,632 992,627 992,625 995,624 997,622 998,622 999,624 1000,625 1005,625 1006,626 1009,625 \
1011,625 1011,624 1014,625 1016,623 1020,622 1024,627 1025,626 1027,626 1030,624 1032,623 1037,624 1039,623 1044,625 1044,624 1046,624 1045,623 1044,623 1042,619 1043,617 1043,616 1045,615 1046,614 1046,613 1044,611 1045,610 1047,609 1050,610 1050,607 1051,606 1052,608 1054,608 1054,610 1056,612 1057,612 \
1057,615 1060,616 1060,617 1059,619 1060,621 1063,622 1063,623 1065,625 1066,627 1068,628 1071,630 1071,671 1071,711 1071,730 1071,753 1071,797 1071,840 1043,839 1006,839 1004,839 952,839 888,840 874,840 828,840 771,840 707,840 706,840'
      )
      nP(
        'WI',
        '2539,560 2542,559 2543,564 2541,566 2538,564 2540,572 2536,572 2538,577 2536,577 2536,580 2534,579 2530,586 2531,590 2529,596 2522,602 2518,599 2516,592 2520,584 2524,580 2527,570 2530,572 2537,560'
      )
      nP(
        'WA',
        '377,311 373,311 373,319 379,325 370,319 368,313 370,309 376,309 378,306 367,295 360,295 358,288 364,286 369,291 372,291 370,283 375,280 371,276 369,270 369,266 358,262 355,253 351,250 356,249 354,246 471,246 594,246 633,246 680,246 705,246 705,259 704,326 705,333 704,385 704,393 704,405 704,454 704,464 \
704,467 703,470 705,472 707,474 708,479 709,483 711,486 709,492 708,493 709,494 712,500 677,500 670,500 647,500 646,500 586,500 583,503 576,506 574,507 566,506 561,507 558,507 553,509 549,507 546,509 543,513 534,513 531,514 524,516 519,519 514,520 511,524 506,524 496,526 493,526 489,522 485,522 483,523 \
481,525 471,528 468,531 465,530 464,530 460,529 458,530 455,533 452,534 451,533 450,529 449,528 445,527 443,526 440,525 436,526 435,526 430,524 419,526 416,526 413,525 408,527 406,530 403,531 401,532 396,535 386,538 383,539 379,537 374,537 367,534 361,533 359,531 355,530 354,523 354,520 353,517 353,513 \
353,511 352,508 352,505 348,498 346,493 342,491 337,487 333,485 329,484 327,486 325,488 321,488 311,477 302,478 296,476 286,480 279,474 274,477 275,446 277,451 278,467 289,466 282,459 285,457 281,448 283,443 289,439 285,437 276,439 273,438 273,433 270,424 272,423 272,426 277,430 276,425 290,418 279,417 \
277,413 272,412 269,421 267,401 265,392 259,386 257,370 256,361 249,347 242,341 234,318 236,311 235,298 244,300 279,317 316,321 332,318 345,322 345,325 350,319 354,318 352,323 361,337 361,342 355,347 353,347 352,342 349,345 346,358 341,364 333,376 331,386 339,385 350,378 338,385 333,384 338,371 345,363 \
355,359 357,351 364,343 364,336 369,338 372,351 363,356 365,367 367,366 368,371 370,372 367,381 368,383 365,387 367,391 366,394 364,390 364,392 358,390 363,381 362,381 356,386 354,393 357,396 355,401 351,395 354,387 352,385 347,390 333,398 335,408 338,407 345,411 353,405 357,408 358,407 365,400 369,391 \
368,388 375,393 377,392 374,390 375,388 381,386 382,382 377,372 378,365 376,359 377,350 383,335 387,333 388,330 379,319'
      )
      nP('WA', '356,307 360,297 364,296 369,303 369,306 363,305 356,311 364,313 368,324 371,322 378,328 379,333 377,338 374,337 372,331 368,333 364,328 359,315 354,312')
      nP('WA', '342,293 334,290 330,286 330,283 331,277 334,279 339,283 339,285 342,286 339,287 339,289')
      nP(
        'MT',
        '1045,610 1044,611 1046,613 1046,614 1045,615 1043,616 1043,617 1042,619 1044,623 1045,623 1046,624 1044,624 1044,625 1039,623 1037,624 1032,623 1030,624 1027,626 1025,626 1024,627 1020,622 1016,623 1014,625 1011,624 1011,625 1009,625 1006,626 1005,625 1000,625 999,624 998,622 997,622 995,624 992,625 \
992,627 990,632 987,632 985,630 982,630 980,629 973,629 969,627 968,629 965,629 964,631 962,634 962,636 963,639 961,640 959,638 958,636 955,635 952,633 951,633 951,631 950,629 951,626 949,624 949,622 946,620 948,617 947,612 945,611 945,609 944,607 943,605 937,601 936,601 932,603 931,604 930,601 926,599 \
924,597 921,591 922,590 923,590 924,589 924,585 923,582 924,581 922,580 921,579 920,578 920,576 918,576 916,575 916,573 915,572 915,569 912,567 909,563 909,561 906,558 906,552 904,550 903,547 904,544 904,542 904,541 900,541 902,535 901,534 899,533 896,533 896,531 895,529 895,528 892,527 892,526 890,527 \
889,528 890,529 889,530 887,532 885,535 883,536 882,538 880,539 878,540 875,539 875,542 874,544 870,546 869,546 868,544 865,542 864,540 862,538 860,538 858,537 856,538 857,534 856,532 860,529 859,528 860,526 858,523 857,522 856,520 859,516 860,513 861,514 863,513 865,513 866,511 865,508 864,507 865,504 \
865,502 861,501 861,499 860,498 862,496 862,493 861,491 859,490 859,488 859,487 862,487 863,486 863,481 861,479 864,476 865,467 866,466 867,464 865,459 868,457 869,456 869,450 870,447 870,445 867,444 863,445 861,447 857,446 853,447 851,444 851,443 852,442 849,438 848,438 845,441 842,440 843,436 842,435 \
839,434 837,432 835,432 832,428 833,424 834,423 831,422 829,419 827,418 826,417 824,413 821,410 820,407 819,407 817,405 811,400 809,394 808,394 804,393 803,392 798,391 797,390 795,387 792,384 790,383 788,381 783,379 783,378 784,377 789,377 790,376 790,375 787,374 786,371 784,370 787,365 786,363 784,361 \
784,356 782,355 781,352 778,351 777,347 776,345 774,344 772,342 768,337 766,333 765,332 765,313 765,288 764,246 846,246 886,246 1001,246 1056,246 1089,246 1165,246 1242,246 1307,246 1372,246 1437,246 1498,246 1499,276 1499,297 1499,330 1499,381 1499,387 1499,445 1499,454 1499,476 1499,505 1499,510 1499,567 \
1499,585 1498,585 1438,585 1435,585 1378,585 1364,585 1264,585 1241,585 1219,585 1147,585 1135,585 1111,585 1109,585 1070,585 1071,613 1071,630 1068,628 1066,627 1065,625 1063,623 1063,622 1060,621 1059,619 1060,617 1060,616 1057,615 1057,612 1056,612 1054,610 1054,608 1052,608 1051,606 1050,607 1050,610 \
1047,609'
      )
      nP('ME', '3679,638 3682,636 3681,633 3688,633 3693,641 3684,645 3683,651 3678,647')
      nP(
        'ME',
        '3594,663 3589,670 3593,690 3591,693 3590,691 3590,683 3588,680 3587,687 3582,689 3581,688 3581,683 3579,683 3571,687 3566,696 3567,706 3560,709 3558,718 3553,725 3548,726 3540,747 3531,744 3530,741 3531,735 3526,731 3525,729 3521,723 3521,721 3522,717 3521,715 3522,711 3522,709 3523,708 3522,707 3521,706 \
3520,687 3519,646 3518,613 3514,559 3522,556 3527,566 3529,561 3531,555 3530,552 3532,549 3542,552 3537,541 3547,529 3556,524 3555,518 3565,509 3566,505 3562,503 3564,495 3562,494 3567,488 3563,484 3569,472 3578,464 3580,452 3582,441 3628,377 3639,379 3640,393 3648,400 3672,390 3679,391 3683,385 3689,385 \
3716,410 3716,504 3718,507 3716,510 3718,515 3715,517 3715,527 3718,529 3720,527 3727,533 3737,535 3739,542 3733,544 3739,553 3735,561 3737,569 3743,574 3747,569 3754,572 3755,574 3760,588 3755,593 3766,599 3764,603 3752,614 3745,614 3740,611 3729,619 3726,624 3715,623 3712,624 3709,631 3705,630 3705,627 \
3704,629 3702,637 3698,637 3695,629 3688,628 3681,633 3677,630 3669,636 3671,645 3669,648 3658,640 3653,642 3653,635 3658,627 3657,623 3653,618 3653,613 3650,618 3654,621 3653,628 3644,633 3643,647 3641,649 3637,664 3628,674 3624,675 3621,668 3618,668 3612,679 3606,683 3601,682 3602,671 3604,667 3598,675 \
3596,679 3598,688 3596,690 3594,687 3593,667 3595,666'
      )
      nP('MA', '3544,888 3546,885 3547,889 3545,889 3549,890 3551,895 3536,896 3534,899 3529,895 3533,894 3534,897 3535,892 3540,886 3544,884')
      nP(
        'NE',
        '1660,1009 1621,1009 1621,980 1621,972 1621,950 1621,946 1621,924 1586,924 1584,924 1539,924 1528,924 1499,924 1498,891 1498,876 1498,865 1498,839 1498,787 1498,754 1532,755 1563,755 1576,755 1619,755 1671,756 1734,755 1775,755 1792,755 1838,755 1841,760 1845,761 1850,765 1858,768 1860,768 1861,770 1861,771 \
1867,774 1869,774 1871,774 1873,772 1875,769 1875,767 1880,766 1881,767 1883,768 1885,767 1888,768 1891,766 1895,767 1899,766 1900,767 1902,767 1906,766 1911,766 1913,767 1915,767 1916,768 1917,770 1920,772 1922,774 1929,775 1931,775 1932,776 1931,778 1932,778 1935,777 1941,780 1941,782 1942,782 1947,783 \
1948,784 1948,785 1947,787 1952,793 1952,795 1954,796 1955,795 1957,795 1961,798 1964,798 1967,800 1967,802 1965,804 1966,807 1965,810 1967,811 1968,814 1970,815 1971,817 1970,820 1969,821 1969,825 1973,829 1975,835 1976,837 1976,839 1978,840 1980,841 1982,842 1982,846 1981,847 1983,851 1986,857 1985,860 \
1985,862 1986,864 1983,865 1984,866 1985,869 1984,873 1986,875 1985,876 1986,879 1988,880 1991,879 1991,881 1990,882 1990,883 1994,884 1995,885 1995,891 1994,895 1998,899 1997,900 1996,898 1995,898 1996,905 1996,906 1996,908 1999,909 1999,910 1998,910 2000,915 1998,919 1999,921 1999,924 2001,926 2001,933 \
2001,935 2000,937 2000,942 1998,947 2005,954 2006,956 2005,959 2005,962 2007,964 2010,964 2010,961 2011,961 2012,962 2012,964 2010,965 2010,968 2013,975 2013,979 2014,980 2014,981 2013,982 2012,983 2016,983 2019,986 2023,990 2024,991 2024,994 2026,998 2028,999 2029,1001 2027,1002 2027,1005 2028,1005 \
2029,1007 2031,1007 2033,1009 2032,1010 2004,1009 1991,1009 1976,1009 1963,1009 1942,1009 1935,1009 1908,1009 1880,1009 1873,1009 1852,1009 1838,1009 1825,1009 1803,1009 1797,1009 1769,1009 1735,1009 1701,1009 1700,1009 1665,1009'
      )
      nP('MA', '3579,898 3580,897 3579,896 3575,899 3579,894 3578,891 3583,899 3583,903 3574,904 3568,901 3568,899 3575,901')
      nP(
        'NY',
        '2984,817 3003,804 3009,797 3022,791 3028,780 3039,772 3034,757 3038,753 3035,749 3027,747 3028,742 3027,732 3063,723 3092,723 3107,726 3117,734 3130,731 3158,731 3169,725 3170,727 3176,719 3186,712 3200,707 3203,701 3201,697 3199,684 3202,677 3206,675 3206,669 3201,664 3196,666 3192,661 3223,637 3229,626 \
3255,601 3277,589 3291,585 3335,586 3376,584 3376,586 3377,591 3374,598 3375,600 3377,602 3374,608 3375,612 3374,614 3375,616 3374,617 3375,621 3376,623 3377,623 3379,633 3379,635 3377,638 3379,648 3374,653 3374,655 3372,658 3372,661 3371,664 3371,666 3372,668 3372,671 3372,677 3374,679 3374,686 3375,688 \
3375,690 3375,694 3371,701 3372,705 3374,706 3375,702 3379,701 3379,702 3380,704 3379,706 3381,707 3383,711 3382,728 3380,760 3380,768 3379,771 3381,776 3376,796 3367,833 3368,835 3366,868 3365,880 3364,893 3364,899 3368,906 3353,916 3357,923 3357,924 3350,934 3349,938 3341,941 3336,949 3336,946 3338,941 \
3341,934 3342,930 3342,927 3342,924 3323,914 3321,912 3313,908 3293,894 3293,892 3291,890 3291,888 3290,888 3288,888 3283,886 3281,886 3281,885 3279,883 3277,883 3274,878 3273,876 3271,873 3271,872 3272,870 3271,863 3271,862 3271,859 3269,858 3269,856 3270,855 3268,853 3267,852 3266,852 3264,851 3259,850 \
3258,844 3255,843 3254,840 3252,839 3246,840 3207,839 3205,839 3179,839 3157,839 3155,839 3115,839 3107,840 3079,839 3073,839 3035,839 3027,839 2993,839 2984,839'
      )
      nP('NY', '3379,956 3379,955 3383,955 3394,952 3405,946 3411,944 3412,944 3412,945 3400,950 3395,952 3382,956')
      nP(
        'NY',
        '3351,959 3341,962 3351,957 3350,955 3346,954 3341,955 3343,959 3336,960 3334,955 3339,946 3342,941 3351,942 3351,937 3361,932 3368,934 3371,931 3384,933 3389,928 3396,927 3420,926 3439,911 3441,912 3437,915 3433,922 3425,927 3421,932 3429,931 3440,922 3446,921 3454,924 3463,917 3466,918 3463,922 3427,940 \
3371,953'
      )
      nP(
        'VT',
        '3381,776 3379,771 3380,768 3380,760 3382,728 3383,711 3381,707 3379,706 3380,704 3379,702 3379,701 3375,702 3374,706 3372,705 3371,701 3375,694 3375,690 3375,688 3374,686 3374,679 3372,677 3372,671 3372,668 3371,666 3371,664 3372,661 3372,658 3374,655 3374,653 3379,648 3377,638 3379,635 3379,633 3377,623 \
3376,623 3375,621 3374,617 3375,616 3374,614 3375,612 3374,608 3377,602 3375,600 3374,598 3377,591 3376,586 3376,584 3386,584 3425,584 3464,584 3489,584 3486,587 3488,590 3489,593 3484,600 3484,604 3481,607 3482,612 3484,614 3485,616 3486,619 3487,621 3483,623 3483,624 3484,625 3484,628 3482,629 3481,629 \
3480,630 3479,632 3478,634 3473,636 3471,637 3469,640 3468,640 3463,641 3462,642 3459,642 3456,644 3455,647 3456,650 3455,654 3456,656 3456,659 3455,661 3456,661 3456,663 3454,667 3453,669 3452,671 3451,672 3453,673 3451,675 3451,677 3448,680 3447,686 3446,690 3445,691 3442,692 3440,695 3438,704 3436,706 \
3434,711 3435,713 3434,720 3433,722 3434,725 3433,727 3434,728 3432,735 3431,741 3432,745 3431,748 3430,751 3430,755 3429,756 3428,757 3427,759 3426,762 3425,766 3425,771 3427,772 3427,774 3429,775 3430,776 3431,778 3402,777 3396,776'
      )
      nP(
        'OR',
        '435,840 384,839 326,839 309,839 290,840 266,839 257,831 253,818 252,803 255,792 254,786 245,769 249,758 255,732 254,729 262,716 265,703 269,682 272,647 275,613 274,601 278,582 281,560 280,544 283,542 285,545 287,542 282,537 283,525 280,519 281,511 279,505 284,499 280,483 291,491 292,488 290,484 293,482 \
296,486 299,485 308,480 318,488 321,488 325,488 327,486 329,484 333,485 337,487 342,491 346,493 348,498 352,505 352,508 353,511 353,513 353,517 354,520 354,523 355,530 359,531 361,533 367,534 374,537 379,537 383,539 386,538 396,535 401,532 403,531 406,530 408,527 413,525 416,526 419,526 430,524 435,526 \
436,526 440,525 443,526 445,527 449,528 450,529 451,533 452,534 455,533 458,530 460,529 464,530 465,530 468,531 471,528 481,525 483,523 485,522 489,522 493,526 496,526 506,524 511,524 514,520 519,519 524,516 531,514 534,513 543,513 546,509 549,507 553,509 558,507 561,507 566,506 574,507 576,506 583,503 \
586,500 646,500 647,500 670,500 677,500 712,500 713,502 716,508 720,513 721,515 725,515 728,519 734,521 736,525 736,528 739,533 739,537 734,543 733,546 727,556 726,563 723,573 721,576 720,576 720,578 719,581 716,583 716,585 716,587 717,587 716,589 717,592 715,596 713,598 712,599 710,604 704,606 703,610 \
702,611 699,621 698,622 698,624 695,626 694,628 693,630 694,633 692,637 694,641 694,644 694,645 696,648 698,648 700,647 701,647 702,649 704,650 705,649 707,649 708,651 708,653 712,655 713,657 710,662 709,662 708,663 711,668 709,673 709,676 708,678 708,680 708,682 706,682 706,683 705,684 705,687 705,691 \
705,697 706,840 634,840 566,840 563,840 524,840 470,840'
      )
      nP(
        'MN',
        '2252,712 2231,712 2208,712 2201,712 2173,712 2171,712 2144,712 2134,712 2115,712 2098,712 2085,712 2061,712 2057,712 2028,712 2024,712 1999,712 1987,712 1963,712 1963,682 1963,653 1963,624 1963,616 1963,602 1963,587 1963,561 1963,559 1962,557 1958,553 1954,551 1949,550 1946,546 1944,541 1939,535 1939,533 \
1940,530 1951,522 1954,516 1955,515 1956,506 1957,504 1956,498 1957,492 1956,485 1955,484 1955,482 1954,480 1954,471 1953,470 1951,470 1949,465 1947,464 1947,460 1946,458 1945,450 1944,449 1943,447 1942,442 1943,440 1943,435 1942,431 1944,428 1943,426 1945,422 1944,421 1943,421 1943,420 1942,419 1942,418 \
1941,418 1940,415 1940,414 1941,412 1940,408 1941,407 1940,402 1940,401 1940,395 1939,393 1940,390 1939,388 1940,386 1939,385 1940,383 1939,380 1938,380 1939,378 1938,376 1939,373 1938,371 1939,369 1938,367 1939,364 1937,363 1937,358 1934,355 1934,350 1932,348 1931,347 1931,345 1930,341 1928,341 1929,337 \
1927,334 1926,326 1924,324 1924,322 1922,320 1922,318 1921,318 1923,317 1921,316 1921,315 1921,314 1922,313 1923,313 1921,312 1923,311 1922,311 1922,308 1921,308 1923,307 1923,306 1922,305 1923,305 1922,304 1923,303 1921,303 1922,300 1921,300 1922,299 1921,298 1920,297 1922,296 1921,296 1920,295 1922,295 \
1922,293 1921,293 1922,286 1921,286 1921,285 1920,285 1920,284 1921,284 1919,283 1920,282 1920,281 1921,281 1921,278 1922,278 1922,277 1923,277 1924,273 1923,271 1923,270 1922,269 1922,267 1921,266 1921,264 1919,262 1920,262 1919,261 1919,259 1919,256 1917,251 1916,246 1966,246 2035,246 2042,246 2043,214 \
2062,217 2072,256 2071,264 2078,270 2087,270 2095,270 2099,275 2123,277 2125,286 2127,287 2143,285 2146,284 2146,280 2156,276 2169,277 2178,277 2191,285 2196,285 2197,288 2193,288 2192,291 2205,293 2208,296 2207,300 2213,312 2219,310 2217,305 2219,300 2228,299 2233,300 2237,309 2248,313 2253,314 2254,321 \
2262,321 2262,327 2282,323 2295,314 2305,309 2312,323 2323,320 2324,322 2349,321 2356,323 2359,328 2364,331 2373,328 2386,330 2381,331 2380,334 2358,345 2327,355 2295,376 2268,405 2248,421 2230,433 2222,443 2217,443 2218,444 2218,465 2218,487 2218,494 2215,495 2214,498 2213,499 2209,498 2207,502 2203,501 \
2202,504 2195,507 2192,509 2191,513 2190,514 2188,520 2185,523 2183,525 2181,530 2182,536 2184,537 2189,537 2191,538 2194,545 2195,546 2196,548 2196,551 2194,554 2192,558 2190,560 2189,567 2189,569 2190,572 2190,575 2187,579 2189,583 2189,585 2190,590 2189,592 2188,593 2189,597 2189,599 2186,606 2190,609 \
2197,615 2198,618 2204,621 2215,623 2216,624 2217,628 2220,631 2223,632 2230,634 2237,639 2239,641 2240,643 2240,645 2242,648 2245,653 2251,658 2257,664 2260,666 2262,667 2264,667 2271,671 2274,674 2279,683 2281,688 2281,693 2281,697 2282,704 2282,708 2283,712 2259,712'
      )
      nP(
        'NH',
        '3441,778 3431,778 3430,776 3429,775 3427,774 3427,772 3425,771 3425,766 3426,762 3427,759 3428,757 3429,756 3430,755 3430,751 3431,748 3432,745 3431,741 3432,735 3434,728 3433,727 3434,725 3433,722 3434,720 3435,713 3434,711 3436,706 3438,704 3440,695 3442,692 3445,691 3446,690 3447,686 3448,680 3451,677 \
3451,675 3453,673 3451,672 3452,671 3453,669 3454,667 3456,663 3456,661 3455,661 3456,659 3456,656 3455,654 3456,650 3455,647 3456,644 3459,642 3462,642 3463,641 3468,640 3469,640 3471,637 3473,636 3478,634 3479,632 3480,630 3481,629 3482,629 3484,628 3484,625 3483,624 3483,623 3487,621 3486,619 3485,616 \
3484,614 3482,612 3481,607 3484,604 3484,600 3489,593 3488,590 3486,587 3489,584 3489,580 3493,575 3495,568 3492,565 3496,565 3501,560 3510,565 3514,559 3518,613 3519,646 3520,687 3521,706 3522,707 3523,708 3522,709 3522,711 3521,715 3522,717 3521,721 3521,723 3525,729 3526,731 3531,735 3530,741 3531,744 \
3527,744 3527,746 3525,747 3526,749 3531,747 3536,749 3531,766 3529,766 3526,764 3524,764 3518,767 3516,771 3512,770 3508,771 3508,777 3505,776 3504,778 3502,780 3464,779 3463,779'
      )
      nP(
        'MA',
        '3500,859 3499,858 3498,855 3499,851 3499,850 3499,848 3496,849 3496,841 3496,838 3489,839 3471,839 3470,838 3453,837 3450,837 3427,837 3423,837 3421,837 3412,836 3411,839 3408,840 3408,836 3397,836 3394,836 3368,835 3367,833 3376,796 3381,776 3396,776 3402,777 3431,778 3441,778 3463,779 3464,779 3502,780 \
3504,778 3505,776 3508,777 3508,771 3512,770 3516,771 3518,767 3524,764 3526,764 3529,766 3531,766 3535,783 3544,784 3542,790 3531,793 3526,801 3522,803 3517,815 3524,819 3526,817 3530,817 3533,818 3539,826 3543,842 3548,845 3548,856 3555,861 3564,863 3560,864 3568,864 3580,858 3581,851 3575,839 3565,834 \
3572,833 3578,837 3583,847 3586,859 3583,867 3556,872 3554,876 3542,878 3540,877 3543,862 3529,871 3526,870 3519,880 3512,882 3511,869 3507,867 3506,864 3503,861'
      )
      nP(
        'IA',
        '2289,949 2289,951 2287,953 2283,954 2281,955 2274,958 2271,960 2271,962 2273,964 2274,966 2273,971 2274,975 2273,976 2271,976 2269,977 2267,976 2266,975 2264,974 2264,972 2264,970 2261,970 2261,968 2259,966 2259,964 2254,962 2254,960 2253,959 2251,957 2239,957 2224,958 2213,958 2196,959 2192,959 2168,959 \
2152,960 2140,960 2126,960 2112,960 2099,961 2084,960 2074,960 2057,960 2039,960 2029,959 2005,959 2006,956 2005,954 1998,947 2000,942 2000,937 2001,935 2001,933 2001,926 1999,924 1999,921 1998,919 2000,915 1998,910 1999,910 1999,909 1996,908 1996,906 1996,905 1995,898 1996,898 1997,900 1998,899 1994,895 \
1995,891 1995,885 1994,884 1990,883 1990,882 1991,881 1991,879 1988,880 1986,879 1985,876 1986,875 1984,873 1985,869 1984,866 1983,865 1986,864 1985,862 1985,860 1986,857 1983,851 1981,847 1982,846 1982,842 1980,841 1978,840 1976,839 1976,837 1975,835 1973,829 1969,825 1969,821 1970,820 1971,817 1970,815 \
1968,814 1967,811 1965,810 1966,807 1965,804 1967,802 1967,800 1964,798 1962,795 1961,791 1960,791 1961,790 1960,786 1958,783 1956,783 1953,779 1952,776 1952,773 1954,771 1955,768 1956,769 1957,767 1958,763 1958,762 1959,759 1959,756 1960,753 1959,750 1962,749 1963,748 1963,747 1963,744 1962,737 1961,736 \
1957,735 1956,734 1957,733 1956,732 1955,730 1958,728 1959,724 1959,722 1957,720 1955,718 1955,714 1954,712 1963,712 1987,712 1999,712 2024,712 2028,712 2057,712 2061,712 2085,712 2098,712 2115,712 2134,712 2144,712 2171,712 2173,712 2201,712 2208,712 2231,712 2252,712 2259,712 2283,712 2282,715 2284,719 \
2284,723 2286,724 2292,728 2293,731 2292,733 2287,742 2286,747 2287,748 2287,754 2288,761 2291,765 2292,773 2293,776 2297,779 2302,782 2303,782 2312,784 2315,785 2317,791 2319,792 2320,794 2319,796 2318,797 2318,799 2321,800 2323,804 2328,806 2331,809 2332,810 2332,817 2333,819 2335,821 2338,823 2344,826 \
2346,829 2347,829 2348,830 2347,834 2349,836 2349,841 2348,845 2346,856 2342,858 2339,860 2338,863 2337,869 2337,873 2336,874 2332,876 2331,878 2330,879 2325,880 2321,881 2317,885 2314,886 2310,886 2306,886 2300,888 2297,888 2295,888 2293,890 2292,896 2290,901 2290,904 2293,909 2295,910 2297,912 2299,915 \
2299,918 2299,928 2298,931 2294,934 2291,938 2291,944'
      )
      nP(
        'LA',
        '2131,1837 2132,1832 2130,1831 2128,1828 2128,1827 2129,1826 2128,1825 2129,1822 2130,1820 2132,1820 2131,1818 2132,1817 2131,1816 2131,1815 2131,1814 2131,1813 2129,1811 2130,1809 2130,1807 2132,1806 2133,1806 2132,1805 2132,1804 2132,1803 2133,1803 2134,1800 2137,1799 2137,1797 2137,1795 2137,1794 2139,1792 \
2139,1789 2141,1787 2140,1786 2140,1785 2141,1784 2140,1783 2140,1782 2140,1781 2141,1780 2141,1779 2142,1779 2142,1778 2142,1776 2141,1776 2141,1775 2139,1774 2140,1773 2139,1773 2140,1771 2141,1771 2143,1769 2142,1768 2143,1766 2141,1765 2141,1764 2140,1764 2140,1763 2142,1762 2141,1761 2141,1759 2142,1759 \
2141,1757 2142,1757 2141,1756 2139,1758 2138,1757 2137,1755 2138,1753 2137,1752 2137,1749 2136,1749 2135,1748 2134,1748 2133,1746 2133,1744 2135,1741 2134,1741 2134,1739 2132,1738 2132,1737 2132,1736 2132,1735 2131,1734 2132,1733 2130,1733 2128,1731 2130,1730 2131,1728 2130,1728 2129,1727 2128,1727 2127,1727 \
2125,1725 2124,1723 2123,1722 2123,1720 2124,1720 2124,1717 2125,1717 2125,1715 2126,1712 2125,1712 2124,1712 2125,1710 2123,1708 2124,1707 2123,1704 2121,1703 2121,1700 2120,1698 2120,1699 2119,1696 2118,1697 2118,1695 2117,1695 2115,1694 2115,1692 2113,1689 2113,1688 2111,1688 2111,1671 2111,1655 2111,1629 \
2111,1613 2111,1601 2125,1601 2143,1601 2145,1601 2160,1601 2176,1601 2192,1601 2232,1602 2269,1602 2270,1602 2281,1602 2287,1602 2287,1603 2284,1608 2284,1610 2286,1611 2288,1610 2289,1608 2289,1605 2290,1604 2291,1604 2292,1607 2292,1613 2288,1616 2287,1623 2288,1624 2291,1624 2293,1626 2288,1631 2288,1633 \
2290,1637 2293,1636 2294,1635 2295,1633 2296,1633 2297,1634 2297,1635 2295,1638 2293,1639 2292,1640 2293,1642 2297,1644 2297,1646 2295,1646 2294,1645 2291,1641 2289,1643 2289,1645 2293,1650 2295,1650 2297,1649 2299,1650 2298,1652 2296,1654 2297,1656 2298,1657 2302,1658 2304,1655 2302,1662 2301,1662 2298,1662 \
2298,1663 2298,1665 2298,1669 2294,1666 2293,1668 2291,1668 2290,1669 2290,1668 2287,1670 2286,1673 2287,1675 2290,1676 2292,1675 2293,1676 2294,1674 2293,1672 2295,1673 2296,1673 2296,1676 2294,1678 2292,1680 2293,1683 2291,1683 2289,1680 2288,1680 2288,1682 2291,1684 2292,1685 2292,1686 2290,1688 2287,1689 \
2284,1695 2282,1698 2280,1699 2282,1701 2281,1703 2280,1702 2279,1699 2278,1699 2276,1701 2275,1705 2274,1707 2276,1708 2281,1707 2280,1708 2279,1709 2274,1708 2274,1709 2273,1712 2273,1717 2272,1719 2269,1719 2266,1717 2266,1718 2266,1720 2266,1721 2271,1721 2272,1723 2271,1725 2268,1726 2266,1727 2266,1728 \
2266,1734 2268,1737 2268,1738 2267,1740 2266,1741 2265,1739 2264,1738 2264,1736 2263,1736 2262,1737 2262,1739 2264,1740 2263,1741 2263,1743 2266,1745 2266,1747 2265,1748 2263,1749 2258,1749 2257,1749 2258,1752 2260,1754 2260,1757 2259,1762 2262,1765 2263,1767 2262,1770 2258,1771 2258,1772 2286,1772 2293,1772 \
2307,1772 2324,1772 2325,1772 2337,1772 2342,1772 2368,1772 2374,1772 2375,1772 2374,1774 2375,1774 2374,1775 2373,1777 2374,1779 2373,1779 2373,1780 2373,1781 2372,1781 2372,1784 2371,1784 2372,1787 2370,1787 2370,1788 2369,1788 2368,1790 2369,1794 2368,1794 2369,1795 2368,1795 2367,1797 2368,1797 2367,1798 \
2367,1800 2368,1800 2367,1801 2369,1802 2370,1802 2369,1804 2371,1810 2372,1810 2373,1813 2374,1815 2375,1815 2375,1816 2376,1817 2377,1818 2378,1819 2378,1823 2379,1825 2379,1827 2380,1827 2381,1828 2381,1830 2380,1831 2380,1832 2381,1833 2381,1835 2382,1836 2382,1837 2384,1841 2374,1842 2372,1838 2361,1834 \
2353,1826 2343,1825 2339,1831 2332,1841 2334,1849 2341,1852 2351,1854 2358,1853 2364,1844 2370,1848 2374,1844 2375,1847 2378,1843 2379,1847 2375,1852 2367,1856 2369,1861 2375,1860 2375,1866 2381,1868 2383,1866 2384,1856 2392,1853 2391,1858 2396,1861 2393,1862 2394,1870 2393,1872 2397,1874 2393,1876 2389,1872 \
2386,1878 2379,1877 2383,1882 2382,1883 2388,1886 2390,1888 2382,1886 2378,1882 2376,1883 2380,1889 2374,1887 2373,1888 2375,1891 2372,1890 2386,1902 2386,1908 2395,1908 2398,1913 2403,1912 2403,1917 2407,1912 2411,1917 2412,1924 2417,1923 2413,1928 2418,1930 2415,1935 2411,1931 2412,1935 2409,1937 2410,1941 \
2404,1932 2403,1937 2395,1947 2403,1929 2399,1927 2398,1933 2395,1933 2395,1930 2390,1924 2391,1920 2389,1922 2381,1918 2382,1914 2370,1915 2373,1910 2369,1906 2369,1901 2360,1902 2359,1899 2357,1900 2351,1895 2349,1897 2348,1892 2345,1896 2347,1900 2356,1904 2354,1906 2356,1910 2354,1912 2356,1916 2351,1915 \
2353,1924 2355,1923 2353,1927 2344,1934 2342,1926 2343,1920 2341,1919 2340,1921 2337,1915 2334,1919 2333,1914 2330,1912 2329,1916 2320,1916 2322,1920 2320,1923 2318,1920 2319,1928 2316,1927 2316,1930 2310,1931 2311,1928 2306,1927 2304,1930 2301,1927 2308,1923 2308,1920 2303,1919 2301,1913 2292,1911 2290,1915 \
2284,1908 2281,1900 2270,1895 2263,1897 2263,1888 2257,1887 2259,1877 2244,1880 2243,1877 2245,1873 2246,1875 2246,1871 2237,1871 2237,1874 2227,1880 2228,1876 2223,1877 2232,1891 2217,1896 2198,1892 2160,1875 2130,1878 2125,1880 2119,1873 2126,1870 2128,1857 2131,1852 2131,1849 2131,1847 2132,1847 2132,1845 \
2133,1845 2132,1844 2132,1842 2131,1842 2131,1838'
      )
      nP(
        'AR',
        '2085,1501 2086,1475 2086,1455 2086,1439 2087,1399 2085,1379 2083,1369 2080,1339 2079,1334 2076,1308 2075,1307 2108,1307 2122,1307 2138,1307 2154,1307 2156,1307 2183,1307 2188,1307 2203,1307 2227,1307 2228,1307 2255,1307 2269,1307 2271,1307 2288,1307 2309,1307 2322,1307 2344,1306 2349,1307 2349,1309 2351,1310 \
2350,1312 2351,1314 2353,1315 2355,1316 2355,1317 2354,1321 2355,1323 2354,1325 2351,1326 2350,1330 2348,1332 2344,1334 2344,1335 2343,1337 2342,1338 2340,1338 2338,1340 2335,1349 2340,1349 2360,1349 2375,1348 2375,1351 2378,1354 2379,1356 2379,1357 2378,1358 2375,1356 2374,1355 2372,1357 2372,1358 2373,1359 \
2376,1362 2376,1363 2374,1365 2372,1364 2371,1365 2370,1367 2368,1369 2366,1370 2363,1369 2361,1371 2361,1373 2362,1376 2364,1377 2366,1376 2367,1378 2366,1380 2365,1379 2360,1382 2360,1384 2363,1387 2362,1388 2361,1388 2360,1388 2358,1385 2356,1386 2355,1387 2355,1390 2358,1395 2355,1398 2354,1398 2353,1397 \
2353,1393 2353,1392 2352,1393 2349,1396 2347,1397 2347,1400 2349,1401 2350,1398 2351,1398 2353,1398 2353,1399 2352,1401 2351,1402 2352,1404 2351,1406 2348,1407 2347,1409 2348,1411 2351,1411 2352,1411 2354,1415 2353,1417 2354,1419 2354,1421 2353,1422 2349,1421 2348,1422 2347,1424 2347,1426 2346,1430 2340,1429 \
2339,1433 2339,1435 2343,1437 2343,1438 2343,1440 2341,1442 2340,1443 2339,1445 2339,1446 2338,1446 2337,1445 2333,1447 2332,1447 2331,1447 2332,1444 2331,1443 2329,1443 2329,1445 2330,1448 2329,1450 2330,1453 2330,1455 2328,1456 2327,1456 2326,1454 2327,1453 2327,1451 2326,1450 2326,1449 2324,1451 2325,1457 \
2326,1458 2329,1458 2329,1461 2327,1464 2325,1464 2324,1463 2325,1460 2323,1458 2322,1463 2322,1465 2322,1467 2325,1471 2325,1472 2323,1473 2322,1474 2322,1476 2323,1479 2322,1481 2321,1484 2318,1487 2318,1490 2316,1491 2316,1487 2316,1486 2312,1486 2311,1487 2312,1491 2311,1494 2309,1492 2308,1492 2307,1494 \
2307,1498 2305,1499 2301,1497 2301,1498 2301,1501 2307,1502 2308,1504 2307,1505 2306,1505 2301,1502 2299,1505 2300,1507 2302,1509 2305,1509 2304,1514 2300,1515 2298,1517 2298,1518 2299,1520 2299,1521 2297,1521 2296,1519 2295,1519 2292,1517 2291,1518 2292,1520 2295,1523 2293,1529 2293,1531 2295,1533 2297,1535 \
2298,1536 2297,1537 2295,1538 2294,1537 2293,1536 2290,1537 2288,1537 2288,1541 2289,1542 2290,1543 2293,1542 2294,1543 2294,1545 2291,1546 2289,1545 2287,1542 2284,1543 2283,1544 2284,1546 2287,1549 2287,1550 2286,1554 2285,1554 2283,1553 2283,1556 2284,1557 2285,1558 2286,1559 2284,1563 2283,1564 2282,1565 \
2285,1565 2286,1563 2286,1560 2287,1559 2289,1561 2289,1563 2289,1564 2289,1565 2284,1567 2284,1568 2285,1569 2288,1570 2291,1568 2291,1563 2292,1563 2293,1564 2293,1566 2292,1568 2290,1569 2289,1572 2288,1575 2289,1580 2290,1582 2292,1578 2293,1578 2294,1579 2293,1582 2291,1584 2291,1589 2291,1590 2289,1592 \
2286,1590 2285,1591 2285,1593 2288,1595 2289,1597 2289,1599 2287,1599 2287,1601 2287,1602 2281,1602 2270,1602 2269,1602 2232,1602 2192,1601 2176,1601 2160,1601 2145,1601 2143,1601 2125,1601 2111,1601 2111,1580 2111,1556 2109,1554 2108,1553 2107,1554 2104,1555 2103,1552 2101,1553 2100,1555 2099,1555 2100,1553 \
2099,1552 2096,1555 2097,1553 2096,1553 2095,1554 2095,1555 2093,1554 2090,1556 2089,1555 2090,1554 2091,1553 2090,1552 2089,1554 2088,1554 2087,1552 2086,1552 2086,1551 2086,1550 2087,1549 2084,1549 2085,1523'
      )
      nP('LA', '2234,1891 2241,1887 2250,1893 2254,1893 2250,1897 2250,1900 2245,1901')
      nP(
        'LA',
        '2301,1920 2298,1921 2299,1919 2298,1919 2298,1923 2300,1923 2299,1926 2296,1926 2297,1923 2294,1924 2295,1919 2292,1921 2293,1926 2289,1923 2289,1917 2296,1917 2297,1915'
      )
      nP('LA', '2276,1913 2278,1915 2283,1910 2285,1917 2287,1915 2286,1918 2285,1918 2284,1916 2285,1919 2287,1919 2287,1921 2288,1920 2289,1923 2280,1920')
      nP(
        'NM',
        '1193,1650 1193,1621 1193,1585 1193,1536 1193,1468 1193,1437 1193,1349 1193,1264 1234,1263 1289,1264 1293,1264 1325,1263 1327,1264 1351,1264 1380,1264 1397,1264 1428,1264 1432,1264 1502,1264 1558,1263 1563,1264 1563,1306 1561,1307 1561,1343 1561,1370 1562,1380 1561,1418 1561,1436 1561,1455 1561,1492 1561,1533 \
1561,1555 1560,1571 1560,1607 1559,1644 1559,1680 1559,1687 1543,1687 1518,1687 1503,1687 1501,1687 1450,1687 1445,1687 1379,1687 1356,1687 1341,1687 1340,1689 1341,1690 1341,1695 1340,1696 1342,1701 1342,1703 1346,1706 1301,1706 1245,1706 1244,1743 1193,1743'
      )
      nP(
        'MS',
        '2452,1735 2453,1762 2454,1772 2455,1795 2456,1824 2456,1827 2452,1830 2445,1825 2438,1828 2427,1821 2423,1822 2426,1823 2402,1830 2402,1826 2398,1825 2397,1826 2399,1830 2393,1835 2392,1840 2384,1841 2382,1837 2382,1836 2381,1835 2381,1833 2380,1832 2380,1831 2381,1830 2381,1828 2380,1827 2379,1827 2379,1825 \
2378,1823 2378,1819 2377,1818 2376,1817 2375,1816 2375,1815 2374,1815 2373,1813 2372,1810 2371,1810 2369,1804 2370,1802 2369,1802 2368,1800 2367,1801 2367,1800 2367,1798 2368,1797 2367,1797 2368,1795 2369,1795 2368,1794 2369,1794 2368,1790 2369,1788 2370,1788 2370,1787 2372,1787 2371,1784 2372,1784 2372,1781 \
2373,1781 2373,1780 2373,1779 2374,1779 2373,1777 2374,1775 2375,1774 2374,1774 2375,1772 2374,1772 2368,1772 2342,1772 2337,1772 2325,1772 2324,1772 2307,1772 2293,1772 2286,1772 2258,1772 2258,1771 2262,1770 2263,1767 2262,1765 2259,1762 2260,1757 2260,1754 2258,1752 2257,1749 2258,1749 2263,1749 2265,1748 \
2266,1747 2266,1745 2263,1743 2263,1741 2264,1740 2262,1739 2262,1737 2263,1736 2264,1736 2264,1738 2265,1739 2266,1741 2267,1740 2268,1738 2268,1737 2266,1734 2266,1728 2266,1727 2268,1726 2271,1725 2272,1723 2271,1721 2266,1721 2266,1720 2266,1718 2266,1717 2269,1719 2272,1719 2273,1717 2273,1712 2274,1709 \
2274,1708 2276,1708 2279,1709 2280,1708 2281,1707 2274,1707 2275,1705 2276,1701 2278,1699 2279,1699 2280,1702 2281,1703 2282,1701 2280,1699 2282,1698 2284,1695 2287,1689 2290,1688 2292,1686 2292,1685 2291,1684 2288,1682 2288,1680 2289,1680 2291,1683 2293,1683 2292,1680 2294,1678 2296,1676 2296,1673 2295,1673 \
2293,1672 2294,1674 2293,1676 2292,1675 2290,1676 2287,1675 2286,1673 2287,1670 2290,1668 2290,1669 2291,1668 2293,1668 2294,1666 2298,1669 2298,1665 2298,1663 2298,1662 2301,1662 2302,1662 2304,1655 2302,1658 2298,1657 2297,1656 2296,1654 2298,1652 2299,1650 2297,1649 2295,1650 2293,1650 2289,1645 2289,1643 \
2291,1641 2294,1645 2295,1646 2297,1646 2297,1644 2293,1642 2292,1640 2293,1639 2295,1638 2297,1635 2297,1634 2296,1633 2295,1633 2294,1635 2293,1636 2290,1637 2288,1633 2288,1631 2293,1626 2291,1624 2288,1624 2287,1623 2288,1616 2292,1613 2292,1607 2291,1604 2290,1604 2289,1605 2289,1608 2288,1610 2286,1611 \
2284,1610 2284,1608 2287,1603 2287,1602 2287,1601 2287,1599 2289,1599 2289,1597 2288,1595 2285,1593 2285,1591 2286,1590 2289,1592 2291,1590 2291,1589 2291,1584 2293,1582 2294,1579 2293,1578 2292,1578 2290,1582 2289,1580 2288,1575 2289,1572 2290,1569 2292,1568 2293,1566 2293,1564 2292,1563 2291,1563 2291,1568 \
2288,1570 2285,1569 2284,1568 2284,1567 2289,1565 2289,1564 2289,1563 2289,1561 2287,1559 2286,1560 2286,1563 2285,1565 2282,1565 2283,1564 2284,1563 2286,1559 2285,1558 2284,1557 2283,1556 2283,1553 2285,1554 2286,1554 2287,1550 2287,1549 2284,1546 2283,1544 2284,1543 2287,1542 2289,1545 2291,1546 2294,1545 \
2294,1543 2293,1542 2290,1543 2289,1542 2288,1541 2288,1537 2290,1537 2293,1536 2294,1537 2295,1538 2297,1537 2298,1536 2297,1535 2295,1533 2293,1531 2293,1529 2295,1523 2292,1520 2291,1518 2292,1517 2295,1519 2296,1519 2297,1521 2299,1521 2299,1520 2298,1518 2298,1517 2300,1515 2304,1514 2305,1509 2302,1509 \
2300,1507 2299,1505 2301,1502 2306,1505 2307,1505 2308,1504 2307,1502 2301,1501 2301,1498 2301,1497 2305,1499 2307,1498 2307,1494 2308,1492 2309,1492 2311,1494 2312,1491 2311,1487 2312,1486 2316,1486 2316,1487 2316,1491 2318,1490 2318,1487 2321,1484 2322,1481 2323,1479 2322,1476 2322,1474 2323,1473 2325,1472 \
2325,1471 2322,1467 2322,1465 2322,1463 2323,1458 2325,1460 2324,1463 2325,1464 2327,1464 2329,1461 2329,1458 2326,1458 2325,1457 2324,1451 2326,1449 2326,1450 2327,1451 2327,1453 2326,1454 2327,1456 2328,1456 2330,1455 2330,1453 2329,1450 2330,1448 2329,1445 2329,1443 2331,1443 2332,1444 2331,1447 2332,1447 \
2333,1447 2337,1445 2338,1446 2339,1446 2339,1445 2340,1443 2341,1442 2343,1440 2343,1438 2343,1437 2339,1435 2339,1433 2375,1433 2379,1433 2398,1433 2407,1433 2419,1433 2430,1433 2432,1433 2457,1433 2459,1433 2468,1433 2471,1439 2473,1442 2475,1442 2472,1469 2471,1478 2470,1490 2468,1510 2468,1513 2465,1540 \
2463,1557 2461,1578 2459,1604 2459,1609 2456,1638 2454,1661 2453,1668 2451,1697 2452,1713'
      )
      nP(
        'AL',
        '2659,1689 2656,1695 2655,1700 2655,1706 2656,1706 2656,1710 2656,1712 2657,1714 2660,1720 2661,1725 2661,1728 2659,1732 2660,1735 2658,1741 2658,1744 2659,1747 2657,1749 2658,1753 2657,1756 2658,1758 2659,1759 2661,1762 2662,1766 2663,1772 2634,1772 2600,1773 2591,1773 2579,1773 2559,1773 2555,1773 2531,1772 \
2505,1772 2505,1776 2503,1783 2504,1785 2508,1791 2509,1794 2513,1797 2516,1798 2517,1801 2517,1805 2515,1810 2514,1812 2516,1816 2516,1820 2513,1827 2505,1830 2505,1834 2493,1837 2480,1837 2494,1834 2495,1832 2486,1821 2485,1804 2479,1794 2472,1829 2460,1823 2456,1824 2455,1795 2454,1772 2453,1762 2452,1735 \
2452,1713 2451,1697 2453,1668 2454,1661 2456,1638 2459,1609 2459,1604 2461,1578 2463,1557 2465,1540 2468,1513 2468,1510 2470,1490 2471,1478 2472,1469 2475,1442 2473,1442 2471,1439 2468,1433 2468,1432 2481,1432 2504,1432 2528,1432 2529,1432 2551,1433 2555,1433 2583,1433 2584,1433 2610,1434 2626,1434 2628,1445 \
2631,1465 2631,1468 2632,1474 2635,1493 2638,1511 2639,1521 2640,1526 2643,1547 2645,1561 2646,1567 2649,1592 2649,1593 2652,1614 2654,1619 2656,1622 2655,1623 2656,1624 2657,1625 2657,1629 2658,1630 2657,1633 2658,1634 2658,1636 2659,1638 2664,1644 2664,1649 2666,1651 2665,1654 2664,1655 2665,1656 2663,1658 \
2663,1660 2668,1663 2670,1665 2670,1666 2669,1666 2668,1667 2669,1668 2668,1669 2665,1670 2666,1671 2663,1672 2662,1673 2660,1677 2661,1680 2660,1682 2660,1683 2660,1686'
      )
      nP(
        'GA',
        '2656,1706 2655,1706 2655,1700 2656,1695 2659,1689 2660,1686 2660,1683 2660,1682 2661,1680 2660,1677 2662,1673 2663,1672 2666,1671 2665,1670 2668,1669 2669,1668 2668,1667 2669,1666 2670,1666 2670,1665 2668,1663 2663,1660 2663,1658 2665,1656 2664,1655 2665,1654 2666,1651 2664,1649 2664,1644 2659,1638 2658,1636 \
2658,1634 2657,1633 2658,1630 2657,1629 2657,1625 2656,1624 2655,1623 2656,1622 2654,1619 2652,1614 2649,1593 2649,1592 2646,1567 2645,1561 2643,1547 2640,1526 2639,1521 2638,1511 2635,1493 2632,1474 2631,1468 2631,1465 2628,1445 2626,1434 2635,1434 2641,1434 2647,1434 2665,1434 2676,1434 2677,1434 2687,1434 \
2705,1434 2717,1434 2725,1434 2728,1434 2752,1434 2754,1434 2779,1433 2780,1434 2779,1437 2778,1436 2778,1437 2779,1438 2778,1438 2777,1439 2776,1439 2776,1440 2775,1441 2773,1443 2772,1442 2772,1444 2771,1443 2771,1445 2770,1446 2770,1447 2769,1447 2769,1449 2767,1450 2766,1451 2766,1454 2764,1456 2764,1458 \
2765,1460 2768,1462 2771,1466 2776,1467 2776,1469 2777,1470 2779,1473 2781,1474 2782,1476 2785,1478 2787,1477 2792,1477 2794,1479 2795,1483 2796,1486 2797,1489 2799,1493 2800,1494 2801,1498 2802,1500 2802,1503 2807,1509 2810,1515 2810,1517 2812,1521 2815,1524 2819,1528 2821,1530 2823,1530 2825,1532 2828,1535 \
2828,1536 2831,1538 2833,1544 2834,1545 2835,1550 2837,1551 2838,1552 2840,1552 2843,1554 2845,1556 2846,1557 2847,1559 2848,1561 2851,1563 2852,1564 2851,1566 2852,1567 2851,1568 2851,1571 2850,1571 2851,1573 2852,1573 2852,1575 2853,1574 2854,1577 2855,1576 2857,1577 2855,1578 2858,1580 2857,1580 2857,1581 \
2856,1582 2859,1584 2859,1585 2860,1584 2861,1585 2862,1586 2861,1588 2863,1590 2865,1592 2871,1595 2872,1597 2874,1598 2875,1599 2876,1599 2877,1602 2878,1602 2878,1606 2877,1606 2877,1607 2879,1611 2880,1611 2879,1613 2880,1614 2880,1616 2882,1616 2882,1617 2882,1618 2882,1619 2882,1621 2883,1623 2882,1624 \
2883,1625 2882,1628 2883,1629 2884,1632 2883,1634 2885,1637 2886,1638 2887,1638 2887,1639 2890,1639 2891,1640 2892,1642 2894,1643 2896,1648 2896,1652 2897,1655 2897,1656 2898,1659 2899,1658 2900,1659 2900,1664 2899,1666 2899,1668 2901,1671 2901,1678 2902,1679 2915,1687 2910,1692 2910,1697 2900,1699 2897,1696 \
2895,1696 2896,1694 2893,1696 2891,1692 2895,1694 2895,1697 2899,1700 2906,1703 2904,1706 2900,1711 2897,1705 2896,1706 2897,1710 2890,1705 2900,1718 2897,1721 2893,1718 2893,1725 2896,1730 2895,1733 2889,1744 2886,1743 2883,1746 2884,1750 2884,1747 2890,1749 2889,1752 2885,1760 2876,1761 2876,1765 2879,1769 \
2875,1766 2878,1774 2876,1776 2878,1777 2876,1784 2878,1793 2876,1796 2875,1797 2871,1796 2870,1795 2869,1795 2864,1794 2863,1792 2862,1792 2861,1793 2859,1790 2855,1789 2853,1787 2853,1788 2850,1787 2850,1788 2849,1790 2848,1791 2846,1790 2846,1792 2845,1793 2844,1802 2846,1806 2847,1809 2846,1817 2845,1820 \
2844,1820 2845,1825 2844,1826 2837,1827 2836,1826 2834,1821 2835,1816 2834,1815 2832,1812 2833,1809 2822,1808 2819,1808 2811,1807 2804,1807 2778,1804 2767,1803 2749,1802 2741,1801 2725,1800 2720,1800 2707,1799 2702,1798 2672,1797 2670,1794 2669,1793 2668,1791 2668,1789 2668,1785 2667,1781 2665,1779 2665,1775 \
2663,1774 2663,1772 2662,1766 2661,1762 2659,1759 2658,1758 2657,1756 2658,1753 2657,1749 2659,1747 2658,1744 2658,1741 2660,1735 2659,1732 2661,1728 2661,1725 2660,1720 2657,1714 2656,1712 2656,1710'
      )
      nP(
        'SC',
        '2862,1586 2861,1585 2860,1584 2859,1585 2859,1584 2856,1582 2857,1581 2857,1580 2858,1580 2855,1578 2857,1577 2855,1576 2854,1577 2853,1574 2852,1575 2852,1573 2851,1573 2850,1571 2851,1571 2851,1568 2852,1567 2851,1566 2852,1564 2851,1563 2848,1561 2847,1559 2846,1557 2845,1556 2843,1554 2840,1552 2838,1552 \
2837,1551 2835,1550 2834,1545 2833,1544 2831,1538 2828,1536 2828,1535 2825,1532 2823,1530 2821,1530 2819,1528 2815,1524 2812,1521 2810,1517 2810,1515 2807,1509 2802,1503 2802,1500 2801,1498 2800,1494 2799,1493 2797,1489 2796,1486 2795,1483 2794,1479 2792,1477 2787,1477 2785,1478 2782,1476 2781,1474 2779,1473 \
2777,1470 2776,1469 2776,1467 2771,1466 2768,1462 2765,1460 2764,1458 2764,1456 2766,1454 2766,1451 2767,1450 2769,1449 2769,1447 2770,1447 2770,1446 2771,1445 2771,1443 2772,1444 2772,1442 2773,1443 2775,1441 2776,1440 2776,1439 2777,1439 2778,1438 2779,1438 2778,1437 2778,1436 2779,1437 2780,1434 2779,1433 \
2785,1431 2793,1428 2800,1426 2804,1425 2805,1425 2805,1423 2807,1423 2812,1420 2815,1420 2818,1418 2820,1419 2823,1415 2824,1418 2825,1418 2825,1417 2827,1417 2830,1417 2834,1417 2849,1417 2855,1418 2861,1418 2886,1419 2888,1419 2905,1420 2905,1422 2906,1424 2904,1427 2906,1430 2913,1424 2915,1428 2918,1433 \
2921,1438 2920,1449 2935,1449 2949,1449 2974,1449 2988,1450 2990,1450 3003,1464 3003,1465 3026,1492 3051,1522 3056,1528 3053,1529 3056,1530 3039,1542 3030,1554 3023,1566 3021,1576 3021,1574 3014,1578 3018,1587 3016,1591 3009,1590 3012,1591 3013,1594 3005,1602 2995,1601 2993,1604 2994,1609 2993,1611 2984,1620 \
2975,1620 2981,1609 2975,1615 2973,1610 2972,1611 2972,1619 2976,1625 2976,1630 2969,1636 2956,1640 2951,1645 2948,1644 2945,1632 2944,1631 2945,1645 2940,1644 2936,1640 2936,1644 2930,1644 2930,1645 2940,1651 2942,1656 2941,1661 2931,1664 2928,1663 2924,1657 2920,1647 2921,1645 2918,1644 2916,1642 2919,1654 \
2921,1666 2915,1682 2902,1679 2901,1678 2901,1671 2899,1668 2899,1666 2900,1664 2900,1659 2899,1658 2898,1659 2897,1656 2897,1655 2896,1652 2896,1648 2894,1643 2892,1642 2891,1640 2890,1639 2887,1639 2887,1638 2886,1638 2885,1637 2883,1634 2884,1632 2883,1629 2882,1628 2883,1625 2882,1624 2883,1623 2882,1621 \
2882,1619 2882,1618 2882,1617 2882,1616 2880,1616 2880,1614 2879,1613 2880,1611 2879,1611 2877,1607 2877,1606 2878,1606 2878,1602 2877,1602 2876,1599 2875,1599 2874,1598 2872,1597 2871,1595 2865,1592 2863,1590 2861,1588'
      )
      nP('GA', '2878,1781 2883,1775 2883,1778 2880,1796 2879,1795 2879,1784 2877,1782')
      nP('FL', '2954,2251 2947,2268 2933,2285 2948,2263 2949,2259 2947,2256')
      nP('MI', '2449,391 2453,385 2467,377 2493,375 2498,380 2496,382 2485,385 2466,398 2455,416 2451,406 2444,404 2444,395')
      nP('MI', '2450,316 2442,328 2425,334 2417,343 2410,345 2407,344 2407,340 2409,336')
      nP(
        'MI',
        '2611,503 2608,504 2607,507 2598,503 2586,505 2583,508 2581,514 2574,520 2570,521 2570,523 2567,525 2564,532 2560,530 2560,526 2567,516 2556,515 2547,524 2534,526 2525,538 2521,549 2506,571 2505,576 2500,573 2497,570 2496,568 2497,567 2497,565 2498,564 2498,562 2502,555 2502,554 2499,552 2495,555 2491,554 \
2490,555 2488,553 2488,554 2487,554 2489,550 2489,547 2491,545 2493,542 2492,539 2491,537 2493,537 2494,534 2494,533 2491,529 2491,528 2493,527 2494,527 2492,525 2492,524 2490,524 2488,521 2482,520 2481,517 2477,518 2475,518 2472,515 2473,514 2476,511 2474,509 2474,507 2473,506 2471,505 2469,504 2467,504 \
2464,503 2462,503 2460,503 2457,500 2455,501 2452,500 2450,500 2450,499 2449,498 2447,498 2445,499 2444,499 2442,501 2441,501 2439,498 2437,498 2436,497 2433,498 2433,497 2432,497 2431,498 2423,494 2420,491 2413,488 2362,474 2351,471 2351,469 2349,467 2348,462 2345,457 2342,457 2341,456 2339,455 2339,454 \
2339,453 2334,454 2333,452 2357,442 2365,435 2371,430 2395,428 2406,422 2411,415 2419,415 2423,413 2426,406 2442,396 2442,404 2449,406 2449,412 2453,416 2453,421 2451,427 2453,432 2469,420 2468,424 2478,423 2486,423 2501,429 2518,457 2534,457 2541,455 2549,462 2556,459 2563,464 2574,452 2593,443 2596,444 \
2611,441 2633,443 2649,436 2666,435 2662,441 2662,453 2660,457 2662,460 2668,459 2676,462 2686,459 2690,465 2699,459 2706,459 2714,479 2708,482 2710,485 2717,485 2723,489 2721,492 2725,498 2731,500 2730,503 2718,502 2703,500 2694,502 2687,497 2683,497 2680,512 2673,509 2660,498 2640,492 2632,491 2623,502 \
'
      )
      nP(
        'MI',
        '2551,859 2565,847 2572,829 2579,818 2585,803 2589,774 2586,744 2574,714 2569,698 2575,689 2578,689 2576,688 2576,685 2574,674 2576,674 2571,665 2579,654 2586,640 2588,625 2587,610 2596,607 2597,604 2596,597 2598,593 2615,586 2626,568 2629,570 2624,588 2624,604 2631,605 2636,597 2640,584 2640,567 2641,562 \
2645,558 2658,553 2664,553 2668,550 2658,545 2656,536 2659,531 2665,527 2665,522 2680,519 2696,529 2705,528 2712,531 2716,536 2718,543 2729,543 2738,550 2742,550 2750,555 2755,554 2756,557 2762,562 2760,563 2761,567 2767,576 2759,580 2759,584 2757,585 2760,591 2766,597 2769,610 2766,626 2764,641 2753,647 \
2751,655 2749,664 2743,670 2732,673 2730,677 2728,695 2743,704 2746,703 2753,693 2756,695 2757,691 2763,683 2766,675 2789,664 2798,667 2802,672 2809,688 2810,696 2816,740 2821,757 2818,763 2818,775 2815,786 2807,786 2808,783 2802,782 2797,785 2798,787 2793,797 2793,800 2790,809 2779,814 2774,829 2774,836 \
2756,863 2739,863 2733,863 2703,864 2701,864 2676,865 2676,860 2674,859 2652,859 2645,859 2623,859 2615,859 2598,859 2588,859 2570,859'
      )
      nP('MI', '2734,499 2737,501 2740,498 2745,497 2744,494 2741,493 2746,491 2750,492 2753,499 2757,501 2754,506 2750,507 2747,504 2737,505 2734,500 2732,502')
      nP(
        'FL',
        '2921,1960 2923,1964 2918,1960 2917,1960 2924,1993 2939,2038 2938,2042 2940,2040 2945,2052 2947,2065 2955,2089 2958,2096 2956,2093 2952,2091 2949,2091 2951,2094 2956,2094 2960,2102 2964,2114 2962,2114 2966,2129 2964,2169 2961,2198 2957,2217 2951,2229 2949,2240 2951,2247 2944,2260 2943,2265 2935,2263 2927,2268 \
2917,2266 2910,2270 2901,2270 2899,2267 2897,2258 2899,2254 2907,2263 2911,2264 2913,2260 2910,2254 2899,2248 2892,2224 2896,2221 2892,2213 2876,2204 2864,2203 2865,2196 2859,2187 2858,2172 2856,2168 2855,2159 2850,2157 2849,2153 2851,2151 2854,2142 2861,2136 2853,2140 2850,2150 2846,2152 2842,2136 2843,2131 \
2844,2123 2841,2118 2847,2115 2848,2109 2847,2109 2846,2114 2838,2117 2831,2111 2830,2110 2831,2112 2836,2119 2838,2129 2829,2124 2825,2116 2826,2120 2824,2116 2823,2112 2816,2092 2814,2090 2815,2094 2812,2088 2814,2084 2812,2079 2805,2071 2808,2069 2806,2070 2805,2067 2817,2071 2815,2068 2821,2067 2812,2068 \
2808,2066 2812,2065 2813,2062 2809,2065 2814,2060 2813,2057 2822,2045 2823,2035 2819,2032 2817,2042 2816,2041 2814,2032 2807,2024 2807,2026 2804,2023 2806,2026 2804,2029 2808,2030 2803,2032 2812,2037 2809,2040 2808,2051 2805,2052 2798,2041 2802,2051 2802,2053 2795,2039 2799,2012 2806,1990 2808,1968 2805,1958 \
2808,1958 2808,1952 2801,1941 2798,1929 2784,1927 2781,1919 2777,1917 2779,1914 2775,1913 2771,1905 2763,1898 2761,1885 2752,1879 2746,1865 2726,1851 2720,1849 2716,1850 2710,1848 2703,1851 2703,1859 2698,1858 2698,1861 2704,1862 2703,1865 2696,1863 2672,1879 2668,1876 2664,1881 2650,1882 2641,1884 2638,1876 \
2638,1869 2639,1868 2639,1875 2642,1883 2645,1882 2645,1873 2640,1864 2625,1849 2629,1849 2635,1855 2638,1855 2637,1853 2640,1855 2640,1854 2639,1852 2635,1853 2631,1846 2620,1842 2623,1836 2627,1836 2629,1831 2620,1835 2617,1832 2611,1833 2613,1837 2617,1838 2619,1846 2603,1834 2579,1824 2571,1822 2579,1823 \
2588,1823 2588,1821 2595,1824 2595,1821 2589,1816 2579,1818 2575,1815 2565,1821 2554,1822 2529,1827 2545,1818 2540,1814 2542,1807 2540,1807 2537,1819 2534,1809 2531,1810 2531,1818 2524,1827 2515,1830 2516,1823 2520,1821 2520,1818 2516,1816 2514,1812 2515,1810 2517,1805 2517,1801 2516,1798 2513,1797 2509,1794 \
2508,1791 2504,1785 2503,1783 2505,1776 2505,1772 2531,1772 2555,1773 2559,1773 2579,1773 2591,1773 2600,1773 2634,1772 2663,1772 2663,1774 2665,1775 2665,1779 2667,1781 2668,1785 2668,1789 2668,1791 2669,1793 2670,1794 2672,1797 2702,1798 2707,1799 2720,1800 2725,1800 2741,1801 2749,1802 2767,1803 2778,1804 \
2804,1807 2811,1807 2819,1808 2822,1808 2833,1809 2832,1812 2834,1815 2835,1816 2834,1821 2836,1826 2837,1827 2844,1826 2845,1825 2844,1820 2845,1820 2846,1817 2847,1809 2846,1806 2844,1802 2845,1793 2846,1792 2846,1790 2848,1791 2849,1790 2850,1788 2850,1787 2853,1788 2853,1787 2855,1789 2859,1790 2861,1793 \
2862,1792 2863,1792 2864,1794 2869,1795 2870,1795 2871,1796 2875,1797 2876,1796 2878,1806 2876,1810 2880,1819 2879,1825 2881,1827 2882,1836 2890,1865 2889,1872 2893,1879 2894,1885 2901,1906 2902,1912'
      )
      nP('FL', '2924,1960 2921,1957 2919,1951 2915,1941 2913,1936 2914,1937 2916,1943')
      nP('FL', '2551,1823 2554,1823 2564,1822 2570,1823 2570,1824 2557,1823 2554,1824 2551,1824 2526,1830 2525,1830 2523,1829 2524,1828 2529,1829 2533,1827 2538,1826 2546,1825')
      nP('FL', '2925,1960 2934,1977 2937,1988 2933,1992 2931,1992 2934,1980 2933,1976 2929,1974 2927,1977 2922,1974 2921,1968 2924,1967 2923,1964 2930,1971')
      nP('FL', '2841,2147 2843,2154 2841,2155 2839,2142 2836,2139 2839,2138')
      nP('FL', '2927,1977 2929,1976 2932,1978 2929,1991 2928,2001 2932,2015 2925,1994')
      nP('VA', '3258,1176 3260,1176 3257,1182 3254,1188 3251,1189 3254,1187 3252,1187 3254,1185')
      nP(
        'MO',
        '2412,1267 2411,1275 2409,1277 2408,1278 2409,1280 2411,1281 2411,1283 2410,1284 2408,1284 2407,1287 2407,1288 2409,1291 2408,1293 2407,1295 2406,1299 2404,1300 2402,1299 2399,1295 2398,1295 2397,1295 2396,1296 2393,1305 2394,1306 2391,1310 2390,1310 2389,1309 2390,1306 2389,1305 2390,1304 2389,1302 2389,1301 \
2386,1300 2385,1301 2384,1302 2384,1304 2386,1306 2387,1308 2386,1311 2387,1314 2387,1318 2386,1319 2382,1318 2381,1320 2382,1322 2386,1324 2386,1326 2381,1328 2378,1327 2376,1327 2376,1328 2378,1329 2381,1333 2383,1335 2383,1337 2378,1340 2377,1341 2377,1346 2375,1348 2360,1349 2340,1349 2335,1349 2338,1340 \
2340,1338 2342,1338 2343,1337 2344,1335 2344,1334 2348,1332 2350,1330 2351,1326 2354,1325 2355,1323 2354,1321 2355,1317 2355,1316 2353,1315 2351,1314 2350,1312 2351,1310 2349,1309 2349,1307 2344,1306 2322,1307 2309,1307 2288,1307 2271,1307 2269,1307 2255,1307 2228,1307 2227,1307 2203,1307 2188,1307 2183,1307 \
2156,1307 2154,1307 2138,1307 2122,1307 2108,1307 2075,1307 2075,1291 2075,1283 2075,1264 2075,1258 2075,1236 2075,1233 2075,1208 2075,1206 2075,1176 2075,1174 2075,1145 2075,1139 2076,1116 2076,1108 2076,1090 2076,1084 2076,1082 2076,1081 2074,1080 2072,1079 2069,1079 2065,1077 2063,1076 2062,1072 2059,1070 \
2058,1066 2057,1065 2058,1061 2057,1061 2055,1059 2053,1056 2050,1054 2049,1053 2046,1049 2045,1046 2049,1044 2049,1041 2050,1038 2053,1036 2054,1032 2055,1031 2056,1032 2058,1032 2060,1031 2060,1030 2060,1029 2057,1029 2056,1028 2056,1027 2058,1026 2059,1024 2058,1024 2057,1023 2056,1022 2056,1018 2054,1017 \
2051,1018 2050,1019 2048,1020 2046,1020 2043,1017 2040,1017 2039,1014 2037,1014 2033,1009 2031,1007 2029,1007 2028,1005 2027,1005 2027,1002 2029,1001 2028,999 2026,998 2024,994 2024,991 2023,990 2019,986 2016,983 2012,983 2013,982 2014,981 2014,980 2013,979 2013,975 2010,968 2010,965 2012,964 2012,962 \
2011,961 2010,961 2010,964 2007,964 2005,962 2005,959 2029,959 2039,960 2057,960 2074,960 2084,960 2099,961 2112,960 2126,960 2140,960 2152,960 2168,959 2192,959 2196,959 2213,958 2224,958 2239,957 2251,957 2253,959 2254,960 2254,962 2259,964 2259,966 2261,968 2261,970 2264,970 2264,972 2264,974 2266,975 \
2267,976 2269,977 2267,983 2266,988 2266,992 2265,998 2266,1003 2267,1008 2269,1014 2270,1016 2270,1017 2269,1019 2269,1021 2273,1026 2274,1029 2274,1032 2277,1036 2284,1043 2287,1047 2291,1049 2293,1054 2294,1056 2300,1060 2306,1064 2310,1069 2313,1073 2313,1075 2314,1077 2314,1082 2316,1086 2314,1089 \
2315,1091 2317,1099 2319,1104 2323,1105 2325,1103 2329,1097 2333,1097 2338,1100 2341,1100 2343,1101 2350,1106 2351,1108 2350,1111 2349,1112 2348,1113 2346,1117 2345,1119 2347,1123 2347,1127 2343,1131 2342,1133 2342,1135 2339,1142 2337,1145 2336,1148 2335,1151 2335,1159 2337,1163 2340,1164 2342,1168 2345,1171 \
2350,1174 2350,1176 2355,1179 2357,1181 2360,1182 2359,1186 2362,1189 2364,1189 2366,1188 2366,1187 2367,1187 2374,1192 2377,1195 2378,1197 2378,1200 2383,1204 2387,1204 2388,1206 2387,1208 2388,1211 2387,1215 2389,1222 2391,1225 2393,1229 2392,1233 2390,1235 2388,1235 2387,1238 2387,1240 2389,1242 2390,1242 \
2390,1244 2392,1249 2393,1252 2396,1255 2395,1259 2400,1263 2402,1263 2403,1263 2403,1261 2400,1258 2400,1256 2402,1256 2403,1256 2404,1260 2406,1261 2407,1265 2411,1264 2412,1265'
      )
      nP(
        'VA',
        '3222,1217 3217,1216 3218,1214 3221,1214 3220,1213 3226,1203 3227,1196 3232,1193 3233,1191 3230,1184 3235,1184 3235,1181 3237,1179 3252,1177 3237,1204 3239,1206 3232,1213 3235,1216 3230,1216 3229,1220 3232,1222 3225,1224 3225,1227 3227,1229 3224,1228 3220,1232 3218,1251 3216,1253 3213,1237 3218,1222 3216,1223 \
3217,1219 3218,1216'
      )
      nP(
        'AZ',
        '858,1600 856,1600 853,1600 852,1600 851,1599 850,1599 847,1595 847,1592 849,1589 849,1584 848,1582 849,1580 845,1577 847,1573 846,1568 851,1567 852,1565 852,1563 854,1561 854,1559 858,1555 857,1553 858,1550 858,1546 857,1545 860,1543 859,1540 859,1537 858,1533 859,1531 858,1530 860,1524 858,1522 859,1521 \
864,1515 864,1511 865,1509 871,1506 873,1503 876,1502 881,1495 883,1495 882,1491 881,1489 879,1487 874,1483 873,1483 872,1481 870,1479 867,1479 867,1477 867,1472 865,1468 864,1467 864,1466 862,1458 860,1455 858,1454 857,1453 855,1447 852,1444 852,1440 852,1438 852,1433 852,1430 854,1427 851,1423 852,1422 \
855,1422 855,1421 856,1418 856,1414 854,1407 854,1403 851,1395 849,1389 851,1387 850,1383 851,1381 850,1378 849,1377 850,1374 848,1371 849,1368 848,1361 850,1359 850,1358 848,1356 845,1349 846,1345 846,1343 846,1341 847,1339 852,1336 854,1337 858,1335 862,1338 863,1338 867,1335 869,1337 871,1339 872,1341 \
871,1343 876,1347 878,1347 882,1345 884,1338 888,1332 888,1330 888,1277 888,1264 958,1264 979,1264 998,1264 1052,1263 1090,1263 1105,1263 1107,1264 1135,1264 1193,1264 1193,1349 1193,1437 1193,1468 1193,1536 1193,1585 1193,1621 1193,1650 1193,1743 1107,1744 1069,1744 1051,1736 931,1684 840,1646 841,1635 \
846,1626 847,1625 848,1625 853,1626 853,1625 855,1625 855,1624 856,1624 856,1623 857,1623 857,1622 858,1622 858,1621 858,1619 862,1616 861,1608 862,1605'
      )
      nP(
        'NC',
        '2725,1434 2717,1434 2705,1434 2707,1415 2711,1411 2714,1413 2718,1412 2722,1410 2723,1408 2723,1405 2724,1401 2724,1398 2727,1394 2730,1393 2732,1390 2735,1389 2738,1386 2745,1385 2748,1385 2751,1386 2755,1386 2758,1382 2762,1380 2765,1378 2768,1377 2770,1374 2771,1372 2774,1371 2777,1368 2779,1368 2782,1367 \
2787,1367 2788,1366 2791,1359 2791,1354 2792,1353 2795,1353 2797,1355 2799,1352 2800,1349 2800,1348 2808,1344 2809,1344 2810,1345 2811,1346 2810,1348 2810,1351 2813,1352 2816,1351 2818,1349 2822,1342 2824,1340 2828,1338 2831,1338 2834,1336 2838,1336 2840,1340 2842,1340 2846,1337 2851,1326 2852,1324 2857,1320 \
2863,1320 2865,1320 2863,1318 2863,1315 2865,1308 2865,1304 2867,1298 2887,1300 2914,1300 2918,1300 2932,1301 2943,1301 2966,1302 2968,1302 2987,1302 2999,1302 3017,1302 3022,1302 3043,1302 3046,1302 3063,1302 3072,1302 3088,1301 3098,1301 3106,1301 3133,1301 3142,1301 3157,1301 3179,1301 3183,1301 3194,1301 \
3206,1301 3211,1301 3212,1305 3208,1306 3215,1311 3216,1313 3214,1313 3217,1317 3218,1312 3218,1318 3226,1339 3226,1342 3223,1339 3219,1327 3216,1326 3217,1323 3213,1321 3216,1332 3215,1334 3203,1321 3200,1323 3207,1333 3205,1336 3199,1334 3196,1330 3197,1339 3184,1341 3188,1343 3182,1348 3178,1347 3174,1343 \
3175,1345 3172,1344 3169,1335 3172,1323 3166,1318 3157,1315 3168,1321 3171,1326 3168,1328 3167,1336 3171,1349 3169,1354 3171,1353 3189,1350 3191,1354 3201,1350 3208,1351 3212,1355 3209,1369 3211,1375 3204,1374 3207,1377 3213,1376 3215,1357 3225,1355 3229,1359 3230,1377 3227,1384 3220,1380 3211,1398 3203,1404 \
3183,1398 3181,1395 3186,1390 3187,1386 3182,1384 3184,1387 3175,1389 3175,1396 3171,1398 3146,1386 3154,1396 3171,1403 3176,1410 3178,1407 3181,1407 3183,1412 3175,1418 3177,1421 3176,1428 3172,1431 3162,1435 3156,1431 3156,1427 3150,1425 3146,1426 3146,1427 3153,1429 3158,1438 3174,1441 3173,1436 3181,1435 \
3187,1432 3188,1438 3192,1438 3194,1435 3195,1437 3185,1451 3176,1457 3150,1459 3144,1453 3145,1460 3143,1462 3120,1479 3117,1482 3115,1481 3116,1483 3107,1492 3100,1502 3098,1512 3096,1513 3094,1502 3094,1519 3089,1525 3056,1528 3051,1522 3026,1492 3003,1465 3003,1464 2990,1450 2988,1450 2974,1449 2949,1449 \
2935,1449 2920,1449 2921,1438 2918,1433 2915,1428 2913,1424 2906,1430 2904,1427 2906,1424 2905,1422 2905,1420 2888,1419 2886,1419 2861,1418 2855,1418 2849,1417 2834,1417 2830,1417 2827,1417 2825,1417 2825,1418 2824,1418 2823,1415 2820,1419 2818,1418 2815,1420 2812,1420 2807,1423 2805,1423 2805,1425 2804,1425 \
2800,1426 2793,1428 2785,1431 2779,1433 2754,1434 2752,1434 2728,1434'
      )
      nP(
        'OK',
        '2086,1439 2086,1455 2086,1475 2085,1501 2085,1523 2084,1549 2083,1550 2082,1549 2081,1550 2081,1548 2080,1549 2079,1549 2079,1548 2080,1548 2080,1547 2078,1547 2077,1547 2079,1546 2078,1546 2077,1545 2076,1546 2075,1545 2074,1546 2073,1546 2072,1546 2074,1545 2073,1544 2072,1544 2071,1544 2068,1543 2067,1543 \
2068,1542 2067,1542 2067,1540 2065,1540 2066,1539 2065,1539 2064,1540 2063,1539 2061,1539 2059,1537 2057,1536 2058,1535 2057,1533 2056,1534 2056,1531 2054,1531 2054,1529 2053,1530 2051,1529 2050,1529 2049,1528 2048,1527 2048,1525 2047,1527 2047,1525 2046,1525 2045,1525 2044,1525 2044,1523 2043,1523 2038,1521 \
2037,1523 2037,1526 2036,1527 2035,1525 2035,1527 2034,1527 2031,1527 2032,1529 2024,1529 2023,1528 2022,1528 2021,1527 2019,1528 2019,1527 2020,1527 2020,1526 2019,1526 2018,1523 2015,1523 2014,1523 2015,1525 2013,1525 2009,1527 2006,1526 2006,1527 2005,1528 2005,1530 2003,1529 2002,1531 2000,1531 1995,1527 \
1994,1527 1993,1529 1992,1530 1991,1528 1991,1529 1991,1530 1990,1531 1989,1530 1988,1531 1985,1531 1984,1532 1982,1532 1981,1532 1980,1534 1981,1533 1982,1533 1981,1535 1981,1537 1979,1538 1978,1539 1974,1537 1973,1538 1972,1542 1972,1543 1970,1543 1968,1540 1965,1536 1961,1537 1960,1536 1960,1534 1957,1533 \
1954,1531 1953,1530 1955,1527 1950,1525 1949,1526 1948,1531 1947,1532 1945,1532 1942,1529 1941,1529 1939,1530 1938,1530 1937,1528 1937,1524 1936,1522 1934,1521 1934,1522 1932,1523 1930,1523 1930,1528 1929,1531 1928,1531 1925,1530 1925,1531 1925,1532 1927,1533 1924,1534 1925,1540 1924,1541 1923,1541 1920,1541 \
1918,1539 1917,1533 1918,1532 1919,1531 1920,1529 1918,1526 1917,1526 1915,1527 1914,1529 1914,1530 1913,1529 1911,1527 1910,1529 1909,1530 1908,1532 1905,1533 1902,1532 1902,1527 1901,1526 1898,1525 1896,1526 1895,1526 1894,1525 1893,1520 1889,1519 1887,1520 1885,1523 1883,1524 1881,1527 1878,1530 1877,1530 \
1874,1529 1871,1528 1870,1526 1870,1525 1872,1524 1871,1522 1872,1521 1872,1520 1870,1518 1867,1519 1865,1519 1863,1517 1862,1512 1863,1506 1862,1505 1860,1506 1858,1508 1852,1507 1849,1506 1847,1506 1845,1508 1845,1510 1844,1511 1843,1512 1841,1513 1838,1512 1834,1509 1833,1506 1831,1505 1830,1504 1828,1505 \
1827,1505 1825,1507 1821,1507 1819,1506 1814,1504 1810,1501 1808,1500 1805,1501 1803,1500 1800,1501 1797,1500 1796,1499 1795,1496 1795,1492 1795,1490 1792,1487 1791,1484 1788,1483 1785,1480 1783,1481 1783,1484 1782,1487 1781,1487 1778,1485 1777,1484 1774,1483 1772,1483 1772,1485 1771,1487 1766,1486 1760,1480 \
1757,1475 1755,1474 1754,1471 1750,1469 1748,1470 1747,1470 1746,1455 1747,1430 1746,1418 1747,1397 1746,1381 1746,1358 1746,1343 1746,1306 1713,1307 1688,1307 1680,1307 1647,1307 1622,1306 1614,1307 1563,1306 1563,1264 1622,1264 1623,1264 1651,1264 1681,1264 1688,1264 1708,1264 1741,1264 1746,1264 1774,1264 \
1781,1264 1807,1264 1836,1264 1847,1263 1862,1264 1881,1264 1901,1264 1921,1263 1945,1263 1959,1263 1991,1264 1993,1263 2004,1264 2020,1263 2027,1263 2048,1263 2050,1263 2075,1264 2075,1283 2075,1291 2075,1307 2076,1308 2079,1334 2080,1339 2083,1369 2085,1379 2087,1399'
      )
      nP('MD', '3258,1176 3260,1175 3262,1171 3265,1161 3269,1151 3264,1168 3260,1176')
      nP(
        'KY',
        '2571,1293 2555,1293 2537,1293 2534,1293 2520,1293 2502,1294 2499,1294 2489,1294 2488,1291 2476,1291 2478,1299 2478,1303 2477,1306 2450,1306 2449,1306 2430,1306 2429,1306 2398,1306 2394,1306 2393,1305 2396,1296 2397,1295 2398,1295 2399,1295 2402,1299 2404,1300 2406,1299 2407,1295 2408,1293 2409,1291 2407,1288 \
2407,1287 2408,1284 2410,1284 2411,1283 2411,1281 2409,1280 2408,1278 2409,1277 2411,1275 2412,1267 2412,1265 2411,1264 2410,1264 2408,1261 2409,1258 2410,1256 2412,1254 2415,1248 2419,1245 2423,1245 2427,1246 2434,1251 2435,1251 2438,1252 2442,1254 2446,1257 2448,1258 2450,1258 2451,1257 2453,1255 2454,1250 \
2452,1246 2449,1242 2449,1238 2451,1229 2454,1228 2458,1229 2461,1226 2475,1223 2476,1220 2472,1214 2470,1210 2470,1207 2472,1204 2476,1201 2478,1195 2479,1195 2483,1198 2484,1196 2485,1195 2486,1192 2484,1189 2484,1187 2485,1185 2486,1185 2489,1188 2491,1189 2495,1187 2497,1188 2498,1187 2500,1187 2499,1192 \
2501,1193 2504,1192 2505,1190 2505,1188 2503,1185 2504,1181 2510,1186 2514,1184 2518,1184 2522,1188 2525,1190 2527,1191 2530,1192 2532,1193 2533,1196 2535,1197 2537,1195 2539,1186 2540,1185 2542,1184 2545,1184 2547,1183 2550,1180 2552,1179 2553,1180 2556,1187 2558,1188 2560,1186 2561,1186 2562,1187 2561,1190 \
2562,1192 2563,1192 2565,1191 2566,1185 2567,1185 2569,1185 2570,1185 2571,1183 2570,1180 2570,1177 2571,1175 2572,1174 2574,1174 2575,1172 2575,1171 2573,1169 2574,1168 2575,1168 2577,1169 2578,1168 2581,1167 2582,1166 2581,1165 2579,1164 2579,1162 2580,1162 2581,1164 2584,1166 2585,1172 2585,1174 2587,1175 \
2591,1177 2596,1178 2599,1181 2600,1179 2602,1178 2605,1178 2607,1176 2608,1173 2608,1163 2611,1158 2612,1155 2614,1154 2615,1155 2618,1156 2622,1153 2623,1150 2624,1146 2626,1141 2632,1139 2635,1135 2637,1133 2638,1131 2638,1129 2636,1120 2636,1117 2638,1116 2643,1116 2647,1115 2651,1120 2654,1120 2656,1118 \
2659,1115 2662,1114 2665,1112 2675,1111 2674,1108 2676,1105 2676,1104 2676,1102 2672,1102 2671,1101 2671,1100 2673,1098 2674,1095 2673,1093 2671,1091 2670,1089 2670,1088 2674,1085 2675,1085 2676,1085 2679,1082 2684,1086 2687,1087 2688,1088 2693,1086 2695,1085 2697,1084 2699,1087 2699,1090 2701,1091 2703,1091 \
2705,1093 2707,1098 2709,1101 2710,1104 2711,1110 2714,1112 2719,1114 2721,1114 2727,1113 2730,1114 2733,1115 2735,1118 2737,1120 2739,1123 2742,1125 2744,1126 2746,1126 2746,1125 2747,1122 2748,1121 2754,1120 2755,1120 2758,1122 2763,1123 2766,1125 2766,1127 2767,1128 2768,1128 2769,1127 2771,1126 2775,1127 \
2777,1126 2779,1122 2782,1120 2784,1118 2787,1118 2791,1115 2792,1116 2794,1118 2793,1121 2794,1123 2795,1128 2796,1130 2798,1131 2802,1132 2804,1133 2806,1136 2809,1138 2811,1144 2810,1147 2812,1152 2811,1154 2812,1157 2811,1158 2809,1158 2810,1162 2809,1163 2807,1164 2807,1166 2811,1169 2815,1177 2818,1181 \
2818,1182 2817,1183 2816,1185 2820,1188 2821,1189 2822,1195 2826,1197 2827,1199 2827,1200 2829,1207 2832,1208 2834,1210 2836,1209 2837,1213 2839,1213 2839,1215 2838,1215 2838,1216 2842,1217 2844,1219 2844,1217 2845,1218 2848,1217 2849,1218 2829,1238 2825,1241 2822,1242 2813,1247 2812,1247 2803,1254 2803,1256 \
2804,1257 2803,1258 2803,1261 2797,1263 2794,1266 2794,1269 2793,1272 2789,1275 2783,1275 2782,1276 2778,1282 2778,1285 2777,1285 2773,1286 2766,1288 2762,1290 2761,1291 2758,1292 2753,1292 2746,1296 2745,1297 2743,1299 2729,1298 2724,1298 2709,1298 2677,1297 2676,1297 2664,1296 2647,1295 2645,1295 2637,1296 \
2615,1295 2604,1295 2590,1294 2577,1293'
      )
      nP(
        'CO',
        '1621,1209 1621,1231 1622,1264 1563,1264 1558,1263 1502,1264 1432,1264 1428,1264 1397,1264 1380,1264 1351,1264 1327,1264 1325,1263 1293,1264 1289,1264 1234,1263 1193,1264 1193,1210 1193,1188 1193,1166 1193,1158 1193,1137 1193,1063 1193,1050 1193,1038 1193,991 1193,953 1193,924 1262,924 1300,924 1327,924 \
1359,924 1367,924 1424,924 1445,925 1499,924 1528,924 1539,924 1584,924 1586,924 1621,924 1621,946 1621,950 1621,972 1621,980 1621,1009 1621,1046 1621,1083 1621,1091 1621,1120 1621,1126 1621,1156 1621,1157 1621,1201'
      )
      nP('KY', '2386,1306 2384,1304 2384,1302 2385,1301 2386,1300 2389,1301 2389,1302 2390,1304 2389,1305 2390,1306')
      nP(
        'VA',
        '3022,1302 3017,1302 2999,1302 2987,1302 2968,1302 2966,1302 2943,1301 2932,1301 2918,1300 2914,1300 2887,1300 2867,1298 2868,1297 2857,1296 2852,1296 2851,1298 2838,1298 2834,1298 2829,1298 2810,1298 2795,1298 2787,1298 2773,1298 2771,1298 2769,1297 2757,1297 2745,1297 2746,1296 2753,1292 2758,1292 2761,1291 \
2762,1290 2766,1288 2773,1286 2777,1285 2778,1285 2778,1282 2782,1276 2783,1275 2789,1275 2793,1272 2794,1269 2794,1266 2797,1263 2803,1261 2803,1258 2804,1257 2803,1256 2803,1254 2812,1247 2813,1247 2822,1242 2825,1241 2829,1238 2849,1218 2851,1220 2850,1222 2848,1222 2848,1224 2852,1228 2851,1232 2853,1235 \
2855,1236 2856,1237 2857,1239 2858,1240 2860,1239 2862,1240 2863,1242 2865,1243 2867,1246 2874,1246 2877,1244 2878,1242 2879,1242 2883,1239 2884,1237 2886,1235 2889,1239 2894,1243 2899,1240 2907,1239 2909,1237 2909,1238 2910,1239 2912,1238 2917,1235 2917,1234 2916,1230 2917,1227 2920,1228 2920,1230 2922,1231 \
2923,1232 2924,1231 2925,1230 2926,1230 2933,1226 2936,1224 2938,1223 2939,1224 2939,1227 2940,1228 2943,1227 2945,1224 2948,1223 2948,1222 2952,1220 2952,1218 2950,1219 2949,1218 2950,1215 2954,1213 2956,1210 2954,1209 2951,1209 2951,1208 2951,1206 2954,1202 2954,1199 2956,1197 2956,1195 2959,1192 2959,1190 \
2959,1189 2962,1188 2963,1186 2966,1182 2969,1179 2971,1175 2972,1173 2974,1170 2973,1168 2975,1165 2974,1163 2980,1157 2982,1156 2982,1154 2981,1153 2981,1152 2984,1149 2986,1149 2986,1145 2989,1142 2988,1136 2990,1134 2989,1132 2991,1128 2998,1132 3001,1139 3011,1144 3014,1141 3016,1138 3023,1123 3023,1122 \
3025,1123 3025,1119 3027,1114 3027,1112 3028,1111 3031,1107 3039,1114 3042,1108 3043,1104 3046,1101 3046,1100 3047,1100 3048,1102 3050,1100 3052,1098 3053,1095 3055,1097 3058,1093 3058,1092 3057,1091 3059,1089 3061,1086 3062,1084 3064,1084 3065,1081 3067,1079 3066,1077 3066,1076 3067,1073 3066,1072 3071,1065 \
3070,1064 3069,1063 3070,1061 3070,1055 3075,1058 3077,1061 3089,1071 3102,1083 3103,1082 3103,1077 3106,1073 3106,1070 3108,1067 3111,1067 3115,1068 3118,1068 3120,1071 3122,1073 3124,1074 3124,1075 3123,1079 3121,1080 3121,1084 3123,1085 3125,1087 3126,1088 3131,1088 3133,1088 3137,1091 3138,1096 3143,1097 \
3145,1100 3148,1101 3149,1103 3150,1105 3150,1107 3150,1108 3151,1110 3150,1112 3150,1118 3149,1118 3148,1118 3147,1119 3145,1121 3145,1124 3141,1126 3141,1123 3139,1123 3134,1136 3132,1142 3135,1148 3133,1149 3138,1150 3149,1147 3153,1155 3157,1161 3177,1168 3180,1172 3180,1176 3179,1178 3182,1177 3191,1182 \
3198,1188 3198,1191 3194,1196 3195,1202 3192,1204 3194,1206 3193,1211 3183,1208 3178,1198 3175,1196 3167,1186 3164,1185 3169,1196 3172,1198 3179,1209 3195,1217 3193,1219 3182,1217 3187,1220 3192,1220 3198,1230 3197,1235 3195,1235 3193,1230 3187,1225 3185,1228 3188,1228 3189,1232 3186,1231 3190,1239 3186,1242 \
3174,1228 3171,1228 3173,1232 3177,1239 3188,1246 3189,1250 3190,1249 3192,1251 3193,1248 3196,1253 3190,1254 3197,1257 3196,1262 3190,1264 3188,1266 3181,1258 3182,1256 3179,1253 3179,1257 3176,1252 3177,1248 3174,1244 3171,1244 3168,1247 3165,1243 3161,1243 3160,1236 3160,1241 3156,1243 3159,1246 3165,1246 \
3169,1251 3172,1247 3173,1251 3173,1259 3178,1261 3176,1264 3180,1263 3184,1267 3182,1271 3184,1270 3184,1272 3180,1277 3179,1281 3183,1274 3189,1272 3193,1271 3193,1275 3190,1277 3189,1278 3194,1276 3196,1278 3195,1268 3196,1267 3201,1269 3202,1272 3207,1269 3214,1270 3221,1301 3220,1301 3220,1297 3217,1287 \
3214,1301 3212,1301 3210,1297 3211,1301 3206,1301 3194,1301 3183,1301 3179,1301 3157,1301 3142,1301 3133,1301 3106,1301 3098,1301 3088,1301 3072,1302 3063,1302 3046,1302 3043,1302'
      )
      nP(
        'KS',
        '2048,1263 2027,1263 2020,1263 2004,1264 1993,1263 1991,1264 1959,1263 1945,1263 1921,1263 1901,1264 1881,1264 1862,1264 1847,1263 1836,1264 1807,1264 1781,1264 1774,1264 1746,1264 1741,1264 1708,1264 1688,1264 1681,1264 1651,1264 1623,1264 1622,1264 1621,1231 1621,1209 1621,1201 1621,1157 1621,1156 1621,1126 \
1621,1120 1621,1091 1621,1083 1621,1046 1621,1009 1660,1009 1665,1009 1700,1009 1701,1009 1735,1009 1769,1009 1797,1009 1803,1009 1825,1009 1838,1009 1852,1009 1873,1009 1880,1009 1908,1009 1935,1009 1942,1009 1963,1009 1976,1009 1991,1009 2004,1009 2032,1010 2033,1009 2037,1014 2039,1014 2040,1017 2043,1017 \
2046,1020 2048,1020 2050,1019 2051,1018 2054,1017 2056,1018 2056,1022 2057,1023 2058,1024 2059,1024 2058,1026 2056,1027 2056,1028 2057,1029 2060,1029 2060,1030 2060,1031 2058,1032 2056,1032 2055,1031 2054,1032 2053,1036 2050,1038 2049,1041 2049,1044 2045,1046 2046,1049 2049,1053 2050,1054 2053,1056 2055,1059 \
2057,1061 2058,1061 2057,1065 2058,1066 2059,1070 2062,1072 2063,1076 2065,1077 2069,1079 2072,1079 2074,1080 2076,1081 2076,1082 2076,1084 2076,1090 2076,1108 2076,1116 2075,1139 2075,1145 2075,1174 2075,1176 2075,1206 2075,1208 2075,1233 2075,1236 2075,1258 2075,1264 2050,1263'
      )
      nP(
        'TX',
        '1379,1739 1366,1732 1356,1710 1346,1706 1342,1703 1342,1701 1340,1696 1341,1695 1341,1690 1340,1689 1341,1687 1356,1687 1379,1687 1445,1687 1450,1687 1501,1687 1503,1687 1518,1687 1543,1687 1559,1687 1559,1680 1559,1644 1560,1607 1560,1571 1561,1555 1561,1533 1561,1492 1561,1455 1561,1436 1561,1418 1562,1380 \
1561,1370 1561,1343 1561,1307 1563,1306 1614,1307 1622,1306 1647,1307 1680,1307 1688,1307 1713,1307 1746,1306 1746,1343 1746,1358 1746,1381 1747,1397 1746,1418 1747,1430 1746,1455 1747,1470 1748,1470 1750,1469 1754,1471 1755,1474 1757,1475 1760,1480 1766,1486 1771,1487 1772,1485 1772,1483 1774,1483 1777,1484 \
1778,1485 1781,1487 1782,1487 1783,1484 1783,1481 1785,1480 1788,1483 1791,1484 1792,1487 1795,1490 1795,1492 1795,1496 1796,1499 1797,1500 1800,1501 1803,1500 1805,1501 1808,1500 1810,1501 1814,1504 1819,1506 1821,1507 1825,1507 1827,1505 1828,1505 1830,1504 1831,1505 1833,1506 1834,1509 1838,1512 1841,1513 \
1843,1512 1844,1511 1845,1510 1845,1508 1847,1506 1849,1506 1852,1507 1858,1508 1860,1506 1862,1505 1863,1506 1862,1512 1863,1517 1865,1519 1867,1519 1870,1518 1872,1520 1872,1521 1871,1522 1872,1524 1870,1525 1870,1526 1871,1528 1874,1529 1877,1530 1878,1530 1881,1527 1883,1524 1885,1523 1887,1520 1889,1519 \
1893,1520 1894,1525 1895,1526 1896,1526 1898,1525 1901,1526 1902,1527 1902,1532 1905,1533 1908,1532 1909,1530 1910,1529 1911,1527 1913,1529 1914,1530 1914,1529 1915,1527 1917,1526 1918,1526 1920,1529 1919,1531 1918,1532 1917,1533 1918,1539 1920,1541 1923,1541 1924,1541 1925,1540 1924,1534 1927,1533 1925,1532 \
1925,1531 1925,1530 1928,1531 1929,1531 1930,1528 1930,1523 1932,1523 1934,1522 1934,1521 1936,1522 1937,1524 1937,1528 1938,1530 1939,1530 1941,1529 1942,1529 1945,1532 1947,1532 1948,1531 1949,1526 1950,1525 1955,1527 1953,1530 1954,1531 1957,1533 1960,1534 1960,1536 1961,1537 1965,1536 1968,1540 1970,1543 \
1972,1543 1972,1542 1973,1538 1974,1537 1978,1539 1979,1538 1981,1537 1981,1535 1982,1533 1981,1533 1980,1534 1981,1532 1982,1532 1984,1532 1985,1531 1988,1531 1989,1530 1990,1531 1991,1530 1991,1529 1991,1528 1992,1530 1993,1529 1994,1527 1995,1527 2000,1531 2002,1531 2003,1529 2005,1530 2005,1528 2006,1527 \
2006,1526 2009,1527 2013,1525 2015,1525 2014,1523 2015,1523 2018,1523 2019,1526 2020,1526 2020,1527 2019,1527 2019,1528 2021,1527 2022,1528 2023,1528 2024,1529 2032,1529 2031,1527 2034,1527 2035,1527 2035,1525 2036,1527 2037,1526 2037,1523 2038,1521 2043,1523 2044,1523 2044,1525 2045,1525 2046,1525 2047,1525 \
2047,1527 2048,1525 2048,1527 2049,1528 2050,1529 2051,1529 2053,1530 2054,1529 2054,1531 2056,1531 2056,1534 2057,1533 2058,1535 2057,1536 2059,1537 2061,1539 2063,1539 2064,1540 2065,1539 2066,1539 2065,1540 2067,1540 2067,1542 2068,1542 2067,1543 2068,1543 2071,1544 2072,1544 2073,1544 2074,1545 2072,1546 \
2073,1546 2074,1546 2075,1545 2076,1546 2077,1545 2078,1546 2079,1546 2077,1547 2078,1547 2080,1547 2080,1548 2079,1548 2079,1549 2080,1549 2081,1548 2081,1550 2082,1549 2083,1550 2084,1549 2087,1549 2086,1550 2086,1551 2086,1552 2087,1552 2088,1554 2089,1554 2090,1552 2091,1553 2090,1554 2089,1555 2090,1556 \
2093,1554 2095,1555 2095,1554 2096,1553 2097,1553 2096,1555 2099,1552 2100,1553 2099,1555 2100,1555 2101,1553 2103,1552 2104,1555 2107,1554 2108,1553 2109,1554 2111,1556 2111,1580 2111,1601 2111,1613 2111,1629 2111,1655 2111,1671 2111,1688 2113,1688 2113,1689 2115,1692 2115,1694 2117,1695 2118,1695 2118,1697 \
2119,1696 2120,1699 2120,1698 2121,1700 2121,1703 2123,1704 2124,1707 2123,1708 2125,1710 2124,1712 2125,1712 2126,1712 2125,1715 2125,1717 2124,1717 2124,1720 2123,1720 2123,1722 2124,1723 2125,1725 2127,1727 2128,1727 2129,1727 2130,1728 2131,1728 2130,1730 2128,1731 2130,1733 2132,1733 2131,1734 2132,1735 \
2132,1736 2132,1737 2132,1738 2134,1739 2134,1741 2135,1741 2133,1744 2133,1746 2134,1748 2135,1748 2136,1749 2137,1749 2137,1752 2138,1753 2137,1755 2138,1757 2139,1758 2141,1756 2142,1757 2141,1757 2142,1759 2141,1759 2141,1761 2142,1762 2140,1763 2140,1764 2141,1764 2141,1765 2143,1766 2142,1768 2143,1769 \
2141,1771 2140,1771 2139,1773 2140,1773 2139,1774 2141,1775 2141,1776 2142,1776 2142,1778 2142,1779 2141,1779 2141,1780 2140,1781 2140,1782 2140,1783 2141,1784 2140,1785 2140,1786 2141,1787 2139,1789 2139,1792 2137,1794 2137,1795 2137,1797 2137,1799 2134,1800 2133,1803 2132,1803 2132,1804 2132,1805 2133,1806 \
2132,1806 2130,1807 2130,1809 2129,1811 2131,1813 2131,1814 2131,1815 2131,1816 2132,1817 2131,1818 2132,1820 2130,1820 2129,1822 2128,1825 2129,1826 2128,1827 2128,1828 2130,1831 2132,1832 2131,1837 2131,1838 2131,1842 2132,1842 2132,1844 2133,1845 2132,1845 2132,1847 2131,1847 2131,1849 2131,1852 2128,1857 \
2122,1858 2122,1860 2116,1873 2123,1885 2109,1885 2091,1894 2090,1895 2071,1905 2066,1911 2065,1909 2071,1902 2078,1897 2083,1898 2084,1895 2082,1896 2081,1895 2079,1893 2065,1896 2070,1886 2070,1878 2068,1875 2062,1878 2059,1885 2056,1884 2047,1874 2050,1882 2053,1884 2051,1895 2057,1900 2053,1903 2055,1903 \
2055,1906 2057,1906 2057,1904 2059,1908 2063,1911 2059,1909 2058,1916 2055,1914 2048,1925 2042,1925 2042,1932 2040,1933 2037,1944 2020,1959 2010,1965 2011,1963 2004,1964 1995,1968 1994,1974 2009,1966 1978,1985 1991,1976 1992,1971 1976,1978 1976,1976 1981,1975 1976,1973 1982,1962 1978,1969 1973,1971 1974,1967 \
1971,1973 1969,1974 1967,1970 1967,1965 1965,1966 1963,1963 1964,1968 1966,1966 1965,1973 1968,1975 1961,1980 1964,1976 1963,1971 1961,1976 1960,1975 1960,1972 1956,1973 1956,1968 1956,1958 1955,1966 1951,1966 1951,1969 1954,1974 1954,1979 1956,1978 1961,1984 1956,1987 1959,1988 1962,1984 1967,1990 1950,2001 \
1948,1998 1948,1993 1946,1993 1943,1986 1940,1989 1943,1989 1944,1992 1943,1994 1939,1992 1943,1997 1943,2000 1942,2004 1943,2007 1942,2009 1933,2017 1935,2005 1931,2009 1933,2011 1931,2017 1928,2015 1928,2010 1922,2016 1921,2013 1919,2013 1920,2017 1914,2021 1915,2023 1913,2025 1922,2022 1928,2018 1928,2025 \
1923,2034 1918,2043 1915,2042 1917,2041 1912,2038 1908,2040 1909,2038 1900,2039 1899,2037 1898,2038 1899,2040 1900,2042 1906,2041 1905,2046 1910,2051 1908,2051 1910,2053 1908,2057 1905,2058 1908,2058 1911,2052 1914,2053 1909,2064 1905,2084 1899,2085 1899,2074 1897,2082 1893,2086 1884,2076 1888,2087 1882,2087 \
1896,2092 1904,2089 1899,2105 1900,2112 1895,2114 1896,2125 1899,2129 1902,2145 1904,2152 1901,2156 1904,2164 1907,2166 1908,2181 1914,2191 1913,2196 1917,2196 1919,2200 1911,2199 1911,2202 1906,2203 1906,2210 1903,2210 1894,2202 1895,2200 1892,2200 1890,2194 1877,2191 1866,2191 1864,2194 1863,2191 1856,2192 \
1851,2188 1852,2186 1851,2185 1849,2187 1847,2183 1845,2183 1841,2178 1839,2179 1832,2174 1827,2176 1818,2165 1813,2166 1811,2163 1801,2161 1801,2155 1797,2150 1797,2147 1790,2124 1784,2116 1783,2112 1780,2109 1781,2095 1779,2089 1774,2085 1777,2070 1775,2069 1774,2060 1764,2056 1758,2045 1754,2044 1750,2028 \
1747,2027 1740,2014 1733,2010 1733,2006 1728,2003 1728,2000 1725,1993 1723,1986 1725,1984 1721,1981 1722,1977 1716,1971 1710,1951 1707,1949 1705,1935 1699,1928 1698,1921 1685,1910 1681,1902 1669,1897 1670,1889 1666,1893 1666,1887 1663,1886 1660,1879 1661,1877 1658,1877 1656,1875 1652,1877 1652,1873 1650,1877 \
1646,1878 1639,1875 1636,1876 1635,1873 1629,1875 1626,1873 1620,1875 1604,1867 1602,1870 1600,1877 1593,1875 1590,1878 1589,1876 1585,1880 1583,1879 1575,1897 1574,1907 1570,1912 1568,1919 1571,1923 1564,1926 1553,1944 1547,1941 1546,1943 1542,1938 1540,1939 1534,1936 1531,1930 1519,1926 1518,1922 1515,1922 \
1516,1918 1515,1919 1499,1914 1492,1908 1489,1901 1479,1895 1469,1884 1466,1873 1460,1865 1459,1852 1460,1845 1459,1837 1452,1827 1452,1825 1450,1824 1447,1809 1441,1803 1441,1799 1437,1799 1427,1788 1425,1790 1423,1787 1421,1788 1417,1785 1416,1781 1407,1772 1404,1765 1393,1758'
      )
      nP('TX', '1967,1997 1940,2021 1942,2012 1946,2011 1958,2000 1963,1999 1965,1994')
      nP('TX', '2057,1920 2066,1913 2067,1915 2046,1934')
      nP('TX', '1933,2023 1938,2016 1940,2018 1939,2023 1927,2040 1928,2034 1933,2028 1931,2027')
      nP(
        'TX',
        '1911,2145 1908,2137 1906,2127 1906,2118 1905,2102 1906,2095 1907,2094 1906,2103 1906,2116 1908,2128 1912,2145 1916,2161 1918,2174 1919,2190 1917,2175 1916,2167 1914,2161 1913,2156 1913,2151'
      )
      nP('TX', '1908,2088 1907,2094 1907,2087 1909,2074 1915,2062 1914,2056 1917,2060 1919,2052 1925,2043 1923,2042 1926,2041 1916,2063')
      nP('NC', '3212,1301 3214,1301 3219,1302 3218,1308 3215,1308 3215,1304')
      nP('NC', '3245,1376 3242,1368 3247,1381 3243,1414 3229,1417 3233,1413 3243,1409 3246,1385')
      nP('NC', '3220,1301 3221,1301 3228,1329 3242,1366 3232,1344 3230,1344 3227,1329')
      nP('NC', '3213,1427 3215,1423 3223,1419 3228,1417 3225,1419 3220,1422 3214,1427')
      nP(
        'TN',
        '2727,1394 2724,1398 2724,1401 2723,1405 2723,1408 2722,1410 2718,1412 2714,1413 2711,1411 2707,1415 2705,1434 2687,1434 2677,1434 2676,1434 2665,1434 2647,1434 2641,1434 2635,1434 2626,1434 2610,1434 2584,1433 2583,1433 2555,1433 2551,1433 2529,1432 2528,1432 2504,1432 2481,1432 2468,1432 2468,1433 2459,1433 \
2457,1433 2432,1433 2430,1433 2419,1433 2407,1433 2398,1433 2379,1433 2375,1433 2339,1433 2340,1429 2346,1430 2347,1426 2347,1424 2348,1422 2349,1421 2353,1422 2354,1421 2354,1419 2353,1417 2354,1415 2352,1411 2351,1411 2348,1411 2347,1409 2348,1407 2351,1406 2352,1404 2351,1402 2352,1401 2353,1399 2353,1398 \
2351,1398 2350,1398 2349,1401 2347,1400 2347,1397 2349,1396 2352,1393 2353,1392 2353,1393 2353,1397 2354,1398 2355,1398 2358,1395 2355,1390 2355,1387 2356,1386 2358,1385 2360,1388 2361,1388 2362,1388 2363,1387 2360,1384 2360,1382 2365,1379 2366,1380 2367,1378 2366,1376 2364,1377 2362,1376 2361,1373 2361,1371 \
2363,1369 2366,1370 2368,1369 2370,1367 2371,1365 2372,1364 2374,1365 2376,1363 2376,1362 2373,1359 2372,1358 2372,1357 2374,1355 2375,1356 2378,1358 2379,1357 2379,1356 2378,1354 2375,1351 2375,1348 2377,1346 2377,1341 2378,1340 2383,1337 2383,1335 2381,1333 2378,1329 2376,1328 2376,1327 2378,1327 2381,1328 \
2386,1326 2386,1324 2382,1322 2381,1320 2382,1318 2386,1319 2387,1318 2387,1314 2386,1311 2387,1308 2386,1306 2390,1306 2389,1309 2390,1310 2391,1310 2394,1306 2398,1306 2429,1306 2430,1306 2449,1306 2450,1306 2477,1306 2478,1303 2478,1299 2476,1291 2488,1291 2489,1294 2499,1294 2502,1294 2520,1293 2534,1293 \
2537,1293 2555,1293 2571,1293 2577,1293 2590,1294 2604,1295 2615,1295 2637,1296 2645,1295 2647,1295 2664,1296 2676,1297 2677,1297 2709,1298 2724,1298 2729,1298 2743,1299 2745,1297 2757,1297 2769,1297 2771,1298 2773,1298 2787,1298 2795,1298 2810,1298 2829,1298 2834,1298 2838,1298 2851,1298 2852,1296 2857,1296 \
2868,1297 2867,1298 2865,1304 2865,1308 2863,1315 2863,1318 2865,1320 2863,1320 2857,1320 2852,1324 2851,1326 2846,1337 2842,1340 2840,1340 2838,1336 2834,1336 2831,1338 2828,1338 2824,1340 2822,1342 2818,1349 2816,1351 2813,1352 2810,1351 2810,1348 2811,1346 2810,1345 2809,1344 2808,1344 2800,1348 2800,1349 \
2799,1352 2797,1355 2795,1353 2792,1353 2791,1354 2791,1359 2788,1366 2787,1367 2782,1367 2779,1368 2777,1368 2774,1371 2771,1372 2770,1374 2768,1377 2765,1378 2762,1380 2758,1382 2755,1386 2751,1386 2748,1385 2745,1385 2738,1386 2735,1389 2732,1390 2730,1393'
      )
      nP('NC', '3181,1468 3180,1466 3181,1466 3184,1459 3187,1453 3191,1449 3196,1443 3185,1459')

      this.svg.appendChild(content)
    }

    Tee.USAMap.prototype = new Tee.SVGMap()

    /**
     * @constructor
     * @augments Tee.WorldMap
     * @class Europe Map (all 54 European states).
     */
    Tee.EuropeMap = function (id) {
      this.filter = [
        'AD',
        'AL',
        'AT',
        'BA',
        'BE',
        'BG',
        'BY',
        'CH',
        'CY',
        'CZ',
        'DE',
        'DK',
        'EE',
        'ES',
        'FI',
        'FO',
        'FR',
        'GG',
        'GI',
        'GR',
        'HR',
        'HU',
        'IE',
        'IM',
        'IS',
        'IT',
        'JE',
        'LI',
        'LT',
        'LU',
        'LV',
        'MC',
        'MD',
        'MK',
        'MT',
        'NL',
        'NO',
        'PL',
        'PT',
        'RO',
        'RU',
        'SE',
        'SI',
        'SJ',
        'SK',
        'SM',
        'TR',
        'UA',
        'GB',
        'VA',
        'YU'
      ]

      Tee.WorldMap.call(this, id, -30, 85, 210, 55)
    }
    Tee.EuropeMap.prototype = Tee.WorldMap

    /**
     * @constructor
     * @augments Tee.WorldMap
     * @class Europe 27 Map (all 27 European states).
     */
    Tee.Europe27Map = function (id) {
      this.filter = [
        'AT',
        'BE',
        'BG',
        'CY',
        'CZ',
        'DK',
        'DE',
        'EE',
        'IE',
        'GR',
        'FI',
        'FR',
        'HU',
        'HR',
        'IT',
        'LV',
        'LT',
        'LU',
        'MT',
        'NL',
        'PL',
        'PT',
        'RO',
        'SK',
        'SI',
        'ES',
        'SE'
      ]

      Tee.WorldMap.call(this, id, -15, 70, 55, 38)
    }
    Tee.Europe27Map.prototype = Tee.WorldMap // do not use "new"

    /**
     * @constructor
     * @augments Tee.WorldMap
     * @class Africa countries.
     */
    Tee.AfricaMap = function (id) {
      this.filter = [
        'DZ',
        'AO',
        'SH',
        'BJ',
        'BW',
        'BF',
        'BI',
        'CM',
        'CV',
        'CF',
        'TD',
        'KM',
        'CG',
        'DJ',
        'EG',
        'GQ',
        'ER',
        'ET',
        'GA',
        'GM',
        'GH',
        'GW',
        'GN',
        'CI',
        'KE',
        'LS',
        'LR',
        'LY',
        'MG',
        'MW',
        'ML',
        'MR',
        'MU',
        'YT',
        'MA',
        'MZ',
        'NA',
        'NE',
        'NG',
        'ST',
        'RE',
        'RW',
        'ST',
        'SN',
        'SC',
        'SL',
        'SO',
        'ZA',
        'SH',
        'SD',
        'SZ',
        'TZ',
        'TG',
        'TN',
        'UG',
        'CD',
        'ZM',
        'ZW'
      ]

      Tee.WorldMap.call(this, id, -25, 37, 75, 75)
    }
    Tee.AfricaMap.prototype = Tee.WorldMap

    /**
     * @constructor
     * @augments Tee.WorldMap
     * @class Asia countries.
     */
    Tee.AsiaMap = function (id) {
      this.filter = [
        'AF',
        'AM',
        'AZ',
        'BH',
        'BD',
        'BT',
        'BN',
        'KH',
        'CN',
        'CX',
        'CC',
        'IO',
        'GE',
        'HK',
        'IN',
        'ID',
        'IR',
        'IQ',
        'IL',
        'JP',
        'JO',
        'KZ',
        'KP',
        'KR',
        'KW',
        'KG',
        'LA',
        'LB',
        'MO',
        'MY',
        'MV',
        'MN',
        'MM',
        'NP',
        'OM',
        'PK',
        'PH',
        'QA',
        'SA',
        'SG',
        'LK',
        'SY',
        'TW',
        'TJ',
        'TH',
        'TR',
        'TM',
        'AE',
        'UZ',
        'VN',
        'YE'
      ]

      Tee.WorldMap.call(this, id, 30, 50, 155, 70)
    }
    Tee.AsiaMap.prototype = Tee.WorldMap

    /**
     * @constructor
     * @augments Tee.WorldMap
     * @class South America countries.
     */
    Tee.SouthAmericaMap = function (id) {
      this.filter = ['AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'FK', 'GF', 'GY', 'GY', 'PY', 'PE', 'SR', 'UY', 'VE']

      Tee.WorldMap.call(this, id, -100, 10, 80, 70)
    }
    Tee.SouthAmericaMap.prototype = Tee.WorldMap

    /**
     * @constructor
     * @augments Tee.WorldMap
     * @class Australia (Continent) countries.
     */
    Tee.AustraliaMap = function (id) {
      this.filter = [
        'AS',
        'AU',
        'NZ',
        'CK',
        'FJ',
        'PF',
        'GU',
        'KI',
        'MP',
        'MH',
        'FM',
        'UM',
        'NR',
        'NC',
        'NU',
        'NF',
        'PW',
        'PG',
        'MP',
        'SB',
        'TK',
        'TO',
        'TV',
        'VU',
        'UM',
        'WF',
        'WS',
        'TP'
      ]

      Tee.WorldMap.call(this, id, 115, 5, 75, 50)
    }
    Tee.AustraliaMap.prototype = Tee.WorldMap

    /**
     * @constructor
     * @augments Tee.Series
     * @class Draws a Map consisting of any array of polygons.
     * @property {MapItem[]} items The array of map polygons ( points:[[x,y]], format:Tee.Format ).
     */
    Tee.Map = function (o, o2) {
      Tee.PaletteSeries.call(this, o, o2)

      var map = (this.svg = null)

      this.palette.colors = null
      this.useColors = true

      // Internal. Flag series to recalc min/max even if empty.
      this.__alwaysDraw = true

      // Internal. For Axis calcIncrement:
      this.sequential = false

      this.format.stroke.fill = 'black'

      this.hover.enabled = true
      this.hover.transparency = 0.5

      // 3D polygons:
      this.enableDepth = false

      // 3D depth based on polygon value:
      this.variableDepth = true

      //this.format.shadow.visible=true;

      this.items = []

      this.setMap = function (svgMap) {
        this.svg = svgMap
        map = svgMap

        this.items = []
        this.texts = []

        if (this.notmandatory) this.notmandatory.labels.labelStyle = 'value'

        var p,
          t,
          s = map.svg,
          l = s.childElementCount,
          svgpo,
          po,
          svgtxts

        if (l > 0) {
          s = s.childNodes[0]
          l = s.childElementCount
        }

        var item, pItem, tItem

        for (p = 0; p < l; p++) {
          item = s.childNodes[p]

          if (item.points !== undefined) {
            svgpo = item.points

            po = []

            for (t = 0; t < svgpo.numberOfItems; t++) {
              pItem = svgpo.getItem(t)
              po.push({ x: pItem.x, y: pItem.y })
            }

            this.items.push({ p: po, item: item })
          } else if (item.nodeName == 'text') {
            po = []
            var xVal = parseFloat(item.attributes['x'].value)
            var yVal = parseFloat(item.attributes['y'].value)
            po.push({ x: xVal, y: yVal, item: item })
            this.items.push({ p: po, item: item })
          } else if (item.nodeName == 'ellipse') {
            po = []
            var xVal = parseFloat(item.attributes['cx'].value)
            var yVal = parseFloat(item.attributes['cy'].value)
            //var xRad = parseFloat(item.attributes["rx"].value);
            //var yRad = parseFloat(item.attributes["ry"].value);
            po.push({ x: xVal, y: yVal, item: item })
            this.items.push({ p: po, item: item })
          }

          if (item.nodeName == 'path') {
            po = []
            var xVal = 0
            var yVal = 0
            //var xRad = parseFloat(item.attributes["rx"].value);
            //var yRad = parseFloat(item.attributes["ry"].value);
            po.push({ x: xVal, y: yVal, item: item })
            this.items.push({ p: po, item: item })
          }
        }
      }

      this.minXValue = function () {
        return map.bounds.x
      }
      this.minYValue = function () {
        return map.bounds.y - map.bounds.height
      }
      this.maxXValue = function () {
        return map.bounds.x + map.bounds.width
      }
      this.maxYValue = function () {
        return map.bounds.y
      }

      this.transformMap = function (c) {
        var mand = this.mandatoryAxis,
          nomand = this.notmandatory,
          rx = nomand.calc(map.bounds.x),
          ry = mand.calc(map.bounds.y + map.bounds.height),
          xs = nomand.scale,
          ys = mand.scale

        if (c.__webgl) {
          this.visual = c.beginParent()

          var cr = this.chart.chartRect

          //      this.visual.position.set(rx+-map.size.x -0.5*cr.width, -0.5*cr.height-0.5*map.size.height+map.size.offy+ry, 0); //map.size.height+map.size.y, 0);

          this.visual.position.set(rx - 0.5 * cr.width, mand.calc(map.bounds.y) - 0.5 * map.size.y + 0.5 * cr.height - 0.5 * map.size.offy, 0)
          this.visual.scale.set((xs * map.bounds.width) / map.size.width, (ys * map.bounds.height) / map.size.height, 1)

          c.z = this.format.z + this.format.depth * 0.5
        } else {
          c.translate(rx, ry)
          c.scale((xs * map.bounds.width) / map.size.width, (ys * map.bounds.height) / map.size.height)
          c.translate(-map.size.x - map.size.offx, map.size.height - map.size.y - map.size.offy)
        }
      }

      this.markText = function (index) {
        return this.svg.labels[this.items[index].item.id]
      }

      this.draw = function () {
        if (!this.items) return

        var p,
          l = this.items.length,
          //po, pitem, t,
          pi,
          f,
          c = this.chart.ctx

        c.save()

        this.transformMap(c)

        if (this.enableDepth) c.depth = this.format.depth * 0.03
        else c.depth = 0

        //c.beveled=true;

        var oldz = c.z

        var calcDepth = this.enableDepth && this.variableDepth && this._range > 0,
          tmpFactor = (this.format.depth * 0.03) / this._range

        for (p = 0; p < l; p++) {
          pi = this.items[p]

          f = pi.format || this.format

          if (pi.item.localName == 'polygon' || pi.item.localName == 'ellipse') {
            if (pi.item.style.stroke != '') f.stroke.fill = pi.item.style.stroke
            if (pi.item.style.strokeWidth != '') f.stroke.size = parseFloat(pi.item.style.strokeWidth, 10)

            if (this.useColors) f.fill = pi.item.style.fill

            if (calcDepth) {
              c.depth = tmpFactor * this.svg.values[pi.item.id]
              c.z = oldz
            }

            if (pi.item.localName == 'polygon') {
              if (c.__webgl) c.polygon(pi.p, f)
              else f.polygon(pi.p)
            } else f.ellipse(pi.p[0].x, pi.p[0].y, parseFloat(pi.item.attributes['rx'].value), parseFloat(pi.item.attributes['ry'].value), 0, 0, 7, false)
          } else if (pi.item.localName == 'path') {
            var po = []
            po.push({ x: 0, y: 0 })
            var instructions = pi.item.attributes[0].value.split(';')

            var thePath = ''
            let p = new Path2D(instructions)
            c.stroke(p)
          } else if (pi.item.localName == 'text') {
            c.font = pi.item.attributes['font-family'].value
            var strOut = pi.item.attributes['textContent'].value
            var rect = { x: pi.p[0].x, y: pi.p[0].y, width: f.textWidth(strOut), height: 0 }

            f.drawText(rect, strOut)
          }
        }

        var h = this.hover

        if (!c.__webgl && h.enabled && this.over != -1) {
          pi = this.items[this.over]

          var old = h.fill
          h.fill = pi.item.style.fill
          h.polygon(pi.p)
          h.fill = old
        }

        c.restore()

        if (c.__webgl) c.endParent()
      }

      this.applyPalette = function (colors) {
        var p = this.palette
        p.colors = colors || this.chart.palette.colors
        this.svg.applyPalette(p.colors)

        var tmp,
          l = this.items.length,
          t,
          min,
          max

        for (t = 0; t < l; t++) {
          tmp = this.svg.values[this.items[t].item.id]

          if (t === 0 || tmp > max) max = tmp

          if (t === 0 || tmp < min) min = tmp
        }

        this._range = max - min
        this._min = min
        this._max = max

        this.prepareColors()
      }

      function pointInPolygon(ctx, p, points) {
        var t,
          l = points.length

        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)

        for (t = 1; t < l; t++) ctx.lineTo(points[t].x, points[t].y)

        ctx.closePath()

        return ctx.isPointInPath(p.x, p.y)
      }

      this.clicked = function (p) {
        var res = -1,
          t,
          l = this.items.length,
          c = this.chart.ctx

        //IE8 ExCanvas does not support "isPointInPath"
        if (c.isPointInPath) {
          c.save()
          this.transformMap(c)

          if (this.over != -1 && this.over < l && pointInPolygon(c, p, this.items[this.over].p)) res = this.over
          else
            for (t = l - 1; t >= 0; t--)
              if (pointInPolygon(c, p, this.items[t].p)) {
                res = t
                break
              }

          c.restore()
        }

        return res
      }

      this.getItemBounds = function (item) {
        // Cache bounds calculation:

        if (!item.bounds) {
          item.bounds = { x: 0, y: 0, width: 0, height: 0 }
          this.format.polygonBounds(item.p, item.bounds)
        }

        return item.bounds
      }

      // Return xy pixel position of index'th polygon bounding center:

      this.calc = function (index, p) {
        var item = this.items[index],
          mand = this.mandatoryAxis

        var b = this.getItemBounds(item)

        ;(p.x = this.notmandatory.calc(b.x + b.width * 0.5)), (p.y = mand.startPos + mand.endPos - mand.calc(b.y + b.height * 0.5))
      }

      function parseCoordinate(coord, invert) {
        if (typeof coord === 'string') {
          var i = coord.indexOf(' ')
          if (i > 0) {
            var tmp = coord.substr(i + 1, 1)
            coord = parseFloat(coord.substr(0, i))
            if (tmp === invert) coord = -coord
          }
        }
        return coord
      }

      this.addLocation = function (series, lat, lon, text) {
        var data = series.data

        if (!data.x) data.x = []

        lat = parseCoordinate(lat, 'S')
        lon = -parseCoordinate(lon, 'E')

        data.values.push(lat)
        data.x.push(lon)
        data.labels.push(text || '')
      }

      this.addPoint = function (series, x, y, text) {
        var data = series.data

        if (!data.x) data.x = []

        y = parseCoordinate(y, 'Y')
        x = parseCoordinate(x, 'X')

        data.values.push(y)
        data.x.push(x)
        data.labels.push(text || '')
      }
    }

    Tee.Map.prototype = new Tee.PaletteSeries()
  }).call(this)

  /** END MAPS */
}).call(this)

export const {
  ActivityGauge,
  Animation,
  Annotation,
  Area,
  Bar,
  HorizBar,
  Bubble,
  Bullet,
  Candle,
  Chart,
  CheckBox,
  CursorTool,
  CustomBar,
  CustomSeries,
  doHttpRequest,
  DOMTip,
  Donut,
  DragTool,
  drawSpline,
  FadeAnimation,
  Format,
  Gantt,
  HighLowBar,
  HorizArea,
  Line,
  LinearGauge,
  MarksAnimation,
  Palette,
  PaletteSeries,
  Pie,
  PointXY,
  Polar,
  RainbowPalette,
  Rectangle,
  Scroller,
  Series,
  SeriesAnimation,
  Sliced,
  Slider,
  SliderControl,
  Tool,
  ToolTip,
  Treemap,
  Volume,

  /* TABLE */
  Table,

  /* DATA */
  Data,

  /** EDITOR */
  ChartEditor,

  /* GAUGES */
  CircularGauge,
  NumericGauge,

  /* 3D */
  ColorGrid,
  Surface,
  MyParametricGeometry,
  Three,
  THREE,

  /* MAPS */
  SVGMap,
  LayoutMap,
  WorldMap,
  USAMap,
  EuropeMap,
  Europe27Map,
  AfricaMap,
  AsiaMap,
  SouthAmericaMap,
  AustraliaMap,
  Map
} = Tee
