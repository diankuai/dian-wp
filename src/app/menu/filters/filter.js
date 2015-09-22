'use strict';

angular.module('dian')

  .filter('order_status_short', [
    function() {
      return function(order_status_num) {
        return {
          '0': '已完成',
          '1': '已完成',
          '2': '已完成',
          '3': '已退订'
        }[order_status_num + ''] || '';
      };
    }
  ])

  .filter('order_status', [
    function() {
      return function(order_status_num) {
        return {
          '0': '已下单，待餐厅确认',
          '1': '餐厅已确认，请等待上菜',
          '2': '已支付',
          '3': '实在抱歉，餐厅退回了订单'
        }[order_status_num + ''] || '';
      };
    }
  ])
  ;

