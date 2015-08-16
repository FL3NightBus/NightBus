/*====================Model for our comments==============*/



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
      url: 'http://localhost:8080/api/comments?name=' + this.model.get('name') + '&time=' + this.model.get('time') + '&comment=' + this.model.get('comments')+ '&icon=' +this.model.get('icon'),
      type: "POST",
      dataType: 'json',
      crossDomain: true,
      success: function(result) {
        console.log('yes');
      }
    });

    return this;

  },
  initialize: function() {

    this.render();

  }
});

/*======================== View for login form =======================*/
var UserName = Backbone.View.extend({
  el: '#username',

  inizialize: function() {
    this.username = '';
    this.icon = '';

  },
  saveData: function() {
    this.username = $('#name').val();
    var radios = $('#img').find('input');
    for (var i = 0, len = radios.length; i < len; i++) {
      if (radios[i].checked) {
        var $img = $($(radios[i]).closest('label')).find('img');
        this.icon = ($img.attr('src'));
      }
    }
    $('#commentbox').css('display', 'block');
    $('#welcome').css('display', 'block');
    $('#welcome').append('<img src="' + this.icon + '" width="100", height="100"></img><div><p>Hello <b>' + this.username + '</b></p></div>')
    $(this.$el).css('display', 'none');
  },
  events: {
    'click #okey': 'saveData'
  },
  getData: function() {
    return { name: this.username, icon: this.icon }
  }

})



/*================ View for all comments ===================*/

var CommentsView = Backbone.View.extend({

  el: '#body',

  initialize: function() {
    var that = this;
    collection.on('add', this.render, this);
    
    this.render();
    this.counter = 0;
    this.array = [];
  },

  template: _.template($('#comment-template').html()),

  render: function() {

    that = this;

    $.ajax({
      type: "GET",
      dataType: 'json',
      async: true,
      url: 'http://localhost:8080/api/comments/',
      success: function(response) {
        var arrayModel = [];
        console.log(response);

        response.forEach(function(obj) {
          arrayModel.push(obj)
        })
        arrayModel.reverse();

        if (that.counter == 0) {
          that.array = arrayModel.slice(0, 10);
          collection.reset(that.array)
        } else {
          collection.reset(arrayModel)
        }

        $(that.el).html(that.template({
          comments: collection.toJSON()
        }));
        if (arrayModel.length < 10 || that.counter != 0) {
          $(that.el).find('input').addClass('hide');
        }
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
  el: '#form',

  template: _.template($('#form-template').html()),

  render: function() {

    this.$el.append(this.template);
    return this;
  },

  initialize: function() {
    this.render();

  },

  events: {
    'click #ok': 'addContact',
  },

  addContact: function() {
    var model = new CommentModel();
    var data = username.getData();


    var comments = this.$el.find('textarea');

    //var name = data.name;

    /*if (comments.val() == '' || name.val() == '') {
      alert('form can`t be empty!')
    } else {*/

      model.set({
        name: data.name,
        comments: $(comments).val(),
        time: (new Date()).getTime(),
        icon: data.icon
      });
      var cv = new CommentView({
        model: model
      });
      (this.$el.find('form')[0]).reset();
      collection.add(model);
    }
 // },

})


var form = new FormView();



var app = new CommentsView();

var username = new UserName();

window.setInterval(function () {
    app.render();

}, 5000);   