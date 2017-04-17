!function(t){function e(t){var e=o-40,r=d3.max(d,function(t){return t.value}),a=d3.scale.linear().domain([0,r]).range([.5,15]),n={};t.forEach(function(t){n[t.properties.name]=u.centroid(t)});var c=s.selectAll(".defs").data(d).enter().append("svg:defs"),l=function(t){return"marker"+t.source.replace(" ","")+t.target.replace(" ","")};c.append("marker").attr("id",l).attr("viewBox","0 -5 10 10").attr("refX",5).attr("refY",0).attr("orient","auto").attr("markerUnits","userSpaceOnUse").attr("markerWidth",function(t){return 3.5*a(t.value)}).attr("markerHeight",function(t){return 2.5*a(t.value)}).append("path").attr("d","M0,-5L10,0L0,5").attr("fill","rgba(196, 0, 0, 0.75)");var f=function(t){return"grd"+t.source.replace(" ","")+t.target.replace(" ","")},g=function(t){return"url(#"+f(t)+")"},m=d3.scale.log().domain([1,r]).range(["rgb(193,39,45)","#b52626"]),h=function(t){return m(t.value)},y=c.selectAll("linearGradient").data(d).enter().append("svg:linearGradient").attr("id",f).attr("gradientUnits","userSpaceOnUse").attr("x1",function(t){return n[t.source][0]}).attr("y1",function(t){return n[t.source][1]}).attr("x2",function(t){return n[t.target][0]}).attr("y2",function(t){return n[t.target][0]});y.append("svg:stop").attr("offset","0%").attr("stop-color","rgb(193,39,45)").attr("stop-opacity",.2),y.append("svg:stop").attr("offset","80%").attr("stop-color",h).attr("stop-opacity",1),y.append("svg:stop").attr("offset","100%").attr("stop-color",h).attr("stop-opacity",1);var x=s.append("g").attr("id","arcs"),v=x.selectAll("g").data(d).enter().append("g");v.append("path").attr("stroke",g).attr("stroke-linecap","round").attr("stroke-width",function(t){return a(t.value)}).attr("class",function(t){return t.target+"-link"}).attr("d",function(t){return u({type:"LineString",coordinates:[p.invert(n[t.source]),p.invert(n[t.target])]})}).attr("marker-end",function(t){return"url(#"+l(t)+")"}).style("display","none");v.append("circle").attr("cx",function(t){return n[t.source][0]}).attr("cy",function(t){return n[t.source][1]-5}).attr("class",function(t){return t.target+"-link"}).attr("r","25").style("display","none").attr("text-anchor","middle"),v.append("text").attr("x",function(t){return n[t.source][0]}).attr("y",function(t){return n[t.source][1]}).attr("class",function(t){return t.target+"-link"}).text(function(t){return t.value+""}).style("display","none").attr("text-anchor","middle"),s.append("line").attr("x1",10).attr("y1",e).attr("x2",20).attr("y2",e).attr("stroke","#b52626").attr("stroke-width",12),s.append("circle").attr("cx",14).attr("cy",function(){return i?e+20:e+25}).attr("r","5px").style("fill","#fff").style("stroke","none"),s.append("text").attr("x",25).attr("y",e+5).attr("class","legend").text("Fossil Fuel Financial Flow (Million USD)"),s.append("text").attr("x",25).attr("y",function(){return i?e+25:e+30}).attr("r","8px").attr("fill","red").attr("class","legend").text("Data Last Updated：2017")}var r=["Vietnam","Japan","Taiwan","South Korea","Indonesia","Philippines"],a=["China","Taiwan","Japan","Vietnam","North Korea","South Korea","Philippines","Thailand","Malaysia","Indonesia","Cambodia","Laos","Myanmar","Singapore","Brunei","East Timor","Mongolia"],n=$(t).width(),o=$(t).height(),i=n<600,s=d3.select("#east-asia-map").append("svg").attr("width",n).attr("height",o),c=i?200:450,l=[107,25],p=d3.geo.mercator().scale(c).center(l).translate([n/2+10,o/2+50]),u=d3.geo.path().projection(p),d=[{source:"China",target:"Vietnam",value:300},{source:"Japan",target:"Vietnam",value:200},{source:"South Korea",target:"Vietnam",value:100}];if(i){var f=r.slice();f.unshift("Select A Country"),d3.select("body").append("form").attr("class","m-country-select form-group").append("select").attr("class","form-control").on("change",function(e){t.location.href="./"+this.value.toLowerCase()}).selectAll("option").data(f).enter().append("option").attr("value",function(t){return t}).text(function(t){return t})}d3.json("./data/countries.geo.topo.json",function(c,l){if(c)return console.error(c);var p=topojson.feature(l,l.objects["countries.geo"]).features.filter(function(t){return a.indexOf(t.properties.name)>-1});s.append("g").attr("class","countries").selectAll("path").data(p).enter().append("path").attr("d",u).style("cursor",function(t){if(r.indexOf(t.properties.name)>-1)return"pointer"}).on("mouseover",function(t){r.indexOf(t.properties.name)>-1&&(d3.select(this).style("opacity",.8),d3.selectAll("."+t.properties.name+"-link").style("display","block")),d3.select(".map-title").text(t.properties.name)}).on("mouseout",function(t){d3.select(this).style("opacity",1),d3.select(".map-title").text("East Asia"),d3.selectAll("."+t.properties.name+"-link").style("display","none")}).on("click",function(e){r.indexOf(e.properties.name)>-1&&(t.location.href="./"+e.properties.name.toLowerCase())}),s.append("path").attr("class","country-borders").attr("d",u(topojson.mesh(l,l.objects["countries.geo"],function(t,e){return a.indexOf(t.properties.name)>-1&&t!==e}))),s.append("text").text("East Asia").attr("class","map-title").attr("text-anchor","middle").attr("y",function(){return i?"115":o/2+50}).attr("x",function(){return i?n/2:n/6*5}),e(p)})}(window);