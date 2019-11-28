var inputMail = document.querySelector(".input__mail");
var dynamicText = document.querySelector(".form-send__dynamic-text");
var arrMoney = ['CNY', 'CHF', 'GBP', 'USD', 'TRY'];
var moneyName = document.querySelectorAll(".info-converter-row__name");
var moneyValue = document.querySelectorAll(".info-converter-row__value");
var blockNews = document.getElementsByClassName("info-news-block");
var arrCryptoMoney = ['BTC', 'ETH', 'BCH', 'USDT', 'LTC'];
var moneyCryptoName = document.querySelectorAll(".info-converter-crypto-row__name");
var moneyCryptoValue = document.querySelectorAll(".info-converter-crypto-row__value");
var sliderParent = document.querySelector(".slider-wrap");
var sliderControls = document.querySelector(".slider-control");
//---------------------------------------------send email address in contact page--------------------------------------------------------------
if (inputMail) {
    inputMail.addEventListener("keyup", function () {
        dynamicText.innerText = test.value;
    });
}
// ---------------------------------------httprequest EUR exchange rates ----------------------------------------------------------
var xhr = new XMLHttpRequest();
xhr.withCredentials = false;
xhr.open("GET", "https://api.exchangeratesapi.io/latest?base=EUR", true);
xhr.send();
xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        for (var i = 0; i < moneyName.length; i++) {
            moneyName[i].innerText = arrMoney[i];
            moneyValue[i].innerText = JSON.parse(this.responseText).rates[arrMoney[i]];
        };
    };
});

// ---------------------------------------httprequest news --------------------------------------------------
var xhrN = new XMLHttpRequest();
xhrN.withCredentials = false;
xhrN.open("GET", "https://newsapi.org/v2/top-headlines?category = business&sources=bloomberg&apiKey=d5ab78edfa2649a6b0fd66a7cf1c2c68", true);
xhrN.send();
xhrN.addEventListener("readystatechange", function () {
    for (var j = 0; j < blockNews.length; j++) {
        blockNews[j].setAttribute('href', JSON.parse(this.responseText).articles[j].url);
        blockNews[j].firstElementChild.innerText = JSON.parse(this.responseText).articles[j].title;
    }
});

// ---------------------------------------httprequest cryptocurrency courses --------------------------------------------------
if (moneyCryptoName == undefined) {
    var xhrC = new XMLHttpRequest();
    xhrC.withCredentials = false;
    xhrC.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=EUR&tsyms=BTC,ETH,BCH,USDT,LTC&apiKey=bb98291570d521612ebd320b47a541e57dd03581bc116ddeb19abb62e7a306a6", true);
    xhrC.send();
    xhrC.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            for (var i = 0; i < arrCryptoMoney.length; i++) {
                moneyCryptoName[i].innerText = arrCryptoMoney[i];
                moneyCryptoValue[i].innerText = JSON.parse(this.responseText)[arrCryptoMoney[i]];
            };
        };
    });
}

// -----------------------------------------------   Slider   ----------------------------------------------------------------
function sliderCart(arrElem, count) {
    for (let j = 0; j < arrElem.children.length; j++) {
        arrElem.children[j].style.display = "none";
    }
    arrElem.children[count].style.display = "flex";
}

if (sliderControls) {
    sliderControls.addEventListener("click", function (e) {
        if (e.target.classList.contains("slider-control__item")) {
            var btnSlider = e.target;
            var activeClass = document.querySelector(".slider-control__item_active");
            activeClass.classList.remove("slider-control__item_active")
            btnSlider.classList.add("slider-control__item_active")
            for (let i = 0; i < sliderControls.children.length; i++) {
                if (sliderControls.children[i].children[0].classList.contains("slider-control__item_active")) {
                    sliderCart(sliderParent, i)
                }
            }
        }
    })
}
function runSlider() {
    let arrControlSlider = document.querySelectorAll(".slider-control__item")
    for (let i = 0; i < arrControlSlider.length; i++) {
        if (arrControlSlider[i].classList.contains("slider-control__item_active")) {
            arrControlSlider[i].classList.remove("slider-control__item_active")
            if (i != arrControlSlider.length - 1) {
                arrControlSlider[`${i += 1}`].classList.add("slider-control__item_active")
                sliderCart(sliderParent, i)
            }
            else {
                i = 0;
                arrControlSlider[i].classList.add("slider-control__item_active")
                sliderCart(sliderParent, i)
            }
        }
    }
}

