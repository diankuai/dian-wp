'use strict';

angular.module('dian')

  .config(function($routeProvider) {
    var viewsPath= 'app/menu/views/';
    $routeProvider
      .when('/menu', {
        templateUrl: viewsPath + 'menu.html',
        controller: 'MenuCtrl'
      })
      .when('/menu/order/detail/:id', {
        templateUrl: viewsPath + 'menu_order_detail.html',
        controller: 'MenuOrderDetailCtrl'
      })
      .when('/menu/order/history', {
        templateUrl: viewsPath + 'menu_order_history.html',
        controller: 'MenuOrderHistoryCtrl'
      })
      .when('/menu/order/history/detail/:id', {
        templateUrl: viewsPath + 'menu_order_history_detail.html',
        controller: 'MenuOrderHistoryDetailCtrl'
      })

      .when('/menu/buy/', {
        templateUrl: viewsPath + 'menu_buy.html',
        controller: 'MenuBuyCtrl'
      })
      .when('/menu/buy/confirm/:id', {
        templateUrl: viewsPath + 'menu_buy_confirm.html',
        controller: 'MenuBuyConfirmCtrl'
      })
      .when('/menu/buy/current/:restaurant_openid', {
        templateUrl: viewsPath + 'menu_buy_confirm.html',
        controller: 'MenuBuyConfirmCtrl'
      })
      .when('/menu/buy/detail/:order_id', {
        templateUrl: viewsPath + 'menu_buy_confirm.html',
        controller: 'MenuBuyConfirmCtrl'
      })
      ;
  })
  ;


