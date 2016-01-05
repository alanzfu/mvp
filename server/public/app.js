angular.module('interStack', [])

.factory('interFactory', function($http, $window){
  var getAllCompanies = function(){
    return $http({
      method: 'GET',
      url: '/api/companies'
    })
    .then( function (resp) {
      return resp.data;
    });
  };

  var getTechnologies = function(selectCompanies) {
    return $http({

      method:'POST',
      url: '/api/companies/technologies',
      data: {
        companies:selectCompanies
      }
    })
    .then( function(resp) {
      return resp.data;
    });
  };

  return {
    getAllCompanies: getAllCompanies,
    getTechnologies: getTechnologies
  };
})

.controller('interController', function($scope, interFactory){
  //Init------------------------------------------
  interFactory.getAllCompanies()
  .then(function(companiesList){
    $scope.dropdown = companiesList;
  });



  //Selected Companies ------------------------------------------
  $scope.selectedCompanies = [
    {name: "Slack"},
    {name: "Uber"}
  ];
  $scope.deselect = function(){
    $scope.selectedCompanies.splice($index, 1);
  };

  //Companies Dropdown ------------------------------------------
  $scope.companies = [];
  // $scope.dropdown = [];
  $scope.inputString = '';

  $scope.addToSelectedCompanies = function(){
    selectedCompanies.push($scope.dropdown[$index]);
  };
  

  $scope.intersect = function(){
    interFactory.getTechnologies($scope.selectedCompanies)
    .then(function(allTechnologies){
      $scope.technologies = allTechnologies;
    });
  }


  //Technologies ------------------------------------------
  $scope.technologies = [];



});