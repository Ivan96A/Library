(function () {
	'use strict';

	angular
	.module('main')
	.controller('AuthorEditCtrl', AuthorEditCtrl);

	function AuthorEditCtrl ($scope, $state, $location, AuthorService) {
		var sc = $scope;
		sc.action = 'edit';
		sc.formValid = false;

		AuthorService.get(sc.id)
		.success(function (data) {
			sc.author = data;

			sc.id = sc.author.id;
			sc.firstName = sc.author.firstName;
			sc.lastName = sc.author.lastName;
			sc.email = sc.author.email;
			sc.birthday = new Date(sc.author.birthday);

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
					'id': sc.id,
					'firstName': sc.firstName,
					'lastName': sc.lastName,
					'email': sc.email,
					'birthday': sc.birthday.getFullYear() + '-' + sc.birthday.getMonth() + '-' + sc.birthday.getDate()
				}

				AuthorService.update(sc.author)
				.success(function (data) {
					sc.author = null;
					sc.closeThisDialog(true);
					sc.loadPage(1);
				});
				
			}
		});
	}
})();
