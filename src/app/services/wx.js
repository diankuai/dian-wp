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
    //wxSigInfo().then(configWx).then(function() {
    wxSigInfo().then(function(sigInfo) {
      var configData;
    //wxSigInfo('http://localhost:3000').then(configWx).then(function() {
      configData = configData = angular.extend({debug: true, jsApiList: ['scanQRCode']}, sigInfo);
      alert('config params')
      alert(JSON.stringify(configData));
      wx.config(configData);
      wx.ready(function() {
	alert('wx ready callback exec begin');
	alert('wx interface is ' + apiName);
        wx[apiName] ? wx[apiName](angular.extend(apiArgs || {}, {
	error: function(res) {
	  alert('wx interface ' + apiName + 'error');
	  alert(JSON.stringify(res));
	  okDefer.reject(res);
	}, 
        success: function(res) {
	  alert('wx interface ' + apiName + 'ok');
	  alert(JSON.stringify(res));
          okDefer.resolve(res);
        }})) : angular.noop();
      });
      wx.error(function(res) {
	alert('wx config error');
	alert(JSON.stringify(res));
        odDefer.reject(res);
      })
    });
    return okDefer.promise;
  }

  function wxSigInfo(url) {
    return $q(function(reslove, reject) {
      $http.post(config.api_url + '/wp/wechat/get-jsapi-signature/', {
        url: url || $location.absUrl()
      }).then(function(res) {
        var data;
	alert('wxSigInfor');
	alert(JSON.stringify(res.data));
        reslove((data = res.data) ? res.data : {});
      }, function(res) {
	alert('wxSigInfor error');
	alert(res);
        reject(res);
      });
    });
  }

  function configWx(sigInfo) {
    sigInfo ? sigInfo.jsApiList = ['scanQRCode'] : angular.noop();
    wx.config(sigInfo);
    return $q(function(rs, rj) {
      rs();
      /*
      wx.ready(function() {
	alert('configWx ok');
        rs();
      });
      wx.error(function() {
	alert('configWx error');
        rj();
      });
      */
    });
  }

  function getMember() {
    return $q(function(rs, rj) {
      $http.get(config.api_url + '/wp/account/get-member/', {
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


