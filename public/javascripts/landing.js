
// Function to show success notification
function showNotification() {
    const notification = document.createElement("div");
    notification.textContent = "your ad was successfully posted and is waiting for approval 👍";
    notification.classList.add("notification");
    const container = document.getElementById("notificationContainer");
    container.appendChild(notification);
    container.style.visibility = 'visible';
    setTimeout(() => {
        container.style.visibility = 'hidden';
        container.removeChild(notification);
    }, 5000);
}

// Function to set cookie for recent ad info
function setCookie() {
    // Get adId from query parameters
    const adId = getQueryParam('adId');

    // Check if adId is not null or undefined
    if (adId) {
    // Set adId as a cookie
    document.cookie = `RecentAdId=${adId};`;
    }
}

// Function to parse query parameters from URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

document.addEventListener("DOMContentLoaded", () => {
    loader.style.visibility = 'visible'; //show the loader gif until fetch in done
    fetchAds('http://localhost:3000/ads/approved')
        .then(approvedAds => {
            loader.style.visibility = 'hidden';
            displayAds(approvedAds, false);
        });
    document.getElementById('searchForm').addEventListener('submit', async (event) => {
       await searchAds(event);
    });
});