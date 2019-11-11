'use strict';

// card.js - создаёт карточку объявлений

(function () {

  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.card = {
    TYPES_AND_PRICES: {
      bungalo: {
        ru: 'Бунгало',
        price: 0
      },

      flat: {
        ru: 'Квартира',
        price: 1000
      },

      house: {
        ru: 'Дом',
        price: 5000
      },

      palace: {
        ru: 'Дворец',
        price: 10000
      }
    },
    onPopupEscPress: function (evt) {
      if (evt.keyCode === window.load.ESC_KEYCODE) {
        window.card.close();
      }
    },
    render: function (offer) {
      var cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector('.popup__title').textContent = offer.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = window.card.TYPES_AND_PRICES[offer.offer.type].ru;
      cardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;

      var featuresList = cardElement.querySelectorAll('.popup__feature');
      for (var i = 0; i < FEATURES.length; i++) {
        if (offer.offer.features.indexOf(FEATURES[i]) === -1) {
          featuresList[i].style.display = 'none';
        }
      }

      cardElement.querySelector('.popup__description').textContent = offer.offer.description;

      var imgFragment = document.createDocumentFragment();
      var photoTemplate = cardElement.querySelector('.popup__photo');
      for (var j = 0; j < offer.offer.photos.length; j++) {
        var photoElement = photoTemplate.cloneNode(true);
        photoElement.src = offer.offer.photos[j];
        imgFragment.appendChild(photoElement);
      }
      cardElement.querySelector('.popup__photos').replaceChild(imgFragment, cardElement.querySelector('.popup__photo'));
      cardElement.querySelector('.popup__avatar').src = offer.author.avatar;

      var popupCloseButton = cardElement.querySelector('.popup__close');

      popupCloseButton.addEventListener('click', window.card.close);
      document.addEventListener('keydown', window.card.onPopupEscPress);

      return cardElement;
    },
    close: function () {
      var popup = document.querySelector('.map__card');
      if (popup !== null) {
        popup.remove();
      }
      document.removeEventListener('keydown', window.card.onPopupEscPress);
    }
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
})();
