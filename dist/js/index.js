!function(t){var e=["China","Taiwan","Japan","Vietnam","North Korea","South Korea","Philippines","Thailand","Malaysia","Indonesia","Cambodia","Laos","Myanmar","Singapore","Brunei","East Timor","Mongolia"],n=$(t).width(),a=$(t).height(),r=d3.select("#east-asia-map").append("svg").attr("width",n).attr("height",a),o=2e3,i=n<600;i&&(o=1200),d3.select("body").append("div").attr("id","tooltip"),d3.json("data/countries.geo.topo.json",function(t,s){if(t)return console.error(t);var d=[107.7,17],c=d3.geo.mercator().scale(o).center(d).translate([n/2+10,a/2+50]),p=d3.geo.path().projection(c),u=topojson.feature(s,s.objects["countries.geo"]).features;u=u.filter(function(t){return"Vietnam"===t.properties.name}),r.append("g").attr("class","countries").selectAll("path").data(u).enter().append("path").attr("d",p).style("display",function(t){return e.indexOf(t.properties.name)>-1?"block":"none"}),r.append("path").attr("class","country-borders").attr("d",p(topojson.mesh(s,s.objects["countries.geo"],function(t,e){return"Vietnam"===t.properties.name&&t!==e}))),r.append("text").text("Vietnam").attr("class","map-title").attr("y",function(){return i?"150px":a/2}).attr("x",function(){return i?n/2:n/6*4}).attr("text-anchor","middle")}),d3.csv("./data/Database- VN - Project 2.csv",function(t){function e(t,e){var n=16,a=t.name,r=t.dx,o=t.dy;for(d3.select(this).style("font-size",n+"px");(this.getBBox().width>=r||this.getBBox().height>=o)&&n>10;)n--,d3.select(this).style("font-size",n+"px"),this.firstChild.data=a;this.parentNode.childNodes[0].getBBox().width-.5<this.getBBox().width&&d3.select(this).style("display","none")}function a(t){var e=d3.event.pageX+5,n=d3.event.pageY+5;d3.select("#tooltip").style("left",e+"px").style("top",n+"px").html(function(){return"<strong>"+t.name+"</strong><p>"+t.value.toFixed(2)+"</p>"}),d3.select("#tooltip").classed("hidden",!1)}function r(){d3.select("#tooltip").classed("hidden",!0)}var o={},i=[];t.forEach(function(t){t["Investing Amount/ Share (mio USD)"]&&t["Financier's name"]&&(o.hasOwnProperty(t["Financier's name"])||(o[t["Financier's name"]]=0),o[t["Financier's name"]]+=parseFloat(t["Investing Amount/ Share (mio USD)"]))});for(var s in o)i.push({name:s,value:o[s]});var d=d3.layout.treemap().size([n,500]),c=d.nodes({children:i});c=c.slice(1,c.length);var p=d3.select("#bank-treemap").append("svg").attr("width",n).attr("height",500),u=p.selectAll("g").data(c).enter().append("g").on("mousemove",a).on("mouseout",r);u.append("rect").attr({x:function(t){return t.x},y:function(t){return t.y},width:function(t){return t.dx},height:function(t){return t.dy},class:"bank-treemap-rect"}),u.append("text").attr({x:function(t){return t.x+t.dx/2},y:function(t){return t.y+t.dy/2},"text-anchor":"middle","dominant-baseline":"central"}).text(function(t){return t.name}).each(e);var l={},h=[];t.forEach(function(t){t["Investing Amount/ Share (mio USD)"]&&t["Financier's name"]&&(l.hasOwnProperty(t["Project Name"])||(l[t["Project Name"]]=0),l[t["Project Name"]]+=parseFloat(t["Investing Amount/ Share (mio USD)"]))});for(var s in l)h.push({name:s,value:l[s]});var m=d3.layout.treemap().size([n,400]),c=m.nodes({children:h});c=c.slice(1,c.length);var f=d3.select("#proj-treemap").append("svg").attr("width",n).attr("height",400),g=f.selectAll("g").data(c).enter().append("g").on("mousemove",a).on("mouseout",r);g.append("rect").attr({x:function(t){return t.x},y:function(t){return t.y},width:function(t){return t.dx},height:function(t){return t.dy},class:"proj-treemap-rect"}),g.append("text").attr({x:function(t){return t.x+t.dx/2},y:function(t){return t.y+t.dy/2},"text-anchor":"middle","dominant-baseline":"central"}).text(function(t){return t.name}).each(e);new Vue({el:"#bank-table",data:{bankArray:i}}),new Vue({el:"#proj-table",data:{projArray:h}})})}(window);