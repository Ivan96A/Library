(function() {
    'use strict';

    angular
    .module('main')
    .controller('BookNewCtrl', BookNewCtrl);

    function BookNewCtrl($scope, $state, $location, $document, BookService) {
        var sc = $scope;

        sc.action = 'add';

        sc.nameBook = ''; 
        sc.publisherYear = new Date();
        sc.countPages = '';
        sc.sizeFile = '';
        sc.addressFileOnDisk = '';
        sc.addressFileOnNet = '';

        sc.save = function() {
            sc.developer = {
                'nameBook': sc.nameBook,
                'publisherYear': sc.publisherYear.getFullYear() + '-' + sc.publisherYear.getMonth() + '-' + sc.publisherYear.getDate(),
                'countPages': sc.countPages,
                'sizeFile': sc.sizeFile,
                'addressFileOnDisk': sc.addressFileOnDisk,
                'addressFileOnNet': sc.addressFileOnNet
            };

            if (sc.nameBook != '' 
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