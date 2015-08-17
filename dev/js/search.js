var SearchView = Backbone.View.extend({
  el: $('.submenu'),
  events: {
    'click #start': 'getPoints',
    'click #search': 'setPoints',
    'click #clear': 'clear',
    'click #here': 'getPosition',
    'click #delete': 'clearMap'
  },
  template: _.template(searchcViewTemplate),
  busStopArray: [],
  //fieldfrom: '',
  //fieldto: '',
  busStopMarkers: [],
  //markers: [],
  listener: null,
  initialize: function() {
    var that = this;
    this.fetch('http://localhost:8080/api/routes', that.setBusStopArray);
    this.$el.append(this.template);
    this.autocompleteListener();
    this.markers = [];
    this.circles = [];
    this.infowindow = [];
  },
  isInLviv: function(position) {
    var isOnCircle,
      map = menuView.getMap(),
      center = {
        lat: 49.827145,
        lng: 24.026072
      },
      circleOption = this.setCircleOptions(map, center, 9000, false),
      circle = new google.maps.Circle(circleOption),
      marker = new google.maps.Marker({
        position: position,
        map: map,
        visible: false
      });
    isOnCircle = circle.getBounds().contains(marker.getPosition());
    marker.setMap(null);
    marker = null;
    return isOnCircle;
  },
  fetch: function(url, callback) {
    var that = this;
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: url,
      success: function(response) {
        callback(response, that);
      },
      error: function(err) {
        console.log('request error');
      }
    });
  },
  clear: function() {
    this.$el.find(from).val('');
    this.$el.find(to).val('');
  },
  getPosition: function() {
    var myPosition = menuView.getYourPosition();
    if(this.isInLviv(myPosition)){
      this.getPoints(null, 1, myPosition);
    }
  },
  busStopCoordinateComparison: function(routeCoord, busStopCoord1, busStopArray) {
    for (var i = 0, len = busStopArray.length; i < len; i++) {
      var busStopCoord2 = busStopArray[i];
      if (busStopCoord1.busStop == busStopCoord2.busStop && busStopCoord1.lat == busStopCoord2.lat && busStopCoord1.lng == busStopCoord2.lng) {
        if (busStopCoord2.route.indexOf(routeCoord.name) == -1) {
          busStopArray[i].route.push(routeCoord.name);
        }
        return busStopArray;
      } else if (i == len - 1) {
        busStopArray.push(busStopCoord1);
        busStopArray[i + 1].route = [routeCoord.name];
      }
    }
    if (len === 0) {
      busStopArray.push(busStopCoord1);
      busStopArray[0].route = [routeCoord.name];
    };
    return busStopArray;
  },
  setBusStopArray: function(arrayOfCoordinates, that) {
    var busStopArray = [];
    arrayOfCoordinates.forEach(function(el1) {
      el1.routeArray.forEach(function(el2) {
        if (el2.busStop) {
          busStopArray = that.busStopCoordinateComparison(el1, el2, busStopArray);
        }
      });
    });
    that.busStopArray = busStopArray;
    menuView.setCount();
  },
  getBusStopArray: function() {
    return this.busStopArray;
  },
  autocomplete_map: function(selector) {
    var that = this;
    var autocomplete = new google.maps.places.Autocomplete(selector);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      that['field' + selector.name] = autocomplete.getPlace().geometry.location;
    });
  },
  autocompleteListener: function() {
    var from = $('#from');
    var to = $('#to');
    this.autocomplete_map(from[0]);
    this.autocomplete_map(to[0]);
  },
  setBusStopMarkers: function() {
    var that = this,
      map = menuView.getMap();
    busStopArray = this.getBusStopArray();
    busStopArray.forEach(function(el) {
      that.busStopMarkers.push(new google.maps.Marker({
        position: el,
        map: map,
        visible: false
      }));
    });
  },
  getBusStopMarkers: function() {
    return this.busStopMarkers;
  },
  setMarkers: function(position) {
    var that = this,
      map = menuView.getMap();
    that.markers.push(new google.maps.Marker({
      position: position,
      map: map,
      visible: true
    }))
  },
  deleteMarkers: function(markers) {
    markers.forEach(function(el) {
      el.setMap(null);
    })
    markers = [];
    return markers;
  },
  clearMap: function() {
    this.markers = this.deleteMarkers(this.markers);
    this.infowindow.forEach(function(el) {
      el.close();
    });
  },
  setCircleOptions: function(map, position, radius, isVisible) {
    return {
      map: map,
      center: position,
      radius: radius,
      visible: isVisible
    }
  },
  setInfowindow: function(busStopArray) {
    var that = this,
      map = menuView.getMap();
    busStopArray.forEach(function(el) {
      myOptions = {
        map: map,
        position: {
          lng: el.lng,
          lat: el.lat
        },
        content: el.busStop
      };
      that.infowindow.push(new google.maps.InfoWindow(myOptions));
    })
  },
  getNearestBusStops: function(position) {
    var distance,
      index,
      maxLenToBusStop,
      distances = [],
      nearestBusStops = [],
      minDistance = 10000,
      map = menuView.getMap(),
      busStopArray = this.getBusStopArray();
    this.setMarkers(position);
    this.getBusStopMarkers().forEach(function(el, i) {
      distance = google.maps.geometry.spherical.computeDistanceBetween(el.getPosition(), position);
      if (distance < minDistance) {
        minDistance = distance;
      }
      distances.push(distance);
    });
    maxLenToBusStop = minDistance + 150;
    distances.forEach(function(el, i) {
      if (el < maxLenToBusStop) {
        nearestBusStops.push(busStopArray[i]);
      }
    });
    this.setInfowindow(nearestBusStops);
    return nearestBusStops;
  },
  getBusNumbers: function(busStopsFrom, busStopsTo) {
    var buses = [],
      info,
      busesNotCrossFrom = [],
      busesNotCrossTo = [];
    busStopsFrom.forEach(function(from) {
      from.route.forEach(function(routeNumber) {
        if (busesNotCrossFrom.indexOf(routeNumber) == -1) {
          busesNotCrossFrom.push(routeNumber);
        }
      });
      busStopsTo.forEach(function(to) {
        to.route.forEach(function(routeNumber) {
          if (from.route.indexOf(routeNumber) != -1) {
            if (buses.indexOf(routeNumber) == -1) {
              buses.push(routeNumber);
            }
          } else if (busesNotCrossTo.indexOf(routeNumber) == -1) {
            busesNotCrossTo.push(routeNumber);
          }
        })
      })
    });
    if (buses.length === 0) {
      info = buses.join(', ');
      this.$el.find('.info').append('<p>There are no direct buses. First you nead to take ' + busesNotCrossFrom.join(', ') + ' and then change to ' + busesNotCrossTo.join(', ') + '.</p>');
      buses = busesNotCrossFrom.concat(busesNotCrossTo);
    } else {
      info = buses.join(', ');
      this.$el.find('.info').append('<p>You can get from one point to another by the next buses ' + info + '.</p>');
    };
    buses.forEach(function(routeNumber) {
      menuView.onLineTraffic.drawPoliline(routeNumber);
    })
  },
  getPoints: function(event, pointNumber, position) {
    this.$el.parent().find('.search').addClass('dblclicked');
    var that = this,
      amount = pointNumber || 0,
      busStopsArray = [],
      map = menuView.getMap();
    this.setBusStopMarkers();
    map.setOptions({
      disableDoubleClickZoom: true
    });
    menuView.hidePage();
    if (pointNumber) {
      busStopsArray.push(that.getNearestBusStops(position));
    };
    this.listener = google.maps.event.addListener(map, 'click', function(e) {
      if (that.isInLviv(e.latLng)) {
        amount++;
        busStopsArray.push(that.getNearestBusStops(e.latLng));
        if (amount == 2) {
          google.maps.event.removeListener(that.listener);
          that.busStopMarkers = that.deleteMarkers(that.busStopMarkers);
          that.getBusNumbers(busStopsArray[0], busStopsArray[1]);
          map.setOptions({
            disableDoubleClickZoom: false
          });
          that.$el.parent().find('.search').removeClass('dblclicked');
        }
      } else {
        alert('This place is not in Lviv. Please choose another!');
      }
    });
  },
  setPoints: function() {
    if (this.isInLviv(this.fieldfrom)) {
      if (this.isInLviv(this.fieldto)) {
        menuView.hidePage();
        this.setBusStopMarkers();
        var busStopsFrom = this.getNearestBusStops(this.fieldfrom);
        var busStopsTo = this.getNearestBusStops(this.fieldto);
        this.busStopMarkers = this.deleteMarkers(this.busStopMarkers);
        this.getBusNumbers(busStopsFrom, busStopsTo);
      } else {
        alert('The place "To" is not in Lviv. Please tipe another address!');
      }
    } else {
      alert('The place "From" is not in Lviv. Please tipe another address!');
    }
  }
});