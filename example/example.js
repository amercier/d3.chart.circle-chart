(function() {

  // Trim <pre> elements
  $('pre').each(function(i, el) {
    var $el = $(el);
    $el.text( $el.text().trim() );
  });

  // $('.chart-example').each(function(i, el) {
  //   var $el = $(el);
  //   window.eval( $el.find('pre').text() );
  // });

  (function() {
    var data = [1,3,4,6,10];

    var chart = d3.select('.chart-example-full .chart-data')
      .append('svg')
      .chart('Circles')
      .width(200)
      .height(50)
      .radius(10)
      .color('#2fa0ec');

    chart.draw(data);
  })();

  // (function() {
  //   var data = [1,3,4,6,10];

  //   var chart = d3.select('.chart-example-basic .chart-data')
  //     .append('svg')
  //     .chart('Circles');

  //   chart.draw(data);
  // })();

}());
