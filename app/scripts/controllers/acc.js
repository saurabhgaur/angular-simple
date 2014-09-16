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
  var allG0Data;
  var allMTData;
  var allMBData;
  var allMCData;
  var allRegionsData;

$http.get("regions.json")
                  .success(function(data)
                    { 
                      allRegionsData=data;
                      $scope.regions = geneNameFilterFilter(allRegionsData,$scope.filter);
                    });

$http.get("data.json")
                  .success(function(data)
                    { 
                      allG0Data=data;
                      $scope.Genes = geneNameFilterFilter(allG0Data,$scope.filter);
                    });

$http.get("mt_data.json")
                  .success(function(data)
                    { 
                      allMTData=data;
                      $scope.MTGenes = geneNameFilterFilter(allMTData,$scope.filter);
                    });

$http.get("mb_data.json")
                  .success(function(data)
                    { 
                      allMBData=data;
                      $scope.MBGenes = geneNameFilterFilter(allMBData,$scope.filter);
                    });

$http.get("mc_data.json")
                  .success(function(data)
                    { 
                      allMCData=data;
                      $scope.MCGenes = geneNameFilterFilter(allMCData,$scope.filter);
                    });

  // for (var i = 0; i < allRegionsData.length; i++) {
  //                     var selectedGeneName = allRegionsData[i][0].Gene;
  //                     sel
  //                   };

  $scope.$watch('filter.Gene',function(newVal,oldVal,scope){
    $scope.Genes = geneNameFilterFilter(allG0Data,$scope.filter);  
    $scope.MTGenes = geneNameFilterFilter(allMTData,$scope.filter);  
    $scope.MBGenes = geneNameFilterFilter(allMBData,$scope.filter);  
    $scope.MCGenes = geneNameFilterFilter(allMCData,$scope.filter);  
  });

  $scope.$watch('filter.MarksCount',function(newVal,oldVal,scope){
    $scope.Genes = marksCountFilterFilter(allG0Data,$scope.filter);  
    $scope.MTGenes = marksCountFilterFilter(allMTData,$scope.filter);  
    $scope.MBGenes = marksCountFilterFilter(allMBData,$scope.filter);  
    $scope.MCGenes = marksCountFilterFilter(allMCData,$scope.filter);  
  });  

  $scope.$watch('filter.tssMarksCount',function(newVal,oldVal,scope){
    $scope.Genes = tssFilterFilter(allG0Data,$scope.filter);  
    $scope.MTGenes = tssFilterFilter(allMTData,$scope.filter);  
    $scope.MBGenes = tssFilterFilter(allMBData,$scope.filter);  
    $scope.MCGenes = tssFilterFilter(allMCData,$scope.filter);  
  });


  $scope.$watch('filter.tssMarksDist',function(newVal,oldVal,scope){
    $scope.Genes = tssFilterFilter(allG0Data,$scope.filter);  
    $scope.MTGenes = tssFilterFilter(allMTData,$scope.filter);  
    $scope.MBGenes = tssFilterFilter(allMBData,$scope.filter);  
    $scope.MCGenes = tssFilterFilter(allMCData,$scope.filter);  
  });

  $scope.openModal = function (geneGroup) {
        var selectedGeneName = geneGroup[0].Gene;
        var G0Gene = $scope.Genes[selectedGeneName];
        var MTGene = $scope.MTGenes[selectedGeneName];
        var MBGene = $scope.MBGenes[selectedGeneName];
        var MCGene = $scope.MCGenes[selectedGeneName];
        var regions = $scope.regions[selectedGeneName];
        var genes = new Object();
        genes.G0Gene = G0Gene;
        genes.MTGene = MTGene;
        genes.MBGene = MBGene;
        genes.MCGene = MCGene;
        genes.regions = regions;
        $scope.$root.$broadcast("myEvent", {
            value: genes
        });
    };

  // console.log($scope.Genes);

  });

function drawLegend(dataset) {
    
    var width = 420,
    height = 80;

    // add legend   
    var legend = d3.select("#legend").append("svg")
        //.attr("x", w - 65)
        //.attr("y", 50)
  .attr("height", height)
  .attr("width", width)
  .append("g")
  .attr('transform', 'translate(0,10)');    
   
    legend.selectAll('rect')
      .data(dataset)
      .enter()
      .append("rect")
    .attr("x", function(d, i){ return i * 100 + 10;})
      .attr("y",20)
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", function(d) { 
        var color = colorScale(d);
        return color;
      });
      
    legend.selectAll('text')
      .data(dataset)
      .enter()
      .append("text")
  .attr("x", function(d, i){ return i * 100 + 25;})
      .attr("y",30)
  .attr("fill",function(d,i) {return colorScale(d);})
    .text(function(d) {
        var text = d;
        return text;
      });
}

