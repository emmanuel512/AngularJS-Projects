app.controller("forecastControl",function($scope, $http){
	$scope.cityID = "";

	$scope.$watch('cityID', function(){
		if($scope.cityID != ""){	
			cityfetch();
		}
		else{
			$scope.cCity = "";
			$scope.currentTemp = "";
			$scope.currentSum = "";
			$scope.d1maxTemp = "";
			$scope.d2maxTemp = "";
			$scope.d3maxTemp = "";
			$scope.d4maxTemp = "";
			$scope.d5maxTemp = "";
			$scope.d6maxTemp = "";
			$scope.d7maxTemp = "";
			$scope.d1minTemp = "";
			$scope.d2minTemp = "";
			$scope.d3minTemp = "";
			$scope.d4minTemp = "";
			$scope.d5minTemp = "";
			$scope.d6minTemp = "";
			$scope.d7minTemp = "";
			$scope.d1summary = "";
			$scope.d2summary = "";
			$scope.d3summary = "";
			$scope.d4summary = "";
			$scope.d5summary = "";
			$scope.d6summary = "";
			$scope.d7summary = "";
		}	
	})
	
	var date = new Date();
	var weekday = new Array(7);
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	$scope.currentDay = weekday[date.getDay()];
	
	if(date.getDay()+1 > 6){
		$scope.day1 = weekday[date.getDay()+1-7]; 
	}else{
		$scope.day1 = weekday[date.getDay()+1];
	}

	if(date.getDay()+2 > 6){
		$scope.day2 = weekday[date.getDay()+2-7]; 
	}else{
		$scope.day2 = weekday[date.getDay()+2];
	}

	if(date.getDay()+3 > 6){
		$scope.day3= weekday[date.getDay()+3-7]; 
	}else{
		$scope.day3 = weekday[date.getDay()+3];
	}

	if(date.getDay()+4 > 6){
		$scope.day4 = weekday[date.getDay()+4-7]; 
	}else{
		$scope.day4 = weekday[date.getDay()+4];
	}

	if(date.getDay()+5 > 6){
		$scope.day5 = weekday[date.getDay()+5-7]; 
	}else{
		$scope.day5 = weekday[date.getDay()+5];
	}

	if(date.getDay()+6 > 6){
		$scope.day6 = weekday[date.getDay()+6-7]; 
	}else{
		$scope.day6 = weekday[date.getDay()+6];
	}

	if(date.getDay()+7 > 6){
		$scope.day7 = weekday[date.getDay()+7-7]; 
	}else{
		$scope.day7 = weekday[date.getDay()+7];
	}

	function cityfetch(){
		$http.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+$scope.cityID+"&types=geocode&key=AIzaSyA2FyNv1PAM55HTQWNruhOQ7ybP_GRMSso"
).then(function(response){
			$scope.cCity = response.data.predictions[0].description;
			$scope.placeid = response.data.predictions[0].place_id;
			placeDetail();
			
		})
	}
	

	function placeDetail(){
		$http.get("https://maps.googleapis.com/maps/api/place/details/json?placeid="+$scope.placeid+"&key=AIzaSyA2FyNv1PAM55HTQWNruhOQ7ybP_GRMSso"
).then(function(response){
			$scope.long = response.data.result.geometry.location.lng;
			$scope.lat = response.data.result.geometry.location.lat;	
			forecastfetch();
		})
	}

	function forecastfetch(){
		$http.get("https://api.forecast.io/forecast/61b25c733c8f1e3632d05ed4ff0f51d9/"+$scope.lat+","+$scope.long).then(function(response){
			$scope.currentTemp = response.data.currently.temperature; 
			$scope.currentSum = response.data.currently.summary;
			$scope.currentIcon = response.data.currently.icon;
			$scope.d1maxTemp = response.data.daily.data[0].temperatureMax
			$scope.d2maxTemp = response.data.daily.data[1].temperatureMax
			$scope.d3maxTemp = response.data.daily.data[2].temperatureMax
			$scope.d4maxTemp = response.data.daily.data[3].temperatureMax
			$scope.d5maxTemp = response.data.daily.data[4].temperatureMax
			$scope.d6maxTemp = response.data.daily.data[5].temperatureMax
			$scope.d7maxTemp = response.data.daily.data[6].temperatureMax 
			$scope.d1minTemp = response.data.daily.data[0].temperatureMin
			$scope.d2minTemp = response.data.daily.data[1].temperatureMin
			$scope.d3minTemp = response.data.daily.data[2].temperatureMin
			$scope.d4minTemp = response.data.daily.data[3].temperatureMin
			$scope.d5minTemp = response.data.daily.data[4].temperatureMin
			$scope.d6minTemp = response.data.daily.data[5].temperatureMin
			$scope.d7minTemp = response.data.daily.data[6].temperatureMin
			$scope.d1summary = response.data.daily.data[0].summary;
			$scope.d2summary = response.data.daily.data[1].summary;
			$scope.d3summary = response.data.daily.data[2].summary;
			$scope.d4summary = response.data.daily.data[3].summary;
			$scope.d5summary = response.data.daily.data[4].summary;
			$scope.d6summary = response.data.daily.data[5].summary;
			$scope.d7summary = response.data.daily.data[6].summary;

		})
	}
});