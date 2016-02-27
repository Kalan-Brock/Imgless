/*jslint node: true */
/*global angular */

'use strict';

var imgLess = angular.module('imgLess', []);

imgLess.factory('Handler', function ($http) {
    return {
        save: function (path) {
            $http({
                method: 'POST',
                url: 'imgless.php',
                data: {
                    path: path
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        },
        get: function () {
            return $http.get('images.json');
        }
    };
});
imgLess.directive('imgless', function (Handler) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            src: '@',
            id: '@',
            class: '@',
            alt: '@'
        },
        link: function (scope, elm) {
            var path = scope.src;

            Handler.get().then(function (response) {
                var images = response.data, uri;

                if (images.hasOwnProperty([path])) {
                    uri = images[path];
                    elm[0].src = uri;
                } else {
                    Handler.save(path);
                    elm[0].src = path;
                }
            });

        },
        templateUrl: 'js/templates/image.html'
    };
});
