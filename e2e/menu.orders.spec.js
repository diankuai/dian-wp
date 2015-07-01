'use strict';

describe('mene orders view', function() {
  var menu_orders_1_url, host;
  host = require('./config.e2e.test').test_backend_host;
  browser.addMockModule('httpmock', require('./httpmock'));

  beforeEach(function() {
    browser.get(menu_orders_1_url = (host + '/#/menu/orders/1'));
  });

  /*
  it('should display order detail', function() {
    expect(element(by.css('.restuarant-name')).getText()).toBe('my_restuarant');
  });
  */

  afterEach(function() {
    browser.clearMockModules();
  });
});

