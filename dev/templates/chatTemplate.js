var mainTemplate = '<div class="page chatPage">' +
                  '<div id="formChat"></div><ul id="body"></ul>' +
                  '</div>';

var formTemplate = '<form> <div id="username">' +
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
        '<input type="button" value="ок" id="okey">' +
      '</div>' +
      '<div id="welcome"></div>' +
      '<div id="commentbox">' +
        '<textarea id="comment"></textarea>' +
        '<input type="button" value="ok" id="ok">' +
      '</div>' +
    '</form>';

var commentTemplate = '<div id="chat">' +
    '<% comments.forEach(function(mod) { %>' +
    '<ul>' +
      '<div><img src ="<%= mod.icon %>"/></div>' +
      '<div><%= mod.name %></div>' +
      '<div><%= mod.comments %></div>' +
      '<div><%= mod.time %></div>' +
    '</ul>' +
    '<% }) %>' +
    '<input type="button", value="show all", id="show">' +
    '</div>';
