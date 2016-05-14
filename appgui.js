// Module
var intelliGui = angular.module('intelliGui', ['objectTable','ngMap','n3-line-chart','wijmo']);



// Controller
intelliGui.controller('mainController', ['$scope', '$log', '$http', '$window', function ($scope, $log, $http, $window) { 
	
    $log.info("This is version 1.4 of intelliGUI (start date: 18/6/2015)");


    $scope.numberData = [];
    $http.get('testdata.json').success(function(data) {
        console.log(data);
        $scope.numberData = data;
    });
    

    $scope.nameTable = [];
    $http.get('testdataTable.json').success(function(datat) {
        console.log(datat);
        $scope.nameTable = datat;
    });
    
    // Angular graph
    $scope.graphData = [
      {x: 0, value: 4},
      {x: 1, value: 8},
      {x: 2, value: 15},        //FIXME : $http request data
      {x: 3, value: 56},
      {x: 4, value: 23},
      {x: 5, value: 42}
    ];

    $scope.options = {
      margin: {
        left: 100
      },
      series: [
        {y: 'value', color: 'blue', thickness: '1px', type: 'column'}
      ],
      tension: 0.7,
      drawLegend: true,
      drawDots: true,
      hideOverflow: false,
      columnsHGap: 5
    };

//*Gridster (Drag and Drop)*//
    
    var gridster = $(".gridster > ul").gridster({  /* Drag & drop Grid creation and initializations */
        widget_margins: [5,18],
        widget_base_dimensions: [130,108],
        serialize_params: function($w, wgd)
        {
           return {
            id: $($w).attr('id'),
            col: wgd.col,
            row: wgd.row,
            size_x: wgd.size_x,
            size_y: wgd.size_y,
           };
        }    
    }).data('gridster').disable();
    
    // checkbox toggling on/off drag and drop functionality
    $('#checkbox').change(function() { 
        if ($(this).is(':checked')) {
            gridster.enable();
        } else {
            gridster.disable();
        }
    });
    
//*RIBBON* //
    
    //Save button functionality
    $scope.saveButton = function() {
        var widgetPositions = JSON.stringify(gridster.serialize());
        alert(widgetPositions);
        console.log(widgetPositions);
    };
    
   //*RIBBON* Add map //
    
   //selectedValues --> the values that are selected from the user at the table (to be displayed in the Google map component)
   $scope.selectedValues = [];
   $scope.addMap = function() {
        function get_decimals(num) {
            return (num.split('.')[1] || []).length;
        }

        // Condition for map: >= 4 decimals
        var validateMap = 0;
        for (i=0; i<$scope.selectedValues.length; i++) {
            if (get_decimals($scope.selectedValues[i].lat)>=4 && get_decimals($scope.selectedValues[i].lon)>=4) {
                validateMap++;
            }
        };

        if (validateMap == $scope.selectedValues.length) { 
            console.log("Valid map");

            var templat = parseFloat($scope.nameTable[0].lat);
            var templon = parseFloat($scope.nameTable[0].lon);
            var myLatlng = new google.maps.LatLng(templat,templon);

            //new map options (centre etc)
            var myOptions = {
                zoom: 3,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            //show map
            $("#map_component").removeClass("hide");
            //attach map to DOM
            $scope.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
            //set marker on the new latlongs
            for (i=0; i<$scope.selectedValues.length; i++) {
                var marker = new google.maps.Marker({
                      position: new google.maps.LatLng($scope.selectedValues[i].lat,$scope.selectedValues[i].lon),
                      map: $scope.map
                });
            }
        }
        else { 
            alert("You have chosen invalid values to be displayed in a Map. Please try again.");
        };   
    };
    
    //*RIBBON* Remove map
    $scope.removeMap = function() {
         $("#map_component").addClass("hide");
    };
    
    
}]);

