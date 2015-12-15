angular.module('dian')
.directive('photoGallery',[function() {
  return {
    restrict: 'E',
    templateUrl: 'app/common/directives/photo-gallery.html',
    scope: {
      photos: '=',
      current: '='
    },
    link: function(scope, element, attr) {
      scope.onSwiperReady = function(swiper) {
        swiper.on('slideChangeEnd', function() {
          scope.$apply(function() {
            scope.current = swiper.activeIndex;
          });
        });
        scope.swiper = swiper;
      };
      scope.$watch('current', function(next, current) {
        scope.swiper.slideTo(next);
      })
    }
  }
}]);

