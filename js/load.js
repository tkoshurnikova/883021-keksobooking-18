'use strict';

// load.js - загружает данные с сервера

(function () {

  window.load = {
    getData: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.open('GET', url);
      xhr.send();
    },

    onError: function (message) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorBlock = errorTemplate.cloneNode(true);
      errorBlock.querySelector('.error__message').textContent = message;
      document.querySelector('main').appendChild(errorBlock);
      var errorButton = errorBlock.querySelector('.error__button');
      errorButton.addEventListener('click', removeErrorPopup);
      document.addEventListener('click', removeErrorPopup);
      document.addEventListener('keydown', onEscRemoveErrorPopup);
    }
  };

  var removeErrorPopup = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('click', removeErrorPopup);
    document.removeEventListener('keydown', onEscRemoveErrorPopup);
  };

  var onEscRemoveErrorPopup = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      removeErrorPopup();
    }
  };
})();
