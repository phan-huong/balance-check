"use strict";

function setVisibility(id, visibility) {
  document.getElementById(id).style.display = visibility;
}

function myBalance(input, output) {
  var m = document.getElementById(input).value;
  var number = new Intl.NumberFormat("de-De", { //"en-GB" "en-GB"
    style: "currency",
    currency: "EUR" //"GBP" "USD"
  })
  document.getElementById(output).innerHTML = "Your balance is: " + number.format(m);
}

function mySpend(input, output) {
  var m = document.getElementById(input).value;
  var number = new Intl.NumberFormat("de-De", { //"en-GB" "en-GB"
    style: "currency",
    currency: "EUR" //"GBP" "USD"
  })
  document.getElementById(output).innerHTML = "Spending: " + number.format(m);
}
