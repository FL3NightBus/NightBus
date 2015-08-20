var onLineTrafficViewTemplate = '<div class="page onLineTrafficPage">' +
        '<div id="form">' +
          '<p class="header">Слідкуй</p>' +
          '<input class="busInput" type="checkbox" id="1">' +
          '<input class="busInput" type="checkbox" id="2">' +
          '<input class="busInput" type="checkbox" id="3">' +
          '<input class="busInput" type="checkbox" id="4">' +
          '<input class="busInput" type="checkbox" id="5">' +
          '<input class="busInput" type="checkbox" id="6">' +
          '<input class="busInput" type="checkbox" id="7">' +
        '</div>' +
        '<div id="polylines">' +
          '<div id="sp">' +
            '<p class="header">Клікни</p>' +
            '<span class="routeSpan">1H</span>' +
            '<span class="routeSpan">2H</span>' +
            '<span class="routeSpan">3H</span>' +
            '<span class="routeSpan">4H</span>' +
            '<span class="routeSpan">5H</span>' +
            '<span class="routeSpan">6H</span>' +
            '<span class="routeSpan">7H</span><br>' +
          '</div>' +
          '<div id="pi">' +
            '<p class="header">Дивись</p>' +
            '<input class="polylineInput" id="1H" type="checkbox">' +
            '<input class="polylineInput" id="2H" type="checkbox">' +
            '<input class="polylineInput" id="3H" type="checkbox">' +
            '<input class="polylineInput" id="4H" type="checkbox">' +
            '<input class="polylineInput" id="5H" type="checkbox">' +
            '<input class="polylineInput" id="6H" type="checkbox">' +
            '<input class="polylineInput" id="7H" type="checkbox"><br>' +
          '</div>' +
        '</div>' +
        '<div id="ftr">Як часто показувати автобуси ?' +
        '<select id="interval" name="interval">' +
          '<option value="10">10</option>' +
          '<option value="20">20</option>' +
          '<option value="30">30</option>' +
          '<option value="40">40</option>' +
          '<option value="50">50</option>' +
          '<option value="60">60</option>' +
          '</select>' 
        '</div>' +
        '<div id="busInfo"></div>' +
      '</div>';

var busInfoTemplate = '<div id="#busInfo">' +
   '<span id="closeInfo">X</span>' +
      '<p><%= obj.route%></p>' +
      '<p><%= obj.way %></p>' +
      '<p>Ціна: <%= obj.price %></p>' +
      '<p>Інтервал руху: <%= obj.interval %></p>' +
      '<p>Час: <%= obj.time %></p>' +
      '<p>Прямий маршрут: <%= obj.sw %></p>' +
      '<p>Зворотній маршрут: <%= obj.bw %></p>' +
    '</div>';
var mainTemplate = '<div class="page chatPage">' +
                  '<div id="formChat"></div><ul id="body"></ul>' +
                  '</div>';

var formTemplate = '<div id="username">' +
        '<div id="img">' +
          '<label>' +
            '<img src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/male-48.png">' +
            '<input type="radio" name="user" checked>' +
          '</label>' +
          '<label>' +
            '<img src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/boy-2-48.png">' +
            '<input type="radio" name="user">' +
          '</label>' +
          '<label>'  +
            '<img src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/female-48.png">' +
            '<input type="radio" name="user" >' +
          '</label>' +
          '<label>' +
            '<img src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-2-48.png">' +
            '<input type="radio" name="user" >' +
         '</label>' +
          '<label>' +
            '<img src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/girl-2-48.png">' +
            '<input type="radio" name="user">' +
          '</label>' +
        '</div>' +
        '<input id="name" type="text" placeholder="Введіть свій нікнейм">' +
        '<input type="button" value="ок" id="okey" class="btn">' +
      '</div>' +
      '<div id="commentbox">' +
        '<textarea id="comment" maxlength="100"></textarea>' +
        '<input type="button" value="ok" id="ok" class="btn">' +
      '</div>';

