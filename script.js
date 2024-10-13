// Simulated admin check (in reality, you'd use server-side authentication)
const isAdmin = true; // Change to false for non-admins

// Show the admin upload section if the user is an admin
if (isAdmin) {
    document.getElementById('admin-upload').style.display = 'block';
}

// Handle image upload (dummy function, you would handle this server-side in a real app)
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('image-upload');
    const titleInput = document.getElementById('gallery-title');
    const galleryContainer = document.getElementById('gallery-container');

    if (fileInput.files.length > 0 && titleInput.value) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            // Create an image element and add it to the gallery
            const imgElement = document.createElement('img');
            imgElement.src = event.target.result;
            imgElement.alt = titleInput.value;

            // Add the image to the gallery
            galleryContainer.appendChild(imgElement);

            // Clear the form
            fileInput.value = '';
            titleInput.value = '';
        };

        reader.readAsDataURL(file);
    }

});

// Fetch and display news from NASA's RSS feed
const newsContainer = document.getElementById('news');

async function fetchNews() {
    const nasaRSSUrl = 'https://www.nasa.gov/rss/dyn/breaking_news.rss'; // NASA Breaking News RSS feed
    try {
        const response = await fetch(nasaRSSUrl);
        const rssText = await response.text();
        const parser = new DOMParser();
        const rssDoc = parser.parseFromString(rssText, "application/xml");
        displayNews(rssDoc);
    } catch (error) {
        console.error('Error fetching NASA news:', error);
        newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
    }
}

function displayNews(rssDoc) {
    const items = rssDoc.querySelectorAll('item');
    let newsHTML = '';

    items.forEach(item => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const description = item.querySelector('description').textContent;
        const pubDate = item.querySelector('pubDate').textContent;

        newsHTML += `
        <div class="news-item">
            <h3><a href="${link}" target="_blank">${title}</a></h3>
            <p>${description}</p>
            <p><small>Published on: ${new Date(pubDate).toLocaleDateString()}</small></p>
        </div>`;
    });

    newsContainer.innerHTML = newsHTML;
}

// Call fetchNews to load NASA RSS feed on page load
fetchNews();
   




  



