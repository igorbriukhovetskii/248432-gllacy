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

// Модуль для показа подписей к полям форм
window.initLabels = function () {
  var search = document.querySelector('#search');
  var searchLabel = document.querySelector('label[for="search"]');
  var authorizationLogin = document.querySelector('#login');
  var authorizationLoginLabel = document.querySelector('label[for="login"]');
  var authorizationPassword = document.querySelector('#password');
  var authorizationPasswordLabel = document.querySelector('label[for="password"]');
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
  };

  return initializeLabelsControl();
}();
