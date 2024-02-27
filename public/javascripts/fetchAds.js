const loader = document.getElementById('loader');

function fetchAds(url) {
    loader.style.visibility = 'visible'; //show the loader gif until fetch in done
    return fetch(url)
        .then(response => {
            loader.style.visibility = 'hidden';
            if (response.status === 401) {
                window.location.href = '/login?unauthorized=true'; // Redirect to login page with unauthorized message
            }
            return response.json();
        })
        .then(ads => {
            return ads;
        })
        .catch(error => {
            loader.style.visibility = 'hidden';
            console.error('Error fetching ads:', error);
            return []; // Return an empty array in case of an error
        });
}

function displayAds(ads, emptyMessage = 'No ads available at the moment 💔') {
    const adsContainer = document.getElementById('ads-container');
    if (ads.length === 0) {
        // Display a message if there are no ads
        adsContainer.innerHTML = '' +
            '<div id="empty-ad-message-container">' +
            '<p>' + emptyMessage + '</p>' + // Insert the emptyMessage
            '</div>';
    } else {
        adsContainer.innerHTML = '';
        // Display ads if there are any
        ads.forEach(ad => {
            const adCard = createAdCard(ad); // Create a card for each ad
            adsContainer.appendChild(adCard);
        });
    }
}