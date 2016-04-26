(function () {
	'use strict';

	var book = angular.module('book', [
		'ui.router'
		])
	.config(configure);
 

	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.book', {
			url: 'book',
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.book.table', {
			url: '',
			views: {
				'content@main.book': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'BookCtrl'
				},
				'filter@main.book.table': {
					templateUrl: '/app/modules/book/filter/book.filter.view.html'
				}

			}
		})
		.state('main.book.profile', { 
			url: '/:id',
			views: {
				'content@main.book': {
					templateUrl: '/app/modules/book/profile/book.profile.view.html',
					controller: 'BookProfileCtrl'
				}
			}
		});
	}

})();
