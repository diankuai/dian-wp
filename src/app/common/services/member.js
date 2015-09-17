/* global wx */
'use strict';

angular.module('dian')

/* 获取微信用户信息 */
.service('memberInfo', ['config', '$http', '$cookies',
    function(config, $http, $cookies) {
  var openid = $cookies.member_id;
  var promise = $http.get(config.apiUrl + '/wp/account/get-member-by-openid/', {
      params: {
        openid: openid 
      }
    }).
    success(function (res) {
      return res;
    });
  return promise;
}])
;
