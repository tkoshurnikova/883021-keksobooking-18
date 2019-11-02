'use strict';

// filter.js - фильтрация объявлений

(function () {

  var offers = [];
  var housingType = document.querySelector('#housing-type');

  window.filter = function (data) {
    offers = data;
    window.pins.renderList(offers.slice(0, 5));

    housingType.addEventListener('change', function () {
      var sameHousingType = offers.filter(function (it) {
        return it.offer.type === housingType.value;
      });
      window.pins.removeList();
      window.pins.renderList(sameHousingType.slice(0, 5));
    });
  };
})();
