'use strict';

angular.module('angularSimpleApp')
  .controller('AccCtrl', function ($scope,$http,geneNameFilterFilter,marksCountFilterFilter,tssFilterFilter) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  $scope.oneAtATime = false;
  $scope.isopen = true;
  $scope.isopen1 = true;
  
  var allData;
  $http.get("data.json")
                  .success(function(data)
                    { 
                      allData=data;
                      //var filter = {Gene:'AA'};
                      $scope.Genes = geneNameFilterFilter(allData,$scope.filter);
                    });

  $scope.$watch('filter.Gene',function(newVal,oldVal,scope){
    $scope.Genes = geneNameFilterFilter(allData,$scope.filter);  
  });

  $scope.$watch('filter.MarksCount',function(newVal,oldVal,scope){
    $scope.Genes = marksCountFilterFilter(allData,$scope.filter);  
  });  

  $scope.$watch('filter.tssMarksCount',function(newVal,oldVal,scope){
    $scope.Genes = tssFilterFilter(allData,$scope.filter);  
  });


  $scope.$watch('filter.tssMarksDist',function(newVal,oldVal,scope){
    $scope.Genes = tssFilterFilter(allData,$scope.filter);  
  });



  // console.log($scope.Genes);

  });
