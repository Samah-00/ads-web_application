
function approveAd(adId) {
    loader.style.visibility = 'visible'; //show the loader gif until fetch in done
    // Send a PUT request to approve the ad
    fetch(`http://localhost:3000/ads/${adId}`, {
        method: 'PUT',
    })
        .then(response => {
            loader.style.visibility = 'hidden';
            if (response.ok) {
                // If the request was successful, reload the page to reflect the changes
                window.location.reload();
            } else if (response.status === 401) {
                window.location.href = '/login'; // Redirect to login page if unauthorized
            } else {
                console.error('Failed to approve ad:', response.statusText);
            }
        })
        .catch(error => {
            loader.style.visibility = 'hidden';
            console.error('Error approving ad:', error);
        });
}

function deleteAd(adId) {
    // Send a DELETE request to delete the ad
    loader.style.visibility = 'visible'; //show the loader gif until fetch in done
    fetch(`http://localhost:3000/ads/${adId}`, {
        method: 'DELETE',
    })
        .then(response => {
            loader.style.visibility = 'hidden';
            if (response.ok) {
                // If the request was successful, reload the page to reflect the changes
                window.location.reload();
            } else if (response.status === 401) {
                window.location.href = '/login'; // Redirect to login page if unauthorized
            } else {
                console.error('Failed to delete ad:', response.statusText);
            }
        })
        .catch(error => {
            loader.style.visibility = 'hidden';
            console.error('Error deleting ad:', error);
        });
}

document.addEventListener("DOMContentLoaded", async () => {
    const ads = await fetchAds('http://localhost:3000/ads');

    displayAds(ads, true);

    // Attach event listeners for approve and delete buttons
    document.querySelectorAll('.approve-btn').forEach(button => {
        button.addEventListener('click', () => {
            const adId = button.getAttribute('data-id');
            approveAd(adId);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const adId = button.getAttribute('data-id');
            deleteAd(adId);
        });
    });

    document.getElementById('searchForm').addEventListener('submit', async (event) => {
        await searchAds(event);
    });
});