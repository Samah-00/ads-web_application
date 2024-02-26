
async function search (event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput !== '') {
        try {
            loader.style.visibility = 'visible'; //show the loader gif until fetch in done
            const response = await fetch(`http://localhost:3000/ads/search?search=${encodeURIComponent(searchInput)}`);
            loader.style.visibility = 'hidden';
            document.getElementById('searchInput').value = ''; // Empty the search input field
            if (response.ok) {
                const ads = await response.json();
                displayAds(ads, 'No ads found for this search 💔');            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
}
