'use strict';

// Глобальный метод инициализации карты
window.googleMapInit = function () {
  // Контейнер карты
  var mapContainer = document.querySelector('.map__wrapper');
  // Центр вьюпорта карты
  var mapCenter = {lat: 59.939273, lng: 30.329410};
  // Координаты маркера магазина
  var gllaicyShop = {lat: 59.938594, lng: 30.323083};
  var map;
  var marker;

  // Создание кастомного маркера
  var setMarkers = function () {
    var image = {
      // Адрес иконки маркера
      url: './img/map-pin.svg',
      // Размеры маркера
      size: new google.maps.Size(80, 140),
      origin: new google.maps.Point(0, 0),
      // Точка привязки маркера
      anchor: new google.maps.Point(40, 140),
      scaledSize: new google.maps.Size(80, 140)
    };

      marker = new google.maps.Marker({
      position: gllaicyShop,
      map: map,
      icon: image,
      optimized: false
    });
  };

  // Инициализация карты
  var initMap = function () {
    map = new google.maps.Map(mapContainer, {
      center: mapCenter,
      zoom: 16,
      // Отключение интерфейса по умолчанию
      disableDefaultUI: true
    });

    setMarkers(map);

    /**
     * Обновление координат карты относительно вьюпорта при изменении размера
     * контейнера карты. При этом центр карты сохраняет свою позицию относительно
     * вьюпорта.
     */
    map.addListener('center_changed', function () {
      map.panTo(mapCenter);
    });
  };

  return function() {
    initMap();
  }
}();

// Общий служебный модуль
window.utils = function () {

  return {
    /**
     * Удаление класса у элемента
     * @param {HTMLElement} element - элемент
     * @param {string} className - имя класса
     */
    removeClass: function (element, className) {
      element.classList.remove(className);
    },

    /**
     * Добавление класса элементу
     * @param {HTMLElement} element - элемент
     * @param {string} className - имя класса
     */
    addClass: function (element, className) {
      element.classList.add(className);
    },

    /**
     * Метод определяет наличие заданного класса у элемента
     * @param {HTMLElement} element - проверяемый элемент
     * @param {string} className - имя класса
     * @returns {boolean} flag
     */
    hasClass: function (element, className) {
      var flag;
      element.classList.contains(className) ? flag=true : flag=false;

      return flag;
    }
  }
}();

