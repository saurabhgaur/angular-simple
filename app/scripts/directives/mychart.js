'use strict';

angular.module('angularSimpleApp')
    .directive('myChart', function() {
        return {
            scope: {
                data: '=geneData',
                // region: '=geneRegion',
                cell: '=cell',
                width: '=width',
                ticks: '=ticks',
                zoomed: '=zoomed',
                selectedpattern: '=selectedpattern'
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
                colorScale.domain(['H3K9me2', 'H3K27me3', 'H3K4me3', 'H3K9ac', 'exon']);
                var formatValue = d3.format(".2s");

                var x = d3.scale.linear()
                    .domain([scope.data[0].TiledRegionStart,scope.data[0].TiledRegionStop])
                    // .domain([scope.region[0].TiledRegionStartWrtTSS, scope.region[0].TiledRegionStopWrtTSS])
                    .range([10, width - 10]); 

                var y = d3.scale.ordinal()
                    .domain(['H3K9me2', 'H3K27me3', 'H3K4me3', 'H3K9ac', 'exon'])
                    .range([0, 0.25 * marksRegionHeight, 0.5 * marksRegionHeight, 0.75 * marksRegionHeight, 1.2*marksRegionHeight]);

                var zoom = d3.behavior.zoom()
                    .scaleExtent([-10, 10])
                    .x(x)
                    .on("zoom", zoomHandler);

                var chartRoot = d3.select(element[0]).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .call(zoom);

                var chart = chartRoot.append("g");

                // var dispatch = d3.dispatch("myzoom");

                if(scope.zoomed) dispatch.on("reset_zoom_all."+scope.cell, 
                    function() {
                        resetZoom();
                    });

                if(scope.zoomed) dispatch.on("zoom_all."+scope.cell, 
                    function(zoomScale,zoomTranslate) {
                        zoomHandlerAll(zoomScale,zoomTranslate);
                    });

                var resetZoom = function(){
                     //zoom.x(x.domain([scope.region[0].TiledRegionStartWrtTSS, scope.region[0].TiledRegionStopWrtTSS]))
                     zoom.x(x.domain([scope.data[0].TiledRegionStart, scope.data[0].TiledRegionStop]))
                    .scale(1)
                    .translate([0, 0]);
                    
                    chart.transition().duration(50).attr('transform', 'translate(' + zoom.translate() + ') scale(' + zoom.scale() + ')');
                    chartRoot.select("g.x-axis").call(xAxis);
                    // dispatch.on("zoom", function() {zoomHandler();});
                };


                // if(scope.zoomed==1){
                //     var resetLink = d3.select(element[0]).append("a")
                //  	.attr("id","zoom_reset")
                //  	.text("Reset Zoom")
                //  	.on("click",function(){resetZoom()});
                //  }
                

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .tickSize(-height, 0)
                    .tickFormat(function(d) {
                        return formatValue(d);
                    });
                if (scope.zoomed == 0) {xAxis.ticks(5);};

                var xAxisElement = chartRoot.append("g")
                    .attr("class", "x-axis") //Assign "x axis" class
                    .attr("transform", "translate(0," + (height - padding) + ")")
                    .call(xAxis);

                var patternsBox ;

                if (scope.selectedpattern){
                    patternsBox = chart.selectAll("patterns")
                    .data(_.values(scope.selectedpattern))
                    .enter().append("g")
                    .attr("transform", function(d, i) {
                        return "translate(" + (x(d.minimum)-5) + "," + 0 + ")";
                    });

                    patternsBox.append("rect")
                    .attr("width", function(d, i) {
                        return x(d.maximum) - x(d.minimum) + 10;
                    })
                    .attr("height", marksRegionHeight)
                    .style("fill", "pink")
                    // .style("stroke","black")
                }

                var bar = chart.selectAll("bar")
                    .data(
                        scope.data.filter(function(el){
                            if(el.RegionStart == "-" || (scope.zoomed==0 && el.Mark=="exon"))
                            {return false;}
                            else
                            {return true;}}
                        )
                    )
                    .enter().append("g")
                    .attr("transform", function(d, i) {
                        return "translate(" + x(d.RegionStart) + "," + y(d.Mark) + ")";
                    });

                if(bar){
                bar.append("rect")
                    .attr("width", function(d, i) {
                        return x(d.RegionStop) - x(d.RegionStart)
                    })
                    .attr("height", barHeight - 1)
                    .style("fill", function(d, i) {
                        return colorScale(d.Mark);
                    });
                };

                

                // function for handling zoom event triggered by self
                function zoomHandler() {
                    //zoom.scale(zoom.scale());
                    chart.attr("transform", "translate(" + d3.event.translate[0] + ",0" + ") scale(" + d3.event.scale + ",1)");
                    chartRoot.select("g.x-axis").call(xAxis);
                    dispatch.zoom_all(zoom.scale(),zoom.translate());
                }

                // function for handling zoom event triggered by some other component
                function zoomHandlerAll(zoomScale,zoomTranslate) {
                    zoom.scale(zoomScale);
                    zoom.translate(zoomTranslate);
                    chart.attr("transform", "translate(" + d3.event.translate[0] + ",0" + ") scale(" + zoomScale + ",1)");
                    // zoom.event(chartRoot);
                    chartRoot.select("g.x-axis").call(xAxis);
                }

                var tiledRegionBar = chart.append("g")
                    .attr("transform", "translate("+x(scope.data[0].TiledRegionStart)+","+0.75*availableHeight+")");
                    // .attr("transform", "translate(" + x(scope.region[0].TiledRegionStartWrtTSS) + "," + 0.75 * availableHeight + ")");

               
                tiledRegionBar.append("rect")
                .attr("width",x(scope.data[0].TiledRegionStop) - x(scope.data[0].TiledRegionStart))
                // .attr("width", x(scope.region[0].TiledRegionStopWrtTSS) - x(scope.region[0].TiledRegionStartWrtTSS))
                .attr("height", barHeight / 2)
                .style("fill", "red");
                
                var geneBar = chart.append("g")
                    .attr("transform", "translate(" + x(scope.data[0].GeneStart) + "," + 0.75 * availableHeight + ")");

                //if (scope.region[0].Orientation == "+") {
                geneBar.append("rect")
                    .attr("width", x(scope.data[0].GeneStop) - x(scope.data[0].GeneStart))
                    .attr("height", barHeight)
                    .style("fill", "black");
                //};


            }
        };
    });