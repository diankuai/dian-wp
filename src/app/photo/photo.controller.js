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
  .controller('PhotoCtrl', function (config, $http, $scope, $q) {
    var photos_limit = 5;

    getPhotos();//先获取几张照片
    $scope.photos = [{alt: 123}, {alt: 456}, {alt: 123}, {alt: 123}, {alt: 123}];//for debug
    $scope.index = 0;

    $scope.next_photo = function() {
      var photos_length;

      $scope.index++;
      console.log('cur photo index');
      console.log($scope.index);
    };
    $scope.$watch('index', function(newIndex, oldIndex) {
      var photos_length;

      if (newIndex !== oldIndex) {
        if (newIndex === (photos_length = $scope.photos && $scope.photos.length) - 2) {//还剩两张照片时再获取5张
          getPhotos().then(function(res) {
            var photos = $scope.photos || [];

            if (photos.length - 1 < newIndex) {
              return;
            }
            $scope.photos = photos.concat(res.data);//push 新的
          });
        }
      }
    });

    function getPhotos() {
      //return $q.when({data: [{a: 123}, {a: 456}, {a: 123}, {a: 123}, {a: 123}]});
      return $http.get(config.api_url + '/wp/photo/get-next-photo-list/', {
        //default is 5, which is configed by server
        params: {
          limit: 5
        }
      }).then(function(res) {
        console.log('5 photos');
        console.log(res.data);
        return res;
      });
    }
  });
