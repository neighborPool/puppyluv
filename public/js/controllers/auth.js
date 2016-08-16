angular.module('login',[])

  // the state will go on the html that you want route the user.

.controller('LoginCtrl',['$scope', '$http', 'Auth' ,'$location', '$window', function($scope, $http, Auth ,$location, $window){
    
  $scope.signin = function(username, password){

    $scope.user = {
      username: username,
      password: password
    };

    Auth.logIn($scope.user)

    $scope.username = '';
    $scope.password = '';
  };

}])

