angular.module('signup',['OwnerService'])
.controller('SignupCtrl',['$scope', '$http', '$location', '$window', 'Auth', function($scope, $http, $location, $window, Auth){
    
  $scope.signup = function(username, password){
    $scope.user = {
      username: username,
      password: password
    };
    console.log('testing for user in signup', $scope.user)
    Auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
    // $http({
    //   method: 'POST',
    //   url: '/login',
    //   data: $scope.user
    // }).then(function(res){
    //   $window.localStorage.setItem('puppylove.login', res.data.token);
    //   $location.path('/home')
    // })
    // .catch(function(error){
    //   console.log(error)
    // });
    $scope.username = '';
    $scope.password = '';
  };
}])