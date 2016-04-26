(function () {
	'use strict';

	angular
	.module('main')
	.controller('PublisherEditCtrl', PublisherEditCtrl);

	function PublisherEditCtrl ($scope, $state, $location, PublisherService) {
		var sc = $scope;

		sc.action = 'Edit';

		PublisherService.get(sc.id)
		.success(function (data) {
			sc.publisher = data;

			sc.id = sc.publisher.id;
			sc.name = sc.publisher.name;
			sc.email = sc.publisher.email;
			sc.officialSite = sc.publisher.officialSite;
			sc.address = sc.publisher.address;
			sc.telephoneNumber = sc.publisher.telephoneNumber;

			sc.save = function () {
				sc.publisher = {
					'id': sc.id,
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
					PublisherService.update(sc.publisher)
					.success(function (data) {
						sc.loadPage(1);
						sc.publisher = null;
					});
					sc.closeThisDialog(true);
				}
			else alert('Error');
			}
		});
	}
})();
