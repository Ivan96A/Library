(function () {
	'use strict';

	angular
	.module('main')
	.controller('BookEditCtrl', BookEditCtrl);

	function BookEditCtrl ($scope, $state, $location, BookService, AuthorService, PublisherService) {
		var sc = $scope;

		sc.action = 'edit';

		AuthorService.getAll().success( function (data) {
			sc.authors = data.content;
		});

		PublisherService.getAll().success( function (data) {
			sc.publishers = data.content;
		});

		BookService.get(sc.id)
		.success(function (data) {
			sc.book = data;

			sc.id = sc.book.id;
			sc.name = sc.book.name;
			sc.publisherYear = new Date(sc.book.publisherYear);
			sc.countPages = sc.book.countPages;
			sc.sizeFile = sc.book.sizeFile;
			sc.addressFileOnDisk = sc.book.addressFileOnDisk;
			sc.addressFileOnNet = sc.book.addressFileOnNet;
			sc.selAuthor = sc.book.author;
			sc.selPublisher = sc.book.publisher;

			sc.checkForm = function () {
	            if (sc.name != ''
	                && sc.publisherYear != '' 
	                && sc.countPages != '' 
	                && sc.sizeFile != '' 
	                && sc.addressFileOnDisk != '' 
	                && sc.addressFileOnNet != '' 
	                && sc.selAuthor != '' 
	                && sc.selPublisher != '' 
	                && sc.bookForm.$valid
	                ) {
	                sc.formValid = true;
	            }
	            else sc.formValid = false;
	        }
 
			sc.save = function () {
				sc.book = {
					'id': sc.id,
					'name': sc.name,
	                'publisherYear': sc.publisherYear.getFullYear() + '-' + sc.publisherYear.getMonth() + '-' + sc.publisherYear.getDate(),
	                'countPages': sc.countPages,
	                'sizeFile': sc.sizeFile,
	                'addressFileOnDisk': sc.addressFileOnDisk,
	                'addressFileOnNet': sc.addressFileOnNet,
	                'author': sc.selAuthor,
	                'publisher': sc.selPublisher
				}

				if (sc.formValid) BookService.update(sc.book)
						.success(function() {
						    sc.closeThisDialog(true);
						    sc.loadPage(sc.currentPage);
						});
			}
		});
	}
})();
