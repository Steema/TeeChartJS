<?php

/*
Plugin Name: TeeChart
Version: 1.0.23
Plugin URI: http://www.steema.com
Description: Create and display charts on your WordPress blogs.
Author: Steema Software, davidberneda
Author URI: http://www.steema.com
*/

function tee_shortcode($atts, $content=null, $code="") 
{  
  extract( shortcode_atts( array(
		'title' => 'TeeChart for WordPress',
		'data' => '',
                'labels' => '',
                'style' => 'Bar',
                'width' => '400',
                'height' => '250',
                'legend' => 'true',
	), $atts ) );

  $r = "<canvas id='canvas' width='{$width}' height='{$height}'>This browser does not support Canvas.</canvas>"."\n";
  $r .= '<script type="text/javascript">var c=new Tee.Chart("canvas");'."\n";
  $r .= "c.legend.visible = {$legend};";
  $r .= "c.title.text= '{$title}';"."\n"; 
  $r .= "var s=c.addSeries(new Tee.{$style}([{$data}]));"."\n";
  
  if ($labels != '') {
   $r .= " s.data.labels=[{$labels}];";
  }

  $r .= "c.draw();</script>"."\n";
  return $r;
}

add_action ('wp_head',  'header_action');
add_shortcode('teechart','tee_shortcode');

function header_action ()
{
   echo '<script src="http://steema.com/files/public/teechart/html5/jscript/src/teechart.js" type="text/javascript"></script>' . "\n";
}

?>
