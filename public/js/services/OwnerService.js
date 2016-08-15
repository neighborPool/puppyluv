angular.module('OwnerService', [])

.factory('Owner', ['$http', function($http) {

  return {
    // call to get all owners
    get : function() {
      return $http.get('/api/owners');
    },
    // call to create the owner
    create : function(ownerData) {
      return $http.post('/api/owners', ownerData);
    },
    // call to update an owner
    update: function(ownerData, id){
      return $http.put('/api/owners/57aa4d5e4b31c711003c7621', ownerData);
    },
    // call to DELETE a owner
    delete : function(id) {
      return $http.delete('/api/owners/' + id);
    }
  }       

}])
// auth factory
.factory('auth', ['$http', '$window', function($http, $window){
  var auth = {};
  auth.saveToken = function (token){
    $window.localStorage['puppyluv-token'] = token;
  };

  auth.getToken = function (){
    return $window.localStorage['puppyluv-token'];
  }

  auth.isLoggedIn = function(){
    var token = auth.getToken();

    if(token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.currentUser = function(){
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.username;
    }
  };

  auth.register = function(user){
    return $http.post('/register', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logIn = function(user){
    return $http.post('/login', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logOut = function(){
    $window.localStorage.removeItem('puppyluv-token');
  };

  return auth;
}])
