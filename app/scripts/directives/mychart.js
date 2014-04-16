'use strict';

angular.module('angularSimpleApp')
  .directive('myChart', function () {
    return {
      scope:{data: '=geneData'},
      restrict: 'EA',
      transclude: true,
      link: function postLink(scope, element, attrs) {
        var width = 350,
		    height = 100,
		    barHeight = 10,
		    padding = 20,
		    availableHeight = height-padding,
		    marksRegionHeight = 0.5*availableHeight;

		var colorScale = d3.scale.category10();
		// domain = _.uniq(_.pluck(csv,"Mark")).sort();
		colorScale.domain(["Ab2_G0","Ab4_G0","Ab6_G0","Ab7_G0"]);

		/*var x = d3.scale.linear()
		    .domain([0, d3.max(data)])
		    .range([0, width]);*/

		var chartRoot =  d3.select(element[0]);

		var chart = chartRoot.append("svg")
		    .attr("width", width)
		    .attr("height",height);

		var geneX = d3.scale.linear()
            .domain([scope.data[0].TiledRegionStart,scope.data[0].TiledRegionStop])
            .range([10, width-10]);

		var geneY = d3.scale.ordinal()
		    .domain(['Ab2_G0','Ab4_G0','Ab6_G0','Ab7_G0'])
		    .range([0, 0.25*marksRegionHeight,0.5*marksRegionHeight,0.75*marksRegionHeight]);

		var bar = chart.selectAll("g")
			.data(scope.data)
			.enter().append("g")
			.attr("transform", function(d,i) {
			    return "translate("+ geneX(d.RegionStart)+"," + geneY(d.Mark) + ")"; 
			});


		bar.append("rect")
		.attr("width",function(d,i){return geneX(d.RegionStop)-geneX(d.RegionStart)})
		.attr("height", barHeight - 1)
		.style("fill", function(d, i) { return colorScale(d.Mark); });





		var tiledRegionBar = chart.append("g")
		.attr("transform", "translate("+geneX(scope.data[0].TiledRegionStart)+","+0.75*availableHeight+")");

		tiledRegionBar.append("rect")
		.attr("width",geneX(scope.data[0].TiledRegionStop) - geneX(scope.data[0].TiledRegionStart))
		.attr("height", barHeight/2)
		.style("fill","red");

		var geneBar = chart.append("g")
		.attr("transform", "translate("+geneX(scope.data[0].GeneStart)+","+0.75*availableHeight+")");

		geneBar.append("rect")
		.attr("width",geneX(scope.data[0].GeneStop) - geneX(scope.data[0].GeneStart))
		.attr("height", barHeight)
		.style("fill","black");

		var formatValue = d3.format(".2s");
		chart.append("g")
		    .attr("class", "axis")  //Assign "axis" class
		    .attr("transform", "translate(0," + (height - padding) + ")")
		    .call( d3.svg.axis()
			.scale(geneX)
			.orient("bottom")
			.ticks(5)
			.tickFormat(function(d) { return formatValue(d);})
			 );
		    

		      }
    };
  });
