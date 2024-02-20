function fetchAndDisplayApprovedAds() {
    // Fetch approved ads and display them on the landing page
    fetch('http://localhost:3000/ads/approved')
        .then(response => response.json())
        .then(ads => {
            const adsContainer = document.getElementById('ads-container');
            if (ads.length === 0) {
                // Display a message if there are no ads
                adsContainer.innerHTML = '' +
                    '<div id="empty-ad-message-container">' +
                    '<p>No ads available at the moment 💔</p>' +
                    '</div>';
            } else {
                // Display ads if there are any
                ads.forEach(ad => {
                    const adCard = createAdCard(ad); // Create a card for each ad
                    adsContainer.appendChild(adCard);
                });
            }
        })
        .catch(error => console.error('Error fetching ads:', error));
}

function createAdCard(ad) {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');

    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${ad.title}</h5>
            <p class="card-text">${ad.description}</p>
            <p class="card-text">Price: $${ad.price}</p>
        </div>
        <div class="card-footer custom-footer">
            <ul class="list-inline">
                <li class="list-inline-item">
                    <span class="icon"><i class="fas fa-phone-alt"></i></span>
                    <span>${ad.phone_number}</span>
                </li>
                <li class="list-inline-item">
                    <span class="icon"><i class="fas fa-envelope"></i></span>
                    <span>${ad.email}</span>
                </li>
            </ul>
        </div>
    `;

    return card;
}

// Function to show success notification
function showNotification() {
    const notification = document.createElement("div");
    notification.textContent = "your ad was successfully posted and is waiting for approval";
    notification.classList.add("notification");
    const container = document.getElementById("notificationContainer");
    container.appendChild(notification);
    container.style.visibility = 'visible';
    setTimeout(() => {
        container.style.visibility = 'hidden';
        container.removeChild(notification);
    }, 4000);
}

// Fetch and display approved ads
document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayApprovedAds();
});