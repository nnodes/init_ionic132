angular.module('starter.constants', [])

.constant('API', {
  // url: 'http://starter.nnodes.com/api/',
  url: 'http://localhost:3000/api/',
  version: 'v1',
  token: '836ed3a72c75b1e2b06ca755adefd382f5faf3a',
  current: function(){
    return this.url + this.version;
  }
})
.constant('DEFAULT_STATES', {
  authenticatedRoot: 'app.user.profile',
  root: 'sessions.index'
})
.constant('TOKENS', {
  authKey: '_NnodesAuth',
  localToken: '_NnodesAuthMobile'
})
;
