var onLineTrafficViewTemplate = '<div class="page onLineTrafficPage">' +
        '<div id="form">' +
          '<p class="header">Вони їздять</p>' +
          '<input class="busInput" type="checkbox" id="1">' +
          '<input class="busInput" type="checkbox" id="2">' +
          '<input class="busInput" type="checkbox" id="3">' +
          '<input class="busInput" type="checkbox" id="4">' +
          '<input class="busInput" type="checkbox" id="5">' +
          '<input class="busInput" type="checkbox" id="6">' +
          '<input class="busInput" type="checkbox" id="7">' +
        '</div>' +
        '<div id="polylines">' +
          '<div id="sp">' +
            '<p class="header">маршрутами</p>' +
            '<span class="routeSpan">1H</span>' +
            '<span class="routeSpan">2H</span>' +
            '<span class="routeSpan">3H</span>' +
            '<span class="routeSpan">4H</span>' +
            '<span class="routeSpan">5H</span>' +
            '<span class="routeSpan">6H</span>' +
            '<span class="routeSpan">7H</span><br>' +
          '</div>' +
          '<div id="pi">' +
            '<p class="header">ось цими</p>' +
            '<input class="polylineInput" id="1H" type="checkbox">' +
            '<input class="polylineInput" id="2H" type="checkbox">' +
            '<input class="polylineInput" id="3H" type="checkbox">' +
            '<input class="polylineInput" id="4H" type="checkbox">' +
            '<input class="polylineInput" id="5H" type="checkbox">' +
            '<input class="polylineInput" id="6H" type="checkbox">' +
            '<input class="polylineInput" id="7H" type="checkbox"><br>' +
          '</div>' +
        '</div>' +
        '<div id="ftr">Як часто показувати автобуси ?' +
            '<input type="number" placeholder="5 сек" id="interval" min="5" max="30" step="5">' +
        '</div>' +
        '<div id="busInfo"></div>' +
      '</div>';

var busInfoTemplate = '<div id="#busInfo">' +
   '<span id="closeInfo">X</span>' +
      '<p><%= obj.route%></p>' +
      '<p><%= obj.way %></p>' +
      '<p>Ціна: <%= obj.price %></p>' +
      '<p>Інтервал руху: <%= obj.interval %></p>' +
      '<p>Час: <%= obj.time %></p>' +
      '<p>Прямий маршрут: <%= obj.sw %></p>' +
      '<p>Зворотній маршрут: <%= obj.bw %></p>' +
    '</div>';