// Module
var intelliGui = angular.module('intelliGui', ['objectTable','ngMap','angularCharts']);



// Controller
intelliGui.controller('mainController', ['$scope', '$log', '$http', '$window', function ($scope, $log, $http, $window) { 
	
$log.info("This is version 1.3 of intelliGUI (start date: 7/6/2015)");


$scope.numberData = [];
$http.get('/testdata.json').success(function(data) {
    console.log('Success!');
    console.log(data);
    $scope.numberData = data;
});

$scope.nameTable = [];
$http.get('/testdataTable.json').success(function(datat) {
    console.log('Sucess!');
    console.log(datat);
    $scope.nameTable = datat;
});

$scope.spadeData = {};
$http.get('/SPADE_data_structured.json').success(function(sdata) {
    console.log('Sucess!');
    $scope.spadeData = sdata;
});
    
    
}]);
