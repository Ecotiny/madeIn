window.fbAsyncInit = function() {
	FB.init({
	  appId      : '562137460651599',
	  cookie     : true,
	  xfbml      : true,
	  version    : 'v2.8'
	});
	FB.AppEvents.logPageView();   
	FB.getLoginStatus(function(response) {
	    statusChangeCallback(response);
	});
      };
      
      function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
        var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:3000/api/tokensignin');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send('idtoken=' + id_token);
	if (xhr.responseText['Registered'] === true) {
	  console.log("This user has been registered");
	  window.location = "http://localhost:3000";
	  createCookie("id_token", id_token)
	} else if (xhr.responseText.length === 0) {
	  console.log("Authenticated");
	  window.location = "http://localhost:3000";
	  createCookie("id_token", id_token)
	} else {
	  alert("Error in authentication");
	}
      };
      function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
	  eraseCookie("id_token");
          console.log('User signed out.');
          window.location = "http://localhost:3000";
	});
      }
      (function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      function checkLoginState() {
	FB.getLoginStatus(function(response) {
	if (response.status === 'connected') {
	  // the user is logged in and has authenticated your
	  // app, and response.authResponse supplies
	  // the user's ID, a valid access token, a signed
	  // request, and the time the access token 
	  // and signed request each expire
	  var uid = response.authResponse.userID;
	  var accessToken = response.authResponse.accessToken;
	  console.log("in");
	} else if (response.status === 'not_authorized') {
	  // the user is logged in to Facebook, 
	  console.log("sorta");
// 	  // but has not authenticated your app
	} else {
	  // the user isn't logged in to Facebook.
	  console.log("nope");
	}
	});
      }
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
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