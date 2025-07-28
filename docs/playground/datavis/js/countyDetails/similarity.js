var simCat;
var sim_dropDown1;
var simCat2;

function dict2arr(dict){
	var arr_return = [];
	for(var i in dict){
		arr_return.push(Number(dict[i]));
	}
	return arr_return;
}

function cosSim(arr1, arr2){
	var num = 0.0;
	var den1 = 0.0;
	var den2 = 0.0;
	var cosSim = 0.0;
	for(var i in arr1){
		num += (arr1[i] * arr2[i]);
		den1 += (arr1[i] * arr1[i]);
		den2 += (arr2[i] * arr2[i]);
	}
	return cosSim = num / (Math.sqrt(den1) * Math.sqrt(den2))
}

function cosSimList(data, cat, selectedCountyIdx){
	var temp_cosSimList = [];
	if(!isNaN(selectedCountyIdx)){
		fipsList.forEach(function(d){
			temp_cosSimList.push(cosSim(dict2arr(getData(cat, selectedCountyIdx)), dict2arr(getData(cat, d))));
		})
		return(temp_cosSimList);
	}

}

function cosSimList_sort(arr, sorting){
	var temp_with_index = [];

	data.forEach(function(d, i){temp_with_index.push([arr[i], d.id]);});
	
	if(sorting=="desc"){temp_with_index.sort(function(left, right){return left[0] > right[0] ? -1 : 1;});}
	else if(sorting=="asce"){temp_with_index.sort(function(left, right){return left[0] < right[0] ? -1 : 1;});}

	var temp_fips = [];
	var temp_values = [];
	for(var i=0; i<temp_with_index.length; i++){
		temp_fips.push(temp_with_index[i][1]);
		temp_values.push(temp_with_index[i][0]);
	}
	
	temp_return = {fips: temp_fips, values: temp_values};
	return temp_return;
}

function cosSimList_display(targetHTMLId){
	d3.select(targetHTMLId).append("h4").attr("class", "simCatTitle").text("Compare with most/least similar county by:")
	sim_dropDown1 = d3.select(targetHTMLId).append("select").attr("class", "form-select form-select-sm").attr("name", "similarity-cat" + targetHTMLId.substr(targetHTMLId.length, targetHTMLId.length))

	sim_dropDown1.on("change", function(){
		// simCat1 = d3.event.target.value;
		if(targetHTMLId == "#county1"){
			simCat = document.getElementsByName("similarity-cat")[0].value;
			sim1Changed(targetHTMLId, selectedCountyIdx1);
		}
		if(targetHTMLId == "#county2"){
			simCat = document.getElementsByName("similarity-cat")[1].value
			sim1Changed(targetHTMLId, selectedCountyIdx2);
		}
	})
	sim_options1 = sim_dropDown1.selectAll("option")
		.data(["Choose a category", "Overall", "Ethnicity", "Age Group", "Economy", "Education", "Risk Factors", "Health Factors"])
		.enter().append("option")
	sim_options1.text(function(d){return d;})
		.attr("value", function(d){return d;})


	d3.select(targetHTMLId).append("h6").attr("id", targetHTMLId.substr(1,targetHTMLId.length)+"-mostSimilar")
	d3.select(targetHTMLId).append("h6").attr("id", targetHTMLId.substr(1,targetHTMLId.length)+"-leastSimilar")
}


// listing does not update when county selection changed. 
function sim1Changed(targetHTMLId, countyIdx){
	if(d3.event==null){
		if(targetHTMLId == "#county1"){simCat = document.getElementsByName("similarity-cat")[0].value}
		if(targetHTMLId == "#county2"){simCat = document.getElementsByName("similarity-cat")[1].value}
		}
	// else{simCat = d3.event.target.value;}
	// console.log(simCat)

	var cosSim_selected;
	if(simCat != "Choose a category" && simCat != null){
		if(simCat == "Ethnicity" || simCat == "Age Group" || simCat == "Economy" || simCat == "Education" || simCat == "Risk Factors" || simCat == "Health Factors" || simCat == "Overall"){
			if(simCat == "Overall"){
				cosSim_selected = cosSim_overall(countyIdx);
			} 
			else{
				cosSim_selected = cosSimList(data, simCat, countyIdx);
			}
			d3.select(targetHTMLId+"-mostSimilar")
			.text("Most Similar: " + 
				data[fipsList.indexOf(Number(top5similarCountyIdx(cosSim_selected)[0]))].county + ", " + 
				data[fipsList.indexOf(Number(top5similarCountyIdx(cosSim_selected)[0]))].state)
			d3.select(targetHTMLId+"-leastSimilar")
			.text("Least Similar: " +
				data[fipsList.indexOf(Number(top5unsimilarCountyIdx(cosSim_selected)[0]))].county + ", " + 
				data[fipsList.indexOf(Number(top5unsimilarCountyIdx(cosSim_selected)[0]))].state
				)
		}
	}
}

function cosSim_overall(countyIdx){
	var cosSim_selected = [];
	var cosSim_ethnicity 		= cosSimList(data, "Ethnicity", countyIdx);
	var cosSim_ageGroup  		= cosSimList(data, "Age Group", countyIdx);
	var cosSim_economy			= cosSimList(data, "Economy", countyIdx);
	var cosSim_education 		= cosSimList(data, "Education", countyIdx);
	var cosSim_riskFactors 		= cosSimList(data, "Risk Factors", countyIdx);
	var cosSim_healthFactors	= cosSimList(data, "Health Factors", countyIdx);

	for(var i=0; i<data.length; i++){
		cosSim_selected.push(cosSim_ethnicity[i] + cosSim_ageGroup[i] + cosSim_economy[i] + cosSim_education[i] + cosSim_riskFactors[i] + cosSim_healthFactors[i]);
		}
	return cosSim_selected;
}
