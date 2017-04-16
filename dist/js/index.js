!function(t){function e(t,e,c,p,l,u){var d=o<600;d&&(c=p);var m=d3.geo.mercator().scale(c).center(e).translate([o/2+10,i/2+50]),g=d3.geo.path().projection(m);d3.json("./data/countries.geo.topo.json",function(e,c){d3.csv(l,function(p){if(e)return console.error(e);var l=topojson.feature(c,c.objects["countries.geo"]).features;l=l.filter(function(e){return e.properties.name===t}),s.append("g").attr("class","countries").selectAll("path").data(l).enter().append("path").attr("d",g).style("display",function(t){return r.indexOf(t.properties.name)>-1?"block":"none"}),s.append("path").attr("class","country-borders").attr("d",g(topojson.mesh(c,c.objects["countries.geo"],function(e,n){return e.properties.name===t&&e!==n}))),s.append("text").text(t).attr("class","map-title").attr("y",function(){return d?"120px":i/2}).attr("x",function(){return d?o/2:o/6*4}).attr("text-anchor","middle"),p=p.filter(function(e){return"Vietnam"===t?e.country===t&&e.latitude&&e.longitude:e.latitude&&e.longitude}).map(function(t){return t.longitude=parseFloat(t.longitude),t.latitude=parseFloat(t.latitude),t.capacity_mw=parseFloat(t.capacity_mw),t}),s.append("text").text(function(){return p.length+" Coal Plants"}).attr("class","map-subtitle").attr("y",function(){return d?150:i/2+35}).attr("x",function(){return d?o/2:o/6*4}).attr("text-anchor","middle");var u=d?10:25,h=d3.scale.linear().domain([0,d3.max(p,function(t){return t.capacity_mw})]).range([5,u]);s.selectAll("circle").data(p).enter().append("circle").attr("cx",function(t){return m([t.longitude,t.latitude])[0]}).attr("cy",function(t){return m([t.longitude,t.latitude])[1]}).attr("r",function(t){return h(t.capacity_mw)}).on("mousemove",function(e){console.log(e),"Vietnam"===t?n(e,"<p><strong>Plant: </strong>"+e.plant+"</p><p><strong>Capacity (MW): </strong>"+e.capacity_mw+"</p><p><strong>Coal Type: </strong>"+e.coal_type+"</p><p><strong>Unit: </strong>"+e.unit+"</p><p><strong>Year: </strong>"+e.year+"</p><p><strong>Status: </strong>"+e.status+"</p>"):n(e,"<p><strong>Project Name: </strong>"+e["Project Name"]+"</p><p><strong>Capacity (MW): </strong>"+e.capacity_mw+"</p><p><strong>Coal Type: </strong>"+e.Types+"</p><p><strong>Unit: </strong>"+e.Unit+"</p><p><strong>Year: </strong>"+e["Established date (yr)"]+"</p><p><strong>Status: </strong>"+e.Status+"</p>")}).on("mouseout",a);var f=i-40;s.append("circle").attr("cx",20).attr("cy",f).attr("r","8px").attr("fill","red"),s.append("text").attr("x",35).attr("y",f+5).attr("r","8px").attr("fill","red").attr("class","legend").text("Fossil Project Capacity"),s.append("text").attr("x",35).attr("y",function(){return d?f+25:f+30}).attr("r","8px").attr("fill","red").attr("class","legend").text("Data Last Updated：2017"),s.append("circle").attr("cx",20).attr("cy",function(){return d?f+20:f+25}).attr("r","5px").style("fill","#fff").style("stroke","none")})}),d3.csv(u,function(t){function e(t,e){var n=16,a=t.name,r=t.dx,o=t.dy;for(d3.select(this).style("font-size",n+"px");(this.getBBox().width>=r||this.getBBox().height>=o)&&n>10;)n--,d3.select(this).style("font-size",n+"px"),this.firstChild.data=a;this.parentNode.childNodes[0].getBBox().width-.5<this.getBBox().width&&d3.select(this).style("display","none")}var r={},i=[];t.forEach(function(t){t["Investing Amount/ Share (mio USD)"]&&t["Financier's name"]&&(r.hasOwnProperty(t["Financier's name"])||(r[t["Financier's name"]]=0),r[t["Financier's name"]]+=parseFloat(t["Investing Amount/ Share (mio USD)"]))});for(var s in r)i.push({name:s,value:r[s]});var c={value:0};i.length>0&&(c=i.reduce(function(t,e){return{value:t.value+e.value}})),document.getElementById("bank-invest-total").innerText=c.value+" (mio USD)",document.getElementById("proj-total").innerText="520000 (KgCO2)";var p=d3.layout.treemap().size([o,500]),l=p.nodes({children:i});l=l.slice(1,l.length);var u=d3.select("#bank-treemap").append("svg").attr("width",o).attr("height",500),d=u.selectAll("g").data(l).enter().append("g").on("mousemove",function(t){n(t,"<strong>Bank Name:"+t.name+"</strong><p>Investing Amount(mio USD): "+t.value.toFixed(2)+"</p>")}).on("mouseout",a);d.append("rect").attr({x:function(t){return t.x},y:function(t){return t.y},width:function(t){return t.dx},height:function(t){return t.dy},class:"bank-treemap-rect"}),d.append("text").attr({x:function(t){return t.x+t.dx/2},y:function(t){return t.y+t.dy/2},"text-anchor":"middle","dominant-baseline":"central"}).text(function(t){return t.name}).each(e);var m={},g=[];t.forEach(function(t){t["Investing Amount/ Share (mio USD)"]&&t["Financier's name"]&&(m.hasOwnProperty(t["Project Name"])||(m[t["Project Name"]]=0),m[t["Project Name"]]+=parseFloat(t["Investing Amount/ Share (mio USD)"]))});for(var s in m)g.push({name:s,value:m[s]});var h=d3.layout.treemap().size([o,400]),l=h.nodes({children:g});l=l.slice(1,l.length);var f=d3.select("#proj-treemap").append("svg").attr("width",o).attr("height",400),y=f.selectAll("g").data(l).enter().append("g").on("mousemove",function(t){n(t,"<strong>Project Name:"+t.name+"</strong><p>CO2 Carbon Emission: "+t.value.toFixed(2)+"</p>")}).on("mouseout",a);y.append("rect").attr({x:function(t){return t.x},y:function(t){return t.y},width:function(t){return t.dx},height:function(t){return t.dy},class:"proj-treemap-rect"}),y.append("text").attr({x:function(t){return t.x+t.dx/2},y:function(t){return t.y+t.dy/2},"text-anchor":"middle","dominant-baseline":"central"}).text(function(t){return t.name}).each(e);new Vue({el:"#bank-table",data:{bankArray:i}}),new Vue({el:"#proj-table",data:{projArray:g}})})}function n(t,e){var n=d3.event.pageX+5,a=d3.event.pageY+5;d3.select("#tooltip").style("left",n+"px").style("top",a+"px").html(function(){return e}),d3.select("#tooltip").classed("hidden",!1)}function a(){d3.select("#tooltip").classed("hidden",!0)}var r=["China","Taiwan","Japan","Vietnam","North Korea","South Korea","Philippines","Thailand","Malaysia","Indonesia","Cambodia","Laos","Myanmar","Singapore","Brunei","East Timor","Mongolia"],o=$(t).width(),i=$(t).height(),s=d3.select("#east-asia-map").append("svg").attr("width",o).attr("height",i);d3.select("body").append("div").attr("id","tooltip").classed("hidden",!0),t.init=e}(window);