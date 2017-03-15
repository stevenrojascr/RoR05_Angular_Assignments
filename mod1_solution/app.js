(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController );

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.message = "";
  $scope.calculate = function () {
    if ($scope.list) {
      var len = lengthListWithoutBlanks($scope.list);
      if (len > 3) {
        $scope.message = "Too much!";
      }else{
        $scope.message = "Enjoy!";
      }
    } else {
      $scope.message = "Please enter data first";
    }
  };
}

function lengthListWithoutBlanks(s) {
  var array = s.split(',');
  var l = array.length
  for (var x in array){
    if (array[x].trim().length === 0) {
      l -= 1;
    }
  }
  return l
}

})();
