'use strict';

// photos.js - загружает фото в форму

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var livingPhotoChooser = document.querySelector('.ad-form__input');

  window.photos = {
    livingPhotoPreviewBlock: document.querySelector('.ad-form__photo'),
    avatarPreview: document.querySelector('.ad-form-header__preview img')
  };

  var uploadPhoto = function (photoChooser, preview) {
    var file = photoChooser.files[0];
    var fileName = file.name.toLowerCase();
    if (file) {
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  var createPhoto = function (preview) {
    var image = document.createElement('img');
    image.width = preview.offsetWidth;
    image.height = preview.offsetHeight;
    image.src = 'img/muffin-grey.svg';
    preview.appendChild(image);
  };

  createPhoto(window.photos.livingPhotoPreviewBlock);

  avatarChooser.addEventListener('change', function () {
    uploadPhoto(avatarChooser, window.photos.avatarPreview);
  });

  livingPhotoChooser.addEventListener('change', function () {
    uploadPhoto(livingPhotoChooser, window.photos.livingPhotoPreviewBlock.querySelector('img'));
  });
})();
