angular.module('interStack', [])

.factory('interFactory', function($http, $window){
  var getAllCompanies = function(){
    return $http({
      method: 'GET',
      url: '/api/companies'
    })
    .then( function (resp) {
      console.log(resp.data);
      return resp.data;
    });
  };

  var getTechnologies = function(selectCompanies, $scope) {
    
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
  $scope.showLoadingImage = false;
  $scope.sorry = '';
  interFactory.getAllCompanies()
  .then(function(companiesList){
    $scope.companies = companiesList;

  });


  //Selected Companies ------------------------------------------
  $scope.selectedCompanies = [];
  $scope.deselect = function(index){
    $scope.selectedCompanies.splice(index, 1);
  };

  //Companies Dropdown ------------------------------------------
  $scope.dropdown = [];
  $scope.inputString = '';

  $scope.inputHandler = function(keyEvent){
    $scope.dropdown = $scope.companies.filter(function(company){
      if(company.name.slice(0,$scope.inputString.length) === $scope.inputString.toLowerCase()){
        return true;
      }
      else return false;
    });
    if($scope.inputString === ''){
      $scope.dropdown = [];
    }

    if(keyEvent.keyCode === 13){
      $scope.selectedCompanies.push({name: $scope.inputString});
      $scope.inputString = '';
      $scope.dropdown = [];
    }
  }

  $scope.addToSelectedCompanies = function(num){
    $scope.selectedCompanies.push($scope.dropdown[num]);
    $scope.inputString = '';
    $scope.dropdown = [];
  };
  

  $scope.intersect = function(){
    $scope.showLoadingImage = true;
    $scope.sorry = '';
    interFactory.getTechnologies($scope.selectedCompanies)
    .then(function(allTechnologies){
      //refresh company list
      interFactory.getAllCompanies()
      .then(function(companiesList){
        $scope.companies = companiesList;

      });
      //show technologies
      $scope.showLoadingImage = false;
      $scope.technologies = allTechnologies;
      if(allTechnologies.length === 0) {
        $scope.sorry = "Sorry! We couldn't any shared technologies between those companies :/"
      } else{
        $scope.sorry = "";
      }
    });
  }


  //Technologies ------------------------------------------
  $scope.technologies = [];



});