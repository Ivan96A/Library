(function () {
	'use strict';

	angular
	.module('main')
	.controller('PublisherDeleteCtrl', PublisherDeleteCtrl);

	function PublisherDeleteCtrl ($scope, $state, $location, PublisherService) {
		var sc = $scope;

		var publisherName;

		PublisherService.get(sc.id)
	  		.success( function (data) {
	  			publisherName = data.name;
				sc.log = 'Are you sure you want to remove publisher ' + publisherName + '?';
	  		});

		sc.delete = function () {
			PublisherService.delete(sc.id)
			.then(function successCallback(response) {
				sc.closeThisDialog(true);
				sc.loadPage(1);
			  }, function errorCallback(response) {
			    	sc.log = 'Publisher "' + publisherName + '" could not be deleted because is in use yet';
			  }); 
		}
	};
})();
