'use strict';

var MOCK_LENGTH = 8;
var LOCATION_X_MIN = 1;
var BLOCK_WIDTH = document.querySelector('.map').offsetWidth;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var MIN_PRICE = 100;
var MAX_PRICE = 2000;
var LIVING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var LIVING_TYPES_RU = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var ROOMS_MIN = 1;
var ROOMS_MAX = 10;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
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

var renderMock = function () {
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
};

var mockArray = renderMock();

var renderPin = function (offer) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = (offer.location.x - PIN_SIZE.width / 2) + 'px';
  pinElement.style.top = (offer.location.y - PIN_SIZE.height) + 'px';
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

var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var renderCard = function (offer) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = LIVING_TYPES_RU[LIVING_TYPES.indexOf(offer.offer.type)];
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

  return cardElement;
};

var mainPin = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var inputList = document.querySelectorAll('.ad-form input, ad-form select, .ad-form fieldset');
var ENTER_KEYCODE = 13;

var mainPinWidth = mainPin.offsetWidth;
var mainPinHeight = mainPin.offsetHeight;
var inputAddress = document.querySelector('#address');
var inputAddressValue = (parseInt(mainPin.style.left, 10) + mainPinWidth / 2).toFixed() + ', ' + (parseInt(mainPin.style.top, 10) + mainPinHeight / 2).toFixed();
var inputAddressActiveValue = (parseInt(mainPin.style.left, 10) + mainPinWidth / 2).toFixed() + ', ' + (parseInt(mainPin.style.top, 10) + mainPinHeight).toFixed();

inputAddress.value = inputAddressValue;

var inputToggler = function () {
  for (var i = 0; i < inputList.length; i++) {
    inputList[i].disabled = !inputList[i].disabled;
  }
};

inputToggler();

var activateMap = function () {
  mapBlock.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  inputToggler();
  renderPinsList(mockArray);
  document.querySelector('.map__filters-container').before(renderCard(mockArray[0]));
  inputAddress.value = inputAddressActiveValue;
};

mainPin.addEventListener('mousedown', function () {
  activateMap();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
  }
});
