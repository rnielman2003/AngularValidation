var myapp = angular.module('myapp', []);
myapp.controller('showCrtl', function ($scope) {
  $scope.people = [{
    id: 1,
    first: 'John',
    last: 'Rambo',
    actor: 'Silvester'
  }, {
    id: 2,
    first: 'Rocky',
    last: 'Balboa',
    actor: 'Silvester'
  }, {
    id: 3,
    first: 'John',
    last: 'Kimble',
    actor: 'Arnold'
  }, {
    id: 4,
    first: 'Ben',
    last: 'Richards',
    actor: 'Arnold'
  }];
  
  $scope.hasError = function(field, validation) {
    if (validation) {
    	console.log($scope.theForm);
    	//console.log($scope.theForm[field].$dirty);
//console.log($scope.theForm[field].$error[validation]);
      //console.log($scope.theForm[field].$dirty && $scope.theForm[field].$error[validation]);
console.log($scope.theForm.$submitted);

      return ($scope.theForm[field].$dirty && $scope.theForm[field].$error[validation]) || ($scope.theForm.$submitted && $scope.theForm[field].$error[validation]);
    }
    console.log('notvalidation', $scope.theForm[field].$dirty && $scope.theForm[field].$invalid) || ($scope.theForm.$submitted && $scope.theForm[field].$invalid);
    return ($scope.theForm[field].$dirty && $scope.theForm[field].$invalid) || ($scope.theForm.$submitted && $scope.theForm[field].$invalid);
  };

  $scope.submitForm = function(newForm) {
    if ($scope.theForm.$invalid) {
      return;
    }
    alert('form submitted no errors');
  }
});

(function () {
    myapp
     .directive('formSetFocus', function () {
         return {
             restrict: 'A',
             link: function (scope, elem) {

                 // set up event handler on the form element
                 elem.on('submit', function () {

                     //Finds y value of given object
                     function findPos(obj) {
                         var curtop = 0;
                         if (obj.offsetParent) {
                             do {
                                 curtop += obj.offsetTop;
                             } while (obj = obj.offsetParent);
                             return [curtop];
                         }
                     }

                     // find the first invalid element
                     var firstInvalid = elem[0].querySelector('.ng-invalid');

                     // if we find one, set focus
                     if (firstInvalid) {
                         firstInvalid.focus();
                         window.scrollTo(0, findPos(firstInvalid)-40);
                     }
                 });
             }
         };
     });
})();