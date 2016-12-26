angular.module('starter.services', [])
.service('AuthService', function($http, Users, API, TOKENS) {
  return {
    register: register,
    login: login,
    serverOauth: serverOauth,
    recoverPassword: recoverPassword,
    logout: logout,
    isAuthenticated: isAuthenticated,
    getUser: getUser
  };

  function register(firstName, lastName, email, password, passwordConfirm){
    return Users.register({user: {first_name: firstName, last_name: lastName,
      email : email, password: password, password_confirmation: passwordConfirm}})
      .$promise.then(function(response){
      storeUserCredentials(response);
    });
  }

  function login(email, password) {
    return Users.login({user: {email : email, password: password}}).$promise
    .then(function(response){
      storeUserCredentials(response);
    });
  }

  function serverOauth(access_token, device) {
    return Users.oauth({access_token : access_token, device: device}).$promise
    .then(function(response){
      storeUserCredentials(response);
    });
  }

  function recoverPassword(email) {
    return Users.recover({email: email});
  }

  function logout() {
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(TOKENS.authToken);
  }

  function isAuthenticated() {
    var authToken = window.localStorage.getItem(TOKENS.authToken);
    if(authToken){
      $http.defaults.headers.common['X-Auth-Token'] = authToken;
      return true;
    }
    return false;
  }

  function storeUserCredentials(userData) {
    window.localStorage.setItem(TOKENS.authToken, userData.mobile_token);
    $http.defaults.headers.common['X-Auth-Token'] = userData.mobile_token;
  }

  function getUser(){
    isAuthenticated();
    return Users.me();
  }

})
;
