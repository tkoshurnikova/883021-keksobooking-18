'use strict';

// pins.js - создаёт список меток на карте

(function () {

  window.pins = {
    inputList: document.querySelectorAll('.ad-form input, ad-form select, .ad-form fieldset'),
    mainPin: document.querySelector('.map__pin--main'),
    mapBlock: document.querySelector('.map'),

    renderPinsList: function (mock) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < mock.length; i++) {
        fragment.appendChild(renderPin(mock[i]));
      }
      pinsList.appendChild(fragment);
    },
    removePinsList: function () {
      var pins = document.querySelectorAll('.map__pin');
      for (var i = 0; i < pins.length; i++) {
        pinsList.removeChild(pins[i]);
      }
      pinsList.appendChild(window.pins.mainPin);
    }
  };

  var pinsList = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var PIN_SIZE = {
    'height': 70,
    'width': 50
  };

  var renderPin = function (mock) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = (mock.location.x - PIN_SIZE.width / 2) + 'px';
    pinElement.style.top = (mock.location.y - PIN_SIZE.height) + 'px';
    pinElement.querySelector('img').src = mock.author.avatar;
    pinElement.querySelector('img').alt = mock.offer.title;

    var openCard = function () {
      window.card.closeCard();
      document.querySelector('.map__filters-container').before(window.card.renderCard(mock));
    };

    pinElement.addEventListener('click', openCard);
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ENTER_KEYCODE) {
        openCard();
      }
    });

    return pinElement;
  };
})();
