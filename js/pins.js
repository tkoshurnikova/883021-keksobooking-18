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
        fragment.appendChild(renderPin(window.card.renderMock()[i]));
      }
      pinsList.appendChild(fragment);
    }
  }

  var ENTER_KEYCODE = 13;
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
      var popup = window.pins.mapBlock.querySelector('.popup');
      if (popup !== null) {
        popup.remove();
      }
      document.querySelector('.map__filters-container').before(window.card.renderCard(mock));
    };

    pinElement.addEventListener('click', openCard);
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openCard();
      }
    });

    return pinElement;
  };
})();
