'use strict';

angular.module('transitScreenApp')
  .directive('alertBanner', function () {
    return {
      template: '<div class="alert-banner" ng-if="ctrl.hasAlerts()">' +
                '  <div class="alert-content">' +
                '    <span class="alert-icon">⚠️</span>' +
                '    <span class="alert-message">{{ctrl.currentAlert}} <span class="alert-counter" ng-if="ctrl.totalAlerts > 1">({{ctrl.currentIndex + 1}} of {{ctrl.totalAlerts}})</span></span>' +
                '  </div>' +
                '</div>',
      restrict: 'E',
      scope: {
        routes: '='
      },
      controller: AlertBannerCtrl,
      controllerAs: 'ctrl',
      bindToController: true
    };
  });

function AlertBannerCtrl($interval, $scope, ScreenConfig) {
  var vm = this;
  var alertInterval;
  var ALERT_DURATION = 20000; // 20 seconds

  angular.extend(vm, {
    hasAlerts: hasAlerts,
    getAlertMessages: getAlertMessages,
    currentAlert: '',
    currentIndex: 0,
    totalAlerts: 0
  });

  // Watch for changes in routes
  $scope.$watch('ctrl.routes', function(newRoutes) {
    if (newRoutes) {
      initAlerts();
    }
  }, true);

  // Watch for changes in hidden routes
  $scope.$watch(function() {
    return ScreenConfig.hiddenRoutes;
  }, function() {
    initAlerts();
  }, true);

  function initAlerts() {
    // Clean up existing interval if any
    if (alertInterval) {
      $interval.cancel(alertInterval);
    }

    if (hasAlerts()) {
      var alerts = getAlertMessages();
      if (alerts.length > 0) {
        vm.currentAlert = alerts[0];
        vm.currentIndex = 0;
        vm.totalAlerts = alerts.length;
        
        // Start cycling through alerts
        alertInterval = $interval(function() {
          vm.currentIndex = (vm.currentIndex + 1) % alerts.length;
          vm.currentAlert = alerts[vm.currentIndex];
        }, ALERT_DURATION);
      } else {
        // If no alerts after filtering, clear the current alert
        vm.currentAlert = '';
        vm.totalAlerts = 0;
      }
    } else {
      // If no alerts at all, clear the current alert
      vm.currentAlert = '';
      vm.totalAlerts = 0;
    }
  }

  // Clean up on destroy
  $scope.$on('$destroy', function() {
    if (alertInterval) {
      $interval.cancel(alertInterval);
    }
  });

  function hasAlerts() {
    if (!vm.routes) return false;
    return vm.routes.some(function(route) {
      return isRouteVisible(route) && route.alerts && route.alerts.length > 0;
    });
  }

  function getAlertMessages() {
    if (!vm.routes) return [];
    var allAlerts = [];
    vm.routes.forEach(function(route) {
      if (isRouteVisible(route) && route.alerts && route.alerts.length > 0) {
        route.alerts.forEach(function(alert) {
          if (!allAlerts.some(function(existing) {
            return existing.title === alert.title;
          })) {
            allAlerts.push(alert);
          }
        });
      }
    });
    return allAlerts.map(function(alert) { return alert.title; });
  }

  function isRouteVisible(route) {
    return ScreenConfig.hiddenRoutes.indexOf(route.global_route_id) === -1;
  }
} 