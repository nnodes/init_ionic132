angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.routes',
  'starter.services',
  'starter.constants',
  'starter.directives',
  'starter.filters',
  'ngCordova',
  'ngResource'
])

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.backButton.text('');
  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.views.swipeBackEnabled(false);
  $ionicConfigProvider.platform.android.scrolling.jsScrolling(true);
})

.run(function($ionicPlatform, $http, API, TOKENS) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    if (navigator && navigator.splashscreen) {
      navigator.splashscreen.hide();
    }
  });

  $http.defaults.headers.common['X-API-KEY'] = API.token;
  var local_token = window.localStorage.getItem(TOKENS.localToken);
  if(local_token) {
    $http.defaults.headers.common['X-Auth-Token'] = local_token;
  }
})
;
