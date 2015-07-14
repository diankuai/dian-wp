'use strict';

angular.module('dian')
  .controller('QueueCtrl', function (config, $scope, $http) {
    $http.get(config.api_url + '/wp/registration/list-current-registration/').then(function(res) {
      console.log('queue list');
      console.log(res.data);
      $scope.queue = res.data;
    });
  });
