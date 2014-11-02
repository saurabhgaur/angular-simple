'use strict';
angular.module('angularSimpleApp')
  .filter('patternFilter', function () {
    return function(items, filter, patternGenes) {
      if (!filter || !filter.selectedPattern){
          return items;
      }  
      var result = {};
          angular.forEach(items, function(item, key) {
              var validMarks = _.reject(item,function(d){return (d.Mark=="-" || d.Mark == "exon"); });
              switch(filter.selectedOperator.value){
                case "=": if (validMarks.length==filter.MarksCount) { result[key] = item; }; break;
                case "<": if (validMarks.length<filter.MarksCount) { result[key] = item; }; break;
                case "<=":if (validMarks.length<=filter.MarksCount) { result[key] = item; }; break;
                case ">": if (validMarks.length>filter.MarksCount) { result[key] = item; }; break;
                case ">=":if (validMarks.length>=filter.MarksCount) { result[key] = item; }; break;
              };


              // if (item.length<=filter.MarksCount){
              //     result[key] = item;
              // }
          });

        return result;
    };
  });
