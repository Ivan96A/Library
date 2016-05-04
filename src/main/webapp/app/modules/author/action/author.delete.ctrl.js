(function () {
	'use strict';

	angular
	.module('main')
	.controller('AuthorDeleteCtrl', AuthorDeleteCtrl);

	function AuthorDeleteCtrl ($scope, $state, $location, AuthorService) {
		var sc = $scope;
		var authorName;

		AuthorService.get(sc.id)
	  		.success( function (data) {
	  			authorName = data.firstName;
				sc.log = 'Are you sure you want to remove author ' + authorName + '?';
	  		});

		sc.delete = function () {
			AuthorService.delete(sc.id)
			.then(function successCallback(response) {
				sc.closeThisDialog(true);
				sc.loadPage(sc.currentPage);
			  }, function errorCallback(response) {
			    	sc.log = 'Author "'+ authorName +'" could not be deleted because is in use yet';
			  }); 

		}
	};
})();
