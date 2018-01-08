/**
 * @preserve TeeChart(tm) for JavaScript(tm)
 * @fileOverview TeeChart for JavaScript(tm)
 * v2.2 Jan 2018
 * Copyright(c) 2012-2017 by Steema Software SL. All Rights Reserved.
 * http://www.steema.com
 *
 * Licensed with commercial and non-commercial attributes,
 * specifically: http://www.steema.com/licensing/html5
 *
 * JavaScript is a trademark of Oracle Corporation.
 */

/**
 * @author <a href="mailto:david@steema.com">Steema Software</a>
 * @version 2.1
 */

/*global THREE, exports, window, document, navigator, HTMLCanvasElement */

/**
 * @namespace Tee namespace, Three.js 3D Charting.
 */
var Tee=Tee || {};

(function() {
 "use strict";

if (typeof exports !== 'undefined') exports.Tee=Tee;

/**
 * @constructor
 * @augments Tee.PaletteSeries
 * @class Draws a two dimensional grid of data as a "grid" (rows and columns of pixels),
 * using the palette property to calculate each pixel (grid cell) color.
 */
Tee.ColorGrid=function(o,o2) {
  Tee.PaletteSeries.call(this,o,o2);

  this.smooth=true;
  this.dataChanged=true;

  var d, width, height, image, data, c2, ctx2, axis, axis2,
      x0, y0, x1, y1,
      min, max, range, InvRange255;

  function optimize(smooth, style, ctx) {
    if (style)
    {
      // -webkit-optimize-contrast, (-o)(-moz)crisp-edges

      if (style.getPropertyValue("image-rendering") !== null)
         style.setProperty ("image-rendering", smooth ? "optimizeQuality" : "optimizeSpeed", null);

      if (style.msInterpolationMode !== undefined)
         style.msInterpolationMode = smooth ? "bicubic" : "nearest-neighbor";
    }

    ctx.mozImageSmoothingEnabled=smooth;
    ctx.webkitImageSmoothingEnabled=smooth;
  }

  function square(x) { return x*x; }

  this.addRandom=function(rows,cols) {
    var row, temp;

    rows=rows || 200;
    cols=cols || rows;

    var d=this.data.values=[];

    for (var y=0; y<rows; y++) {
      row=new Array(cols);
      d[y]=row;

      // Some sample function
      temp = 0.5 * square(Math.cos(y/(cols*0.2)));

      for (var x=0; x<cols; x++)
           row[x] = square(Math.cos(x/(rows*0.2))) - Math.cos(x/(cols*0.5)) + temp;
    }

    this.dataChanged=true; // <-- force recalculating pixel colors
  }
  
  function tryDrawGrid(s, c) {
    if (s.fill!=="") {
      var p, x, y, xInc=1, yInc=1;

      xInc=Math.max( ( 1+(4*width/Math.abs(axis2.calc(width)-axis2.calc(0)))) |0, 1);
      yInc=Math.max( ( 1+(4*height/Math.abs(axis.calc(height)-axis.calc(0)))) |0, 1);

      c.beginPath();

      for(x=1; x<width; x+=xInc) {
        p=axis2.calc(x-0.5);
        c.moveTo(p, y1);
        c.lineTo(p, y0);
      }

      for(y=1; y<height; y+=yInc) {
        p=axis.calc(y-0.5);
        c.moveTo(x0, p);
        c.lineTo(x1, p);
      }

      s.prepare();
      c.stroke();
    }
  }

  function calcMinMax() {
    min=d[0][0];
    max=min;

    var v, row;

    for(var y=0; y<height; y++) {
      row=d[y];
      for(var x=0; x<width; x++) {
        v=row[x];
        if (v<min) min=v; else
        if (v>max) max=v;
      }
    }

    range=max-min;

    InvRange255= (max==min) ? 1 : 255/(max-min);
  }

  this.fillPixels=function(alpha) {
    var index=0, row, color, gray=this.palette.grayScale,
        inv=this.palette.inverted;

    // Fill pixel data

    for(var y=0; y<height; y++) {
      row=d[y];

      for(var x=0; x<width; x++) {

        if (gray) {
          color = InvRange255 * (inv ? (max - row[x]) : (row[x] - min));

          data[index++] = color;
          data[index++] = color;
          data[index++] = color;
        }
        else {
          color=this.getColor(row[x]);

          data[index++] = color.r;
          data[index++] = color.g;
          data[index++] = color.b;
        }

        data[index++] = alpha;
      }
    }
  }

  this.draw=function() {

    var c=this.chart.ctx;

    if (width>0) {

      if ( (!image) || (c2.width!=width) || (c2.height!=height) ){

        if (!c2)
            c2= document.createElement("canvas");

        // IE <9
        if ( (!c2) || (! c2.getContext) ) return;
        
        c2.width=width;
        c2.height=height;

        ctx2=c2.getContext("2d");
        image = ctx2.getImageData(0,0,width, height);
        data=image.data;
      }

      if (this.dataChanged) {
        this.fillPixels(255*(1-this.format.transparency));
        this.dataChanged=false;
      }

      ctx2.putImageData(image, 0,0);

      optimize(this.smooth, this.chart.canvas.style, c);

      axis=this.mandatoryAxis;
      axis2=this.notmandatory;

      y1=axis.calc(-0.5);
      y0=axis.calc(height-0.5),

      x0=axis2.calc(-0.5);
      x1=axis2.calc(width-0.5);

      var cr=this.chart.chartRect, xPos=x0, yPos=y0, xScale=1, yScale=1;

      if (axis.inverted) {
         yScale=-1;
         yPos=cr.y-y1-y0+cr.height;
      }

      if (axis2.inverted) {
         xScale=-1;
         xPos=cr.x-x1-x0+cr.width;
      }

      c.scale(xScale,yScale);
      c.drawImage(ctx2.canvas, 0,0,width,height, xPos,yPos, x1-x0, y1-y0);

      tryDrawGrid(this.format.stroke, c);
    }
  }

  /**
  * @returns {String} Returns the palette value of index'th legend symbol.
  */
  this.valueText=function(index) {
    var x=index % width, y=(index/width)|0;
    return (this.data.values[y][x]).toFixed(this.decimals);
  }

  this.minXValue=function() { return -0.5; }
  this.maxXValue=function() { return width-0.5; }
  this.minYValue=function() { return -0.5; }
  this.maxYValue=function() { return height-0.5; }

  this.recalcAxes=function() {
    Tee.Series.prototype.recalcAxes.call(this);

    d=this.data.values;
    height=d.length;
    width=height>0? d[0].length : 0;

    this.size={x:width, y:height};
    
    if ((width>0) && this.dataChanged) {
       calcMinMax();

       this._min=min;
       this._max=max;
       this._range=range;

       this.prepareColors();
    }
  }

 /**
  * @returns {Number} Returns the index of grid xy that contains {@link Tee.Point} p parameter.
  */
  this.clicked=function(p) {

    var x,y;

    if ((p.x>=x0) && (p.x<=x1)) {
      x=(width*(p.x-x0)/(x1-x0)) | 0;

      if ((p.y>=y0) && (p.y<=y1)) {
        y=(height*(p.y-y0)/(y1-y0)) | 0;

        return (y*width) + x;
      }
    }

    return -1;
  }

}

Tee.ColorGrid.prototype=new Tee.PaletteSeries;


/**
 * @constructor
 * @augments Tee.PaletteSeries
 * @class Draws a two dimensional grid of data as a "grid" (rows and columns of pixels),
 * using the palette property to calculate each pixel (grid cell) color.
 */
Tee.Surface=function(o,o2) {
  Tee.ColorGrid.call(this,o,o2);

  var d, _sizeY;

  this.grid=new Tee.Format(o).stroke;

  this.wireFrame=false;
  this.maxZ=3;

  this.getY=function(x,z) { return d[x][z]; }

  this.draw=function() {

    if ((this.size.x>0) && (this.size.y>0)) {

      d=this.data.values;

      if (this.chart.__webgl) {
        var r={};
        this.bounds(r);

        _sizeY=this.size.y-1;
        this.chart.ctx.surface(this.size, this.getY, r, this.wireFrame, this.grid.visible ? this.grid.fill : null, this.maxZ);
      }
    }
  }

  this.minXValue=function() { return 0; }
  this.maxXValue=function() { return this.size.y; }
  this.minYValue=function() { return this._min; }
  this.maxYValue=function() { return this._max; }
}

Tee.Surface.prototype=new Tee.ColorGrid;

// Three.js


/**
 *	@author zz85 / http://twitter.com/blurspline / http://www.lab4games.net/zz85/blog
 *
 *	Subdivision Geometry Modifier
 *		using Loop Subdivision Scheme
 *
 *	References:
 *		http://graphics.stanford.edu/~mdfisher/subdivision.html
 *		http://www.holmes3d.net/graphics/subdivision/
 *		http://www.cs.rutgers.edu/~decarlo/readings/subdiv-sg00c.pdf
 *
 *	Known Issues:
 *		- currently doesn't handle UVs
 *		- currently doesn't handle "Sharp Edges"
 *
 */

THREE.SubdivisionModifier = function ( subdivisions ) {

	this.subdivisions = (subdivisions === undefined ) ? 1 : subdivisions;

};

// Applies the "modify" pattern
THREE.SubdivisionModifier.prototype.modify = function ( geometry ) {

	var repeats = this.subdivisions;

	while ( repeats -- > 0 ) {
		this.smooth( geometry );
	}

	delete geometry.__tmpVertices;

	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

};

(function() {

	// Some constants
	var WARNINGS = !true; // Set to true for development
	var ABC = [ 'a', 'b', 'c' ];


	function getEdge( a, b, map ) {

		var vertexIndexA = Math.min( a, b );
		var vertexIndexB = Math.max( a, b );

		var key = vertexIndexA + "_" + vertexIndexB;

		return map[ key ];

	}


	function processEdge( a, b, vertices, map, face, metaVertices ) {

		var vertexIndexA = Math.min( a, b );
		var vertexIndexB = Math.max( a, b );

		var key = vertexIndexA + "_" + vertexIndexB;

		var edge;

		if ( key in map ) {

			edge = map[ key ];

		} else {
			
			var vertexA = vertices[ vertexIndexA ];
			var vertexB = vertices[ vertexIndexB ];

			edge = {

				a: vertexA, // pointer reference
				b: vertexB,
				newEdge: null,
				// aIndex: a, // numbered reference
				// bIndex: b,
				faces: [] // pointers to face

			};

			map[ key ] = edge;

		}

		edge.faces.push( face );

		metaVertices[ a ].edges.push( edge );
		metaVertices[ b ].edges.push( edge );


	}

	function generateLookups( vertices, faces, metaVertices, edges ) {

		var i, il, face, edge;

		for ( i = 0, il = vertices.length; i < il; i ++ ) {
			metaVertices[ i ] = { edges: [] };
		}
		
		for ( i = 0, il = faces.length; i < il; i ++ ) {
			face = faces[ i ];

			processEdge( face.a, face.b, vertices, edges, face, metaVertices );
			processEdge( face.b, face.c, vertices, edges, face, metaVertices );
			processEdge( face.c, face.a, vertices, edges, face, metaVertices );

		}
	}

	function newFace( newFaces, a, b, c ) {

		newFaces.push( new THREE.Face3( a, b, c ) );

	}


	/////////////////////////////

	// Performs one iteration of Subdivision
	THREE.SubdivisionModifier.prototype.smooth = function ( geometry ) {

		var tmp = new THREE.Vector3();

		var oldVertices, oldFaces;
		var newVertices, newFaces; // newUVs = [];

		var n, l, i, il, j, k;
		var metaVertices, sourceEdges;

		// new stuff.
		var sourceEdges, newEdgeVertices, newSourceVertices

		oldVertices = geometry.vertices; // { x, y, z}
		oldFaces = geometry.faces; // { a: oldVertex1, b: oldVertex2, c: oldVertex3 }

		/******************************************************
		 *
		 * Step 0: Preprocess Geometry to Generate edges Lookup
		 *
		 *******************************************************/

		metaVertices = new Array( oldVertices.length );
		sourceEdges = {}; // Edge => { oldVertex1, oldVertex2, faces[]  }

		generateLookups(oldVertices, oldFaces, metaVertices, sourceEdges);


		/******************************************************
		 *
		 *	Step 1. 
		 *	For each edge, create a new Edge Vertex,
		 *	then position it.
		 *
		 *******************************************************/

		newEdgeVertices = [];
		var other, currentEdge, newEdge, face;
		var edgeVertexWeight, adjacentVertexWeight, connectedFaces;

		for ( i in sourceEdges ) {

			currentEdge = sourceEdges[ i ];
			newEdge = new THREE.Vector3();

			edgeVertexWeight = 3 / 8;
			adjacentVertexWeight = 1 / 8;

			connectedFaces = currentEdge.faces.length;

			// check how many linked faces. 2 should be correct.
			if ( connectedFaces != 2 ) {

				// if length is not 2, handle condition
				edgeVertexWeight = 0.5;
				adjacentVertexWeight = 0;

				if ( connectedFaces != 1 ) {
					
					if (WARNINGS) console.warn('Subdivision Modifier: Number of connected faces != 2, is: ', connectedFaces, currentEdge);
			
				}

			}

			newEdge.addVectors( currentEdge.a, currentEdge.b ).multiplyScalar( edgeVertexWeight );

			tmp.set( 0, 0, 0 );

			for ( j = 0; j < connectedFaces; j ++ ) {

				face = currentEdge.faces[ j ];
				
				for ( k = 0; k < 3; k ++ ) {

					other = oldVertices[ face[ ABC[k] ] ];
					if (other !== currentEdge.a && other !== currentEdge.b ) break;

				}

				tmp.add( other );

			}

			tmp.multiplyScalar( adjacentVertexWeight );
			newEdge.add( tmp );

			currentEdge.newEdge = newEdgeVertices.length;
			newEdgeVertices.push(newEdge);

			// console.log(currentEdge, newEdge);
		}

		/******************************************************
		 *
		 *	Step 2. 
		 *	Reposition each source vertices.
		 *
		 *******************************************************/

		var beta, sourceVertexWeight, connectingVertexWeight;
		var connectingEdge, connectingEdges, oldVertex, newSourceVertex;
		newSourceVertices = [];

		for ( i = 0, il = oldVertices.length; i < il; i ++ ) {

			oldVertex = oldVertices[ i ];

			// find all connecting edges (using lookupTable)
			connectingEdges = metaVertices[ i ].edges;
			n = connectingEdges.length;
			//beta;

			if ( n == 3 ) {

				beta = 3 / 16;

			} else if ( n > 3 ) {

				beta = 3 / ( 8 * n ); // Warren's modified formula

			}

			// Loop's original beta formula
			// beta = 1 / n * ( 5/8 - Math.pow( 3/8 + 1/4 * Math.cos( 2 * Math. PI / n ), 2) );

			sourceVertexWeight = 1 - n * beta;
			connectingVertexWeight = beta;

			if ( n <= 2 ) {
				
				// crease and boundary rules
				// console.warn('crease and boundary rules');

				if ( n == 2 ) {

					if (WARNINGS) console.warn('2 connecting edges', connectingEdges);
					sourceVertexWeight = 3 / 4;
					connectingVertexWeight = 1 / 8;

					// sourceVertexWeight = 1;
					// connectingVertexWeight = 0;

				} else if ( n == 1 ) {

					if (WARNINGS) console.warn('only 1 connecting edge');

				} else if ( n == 0 ) {

					if (WARNINGS) console.warn('0 connecting edges');
			
				}
			
			}

			newSourceVertex = oldVertex.clone().multiplyScalar( sourceVertexWeight );

			tmp.set( 0, 0, 0 );

			for ( j = 0; j < n; j ++ ) {

				connectingEdge = connectingEdges[ j ];
				other = connectingEdge.a !== oldVertex ? connectingEdge.a : connectingEdge.b;
				tmp.add( other );

			}

			tmp.multiplyScalar( connectingVertexWeight );
			newSourceVertex.add( tmp );
			
			newSourceVertices.push( newSourceVertex );

		}

							   
		/******************************************************
		 *
		 *	Step 3.
		 *	Generate Faces between source vertecies
		 *	and edge vertices.
		 *
		 *******************************************************/

		newVertices = newSourceVertices.concat( newEdgeVertices );
		var sl = newSourceVertices.length, edge1, edge2, edge3;
		newFaces = [];

		for ( i = 0, il = oldFaces.length; i < il; i ++ ) {

			face = oldFaces[ i ];

			// find the 3 new edges vertex of each old face

			edge1 = getEdge( face.a, face.b, sourceEdges ).newEdge + sl;
			edge2 = getEdge( face.b, face.c, sourceEdges ).newEdge + sl;
			edge3 = getEdge( face.c, face.a, sourceEdges ).newEdge + sl;

			// create 4 faces.

			newFace( newFaces, edge1, edge2, edge3 );
			newFace( newFaces, face.a, edge1, edge3 );
			newFace( newFaces, face.b, edge2, edge1 );
			newFace( newFaces, face.c, edge3, edge2 );

		}

		// Overwrite old arrays
		geometry.vertices = newVertices;
		geometry.faces = newFaces;

		// console.log('done');

	};

})();

Tee.MyParametricGeometry = function ( func, slices, stacks, useTris ) {

	THREE.Geometry.call( this );

	var verts = this.vertices,
	    faces = this.faces,
      uvs   = this.faceVertexUvs[ 0 ];

	useTris = (useTris === undefined) ? false : useTris;

	var i, il, j, p;

	var stackCount = stacks + 1,
	    sliceCount = slices + 1;

  var invSlice  = 1 / slices,
      invSlices = 1 / sliceCount,
      invStack  = 1 / stacks,
      invStacks = 1 / stackCount;

	for ( i = 0; i <= stacks; i++ )
		for ( j = 0; j <= slices; j++ )
			verts.push( new THREE.Vector3( i*invStack-0.5, func(i,j), 0.5-j*invSlice ) );

	var a, b, c, d, uva, uvb, uvc, uvd, j0, i0, j1, i1, is0, is1;

	for ( i = 0; i < stacks; i ++ ) {

    i0 = i * invStacks;
    i1 = ( i + 1 ) * invStacks;

    is0 = i * sliceCount;
    is1 = (i + 1) * sliceCount;

		for ( j = 0; j < slices; j ++ ) {

			a = is0 + j;
			c = is1 + j;

      j0 = j * invSlices;
      j1 = j0 + invSlices;

			uva = new THREE.Vector2( j0, i0 );
			uvb = new THREE.Vector2( j1, i0 );
			uvc = new THREE.Vector2( j0, i1 );
			uvd = new THREE.Vector2( j1, i1 );

			if ( useTris ) {

  			b = a + 1;
  			d = c + 1;

				faces.push( new THREE.Face3( a, b, c ) );
				faces.push( new THREE.Face3( b, d, c ) );

				uvs.push( [ uva, uvb, uvc ] );
				uvs.push( [ uvb, uvd, uvc ] );

			} else {

				faces.push( new THREE.Face4( a, a+1, c+1, c ) );
				uvs.push( [ uva, uvb, uvd, uvc ] );

			}

		}

	}

	// console.log(this);

	// magic bullet
	// var diff = this.mergeVertices();
	// console.log('removed ', diff, ' vertices by merging');

//	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals();

};

if (typeof THREE !== 'undefined')
  Tee.MyParametricGeometry.prototype = new THREE.Geometry;

var supportsCanvas = (typeof HTMLCanvasElement !== 'undefined');

/**
 * @constructor
 * @class WebGL Three.js canvas context.
 */
Tee.Three=function(id) {

  this.setEnabled=function(enable, chart) {
    if (enable)
       if (Detector && (!Detector.webgl)) return;

    this.__webgl=enable;

    if (enable) {

      if (renderer) {
        chart.__webgl=true;
        chart.canvas.style.display='none';
        chart.canvas=this;
        chart.ctx=this;

        if (renderer && renderer.domElement)
           renderer.domElement.style.display='block';
      }
    }
    else
    {
      var d=container;

      if (! altCanvas) {

         //if (d instanceof HTMLCanvasElement)
         //  altCanvas = d;
         //else

         if (supportsCanvas)
         {
           altCanvas=document.createElement('canvas');

           if (d instanceof HTMLCanvasElement) {
             d.parentElement.appendChild(altCanvas);
             altCanvas.style.background=d.style.background;
           }
           else
             d.appendChild(altCanvas);
         }
         else {
           // try ExCanvas:

           if (typeof G_vmlCanvasManager  != 'undefined' )
           {
             altCanvas = document.createElement('canvas');
             altCanvas = G_vmlCanvasManager.initElement(altCanvas);
             d.appendChild(altCanvas);
           }
         }
      }

      if (altCanvas)
      {
        altCanvas.setAttribute('width', d.width); //d.style.width);
        altCanvas.setAttribute('height', d.height); //d.style.height);

        altCanvas.height = d.clientHeight;
        altCanvas.width = d.clientWidth;
      }

      if (renderer && renderer.domElement)
         renderer.domElement.style.display='none';
      else
      if (supportsCanvas && (d instanceof HTMLCanvasElement))
         d.style.display='none';

      if (altCanvas)
          altCanvas.style.display='block';

      chart.canvas=altCanvas;
      chart.ctx=null; // altCanvas.getContext("2d");
      chart.__webgl=null;

      chart.bounds.set(0, 0, altCanvas.width, altCanvas.height);

      if (altCanvas) {
        altCanvas.chart=chart;
        altCanvas.onmousedown = altCanvas.ontouchstart = chart.domousedown;
        altCanvas.onmouseup = altCanvas.ontouchstop = chart.domouseup;
        altCanvas.onmousemove = altCanvas.ontouchmove = chart.domousemove;
        altCanvas.onmousewheel = altCanvas.onmousewheel = chart._doWheel;
      }
    }

    if (trackBall)
       trackBall.enabled=enable;

    chart.aspect.view3d=enable;

    chart.draw();
  }

  this.zPos=function() {
    return totalDepth *((1-this.z)-this.depth*0.5);
  }

  this.Gradient=function() {
    this.colors=[];
    this.stops=[];

    this.addColorStop=function(stop, color) { this.stops.push(stop); this.colors.push(color); }
  }

  this.clearRect=function() {
    if (parent) {
      scene.remove(parent);

      //parent.dispose();
    }

    parent=new THREE.Object3D();

    scene.add(parent);

    this.needsRender=true;
  }

  this.beginPath=function() {
    this.items=[];
    this.closedPath=false;
  }

  this.moveTo=function(x,y,z) {
     this.items.push({ kind:0, x:x, y:y, z:z });
  }

  this.lineTo=function(x,y,z) {
     this.items.push({ kind:1, x:x, y:y, z:z });
  }

  this.lineZ=function(x,y,z0,z1) {
     this.moveTo(x,y,z0);
     this.lineTo(x,y,z1);
  }

  // Code from examples/js/math/ColorConverter.js:
  function setHSV( color, h, s, v ) {

      // https://gist.github.com/xpansive/1337890#file-index-js
      return color.setHSL( h, ( s * v ) / ( ( h = ( 2 - s ) * v ) < 1 ? h : ( 2 - h ) ), h * 0.5 );

  }

  // Code adapted from Three.js example:
  // http://stemkoski.github.com/Three.js/

  function addMesh(wireframe, m, size, r, geo, maxZ, zMin, zMax) {

    var material;

    if (wireframe) {
      material  = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
      material.wireframe=wireframe;
    }
    else
      material  = m;

    material.vertexColors = THREE.VertexColors;

    if (!wireframe)
       material.side = THREE.DoubleSide;

    var mesh = new THREE.Mesh( geo, material);

    var zRange=zMax-zMin;
    if (zMax===zMin) zRange=1;

    var zOff= ( zMin+(zRange*0.5) ),
        heightRange = r.height / zRange;

    mesh.position.set(r.x+0.5*(r.width-width), r.y+0.5*(r.height-height) -(zOff * heightRange), -totalDepth*0.5);

    mesh.scale.set( r.width, heightRange, totalDepth*maxZ  );

    parent.add(mesh);

    //mesh.add(new THREE.AxisHelper(100));
  }

  this.surface=function(size, func, r, wireframe, grid, maxZ) {

     var useTriangles = true,
         geo = new Tee.MyParametricGeometry( func, size.x-1, size.y-1, useTriangles );

     geo.computeBoundingBox();

     var bou = geo.boundingBox,
         zMin = bou.min.y,
         zMax = bou.max.y,
         zRange = zMax - zMin,
         color, face,
         numberOfSides, vertexIndex,
         i,j,
         faceIndices = [ 'a', 'b', 'c', 'd' ],
         vertices=geo.vertices;

    for (i = 0; i < geo.vertices.length; i++ )
    {
      color = new THREE.Color();
      setHSV(color, 0.7 * (zMax - vertices[i].y) / zRange, 1, 0.9 );

      geo.colors[i] = color;
    }

    numberOfSides = useTriangles ? 3:4;

    for (i = 0; i < geo.faces.length; i++ )
    {
      face = geo.faces[ i ];

      for(j = 0; j < numberOfSides; j++ )
        face.vertexColors[ j ] = geo.colors[ face[ faceIndices[ j ] ] ];
    }

    var m= new THREE.MeshLambertMaterial( {
       color: 0xFFFFFF,
       opacity: this.globalAlpha,
       wireframe: this.wireframe
       //, specular: 0x555555
       //, reflectivity:0.5
       } );

    addMesh(wireframe, m, size, r, geo, maxZ, zMin, zMax);

    if (grid && (!wireframe)) {
      var gridm = new THREE.MeshBasicMaterial( { color: this.colorToInt(grid), opacity:this.globalAlpha } );
      gridm.wireframe=true;
      addMesh(false, gridm, size, r, geo, maxZ, zMin, zMax);
    }
  }

  this.slice=function(p,center,radius,angle0,angle1,donut,torus,beveled) {

    this.beveled= (beveled === undefined) ? false : beveled;

    if (donut>0) {
      this.path=8;
      this.p=p;
      this.torus=torus;

      this.center=center;
      this.radius=radius;
      this.angle0=angle0;
      this.angle1=angle1;
      this.donut=donut;
      this.items=[];

    }
    else
    {
      this.beginPath();
      this.moveTo(p.x,p.y);
      this.arc(center.x,center.y,radius,angle0,angle1,false);
      this.closePath();
    }
  }

  this.closePath=function() {
    this.closedPath=true;
  }

  this.createLinearGradient=function() { return new this.Gradient(); }
  this.createRadialGradient=function() { return new this.Gradient(); }

  var textureCube;
  
  this.getMaterial=function(envMap) {

    var g= null,
        color = g && g.visible ? g.colors[g.colors.length-1] : this.fillStyle,
        image = this.image,
        texture=null;

    /*
    if (image && image.visible && (image.url !== '')) {
       texture = new THREE.ImageUtils.loadTexture( image.url );
       texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
       texture.repeat.set( 10, 10 );

       this.image=null;
    }
    */

    if (envMap) {

      if (!textureCube) {
        var path = "textures/pisa/", format = '.png', urls = [
              path + 'px' + format, path + 'nx' + format,
              path + 'py' + format, path + 'ny' + format,
              path + 'pz' + format, path + 'nz' + format
             ];

        textureCube = THREE.ImageUtils.loadTextureCube( urls, null, function() { o.refresh(); } );
      }

      return new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
    }
    else
      return new THREE.MeshPhongMaterial( {
       color: this.colorToInt(color),
       opacity: this.globalAlpha,
       wireframe: this.wireframe,
       specular: 0x555555,
       map: texture
       //, reflectivity:0.5
       } )
  }

  this.spline=function(points, isShape) {
    this.items=[];
    this.path=0;

    var t=0;

    if (isShape) {
      var p2=[];

      while (t<points.length) {
        p2.push( new THREE.Vector2( points[t], -points[t+1] ) );
        t+=2;
      }

      this.items.push({ kind:12, p:p2 });
    }
    else
    {
      var sp = new THREE.SplineCurve3();

      while (t<points.length) {
          sp.points.push(new THREE.Vector3(points[t], -points[t+1], 0));
          t+=2;
      }

      this.items.push({ kind:8, geo:sp});
    }
  }

  this.bezierCurveTo=function(a,b,c,d,e,f) {
    this.items.push({ kind:11, a:a, b:b, c:c, d:d, e:e, f:f });
  }

  this.quadraticCurveTo=function(x0,y0,x1,y1) {
    this.items.push({ kind:7, x:x0, y:y0, width:x1, height:y1 });
  }

  this.arc=function(cx,cy,radius,angle,endAngle,clockwise) {
    this.items.push({ kind:4, x:cx, y:cy, radius:radius, angle:angle, endAngle:endAngle, clockwise:clockwise });
  }

  this.extrudeOptions={

    amount: 1,
    bevelEnabled: false,
    bevelSegments: 16,
    steps: 12,
    curveSegments: 64,
    bevelThickness: 10,
    bevelSize: 8
  }

  this.getContext=function() { return this; }

  this.beginParent=function() {
    oldParent=parent;
    parent=new THREE.Object3D();
    oldParent.add(parent);
    return parent;
  }

  this.endParent=function() {
    parent=oldParent;
  }

  function addShape(s) {
    o.extrudeOptions.amount=totalDepth*o.depth;

    var geometry;

    if (o.depth == 0)
       geometry = new THREE.ShapeGeometry( s );
    else
       geometry = s.extrude(o.extrudeOptions); //new THREE.ExtrudeGeometry( s, o.extrudeOptions);

    var obj = THREE.SceneUtils.createMultiMaterialObject( geometry, [ o.getMaterial()
                  //, new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } )
                 ] );

    if (o.showShadows) {
        obj.receiveShadow = true;
        obj.castShadow = true;
    }

    return obj;
  }

  // pending
  this.translate=function(x,y) {}
  this.rotate=function(angle) {}

  function roundRect(shape,x,y,width,height,radius) {
    shape.moveTo( x, y + radius );
    shape.lineTo( x, y + height - radius );
    shape.quadraticCurveTo( x, y + height, x + radius, y + height );
    shape.lineTo( x + width - radius, y + height) ;
    shape.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
    shape.lineTo( x + width, y + radius );
    shape.quadraticCurveTo( x + width, y, x + width - radius, y );
    shape.lineTo( x + radius, y );
    shape.quadraticCurveTo( x, y, x, y + radius );
  }

  this.fill=function() {
    var cube, shape,
        material=o.getMaterial(), //(this.path===5) || (this.path===7)),
        i=this.items, l=i.length,
        r=this.r;

    if (l>0) {

        if (i[0].kind==8) {
          var radiusSegments = 8;  // = 2 --> "tape" flat strip

          var tube = new THREE.TubeGeometry(i[0].geo, 100, 0.05*totalDepth*this.depth, radiusSegments, false,false);
          var mesh = new THREE.Mesh(tube, material);
          mesh.position.set( -width*0.5, height*0.5, this.zPos() );

          //mesh.scale.set(1,1,totalDepth*this.depth);

          parent.add(mesh);
        }
        else
        if (this.closedPath) {

          shape = new THREE.Shape();

          var ii, lastX, lastY;

          for (var t=0; t<l; t++) {
            ii=i[t];

            if (ii.kind==0) {
              if ((t==0) || (lastX !== ii.x) || (lastY !== -ii.y)) {
                lastX =  ii.x;
                lastY = -ii.y

                shape.moveTo( lastX, lastY );
              }
            }
            else
            if (ii.kind==1) {

              if ((t==0) || (lastX !== ii.x) || (lastY !== -ii.y)) {
                lastX =  ii.x;
                lastY = -ii.y

                shape.lineTo( lastX, lastY );
              }
            }
            else
            if (ii.kind==4) {

              //var curve = new THREE.EllipseCurve( lastX, lastY, ii.radius, ii.radius,
              //                  2*Math.PI - ii.angle, 2*Math.PI - ii.endAngle, ii.clockwise );
              //shape.curves.push( curve );

              shape.absarc( lastX, lastY, ii.radius, 2*Math.PI - ii.angle, 2*Math.PI - ii.endAngle, ii.clockwise);
            }
            else
            if (ii.kind==7) {
               shape.quadraticCurveTo( ii.x, ii.y, ii.width, ii.height );
            }
            else
            if (ii.kind==11) {
               shape.bezierCurveTo( ii.a, -ii.b, ii.c, -ii.d, ii.e, -ii.f );
            }
            else
            if (ii.kind==12) {
               shape.moveTo( ii.p[0].x, ii.p[0].y );
               shape.splineThru( ii.p );
            }

          }

          var old=this.extrudeOptions.bevelEnabled;
          this.extrudeOptions.bevelEnabled=this.beveled;

          if (this.beveled) {
             var tmpBevel = 0.02 * this.extrudeOptions.bevelSize;
             this.depth -= tmpBevel;
             this.z += tmpBevel * 0.5;
          }

          // SLICE !!! if (shape.actions.length<4) return;

          var mesh=addShape(shape);

          mesh.position.set( -width*0.5, height*0.5, this.zPos() - (totalDepth * this.depth) * 0.5 );
          parent.add(mesh);

          this.extrudeOptions.bevelEnabled=old;
        }
        else {
          var geoplane=new THREE.Geometry(),
              pz= - totalDepth * this.depth,
              face,
              t;

          material.side=THREE.DoubleSide;

          for (t=0; t<l; t++) {
             geoplane.vertices.push( new THREE.Vector3(i[t].x, -i[t].y, 0),
                                     new THREE.Vector3(i[t].x, -i[t].y, pz) );

             if (t>0) {
              face = new THREE.Face4( 2*(t-1), 2*t - 1, 2*t + 1 , 2*t );
              geoplane.faces.push( face );
            }
          }

          geoplane.computeFaceNormals();

          var planeMesh = new THREE.Mesh(geoplane, material );
          planeMesh.position.set( -width*0.5, height*0.5, this.zPos() - pz*0.5 );
          parent.add(planeMesh);
        }
    }
    else
    if (this.depth==0) {

      if (this.rx>0) {
        shape = new THREE.Shape();
        roundRect(shape,r.x,-r.y,r.width,r.height,this.rx);

        var mesh=addShape(shape);
        mesh.position.set( -width*0.5, -r.height+height*0.5, this.zPos() );
        parent.add(mesh);
      }
      else
      if (this.path==6) {
        shape = new THREE.Shape();
        shape.absellipse( 0,0, r.width*0.5, r.height*0.5, 0, Math.PI*2, true );

        var mesh=addShape(shape);
        mesh.position.set( this.cx-width*0.5, -this.cy + height*0.5, this.zPos() );
        parent.add(mesh);

      }
      else
      {
         var plane = new THREE.PlaneGeometry(r.width, r.height);
         material.side=THREE.DoubleSide;
         cube = new THREE.Mesh(plane, material );
          //cube.overdraw=true;
      }
    }
    else
    if (this.path==5) {

      var cylGeo;

      if (this.topRadius==1) {
        if (!cachedCylinder) {
          cachedCylinder = new THREE.CylinderGeometry(1,1,1, 32, 1 );

          //var smoother = new THREE.SubdivisionModifier(2);
          //smoother.modify( cachedCylinder );
        }

        cylGeo=cachedCylinder;
      }
      else {
        if (!cachedCone) {
          cachedCone = new THREE.CylinderGeometry(0,1,1, 32, 1 );

          //var smoother = new THREE.SubdivisionModifier(2);
          //smoother.modify( cachedCone);
        }

        cylGeo=cachedCone;
      }

      cube = new THREE.Mesh(cylGeo, material);

      var tmpRad= 0.5*Math.min( this.vertical ? r.width : r.height, totalDepth);

      cube.scale.x=tmpRad;
      cube.scale.z=tmpRad;
      cube.scale.y= this.vertical ? r.height : r.width;

      if (!this.vertical) {
         cube.rotation.z = Math.PI*0.5;
         cube.rotation.y = Math.PI;
      }
    }
    else
    if (this.path==7) {  // ellipsoid

      var eli;

      if (!cachedEllipsoid) {
          cachedEllipsoid= new THREE.SphereGeometry( 1,32,32 );

          //var smoother = new THREE.SubdivisionModifier(2);
          //smoother.modify( cachedEllipsoid );
      }

      eli=cachedEllipsoid;

      cube = new THREE.Mesh( eli, material);
      cube.scale.set(r.width*0.5, r.height*0.5, totalDepth*this.depth);
    }
    else
    if (this.path==6) {
        shape = new THREE.Shape();
        shape.absellipse( 0,0, r.width*0.5, r.height*0.5, 0, Math.PI*2, true );

        var mesh=addShape(shape);
        mesh.position.set( this.cx-width*0.5, -this.cy + height*0.5, this.zPos() );
        parent.add(mesh);
    }
    else
    if (this.path==8) {
      this.angle0 = 2*Math.PI -this.angle0;
      this.angle1 = 2*Math.PI -this.angle1;

      if (this.torus) {
        var range = Math.abs(this.angle1-this.angle0),
            segments = Math.max(16, (90 * Math.PI / range) | 0),
            geoTorus = new Tee.TorusGeometry( this.radius-(this.donut*0.5), this.donut*0.5, 16, segments, range );

        var torus = new THREE.Mesh( geoTorus, material);
        torus.position.set( this.center.x-width*0.5, -this.center.y+height*0.5, this.zPos() + this.donut);
        torus.rotation.z=this.angle1;
        parent.add( torus );
      }
      else {

        shape = new THREE.Shape();
        shape.moveTo( this.p.x, this.p.y );
        shape.absarc( this.center.x, this.center.y, this.radius, this.angle0, this.angle1, true );
        shape.absarc( this.center.x, this.center.y, this.donut, this.angle0, this.angle1, false );

        var old=this.extrudeOptions.bevelEnabled;
        this.extrudeOptions.bevelEnabled=this.beveled;

        var mesh=addShape(shape);
        mesh.position.set( -width*0.5, -height*0.5, this.zPos() );
        parent.add(mesh);

        this.extrudeOptions.bevelEnabled=old;
      }

    }
    else {
      var geoCube;

      if (cubeSegments===1) {
        if (!cachedCube)
          cachedCube= new THREE.BoxGeometry(1,1,1);

        geoCube=cachedCube;
      }
      else {
        if (!cachedSmoothCube) {
          cachedSmoothCube= new THREE.BoxGeometry( 1,1,1, cubeSegments,cubeSegments,cubeSegments );

          var smoother = new THREE.SubdivisionModifier(2);
          smoother.modify( cachedSmoothCube );
        }

        geoCube=cachedSmoothCube;
      }

      cube = new THREE.Mesh( geoCube, material);
      cube.scale.set(r.width, r.height, totalDepth*this.depth);
    }

    if (cube) {
      cube.position.set( (r.x+r.width*0.5)-width*0.5,  -(r.y+r.height*0.5)+height*0.5, this.zPos() );

      if (this.showShadows) {
          cube.receiveShadow = true;
          cube.castShadow = true;
      }

      parent.add( cube );
    }
  }

  this.setLineDash=function(dash) { this.dash=dash; }

  this.lineMaterial=function() {

    var m, params={ color: this.colorToInt(this.strokeStyle),
                    opacity: this.globalAlpha };

    if (this.dash && (this.dash.length>0)) {
       m = new THREE.LineDashedMaterial(params);

       m.dashSize=3; // this.dash[0]
       m.gapSize=1;  // this.dash[1]
    }
    else {
       m = new THREE.LineBasicMaterial(params);
       //m = new THREE.MeshPhongMaterial(params);

       m.linecap = this.cap;
       m.linejoin = this.join;
    }

    m.linewidth = this.lineWidth;

    return m;
  }

  this.polygon=function(points, format) {

       var t, l=points.length, p,
           geometry,
           shape = new THREE.Shape(),
           z,
           obj;

       // shape.fromPoints(points);  // scale.y = -1

       shape.moveTo(points[0].x, -points[0].y);
       for (t=1; t<l; t++) {
          p = points[t];
          shape.lineTo(p.x, -p.y);
       }

       geometry = shape.makeGeometry();

       if (format.fill!=="") {
          this.fillStyle=format.fill;

          if (this.depth>0)
             obj = addShape(shape);
          else
          {
            var m = this.getMaterial();

            obj = new THREE.Mesh( geometry, m);

            if (!this.wireFrame)
                 m.side = THREE.DoubleSide;
          }

          z = totalDepth *(1- this.z)
          obj.position.set( -width*0.5, height*0.5, z - this.depth*0.5 );

          if (this.showShadows)
             obj.castShadow=true;
             
          parent.add(obj);
       }

       if (format.stroke.fill!=="") {

         geometry = new THREE.Geometry();

         for (t=0; t<l; t++) {
            p = points[t];
            geometry.vertices.push(new THREE.Vector3( p.x, -p.y, 0 ));
         }

         var line = new THREE.Line(geometry, this.lineMaterial());

         z = totalDepth * ( 1 - this.z + this.depth);
         line.position.set( -width*0.5, height*0.5, z);
         parent.add(line);
       }

  }

  this.stroke=function() {
    var l=this.items.length,
        material = this.lineMaterial(),
        iz;

    if (l>0) {

       var i, line,  geometry = new THREE.Geometry();

       for (var t=0; t<l; t++) {
         i=this.items[t];

         iz = (i.z === undefined) ? this.z : i.z;
         iz = totalDepth *(1- iz);

         if (i.kind==0) {
           if (geometry.vertices.length>0) {
             line = new THREE.Line(geometry, material);
             parent.add(line);
           }
           geometry = new THREE.Geometry();
           geometry.vertices.push(new THREE.Vector3( i.x-width*0.5, -i.y+height*0.5, iz));
         }
         else
         if (i.kind==1)
           geometry.vertices.push(new THREE.Vector3( i.x-width*0.5, -i.y+height*0.5, iz));
       }

       if (geometry.vertices.length>0) {
         line = new THREE.Line(geometry, material);
         parent.add(line);
       }
    }
    else
    if (this.depth==0) {

      var p = new THREE.Path(), r=this.r;

      if ((this.path==0) || (this.path==1)) {
        if (this.rx>0)
           roundRect(p,r.x,-r.y-r.height,r.width,r.height,this.rx);
        else
        {
          p.moveTo( r.x, -r.y-r.height );
          p.lineTo( r.x+r.width, -r.y-r.height);
          p.lineTo( r.x+r.width, -r.y);
          p.lineTo( r.x, -r.y);
        }
      }
      else
      if (this.path==6)
         p.absellipse( this.cx,-this.cy, r.width*0.5, r.height*0.5, 0, Math.PI*2, true );

      line = new THREE.Line( p.createPointsGeometry(), material);
      line.position.set( -width*0.5, height*0.5, this.zPos() );
      parent.add(line);
    }
  }

  this.measureText=function(text) {
    var res=privateCanvas.measureText(text);
    return { width:res.width*1.4 }; // res is read-only !!
  }

  this.roundRect=function(x,y,width,height,rx,ry) {
    this.path=0;
    this.r={x:x,y:y,width:width,height:height};
    this.depth=0;
    this.rx=rx;
    this.ry=ry;
  }

  this.rect=function(x,y,width,height) {
    this.path=0;
    this.r={x:x,y:y,width:width,height:height};
    this.depth=0;
    this.rx=0;
    this.ry=0;
  }

  this.cube=function(r, round) {
    this.path=1;
    this.r=r;
    this.items=[];
    cubeSegments = (round>0) ? 6 : 1;
  }

  this.sphere=function(cx,cy,rx,ry) {
    if (!cachedSphere)
      cachedSphere = new THREE.SphereGeometry( 1, 32, 32 );

    var sphere = new THREE.Mesh(cachedSphere, this.getMaterial());
    sphere.position.set( cx-width*0.5, -cy+height*0.5, this.zPos() );
    sphere.scale.set(0.5*rx,0.5*ry,0.5*Math.min(rx,totalDepth));
    parent.add(sphere);
  }

  this.save=function() {}
  this.clip=function() {}
  this.restore=function() {}

  function stringToColor(color) {

    if (color.substr(0,4)=='rgb(') {
       var tmp = color.slice(4, color.length - 1).split(',');
       return tmp[2] | (tmp[1] << 8) | (tmp[0] << 16);
    }
    else
    switch (color) {
      case 'white': return 0xffffff;
     case 'silver': return 0xE0E0E0;
   case 'darkgray':
   case 'darkgrey': return 0x808080;
      case 'black': return 0x0;
        case 'red': return 0xff0000;
      case 'green': return 0x00ff00;
       case 'blue': return 0x0000ff;
    default: return 0xffffff;
    }
  }

  this.colorToInt=function(color) {
    var tmp = (color instanceof this.Gradient) ? color.colors[color.colors.length-1] : color;
    return (tmp.substr(0,1)=='#') ? parseInt( tmp.substr(1), 16 ) : stringToColor(tmp);
  }

  this.pyramid=function(r, vertical) {
    var points = [
          new THREE.Vector3( 100, 0, 0 ),
          new THREE.Vector3( 0, 100, 0 ),
          new THREE.Vector3( 0, 0, 100 ),
          new THREE.Vector3( 0, 0, 0 )
       ];

    var geo = new THREE.ConvexGeometry( points );
  }

  this.ellipsoid=function(r, vertical) {
    this.path=7;
    this.r=r;
    this.vertical=vertical;
    this.items=[];
  }

  this.cylinder=function(r, topRadius, vertical) {
    this.path=5;
    this.r=r;
    this.topRadius=topRadius;
    this.vertical=vertical;
    this.items=[];
  }

  this.ellipsePath=function(cx,cy,w,h) {
    this.path=6;
    this.cx=cx;
    this.cy=cy;
    this.r={x:cx,y:cy,width:w,height:h};
    this.items=[];
  }

  function getFontSize(font) {
    var s=font.split(" "), t, res;
    for (t=0; t<s.length; t++) {
      res=parseFloat(s[t]);
      if (res) return res;
    }

    return 20;
  }

  var SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 1024;

  this.addLight=function(kind, color, x,y,z, shadows) {
    var light=new kind(color);

    light.position.set(x,y,z); //.normalize();

    light.shadowsEnabled=shadows;

    if (this.showShadows && shadows)
      if ((light instanceof THREE.SpotLight) || (light instanceof THREE.DirectionalLight)) {
         light.castShadow = true;

         //light.shadowDarkness = 0.1;
         //light.shadowBias= -0.0002;

         //light.shadowMapWidth = SHADOW_MAP_WIDTH;
         //light.shadowMapHeight = SHADOW_MAP_HEIGHT;
         
         /*
        light.shadowCascade = true;
				light.shadowCascadeCount = 3;
				light.shadowCascadeNearZ = [ -1.000, 0.995, 0.998 ];
				light.shadowCascadeFarZ  = [  0.995, 0.998, 1.000 ];
				light.shadowCascadeWidth = [ 1024, 1024, 1024 ];
				light.shadowCascadeHeight = [ 1024, 1024, 1024 ];
        */
      }

    scene.add(light);
    this.lights.push(light);

    return light;
  }

  function findTextCache(text,size) {
    var t, l=textCache.length, i;
    for (t=0; t<l; t++) {
      i=textCache[t];
      if ((i.text===text) && (i.size===size))
         return i.obj;
    }

    return null;
  }

  this.fillText=function(theText, x, y) {

     if (theText==='') return;

     var fontsize=getFontSize(this.font),
         text3d = findTextCache(theText, fontsize),
         centerOffset=0;
		 
     if (!text3d) {
        text3d = new THREE.TextGeometry( theText, {
                        size: fontsize,
                        height: this.textDepth,
                        curveSegments: 2,
                        font: "helvetiker"
                      });

        text3d.computeBoundingBox();

        textCache.push({ text:theText, obj:text3d, size:fontsize});
     }
		 
		 //*** start sizing font check ***
		 var sizeTxt = "Wj";
		 
		 var calcText3DHeight = findTextCache(sizeTxt, fontsize);
		 if (!calcText3DHeight)
		    calcText3DHeight = new THREE.TextGeometry( sizeTxt, {
                          size: fontsize,
                          height: this.textDepth,
                          curveSegments: 2,
                          font: "helvetiker"
                        });
											
		 calcText3DHeight.computeBoundingBox();
		 var calcB=calcText3DHeight.boundingBox;
		 textCache.push({ text:sizeTxt, obj:calcText3DHeight, size:fontsize});
		 //*** end sizing font check ***

     var b=text3d.boundingBox,
         w=( b.max.x - b.min.x );

		 var h=(calcB.max.y - calcB.min.y);
				 
		 //calcB = null;

     if (this.textAlign==='center')
       centerOffset = -0.5 * w;
     else
     if ((this.textAlign==='right') || (this.textAlign==='end') )
       centerOffset = -w;

     var textMaterial = new THREE.MeshLambertMaterial( { color: this.colorToInt(this.fillStyle), opacity:this.globalAlpha, overdraw: false } );

     var text = new THREE.Mesh( text3d, textMaterial );

     var hOffset = (this.textBaseline==="top") ? h : (this.textBaseline=="middle") ? h*0.5 : 0;

     text.position.x = x+centerOffset - width*0.5;
     text.position.y = -y + height*0.5 - hOffset + ((h-fontsize));
     text.position.z = 1 + totalDepth *(1-this.z);

     text.rotation.x = 0;
     text.rotation.y = Math.PI * 2;

     parent.add(text);
  }

  this.update=function() {

    if (this.__webgl) {

      if (trackBall && trackBall.enabled)
         trackBall.update(1);

      if (this.needsRender) {

        if (this.hitTest)
           this.doHitTest();

        this.doRender();
      }
    }
  }

  this.setCamera=function(perspective) {

    if (camera)
       scene.remove(camera);

    if (perspective)
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 10000);
    else
      camera = new THREE.OrthographicCamera( -window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2,  0.1, 10000);

    this.camera=camera;

    camera.lookAt(scene.position);

    //scene.add(camera);

    camera.position.set(0,0,800);

    if (trackBall)
        trackBall.object = camera;

    this.refresh();
  }

  this.refresh=function() {
    this.needsRender=true;
    this.update();
  }

  this.createTrackball=function() {
    if (renderer && (typeof THREE.TrackballControls!=='undefined')) {

       trackBall = this.trackBall = new THREE.TrackballControls( camera, renderer.domElement );

       //trackBall = this.trackBall = new THREE.FirstPersonControls( camera, renderer.domElement );
       //trackBall = this.trackBall = new THREE.RollControls( camera, renderer.domElement );

       trackBall.enabled=true;

       trackBall.keys = [ 65, 83, 68 ];
       trackBall.dynamicDampingFactor = 0.2;

       var ua=typeof navigator!="undefined" ? navigator.userAgent.toLowerCase() : "";
       if ( ua.indexOf('mac os x') > -1 )
           trackBall.zoomSpeed = 0.1;  // Chrome Mac ?  (default: 1.2)

        /*
        trackBall.rotateSpeed = 1.0;
        trackBall.panSpeed = 0.8;

        trackBall.noZoom = false;
        trackBall.noPan = false;

        trackBall.staticMoving = true;
         */

        if (trackBall instanceof THREE.TrackballControls)
          trackBall.addEventListener( 'change', function () {

              o.needsRender=true;
              //o.doRender();
          } );
    }
  }

  function resizeContainer(width, height) {
    var tmp = container;
    tmp.width=width;
    tmp.height=height;

    renderer.setSize( width, height );

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  var isFull, oldFull={}

  function fullScreenChanged() {

    if (isFull) {
      resizeContainer(oldFull.width, oldFull.height);
      isFull=false;
    }
    else {
      oldFull.width=container.width;
      oldFull.height=container.height;
      resizeContainer(window.innerWidth, window.innerHeight);
      isFull=true;
    }

    o.refresh();
  }

  document.addEventListener("fullscreenchange", fullScreenChanged, false);
  document.addEventListener("mozfullscreenchange", fullScreenChanged, false);
  document.addEventListener("webkitfullscreenchange", fullScreenChanged, false);

  this.fullScreen=function() {
    var tmp = container,
        ok = tmp.requestFullscreen || tmp.mozRequestFullscreen || tmp.webkitRequestFullscreen || tmp.msRequestFullScreen;

    if (ok)
       ok.call(tmp);
  }

  this.onWindowResize=function() {

    if (camera instanceof THREE.PerspectiveCamera)
       camera.aspect =  window.innerWidth / Math.max(1, window.innerHeight);

    camera.updateProjectionMatrix();

    if (renderer)
       renderer.setSize( window.innerWidth, window.innerHeight );
  }

  this.setShowShadows=function(value) {
    this.showShadows=value;

    var t, light;

    for (t=0; t<this.lights.length; t++) {
      light=this.lights[t];

      if ((light instanceof THREE.SpotLight) || (light instanceof THREE.DirectionalLight))
        if (light.shadowsEnabled)
           light.castShadow = this.showShadows;
    }

    floor.receiveShadow = this.showShadows;

    if (renderer) {
      renderer.shadowMapEnabled = this.showShadows;
      renderer.shadowMapType = THREE.PCFSoftShadowMap;

      if (this.showShadows)
         renderer.shadowMapAutoUpdate=true;
    }
  }

  // Show light positions:

  this.setShowLights=function(value) {

    this.showLights=value;

    var t, l=this.lights.length, light;

    for (var t=0; t<l; t++) {

      light=this.lights[t];

      if (light.__helper) {
          value=light.visible && this.showLights;
          light.__helper.traverse(function ( object ) { object.visible = value; } );
      }
      else
      if (this.showLights) {

        if (light instanceof THREE.SpotLight)
           light.__helper = new THREE.SpotLightHelper(light, 16, 100);
        else
        if (light instanceof THREE.PointLight)
           light.__helper = new THREE.PointLightHelper(light, 16);
        else
        if (light instanceof THREE.DirectionalLight)
           light.__helper = new THREE.DirectionalLightHelper(light, 16, 100);
        else
           continue; // unsupported light class

        scene.add(light.__helper);
      }
    }

    if (!this.needsRender)
       this.refresh();
  }

  this.showLight=function(index, show) {
    var light=this.lights[index];

    light.visible=show;

    if (light.__helper) {
      show=show && this.showLights;
      light.__helper.traverse(function ( object ) { object.visible = show; } );
    }

    this.refresh();
  }

  this.doHitTest=function() {
    /*
    var v = new THREE.Vector3( mouse.x, mouse.y, 1 );
    projector.unprojectVector( v, camera );

    var ray = new THREE.Ray( camera.position, v.subSelf( camera.position ).normalize() ),
        found = ray.intersectObjects( scene.children );

    if ( found.length > 0 ) {
        // found[0].object
    }
    else {
    }
    */
  }

  this.doRender=function() {
    //var v=new THREE.Vector3(0,0,0);
    //parent.traverse(function(o) { o.lookAt(o.localToWorld(v)); });

    if (renderer) {

      renderer.render( scene, camera );

      renderer.shadowMapAutoUpdate=false;

      if (stats && stats.visible)
         stats.update();
    }

    this.needsRender=false;
  }

  this.clearTextCache=function() { textCache=[]; }

  this.toogle=function(element, show) {
    element.visible=show;

    if (element.visual) {
      element.visual.traverse(function(o){o.visible=show;});
      this.needsRender=true;
    }
    else
      element.chart.draw();

    this.update();
  }

  this.isEnabled=function() {
    return this.__webgl;
  }

  // INIT:

  //stats.setMode( 1 );
  //if (renderer)
  //   renderer.domElement.appendChild( stats.domElement );

  // If no Detector.js script is accessible, consider it ok:
  
  this.__webgl = (typeof Detector==='undefined') || (Detector && Detector.webgl);

  this.needsRender = true;

  var totalDepth=200;

  this.showLights=false;
  this.showShadows=false;

  this.items=[];
  this.closedPath=false;
  this.z=0;
  this.textDepth=0;
  this.beveled=false;

  var cubeSegments=1,
      altCanvas;

  var parent;

  this.wireframe=false;
  this.globalAlpha=1;

  var oldParent;

  var cachedSphere, cachedCylinder, cachedCone, cachedCube, cachedSmoothCube,
      cachedEllipsoid;

  var o=this;

  var textCache=[];

  var container = document.getElementById(id),
      width = container.clientWidth,
      height = container.clientHeight,
      scene,
      camera,
      renderer;

  var tmpCanvas = null;

  if (supportsCanvas && (container instanceof HTMLCanvasElement))
      tmpCanvas = container;

  // IE: tmpCanvas = container;

  if (this.__webgl) {

      scene = new THREE.Scene();

      //renderer = new THREE.CanvasRenderer({ canvas:container} );

      renderer = new THREE.WebGLRenderer({ antialias:true, canvas:tmpCanvas, clearAlpha:1
                                           // , preserveDrawingBuffer:true // (screenshots)
                                         } );
  }

  var privateCanvas = null;

  if (supportsCanvas)
    privateCanvas = document.createElement("canvas").getContext("2d");

  //container.addEventListener( 'resize', this.onWindowResize, false );

  this.width=width;
  this.height=height;
  this.camera=camera;
  this.scene=scene;
  this.renderer=renderer;

  if (renderer)
    renderer.sortObjects=false;
  else
    this.__webgl=false;

  var stats = this.stats = null;
  // IE8 :
  if (document.addEventListener) {

    if (typeof Stats !== 'undefined') {
      this.stats = new Stats();
      stats = this.stats;
      stats.visible=true;

      stats.setVisible=function(show) {
        stats.visible=show;
        stats.domElement.style.display = show ? 'block' : 'none';
      }
    }
  }

  if (renderer) {
    //scene.fog = new THREE.FogExp2( 0x999999, 0.00025 );
    //scene.fog = new THREE.Fog( 0x999999, 1000, 10000 );

    renderer.setSize(width, height);

    if (this.showShadows) {
      renderer.shadowMapEnabled = true;
      renderer.shadowMapSoft = true;
    }
  }

  //  if (scene)
  //  scene.add(camera);

  var back='#AAAA77';
  if (window.getComputedStyle)
     back=window.getComputedStyle(container).backgroundColor;

  if (renderer) {
     renderer.setClearColor( this.colorToInt(back) );

     if (container !== renderer.domElement)
        container.appendChild( renderer.domElement );

     /*
     renderer.gammaInput = true;
     renderer.gammaOutput = true;
     renderer.physicallyBasedShading = true;
     */
  }

  this.lights=[];

  if (renderer) {
    this.addLight(THREE.SpotLight, 0xBBBBBB,-300,300,400, true);
    this.addLight(THREE.DirectionalLight, 0x888888,400,1800,1600, false);
    this.addLight(THREE.PointLight, 0x888888,500,120,-500, false);

    this.setShowLights(this.showLights);

    var ambientLight = this.ambientLight = new THREE.AmbientLight(0x222222);
    ambientLight.visible=false;
    scene.add(ambientLight);

    var hemiLight = this.hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.5 );
//    hemiLight.color.setHSV( 0.6, 0.45, 1 );
//    hemiLight.groundColor.setHSV( 0.1, 0.45, 0.95 );
    hemiLight.position.y = 500;

    //hemiLight.shadowsEnabled=true;
    //hemiLight.castShadow=true;

    hemiLight.visible=false;
    
    scene.add( hemiLight );

    var texture = null;

    /*
    texture = THREE.ImageUtils.loadTexture( 'textures/charcoal.png' );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 10, 10 );
    */

    var floor=this.floor = new THREE.Mesh( //new THREE.BoxGeometry( 10000, 10000, 10 ),
                           new THREE.CylinderGeometry(4000,4000,50, 32, 1 ),
                           new THREE.MeshLambertMaterial( { color: this.colorToInt('silver')

                                                        , map: texture
                                                        //  , map: THREE.ImageUtils.loadTexture('http://steema.us/files/jscript/beta/nov_2012/demos/images/metal.jpg')
                                                        //  , ambient:0xFFFFFF
                                                        //  , side:THREE.DoubleSide

                                                        , opacity: 0.9
                                                        , transparent:true

                                                        } ) );


   //floor.material.map.wrapS = floor.material.map.wrapT = THREE.RepeatWrapping;
   //floor.material.map.repeat.set( 5, 5 );

   if (this.showShadows)
       floor.receiveShadow = true;

    floor.position.y = -20 -height*0.5;

    //floor.rotation.x = - Math.PI / 2;
    
    scene.add(floor);

    //var axis = this.axis = new THREE.AxisHelper(1200);
    //scene.add(axis);

    var trackBall=this.trackBall = null;

    this.setCamera(true);
    this.createTrackball();
  }
  
  this.needsRender = true;
}

}).call(this);
