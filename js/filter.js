'use strict';

// filter.js - фильтрация объявлений

(function () {

  var PINS_QUANTITY = 5;
  var offers = [];
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeaturesFieldset = document.querySelector('#housing-features');

  window.filter = function (data) {
    offers = data;
    updatePinsList();
  };

  var sameHousingTypeCheck = function (it) {
    if (housingType.value !== 'any') {
      return it.offer.type === housingType.value;
    } else {
      return it;
    }
  };

  var sameHousingPriceCheck = function (it) {
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
  };

  var sameHousingRoomsCheck = function (it) {
    if (housingRooms.value !== 'any') {
      return it.offer.rooms === parseInt(housingRooms.value, 10);
    } else {
      return it;
    }
  };

  var sameHousingGuestsCheck = function (it) {
    if (housingGuests.value !== 'any') {
      return it.offer.guests === parseInt(housingGuests.value, 10);
    } else {
      return it;
    }
  };

  var sameFeatureCheck = function (it) {
    var checkedFeatures = housingFeaturesFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).every(function (item) {
      return it.offer.features.includes(item.value);
    });
  };

  var updatePinsList = function () {
    var filteredPins = offers.filter(function (it) {
      return sameHousingTypeCheck(it) && sameHousingPriceCheck(it) && sameHousingRoomsCheck(it) && sameHousingGuestsCheck(it) && sameFeatureCheck(it);
    });

    window.pins.removeList();
    window.card.close();
    window.pins.renderList(filteredPins.slice(0, PINS_QUANTITY));
  };

  mapFiltersForm.addEventListener('change', window.debounce(updatePinsList));
})();
