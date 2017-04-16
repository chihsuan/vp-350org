(function(window) {

  var eastAsiaCountries = ['China', 'Taiwan', 'Japan', 'Vietnam',
    'North Korea', 'South Korea', 'Philippines', 'Thailand', 'Malaysia',
    'Indonesia', 'Cambodia', 'Laos', 'Myanmar', 'Singapore', 'Brunei',
    'East Timor', 'Mongolia'];

  var width = $(window).width(),
      height = $(window).height();

  var svg = d3.select('#east-asia-map').append('svg')
    .attr('width', width)
    .attr('height', height);

  d3.select('body').append('div')
                 .attr('id', 'tooltip')
                 .classed('hidden', true);

  window.init = init;

  function init(country, center, scale, mobileScale, pointFile, dbFile) {

    var isMobile = width < 600;

    if (isMobile)  {
      scale = mobileScale;
    }

    var projection = d3.geo.mercator()
      .scale(scale)
      .center(center)
      .translate([width / 2 + 10, height / 2 + 50]);

    var path = d3.geo.path()
      .projection(projection);


    d3.json('./data/countries.geo.topo.json', function(error, mapData) {
      d3.csv(pointFile, function(pointData) {
        if (error) return console.error(error);

        var features = topojson.feature(mapData, mapData.objects['countries.geo']).features;
        features = features.filter(function(d) {
          return d.properties.name === country;
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
          });

        svg.append('path')
          .attr('class', 'country-borders')
          .attr('d', path(topojson.mesh(mapData,
            mapData.objects['countries.geo'],
            function(a, b) {
              return a.properties.name === country && a !== b;
            })
          ));



        pointData = pointData.filter(function(d) {
          if (country === 'Vietnam')
            return d.country === country && d.latitude && d.longitude;
          return d.latitude && d.longitude;
        })
        .map(function(d) {
          d.longitude = parseFloat(d.longitude);
          d.latitude = parseFloat(d.latitude);
          d.capacity_mw = parseFloat(d.capacity_mw);
          return d;
        });

        svg.append('text')
          .text(country)
          .attr('class', 'map-title')
          .attr('y', function() {
            if (isMobile) {
              return '120px';
            }
            return height/2;
          })
          .attr('x', function() {
            if (isMobile) {
              return width/2;
            }
            return width - 100;
          })
          .attr('text-anchor', function() {
            return isMobile ? 'middle': 'end';
          });

        svg.append('text')
          .text(function() { return pointData.length + ' Coal Plants'; })
          .attr('class', 'map-subtitle')
          .attr('y', function() {
            if (isMobile) {
              return 120 + 30;
            }
            return height/2 + 35;
          })
          .attr('x', function() {
            if (isMobile) {
              return width/2;
            }
            return width - 100;
          })
          .attr('text-anchor', function() {
            return isMobile ? 'middle': 'end';
          });
   
        var maxCircleSize = isMobile ? 10 : 25;

        var circleScale = d3.scale.linear()
                  .domain([0, d3.max(pointData, function(d) { return d.capacity_mw; })])
                  .range([5, maxCircleSize]);

        svg.selectAll("circle")
          .data(pointData).enter()
          .append("circle")
          .attr("cx", function (d) { return projection([d.longitude, d.latitude])[0]; })
          .attr("cy", function (d) { return projection([d.longitude, d.latitude])[1]; })
          .attr("r", function(d) {
            return circleScale(d.capacity_mw);
          })
          .on('mousemove', function(d) {
            console.log(d);
            if (country === 'Vietnam') {
              mousemove(d, '<p><strong>Plant: </strong>' + d.plant + '</p>' +
                           '<p><strong>Capacity (MW): </strong>' + d.capacity_mw + '</p>' +
                           '<p><strong>Coal Type: </strong>' + d.coal_type + '</p>' +
                           '<p><strong>Unit: </strong>' + d.unit + '</p>' +
                           '<p><strong>Year: </strong>' + d.year + '</p>' +
                           '<p><strong>Status: </strong>' + d.status + '</p>');
            }
            else {
              mousemove(d, '<p><strong>Project Name: </strong>' + d['Project Name'] + '</p>' +
                           '<p><strong>Capacity (MW): </strong>' + d.capacity_mw + '</p>' +
                           '<p><strong>Coal Type: </strong>' + d.Types + '</p>' +
                           '<p><strong>Unit: </strong>' + d.Unit + '</p>' +
                           '<p><strong>Year: </strong>' + d['Established date (yr)'] + '</p>' +
                           '<p><strong>Status: </strong>' + d.Status + '</p>');
            }
          })
          .on('mouseout', mouseout);

        var legendX = 20;
        var legendY = height - 40;

        svg.append('circle')
          .attr("cx", legendX)
          .attr("cy", legendY)
          .attr("r", '8px')
          .attr("fill", "red");

        svg.append('text')
          .attr("x", legendX + 15)
          .attr("y", legendY + 5)
          .attr("r", "8px")
          .attr("fill", "red")
          .attr('class', 'legend')
          .text('Fossil Project Capacity');

        
        svg.append('text')
          .attr("x", legendX + 15)
          .attr("y", function() { return isMobile ? legendY + 25 : legendY + 30; })
          .attr("r", "8px")
          .attr("fill", "red")
          .attr('class', 'legend')
          .text('Data Last Updated：2017');

         svg.append('circle')
          .attr("cx", legendX)
          .attr("cy", function() { return isMobile ? legendY + 20 : legendY + 25; })
          .attr("r", '5px')
          .style("fill", "#fff")
          .style('stroke', 'none');

      });
    });

    d3.csv(dbFile, function(data) {
    
      var bankObj = {};
      var bankArray = [];

      data.forEach(function(d) {
        if (!d['Investing Amount/ Share (mio USD)'] || !d["Financier's name"])
          return;

        if(!bankObj.hasOwnProperty(d["Financier's name"]))
          bankObj[d["Financier's name"]] = 0;

        bankObj[d["Financier's name"]] += parseFloat(d['Investing Amount/ Share (mio USD)']);
      });

      for(var key in bankObj) {
        bankArray.push({
          name: key,
          value: bankObj[key]
        });
      }
     
      var bankTotal = {
        value: 0
      };

      if (bankArray.length > 0)
      bankTotal = bankArray.reduce(function(a, b) {
        return { value: a.value + b.value }; 
      });

      document.getElementById('bank-invest-total').innerText = bankTotal.value + ' (mio USD)';    
      document.getElementById('proj-total').innerText = '520000 (KgCO2)';

      var bankTreemap = d3.layout.treemap()
        .size([width, 500]);

      var nodes = bankTreemap.nodes({children: bankArray});
      nodes = nodes.slice(1, nodes.length);

      var bankSvg = d3.select('#bank-treemap')
        .append('svg')
        .attr('width', width)
        .attr('height', 500);

      var g = bankSvg.selectAll('g')
        .data(nodes)
        .enter().append('g')
        .on('mousemove', function(d) {
          mousemove(d, '<strong>Bank Name:' + d.name + '</strong>' +  
                       '<p>Investing Amount(mio USD): ' + d.value.toFixed(2) + '</p>');
        })
        .on('mouseout', mouseout);

      g.append('rect')
       .attr({
          x: function(d) { return d.x; },
          y: function(d) { return d.y; },
          width: function(d) { return d.dx; },
          height: function(d) { return d.dy; },
          class: 'bank-treemap-rect'
        })

      
      g.append('text')
        .attr({
          x: function(d) { return d.x + d.dx/2; },
          y: function(d) { return d.y + d.dy/2; },
          'text-anchor': 'middle',
          'dominant-baseline': 'central'
        })
        .text(function(d) { return d.name; })
        .each(fontSize);

      var projObj = {};
      var projArray = [];

      data.forEach(function(d) {
        if (!d['Investing Amount/ Share (mio USD)'] || !d["Financier's name"])
          return;

        if(!projObj.hasOwnProperty(d['Project Name']))
          projObj[d['Project Name']] = 0;

        projObj[d['Project Name']] += parseFloat(d['Investing Amount/ Share (mio USD)']);
      });

      for(var key in projObj) {
        projArray.push({
          name: key,
          value: projObj[key]
        });
      }

      var projTreemap = d3.layout.treemap().size([width,400]);
      var nodes = projTreemap.nodes({children: projArray});
      nodes = nodes.slice(1, nodes.length);

      var projSvg = d3.select('#proj-treemap')
        .append('svg')
        .attr('width', width)
        .attr('height', 400);

      var projG = projSvg.selectAll('g')
        .data(nodes)
        .enter().append('g')
        .on('mousemove', function(d) {
          mousemove(d, '<strong>Project Name:' + d.name + '</strong>' +  
                       '<p>CO2 Carbon Emission: ' + d.value.toFixed(2) + '</p>');
        })
        .on('mouseout', mouseout);

      projG.append('rect')
        .attr({
          x: function(d) { return d.x; },
          y: function(d) { return d.y; },
          width: function(d) { return d.dx; },
          height: function(d) { return d.dy; },
          class: 'proj-treemap-rect'
        })

      projG.append('text')
        .attr({
          x: function(d) { return d.x + d.dx/2; },
          y: function(d) { return d.y + d.dy/2; },
          'text-anchor': 'middle',
          'dominant-baseline': 'central'
        })
        .text(function(d) { return d.name; })
        .each(fontSize);

      function fontSize(d,i) {
        var size = 16;
        var word = d.name
        var width = d.dx;
        var height = d.dy;

        d3.select(this).style('font-size', size + 'px');

        while(((this.getBBox().width >= width) || (this.getBBox().height >= height)) && (size > 10)) {
          size --;
          d3.select(this).style('font-size', size + 'px');
          this.firstChild.data = word;
        }
        var rectSize = this.parentNode.childNodes[0].getBBox().width - 0.5;
        if (rectSize < this.getBBox().width)
          d3.select(this).style('display', 'none');
      }

      var app = new Vue({
        el: '#bank-table',
        data: {
          bankArray: bankArray
        }
      });


      var app2 = new Vue({
        el: '#proj-table',
        data: {
          projArray: projArray
        }
      });

    });
  }

   function mousemove(d, content) {
      var xPosition = d3.event.pageX + 5;
      var yPosition = d3.event.pageY + 5;

      d3.select('#tooltip')
        .style('left', xPosition + 'px')
        .style('top', yPosition + 'px')
        .html(function() {
          return content;
        });

      d3.select('#tooltip').classed('hidden', false);
    };

    function mouseout() {
      d3.select('#tooltip').classed('hidden', true);
    };

})(window);