(function () {
	'use strict';

	angular
	.module('main')
	.controller('BookProfileCtrl', BookProfileCtrl);

	function BookProfileCtrl ($scope, $state, $stateParams, ngDialog, BookService) {
		var sc = $scope;
		sc.table = 'book';

		sc.id = $stateParams.id;

		sc.target = { 
				target: '/book/image?id=' + $stateParams.id,
				testChunks: false,
				singleFile: true
			};

		BookService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;
	  		});

	  	sc.getLogoById = function (id) {
	  		BookService.getLogo(id)
	  		.success( function (data) { 
	  			sc.bookImage = data.image;
	  		});
	  	}

	  	sc.openLogoUpload = function () {
	  		ngDialog.open({ 
				template: '/app/modules/book/profile/book.logo.upload.view.html', 
				className: 'ngdialog-theme-default',
				showClose: true,
				scope: $scope
			});
	  	}

	  	sc.getLogoById(sc.id);

	};
})();
