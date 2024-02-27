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

function displayAds(ads, isAdmin, emptyMessage = 'No ads available at the moment 💔') {
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
            const adCard = createAdCard(ad, isAdmin); // Create a card for each ad
            adsContainer.appendChild(adCard);
        });
    }
}

function createAdCard(ad, isAdmin) {
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
                <div class="col col-sm-3 d-flex justify-content-end" id="buttons-container-${ad.id}">
                </div>
            </div>   
        </div>
    `;

    // if the card is for the admin page, create control buttons
    if(isAdmin) {
        const buttonsContainer = card.querySelector(`#buttons-container-${ad.id}`);
        buttonsContainer.appendChild(createApproveDeleteButtons(ad));
    }

    return card;
}

function createApproveDeleteButtons(ad) {
    const container = document.createElement('div');
    container.classList.add('btn-group');
    container.setAttribute('role', 'group');
    container.setAttribute('aria-label', 'Basic example');

    const approveButton = document.createElement('button');
    approveButton.classList.add('btn', 'btn-success', 'approve-btn');
    approveButton.setAttribute('data-id', ad.id);
    approveButton.disabled = ad.approved;
    approveButton.textContent = 'Approve';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'delete-btn');
    deleteButton.setAttribute('data-id', ad.id);
    deleteButton.textContent = 'Delete';

    container.appendChild(approveButton);
    container.appendChild(deleteButton);

    return container;
}