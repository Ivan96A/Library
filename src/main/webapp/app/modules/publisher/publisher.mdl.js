(function () {
	'use strict';

	var publisher = angular.module('publisher', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.publisher', {
			url: 'publisher',
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.publisher.table', {
			url: '', 
			views: {
				'content@main.publisher': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'PublisherCtrl',
				},
				'filter@main.publisher.table': {
					templateUrl: '/app/modules/publisher/filter/publisher.filter.view.html'
				}
			}
		});
	}

})();
