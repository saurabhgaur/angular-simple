'use strict';

angular.module('angularSimpleApp')
  .filter('marksCountFilter', function () {
     return function(items, filter) {
      if (!filter || typeof filter.MarksCount === 'undefined' || typeof filter.selectedOperator === 'undefined'){
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