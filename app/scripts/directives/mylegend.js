'use strict';

angular.module('angularSimpleApp')
    .directive('myLegend', function() {
        return {
            restrict: 'EA',
            transclude: true,
            link: function postLink(scope, element, attrs) {
              var width = 650,
              height = 30;

              var colorScale = d3.scale.category10();
              colorScale.domain(["H3K9me2", "H3K27me3", "H3K4me3", "H3K9ac","Exon"]);

                // add legend

              var legend = d3.select(element[0]).append("svg")
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
            }    
        };
    });