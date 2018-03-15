function changeTheme(aTheme) {
  $('canvas').each(function () {
    if ($(this)[0].chart) {
      var chart = $(this)[0].chart;
      chart.applyTheme(aTheme);

      for (var i = 0; i < chart.series.count(); i++) {
        if ((chart.series.items[i].pointer) && (chart.series.items[i].pointer.format))
          chart.series.items[i].pointer.format.stroke.fill = "white";
      }
    }
  })
}

function changePalette(palette) {
  $('canvas').each(function () {
    if ($(this)[0].chart)
      $(this)[0].chart.applyPalette(palette);
  })
}

function changeThemeToDefault() {
  changeTheme("minimal");
  changePalette("seaWash");
}

function changeBackground(aTheme) {
  if (aTheme === "dark")
    changeBackgroundToDark();
  else
    changeBackgroundToWhite();
}

function changeBackgroundToDark() {
  document.body.style.backgroundColor = "#0C0C0C";
  document.body.style.color = "white";
  document.getElementById("theme").style.backgroundColor = "#0C0C0C";
  document.getElementById("palette").style.backgroundColor = "#0C0C0C";
  document.getElementById("canvasPanel").style.backgroundColor = "#0C0C0C";
  document.getElementById("optionPanel").style.backgroundColor = "#0C0C0C";
}

function changeBackgroundToWhite() {
  document.body.style.backgroundColor = "rgb(212, 212, 212)";
  document.body.style.color = "black";
  document.getElementById("theme").style.backgroundColor = "#ffffff";
  document.getElementById("palette").style.backgroundColor = "#ffffff";
  document.getElementById("canvasPanel").style.backgroundColor = "#ffffff";
  document.getElementById("optionPanel").style.backgroundColor = "#ffffff";
}

function resize(element) {
  if (element != null) {
    var w = 0;

    if (element.canvas) {
      w = parseInt(window.getComputedStyle(element.canvas.parentElement, null).width, 10) | w;
      element.canvas.width = w;
    }

    if (element.bounds)
      element.bounds.width = w;

    if (typeof element.draw === "function") element.draw();
  }
}

function resizeAllCharts() {
  $('canvas').each(function () {
    if ($(this)[0].chart)
      resize($(this)[0].chart);
  })
}

function showHide(element) {
  var selectorsDiv = $(element).closest('.x_panel').children('.x_content')[0];
  var icon = $(element).children('i')[0];

  if (selectorsDiv.style.display === "none") {
    selectorsDiv.style.display = "block";
    icon.classList.add('fa-chevron-up');
    icon.classList.remove('fa-chevron-down');
  }
  else {
    selectorsDiv.style.display = "none";
    icon.classList.add('fa-chevron-down');
    icon.classList.remove('fa-chevron-up');
  }
}

$(function () {
  $(window).load(function () {
    resizeAllCharts();
  })

  $(window).resize(function () {
    resizeAllCharts();
  })
});