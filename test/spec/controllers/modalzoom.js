'use strict';

describe('Controller: ModalzoomCtrl', function () {

  // load the controller's module
  beforeEach(module('angularSimpleApp'));

  var ModalzoomCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalzoomCtrl = $controller('ModalzoomCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});