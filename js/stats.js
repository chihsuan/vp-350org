/* global d3 $ topojson */
(function (window) {
  var eastAsiaCountries = ['China', 'Taiwan', 'Japan', 'Vietnam',
    'North Korea', 'South Korea', 'Philippines', 'Thailand', 'Malaysia',
    'Indonesia', 'Cambodia', 'Laos', 'Myanmar', 'Singapore', 'Brunei',
    'East Timor', 'Mongolia'];

  var width = $(window).width();
  var height = $(window).height();
  var isMobile = width < 600;
  var svg = d3.select('#country-map').append('svg')
    .attr('width', width)
    .attr('height', height);

  d3.select('body').append('div')
                 .attr('id', 'tooltip')
                 .classed('hidden', true);

  window.init = init;
  function init(country, center, scale, mobileScale, plantFile, dbFile) {

    var projection = d3.geo.mercator()
      .scale(function() {
        return isMobile ? mobileScale : scale;
      })
      .center(center)
      .translate([width / 2 + 10, height / 2 + 50]);

    var path = d3.geo.path()
      .projection(projection);

    document.getElementById('bank-vis-title').innerText = 'Financiers for ' + country + ' Coal Plant';
    document.getElementById('project-vis-title').innerText = 'Coal Plants in ' + country;
    document.getElementById('bank-proj-vis-title').innerText = 'List of Financing Country and Project';

    d3.csv(plantFile, function (plantRawData) {
      var plantData = plantRawData.filter(function (d) {
        return (d['Project Name'] || d.plant) //&& d.Latitude && d.Longitude && ;
      }).map(function (d) {
        d.value = parseFloat(d['Capacity (MW)']);
        d.name = d['Project Name'] ? d['Project Name'] : d.plant;
        d.name = d.name.replace('station', '');
        return d;
      });

      var plantMergeObj = {};
      plantData.forEach(function (d) {
        if (plantMergeObj.hasOwnProperty(d.name)) {
          plantMergeObj[d.name].value += d.value;
        }
        else {
          plantMergeObj[d.name] = d;
        }
      });

      var plantMergeData = [];
      Object.keys(plantMergeObj).forEach(function (key, index) {
        plantMergeData.push(plantMergeObj[key]);
      });

      var treemapHeight = 500;
      var projTreemap = d3.layout.treemap().size([width, treemapHeight]);
      var nodes = projTreemap.nodes({ children: plantMergeData });
      nodes = nodes.slice(1, nodes.length);

      var projSvg = d3.select('#proj-treemap')
        .append('svg')
        .attr('width', width)
        .attr('height', treemapHeight);

      var projG = projSvg.selectAll('g')
        .data(nodes)
        .enter().append('g')
        .on('mousemove', function (d) {
          mousemove(d, '<strong>Project Name:' + d.name + '</strong>' +
                        '<p>Capacity (MW): ' + d.value.toFixed(2) + '</p>');
        })
        .on('mouseout', mouseout);

      projG.append('rect')
        .attr({
          x: function (d) { return d.x; },
          y: function (d) { return d.y; },
          width: function (d) { return d.dx; },
          height: function (d) { return d.dy; },
          class: 'proj-treemap-rect'
        });

      projG.append('text')
        .attr({
          x: function (d) { return d.x + d.dx / 2; },
          y: function (d) { return d.y + d.dy / 2; },
          'text-anchor': 'middle',
          'dominant-baseline': 'central'
        })
        .text(function (d) { return d.name; })
        .each(fontSize);

      var total = plantMergeData.reduce(function (a, b) {
        return {
          value: a.value + b.value
        };
      });

      document.getElementById('proj-total').innerText = total.value + ' (MW)';

      var app2 = new Vue({
        el: '#proj-table',
        data: {
          plantData: plantMergeData
        },
        computed: {
          projArray: function () {
            return this.plantData.sort(function (a, b) {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              if (a.Unit < b.Unit) return -1;
              if (a.Unit > b.Unit) return 1;
              return 0;
            });
          }
        }
      });
    });


    if (country !== 'Japan') {
      d3.csv(dbFile, function (data) {
        var bankObj = {};
        var bankArray = [];

        // data.forEach(function (d) {
        //   if (!d['Total Investing Amount'] || !d["Financier's name"]) { return; }
        //
        //   if (!bankObj.hasOwnProperty(d["Financier's name"])) {
        //     bankObj[d["Financier's name"]] = {
        //       investing: 0,
        //       countries: [],
        //       plants: []
        //     };
        //   }
        //   var obj = bankObj[d["Financier's name"]];
        //
        //   obj.investing += parseFloat(d['Total Investing Amount']);
        //   if (d["Financier's countries"] && obj.countries.indexOf(d["Financier's countries"]) === -1) {
        //     obj.countries.push(d["Financier's countries"]);
        //   }
        //
        //
        //   if (d['Project Name'] && obj.plants.indexOf(d['Project Name']) === -1) {
        //     obj.plants.push(d['Project Name']);
        //   }
        // });
        //
        // for (var key in bankObj) {
        //   bankArray.push({
        //     name: key,
        //     value: bankObj[key].investing,
        //     countries: bankObj[key].countries.join(', '),
        //     plants: bankObj[key].plants.join(', ')
        //   });
        // }
        data.forEach(function (d) {
          d.value = parseFloat(d['Total Investing Amount']);
          d.name = d["Financier's name"];
        });


        bankArray = data;
        var bankTotal = {
          value: 0
        };

        if (bankArray.length > 0) {
          bankTotal = bankArray.reduce(function (a, b) {
            return { value: a.value + b.value };
          });
        }
        document.getElementById('bank-vis').className = '';

        if (bankTotal.value > 0) {

          bankTotal = bankTotal.value.toFixed(2)

          document.getElementById('bank-invest-total').innerText = bankTotal + ' (mio USD)';

          var bankTreemap = d3.layout.treemap()
            .size([width, 500]);

          var nodes = bankTreemap.nodes({ children: bankArray });
          nodes = nodes.slice(1, nodes.length);

          var bankSvg = d3.select('#bank-treemap')
            .append('svg')
            .attr('width', width)
            .attr('height', 500);

          var g = bankSvg.selectAll('g')
            .data(nodes)
            .enter().append('g')
            .on('mousemove', function (d) {
              mousemove(d, '<strong>Bank Name:' + d.name + '</strong>' +
                           '<p>Investing Amount(mio USD): ' + d.value.toFixed(2) + '</p>');
            })
            .on('mouseout', mouseout);

          g.append('rect')
           .attr({
             x: function (d) { return d.x; },
             y: function (d) { return d.y; },
             width: function (d) { return d.dx; },
             height: function (d) { return d.dy; },
             class: 'bank-treemap-rect'
           });

          g.append('text')
            .attr({
              x: function (d) { return d.x + d.dx / 2; },
              y: function (d) { return d.y + d.dy / 2; },
              'text-anchor': 'middle',
              'dominant-baseline': 'central'
            })
            .text(function (d) { return d.name; })
            .each(fontSize);

        }
        else {
          $('#bank-treemap-desc').hide();
        }

        var app = new Vue({
          el: '#bank-table',
          data: {
            bank: bankArray
          },
          computed: {
            bankArray: function () {
              return this.bank.sort(function (a, b) {
                if (a['Project Name'] < b['Project Name']) return -1;
                if (a['Project Name'] > b['Project Name']) return 1;
                if (a.Unit < b.Unit) return -1;
                if (a.Unit > b.Unit) return 1;
                return 0;
              });
            }
          }
        });

      });
    }
    else {

       document.getElementById('bank-proj-vis').className = '';

       d3.csv(dbFile, function (data) {
        var app = new Vue({
          el: '#bank-proj-table',
          data: {
            bank: data
          },
          computed: {
            bankArray: function () {
              return this.bank.sort(function (a, b) {
                // if (a['Project Name'] < b['Project Name']) return -1;
                // if (a['Project Name'] > b['Project Name']) return 1;
                // if (a.Unit < b.Unit) return -1;
                // if (a.Unit > b.Unit) return 1;
                return 0;
              });
            }
          }
        });
      });
    }
  }

  function fontSize(d, i) {
    var size = 16;
    var word = d.name;
    var width = d.dx;
    var height = d.dy;
    if (!word) return;

    d3.select(this).style('font-size', size + 'px');

    while (((this.getBBox().width >= width) || (this.getBBox().height >= height)) && (size > 10)) {
      size--;
      d3.select(this).style('font-size', size + 'px');
      this.firstChild.data = word;
    }
    var rectSize = this.parentNode.childNodes[0].getBBox().width - 0.5;
    if (rectSize < this.getBBox().width) { d3.select(this).style('display', 'none'); }
  }

  function mousemove(d, content) {
    var xPosition = d3.event.pageX + 5;
    var yPosition = d3.event.pageY + 5;

    d3.select('#tooltip')
        .style('left', xPosition + 'px')
        .style('top', yPosition + 'px')
        .html(function () {
          return content;
        });

    d3.select('#tooltip').classed('hidden', false);
  }

  function mouseout() {
    d3.select('#tooltip').classed('hidden', true);
  }
}(window));