// Модуль формы обратной связи
window.form = function () {
  if (document.querySelector('.write-us')) {
    // Окно формы обратной связи
    var modalWriteUs = document.querySelector('.write-us');
    // Форма обратной связи
    var formWriteUs = modalWriteUs.querySelector('form');
    // Поля ввода формы обратной связи и подписи к полям
    var userName = formWriteUs.querySelector('#user-name');
    var userNameLabel = formWriteUs.querySelector('label[for="user-name"]');
    var userMail = formWriteUs.querySelector('#user-email');
    var userMailLabel = formWriteUs.querySelector('label[for="user-email"');
    var userMessage = formWriteUs.querySelector('#user-message');
    var userMessageLabel = formWriteUs.querySelector('label[for="user-message"');
    // Класс для показа скрытой подписи к полю формы
    var visibleLabelClass = 'write-us__field-label--visible';
    // Класс для анимации попытки отправить незаполненную форму
    var errorWriteUsClass = 'write-us--error';
    // Класс со стилями для индикации попытки отправить форму с незаполненным полем
    var errorClass = 'input-field--error';

    /**
     * Функция проверяет заполнено ли поле ввода и присваивает или удаляет класс
     * со стилями для индикации пустого поля ввода
     * @param {HTMLElement} element - поле ввода формы
     * @param {string} className - имя класса для незаполненной формы
     */
    var onInputHandler = function (element, className) {
      if (element.value && window.utils.hasClass(element, className)) {
        window.utils.removeClass(element, className);
      } else if (!element.value && !window.utils.hasClass(element, className)) {
        window.utils.addClass(element, className);
      }
    };

    // Показ подписи к полю формы при наличии текста в поле
    var showLabel = function () {
      if (userName.value) {
        window.utils.addClass(userNameLabel, visibleLabelClass);
      } else {
        window.utils.removeClass(userNameLabel, visibleLabelClass);
      }
      if (userMail.value) {
        window.utils.addClass(userMailLabel, visibleLabelClass);
      } else {
        window.utils.removeClass(userMailLabel, visibleLabelClass);
      }
      if (userMessage.value) {
        window.utils.addClass(userMessageLabel, visibleLabelClass);
      } else {
        window.utils.removeClass(userMessageLabel, visibleLabelClass);
      }
    };

    // Функция проверяет все поля формы обратной связи на наличие текста
    var emptyInputCheck = function () {
      onInputHandler(userName, errorClass);
      onInputHandler(userMail, errorClass);
      onInputHandler(userMessage, errorClass);
    };

    return {
      /**
       * Метод устанавливает фокус на первое поле ввода формы при её загрузке
       */
      focusOnField: function () {
        userName.focus();
      },

      /**
       * Инициализация управления видимостью подписей к полям формы.
       * При уходе фокуса с поля и наличии текста в поле, подпись остаётся видимой.
       * Добавлено для поддержки IE 11+ и Edge из-за отсутствия у них псевдокласса :placeholder-shown
       */
      initializeLabel: function () {
        userName.addEventListener('blur', showLabel);
        userMail.addEventListener('blur', showLabel);
        userMessage.addEventListener('blur', showLabel);
      },

      deactivateLabel: function () {
        userName.removeEventListener('blur', showLabel);
        userMail.removeEventListener('blur', showLabel);
        userMessage.removeEventListener('blur', showLabel);
      },
      /**
       * Проверка формы при отправке.
       * Проверяется наличие текста в полях ввода.
       * @param {Object} event
       */
      onSubmitFormHandler: function (event) {
        event.preventDefault();

        // Проверка наличия текста в полях ввода
        userName.value ? window.utils.removeClass(userName, errorClass) : window.utils.addClass(userName, errorClass);
        userMail.value ? window.utils.removeClass(userMail, errorClass) : window.utils.addClass(userMail, errorClass);
        userMessage.value ? window.utils.removeClass(userMessage, errorClass) : window.utils.addClass(userMessage, errorClass);
        // Если есть пустые поля то к форме применяется класс с анимацией ошибки
        if (window.utils.hasClass(userName, errorClass) || window.utils.hasClass(userMail, errorClass) || window.utils.hasClass(userMessage, errorClass)) {
          window.utils.removeClass(modalWriteUs, errorWriteUsClass);
          modalWriteUs.style.width = modalWriteUs.offsetWidth;
          window.utils.addClass(modalWriteUs, errorWriteUsClass);
        }

        // Инициализация проверки поля на отсутствие текста. После начала заполнения поля, индикация ошибки отключается
        window.form.initializeEmptyInputCheck();

        /**
         * Проверка заполненности полей формы
         */
        if (userName.value && userMail.value && userMessage.value) {
          // Отправка формы
          formWriteUs.submit();
          // Удаление обработчика события ввода с полей формы
          window.form.deactivateEmptyInputCheck();
          window.form.deactivateLabel();
        }
      },

      initializeEmptyInputCheck: function () {
        formWriteUs.addEventListener('input', emptyInputCheck);
      },

      deactivateEmptyInputCheck: function () {
        formWriteUs.removeEventListener('input', emptyInputCheck);
      }
    }
  } else {
    return -1;
  }
}();

