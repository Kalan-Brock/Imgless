/*jslint node: true */
/*global angular */
/*global navigator */
/*global document */

'use strict';

var imgLess = angular.module('imgLess', []);

imgLess.factory('Browser', function () {
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {
            name: 'IE',
            version: (tem[1] || '')
        };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem !== null) {
            return {
                name: 'Opera',
                version: tem[1]
            };
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
        M.splice(1, 1, tem[1]);
    }

    return {
        name: M[0],
        version: M[1]
    };
});
imgLess.factory('Conversion', function (Browser) {
    var canvas = document.createElement("canvas"), browser = Browser;

    return {
        convert: function (img) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            var ctx = canvas.getContext("2d"), dataURL;
            ctx.drawImage(img, 0, 0);

            if (browser.name === "Chrome" || browser.name === "Opera") {
                dataURL = canvas.toDataURL("image/webp");
            } else {
                dataURL = canvas.toDataURL("image/png");
            }

            return dataURL;
        }
    };
});
imgLess.factory('Handler', function ($http) {
    return {
        save: function (path, uri) {
            $http({
                method: 'POST',
                url: 'imgless.php',
                data: {
                    path: path,
                    uri: uri
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        },
        get: function (path) {
            return $http({
                method: 'POST',
                url: 'imgless.php',
                data: {
                    existingpath: path
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
    };
});
imgLess.directive('imgless', function (Handler, Conversion, $timeout) {
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

            Handler.get(path).then(function (response) {
                var uri = JSON.parse(response.data.response).uri;

                if (uri !== 'false') {
                    elm[0].src = uri;
                } else {
                    var image = new Image();
                    image.src = path;
                    uri = Conversion.convert(image);

                    $timeout(function () {
                        Handler.save(path, uri);
                    }, 0);
                }
            });

        },
        templateUrl: 'js/templates/image.html'
    };
});
