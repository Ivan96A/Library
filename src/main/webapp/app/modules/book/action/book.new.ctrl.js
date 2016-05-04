(function() {
    'use strict';

    angular
    .module('main')
    .controller('BookNewCtrl', BookNewCtrl);

    function BookNewCtrl($scope, $state, $location, $document, BookService) {
        var sc = $scope;

        sc.action = 'add';

        sc.name = '';
        sc.publisherYear = new Date();
        sc.countPages = '';
        sc.sizeFile = '';
        sc.addressFileOnDisk = '';
        sc.addressFileOnNet = '';

        sc.save = function() {
            sc.developer = {
                'name': sc.name,
                'publisherYear': sc.publisherYear.getFullYear() + '-' + sc.publisherYear.getMonth() + '-' + sc.publisherYear.getDate(),
                'countPages': sc.countPages,
                'sizeFile': sc.sizeFile,
                'addressFileOnDisk': sc.addressFileOnDisk,
                'addressFileOnNet': sc.addressFileOnNet,
                'author': {"id":1,"firstName":"Ivan","lastName":"Arabchuk","email":"ivan@mail.com","birthday":"1996-09-12"},
                'publisher': {"id":1,"name":"Svitanok","email":"svit@mail.com","officialSite":"svit.com","address":"Kiyv","telephoneNumber":"09932423423"},
                'typeFile': {}
            };

            if (sc.name != ''
            	&& sc.publisherYear != '' 
            	&& sc.countPages != '' 
            	&& sc.sizeFile != '' 
            	&& sc.addressFileOnDisk != '' 
            	&& sc.addressFileOnNet != '' 
            ) {
                BookService.new(sc.developer)
					.success(function() {
					    sc.closeThisDialog(true);
					    sc.loadPage(1);
					});
            } else alert('Error');
        };

    };
})();
