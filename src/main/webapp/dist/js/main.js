(function () {
	'use strict';

	var main = angular.module('main', [
		'book',
		'author',
		'publisher',
		'ui.router',
		'ui.bootstrap',
		'ngResource',
		'ngAnimate',
		'pascalprecht.translate', 
		'base64',
		'flow',
		'ngDialog'
		])
	.config(configure).
	run(run);


	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider'];
	function configure ($stateProvider, $urlRouterProvider, $translateProvider) {

		$urlRouterProvider.otherwise(function ($injector) {
			var $state = $injector.get("$state");
			$state.go('main.home');
		});

		$stateProvider
		.state('main', {
			url: '/',
			abstract: true,
			templateUrl: '/app/components/main/main.view.html',
			controller: 'SidebarCtrl'
		})
		.state('main.home', {
			url: 'home',
			views: {
				'': {
					templateUrl: '/app/components/home/home.view.html'
				}
			}
		});

		$translateProvider.useStaticFilesLoader({
            prefix: '/app/resources/lang/',
            suffix: '.json'
          });
	}

	function run($translate, $rootScope, $templateCache) {
		$translate.use('uk');
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('AuthorCtrl', AuthorCtrl);

	function AuthorCtrl($scope, $state, AuthorService, ngDialog) {
		var sc = $scope;
  
		sc.table = 'author';
		sc.base = '/' + sc.table;

		sc.currentDate = new Date().getFullYear();

		sc.getAge = function () {
			if (sc.birthday != '') alert(sc.birthday);
			else sc.age = null;
		}

		sc.tableHeader = 
		[
		'firstName', 
		'lastName',
		'email',
		'birthday'
		];

		sc.openEdit = function (id) {
			ngDialog.open({ 
				template: '/app/modules/author/action/author.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'AuthorEditCtrl',
				scope: $scope
			});
			sc.id = id;
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/author/action/author.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'AuthorNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id;
			ngDialog.open({ 
				template: '/app/modules/author/action/author.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'AuthorDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, name) {
			AuthorService.getPage(currentPage - 1, 10, name)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 
	};

})();

(function () {
	'use strict';

	var author = angular.module('author', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.author', {
			url: 'author',
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.author.table', {
			url: '', 
			views: {
				'content@main.author': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'AuthorCtrl',
				},
				'filter@main.author.table': {
					templateUrl: '/app/modules/author/filter/author.filter.view.html'
				}
			}
		});

	}

})();

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

(function () {
	'use strict';

	angular
	.module('main')
	.controller('BookCtrl', BookCtrl);

	function BookCtrl ($scope, $state, $http, $stateParams, ngDialog, BookService) {
		var sc = $scope;

		sc.table = 'book';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[ 
		'name',
		'publisherYear',
		'countPages',
		'sizeFile',
		'addressFileOnDisk',
		'addressFileOnNet'
		];

		sc.openEdit = function (id) {
			ngDialog.open({ 
				template: '/app/modules/book/action/book.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'BookEditCtrl',
				scope: $scope
			});
			sc.id = id; 
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/book/action/book.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'BookNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id; 
			ngDialog.open({ 
				template: '/app/modules/book/action/book.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'BookDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, name, publisherName, authorName) {
			
			BookService.getPage(currentPage - 1, 10, name, publisherName, authorName)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 
	};
})();

(function () {
	'use strict';

	var book = angular.module('book', [
		'ui.router'
		])
	.config(configure);
 

	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.book', {
			url: 'book',
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.book.table', {
			url: '',
			views: {
				'content@main.book': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'BookCtrl'
				},
				'filter@main.book.table': {
					templateUrl: '/app/modules/book/filter/book.filter.view.html'
				}

			}
		})
		.state('main.book.profile', { 
			url: '/:id',
			views: {
				'content@main.book': {
					templateUrl: '/app/modules/book/profile/book.profile.view.html',
					controller: 'BookProfileCtrl'
				}
			}
		});
	}

})();

