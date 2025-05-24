'use strict';

angular
  .module('transitScreenApp')
  .controller('NavbarCtrl', NavbarCtrl);

function NavbarCtrl($rootScope, $interval, $translate, ScreenConfig) {
  var vm = this;

  angular.extend(vm, {
    config: ScreenConfig,
    currentTime: new Date(),
    titlePlaceholder: 'Greater Cleveland RTA',

    editConfig: editConfig
  });

  $interval(function () {
    vm.currentTime = new Date();
  }, 1000);

  function editConfig() {
    ScreenConfig.isEditing = true;
  }
  
}
