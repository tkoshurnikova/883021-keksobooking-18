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

  window.filter = {
    set: function (data) {
      offers = data;
      updatePinsList();
    },
    reset: function () {
      housingType.value = 'any';
      housingPrice.value = 'any';
      housingRooms.value = 'any';
      housingGuests.value = 'any';
      housingFeaturesFieldset.querySelectorAll('input:checked').forEach(function (element) {
        element.checked = false;
      });
    }
  };

  var sameHousingTypeCheck = function (item) {
    if (housingType.value !== 'any') {
      return item.offer.type === housingType.value;
    }
    return item;
  };

  var sameHousingPriceCheck = function (item) {
    if (housingPrice.value !== 'any') {
      if (housingPrice.value === 'low') {
        return item.offer.price < 10000;
      } else if (housingPrice.value === 'middle') {
        return (item.offer.price >= 10000 && item.offer.price <= 50000);
      } else {
        return item.offer.price > 50000;
      }
    }
    return item;
  };

  var sameHousingRoomsCheck = function (item) {
    if (housingRooms.value !== 'any') {
      return item.offer.rooms === parseInt(housingRooms.value, 10);
    }
    return item;
  };

  var sameHousingGuestsCheck = function (item) {
    if (housingGuests.value !== 'any') {
      return item.offer.guests === parseInt(housingGuests.value, 10);
    }
    return item;
  };

  var sameFeatureCheck = function (item) {
    var checkedFeatures = housingFeaturesFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var updatePinsList = function () {
    var filteredPins = offers.filter(function (item) {
      return sameHousingTypeCheck(item) && sameHousingPriceCheck(item) && sameHousingRoomsCheck(item) && sameHousingGuestsCheck(item) && sameFeatureCheck(item);
    });

    window.pins.removeList();
    window.card.close();
    window.pins.renderList(filteredPins.slice(0, PINS_QUANTITY));
  };

  mapFiltersForm.addEventListener('change', window.debounce(updatePinsList));
})();
