/* global $ d3 topojson */
(function (window) {
  var activeCountries = ['Vietnam', 'Japan', 'Taiwan', 'South Korea', 'Indonesia', 'Philippines'];
  var eastAsiaCountries = ['China', 'Taiwan', 'Japan', 'Vietnam', 'North Korea',
    'South Korea', 'Philippines', 'Thailand', 'Malaysia',
    'Indonesia', 'Cambodia', 'Laos', 'Myanmar', 'Singapore',
    'Brunei', 'East Timor', 'Mongolia'];


  var width = $(window).width();
  var height = $(window).height();
  var isMobile = width < 769;

  var svg = d3.select('#east-asia-map').append('svg')
    .attr('width', width)
    .attr('height', height);

  var mapScale = isMobile ? 240 : 450;
  var center = [107, 24];

  var projection = d3.geo.mercator()
    .scale(mapScale)
    .center(center)
    .translate([width / 2 + 10, height / 2 + 50]);

  var path = d3.geo.path()
    .projection(projection);


  var countryCenter = {
    Vietnam: projection([105.51, 21.02]),
    Japan: projection([139.4254, 35.422]),
    Taiwan: projection([121.564558, 25.105497]),
    'South Korea': projection([126.5841, 37.34]),
    Indonesia: projection([106.48, -6.1]),
    Philippines: projection([120.58, 14.35])
  };

  var selfInvestmentData = {};


  if (isMobile) {
    var opts = activeCountries.slice();
    opts.unshift('Select A Country');

    d3.select('body')
      .append('form')
      .attr('class', 'm-country-select form-group')
        .append('select')
        .attr('class', 'form-control')
        .on('change', function (d) {
          window.location.href = './' + this.value.toLowerCase();
        })
        .selectAll('option')
        .data(opts)
        .enter()
        .append('option')
        .attr('value', function (d) { return d; })
        .text(function (d) { return d; });
  }




  d3.json('./data/countries.geo.topo.json', function (error, mapData) {
    if (error) return console.error(error);

    var features = topojson.feature(mapData, mapData.objects['countries.geo'])
                          .features.filter(function (d) {
                            return eastAsiaCountries.indexOf(d.properties.name) > -1;
                          });

    svg.append('g')
      .attr('class', 'countries')
      .selectAll('path')
      .data(features)
      .enter()
      .append('path')
      .attr('d', path)
      .style('cursor', function (d) {
        if (activeCountries.indexOf(d.properties.name) > -1) return 'pointer';
      })
      .style('fill', function (d) {
        if (activeCountries.indexOf(d.properties.name) > -1)
          return 'rgba(255, 255, 255, 0.75)';
      })
      .on('mouseover', function (d) {
        var name = d.properties.name;

        if (activeCountries.indexOf(name) > -1) {
          d3.select(this)
            .style('opacity', 0.8);


          d3.selectAll('.' + name.replace(' ', '') + '-link')
            .style('display', 'block');

          if (selfInvestmentData.hasOwnProperty(name) && selfInvestmentData[name].value) {
            d3.select('#map-sub-title')
              .text('Domestic：' + '$ ' + selfInvestmentData[name].value + 
                ' / Plant No. ' + selfInvestmentData[name].no);
          }
        }

        d3.select('.map-title')
          .text(name);
      })
      .on('mouseout', function (d) {
        d3.select(this)
          .style('opacity', 1);

        d3.select('.map-title')
          .text('East Asia');

        d3.selectAll('.' + d.properties.name.replace(' ', '') + '-link')
          .style('display', 'none');

        d3.select('#map-sub-title')
          .text('')
      })
      .on('click', function (d) {
        if (activeCountries.indexOf(d.properties.name) > -1) { window.location.href = './' + d.properties.name.toLowerCase(); }
      });

    svg.append('path')
      .attr('class', 'country-borders')
      .attr('d', path(topojson.mesh(mapData,
        mapData.objects['countries.geo'],
        function (a, b) {
          return eastAsiaCountries.indexOf(a.properties.name) > -1 && a !== b;
        })
      ));

    svg.append('text')
      .text('East Asia')
      .attr('class', 'map-title')
      .attr('text-anchor', 'middle')
      .attr('y', function () {
        return isMobile ? '50' : height / 2 + 50;
      })
      .attr('x', function () {
        return isMobile ? width / 2 : width / 6 * 5;
      });

    if (!isMobile) {
      svg.append('text')
        .text('')
        .attr('id', 'map-sub-title')
        .attr('text-anchor', 'middle')
        .attr('y', function () {
          return height / 2 + 75;
        })
        .attr('x', function () {
          return width / 6 * 5;
        });
    }

    d3.csv('./data/flow.csv', function(d) {
      d.value = +d.value;
      return d;
    }, function (linkData) {
        addFlows(linkData, features);
      });

    d3.csv('./data/[ VP ] Sum up Coal Plant No. - mainpage-JP.csv', function(d) {
      d.value = +d.value;
      return d;
    }, function (linkData) {
        addJPFlows(linkData, features);
    });

  });

  function addFlows(flowData, features) {
    var legendX = 20;
    var legendY = height - 40;
    var linkNameFun = function (d) { 
      return d.destination.replace(' ', '') + '-link'; 
    };
    var maxValue = d3.max(flowData, function (d) { return d.value; });
    var linkScale = d3.scale.linear()
              .domain([0, maxValue])
              .range([5, 15]);


    var maxColor = '#b52626';
    var minColor = 'rgb(193,39,45)';
    // var countryCenter = {};
    features.forEach(function (feature) {
      if (activeCountries.indexOf(feature.properties.name) === -1) {
        countryCenter[feature.properties.name] = path.centroid(feature);
      }
    });

    var linkData = flowData.filter(function (d) {
      if (d.source == d.destination) {
        selfInvestmentData[d.source] = {
          value: d.value,
          no: d['No.']
        };
      }

      return eastAsiaCountries.indexOf(d.source) > -1 && d.source !== d.destination;
    });

    var defs = svg
      .selectAll('.defs')
      .data(linkData)
      .enter()
      .append('svg:defs');

    var markerNameFun = function (d) { 
      return 'marker' + d.source.replace(' ', '') + d.destination.replace(' ', ''); 
    };

    // Arrow marker
    defs.append('marker')
      .attr('id', markerNameFun)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 5)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('markerWidth', function (d) { return linkScale(d.value) * 3.5; })
      .attr('markerHeight', function (d) { return linkScale(d.value) * 2.5; })
    .append('path')
          .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', 'rgba(196, 0, 0, 0.75)');
      // .attr('stroke', 'rgba(156, 0, 0, 0.9)');

    var gradientNameFun = function (d) { return 'grd' + d.source.replace(' ', '') + d.destination.replace(' ', ''); };
    var gradientRefNameFun = function (d) { return 'url(#' + gradientNameFun(d) + ')'; };

    var arcColor = d3.scale.log().domain([1, maxValue]).range([minColor, maxColor]);
    var strokeFun = function (d) { return arcColor(d.value); };

    var gradient = defs.selectAll('linearGradient')
      .data(linkData)
    .enter()
      .append('svg:linearGradient')
        .attr('id', gradientNameFun)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', function (d) { return countryCenter[d.source][0]; })
        .attr('y1', function (d) { return countryCenter[d.source][1]; })
        .attr('x2', function (d) { return countryCenter[d.destination][0]; })
        .attr('y2', function (d) { return countryCenter[d.destination][0]; });

    gradient.append('svg:stop')
        .attr('offset', '0%')
        .attr('stop-color', minColor)
        .attr('stop-opacity', 0.2);
    gradient.append('svg:stop')
        .attr('offset', '80%')
        .attr('stop-color', strokeFun)
        .attr('stop-opacity', 1.0);
    gradient.append('svg:stop')
        .attr('offset', '100%')
        .attr('stop-color', strokeFun)
        .attr('stop-opacity', 1.0);

    var arcs = svg.append('g').attr('id', 'arcs');
    var linkGroup = arcs.selectAll('g')
        .data(linkData)
        .enter().append('g');

    var arcNodes = linkGroup.append('path')
      .attr('stroke', gradientRefNameFun)
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', function (d) { return linkScale(d.value); })
      .attr('class', linkNameFun)
      .attr('d', function (d) {
        return path({
          type: 'LineString',
          coordinates: [projection.invert(countryCenter[d.source]),
            projection.invert(countryCenter[d.destination])]
        });
      })
      //.attr('marker-end', function (d) { return 'url(#' + markerNameFun(d) + ')'; })
      .style('display', 'none');

    linkGroup.append('circle')
      .attr('cx', function (d) { return countryCenter[d.source][0]; })
      .attr('cy', function (d) { return countryCenter[d.source][1] - 5; })
      .attr('class', linkNameFun)
      .attr('r', function (d) {
        if (d.value > 1000) {
          return 45;
        }
        return 30;
      })
      .style('display', 'none')
      .attr('text-anchor', 'middle');

    linkGroup.append("svg:image")
        .attr("xlink:href",  function(d) { 
          return './img/plant.svg';}
        )
        .attr('x', function (d) { return countryCenter[d.source][0] - 21; })
        .attr('y', function (d) { return countryCenter[d.source][1] - 24; })
        .attr('class', linkNameFun)
        .attr("height", 15)
        .attr("width", 18)
        .style('display', 'none');

    linkGroup.append('text')
      .attr('x', function (d) { return countryCenter[d.source][0]; })
      .attr('y', function (d) { return countryCenter[d.source][1] - 10; })
      .attr('class', linkNameFun)
      .text(function (d) {
        if (d['No.']) {
          return '' + d['No.'];
        }
      })
      .style('display', 'none');
    
    linkGroup.append('text')
      .attr('x', function (d) { return countryCenter[d.source][0]; })
      .attr('y', function (d) { return countryCenter[d.source][1] + 10; })
      .attr('class', linkNameFun)
      .text(function (d) {
        if (d.value) {
          return '＄' + d.value.toFixed(0);
        }
      })
      .style('display', 'none')
      .attr('text-anchor', 'middle');

    if (!isMobile) {
      svg.append('text')
        .attr('x', 20)
        .attr('y', height / 5 * 2.2)
        .attr('class', 'w-title')
        .text('JOIN DIVESTMENT MOVEMENT!');

      svg.append('text')
        .attr('x', 20)
        .attr('y', height / 5 * 2.2 + 26)
        .attr('class', 'w-sub-title')
        .text('STOP EAST ASIA FOSSIL FUEL FINANCIAL FLOW!');
    }

    svg.append('line')
      .attr('x1', legendX + 6)
      .attr('y1', legendY - 43)
      .attr('x2', legendX + 20)
      .attr('y2', legendY - 43)
      .attr('stroke', 'rgb(255,169,2)')
      .attr('stroke-width', 15);

    svg.append('text')
      .attr('x', legendX + 25)
      .attr('y', legendY - 38)
      .attr('class', 'legend')
      .text('Investment flows to other countries');

    svg.append('line')
      .attr('x1', legendX + 6)
      .attr('y1', legendY - 24)
      .attr('x2', legendX + 20)
      .attr('y2', legendY - 24)
      .attr('stroke', '#b52626')
      .attr('stroke-width', 15);

    svg.append('text')
      .attr('x', legendX + 25)
      .attr('y', legendY - 18)
      .attr('class', 'legend')
      .text('Projects being financed from other countries');

    svg.append('text')
      .attr('x', legendX + 5)
      .attr('y', legendY + 5)
      .attr('class', 'legend')
      .text('$ = Million USD');

    svg.append("svg:image")
        .attr("xlink:href",  function(d) { 
          return './img/plant.svg';}
      )
      .attr('x', legendX + 5)
      .attr('y', legendY + 13)
      .attr('width', 20)

     svg.append('text')
      .attr('x', legendX + 40)
      .attr('y', legendY + 27)
      .attr('class', 'legend')
      .text('= Coal Plant No.');
  }


  function addJPFlows(flowData, features) {
    var legendX = 10;
    var legendY = height - 40;
    var linkNameFun = function (d) { 
      return d.source.replace(' ', '') + '-link'; 
    };
    var maxValue = d3.max(flowData, function (d) { return d.value; });
    var linkScale = d3.scale.linear()
              .domain([0, maxValue])
              .range([5, 15]);


    var maxColor = 'rgb(255,169,2)';
    var minColor = 'rgb(255,169,2)';
    // var countryCenter = {};
    features.forEach(function (feature) {
      if (activeCountries.indexOf(feature.properties.name) === -1) {
        countryCenter[feature.properties.name] = path.centroid(feature);
      }
    });

    var linkData = flowData.filter(function (d) {
      if (d.source == d.destination) {
        selfInvestmentData[d.source] = {
          value: d.value,
          no: d['No.']
        };
      }
      return eastAsiaCountries.indexOf(d.source) > -1 && d.source !== d.destination;
    });

    var defs = svg
      .selectAll('.defs')
      .data(linkData)
      .enter()
      .append('svg:defs');

    var markerNameFun = function (d) { 
      return 'marker' + d.source.replace(' ', '') + d.destination.replace(' ', ''); 
    };

    // // Arrow marker
    // defs.append('marker')
    //   .attr('id', markerNameFun)
    //   .attr('viewBox', '0 -5 10 10')
    //   .attr('refX', 5)
    //   .attr('refY', 0)
    //   .attr('orient', 'auto')
    //   .attr('markerUnits', 'userSpaceOnUse')
    //   .attr('markerWidth', function (d) { return linkScale(d.value) * 3.5; })
    //   .attr('markerHeight', function (d) { return linkScale(d.value) * 2.5; })
    // .append('path')
    //       .attr('d', 'M0,-5L10,0L0,5')
    //   .attr('fill', 'rgba(255,169,2, 0.75)');
    //   .attr('stroke', 'rgba(156, 0, 0, 0.9)');

    var gradientNameFun = function (d) { return 'grd' + d.destination.replace(' ', '') + d.source.replace(' ', ''); };
    var gradientRefNameFun = function (d) { return 'url(#' + gradientNameFun(d) + ')'; };

    var arcColor = d3.scale.log().domain([1, maxValue]).range([minColor, maxColor]);
    var strokeFun = function (d) { return arcColor(d.value); };

    var gradient = defs.selectAll('linearGradient')
      .data(linkData)
    .enter()
      .append('svg:linearGradient')
        .attr('id', gradientNameFun)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', function (d) { return countryCenter[d.source][0]; })
        .attr('y1', function (d) { return countryCenter[d.source][1]; })
        .attr('x2', function (d) { return countryCenter[d.destination][0]; })
        .attr('y2', function (d) { return countryCenter[d.destination][0]; });

    gradient.append('svg:stop')
        .attr('offset', '0%')
        .attr('stop-color', minColor)
        .attr('stop-opacity', 0.2);
    gradient.append('svg:stop')
        .attr('offset', '80%')
        .attr('stop-color', strokeFun)
        .attr('stop-opacity', 1.0);
    gradient.append('svg:stop')
        .attr('offset', '100%')
        .attr('stop-color', strokeFun)
        .attr('stop-opacity', 1.0);

    var arcs = svg.append('g').attr('id', 'arcs');
    var linkGroup = arcs.selectAll('g')
        .data(linkData)
        .enter().append('g');

    var arcNodes = linkGroup.append('path')
      .attr('stroke', gradientRefNameFun)
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', function (d) { return linkScale(d.value); })
      .attr('class', linkNameFun)
      .attr('d', function (d) {
        return path({
          type: 'LineString',
          coordinates: [projection.invert(countryCenter[d.source]),
            projection.invert(countryCenter[d.destination])]
        });
      })
      //.attr('marker-end', function (d) { return 'url(#' + markerNameFun(d) + ')'; })
      .style('display', 'none');

    linkGroup.append('circle')
      .attr('cx', function (d) { return countryCenter[d.destination][0]; })
      .attr('cy', function (d) { return countryCenter[d.destination][1] - 5; })
      .attr('class', linkNameFun)
      .attr('r', function (d) {
        if (d.value > 1000) {
          return 45;
        }
        return 30;
      })
      .style('display', 'none')
      .attr('text-anchor', 'middle')
      .style('fill', 'rgba(255,169,2, 0.75)')
      .style('stroke', 'rgb(255,169,2)');

    linkGroup.append("svg:image")
        .attr("xlink:href",  function(d) { 
          return './img/plant.svg';}
        )
        .attr('x', function (d) { return countryCenter[d.destination][0] - 21; })
        .attr('y', function (d) { return countryCenter[d.destination][1] - 24; })
        .attr('class', linkNameFun)
        .attr("height", 15)
        .attr("width", 18)
        .style('display', 'none');

    linkGroup.append('text')
      .attr('x', function (d) { return countryCenter[d.destination][0]; })
      .attr('y', function (d) { return countryCenter[d.destination][1] - 10; })
      .attr('class', linkNameFun)
      .text(function (d) {
        if (d['No.']) {
          return '' + d['No.'];
        }
      })
      .style('display', 'none');
    
    linkGroup.append('text')
      .attr('x', function (d) { return countryCenter[d.destination][0]; })
      .attr('y', function (d) { return countryCenter[d.destination][1] + 10; })
      .attr('class', linkNameFun)
      .text(function (d) {
        if (d.value) {
          return '＄' + d.value.toFixed(0);
        }
      })
      .style('display', 'none')
      .attr('text-anchor', 'middle');
  }
}(window));
