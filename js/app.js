var d3 = require('d3');
var $ = require('jquery');
var _ = require('lodash');
var Voronoi = require('./voronoi');

$(document).ready(function() {

draw();


function draw() {
  var padding = 10,
      width = $(window).width(),
      height = $(window).height();

  var points = [];
  for (var i=0; i<100; i++) {
    points.push([Math.random()*width, Math.random()*height]);
  }

  var V = new Voronoi(points, padding, width, height);
  V.draw();
}
});
