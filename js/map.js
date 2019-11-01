'use strict';

// map.js - активирует карту и страницу

(function () {

  window.map = {
    originalPinCoords: {
      'x': window.pins.mainPin.style.left,
      'y': window.pins.mainPin.style.top
    },
    inputAddress: document.querySelector('#address'),
    inputAddressValue: (parseInt(window.pins.mainPin.style.left, 10) + window.pins.mainPin.offsetWidth / 2).toFixed() + ', ' + (parseInt(window.pins.mainPin.style.top, 10) + window.pins.mainPin.offsetHeight / 2).toFixed(),
    inputAddressActiveValue: (parseInt(window.pins.mainPin.style.left, 10) + window.pins.mainPin.offsetWidth / 2).toFixed() + ', ' + (parseInt(window.pins.mainPin.style.top, 10) + window.pins.mainPin.offsetHeight).toFixed(),
    disactivate: function () {
      window.pins.mapBlock.classList.add('map--faded');
      form.classList.add('ad-form--disabled');
      inputToggler();
      window.pins.removeList();
      setOriginalCoordsToMainPin();
      clearContent();
      window.card.close();
      window.map.inputAddress.value = window.map.inputAddressValue;
      window.pins.mainPin.addEventListener('mousedown', activateMap);
    }
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
    window.load.getData('https://js.dump.academy/keksobooking/data', window.pins.renderList, window.load.onError);
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

  var setOriginalCoordsToMainPin = function () {
    window.pins.mainPin.style.left = window.map.originalPinCoords.x;
    window.pins.mainPin.style.top = window.map.originalPinCoords.y;
  };

  var clearContent = function () {
    var inputsAndTextareas = document.querySelectorAll('.ad-form input, .ad-form textarea');
    for (var i = 0; i < inputsAndTextareas.length; i++) {
      window.form.reset();
    }
  };
})();
