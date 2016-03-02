// -------------------------------------------------------------
// TeeChart(tm) for JavaScript(tm)
// v1.3 October 2012
// Copyright(c) 2012 by Steema Software SL. All Rights Reserved.
// www.steema.com
//
// JavaScript is a trademark of Oracle Corporation.
// -------------------------------------------------------------

/**
 * @namespace Tee.Data namespace, Multi-Dimensional Charting.
 */
var Tee=Tee || {};

(function() {
 "use strict";

if (typeof exports !== 'undefined') exports.Tee=Tee;

function clearTable(table) {
  // IE8 innerHTML is read-only:

  if (document.addEventListener)
     table.innerHTML="";
}

// Adds rows and colums to <table> "id", using Tee.Data query results output.
// header=boolean , when true: adds a table header row.

Tee.Data.prototype.fillTable=function(id, result, header, totals) {
  var table=id, t, r, v, body, cell;

  if (typeof id === "string")
    table=document.getElementById(id);

  clearTable(table);

  var resl=result.length, rest, d, res, l;

  if (resl===0) return;

  function addHeader(r, s) {
    var c = document.createElement("TH");
    c.innerHTML=s;
    r.appendChild(c);
    return c;
  }

  function aggregate(result, value, measure) {
    switch (measure) {
      case "high": if ((result.count===0) || (value>result.value)) result.value=value; break;
      case "low":  if ((result.count===0) || (value<result.value)) result.value=value; break;
      default:     result.value+=value;
    }

    result.count++;
  }

  function finishAggregate(value) {
    if (totals=='count') value.value=value.count;
    else
    if ((totals=='average') && (value.count>0))
        value.value=value.value/value.count;
  }

  function addHeaderMetric(r, m) {
    addHeader(r, m.title+"<br/>"+m.measure);
  }

  function isInteger(v) {
    return (v | 0) == v;
  }

  function addTotal(row, index, value) {
    var cell=row.insertCell(index);
    cell.innerHTML= isInteger(value) ? value : value.toFixed(2);
    cell.style.textAlign="right";
    cell.className="totals";
  }

  if (header) {
    var h=table.createTHead(), c, hasDim2;
    r=h.insertRow(-1);

    res=result[0];
    d=res.dimension;

    hasDim2 = (resl>1) || result[0].masterdim;

    if (hasDim2) {
      addHeaderMetric(r, res.metric);

      var res0dim=result[0].dimension;

      if (res0dim)
        addHeader(r, res0dim.title).colSpan=resl;
    }
    else
    {
      if (d) addHeader(r, d.title);
      addHeaderMetric(r, res.metric);
    }

    if (hasDim2) {
      r=h.insertRow(1);

      if (result[0].masterdim)
        addHeader(r, result[0].masterdim.title);
      else
        addHeader(r, "");

      for (rest=0; rest<resl; rest++) {
        res=result[rest];

        if (res.master)
          addHeader(r, res.master);
        else
          addHeader(r, res.dimension.title);
      }

      if (totals && (resl>1))
        addHeader(r, totals).className="totals";
    }
  }

  body=table.createTBody ? table.createTBody() : table;

  l=result[0].values.length;

  for(t=0; t<l; t++) {
    r=body.insertRow(-1);

    d=result[0].dimension;

    v=result[0].values[t];
    r.insertCell(0).innerHTML= v.id;

    var subtotal={ count:0, value:0 };

    for (rest=0; rest<resl; rest++) {
      res=result[rest];

      cell=r.insertCell(rest+1);

      if (res.values.length>t) {
        v=res.values[t];
        cell.innerHTML= v.count > 0 ? (isInteger(v.value) ? v.value : v.value.toFixed(2)) : '';

        aggregate(subtotal, v.value, totals);
      }
      else
        cell.innerHTML='';

      cell.style.textAlign="right";

    }

    if ((resl>1) && (totals)) {
      finishAggregate(subtotal);
      addTotal(r, rest+1, subtotal.value);
    }
  }

  if (totals) {
    r=body.insertRow(-1);

    cell=r.insertCell(0);
    cell.innerHTML= totals;
    cell.className="totals";

    var vtemp,
        vsub={ count:0, value:0 };

    for (rest=0; rest<resl; rest++) {
      res=result[rest];

      vtemp={ count:0, value:0 };

      for (var tv=0; tv<res.values.length; tv++)
        aggregate(vtemp, res.values[tv].value, totals);

      finishAggregate(vtemp);

      addTotal(r, rest+1, vtemp.value);
      aggregate(vsub, vtemp.value, totals);
    }

    if (resl>1) {
      finishAggregate(vsub);
      addTotal(r,resl+1,vsub.value);
    }
  }
}

// IE8 support for Object.keys, from:
// http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation

Object.keys = Object.keys || (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{toString:null}.propertyIsEnumerable("toString"),
        DontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        DontEnumsLength = DontEnums.length;

    return function (o) {
        if (typeof o != "object" && typeof o != "function" || o === null)
            throw new TypeError("Object.keys called on a non-object");
 
        var result = [];
        for (var name in o) {
            if (hasOwnProperty.call(o, name))
                result.push(name);
        }

        if (hasDontEnumBug) {
            for (var i = 0; i < DontEnumsLength; i++) {
                if (hasOwnProperty.call(o, DontEnums[i]))
                    result.push(DontEnums[i]);
            }
        }

        return result;
    };
})();

// Fills an html table with a Javascript object like: { header:[], rows[] }
Tee.Data.prototype.objectToTable=function(table, data) {
  var t, c, r, h, body, v, value, k;

  if (typeof table == 'string')
    table=document.getElementById(table);

  clearTable(table);

  if ((data instanceof Array) && (data.length>0)) {

    var h=table.createTHead();
    r=h.insertRow(-1);

    v=data[0];

    if (typeof v === 'object') {
      k=Object.keys(v);

      for (t=0; t<k.length; t++) {
        c = document.createElement("TH");
        c.innerHTML=k[t];
        r.appendChild(c);
      }

      var v2=v[k[k.length-1]];

      if (typeof v2 === 'object') {

        var k2=Object.keys(v2);

        r.cells[r.cells.length-1].setAttribute('colspan', k2.length);

        r=h.insertRow(-1);

        for (t=0; t<k.length-1; t++) {
          c = document.createElement("TH");
          c.innerHTML='';
          r.appendChild(c);
        }

        for (t=0; t<k2.length; t++) {
          c = document.createElement("TH");
          c.innerHTML=k2[t];
          r.appendChild(c);
        }
      }
    }
    else {
        c = document.createElement("TH");
        c.innerHTML=typeof v;
        r.appendChild(c);
    }
  }
  else {
    var h=table.createTHead();
    r=h.insertRow(-1);
    c = document.createElement("TH");
    c.innerHTML=typeof data;
    r.appendChild(c);
  }

  body=table.createTBody ? table.createTBody() : table;

  function fillCells(r, v) {
    var tt, k, sub, subsub, subk;

    if (typeof v === 'object') {
      k=Object.keys(v);

      for (tt=0; tt<k.length; tt++) {

        sub=v[k[tt]];

        if (sub instanceof Array) {
          for (var ttt=0; ttt<sub.length; ttt++) {
            c=r.insertCell(tt+ttt);

            subsub=sub[ttt];

            if (typeof subsub === 'object') {
              subk=Object.keys(subsub);
              value = (subk.length>0) ? subsub[subk[subk.length-1]] : subsub;
            }
            else
              value = subsub; 

            c.innerHTML=value;
            if (typeof value === 'number')
               c.style.textAlign="right";
          }
        }
        else
        if (typeof sub === 'object')
           fillCells(r, sub);
        else
        {
          c=r.insertCell(r.cells.length);
          value=v[k[tt]];

          c.innerHTML=value;
          if (typeof value === 'number')
             c.style.textAlign="right";
        }

        //c.style.textAlign="right";
      }
    }
    else {
      c=r.insertCell(0);
      c.innerHTML=v;
    }
  }

  if (data instanceof Array)
  for(t=0; t<data.length; t++) {
    v=data[t];
    r=body.insertRow(-1);

    fillCells(r, v);
  }
  else {
    r=body.insertRow(-1);
    c=r.insertCell(0);
    c.innerHTML=data;
  }
}

// Converts an html table to a Javascript object {}
Tee.Data.prototype.tableToObject=function(table) {

  var result={}

  var t, rows=table.rows, l=rows.length, r, v, body, cell, resRows=[],
      header=[], resRow, tt;

  var th=table.tHead, thl=th ? th.rows.length : 0, cc;

  if (thl>0) {
    r=th.rows[0];
    thl=r.cells.length;

    for (t=0; t<thl; t++) {
      cc=r.cells[t];
      header.push(cc.innerText || cc.innerHTML);
    }
  }

  if (table.tBodies.length>0) {
    rows=table.tBodies[0].rows;
    l=rows.length;
  }

  for (t=0; t<l; t++) {
    r=rows[t].cells;

    resRow={}

    for (tt=0; tt<r.length; tt++) {
      cc=r[tt];
      resRow[header[tt]]=cc.innerText || cc.innerHTML;
    }

    resRows.push(resRow);
  }

  result.rows=resRows;
  result.header=header;

  return result;
}

Tee.Data.prototype.MapLegend=function(legend, table) {

var map=legend.map, _this=this;

  clearTable(table);

  this.outline="2px solid red";

  var tt, i, r, color;

  for (tt=0; tt<legend.length; tt++) {
    i=legend[tt];
    r=table.insertRow(-1);
    r.id=tt;
    color=r.insertCell(0);
    color.style.backgroundColor=i.color;
    color.width=20;
    r.insertCell(1).innerHTML=i.min.toFixed(2);
    r.insertCell(2).innerHTML=i.max.toFixed(2);
    r.onmouseover=mapover;
    r.onmouseout=mapout;
  }

  function mapover() {
    var t, n=map.content.childNodes, id, v, l=legend[this.id];

    var c=this.cells[0];
    c.style.outline=_this.outline;

    for (t=0; t<n.length; t++) {
      id=n[t].getAttribute("id"),
      v=USAMap.values[id];

      if ((v>=l.min) && (v<=l.max)) {
        n[t].style.stroke="red";
        n[t].style.strokeWidth="0.5em";
      }
    }
  }

  function mapout() {
    var n=map.content.childNodes, c=this.cells[0];

    c.style.outline="";

    for (var t=0; t<n.length; t++) {
      n[t].style.stroke="";
      n[t].style.strokeWidth="0.5em";
    }
  }

  this.highlight=function(value, color) {
   var t=0, l=legend.length, i, s;

   color=color || _this.outline;

   for(;t<l;t++) {
     i=legend[t];
     s=table.rows[t].cells[0].style;

     if (value) {
       if (t==0)
         s.outline= (value>=i.min) && (value<i.max) ? color : "";
       else
         s.outline= (value>i.min) && (value<=i.max) ? color : "";
     }
     else
       s.outline="";
   }
  }

}

Tee.fillFilter=function( select, dimension )  {
  var values=dimension.getIds(),
      val=document.getElementById(select).options,
      A,B, option;

  values.sort( function(a,b) {
                       A=a.toLowerCase();
                       B=b.toLowerCase();
                       return A<B ? -1 : A==B ? 0 : 1 });

  val.length=0;
  val.add(new Option( dimension.selectedInclude ? '(all)' : '(none)', ""));

  for (var t=0; t<values.length; t++) {
    option=new Option(values[t], values[t]);
    if (values[t]===dimension.selected) {
       option.selected=true;
       option.className='teeselected';
    }
    val.add(option);
  }
}

Tee.DataEditor=function(editorframe, engine, chart) {

  this.chart=chart;
  this.engine=engine;
  
  var Editor=this,
      edFrame=document.getElementById(editorframe),
      edDoc=edFrame.contentDocument || edFrame.window.document;

  edFrame.contentWindow.Editor=this;

  var dimensions=[], metrics=[];

  var Dimension1=-1,
      Dimension2=-1,
      Metric=0;

  function get(s) { return edDoc.getElementById(s); }

  this.selectedItem=function(list) {
    var l=get(list), s=l.selectedOptions;
    return parseInt(s ? s[0].value : l.options[l.selectedIndex].value);
  }

  this.checkDateDim=function(dim, select, divId) {
    var sel=get(select), d=dim, opt=sel.options, da=d && d.datetime;

    if (divId)
      get(divId).style.display = da ? 'inline' : 'none';
    else
      sel.style.display = da ? 'inline' : 'none';

    function addOption(value, key) {
      var o;

      if (value) {
        o=new Option(d.dateKeys[key], key);
        if (da.selected==key) o.selected=true;
        opt.add(o);
      }
    }

    if (da) {
      opt.length=0;
      addOption(da.century,'c');
      addOption(da.decade,'x');
      addOption(da.year,'y');
      addOption(da.month,'m');
      addOption(da.weekday,'w');
      addOption(da.day,'d');
    }
  }

  this.showHidePanel=function(button, panel) {
    var p=get(panel);

    if (p.style.display=='inline') {
       p.style.display='none';
       button.style.backgroundColor="";
       button.style.color="";
    }
    else {
       p.style.display='inline';
       button.style.backgroundColor="gray";
       button.style.color="white";
    }
  }

  function sortedDimensions() {
    var res=dimensions.slice(0), A,B;

    res.sort(function(a,b) {
      A=a.title.toLowerCase();
      B=b.title.toLowerCase();
      return (A<B) ? -1 : (A>B) ? 1 : 0;
    });

    return res;
  }

  function fillDimensions(select, addNull, filterDim, current) {
    var combo=get(select), sel=combo.options, d;
    sel.length=0;

    if (addNull) sel.add(new Option("", -1));

    var d2=sortedDimensions();

    for(var t=0; t<d2.length; t++) {
       d=d2[t];

       if ((!filterDim) || filterDim(d))
          sel.add(new Option(d.title, dimensions.indexOf(d)));
    }

    return combo;
  }

  function fillMetrics(id) {
    var sel=get(id);
    sel.options.length=0;
    for (var t=0; t<metrics.length; t++)
      sel.options.add(new Option(metrics[t].title, t));
    return sel;
  }

  this.setSortBy=function(value) {
    chart.sort.sortBy=value;

    get('order').style.display = value=='' ? 'none' : 'inline';
    
    this.doQuery();
  }

  this.setSortOrder=function(value) {
    chart.sort.order=value;

    if (chart.sort.sortBy=="")
      this.doQuery();
    else
    {
      chart.sortData(chart.sort.sortBy, value==="ascending");
      chart.draw();
    }
  }

  this.setSortSeries=function(value) {
    chart.sort.series=value;

    if (value=='')
       this.doQuery();
    else
    {
      chart.sortSeries(value=='ascending');
      chart.draw();
    }
  }

  this.checkFilter=function() {
    var p=get('filterdim');
    if (p.options.length==0) {
      fillDimensions('filterdim',false,function(d) { return !d.dontFilter; });

      if (p.options.length>0)
         this.setFilterDim(0);
    }
  }

  this.setFilterDate=function(value) {
    var dim=get('filterdim').value, d=dimensions[dim];
    d.datetime.selected=value;

    var old=d.selected;
    d.selected=null;
    this.setFilterValues(d);

    if (old)
       this.doQuery();
  }

  this.setFilterDim=function(value) {
    var dim=get("filterdim").value,  d=dimensions[dim];

    this.checkDateDim(d,'filterdate','filterdatediv');

    this.setFilterValues(d);
  }

  this.setFilterValues=function(d) {

    if (d.dontFilter) return;
    
    var old=d.selected;
    d.selected=null;
    var values=d.getIds();
    d.selected=old;

    var val=get("filtervalue").options,
        A,B, option,
        text;

    values.sort( function(a,b) {
                   A=(""+a).toLowerCase();
                   B=(""+b).toLowerCase();

                   return A<B ? -1 : A==B ? 0 : 1
                 });

    var o=get('filterinclude').options;
    o[0].selected = d.selectedInclude;
    o[1].selected = !d.selectedInclude;

    val.length=0;
    val.add(new Option( d.selectedInclude ? '(all)' : '(none)', -1));

    for (var t=0; t<values.length; t++) {
      text=values[t];

      option=new Option(text, t);

      if (d.inSelected( d.datetime ? values[t] : d.get(values[t])))
         option.selected = d.selectedInclude;

      val.add(option);
    }
  }

  this.fillComboboxes=function() {
    fillDimensions('dimension1', true, null, Dimension1);
    fillDimensions('dimension2', true, null, Dimension2);
    fillMetrics('metrics');
    this.checkFilter();
  }

  function fillArrays() {
    var t, tt, ttt, d=engine.datasets, da, dim;

    dimensions=[];
    metrics=[];

    for(t=0; t<d.length; t++) {
      dimensions.push(d[t]);

      da=d[t].dimensions;

      for (tt=0; tt<da.length; tt++) {
        dim=da[tt];
        dimensions.push(dim);

        for (ttt=0; ttt<dim.metrics.length; ttt++)
          metrics.push(dim.metrics[ttt]);
      }

      for (ttt=0; ttt<d[t].metrics.length; ttt++)
          metrics.push(d[t].metrics[ttt]);
    }
  }

  fillArrays();
  this.fillComboboxes();

  if (!Tee.SeriesAnimation) {
    get('animated').style.display = 'none';
    get('animlabel').style.display = 'none';
    get('animstyle').style.display = 'none';
  }

  if (chart.sort.sortBy=="values")
    get('sort').options[1].selected=true;
  else
  if (chart.sort.sortBy=="labels")
    get('sort').options[2].selected=true;
  else
    get('sort').options[0].selected=true;

  get('order').style.display = chart.sort.sortBy=='' ? 'none' : 'inline';

  this.checkSortSeries=function() {
    get('sortSeriesdiv').style.display= (Dimension2>=0) ? 'inline' : 'none';
  }

  this.applyChartStyle=function() {
    var isSmooth=get("smooth").checked,
        isStroked=get("stroked").checked,
        isStack=get("stack").value,
        hasMarks=get("marks").checked;

    var pointWidth = chart.chartRect.width / chart.totalPoints();

    chart.series.each(function(s) {

      setSeriesStack(s, isStack);

      s.marks.visible=hasMarks;

      if ((s instanceof Tee.CustomBar) || (s instanceof Tee.CustomSeries)) {

          if (Dimension2>=0) {
              s.marks.location="center";
              s.marks.showZero=false;
              s.marks.arrow.length=0;
              s.marks.transparent=true;
              s.format.round.x=0;
              s.format.shadow.visible=false;
          }

          s.format.gradient.visible=true;
      }

      if ((s instanceof Tee.Area) || (s instanceof Tee.Line)) {
        s.smooth = isSmooth ? 0.5 : 0;
      }

      if (s.count()>30) { var tmp=s.count()/30; s.marks.drawEvery=(tmp | 0); }

      /*
      if (s instanceof Tee.Bar) {
        if ((s.stacked=='no') || (pointWidth < 10))
          s.marks.transform=function(r) {
             var c=this.chart.ctx;
             c.translate(r.x,r.y);
             c.rotate(-Math.PI*90/180);
             c.translate(-r.x,-r.y);
          };
      }
      */

      s.format.stroke.fill = isStroked ? "black" : "";
    });
  }

  this.setFilterInclude=function(value) {
    var dim=get("filterdim").value,
        di=dimensions[dim];

    di.selectedInclude= value == 'include';

    var all=get('filtervalue').options[0];
    all.text = di.selectedInclude ? '(all)' : '(none)';

    if (!all.selected)
       this.doQuery();
  }

  this.setFilterValue=function(value) {
    var dim=get("filterdim").value,
        sel=this.selectedItem("filtervalue"),
        opt=get('filtervalue').options,
        di=dimensions[dim];

    for (var t=0; t<opt.length; t++)
        opt[t].style.fontWeight='normal';

    if (sel==-1)
      di.selected = null;
    else
    {
      var o=opt[sel+1];
      di.selected=o.text;
      o.style.fontWeight='bold';
    }

    this.doQuery();
  }

  this.switchDimensions=function() {
    var tmp1 = get("dimension1"),
        tmp2 = get("dimension2"),
        tmp = tmp1.value;

    tmp1.value=tmp2.value;
    tmp2.value=tmp;

    this.setDimension1(tmp1.value,true);
    this.setDimension2(tmp2.value,true);

    this.doQuery();
  }

  this.setMetric=function(index) {
    Metric=index;
    this.setMetricMeasure(get('measure').value);
  }

  this.setMetricMeasure=function(value) {
    metrics[Metric].measure=value;
    this.doQuery();
  }

  this.setDimension1=function(index, dontexecute) {
    Dimension1=index;

    get('nulls1').style.display=(Dimension1>=0) ? 'inline' : 'none';
    get('nulls1label').style.display=(Dimension1>=0) ? 'inline' : 'none';

    if (Dimension1>=0) {
      this.checkDateDim(dimensions[Dimension1],'dimdate1');
      get('nulls1').checked=dimensions[Dimension1].nulls;
    }
    else
      get('dimdate1').style.display='none';

    if (!dontexecute)
       this.doQuery();
  }

  this.setDimDate1=function(value) {
    dimensions[Dimension1].datetime.selected=value;
    this.doQuery();
  }

  this.setDimNulls1=function(value) {
    dimensions[Dimension1].nulls=value;
    this.doQuery();
  }

  this.setDimension2=function(index, dontexecute) {
    Dimension2=index;

    var view=(Dimension2>=0) ? 'inline' : 'none';

    get('nulls2').style.display=view;
    get('nulls2label').style.display=view;

    if (Dimension2>=0) {
      this.checkDateDim(dimensions[Dimension2],'dimdate2');
      get('nulls2').checked=dimensions[Dimension2].nulls;
    }
    else
      get('dimdate2').style.display='none';

    this.checkSortSeries();
    
    if (!dontexecute)
      this.doQuery();
  }

  this.setDimDate2=function(value) {
    dimensions[Dimension2].datetime.selected=value;
    this.doQuery();
  }

  this.setDimNulls2=function(value) {
    dimensions[Dimension2].nulls=value;
    this.doQuery();
  }

  this.setSeriesStyle=function(value) {
    chart.setSeriesStyle(value);

    var d=chart.defaultStyle;

    get('smooth').style.display = (!d) || (d==Tee.Line) ||
                                  (d==Tee.Area) || (d==Tee.HorizArea) ? 'inline' : 'none';

    get('smoothlabel').style.display = get('smooth').style.display;

    get('stack').style.display = (d==Tee.Line) || (d==Tee.Bar) || (d==Tee.HorizBar) || (d==Tee.Area) || (d==Tee.HorizArea) ? 'inline' : 'none';
    get('stacklabel').style.display = get('stack').style.display;
    
    this.doQuery();
  }

  this.setStack=function(value) {
    chart.series.each(function(s) { setSeriesStack(s, value); });
    chart.draw();
  }

  function setSeriesStack(series, value) {
    if ((series instanceof Tee.CustomBar) || (series instanceof Tee.CustomSeries)) {
      series.stacked=value;

      if (series instanceof Tee.Area)
          series.format.transparency= (series.stacked=='no') ? 0.1 : 0;
    }
  }

  function refreshScatter() {
    var s1=Editor.selectedItem('scatter1');

    this.result=Engine.query(null, [ Metrics[Metric], Metrics[s1] ]);

    chart.series.items.length=0;
    var p=chart.addSeries(new Tee.PointXY([])), po=p.pointer;
    po.width=6;
    po.height=6;
    po.style="ellipse";
    po.format.stroke.fill="";
    po.format.shadow.width=1;
    po.format.shadow.height=1;

    var v0=this.result[0].values,
        v1=this.result[1].values;

    p.data.x=[];

    for (var t=0; t<v0.length; t++) {
      p.data.values.push(v0[t].value);
      p.data.x.push(v1[t].value);
    }

    chart.axes.left.title.text=Metrics[Metric].title;
    chart.axes.bottom.title.text=Metrics[s1].title;

    chart.draw();

    if (get("viewtable").value == 'query')
       fillQueryResults();
  }

  function checkScatter() {
    var pan=get('scatterpanel'),
        p=get('scatter1'),
        scatter=pan.style.display=='inline';

    if (p.options.length==0)
      fillMetrics('scatter1').options[2].selected=true;

    this.refresh();
  }

  function setSelect(sel, current) {
    var s=get(sel).options, t;
    for (t=0; t<s.length; t++)
      s[t].selected = s[t].value==current;
  }

  this.query=function(dims, metric) {

    if (dims instanceof Array) {
      Dimension2= (dims.length>1) ? dimensions.indexOf(dims[1]) : -1;
      Dimension1= (dims.length>0) ? dimensions.indexOf(dims[0]) : -1;
    }
    else
    {
      Dimension2 = -1;
      Dimension1 = dimensions.indexOf(dims);
    }

    Metric = metrics.indexOf(metric);


    setSelect('dimension1',Dimension1);
    setSelect('dimension2',Dimension2);

    this.setDimension1(Dimension1, true);
    this.setDimension2(Dimension2, true);

    get('metrics').options[Metric].selected=true;

    this.doQuery();
  }

  this.doQuery=function() {
    /*
    var scatter=get('scatterpanel').style.display=='inline';
    if (scatter) {
      refreshScatter();
      return;
    }
    */

    var dims= (Dimension2>=0) ? [ dimensions[Dimension1], dimensions[Dimension2] ] : dimensions[Dimension1];

    this.result=engine.query(dims, metrics[Metric]);
    chart.fillQuery(this.result, dims, metrics[Metric], true);

    Editor.applyChartStyle();

    if (chart.animation && chart.animation.active)
       chart.animation.animate();
    else
       chart.draw();

    if (this.onrefresh)
        this.onrefresh();
  }

  this.setStroke=function(value) {
    chart.series.each(function(s) { s.format.stroke.fill=value ? 'black' : ''; });
    chart.draw();
  }

  this.setSmooth=function(value) {
    chart.series.each(function(s) { if (typeof s.smooth !== 'undefined') s.smooth= value ? 0.5 : 0; });
    chart.draw();
  }
}

}).call(this);
