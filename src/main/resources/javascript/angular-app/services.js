ChromeExtensionApp.factory('EvernoteAPIService', ['$q',
	function($q) {
		return {
			getNoteStore: function() {
			    var notesTransport = new Thrift.Transport(Eventnote.Auth.oauth.getParameter(Eventnote.Auth.note_store_url_param));
			    var notesProtocol = new Thrift.Protocol(notesTransport);
			    var noteStore = new NoteStoreClient(notesProtocol, notesProtocol);
			    if (!noteStore) {
			        console.log("connection failure during getting note store");
			    }
			    return noteStore;
			},
			getNotebookList: function() {
			   var noteStore = this.getNoteStore();
			    if (noteStore) {
			        var notebookList = noteStore.listNotebooks(Eventnote.Auth.get_auth_token());
			        return notebookList;
				   
			    }
			},
			getQuoteNotebookGuid: function(notebookList) {
			    for (var i = 0; i < notebookList.length; i++) {
			        var currNotebook = notebookList[i];
			        if (currNotebook.name === 'Quotes') {
			            return currNotebook.guid;
			        }
			    }
		    },
		    getQuotesFromNotebook: function(notebookGuid) {
			    var noteStore = this.getNoteStore();

			    var noteFilter = new NoteFilter({notebookGuid: notebookGuid});

			    var authToken = Eventnote.Auth.get_auth_token();

			    var noteList = noteStore.findNotes(authToken, noteFilter, 0, 20);
			    var noteContentList = [];
			    for (var i = 0; i < noteList.notes.length; i++) {
			        var noteContent = noteStore.getNoteSearchText(authToken, noteList.notes[i].guid, true, false);
			        var noteContentSplit = noteContent.split('*');
			        noteContentList.push(noteContentSplit[1].trim());
			    }
			    return noteContentList;
		    }
		}
	}
]);

ChromeExtensionApp.factory('RandomObjInList', 
	function() {
		return {
			getRandom: function(list) {
				var min = 0;
				var max = list.length - 1;
			   	min = Math.ceil(min);
			  	max = Math.floor(max);
			  	var randIndex = Math.floor(Math.random() * (max - min + 1)) + min;
			  	return list[randIndex];
			}
		}
	}
);

// unused because get coords from browser 
// TODO: if cant get coords from browser, have user input address
// and use geocoding to get long and lat coords
ChromeExtensionApp.factory('GoogleGeocodingAPIService', ['$http', function($http) {
   var msgs = [];
   return {
	   	key: '',
		apiURL: 'https://maps.googleapis.com/maps/api/geocode',
		getCoordinates: function(address) {
			var url = this.apiURL + '/json?';

			var queries = {
				address: '4 Jordan Court Cherry Hill, NJ 08003',
				key: this.key
			}

			var queriesString = URI.buildQuery(queries);

			url += queriesString;
			return $http.get(url);
		}
   }
 }]);

ChromeExtensionApp.factory('DarkSkyWeatherAPIService', ['$http', function($http) {
   var msgs = [];
   return {
	   	key: '',
		apiURL: 'https://api.darksky.net/forecast',
		getWeather: function(lat, long) {
			var latLongString = lat + ',';
			latLongString += long;

			var urlComponents = [this.apiURL, this.key, latLongString];
			var url = urlComponents.join('/');

			return $http.get(url);
		}
   };
 }]);