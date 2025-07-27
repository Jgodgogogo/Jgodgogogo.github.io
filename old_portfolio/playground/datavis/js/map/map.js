var clickCounter=0;
var clickedCounty=[];

function ready(us) {
	// var colors_map = ['rgb(230,220,200)','rgb(240,240,240)','rgb(217,217,217)','rgb(189,189,189)','rgb(150,150,150)','rgb(115,115,115)','rgb(82,82,82)','rgb(37,37,37)','rgb(0,0,0)'];
	var colors_legend = ['rgb(230,220,200)','rgb(255,255,255)', 'rgb(240,240,240)','rgb(217,217,217)','rgb(189,189,189)','rgb(150,150,150)','rgb(115,115,115)','rgb(82,82,82)','rgb(37,37,37)','rgb(0,0,0)'];
	var quantile = d3.scale.quantile()
			.domain(rateById.values())
			.range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

	var text = quantile.quantiles();
	// console.log(quantile.quantiles())
	var legend = ['NA','0%','10%','12%','14%','16%','18%','20%','24%','46%']
	var note = []
	var legend_x = document.getElementById("chart_top_map").offsetWidth *0.85;
	var space = document.getElementById("chart_top_map").offsetWidth*0.05;

	features.append("text")     
			.text("Poor Health")
			.attr("x",legend_x)
			.attr("y",legend_x/2.6)
			.attr("class","legend-title")

	features.selectAll("rect")
			.data(colors_legend)
			.enter()
			.append("rect")
			.attr("width", space*0.7)
			.attr("height",space)
			.attr("x",legend_x + space +5)
			.attr("y",function(d,i){return legend_x/2.53+0.6*space*i;})
			.style("fill", function(d){return d;});


	features.selectAll(".text")
			.data(legend)
			.enter()          
			.append("text")     
			.text(String)
			.attr("x",legend_x + 5)
			.attr("y",function(d,i){return legend_x/2.4+0.6*space*i;})
			.attr("class","legend-text")     
	console.log(legend_x , space)

	features.attr("class", "counties")
			.selectAll("path")
				.data(topojson.feature(us, us.objects.counties).features)
			.enter().append("path")
				.attr("class", function(d) { 
					if(rateById.get(d.id) !=""){return quantile(rateById.get(d.id));}
					else{return 'na'}
				})
				.attr("id", function(d){return "countyNo"+d.id})
				.attr("d", path)
				.on('mouseover', tip.show)
				.on('mouseout', tip.hide)
				// click county from map -> return something
				.on('click',function(d){ 
					var temp_selected1, temp_selected2;
					clickCounter++;

					if(clickCounter % 2){
						temp_selected1 = ftpById.get(d.id);
						if(selectedCountyIdx1 != null){
							d3.select("#countyNo"+selectedCountyIdx1).style("stroke", "none").style("fill", "");
						}
						selectedCountyIdx1 = temp_selected1;
						d3.select(this).style('stroke','none').style("fill","rgba(255,0,0,0.8)"); 
						clickedCounty[0] = getData("Geo Names", selectedCountyIdx1);
						state1Changed();
						county1Changed();
					}
					else {
						temp_selected2 = ftpById.get(d.id);
						if(selectedCountyIdx2 != null){
							d3.select("#countyNo"+selectedCountyIdx2).style("stroke", "none").style("fill", "");
						}
						selectedCountyIdx2 = temp_selected2;
						d3.select(this).style('stroke','none').style("fill","rgba(0,0,255,0.8)"); 
						clickedCounty[1] = getData("Geo Names", selectedCountyIdx2);
						state2Changed();
						county2Changed();
					}
					
					temp_selected1 = null;
					temp_selected2 = null;

					// console.log(clickCounter + ": "+ selectedCountyIdx1 + ", " + selectedCountyIdx2);
					// document.getElementById('option2').text = ftpById.get(d.id)
					});    

	features.append("path")
			.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
			.attr("class", "states")
			.attr("d", path)
			.style("stroke-width", "1.5px");
 
	features.append("path")
			.datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); }))
			.attr("class", "county-")
			.attr("d", path)
			.style("stroke-width", ".5px");

	// svg_map.append("rect")
	// 	.attr("class", "overlay")
	// 	.attr("width", width_map)
	// 	.attr("height", height_map)
	// 	.call(zoom);

}

// function getValue(obj){
//  if(obj.id == 'worst_1'){
//  	console.log("!!!")
// 	document.getElementById('option1').text = 'Leslie' 
//  }

//  if(obj.id == 'worst_2'){
// 	document.getElementById('option1').text = 'Wyoming'  
//  } 
// 	if(obj.id == 'worst_3'){
// 	document.getElementById('option1').text = 'Clay'  
//  } 
// 	if(obj.id == 'worst_4'){
// 	document.getElementById('option1').text = 'McCreary'  
//  } 
// 	if(obj.id == 'worst_5'){
// 	document.getElementById('option1').text = 'Magoffin'  
//  } 
//  if(obj.id == 'best_1'){
// 	document.getElementById('option1').text = 'Ouray'  
//  }

//  if(obj.id == 'best_2'){
// 	document.getElementById('option1').text = 'Kiowa'  
//  } 
// 	if(obj.id == 'best_3'){
// 	document.getElementById('option1').text = 'Routt'  
//  } 
// 	if(obj.id == 'best_4'){
// 	document.getElementById('option1').text = 'San Miguel'  
//  } 
// 	if(obj.id == 'best_5'){
// 	document.getElementById('option1').text = 'Jackson'  
//  } 

// }

function sortDecend(a,b)
{
	return b-a;
}

function sortAcend(a,b)
{
	return a-b;
}

function zoomed() {
	// console.log("translate: "+ d3.event.translate)
	// console.log("scale:"+d3.event.scale)
	features.attr("transform", "translate(" + d3.event.translate + ")" + "scale(" + d3.event.scale + ")");
	// if(d3.event.scale == 1.01){features.attr("transform", "translate(0,0)")}
	features.select(".states").style("stroke-width", 1.5 / d3.event.scale + "px");
	features.select(".counties").style("stroke-width", 1.5 / d3.event.scale + "px");
}

// d3.select(self.frameElement).style("height", height_map + "px");
d3.select(self.frameElement).style("height", 600 + "px");


