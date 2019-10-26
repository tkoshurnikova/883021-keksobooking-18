'use strict';

// form.js - валидирует отправку формы

(function () {

  var roomsNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var title = document.querySelector('#title');
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var submit = document.querySelector('.ad-form__submit');
  var form = document.querySelector('.ad-form');

  var ROOMS_AND_CAPACITY = {
    1: {
      guests: [1],
      errorText: 'Для 1 гостя',
    },
    2: {
      guests: [1, 2],
      errorText: 'Для 1 или 2 гостей',
    },
    3: {
      guests: [1, 2, 3],
      errorText: 'Для 1, 2 или 3 гостей',
    },
    100: {
      guests: [0],
      errorText: 'Не для гостей',
    },
  };

  var checkCapacity = function () {
    var roomsValue = parseInt(roomsNumber.value, 10);
    var capacityValue = parseInt(capacity.value, 10);

    if (!ROOMS_AND_CAPACITY[roomsValue].guests.includes(capacityValue)) {
      capacity.setCustomValidity(ROOMS_AND_CAPACITY[roomsValue].errorText);
    } else {
      capacity.setCustomValidity('');
    }
  };

  var checkTitle = function () {
    if (title.value.length < 30 || title.value.length > 100) {
      title.setCustomValidity('Длина заголовка от 30 до 100 символов');
    } else {
      title.setCustomValidity('');
    }
  };

  type.addEventListener('change', function () {
    price.placeholder = window.card.TYPES_AND_PRICES[type.value].price;
  });

  var checkPrice = function () {
    if (price.value > 1000000 || price.value < window.card.TYPES_AND_PRICES[type.value].price) {
      price.setCustomValidity('Пожалуйста, проверьте цену: указанное значение выше максимального или ниже минимального');
    } else {
      price.setCustomValidity('');
    }
  };

  var checkValidity = function () {
    checkCapacity();
    checkTitle();
    checkPrice();
  };

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  var removeSuccessPopup = function () {
    document.querySelector('.success').remove();
    document.removeEventListener('click', removeSuccessPopup);
    document.removeEventListener('keydown', onEscRemoveSuccessPopup);
  };

  var onEscRemoveSuccessPopup = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      removeSuccessPopup();
    }
  };

  var onSuccess = function () {
    window.map.disactivateMap();
    var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
    var successPopup = successPopupTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successPopup);
    document.addEventListener('click', removeSuccessPopup);
    document.addEventListener('keydown', onEscRemoveSuccessPopup);
  };

  submit.addEventListener('click', checkValidity);
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), onSuccess, window.load.onError);
    evt.preventDefault();
  });
})();
