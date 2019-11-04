'use strict';

// filter.js - фильтрация объявлений

(function () {

  var offers = [];
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = Array.prototype.slice.call(document.querySelectorAll('.map__checkbox'));

  window.filter = function (data) {
    offers = data;
    updatePinsList();
  };

  var updatePinsList = function () {
    window.pins.renderList(offers.slice(0, 5));
    var filteredPins = offers;

    var sameHousingType = filteredPins.filter(function (it) {
      if (housingType.value !== 'any') {
        return it.offer.type === housingType.value;
      } else {
        return it;
      }
    });

    filteredPins = sameHousingType;

    var sameHousingPrice = filteredPins.filter(function (it) {
      if (housingPrice.value !== 'any') {
        if (housingPrice.value === 'low') {
          return it.offer.price < 10000;
        } else if (housingPrice.value === 'middle') {
          return (it.offer.price >= 10000 && it.offer.price <= 50000);
        } else {
          return it.offer.price > 50000;
        }
      } else {
        return it;
      }
    });

    filteredPins = sameHousingPrice;

    var sameHousingRooms = filteredPins.filter(function (it) {
      if (housingRooms.value !== 'any') {
        return it.offer.rooms === parseInt(housingRooms.value, 10);
      } else {
        return it;
      }
    });

    filteredPins = sameHousingRooms;

    var sameHousingGuests = filteredPins.filter(function (it) {
      if (housingGuests.value !== 'any') {
        return it.offer.guests === parseInt(housingGuests.value, 10);
      } else {
        return it;
      }
    });

    filteredPins = sameHousingGuests;

    for (var i = 0; i < housingFeatures.length; i++) {
      var sameFeature = filteredPins.filter(function (it) {
        if (housingFeatures[i].checked) {
          return it.offer.features.indexOf(housingFeatures[i].value) > -1;
        } else {
          return filteredPins;
        }
      });
      filteredPins = sameFeature;
    }

    window.pins.removeList();
    window.pins.renderList(filteredPins.slice(0, 5));
  };

  housingType.addEventListener('change', window.debounce(updatePinsList));
  housingPrice.addEventListener('change', window.debounce(updatePinsList));
  housingRooms.addEventListener('change', window.debounce(updatePinsList));
  housingGuests.addEventListener('change', window.debounce(updatePinsList));
  for (var i = 0; i < housingFeatures.length; i++) {
    housingFeatures[i].addEventListener('change', window.debounce(updatePinsList));
  }
})();
