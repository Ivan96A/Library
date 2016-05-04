(function () {
	'use strict';

	angular
	.module('main')
	.controller('AuthorCtrl', AuthorCtrl);

	function AuthorCtrl($scope, $state, AuthorService, ngDialog) {
		var sc = $scope;
  
		sc.table = 'author';
		sc.base = '/' + sc.table;

		sc.currentDate = new Date().getFullYear();

		sc.getAge = function () {
			if (sc.birthday != '') alert(sc.birthday);
			else sc.age = null;
		}

		sc.tableHeader = 
		[
		'firstName', 
		'lastName',
		'email',
		'birthday'
		];

		sc.openEdit = function (id) {
			ngDialog.open({ 
				template: '/app/modules/author/action/author.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'AuthorEditCtrl',
				scope: $scope
			});
			sc.id = id;
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/author/action/author.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'AuthorNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id;
			ngDialog.open({ 
				template: '/app/modules/author/action/author.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'AuthorDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, name) {
			AuthorService.getPage(currentPage - 1, 10, name)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 
	};

})();
