// const { response } = require("express");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#error");
const messageTwo = document.querySelector("#data");

console.log(weatherForm);
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Krauname...";
  messageTwo.textContent = "";
  const location = search.value;
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          console.log(data.error);
        } else {
          messageOne.textContent = "";
          messageTwo.textContent = `Vieta: ${data.location} Oro temperatūra: ${data.temperature}, jutimine tem: ${data.jutimine_t}`;
          console.log(data);
        }
      });
    }
  );
});
