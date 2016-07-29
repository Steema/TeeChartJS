function changeTheme(chart, aTheme)
{
   chart.applyTheme(aTheme);
   
   for (var i = 0; i < chart.series.count(); i++)
   {
     if ((chart.series.items[i].pointer) && (chart.series.items[i].pointer.format))
       chart.series.items[i].pointer.format.stroke.fill = "white";
   }
}
