(function () {
	'use strict';

	angular
	.module('main')
	.controller('BookCtrl', BookCtrl);

	function BookCtrl ($scope, $state, $http, $stateParams, ngDialog, BookService) {
		var sc = $scope;

		sc.table = 'book';
		sc.base = '/' + sc.table;

		sc.tableHeader =  
		[ 
		'name',
		'publisherYear',
		'countPages',
		'sizeFile',
		'typeFile',
		'addressFileOnDisk',
		'addressFileOnNet'
		];

		sc.openEdit = function (id) {
			ngDialog.open({ 
				template: '/app/modules/book/action/book.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'BookEditCtrl',
				scope: $scope
			});
			sc.id = id; 
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/book/action/book.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'BookNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id; 
			ngDialog.open({ 
				template: '/app/modules/book/action/book.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'BookDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, name, publisherName, authorName) {
			
			BookService.getPage(currentPage - 1, 10, name, publisherName, authorName)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 
	};
})();
