'use strict';
angular.module('angularSimpleApp')
  .controller('ModalzoomCtrl', function ($scope, $modal, $log) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
$scope.open = function (args) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      scope: $scope,
      windowClass: 'app-modal-window',
      resolve: {
        items: function () {
          return $scope.items;
        },
        gene: function(){
        	$scope.G0Gene = args.value.G0Gene;
          $scope.MTGene = args.value.MTGene;
          $scope.MBGene = args.value.MBGene;
          $scope.MCGene = args.value.MCGene;
          // $scope.regions = args.value.regions;
        	return $scope.genes;
        }
      }
    });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date() );
    });
  };
  $scope.$on("myEvent", function (event, args) {
      $scope.open(args);
  });
});
// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;

  // $scope.selected = {
  //   item: $scope.items[0]
  // };

  // $scope.ok = function () {
  //   $modalInstance.close($scope.selected.item);
  // };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  

};