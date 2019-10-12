'use strict';

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
var DESCRIPTION = 'описание';
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var mapBlock = document.querySelector('.map');
var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var PIN_SIZE = {
  'height': 70,
  'width': 50
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElement = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

var renderAvatar = function (i) {
  var avatar = 'img/avatars/user' + '0' + (i + 1) + '.png';
  return avatar;
};

var renderTitle = function (i) {
  var title = 'Предложение ' + (i + 1);
  return title;
};

var getLocation = function () {
  var location = {};
  location.x = getRandomNumber(LOCATION_X_MIN, BLOCK_WIDTH);
  location.y = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
  return location;
};

var getRandomArray = function (arr) {
  var randomArray = [];
  var randomLength = getRandomNumber(1, arr.length);
  for (var i = 0; i < randomLength; i++) {
    var element = arr[getRandomNumber(0, arr.length - 1)];
    randomArray.push(element);
  }
  return randomArray;
};

var renderMock = function () {
  var mock = [];
  for (var i = 0; i <= MOCK_LENGTH - 1; i++) {
    var mockElement = {
      'author': {
        'avatar': renderAvatar(i)
      },

      'offer': {
        'title': renderTitle(i),
        'address': getLocation().x + ', ' + getLocation().y,
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': getRandomElement(LIVING_TYPES),
        'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        'checkin': getRandomElement(CHECKIN_TIME),
        'checkout': getRandomElement(CHECKOUT_TIME),
        'features': getRandomArray(FEATURES),
        'description': DESCRIPTION,
        'photos': getRandomArray(PHOTOS)
      },

      'location': {
        'x': getLocation().x,
        'y': getLocation().y
      }
    };
    mock.push(mockElement);
  }
  return mock;
};

var mockArray = renderMock();

mapBlock.classList.remove('map--faded');

var renderPin = function (offer) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = (offer.location.x + PIN_SIZE.width / 2) + 'px';
  pinElement.style.top = (offer.location.y + PIN_SIZE.height) + 'px';
  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.querySelector('img').alt = offer.offer.title;
  return pinElement;
};

var renderPinsList = function (mock) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < mock.length; i++) {
    fragment.appendChild(renderPin(mockArray[i]));
  }
  pinsList.appendChild(fragment);
};

renderPinsList(mockArray);
