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
      data: selectCompanies,
      url: 'api/companies/technologies'
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
    $scope.companies = companiesList;
  });



  //Selected Companies ------------------------------------------
  $scope.selectedCompanies = [
    {name: "Slack"},
    {name: "Uber"},
  ];
  $scope.deselect = function(){
    $scope.selectedCompanies.splice($index, 1);
  };

  //Companies Dropdown ------------------------------------------
  $scope.companies = [];
  $scope.dropdown = [];
  $scope.inputString = '';

  $scope.addToSelectedCompanies = function(){
    selectedCompanies.push($scope.dropdown[$index]);
  };
  

  $scope.intersect = function(){
    interFactory.getTechnologies()
    .then(function(allTechnologies){
      //do some sorting here and then reassign scope.technologies
    });
  }


  //Technologies ------------------------------------------
  $scope.technologies = [
    {
      name: 'mySQL',
      companies: [{
        name: 'Uber'
      }],
      url: 'http://www.mysql.com'
    }
  ];



});