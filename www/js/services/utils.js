angular.module('starter.services')
.service('Utils', function($ionicLoading, $ionicPopup) {
  return {
    setLoading: setLoading,
    setAlertPopup: setAlertPopup
  };

  function setLoading() {
    $ionicLoading.show({template: '<ion-spinner icon="dots" class="spinner-white"></ion-spinner>'});
  }

  function setAlertPopup(title, template) {
    $ionicPopup.alert({
      title: title,
      template: template,
      buttons: [{text: 'Ok', type: 'button-assertive'}]
    });
  }

})
;
