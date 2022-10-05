// Namespace urlApp
const urlApp = {};

urlApp.getUserInput = function () {
  document.querySelector("#url-shorten").addEventListener
  ("click", function (event) {

    console.log("it worked")
    event.preventDefault();
    const urlData = document.getElementById('url-input').value;

    urlApp.shortenUrl(urlData);
  })
}


urlApp.shortenUrl = function (query) {
  const url = (`https://api.shrtco.de/v2/shorten?url=${query}`);

  const errorMsg = document.getElementById("error-msg");

  fetch(url)
  .then(function (data) {
    if (data.ok === true) {
      // hides error message
      errorMsg.style.display = "none";
      // Changing style of div to no errors
      document.getElementById("url-input").className = "url-input-style";

      return data.json();

    } else if (data.ok === false) {
      // shows error message
      errorMsg.style.display = "block";
      // Changing style of div to errors occured.
      document.getElementById("url-input").className = "url-input-error-style";

      throw new Error("User didn't input a valid website");
    }
  })
  .then(function (jsonData) {
  urlApp.displayUrl(jsonData);
  })
  .catch((err) => {
    console.log(err)
  })
}

urlApp.displayUrl = function (data) {
  console.log(data.result.full_short_link);

  const url = document.createElement('li')
  url.innerHTML = data.result.full_short_link;


  // appending
  const ul = document.createElement("ul");
  ul.classList.add("short-url");

  ul.appendChild(url);

  document.querySelector("#url-container").appendChild(ul);
}

urlApp.init = function () {
  console.log("init successs")
  urlApp.getUserInput();
}

urlApp.init();