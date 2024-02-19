function fetchAndDisplayApprovedAds() {
    // Fetch approved ads and display them on the landing page
    fetch('http://localhost:3000/ads/approved')
        .then(response => response.json())
        .then(ads => {
            const adsContainer = document.getElementById('ads-container');
            ads.forEach(ad => {
                const adCard = createAdCard(ad); // Create a card for each ad
                adsContainer.appendChild(adCard);
            });
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

    // Add styling for custom footer background color
    const customFooter = card.querySelector('.custom-footer');
    customFooter.style.backgroundColor = '#CBC3E3'; // Change to 'lightpurple' for light purple color

    return card;
}

document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayApprovedAds();
});