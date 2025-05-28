/**
 * @memberOf Tee
 * @public
 * @constructor
 * @class Represents an X,Y point.
 * @param {Number} x Horizontal point position.
 * @param {Number} y Vertical point position.
 * @property {Number} x The horizontal coordinate.
 * @property {Number} y The vertical coordinate.
 */
export class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

export function pointInLine(p, p1, p2, tolerance) {
  function distance() {
    var dx, dy

    if (p2.x == p1.x && p2.y == p1.y) {
      dx = p.x - p1.x
      dy = p.y - p1.y
    } else {
      dx = p2.x - p1.x
      dy = p2.y - p1.y

      var result = ((p.x - p1.x) * dx + (p.y - p1.y) * dy) / (dx * dx + dy * dy)

      if (result < 0) {
        dx = p.x - p1.x
        dy = p.y - p1.y
      } else if (result > 1) {
        dx = p.x - p2.x
        dy = p.y - p2.y
      } else {
        dx = p.x - (p1.x + result * dx)
        dy = p.y - (p1.y + result * dy)
      }
    }

    return Math.sqrt(dx * dx + dy * dy)
  }

  if ((p.x == p1.x && p.y == p1.y) || (p.x == p2.x && p.y == p2.y)) return true
  else return Math.abs(distance()) <= tolerance + 1
}
