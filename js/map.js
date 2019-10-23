'use strict';

// map.js - активирует карту и страницу

(function () {

  window.map = {
    inputAddress: document.querySelector('#address'),
    inputAddressValue: (parseInt(window.pins.mainPin.style.left, 10) + window.pins.mainPin.offsetWidth / 2).toFixed() + ', ' + (parseInt(window.pins.mainPin.style.top, 10) + window.pins.mainPin.offsetHeight / 2).toFixed(),
    inputAddressActiveValue: (parseInt(window.pins.mainPin.style.left, 10) + window.pins.mainPin.offsetWidth / 2).toFixed() + ', ' + (parseInt(window.pins.mainPin.style.top, 10) + window.pins.mainPin.offsetHeight).toFixed()
  };

  var form = document.querySelector('.ad-form');

  var inputToggler = function () {
    for (var i = 0; i < window.pins.inputList.length; i++) {
      window.pins.inputList[i].disabled = !window.pins.inputList[i].disabled;
    }
  };

  var activateMap = function () {
    window.pins.mapBlock.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    inputToggler();
    window.pins.renderPinsList(window.data.renderMock());
    document.querySelector('.map__filters-container').before(window.card.renderCard(window.data.renderMock()[0]));
    window.map.inputAddress.value = window.map.inputAddressActiveValue;
    window.pins.mainPin.removeEventListener('mousedown', activateMap);
  };

  inputToggler();
  window.map.inputAddress.value = window.map.inputAddressValue;

  window.pins.mainPin.addEventListener('mousedown', activateMap);
  window.pins.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      activateMap();
    }
  });
})();
