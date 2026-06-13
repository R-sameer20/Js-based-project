const developerId = document.querySelector("[data-searchedDeveloperId]");
const developerImage = document.querySelector("[data-imageOfDeveloper]");
const developerName = document.querySelector("[data-nameofDeveloper]");
const developerIdContainer = document.querySelector("[data-gitIdOfDeveloper]");
const developerSignUpDate = document.querySelector("[data-dateOfSignUp]");
const developerBio = document.querySelector("[data-bioOfDeveloper]");

const developerRepos = document.querySelector("[data-repoInfo]");
const developerFollowers = document.querySelector("[data-followerInfo]");
const developerFollowing = document.querySelector("[data-followingInfo]");

const locationInfo= document.querySelector("[data-locationInfo]");
const twitterInfo = document.querySelector("[data-twitterInfo]");
const blogInfo = document.querySelector("[data-blogInfo]");
const companyInfo = document.querySelector("[data-companyInfo]");

document.addEventListener("DOMContentLoaded", () => {
    const standardDeveloperId = "torvalds";
    fetchDeveloperData(standardDeveloperId);
});

async function fetchDeveloperData(developerId){
    try{
        const response = await fetch (`https://api.github.com/users/${developerId}`);
        const data = await response.json();

        if(data.message === "Not Found"){
            throw new Error("Developer not found");
        }
        else renderDeveloperData(data);
    }
    catch (err){
        console.error(err);
    }

    
}

async function renderDeveloperData(data){
    developerImage.src = data.avatar_url;
    developerName.innerText = data.name || "No name available";
    developerIdContainer.innerText = data.login;
    developerSignUpDate.innerText = `Joined on ${new Date(data.created_at).toLocaleDateString()}`
    developerBio.innerText = data.bio || "No bio available";

    developerRepos.innerText = data.public_repos;
    developerFollowers.innerText = data.followers;
    developerFollowing.innerText = data.following;

    locationInfo.innerText = data.location || "No location available";
    twitterInfo.innerText = data.twitter_username || "No Twitter available";
    blogInfo.innerText = data.blog || "No blog available";
    companyInfo.innerText = data.company || "No company available";

}


const searchedDeveloperInInput = document.querySelector("[data-searchedDeveloperId]");
const searchButton = document.querySelector("[data-searchButton]");

searchButton.addEventListener("click" , () => {
    const developerId = searchedDeveloperInInput.value.trim();
    if(developerId === "") return;
    else fetchDeveloperData(developerId);

});

// const clearSearchButton = document.querySelector("[data-clearSearch]");
// clearSearchButton.addEventListener("click" , () => {
//     searchInput.value = ""; });

const modeToggleButton = document.querySelector("[data-modeOfPage]");
modeToggleButton.addEventListener("click" , () => {
    document.body.classList.toggle("dark-mode");
    modeToggleButton.classList.toggle("active");
});
