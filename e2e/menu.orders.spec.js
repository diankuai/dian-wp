'use strict';

describe('mene orders view', function() {
  var menu_orders_1_url;

  browser.addMockModule('httpmock', function() {
    angular.module('httpmock', ['ngMockE2E'])
      .run(function($httpBackend) {
        $httpBackend.whenGET(/\.html$/).passThrough();

        $httpBackend.expectGET(menu_orders_1_url = '/#/menu/orders/1')
          .respond({
            name: 'my_restuarant'
          });

      });
  });

  beforeEach(function() {
    //browser.get(menu_orders_1_url = '/#/menu/orders/1');
    browser.get(menu_orders_1_url = 'http://localhost:3000/#/menu/orders/1');
  });

  it('should display order detail', function() {
    browser.debugger();
    expect(element(by.css('.restuarant-name')).getText()).toBe('my_restuarant');
  });
});

