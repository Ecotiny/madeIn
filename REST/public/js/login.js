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
	  document.cookie = "id_token=" + id_token + "; path=/;"
	} else if (xhr.responseText.length === 0) {
	  console.log("Authenticated");
	  window.location = "http://localhost:3000";
	  document.cookie = "id_token=" + id_token + "; path=/;"
	} else {
	  alert("Error in authentication");
	}
      };
      function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
	  console.log('User signed out.');
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