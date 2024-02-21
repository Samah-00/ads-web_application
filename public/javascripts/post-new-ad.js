// Function to get the value of a cookie by its name
function getCookie(name) {
    const cookiesDecoded = decodeURIComponent(document.cookie);
    const cookiesArray = cookiesDecoded.split("; ");
    let result = null;

    cookiesArray.forEach(cookie => {
        if (cookie.indexOf(name) === 0) {
            result = cookie.substring(name.length + 1);
        }
    });

    return result;
}

async function fetchRecentAdInfo(adId) {
    try {
        // Send GET request to retrieve ad's info
        const response = await fetch(`http://localhost:3000/ads/${adId}`);
        if (response.ok) {
            const adInfo = await response.json();
            return adInfo;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

function buildWelcomeMessage(adInfo) {
    const welcomeContainer = document.getElementById('welcomeMessageContainer');

    if (adInfo.approved) {
        const welcomeMessage = document.createElement("p");
        welcomeMessage.textContent = `Welcome back ${adInfo.email}, your ad was successfully approved on ${adInfo.updatedAt}`;
        welcomeContainer.appendChild(welcomeMessage);
    } else {
        const waitingMessage = document.createElement('p');
        waitingMessage.textContent = `Welcome back ${adInfo.email}, your previous ad is waiting for approval`;
        welcomeContainer.appendChild(waitingMessage);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    // Get the value of the "adId" cookie
    const adId = getCookie("RecentAdId");
    // Check if adId exists
    if (adId) {
        const recentAdInfo = await fetchRecentAdInfo(adId);
        if (recentAdInfo) {
            buildWelcomeMessage(recentAdInfo);
        }
    }
});