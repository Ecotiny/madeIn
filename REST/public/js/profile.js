angular.module('profile', ['ngSanitize'])

	.controller('notMain', function($scope, $http) {
	  console.log(readCookie("id_token"));
	  if (readCookie("id_token")) {
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open("GET", 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + readCookie("id_token"), false); // true for asynchronous 
	    xmlHttp.send(null);
	    eval('obj='+xmlHttp.responseText);
	    $scope.login = "<a href='profile.html'>" + obj.name + "</a>";
	    $scope.nameOfUser = obj.name;
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