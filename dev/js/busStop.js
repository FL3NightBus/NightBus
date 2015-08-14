var map;
var ChatView = Backbone.View.extend({
  /*template: _.template('<div class="find">' +
                          '<p>SEARCH</p>' +
                          '<div>' +
                            '<label for="id">from</label>' +
                            '<input type="text" id="from" name="from" class="txt" />' +
                          '</div>' +
                          '<div>' +
                            '<label for="to">to</label>' +
                            '<input type="text" id="to" name="to" class="txt" />' +
                          '</div>' +
                          '<div class="right">' +
                            '<input type="button" id="clear" name="clear" class="btn btn-default" value="clear" />' +
                            '<input type="button" id="seach" name="seach" class="btn btn-default" value="seach"  />' +
                          '</div>' +
                        '</div>' +
                        '<div class="click">' +
                          '<p>Where I am?<p>' +
                          '<input type="button" id="here" name="here" class="btn btn-default" value="Here!">' +
                          '<p>' +
                            '<img src="img/alert.png"> You can doble click on two points to find your way:' +
                            '<input type="button" id="start" name="start" class="dbl btn btn-default" value="start">' +
                          '</p>' +
                        '</div>'
                        )*/
});
var MenuView = Backbone.View.extend({
  el: $('#nav'),
  events:{
    'click .search': 'createSearch',
    'click .chat': 'createChat'
  },
  searchView: null,
  chatView: null,
  initialize: function() {
    var that = this;
    google.maps.event.addDomListener(window, 'load', this.mapInitialize);
  },
  mapInitialize: function() {
    var myLatlng = {
        lat: 49.87141,
        lng: 24.058568
      },
      mapOptions = {
        center: myLatlng,
        zoom: 10
      };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    geocoder = new google.maps.Geocoder();
  },
  autocomplete_map: function () {
    var from = $('#from');
    console.log(from.val());
    var autocomplete = new google.maps.places.Autocomplete(from[0]);
    //autocomplete.bindTo('bounds', map);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      console.log(place);
      console.log(place.name);  //название места
      console.log(place.id);  //уникальный идентификатор места
    });
  },
  createSearch: function(){
    var that = this;
    if(!this.searchView){
      this.searchView = new SearchView();
    };
    if(!this.$el.find('.search').hasClass('clicked')) {
      that.render('.search');
    };
  },
  createChat: function(){
    if(!this.searchView){
      this.searchView = new SearchView();
    };
    if(!this.$el.find('.chat').hasClass('clicked')) {
      this.render('.chat');
    }
  },
  render: function(pageClass) {
    var that = this;
    var time = 0;
    var submenu = this.$el.parent().find('.submenu');
    submenu.html('');
    if(submenu.hasClass('active')){
      submenu.removeClass('active pad10');
      time = 2000;
    };
    this.$el.find('.clicked').removeClass('clicked');
    this.$el.find(pageClass).addClass('clicked');
    setTimeout(function(){
      submenu.addClass('active');
    }, time);
    setTimeout(function(){
      submenu.html(that.searchView.template).addClass('pad10');
      that.autocomplete_map();
    }, time + 2000);
  },
});
var SearchView = Backbone.View.extend({
  el: $('.submenu'),
  events: {
    'click #ok': 'getWay',
    'click #start': 'getPoints',
    'click #search': 'aa'
  },
  template: _.template('<div class="find">' +
                          '<p>SEARCH</p>' +
                          '<div>' +
                            '<label for="id">from</label>' +
                            '<input type="text" id="from" name="from" class="txt" />' +
                          '</div>' +
                          /*'<div class="change">' +
                            '<input type="button" value="change" id="change" name="change" class="btn btn-default" />' +
                          '</div>' +*/
                          '<div>' +
                            '<label for="to">to</label>' +
                            '<input type="text" id="to" name="to" class="txt" />' +
                          '</div>' +
                          '<div class="right">' +
                            '<input type="button" id="clear" name="clear" class="btn btn-default" value="clear" />' +
                            '<input type="button" id="search" name="search" class="btn btn-default" value="search"  />' +
                          '</div>' +
                        '</div>' +
                        '<div class="click">' +
                          '<p>Where I am?<p>' +
                          '<input type="button" id="here" name="here" class="btn btn-default" value="Here!">' +
                          '<p>' +
                            '<img src="img/alert.png"> You can doble click on two points to find your way:' +
                            '<input type="button" id="start" name="start" class="dbl btn btn-default" value="start">' +
                          '</p>' +
                        '</div>'
                        ),
  busStopArray: [],
  initialize: function() {
    var that = this;
    this.fetch('http://localhost:8080/api/routes', that.setBusStopArray);
    google.maps.event.addDomListener(window, 'load', this.mapInitialize);
  },
  fetch: function(url, callback){
    var that=this;
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
  busStopCoordinateComparison: function(routeCoord, busStopCoord1, busStopArray){
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
      })
    });
    that.busStopArray = busStopArray;
  },
  getBusStopArray: function(){
    return this.busStopArray;
  },
  getNearestBusStop: function(position) {
    var nearestBusStop,
      markers = [],
      radius = 0,
      marker = new google.maps.Marker({
        position: position,
        map: map
      }),
      circleOptions = {
        map: map,
        center: position,
        radius: radius,
        visible: true
      },
      busStopArray = this.getBusStopArray();
      var circle = new google.maps.Circle(circleOptions);
    busStopArray.forEach(function(el) {
      markers.push(new google.maps.Marker({
        position: el,
        map: map,
        visible: false
      }));
    });
    while (!nearestBusStop) {
      markers.forEach(function(el, i) {
        if (circle.getBounds().contains(el.getPosition())) {
          nearestBusStop = busStopArray[i];
        }
      });
      radius += 5;
      circle.setRadius(radius);
    };
    return nearestBusStop;
  },
  codeAddress: function() {
    var address = document.getElementById("address").value;
    address += ' Lviv';
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
       console.log(results[0].geometry.location)
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,

        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  },
  getBusStopsInRadius: function(position, radius){
    var busStopInRadius = [],
    markers = [],
    busStopArray = this.getBusStopArray();
    circleOptions = {
        map: map,
        center: position,
        radius: radius,
        visible: true
      };
    busStopArray.forEach(function(el) {
      markers.push(new google.maps.Marker({
        position: el,
        map: map,
        visible: false
      }));
    });
    var circle = new google.maps.Circle(circleOptions);
    //circle.setRadius(radius);
    //circle.setCenter(position);
    markers.forEach(function(el, i) {
      if (circle.getBounds().contains(el.getPosition())) {
        busStopInRadius.push(busStopArray[i]);
      };
      el.setMap(null);
      markers = [];
    });
    marker = new google.maps.Marker({
      position: position,
      map: map
    });
    return busStopInRadius;

  },
  getWay: function() {
    var amount = 0,
      dotArray = [],
      that = this;
    var listener = google.maps.event.addListener(map, 'dblclick', function(e) {
      amount++;
      console.log(e.latLng);
      dotArray.push(e.latLng);
      map.setOptions({
        disableDoubleClickZoom: true
      });
      if (amount == 2) {
        google.maps.event.removeListener(listener);
        var firstBusStop = that.getNearestBusStop(dotArray[0]);
        var secondBusStop = that.getNearestBusStop(dotArray[1]);
        var firstBusStops = that.getBusStopsInRadius(firstBusStop, 150);
        var secondBusStops = that.getBusStopsInRadius(secondBusStop, 150);
        console.log(firstBusStops);
        console.log(secondBusStops);
        var buses = [],
          busesNotCross = [];
        firstBusStops.forEach(function(el1) {
          secondBusStops.forEach(function(el2) {
            el2.route.forEach(function(el3) {
              if (el1.route.indexOf(el3) != -1) {
                if (buses.indexOf(el3) == -1) {
                  buses.push(el3);
                }
              } else if (busesNotCross.indexOf(el3) == -1) {
                busesNotCross.push(el3);
              }
            })
          })
        });
        /*if (!buses.length) {
          buses = busesNotCross;
        };*/
        map.setOptions({
          disableDoubleClickZoom: false
        });
        console.log(buses);
      }
    });
  },
  getPoints: function(){
    this.$el.html('');
    this.$el.removeClass('active pad10');
    this.$el.parent().find('.clicked').removeClass('clicked');
    this.getWay();
  }
});
var menuView = new MenuView();