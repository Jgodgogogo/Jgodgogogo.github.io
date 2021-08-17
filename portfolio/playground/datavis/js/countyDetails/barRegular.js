function barRegular_draw(baseCanvas, xloc, yloc, cat, countyIdx1, countyIdx2){
	var chartHeight = 150;
	var betweenBars = 30;
	var axis_margin = 35;
	var titleSize = 20;
	var titleMargin = 30;
	var color1 = 'rgb(222,45,38)';
	var color2 = 'rgb(49,130,189)';

	//title
	baseCanvas.append("text")
		.attr("x", 0)
		.attr("y", titleMargin)
		.attr("font-size", titleSize)
		.attr("transform", "translate(" + (xloc) + "," + yloc + ")")
		.text(cat)

	// data
	if(!isNaN(countyIdx1)){
		var data1 = getData(cat, countyIdx1);
		var bar1 = barRegular_bars(baseCanvas.append("g"), data1, xloc + axis_margin, yloc + titleSize + titleMargin, chartHeight, color1);
	}
	if(!isNaN(countyIdx2)){
		var data2 = getData(cat, countyIdx2);
		var bar2 = barRegular_bars(baseCanvas.append("g"), data2, xloc + betweenBars + axis_margin, yloc + titleSize + titleMargin, chartHeight, color2);
	}

	//bars
	
	var xAxis = barRegular_axis(baseCanvas.append("g"), data1, xloc + axis_margin, yloc + titleSize + titleMargin, betweenBars/2, chartHeight);
}

function barRegular_bars(baseCanvas, data, xloc, yloc, height, color){
	var width = 30;
	// var lineWidth = 10;
	var fontSize = 8;
	var color = color;

	// bars
	var barScale = d3.scale.linear().domain([0, 100]).range([0, height]);
	var bar = baseCanvas.selectAll("g")
		.data(d3.entries(data)).enter().append("g");

	// var tempLoc = height;
	var barLoc = [];
	bar.append("rect")
		.attr("x", function(d, i){return (width * i * 2) + (i * 5)})
		.attr("y", function(d){
			if(!isNaN(d.value)){return height - barScale(d.value);}
			else{return 0;}
			})
		.attr("width", width)
		.attr("height", function(d){
			if(!isNaN(d.value)){return barScale(d.value);}
			else{return 0;}
		})
		.attr("transform", "translate(" + xloc + "," + yloc + ")")
		.style("fill", color);

	// labels
	bar.append("text")
		.attr("x", function(d, i){return (width * i * 2) + (i * 5)})
		.attr("y", function(d){
			if(d.value == "NA"){return height-8;}
			else {return height - barScale(d.value) - fontSize/2;}
		})
		.attr("font-size", fontSize)
		.attr("transform", "translate(" + xloc + "," + yloc + ")")
		.text(function(d){
			if(d.value == "NA"){return "NA";}
			else {return Number(d.value).toFixed(2) + "%";}
		});
}

function barRegular_axis(baseCanvas, data, xloc, yloc, width, height){
	var fontSize = 10;

	// labels
	var xAxis = baseCanvas.selectAll("text")
			.data(d3.entries(data))
			.enter()
			.append("text");
	xAxis.attr("y", height + fontSize)
		.attr("font-size", fontSize)
		.attr("transform", "translate(" + xloc + "," + yloc + ")")
		.each(function(d, i){
			var temp_words = d.key.split("  ");
			for(var j=0; j<temp_words.length; j++){
				d3.select(this).append("tspan")
					.attr("x", (width * i * 4) + (i * 5))
					.attr("dy", j ? "1em" : 0)
					.attr("text-anchor", "start")
					.attr("class", "tspan"+i)
					.attr("transform", "translate" + xloc + ", 0)")
					.text(temp_words[j])
			}
		});

	var yScale = d3.scale.linear().domain([0, 100]).range([height, 0]);
	var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5).tickFormat(function(d){return d + "%"});
	baseCanvas.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + xloc + ", " + yloc + ")")
		.call(yAxis);

}

