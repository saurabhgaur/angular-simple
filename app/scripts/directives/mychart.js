'use strict';

angular.module('angularSimpleApp')
    .directive('myChart', function() {
        return {
            scope: {
                data: '=geneData',
                region: '=geneRegion',
                width: '=width',
                ticks: '=ticks',
                zoomed: '=zoomed'
            },
            restrict: 'EA',
            transclude: true,
            link: function postLink(scope, element, attrs) {
                //width = 350,
                var width = scope.width;
                var height = 100,
                    barHeight = 10,
                    padding = 20,
                    availableHeight = height - padding,
                    marksRegionHeight = 0.5 * availableHeight;
                var colorScale = d3.scale.category10();
                // domain = _.uniq(_.pluck(csv,"Mark")).sort();
                colorScale.domain(["Ab2", "Ab4", "Ab6", "Ab7"]);
                var formatValue = d3.format(".2s");
                
                var x = d3.scale.linear()
                    // .domain([scope.data[0].TiledRegionStart,scope.data[0].TiledRegionStop])
                    .domain([scope.region[0].TiledRegionStartWrtTSS, scope.region[0].TiledRegionStopWrtTSS])
                    .range([10, width - 10]);

                var y = d3.scale.ordinal()
                    .domain(['Ab2', 'Ab4', 'Ab6', 'Ab7'])
                    .range([0, 0.25 * marksRegionHeight, 0.5 * marksRegionHeight, 0.75 * marksRegionHeight]);

                var zoom = d3.behavior.zoom()
                    .scaleExtent([1, 10])
                    .x(x)
                    .on("zoom", zoomHandler);

                var chartRoot = d3.select(element[0]).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .call(zoom)
                    .append("g");

                var chart = chartRoot.append("g");

                var resetZoom = function(){
                    var zoom = d3.behavior.zoom();
                    zoom.scale(1)
                    .translate([0, 0])
                    .x(x.domain([scope.region[0].TiledRegionStartWrtTSS, scope.region[0].TiledRegionStopWrtTSS]));
                    chart.transition().duration(50).attr('transform', 'translate(' + zoom.translate() + ') scale(' + zoom.scale() + ')');
                    chartRoot.select("g.x-axis").call(xAxis);
                };

               	//chartRoot.on("click", function(){resetZoom();})

                if(scope.zoomed==1){
                    var resetLink = d3.select(element[0]).append("a")
                 	.attr("id","zoom_reset")
                 	.text("Reset Zoom")
                 	.on("click",function(){resetZoom()});
                 }
                

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .tickSize(-height, 0)
                    .tickFormat(function(d) {
                        return formatValue(d);
                    });

                var xAxisElement = chartRoot.append("g")
                    .attr("class", "x-axis") //Assign "x axis" class
                    .attr("transform", "translate(0," + (height - padding) + ")")
                    .call(xAxis);


                // chart.on("click", function() {
                //         zoom.scale(1);
                //         zoom.translate([0, 0]);
                //     })
                //     .attr('transform', 'translate(' + zoom.translate() + ') scale(' + zoom.scale() + ')');


                var bar = chart.selectAll("g")
                    .data($scope.$parent.data)
                    .enter().append("g")
                    .attr("transform", function(d, i) {
                        return "translate(" + x(d.RegionStart) + "," + y(d.Mark.substring(0, 3)) + ")";
                    });


                // function for handling zoom event
                function zoomHandler() {
                    chart.attr("transform", "translate(" + d3.event.translate[0] + ",0" + ")scale(" + d3.event.scale + ",1)");
                    chartRoot.select("g.x-axis").call(xAxis);
                }


                bar.append("rect")
                    .attr("width", function(d, i) {
                        return x(d.RegionStop) - x(d.RegionStart)
                    })
                    .attr("height", barHeight - 1)
                    .style("fill", function(d, i) {
                        return colorScale(d.Mark.substring(0, 3));
                    });

                var tiledRegionBar = chart.append("g")
                    //.attr("transform", "translate("+x(scope.data[0].TiledRegionStart)+","+0.75*availableHeight+")");
                    .attr("transform", "translate(" + x(scope.region[0].TiledRegionStartWrtTSS) + "," + 0.75 * availableHeight + ")");

                tiledRegionBar.append("rect")
                    // .attr("width",x(scope.data[0].TiledRegionStop) - x(scope.data[0].TiledRegionStart))
                    .attr("width", x(scope.region[0].TiledRegionStopWrtTSS) - x(scope.region[0].TiledRegionStartWrtTSS))
                    .attr("height", barHeight / 2)
                    .style("fill", "red");

                var geneBar = chart.append("g")
                    .attr("transform", "translate(" + x(scope.data[0].GeneStart) + "," + 0.75 * availableHeight + ")");

                geneBar.append("rect")
                    .attr("width", x(scope.data[0].GeneStop) - x(scope.data[0].GeneStart))
                    .attr("height", barHeight)
                    .style("fill", "black");


            }
        };
    });