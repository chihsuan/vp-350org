(function(window) {

  var eastAsiaCountries = ['China', 'Taiwan', 'Japan', 'Vietnam',
    'North Korea', 'South Korea', 'Philippines', 'Thailand', 'Malaysia',
    'Indonesia', 'Cambodia', 'Laos', 'Myanmar', 'Singapore', 'Brunei',
    'East Timor', 'Mongolia'];

  var activeCountries = ['Vietnam'];

  var width = $(window).width(),
      height = $(window).height();

  var svg = d3.select('#east-asia-map').append('svg')
    .attr('width', width)
    .attr('height', height);

  var scale = 500;
  var isMobile = width < 600;

  if (isMobile)  {
    scale = 300;
  }

	var center = [107, 25];

	var projection = d3.geo.mercator()
	  .scale(scale)
	  .center(center)
	  .translate([width / 2 + 10, height / 2 + 50]);

	var path = d3.geo.path()
	  .projection(projection);

  d3.json('./data/countries.geo.topo.json', function(error, mapData) {
  	
	    if (error) return console.error(error);
	  
	    var features = topojson.feature(mapData, mapData.objects['countries.geo']).features;
	    features = features.filter(function(d) {
	      return eastAsiaCountries.indexOf(d.properties.name) > -1;
	    });

	    svg.append('g')
	      .attr('class', 'countries')
	      .selectAll('path')
	      .data(features)
	      .enter().append('path')
	      .attr('d', path)
	      .style('display', function(d) {
	        if (eastAsiaCountries.indexOf(d.properties.name) > -1) {
	          return 'block';
	        }
	        else {
	          return 'none';
	        }
	      })
        .style('cursor', function(d) {
          if (activeCountries.indexOf(d.properties.name) > -1) {
            return 'pointer';
          }
        })
        .on('mouseover', function(d) {
          if (activeCountries.indexOf(d.properties.name) > -1) {
            d3.select(this)
              .style('fill', 'rgb(193,39,45)')
              .style('stroke', '#b52626');
          }
          
          d3.select('.map-title')
            .text(d.properties.name);
        })
        .on('mouseout', function() {
          d3.select(this).style('fill', '')
            .style('stroke', '');

          d3.select('.map-title')
              .text('East Asia');
        })
        .on('click', function() {
          window.location.href = '../';
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
        .attr('y', function() {
          if (isMobile) {
            return '200px';
          }
          return height/5*3;
        })
        .attr('x', function() {
          if (isMobile) {
            return width/2;
          }
          return width/6*5;
        })
        .attr('text-anchor', 'middle');

	    // svg.append('text')
	    //   .text('East Asia')
	    //   .attr('class', 'map-title')
	    //   .attr('y', function() {
	    //     if (isMobile) {
	    //       return '200px';
	    //     }
	    //     return height/2;
	    //   })
	    //   .attr('x', function() {
	    //     if (isMobile) {
	    //       return width/2;
	    //     }
	    //     return width/6*4;
	    //   })
	    //   .attr('text-anchor', 'middle');


    	 // var centroids = features.map(function (feature){
      //   return {
      //     name: feature.properties.name,
      //     center: path.centroid(feature),
      //   }
      // });

      // svg.selectAll('.place-label')
      //   .data(centroids)
      // .enter().append('text')
      //   .attr('class', 'place-label')
      //   .text(function(d) { return d.name; })
      //   .attr('x', function (d){ return d.center[0]; })
      //   .attr('y', function (d){ return d.center[1]; });

  });

})(window);