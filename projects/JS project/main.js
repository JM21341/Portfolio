var num1 = document.querySelector("#num1").value;
var num2 = document.querySelector("#num2").value;

let headingSelector = document.getElementsByTagName("h2");

function addBtn(){
    let result = num1 + num2;

    headingSelector.innerhtml = result;
}