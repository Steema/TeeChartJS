/// <reference path="teechart.d.ts" />
/// <reference path="teechart-gauges.d.ts" />
var Tee;
(function (Tee) {
    function createChart(canvas) {
        var chart1 = new Tee.Chart(canvas);
        var series1 = new Tee.Line([
            4, 
            10, 
            8, 
            20
        ]);
        series1.smooth = 0.5;
        chart1.addSeries(series1);
        chart1.title.text = "Hello TypeScript !";
        chart1.footer.text = "I am a TeeChart !";
        series1.format.fill = "green";
        series1.pointer.visible = true;
        series1.colorEach = "no";
        series1.marks.visible = true;
        series1.marks.format.gradient.visible = true;
        chart1.canvas.width = 800;
        chart1.bounds.width = 800;
        var series2 = new Tee.Line();
        series2.addRandom(4, 20);
        chart1.addSeries(series2);
        return chart1;
    }
    Tee.createChart = createChart;
    function createGauge(canvas) {
        var chart1 = new Tee.Chart(canvas);
        var gauge1 = chart1.addSeries(new Tee.CircularGauge());

        gauge1.units.text = "Gauge";
        chart1.panel.transparent = true;
        chart1.title.visible = false;
        gauge1.value = 42;
        return chart1;
    }
    Tee.createGauge = createGauge;
})(Tee || (Tee = {}));

