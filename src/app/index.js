/* global window, document, ActiveXObject, XMLHttpRequest */
'use strict';

/*
 * 从query中取code，获取用户信息，并设置cookie
 */
function setMemberIdToCookie(apiUrl) {
  var code;
  try {
    code = window.location.href.match(/code=([^&]+)/);
    code = code[1];
  } catch (e) {
    console.log(e);
  };
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 201) // 201?
    {
      document.cookie = 'member_id='
        + JSON.parse(xmlhttp.responseText).wp_openid;
    }
  };
  var url = apiUrl + '/wp/account/get-member/?code=' + code;
  xmlhttp.open('GET', url, false);
  xmlhttp.send();
};

//for dianApp code reuse, create a new module,
angular.module('dianApp', []);

angular.module('dian', ['ngCookies', 'ngTouch', 'ngRoute', 'dianApp'])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/photo/index', {
        templateUrl: 'app/photo/index.html',
        controller: 'PhotoCtrl'
      })
      .when('/menu', {
        templateUrl: 'app/menu/menu.html',
        controller: 'MenuCtrl'
      })
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .factory('memberIdInterceptor', ['$cookies', 'config',
      function ($cookies, appConfig) {
    return {
      request: function (config) {
        if (!$cookies.member_id) {
          setMemberIdToCookie(appConfig.apiUrl);
        };
        config.headers = config.headers || {};
        if ($cookies.member_id) {
          config.headers['X-Member-Id'] = $cookies.member_id;
        }
        return config;
      }
    };
  }])

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('memberIdInterceptor');
  }])
;