(function () {
    'use strict';

    angular.module('main')
    .service('BookService', function ($http) {

        var urlBase = '/book';

        this.getAll = function () {
            return $http.get(urlBase, { 
                    params: { 
                        page: 0, 
                        size: 1000
                    }
                });
        };  

        this.get = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.new = function (dev) {
            return $http.post(urlBase, dev); 
        };

        this.update = function (dev) {
            return $http.put(urlBase, dev)
        };

        this.delete = function (id) {
            return $http.delete(urlBase, { 
                    params: { 
                        id: id
                    }
                }); 
        };

        this.getPage = function (page, size, name, publisherName, authorName) {
            return $http.get(urlBase, { 
                    params: { 
                        publisherName: publisherName,
                        authorName: authorName,
                        name: name,
                        page: page, 
                        size: size 
                    }
            });
        };

        this.uploadImage = function (file, id) {
            var fd = new FormData();
            fd.append('file', file);

            return $http.post(urlBase + '/upload', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined },
                params: { id: id }
            });
        }

        this.getLogo = function (id) {
            return $http.get(urlBase + '/logo', { 
                    params: { 
                        id: id
                    }
            });
        }
    });

})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('PublisherCtrl', PublisherCtrl);

	function PublisherCtrl ($scope, $state, PublisherService, ngDialog) {
		var sc = $scope;
		
		sc.table = 'publisher';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'name', 
		'email',
		'officialSite',
		'address',
		'telephoneNumber'
		];

		sc.openEdit = function (id) {
			ngDialog.open({ 
				template: '/app/modules/publisher/action/publisher.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'PublisherEditCtrl',
				scope: $scope
			});
			sc.id = id;
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/publisher/action/publisher.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'PublisherNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id; 
			ngDialog.open({ 
				template: '/app/modules/publisher/action/publisher.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'PublisherDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, name) {

			PublisherService.getPage(currentPage - 1, 10, name)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 
	};

})();

(function () {
	'use strict';

	var publisher = angular.module('publisher', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.publisher', {
			url: 'publisher',
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.publisher.table', {
			url: '', 
			views: {
				'content@main.publisher': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'PublisherCtrl',
				},
				'filter@main.publisher.table': {
					templateUrl: '/app/modules/publisher/filter/publisher.filter.view.html'
				}
			}
		});
	}

})();

(function () {
    'use strict';

    angular.module('main')
    .service('PublisherService', function ($http) {

        var urlBase = '/publisher';

        this.getAll = function () {
            return $http.get(urlBase, { 
                    params: { 
                        page: 0, 
                        size: 1000
                    }
                });
        };

        this.get = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.new = function (software) {
            return $http.post(urlBase, software);
        };

        this.update = function (software) {
            return $http.put(urlBase, software)
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
                        size: size,
                        name: name
                    }
            });
        };

        this.getImages = function (id) {
            return $http.get(urlBase + '/images', { 
                    params: { 
                        id: id
                    }
            });
        }

        this.deleteImageById = function (id) {
            return $http.delete(urlBase + '/images', { 
                    params: { 
                        id: id
                    }
            });
        }

    });

})();

(function () {
    'use strict';

    angular
    .module('main')
    .filter('phone', function () {
        return function (tel) {
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
            country = 1;
            city = value.slice(0, 3);
            number = value.slice(3);
            break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
            country = value[0];
            city = value.slice(1, 4);
            number = value.slice(4);
            break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
            country = value.slice(0, 3);
            city = value.slice(3, 5);
            number = value.slice(5);
            break;

            default:
            return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});

})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SidebarCtrl', SidebarCtrl);

	function SidebarCtrl($scope, $location) {  
		var sc = $scope;   

        sc.location = function() {
            return $location.path();
        }    

    }
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('TableCtrl', TableCtrl);

	function TableCtrl($scope, $state, $http) {  
		var sc = $scope;
		
    	sc.field = sc.tableHeader[0];

        sc.setField = function(field) {
            sc.field = field;
        }

        //Sort 
        sc.fieldName = undefined;
        sc.reverse = false;

        sc.sort = function(fieldName) {
            sc.reverse = (sc.fieldName === fieldName) ? !sc.reverse:false;
            sc.fieldName = fieldName;
        }

        sc.isSortUp = function(fieldName) {
        	return sc.fieldName === fieldName && !sc.reverse;
        };

        sc.isSortDown = function(fieldName) {
        	return sc.fieldName === fieldName && sc.reverse;
        };
    
    }
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('TranslateCtrl', TranslateCtrl);

	function TranslateCtrl ($scope, $translate) {
		var sc = $scope;
		
		$translate.use('en');

		sc.setLang = function(language) {
			$translate.use(language.toString());
			alert();
		};
		
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('AuthorDeleteCtrl', AuthorDeleteCtrl);

	function AuthorDeleteCtrl ($scope, $state, $location, AuthorService) {
		var sc = $scope;
		var authorName;

		AuthorService.get(sc.id)
	  		.success( function (data) {
	  			authorName = data.firstName;
				sc.log = 'Are you sure you want to remove author ' + authorName + '?';
	  		});

		sc.delete = function () {
			AuthorService.delete(sc.id)
			.then(function successCallback(response) {
				sc.closeThisDialog(true);
				sc.loadPage(sc.currentPage);
			  }, function errorCallback(response) {
			    	sc.log = 'Author "'+ authorName +'" could not be deleted because is in use yet';
			  }); 

		}
	};
})();

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
					sc.loadPage(sc.currentPage);
				});
				
			}
		});
	}
})();

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

