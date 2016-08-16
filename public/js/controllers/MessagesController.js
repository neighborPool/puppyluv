//declare your new module
angular.module('MessagesController', ['OwnerService'])
//add and label the controller
.controller('MsgCtrl', function($scope, $http, Owner) {
  $scope.id = '57aa4d5e4b31c711003c7621';
  $scope.fromId = '57b13554a6b7c011000acac2';
  // empty object will contain user data
  $scope.msg = {
    from: $scope.fromId,
    to: $scope.id,
    time:  Date.now ,
    msg: "I think puppy love is super awesome!"
};

  $scope.submitMsg = function(){
    Owner.addComment( $scope.msg, $scope.id, $scope.fromId)
    
    .success(function(){
      console.log('Message Added!')
    })
    
    .error(function(error){
      console.error('**** ERROR ****', error);
    });
  }
  $scope.submitMsg();
});