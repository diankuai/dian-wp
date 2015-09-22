'use strict';

angular.module('dian')

  .filter('datetime', [
    function () {
      return function (datetime) {
        //2015-03-21T00:00:00Z
        if (datetime) {
          var re = datetime.match(/\d{4}-(\d{2})-(\d{2})T(\d{2}:\d{2}):\d{2}/);
          return (re.length > 3) ? (re[1] + '月' + re[2] + '日 ' + re[3]) : datetime;
        } else {
          return datetime;
        }
      };
    }
  ])

  .filter('CHY', [function() {
    return function(price) {
      var intoPrice;
      return (angular.isNumber(intoPrice = price * 1.0) && intoPrice.toFixed(2) || 0) + '元';
    };
  }])
  ;

