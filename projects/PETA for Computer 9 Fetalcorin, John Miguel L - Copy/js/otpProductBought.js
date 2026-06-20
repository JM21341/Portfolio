let getBody = document.body;

let newElement = document.createElement("h1");

let name = document.querySelector("#fname");

let selectEle = document.querySelector("#TxtNode");

let timeCheck = new Time();
let hourCheck = timeCheck.getHours;

let createTxtMsgs = selectEle.innerHTML;

if (hourCheck => 6 && hourCheck < 12) {
  createTxtMsgs = "Good Morning" + name + "! Thank you for buying our product!";
} else if (hourCheck => 12 && hourCheck < 18) {
  createTxtMsgs = "Good Afternoon" + name + "! Thank you for buying our product!";
} else if (hourCheck => 18 && hourCheck == 22) {
  createTxtMsgs = "Good Evening" + name + "! Thank you for buying our product!";
} else if (hourCheck > 22 && hourcheck < 6) {
  createTxtMsgs = "Sorry we are closed, try buying our product tomorrow. Thank you"
} else /* Error Check */ {
  let errorDetect = "There was an error!";
  alert(errorDetect);
}

let createEleTxts = document.createTextNode(createTxtMsgs);

newElement.appendChild(newElement);

newElement.setAttribute("id", "txtMsg");

// -- End -- //
