/*function setBusStopArray(arrayOfCoordinates) {
  var busStopArray = [];
  arrayOfCoordinates.forEach(function(el1) {
    el1.routeArray.forEach(function(el2) {
      if (el2.busStop) {
        for (var i = 0, len = busStopArray.length; i < len; i++) {
          var el3 = busStopArray[i];
          if (el2.busStop == el3.busStop && el2.lat == el3.lat && el2.lng == el3.lng) {
            if (busStopArray[i].route.indexOf(el1.name) == -1) {
              busStopArray[i].route.push(el1.name);
            }
            break;
          } else if (i == len - 1) {
            busStopArray.push(el2);
            busStopArray[i + 1].route = [el1.name];
          }
        }
        if (!len) {
          busStopArray.push(el2);
          busStopArray[0].route = [el1.name];
        };
      }
    })
  });
  return busStopArray;
};*/



/*=============== Works with markers ==============*/
var BusStopView = Backbone.View.extend({

    initialize: function() {
      this.map = menuView.getMap();
      this.stop = menuView.searchView.getBusStopArray();
      this.markers = [];
      this.greateMarkerArray();
      this.timeForMarkers();
      this.contentString;
    },

    /*========== Розставляю маркери по зупинках ===========*/
    greateMarkerArray: function() {
      var that = this;
      var pinIcon = new google.maps.MarkerImage(
        'http://icons.iconarchive.com/icons/danieledesantis/playstation-flat/32/playstation-circle-icon.png',
        null,
        null,
        null,
        new google.maps.Size(15, 15)
      );

      

      this.stop.forEach(function(el) {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(el.lat, el.lng),
          icon: pinIcon,
          visibility: false,
          title: el.busStop + '|' + el.route
        })
        var buses = (el.route).map(function(e) {
          return e;
        })
        
        that.markers.push(marker);
      });

      /*=============== Регулювання зуму зупинок ===============*/
      google.maps.event.addListener(this.map, 'zoom_changed', function() {
        var zoom = that.map.getZoom();
        that.markers.forEach(function(marker) {
          marker.setMap(that.map);
          marker.setVisible(zoom >= 15);
        })

      });
      
    },

    timeForMarkers: function() {
      var that = this;
       var infowindow = new google.maps.InfoWindow();

      this.markers.forEach(function(marker) {
   //     console.log('here add event listener');
        google.maps.event.addListener(marker, 'click', function() {
         
          var title = (marker.getTitle()); //title of marker
          var mas = title.split('|'); //array
          var busStopName = mas[0]; //name of busStop того напевно не треба
          var busName = mas[1]; // names of buses
          var busNameArray = busName.split(',');
          // var allResponse = pv.getResponse(); //масив обєктів з маршрутами
          var myCoordOfStop = marker.getPosition();
          console.log(that.response);
          console.log(myCoordOfStop);
          that.contentString = "<h4>" + busStopName + "</h4>";
          //tyt functions
          that.checkBusName(busNameArray, that.contentString, myCoordOfStop);
          infowindow.setContent(that.contentString); //content string
          infowindow.open(that.map, marker);
        });
      });
    },

    checkBusName: function(busNameArray, contentString, myCoordOfStop) {
      that = this;
      busNameArray.forEach(function(el) { //для кожного ім*я автобуса
          if ($('#' + el + ':checked').val()) {
            var myroute = []; //array обєктів координат
            that.response.forEach(function(obj) {
              if (obj.name == el) {
                myroute = obj.routeArray;
              }
            })
            var indexOfBusStop = that.getIndexOfBusStop(myCoordOfStop, myroute);//!!!!
            var activeBusCoords = formView.getBusArray(el); //координати активних автобуса
            //console.log('here is trouble')
            var busesIndexes = that.getBusesIndex(activeBusCoords, myroute);
            //console.log('indexOfBusStop' + indexOfBusStop);
            //console.log('indexes of our buses: ' + busesIndexes); //якшо автобус буде проїжджати повз зупинку то буде 2 індекса
            var indexes = that.checkBusIndex(busesIndexes, indexOfBusStop);          
            //console.log('indexes' + indexes)
            var max = that.getMaxOfArray(indexes); //max element before or after bus stop;
            //console.log('Index of bus I need: ' + max);
            var time;
            if (max < indexOfBusStop) {
              //console.log("Скільки точок? " + (indexOfBusStop - max));
              time = (indexOfBusStop - max - 1) * 3;
            } else if (max > indexOfBusStop) {
              //console.log("Скільки точок? " + (myroute.length - (max - indexOfBusStop)));
              time = (myroute.length - 1 - (max - indexOfBusStop - 1)) * 3; //тут 3 секунди - бо 3 секунди на серері
            }
            console.log('time is: ' + time);
            that.contentString += "<p>" + el + " : " + time + "</p>";
          } else {
            that.contentString += "<p>" + el + "</p>";
          }
        });

      },
      checkBusIndex: function(busesIndexes, indexOfBusStop) {
        var indexes = busesIndexes.filter(function(i) {
          return i < indexOfBusStop;
        })

        if (indexes.length == 0) {
          indexes = busesIndexes.filter(function(i) {
            return i > indexOfBusStop
          })
        }
        return indexes;

      },
      getMaxOfArray: function(numArray) {
        return Math.max.apply(null, numArray);
      },
      getIndexOfBusStop: function(myCoordOfStop, myroute) {
        var indexOfBusStop;
        myroute.forEach(function(elem, index) {
          if ((elem.lat == (myCoordOfStop.G).toFixed(8)) && (elem.lng == (myCoordOfStop.K).toFixed(8))) {
            indexOfBusStop = index; 
          }
        });
        return indexOfBusStop;
      },
      getBusesIndex: function(activeBusCoords, myroute) {
        var busesIndexes = []; //індекси наших автобусів
        activeBusCoords.forEach(function(elem1) { //для кожного автобуса на шляху
          myroute.forEach(function(elem2, index) {
            if ((elem2.lat == (elem1.G).toFixed(8)) && (elem2.lng == (elem1.K).toFixed(8))) {
              busesIndexes.push(index); 
            }
          });
        });
        return busesIndexes;
      }
});

var bsv = new BusStopView();