(function () {
	'use strict';

	angular
	.module('main')
	.controller('PublisherNewCtrl', PublisherNewCtrl);

	function PublisherNewCtrl ($scope, $state, $location, $sce, PublisherService) {
		var sc = $scope;

		sc.action = 'add';

		sc.formValid = false;
 
		sc.name = '';
		sc.email = '';
		sc.officialSite = '';
		sc.address = '';
		sc.telephoneNumber = '';

		sc.checkForm = function () {
			if (sc.name != '' 
				&& sc.email != ''
				&& sc.officialSite != ''
				&& sc.address != ''
				&& sc.telephoneNumber != ''
				&& sc.publisherForm.$valid
				) {
					sc.formValid = true;
				}
			else sc.formValid = false;

		}

		sc.save = function () {

			sc.soft = {
				'name': sc.name,
				'email': sc.email,
				'officialSite': sc.officialSite,
				'address': sc.address,
				'telephoneNumber': sc.telephoneNumber
			}


			PublisherService.new(sc.soft)
			.success(function (data) {
				sc.loadPage(1);
				sc.soft = null;
				sc.closeThisDialog(true);
			});
		}	
	}
})();
