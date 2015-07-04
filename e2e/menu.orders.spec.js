'use strict';

describe('mene orders view', function() {
  var menu_orders_1_url, host;
  host = require('./config.e2e.test').localhost;

  beforeEach(function() {
    browser.get(menu_orders_1_url = (host + '/#/menu'));
  });

  it('should display orders total number', function() {
    expect(element(by.binding('orders.length')).getText()).toBe('2');
  });
});

