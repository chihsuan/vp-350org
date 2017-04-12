!function(t){function e(t){var e=o-25,r=d3.max(d,function(t){return t.value}),a=d3.scale.linear().domain([0,r]).range([.5,5]),n=s.append("svg:defs"),i={};t.forEach(function(t){i[t.properties.name]=u.centroid(t)}),n.append("marker").attr("id","arrowHead").attr("viewBox","0 0 10 10").attr("refX",10).attr("refY",5).attr("orient","auto").attr("markerUnits","userSpaceOnUse").attr("markerWidth",16).attr("markerHeight",12).append("polyline").attr("points","0,0 10,5 0,10 1,5").attr("fill","red").attr("stroke","#c50303");var p=function(t){return"grd"+t.source.replace(" ","")+t.target.replace(" ","")},c=function(t){return"url(#"+p(t)+")"},f=d3.scale.log().domain([1,r]).range(["rgb(193,39,45)","#b52626"]),m=function(t){return f(t.value)},g=n.selectAll("linearGradient").data(d).enter().append("svg:linearGradient").attr("id",p).attr("gradientUnits","userSpaceOnUse").attr("x1",function(t){return i[t.source][0]}).attr("y1",function(t){return i[t.source][1]}).attr("x2",function(t){return i[t.target][0]}).attr("y2",function(t){return i[t.target][0]});g.append("svg:stop").attr("offset","0%").attr("stop-color","rgb(193,39,45)").attr("stop-opacity",.2),g.append("svg:stop").attr("offset","70%").attr("stop-color",m).attr("stop-opacity",1),g.append("svg:stop").attr("offset","100%").attr("stop-color",m).attr("stop-opacity",1);var h=s.append("g").attr("id","arcs");h.selectAll("path").data(d).enter().append("path").attr("stroke",c).attr("stroke-linecap","round").attr("stroke-width",function(t){return a(t.value)}).attr("class",function(t){return t.target+"-link"}).attr("d",function(t){return u({type:"LineString",coordinates:[l.invert(i[t.source]),l.invert(i[t.target])]})}).attr("marker-end","url(#arrowHead)").style("opacity",0);s.append("line").attr("x1",30).attr("y1",e).attr("x2",40).attr("y2",e).attr("stroke","#b52626").attr("stroke-width",6),s.append("text").attr("x",45).attr("y",e+5).attr("r","8px").text("Fossil Project Investment Flow")}var r=["Vietnam"],a=["China","Taiwan","Japan","Vietnam","North Korea","South Korea","Philippines","Thailand","Malaysia","Indonesia","Cambodia","Laos","Myanmar","Singapore","Brunei","East Timor","Mongolia"],n=$(t).width(),o=$(t).height(),i=n<600,s=d3.select("#east-asia-map").append("svg").attr("width",n).attr("height",o),p=i?300:500,c=[107,25],l=d3.geo.mercator().scale(p).center(c).translate([n/2+10,o/2+50]),u=d3.geo.path().projection(l),d=[{source:"China",target:"Vietnam",value:20},{source:"Japan",target:"Vietnam",value:5},{source:"South Korea",target:"Vietnam",value:10}];d3.json("./data/countries.geo.topo.json",function(p,c){if(p)return console.error(p);var l=topojson.feature(c,c.objects["countries.geo"]).features.filter(function(t){return a.indexOf(t.properties.name)>-1});s.append("g").attr("class","countries").selectAll("path").data(l).enter().append("path").attr("d",u).style("cursor",function(t){if(r.indexOf(t.properties.name)>-1)return"pointer"}).on("mouseover",function(t){r.indexOf(t.properties.name)>-1&&(d3.select(this).style("fill","#c70e0e").style("stroke","#b52626"),d3.selectAll("."+t.properties.name+"-link").style("opacity",1)),d3.select(".map-title").text(t.properties.name)}).on("mouseout",function(t){d3.select(this).style("fill","").style("stroke",""),d3.select(".map-title").text("East Asia"),d3.selectAll("."+t.properties.name+"-link").style("opacity",0)}).on("click",function(e){r.indexOf(e.properties.name)>-1&&(t.location.href="../"+e.properties.name)}),s.append("path").attr("class","country-borders").attr("d",u(topojson.mesh(c,c.objects["countries.geo"],function(t,e){return a.indexOf(t.properties.name)>-1&&t!==e}))),s.append("text").text("East Asia").attr("class","map-title").attr("text-anchor","middle").attr("y",function(){return i?"120px":o/2+50}).attr("x",function(){return i?n/2+50:n/6*5}),e(l)})}(window);