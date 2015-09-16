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

  .filter('order_time', [
    function() {
      return function(order_time_utc) { //2015-03-21T00:00:00Z
        return extractTime(order_time_utc);

        function extractTime(utc_time) {
          return angular.isString(utc_time) ? utc_time.match(/T([^Z]*)Z/)[1] : '';
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
  .filter('order_status_short', [
    function() {
      return function(order_status_num) {
        return {
          '0': '已完成',
          '1': '已退订'
        }[order_status_num + ''] || '';
      };
    }
  ])
  .filter('order_status', [
    function() {
      return function(order_status_num) {
        return {
          '0': '餐厅已确认，请等待上菜',
          '1': '实在抱歉，餐厅退回了订单'
        }[order_status_num + ''] || '';
      };
    }
  ]);

