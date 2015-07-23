'use strict';

angular.module('dian')
  .config(function($routeProvider) {
    /*
    $routeProvider
      .when('/photo/index', {
        templateUrl: 'app/photo/index.html',
        controller: 'PhotoCtrl'
      });
    */
  })
  .controller('PhotoCtrl', function (config, $http, $scope) {

    $http.get(config.api_url + '/wp/photo/get-next-photo-list/', {
      /* default is 5, which is configed by server
      params: {
        limit: 5
      }
      */
    }).then(function(res) {
      console.log('5 photos');
      console.log(res.data);
    });
    $scope.photos = [{alt: 123}, {alt: 456}];
    $scope.index = 0;
  });
