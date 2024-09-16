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
