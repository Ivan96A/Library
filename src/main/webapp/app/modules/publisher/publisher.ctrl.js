(function () {
	'use strict';

	angular
	.module('main')
	.controller('PublisherCtrl', PublisherCtrl);

	function PublisherCtrl ($scope, $state, PublisherService, ngDialog) {
		var sc = $scope;
		
		sc.table = 'publisher';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'name', 
		'email',
		'officialSite',
		'address',
		'telephoneNumber'
		];

		sc.openEdit = function (id) {
			ngDialog.open({ 
				template: '/app/modules/publisher/action/publisher.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'PublisherEditCtrl',
				scope: $scope
			});
			sc.id = id;
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/publisher/action/publisher.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'PublisherNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id; 
			ngDialog.open({ 
				template: '/app/modules/publisher/action/publisher.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'PublisherDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, name) {

			PublisherService.getPage(currentPage - 1, 10, name)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 
	};

})();
