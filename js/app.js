(function () {
    var app = angular.module('appOne', []);
    app.controller('porfolioController', function ($scope, behFactory) {

        //this.person = [{ name: 'Faizan', profession: 'Web developer', salary: [1500, 1650, 1900] }, { name: 'Farrukh', profession: 'Team Lead Operations' }];

        //this.behance = behFactory.async();
        //console.log(this.behance);

        var promise = behFactory.async();
        promise.then(
          function (behanceData) {
              $scope.behanceProjects = behanceData.projects;
          },
          function (errorData) {
              console.log('failure loading Projects', errorData);
          });

        $scope.getProject = function (obj) {
            alert(obj);
            console.log(obj);
        }

    });


    app.factory('behFactory', function ($http) {
        var factory = {
            async: function (page) {
                var user = 'faizanatiq';
                var apiKey = 'DCOtD0PynrZPP0UXtHQWeRbbUExF7Ck6';
                var url = 'http://behance.net/v2/users/' + user + '/projects?api_key=' + apiKey + '&callback=JSON_CALLBACK';
                var promise = $http.jsonp(url).error(function (response, status) {
                    alert(status);
                }).success(function (response, status) {
                    //console.log(response.projects);
                    //return response.projects;
                }).then(function (response, status) {
                    return response.data;
                });
                return promise;
            }
        };
        return factory;

    });


    var Person = "Muhammad Faizan Atiq";
    var appTwo = angular.module('myApp', []);
    appTwo.controller(('testController'), function () {
        this.person = "Muhammad Faizan Atiq";
    });

})();