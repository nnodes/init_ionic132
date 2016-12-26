angular.module('starter.services')
.factory('Users', ['$resource', 'API',  function($resource, API) {
  return $resource(API.current() + '/users/:id', null,
  {
    'register': {
      method: 'POST',
      url: API.current() + '/users/register'
    },
    'login': {
      method: 'POST',
      url: API.current() + '/users/login'
    },
    'oauth': {
      method: 'POST',
      url: API.current() + '/users/oauth'
    },
    'recover': {
      method: 'POST',
      url: API.current() + '/users/create_password'
    },
    'me': {
      method: 'GET',
      url: API.current() + '/users/me'
    }
  });
}]);
