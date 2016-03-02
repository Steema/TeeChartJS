function changeTheme(chart, aTheme)
{
   chart.applyTheme(aTheme);
   
   for (i = 0; i < chart.series.count; i++)
   {
     chart.series.items[i].pointer.format.stroke.fill = "white";
   }
}
