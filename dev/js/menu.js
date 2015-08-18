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
          content: 'You are here'
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
    this.yourPosition.lat = coords.G;
    this.yourPosition.lng = coords.K;
    console.log(this.yourPosition);
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