'use strict';

angular.module('transitScreenApp')
  .directive('alertBanner', function () {
    return {
      template: '<div class="alert-banner" ng-if="ctrl.hasAlerts()">' +
                '  <div class="alert-content">' +
                '    <i class="alert-icon">⚠️</i>' +
                '    <span ng-repeat="msg in ctrl.getAlertMessages() track by $index">{{msg}}<span ng-if="!$last">, </span></span>' +
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
    getAlertMessages: getAlertMessages
  });

  function hasAlerts() {
    if (!vm.routes) return false;
    return vm.routes.some(function(route) {
      return route.alerts && route.alerts.length > 0;
    });
  }

  function getAlertMessages() {
    if (!vm.routes) return [];
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
    return allAlerts.map(function(alert) { return alert.title; });
  }
} 