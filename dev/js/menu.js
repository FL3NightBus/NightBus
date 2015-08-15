var MenuView = Backbone.View.extend({
  el: $('#nav'),
  events: {
    'click .search': 'createSearch',
    'click .chat': 'createChat',
    'click .onLineTraffic': 'createOnLineTraffic'
  },
  searchView: null,
  chatView: null,
  onLineTraffic: null,
  initialize: function() {
    this.yourPosition = {};
    //     google.maps.event.addDomListener(window, 'load', this.mapInitialize);
    this.mapInitialize();
  },
  mapInitialize: function() {
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
  getMap: function() {
    return this.map;
  },
  getGeoLocation: function() {
    var map = this.getMap();
    var that = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var infowindow = new google.maps.InfoWindow({
          map: map,
          position: pos,
          content: 'You are here'
        });
        that.setYourPosition(pos);
        map.setCenter(pos);
      }, function() {
        that.handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      that.handleNoGeolocation(false);
    }
  },
  handleNoGeolocation: function(errorFlag) {
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
  setYourPosition: function(coords) {
    this.yourPosition.lat = coords.G;
    this.yourPosition.lng = coords.K;
    console.log(this.yourPosition);
  },
  getYourPosition: function() {
    return this.yourPosition;
  },
  createSearch: function() {
    if (!this.searchView) {
      this.searchView = new SearchView();
    };
    if (this.$el.find('.search').hasClass('clicked')) {
      this.hidePage();
    } else {
      this.render('.search');
    }
  },
  createChat: function() {
    if (!this.searchView) {
      this.searchView = new SearchView();
    };
    if (!this.$el.find('.chat').hasClass('clicked')) {
      this.render('.chat');
    }
  },
  createOnLineTraffic: function() {
    if (!this.onLineTraffic) {
      this.onLineTraffic = new OnLineTraffic();
    };
    if (!this.$el.find('.onLineTraffic').hasClass('clicked')) {
      this.render('.onLineTraffic');
    }
  },
  hidePage: function() {
    var that = this;
    var time = 0;
    submenu = that.$el.parent().find('.submenu');
    submenu.find('.searchPage').css({
      'display': 'none'
    });
    if (submenu.hasClass('active')) {
      submenu.removeClass('active pad10');
      time = 1000;
    };
    that.$el.find('.clicked').removeClass('clicked');
    return time;
  },
  render: function(pageClass) {
    var that = this;
    var submenu = this.$el.parent().find('.submenu');
    var time = this.hidePage();
    if (this.searchView.listener) {
      google.maps.event.removeListener(this.searchView.listener);
      this.map.setOptions({
        disableDoubleClickZoom: false
      });
      if(this.$el.find('.search').hasClass('dblclicked')){
        this.searchView.busStopMarkers = this.searchView.deleteMarkers(this.searchView.busStopMarkers);
        this.$el.find('.search').removeClass('dblclicked');
      }
    };
    this.$el.find(pageClass).addClass('clicked');
    setTimeout(function() {
      submenu.addClass('active');
    }, time);
    setTimeout(function() {
      submenu.addClass('pad10')
      submenu.find('.searchPage').css({
        'display': 'block'
      });
    }, time + 1000);
  }
});
var menuView = new MenuView();