; (function ($, window, document, undefined) {

    // The actual plugin constructor
    function TeeChart(element) {
        this.element = element;
        this.$element = $(element);
        
        this.chart = new Tee.Chart(element);
    }

    TeeChart.prototype = {

        // Structure of properties that can be initialized when creating a new graphic
        defaults: {
            chart: {
                aspect: undefined,      // defaultAspect
                axes: {
                    bottom: undefined,  // defaultAxis
                    left: undefined,    // defaultAxis
                    right: undefined,   // defaultAxis
                    top: undefined      // defaultAxis
                },
                bounds: [],             // [x, y, width, height]
                footer: undefined,      // defaultAnnotation
                panel: undefined,       // defaultPanel
                title: undefined,       // defaultAnnotation
                legend: {
                    align: undefined,
                    bounds: [],             // [x, y, width, height]
                    dividing: undefined,    // defaultStroke
                    fontColor: undefined,
                    format: undefined,      // defaultFormat
                    inverted: undefined,
                    legendStyle: undefined,
                    padding: undefined,
                    position: undefined,
                    symbol: undefined,      // defaultSymbol
                    textStyle: undefined,
                    title: undefined,       // defaultAnnotation
                    transparent: undefined,
                    visible: undefined
                },
                walls: {
                    left: undefined,        // defaultWall
                    right: undefined,       // defaultWall
                    bottom: undefined,      // defaultWall
                    back: undefined,        // defaultWall
                    visible: undefined
                },
                zoom: undefined,            // defaultZoom
                scroll: undefined           // defaultScroll
            },
            series: [
                // array of series
                // each serie: defaultSeries
            ],
            tools: [
                // array of tools
                // each tool: defaultTool
            ]
        },
        
        defaultSeries: {
            type: 'line',
            title: undefined,
            colorEach: undefined,
            cursor: undefined,
            decimals: undefined,
            format: undefined,      // defaultFormat
            hover: undefined,       // defaultFormat
            marks: undefined,       // defaultSeriesMarks
            horizAxis: undefined,
            vertAxis: undefined,
            visible: undefined,
            data: {
                values: [],
                x: [],
                labels: [],
                // specific for bubble
                radius: [],
                // specific for candle
                open: [],
                close: [],
                high: [],
                low: [],
                // specific for gantt
                start: [],  // must have the same values as the 'values' array and both are mandatory
                end: [],
                completion: []
            },
            // specific options depending of the type of serie
            options: undefined
        },

        defaultTool: {
            active: undefined,
            type: undefined,
            // specific options depending of the type of tool
            options: undefined
        },

        defaultFont: {
            fill: undefined,
            textAlign: undefined,
            baseLine: undefined,
            style: undefined,
        },

        defaultStroke: {
            cap: undefined,
            dash: [],
            fill: undefined,
            join: undefined,
            size: undefined
        },

        defaultGradient: {
            balance: undefined,
            colors: [],
            stops: [],
            direction: undefined,
            visible: undefined
        },

        defaultShadow: {
            blur: undefined,
            color: undefined,
            width: undefined,
            height: undefined,
            visible: undefined
        },

        defaultFormat: {
            fill: undefined,            // color
            font: undefined,            // defaultFont
            gradient: undefined,        // defaultGradient
            shadow: undefined,          // defaultShadow
            stroke: undefined,          // defaultStroke
            transparency: undefined,    // 0..1
            length: undefined,
            visible: undefined,
            outside: undefined,
        },

        defaultAspect: {
            view3d: undefined,
            ortogonal: undefined,
            rotation: undefined,
            elevation: undefined,
            perspective: undefined,
            clip: undefined
        },

        defaultGrid: {
            format: undefined,      // defaultFormat
            linedash: undefined,    // bool
            visible: undefined      // bool
        },

        defaultLabels: {
            alternate: undefined,
            dateFormat: undefined,
            decimals: undefined,
            labelStyle: undefined,
            padding: undefined,
            rotation: undefined,
            separation: undefined,
            visible: undefined,
            format: undefined       // defaultFormat
        },

        defaultTicks: {
            length: undefined,
            visible: undefined,
            stroke: undefined,      // defaultStroke
        },

        defaultAxis: {
            automatic: undefined,
            axisSize: undefined,
            logarithmic: undefined,
            increment: undefined,
            inverted: undefined,
            grid: undefined,            // defaultGrid
            labels: undefined,          // defaultLabels
            maximum: undefined,
            minimum: undefined,
            startPos: undefined,
            endPos: undefined,
            scale: undefined,
            minorTicks: undefined,      // defaultTicks
            innerTicks: undefined,      // defaultTicks
            ticks: undefined,           // defaultTicks
            title: undefined            // defaultAnnotation
        },

        defaultAnnotation: {
            text: undefined,        // string
            format: undefined,      // defaultFormat
            margins: [],            // [left, top, right, bottom]
            position: [],           // [x, y]
            transparent: undefined, // boolean
            visible: undefined      // boolean
        },

        defaultSymbol: {
            format: undefined,      // defaultFormat
            height: undefined,
            padding: undefined,
            width: undefined,
            visible: undefined
        },

        defaultPanel: {
            format: undefined,      // defaultFormat
            margins: [],            // [left, top, right, bottom]
            transparent: undefined
        },

        defaultWall: {
            bounds: [],         // [x, y, width, height]
            format: undefined,  // defaultFormat
            visible: undefined
        },

        defaultZoom: {
            enabled: undefined,
            direction: undefined,
            mouseButton: undefined,
            format: undefined       // defaultFormat
        },

        defaultScroll: {
            enabled: undefined,
            direction: undefined,
            mouseButton: undefined
        },

        defaultSeriesMarks: {
            arrow: undefined,       // defaultFormat
            arrowLength: undefined,
            drawEvery: undefined,
            style: undefined,
            visible: undefined
        },

        defaultCustomSeries: {
            drawLine: undefined,
            stacked: undefined,
            stairs: undefined,
            smooth: undefined,
            pointer: undefined  // defaultPointer
        },

        defaultCustomBarSeries: {
            barSize: undefined,
            barStyle: undefined,
            origin: undefined,
            sideMargins: undefined,
            stacked: undefined,
            useOrigin: undefined
        },

        defaultAreaSeries: {
            // defaultCustomSeries and, in addition:
            origin: undefined,
            useOrigin: undefined
        },

        defaultPieSeries: {
            donut: undefined,
            rotation: undefined,
            explode: [],
            concentric: undefined
        },

        defaultCandleSeries: {
            higher: undefined,  // defaultFormat
            lower: undefined,   // defaultFormat
        },

        defaultGanttSeries: {
            dateFormat: undefined
        },

        defaultCircularGaugeSeries: {
            min: undefined,
            max: undefined,
            step: undefined,
            value: undefined,
            angle: undefined,
            rotation: undefined,
            rotateText: undefined,
            shape: undefined,
            bevel: undefined,       // defaultFormat
            center: undefined,      // defaultFormat
            centerTop: undefined,   // defaultFormat
            ticks: undefined,       // defaultFormat
            ticksBack: undefined,   // defaultFormat
            minor: undefined,       // defaultFormat
            minorBack: undefined,   // defaultFormat
            hand: undefined,        // defaultFormat
            back: undefined,        // defaultFormat
            pointer: undefined,     // defaultFormat
            units: undefined        // defaultAnnotation
        },

        defaultPointer: {
            colorEach: undefined,
            height: undefined,
            width: undefined,
            style: undefined,
            visible: undefined,
            format: undefined   // defaultFormat
        },

        defaultCursorTool: {
            direction: undefined,
            followMouse: undefined,
            format: undefined,      // defaultFormat
            size: []
        },

        defaultToolTip: {
            animated: undefined,
            autoHide: undefined,
            delay: undefined,
            format: undefined       // defaultFormat
            // as the tool tip inherits from the annotation tool, 
            //here are allowed all the properties from the annotation tool
        },

        defaultAnimationTool: {
            series: undefined,  // index of the Chart.SeriesList (optional)
            kind: undefined,
            duration: undefined
        },

        init: function (options) {

            this.options = $.extend(true, {}, this.defaults, options);

            //Fill options with all available values in the default objects
            this.initDefaultOptions();
            this.initDefaultSeries();
            this.initDefaultTools();

            //Initialize chart, series and tools with values from options
            this.initChart();
            this.initSeries();
            this.initTools();

            //Draw chart
            this.draw();

            return this;
        },

        initDefaultOptions: function () {
            //chart aspect
            this.options.chart.aspect = $.extend(true, {}, this.defaultAspect, this.options.chart.aspect);

            //chart axis bottom
            this.options.chart.axes.bottom = $.extend(true, {}, this.defaultAxis, this.options.chart.axes.bottom);
                //grid
            this.options.chart.axes.bottom.grid = $.extend(true, {}, this.defaultGrid, this.options.chart.axes.bottom.grid);
            this.options.chart.axes.bottom.grid.format = $.extend(true, {}, this.defaultFormat, this.options.chart.axes.bottom.grid.format);
            this.initDefaultFormatOptions(this.options.chart.axes.bottom.grid.format);
                //labels
            this.options.chart.axes.bottom.labels = $.extend(true, {}, this.defaultLabels, this.options.chart.axes.bottom.labels);
            this.options.chart.axes.bottom.labels.format = $.extend(true, {}, this.defaultFormat, this.options.chart.axes.bottom.labels.format);
            this.initDefaultFormatOptions(this.options.chart.axes.bottom.labels.format);
                //minor ticks
            this.options.chart.axes.bottom.minorTicks = $.extend(true, {}, this.defaultTicks, this.options.chart.axes.bottom.minorTicks);
            this.options.chart.axes.bottom.minorTicks.stroke = $.extend(true, {}, this.defaultStroke, this.options.chart.axes.bottom.minorTicks.stroke);
                //inner ticks
            this.options.chart.axes.bottom.innerTicks = $.extend(true, {}, this.defaultTicks, this.options.chart.axes.bottom.innerTicks);
            this.options.chart.axes.bottom.innerTicks.stroke = $.extend(true, {}, this.defaultStroke, this.options.chart.axes.bottom.innerTicks.stroke);
                //ticks
            this.options.chart.axes.bottom.ticks = $.extend(true, {}, this.defaultTicks, this.options.chart.axes.bottom.ticks);
            this.options.chart.axes.bottom.ticks.stroke = $.extend(true, {}, this.defaultStroke, this.options.chart.axes.bottom.ticks.stroke);
                //title
            this.options.chart.axes.bottom.title = $.extend(true, {}, this.defaultAnnotation, this.options.chart.axes.bottom.title);
            this.options.chart.axes.bottom.title.format = $.extend(true, {}, this.defaultFormat, this.options.chart.axes.bottom.title.format);
            this.initDefaultFormatOptions(this.options.chart.axes.bottom.title.format);

            //chart axis left
            this.options.chart.axes.left = $.extend(true, {}, this.defaultAxis, this.options.chart.axes.left);
                //grid
            this.options.chart.axes.left.grid = $.extend(true, {}, this.defaultGrid, this.options.chart.axes.left.grid);
            this.options.chart.axes.left.grid.format = $.extend(true, {}, this.defaultFormat, this.options.chart.axes.left.grid.format);
            this.initDefaultFormatOptions(this.options.chart.axes.left.grid.format);
                //labels
            this.options.chart.axes.left.labels = $.extend(true, {}, this.defaultLabels, this.options.chart.axes.left.labels);
            this.options.chart.axes.left.labels.format = $.extend(true, {}, this.defaultFormat, this.options.chart.axes.left.labels.format);
            this.initDefaultFormatOptions(this.options.chart.axes.left.labels.format);
                //minor ticks
            this.options.chart.axes.left.minorTicks = $.extend(true, {}, this.defaultTicks, this.options.chart.axes.left.minorTicks);
            this.options.chart.axes.left.minorTicks.stroke = $.extend(true, {}, this.defaultStroke, this.options.chart.axes.left.minorTicks.stroke);
                //inner ticks
            this.options.chart.axes.left.innerTicks = $.extend(true, {}, this.defaultTicks, this.options.chart.axes.left.innerTicks);
            this.options.chart.axes.left.innerTicks.stroke = $.extend(true, {}, this.defaultStroke, this.options.chart.axes.left.innerTicks.stroke);
                //ticks
            this.options.chart.axes.left.ticks = $.extend(true, {}, this.defaultTicks, this.options.chart.axes.left.ticks);
            this.options.chart.axes.left.ticks.stroke = $.extend(true, {}, this.defaultStroke, this.options.chart.axes.left.ticks.stroke);
                //title
            this.options.chart.axes.left.title = $.extend(true, {}, this.defaultAnnotation, this.options.chart.axes.left.title);
            this.options.chart.axes.left.title.format = $.extend(true, {}, this.defaultFormat, this.options.chart.axes.left.title.format);
            this.initDefaultFormatOptions(this.options.chart.axes.left.title.format);

            //chart axis right
            this.options.chart.axes.right = $.extend(true, {}, this.defaultAxis, this.options.chart.axes.right);
                //grid
            this.options.chart.axes.right.grid = $.extend(true, {}, this.defaultGrid, this.options.chart.axes.right.grid);
            this.options.chart.axes.right.grid.format = $.extend(true, {}, this.defaultFormat, this.options.chart.axes.right.grid.format);
            this.initDefaultFormatOptions(this.options.chart.axes.right.grid.format);
                //labels
            this.options.chart.axes.right.labels = $.extend(true, {}, this.defaultLabels, this.options.chart.axes.right.labels);
            this.options.chart.axes.right.labels.format = $.extend(true, {}, this.defaultFormat, this.options.chart.axes.right.labels.format);
            this.initDefaultFormatOptions(this.options.chart.axes.right.labels.format);
                //minor ticks
            this.options.chart.axes.right.minorTicks = $.extend(true, {}, this.defaultTicks, this.options.chart.axes.right.minorTicks);
            this.options.chart.axes.right.minorTicks.stroke = $.extend(true, {}, this.defaultStroke, this.options.chart.axes.right.minorTicks.stroke);
                //inner ticks
            this.options.chart.axes.right.innerTicks = $.extend(true, {}, this.defaultTicks, this.options.chart.axes.right.innerTicks);
            this.options.chart.axes.right.innerTicks.stroke = $.extend(true, {}, this.defaultStroke, this.options.chart.axes.right.innerTicks.stroke);
                //ticks
            this.options.chart.axes.right.ticks = $.extend(true, {}, this.defaultTicks, this.options.chart.axes.right.ticks);
            this.options.chart.axes.right.ticks.stroke = $.extend(true, {}, this.defaultStroke, this.options.chart.axes.right.ticks.stroke);
                //title
            this.options.chart.axes.right.title = $.extend(true, {}, this.defaultAnnotation, this.options.chart.axes.right.title);
            this.options.chart.axes.right.title.format = $.extend(true, {}, this.defaultFormat, this.options.chart.axes.right.title.format);
            this.initDefaultFormatOptions(this.options.chart.axes.right.title.format);

            //chart axis top
            this.options.chart.axes.top = $.extend(true, {}, this.defaultAxis, this.options.chart.axes.top);
                //grid
            this.options.chart.axes.top.grid = $.extend(true, {}, this.defaultGrid, this.options.chart.axes.top.grid);
            this.options.chart.axes.top.grid.format = $.extend(true, {}, this.defaultFormat, this.options.chart.axes.top.grid.format);
            this.initDefaultFormatOptions(this.options.chart.axes.top.grid.format);
                //labels
            this.options.chart.axes.top.labels = $.extend(true, {}, this.defaultLabels, this.options.chart.axes.top.labels);
            this.options.chart.axes.top.labels.format = $.extend(true, {}, this.defaultFormat, this.options.chart.axes.top.labels.format);
            this.initDefaultFormatOptions(this.options.chart.axes.top.labels.format);
                //minor ticks
            this.options.chart.axes.top.minorTicks = $.extend(true, {}, this.defaultTicks, this.options.chart.axes.top.minorTicks);
            this.options.chart.axes.top.minorTicks.stroke = $.extend(true, {}, this.defaultStroke, this.options.chart.axes.top.minorTicks.stroke);
                //inner ticks
            this.options.chart.axes.top.innerTicks = $.extend(true, {}, this.defaultTicks, this.options.chart.axes.top.innerTicks);
            this.options.chart.axes.top.innerTicks.stroke = $.extend(true, {}, this.defaultStroke, this.options.chart.axes.top.innerTicks.stroke);
                //ticks
            this.options.chart.axes.top.ticks = $.extend(true, {}, this.defaultTicks, this.options.chart.axes.top.ticks);
            this.options.chart.axes.top.ticks.stroke = $.extend(true, {}, this.defaultStroke, this.options.chart.axes.top.ticks.stroke);
                //title
            this.options.chart.axes.top.title = $.extend(true, {}, this.defaultAnnotation, this.options.chart.axes.top.title);
            this.options.chart.axes.top.title.format = $.extend(true, {}, this.defaultFormat, this.options.chart.axes.top.title.format);
            this.initDefaultFormatOptions(this.options.chart.axes.top.title.format);

            //chart title
            this.options.chart.title = $.extend(true, {}, this.defaultAnnotation, this.options.chart.title);
            this.options.chart.title.format = $.extend(true, {}, this.defaultFormat, this.options.chart.title.format);
            this.initDefaultFormatOptions(this.options.chart.title.format);

            //chart footer
            this.options.chart.footer = $.extend(true, {}, this.defaultAnnotation, this.options.chart.footer);
            this.options.chart.footer.format = $.extend(true, {}, this.defaultFormat, this.options.chart.footer.format);
            this.initDefaultFormatOptions(this.options.chart.footer.format);

            //chart panel
            this.options.chart.panel = $.extend(true, {}, this.defaultPanel, this.options.chart.panel);
            this.options.chart.panel.format = $.extend(true, {}, this.defaultFormat, this.options.chart.panel.format);
            this.initDefaultFormatOptions(this.options.chart.panel.format);

            //chart legend dividing (stroke)
            this.options.chart.legend.dividing = $.extend(true, {}, this.defaultStroke, this.options.chart.legend.dividing);

            //chart legend format
            this.options.chart.legend.format = $.extend(true, {}, this.defaultFormat, this.options.chart.legend.format);
            this.initDefaultFormatOptions(this.options.chart.legend.format);

            //chart legend symbol
            this.options.chart.legend.symbol = $.extend(true, {}, this.defaultSymbol, this.options.chart.legend.symbol);
            this.options.chart.legend.symbol.format = $.extend(true, {}, this.defaultFormat, this.options.chart.legend.symbol.format);
            this.initDefaultFormatOptions(this.options.chart.legend.symbol.format);

            //chart legend title
            this.options.chart.legend.title = $.extend(true, {}, this.defaultAnnotation, this.options.chart.legend.title);
            this.options.chart.legend.title.format = $.extend(true, {}, this.defaultFormat, this.options.chart.legend.title.format);
            this.initDefaultFormatOptions(this.options.chart.legend.title.format);

            //chart wall left
            this.options.chart.walls.left = $.extend(true, {}, this.defaultWall, this.options.chart.walls.left);
            this.options.chart.walls.left.format = $.extend(true, {}, this.defaultFormat, this.options.chart.walls.left.format);
            this.initDefaultFormatOptions(this.options.chart.walls.left.format);

            //chart wall right
            this.options.chart.walls.right = $.extend(true, {}, this.defaultWall, this.options.chart.walls.right);
            this.options.chart.walls.right.format = $.extend(true, {}, this.defaultFormat, this.options.chart.walls.right.format);
            this.initDefaultFormatOptions(this.options.chart.walls.right.format);

            //chart wall bottom
            this.options.chart.walls.bottom = $.extend(true, {}, this.defaultWall, this.options.chart.walls.bottom);
            this.options.chart.walls.bottom.format = $.extend(true, {}, this.defaultFormat, this.options.chart.walls.bottom.format);
            this.initDefaultFormatOptions(this.options.chart.walls.bottom.format);

            //chart wall back
            this.options.chart.walls.back = $.extend(true, {}, this.defaultWall, this.options.chart.walls.back);
            this.options.chart.walls.back.format = $.extend(true, {}, this.defaultFormat, this.options.chart.walls.back.format);
            this.initDefaultFormatOptions(this.options.chart.walls.back.format);

            //chart zomm
            this.options.chart.zoom = $.extend(true, {}, this.defaultZoom, this.options.chart.zoom);
            this.options.chart.zoom.format = $.extend(true, {}, this.defaultFormat, this.options.chart.zoom.format);
            this.initDefaultFormatOptions(this.options.chart.zoom.format);

            //chart scroll
            this.options.chart.scroll = $.extend(true, {}, this.defaultScroll, this.options.chart.scroll);
        },
        
		initDefaultSeries: function () {
			for (var t = 0, l = this.options.series.length; t < l; t++) {
				this.options.series[t] = $.extend(true, {}, this.defaultSeries, this.options.series[t]);

                // series format
                this.options.series[t].format = $.extend(true, {}, this.defaultFormat, this.options.series[t].format);
                this.initDefaultFormatOptions(this.options.series[t].format);

                // series hover
                this.options.series[t].hover = $.extend(true, {}, this.defaultFormat, this.options.series[t].hover);
                this.initDefaultFormatOptions(this.options.series[t].hover);

                // series marks
                this.options.series[t].marks = $.extend(true, {}, this.defaultSeriesMarks, this.options.series[t].marks);
                this.options.series[t].marks.arrow = $.extend(true, {}, this.defaultFormat, this.options.series[t].marks.arrow);
                this.initDefaultFormatOptions(this.options.series[t].marks.arrow);

                // specific options depending of the type of serie
                if (this.options.series[t].type == "line" || 
                    this.options.series[t].type == "pointxy" || 
                    this.options.series[t].type == "bubble") {
                    this.options.series[t].options = $.extend(true, {}, this.defaultCustomSeries, this.options.series[t].options);
                    this.options.series[t].options.pointer = $.extend(true, {}, this.defaultPointer, this.options.series[t].options.pointer);
                    this.options.series[t].options.pointer.format = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.pointer.format);
                    this.initDefaultFormatOptions(this.options.series[t].options.pointer.format);
                } else if (this.options.series[t].type == "bar" || 
                           this.options.series[t].type == "horizBar" || 
                           this.options.series[t].type == "volume") {
                    this.options.series[t].options = $.extend(true, {}, this.defaultCustomBarSeries, this.options.series[t].options);
                } else if (this.options.series[t].type == "area" || 
                           this.options.series[t].type == "horizArea") {
                    var defaultOptionsArea = $.extend(true, {}, this.defaultCustomSeries, this.defaultAreaSeries);
                    this.options.series[t].options = $.extend(true, {}, this.defaultOptionsArea, this.options.series[t].options);
                    this.options.series[t].options.pointer = $.extend(true, {}, this.defaultPointer, this.options.series[t].options.pointer);
                    this.options.series[t].options.pointer.format = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.pointer.format);
                    this.initDefaultFormatOptions(this.options.series[t].options.pointer.format);
                } else if (this.options.series[t].type == "pie" || 
                           this.options.series[t].type == "donut") {
                    this.options.series[t].options = $.extend(true, {}, this.defaultPieSeries, this.options.series[t].options);
                } else if (this.options.series[t].type == "candle") {
                    this.options.series[t].options.higher = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.higher);
                    this.options.series[t].options.lower = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.lower);
                    this.initDefaultFormatOptions(this.options.series[t].options.higher);
                    this.initDefaultFormatOptions(this.options.series[t].options.lower);
                } else if (this.options.series[t].type == "gantt") {
                    this.options.series[t].options = $.extend(true, {}, this.defaultGanttSeries, this.options.series[t].options);
                } else if (this.options.series[t].type == "circularGauge") {
                    this.options.series[t].options = $.extend(true, {}, this.defaultCircularGaugeSeries, this.options.series[t].options);
                    this.options.series[t].options.bevel = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.bevel);
                    this.options.series[t].options.center = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.center);
                    this.options.series[t].options.centerTop = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.centerTop);
                    this.options.series[t].options.ticks = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.ticks);
                    this.options.series[t].options.ticksBack = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.ticksBack);
                    this.options.series[t].options.minor = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.minor);
                    this.options.series[t].options.minorBack = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.minorBack);
                    this.options.series[t].options.hand = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.hand);
                    this.options.series[t].options.back = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.back);
                    this.options.series[t].options.pointer = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.pointer);
                    this.options.series[t].options.units = $.extend(true, {}, this.defaultAnnotation, this.options.series[t].options.units);
                    this.options.series[t].options.units.format = $.extend(true, {}, this.defaultFormat, this.options.series[t].options.units.format);
                    this.initDefaultFormatOptions(this.options.series[t].options.bevel);
                    this.initDefaultFormatOptions(this.options.series[t].options.center);
                    this.initDefaultFormatOptions(this.options.series[t].options.centerTop);
                    this.initDefaultFormatOptions(this.options.series[t].options.ticks);
                    this.initDefaultFormatOptions(this.options.series[t].options.ticksBack);
                    this.initDefaultFormatOptions(this.options.series[t].options.minor);
                    this.initDefaultFormatOptions(this.options.series[t].options.minorBack);
                    this.initDefaultFormatOptions(this.options.series[t].options.hand);
                    this.initDefaultFormatOptions(this.options.series[t].options.back);
                    this.initDefaultFormatOptions(this.options.series[t].options.pointer);
                    this.initDefaultFormatOptions(this.options.series[t].options.units.format);
                }
			}
		},

        initDefaultTools: function () {
			for (var t = 0, l = this.options.tools.length; t < l; t++) {
				this.options.tools[t] = $.extend(true, {}, this.defaultTools, this.options.tools[t]);

                // specific options depending of the type of tool
                if (this.options.tools[t].type == "annotation") {
                    this.options.tools[t].options = $.extend(true, {}, this.defaultAnnotation, this.options.tools[t].options);
                    this.options.tools[t].options.format = $.extend(true, {}, this.defaultFormat, this.options.tools[t].options.format);
                    this.initDefaultFormatOptions(this.options.tools[t].options.format);
                } else if (this.options.tools[t].type == "cursor") {
                    this.options.tools[t].options = $.extend(true, {}, this.defaultCursorTool, this.options.tools[t].options);
                    this.options.tools[t].options.format = $.extend(true, {}, this.defaultFormat, this.options.tools[t].options.format);
                    this.initDefaultFormatOptions(this.options.tools[t].options.format);
                } else if (this.options.tools[t].type == "tip") {
                    var defaultTip = $.extend(true, {}, this.defaultAnnotation, this.defaultToolTip);
                    this.options.tools[t].options = $.extend(true, {}, defaultTip, this.options.tools[t].options);
                    this.options.tools[t].options.format = $.extend(true, {}, this.defaultFormat, this.options.tools[t].options.format);
                    this.initDefaultFormatOptions(this.options.tools[t].options.format);
                } else if (this.options.tools[t].type == "animation") {
                    this.options.tools[t].options = $.extend(true, {}, this.defaultAnimationTool, this.options.tools[t].options);
                }
            }
        },

        initDefaultFormatOptions: function (fmtOptions) {
            if (fmtOptions !== undefined) {
                fmtOptions.font = $.extend(true, {}, this.defaultFont, fmtOptions.font);
                fmtOptions.gradient = $.extend(true, {}, this.defaultGradient, fmtOptions.gradient);
                fmtOptions.shadow = $.extend(true, {}, this.defaultShadow, fmtOptions.shadow);
                fmtOptions.stroke = $.extend(true, {}, this.defaultStroke, fmtOptions.stroke);
            }
        },

        initChart: function () {
            this.setAspect(this.chart.aspect, this.options.chart.aspect);
            this.setPanel(this.chart.panel, this.options.chart.panel);
            this.setAnnotation(this.chart.footer, this.options.chart.footer);
            this.setAnnotation(this.chart.title, this.options.chart.title);
            this.setAxis(this.chart.axes.bottom, this.options.chart.axes.bottom);
            this.setAxis(this.chart.axes.left, this.options.chart.axes.left);
            this.setAxis(this.chart.axes.right, this.options.chart.axes.right);
            this.setAxis(this.chart.axes.top, this.options.chart.axes.top);
            this.setBounds(this.chart.bounds, this.options.chart.bounds);
            this.setLegend(this.chart.legend, this.options.chart.legend);
            this.setWall(this.chart.walls.left, this.options.chart.walls.left);
            this.setWall(this.chart.walls.right, this.options.chart.walls.right);
            this.setWall(this.chart.walls.bottom, this.options.chart.walls.bottom);
            this.setWall(this.chart.walls.back, this.options.chart.walls.back);
            this.setZoom(this.chart.zoom, this.options.chart.zoom);
            this.setScroll(this.chart.scroll, this.options.chart.scroll);
        },

        initSeries: function() {
            for(var t = 0, l = this.options.series.length; t < l; t++) {
                var s = undefined;
                var serieType = this.options.series[t].type;

                // type of serie
                if (serieType == 'line') {
                    s = new Tee.Line();
                } else if (serieType == 'bar') {
                    s = new Tee.Bar();
                } else if (serieType == 'horizBar') {
                    s = new Tee.HorizBar();
                } else if (serieType == 'area') {
                    s = new Tee.Area();
                } else if (serieType == 'horizArea') {
                    s = new Tee.HorizArea();
                } else if (serieType == 'pointxy') {
                    s = new Tee.PointXY();
                } else if (serieType == 'pie') {
                    s = new Tee.Pie();
                } else if (serieType == 'donut') {
                    s = new Tee.Donut();
                } else if (serieType == 'bubble') {
                    s = new Tee.Bubble();
                } else if (serieType == 'candle') {
                    s = new Tee.Candle();
                } else if (serieType == 'volume') {
                    s = new Tee.Volume();
                } else if (serieType == 'gantt') {
                    s = new Tee.Gantt();
                } else if (serieType == 'circularGauge') {
                    s = new Tee.CircularGauge();
                }

                if (s !== undefined) {
                    this.chart.addSeries(s);
                }
                this.setSerieOptions(t, this.options.series[t]);
            }
        },

        setSerieOptions: function(index, optionsSerie) {
            if (index < this.chart.series.items.length && this.chart.series.items[index] !== undefined) {
                var s = this.chart.series.items[index];
                var serieType = optionsSerie.type;

                // specific options depending of the type of serie
                if (serieType == 'line') {
                    this.setCustomSeries(s, optionsSerie.options);
                } else if (serieType == 'bar') {
                    this.setCustomBarSeries(s, optionsSerie.options);
                } else if (serieType == 'horizBar') {
                    this.setCustomBarSeries(s, optionsSerie.options);
                } else if (serieType == 'area') {
                    this.setAreaSeries(s, optionsSerie.options);
                } else if (serieType == 'horizArea') {
                    this.setAreaSeries(s, optionsSerie.options);
                } else if (serieType == 'pointxy') {
                    this.setCustomSeries(s, optionsSerie.options);
                } else if (serieType == 'pie') {
                    this.setPieSeries(s, optionsSerie.options);
                } else if (serieType == 'donut') {
                    this.setPieSeries(s, optionsSerie.options);
                } else if (serieType == 'bubble') {
                    this.setCustomSeries(s, optionsSerie.options);
                } else if (serieType == 'candle') {
                    this.setCandleSeries(s, optionsSerie.options);
                } else if (serieType == 'volume') {
                    this.setCustomBarSeries(s, optionsSerie.options);
                } else if (serieType == 'gantt') {
                    this.setGanttSeries(s, optionsSerie.options);
                } else if (serieType == 'circularGauge') {
                    this.setCircularGaugeSeries(s, optionsSerie.options);
                }

                // general options
                if (optionsSerie.title !== undefined)
                    s.title = optionsSerie.title;
                if (optionsSerie.colorEach !== undefined)
                    s.colorEach = optionsSerie.colorEach;
                if (optionsSerie.cursor !== undefined)
                    s.cursor = optionsSerie.cursor;
                if (optionsSerie.decimals !== undefined)
                    s.decimals = optionsSerie.decimals;
                if (optionsSerie.horizAxis !== undefined)
                    s.horizAxis = optionsSerie.horizAxis;
                if (optionsSerie.vertAxis !== undefined)
                    s.vertAxis = optionsSerie.vertAxis;
                if (optionsSerie.visible !== undefined)
                    s.visible = optionsSerie.visible;

                this.setFormat(s.format, optionsSerie.format);
                this.setFormat(s.hover, optionsSerie.hover);
                this.setMarks(s.marks, optionsSerie.marks);

                // data
                if (optionsSerie.data.values.length > 0) {
                    s.data.values = optionsSerie.data.values;
                }
                if (optionsSerie.data.x.length > 0) {
                    s.data.x = optionsSerie.data.x;
                }
                if (optionsSerie.data.labels.length > 0) {
                    s.data.labels = optionsSerie.data.labels;
                }
                // specific for bubble
                if (serieType == 'bubble') {
                    if (optionsSerie.data.radius.length > 0) {
                        s.data.radius = optionsSerie.data.radius;
                    }
                }
                // specific for candle
                if (serieType == 'candle') {
                    if (optionsSerie.data.open.length > 0) {
                        s.data.open = optionsSerie.data.open;
                    }
                    if (optionsSerie.data.close.length > 0) {
                        s.data.close = optionsSerie.data.close;
                    }
                    if (optionsSerie.data.low.length > 0) {
                        s.data.low = optionsSerie.data.low;
                    }
                    if (optionsSerie.data.high.length > 0) {
                        s.data.high = optionsSerie.data.high;
                    }
                }
                // specific for gantt
                if (serieType == 'gantt') {
                    if (optionsSerie.data.start.length > 0) {
                        s.data.start = optionsSerie.data.start;
                    }
                    if (optionsSerie.data.end.length > 0) {
                        s.data.end = optionsSerie.data.end;
                    }
                    if (optionsSerie.data.completion.length > 0) {
                        s.data.completion = optionsSerie.data.completion;
                    }
                }
            }
        },

        initTools: function() {
            for(var t = 0, l = this.options.tools.length; t < l; t++) {
                var tl = undefined;

                // type of tool
                if (this.options.tools[t].type == 'annotation') {
                    tl = new Tee.Annotation(this.chart);
                    this.setAnnotation(tl, this.options.tools[t].options);
                } else if (this.options.tools[t].type == 'drag') {
                    tl = new Tee.DragTool(this.chart);
                } else if (this.options.tools[t].type == 'cursor') {
                    tl = new Tee.CursorTool(this.chart);
                    this.setCursorTool(tl, this.options.tools[t].options);
                } else if (this.options.tools[t].type == 'tip') {
                    tl = new Tee.ToolTip(this.chart);
                    this.setToolTip(tl, this.options.tools[t].options);
                } else if (this.options.tools[t].type == 'animation') {
                    var s = parseInt(this.options.tools[t].options.series);
                    if (s !== undefined && s !== NaN && s >= 0 && s < this.chart.series.count()) {
                        tl = new Tee.SeriesAnimation(this.chart.series.items[s]);
                    } else {
                        tl = new Tee.SeriesAnimation(this.chart);
                    }
                    this.setAnimationTool(tl, this.options.tools[t].options);
                }

                if (tl !== undefined) {
                    // general options
                    if (this.options.tools[t].active !== undefined)
                        tl.active = this.options.tools[t].active;

                    this.chart.tools.add(tl);
                }
            }
        },

        setAspect: function (aspTarget, aspSource) {
            if (aspTarget !== undefined && aspSource !== undefined) {
                if (aspSource.view3d !== undefined) {
                    aspTarget.view3d = aspSource.view3d;
                }
                if (aspSource.ortogonal !== undefined) {
                    aspTarget.ortogonal = aspSource.ortogonal;
                }
                if (aspSource.rotation !== undefined) {
                    aspTarget.rotation = aspSource.rotation;
                }
                if (aspSource.elevation !== undefined) {
                    aspTarget.elevation = aspSource.elevation;
                }
                if (aspSource.perspective !== undefined) {
                    aspTarget.perspective = aspSource.perspective;
                }
                if (aspSource.clip !== undefined) {
                    aspTarget.clip = aspSource.clip;
                }
            }
        },

        setLegend: function (legTarget, legSource) {
            if (legTarget !== undefined && legSource !== undefined) {
                if (legSource.align !== undefined) {
                    legTarget.align = legSource.align;
                }
                if (legSource.fontColor !== undefined) {
                    legTarget.fontColor = legSource.fontColor;
                }
                if (legSource.inverted !== undefined) {
                    legTarget.inverted = legSource.inverted;
                }
                if (legSource.legendStyle !== undefined) {
                    legTarget.legendStyle = legSource.legendStyle;
                }
                if (legSource.padding !== undefined) {
                    legTarget.padding = legSource.padding;
                }
                if (legSource.position !== undefined) {
                    legTarget.position = legSource.position;
                }
                if (legSource.textStyle !== undefined) {
                    legTarget.textStyle = legSource.textStyle;
                }
                if (legSource.transparent !== undefined) {
                    legTarget.transparent = legSource.transparent;
                }
                if (legSource.visible !== undefined) {
                    legTarget.visible = legSource.visible;
                }
                this.setBounds(legTarget.bounds, legSource.bounds);
                this.setStroke(legTarget.stroke, legSource.stroke);
                this.setFormat(legTarget.format, legSource.format);
                this.setSymbol(legTarget.symbol, legSource.symbol);
                this.setAnnotation(legTarget.title, legSource.title);
            }
        },

        setSymbol: function (symTarget, symSource) {
            if (symTarget !== undefined && symSource !== undefined) {
                if (symSource.height !== undefined) {
                    symTarget.height = symSource.height;
                }
                if (symSource.width !== undefined) {
                    symTarget.width = symSource.width;
                }
                if (symSource.padding !== undefined) {
                    symTarget.padding = symSource.padding;
                }
                if (symSource.visible !== undefined) {
                    symTarget.visible = symSource.visible;
                }
                this.setFormat(symTarget.format, symSource.format);
            }
        },

        setAnnotation: function (annTarget, annSource) {
            if (annTarget !== undefined && annSource !== undefined) {
                if (annSource.text !== undefined) {
                    annTarget.text = annSource.text;
                }
                if (annSource.transparent !== undefined) {
                    annTarget.transparent = annSource.transparent;
                }
                if (annSource.visible !== undefined) {
                    annTarget.visible = annSource.visible;
                }
           
                this.setMargins(annTarget.margins, annSource.margins);
                this.setPosition(annTarget.position, annSource.position);
                this.setFormat(annTarget.format, annSource.format);
            }
        },

        setPanel: function (panTarget, panSource) {
            if (panTarget !== undefined && panSource !== undefined) {
                if (panSource.transparent !== undefined) {
                    panTarget.transparent = panSource.transparent;
                }
                this.setMargins(panTarget.margins, panSource.margins);
                this.setFormat(panTarget.format, panSource.format);
            }
        },

        setAxis: function (axiTarget, axiSource) {
            if (axiTarget !== undefined && axiSource !== undefined) {
                if (axiSource.automatic !== undefined) {
                    axiSource.automatic = axiSource.automatic;
                }
                if (axiSource.axisSize !== undefined) {
                    axiTarget.axisSize = axiSource.axisSize;
                }
                if (axiSource.logarithmic !== undefined) {
                    axiTarget.logarithmic = axiSource.logarithmic;
                }
                if (axiSource.increment !== undefined) {
                    axiTarget.increment = axiSource.increment;
                }
                if (axiSource.inverted !== undefined) {
                    axiTarget.inverted = axiSource.inverted;
                }
                if (axiSource.maximum !== undefined) {
                    axiTarget.maximum = axiSource.maximum;
                }
                if (axiSource.minimum !== undefined) {
                    axiTarget.minimum = axiSource.minimum;
                }
                if (axiSource.startPos !== undefined) {
                    axiTarget.startPos = axiSource.startPos;
                }
                if (axiSource.endPos !== undefined) {
                    axiTarget.endPos = axiSource.endPos;
                }
                if (axiSource.scale !== undefined) {
                    axiTarget.scale = axiSource.scale;
                }
                this.setGrid(axiTarget.grid, axiSource.grid);
                this.setLabels(axiTarget.labels, axiSource.labels);
                this.setTicks(axiTarget.minorTicks, axiSource.minorTicks);
                this.setTicks(axiTarget.innerTicks, axiSource.innerTicks);
                this.setTicks(axiTarget.ticks, axiSource.ticks);
                this.setAnnotation(axiTarget.title, axiSource.title);
            }
        },

        setGrid: function (griTarget, griSource) {
            if (griTarget !== undefined && griSource !== undefined) {
                if (griSource.linedash !== undefined) {
                    griTarget.linedash = griSource.linedash;
                }
                if (griSource.visible !== undefined) {
                    griTarget.visible = griSource.visible;
                }
                this.setFormat(griTarget.format, griSource.format);
            }
        },

        setLabels: function (labTarget, labSource) {
            if (labTarget !== undefined && labSource !== undefined) {
                if (labSource.alternate !== undefined) {
                    labTarget.alternate = labSource.alternate;
                }
                if (labSource.dateFormat !== undefined) {
                    labTarget.dateFormat = labSource.dateFormat;
                }
                if (labSource.decimals !== undefined) {
                    labTarget.decimals = labSource.decimals;
                }
                if (labSource.labelStyle !== undefined) {
                    labTarget.labelStyle = labSource.labelStyle;
                }
                if (labSource.padding !== undefined) {
                    labTarget.padding = labSource.padding;
                }
                if (labSource.rotation !== undefined) {
                    labTarget.rotation = labSource.rotation;
                }
                if (labSource.separation !== undefined) {
                    labTarget.separation = labSource.separation;
                }
                if (labSource.visible !== undefined) {
                    labTarget.visible = labSource.visible;
                }
                this.setFormat(labTarget.format, labSource.format);
            }
        },

        setTicks: function (tckTarget, tckSource) {
            if (tckTarget !== undefined && tckSource !== undefined) {
                if (tckSource.length !== undefined) {
                    tckTarget.length = tckSource.length;
                }
                if (tckSource.visible !== undefined) {
                    tckTarget.visible = tckSource.visible;
                }
                this.setStroke(tckTarget.stroke, tckSource.stroke);
            }
        },

        setFormat: function (fmtTarget, fmtSource) {
            if (fmtTarget !== undefined && fmtSource !== undefined) {
                if (fmtSource.fill !== undefined) {
                    fmtTarget.fill = fmtSource.fill;
                }
                if (fmtSource.transparency !== undefined) {
                    fmtTarget.transparency = fmtSource.transparency;
                }
                if (fmtSource.length !== undefined) {
                    fmtTarget.length = fmtSource.length;
                }
                if (fmtSource.visible !== undefined) {
                    fmtTarget.visible = fmtSource.visible;
                }
                if (fmtSource.outside !== undefined) {
                    fmtTarget.outside = fmtSource.outside;
                }
                
                this.setFont(fmtTarget.font, fmtSource.font);
                this.setGradient(fmtTarget.gradient, fmtSource.gradient);
                this.setShadow(fmtTarget.shadow, fmtSource.shadow);
                this.setStroke(fmtTarget.stroke, fmtSource.stroke);
            }
        },

        setFont: function (fntTarget, fntSource) {
            if (fntTarget !== undefined && fntSource !== undefined) {
                if (fntSource.fill !== undefined) {
                    fntTarget.fill = fntSource.fill;
                }
                if (fntSource.textAlign !== undefined) {
                    fntTarget.textAlign = fntSource.textAlign;
                }
                if (fntSource.baseLine !== undefined) {
                    fntTarget.baseLine = fntSource.baseLine;
                }
                if (fntSource.style !== undefined) {
                    fntTarget.style = fntSource.style;
                }
            }
        },

        setBounds: function (bndTarget, bndSource) {
            if (bndTarget !== undefined && bndSource !== undefined && bndSource.length > 3){
                bndTarget.x = bndSource[0];
                bndTarget.y = bndSource[1];
                bndTarget.width = bndSource[2];
                bndTarget.height = bndSource[3];
            }
        },

        setMargins: function (mrgTarget, mrgSource) {
            if (mrgTarget !== undefined && mrgSource !== undefined && mrgSource.length > 3){
                mrgTarget.left = mrgSource[0];
                mrgTarget.top = mrgSource[1];
                mrgTarget.right = mrgSource[2];
                mrgTarget.bottom = mrgSource[3];
            }
        },

        setPosition: function (posTarget, posSource) {
            if (posTarget !== undefined && posSource !== undefined && posSource.length > 1){
                posTarget.x = posSource[0];
                posTarget.y = posSource[1];
            }
        },

        setGradient: function (gdtTarget, gdtSource) {
            if (gdtTarget !== undefined && gdtSource !== undefined) {
                if (gdtSource.balance !== undefined) {
                    gdtTarget.balance = gdtSource.balance;
                }
                if (gdtSource.colors.length > 0 ) {
                    gdtTarget.colors = gdtSource.colors;
                }
                if (gdtSource.stops.length > 0 ) {
                    gdtTarget.stops = gdtSource.stops;
                }
                if (gdtSource.direction !== undefined) {
                    gdtTarget.direction = gdtSource.direction;
                }
                if (gdtSource.visible !== undefined) {
                    gdtTarget.visible = gdtSource.visible;
                }
            }
        },

        setShadow: function (shaTarget, shaSource) {
            if (shaTarget !== undefined && shaSource !== undefined) {
                if (shaSource.blur !== undefined) {
                    shaTarget.blur = shaSource.blur;
                }
                if (shaSource.color !== undefined) {
                    shaTarget.color = shaSource.color;
                }
                if (shaSource.width !== undefined) {
                    shaTarget.width = shaSource.width;
                }
                if (shaSource.height !== undefined) {
                    shaTarget.height = shaSource.height;
                }
                if (shaSource.visible !== undefined) {
                    shaTarget.visible = shaSource.visible
                }
            }
        },

        setStroke: function (stkTarget, stkSource) {
            if (stkTarget !== undefined && stkSource !== undefined) {
                if (stkSource.cap !== undefined) {
                    stkTarget.cap = stkSource.cap;
                }
                if (stkSource.dash.length > 0 ) {
                    stkTarget.dash = stkSource.dash;
                }
                if (stkSource.fill !== undefined) {
                    stkTarget.fill = stkSource.fill;
                }
                if (stkSource.join !== undefined) {
                    stkTarget.join = stkSource.join;
                }
                if (stkSource.size !== undefined) {
                    stkTarget.size = stkSource.size;
                }
            }
        },

        setWall: function (walTarget, walSource) {
            if (walTarget !== undefined && walSource !== undefined) {
                if (walSource.visible !== undefined) {
                    walTarget.visible = walSource.visible;
                }
                this.setBounds(walTarget.bounds, walSource.bounds);
                this.setFormat(walTarget.format, walSource.format);
            }
        },

        setZoom: function (zooTarget, zooSource) {
            if (zooTarget !== undefined && zooSource !== undefined) {
                if (zooSource.enabled !== undefined) {
                    zooTarget.enabled = zooSource.enabled;
                }
                if (zooSource.direction !== undefined) {
                    zooTarget.direction = zooSource.direction;
                }
                if (zooSource.mouseButton !== undefined) {
                    zooTarget.mouseButton = zooSource.mouseButton;
                }
                this.setFormat(zooTarget.format, zooSource.format);
            }
        },

        setScroll: function (scrTarget, scrSource) {
            if (scrTarget !== undefined && scrSource !== undefined) {
                if (scrSource.enabled !== undefined) {
                    scrTarget.enabled = scrSource.enabled;
                }
                if (scrSource.direction !== undefined) {
                    scrTarget.direction = scrSource.direction;
                }
                if (scrSource.mouseButton !== undefined) {
                    scrTarget.mouseButton = scrSource.mouseButton;
                }
            }
        },

        setMarks: function (mrkTarget, mrkSource) {
            if (mrkTarget !== undefined && mrkSource !== undefined) {
                if (mrkSource.drawEvery !== undefined) {
                    mrkTarget.drawEvery = mrkSource.drawEvery;
                }
                if (mrkSource.style !== undefined) {
                    mrkTarget.style = mrkSource.style;
                }
                if (mrkSource.visible !== undefined) {
                    mrkTarget.visible = mrkSource.visible;
                }
                this.setFormat(mrkTarget.arrow, mrkSource.arrow);
            }
        },

        setCustomSeries: function (csrTarget, csrSource) {
            if (csrTarget !== undefined && csrSource !== undefined) {
                if (csrSource.drawLine !== undefined) {
                    csrTarget.drawLine = csrSource.drawLine;
                }
                if (csrSource.stacked !== undefined) {
                    csrTarget.stacked = csrSource.stacked;
                }
                if (csrSource.stairs !== undefined) {
                    csrTarget.stairs = csrSource.stairs;
                }
                if (csrSource.smooth !== undefined) {
                    csrTarget.smooth = csrSource.smooth;
                }
                this.setSeriesPointer(csrTarget.pointer, csrSource.pointer);
            }
        },

        setSeriesPointer  : function (srpTarget, srpSource) {
            if (srpTarget !== undefined && srpSource !== undefined) {
                if (srpSource.colorEach !== undefined) {
                    srpTarget.colorEach = srpSource.colorEach;
                }
                if (srpSource.height !== undefined) {
                    srpTarget.height = srpSource.height;
                }
                if (srpSource.width !== undefined) {
                    srpTarget.width = srpSource.width;
                }
                if (srpSource.style !== undefined) {
                    srpTarget.style = srpSource.style;
                }
                if (srpSource.visible !== undefined) {
                    srpTarget.visible = srpSource.visible;
                }
                this.setFormat(srpTarget.format, srpSource.format);
            }
        },

        setCustomBarSeries: function (cbsTarget, cbsSource) {
            if (cbsTarget !== undefined && cbsSource !== undefined) {
                if (cbsSource.barSize !== undefined) {
                    cbsTarget.barSize = cbsSource.barSize;
                }
                if (cbsSource.barStyle !== undefined) {
                    cbsTarget.barStyle = cbsSource.barStyle;
                }
                if (cbsSource.origin !== undefined) {
                    cbsTarget.origin = cbsSource.origin;
                }
                if (cbsSource.useOrigin !== undefined) {
                    cbsTarget.useOrigin = cbsSource.useOrigin;
                }
                if (cbsSource.sideMargins !== undefined) {
                    cbsTarget.sideMargins = cbsSource.sideMargins;
                }
                if (cbsSource.stacked !== undefined) {
                    cbsTarget.stacked = cbsSource.stacked;
                }
            }
        },

        setAreaSeries: function (asrTarget, asrSource) {
            if (asrTarget !== undefined && asrSource !== undefined) {
                if (asrSource.origin !== undefined) {
                    asrTarget.origin = asrSource.origin;
                }
                if (asrSource.useOrigin !== undefined) {
                    asrTarget.useOrigin = asrSource.useOrigin;
                }
                this.setCustomSeries(asrTarget, asrSource);
            }
        },

        setPieSeries: function (psrTarget, psrSource) {
            if (psrTarget !== undefined && psrSource !== undefined) {
                if (psrSource.donut !== undefined) {
                    psrTarget.donut = psrSource.donut;
                }
                if (psrSource.rotation !== undefined) {
                    psrTarget.rotation = psrSource.rotation;
                }
                if (psrSource.concentric !== undefined) {
                    psrTarget.concentric = psrSource.concentric;
                }
                if (psrSource.explode.length > 0) {
                    psrTarget.explode = psrSource.explode;
                }
            }
        },

        setCandleSeries  : function (cdsTarget, cdsSource) {
            if (cdsTarget !== undefined && cdsSource !== undefined) {
                this.setFormat(cdsTarget.higher, cdsSource.higher);
                this.setFormat(cdsTarget.lower, cdsSource.lower);
            }
        },

        setGanttSeries  : function (gnsTarget, gnsSource) {
            if (gnsTarget !== undefined && gnsSource !== undefined) {
                if (gnsSource.dateFormat !== undefined) {
                    gnsTarget.dateFormat = gnsSource.dateFormat;
                }
            }
        },

        setCircularGaugeSeries  : function (cgsTarget, cgsSource) {
            if (cgsTarget !== undefined && cgsSource !== undefined) {
                if (cgsSource.min !== undefined) {
                    cgsTarget.min = cgsSource.min;
                }
                if (cgsSource.max !== undefined) {
                    cgsTarget.max = cgsSource.max;
                }
                if (cgsSource.step !== undefined) {
                    cgsTarget.step = cgsSource.step;
                }
                if (cgsSource.value !== undefined) {
                    cgsTarget.value = cgsSource.value;
                }
                if (cgsSource.angle !== undefined) {
                    cgsTarget.angle = cgsSource.angle;
                }
                if (cgsSource.rotation !== undefined) {
                    cgsTarget.rotation = cgsSource.rotation;
                }
                if (cgsSource.rotateText !== undefined) {
                    cgsTarget.rotateText = cgsSource.rotateText;
                }
                if (cgsSource.shape !== undefined) {
                    cgsTarget.shape = cgsSource.shape;
                }
                this.setFormat(cgsTarget.bevel, cgsSource.bevel);
                this.setFormat(cgsTarget.center, cgsSource.center);
                this.setFormat(cgsTarget.center.top, cgsSource.centerTop);
                this.setFormat(cgsTarget.ticks, cgsSource.ticks);
                this.setFormat(cgsTarget.ticksBack, cgsSource.ticksBack);
                this.setFormat(cgsTarget.minor, cgsSource.minor);
                this.setFormat(cgsTarget.minorBack, cgsSource.minorBack);
                this.setFormat(cgsTarget.hand, cgsSource.hand);
                this.setFormat(cgsTarget.back, cgsSource.back);
                this.setFormat(cgsTarget.pointer, cgsSource.pointer);
                this.setAnnotation(cgsTarget.units, cgsSource.units);
            }
        },

        setCursorTool: function (ctlTarget, ctlSource) {
            if (ctlTarget !== undefined && ctlSource !== undefined) {
                if (ctlSource.direction !== undefined) {
                    ctlTarget.direction = ctlSource.direction;
                }
                if (ctlSource.followMouse !== undefined) {
                    ctlTarget.followMouse = ctlSource.followMouse;
                }
                if (ctlSource.size.length > 1) {
                    ctlTarget.size.x = ctlSource.size[0];
                    ctlTarget.size.y = ctlSource.size[1];
                }
                this.setFormat(ctlTarget.format, ctlSource.format);
            }
        },

        setToolTip: function (tltTarget, tltSource) {
            if (tltTarget !== undefined && tltSource !== undefined) {
                if (tltSource.animated !== undefined) {
                    tltTarget.animated = tltSource.animated;
                }
                if (tltSource.autoHide !== undefined) {
                    tltTarget.autoHide = tltSource.autoHide;
                }
                if (tltSource.delay !== undefined) {
                    tltTarget.delay = tltSource.delay;
                }
                //this.setAnnotation(tltTarget, tltSource);
                this.setFormat(tltTarget.format, tltSource.format);
            }
        },

        setAnimationTool: function (atlTarget, atlSource) {
            if (atlTarget !== undefined && atlSource !== undefined) {
                if (atlSource.duration !== undefined) {
                    atlTarget.duration = atlSource.duration;
                }
                if (atlSource.kind !== undefined) {
                    atlTarget.kind = atlSource.kind;
                }
            }
        },

        draw: function() {
            this.chart.draw();
        }

    };

    // plugin definition. It only creates an instance by element
    $.fn.teechart = function (options) {
        return this.each( function () {
			if (!$.data(this, 'pluginTeeChart')) {
                $.data(this, 'pluginTeeChart', new TeeChart(this).init(options));
			}
        });
	};

    // gets the internal teechart, one or array if several elements are selected
    $.fn.getChart = function () {
		var teecharts = [];
        this.each(function () {
			var t = $.data(this, 'pluginTeeChart');
			if (t !== undefined) {
				teecharts.push(t.chart);
			}
        });
        if (teecharts.length === 0) {
            return undefined;
        }
		else if (teecharts.length === 1) {
			return teecharts[0];
		}
		else {
			return teecharts;
		}
	};

    // This method allows updating chart options (chart only, not series nor tools)
    // assuming it is already created and initialized
    $.fn.updateChartOptions = function (options) {
        this.each(function () {
			var t = $.data(this, 'pluginTeeChart');
			if (t !== undefined) {
                $.extend(true, t.options.chart, options);
                
                t.initChart();
                t.draw()
			}
        });
        
    };

    // This method allows updating series options
    // assuming the chart is already created and initialized
    $.fn.updateSeriesOptions = function (index, options) {
        this.each(function () {
			var t = $.data(this, 'pluginTeeChart');
			if (t !== undefined) {
                if (index < t.options.series.length) {
                    $.extend(true, t.options.series[index], options);
                                
                    t.setSerieOptions(index, t.options.series[index]);
                    t.draw()
                }
			}
        });
        
    };


})( jQuery, window, document );
