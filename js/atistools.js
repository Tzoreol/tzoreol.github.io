var icao;
var qfu;
var transitionAltitude;
var windDirection;
var windSpeed;
var flightRules;
var qnh;

$(document).ready(function() {
	$("#submit").click(function() {
		if(validateFields()) {
			$("#metar").show();
			$("#metar p").html("Requesting METAR...");
			
			$.ajax({
				url: "https://avwx.rest/api/metar/" + icao,
				dataType: "json",
				method: "GET",
				success: function(data) {
					$("#metar p").html(data["Raw-Report"]);
					
					windDirection = parseInt(data["Wind-Direction"]);
					windSpeed = parseInt(data["Wind-Speed"]);
					flightRules = data["Flight-Rules"];
					qnh = parseInt(data["Altimeter"]);
					
					var alpha = windDirection - qfu;
					var alphaCorr = getAlphaCorr();
					$("#runwayAnalysis p").append("<br/>Corrected alpha: " + alphaCorr + "&deg;");
					
					var crossWind = windSpeed * Math.sin(radians(alphaCorr));
					$("#runwayAnalysis p").append("<br/>Crosswind speed: speed<sub>wind</sub> x sin(alpha<sub>corr</sub>) = " + Math.round(crossWind) + "kts");
					
					var effectiveWind = windSpeed * Math.cos(radians(alphaCorr));
					$("#runwayAnalysis p").append("<br/>Effective wind speed: speed<sub>wind</sub> x cos(alpha<sub>corr</sub>) = " + Math.round(effectiveWind) + "kts");
					
					$("#runwayAnalysis p").append("<br/>" + isRunwayOpenable(effectiveWind));
					$("#runwayAnalysis").show();
					
					var transitionLevel = Math.ceil((transitionAltitude - 28 * (qnh - 1013)) / 1000) * 10;
					$("#transitionLevel p").append("<br/>Transition level: transition altitude - 28 x (QNH - 1013) = FL" + transitionLevel);
					$("#transitionLevel").show();
				}
			});
		}
	});
});

function validateFields() {
	$("#errors").hide().html("");
	var isValid = true;
	
	icao = $("#icao").val();
	qfu = parseInt($("#qfu").val());
	transitionAltitude = parseInt($("#transitionAltitude").val());
	
	//Force qfu value in case of decimal
	$("#qfu").val(qfu);
	
	icaoRegExp = new RegExp(/^[A-Z]{4}$/, 'i');
	
	if(icao.match(icaoRegExp) == null) {
		$("#errors").append("<p>Invalid ICAO format</p>");
		isValid = false;
	}
	
	if(qfu.length == 0) {
		$("#errors").append("<p>Resquested runway QFU is mandatory</p>");
		isValid = false;
	}
	
	if(transitionAltitude.length == 0) {
		$("#errors").append("<p>Transition altitude is mandatory</p>");
		isValid = false;
	}
	
	if((qfu < 0) || (qfu >= 360)) {
		$("#errors").append("<p>Invalid resquested runway QFU range</p>");
		isValid = false;
	}
	
	if(!isValid) {
		$("#errors").slideDown();
	}

	return isValid;
}

function getMag(direction, delta) {
	if((direction + delta) < 0) {
		return 360 + (direction + delta);
	} else {
		return (direction + delta) % 360;
	}
}

