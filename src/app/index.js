'use strict';

//for dianApp code reuse
angular.module('dianApp', ['dian']);

angular.module('dian', ['ngCookies', 'ngTouch', 'ngRoute', 'dianApp'])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/photo', {
        templateUrl: 'app/photo/photo.html',
        controller: 'PhotoCtrl'
      })
      .when('/menu', {
        templateUrl: 'app/menu/menu.html',
        controller: 'MenuCtrl'
      })
      .when('/queue', {
        templateUrl: 'app/queue/queue.html',
        controller: 'QueueCtrl'
      })
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  /*
  .factory('memberIdInterceptor', ['$q', '$cookies', '$location', '$injector',
           function ($q, $cookies, $location, $injector) {
      return {
          request: function (config) {
              var weixin, headerOk;
              config.headers = config.headers || {};
              headerOk = $q.defer()
              weixin = $injector.get('weixin');
              weixin.getMember().then(function(res) {
                config.headers['X-Member-Id'] = res && res.data && res.data['wp_openid'];
                headerOk.resolve(config);
              }, function(res) {
                headerOk.reject(res)
              });
              return headerOk.promise;
          }
      };
  }])
  */

  /*
  .config(['$httpProvider', function($httpProvider) {
    //$httpProvider.interceptors.push('memberIdInterceptor');
    console.log(GLOBAL);
  }])

  .run(function() {
    GLOBAL = 123;
  })
  */
;
