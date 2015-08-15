  var OnLineTrafficView = Backbone.View.extend({
      initialize: function () {
        this.timerArray = {};
        this.markersArray = {};
        this.stoper = {};
        this.busArray = {};
        this.anglesArray = {};
      },
      render: function () {},
      el: '#form',
      events: {
        'change input:checkbox': 'listener',
        'click button#location': 'getPosition'
      },
      getPosition: function () {
        mapView.getYourPosition();
      },
      getBusArray: function (id) {
        return this.busArray['id' + id];
      },
      setBusArray: function (id, array) {
        this.busArray['id' + id] = array;
      },
      getAnglesArray: function (id) {
        return this.anglesArray['id' + id];
      },
      setAnglesArray: function (id, array) {
        this.anglesArray['id' + id] = array;
      },
      listener: function () {
        // elem - #id of checkbox which is changed (could be [1-7]H)
        var elem = this.$el.context.activeElement.id;
        // interval (seconds) - value from #interval to know when send requests (default 5s)
        var interval = ($('#interval').val()) || 2;
        if ($('#' + elem + ':checked').val()) {
          this.setStoper(elem, true);
          // if checkbox is 'checked' than we send data (# of route and interval) to busOnWay()
          this.firstRequest(elem);
          this.busOnWay(elem, interval);
        };
        // listener for checkboxes. When !'ckecked' - route with #id '[1-7]H' will be cut from Map
        //we have 'stop' variable what has undefined value.
        // if checkbox isn't checked we send false to setMarker to delete all markers and stop render them
        if (!($('#' + elem + ':checked').val())) {
          this.setStoper(elem, false);
          clearInterval(this.getTimer(elem));
          var map = menuView.getMap();
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
      getAngle: function (coords, coords1) {
        var x = (coords1.G - coords.G);
        var y = (coords1.K - coords.K);
        var angle = (Math.atan2(x, y) * 180 / Math.PI);
        if (x < 0) {
          angle += 360;
        }
        return 90 - angle;
      },
      firstRequest: function (bus) {
        var that = this;
        that.setMarkers(bus, []);
        var map = menuView.getMap();
        $.ajax({
          type: "GET",
          dataType: 'jsonp',
          url: 'https://try1408.localtunnel.me/api/routes?route=' + bus,
          success: function (response) {
            if (that.getStoper(bus)) {
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
          error: function (response) {
            console.log(this.url);
            console.log(response);
          }
        });
      },
      busOnWay: function (bus, interval) {
        var that = this;
        that.setMarkers(bus, []);
        // time - number of miliseconds for setInterval to get data from server and render it on Map
        var time = interval * 1000;
        var map = menuView.getMap();
        var busArr = [],
          angArr = [];
        var timer = setInterval(function () {
          // this GET allow us get a coordinates from server and send them to setMerker();
          // also we can get a coordinats for few buses. So we should be ready to support all of them 
          $.ajax({
            type: "GET",
            dataType: 'jsonp',
            url: 'https://try1408.localtunnel.me/api/routes?route=' + bus,
            success: function (response) {
              // here we create an array of locations (coordinates for future markers) and angles between markers
              var angleArray = [];
              var locationsArray = [];
              //        console.log(response);
              if (that.getStoper(bus)) {
                // going throught response (array of objects (with pairs of coords)) to create locations
                for (var i = 0; i < response.length; i++) {
                  locationsArray.push(new google.maps.LatLng(response[i].lat, response[i].lng));
                  //                  console.log(response[i].lat);
                  //                  console.log(response[i].lng);
                };
                busArr = that.getBusArray(bus);
                angArr = that.getAnglesArray(bus);
                that.setBusArray(bus, locationsArray);
                for (var i = 0; i < locationsArray.length; i++) {
                  console.log(busArr[i] + ' & ' + locationsArray[i]);
                  var angle = (that.getAngle(busArr[i], locationsArray[i]));
                  console.log('angle = ' + angle);

                  var tempA = locationsArray[i];
                  var tempB = busArr[i];

                  if ((tempA.G === tempB.G) && (tempA.K === tempB.K)) {
                    angle = angArr[i];
                    console.log('it\'s busStop, so new angle = ' + angle);
                  }
                  angleArray.push(angle);
                };
                that.setAnglesArray(bus, angleArray);
                // send locations ang angles to add on Map
                that.setMarker(locationsArray, map, bus, angleArray, true);
              }
            },
            error: function (response) {
              console.log(this.url);
              console.log(response);
            }
          });
        }, time);
        that.setTimer(bus, timer);
      },
      setMarker: function (locations, map, bus, angleArray, stop) {
        var that = this;
        var map = menuView.getMap();
        var markers = that.getMarkers(bus);
        // put marker on the Map. First of all it clear Map and put new one, 
        // function setMarker(locations, map, stop) {
        deleteMarkers();
        //if (!stop) then function just delete all markers
        if (stop) {
          that.setMarkers(bus, []);
          for (var i = 0; i < locations.length; i++) {
            addMarker(locations[i], angleArray[i]);
            setAllMap(map);
          }
        }

        function addMarker(location, angle) {
          var color;
          switch (bus) {
          case '1H':
            color = 'blue';
            break;
          case '2H':
            color = 'green';
            break;
          case '3H':
            color = 'orange';
            break;
          case '4H':
            color = 'red';
            break;
          case '5H':
            color = 'purple';
            break;
          case '6H':
            color = 'yellow';
            break;
          case '6H':
            color = 'brown';
            break;
          default:
            color = 'black';
          }
          //    var image = '../img/' + bus + '.png';
          var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              fillColor: color,
              fillOpacity: 0.8,
              scale: 3,
              rotation: angle
            }
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