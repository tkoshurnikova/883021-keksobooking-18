'use strict';

// pin-move.js - двигает метку на карте

(function () {

  var MOVE_LIMITS = {
    minX: 0,
    maxX: document.querySelector('.map').offsetWidth,
    minY: 130,
    maxY: 630
  };

  window.pins.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((window.pins.mainPin.offsetLeft - shift.x) < (MOVE_LIMITS.minX - window.pins.mainPin.offsetWidth / 2)) {
        window.pins.mainPin.style.left = (MOVE_LIMITS.minX - window.pins.mainPin.offsetWidth / 2) + 'px';
      } else if ((window.pins.mainPin.offsetLeft - shift.x) > (MOVE_LIMITS.maxX - window.pins.mainPin.offsetWidth / 2)) {
        window.pins.mainPin.style.left = (MOVE_LIMITS.maxX - window.pins.mainPin.offsetWidth / 2) + 'px';
      } else {
        window.pins.mainPin.style.left = (window.pins.mainPin.offsetLeft - shift.x) + 'px';
      }

      if ((window.pins.mainPin.offsetTop - shift.y) < (MOVE_LIMITS.minY - window.pins.mainPin.offsetHeight)) {
        window.pins.mainPin.style.top = MOVE_LIMITS.minY - window.pins.mainPin.offsetHeight + 'px';
      } else if ((window.pins.mainPin.offsetTop - shift.y) >= (MOVE_LIMITS.maxY - window.pins.mainPin.offsetHeight)) {
        window.pins.mainPin.style.top = MOVE_LIMITS.maxY - window.pins.mainPin.offsetHeight + 'px';
      } else {
        window.pins.mainPin.style.top = (window.pins.mainPin.offsetTop - shift.y) + 'px';
      }
      window.map.inputAddress.value = Math.floor(parseInt(window.pins.mainPin.style.left, 10) + window.pins.mainPin.offsetWidth / 2) + ', ' + (parseInt(window.pins.mainPin.style.top, 10) + window.pins.mainPin.offsetHeight);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
