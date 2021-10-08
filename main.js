//---------Light-Mode----------------------------------------//
let darkMode = false;

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  darkModeProperties();
}

document.querySelector(".light-mode").addEventListener("click", function () {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});

function darkModeProperties() {
  document.querySelector("body").classList.add("darkmode");
  document.querySelector(".statistics").classList.add("darkmode");
  document.querySelectorAll(".number-stat").classList.add("darkmode"); /*TODO:*/
  // root.setProperty("--lm-bg", "#141D2F");
  // root.setProperty("--lm-bg-content", "#1E2A47");
  // root.setProperty("--lm-text", "white");
  // root.setProperty("--lm-text-alt", "white");
  // root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  // modetext.innerText = "LIGHT";
  // modeicon.src = "./assets/icon-sun.svg";
  // root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
}
function lightModeProperties() {
  // root.setProperty("--lm-bg", "#F6F8FF");
  // root.setProperty("--lm-bg-content", "#FEFEFE");
  // root.setProperty("--lm-text", "#4B6A9B");
  // root.setProperty("--lm-text-alt", "#2B3442");
  // root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  // modetext.innerText = "DARK";
  // modeicon.src = "./assets/icon-moon.svg";
  // root.setProperty("--lm-icon-bg", "brightness(100%)");
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
        document.getElementById("avatar").src = data.avatar_url;
        getText("name", data.name);
        getText("login", `@${data.login}`);
        getText("company", data.company, "Not Available");
        getText("date_created", formatDate(data.created_at));
        getText("reposNum", data.public_repos, "0");
        getText("followers", data.followers, "0");
        getText("following", data.following, "0");
        getText("location", data.location, "Not Available");
        document.getElementById("link-blog").href = data.blog;
        getText("blog", data.blog, "Not Available");
        getText("bio", data.bio, "This profile has no bio");
        getText("twitter", data.twitter_username, "Not Available");
      }
    });
};
