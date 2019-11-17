'use strict';

// map.js - активирует карту и страницу

(function () {

  window.map = {
    originalPinCoords: {
      'x': window.pins.mainPin.style.left,
      'y': window.pins.mainPin.style.top
    },
    inputAddress: document.querySelector('#address'),
    inputAddressValue: Math.floor(parseInt(window.pins.mainPin.style.left, 10) + (window.pins.mainPin.offsetWidth / 2)) + ', ' + (parseInt(window.pins.mainPin.style.top, 10) + window.pins.mainPin.offsetHeight / 2).toFixed(),
    inputAddressActiveValue: Math.floor(parseInt(window.pins.mainPin.style.left, 10) + (window.pins.mainPin.offsetWidth / 2)) + ', ' + (parseInt(window.pins.mainPin.style.top, 10) + window.pins.mainPin.offsetHeight).toFixed(),
    disactivate: function () {
      window.pins.mapBlock.classList.add('map--faded');
      form.classList.add('ad-form--disabled');
      toggleInput();
      window.pins.removeList();
      setOriginalCoordsToMainPin();
      clearContent();
      window.card.close();
      window.map.inputAddress.value = window.map.inputAddressValue;
      window.pins.mainPin.addEventListener('mousedown', activateMap);
      window.filter.reset();
      window.photos.avatarPreview.src = 'img/muffin-grey.svg';
      window.photos.livingPhotoPreviewBlock.querySelector('img').src = 'img/muffin-grey.svg';
    }
  };

  var form = document.querySelector('.ad-form');

  var toggleInput = function () {
    for (var i = 0; i < window.pins.inputList.length; i++) {
      window.pins.inputList[i].disabled = !window.pins.inputList[i].disabled;
    }
  };

  var activateMap = function () {
    window.pins.mapBlock.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    toggleInput();
    window.load.getData('https://js.dump.academy/keksobooking/data', window.filter.set, window.load.onError);
    window.map.inputAddress.value = window.map.inputAddressActiveValue;
    window.pins.mainPin.removeEventListener('mousedown', activateMap);
  };

  toggleInput();
  window.map.inputAddress.value = window.map.inputAddressValue;

  window.pins.mainPin.addEventListener('mousedown', activateMap);
  window.pins.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.load.ENTER_KEYCODE) {
      activateMap();
    }
  });

  var setOriginalCoordsToMainPin = function () {
    window.pins.mainPin.style.left = window.map.originalPinCoords.x;
    window.pins.mainPin.style.top = window.map.originalPinCoords.y;
  };

  var clearContent = function () {
    window.form.reset();
  };
})();
