angular.module('starter.routes', ['starter.constants'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      controller: 'AppCtrl'
    })
    .state('sessions', {
      url: '',
      abstract: true,
      template: '<ion-nav-view name="sessionsContent"></ion-nav-view>',
      controller: 'SessionsCtrl'
    })
    .state('sessions.index', {
      url: '/login',
      views: {
        'sessionsContent': {
          templateUrl: 'templates/sessions/login.html'
        }
      }
    })
    ;

  $urlRouterProvider.when('/','/routes');
  $urlRouterProvider.when('', ['DEFAULT_STATES', '$state', 'AuthService',
  function (DEFAULT_STATES, $state, AuthService) {
    if(AuthService.isAuthenticated())
      $state.go(DEFAULT_STATES.authenticatedRoot);
    else
      $state.go(DEFAULT_STATES.root);
  }]);
  $urlRouterProvider.otherwise('/login');
});
