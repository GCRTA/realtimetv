'use strict';

angular
  .module('transitScreenApp')
  .controller('NearbyCtrl', NearbyCtrl);

function NearbyCtrl($rootScope, $interval, ScreenConfig, Nearby) {
  var vm = this;
  var scrollInterval;
  var currentScrollIndex = 0;

  angular.extend(vm, {
    config: ScreenConfig,
    routes: [],
    placemarks: [],

    isShown: isShown,
    hide: hide,

    onChangeOrder: onChangeOrder
  });

  // Update CSS variable when routesPerRow changes
  $rootScope.$watch(function() {
    return ScreenConfig.routesPerRow;
  }, function(newValue) {
    document.documentElement.style.setProperty('--routes-per-row', newValue);
  });

  // Update font size class when fontSize changes
  $rootScope.$watch(function() {
    return ScreenConfig.fontSize;
  }, function(newValue) {
    var routesContainer = document.getElementById('routes');
    if (routesContainer) {
      routesContainer.classList.remove('font-normal', 'font-large', 'font-larger');
      routesContainer.classList.add('font-' + newValue);
    }
  });

  // Initialize routesPerRow and fontSize
  document.documentElement.style.setProperty('--routes-per-row', ScreenConfig.routesPerRow);
  var routesContainer = document.getElementById('routes');
  if (routesContainer) {
    routesContainer.classList.add('font-' + ScreenConfig.fontSize);
  }

  // Auto-scroll every X seconds based on configuration
  function startAutoScroll() {
    if (scrollInterval) {
      $interval.cancel(scrollInterval);
    }
    
    if (!ScreenConfig.autoscrollEnabled) return;
    
    scrollInterval = $interval(function() {
      var routesContainer = document.getElementById('routes');
      if (!routesContainer) return;

      var routes = routesContainer.getElementsByClassName('route');
      var visibleRoutes = Array.from(routes).filter(route => route.offsetParent !== null);
      
      if (visibleRoutes.length === 0) return;

      // Calculate how many routes to show per row (4)
      var routesPerRow = 4;
      var totalRows = Math.ceil(visibleRoutes.length / routesPerRow);
      
      // Move to next row
      currentScrollIndex = (currentScrollIndex + 1) % totalRows;
      
      // Calculate scroll position
      var scrollPosition = currentScrollIndex * visibleRoutes[0].offsetHeight;
      
      // Smooth scroll to position
      routesContainer.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });

      // If we've reached the end, reset to top
      if (currentScrollIndex === totalRows - 1) {
        setTimeout(function() {
          routesContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          currentScrollIndex = 0;
        }, 1000); // Wait 1 second before resetting
      }
    }, ScreenConfig.autoscrollInterval * 1000); // Convert seconds to milliseconds
  }

  $interval(function () {
    loadNearby();
  }, 20000);

  loadNearby();

  $rootScope.$on('locationChanged', function () {
    loadNearby();
  });

  $rootScope.$on('nearbyChanged', function () {
    loadNearby();
  });

  // Watch for changes in autoscroll settings
  $rootScope.$watch(function() {
    return ScreenConfig.autoscrollEnabled;
  }, function(newValue) {
    if (newValue) {
      startAutoScroll();
    } else if (scrollInterval) {
      $interval.cancel(scrollInterval);
    }
  });

  $rootScope.$watch(function() {
    return ScreenConfig.autoscrollInterval;
  }, function() {
    if (ScreenConfig.autoscrollEnabled) {
      startAutoScroll();
    }
  });

  function loadNearby() {
    console.log('Loading nearby routes...');
    Nearby.find(ScreenConfig.latLng, 1000).then(function (routes) {
      console.log('Received routes:', routes);
      if (ScreenConfig.routeOrder) {
        var indexes = [];

        angular.forEach(routes, function (route) {
          indexes.push(route.global_route_id);
        });

        routes.sort(function (a, b) {
          var i = ScreenConfig.routeOrder.indexOf(a.global_route_id),
            j = ScreenConfig.routeOrder.indexOf(b.global_route_id);

          if (i === -1 && i === j) {
            return indexes.indexOf(a.global_route_id) - indexes.indexOf(b.global_route_id);
          } else if (i === -1) {
            return 1;
          } else if (j === -1) {
            return -1;
          }

          return i - j;
        });
      }

      vm.routes = routes;
      console.log('Routes set to vm.routes:', vm.routes);
      
      // Start auto-scrolling after routes are loaded
      if (ScreenConfig.autoscrollEnabled) {
        startAutoScroll();
      }
    });
  }

  function hide(route) {
    ScreenConfig.hiddenRoutes.push(route.global_route_id);
    ScreenConfig.save();
  }

  function isShown(route) {
    return ScreenConfig.hiddenRoutes.indexOf(route.global_route_id) === -1 && Nearby.hasShownDeparture(route);
  }

  function onChangeOrder() {
    var newOrder = [];

    angular.forEach(vm.routes, function (route) {
      newOrder.push(route.global_route_id);
    });

    ScreenConfig.routeOrder = newOrder;
    ScreenConfig.save();
  }
}
