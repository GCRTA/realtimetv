'use strict';

angular.module('transitScreenApp')
  .directive('alertBanner', function () {
    return {
      template: '<div class="alert-banner" ng-if="ctrl.hasAlerts()">' +
                '  <div class="alert-content">' +
                '    <i class="alert-icon">⚠️</i>' +
                '    <span ng-bind="ctrl.getAlertMessage()"></span>' +
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

function AlertBannerCtrl() {
  var vm = this;

  angular.extend(vm, {
    hasAlerts: hasAlerts,
    getAlertMessage: getAlertMessage
  });

  function hasAlerts() {
    if (!vm.routes) return false;
    return vm.routes.some(function(route) {
      return route.alerts && route.alerts.length > 0;
    });
  }

  function getAlertMessage() {
    if (!vm.routes) return '';
    
    // Get all unique alerts across routes
    var allAlerts = [];
    vm.routes.forEach(function(route) {
      if (route.alerts && route.alerts.length > 0) {
        route.alerts.forEach(function(alert) {
          if (!allAlerts.some(function(existing) {
            return existing.title === alert.title;
          })) {
            allAlerts.push(alert);
          }
        });
      }
    });

    // Return the first alert's title if there are any alerts
    return allAlerts.length > 0 ? allAlerts[0].title : '';
  }
} 