setInterval(runSlider, 5000)
// -----------------------------------------------authorization----------------------------------------------------------
var authorizationBlock = document.querySelector(".internet-banking");
var btnBlock = document.querySelector(".authorization-block-btn");
var pointAuthorithation = 0;

function hideCildrenElements(element) {
    for (var countElements = 0; countElements < element.children.length; countElements++) {
        element.children[countElements].style.display = "none";
    }
}


if (authorizationBlock) {
    hideCildrenElements(authorizationBlock);
    authorizationBlock.children[0].style.display = "block";
    authorizationBlock.addEventListener("click", function (e) {
        if (e.target === document.querySelector(".internet-banking__btn")) {

            hideCildrenElements(authorizationBlock);
            showElement(authorizationBlock.children[1]);
            showElement(btnBlock);
            showElement(btnBlock.children[0]);
            showElement(btnBlock.children[1]);
        }
    })
}

function showElement(elem) {
    elem.style.display = "block";
}
function hideElement(elem) {
    elem.style.display = "none";
}



if (btnBlock) {
    btnBlock.children[1].addEventListener("click", function () {
        var obj = {
            username: document.querySelector(".authorization__login").value,
            password: document.querySelector(".authorization__password").value
        }
        var objS = JSON.stringify(obj)
        console.log(objS);

        let promise = new Promise((resolve, reject) => {
            var xhrd = new XMLHttpRequest();
            xhrd.withCredentials = false;
            xhrd.open("POST", "http://watch.samtsov.com:8070/api/login_check", true);
            xhrd.send(objS);
            xhrd.addEventListener("readystatechange", function () {
                console.log(this.readyState)
                console.log(this.DONE)
                if (this.status == 200) {
                    resolve(sessionStorage.setItem("token", JSON.parse(this.responseText).token))
                }
                else {
                    var error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            });
        })
        promise
            .then(
                result => {
                    // hideCildrenElements(authorizationBlock);
                    // showElement(authorizationBlock.children[2]);
                    window.location.href = "http://localhost:3000/account.html"
                },
                error => {
                    hideCildrenElements(authorizationBlock);
                    showElement(authorizationBlock.children[3]);
                    hideElement(btnBlock.children[1]);
                }
            );
    });
    btnBlock.children[0].addEventListener("click", function () {
        hideCildrenElements(authorizationBlock);
        authorizationBlock.children[0].style.display = "block";
        hideElement(btnBlock.children[0]);
        hideElement(btnBlock.children[1]);
    })
}

// $(window).on("load", function () {
//     fetch("http://watch.samtsov.com:8070/public/product/gets/products", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         "brand": INPUT_BRAND
//       })
//     })
//     .then(response => response.json())
//     .then(result => startLogic(result));
//   });
var arrTabs = document.getElementsByClassName("menu-wrap-item__input");
var blockArrTabs = document.querySelector(".menu-wrap-contain");
var blockArrMenu = document.querySelector(".menu-bord");

if (blockArrTabs) {
    blockArrTabs.addEventListener("click", function () {
        for (let i = 0; i <= arrTabs.length - 1; i++) {
            if (arrTabs[i].checked) {
                document.querySelector(".d-flex").classList.remove("d-flex")
                blockArrMenu.children[i].classList.add("d-flex")
                // console.log(i)
            }
        }
    })
}