(function () {
	'use strict';

	angular
	.module('main')
	.controller('BookDeleteCtrl', BookDeleteCtrl);

	function BookDeleteCtrl ($scope, $state, $location, BookService) {
		var sc = $scope;
		var bookName;

		BookService.get(sc.id)
	  		.success( function (data) {
	  			bookName = data.bookName;
				sc.log = 'Are you sure you want to remove book ' + bookName + '?';
	  		});

		sc.delete = function () {
			BookService.delete(sc.id)
			.then(function successCallback(response) {
				sc.closeThisDialog(true);
				sc.loadPage(sc.currentPage);
			  }, function errorCallback(response) {
			    	sc.log = 'Book "' + bookName + '" could not be deleted because is in use yet';
			  }); 
		}
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('BookEditCtrl', BookEditCtrl);

	function BookEditCtrl ($scope, $state, $location, BookService, AuthorService, PublisherService) {
		var sc = $scope;

		sc.action = 'edit';

		AuthorService.getAll().success( function (data) {
			sc.authors = data.content;
		});

		PublisherService.getAll().success( function (data) {
			sc.publishers = data.content;
		});

		BookService.get(sc.id)
		.success(function (data) {
			sc.book = data;

			sc.id = sc.book.id;
			sc.name = sc.book.name;
			sc.publisherYear = new Date(sc.book.publisherYear);
			sc.countPages = sc.book.countPages;
			sc.sizeFile = sc.book.sizeFile;
			sc.addressFileOnDisk = sc.book.addressFileOnDisk;
			sc.addressFileOnNet = sc.book.addressFileOnNet;
			sc.selAuthor = sc.book.author;
			sc.selPublisher = sc.book.publisher;

			sc.checkForm = function () {
	            if (sc.name != ''
	                && sc.publisherYear != '' 
	                && sc.countPages != '' 
	                && sc.sizeFile != '' 
	                && sc.addressFileOnDisk != '' 
	                && sc.addressFileOnNet != '' 
	                && sc.selAuthor != '' 
	                && sc.selPublisher != '' 
	                && sc.bookForm.$valid
	                ) {
	                sc.formValid = true;
	            }
	            else sc.formValid = false;
	        }
 
			sc.save = function () {
				sc.book = {
					'id': sc.id,
					'name': sc.name,
	                'publisherYear': sc.publisherYear.getFullYear() + '-' + sc.publisherYear.getMonth() + '-' + sc.publisherYear.getDate(),
	                'countPages': sc.countPages,
	                'sizeFile': sc.sizeFile,
	                'addressFileOnDisk': sc.addressFileOnDisk,
	                'addressFileOnNet': sc.addressFileOnNet,
	                'author': sc.selAuthor,
	                'publisher': sc.selPublisher
				}

				if (sc.formValid) BookService.update(sc.book)
						.success(function() {
						    sc.closeThisDialog(true);
						    sc.loadPage(sc.currentPage);
						});
			}
		});
	}
})();

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
                'typeFile': {}
            };

            if (sc.formValid) BookService.new(sc.developer)
					.success(function() {
					    sc.closeThisDialog(true);
					    sc.loadPage(sc.currentPage);
					});
        };

    };
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('BookProfileCtrl', BookProfileCtrl);

	function BookProfileCtrl ($scope, $state, $stateParams, ngDialog, BookService) {
		var sc = $scope;
		sc.table = 'book';

		sc.id = $stateParams.id;

		sc.target = { 
				target: '/book/logo?id=' + $stateParams.id,
				testChunks: false,
				singleFile: true
			};

		BookService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;
	  		});

	  	sc.getLogoById = function (id) {
	  		BookService.getLogo(id)
	  		.success( function (data) {
	  			sc.devLogo = '';
	  			sc.devLogo = data;
	  		});
	  	}

	  	sc.openLogoUpload = function () {
	  		ngDialog.open({ 
				template: '/app/modules/book/profile/book.logo.upload.view.html', 
				className: 'ngdialog-theme-default',
				showClose: true,
				scope: $scope
			});
	  	}

	  	sc.getLogoById(sc.id);

	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('PublisherDeleteCtrl', PublisherDeleteCtrl);

	function PublisherDeleteCtrl ($scope, $state, $location, PublisherService) {
		var sc = $scope;

		var publisherName;

		PublisherService.get(sc.id)
	  		.success( function (data) {
	  			publisherName = data.name;
				sc.log = 'Are you sure you want to remove publisher ' + publisherName + '?';
	  		});

		sc.delete = function () {
			PublisherService.delete(sc.id)
			.then(function successCallback(response) {
				sc.closeThisDialog(true);
				sc.loadPage(1);
			  }, function errorCallback(response) {
			    	sc.log = 'Publisher "' + publisherName + '" could not be deleted because is in use yet';
			  }); 
		}
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('PublisherEditCtrl', PublisherEditCtrl);

	function PublisherEditCtrl ($scope, $state, $location, PublisherService) {
		var sc = $scope;

		sc.action = 'edit';

		PublisherService.get(sc.id)
		.success(function (data) {
			sc.publisher = data;

			sc.formValid = false;

			sc.id = sc.publisher.id;
			sc.name = sc.publisher.name;
			sc.email = sc.publisher.email;
			sc.officialSite = sc.publisher.officialSite;
			sc.address = sc.publisher.address;
			sc.telephoneNumber = sc.publisher.telephoneNumber;

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
				sc.publisher = {
					'id': sc.id,
					'name': sc.name,
					'email': sc.email,
					'officialSite': sc.officialSite,
					'address': sc.address,
					'telephoneNumber': sc.telephoneNumber
				}

				PublisherService.update(sc.publisher)
				.success(function (data) {
					sc.loadPage(1);
					sc.publisher = null;
				});
				sc.closeThisDialog(true);
			}
		});
	}
})();

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

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareProfileCtrl', SoftwareProfileCtrl);

	function SoftwareProfileCtrl ($scope, $state, $stateParams, SoftwareService, DeveloperService, ngDialog) {
		var sc = $scope;
		sc.table = 'software';
		sc.imgIndex = 0;

		sc.target = { 
				target: '/soft/images?id=' + $stateParams.id,
				testChunks: false
			};

		sc.getImage = function (index) {
			sc.imgIndex = index;
		}

		sc.getImageId = function (index) {
			return sc.images[sc.imgIndex].id;
		}
 
		SoftwareService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;

	  			DeveloperService.getLogo(data.developer.id)
	  			.success( function (data) {
	  				sc.devLogo = data.logo;
	  			});
	  		});

	  	sc.getImages = function () {
	  		SoftwareService.getImages($stateParams.id)
	  		.success( function (data) {
	  			sc.images = data;
				if (sc.images != '') sc.currentImage = sc.images[0].image;
	  		});	  	
	  	}

	  	sc.openImageById = function (index) {
			ngDialog.open({ 
				template: '/app/shared/image/image.fullsreen.view.html', 
				className: 'ngdialog-theme-image-view',
				showClose: false,
				scope: $scope
			});
			sc.imgIndex = index;
		};

		sc.deleteImage = function (id) {
			SoftwareService.deleteImageById(id).success( function (data) {
	  			sc.getImages();
	  		});	 
		}

		sc.previousImage = function () {
			if (sc.imgIndex == 0) sc.imgIndex = sc.images.length;
			sc.imgIndex --;
		}

		sc.nextImage = function () {
			sc.imgIndex ++;
			if (sc.imgIndex == sc.images.length) sc.imgIndex = 0;
		}

	  	sc.getImages();
	};
})();
