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
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) // 201?
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

  .factory('DataLoadingInterceptor', ['$q', '$window', function ($q, $window) {
    return {
      'response': function(response) {
        angular.element(document.querySelector('.loading')).removeClass('on');
        return response;
      },
      'responseError': function(rejection) {
        angular.element(document.querySelector('.loading')).removeClass('on');
        return $q.reject(rejection);
      }
    }
  }])

  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('DataLoadingInterceptor');
    var spinnerFunction = function spinnerFunction(data, headersGetter) {
      angular.element(document.querySelector('.loading')).addClass('on');
      return data;
    };
    $httpProvider.defaults.transformRequest.push(spinnerFunction);
  }])
;

  // // http://stackoverflow.com/questions/19254029/angularjs-http-post-does-not-send-data
  // .config(['$httpProvider', function ($httpProvider) {
  //   // Use x-www-form-urlencoded Content-Type
  //   $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  //   /**
  //    * The workhorse; converts an object to x-www-form-urlencoded serialization.
  //    * @param {Object} obj
  //    * @return {String}
  //    */ 
  //   var param = function(obj) {
  //     var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
  //     for(name in obj) {
  //       value = obj[name];
  //       if(value instanceof Array) {
  //         for(i=0; i<value.length; ++i) {
  //           subValue = value[i];
  //           fullSubName = name + '[' + i + ']';
  //           innerObj = {};
  //           innerObj[fullSubName] = subValue;
  //           query += param(innerObj) + '&';
  //         }
  //       }
  //       else if(value instanceof Object) {
  //         for(subName in value) {
  //           subValue = value[subName];
  //           fullSubName = name + '[' + subName + ']';
  //           innerObj = {};
  //           innerObj[fullSubName] = subValue;
  //           query += param(innerObj) + '&';
  //         }
  //       }
  //       else if(value !== undefined && value !== null)
  //         query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
  //     }
  //     return query.length ? query.substr(0, query.length - 1) : query;
  //   };
  //   // Override $http service's default transformRequest
  //   $httpProvider.defaults.transformRequest = [function(data) {
  //     return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  //   }];
  // })
