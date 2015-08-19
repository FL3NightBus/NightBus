var mainTemplate = '<div class="page chatPage">' +
                  '<div id="formChat"></div><ul id="body"></ul>' +
                  '</div>';

var formTemplate = '<div id="username">' +
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
        '<input type="button" value="ок" id="okey" class="btn">' +
      '</div>' +
      '<div id="commentbox">' +
        '<textarea id="comment" maxlength="100"></textarea>' +
        '<input type="button" value="ok" id="ok" class="btn">' +
      '</div>';

var commentTemplate = '<div id="chat">' +
    '<% comments.forEach(function(mod) { %>' +
    '<div class="msg">' +
       '<div class="leftcont">' +
          '<div><img src ="<%= mod.icon %>"/></div>' +
          '<div><%= mod.name %></div>' +
       '</div>' +
       '<div class = "rightcont">' +
         '<div><%= mod.comments %></div>' +
         '<div class="time"><%= mod.time %></div>' +
        '</div>' +
    '</div>' +
    '<% }) %>' +
    '<input type="button", value="попередні", id="show" class="btn">' +
    '</div>';
