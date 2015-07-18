/* global window, document, ActiveXObject, XMLHttpRequest */
'use strict';

function setMemberIdToCookie() {
  /*
   * 从query中取code，获取用户信息，并设置cookie
   */

  // hash and search maybe not work:
  // xxx/#/yyy?code=zzz
  // xxx/?code=zzz/#/yyy
  var code = window.location.href.match(/code=[a-zA-Z_0-9]*/);

  if (code) {
    code = (code + '').replace(/code=/,'');
    code = 123;//for debug
  }else {
    console.warn('cannot find weixin code in current url');
  }

  var xmlhttp;
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  }else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 201) // 201?
    {
      document.cookie = 'member_id=' + JSON.parse(xmlhttp.responseText).wp_openid;
    }
  };
  var api_url = 'http://api.dk26.com:8080' + '/wp/account/get-member/?code=' + code;
  xmlhttp.open('GET', api_url, false);
  xmlhttp.send();
}
setMemberIdToCookie();

//for dianApp code reuse, create a new module,
//TODO: extract common module for dianApp and dian
angular.module('dianApp', []);

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

  .factory('memberIdInterceptor', ['$cookies', function ($cookies) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookies.member_id) {
          config.headers['X-Member-Id'] = $cookies.member_id;
        }
        config.headers['X-Member-Id'] = 123;// for debug
        return config;
      }
    };
  }])

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('memberIdInterceptor');
  }])
;
