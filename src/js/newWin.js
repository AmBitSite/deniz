let objFieldsName = JSON.parse(sessionStorage.getItem("beneficiary"));
document.body = document.createElement("body");
let logo = document.createElement("img");
let h4 = document.createElement("h4");
let h2 = document.createElement("h2");
document.body.append(logo);
document.body.append(h4);
document.body.append(h2);
logo.style.margin = "10px 23px";
logo.style.width = "200px";
h2.innerText = "Beneficiary Details:";
h2.style.color = "#949494";
h2.style.marginLeft = "23px";
h4.style.color = "#949494";
h4.style.marginLeft = "23px";
document.body.style.margin = "0";
logo.setAttribute("src", "img/logo1.png");
h4.innerText = correctData(objFieldsName["Transaction Number"]);
function addStyleRow(elem) {
    elem.style.padding = "10px 23px";
    elem.style.backgroundColor = "#fefefe";
    elem.style.color = "#949494";
    elem.style.borderBottom = "1px solid #949494";
}
function addStyleHeader(elem){
    elem.style.display = "inline-flex";
    elem.style.width = "200px";
    
}
for (key in objFieldsName) {
    let newWinBlock = document.createElement("div");
    let newWinBlockSpanHeader = document.createElement("span");
    let newWinBlockSpanText = document.createElement("span");
    newWinBlockSpanHeader.innerText = key;
    newWinBlockSpanText.innerText = objFieldsName[key];
    document.body.append(newWinBlock);
    newWinBlock.appendChild(newWinBlockSpanHeader);
    newWinBlock.appendChild(newWinBlockSpanText);
    addStyleRow(newWinBlock);
    addStyleHeader(newWinBlockSpanHeader);
}
function correctData(i) {
    let text = i;
    let arr = text.split("-");
    return timeConverter(arr[1])
}
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + '.' + month + '.' + year;
    return time;
}
