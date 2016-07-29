function changeTheme(chart, aTheme)
{
   chart.applyTheme(aTheme);
   
   for (var i = 0; i < chart.series.count(); i++)
   {
     if (chart.series.items[i].pointer.format != null)
       chart.series.items[i].pointer.format.stroke.fill = "white";
   }
}
