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