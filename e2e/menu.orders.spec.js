'use strict';

describe('mene orders view', function() {
  var menu_orders_1_url;

  browser.addMockModule('httpmock', require('./httpmock'));

  beforeEach(function() {
    //browser.get(menu_orders_1_url = '/#/menu/orders/1');
    browser.get(menu_orders_1_url = 'http://localhost:3000/#/menu/orders/1');
  });

  it('should display order detail', function() {
    expect(element(by.css('.restuarant-name')).getText()).toBe('my_restuarant');
  });

  afterEach(function() {
    browser.clearMockModules();
  });
});

