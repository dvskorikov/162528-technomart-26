// глобальные переменные для формы обратной связи
var popupFeedbackForm = document.querySelector(".popup-write-us");
var openFormBtn = document.querySelector(".show-mail-lnk");
if (popupFeedbackForm) {
  var formMail = popupFeedbackForm.querySelector("form");
  var closeFormBtn = popupFeedbackForm.querySelector(".popup-close-btn");
  var formNameField = popupFeedbackForm.querySelector("[name=customer-name]");
  var formEmailField = popupFeedbackForm.querySelector("[name=customer-email]");
  var formTextField = popupFeedbackForm.querySelector("[name=customer-request]");
}

// глобальные переменные для карты
var popupMap = document.querySelector(".popup-map");
if (popupMap) {
  var closeMapBtn = popupMap.querySelector(".popup-close-btn");
}
var showMap = document.querySelector(".show-map-lnk");
var mapIframe = document.querySelector(".popup-map-iframe");
var isIframeAvailable = false;
var isHttpRequesOk = false;

// гобальные переменные для карточки товара
var totalBookmarks = 0;
var totalCarts = 0;
var itemBuyBtns = document.querySelectorAll(".on-hover-buy-btn"), index, button;
var itemBookmarkBtns = document.querySelectorAll(".on-hover-bookmark-btn"), index, button;
var bookmarkMenuLnk = document.querySelector(".bookmark-lnk");
var cartMenuLnk = document.querySelector(".cart-lnk");
const constBookmarkVal = "<img src='img/icon-bookmark.svg' alt='Количество закладок' width='14' height='16'/> Закладки: "
const constCartVal = "<img src='img/icon-cart.svg' alt='Корзина' width='15' height='15'/> Корзина: "

// глобальные переменные для формы добавления товара в корзину
var popupCart = document.querySelector(".popup-added-to-shopping-cart");
var popupCartFinisBtn = document.querySelector(".popup-lnk-finish");
var popupCartContinueBtn = document.querySelector(".popup-lnk-continue");
if (popupCart) {
  var closeCartBtn = popupCart.querySelector(".popup-close-btn");
}

// глобальные переменные для слайдера
var leftSliderRadioBtn = document.getElementById("promo-radio-btn1");
var rightSliderRadioBtn = document.getElementById("promo-radio-btn2");
var leftSliderBtn = document.querySelector(".slider-left-btn");
var rightSliderBtn = document.querySelector(".slider-right-btn");
var leftToggleRadio = document.querySelector("[for=promo-radio-btn1]");
var rightToggleRadio = document.querySelector("[for=promo-radio-btn2]");

// общие глобальные переменные и запуск функций
var isLocalStorageSupport = true;
var isCatalogPage = false;

checkWebMapAvailability(); // проверяем доступность google maps
defaultTopMenuValues(); // значения по умолчанию для ссылок в меню

// проверяем доступность localStorage
try {
  let someValue = localStorage.getItem("formNameField");
  console.log("localStorage доступен");
} catch (err) {
  isLocalStorageSupport = false;
  console.log("localStorage НЕ доступен!");
}

// открываем форму обратной связи
if (openFormBtn) {
  openFormBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    console.log("открыли форму обратной связи");
    formNameField.value = formEmailField.value = formTextField.value = "";
    showPopup(popupFeedbackForm);

    if (isLocalStorageSupport) {
      formNameField.value = localStorage.getItem("formNameField");
      formEmailField.value = localStorage.getItem("formEmailField");

      if(!formNameField.value){
        formNameField.focus();
      } else if(!formEmailField.value) {
        formEmailField.focus();
      } else {
        formTextField.focus();
      }

    } else {
      formNameField.focus();
    }
  });
}

// закрываем форму обратной связи по клику на кнопке закрыть
if (closeFormBtn) {
  closeFormBtn.addEventListener("click", function(evt){
    evt.preventDefault();
    removeShakeFormAnimation();
    console.log("закрыли форму обратной связи по кнопке закрыть");
    hidePopup(popupFeedbackForm);
  });
}

