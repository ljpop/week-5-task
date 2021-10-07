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
        console.log("not ok");
        document.querySelector(".errorMessage").classList.add("visible");
      } else {
        document.querySelector(".errorMessage").classList.remove("visible");
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
