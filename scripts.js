// Namespace urlApp
const urlApp = {};

urlApp.getUserInput = function () {
  document.querySelector("#url-submit").addEventListener

  ("click", function (event) {
    event.preventDefault();
    const urlData = document.getElementById('url-input').value;

    // console.log(urlInput);
    urlApp.shortenUrl(urlData);
  })
}


urlApp.shortenUrl = function (query) {
  const url = (`https://api.shrtco.de/v2/shorten?url=${query}`);

  fetch(url)
  .then(function (data) {
    return data.json();
  })
  .then(function (jsonData) {
    urlApp.displayUrl(jsonData);
  })
}

urlApp.displayUrl = function (data) {
  console.log(data.result.full_short_link);

  // document.querySelector("#url-container").innerHTML = "";
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