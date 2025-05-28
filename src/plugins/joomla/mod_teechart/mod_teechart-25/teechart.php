<?php
/**
 * @version	$Id: teechart.php 1.0 2012-04-29 davidberneda $
 * @package	Joomla
 * @subpackage	Content
 * @copyright	Copyright (C) 2012 by Steema Software SL. All rights reserved.
 * @license	Creative Commons, see license.txt
 * See COPYRIGHT.php for copyright notices and details.
 */

// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

jimport( 'joomla.plugin.plugin' );
jimport( 'joomla.utilities.string' );

function _generateChart($num, $text) {
  $w = 400;
  $h = 300;
  $style = "Bar";
  $legend = "true";
  $title = "TeeChart for Joomla";
  $data = "";
  $labels = "";

  //$params = explode(" ", $text);

  preg_match_all('/"(?:\\\\.|[^\\\\"])*"|\S+/', $text, $matches);

  if (count($matches)>0)
    $params=$matches[0];
  else
    $params=array();

  $count = count($params);
  for ($p=0; $p<$count; $p++) {
    $val = explode("=", $params[$p]);
    if (count($val)==2) {
      switch ($val[0]) {
        case "title": $title=JString::str_ireplace(array('"', "'"), '', $val[1]); break;
        case "style": $style=JString::str_ireplace(array('"', "'"), '', $val[1]); break;
       case "legend": $legend=JString::str_ireplace(array('"', "'"), '', $val[1]); break;
        case "width": $w=JString::str_ireplace(array('"', "'"), '', $val[1]); break;
       case "height": $h=JString::str_ireplace(array('"', "'"), '', $val[1]); break;
         case "data": $data=JString::str_ireplace(array('"', "'"), '', $val[1]); break;
       case "labels": $labels=JString::str_ireplace('"', '', $val[1]); break;
      }
    }
  }

  $chart = "chart" . $num;

  $replace = "<canvas id='" . $chart . "' width=" . $w . " height=" . $h . "></canvas><script type='text/javascript'>";
  $replace .= "var " . $chart . "=new Tee.Chart('" . $chart . "'); ";

  if ($title != "")
    $replace .= $chart . ".title.text='" . $title . "';";

  if ($legend != "true")
    $replace .= $chart . ".legend.visible=" . $legend . ";";

  if ($data != "") $data="[" . $data . "]";
  $replace .= $chart . ".addSeries(new Tee." . $style . "(" . $data . ")); ";

  if ($labels != "")
    $replace .= $chart . ".series.items[0].data.labels=[" . $labels . "]; ";

  $replace .= $chart . ".draw();";
  $replace .= "</script>";

  return $replace;
}

class plgContentTeeChart extends JPlugin {

/**
 * Constructor
 *
 * @param object $subject The object to observe
 * @param object $params  The object that holds the plugin parameters
 * @since 1.5
 */
function plgContentTeechart( &$subject, $config )
{
  parent::__construct( $subject, $config );
}

public function onContentBeforeDisplay( $context, &$article, &$params, $limitstart=0 )
{
    global $mainframe;

    $document =& JFactory::getDocument();
    $document->addScript(JURI::root()."/plugins/content/teechart/scripts/teechart.js");

    return '';
}

public function onContentPrepare($context, &$row, &$params, $page=0) {
    if (is_object($row)) {
        $text = &$row->text;
    }
    else {
      $text = &$row;
    }

    global $mainframe;

    $num = 1;

    do {
      $i = JString::strpos($text, "[teechart");
      if ($i !== FALSE) {

        $i2 = JString::strpos($text, "]", $i+9);
        if ($i2 !== FALSE) {

          $options=JString::substr($text, $i+10, $i2-$i-1-9);

          //$text = JString::substr($text, 0, $i) . "**" . $options . "**" . JString::substr($text, $i2+1);
          $text = JString::substr($text, 0, $i) . _generateChart($num++, $options) . JString::substr($text, $i2+1);
        }
      }
    }
    while ($i !== FALSE);

    //$code = '<canvas id="chart1" width=400 height=300>This browser does not support HTML5 Canvas.</canvas>';
    //$code .= '<script type="text/javascript">' . "\n";
    //$code .= 'var chart1=new Tee.Chart("chart1"), s1=chart1.addSeries(new Tee.Bar([4,7,2,5,1])); chart1.draw();';
    //$code .= '</script>' . "\n";

    //$text = JString::str_ireplace('[teechart', $code, $text);

    return true;
}

}
?>