'use strict';

angular.module('dian')
.factory('wx', ['config', '$http', '$q', '$location',
 function(config, $http, $q, $location) {
  var wx = {};

  /*
   * after config, and with a ready test, then exec our function
   *
   * wx.safeExec('scanQRCode').then(function(res) {
   *
   * });
  */
  function safeExec(apiName, apiArgs) {
    var okDefer = $q.defer();
    //wxSigInfo($location.absUrl()).then(configWx).then(function() {
    wxSigInfo('http://localhost:3000').then(configWx).then(function() {
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
      $http.post(config.api_url + '/wp/wechat/get-jsapi-signature/', {
        url: url
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

  //return weixin code which is provided by weixin callback url
  function code() {
    return $location.search()[code] || '';
  }

  wx.safeExec = safeExec;
  wx.code = code;
  return wx;
}]);


