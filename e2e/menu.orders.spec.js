'use strict';

describe('mene orders view', function() {
  var menu_orders_1_url, host;
  host = require('./config.e2e.test').localhost;
  //browser.addMockModule('httpmock', require('./httpmock'));

  beforeEach(function() {
    browser.get(menu_orders_1_url = (host + '/#/menu'));
  });

  it('should display orders total number', function() {
    expect(element(by.model('orders.length'))).toBe(1);
  });

  afterEach(function() {
    //browser.clearMockModules();
  });
});

