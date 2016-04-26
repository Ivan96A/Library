(function () {
	'use strict';

	var author = angular.module('author', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.author', {
			url: 'author',
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.author.table', {
			url: '', 
			views: {
				'content@main.author': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'AuthorCtrl',
				},
				'filter@main.author.table': {
					templateUrl: '/app/modules/author/filter/author.filter.view.html'
				}
			}
		})
		.state('main.author.profile', { 
			url: '/:id',
			views: {
				'content@main.author': {
					templateUrl: '/app/modules/author/profile/author.profile.view.html',
					controller: 'AuthorProfileCtrl'
				}
			}
		});

	}

})();
