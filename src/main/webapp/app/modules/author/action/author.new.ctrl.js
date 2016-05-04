(function () {
	'use strict';

	angular
	.module('main')
	.controller('AuthorNewCtrl', AuthorNewCtrl);

	function AuthorNewCtrl ($scope, $state, $location, AuthorService) {
		var sc = $scope;

		sc.action = 'add';
		sc.formValid = false;

		sc.firstName = '';
		sc.lastName = '';
		sc.email = '';
		sc.birthday = new Date();

		sc.checkForm = function () {
			if (sc.firstName != '' 
				&& sc.lastName != ''
				&& sc.email != ''
				&& sc.birthday != ''
				&& sc.authorForm.$valid
				) {
				sc.formValid = true;
			}
			else sc.formValid = false;
		}

		sc.save = function () {
			sc.author = {
				'firstName': sc.firstName,
				'lastName': sc.lastName,
				'email':sc.email,
				'birthday': sc.birthday.getFullYear() + '-' + sc.birthday.getMonth() + '-' + sc.birthday.getDate()
			}

			AuthorService.new(sc.author)
			.success(function (data) {
				sc.author = null;
				sc.closeThisDialog(true);
				sc.loadPage(sc.currentPage);
			});
		}
	};
})();
