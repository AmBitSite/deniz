var test = document.querySelector(".input__mail");
var test1 = document.querySelector(".form-send__dynamic-text");
if (test) {
    test.addEventListener("keyup", function () {
        test1.innerText = test.value;
    })
}
var test3 = document.querySelector(".test");
var arrMoney =['CNY','CHF','GBP','USD', 'TRY'];
var moneyName = document.querySelectorAll(".info-converter-row__name");
var moneyValue = document.querySelectorAll(".info-converter-row__value");
test3.addEventListener('click', ()=>{
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText)
            // for(var i = 0; i<=moneyName.length; i++){
            //     moneyName[i].innerText = arrMoney[i]
            //     moneyValue[i].innerText=JSON.parse(this.responseText).rates[arrMoney[i]]
            // }
        }
    });
    xhr.open("GET", "https://data.fixer.io/api/latest?access_key=645238903eda58c949c022307aa13dcc", true);
    xhr.send()
})
