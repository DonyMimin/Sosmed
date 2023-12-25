const storyImages = Array.from(document.querySelectorAll('.story-image'));
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let currentIndex = 0;

// Show the current image
function showImage(index) {
  storyImages.forEach((image, i) => {
    if (i === index) {
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
    }
  });
}

// Navigate to the previous image
function goToPreviousImage() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = storyImages.length - 1;
  }
  showImage(currentIndex);
}

// Navigate to the next image
function goToNextImage() {
  currentIndex++;
  if (currentIndex >= storyImages.length) {
    currentIndex = 0;
  }
  showImage(currentIndex);
}

// Add click event listeners to the navigation buttons
prevButton.addEventListener('click', goToPreviousImage);
nextButton.addEventListener('click', goToNextImage);

// Show the initial image
showImage(currentIndex);
