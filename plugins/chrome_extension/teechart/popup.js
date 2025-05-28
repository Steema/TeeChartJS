function doChart() {
  var data = chrome.extension.getBackgroundPage().selectedChart;
  if (data) {
    var chart1=new Tee.Chart("chart");

    var datacopy=data.values.slice(0);
    var s1=chart1.addSeries(new Tee.Bar());
    s1.data.values=datacopy.slice(0);
    chart1.title.text=data.title;
    chart1.draw();

  //    chart1.canvas.addEventListener('click', function () {
  //          window.close();
  //    });
  }
}

window.onload = doChart;

