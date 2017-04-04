(function(window) {
  var eastAsiaCountries = ['China', 'Taiwan', 'Japan', 'Vietnam',
    'North Korea', 'South Korea', 'Philippines', 'Thailand', 'Malaysia',
    'Indonesia', 'Cambodia', 'Laos', 'Myanmar', 'Singapore', 'Brunei',
    'East Timor', 'Mongolia'];

  var width = $(window).width(),
      height = $(window).height();

  var svg = d3.select("#east-asia-map").append("svg")
    .attr("width", width)
    .attr("height", height);

  d3.json("data/countries.geo.topo.json", function(error, mapData) {
    if (error) return console.error(error);

    var center = [122, 23];

    var projection = d3.geo.mercator()
      .scale(500)
      .center(center)
      .translate([width / 2, height / 2]);

    var path = d3.geo.path()
      .projection(projection);

    svg.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(topojson.feature(mapData, mapData.objects['countries.geo']).features)
      .enter().append("path")
      .attr("d", path)
      .style("display", function(d) {
        if (eastAsiaCountries.indexOf(d.properties.name) > -1) {
          return 'block';
        }
        else {
          return 'none';
        }
      })
      .attr('fill', function(d) {
        if(d.properties.name === 'Vietnam') {
          return 'red';
        } 
      });

    svg.append("path")
      .attr("class", "country-borders")
      .attr("d", path(topojson.mesh(mapData,
        mapData.objects['countries.geo'],
        function(a, b) {
          return eastAsiaCountries.indexOf(a.properties.name) > -1 && a !== b;
        })
      ));

    svg.append('text')
      .text('East Asia')
      .attr('class', 'map-title')
      .attr("y", height/2)
      .attr("x", width/3*2);

  });




})(window);
