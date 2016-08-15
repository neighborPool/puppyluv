//declare your new module
angular.module('MessagesController', ['OwnerService'])
//add and label the controller
.controller('MsgCtrl', function($scope, $http, Owner) {
  $scope.id = '57aa4d5e4b31c711003c7621'
  // empty object will contain user data
  $scope.msg = {messages: [{
    from: "xyz",
    to: "kmn",
    time:  Date.now ,
    msg: "changed "
    
  }]
};

  $scope.submitMsg = function(){
    Owner.update( $scope.msg, $scope.id)
    
    .success(function(){
      console.log('Message Added!')
    })
    
    .error(function(error){
      console.error('**** ERROR ****', error);
    });
  }
  $scope.submitMsg();
});