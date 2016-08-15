angular.module('login',[])

  // the state will go on the html that you want route the user.

.controller('LoginCtrl',['$scope', '$http', 'Auth' ,'$location', '$window', function($scope, $http, $location, $window){
    
  $scope.signin = function(username, password){

    $scope.user = {
      username: username,
      password: password
    };

    $http({
      method: 'POST',
      url: 'api/login',
      data: $scope.user
    }).then(function(res){
      $window.localStorage.setItem('puppylove.login', res.data.token);
      $location.path('/home')
    })
    .catch(function(error){
      console.log(error)
    });

    $scope.username = '';
    $scope.password = '';
  };

}])

