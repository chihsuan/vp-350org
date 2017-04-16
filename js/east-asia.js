(function(window) {

  var activeCountries = ['Vietnam', 'Japan', 'Taiwan', 'South Korea', 'Indonesia', 'Philippines'];
  var eastAsiaCountries = ['China', 'Taiwan', 'Japan', 'Vietnam','North Korea', 
                           'South Korea', 'Philippines', 'Thailand', 'Malaysia',
                           'Indonesia', 'Cambodia', 'Laos', 'Myanmar', 'Singapore',
                           'Brunei', 'East Timor', 'Mongolia'];
  
  var width = $(window).width(),
    height = $(window).height(),
    isMobile = width < 600;

  var svg = d3.select('#east-asia-map').append('svg')
    .attr('width', width)
    .attr('height', height);

  var mapScale = isMobile ? 200 : 500;
  var center = [107, 25];

  var projection = d3.geo.mercator()
    .scale(mapScale)
    .center(center)
    .translate([width / 2 + 10, height / 2 + 50]);

  var path = d3.geo.path()
    .projection(projection);

  var linkData = [
    {
      source: 'China',
      target: 'Vietnam',
      value: 300
    },
    {
      source: 'Japan',
      target: 'Vietnam',
      value: 200
    },
    {
      source: 'South Korea',
      target: 'Vietnam',
      value: 100
    }
  ];


  d3.json('./data/countries.geo.topo.json', function(error, mapData) {
    if (error) return console.error(error);
  
    var features = topojson.feature(mapData, mapData.objects['countries.geo'])
                           .features.filter(function(d) {
                            return eastAsiaCountries.indexOf(d.properties.name) > -1;
                           });

    svg.append('g')
      .attr('class', 'countries')
      .selectAll('path')
      .data(features)
      .enter().append('path')
      .attr('d', path)
      .style('cursor', function(d) {
        if (activeCountries.indexOf(d.properties.name) > -1) return 'pointer';
      })
      .on('mouseover', function(d) {
        if (activeCountries.indexOf(d.properties.name) > -1) {
          d3.select(this)
            .style('fill', '#c70e0e')
            .style('stroke', '#b52626');

          d3.selectAll('.' + d.properties.name + '-link')
            .style('opacity', 1);
        }
        
        d3.select('.map-title')
          .text(d.properties.name);
      })
      .on('mouseout', function(d) {
        d3.select(this).style('fill', '')
          .style('stroke', '');

        d3.select('.map-title')
            .text('East Asia');

        d3.selectAll('.' + d.properties.name + '-link')
            .style('opacity', 0);
      })
      .on('click', function(d) {
        if (activeCountries.indexOf(d.properties.name) > -1)
          window.location.href = './' + d.properties.name.toLowerCase();
      });

    svg.append('path')
      .attr('class', 'country-borders')
      .attr('d', path(topojson.mesh(mapData,
        mapData.objects['countries.geo'],
        function(a, b) {
          return eastAsiaCountries.indexOf(a.properties.name) > -1 && a !== b;
        })
      ));

    svg.append('text')
      .text('East Asia')
      .attr('class', 'map-title')
      .attr('text-anchor', 'middle')
      .attr('y', function() {
        return isMobile ? '115' : height/2+50;
      })
      .attr('x', function() {
        return isMobile ? width/2: width/6*5;
      });

    addFlows(features);
  });

  function addFlows(features) {
    var legendX = 10;
    var legendY = height - 40;
    var maxValue = d3.max(linkData, function(d) { return d.value; });
    var linkScale = d3.scale.linear()
              .domain([0, maxValue])
              .range([0.5, 5]);


    var defs = svg.append("svg:defs");
    var maxColor = '#b52626';
    var minColor = 'rgb(193,39,45)';
    var countryCenter = {};
    features.forEach(function(feature) {
      countryCenter[feature.properties.name] = path.centroid(feature);
    });

    // Arrow marker
    defs.append("marker")
      .attr("id", "arrowHead")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 10)
      .attr("refY", 5)
      .attr("orient", "auto")
      .attr("markerUnits", "userSpaceOnUse")
      .attr("markerWidth", 4*4)
      .attr("markerHeight", 3*4)
    .append("polyline")
      .attr("points", "0,0 10,5 0,10 1,5")
      .attr("fill", 'red')
      .attr('stroke', '#c50303');

    var gradientNameFun = function(d) { return "grd"+d.source.replace(' ', '')+d.target.replace(' ', ''); };
    var gradientRefNameFun = function(d) { return "url(#"+gradientNameFun(d)+")"; };

    var arcColor = d3.scale.log().domain([1, maxValue]).range([minColor, maxColor]);
    var strokeFun = function(d) { return arcColor(d.value); };

    var gradient = defs.selectAll("linearGradient")
      .data(linkData)
    .enter()
      .append("svg:linearGradient")
        .attr("id", gradientNameFun)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", function(d) { return countryCenter[d.source][0]; })
        .attr("y1", function(d) { return countryCenter[d.source][1]; })
        .attr("x2", function(d) { return countryCenter[d.target][0]; })
        .attr("y2", function(d) { return countryCenter[d.target][0]; });

    gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", minColor)
        .attr("stop-opacity", .2);
    gradient.append("svg:stop")
        .attr("offset", "70%")
        .attr("stop-color", strokeFun)
        .attr("stop-opacity", 1.0);
    gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", strokeFun)
        .attr("stop-opacity", 1.0);

    var arcs = svg.append("g").attr("id", "arcs");
    var linkGroup = arcs.selectAll('g')
        .data(linkData)
        .enter().append('g')

    var arcNodes = linkGroup.append("path")
      .attr("stroke", gradientRefNameFun)
      .attr("stroke-linecap", "round")
      .attr("stroke-width", function(d) { return linkScale(d.value); })
      .attr('class', function(d) { return d.target + '-link'; })
      .attr("d", function(d) { 
          return path({
            type: "LineString",
            coordinates: [projection.invert(countryCenter[d.source]),
            projection.invert(countryCenter[d.target])]
          });
      })
      .attr("marker-end", "url(#arrowHead)")
      .style('opacity', 0);

    linkGroup.append('text')
      .attr('x', function(d) { return countryCenter[d.source][0]})
      .attr('y', function(d) { return countryCenter[d.source][1] - 5})
      .attr('class', function(d) { return d.target + '-link'; })
      .text(function(d) {
        console.log(d)
        return d.value + '';
      })
      .style('opacity', 0)
      .attr('text-anchor', 'middle');


    svg.append('line')
      .attr("x1", legendX)
      .attr("y1", legendY)
      .attr("x2", legendX + 10)
      .attr("y2", legendY)
      .attr("stroke", "#b52626")
      .attr('stroke-width', 6);

    svg.append('circle')
      .attr("cx", legendX + 4)
      .attr("cy", function() { return isMobile ? legendY + 20 : legendY + 25; })
      .attr("r", '5px')
      .style("fill", "#fff")
      .style('stroke', 'none');

    svg.append('text')
      .attr("x", legendX + 15)
      .attr("y", legendY + 5)
      .attr('class', 'legend')
      .text('Fossil Investment Flow (Million USD)');

     svg.append('text')
          .attr("x", legendX + 15)
          .attr("y", function() { return isMobile ? legendY + 25 : legendY + 30; })
          .attr("r", "8px")
          .attr("fill", "red")
          .attr('class', 'legend')
          .text('Data Last Updated：2017');
  }
  
})(window);