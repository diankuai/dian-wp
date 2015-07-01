'use strict';

describe('menu orders history view', function() {
  var menu_orders_history_url, host;
  host = require('./config.e2e.test').test_backend_host;
  browser.addMockModule('httpmock', require('./httpmock'));

  beforeEach(function() {
    browser.get(menu_orders_history_url = (host + '/#/orders/history'));
  });

  it('should display order history header', function() {
    expect(element(by.css('.history-header')).getText()).toBe('订单历史');
  });

  afterEach(function() {
    browser.clearMockModules();
  });
});
