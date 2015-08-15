var MenuView = Backbone.View.extend({
  el: $('#nav'),
  events: {
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
  createSearch: function() {
    var that = this;
    if (!this.searchView) {
      this.searchView = new SearchView();
    };
    if (!this.$el.find('.search').hasClass('clicked')) {
      that.render('.search');
    };
  },
  createChat: function() {
    if (!this.searchView) {
      this.searchView = new SearchView();
    };
    if (!this.$el.find('.chat').hasClass('clicked')) {
      this.render('.chat');
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
    setTimeout(function() {
      submenu.addClass('active');
    }, time);
    setTimeout(function() {
      submenu.addClass('pad10')
      submenu.find('.searchPage').css({
        'display': 'block'
      });
    }, time + 2000);
  }
});
var menuView = new MenuView();