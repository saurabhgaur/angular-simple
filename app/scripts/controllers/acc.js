'use strict';
angular.module('angularSimpleApp')
  .controller('AccCtrl', function ($scope,$http,geneNameFilterFilter,marksCountFilterFilter,tssFilterFilter,patternFilterFilter) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  $scope.cellTypes = [
      {name:'',value:''},
      {name:'G0', value:'G0'},
      {name:'MT', value:'MT'},
      {name:'MB', value:'MB'},
      {name:'MC', value:'MC'}
    ];

  $scope.patterns = [
      {name:'',value:''},
      {name:'G0BiValents', value:'G0BiValents'},
      {name:'G0Pattern1', value:'G0Pattern1'},
      {name:'G0Active', value:'G0Active'},
      {name:'G0Repressive', value:'G0Repressive'},
    ];

  $scope.operators = [
    {name:"=", value:"="},
    {name:"<", value:"<"},
    {name:"<=", value:"<="},
    {name:">", value:">"},
    {name:">=", value:">="},
    ];
  $scope.oneAtATime = false;
  $scope.isopen = true;
  $scope.isopen1 = true;
  var allG0Data;
  var allMTData;
  var allMBData;
  var allMCData;
//   var allRegionsData;

// var regionsPromise = $http.get("regions.json")
//                   .success(function(data)
//                     { 
//                       allRegionsData=data;
//                       $scope.regions = geneNameFilterFilter(allRegionsData,$scope.filter);
//                     });
var allGenesData;
var allRegionsData;
var allGenesBedData;
var exonsRawData;
var exonsJSON;
var G0RawData;
var G0JSON;

var MBRawData;
var MBJSON;

var MCRawData;
var MCJSON;

var MTRawData;
var MTJSON;

var allG0BiValentData;
var G0BiValentRawData;
var G0BiValentJSON;

var allG0Pattern1Data;
var G0Pattern1RawData;
var G0Pattern1JSON;

var allG0ActiveData;
var G0ActiveRawData;
var G0ActiveJSON;

var allG0RepressiveData;
var G0RepressiveRawData;
var G0RepressiveJSON;


// var numFilteredGenes;

$scope.collapsedFilter = false;
$scope.collapsedVisualization = true;
$scope.showG0 = true;
$scope.showMT = true;
$scope.showMB = true;
$scope.showMC = true;


var exonsFile = $http.get("data/exons_input_221014.tsv")
                  .success(function(data)
                    {   
                      exonsRawData = d3.tsv.parse(data);
                      exonsJSON = d3.nest()
                        .key(function(d) { return d.Gene; })
                        .map(exonsRawData);
                      var G0File = $http.get("data/G0_input_211014.tsv")
                                        .success(function(data)
                                          {   
                                            G0RawData = d3.tsv.parse(data);
                                            var combinedData = G0RawData.concat(exonsRawData);
                                            G0JSON = d3.nest()
                                              .key(function(d) { return d.Gene; })
                                              .map(combinedData);
                                            allG0Data = G0JSON;
                                            $scope.Genes = geneNameFilterFilter(allG0Data,$scope.filter);
                                            $scope.numTotalGenes = _.keys(allG0Data).length;
                                            $scope.numFilteredGenes = _.keys(allG0Data).length;
                                          });

                      var MBFile = $http.get("data/MB_input_211014.tsv")
                                        .success(function(data)
                                          {   
                                            MBRawData = d3.tsv.parse(data);
                                            var combinedData = MBRawData.concat(exonsRawData);
                                            MBJSON = d3.nest()
                                              .key(function(d) { return d.Gene; })
                                              .map(combinedData);
                                            allMBData = MBJSON;
                                            $scope.MBGenes = geneNameFilterFilter(allMBData,$scope.filter);
                                          });

                      var MCFile = $http.get("data/MC_input_211014.tsv")
                                        .success(function(data)
                                          {   
                                            MCRawData = d3.tsv.parse(data);
                                            var combinedData = MCRawData.concat(exonsRawData);
                                            MCJSON = d3.nest()
                                              .key(function(d) { return d.Gene; })
                                              .map(combinedData);
                                            allMCData = MCJSON;
                                            $scope.MCGenes = geneNameFilterFilter(allMCData,$scope.filter);
                                          });

                      var MTFile = $http.get("data/MT_input_211014.tsv")
                                        .success(function(data)
                                          {   
                                            MTRawData = d3.tsv.parse(data);
                                            var combinedData = MTRawData.concat(exonsRawData);
                                            MTJSON = d3.nest()
                                              .key(function(d) { return d.Gene; })
                                              .map(combinedData);
                                            allMTData = MTJSON;
                                            $scope.MTGenes = geneNameFilterFilter(allMTData,$scope.filter);
                                          });
                      var regionsBedFile = $http.get("data/371_Regions.bed")
                                        .success(function(data)
                                          { 
                                            allRegionsData = data;
                                            $scope.regions = allRegionsData;
                                          });
                      var genesBedFile = $http.get("data/371_Genes.bed")
                                        .success(function(data)
                                          {   
                                            allGenesBedData = data;
                                            $scope.rawGenes = d3.tsv.parseRows(allGenesBedData);
                                          });
                      var G0BiValentFile = $http.get("data/G0_bivalent_input_new.tsv")
                                        .success(function(data)
                                          {   
                                            G0BiValentRawData = d3.tsv.parse(data);
                                            G0BiValentJSON = d3.nest()
                                                                .key(function(d) {return d.Gene; })
                                                                .key(function(d) {return d.PairID; })
                                                                .rollup(function(d) 
                                                                    {return {
                                                                        "minimum":d3.min(d, function(g) {return g.RegionStart; }),
                                                                        "maximum":d3.max(d, function(g) {return g.RegionStop; })
                                                                        };})
                                                                .map(G0BiValentRawData);
                                            allG0BiValentData = G0BiValentJSON;
                                            $scope.G0BiValentGenes = geneNameFilterFilter(allG0BiValentData,$scope.filter);
                                          });
                      var G0Pattern1File = $http.get("data/G0_pattern1_input_new.tsv")
                                        .success(function(data)
                                          {   
                                            G0Pattern1RawData = d3.tsv.parse(data);
                                            G0Pattern1JSON = d3.nest()
                                                                .key(function(d) {return d.Gene; })
                                                                .key(function(d) {return d.PairID; })
                                                                .rollup(function(d) 
                                                                    {return {
                                                                        "minimum":d3.min(d, function(g) {return g.RegionStart; }),
                                                                        "maximum":d3.max(d, function(g) {return g.RegionStop; })
                                                                        };})
                                              .map(G0Pattern1RawData);
                                            allG0Pattern1Data = G0Pattern1JSON;
                                            $scope.G0Pattern1Genes = geneNameFilterFilter(allG0Pattern1Data,$scope.filter);
                                          });
                      var G0ActiveFile = $http.get("data/G0_active_input_new.tsv")
                                        .success(function(data)
                                          {   
                                            G0ActiveRawData = d3.tsv.parse(data);
                                            G0ActiveJSON = d3.nest()
                                                                .key(function(d) {return d.Gene; })
                                                                .key(function(d) {return d.PairID; })
                                                                .rollup(function(d) 
                                                                    {return {
                                                                        "minimum":d3.min(d, function(g) {return g.RegionStart; }),
                                                                        "maximum":d3.max(d, function(g) {return g.RegionStop; })
                                                                        };})
                                              .map(G0ActiveRawData);
                                            allG0ActiveData = G0ActiveJSON;
                                            $scope.G0ActiveGenes = geneNameFilterFilter(allG0ActiveData,$scope.filter);
                                          });
                      var G0RepressiveFile = $http.get("data/G0_repressive_input_new.tsv")
                                        .success(function(data)
                                          {   
                                            G0RepressiveRawData = d3.tsv.parse(data);
                                            G0RepressiveJSON = d3.nest()
                                                                .key(function(d) {return d.Gene; })
                                                                .key(function(d) {return d.PairID; })
                                                                .rollup(function(d) 
                                                                    {return {
                                                                        "minimum":d3.min(d, function(g) {return g.RegionStart; }),
                                                                        "maximum":d3.max(d, function(g) {return g.RegionStop; })
                                                                        };})
                                              .map(G0RepressiveRawData);
                                            allG0RepressiveData = G0RepressiveJSON;
                                            $scope.G0RepressiveGenes = geneNameFilterFilter(allG0RepressiveData,$scope.filter);
                                          });
                    });

// var G0GenesPromise = $http.get("G0_data_2014_10_22.json")
//                   .success(function(data)
//                     { 
//                       // _.each(_.difference(_.keys(allRegionsData),_.keys(data)),
//                       //   function(element,index,list){
//                       //     var gene = {"Gene":element,
//                       //                 "Mark":"AB6_G0",
//                       //                 "RegionStart":0,
//                       //                 "RegionStop":0,
//                       //                 "GeneStart":0,
//                       //                 "GeneStop":allRegionsData[element][0].Length
//                       //               }; 
//                       //     data[element]=[gene];
//                       //   });
//                       allG0Data=data;
//                       $scope.Genes = geneNameFilterFilter(allG0Data,$scope.filter);
//                     });

// var MTGenesPromise = $http.get("MT_data_2014_10_22.json")
//                   .success(function(data)
//                     { 
//                       // _.each(_.difference(_.keys(allRegionsData),_.keys(data)),
//                       //   function(element,index,list){
//                       //     var gene = {"Gene":element,
//                       //                 "Mark":"AB6_MT",
//                       //                 "RegionStart":0,
//                       //                 "RegionStop":0,
//                       //                 "GeneStart":0,
//                       //                 "GeneStop":allRegionsData[element][0].Length
//                       //               }; 
//                       //     data[element]=[gene];
//                       //   });
//                       allMTData=data;
//                       $scope.MTGenes = geneNameFilterFilter(allMTData,$scope.filter);
//                     });

// var MBGenesPromise = $http.get("MB_data_2014_10_22.json")
//                   .success(function(data)
//                     { 
//                       // _.each(_.difference(_.keys(allRegionsData),_.keys(data)),
//                       //   function(element,index,list){
//                       //     var gene = {"Gene":element,
//                       //                 "Mark":"AB6_MB",
//                       //                 "RegionStart":0,
//                       //                 "RegionStop":0,
//                       //                 "GeneStart":0,
//                       //                 "GeneStop":allRegionsData[element][0].Length
//                       //               }; 
//                       //     data[element]=[gene];
//                       //   });
//                       allMBData=data;
//                       $scope.MBGenes = geneNameFilterFilter(allMBData,$scope.filter);
//                     });

// var MCGenesPromise = $http.get("MC_data_2014_10_22.json")
//                   .success(function(data)
//                     { 
//                       // _.each(_.difference(_.keys(allRegionsData),_.keys(data)),
//                       //   function(element,index,list){
//                       //     var gene = {"Gene":element,
//                       //                 "Mark":"AB6_MC",
//                       //                 "RegionStart":0,
//                       //                 "RegionStop":0,
//                       //                 "GeneStart":0,
//                       //                 "GeneStop":allRegionsData[element][0].Length
//                       //               }; 
//                       //     data[element]=[gene];
//                       //   });
//                       allMCData=data;
//                       $scope.MCGenes = geneNameFilterFilter(allMCData,$scope.filter);
//                     });

  $scope.$watch('filter.Gene',function(newVal,oldVal,scope){
    $scope.Genes = geneNameFilterFilter(allG0Data,$scope.filter);  
    $scope.MTGenes = geneNameFilterFilter(allMTData,$scope.filter);  
    $scope.MBGenes = geneNameFilterFilter(allMBData,$scope.filter);  
    $scope.MCGenes = geneNameFilterFilter(allMCData,$scope.filter);
    $scope.numFilteredGenes = _.keys($scope.Genes).length; 
  });

  $scope.$watch('filter.allowPartials',function(newVal,oldVal,scope){
    $scope.Genes = geneNameFilterFilter(allG0Data,$scope.filter);  
    $scope.MTGenes = geneNameFilterFilter(allMTData,$scope.filter);  
    $scope.MBGenes = geneNameFilterFilter(allMBData,$scope.filter);  
    $scope.MCGenes = geneNameFilterFilter(allMCData,$scope.filter);
    $scope.numFilteredGenes = _.keys($scope.Genes).length; 
  });

  $scope.$watch('filter.selectedPattern',function(newVal,oldVal,scope){
    filterPatternValues(patternFilterFilter,$scope.filter); 
  });

  $scope.$watch('filter.selectedOperator',function(newVal,oldVal,scope){
    filterValues(marksCountFilterFilter,$scope.filter);
  });

  $scope.$watch('filter.MarksCount',function(newVal,oldVal,scope){
    filterValues(marksCountFilterFilter,$scope.filter);
  });  

  $scope.$watch('filter.tssMarksCount',function(newVal,oldVal,scope){
    filterValues(tssFilterFilter,$scope.filter);  
  });

  $scope.$watch('filter.tssMarksDist',function(newVal,oldVal,scope){
    filterValues(tssFilterFilter,$scope.filter); 
  });  



  $scope.$watch('myCellType.name',function(newVal,oldVal,scope){
   if ($scope.myCellType) {
    $scope.myCellType.name == "G0"? $scope.G0Color = "rgb(235,245,250)":$scope.G0Color = "white";
     
    $scope.myCellType.name == "MT"? $scope.MTColor = "rgb(235,245,250)":$scope.MTColor = "white";
     
    $scope.myCellType.name == "MB"? $scope.MBColor = "rgb(235,245,250)":$scope.MBColor = "white";
    
    $scope.myCellType.name == "MC"? $scope.MCColor = "rgb(235,245,250)":$scope.MCColor = "white";
   };  
  });


  $scope.openModal = function (geneGroup) {
        var selectedGeneName = geneGroup[0].Gene;
        var selectedPatternName 
        if ($scope.filter && $scope.filter.selectedPattern) {selectedPatternName= $scope.filter.selectedPattern.name};
        var genes = new Object();
        genes.selectedGeneName = selectedGeneName;
        genes.rawGeneData = $scope.rawGenes.filter(function(d){return d[3]==selectedGeneName;});
        genes.G0Gene = $scope.Genes[selectedGeneName];
        genes.MTGene = $scope.MTGenes[selectedGeneName];
        genes.MBGene = $scope.MBGenes[selectedGeneName];
        genes.MCGene = $scope.MCGenes[selectedGeneName];
        if (selectedPatternName) {
          $scope.patternsMap = {G0BiValents:$scope.G0BiValentGenes,G0Pattern1:$scope.G0Pattern1Genes,G0Active:$scope.G0ActiveGenes,G0Repressive:$scope.G0RepressiveGenes};
          var selectedPatterns = $scope.patternsMap[selectedPatternName];
          genes.selectedPatternsForGene = selectedPatterns[selectedGeneName];

        };

        genes.G0Pattern = $scope.G0BiValentGenes[selectedGeneName];
        // genes.regions = regions;
        $scope.$root.$broadcast("myEvent", {
            value: genes
        });
    };

  // console.log($scope.Genes);

  function filterValues(filterFunction, filter){
    $scope.cellTypesMap = {G0:allG0Data,MT:allMTData,MB:allMBData,MC:allMCData};
    var selectedCellTypeName;
    if ($scope.myCellType) {
      selectedCellTypeName = $scope.myCellType.name; 
      var selectedCellType = $scope.cellTypesMap[selectedCellTypeName];
      var filteredGenes = filterFunction(selectedCellType,filter);
      var filteredKeys = _.keys(filteredGenes);

      $scope.Genes   = _.pick(allG0Data,filteredKeys);  
      $scope.MTGenes = _.pick(allMTData,filteredKeys);  
      $scope.MBGenes = _.pick(allMBData,filteredKeys);  
      $scope.MCGenes = _.pick(allMCData,filteredKeys);
      $scope.numFilteredGenes = filteredKeys.length; 

    };
  };

  function filterPatternValues(filterFunction, filter){
    $scope.patternsMap = {G0BiValents:$scope.G0BiValentGenes,G0Pattern1:$scope.G0Pattern1Genes,G0Active:$scope.G0ActiveGenes,G0Repressive:$scope.G0RepressiveGenes};
    var selectedCellTypeName;
    if ($scope.myCellType) {
      selectedCellTypeName = $scope.myCellType.name; 
      //var selectedCellType = $scope.cellTypesMap[selectedCellTypeName];
      // var filteredGenes = filterFunction(selectedCellType,filter,$scope.G0BiValentGenes);
      var filteredKeys = _.keys($scope.patternsMap[filter.selectedPattern.name]);
      if (filteredKeys && filteredKeys.length>0) {
        $scope.Genes   = _.pick(allG0Data,filteredKeys);  
        $scope.MTGenes = _.pick(allMTData,filteredKeys);  
        $scope.MBGenes = _.pick(allMBData,filteredKeys);  
        $scope.MCGenes = _.pick(allMCData,filteredKeys);
        $scope.numFilteredGenes =  filteredKeys.length; 
      }
      else{
        $scope.Genes   = allG0Data;  
        $scope.MTGenes = allMTData;  
        $scope.MBGenes = allMBData;  
        $scope.MCGenes = allMCData;
        $scope.numFilteredGenes = _.keys(allG0Data).length;
      };

     
    };
  };


  function drawLegend() {
      
    var width = 650,
    height = 30;

    var colorScale = d3.scale.category10();
    colorScale.domain(["H3K9me2", "H3K27me3", "H3K4me3", "H3K9ac","Exon"]);

      // add legend   
    var legend = d3.select("#legend").append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr('transform', 'translate(0,10)');    
     
    legend.selectAll('rect')
      .data(colorScale.domain())
      .enter()
      .append("rect")
      .attr("x", function(d, i){ return i * 100 + 80;})
      .attr("y",0)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function(d) { 
          var color = colorScale(d);
          return color;
        });
        
    legend.selectAll('text')
      .data(colorScale.domain())
      .enter()
      .append("text")
      .attr("x", function(d, i){ return i * 100 + 95;})
      .attr("y",10)
      .attr("fill",function(d,i) {return colorScale(d);})
      .text(function(d) {
        var text = d;
        return text;
      });

    legend.append("text")
      .text("Legend")
      .attr("x",10)
      .attr("y",10);
  };

 drawLegend();

  });





