d3.chart('Circles', {

  initialize: function() {

    console.log(this.__width);

    // defaults options
    this.__width = this.__width || this.base[0][0].offsetWidth;
    this.__height = this.__height || 20;
    this.__radius = this.__radius || 10;

    // create a base scale we will use later.
    this.xScale = d3.scale.linear();

    this.base
        .attr('height', this.__height)
        .attr('width', this.__width);

    var circlesBase = this.base.append('g')
        .classed('circles', true);

    this.layer('circles', circlesBase, {

      dataBind: function(data) {

        // update the domain of the xScale since it depends on the data
        var chart = this.chart();
        chart.xScale.domain([Math.min.apply(null, data), Math.max.apply(null, data)]);

        // return a data bound selection for the passed in data.
        return this.selectAll('circle')
          .data(data);
      },

      insert: function() {
        var chart = this.chart();

        // update the range of the xScale
        chart.xScale.range([Math.ceil(chart.__radius), chart.__width-Math.ceil(chart.__radius)]);

        // setup the elements that were just created
        return this.append('circle')

        // setup the non data driven attributes
          .classed('circle', true)
          .style('fill', chart.color)
          .attr('cy', chart.__height/2)
          .attr('r', chart.__radius);
      },

      // setup an enter event for the data as it comes in:
      events: {
        'enter' : function() {
          var chart = this.chart();
          return this.attr('cx', function(d) {
            return chart.xScale(d);
          });
        }
      }
    });
  },

  // configures the width of the chart.
  // when called without arguments, returns the
  // current width.
  width: function(newWidth) {
    if (arguments.length === 0) {
      return this.__width;
    }
    this.__width = newWidth;
    this.base.attr('width', this.__width);
    return this;
  },

  // configures the height of the chart.
  // when called without arguments, returns the
  // current height.
  height: function(newHeight) {
    if (arguments.length === 0) {
      return this.__height;
    }
    this.__height = newHeight;
    this.base.attr('height', this.__height);
    return this;
  },

  // configures the radius of the circles in the chart.
  // when called without arguments, returns the
  // current radius.
  radius: function(newRadius) {
    if (arguments.length === 0) {
      return this.__radius;
    }
    this.__radius = newRadius;
    return this;
  },

  // configures the color of the circles in the chart.
  // when called without arguments, returns the
  // current color.
  color: function(newColor) {
    if (arguments.length === 0) {
      return this.color;
    }
    this.color = newColor;
    return this;
  }
});
