'use strict';

angular.module('dian')

.config(function($routeProvider) {
  $routeProvider
    .when('/photo/published', {
      templateUrl: 'app/photo/photo.published.html',
      controller: 'PhotoPublishedCtrl'
    })
    .when('/photo/liked', {
      templateUrl: 'app/photo/photo.liked.html',
      controller: 'PhotoLikedCtrl'
    });
})

.controller('PhotoLikedCtrl', function(config, $http, $scope) {
  $http.get(config.api_url + '/wp/photo/list-my-like/')
  .then(function(res) {
    console.log('preferred photo');
    console.log(res.data);
    $scope.photos = res.data;
  })
  .catch(function(res) {
    console.error('preferred photo error');
    console.log(res.data);
  });

  $http.get(config.api_url + '/wp/photo/get-overview-of-my-like/')
  .then(function(res) {
    var overview_liked_photo, total;

    console.log('preferred photo overview');
    console.log(res.data);
    overview_liked_photo = res.data;
    $scope.liked_num = angular.isNumber(
      overview_liked_photo &&
      (total = overview_liked_photo.total)
    ) ? total : 0;
  })
  .catch(function(res) {
    console.error('preferred photo overview');
    console.log(res.data);
  });

})

.controller('PhotoPublishedCtrl', function(config, $http, $scope) {
  $http.get(config.api_url + '/wp/photo/list-my-photo/')
  .then(function(res) {
    console.log('my photos');
    console.log(res.data);
    $scope.photos = res.data;
  })
  .catch(function(res) {
    console.log('list my photos err');
    console.log(res.data);
  });
})

.controller('PhotoCtrl', function (config, $http, $scope) {
  var photos_liked;

  photos_liked = {};
  getPhotos();//先获取几张照片
  $scope.photos = [{id: 1, alt: 123}, {alt: 456}, {alt: 123}, {alt: 123}, {alt: 123}];//for debug
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

  $scope.like = function(id) {
    if (!angular.isNumber(id)) {
      return ;
    }
    if (photos_liked[id]) {//已经赞过
      return;
    }
    $http.get(config.api_url + '/wp/photo/like-photo/' + id + '/')
    .then(function(res) {
      console.log('good photo!');
      console.log(res.data);
      photos_liked[id] = true;
    })
    .catch(function(res) {
      console.warn('error when like a photo');
      console.log(res.data);
    });
  };

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
