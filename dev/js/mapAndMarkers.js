var MapView = Backbone.View.extend({
  initialize: function () {
    this.yourPosition = {}
  },
  render: function () {
    //   var startCoords = [49.83916569, 23.99448127];
    var mapOptions = {
      //        center: new google.maps.LatLng(startCoords[0], startCoords[1]),
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      scaleControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.getGeoLocation();
  },
  getGeoLocation: function () {
    var map = this.getMap();
    var that = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var infowindow = new google.maps.InfoWindow({
          map: map,
          position: pos,
          content: 'You are here'
        });
        that.setYourPosition(pos);
        console.log(pos);
        console.log(that.getYourPosition());
        map.setCenter(pos);
      }, function () {
        that.handleNoGeolocation(true);
      });
    }
    /* else {
                // Browser doesn't support Geolocation
                that.handleNoGeolocation(false);
            }*/
  },
  getMap: function () {
    return this.map;
  },
  el: '#map',
  handleNoGeolocation: function (errorFlag) {
    if (errorFlag) {
      var content = '';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }
    var options = {
      map: this.map,
      position: new google.maps.LatLng(49.83916569, 23.99448127),
      content: content
    };
    //     var infowindow = new google.maps.InfoWindow(options);
    this.map.setCenter(options.position);
  },
  setYourPosition: function (coords) {
    this.yourPosition.lat = coords.G;
    this.yourPosition.lng = coords.K;
    console.log(this.yourPosition);
  },
  getYourPosition: function () {
    return this.yourPosition;
  },
});

var mapView = new MapView();
mapView.render();

var FormView = Backbone.View.extend({
  initialize: function () {
    this.timerArray = {};
    this.markersArray = {};
    this.stoper = {};
    this.busArray = {};
  },
  render: function () {},
  el: '#form',
  events: {
    'change input:checkbox': 'listener'
  },
  getBusArray: function (id) {
    return this.busArray['id' + id];
  },
  setBusArray: function (id, array) {
    this.busArray['id' + id] = array;
  },
  listener: function () {
    // elem - #id of checkbox which is changed (could be [1-7]H)
    var elem = this.$el.context.activeElement.id;
    // interval (seconds) - value from #interval to know when send requests (default 5s)
    var interval = ($('#interval').val()) || 3;
    if ($('#' + elem + ':checked').val()) {
      this.setStoper(elem, true);
      // if checkbox is 'checked' than we send data (# of route and interval) to busOnWay()
      this.firstRequest(elem, interval);
      this.busOnWay(elem, interval);
    };
    // listener for checkboxes. When !'ckecked' - route with #id '[1-7]H' will be cut from Map
    //we have 'stop' variable what has undefined value.
    // if checkbox isn't checked we send false to setMarker to delete all markers and stop render them
    if (!($('#' + elem + ':checked').val())) {
      this.setStoper(elem, false);
      clearInterval(this.getTimer(elem));
      var map = mapView.getMap();
      this.setMarker([], map, elem, false);
    };
  },
  setStoper: function (id, boolean) {
    this.stoper['id' + id] = boolean;
  },
  getStoper: function (id) {
    return this.stoper['id' + id];
  },
  setTimer: function (id, timer) {
    this.timerArray['id' + id] = timer;
  },
  getTimer: function (id) {
    return this.timerArray['id' + id];
  },
  setMarkers: function (id, markers) {
    this.markersArray['id' + id] = markers;
  },
  pushMarkers: function (id, marker) {
    this.markersArray['id' + id].push(marker);
  },
  getMarkers: function (id) {
    return this.markersArray['id' + id];
  },
  firstRequest: function (bus, interval) {
    var that = this;
    that.setMarkers(bus, []);
    var inter = interval * 1000;
    var map = mapView.getMap();
    $.ajax({
      type: "GET",
      dataType: 'jsonp',
      url: 'https://try0908.localtunnel.me/api/routes?route=' + bus,
      //url: 'https://local.localtunnel.me/api/routes/2H' + bus,
      success: function (response) {
        //                console.log(response);
        if (that.getStoper(bus)) {
          // here we create an array of locations (coordinates for future markers)
          var locationsArray = [];
          // going throught response (array of objects (with pairs of coords)) to create locations
          for (var i = 0; i < response.length; i++) {
            locationsArray.push(new google.maps.LatLng(response[i].lat, response[i].lng));
            //                   console.log(response[i].lat);
            //                 console.log(response[i].lng);
          };
          that.setBusArray(bus, locationsArray);
          // send locations to add on Map
          that.setMarker(locationsArray, map, bus, true);
        }
      },
      error: function (response) {
        console.log(this.url);
        console.log(response);
      }
    });
  },
  busOnWay: function (bus, interval) {
    var that = this;
    that.setMarkers(bus, []);
    // inter - number of miliseconds for setInterval to get data from server and render it on Map
    var inter = interval * 1000;
    var map = mapView.getMap();
    var timer = setInterval(function () {
      // this GET allow us get a coordinats from server and send them to setMerker();
      // also we can get a coordinats for few buses. So we should be ready to support all of them 
      $.ajax({
        type: "GET",
        dataType: 'jsonp',
        url: 'https://try0908.localtunnel.me/api/routes?route=' + bus,
        //url: 'https://local.localtunnel.me/api/routes/2H' + bus,
        success: function (response) {
          //        console.log(response);
          if (that.getStoper(bus)) {
            // here we create an array of locations (coordinates for future markers)
            var locationsArray = [];
            // going throught response (array of objects (with pairs of coords)) to create locations
            for (var i = 0; i < response.length; i++) {
              locationsArray.push(new google.maps.LatLng(response[i].lat, response[i].lng));
              //                  console.log(response[i].lat);
              //                  console.log(response[i].lng);
            };
            that.setBusArray(bus, locationsArray);
            // send locations to add on Map
            that.setMarker(locationsArray, map, bus, true);
          }
        },
        error: function (response) {
          console.log(this.url);
          console.log(response);
        }
      });
    }, inter);
    that.setTimer(bus, timer);
  },
  setMarker: function (locations, map, bus, stop) {
    var that = this;
    var markers = that.getMarkers(bus);
    // put marker on the Map. First of all it clear Map and put new one, 
    //          function setMarker(locations, map, stop) {
    deleteMarkers();
    //if (!stop) then function just delete all markers
    if (stop) {
      that.setMarkers(bus, []);
      for (var i = 0; i < locations.length; i++) {
        addMarker(locations[i]);
        setAllMap(map);
      }
    }

    function addMarker(location) {
      var image = '../img/' + bus + '.png';
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: image
      });
      that.pushMarkers(bus, marker);
    }

    function setAllMap(map) {
      var markers = that.getMarkers(bus);
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
      if (map === null) {
        that.setMarkers(bus, []);
      }
    }

    function clearMarkers() {
      setAllMap(null);
    }

    function deleteMarkers() {
      clearMarkers();
    }
  }
});
var formView = new FormView();