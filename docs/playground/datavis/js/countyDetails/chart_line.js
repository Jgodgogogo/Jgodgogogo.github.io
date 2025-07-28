function chart_line (baseCanvas, xloc, yloc, data_line, data_dot, cat, countyIdx){
	// consolidate JSONs of different densities, and select by the argument
	// drawing line graph
	x = data_line.x;
	y = data_line.y;

	var line = d3.svg.line()
		.x(function(d, i){return x[i]*10})
		.y(function(d, i){return yloc-y[i]*1000});

	var lines = baseCanvas.append("path")
		.attr("d", line(x))
		.attr("transform", "translate(" + xloc + "," + yloc + ")")
		.attr("stroke", "black")
		.attr("stroke-width", 2)
		.attr("fill", "none");

	// a dot on the line (selected county)
	dotVal = data_dot[cat][countyIdx];
	dotNearestValIdxInDensity = nearestValIdx(data_line.x, dotVal);

	var dot = baseCanvas.append("circle")
		.attr("cx", x[dotNearestValIdxInDensity]*10)
		.attr("cy", yloc-y[dotNearestValIdxInDensity]*1000)
		.attr("r", 5)
		.attr("transform", "translate(" + xloc + "," + yloc + ")")
		.style({"fill": "none", "stroke": "orange", "stroke-width": "3px"});
	var dot_annotation = baseCanvas.append("text")
		.attr("x", x[dotNearestValIdxInDensity]*10+10)
		.attr("y", yloc-y[dotNearestValIdxInDensity]*1000-10)
		.attr("transform", "translate(" + xloc + "," + yloc + ")")
		.text(cat + ": " + dotVal + "%");
}

// find nearest values' index in array
function nearestValIdx(arr, num){
	var curr = arr[0];
	var temp_return_idx = 0;
	for(var i=0; i<arr.length; i++){
		if(Math.abs(num - arr[i]) < Math.abs(num - curr)){
			curr = arr[i];
			temp_return_idx = i;
		}
	}
	// return curr;
	return temp_return_idx;
}
