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
  


  $scope.submitForm = function(newForm) {
    if ($scope.theForm.$invalid) {
      return;
    }
    alert('form submitted no errors');
  }
});


myapp.directive('formSetFocus', function () {
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

myapp.directive('popErrorMessage', [

    function () {
        
        return {
            restrict: "EA",
            replace: false,
            transclude: false,
            require: 'ngModel',
            
            link: function (scope, element, attrs, controller) {
                var wrapper = angular.element('<div class="formFieldsWrapper inline"></div>');
                var errorDiv = angular.element('<span class="validationMessage"></span>');
                //get list of attrs
                var attributes = scope.$eval(attrs.popErrorMessage);       
                element.wrap(wrapper);
                element.after(errorDiv);
                //append txt set to this
                element.next().html(attributes.txt);
                //set the width
                element.next().css('width', attributes.width);
                scope.inputCtrl = controller;
                scope.$watch('inputCtrl.$valid', function(newVal, oldVal) {
                    if (newVal === true) {
                        element.next().addClass('hideMe');
                    } else {
                        element.next().removeClass('hideMe');
                    }
                });
            }
        };
    }
]);

