'use strict';

// map.js - активирует карту и страницу

(function () {

  var form = document.querySelector('.ad-form');
  var mainPinWidth = window.pins.mainPin.offsetWidth;
  var mainPinHeight = window.pins.mainPin.offsetHeight;
  var inputAddress = document.querySelector('#address');
  var inputAddressValue = (parseInt(window.pins.mainPin.style.left, 10) + mainPinWidth / 2).toFixed() + ', ' + (parseInt(window.pins.mainPin.style.top, 10) + mainPinHeight / 2).toFixed();
  var inputAddressActiveValue = (parseInt(window.pins.mainPin.style.left, 10) + mainPinWidth / 2).toFixed() + ', ' + (parseInt(window.pins.mainPin.style.top, 10) + mainPinHeight).toFixed();

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
    inputAddress.value = inputAddressActiveValue;
    window.pins.mainPin.removeEventListener('mousedown', activateMap);
  };

  inputToggler();
  inputAddress.value = inputAddressValue;

  window.pins.mainPin.addEventListener('mousedown', activateMap);
  window.pins.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      activateMap();
    }
  });
})();
