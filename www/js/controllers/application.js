angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicPopup, $ionicHistory,
  $timeout, $ionicTabsDelegate, AuthService, Users, DEFAULT_STATES) {

  $scope.tabSelectFix = tabSelectFix;
  $scope.goBack = goBack;
  $scope.confirmLogout = confirmLogout;

  $scope.user = AuthService.getUser();

  function tabSelectFix(index) {
    if(index == 0 && $state.current.name != 'app.user.profile')
      $ionicTabsDelegate.select(index);
    // else if(index == 1 && $state.current.name != 'state_tab_1')
    //   $ionicTabsDelegate.select(index);
  }

  function goBack() {
    $ionicHistory.goBack();
  }

  function confirmLogout() {
    $ionicPopup.confirm({
      title: 'Cerrar sesión',
      template: '¿Estás seguro que quieres cerrar sesión?',
      buttons: [{
        text: 'Cancelar',
        type: 'button-light',
        onTap: function(e) { return false; }
      }, {
        text: 'OK',
        type: 'button-assertive',
        onTap: function(e) { return logout(); }
      }]
    });
  }

  function logout() {
    AuthService.logout();
    $state.go(DEFAULT_STATES.root);
    clearCache();
  }

  function clearCache() {
    $timeout(function () {
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
    }, 1500);
  }

});
