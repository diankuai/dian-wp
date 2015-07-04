'use strict';

describe('menu orders history view', function() {
  var menu_orders_history_url, host;
  host = require('./config.e2e.test').test_backend_host;

  beforeEach(function() {
    browser.addMockModule('httpmock', require('./httpmock'));
    browser.get(menu_orders_history_url = (host + '/#/orders/history'));
  });

  it('should display order history header', function() {
    expect(element(by.css('.history-header')).getText()).toBe('订单历史');
  });

  it('should display orders list', function() {
    var orderList = element.all(by.repeater('order in orders'));
    expect(orderList.count()).toBe(1);

    expect(element(by.css('.restaurant-name')).getText())
      .toContain('test-restaurant');

    expect(element(by.css('.order-status')).getText())
      .toContain('已下单');
  });

  afterEach(function() {
    browser.clearMockModules();
  });
});
