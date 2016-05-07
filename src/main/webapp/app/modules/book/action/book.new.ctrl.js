(function() {
    'use strict';

    angular
    .module('main')
    .controller('BookNewCtrl', BookNewCtrl);

    function BookNewCtrl($scope, $state, $location, $document, BookService, AuthorService, PublisherService) {
        var sc = $scope;

        sc.action = 'add';

        sc.name = '';
        sc.publisherYear = new Date();
        sc.countPages = '';
        sc.sizeFile = '';
        sc.addressFileOnDisk = '';
        sc.addressFileOnNet = '';
        sc.selAuthor = '';
        sc.selPublisher = '';
        sc.typeFile = '';

        AuthorService.getAll().success( function (data) {
            sc.authors = data.content;
        });

        PublisherService.getAll().success( function (data) {
            sc.publishers = data.content;
        });

        sc.checkForm = function () {
            if (sc.name != ''
                && sc.publisherYear != '' 
                && sc.countPages != '' 
                && sc.sizeFile != '' 
                && sc.addressFileOnDisk != '' 
                && sc.addressFileOnNet != '' 
                && sc.selAuthor != '' 
                && sc.selPublisher != ''
                && sc.typeFile != '' 
                && sc.bookForm.$valid
                ) {
                sc.formValid = true;
            }
            else sc.formValid = false;
        }

        sc.save = function() {
            sc.developer = {
                'name': sc.name,
                'publisherYear': sc.publisherYear.getFullYear() + '-' + sc.publisherYear.getMonth() + '-' + sc.publisherYear.getDate(),
                'countPages': sc.countPages,
                'sizeFile': sc.sizeFile,
                'addressFileOnDisk': sc.addressFileOnDisk,
                'addressFileOnNet': sc.addressFileOnNet,
                'author': sc.selAuthor,
                'publisher': sc.selPublisher,
                'typeFile': sc.typeFile
            };

            if (sc.formValid) BookService.new(sc.developer)
					.success(function() {
					    sc.closeThisDialog(true);
					    sc.loadPage(sc.currentPage);
					});
        };

    };
})();
