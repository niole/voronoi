var d3 = require('d3');
var $ = require('jquery');
var _ = require('lodash');
var Voronoi = require('./voronoi');

$(document).ready(function() {

startup();

function startup() {


  var padding = 10;
  var width = $(window).width();
  var height = $(window).height();
  var area = width*height;

  draw(padding, width, height, area);

  function draw(padding, width, height, area) {

    window.addEventListener('resize', function() {
      event.preventDefault();

      var width = $(window).width();
      var height = area/width;

      var points = [];
      for (var i=0; i<100; i++) {
        points.push([Math.random()*width, Math.random()*height]);
      }

      V.updateAll(points,padding, width, height, false);

    });

    var points = [];
    for (var i=0; i<100; i++) {
      points.push([Math.random()*width, Math.random()*height]);
    }


    var V = new Voronoi(points, padding, width, height);
    V.draw();
  }
}

});
