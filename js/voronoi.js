var d3 = require('d3');
var $ = require('jquery');

module.exports = (function() {
  function Voronoi(points, padding, width, height) {
    var self = this;
    this.data = points;
    this.padding = padding;

    this.width = width;
    this.height = height;
    this.active = false;


    this.svg = d3.select("body").append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .on('mouseleave', function() {
          this.active = false;
          this.data.pop();
        }.bind(this))
        .on('mousemove', function() {
          var newPoint = d3.mouse(this);
          self.update(newPoint[0], newPoint[1]);
        });
}

Voronoi.prototype.updateAll = function(points, padding ,width, height, active) {

    var self = this;
    this.data = points;
    this.padding = padding;

    this.width = width;
    this.height = height;
    this.active = false;
};

Voronoi.prototype.update = function(x,y) {
  if (this.active) {
    this.data[this.data.length-1][1] = y;
    this.data[this.data.length-1][0] = x;
  } else {
    this.active = true;
    this.data.push([x,y]);
  }
  this.draw();
};


Voronoi.prototype.draw = function() {

    this.voronoi = d3.geom.voronoi()
        .clipExtent([[this.padding, this.padding], [this.width - this.padding, this.height - this.padding]]);

    var color = d3.scale.category20c();



    this.V = this.svg.selectAll("path")
              .data(this.voronoi(this.data));

    this.V
      .enter()
      .append("path");

      this.V
          .select("path");

      this.V
        .style("fill", function(d, i) { return color(i); })
        .style("opacity", .5)
        .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

      this.V
          .exit()
          .remove();
};

return Voronoi;
}())