// Главный модуль модального окна
window.modal = function () {
  if (document.querySelector('.overlay')) {
    // Оверлей модального окна
    var overlay = document.querySelector('.overlay');
    // Класс для показа оверлея
    var overlayVisibleClass = 'overlay--visible';
    // Окно формы обратной связи
    var modalWriteUs = overlay.querySelector('.write-us');
    // Класс для показа окна формы обратной связи
    var modalVisibleClass = 'write-us--visible';
    // Форма обратной связи
    var formWriteUs = modalWriteUs.querySelector('.write-us__form');
    // Кнопка открытия окна с формой обратной связи
    var writeUsOpenBtn = document.querySelector('.contacts__btn');
    // Кнопка закрытия окна
    var writeUsCloseBtn = modalWriteUs.querySelector('.write-us__close-btn');
    // Код клавиатурного события для клавиши escape
    var ESC_KEY = 27;

    /**
     * Обаботчик клика по кнопке открытия окна обратной связи
     * @param {Object} event
     */
    var onWriteUsOpenBtnClick = function (event) {
      event.preventDefault();

      if (!window.utils.hasClass(overlay, overlayVisibleClass)) {
        // Показ оверлея и окна с формой обратной связи
        window.utils.addClass(overlay, overlayVisibleClass);
        window.utils.addClass(modalWriteUs, modalVisibleClass);

        writeUsCloseBtn.addEventListener('click', onWriteUsCloseBtnClickHandler);
        overlay.addEventListener('click', onOverlayClickHandler);
        window.addEventListener('keydown', onEscapeKeydownHandler);
        formWriteUs.addEventListener('submit', window.form.onSubmitFormHandler);
        writeUsOpenBtn.removeEventListener('click', onWriteUsOpenBtnClick);

        window.form.focusOnField();
        window.form.initializeLabel();
      }
    };

    /**
     * Обработчик клика по кнопке закрытия окна обратной связи
     * @param {Object} event
     */
    var onWriteUsCloseBtnClickHandler = function (event) {
      event.preventDefault();

      if (window.utils.hasClass(overlay, overlayVisibleClass)) {
        // Скрытие оверлея и окна с формой обратной связи
        window.utils.removeClass(modalWriteUs, modalVisibleClass);
        window.utils.removeClass(overlay, overlayVisibleClass);

        writeUsOpenBtn.addEventListener('click', onWriteUsOpenBtnClick);
        writeUsCloseBtn.removeEventListener('click', onWriteUsCloseBtnClickHandler);
        overlay.removeEventListener('click', onOverlayClickHandler);
        window.removeEventListener('keydown', onEscapeKeydownHandler);

        window.form.deactivateLabel();
      }
    };

    /**
     * Обработчик нажатия клавиши escape
     * @param {Object} event
     */
    var onEscapeKeydownHandler = function (event) {
      if (event.keyCode === ESC_KEY) {
        if (window.utils.hasClass(overlay, overlayVisibleClass)) {
          // Скрытие оверлея и окна с формой обратной связи
          window.utils.removeClass(overlay, overlayVisibleClass);
          window.utils.removeClass(modalWriteUs, modalVisibleClass);

          writeUsOpenBtn.addEventListener('click', onWriteUsOpenBtnClick);
          writeUsCloseBtn.removeEventListener('click', onWriteUsCloseBtnClickHandler);
          overlay.removeEventListener('click', onOverlayClickHandler);
          window.removeEventListener('keydown', onEscapeKeydownHandler);

          window.form.deactivateLabel();
        }
      }
    };

    /**
     * Обработчик клика по оверлею (добавляет возможность закрыть модальное окно
     * просто кликнув по пустому пространству вне формы обратной связи)
     * @param {Object} event
     */
    var onOverlayClickHandler = function (event) {

      if (window.utils.hasClass(overlay, overlayVisibleClass) && event.target === overlay) {
        // Скрытие оверлея и окна с формой обратной связи
        window.utils.removeClass(overlay, overlayVisibleClass);
        window.utils.removeClass(modalWriteUs, modalVisibleClass);

        writeUsOpenBtn.addEventListener('click', onWriteUsOpenBtnClick);
        writeUsCloseBtn.removeEventListener('click', onWriteUsCloseBtnClickHandler);
        overlay.removeEventListener('click', onOverlayClickHandler);
        window.removeEventListener('keydown', onEscapeKeydownHandler);

        window.form.deactivateLabel();
      }
    };

    writeUsOpenBtn.addEventListener('click', onWriteUsOpenBtnClick);
  } else {
    return -1;
  }
}();

// Модуль для показа подписей к полям форм
window.initLabels = function () {
  var search = document.querySelector('#search');
  var searchLabel = document.querySelector('label[for="search"]');
  var authorizationLogin = document.querySelector('#login');
  var authorizationLoginLabel = document.querySelector('label[for="login"]');
  var authorizationPassword = document.querySelector('#password');
  var authorizationPasswordLabel = document.querySelector('label[for="password"]');

  if (document.querySelector('#subscription')){
    var subscription = document.querySelector('#subscription');
    var subscriptionLabel = document.querySelector('label[for="subscription"]');

    var subscriptionLabelControl = function () {
      labelControl(subscription, subscriptionLabel, labelVisibleClass);
    };
  }

  var labelVisibleClass = 'field-label--visible';

  /**
   * Добавляет класс и показывает скрытую подпись к полю формы
   * при наличии текста в поле
   * @param {HTMLElement} element - поле формы
   * @param {HTMLElement} elementLabel - подпись к полю формы
   * @param {string} className - класс для показа скрытой подписи поля формы
   */
  var labelControl = function (element, elementLabel, className) {
    if (element.value) {
      window.utils.addClass(elementLabel, className);
    } else {
      window.utils.removeClass(elementLabel, className);
    }
  };

  var searchLabelControl = function () {
    labelControl(search, searchLabel, labelVisibleClass);
  };

  var authorizationLabelControl = function () {
    labelControl(authorizationLogin, authorizationLoginLabel, labelVisibleClass);
    labelControl(authorizationPassword, authorizationPasswordLabel, labelVisibleClass);
  };

  var initializeLabelsControl = function () {
    search.addEventListener('blur', searchLabelControl);
    authorizationLogin.addEventListener('blur', authorizationLabelControl);
    authorizationPassword.addEventListener('blur', authorizationLabelControl);
    if (document.querySelector('#subscription')){
      subscription.addEventListener('blur', subscriptionLabelControl);
    }
  };

  return initializeLabelsControl();
}();