// закрываем формы главной страницы по нажатию ESC
if (popupFeedbackForm || popupMap) {
  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();

      // форма обратной связи
      if (!popupFeedbackForm.classList.contains("visually-hidden")) {
        removeShakeFormAnimation();
        hidePopup(popupFeedbackForm);
        console.log("закрыли форму обратной связи по нажатию ESC");
      }

      // карта
      if (!popupMap.classList.contains("visually-hidden")) {
        hidePopup(popupMap);
        console.log("закрыли карту по нажатию ESC");
      }
    }
  });
}

// закрываем формы страницы каталога по нажатию ESC
if (popupCart) {
  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();

      // форма добавления товара
      if (!popupCart.classList.contains("visually-hidden")) {
        hidePopup(popupCart);
        console.log("закрыли форму добавления товара по нажатию ESC");
      }
    }
  });
}

// перехват события отправки формы обратной связи
if (formMail) {
  formMail.addEventListener("submit", function(evt) {
    evt.preventDefault();
    if(!formNameField.value || !formEmailField.value || !formTextField.value) {

      console.log("попытка отправки формы: есть пустые поля, нельзя отправлять!");
      if(!formNameField.value) {
        formNameField.focus();
      } else if (!formEmailField.value) {
        formEmailField.focus();
      } else if (!formTextField.value) {
        formTextField.focus();
      }

      // хак для отображения повторной анимации в случае ошибки
      removeShakeFormAnimation();
      popupFeedbackForm.offsetWidth = popupFeedbackForm.offsetWidth;
      doShakeFormAnimation();

    } else {
      console.log("попытка отправки формы: все поля заполнены, отправляем");
      if(isLocalStorageSupport) {

        try {
          localStorage.setItem("formNameField", formNameField.value);
          localStorage.setItem("formEmailField", formEmailField.value);
          console.log("сохранили имя и почту в localStorage");
        } catch (err) {
          console.log("при сохранении в localStorage полей имя и почта возникла ошибка: " + err.name + "; текст: " + err.message + "; стэк: " + err.stack );
        }

      }

      removeShakeFormAnimation();
      hidePopup(popupFeedbackForm);

      try {
        formMail.submit();
        console.log("form.submit выполнен успешно");
      } catch (err) {
        console.log("в методе form.submit возникла ошибка: " + err.name + "; текст: " + err.message + "; стэк: " + err.stack );
      }
    }
  });
}

// открываем карту
if (showMap) {
  showMap.addEventListener("click", function (evt) {
    evt.preventDefault();
    showPopup(popupMap);
    console.log("открыли карту");
  });
}

// закрываем карту по клику на кнопке закрыть
if (closeMapBtn) {
  closeMapBtn.addEventListener("click", function(evt){
    evt.preventDefault();
    console.log("закрыли карту по кнопке закрыть");
    hidePopup(popupMap);
  });
}

// КАРТОЧКА ТОВАРА
for (index = 0; index < itemBuyBtns.length; index++) {
  button = itemBuyBtns[index];
  if (isCatalogPage) {
    button.addEventListener("click", showBuyDialog)
  } else {
    button.addEventListener("click", clickBuyHandler)
  }
}

for (index = 0; index < itemBookmarkBtns.length; index++) {
  button = itemBookmarkBtns[index];
  button.addEventListener("click", clickBookmarkHandler);
}

// ПРОМО-СЛАЙДЕР основные кнопки
if (leftSliderBtn) {
  leftSliderBtn.addEventListener("click", function(evt) {
    clickLeftSliderBtnHandler(evt);
    console.log("событие click на левой кнопке слайдера");
  });
}

if (rightSliderBtn) {
  rightSliderBtn.addEventListener("click", function(evt) {
    clickRightSliderBtnHandler(evt);
    console.log("событие click на правой кнопке слайдера");
  });
}

// ПРОМО-СЛАЙДЕР радиокнопки
if (leftToggleRadio) {
  leftToggleRadio.addEventListener("click", function(evt) {
    if (!leftToggleRadio.disabled) {
      clickLeftSliderBtnHandler(evt);
      console.log("кликнули по левой радиокнопке слайдера");
    }
  });
}

