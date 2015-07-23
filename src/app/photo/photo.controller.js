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
    var photos_limit = 5;

    getPhotos();//先获取几张照片
    $scope.photos = [{alt: 123}, {alt: 456}];//for debug
    $scope.index = 0;

    $scope.next_photo = function() {
      $scope.index++;
      $scope.index %= photos_limit;//始终使index < limt
      console.log('cur photo index');
      console.log($scope.index);
    };

    function getPhotos() {
      return $http.get(config.api_url + '/wp/photo/get-next-photo-list/', {
      /* default is 5, which is configed by server
      params: {
        limit: 5
      }
      */
      }).then(function(res) {
        console.log('5 photos');
        console.log(res.data);
        return res;
      });
    }
  });
