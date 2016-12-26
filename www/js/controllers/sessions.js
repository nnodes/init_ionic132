angular.module('starter.controllers')

.controller('SessionsCtrl', function($scope, $state, $ionicModal, $ionicLoading,
  AuthService, Utils, DEFAULT_STATES) {

  $scope.data = {};

  $scope.register = register;
  $scope.login = login;
  $scope.fbLogin = fbLogin;
  $scope.recover = recover;
  $scope.openRegister = openRegister;
  $scope.openRecover = openRecover;

  function register(data) {
    if (this.registerForm.$valid) {
      Utils.setLoading();
      AuthService.register(data.firstName, data.lastName, data.email, data.password, data.passwordConfirm)
      .then(function() {
        $ionicLoading.hide();
        $state.go(DEFAULT_STATES.authenticatedRoot, {}, {reload: true})
        .then(function () {
          $scope.registerModal.remove();
        });
      }, function(error) {
        $ionicLoading.hide();
        Utils.setAlertPopup('Error en el registro', error.data.email[0]);
      });
    }
  }

  function login(data) {
    if (this.loginForm.$valid) {
      Utils.setLoading();
      AuthService.login(data.email, data.password).then(function() {
        $ionicLoading.hide();
        $state.go(DEFAULT_STATES.authenticatedRoot, {}, {reload: true});
      }, function(error) {
        $ionicLoading.hide();
        Utils.setAlertPopup('Error al iniciar sesión', error.data.error);
      });
    }
  }

  function fbLogin() {
    facebookConnectPlugin.login(["public_profile", "email"], function(response){
      console.log(response);
      if (response.status === 'connected') {
        Utils.setLoading();
        AuthService.serverOauth(response.authResponse.accessToken, "facebook")
        .then(function(){
          $ionicLoading.hide();
          $state.go(DEFAULT_STATES.authenticatedRoot, {}, {reload: true})
          .then(function () {
            $scope.registerModal.remove();
          });
        }, function(){
          $ionicLoading.hide();
          Utils.setAlertPopup('Error al iniciar sesión', 'Verificar credenciales.');
        })
      }
      else {
        Utils.setAlertPopup('Error al iniciar sesión',
                            'Debe ingresar con Facebook y autorizar la aplicación.');
      }
    }, function(){
      Utils.setAlertPopup('Facebook ha entregado un error', 'Intente nuevamente.');
    });
  }

  function recover(data) {
    Utils.setLoading();
    AuthService.recoverPassword(data.email).$promise.then(function(res){
      Utils.setAlertPopup('Revisar correo electrónico', res.success);
      $scope.recoverModal.remove();
      $ionicLoading.hide();
    }, function(error){
      $ionicLoading.hide();

      Utils.setAlertPopup('Error al recuperar contraseña.', error.data.error);
    });
  }

  function openRegister() {
    $ionicModal.fromTemplateUrl('templates/sessions/register.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.registerModal = modal;
      $scope.registerModal.show();
    });
  }

  function openRecover() {
    $ionicModal.fromTemplateUrl('templates/sessions/recover.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.recoverModal = modal;
      $scope.recoverModal.show();
    });
  }

});
