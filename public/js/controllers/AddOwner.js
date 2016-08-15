//declare your new module
angular.module('AddOwnerController', ['OwnerService'])
//add and label the controller
.controller('AddOwner',['$scope', '$http', 'Owner', '$routeParams', function($scope, $http, Owner, $routeParams) {

  // empty object will contain user data
  $scope.owner = {}
  $scope.message = '';


// Edit user profile 
  $scope.editUser = function(){
    var user = $routeParams.id;
    console.log('owner object', $scope.owner)
    $http.put('api/owners', $scope.owner).success(function(data){
      console.log('Your profile has been updated.')
    })
    // clear all inputs below
  };

  $scope.addADoggie = false;
  $scope.showDogForm = function(){
      $scope.addADoggie = true;
  }
// Add a new dog
  $scope.addDog = function(){
    console.log('owner object', $scope.dog)
    // $scope.user = Owner.getOwner($routeParams.id);

    // if($scope.dog.name === '') { return; }
    // Owner.addDog($scope.user._id, $scope.dog)
    //   .success(function(dog) {
    //     $scope.user.dogs.push(dog);
    //   });
   // Clear inputs below 
    $scope.addADoggie = false;
  };





}]);