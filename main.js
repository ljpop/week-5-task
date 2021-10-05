const username = "ljpop";
const GIT_URL = fetch("https://api.github.com/users/" + username);

const promise = GIT_URL;

promise
  .then(function (response) {
    const processingPromise = response.json();
    return processingPromise;
  })
  .then(function (processedResponse) {
    console.log(processedResponse);
    console.log(processedResponse.login);
  });
