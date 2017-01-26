ChromeExtensionApp.controller('QuoteController', ['$scope', 'EvernoteAPIService', 'RandomObjInList', '$window', '$interval', function($scope, EvernoteAPIService, RandomObjInList, $window, $interval) {
    var interval = $interval(function() {
        if (Eventnote) {
           var notebookList = EvernoteAPIService.getNotebookList();
           var quoteNotebookGuid = EvernoteAPIService.getQuoteNotebookGuid(notebookList);
           var noteContentList = EvernoteAPIService.getQuotesFromNotebook(quoteNotebookGuid);
           $scope.currQuoteDisplayed = RandomObjInList.getRandom(noteContentList);
           $interval.cancel(interval);
       }
    }, 10);

    // set height of time and quote div to browser window height
    // so that it properly centers
    var setHeightStyle = function() {
        var windowHeight = $(window).height();
        $scope.windowHeightStyle = {'height': windowHeight.toString() + 'px'};
    }

    setHeightStyle();
    var windowHeight = $(window).height();
    $scope.windowHeightStyle = {'height': windowHeight.toString() + 'px'};

    angular.element($window).bind('resize', function(){
        setHeightStyle();

         // manual $digest required as resize event
         // is outside of angular
         $scope.$digest();
   });
}]);

ChromeExtensionApp.controller('PhotoController', ['$scope', 'RandomObjInList', function($scope, RandomObjInList) {
    var photoFilenames = [
        'IMG_1229.jpg',
        'IMG_1232.jpg',
        'IMG_1406.jpg',
        'IMG_1428.jpg',
        'IMG_1533.jpg',
        'IMG_1625.jpg',
        'IMG_1702.jpg',
        'IMG_1796.jpg',
        'IMG_3389.jpg',
        'IMG_3555.jpg',
        'IMG_3582.jpg',
        'IMG_3589.jpg',
        'IMG_3623.jpg',
        'IMG_3625.jpg',
        'IMG_3647.jpg',
        'IMG_3907.jpg',
        'IMG_3932.jpg',
        'IMG_3990.jpg',
        'IMG_3993.jpg',
        'IMG_4002.jpg',
        'IMG_4011.jpg',
        'IMG_4014.jpg',
        'IMG_4056.jpg',
        'IMG_4084.jpg',
        'IMG_4103.jpg',
        'IMG_4113.jpg',
        'IMG_4345.jpg',
        'IMG_4446.jpg',
        'IMG_4669.jpg',
        'IMG_4735.jpg',
        'IMG_4785.jpg',
        'IMG_5197.jpg',
        'IMG_5204.jpg',
        'IMG_5460.jpg',
        'IMG_5526.jpg',
        'IMG_5539.jpg',
        'IMG_5582.jpg',
        'IMG_5617.jpg',
        'IMG_5648.jpg',
        'IMG_5657.jpg',
        'IMG_5689.jpg',
        'IMG_5888.jpg',
        'IMG_5893.jpg',
        'IMG_5902.jpg',
        'IMG_5916.jpg',
        'IMG_5978.jpg',
        'IMG_5984.jpg',
        'IMG_6025.jpg',
        'IMG_6072.jpg',
        'IMG_6429.jpg',
        'IMG_6445.jpg',
        'IMG_6586.jpg',
        'IMG_6715.jpg',
        'IMG_6884.jpg',
        'IMG_7059.jpg',
        'IMG_7099.jpg',
        'IMG_7186.jpg',
        'IMG_7364.jpg',
        'IMG_7462-HDR.jpg',
        'IMG_7468.jpg',
    ];

    var photoURL = chrome.extension.getURL('../images/background_photos/' + RandomObjInList.getRandom(photoFilenames));
    document.body.style.background = 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(' + photoURL +') no-repeat center center fixed';
    document.body.style['background-size'] = 'cover';
}]);

ChromeExtensionApp.controller('WeatherController', ['$scope', 'DarkSkyWeatherAPIService', 'darkSky', '$q', function($scope, DarkSkyWeatherAPIService, darkSky, $q) {
    activate();

    // log current weather data
    function activate() {
        getNavigatorCoords()
            .then(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                 DarkSkyWeatherAPIService.getWeather(lat, lng).then(function(response) {
                     var currWeatherData = response.data.currently;
                     var dailyWeatherData = response.data.daily.data[0];
                     $scope.currWeatherData = currWeatherData;
                     $scope.dailyWeatherData = dailyWeatherData;
                     console.log($scope.dailyWeatherData);
                 });
            })
            .catch(console.warn);
    }

    // Get current location coordinates if supported by browser
    function getNavigatorCoords() {
        var deferred = $q.defer();

        // check for browser support
        if ("geolocation" in navigator) {
            // get position / prompt for access
            navigator.geolocation.getCurrentPosition(function(position) {
                deferred.resolve(position);
            });
        } else {
            deferred.reject('geolocation not supported');
        }
        return deferred.promise;
    }
 }]);