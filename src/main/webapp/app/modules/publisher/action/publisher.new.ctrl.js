(function () {
	'use strict';

	angular
	.module('main')
	.controller('PublisherNewCtrl', PublisherNewCtrl);

	function PublisherNewCtrl ($scope, $state, $location, PublisherService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.name = '';
		sc.email = '';
		sc.officialSite = '';
		sc.address = '';
		sc.telephoneNumber = '';

		sc.save = function () {

			sc.soft = {
				'name': sc.name,
				'email': sc.email,
				'officialSite': sc.officialSite,
				'address': sc.address,
				'telephoneNumber': sc.telephoneNumber
			}

			if (sc.name != '' 
				&& sc.email != ''
				&& sc.officialSite != ''
				&& sc.address != ''
				&& sc.telephoneNumber != ''
				&& sc.publisherForm.$valid
				) {
				PublisherService.new(sc.soft)
				.success(function (data) {
					sc.loadPage(1);
					sc.soft = null;
					sc.closeThisDialog(true);
				});
			}
			else alert('Error');
		}
	}
})();
