/*==== View of map ===*/
var MapView = Backbone.View.extend({
  id: 'map-canvas',

  initialize: function() {
    var mapOptions = {
      center: {
        lat: 49.80485402,
        lng: 23.98729831
      },
      zoom: 12
    };

    this.map = new google.maps.Map(this.el, mapOptions);

    var polyOptions = {
      strokeOpacity: 0.7,
      strokeWeight: 5
    };


    this.poliArray = {
      '1Н': new google.maps.Polyline(polyOptions),
      '2Н': new google.maps.Polyline(polyOptions),
      '3Н': new google.maps.Polyline(polyOptions),
      '4Н': new google.maps.Polyline(polyOptions),
      '5Н': new google.maps.Polyline(polyOptions),
      '6Н': new google.maps.Polyline(polyOptions),
      '7Н': new google.maps.Polyline(polyOptions)
    };

    this.render();
  },

  render: function() {
    $('#map-canvas').replaceWith(this.el);
  },

  getMap: function() {
    return this.map;
  },

  getPoliArray: function() {
    return this.poliArray;
  }

});

mapView = new MapView();


/*========== View of Cheakboxes ==========*/

var PoliView = Backbone.View.extend({

  el: '#polylines',

  initialize: function() {

    this.response = [];
    this.setResponse();
    this.poliarr = mapView.getPoliArray();
  },


  setResponse: function() {

    var that = this;
    $.ajax({
      type: "GET",
      async: true,
      dataType: 'json',
      url: 'http://localhost:8080/api/routes/',


      success: function(resp) {
        that.response = resp;
        console.log(this.response)
      },
      error: function(err) {
        console.log(err);
      }
    })
  },

  getResponse: function() {
    console.log('getresp: ' + this.response)
    return this.response;
  },


  getPoli: function(waynumber) {

    var coords = [];

    switch (waynumber) {
      case '1H':
        {
          coords = this.getCoords(5);
          this.poliarr[waynumber].setOptions({
            strokeColor: '#1976D2',
            path: coords
          });
          break;
        }

      case '2H':
        {
          coords = this.getCoords(6);
          this.poliarr[waynumber].setOptions({
            strokeColor: '#009688',
            path: coords
          });
          break;
        }

      case '3H':
        {
          coords = this.getCoords(0);
          this.poliarr[waynumber].setOptions({
            strokeColor: '#303F9F',
            path: coords
          });
          break;
        }

      case '4H':
        {
          coords = this.getCoords(1);
          this.poliarr[waynumber].setOptions({
            strokeColor: '#FF5722',
            path: coords
          });
          break;
        }

      case '5H':
        {
          coords = this.getCoords(2);
          this.poliarr[waynumber].setOptions({
            strokeColor: '#FFC107',
            path: coords
          });
          break;
        }

      case '6H':
        {
          coords = this.getCoords(4);
          this.poliarr[waynumber].setOptions({
            strokeColor: '#C2185B',
            path: coords
          });
          break;
        }

      case '7H':
        {
          coords = this.getCoords(3);
          this.poliarr[waynumber].setOptions({
            strokeColor: '#4CAF50',
            path: coords
          });
          break;
        }
    }
  },

  getCoords: function(number) {

    var res = this.getResponse();
    console.log(res)
    var templ = res[number].routeArray;
    return templ.map(function(el) {
      return (new google.maps.LatLng(el.lat, el.lng));
    })

  },

  events: {
    'click input:checkbox': 'passPoliline'
  },

  drawPoliline: function(name) {
    var map = mapView.getMap();
    var that = this;
    $.when(that.getPoli(name)).then(function() {
      that.poliarr[name].setMap(map);
    })
  },

  hidePoliline: function(name) {
    var map = mapView.getMap();
    var that = this;
    $.when(that.getPoli(name)).then(function() {
      that.poliarr[name].setMap(null);
    })
  },

  passPoliline: function(e) {
    var $checkbox = $(e.currentTarget);
    var that = this;
    var map = mapView.getMap();
    waynumber = ($checkbox).attr('id');

    if ($checkbox.is(':checked')) {
      this.drawPoliline(waynumber);
    } else {
      this.hidePoliline(waynumber);
    }
  }

})


var polyline = new PoliView();