if (rightToggleRadio) {
  rightToggleRadio.addEventListener("click", function(evt) {
    if (!rightToggleRadio.disabled) {
      clickRightSliderBtnHandler(evt);
      console.log("кликнули по правой радиокнопке слайдера");
    }
  });
}

// закрытие формы добавления товара на странице каталога
if (popupCartFinisBtn) {
  popupCartFinisBtn.addEventListener("click", function(evt) {
    evt.preventDefault();
    closePopupCart();
    console.log("закрыли форму добавления товара для оформления заказа");
  });
}

if (popupCartContinueBtn) {
  popupCartContinueBtn.addEventListener("click", function(evt) {
    evt.preventDefault();
    closePopupCart();
    console.log("закрыли форму добавления товара для продолжения покупок");
  });
}

if (closeCartBtn) {
  closeCartBtn.addEventListener("click", function(evt){
    evt.preventDefault();
    closePopupCart()
    console.log("закрыли форму добавления товара по кнопке закрыть");
  });
}

// ГЛОБАЛЬНЫЕ ФУНКЦИИ
function closePopupCart() {
  hidePopup(popupCart);
  if (popupCart.classList.contains("popup-error-shake")) {
    popupCart.classList.remove("popup-error-shake")
  }
}

function defaultTopMenuValues() {
  if (window.location.pathname == "/" || window.location.pathname == "/index.html") {
    totalBookmarks = totalCarts = 0;
    isCatalogPage = false;
    leftToggleRadio.disabled = true; // начальное значение
  } else {
    totalBookmarks = 0;
    totalCarts = 10;
    isCatalogPage = true;
  }
  console.log("для страницы: " + window.location.pathname + ", totalBookmarks = " + totalBookmarks + ", totalCarts = " + totalCarts);
}

function checkWebMapAvailability() {
  mapIframe.onload = function () {
    isIframeAvailable = true;
    console.log("Iframe - событие onload выполнено успешно; isIframeAvailable = ", isIframeAvailable);
  }

  mapIframe.onerror = function () {
    isIframeAvailable = false;
    console.log("Iframe - возникло событие error! " + mapIframe.error, "; isIframeAvailable = ", isIframeAvailable);
  }

  let req = new XMLHttpRequest();
  if (req) {
    //  используем cors-anywhere для обхода запрета CORS из JS
    req.open("HEAD", "https://cors-anywhere.herokuapp.com/" + mapIframe.getAttribute("src"), true);
    req.timeout = 10000; // на всякий пожарный, ждём не более 10 секунд

    req.addEventListener("error", function() {
      isIframeAvailable = false;
      console.log("XMLHttpRequest событие error: ", req.status, "; isHttpRequesOk = ", isHttpRequesOk);
    });

    req.addEventListener("timeout", function() {
      isIframeAvailable = false;
      console.log("XMLHttpRequest событие timeout: ", req.status, "; isHttpRequesOk = ", isHttpRequesOk);
    });

    // финальная проверка, принимаем решение о выводе гугл-карт
    req.addEventListener("loadend", function() {
      if (req.readyState == 4 && req.status == 200) {
        isHttpRequesOk = true;
      } else {
        isHttpRequesOk = false;
      }

      if (isIframeAvailable && isHttpRequesOk) {
        mapIframe.classList.remove("visually-hidden");
        console.log("XMLHttpRequest событие loadend, isHttpRequesOk = ", isHttpRequesOk, " IFRAME выведен на экран.");
      }
    });

    // формируем HEAD запрос
    try {
      req.send(null);
    } catch (err) {
      isHttpRequesOk = false;
      console.log("XMLHttpRequest запрос не удался (req.send упал): ", err);
    }
  }
}

