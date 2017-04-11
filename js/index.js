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

  d3.select('body').append('div').attr("id", "tooltip");

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

  d3.csv('./data/Database- VN - Project 2.csv', function(data) {

    var bankObj = {};
    var bankArray = [];

    data.forEach(function(d) {
      if (!d["Investing Amount/ Share (mio USD)"] || !d["Financier's name"])
        return;

      if(!bankObj.hasOwnProperty(d["Financier's name"]))
        bankObj[d["Financier's name"]] = 0;

      bankObj[d["Financier's name"]] += parseFloat(d["Investing Amount/ Share (mio USD)"]);
    });

    for(var key in bankObj) {
      bankArray.push({
        name: key,
        value: bankObj[key]
      });
    }

    var bankTreemap = d3.layout.treemap()
      .size([width, 500]);

    var nodes = bankTreemap.nodes({children: bankArray});
    nodes = nodes.slice(1, nodes.length);

    var bankSvg = d3.select('#bank-treemap')
      .append('svg')
      .attr("width", width)
      .attr("height", 500);

    var g = bankSvg.selectAll('g')
      .data(nodes)
      .enter().append("g")
      .on("mousemove", mousemove)
      .on("mouseout", mouseout);

    g.append('rect')
     .attr({
        x: function(d) { return d.x; },
        y: function(d) { return d.y; },
        width: function(d) { return d.dx; },
        height: function(d) { return d.dy; },
        class: 'bank-treemap-rect'
      })

    
    g.append("text")
      .attr({
        x: function(d) { return d.x + d.dx/2; },
        y: function(d) { return d.y + d.dy/2; },
        "text-anchor": "middle",
        "dominant-baseline": "central"
      })
      .text(function(d) { return d.name; })
      .each(fontSize);

    var projObj = {};
    var projArray = [];

    data.forEach(function(d) {
      if (!d["Investing Amount/ Share (mio USD)"] || !d["Financier's name"])
        return;

      if(!projObj.hasOwnProperty(d["Project Name"]))
        projObj[d["Project Name"]] = 0;

      projObj[d["Project Name"]] += parseFloat(d["Investing Amount/ Share (mio USD)"]);
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
      .attr("width", width)
      .attr("height", 400);

    var projG = projSvg.selectAll("g")
      .data(nodes)
      .enter().append("g")
      .on("mousemove", mousemove)
      .on("mouseout", mouseout);

    projG.append('rect')
      .attr({
        x: function(d) { return d.x; },
        y: function(d) { return d.y; },
        width: function(d) { return d.dx; },
        height: function(d) { return d.dy; },
        class: 'proj-treemap-rect'
      })

    projG.append("text")
      .attr({
        x: function(d) { return d.x + d.dx/2; },
        y: function(d) { return d.y + d.dy/2; },
        "text-anchor": "middle",
        "dominant-baseline": "central"
      })
      .text(function(d) { return d.name; })
      .each(fontSize);

    function fontSize(d,i) {
      var size = 16;
      var word = d.name
      var width = d.dx;
      var height = d.dy;

      d3.select(this).style("font-size", size + "px");

      while(((this.getBBox().width >= width) || (this.getBBox().height >= height)) && (size > 10)) {
        size --;
        d3.select(this).style("font-size", size + "px");
        this.firstChild.data = word;
      }
      var rectSize = this.parentNode.childNodes[0].getBBox().width - 0.5;
      if (rectSize < this.getBBox().width)
        d3.select(this).style("display", 'none');
    }

    function mousemove(d) {
      var xPosition = d3.event.pageX + 5;
      var yPosition = d3.event.pageY + 5;

      d3.select("#tooltip")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")
        .html(function() {
          return '<strong>' + d.name + '</strong>' +  
                 '<p>' + d.value.toFixed(2) + '</p>';
        });

      d3.select("#tooltip").classed("hidden", false);
    };

    function mouseout() {
      d3.select("#tooltip").classed("hidden", true);
    };


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




})(window);

(function() {

	d3.csv("flow.csv", function(error, links) {

var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
    link.source = nodes[link.source] || 
        (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] || 
        (nodes[link.target] = {name: link.target});
    link.value = +link.value;
});

var width = 960,
    height = 500;

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(300)
    .charge(-300)
    .on("tick", tick)
    .start();

var svg = d3.select("#fiance-flow").append("svg")
    .attr("width", width)
    .attr("height", height);

// build the arrow.
svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 19)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

// add the links and the arrows
var path = svg.append("svg:g").selectAll("path")
    .data(force.links())
  .enter().append("svg:path")
//    .attr("class", function(d) { return "link " + d.type; })
    .attr("class", "link")
    .attr("marker-end", "url(#end)");

// define the nodes
var node = svg.selectAll(".node")
    .data(force.nodes())
  .enter().append("g")
    .attr("class", "node")
    .call(force.drag);

// add the nodes
node.append("circle")
    .attr("r", 30);

// add the text 
node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });

// add the curvy lines
function tick() {
    path.attr("d", function(d) {
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + 
            d.source.x + "," + 
            d.source.y + "A" + 
            dr + "," + dr + " 0 0,1 " + 
            d.target.x + "," + 
            d.target.y;
    });

    node
        .attr("transform", function(d) { 
  	    return "translate(" + d.x + "," + d.y + ")"; });
}

});

})();