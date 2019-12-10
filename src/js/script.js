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
var objAccount = {};
//---------------------------------------------send email address in contact page--------------------------------------------------------------
if (inputMail) {
    inputMail.addEventListener("keyup", function () {
        dynamicText.innerText = inputMail.value;
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
if (moneyCryptoName[0]) {
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
            hideElement(btnBlock.children[2])
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
    btnBlock.children[1].addEventListener("click", function xxx() {
        var obj = {
            username: document.querySelector(".authorization__login").value,
            password: document.querySelector(".authorization__password").value
        }
        var objS = JSON.stringify(obj)

        let promise = new Promise((resolve, reject) => {
            let xhrd = new XMLHttpRequest();
            xhrd.open("POST", "https://servercgbank.samtsov.com:8090/api/login_check", true);
            xhrd.send(objS);
            xhrd.addEventListener("readystatechange", function () {
                if (this.status === 200) {
                    sessionStorage.setItem("token", JSON.parse(this.responseText).token);
                    resolve(this.responseText)
                }
                else {
                    var error = new Error(this.statusText);
                    if (error !== "OK") {
                        error.code = this.status;
                        reject(error);
                    }
                }
            });
        })
        promise
            .then(
                result => {
                    let result1 = new XMLHttpRequest();
                    result1.open("POST", "https://servercgbank.samtsov.com:8090/user/sends/users/pins", true);
                    result1.setRequestHeader("Authorization", `${sessionStorage.getItem("token")}`)
                    result1.send();
                    result1.addEventListener("readystatechange", function () {
                        if (this.readyState === this.DONE) {
                            hideCildrenElements(authorizationBlock);
                            hideElement(btnBlock.children[1]);
                            showElement(authorizationBlock.children[2]);
                            showElement(btnBlock.children[2]);
                        }
                    });
                },
                error => {
                    hideCildrenElements(authorizationBlock);
                    showElement(authorizationBlock.children[3]);
                    hideElement(btnBlock.children[1]);
                    hideElement(btnBlock.children[2]);
                }
            )
    });



    btnBlock.children[2].addEventListener("click", function () {

        let promise = new Promise((resolve, rejec) => {
            let xhrd = new XMLHttpRequest();
            xhrd.open("POST", "https://servercgbank.samtsov.com:8090/user/verifications", true);
            xhrd.setRequestHeader("Authorization", 'Bearer ' + `${sessionStorage.getItem("token")}`)
            xhrd.setRequestHeader("Content-Type", "application/json");
            let inputPin = document.querySelector(".authorization__pin")
            let testtt = { "pin": `${inputPin.value}` }
            xhrd.send(JSON.stringify(testtt));
            xhrd.addEventListener("readystatechange", function () {
                if (this.status === 200) {
                    sessionStorage.setItem("base", this.responseText)
                    resolve(this.responseText)
                }
                else {
                    var error = new Error(this.statusText);
                    if (error !== "OK") {
                        error.code = this.status;
                        rejec(error);
                    }
                }
            });
        })
        promise
            .then(
                resul => {
                    window.location = `${window.origin}/account.html`;
                },
                error => {
                    hideCildrenElements(authorizationBlock);
                    showElement(authorizationBlock.children[3]);
                    hideElement(btnBlock.children[1]);
                    hideElement(btnBlock.children[2]);
                }
            )
    })


    btnBlock.children[0].addEventListener("click", function () {
        hideCildrenElements(authorizationBlock);
        authorizationBlock.children[0].style.display = "block";
        hideElement(btnBlock.children[0]);
        hideElement(btnBlock.children[1]);
        hideElement(btnBlock.children[2]);
    })
}
// ---------------------------------------------------------parse base------------------------
if (window.location == `${window.origin}/account.html`) {
    if (sessionStorage.getItem("base")) {
        objAccount = JSON.parse(sessionStorage.getItem("base"));
        if (document.querySelectorAll(".menu-info-full-name__text")[1]) {
            document.querySelectorAll(".menu-info-full-name__text")[1].innerText = objAccount.email;
            document.querySelectorAll(".menu-info-full-name__text")[0].innerText = objAccount.client_first_name;
        }

    }
    let userNameHome = document.querySelector(".menu-bord-text-welcome");

    function cteateElementCurrencyRates(currency, rates) {
        let parentCurrencyRates = document.querySelector(".menu-bord-currency-wrap");
        let currencyRatesItem = document.createElement("div");
        let currencyRatesItemCurrency = document.createElement("span");
        let currencyRatesItemRate = document.createElement("span");
        currencyRatesItemCurrency.classList.add("menu-bord_text-normal");
        currencyRatesItemRate.classList.add("menu-bord_text-normal");
        currencyRatesItem.classList.add("menu-bord-currency-item");
        parentCurrencyRates.appendChild(currencyRatesItem);
        currencyRatesItem.appendChild(currencyRatesItemCurrency);
        currencyRatesItem.appendChild(currencyRatesItemRate);
        currencyRatesItemCurrency.innerText = currency || "***";
        currencyRatesItemRate.innerText = rates || "***";
    }
    cteateElementCurrencyRates("GBP: ", " 1.2/1.3");
    cteateElementCurrencyRates("EUR: ", " 1.126665/1.09335");

    function createStatmentAccount() {
        let parentStatmentAccount = document.querySelector(".menu-bord-account-header-table");
        parentStatmentAccount.children[0].children[1].innerText = objAccount.client_id || ""
        parentStatmentAccount.children[1].children[1].innerText = objAccount.client_first_name || ""
        parentStatmentAccount.children[2].children[1].innerText = objAccount.client_last_name || ""
        parentStatmentAccount.children[3].children[1].innerText = objAccount.company_name || ""
        parentStatmentAccount.children[4].children[1].innerText = objAccount.email || ""
        let parentWelcomeName = document.querySelector(".menu-bord-text-welcome");
        parentWelcomeName.children[1].innerText = `${objAccount.client_first_name}${objAccount.client_id}`
    }
    createStatmentAccount();
    function createAccountDetails(count) {
        let parentAccountDetails = document.querySelector(".menu-bord-statement-header-table");
        let accountDetailsItem = document.createElement("div");
        let accountDetailsItemNumberColumn = document.createElement("div");
        let accountDetailsItemNumberColumnLink = document.createElement("a");
        let accountDetailsItemTypeText = document.createElement("span");
        let accountDetailsItemCurrencyText = document.createElement("span");
        let accountDetailsItemStatusText = document.createElement("span");
        let accountDetailsItemDateText = document.createElement("span");
        let accountDetailsItemReasonText = document.createElement("span");
        accountDetailsItem.classList.add("menu-bord-statement-table-row");
        accountDetailsItemNumberColumn.classList.add("menu-bord-statement-table-row-1st-column");
        accountDetailsItemNumberColumnLink.classList.add("menu-bord-statement__number-account-link");
        accountDetailsItemTypeText.classList.add("menu-bord-statement-table-row-2st-column")
        accountDetailsItemTypeText.classList.add("menu-bord_text-normal");
        accountDetailsItemCurrencyText.classList.add("menu-bord-statement-table-row-3st-column");
        accountDetailsItemCurrencyText.classList.add("menu-bord_text-normal");
        accountDetailsItemStatusText.classList.add("menu-bord-statement-table-row-4st-column")
        accountDetailsItemStatusText.classList.add("menu-bord_text-normal");
        accountDetailsItemDateText.classList.add("menu-bord-statement-table-row-6st-column");
        accountDetailsItemDateText.classList.add("menu-bord_text-normal");
        accountDetailsItemReasonText.classList.add("menu-bord-statement-table-row-7st-column");
        accountDetailsItemReasonText.classList.add("menu-bord_text-normal");
        parentAccountDetails.appendChild(accountDetailsItem);
        accountDetailsItem.appendChild(accountDetailsItemNumberColumn);
        accountDetailsItemNumberColumn.appendChild(accountDetailsItemNumberColumnLink);
        accountDetailsItem.appendChild(accountDetailsItemTypeText);
        accountDetailsItem.appendChild(accountDetailsItemCurrencyText);
        accountDetailsItem.appendChild(accountDetailsItemStatusText);
        accountDetailsItem.appendChild(accountDetailsItemDateText);
        accountDetailsItem.appendChild(accountDetailsItemReasonText);
        accountDetailsItemNumberColumnLink.innerText = objAccount.accounts[count].purse_serial_number || "***";
        accountDetailsItemTypeText.innerText = objAccount.accounts[count].account_type || "***";
        accountDetailsItemCurrencyText.innerText = objAccount.accounts[count].currency || "***";
        accountDetailsItemStatusText.innerText = objAccount.accounts[count].status || "***";
        accountDetailsItemDateText.innerText = objAccount.accounts[count].deactivation_date || "***";
        accountDetailsItemReasonText.innerText = objAccount.accounts[count].deactivation_reason || "***";
    }
    if(objAccount.accounts){
        for (let i = 0; i < objAccount.accounts.length; i++) {
            createAccountDetails(i);
        }
    }
}
// -------------------------------------------------------------------------------------------
var arrTabs = document.getElementsByClassName("menu-wrap-item__input");
var blockArrTabs = document.querySelector(".menu-wrap-contain");
var blockArrMenu = document.querySelector(".menu-bord");

if (blockArrTabs) {
    blockArrTabs.addEventListener("click", function () {
        for (let i = 0; i <= arrTabs.length - 1; i++) {
            if (arrTabs[i].checked) {
                document.querySelector(".d-flex").classList.remove("d-flex")
                blockArrMenu.children[i].classList.add("d-flex")
            }
        }
    })
}
//-----------------------------------------open account form---------------------------

if (document.querySelector(".account-open-form__submit")) {
    document.querySelector(".account-open-form__submit").addEventListener("click", e => {
        e.preventDefault();
        let openAccountFormInputBlock = document.getElementsByClassName("account-open-form-block");
        let inputPassword = document.querySelector(".account-open-form__input_password");
        let inputPasswordConfirm = document.querySelector(".account-open-form__input_password-confirm");
        let objOpenAccountFormData = {};
        let getChildElem = e => { return openAccountFormInputBlock[e].children[1] };
        let setErrorOnElem = e => {
            getChildElem(e).classList.add("menu-bord_text-error");
            getChildElem(e).addEventListener("click", () => {
                getChildElem(e).classList.remove("menu-bord_text-error");
                getChildElem(e).value = "";
            })
        }
        
        for (let i = 0; i < openAccountFormInputBlock.length; i++) {
            if (getChildElem(i).value.search(getChildElem(i).getAttribute("pattern")) !== -1) { setErrorOnElem(i) };
            if (inputPassword.value == inputPasswordConfirm.value) {
                setErrorOnElem(inputPassword.parentNode)
                setErrorOnElem(inputPasswordConfirm.parentNode)

            }
            objOpenAccountFormData[openAccountFormInputBlock[i].children[0].innerText] = getChildElem(i).value;
        }
        console.log(inputPassword.value)
        console.log(inputPasswordConfirm.value)

        if (!document.querySelector(".menu-bord_text-error")) {
            console.log(objOpenAccountFormData)
            let formBlockHide = document.querySelector(".form-block-hide");
            let accountOpenResolve = document.querySelector(".account-open-resolve");
            formBlockHide.style.display = "none";
            accountOpenResolve.style.display = "block";
        }
    })
}


var beneficiaryClose = document.querySelector(".menu-bord-beneficiary-add__create-back");
var beneficiaryAdd = document.querySelector(".menu-beneficiary-label");
var beneficiaryblock = document.querySelector(".menu-beneficiary-block");
var beneficiaryaddBlock = document.querySelector(".menu-beneficiary-add");
if (beneficiaryAdd) {
    beneficiaryAdd.addEventListener("click", function () {
        beneficiaryAdd.classList.add("hidden");
        beneficiaryblock.classList.add("hidden");
        beneficiaryaddBlock.classList.remove('hidden');
        beneficiaryaddBlock.classList.add('visible');

    })
}
if (beneficiaryClose) {
    beneficiaryClose.addEventListener("click", function (e) {
        e.preventDefault();
        beneficiaryAdd.classList.remove("hidden");
        beneficiaryblock.classList.remove("hidden");
        beneficiaryaddBlock.classList.add('hidden');
        beneficiaryaddBlock.classList.remove('visible');
    })
}
//------------------------------------------------------------------------------------