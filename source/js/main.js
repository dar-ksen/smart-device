'use strict';
(function () {
  var ESC_CODE = 27;
  // работа с формой
  var body = document.querySelector('body');
  var openModalBtn = document.querySelector('.header__contact-btn');
  var modal = document.querySelector('.modal');
  var userName = modal.querySelector('#user-name-modal');
  var userPhone = modal.querySelector('#user-phone-modal');
  var userMessage = modal.querySelector('#user-message-modal');
  var closeModalBtn = modal.querySelector('.modal__close');
  var overlay = document.querySelector('.overlay');

  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';
  var storageMessage = '';

  try {
    storageName = localStorage.getItem('name');
    storagePhone = localStorage.getItem('phone');
    storageMessage = localStorage.getItem('question');
  } catch (err) {
    isStorageSupport = false;
  }

  var openModal = function () {
    modal.classList.add('modal--show');
    body.classList.add('modal--open');
    overlay.classList.add('overlay--show');

    if (storageName) {
      userName.value = storageName;
    }
    if (storagePhone) {
      userPhone.value = storagePhone;
    }
    if (storageMessage) {
      userMessage.value = storageMessage;
    }
    userName.focus();

    overlay.addEventListener('click', onCloseModalHandler);
    document.addEventListener('keydown', onEscKeyPressHandler);
    closeModalBtn.addEventListener('click', onCloseModalHandler);
  };

  var submitFormPopup = function () {
    if (isStorageSupport) {
      localStorage.setItem('name', userName.value);
      localStorage.setItem('phone', userPhone.value);
      localStorage.setItem('question', userMessage.value);
    }
  };

  var closeModal = function () {
    modal.classList.remove('modal--show');
    body.classList.remove('modal--open');
    overlay.classList.remove('overlay--show');
    closeModalBtn.removeEventListener('click', onCloseModalHandler);
    document.removeEventListener('keydown', onEscKeyPressHandler);
  };

  var onCloseModalHandler = function () {
    closeModal();
  };

  var onEscKeyPressHandler = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      closeModal();
    }
  };

  if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      openModal();
    });
    modal.addEventListener('submit', submitFormPopup);

  }

  // Работа с аккордионом
  var navAcordion = document.querySelector('.nav');
  var contactsAcordion = document.querySelector('.contacts');

  if (navAcordion && contactsAcordion) {
    navAcordion.classList.remove('acordion--nojs');
    contactsAcordion.classList.remove('acordion--nojs');

    navAcordion.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('acordion__toggle')) {
        navAcordion.classList.toggle('acordion--close');
        contactsAcordion.classList.add('acordion--close');
      }
    });

    contactsAcordion.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('acordion__toggle')) {
        contactsAcordion.classList.toggle('acordion--close');
        navAcordion.classList.add('acordion--close');
      }
    });

  }

  // Маска на телефоне
  var feedbackPhonePlace = document.querySelector('.feedback input[type="tel"]');
  var modalPhonePlace = document.querySelector('.modal input[type="tel"]');
  var maskOptions = {mask: '+{7}(000)000-00-00'};

  if (feedbackPhonePlace) {
    IMask(feedbackPhonePlace, maskOptions);
  }

  if (modalPhonePlace) {
    IMask(modalPhonePlace, maskOptions);
  }
})();
