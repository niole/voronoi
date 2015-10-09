console.log('entry point');
var d3 = require('d3');
var $ = require('jquery');

$(document).ready(function() {

  var padding = 10,
      width = 960,
      height = 500;

  var points = [
    [20, 20],
    [701, 30],
    [400, 200],
    [760, 300],
    [200, 200]
  ];

  var voronoi = d3.geom.voronoi()
      .clipExtent([[padding, padding], [width - padding, height - padding]]);

  var color = d3.scale.category20c();

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  svg.selectAll("path")
      .data(voronoi(points))
    .enter().append("path")
      .style("fill", function(d, i) { return color(i); })
      .style("opacity", .5)
      .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
      .on('click', function() {
        console.log('stuff');
      });

  svg.selectAll("circle")
      .data(points)
    .enter().append("circle")
      .style("fill", function(d, i) { return color(i); })
      .attr("transform", function(d) { return "translate(" + d + ")"; })
      .attr("r", 4.5);
});
