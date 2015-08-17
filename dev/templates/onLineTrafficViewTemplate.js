var onLineTrafficViewTemplate = '<div class="page onLineTrafficPage">' +
        '<form action="#" id="form">' +
          '<input class="busInput" type="checkbox" id="1">' +
          '<input class="busInput" type="checkbox" id="2">' +
          '<input class="busInput" type="checkbox" id="3">' +
          '<input class="busInput" type="checkbox" id="4">' +
          '<input class="busInput" type="checkbox" id="5">' +
          '<input class="busInput" type="checkbox" id="6">' +
          '<input class="busInput" type="checkbox" id="7">' +
        '</form>' +
        '<div id="polylines">' +
          '<div id="sp">' +
            '<span class="routeSpan">1H</span>' +
            '<span class="routeSpan">2H</span>' +
            '<span class="routeSpan">3H</span>' +
            '<span class="routeSpan">4H</span>' +
            '<span class="routeSpan">5H</span>' +
            '<span class="routeSpan">6H</span>' +
            '<span class="routeSpan">7H</span><br>' +
          '</div>' +
          '<div id="pi">' +
            '<input class="polylineInput" id="1H" type="checkbox">' +
            '<input class="polylineInput" id="2H" type="checkbox">' +
            '<input class="polylineInput" id="3H" type="checkbox">' +
            '<input class="polylineInput" id="4H" type="checkbox">' +
            '<input class="polylineInput" id="5H" type="checkbox">' +
            '<input class="polylineInput" id="6H" type="checkbox">' +
            '<input class="polylineInput" id="7H" type="checkbox"><br>' +
          '</div>' +
        '</div>' +
        '<div id="ftr">Введи інтервал оновлення позиції автобуса (в секундах)' +
        '<input type="number" placeholder="5" id="interval" min="5" max="30" step="5">' +
        '<button id="location">Were I am?</button>' +
        '</div>' +
        '<div id="busInfo"></div>' +
      '</div>';

var busInfoTemplate = '<span id="closeInfo">x</span>' +
      '<p><%= obj.route%></p>' +
      '<p><%= obj.way %></p>' +
      '<p>Ціна: <%= obj.price %></p>' +
      '<p>Інтервал руху: <%= obj.interval %></p>' +
      '<p>Час: <%= obj.time %></p>' +
      '<p>Прямий маршрут: <%= obj.sw %></p>' +
      '<p>Зворотній маршрут: <%= obj.bw %></p>';