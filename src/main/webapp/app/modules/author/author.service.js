(function () {
    'use strict';

    angular.module('main')
    .service('AuthorService', function ($http) {

        var urlBase = '/author';

        this.getAll = function () {
            return $http.get(urlBase);
        };

        this.get = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.new = function (license) {
            return $http.post(urlBase, license);
        };

        this.update = function (license) {
            return $http.put(urlBase, license)
        };

        this.delete = function (id) {
            return $http.delete(urlBase, { 
                    params: { 
                        id: id
                    }
                }); 
        };

        this.getPage = function (currentPage, size, name) {
            return $http.get(urlBase, { 
                    params: { 
                        page: currentPage, 
                        size: size ,
                        name: name
                    }
            });
        };

    });

})();
