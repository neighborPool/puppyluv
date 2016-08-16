angular.module('OwnerService', [])

.factory('Owner', ['$http', '$routeParams', function($http, $routeParams) {

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
    // call to DELETE an owner
    delete : function(id) {
      return $http.delete('/api/owners/' + id);
    },

    addDog: function(id, dog){
      return $http.post('/api/owners/' + id + '/dogs', dog)
    },
    getOwner: function(id){
      return $http.get('/posts/' + id).then(function(res){
        return res.data;
      });
    },
    addComment: function(ownerData, toId, fromId){
      return $http.put('/api/owners/' + toId + '/messages',  ownerData) && $http.put('/api/owners/' + fromId + '/messages',  ownerData)
    }
  }       

}])
// auth factory
.factory('Auth', ['$http', '$window', function($http, $window){
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
    console.log('in the factory', user)
    return $http.post('/api/signup', user).success(function(data){
      auth.saveToken(data.token);
    });
  };
  auth.logIn = function(user){
    return $http.post('/api/login', user).success(function(data){
      auth.saveToken(data.token);
    });
  };
  auth.logOut = function(){
    $window.localStorage.removeItem('puppyluv-token');
  };
  return auth;
}])