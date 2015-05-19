(function () {
    var app = angular.module('appOne', []);
    app.controller('porfolioController', function ($scope, behFactory,behProject) {

        //this.person = [{ name: 'Faizan', profession: 'Web developer', salary: [1500, 1650, 1900] }, { name: 'Farrukh', profession: 'Team Lead Operations' }];

        //this.behance = behFactory.async();
        //console.log(this.behance);

        var promise = behFactory.async();
        promise.then(
          function (behanceData) {
              $scope.behanceProjects = behanceData.projects;
              console.log($scope.behanceProjects);
              angular.forEach($scope.behanceProjects.covers, function (cover, index) {
                  
              });
          },
          function (errorData) {
              console.log('failure loading Projects', errorData);
          });

        $scope.selectedProject=false;

        $scope.getProject = function (obj) {
            
            //console.log(obj);

            var selectedPromise = behProject.async(obj);
            selectedPromise.then(function (behanceData) {
                $scope.selectedProject = behanceData.project;
                //console.log(behanceData.project);
                $("#portfolioModal1").modal('show');
            }, function (errorData) { console.log('failure loading Project', errorData); });
            
            //angular.forEach($scope.behanceProjects, function (project, index) {
            //    if (project.id == obj)
            //    {
            //        //alert(project.name);
            //        $scope.selectedProject = project;
            //        angular.forEach(project.covers, function (value, index) {
            //            $scope.selectedProject.coverImage = value;
            //        });
            //        //$("#filterprojects").val(obj);
            //        
            //        return;
            //    }
            //});
            
        }

    });

    var user = 'faizanatiq';
    var apiKey = 'DCOtD0PynrZPP0UXtHQWeRbbUExF7Ck6';
    app.factory('behFactory', function ($http) {
        var factory = {
            async: function (page) {

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

    app.factory('behProject', function ($http) {
        var factory = {
            async: function (projectID) {
             
                
                //var url = 'http://behance.net/v2/projects/project_id/projects?api_key=' + apiKey + '&callback=JSON_CALLBACK';
                var url = 'http://www.behance.net/v2/projects/' + projectID + '?client_id=' + apiKey + '&callback=JSON_CALLBACK';
                
                var promise = $http.jsonp(url).error(function (response, status) {
                    alert(status);
                }).success(function (response, status) {
                   //console.log(response.project);
                    //return response.projects;
                }).then(function (response, status) {
                    return response.data;
                });
                return promise;
            }
        };
        return factory;

    });    
})();