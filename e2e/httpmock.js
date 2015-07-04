'use strict';

module.exports = function() {
  angular.module('httpmock', ['ngMockE2E'])
    .run(function($httpBackend) {
      var menu_orders_1_url, orders_url, host;
      $httpBackend.whenGET(/\.html$/).passThrough();

      $httpBackend.whenGET(menu_orders_1_url = '/#/menu/orders/1')
        .respond({
          name: 'my_restuarant'
        })

      $httpBackend.whenGET(orders_url = '/wp/trade/list-order/')
        .respond([{
        "id": 1,
        "restaurant": 1,
        "restaurant_name": "test-restaurant",
        "create_time": "2015-07-01T08:25:41Z",
        "price": "1.000",
        "status": 0,
        "confirm_time": "2015-07-01T16:48:00Z",
        "pay_time": "2015-07-01T16:47:59Z"
      }]);

    });
};

