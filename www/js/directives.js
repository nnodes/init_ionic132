angular.module('starter.directives', [])

.directive('passwordVerify', function() {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, elem, attrs, ngModel) {
      ngModel.$validators.noMatch = function(modelValue, viewValue) {
        return viewValue === scope.$eval(attrs.passwordVerify);
      };
    }
  };
})

;
