$(document).ready(function () {
  // Function to save accordion state in localStorage
  function saveAccordionState() {
    var state = {};
    $('.accordion-item').each(function (index) {
      var isOpen = $(this).hasClass('active');
      state[`section-${index}`] = isOpen; // Store the open/closed state of each section
    });
    localStorage.setItem('accordionState', JSON.stringify(state)); // Save state to localStorage
  }

  // Function to restore accordion state from localStorage
  function restoreAccordionState() {
    var state = JSON.parse(localStorage.getItem('accordionState'));
    if (state) {
      $('.accordion-item').each(function (index) {
        if (state[`section-${index}`]) {
          $(this).addClass('active').find('.accordion-content').slideDown();
        } else {
          $(this).removeClass('active').find('.accordion-content').slideUp();
        }
      });
    }
  }

  $(document).on('click', '.accordion-header', function (event) {
    const currentItem = $(this).parent();
    const currentContent = $(this).next();
    const isCtrlPressed = event.ctrlKey || event.metaKey;

    if (isCtrlPressed) {
      currentContent.stop().slideToggle();
      currentItem.toggleClass('active');
    } else {
      // Close other sections and open the current one
      $('.accordion-item')
        .not(currentItem)
        .removeClass('active')
        .find('.accordion-content')
        .slideUp();
      currentContent.stop().slideToggle();
      currentItem.toggleClass('active');
    }

    // Save the state after toggling
    saveAccordionState();
  });

  // Add new section dynamically
  $('.add-content-btn').click(function () {
    var newSectionCount = $('.accordion-item').length + 1; // Determine section number

    var newSection = `
      <div class="accordion-item">
        <div class="accordion-header">
          <h3>Section ${newSectionCount}</h3>
          <div class="accordion-icons">
            <i class="fa-solid fa-trash"></i>
            <span class="accordion-icon">+</span>
          </div>
        </div>
        <div class="accordion-content">
          <p>Content for section ${newSectionCount}. You can place any information or text here.</p>
        </div>
      </div>
    `;

    // Append the new section to the accordion
    $('.accordion').append(newSection);

    // Save the state after adding the new section
    saveAccordionState();
  });

  // Remove the accordion item when delete button is clicked
  $(document).on('click', '.fa-trash', function () {
    // Remove the parent accordion item of the delete button clicked
    $(this).closest('.accordion-item').remove();

    // Save the state after removing a section
    saveAccordionState();
  });

  // Restore the accordion state from localStorage on page load
  restoreAccordionState();
});
