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
    xhr.open("GET", "https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-09-01&symbols=ILS,JPY", true);
    xhr.send()
})