var commentTemplate = '<div id="chat">' +
    '<% comments.forEach(function(mod) { %>' +
    '<div class="msg">' +
       '<div class="leftcont">' +
          '<div><img src ="<%= mod.icon %>"/></div>' +
          '<div><%= mod.name %></div>' +
       '</div>' +
       '<div class = "rightcont">' +
         '<div><%= mod.comments %></div>' +
         '<div class="time"><%= mod.time %></div>' +
        '</div>' +
    '</div>' +
    '<% }) %>' +
    '<input type="button", value="попередні", id="show" class="btn">' +
    '</div>';

var searchcViewTemplate = '<div class="page searchPage">' +
                            '<div class="autocomplete">' +
                              '<p>ПОШУК</p>' +
                              '<div class="right">' +
                                '<label for="from">від</label>' +
                                '<input type="text" id="from" name="from" />' +
                              '</div>' +
                              '<div class="right">' +
                                '<label for="to">до</label>' +
                                '<input type="text" id="to" name="to" />' +
                              '</div>' +
                              '<div class="right center">' +
                                '<input type="button" id="clear" name="clear" class="btn btn-default" value="очистити" />' +
                                '<input type="button" id="search" name="search" class="btn btn-default" value="знайти"  />' +
                              '</div>' +
                            '</div>' +
                            '<div class="find">' +
                              '<div class="infoContainer">' +
                                'Ви можете натиcнути &lsquo;старт&rsquo; і зробити два кліки: перший &mdash; точка відправлення, другий &mdash; призначення. Натиснувши &lsquo;я тут&rsquo;, точка відправлення автоматично стане відповідати вашому місцезнаходженню (якщо ви дали відповідний дозвіл при завантаженні сторінки). Для видалення міток на карті натисніть &lsquo;видалити&rsquo;.' +
                              '</div>' +
                            '</div>'+
                            '<div class="buttons">' +  
                              '<input type="button" id="start" name="start" class="btn btn-default" value="старт">' +
                              '<input type="button" id="here" name="here" class="btn btn-default" value="я тут">' +
                              '<input type="button" id="delete" name="delete" class="btn btn-default" value="видалити">' +
                            '</div>' +
                            '<div class="info"></div>' +
                          '</div>';                        
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
      url = 'https://nightbus.localtunnel.me/api/routes?route=' + bus + 'H';
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
      url = 'https://nightbus.localtunnel.me/api/routes?route=' + bus + 'H';
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
        content: bus + 'H'
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
      url: 'https://nightbus.localtunnel.me/api/routes/',


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
  busStopMarkers: [],
  listener: null,
  initialize: function() {
    var that = this;
    this.fetch('https://nightbus.localtunnel.me/api/routes', that.setBusStopArray);
    this.$el.append(this.template);
    this.autocompleteListener();
    this.poliline = [];
    this.markers = [];
    this.circles = [];
    this.infowindow = [];
    this.from = null;
    this.to = null;
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
    if($.isEmptyObject(myPosition)) {
      alert('Немає даних із геолокації.');
      return;
    };
    if(menuView.isInLviv(myPosition)){
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
      visible: true,
      icon: 'img/unisex.png'
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
    this.$el.find('.info').html('');
    this.markers = this.deleteMarkers(this.markers);
    this.infowindow.forEach(function(el) {
      el.close();
    });
    if(this.poliline){
      this.poliline.forEach(function(el){
        menuView.onLineTraffic.hidePoliline(el);
      });
    };
    this.$el.find('.info').css({
      'display': 'none'
    })
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
      infoForBus = 'маршрутом ',
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
    if (buses.length === 0 && busesNotCrossFrom.length !== 0) {
      info = buses.join(', ');
      this.$el.find('.info').css({
        'display': 'block'
        }).html('На жаль, прямого маршруту немає. Спочатку вам потрібно сісти на ' +
        busesNotCrossFrom.join(' або ') +
        ', а потім пересісти на ' +
        busesNotCrossTo.join(' або ') +
        '.');
      buses = busesNotCrossFrom.concat(busesNotCrossTo);
    } else if(buses.length >= 1) {
      info = buses.join(', ');
      if(buses.length > 1){
        infoForBus = 'наступними маршрутами: ';
      };
      this.$el.find('.info').css({
        'display': 'block'
        }).html('Ви можете доїхати з точки відправлення до точки призначення ' +
        infoForBus +
        info +
        '.');
    } else {
      this.$el.find('.info').css({
        'display': 'block'
        }).html('Відсутнє з&rsquo;єднання із сервером.');
      return;
    };
    buses.forEach(function(routeNumber) {
      menuView.onLineTraffic.drawPoliline(routeNumber);
    })
    this.poliline = this.poliline.concat(buses);
    if(google.maps.geometry.spherical.computeDistanceBetween(this.from, this.to) < 500){
      this.$el.find('.info').append(' До речі, до вашої цілі менше 500 м.')
    };

  },
  clickListener: function(amount, busStopsArray, map){
    var that = this;
    this.listener = google.maps.event.addListener(map, 'click', function(e) {
      if (menuView.isInLviv(e.latLng)) {
        if(amount === 0){
          that.from = e.latLng;
        } else {
          that.to = e.latLng;
        };
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
          that.$el.parent().find('.search').addClass('newInfo');
        }
      } else {
        alert('Вказане місце поза Львовом. Виберіть інше місце!');
      }
    });
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
      this.fieldfrom = position;
      busStopsArray.push(that.getNearestBusStops(position));
    };
    this.clickListener(amount, busStopsArray, map);

  },
  setPoints: function() {
    if (this.fieldfrom && menuView.isInLviv(this.fieldfrom)) {
      if (this.fieldto && menuView.isInLviv(this.fieldto)) {
        this.from = this.fieldfrom;
        this.to = this.fieldto;
        menuView.hidePage();
        this.setBusStopMarkers();
        var busStopsFrom = this.getNearestBusStops(this.fieldfrom);
        var busStopsTo = this.getNearestBusStops(this.fieldto);
        this.busStopMarkers = this.deleteMarkers(this.busStopMarkers);
        this.getBusNumbers(busStopsFrom, busStopsTo);
        this.$el.parent().find('.search').addClass('newInfo');
      } else {
        alert('Перевірте місце призначення. Можливо, адреса вказана невірно, або знаходиться за межами досяжності наших маршрутів.');
      }
    } else {
      alert('Перевірте місце відправлення. Можливо, адреса вказана невірно, або знаходиться за межами досяжності наших маршрутів.');
    };
  }
});
/*====================Model for our comments==============*/

