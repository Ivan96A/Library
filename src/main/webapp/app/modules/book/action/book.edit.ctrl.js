(function () {
	'use strict';

	angular
	.module('main')
	.controller('BookEditCtrl', BookEditCtrl);

	function BookEditCtrl ($scope, $state, $location, BookService) {
		var sc = $scope;

		sc.action = 'edit';

		sc.target = { 
				target: '/dev/logo?id=' + sc.id,
				testChunks: false,
				singleFile: true
			};

		BookService.get(sc.id)
		.success(function (data) {
			sc.book = data;

			sc.id = sc.book.id;
			sc.nameBook = sc.book.nameBook;
			sc.publisherYear = new Date(sc.book.publisherYear);
			sc.countPages = sc.book.countPages;
			sc.sizeFile = sc.book.sizeFile;
			sc.addressFileOnDisk = sc.book.addressFileOnDisk;
			sc.addressFileOnNet = sc.book.addressFileOnNet;
 
			sc.save = function () {
				sc.book = {
					'nameBook': sc.nameBook,
	                'publisherYear': sc.publisherYear,
	                'countPages': sc.countPages,
	                'sizeFile': sc.sizeFile,
	                'addressFileOnDisk': sc.addressFileOnDisk,
	                'addressFileOnNet': sc.addressFileOnNet
				}

				if (sc.nameBook != '' 
	            	&& sc.publisherYear != '' 
	            	&& sc.countPages != '' 
	            	&& sc.sizeFile != '' 
	            	&& sc.addressFileOnDisk != '' 
	            	&& sc.addressFileOnNet != '' 
            	) {
	                BookService.update(sc.book)
						.success(function() {
						    sc.closeThisDialog(true);
						    sc.loadPage(1);
						});
            	} else alert('Error');
			}
		});
	}
})();
