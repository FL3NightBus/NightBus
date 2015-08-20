var OnLineTrafficView = Backbone.View.extend({
  initialize: function() {
    this.timerArray = {};
    this.markersArray = {};
    this.stoper = {};
    this.busArray = {};
    this.anglesArray = {};
    this.render();
    this.response = [];
    this.setResponse();
  },
  render: function() {
    var tmpl = _.template(onLineTrafficViewTemplate);
    $('.submenu').append(tmpl);
  },
  el: '.submenu',
  events: {
    'change #form input:checkbox': 'listener',
    'click #polylines input:checkbox': 'passPoliline',
    'click #polylines span': 'showPopup',
    'click #closeInfo': 'hidePopup'
  },

  getPosition: function() {
    menuView.getYourPosition();
  },
  getBusArray: function(id) {
    return this.busArray['id' + id];
  },
  setBusArray: function(id, array) {
    this.busArray['id' + id] = array;
  },
  getAnglesArray: function(id) {
    return this.anglesArray['id' + id];
  },
  setAnglesArray: function(id, array) {
    this.anglesArray['id' + id] = array;
  },
  setStoper: function(id, boolean) {
    this.stoper['id' + id] = boolean;
  },
  getStoper: function(id) {
    return this.stoper['id' + id];
  },
  setTimer: function(id, timer) {
    this.timerArray['id' + id] = timer;
  },
  getTimer: function(id) {
    return this.timerArray['id' + id];
  },
  setMarkers: function(id, markers) {
    this.markersArray['id' + id] = markers;
  },
  pushMarkers: function(id, marker) {
    this.markersArray['id' + id].push(marker);
  },
  getMarkers: function(id) {
    return this.markersArray['id' + id];
  },
  getAngle: function(coords, coords1) {
    // take to pair of coordinates and calculate angle between vector and axis
    var x = (coords1.G - coords.G);
    var y = (coords1.K - coords.K);
    var angle = (Math.atan2(x, y) * 180 / Math.PI);
    if (x < 0) {
      angle += 360;
    }
    return 90 - angle;
  },
  listener: function(e) {
    // interval (seconds) - value from #interval to know when send requests (default 5s)
    var interval = ($('#interval').val()) || 3;
    var elBox = $(e.currentTarget);
    // elem - #id of checkbox which is changed (could be [1-7])
    var elem = (elBox).attr('id');
    if (elBox.is(':checked')) {
      // if checkbox is 'checked' than we send data (# of route and interval) to busOnWay()
      this.setStoper(elem, true);
      this.firstRequest(elem);
      this.busOnWay(elem, interval);
    } else {
    // listener for checkboxes. When !'ckecked' - route with #id '[1-7]' will be erase from Map
    //we have 'stop' variable what has undefined value.
    // if checkbox isn't checked we send false to setMarker to delete all markers and stop render them
      this.setStoper(elem, false);
      clearInterval(this.getTimer(elem));
      var map = menuView.getMap();
      this.setMarker([], map, elem, false);
    };
  },
  firstRequest: function(bus) {
    var that = this,
      map = menuView.getMap(),
      url = 'http://localhost:8080/api/routes?route=' + bus + 'H';
    that.setMarkers(bus, []);
    that.fetch(url, that.getFirstCoordinates, bus);
  },
  getFirstCoordinates: function(response, bus, that) {
    if (that.getStoper(bus)) {
      var map = menuView.getMap();
      // here we create an array of locations (coordinates for future markers)
      var locationsArray = [];
      // going throught response (array of objects (with pairs of coords)) to create locations
      for (var i = 0; i < response.length; i++) {
        locationsArray.push(new google.maps.LatLng(response[i].lat, response[i].lng));
      };
      that.setBusArray(bus, locationsArray);
      that.setAnglesArray(bus, []);
      // send locations to add on Map
      that.setMarker(locationsArray, map, bus, 0, true);
    }
  },
  fetch: function(url, callback, bus) {
    var that = this;
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: url,
      success: function(response) {
        callback(response, bus, that);
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  busOnWay: function(bus, interval) {
    var that = this;
    that.setMarkers(bus, []);
    // time - number of miliseconds for setInterval to get data from server and render it on Map
    var time = interval * 1000,
      url = 'http://localhost:8080/api/routes?route=' + bus + 'H';
    var timer = setInterval(function() {
      // this GET allow us get a coordinates from server and send them to setMerker();
      // also we can get a coordinats for few buses. So we should be ready to support all of them 
      that.fetch(url, that.getCoordinatesAndAngles, bus);
    }, time);
    that.setTimer(bus, timer);
  },
  getCoordinatesAndAngles: function(response, bus, that) {
    // here we create an array of locations (coordinates for future markers) and angles between markers
    var angleArray = [],
      busArr = [],
      angArr = [],
      locationsArray = [],
      tempA,
      tempB,
      angle,
      map = menuView.getMap();
    if (that.getStoper(bus)) {
      // going throught response (array of objects (with pairs of coords)) to create locations
      for (var i = 0; i < response.length; i++) {
        locationsArray.push(new google.maps.LatLng(response[i].lat, response[i].lng));
      };
      busArr = that.getBusArray(bus);
      angArr = that.getAnglesArray(bus);
      that.setBusArray(bus, locationsArray);
      for (var i = 0; i < locationsArray.length; i++) {
        angle = (that.getAngle(busArr[i], locationsArray[i]));
        tempA = locationsArray[i];
        tempB = busArr[i];
        if ((tempA.G === tempB.G) && (tempA.K === tempB.K)) {
          angle = angArr[i];
        }
        angleArray.push(angle);
      };
      that.setAnglesArray(bus, angleArray);
      // send locations ang angles to add on Map
      that.setMarker(locationsArray, map, bus, angleArray, true);
    }
  },
  setMarker: function(locations, map, bus, angleArray, stop) {
    var that = this;
    // we get [Markers] for this route (bus). It could be existing array or empty one
    var markers = that.getMarkers(bus);
    // put marker on the Map. First of all it clear Map and put new one, 
    // function setMarker(locations, map, stop) {
    deleteMarkers();
    // if (!stop) then function just delete all markers
    // but if (stop === true) than we continue add markers on map
    if (stop) {
      that.setMarkers(bus, []);
      for (var i = 0; i < locations.length; i++) {
        addMarker(locations[i], angleArray[i]);
        setAllMap(map);
      }
    }

    function addMarker(location, angle) {
      // each route has own color and here we choose it
      var color,
        vehicle,
        marker,
        options,
        infowindow;
      switch (bus) {
        case '1':
          color = '#0000FF';
          break;
        case '2':
          color = '#7FFF00';
          break;
        case '3':
          color = '#FFA500';
          break;
        case '4':
          color = '#FF0000';
          break;
        case '5':
          color = '#00FFFF';
          break;
        case '6':
          color = '#FFFF00';
          break;
        case '7':
          color = '#FF00FF';
          break;
        default:
          color = '#000000';
      }
      // than we create a symbol to show marker
      vehicle = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        fillColor: color,
        fillOpacity: 0.9,
        scale: 4,
        rotation: angle,
        strokeWeight: 1
      };
      // and create marker with all data
      marker = new google.maps.Marker({
        position: location,
        title: bus + 'H',
        //     label: bus + 'H',
        map: map,
          icon: vehicle
        });
      // options for infowindow
      options = {
        content: bus
      };

      infowindow = new google.maps.InfoWindow(options);
      marker.addListener('click', function() {
        infowindow.open(map, marker);
        setTimeout(function () {
        infowindow.close()
      }, 1000);
      });

      // and add marker to [Markers]
      that.pushMarkers(bus, marker);
    }
    // add all markers from [Markers] on map
    function setAllMap(map) {
      var markers = that.getMarkers(bus);
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
      // if map === null we clear the [Markers] to add new or stop process
      if (map === null) {
        that.setMarkers(bus, []);
      }
    }
    // clear map
    function clearMarkers() {
      setAllMap(null);
    }
    // delete markers
    function deleteMarkers() {
      clearMarkers();
    }
  },

  /*  Poliline   */

  setResponse: function() {

    var that = this;
    $.ajax({
      type: "GET",
      async: true,
      dataType: 'json',
      url: 'http://localhost:8080/api/routes/',


      success: function(resp) {
        that.putResponse(resp);
      },
      error: function(err) {
        console.log(err);
      }
    })
  },
  putResponse: function(response) {
    this.response = response;
    menuView.setCount(); //koly counter == 2
  },

  getResponse: function() {
    return this.response;
  },


  getPoli: function(waynumber) {
    this.poliarr = menuView.getPoliArray();
    var coords = [];

    switch (waynumber) {
      case '1H':
        {
          coords = this.getCoords('1H');
          this.poliarr[waynumber].setOptions({
            strokeColor: '#00FFFF',
            path: coords
          });
          break;
        }

      case '2H':
        {
          coords = this.getCoords('2H');
          this.poliarr[waynumber].setOptions({
            strokeColor: '#FF0000',
            path: coords
          });
          break;
        }

      case '3H':
        {
          coords = this.getCoords('3H');
          this.poliarr[waynumber].setOptions({
            strokeColor: '#FFFF00',
            path: coords
          });
          break;
        }

      case '4H':
        {
          coords = this.getCoords('4H');
          this.poliarr[waynumber].setOptions({
            strokeColor: '#FF5722',
            path: coords
          });
          break;
        }

      case '5H':
        {
          coords = this.getCoords('5H');
          this.poliarr[waynumber].setOptions({
            strokeColor: '#FFC107',
            path: coords
          });
          break;
        }

      case '6H':
        {
          coords = this.getCoords('6H');
          this.poliarr[waynumber].setOptions({
            strokeColor: '#C2185B',
            path: coords
          });
          break;
        }

      case '7H':
        {
          coords = this.getCoords('7H');
          this.poliarr[waynumber].setOptions({
            strokeColor: '#4CAF50',
            path: coords
          });
          break;
        }
    }
  },

  getCoords: function(name) {

    var templ = [];
    var res = this.getResponse(); //array of obj!!!!!!!!!!!!!!!!
    res.forEach(function(obj) {
      if (obj.name == name) {
        templ = obj.routeArray;
      }
    })
    return templ.map(function(el) {
      return (new google.maps.LatLng(el.lat, el.lng));
    })

  },

  /*events: {
    'click input:checkbox': 'passPoliline'
  },*/

  drawPoliline: function(name) {
    var map = menuView.getMap();
    var that = this;
    $.when(that.getPoli(name)).then(function() {
      that.poliarr[name].setMap(map);
    })
  },

  hidePoliline: function(name) {
    var map = menuView.getMap();
    var that = this;
    $.when(that.getPoli(name)).then(function() {
      that.poliarr[name].setMap(null);
    })
  },

  passPoliline: function(e) {
    var $checkbox = $(e.currentTarget);
    var that = this;
    var map = menuView.getMap();
    waynumber = ($checkbox).attr('id');

    if ($checkbox.is(':checked')) {
      this.drawPoliline(waynumber);
    } else {
      this.hidePoliline(waynumber);
    }
  },
  showPopup: function(e) {
   var data = this.setInfo();
    var route = ($(e.currentTarget).text()); 
    var obj;
    for (var key in data) {
      if(key == route) {
        information = data[key]
      }
    }
    var templ = _.template((busInfoTemplate));

    $('#busInfo').html(templ({
      obj: information
    }));

    $('#busInfo').show();
  },
  setInfo: function() {
    var infoObject = {};
    this.response.forEach(function(el) {
      infoObject[el.name] = {
        route: el.info.route,
        way: el.info.way,
        price: el.info.price,
        interval: el.info.interval,
        time: el.info.time,
        sw: el.info.sw,
        bw: el.info.bw
      };
    });
    return infoObject;
  },
  getInfo: function() {
    return this.info;
  },
  hidePopup: function() {
    $('#busInfo').hide();
  }
});