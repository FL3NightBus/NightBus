var map;
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
  hidePage: function(){
    var that = this;
    var time = 0;
    submenu = that.$el.parent().find('.submenu');
    submenu.find('.searchPage').css({'display': 'none'});
    if(submenu.hasClass('active')){
      submenu.removeClass('active pad10');
      time = 2000;
    };
    that.$el.find('.clicked').removeClass('clicked');
    return time;
  },
  render: function(pageClass) {
    var that = this;
    var submenu = this.$el.parent().find('.submenu');
    var time = this.hidePage();
    this.$el.find(pageClass).addClass('clicked');
    setTimeout(function(){
      submenu.addClass('active');
    }, time);
    setTimeout(function(){
      submenu.addClass('pad10')
      submenu.find('.searchPage').css({'display': 'block'});
    }, time + 2000);
  }
});


var SearchView = Backbone.View.extend({
  el: $('.submenu'),
  events: {
    'click #start': 'getPoints',
    'click #search': 'setPoints'
  },
  template: _.template('<div class="searchPage">' +
                          '<div class="autocomplete">' +
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
                              '<input type="text" id="to" name="to" class="txt" value="<% this.fieldto %>" />' +
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
                          '</div>' +
                        '</div>'),
  busStopArray: [],
  fieldfrom: '',
  fieldto: '',
  busStopMarkers: [],
  markers: [],
  initialize: function() {
    var that = this;
    this.fetch('http://localhost:8080/api/routes', that.setBusStopArray);
    google.maps.event.addDomListener(window, 'load', this.mapInitialize);
    this.$el.html(this.template);
    this.autocompleteListener();
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
      });
    });
    that.busStopArray = busStopArray;
  },
  getBusStopArray: function(){
    return this.busStopArray;
  },
  autocomplete_map: function (selector) {
    var that = this;
    var autocomplete = new google.maps.places.Autocomplete(selector);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      that['field'+selector.name] = autocomplete.getPlace().geometry.location;
    });
  },
  autocompleteListener: function(){
    var from = $('#from');
    var to = $('#to');
    this.autocomplete_map(from[0]);
    this.autocomplete_map(to[0]);
  },
  setBusStopMarkers: function(){
    var that = this,
      busStopArray = this.getBusStopArray();
    busStopArray.forEach(function(el) {
      that.busStopMarkers.push(new google.maps.Marker({
        position: el,
        map: map,
        visible: false
      }));
    });
  },
  getBusStopMarkers: function(){
    return this.busStopMarkers;
  },
  setMarkers: function(position){
    var that = this;
    that.markers.push(new google.maps.Marker({
      position: position,
      map: map,
      visible: true
    }))
  },
  deleteMarkers: function(markers){
    markers.forEach(function(el){
      el.setMap(null);
    })  
    markers = [];
    return markers;
  },
  setCircleOptions: function(map, position, radius, isVisible){
    return {
        map: map,
        center: position,
        radius: radius,
        visible: isVisible
      }
  },
  getNearestBusStop: function(position) {
    var nearestBusStop,
      pos,
      distance,
      radius = 0,
      circleOptions = this.setCircleOptions(map, position, radius, true);
      this.setMarkers(position);
      busStopArray = this.getBusStopArray();
    var circle = new google.maps.Circle(circleOptions);
    while (!nearestBusStop) {
      this.getBusStopMarkers().forEach(function(el, i) {
        if (circle.getBounds().contains(el.getPosition())) {
          nearestBusStop = busStopArray[i];
          pos = el.getPosition();
        }
      });
      radius += 5;
      circle.setRadius(radius);
    };
    radius = google.maps.geometry.spherical.computeDistanceBetween(pos, position);
    circle.setRadius(radius);
    return nearestBusStop;
  },
  getBusStopsInRadius: function(position, radius){
    var busStopInRadius = [],
      that = this,
      circleOptions = this.setCircleOptions(map, position, radius, false);

    this.setMarkers(position);
    var busStopArray = this.getBusStopArray();
    var circle = new google.maps.Circle(circleOptions);
    this.getBusStopMarkers().forEach(function(el, i) {
      if (circle.getBounds().contains(el.getPosition())) {
        that.setMarkers(busStopArray[i]);
        busStopInRadius.push(busStopArray[i]);
      };
    });
    return busStopInRadius;

  },
  getRequiredBusStops: function(coord) {
    var busStop = this.getNearestBusStop(coord),
      busStops = this.getBusStopsInRadius(busStop, 150);
    console.log(busStops);
    return busStops;
  },
  getBusNumbers: function(busStopsFrom, busStopsTo){
    var buses = [],
      busesNotCross = [];
    busStopsFrom.forEach(function(from) {
      from.route.forEach(function(routeNumber){
        if (busesNotCross.indexOf(routeNumber) == -1) {
          busesNotCross.push(routeNumber);
        }
      });
      busStopsTo.forEach(function(to) {
        to.route.forEach(function(routeNumber) {
          if (from.route.indexOf(routeNumber) != -1) {
            if (buses.indexOf(routeNumber) == -1) {
              buses.push(routeNumber);
            }
          } else if (busesNotCross.indexOf(routeNumber) == -1) {
            busesNotCross.push(routeNumber);
          }
        })
      })
    });
    if (buses.length === 0) {
      buses = busesNotCross;
    };
    console.log(buses);
  },
  getPoints: function(){
    var amount = 0,
      busStopsArray = [],
      that = this;
    this.setBusStopMarkers();
    //var zoom = map.getZoom();
    map.setOptions({
      disableDoubleClickZoom: true
    });
    menuView.hidePage();
    var listener = google.maps.event.addListener(map, 'dblclick', function(e) {
      amount++;
      busStopsArray.push(that.getRequiredBusStops(e.latLng));
      if (amount == 2) {
        google.maps.event.removeListener(listener);
        that.busStopMarkers = that.deleteMarkers(that.busStopMarkers);
        //map.setZoom(zoom);
        that.getBusNumbers(busStopsArray[0], busStopsArray[1]);
        map.setOptions({
          disableDoubleClickZoom: false
        });
      }
    });
  },
  setPoints: function(){
    menuView.hidePage();
    this.setBusStopMarkers();
    console.log(this.fieldfrom);
    var busStopsFrom = this.getRequiredBusStops(this.fieldfrom);
    var busStopsTo = this.getRequiredBusStops(this.fieldto);
    this.busStopMarkers = this.deleteMarkers(this.busStopMarkers);
    this.getBusNumbers(busStopsFrom, busStopsTo);
  }
});
var menuView = new MenuView();