function getAlphaCorr() {
	var alpha = windDirection - qfu;
	
	if(alpha == 0) {
		$("#runwayAnalysis p").html("Full headwind");
		return 0;
	}
	
	if((alpha == 90) || (alpha == -270)) {
		$("#runwayAnalysis p").html("Full left wind");
		return 90;
	}
	
	if((alpha == -90) || (alpha == 270)) {
		$("#runwayAnalysis p").html("Full right wind");
		return 90;
	}
	
	if((alpha == -180) || (alpha == 180)) {
		$("#runwayAnalysis p").html("Full tailwind");
		return 0;
	}
	
	if(((alpha > 0) && (alpha < 90)) || ((alpha > -359) && (alpha < -270))) {
		$("#runwayAnalysis p").html("Headwind from right");
		return getMag(alpha, 360);
	}
	
	if(((alpha > -90) && (alpha < 0)) || ((alpha > 270) && (alpha < 360))) {
		$("#runwayAnalysis p").html("Headwind from left");
		return getMag(alpha, -360);
	}
	
	if(((alpha > 90) && (alpha < 180)) || ((alpha > -270) && (alpha < 180))) {
		$("#runwayAnalysis p").html("Tailwind from right");
		return 180 - alpha;
	}
	
	if(((alpha > 180) && (alpha < 270)) || ((alpha > -180) && (alpha < -90))) {
		$("#runwayAnalysis p").html("Tailwind from left");
		return 180 - alpha;
	}
}

function isHeadwind() {
	var alpha = windDirection - qfu;
	
	if(alpha == 0) {
		return true;
	}
	
	if((alpha == 90) || (alpha == -270)) {
		return false;
	}
	
	if((alpha == -90) || (alpha == 270)) {
		return false;
	}
	
	if((alpha == -180) || (alpha == 180)) {
		return false;
	}
	
	if(((alpha > 0) && (alpha < 90)) || ((alpha > -359) && (alpha < -270))) {
		return true;
	}
	
	if(((alpha > -90) && (alpha < 0)) || ((alpha > 270) && (alpha < 360))) {
		return true;
	}
	
	if(((alpha > 90) && (alpha < 180)) || ((alpha > -270) && (alpha < 180))) {
		return false;
	}
	
	if(((alpha > 180) && (alpha < 270)) || ((alpha > -180) && (alpha < -90))) {
		return false;
	}
}

function radians(degrees) {
	return degrees * Math.PI / 180;
}

function isRunwayOpenable(effectiveWind) {
	var type = $("input[name=type]:checked").val();
	
	switch(type) {
		case "preferential":
			if(!isHeadwind()) {
				if(effectiveWind < 6) {
					return '<span class="lightGreen">Possible</span>';
				} else if(effectiveWind < 15) {
					return '<span class="neutral">Own decision</span>';
				} else {
					return '<span class="red">No</span>';
				}
			} else {
				return '<span class="green">Recommended</span>';
			}
		break;
		case "ils":
			if(!isHeadwind()) {
				if(effectiveWind < 6) {
					return '<span class="lightGreen">Possible</span>';
				} else if(effectiveWind < 15) {
					return '<span class="neutral">Own decision</span>';
				} else {
					return '<span class="red">No</span>';
				}
			} else {
				return '<span class="green">Recommended</span>';
			}
		break;
		case "classicIFR":
			if(!isHeadwind()) {
				if(effectiveWind < 6) {
					if(flightRules.compareTo("VFR") == 0) {
						return '<span class="lightGreen">Possible</span>';
					} else {
						return '<span class="neutral">Own decision</span>';
					}
				} else if(effectiveWind < 15) {
					if(flightRules.compareTo("VFR") == 0) {
						return '<span class="neutral">Own decision</span>';
					} else {
						return '<span class="darkorange">Unfavorable</span>';
					}
				} else {
					return '<span class="red">No</span>';
				}
			} else {
				return '<span class="green">Recommended</span>';
			}
		break;
		case "ifrThenViusal":
			if(!isHeadwind()) {
				if(effectiveWind < 6) {
					return '<span class="orange">Not recommended</span>';
				} else if(effectiveWind < 15) {
					return '<span class="darkorange">Unfavorable</span>';
				} else {
					return '<span class="red">No</span>';
				}
			} else {
				if(flightRules.compareTo("VFR") == 0) {
					return '<span class="green">Recommended</span>';
				} else {
					return '<span class="neutral">Own decision</span>';
				}
			}
		break;
	}
}

