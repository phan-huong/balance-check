"use strict";

$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html('');
    let apiToken = $("#apiToken").data("token");
    $.get("/api/categories?apiToken=${apiToken}", (results = {}) => {
      let data = results.data;
      if (!data || !data.categories) return;
      data.categories.forEach((category) => {
        $(".modal-body").append(
          `<div>
            <span class="category-category">
              <b>${category.category}</b>
            </span>
            <div class="category-description">
              €${category.description}
            </div>
          </div>`
        );
      });
    });
  });
});

function setVisibility(id, visibility) {
  document.getElementById(id).style.display = visibility;
}

function myBalance(input, output) {
  var val = document.getElementById(input).value;
  var number = new Intl.NumberFormat("de-De", { //"en-GB" "en-GB"
    style: "currency",
    currency: "EUR" //"GBP" "USD"
  })
  document.getElementById(output).innerHTML = "Your balance is: " + number.format(val);
}

function mySpend(input, output) {
  var val = document.getElementById(input).value;
  var obj = document.getElementById('selectCategory');
  var number = new Intl.NumberFormat("de-De", {
    style: "currency",
    currency: "EUR"
  })
  if (obj.options[obj.selectedIndex].text != "Custom") {
    document.getElementById(output).innerHTML = "Spending on " + obj.options[obj.selectedIndex].text + ": " + number.format(val);
  } else {
    // when select custom, create new field, where user can input text
    document.getElementById(output).innerHTML = "";
  }
}

function subtract(inputBalance, inputSpending, output) {
  var balance = document.getElementById(inputBalance).value;
  var spend = document.getElementById(inputSpending).value;
  var number = new Intl.NumberFormat("de-De", {
    style: "currency",
    currency: "EUR"
  })
  // Display subtraction
  document.getElementById(output).innerHTML = "Your end balance: " + number.format(balance-spend);
}
