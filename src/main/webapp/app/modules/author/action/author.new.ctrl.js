(function () {
	'use strict';

	angular
	.module('main')
	.controller('AuthorNewCtrl', AuthorNewCtrl);

	function AuthorNewCtrl ($scope, $state, $location, AuthorService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.firstName = '';
		sc.lastName = '';
		sc.email = '';
		sc.birthday = new Date();
		
		sc.save = function () {
			sc.author = {
				'firstName': sc.firstName,
				'lastName': sc.lastName,
				'email':sc.email,
				'birthday': sc.birthday.getFullYear() + '-' + sc.birthday.getMonth() + '-' + sc.birthday.getDate()
			}

			if (sc.firstName != '' 
				&& sc.lastName != ''
				&& sc.email != ''
				&& sc.birthday != ''
				&& sc.authorForm.$valid
				) {
				AuthorService.new(sc.author)
				.success(function (data) {
					sc.author = null;
					sc.closeThisDialog(true);
					sc.loadPage(1);
				});
			}
			else alert('Error');
		}
	};
})();
