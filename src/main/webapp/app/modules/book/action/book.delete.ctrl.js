(function () {
	'use strict';

	angular
	.module('main')
	.controller('BookDeleteCtrl', BookDeleteCtrl);

	function BookDeleteCtrl ($scope, $state, $location, BookService) {
		var sc = $scope;
		var bookName;

		BookService.get(sc.id)
	  		.success( function (data) {
	  			bookName = data.bookName;
				sc.log = 'Are you sure you want to remove book ' + bookName + '?';
	  		});

		sc.delete = function () {
			BookService.delete(sc.id)
			.then(function successCallback(response) {
				sc.closeThisDialog(true);
				sc.loadPage(1);
			  }, function errorCallback(response) {
			    	sc.log = 'Book "' + bookName + '" could not be deleted because is in use yet';
			  }); 
		}
	};
})();
