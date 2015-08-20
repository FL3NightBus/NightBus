/*=============== Works with markers ==============*/
var BusStopView = Backbone.View.extend({

  initialize: function() {
    var that = this;
    that.response = menuView.onLineTraffic.getResponse();
    this.map = menuView.getMap();
    this.stop = menuView.searchView.getBusStopArray();
    this.markers = [];
    this.greateMarkerArray();
    this.timeForMarkers();
    this.contentString;
  },


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
      google.maps.event.addListener(marker, 'click', function() {

        var title = (marker.getTitle());
        var mas = title.split('|');
        var busStopName = mas[0];
        var busName = mas[1];
        var busNameArray = busName.split(',');
        var myCoordOfStop = marker.getPosition();
        that.contentString = "<h4>" + busStopName + "</h4>";
        that.checkBusName(busNameArray, that.contentString, myCoordOfStop);
        infowindow.setContent(that.contentString);
        infowindow.open(that.map, marker);
      });
    });
  },
  formatTime: function(time) {
    var str = '';
    if (time < 60) {
      str = time + ' сек';
    } else if (time > 60 && time % 60 == 0) {
      str = time / 60 + ' хв';
    } else if (time > 60 && time % 60 != 0) {
      var min = Math.floor(time / 60);
      var sec = time - min * 60;
      str = min + 'хв. ' + sec + 'сек';
    }
    return str;
  },

  checkBusName: function(busNameArray, contentString, myCoordOfStop) {
    that = this;
    busNameArray.forEach(function(el) {
      if ($('#' + el[0] + ':checked').val()) {
        var myroute = [];
        that.response.forEach(function(obj) {
          if (obj.name == el) {
            myroute = obj.routeArray;
          }
        })
        var indexOfBusStop = that.getIndexOfBusStop(myCoordOfStop, myroute);
        var activeBusCoords = menuView.onLineTraffic.getBusArray(el[0]);
        var busesIndexes = that.getBusesIndex(activeBusCoords, myroute);
        var indexes = that.checkBusIndex(busesIndexes, indexOfBusStop);
        var max = that.getMaxOfArray(indexes);
        var time;
        if (max < indexOfBusStop) {
          time = (indexOfBusStop - max - 1) * 12;
        } else if (max > indexOfBusStop) {
          time = (myroute.length - 1 - (max - indexOfBusStop - 1)) * 12;
        }
        
        time = that.formatTime(time);
        that.contentString += "<p>" + el + " : " + time + "</p>";
      } else {
        that.contentString += "<p>" + el + " - " + "</p>";
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
    var templ = [];
    myroute.forEach(function(elem, index) {
      if ((elem.lat == (myCoordOfStop.G).toFixed(8)) && (elem.lng == (myCoordOfStop.K).toFixed(8))) {
         templ.push(index); 
      }
    });
     indexOfBusStop = templ[1];
     return indexOfBusStop;
  },
  getBusesIndex: function(activeBusCoords, myroute) {
    var busesIndexes = [];
    activeBusCoords.forEach(function(elem1) {
      myroute.forEach(function(elem2, index) {
        if ((elem2.lat == (elem1.G).toFixed(8)) && (elem2.lng == (elem1.K).toFixed(8))) {
          busesIndexes.push(index);
        }
      });
    });
    return busesIndexes;
  }
});