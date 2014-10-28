'use strict';

angular.module('angularSimpleApp')
  .filter('tssFilter', function () {
    return function(items, filter) {
      if (!filter || !filter.tssMarksDist || !filter.MarksCount){
          return items;
      }  
      var result = {};
          angular.forEach(items, function(marks, key) {
              var count = 0;
              var validMarks = _.reject(marks,function(d){return (d.Mark=="-" || d.Mark == "exon"); });
              
              angular.forEach(validMarks, function(mark){
               	if(Math.abs(mark.RegionStart)<=filter.tssMarksDist*1000)
              		count = count + 1;
              });

              switch(filter.selectedOperator.value){
                case "=": if (count==filter.MarksCount) { result[key] =validMarks; }; break;
                case "<": if (count<filter.MarksCount) { result[key] = validMarks; }; break;
                case "<=":if (count<=filter.MarksCount) { result[key] =validMarks; }; break;
                case ">": if (count>filter.MarksCount) { result[key] = validMarks; }; break;
                case ">=":if (count>=filter.MarksCount) { result[key] =validMarks; }; break;
              };

              // if (count>=filter.tssMarksCount){
              //     result[key] = validMarks;
              // }
          });

        return result;
    };
  });
