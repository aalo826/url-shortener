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

// Grabbing API Data
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

// Appending data to the webpage
urlApp.displayUrl = function (data) {
  console.log(data)

  const shortenUrl = document.createElement('li');
  shortenUrl.innerHTML = data.result.full_short_link;

  const shortCopy = document.createElement('ul');
  shortCopy.classList.add('short-copy')

  const url = document.createElement('li');
  url.innerHTML = data.result.original_link;

  const copyButton = document.createElement('li');
  copyButton.classList.add("copy-button");
  copyButton.innerHTML = `Copy`;

  // appending
  const ul = document.createElement("ul");
  ul.classList.add("short-url");

  ul.appendChild(url);
  ul.appendChild(shortCopy);
  shortCopy.appendChild(shortenUrl);
  shortCopy.appendChild(copyButton);

  document.querySelector("#url-container").appendChild(ul);
}

urlApp.init = function () {
  console.log("init successs")
  urlApp.getUserInput();
}

urlApp.init();