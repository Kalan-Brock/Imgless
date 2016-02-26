/*jslint node: true */
/*global angular */
/*global navigator */
/*global document */
/*global Image */

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
        }
    };
});
imgLess.directive('imgless', function (Handler, $http) {
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

            $http.get('images.json').then(function (response) {
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
