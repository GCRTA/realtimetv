'use strict';

angular
  .module('transitScreenApp')
  .controller('ConfigCtrl', ConfigCtrl);

function ConfigCtrl($rootScope, $state, $translate, ScreenConfig) {
  var vm = this;

  angular.extend(vm, {
    config: ScreenConfig,

    timeFormats: [{ name: '12 Hours', format: 'hh:mm A' }, { name: '24 Hours', format: 'HH:mm' }],
    locales: [{ name: 'English', lang: 'en' }, { name: 'Français', lang: 'fr' }],
    fontSizes: [
      { name: 'Normal', value: 'normal' },
      { name: 'Large', value: 'large' },
      { name: 'Larger', value: 'larger' }
    ],
    locale: $translate.instant('en'),
    onLocaleSelected: onLocaleSelected,

    clevelandLocations: [
      { name: 'Current Location', lat: null, lng: null, isCurrent: true },
      { name: 'Airport Rapid Sttion', lat: 41.410592808463434, lng: --81.83658490145679 },
      { name: 'Brookpark Rapid Station', lat: 41.41950486951733, lng: -81.82418132038563 },
      { name: 'Cedar-University Rapid Station', lat: 41.50036132078834, lng: -81.60534902710886 },
      { name: 'East 55th Rapid Station', lat: 41.48079481401043, lng: -81.651139574465 },
      { name: 'Louis Stokes-Windermere Rapid Station', lat: 41.53069557710576, lng: -81.58482870329816}, 
      { name: 'Parma Transit Center', lat: 41.38035320222386, lng: -81.74542397622126},
      { name: 'Puritas-West 150th Rapid Station', lat: 41.44093227491849, lng: -81.80560850820272},
      { name: 'Southgate Transit Center', lat: 41.41333392107179, lng: -81.53647891669462},
      { name: 'Stephanie Tubbs Jones Transit Center', lat: 41.500025812857956, lng: -81.6748355554305},
      { name: 'Superior Rapid Station', lat: 41.52310095279765, lng:  -81.5922001030831},
      { name: 'Tower City', lat: 41.497652542726684, lng: -81.6939645456291 }, 
      { name: 'Triskett Rapid Station', lat:  41.46625379002145, lng: -81.78495719082885 },
      { name: 'West 117th-Madison Rapid Station', lat: 41.47651762302907, lng: -81.76794446097082 }, 
      { name: 'West 65th-Lorain Rapid Station', lat: 41.47644077437727, lng:  -81.72816820964225 },
      { name: 'West Blvd-Cudell Rapid Station', lat: 41.48041154114498, lng:  -81.75330820687311 },
      { name: 'West Park Rapid Station', lat: 41.45732062480089, lng: -81.79265481189485 },
      { name: 'Westgate Transit Center', lat: 41.46085157401124, lng: -81.85454734747715 } 
    ],
    onLocationSelected: onLocationSelected,

    isHidden: isHidden,
    unhide: unhide,

    save: save,
    duplicate: duplicate,
    closePanel: closePanel,
    exportConfig: exportConfig,
    importConfig: importConfig
  });

  // Initialize current location
  ScreenConfig.getCurrentLocation().then(function(location) {
    vm.clevelandLocations[0].lat = location.latitude;
    vm.clevelandLocations[0].lng = location.longitude;
  });

  function onLocaleSelected(locale) {
    $translate.use(locale.lang);
  }

  function onLocationSelected(location) {
    if (location.isCurrent) {
      ScreenConfig.getCurrentLocation().then(function(currentLocation) {
        ScreenConfig.latLng = {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude
        };
        $rootScope.$emit('locationChanged');
      });
    } else {
      ScreenConfig.latLng = {
        latitude: location.lat,
        longitude: location.lng
      };
      $rootScope.$emit('locationChanged');
    }
  }

  function isHidden(route) {
    return ScreenConfig.hiddenRoutes.indexOf(route.global_route_id) !== -1;
  }

  function unhide(route) {
    var index = ScreenConfig.hiddenRoutes.indexOf(route.global_route_id);

    if (index !== -1) {
      ScreenConfig.hiddenRoutes.splice(index, 1);
      ScreenConfig.save();
    }
  }

  function save() {
    ScreenConfig.save();
    closePanel();
  }

  function duplicate() {
    ScreenConfig.id = '';
    $state.go('main', {}, {
      notify: false,
      reload: false,
      location: 'replace',
      inherit: true
    });
  }

  function closePanel() {
    ScreenConfig.isEditing = false;
  }

  function exportConfig() {
    var config = angular.copy(ScreenConfig);
    delete config.isEditing;
    var configStr = JSON.stringify(config, null, 2);
    
    // Copy to clipboard
    var textArea = document.createElement('textarea');
    textArea.value = configStr;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    alert('Configuration copied to clipboard!');
  }

  function findMatchingLocation(lat, lng) {
    // Helper function to compare coordinates with a small tolerance
    function coordinatesMatch(lat1, lng1, lat2, lng2) {
      var tolerance = 0.0001; // About 11 meters
      return Math.abs(lat1 - lat2) < tolerance && Math.abs(lng1 - lng2) < tolerance;
    }

    // Check each predefined location
    for (var i = 0; i < vm.clevelandLocations.length; i++) {
      var location = vm.clevelandLocations[i];
      if (location.lat !== null && location.lng !== null && 
          coordinatesMatch(lat, lng, location.lat, location.lng)) {
        return location;
      }
    }
    return null;
  }

  function importConfig() {
    var configStr = prompt('Paste your configuration JSON here:');
    if (!configStr) return;
    
    try {
      var config = JSON.parse(configStr);
      
      // Validate required fields
      var requiredFields = ['latLng', 'timeFormat', 'autoscrollEnabled', 'autoscrollInterval'];
      var missingFields = requiredFields.filter(field => !config.hasOwnProperty(field));
      
      if (missingFields.length > 0) {
        alert('Invalid configuration: Missing required fields: ' + missingFields.join(', '));
        return;
      }
      
      // Validate latLng structure
      if (!config.latLng.latitude || !config.latLng.longitude) {
        alert('Invalid configuration: latLng must contain latitude and longitude');
        return;
      }
      
      // Check if the imported config has coordinates that match a predefined location
      if (config.latLng) {
        var matchingLocation = findMatchingLocation(config.latLng.latitude, config.latLng.longitude);
        if (matchingLocation) {
          vm.selectedLocation = matchingLocation;
        }
      }
      
      angular.extend(ScreenConfig, config);
      ScreenConfig.save();
      $rootScope.$emit('locationChanged');
      alert('Configuration imported successfully!');
    } catch (e) {
      if (e instanceof SyntaxError) {
        alert('Invalid JSON format. Please check your configuration and try again.');
      } else {
        alert('Error importing configuration: ' + e.message);
      }
    }
  }
}
