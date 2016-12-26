angular.module('starter.routes')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app.user', {
    url: "/user",
    abstract: true,
    views: {
      'tab-user': {
        template: '<ion-nav-view name="userContent"></ion-nav-view>'
      }
    }
  })
  .state('app.user.profile', {
    url: '/profile',
    views: {
      'userContent': {
        templateUrl: 'templates/user/me.html'
      }
    }
  })
  ;
});