var ChatView = Backbone.View.extend({
  initialize: function() {
    this.render();
    this.form = new FormView();
    this.app = new CommentsView();
  },
  setIntAjax: function() {
    var that = this;
    this.interval = setInterval(function() {
      that.app.render();
    }, 5000);

  },
  render: function() {
    var tmpl = _.template(mainTemplate);
    $('.submenu').append(tmpl);
  },
  getUser: function() {
    return this.user;
  },
  closeInterval: function() {
    clearInterval(this.interval);
  }
});


CommentModel = Backbone.Model.extend({
  toJSON: function() {
    return _.extend(this.attributes, {
      time: (new Date(this.attributes.time)).toLocaleString()
    });
  }
});

/*====================Collection for our comments==============*/
CommentCollection = Backbone.Collection.extend({
  model: CommentModel,
});

var collection = new CommentCollection();

var CommentView = Backbone.View.extend({
  el: '#body',

  render: function() {
    $.ajax({
      url: 'https://nightbus.localtunnel.me/api/comments?name=' + this.model.get('name') + '&time=' + this.model.get('time') + '&comment=' + this.model.get('comments') + '&icon=' + this.model.get('icon'),
      type: "POST",
      dataType: 'json',
      crossDomain: true,
      success: function(result) {
        
      }
    });

    return this;

  },
  initialize: function() {
    this.render();
  }
});


