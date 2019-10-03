var test = document.querySelector(".input__mail");
var test1 = document.querySelector(".form-send__dynamic-text");
test.addEventListener("keyup", function(){
    test1.innerText = test.value;
})