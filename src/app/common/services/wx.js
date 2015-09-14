/* global wx */
'use strict';

angular.module('dian')
.factory('weixin', ['config', '$http', '$q', '$location',
 function(config, $http, $q, $location) {
  var weixin;

  weixin = {};

  /*
   * after config, and with a ready test, then exec our function
   * weixin.safeExec('scanQRCode').then(function(res) {
   * });
  */
  function safeExec(apiName, apiArgs) {
    var okDefer = $q.defer();
    wxSigInfo().then(configWx).then(function() {
    //wxSigInfo('http://localhost:3000').then(configWx).then(function() {
      wx.ready(function() {
        wx[apiName] ? wx[apiName](angular.extend(apiArgs, {
        success: function(res) {
          okDefer(res);
        }})) : angular.noop();
      });
    });
    return okDefer.promise;
  }

  function wxSigInfo(url) {
    return $q(function(reslove, reject) {
      $http.post(config.apiUrl + '/wp/wechat/get-jsapi-signature/', {
        url: url || $location.absUrl()
      }).then(function(res) {
        var data;
        reslove((data = res.data) ? res.data : {});
      }, function(res) {
        reject(res);
      });
    });
  }

  function configWx(sigInfo) {
    sigInfo ? sigInfo.jsApiList = ['scanQRCode'] : angular.noop();
    wx.config(sigInfo);
    return $q(function(rs, rj) {
      wx.ready(function() {
        rs();
      });
      wx.error(function() {
        rj();
      });
    });
  }

  function getMember() {
    return $q(function(rs, rj) {
      $http.get(config.apiUrl + '/wp/account/get-member/', {
        params: {
          code: wxParam('code')
        }
      }).then(function(res) {
        console.log('member detail');
        console.log(res.data);
        rs(res.data);
      }, function(res) {
        rj(res.data);
      });
    });
  }

  //return weixin code which is provided by weixin callback url
  //wxParam('code') return code of weixin, code can be taken from any url
  function wxParam(name) {
    return $location.search()[name] || '';
  }

  weixin.safeExec = safeExec;
  weixin.wxParam = wxParam;
  weixin.getMember = getMember;
  return weixin;
}]);


