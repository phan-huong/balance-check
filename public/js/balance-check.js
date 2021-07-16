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
              ${category.description} €${category.nominal}
            </div>
          </div>`
        );
      });
    });
  });

  outputMessage('Welcome to our chatbox!', 'Chatbot');
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


// Adding client-side JS for socket.io
const socket = io();

// Message submit
window.onload = function() {

  const chatMessages = document.getElementById('chat');

  // Message from the server
  socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }); 

  var chat_form = document.getElementById('chatForm');
  if (chat_form) {
    chat_form.addEventListener('submit', (e) => {
      e.preventDefault();
    
      const msg = e.target.elements.chatInput.value;
      // console.log(msg);
      socket.emit('chatMessage', msg);

      // Clear input
      e.target.elements.chatInput.value = '';
      e.target.elements.chatInput.focus();
    });
  }
}

const format_date = (now) => {
  let hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
  let minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
  return (hours + ':' + minutes);
}


// Output Message to DOM
const outputMessage = (message, chatbot) => {
  if (message) {
    const div = document.createElement('div');
    div.classList.add('newMessage');
    let userName = chatbot ? chatbot : $('#chatUsername').val();
    if (chatbot) {
      div.innerHTML = `<p class="msgLabel">${chatbot} at ${format_date(new Date())}</p><p>${message}</p>`;
    } else {
      div.innerHTML = `<p class="msgLabel">${userName} at ${message.time}</p><p>${message.text}</p>`;
    }
    // div.innerHTML = `<p class="msgLabel">${userName} at ${message.time}</p><p>${message.text}</p>`;
    document.getElementById('chat').appendChild(div);
  }
}
