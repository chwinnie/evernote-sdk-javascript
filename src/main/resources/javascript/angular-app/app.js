var ChromeExtensionApp = angular.module('chromeExtensionApp', ['dark-sky']);

var config = ChromeExtensionApp.config(['$compileProvider', 'darkSkyProvider', function($compileProvider, darkSkyProvider) {
	// to whitelist chrome-extension and https urls 
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    darkSkyProvider.setApiKey('');
}]);

config.run();