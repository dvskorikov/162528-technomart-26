// -> POPUP FEEDBACK

// глобальные переменные для формы обратной связи
var popupFeedbackForm = document.querySelector(".popup-write-us");
var openFormBtn = document.querySelector(".show-mail-lnk");
var form = popupFeedbackForm.querySelector("form");
var closeFormBtn = popupFeedbackForm.querySelector(".popup-close-btn");

var formNameField = popupFeedbackForm.querySelector("[name=customer-name]");
var formEmailField = popupFeedbackForm.querySelector("[name=customer-email]");
var formTextField = popupFeedbackForm.querySelector("[name=customer-request]");

var isLocalStorageSupport = true;
removeShakeFormAnimation(); // убираем анимацию ошибки в случае, если она есть

// проверяем доступность localStorage
try {

  let someValue = localStorage.getItem("formNameField");
  console.log("localStorage доступен");

} catch (err) {

  isLocalStorageSupport = false;
  console.log("localStorage НЕ доступен!");

}

// открываем форму обратной связи
openFormBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  console.log("открыли форму обратной связи");
  formNameField.value = formEmailField.value = formTextField.value = "";


  showFeedbackForm();

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

// закрываем форму обратной связи по клику на кнопке закрыть
closeFormBtn.addEventListener("click", function(evt){

  evt.preventDefault();
  removeShakeFormAnimation();
  console.log("закрыли форму обратной связи по кнопке закрыть");
  hideFeedbackForm();
});

// закрываем формы по нажатию ESC
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    if (!popupFeedbackForm.classList.contains("visually-hidden")) {

      removeShakeFormAnimation();
      hideFeedbackForm();
      console.log("закрыли форму по нажатию ESC");

    }
  }
});

// перехват события отправки формы обратной связи
form.addEventListener("submit", function(evt){

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
    hideFeedbackForm();

    try {
      form.submit();
    } catch (err) {
      console.log("в методе form.submit возникла ошибка: " + err.name + "; текст: " + err.message + "; стэк: " + err.stack );
    }

  }

});



// глобальные функции
function showFeedbackForm() {
  if (popupFeedbackForm.classList.contains("visually-hidden")) {
    popupFeedbackForm.classList.remove("visually-hidden");
    popupFeedbackForm.classList.add("popup-appear");
  }
}

function hideFeedbackForm() {
  if (!popupFeedbackForm.classList.contains("visually-hidden")) {
    popupFeedbackForm.classList.add("visually-hidden");
    popupFeedbackForm.classList.remove("popup-appear");
  }
}

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
// <- POPUP FEEDBACK
