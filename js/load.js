'use strict';

// load.js - загружает данные с сервера

(function () {

  window.load = {
    load: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', onError);
      xhr.open('GET', url);
      xhr.send();
    },

    onError: function (message) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorBlock = errorTemplate.cloneNode(true);
      errorBlock.querySelector('.error__message').textContent = message;
      document.querySelector('main').appendChild(errorBlock);
      var errorButton = errorBlock.querySelector('.error__button');
      errorButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        document.querySelector('main').lastChild.remove();
      });
    }
  };
})();
