// Namespace urlApp
const urlApp = {};

urlApp.getUserInput = function () {
  document.querySelector("#url-submit").addEventListener

  ("click", function (event) {
    event.preventDefault();
    const urlData = document.getElementById('url-input').value;

    // console.log(urlInput);
    urlApp.shorten(urlData);
  })
}


urlApp.shorten = function (query) {
  const url = (`https://api.shrtco.de/v2/shorten?url=${query}`);

  fetch(url)
  .then(function (data) {
    return data.json();
  })
  .then(function (jsonData) {
    jsonData.result.full_short_link;
    console.log(jsonData.result.full_short_link);
  })
}

urlApp.init = function () {
  console.log("init successs")
  urlApp.getUserInput();
}

urlApp.init();