var quarter = "q1";
var currentBox = 0;
var q1Data = '{ "admin": { "height": "114", "malware": "299", "phishing": "5985", "total": "6284" }, "finance": { "height": "135", "malware": "502", "phishing": "6927", "total": "7429" }, "construction": { "height": "200", "malware": "385", "phishing": "10655", "total": "11040" }, "mining": { "height": "161", "malware": "411", "phishing": "8465", "total": "8876" }, "services": { "height": "141", "malware": "238", "phishing": "7568", "total": "7806" }, "retail": { "height": "143", "malware": "247", "phishing": "7623", "total": "7870" }, "trade": { "height": "178", "malware": "371", "phishing": "9468", "total": "9839" }, "manufac": { "height": "172", "malware": "394", "phishing": "9083", "total": "9477" } }';
var q2Data = '{ "admin": { "height": "111", "malware": "546", "phishing": "7335", "total": "7881" }, "finance": { "height": "100", "malware": "713", "phishing": "6351", "total": "7064" }, "construction": { "height": "200", "malware": "727", "phishing": "13449", "total": "14176" }, "mining": { "height": "145", "malware": "589", "phishing": "9717", "total": "10306" }, "services": { "height": "143", "malware": "622", "phishing": "9520", "total": "10142" }, "retail": { "height": "164", "malware": "713", "phishing": "10907", "total": "11620" }, "trade": { "height": "199", "malware": "500", "phishing": "13674", "total": "14174" }, "manufac": { "height": "191", "malware": "631", "phishing": "12942", "total": "13573" } }';
var q3Data = '{ "admin": { "height": "73", "malware": "462", "phishing": "5688", "total": "6150" }, "finance": { "height": "77", "malware": "647", "phishing": "5912", "total": "6559" }, "construction": { "height": "200", "malware": "314", "phishing": "16651", "total": "16965" }, "mining": { "height": "114", "malware": "449", "phishing": "9215", "total": "9664" }, "services": { "height": "122", "malware": "445", "phishing": "9952", "total": "10397" }, "retail": { "height": "138", "malware": "599", "phishing": "11088", "total": "11687" }, "trade": { "height": "185", "malware": "365", "phishing": "15317", "total": "15682" }, "manufac": { "height": "147", "malware": "415", "phishing": "12071", "total": "12486" } }';
var q4Data = '{ "admin": { "height": "91", "malware": "433", "phishing": "9597", "total": "10030" }, "finance": { "height": "101", "malware": "404", "phishing": "10689", "total": "11093" }, "construction": { "height": "164", "malware": "296", "phishing": "17735", "total": "18031" }, "mining": { "height": "126", "malware": "342", "phishing": "13526", "total": "13868" }, "services": { "height": "126", "malware": "315", "phishing": "11637", "total": "11952" }, "retail": { "height": "109", "malware": "454", "phishing": "18302", "total": "18756" }, "trade": { "height": "171", "malware": "265", "phishing": "21724", "total": "21989" }, "manufac": { "height": "200", "malware": "371", "phishing": "9468", "total": "9839" } }';

document.addEventListener('DOMContentLoaded', function() {
    changeQuarter("q1");
}, false);

function showPie(boxNum){
	currentBox = boxNum;
	if (currentBox == 0)
		return 0;
	var phishing = getJSONValue(boxNum,"phishing");
	var malware = getJSONValue(boxNum,"malware");
	
	$("#dynamic-chart").sparkline([phishing,malware], {
    type: 'pie',
	sliceColors: ['#DB3A4E','#4990E2'],
	tooltipFormat: '<span style="font-size:20px;">{{offset:offset}}: {{value}} ({{percent.1}}%)</span>',
	tooltipValueLookups: {
		'offset': {
			0: 'Phishing',
			1: 'Malware'
		}
	},
    height: '300'});
	$('#box-wrapper').find('.box').removeClass("selected-box");
	$('#box-wrapper-bot').find('.box').removeClass("selected-box");
	$('#box'.concat(boxNum.toString())).addClass("selected-box");
	$('#current-industry').text("Industry: ".concat(getBoxProperName(boxNum)));
	$('#total-attacks').text("Total attacks this quarter: ".concat(getJSONValue(boxNum,"total").toString()));

}
function getJSONValue(boxNum,val){
	var boxName = getBoxName(boxNum);
	if (quarter === "q1")
		var jsondata = JSON.parse(q1Data);
	else if (quarter === "q2")
		var jsondata = JSON.parse(q2Data);
	else if (quarter === "q3")
		var jsondata = JSON.parse(q3Data);
	else if (quarter === "q4")
		var jsondata = JSON.parse(q4Data);
	else{
		alert("error in switch for getBoxDim, invalid quarter".concat(quarter));
		return "360px"
	}
	return parseInt(jsondata[boxName][val]);
}
function changeQuarter(newQuarter){
	quarter = newQuarter;
	changeBoxSizes(1);
	changeBoxSizes(2);
	changeBoxSizes(3);
	changeBoxSizes(4);
	changeBoxSizes(5);
	changeBoxSizes(6);
	changeBoxSizes(7);
	changeBoxSizes(8);
	$('#months-bar').find('.month-buttons').removeClass("selected-box");
	$('#'.concat(quarter).concat("-button")).addClass("selected-box");
	showPie(currentBox);

}

function changeBoxSizes(boxNum){
	var boxDim = getBoxDim(boxNum);
	$('#box'.concat(boxNum.toString())).css("height",boxDim);
	$('#box'.concat(boxNum.toString())).css("width",boxDim);
}
function getBoxName(num){
	switch (num){
		case 1:
			return "admin";
		case 2:
			return "finance";
		case 3:
			return "construction"
		case 4:
			return "mining"
		case 5:
			return "services"
		case 6:
			return "retail"
		case 7:
			return "trade"
		case 8:
			return "manufac"
		default:
			alert("error in switch for getBoxName, invalid boxnum ".concat(parseInt(num)));
	}
	
}
function getBoxProperName(num){
	switch (num){
		case 1:
			return "Public Administration";
		case 2:
			return "Finance";
		case 3:
			return "Construction"
		case 4:
			return "Mining"
		case 5:
			return "Services"
		case 6:
			return "Retail"
		case 7:
			return "Wholesale Trade"
		case 8:
			return "Manufacturing"
		default:
			alert("error in switch for getBoxProperName, invalid boxnum ".concat(parseInt(num)));
	}
	
}

function getBoxDim(boxNum){
	var boxName = getBoxName(boxNum);
	if (quarter === "q1")
		var jsondata = JSON.parse(q1Data);
	else if (quarter === "q2")
		var jsondata = JSON.parse(q2Data);
	else if (quarter === "q3")
		var jsondata = JSON.parse(q3Data);
	else if (quarter === "q4")
		var jsondata = JSON.parse(q4Data);
	else{
		alert("error in switch for getBoxDim, invalid quarter".concat(quarter));
		return "360px"
	}
	return jsondata[boxName].height.toString().concat("px");
}
