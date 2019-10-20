'use strict';

// card.js - создаёт карточку объявлений

(function () {

  window.card = {
    renderMock: function () {
      var mock = [];
      for (var i = 0; i <= MOCK_LENGTH - 1; i++) {
        var location = getLocation();
        var mockElement = {
          'author': {
            'avatar': renderAvatar(i)
          },

          'offer': {
            'title': renderTitle(i),
            'address': location.x + ', ' + location.y,
            'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
            'type': getRandomElement(LIVING_TYPES),
            'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
            'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
            'checkin': getRandomElement(CHECKIN_TIME),
            'checkout': getRandomElement(CHECKOUT_TIME),
            'features': getRandomArray(FEATURES),
            'description': renderDescription(i),
            'photos': getRandomArray(PHOTOS)
          },

          'location': {
            'x': location.x,
            'y': location.y
          }
        };
        mock.push(mockElement);
      }
      return mock;
    },
    renderCard: function (offer) {
      var cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector('.popup__title').textContent = offer.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = window.card.TYPES_AND_PRICES[offer.offer.type].ru;;
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
      for (var j = 0; j < offer.offer.photos.length; j++) {
        var photoElement = cardElement.querySelector('.popup__photo').cloneNode(true);
        photoElement.src = offer.offer.photos[j];
        imgFragment.appendChild(photoElement);
      }
      cardElement.querySelector('.popup__photos').replaceChild(imgFragment, cardElement.querySelector('.popup__photo'));
      cardElement.querySelector('.popup__avatar').src = offer.author.avatar;

      var popupCloseButton = cardElement.querySelector('.popup__close');
      var removeCard = function () {
        cardElement.remove(true);
      };
        var onPopupEscPress = function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          removeCard();
        }
      };
      popupCloseButton.addEventListener('click', removeCard);
      document.addEventListener('keydown', onPopupEscPress);

      return cardElement;
    },
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
    }
  }

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var MOCK_LENGTH = 8;
  var LOCATION_X_MIN = 1;
  var BLOCK_WIDTH = document.querySelector('.map').offsetWidth;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var MIN_PRICE = 100;
  var MAX_PRICE = 2000;
  var LIVING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 10;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomElement = function (arr) {
    return arr[getRandomNumber(0, arr.length)];
  };

  var renderAvatar = function (i) {
    var avatar = 'img/avatars/user' + '0' + (i + 1) + '.png';
    return avatar;
  };

  var renderTitle = function (i) {
    var title = 'Предложение ' + (i + 1);
    return title;
  };

  var renderDescription = function (i) {
    var description = 'Описание ' + (i + 1);
    return description;
  };

  var getLocation = function () {
    var location = {};
    location.x = getRandomNumber(LOCATION_X_MIN, BLOCK_WIDTH);
    location.y = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
    return location;
  };

  var getRandomArray = function (arr) {
    var randomArray = [];
    var randomLength = getRandomNumber(1, arr.length + 1);
    for (var i = 0; i < randomLength; i++) {
      var element = arr[getRandomNumber(0, arr.length)];
      randomArray.push(element);
    }
    return randomArray;
  };
})();
