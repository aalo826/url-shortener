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
      errorMsg.style.visibility = "hidden";
      // Changing style of div to no errors
      document.getElementById("url-input").className = "url-input-style";

      return data.json();

    } else if (data.ok === false) {
      // shows error message
      errorMsg.style.visibility = "visible";
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
  // Targets the input form
  const form = document.querySelector("#form-submit");

  // Full short link of URL
  const shortenUrl = document.createElement('li');
  shortenUrl.innerHTML = data.result.full_short_link;

  // Container holding Copy button and shortened Link
  const shortCopy = document.createElement('ul');
  shortCopy.classList.add('short-copy')

  // Shorten Link
  const url = document.createElement('li');
  url.innerHTML = data.result.original_link;

  // Copy Button
  const copyButton = document.createElement('li');
  copyButton.classList.add ('copy-button');
  copyButton.innerHTML = `Copy`;


  // appending
  const ul = document.createElement("ul");
  ul.classList.add("short-url");

  ul.appendChild(url);
  ul.appendChild(shortCopy);
  shortCopy.appendChild(shortenUrl);
  shortCopy.appendChild(copyButton);

  document.querySelector("#url-container").appendChild(ul);


  // Click Event for when the Copy Button is clicked
  copyButton.addEventListener('click', copyFunction);

  function copyFunction() {
    const copied = data.result.short_link;
    navigator.clipboard.writeText(copied).then( () => {
      setTimeout(copiedMsg, 0)
      setTimeout(copyMsg, 2000)

      function copiedMsg () {
        copyButton.classList.replace("copy-button", "copied-button");
        copyButton.innerHTML = `Copied!`;
      }

      function copyMsg() {
        copyButton.classList.replace("copied-button", "copy-button");
        copyButton.innerHTML = `Copy`;
      }
    });
  }

  // clears inupt field
  form.reset();
}

urlApp.hamburgerMenu = function () {
  const navContent = document.getElementById("nav-content")
  const page = document.querySelector("*")
  navContent.style.visibility = "hidden"
  navContent.style.left = "120%"


  // Hamburger Dropdown
  document.querySelector("#hamburger-dropdown").addEventListener
  ("click", function (event) {
    // sliding in animation for hamburger menu
    if (navContent.style.left === "120%") {
      navContent.style.left = "0%";
      page.style.overflow = "hidden";
      document.querySelector("#nav-content").style.transition = "ease-in 0.5s";
    } else if (navContent.style.left === "0%") {
      navContent.style.left = "120%";
      page.style.overflow = "scroll";
      document.querySelector("#nav-content").style.transition = "ease-in 0.5s";
    }
    // hides and shows the element
    if (navContent.style.visibility === "hidden") {
      navContent.style.visibility = "visible";
    } else if (navContent.style.visibility === "visible") {
      navContent.style.visibility = "hidden";
    }
  })



  // Targets all anchors in navigation
  const navContentOne = document.getElementsByClassName("nav-anchor");
  // Makes all anchors into an array
  const anchorArray = [].slice.call(navContentOne)
  // For each loop through the array to attach event listeners to all anchors
  anchorArray.forEach((li) => {
    li.addEventListener ('click', () => {
      // removes hamburger menu if any of the list items are clicked
      if (navContent.style.left === "0%") {
        navContent.style.left = "120%";
        navContent.style.visibility = "hidden";
        page.style.overflow = "scroll";
      }
    })
  })

}

urlApp.init = function () {
  console.log("init successs")
  urlApp.hamburgerMenu();
  urlApp.getUserInput();
}

urlApp.init();