function clickLeftSliderBtnHandler(event) {
  event.preventDefault();
  if (!leftSliderBtn.disabled) {
    leftSliderRadioBtn.setAttribute("checked", "checked");
    rightSliderRadioBtn.removeAttribute("checked");
    leftSliderRadioBtn.checked = true;
    leftSliderBtn.disabled = true;
    rightSliderBtn.disabled = false;

    // нужно для радиокнопок при обработке click на label
    leftToggleRadio.disabled = true;
    rightToggleRadio.disabled = false;
  }
}

function clickRightSliderBtnHandler(event) {
  event.preventDefault();
  if (!rightSliderBtn.disabled) {
    rightSliderRadioBtn.setAttribute("checked", "checked");
    leftSliderRadioBtn.removeAttribute("checked");
    rightSliderRadioBtn.checked = true;
    rightSliderBtn.disabled = true;
    leftSliderBtn.disabled = false;

    // нужно для радиокнопок при обработке click на label
    leftToggleRadio.disabled = false;
    rightToggleRadio.disabled = true;
  }
}

function doBuyAction() {
  totalCarts++;
  cartMenuLnk.innerHTML = constCartVal + totalCarts;
  if (!cartMenuLnk.classList.contains("cart-with-goods")) {
    cartMenuLnk.classList.add("cart-with-goods");
  }
}

function showBuyDialog(event) {
  event.preventDefault();
  if (popupCart.classList.contains("visually-hidden")) {
    popupCart.classList.remove("visually-hidden");
    if (popupCart.classList.contains("popup-error-shake")) {
      popupCart.classList.remove("popup-error-shake")
    }
    doBuyAction();
    console.log("показали диалог покупки и добавили товар к общему количеству: ", totalCarts);
  }
  else {
    // хак для повторной анимации в случае ошибки
    popupCart.classList.remove("popup-error-shake")
    popupCart.offsetWidth = popupCart.offsetWidth;
    popupCart.classList.add("popup-error-shake")
  }
}

function clickBuyHandler(event) {
  event.preventDefault();
  doBuyAction();
  console.log("событие click на кнопке: " + this.innerText + "; общее количество в корзине: " + totalCarts);
}

function clickBookmarkHandler(event) {
  event.preventDefault();
  totalBookmarks++;
  bookmarkMenuLnk.innerHTML = constBookmarkVal + totalBookmarks;
  if (!bookmarkMenuLnk.classList.contains("cart-with-goods")) {
    bookmarkMenuLnk.classList.add("cart-with-goods");
  }
  console.log("событие click на кнопке: " + this.innerText + "; общее количество в закладках: " + totalBookmarks);
}

function showPopup(popupName) {
  try {
    if (popupName.classList.contains("visually-hidden")) {
      popupName.classList.remove("visually-hidden");
      popupName.classList.add("popup-appear");
    }
  } catch (err) {
    console.log("возникла ошибка при вызове showPopup с параметром: " + popupName + "; ошибка: " + err.name + "; текст: " + err.message + "; стэк: " + err.stack );
  }
}

function hidePopup(popupName) {
  try {
    if (!popupName.classList.contains("visually-hidden")) {
      popupName.classList.add("visually-hidden");
      popupName.classList.remove("popup-appear");
      popupName.classList.remove("popup-error-shake");
    }
  } catch (err) {
    console.log("возникла ошибка при вызове hidePopup с параметром: " + popupName + "; ошибка: " + err.name + "; текст: " + err.message + "; стэк: " + err.stack );
  }
}

if (popupFeedbackForm) {
  function doShakeFormAnimation() {
    if (!popupFeedbackForm.classList.contains("popup-error-shake")) {
      if (popupFeedbackForm.classList.contains("popup-appear")) {
        popupFeedbackForm.classList.remove("popup-appear");
      }
      popupFeedbackForm.classList.add("popup-error-shake");
    }
  }

  function removeShakeFormAnimation() {
    if (popupFeedbackForm.classList.contains("popup-error-shake")) {
      if (popupFeedbackForm.classList.contains("popup-appear")) {
        popupFeedbackForm.classList.remove("popup-appear");
      }
      popupFeedbackForm.classList.remove("popup-error-shake");
    }
  }
}
