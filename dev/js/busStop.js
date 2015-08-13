var map;
var MenuView = Backbone.View.extend({
  el: $('#nav'),
  events:{
    'click .search': 'createSearch'
  },
  searchView: null,
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
  },
  createSearch: function(){
    if(!this.searchView){
      this.searchView = new SearchView();
    };
    this.renderSearch();
  },
  renderSearch: function() {
    var that = this;
    this.$el.find('.clicked').removeClass('clicked');
    this.$el.find('.search').addClass('clicked');
    this.$el.parent().find('.submenu').addClass('active');
    setTimeout(function(){
      that.$el.parent().find('.submenu').html(that.searchView.template).addClass('pad10');
    }, 2000);
  }
});
var SearchView = Backbone.View.extend({
  el: $('.submenu'),
  events: {
    'click #ok': 'getWay',
    'click .dbl': 'getPoints'
  },
  template: _.template('<div class="find">' +
                          '<p>Find Your way</p>' +
                          '<div>' +
                            '<label for="id">from</label>' +
                            '<input type="text" id="from" name="from" class="txt" />' +
                            '<input type="button" value="here" id="here" name="here" class="btn btn-default" />' +
                          '</div>' +
                          '<div class="change">' +
                            '<input type="button" value="change" id="change" name="change" class="btn btn-default" />' +
                          '</div>' +
                          '<div>' +
                            '<label for="to">to</label>' +
                            '<input type="text" id="to" name="to" class="txt" />' +
                            '<input type="button" value="ok" id="ok" name="ok" class="btn btn-default"  />' +
                          '</div>' +
                        '</div>' +
                        '<div class="click">' +
                          '<p>You might double click on two points to find Your way!<p>' +
                          '<p>Only click here: <img src="img/alert.png" class="dbl"></p>' +
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
  
  setBusStopArray: function(arrayOfCoordinates, that) {
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