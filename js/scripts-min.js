var popupFeedbackForm=document.querySelector(".popup-write-us"),openFormBtn=document.querySelector(".show-mail-lnk");if(popupFeedbackForm)var formMail=popupFeedbackForm.querySelector("form"),closeFormBtn=popupFeedbackForm.querySelector(".popup-close-btn"),formNameField=popupFeedbackForm.querySelector("[name=customer-name]"),formEmailField=popupFeedbackForm.querySelector("[name=customer-email]"),formTextField=popupFeedbackForm.querySelector("[name=customer-request]");var popupMap=document.querySelector(".popup-map");if(popupMap)var closeMapBtn=popupMap.querySelector(".popup-close-btn");var index,button,index,button,showMap=document.querySelector(".show-map-lnk"),mapIframe=document.querySelector(".popup-map-iframe"),isIframeAvailable=!1,isHttpRequesOk=!1,totalBookmarks=0,totalCarts=0,itemBuyBtns=document.querySelectorAll(".on-hover-buy-btn"),itemBookmarkBtns=document.querySelectorAll(".on-hover-bookmark-btn"),bookmarkMenuLnk=document.querySelector(".bookmark-lnk"),cartMenuLnk=document.querySelector(".cart-lnk");const constBookmarkVal="<img src='img/icon-bookmark.svg' alt='\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u043A\u043B\u0430\u0434\u043E\u043A' width='14' height='16'/> \u0417\u0430\u043A\u043B\u0430\u0434\u043A\u0438: ",constCartVal="<img src='img/icon-cart.svg' alt='\u041A\u043E\u0440\u0437\u0438\u043D\u0430' width='15' height='15'/> \u041A\u043E\u0440\u0437\u0438\u043D\u0430: ";var popupCart=document.querySelector(".popup-added-to-shopping-cart"),popupCartFinisBtn=document.querySelector(".popup-lnk-finish"),popupCartContinueBtn=document.querySelector(".popup-lnk-continue");if(popupCart)var closeCartBtn=popupCart.querySelector(".popup-close-btn");var leftSliderRadioBtn=document.getElementById("promo-radio-btn1"),rightSliderRadioBtn=document.getElementById("promo-radio-btn2"),leftSliderBtn=document.querySelector(".slider-left-btn"),rightSliderBtn=document.querySelector(".slider-right-btn"),leftToggleRadio=document.querySelector("[for=promo-radio-btn1]"),rightToggleRadio=document.querySelector("[for=promo-radio-btn2]"),isLocalStorageSupport=!0;mapIframe&&checkWebMapAvailability(),defaultTopMenuValues();try{localStorage.getItem("formNameField")}catch(a){isLocalStorageSupport=!1,console.log("localStorage \u041D\u0415 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D!")}for(openFormBtn&&openFormBtn.addEventListener("click",function(a){a.preventDefault(),formNameField.value=formEmailField.value=formTextField.value="",showPopup(popupFeedbackForm),isLocalStorageSupport?(formNameField.value=localStorage.getItem("formNameField"),formEmailField.value=localStorage.getItem("formEmailField"),formNameField.value?formEmailField.value?formTextField.focus():formEmailField.focus():formNameField.focus()):formNameField.focus()}),closeFormBtn&&closeFormBtn.addEventListener("click",function(a){a.preventDefault(),removeShakeFormAnimation(),hidePopup(popupFeedbackForm)}),(popupFeedbackForm||popupMap)&&window.addEventListener("keydown",function(a){27===a.keyCode&&(a.preventDefault(),!popupFeedbackForm.classList.contains("visually-hidden")&&(removeShakeFormAnimation(),hidePopup(popupFeedbackForm)),!popupMap.classList.contains("visually-hidden")&&hidePopup(popupMap))}),popupCart&&window.addEventListener("keydown",function(a){27===a.keyCode&&(a.preventDefault(),!popupCart.classList.contains("visually-hidden")&&hidePopup(popupCart))}),formMail&&formMail.addEventListener("submit",function(a){if(a.preventDefault(),!formNameField.value||!formEmailField.value||!formTextField.value)formNameField.value?formEmailField.value?!formTextField.value&&formTextField.focus():formEmailField.focus():formNameField.focus(),removeShakeFormAnimation(),popupFeedbackForm.offsetWidth=popupFeedbackForm.offsetWidth,doShakeFormAnimation();else{if(isLocalStorageSupport)try{localStorage.setItem("formNameField",formNameField.value),localStorage.setItem("formEmailField",formEmailField.value)}catch(a){console.log("\u043F\u0440\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0438 \u0432 localStorage \u043F\u043E\u043B\u0435\u0439 \u0438\u043C\u044F \u0438 \u043F\u043E\u0447\u0442\u0430 \u0432\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430: "+a.name+"; \u0442\u0435\u043A\u0441\u0442: "+a.message+"; \u0441\u0442\u044D\u043A: "+a.stack)}removeShakeFormAnimation(),hidePopup(popupFeedbackForm);try{formMail.submit()}catch(a){console.log("\u0432 \u043C\u0435\u0442\u043E\u0434\u0435 form.submit \u0432\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430: "+a.name+"; \u0442\u0435\u043A\u0441\u0442: "+a.message+"; \u0441\u0442\u044D\u043A: "+a.stack)}}}),showMap&&showMap.addEventListener("click",function(a){a.preventDefault(),showPopup(popupMap)}),closeMapBtn&&closeMapBtn.addEventListener("click",function(a){a.preventDefault(),hidePopup(popupMap)}),index=0;index<itemBuyBtns.length;index++)button=itemBuyBtns[index],button.addEventListener("click",showBuyDialog);for(index=0;index<itemBookmarkBtns.length;index++)button=itemBookmarkBtns[index],button.addEventListener("click",clickBookmarkHandler);leftSliderBtn&&leftSliderBtn.addEventListener("click",function(a){clickLeftSliderBtnHandler(a)}),rightSliderBtn&&rightSliderBtn.addEventListener("click",function(a){clickRightSliderBtnHandler(a)}),leftToggleRadio&&leftToggleRadio.addEventListener("click",function(a){leftToggleRadio.disabled||clickLeftSliderBtnHandler(a)}),rightToggleRadio&&rightToggleRadio.addEventListener("click",function(a){rightToggleRadio.disabled||clickRightSliderBtnHandler(a)}),popupCartFinisBtn&&popupCartFinisBtn.addEventListener("click",function(a){a.preventDefault(),closePopupCart()}),popupCartContinueBtn&&popupCartContinueBtn.addEventListener("click",function(a){a.preventDefault(),closePopupCart()}),closeCartBtn&&closeCartBtn.addEventListener("click",function(a){a.preventDefault(),closePopupCart()});function closePopupCart(){hidePopup(popupCart),popupCart.classList.contains("popup-error-shake")&&popupCart.classList.remove("popup-error-shake")}function defaultTopMenuValues(){"HTML Academy: \u0422\u0435\u0445\u043D\u043E\u043C\u0430\u0440\u0442"==document.title?(totalBookmarks=totalCarts=0,leftToggleRadio.disabled=!0):(totalBookmarks=0,totalCarts=10)}function checkWebMapAvailability(){mapIframe.onload=function(){isIframeAvailable=!0},mapIframe.onerror=function(){isIframeAvailable=!1};let a=new XMLHttpRequest;if(a){a.open("HEAD","https://cors-anywhere.herokuapp.com/"+mapIframe.getAttribute("src"),!0),a.timeout=1e4,a.addEventListener("error",function(){isIframeAvailable=!1}),a.addEventListener("timeout",function(){isIframeAvailable=!1}),a.addEventListener("loadend",function(){isHttpRequesOk=!(4!=a.readyState||200!=a.status),isIframeAvailable&&isHttpRequesOk&&mapIframe.classList.remove("visually-hidden")});try{a.send(null)}catch(a){isHttpRequesOk=!1,console.log("XMLHttpRequest \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0435 \u0443\u0434\u0430\u043B\u0441\u044F (req.send \u0443\u043F\u0430\u043B): ",a)}}}function clickLeftSliderBtnHandler(a){a.preventDefault(),leftSliderBtn.disabled||(leftSliderRadioBtn.setAttribute("checked","checked"),rightSliderRadioBtn.removeAttribute("checked"),leftSliderRadioBtn.checked=!0,leftSliderBtn.disabled=!0,rightSliderBtn.disabled=!1,leftToggleRadio.disabled=!0,rightToggleRadio.disabled=!1)}function clickRightSliderBtnHandler(a){a.preventDefault(),rightSliderBtn.disabled||(rightSliderRadioBtn.setAttribute("checked","checked"),leftSliderRadioBtn.removeAttribute("checked"),rightSliderRadioBtn.checked=!0,rightSliderBtn.disabled=!0,leftSliderBtn.disabled=!1,leftToggleRadio.disabled=!1,rightToggleRadio.disabled=!0)}function doBuyAction(){totalCarts++,cartMenuLnk.innerHTML=constCartVal+totalCarts,cartMenuLnk.classList.contains("cart-with-goods")||cartMenuLnk.classList.add("cart-with-goods")}function showBuyDialog(a){a.preventDefault(),popupCart.classList.contains("visually-hidden")?(popupCart.classList.remove("visually-hidden"),popupCart.classList.contains("popup-error-shake")&&popupCart.classList.remove("popup-error-shake"),doBuyAction()):(popupCart.classList.remove("popup-error-shake"),popupCart.offsetWidth=popupCart.offsetWidth,popupCart.classList.add("popup-error-shake"))}function clickBookmarkHandler(a){a.preventDefault(),totalBookmarks++,bookmarkMenuLnk.innerHTML=constBookmarkVal+totalBookmarks,bookmarkMenuLnk.classList.contains("cart-with-goods")||bookmarkMenuLnk.classList.add("cart-with-goods")}function showPopup(a){try{a.classList.contains("visually-hidden")&&(a.classList.remove("visually-hidden"),a.classList.add("popup-appear"))}catch(b){console.log("\u0432\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u0437\u043E\u0432\u0435 showPopup \u0441 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u043C: "+a+"; \u043E\u0448\u0438\u0431\u043A\u0430: "+b.name+"; \u0442\u0435\u043A\u0441\u0442: "+b.message+"; \u0441\u0442\u044D\u043A: "+b.stack)}}function hidePopup(a){try{a.classList.contains("visually-hidden")||(a.classList.add("visually-hidden"),a.classList.remove("popup-appear"),a.classList.remove("popup-error-shake"))}catch(b){console.log("\u0432\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u0437\u043E\u0432\u0435 hidePopup \u0441 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u043C: "+a+"; \u043E\u0448\u0438\u0431\u043A\u0430: "+b.name+"; \u0442\u0435\u043A\u0441\u0442: "+b.message+"; \u0441\u0442\u044D\u043A: "+b.stack)}}if(popupFeedbackForm){function doShakeFormAnimation(){popupFeedbackForm.classList.contains("popup-error-shake")||(popupFeedbackForm.classList.contains("popup-appear")&&popupFeedbackForm.classList.remove("popup-appear"),popupFeedbackForm.classList.add("popup-error-shake"))}function removeShakeFormAnimation(){popupFeedbackForm.classList.contains("popup-error-shake")&&(popupFeedbackForm.classList.contains("popup-appear")&&popupFeedbackForm.classList.remove("popup-appear"),popupFeedbackForm.classList.remove("popup-error-shake"))}}
