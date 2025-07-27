function getCountyIdx(){
	// selectedCountyIdx1 = document.getElementById("test_countyIdx1").value;
	// selectedCountyIdx2 = document.getElementById("test_countyIdx2").value;
	selectedCountyIdx1 = id1;
	selectedCountyIdx2 = id2;

}

function setup(){
	getFipsList();

	var screen_width = screen.width;
	var screen_height = screen.width/1.6,
		map_div_width = document.getElementById("chart_top_map").offsetWidth,
		map_div_height = map_div_width/1.6;


	// initializing the map
	projection = d3.geo.albersUsa()
	    .scale(map_div_width)
	    .translate([map_div_width / 2, map_div_height / 2]);

	path = d3.geo.path()
	    .projection(projection);
   

	zoom = d3.behavior.zoom()
	    .translate([0, 0])
	    .scale(1)
	    .scaleExtent([1/2, 8])
	    // .center(0)
	    .on("zoom", zoomed);



	svg_map = d3.select("#chart_top_map").append("svg")
		.attr("width", map_div_width).attr("height", map_div_height);

	features = svg_map.append("g");

	console.log(map_div_width,map_div_height)

	svg_map.on("mousedown.zoom", null)
		.on("touchstart.zoom", null)
		.on("touchmove.zoom", null)
		.on("touchend.zoom", null)
		// .call(zoom);

	// 	function zoomed() {
	// 	  g.attr("transform", d3.event.transform);
	// 	}

	// 	function dragged(d) {
	// 	  d3.select(this).attr("cx", function(d){d.x = d3.event.x}).attr("cy", function(d){d.y = d3.event.y});
	// 	}				

	// // svg_map.append("rect")
	// // 	.attr("class", "overlay")
	// // 	.attr("width", width_map)
	// // 	.attr("height", height_map)
	// // 	.call(zoom);
	

	tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([60,120])
		.html(function(d) {
			if (rateById.get(d.id) == 0) {
				return "<p>County: "+ nameById.get(d.id)+"</p><p>State: "+ 
				stateById.get(d.id)+"</p><p>Population In Poor Health: NA%";			
			}
			else {
				return "<p>County: "+ nameById.get(d.id)+"</p><p>State: "+ 
				stateById.get(d.id)+"</p><p>Population In Poor Health: " + 
				rateById.get(d.id) + "%</p>"; 
			}
		});    
	svg_map.call(tip)


	// initializing the county details part
	svg_base = d3.select("#chart_bottom_graphs1") 
		.append("svg") 
		.attr("width",width_detail).attr("height",height_detail); 
}

function refresh(){
	getCountyIdx();
	svg_base = d3.select("#chart_bottom_graphs1") 
		.append("svg") 
		.attr("width",width_detail).attr("height",height_detail); 

}

function top5similarCountyIdx(arr){
	var sorted = cosSimList_sort(arr, sorting="desc");
	var temp_return = [sorted.fips[1], sorted.fips[2], sorted.fips[3], sorted.fips[4], sorted.fips[5]];
	return temp_return;
}
function top5unsimilarCountyIdx(arr){
	var sorted = cosSimList_sort(arr, sorting="asce");
	var temp_return = [sorted.fips[1], sorted.fips[2], sorted.fips[3], sorted.fips[4], sorted.fips[5]];
	return temp_return;
}

function getFipsList(){
	data.forEach(function(d, i){fipsList.push(Number(d.id));});
}

function countyName(data, countyIdx){
	if(countyIdx != "null"){return (data[countyIdx]["county"] + ", " + data[countyIdx]["state"]);	}
	else{return "null";}
}

function getData(cat, countyIdx){
	var temp_return;
	var tempData = data[fipsList.indexOf(Number(countyIdx))];

	if(cat == "Poor Health" && countyIdx != "null"){
		temp_return = {"Poor Health": tempData["poor_health"]};
	}
	if(cat == "Population" && countyIdx != "null"){
		temp_return = {"Population" : tempData["population"]};
	}
	if(cat == "Ethnicity" && countyIdx != "null"){
		temp_return = {
			"White" : tempData["white_perc"], 
			"Black" : tempData["black_perc"], 
			"Hispanic" : tempData["hispanic_perc"], 
			"Other" : tempData["other_perc"]
		}
	}
	if(cat == "Age Group" && countyIdx != "null"){
		temp_return = {
			"0 to 14 y.o." : tempData["age_14_under_perc"],
			"15 to 24 y.o." : tempData["age_15_24_perc"],
			"25 to 44 y.o." : tempData["age_25_44_perc"],
			"45 to 64 y.o." : tempData["age_45_64_perc"],
			"65 and older" : tempData["age_65_over_perc"]
		}
	}
	if(cat == "Economy" && countyIdx != "null"){
		temp_return = {
			"Poverty" : tempData["poverty"],
			"Unemployment" : tempData["unemployment"]
		}
	}
	if(cat == "Education" && countyIdx != "null"){
		temp_return = {
			"Illiteracy" : tempData["illiteracy"], 
			"High School  Graduation" : tempData["highschoolGrad"], 
			"Some College" : tempData["someCollege"]
		}
	}
	if(cat == "Risk Factors" && countyIdx != "null"){
		temp_return = {
			"Smoking" : tempData["smoking"],
			"Obesity" : tempData["obesity"],
			"Excessive  Drinking" : tempData["excessiveDrinking"]
			// "Poverty" : tempData["poverty"]
		}
	}
	if(cat == "Health Factors" && countyIdx != "null"){
		temp_return = {
			"Rec. Facility  Rate" : tempData["rec.fac.rate"],
			"Healthy Food  Access" : tempData["healthy_foods"]
		}
	}
	if(cat == "Geo Names" && countyIdx != "null"){
		temp_return = {
			"State" : tempData["state"],
			"County" : tempData["county"]
		}
	}
	return temp_return;
}