app.config(function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

function parseFlickrJson(jsonstring) {
    var data = null;
    var jsonFlickrApi = function (d) {
        data = d;
    }
    eval(jsonstring);
    return data;
}

app.controller("PhotoCtrl", ['$scope', '$http', '$location', function ($scope, $http, $location) {
    
    this.moduleVersion = "1.0";
    $scope.currentPhotoSet = null;
    
    this.getAlbums = function () {
        $http
                .get('https://api.flickr.com/services/rest', {
                    params: {
                        method: "flickr.photosets.getList",
                        api_key: "de77f60b0f73bad8f41f8b777f0bf5dd",
                        user_id: "97162961@N07",
                        per_page: 500,
                        primary_photo_extras: "url_sq, url_q, url_t, url_c, url_z",
                        format: "json"
                    }
                })
                .success(function (response, status) {
                    $scope.albums = angular.fromJson(parseFlickrJson(response));
                });        
    };
    
    this.setCurrentPhotoset = function(setCurrentPhotosetID) {
        $scope.currentPhotoSet = setCurrentPhotosetID;
        this.changeView();
    };
    
    this.changeView = function(){
        $location.path('/Pictures/'+$scope.currentPhotoSet);
    }
    
    this.getAlbums();
}]);

app.controller("albumCtrl", ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
     $scope.name = "albumController";
     $scope.params = $routeParams;
     $scope.photoset_id = $routeParams.photoset_id;
     this.photoset_id = $routeParams.photoset_id;
    
        this.getPhotos = function () {
        $http
                .get('https://api.flickr.com/services/rest', {
                    params: {
                        method: "flickr.photosets.getphotos",
                        api_key: "de77f60b0f73bad8f41f8b777f0bf5dd",
                        user_id: "97162961@N07",
                        photoset_id: $scope.photoset_id,
                        extras: "license,date_upload,date_taken,owner_name,icon_server,original_format,last_update,geo,tags,machine_tags,o_dims,views,media,path_alias,url_sq,url_t,url_s,url_l,url_k",
                        format: "json"
                    }
                })
                .success(function (response, status) {
                    this.photos = angular.fromJson(parseFlickrJson(response));
                    $scope.photoset = this.photos.photoset;
                    for (var ind = 0; ind < $scope.photoset.photo.length; ind++) {
                        $scope.photoset.photo[ind].colspan = 2 * Math.round($scope.photoset.photo[ind].width_l / $scope.photoset.photo[ind].height_l);
                        $scope.photoset.photo[ind].rowspan = 2 * Math.round($scope.photoset.photo[ind].height_l / $scope.photoset.photo[ind].width_l);
                    }
                    console.log($scope.photoset);
                });
    };
    
    this.getPhotos();
    
 }]);


app.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/Pictures/:photoset_id', {
    templateUrl: '/assets/partials/pictures/pictures-2.html',
    controller: 'albumCtrl',
    controllerAs: 'albumController'
  })
   .when('/pictures/:photoset_id', {
    templateUrl: '/assets/partials/pictures/pictures-2.html',
    controller: 'albumCtrl',
    controllerAs: 'albumController'
  })
    .when('/pictures', {
    templateUrl: '/assets/partials/pictures/albums.html',
    controller: 'PhotoCtrl',
    controllerAs: 'photoController'
  })
    .when('/Pictures', {
    templateUrl: '/assets/partials/pictures/albums.html',
    controller: 'PhotoCtrl',
    controllerAs: 'photoController'
  })
  $locationProvider.html5Mode(true);
});