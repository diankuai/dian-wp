'use strict';

module.exports = function() {
  angular.module('httpmock', ['ngMockE2E'])
    .run(function($httpBackend) {
      $httpBackend.whenGET(/\.html$/).passThrough();

      $httpBackend.expectGET(menu_orders_1_url = '/#/menu/orders/1')
        .respond({
          name: 'my_restuarant'
        });

    });
};

