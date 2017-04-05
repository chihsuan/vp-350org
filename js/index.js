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

  var scale = 500;
  var isMobile = width < 600;

  if (isMobile)  {
    scale = 300;
  }

  d3.json("data/countries.geo.topo.json", function(error, mapData) {
    if (error) return console.error(error);

    var center = [110.5, 23];

    var projection = d3.geo.mercator()
      .scale(scale)
      .center(center)
      .translate([width / 2 + 10, height / 2 + 50]);

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
          return 'rgba(218, 55, 47, 0.9)';
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
      .attr("y", function() {
        if (isMobile) {
          return '150px';
        }
        return height/2;
      })
      .attr("x", function() {
        if (isMobile) {
          return width/2;
        }
        return width/5*4;
      })
      .attr("text-anchor", "middle");


    var features = topojson.feature(mapData, mapData.objects['countries.geo']).features;
    features = features.filter(function(d) {
      return d.properties.name === 'Vietnam';
    });

    var centroids = features.map(function (feature){
      return {
        name: feature.properties.name,
        center: path.centroid(feature),
      }
    });

    svg.selectAll(".place-label")
      .data(centroids)
    .enter().append("text")
      .attr("class", "place-label")
      .text(function(d) { return d.name; })
      .attr("x", function (d){ return d.center[0]; })
      .attr("y", function (d){ return d.center[1]; });

  });

  var root = { children: [
    {value: 4}, {value: 2}, 
    {value: 10}, {value: 5},
    {value: 8}, {value: 10},    
  ]};

  var bankTreemap = d3.layout.treemap().size([width,400]);
  var nodes = bankTreemap.nodes(root);
  nodes = nodes.slice(1, nodes.length);

  var bankSvg = d3.select('#bank-treemap')
    .append('svg')
    .attr("width", width)
    .attr("height", 400);

  bankSvg.selectAll("rect")
    .data(nodes)
    .enter().append("rect")
    .attr({
      x: function(d) { return d.x; },
      y: function(d) { return d.y; },
      width: function(d) { return d.dx; },
      height: function(d) { return d.dy; },
      class: 'bank-treemap-rect'
    })

  bankSvg.selectAll("text")
    .data(nodes)
    .enter().append("text")
    .attr({
      x: function(d) { return d.x + d.dx/4; },
      y: function(d) { return d.y + d.dy/3; },
      "text-anchor": "middle",
      "dominant-baseline": "central"
    })
    .text(function(d) { return 'Bank' })
    .style('font-size', '16px');



  var projTreemap = d3.layout.treemap().size([width,400]);
  var nodes = bankTreemap.nodes(root);
  nodes = nodes.slice(1, nodes.length);

  var projSvg = d3.select('#proj-treemap')
    .append('svg')
    .attr("width", width)
    .attr("height", 400);

  projSvg.selectAll("rect")
    .data(nodes)
    .enter().append("rect")
    .attr({
      x: function(d) { return d.x; },
      y: function(d) { return d.y; },
      width: function(d) { return d.dx; },
      height: function(d) { return d.dy; },
      class: 'proj-treemap-rect'
    })

  projSvg.selectAll("text")
    .data(nodes)
    .enter().append("text")
    .attr({
      x: function(d) { return d.x + d.dx/4; },
      y: function(d) { return d.y + d.dy/3; },
      "text-anchor": "middle",
      "dominant-baseline": "central"
    })
    .text(function(d) { return 'Project' })
    .style('font-size', '16px');

})(window);
