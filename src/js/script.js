var test = document.querySelector(".input__mail");
var test1 = document.querySelector(".form-send__dynamic-text");
if (test) {
    test.addEventListener("keyup", function () {
        test1.innerText = test.value;
    })
}

var arrMoney = ['CNY', 'CHF', 'GBP', 'USD', 'TRY'];
var moneyName = document.querySelectorAll(".info-converter-row__name");
var moneyValue = document.querySelectorAll(".info-converter-row__value");

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;
xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        for (var i = 0; i < moneyName.length; i++) {
            moneyName[i].innerText = arrMoney[i]
            moneyValue[i].innerText = JSON.parse(this.responseText).rates[arrMoney[i]]
        }
    }
});
xhr.open("GET", "https://api.exchangeratesapi.io/latest?base=EUR", true);
xhr.send()


var blockNews = document.getElementsByClassName("info-news-block");

var xhrN = new XMLHttpRequest();
xhrN.withCredentials = false;
xhrN.addEventListener("readystatechange", function () {
    for(var j = 0; j<blockNews.length;j++){
        blockNews[j].setAttribute('href', JSON.parse(this.responseText).articles[j].url)
        blockNews[j].firstElementChild.innerText = JSON.parse(this.responseText).articles[j].title
    }
});
xhrN.open("GET", "https://newsapi.org/v2/top-headlines?category = business&sources=bloomberg&apiKey=d5ab78edfa2649a6b0fd66a7cf1c2c68", true);
xhrN.send()

var arrCryptoMoney = ['BTC', 'ETH', 'BCH', 'USDT', 'LTC'];
var moneyCryptoName = document.querySelectorAll(".info-converter-crypto-row__name");
var moneyCryptoValue = document.querySelectorAll(".info-converter-crypto-row__value");
var xhrC = new XMLHttpRequest();
xhrC.withCredentials = false;
xhrC.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        for (var i = 0; i < arrCryptoMoney.length; i++) {
            moneyCryptoName[i].innerText = arrCryptoMoney[i]
            moneyCryptoValue[i].innerText = JSON.parse(this.responseText)[arrCryptoMoney[i]]
        }
    }
});
xhrC.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=EUR&tsyms=BTC,ETH,BCH,USDT,LTC&apiKey=bb98291570d521612ebd320b47a541e57dd03581bc116ddeb19abb62e7a306a6", true);
xhrC.send()



var sliderParent = document.querySelector(".slider-wrap")
var sliderControls = document.querySelector(".slider-control")
var slideItem1 = document.querySelector(".slider-wrap__1")
var slideItem2 = document.querySelector(".slider-wrap__2")
var slideItem3 = document.querySelector(".slider-wrap__3")

sliderControls.addEventListener("click", (e)=>{
    var btnSlider = e.target;
    var activeClass = document.querySelector(".slider-control__item_active")
    if(activeClass){
        activeClass.classList.remove("slider-control__item_active")
        btnSlider.classList.add("slider-control__item_active")
        var activeClass = document.querySelector(".slider-control__item_active")
        if(activeClass.innerText === "Corporate Banking"){
            slideItem1.style.display = "flex";
            slideItem2.style.display = "none";
            slideItem3.style.display = "none";
        }
        else if(activeClass.innerText === "Crypto Desk"){
            slideItem1.style.display = "none";
            slideItem2.style.display = "flex";
            slideItem3.style.display = "none";
        }
        else if(activeClass.innerText === "Fatca/CRS"){
            slideItem1.style.display = "none";
            slideItem2.style.display = "none";
            slideItem3.style.display = "flex";
        }
    }
    console.log(e.target)
})