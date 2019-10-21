'use strict';

// data.js - создаёт моки

(function () {

  window.data = {
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
            'features': getRandomArray(window.data.FEATURES),
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
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  };

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
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomElement = function (arr) {
    return arr[getRandomNumber(0, arr.length)];
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

  var getLocation = function () {
    var location = {};
    location.x = getRandomNumber(LOCATION_X_MIN, BLOCK_WIDTH);
    location.y = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
    return location;
  };

  var renderDescription = function (i) {
    var description = 'Описание ' + (i + 1);
    return description;
  };

  var renderAvatar = function (i) {
    var avatar = 'img/avatars/user' + '0' + (i + 1) + '.png';
    return avatar;
  };

  var renderTitle = function (i) {
    var title = 'Предложение ' + (i + 1);
    return title;
  };
})();
