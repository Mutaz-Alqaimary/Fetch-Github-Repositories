let theInput = document.querySelector(".repo-container .get-repo input");
let showData = document.querySelector(".repo-container .get-repo .show-data");
let repoData = document.querySelector(".repo-container .get-data");

showData.onclick = function () {
  getRepos();
};

function getRepos() {
  if (theInput.value == "") {
    repoData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((repositories) => {
        repoData.innerHTML = "";

        repositories.forEach((repo) => {
          let mainDiv = document.createElement("div");

          // Create Repo Name Text
          let repoName = document.createTextNode(repo.name);

          // Append The Text To Main Div
          mainDiv.appendChild(repoName);

          // Create Repo URL Anchor
          let theUrl = document.createElement("a");

          // Create Repo Url Text
          let theUrlText = document.createTextNode("Visit");

          // Append The Repo Url Text To Anchor Tag
          theUrl.appendChild(theUrlText);

          // Add Thje Hypertext Reference "href"
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

          // Set Attribute Blank
          theUrl.setAttribute("target", "_blank");

          // Append Url Anchor To Main Div
          mainDiv.appendChild(theUrl);

          // Create Stars Count Span
          let starsSpan = document.createElement("span");

          // Create The Stars Count Text
          let starsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );

          // Add Stars Count Text To Stars Span
          starsSpan.appendChild(starsText);

          // Append Stars Count Span To Main Div
          mainDiv.appendChild(starsSpan);

          // Add Class On Main Div
          mainDiv.className = "repo-box";

          // Append The Main Div To Container
          repoData.appendChild(mainDiv);
        });
      });
  }
}
