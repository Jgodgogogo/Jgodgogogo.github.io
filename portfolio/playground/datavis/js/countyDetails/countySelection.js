// variables to pass
var state1
var state2
var county1
var county2
var id1
var id2
var filtered_data = [] // create array of objects
var county_dropDown

// queue()
// 	.defer(d3.tsv, "../../static/data/final_data.tsv")
// 	.await(chart_selection);

// function chart_selection(error, data1){
function chart_selection(){
	// data = data1;
	states = ["Choose a state"];
	data.forEach(function(d, i) {
		if (states.indexOf(d.state) < 0) {
			states.push(d.state)
		}
	});

	// county 1
	d3.select("#color_rect1").append("svg").attr("width",30).attr("height",30).style("float","left")
						     .append("rect").attr("x",5).attr("y",5).attr("width",20).attr("height",20).style("fill","red")
	d3.select("#county1").append("h3").attr("id","county1-text").text("County 1")
	d3.select("#county1").append("h4").attr("id","county1-details").text("Details")
	// d3.select("#county1").append("h4").text("Select a state:")

	var state_dropDown1 = d3.select("#county1")
						   .append("select")
                    	   .attr("id", "state-list-1")
                    	   .attr("class","form-select")
                    	   .on("change", state1Changed)

    var state_options1 = state_dropDown1.selectAll("option")
					            .data(states)
 					            .enter()
 					            .append("option");

 	state_options1.text(function (d) { return d; })
       .attr("value", function (d) { return d; });

    // d3.select("#county1").append("h4").text("Select a county:")

	county_dropDown1 = d3.select("#county1")
						   .append("select")
                    	   .attr("id", "county-list-1")
                    	   // .attr("id","county-list-1")
                    	   .on("change", county1Changed)

	// county2
	d3.select("#color_rect2").append("svg").attr("width",30).attr("height",30).style("float","left")
						     .append("rect").attr("x",5).attr("y",5).attr("width",20).attr("height",20).style("fill","blue")
	d3.select("#county2").append("h3").attr("id","county2-text").text("County 2")
	d3.select("#county2").append("h4").attr("id","county2-details").text("Details")
	// d3.select("#county2").append("h4").text("Select a state:")

	var state_dropDown2 = d3.select("#county2")
						   .append("select")
                    	   .attr("id", "state-list-2")
                    	   .attr("class","form-select")                    	   
                    	   .on("change", state2Changed)

    var state_options2 = state_dropDown2.selectAll("option")
					            .data(states)
 					            .enter()
 					            .append("option");

 	state_options2.text(function (d) { return d; })
       .attr("value", function (d) { return d; });

    // d3.select("#county2").append("h4").text("Select a county:")

	county_dropDown2 = d3.select("#county2")
						   .append("select")
                    	   .attr("id", "county-list-2")
                    	   // .attr("id","county-list-2")
                    	   .on("change", county2Changed);

    cosSimList_display("#county1");
    cosSimList_display("#county2");

}

function state1Changed() {
	// clear dropdown list
	var ddl = document.getElementById('county-list-1');
	removeOptions(ddl)

	if(d3.event && d3.event.type=="change"){
		state1 = d3.event.target.value;
	}
	else {
		state1 = clickedCounty[0].State;
		document.getElementById("state-list-1").value = state1;	
	}
	
	// get filtered data for only selected state
	filtered_data = [{county: "Choose a county"}]
	data.forEach(function(d, i) {
		if (d.state == state1) {
			filtered_data.push(d)
		}
	})

    var county_options1 = county_dropDown1.selectAll("option")
					            .data(filtered_data)
 					            .enter()
 					            .append("option");

 	county_options1.text(function (d) { return d.county })
                   .attr("value", function (d) { return d.i });
}

function state2Changed() {
	// clear dropdown list
	var ddl = document.getElementById('county-list-2');
	removeOptions(ddl)

	if(d3.event && d3.event.type=="change"){
		state2 = d3.event.target.value
	}
	else{
		state2 = clickedCounty[1].State;
		document.getElementById("state-list-2").value = state2;	
	}
	// get filtered data for only selected state
	filtered_data = [{county: "Choose a county"}]
	data.forEach(function(d, i) {
		if (d.state == state2) {
			filtered_data.push(d)
		}
	})

    var county_options2 = county_dropDown2.selectAll("option")
					            .data(filtered_data)
 					            .enter()
 					            .append("option");

 	county_options2.text(function (d) { return d.county })
                   .attr("value", function (d) { return d.i });
}

function county1Changed() {
	// id1 이 selectedCountyIdx1을 갱신하기 전에 이전 selectedCountyedIdx1을 저장. 
	// map click -> selecting from dropdown -> map click 시 맨 처음 click한 것 지워주기.
	var temp_selected1 = selectedCountyIdx1;
	d3.select("#countyNo"+temp_selected1).style("stroke", "none").style("fill", "");

	if(d3.event && d3.event.type=="change"){
		county1 = d3.event.target.value;
	}
	else {
		county1 = clickedCounty[0].County;
		document.getElementById("county-list-1").value = county1;
	}

	var county1_population;
	var county1_poorHealth;

	data.forEach(function(d) {
		if ((d.state == state1) & (d.county == county1)) {
			id1 = d.id
			county1_population = d.population;
			county1_poorHealth = d.poor_health;
		}
	})
	d3.select("#county1-text").text(county1 + ", " + state1)
	d3.select("#county1-details").text("Population: " + county1_population + ", " + "Poor Health: " + county1_poorHealth + "%")


	//draw() -> updates selectedCountyIdx1. refresh the canvas.
	//showing selected county (from drop down) on the map
	draw();

	d3.select("#countyNo"+selectedCountyIdx1).style("stroke", "rgba(252,147,147)").style('fill','rgba(255,0,0,0.8)').style('stroke-width','2px');




	// cosSimList_display("#county1", selectedCountyIdx1);
	
	sim1Changed("#county1", selectedCountyIdx1)
	// document.getElementsByName("similarity-cat")[0].value = "Choose a category"
	

}

function county2Changed() {
	var temp_selected2 = selectedCountyIdx2;
	d3.select("#countyNo"+temp_selected2).style("stroke", "none").style("fill", "");

	if(d3.event && d3.event.type=="change"){
		county2 = d3.event.target.value;
	}
	else{
		county2 = clickedCounty[1].County;
		document.getElementById("county-list-2").value = county2;

	}
	var county2_population;
	var county2_poorHealth;

	data.forEach(function(d) {
		if ((d.state == state2) & (d.county == county2)) {
			id2 = d.id
			county2_population = d.population;
			county2_poorHealth = d.poor_health;

		}
	})
	d3.select("#county2-text").text(county2 + ", " + state2)
	d3.select("#county2-details").text("Population: " + county2_population + ", " + "Poor Health: " + county2_poorHealth + "%")

	console.log(id2)

	draw(); 
	d3.select("#countyNo"+selectedCountyIdx2).style("stroke", "blue").style("fill", "rgba(0,0,255,0.8)");

	// cosSimList_display("#county2", selectedCountyIdx2);
	sim1Changed("#county2", selectedCountyIdx2)
	// sim2Changed();
	// return(id2);
}

function removeOptions(selectbox)
{
    var i;
    for(i=selectbox.options.length-1;i>=0;i--)
    {
        selectbox.remove(i);
    }
}