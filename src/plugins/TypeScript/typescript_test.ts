/// <reference path="teechart.d.ts" />

module Tee {

  export function createChart(canvas:string):IChart {
    var chart1 = new Chart(canvas);

    var series1 = new Line([4,10,8,20]);

    chart1.addSeries(series1);

    chart1.title.text="Hello TypeScript !";
    chart1.footer.text = "I am a TeeChart !";

    chart1.axes.left.title.text = "left axis title";

    series1.format.fill = "green";
    series1.pointer.visible=true;
    series1.colorEach = "no";

    series1.marks.visible=true;
    series1.marks.format.gradient.visible=true;

    chart1.canvas.width = 800;
    chart1.bounds.width = 800;

    return chart1;
  }
}