/*================ View for all comments ===================*/

var CommentsView = Backbone.View.extend({

  el: '#body',

  initialize: function() {
    var that = this;
    collection.on('add', this.render, this);
    this.prev = 0;
    this.render();
    this.counter = this.templ = 1;
    this.array = [];
  },

  template: _.template(commentTemplate),

  render: function() {

    that = this;

    $.ajax({
      type: "GET",
      dataType: 'json',
      async: true,
      url: 'https://nightbus.localtunnel.me/api/comments/',
      success: function(response) {
        var arrayModel = [];
        response.forEach(function(obj) {
          arrayModel.push(obj)
        })
        arrayModel.reverse();
        that.array = arrayModel.slice(0, that.counter * 10);

        collection.reset(that.array)

        if (response.length != that.prev || that.templ != that.counter) {

          $(that.el).html(that.template({
            comments: collection.toJSON()
          }));
        }
        if (arrayModel.length <= that.counter * 10) {
          $(that.el).find('input').hide();
        }

        that.prev = response.length;
        that.templ = that.counter;
      }
    });
  },

  events: {
    'click #show': 'showAll'
  },

  showAll: function() {

    this.counter++
    this.render();
  }

})

var FormView = Backbone.View.extend({
  el: '#formChat',

  template: _.template(formTemplate),

  render: function() {

    this.$el.append(this.template);
    return this;
  },

  initialize: function() {
    this.username = '';
    this.icon = '';
    this.render();

  },

  events: {
    'click #ok': 'addContact',
    'click #okey': 'saveData'
  },

  addContact: function() {
    var model = new CommentModel();
    var comments = this.$el.find('textarea');
    if ($(comments).val().match(/[a-zA-Zа-яА-Яії]{3,100}/gi)) {

      model.set({
        name: this.username,
        comments: $(comments).val(),
        time: (new Date()).getTime(),
        icon: this.icon
      });
      var cv = new CommentView({
        model: model
      });
      collection.add(model);
      $('#comment').val('');
    }
  },
  saveData: function() {
    this.username = $('#name').val();
    if ((this.username.match(/[a-zA-Zа-яА-Яії]{3,30}/gi))) {
      var radios = $('#img').find('input');
      for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked) {
          var $img = $($(radios[i]).closest('label')).find('img');
          this.icon = ($img.attr('src'));
        }
      }
      $('#commentbox').show();
      $('#username').hide();
    }
  }

});
var MenuView = Backbone.View.extend({
  el: $('#nav'),
  events: {
    'click .search': 'renderSearch',
    'click .chat': 'renderChat',
    'click .onLineTraffic': 'renderOnLineTraffic'
  },
  searchView: null,
  chatView: null,
  onLineTraffic: null,
  initialize: function () {
    this.yourPosition = {};
    this.count = 0;
    //     google.maps.event.addDomListener(window, 'load', this.mapInitialize);
    this.mapInitialize();
  },
  mapInitialize: function () {
    //   var startCoords = [49.83916569, 23.99448127];
    var myStyles = [{
      featureType: 'transit.station',
      elementType: 'labels.icon',
      stylers: [{
        visibility: "off"
      }]
    }];
    var mapOptions = {
      //        center: new google.maps.LatLng(startCoords[0], startCoords[1]),
      zoom: 13,
      styles: myStyles,
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
    var polyOptions = {
      strokeOpacity: 0.7,
      strokeWeight: 5
    };

    this.poliArray = {
      '1H': new google.maps.Polyline(polyOptions),
      '2H': new google.maps.Polyline(polyOptions),
      '3H': new google.maps.Polyline(polyOptions),
      '4H': new google.maps.Polyline(polyOptions),
      '5H': new google.maps.Polyline(polyOptions),
      '6H': new google.maps.Polyline(polyOptions),
      '7H': new google.maps.Polyline(polyOptions)
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.getGeoLocation();
    this.createInstance();
  },
  // when Map and mapView is ready we create instance of other Views
  createInstance: function(){
    this.searchView = new SearchView();
    //this.chatView = new ChatView();
    this.onLineTraffic = new OnLineTrafficView();
  },
  // when searchView is ready we create busStopView (it has strong dependence)
  createBusStopView: function(){
    var bsv = new BusStopView();
  },
  isInLviv: function(position) {
    var isOnCircle,
      map = this.map,
      center = {
        lat: 49.827145,
        lng: 24.026072
      },
      circleOption = {
      map: map,
      center: center,
      radius: 9000,
      visible: false
    },
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
  setCount: function(){
    this.count++;
    if (this.count == 2) {
      menuView.createBusStopView();
    }
  },
  getMap: function () {
    return this.map;
  },
  getPoliArray: function () {
    return this.poliArray;
  },
  getGeoLocation: function () {
    var map = this.getMap();
    var that = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var position_ = {lat: pos.G, lng: pos.K};
        if (!(that.isInLviv(pos))) {
          pos = new google.maps.LatLng(49.83916569, 23.99448127);
        }
        var infowindow = new google.maps.InfoWindow({
          map: map,
          position: pos,
          content: 'Я тут'
        });
        that.setYourPosition(pos);
        map.setCenter(pos);
      }, function () {
        that.handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      that.handleNoGeolocation(false);
    }
  },
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
    //  var infowindow = new google.maps.InfoWindow(options);
    this.map.setCenter(options.position);
  },
  setYourPosition: function (coords) {
    this.yourPosition = coords;
  },
  getYourPosition: function () {
    return this.yourPosition;
  },
  renderSearch: function () {
    if (this.$el.find('.search').hasClass('clicked')) {
      this.hidePage();
    } else {
      this.render('.search');
    }
  },
  renderChat: function () {
    if(!this.chatView){
      this.chatView = new ChatView();
    };
    if (this.$el.find('.chat').hasClass('clicked')) {
      this.hidePage();
    } else {
      this.render('.chat');
    }
  },
  renderOnLineTraffic: function () {
    if (this.$el.find('.onLineTraffic').hasClass('clicked')) {
      this.hidePage();
    } else {
      this.render('.onLineTraffic');
    }
  },
  hidePage: function () {
    var that = this;
    var time = 0;
    submenu = that.$el.parent().find('.submenu');
    submenu.find('.page').css({
      'display': 'none'
    });
    if(this.$el.find('.chat').hasClass('clicked')) {
      this.chatView.closeInterval();
    };
    if (submenu.hasClass('active')) {
      submenu.removeClass('active');
      time = 1000;
    };
    that.$el.find('.clicked').removeClass('clicked');
    return time;
  },
  render: function (pageClass) {
    var that = this;
    var submenu = this.$el.parent().find('.submenu');
    var time = this.hidePage();
    if(pageClass == '.chat') {
      this.chatView.setIntAjax();
    };
    if (pageClass == '.search' && this.searchView.listener) {
      google.maps.event.removeListener(this.searchView.listener);
      this.map.setOptions({
        disableDoubleClickZoom: false
      });
      if (this.$el.find('.search').hasClass('dblclicked')) {
        this.searchView.busStopMarkers = this.searchView.deleteMarkers(this.searchView.busStopMarkers);
        this.$el.find('.search').removeClass('dblclicked');
      }
    };
    this.$el.find(pageClass).removeClass('newInfo').addClass('clicked');
    setTimeout(function () {
      submenu.addClass('active');
    }, time);
    setTimeout(function () {
      if(submenu.hasClass('active')){
        submenu.find(pageClass + 'Page').css({
          'display': 'block'
        });
      }
    }, time + 1000);
  }
});
var menuView = new MenuView();
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
          time = (indexOfBusStop - max - 1) * 10;
        } else if (max > indexOfBusStop) {
          time = (myroute.length - 1 - (max - indexOfBusStop - 1)) * 10;
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