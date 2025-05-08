function resize(chart) {
  var startWidth = 1600
  var startHeight = 400
  var w
  var h
  var canvas = chart.canvas
  if (chart !== null) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      w = window.innerWidth
      h = window.innerHeight
      if (w <= 991) {
        canvas.style.width = '' + w * 0.9 + 'px'
        canvas.style.height = '' + (w * 0.9 * startHeight) / startWidth + 'px'
      } else {
        canvas.style.width = '' + startWidth + 'px'
        canvas.style.height = '' + startHeight + 'px'
        chart.bounds.width = startWidth
        chart.bounds.height = startHeight
      }
      chart.draw()
    } else {
      w = startWidth
      h = startHeight

      if (window.innerWidth - canvas.offsetLeft - 20 < startWidth) w = window.innerWidth - canvas.offsetLeft - 20
      else w = startWidth

      if ((window.innerWidth * startHeight) / startWidth < startHeight) h = (window.innerWidth * startHeight) / startWidth
      else h = startHeight

      canvas.setAttribute('width', '' + w + 'px')

      canvas.setAttribute('height', '' + h + 'px')

      canvas.style.width = '' + w + 'px'
      canvas.style.height = '' + h + 'px'

      chart.bounds.width = w
      chart.bounds.height = h

      chart.draw()
    }
  }
}
