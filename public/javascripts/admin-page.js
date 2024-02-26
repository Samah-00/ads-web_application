function createAdCard(ad) {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');

    // Check if the ad is approved and set the disabled attribute for the "approve" button
    const isApproved = ad.approved;
    const approveBtnDisabled = isApproved ? 'disabled' : '';

    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${ad.title}</h5>
            <p class="card-text">${ad.description}</p>
            <p class="card-text">Price: $${ad.price}</p>
        </div>
        <div class="card-footer custom-footer">
        <div class="row">
            <div class="col col-sm-9" style="margin-bottom: 0;">
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
            <div class="col col-sm-3 d-flex justify-content-end">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button class="btn btn-success approve-btn" data-id="${ad.id}" ${approveBtnDisabled}>Approve</button>
                    <button class="btn btn-danger delete-btn" data-id="${ad.id}">Delete </button>
                </div>
            </div>
        </div>   
        </div>
    `;

    return card;
}

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
            } else {
                console.error('Failed to approve ad:', response.statusText);
            }
        })
        .catch(error => {
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
            } else {
                console.error('Failed to delete ad:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error deleting ad:', error);
        });
}

document.addEventListener("DOMContentLoaded", async () => {
    const ads = await fetchAds('http://localhost:3000/ads');

    displayAds(ads);

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
});