//---------Light-Mode----------------------------------------//
let darkMode = false;

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  darkModeProperties();
}

const changeTheme = function () {
  if (darkMode == false) {
    darkModeProperties();

    console.log("Tamna TEMA");
  } else {
    lightModeProperties();
    console.log("SVETLA TEMA");
  }
};

const addTheme = function (selector) {
  if (selector.length == 1)
    document.querySelector(selector).classList.add("darkmode");
  else
    document
      .querySelectorAll(selector)
      .forEach((el) => el.classList.add("darkmode"));
};

const removeTheme = function (selector) {
  if (selector.length == 1)
    document.querySelector(selector).classList.remove("darkmode");
  else
    document
      .querySelectorAll(selector)
      .forEach((el) => el.classList.remove("darkmode"));
};

function darkModeProperties() {
  addTheme("body");
  addTheme(".statistics");
  addTheme(".number-stat");
  addTheme("h1");
  addTheme(".user-container");
  addTheme("form");
  addTheme("link-info");
  addTheme("input");

  document.querySelector(".light").classList.add("display");
  document.querySelector(".dark").classList.remove("display");

  darkMode = true;
}
function lightModeProperties() {
  removeTheme("body");
  removeTheme(".statistics");
  removeTheme(".number-stat");
  removeTheme("h1");
  removeTheme("form");
  removeTheme("input");
  removeTheme(".user-container");

  removeTheme("link-info");

  document.querySelector(".light").classList.remove("display");
  document.querySelector(".dark").classList.add("display");

  darkMode = false;
}

//---------Functions----------------------------------------//
const formatDate = function (date) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-GB", options);
};

const getText = function (id, data, error) {
  if (data) document.getElementById(id).textContent = data;
  else document.getElementById(id).textContent = error;
};

const removeError = function () {
  document.querySelector(".errorMessage").classList.remove("visible");
};

const addError = function () {
  console.log("not ok");
  document.querySelector(".errorMessage").classList.add("visible");
  document.getElementById("username").placeholder = "";
  document.getElementById("username").value = "";
};

const getLink = function (id, data) {
  if (data) document.getElementById(id).href = data.blog;
};
//----------Form----------------------------------//
const doSearch = function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const GIT_URL = "https://api.github.com/users/" + username;
  const promise = fetch(GIT_URL);

  promise
    .then(function (response) {
      if (!response.ok) return false;
      else {
        const processingPromise = response.json();
        return processingPromise;
      }
    })
    .then(function (processedResponse) {
      if (!processedResponse) {
        addError();
      } else {
        removeError();
        const data = processedResponse;
        document.querySelector(".avatar-big").src = data.avatar_url;
        document.querySelector(".avatar-small").src = data.avatar_url;
        getText("name", data.name);
        getText("login", `@${data.login}`);
        getText("company", data.company, "Not Available");
        getText("date_created", formatDate(data.created_at));
        getText("reposNum", data.public_repos, "0");
        getText("followers", data.followers, "0");
        getText("following", data.following, "0");
        getText("location", data.location, "Not Available");
        getLink("link-blog", data.blog);
        getText("blog", data.blog, "Not Available");
        getText("bio", data.bio, "This profile has no bio");
        getText("twitter", data.twitter_username, "Not Available");
      }
    });
};
