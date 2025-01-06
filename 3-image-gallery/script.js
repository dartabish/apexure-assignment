import { mockImages } from './mock-images.js';

$(document).ready(function () {
  // Function to display images
  function displayImages(images, numberOfImages) {
    $('#gallery').empty();

    // Appending each image to the gallery
    images.forEach(function (photo) {
      const galleryItem = `
        <div class="gallery-item">
          <div class="image-container">
            <img src="${photo.url}" alt="${
        photo.title || 'No caption'
      }" loading="lazy">
            <div class="caption">${photo.title || 'No photographer info'}</div>
          </div>
        </div>
      `;
      $('#gallery').append(galleryItem);
    });
  }

  // Displaying all images initially
  displayImages(mockImages);

  // Event listener for filter buttons
  $('.filter-btn').click(function () {
    var category = $(this).data('category');

    if (category === 'all') {
      // Display all images if 'all' is selected
      displayImages(mockImages);
    } else {
      // Filter images by category
      const filteredImages = mockImages.filter(
        photo => photo.category === category
      );
      displayImages(filteredImages);
    }
  });
});
