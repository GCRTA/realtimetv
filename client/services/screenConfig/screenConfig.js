'use strict';

angular
  .module('transitScreenApp')
  .factory('ScreenConfig', ScreenConfig);

function ScreenConfig($rootScope, $state, $http, $q, $cookies) {
  var vm = this,
    _deferred = null

  Object.defineProperty(vm, 'latLngStr', {
    get: function() { return vm.latLng.latitude + ', ' + vm.latLng.longitude; },
    set: function(val) {
      if (val) {
        var latLngArr = val.split(',');
        vm.latLng = {
          latitude: parseFloat(latLngArr[0].trim()),
          longitude: parseFloat(latLngArr[1].trim())
        };
      }

      $rootScope.$emit('locationChanged');
    }
  });

  angular.extend(vm, {
    id: '',

    isEditing: true,
    title: '',
    routeOrder: [],
    hiddenRoutes: [],
    latLng: {
      latitude: 41.4995,  // Default to Public Square, Cleveland
      longitude: -81.6954
    },

    timeFormat: 'HH:mm',
    autoscrollEnabled: true,
    autoscrollInterval: 10, // seconds
    routesPerRow: 4, // number of routes to display per row
    fontSize: 'normal', // font size setting: 'normal', 'large', 'larger'

    load: load,
    save: save,
    getCurrentLocation: getCurrentLocation
  });

  return vm;

  function getCurrentLocation() {
    var deferred = $q.defer();
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          vm.latLng = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          $rootScope.$emit('locationChanged');
          deferred.resolve(vm.latLng);
        },
        function(error) {
          console.warn('Error getting location:', error);
          deferred.resolve(vm.latLng); // Resolve with default location if there's an error
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser');
      deferred.resolve(vm.latLng); // Resolve with default location if geolocation is not supported
    }

    return deferred.promise;
  }

  function load() {
    if (!_deferred) {
      _deferred = $q.defer();

      var loadedConfig = $cookies.get('config');
      if (loadedConfig) {
        angular.extend(vm, JSON.parse(loadedConfig));
        vm.isEditing = false;
      } else {
        // If no saved config, get current location
        vm.getCurrentLocation();
      }

      _deferred.resolve(vm);
    }

    return _deferred.promise;
  }

  function save() {
    var deferred = $q.defer(),
      config = {};

    angular.extend(config, vm);
    delete config.isEditing;

    $cookies.put('config', JSON.stringify(config));
    deferred.resolve(true);

    return deferred.promise;
  }
}
