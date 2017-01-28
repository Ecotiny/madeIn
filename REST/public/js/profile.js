angular.module('profile', ['ngSanitize'])

	.controller('notMain', function($scope, $http) {
	  console.log(readCookie("id_token"));
	  var objlvl;
	  if (readCookie("id_token")) {
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open("GET", 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + readCookie("id_token"), false); // true for asynchronous 
	    xmlHttp.send(null);
	    eval('var obj='+xmlHttp.responseText);
	    $scope.login = "<a href='profile.html'>" + obj.name + "</a>";
	    $scope.nameOfUser = obj.name;
	    $scope.imageofprofile = "<img src='" + obj.picture + "' style='position:relative; left:46%; right:46%; border-radius: 25px; width:8%; height: 16%; border:3px;' />";
	    console.log($scope.imageofprofile);
	    console.log(obj.picture)
	    var xmlRequestLevel = new XMLHttpRequest();
	    xmlRequestLevel.open("GET", 'http://localhost:3000/api/user/level:' + obj.email, false); // true for asynchronous 
	    xmlRequestLevel.send(null);
	    eval('objlvl='+xmlRequestLevel.responseText);
	    if (objlvl === 0) {
	      $scope.level = "User: No contributions"
	    } else if (objlvl => 1 && objlvl < 20) {
	      $scope.level = "Level 1: " + objlvl + " contributions"
	    } else if (objlvl => 20 && objlvl < 50) {
	      $scope.level = "Level 2: " + objlvl + " contributions" 
	    } else if (objlvl => 100 && objlvl < 250 ) {
	      $scope.level = "Level 3: " + objlvl + " contributions"
	    } else if (objlvl => 250 && objlvl < 500) {
	      $scope.level = "Level 4: " + objlvl + " contributions"
	    } else if (objlvl => 500) {
	      $scope.level = "Level 5: " + objlvl + " contributions"
	    }
	  } else {
	    alert("dis shiz is fking trash dawg");
	  }
	  console.log($scope.login);
});
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}