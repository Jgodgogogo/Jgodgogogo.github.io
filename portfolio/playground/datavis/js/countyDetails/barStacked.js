function barStacked_draw(baseCanvas, xloc, yloc, cat, countyIdx1, countyIdx2){
	var betweenBars = 180;
	var axis_margin = 5;
	var titleSize = 20;
	var titleMargin = 30;
	var colors1 = ['rgb(254,229,217)','rgb(252,174,145)','rgb(251,106,74)','rgb(222,45,38)','rgb(165,15,21)'];
	var colors2 = ['rgb(239,243,255)','rgb(189,215,231)','rgb(107,174,214)','rgb(49,130,189)','rgb(8,81,156)'];

	//title
	baseCanvas.append("text")
		.attr("x", 0)
		.attr("y", titleMargin)
		.attr("font-size", titleSize)
		.attr("transform", "translate(" + xloc + "," + yloc + ")")
		.text(cat)

	// data
	// var data1, data2;
	if(!isNaN(countyIdx1)){
		var data1 = getData(cat, countyIdx1);
		var bar1 = barStacked_bars(baseCanvas.append("g"), data1, xloc, yloc + titleSize + titleMargin, colors1);
	}
	if(!isNaN(countyIdx2)){
		var data2 = getData(cat, countyIdx2);
		var bar2 = barStacked_bars(baseCanvas.append("g"), data2, xloc + betweenBars, yloc + titleSize + titleMargin, colors2);
	}

	//bars
	
}

function barStacked_bars(baseCanvas, data, xloc, yloc, colors){
	var width = 60;
	var height = 150;
	var lineWidth = 10;
	var fontSize = 10;
	var locMul = 7;
	var colors = colors.reverse();

	// bars
	var barScale = d3.scale.linear().domain([0, 100]).range([0, height])
	var bar = baseCanvas.selectAll("g")
		.data(d3.entries(data)).enter().append("g");

	var tempLoc = height;
	var barLoc = [];
	bar.append("rect")
		.attr("x", 0)
		.attr("y", function(d, i){
				tempLoc = tempLoc - barScale(d.value);
				barLoc[i] = tempLoc;
				return tempLoc;
		})
		.attr("width", width)
		.attr("height", function(d){return barScale(d.value)})
		.attr("transform", "translate(" + xloc + "," + yloc + ")")
		.style("fill", function(d, i){return colors[i]});

	// labels
	var temp_count = 0;
	bar.append("line")
		.attr("x1", width)
		.attr("y1", function(d, i){return barLoc[i] + barScale(d.value)/2;})
		.attr("x2", width + lineWidth)
		.attr("y2", function(d, i){
			if(barScale(d.value) < 15){
				var temp_yLoc = barLoc[i] + barScale(d.value)/2 - temp_count * locMul;
				temp_count++;
				return temp_yLoc;
			}
			else{return barLoc[i] + barScale(d.value)/2;}
			// return barLoc[i] + barScale(d.value)/2;
			//// return height - (height/Object.keys(data).length)*i - (height/Object.keys(data).length)/2;
		})
		.attr("transform", "translate(" + xloc + "," + yloc + ")")
		.attr("stroke", "black").attr("stroke-width", 1);

	temp_count = 0;
	bar.append("text")
		.attr("x", width + lineWidth + fontSize/3)
		.attr("y", function(d, i){
			if(barScale(d.value) < 15){
				var temp_yLoc = barLoc[i] + barScale(d.value)/2 - temp_count * locMul + fontSize/3;
				temp_count++;
				return temp_yLoc;
			}
			else{return barLoc[i] + barScale(d.value)/2 + fontSize/3;}

			// return barLoc[i] + barScale(d.value)/2 + fontSize/3;
			// return height - (height/Object.keys(data).length)*i - (height/Object.keys(data).length)/2 + fontSize/3;
		})
		.attr("font-size", fontSize)
		.attr("transform", "translate(" + xloc + "," + yloc + ")")
		.text(function(d){return d.key + " (" + Number(d.value).toFixed(2) + "%)"});

}
