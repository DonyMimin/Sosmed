const reelItems = document.querySelectorAll('.reel-item');
let currentReelIndex = 0;

function playReel(index) {
  reelItems.forEach((item, i) => {
    item.querySelector('.reel-video').pause();
    if (i === index) {
      item.querySelector('.reel-video').play();
    }
  });
}

function scrollToReel(index) {
  const reelContainer = document.querySelector('.reels-container');
  const reelItem = reelItems[index];
  const scrollOffset = reelContainer.scrollTop;
  const targetOffset = reelItem.offsetTop - reelContainer.offsetTop;
  const scrollDuration = 500; // milliseconds
  const scrollStep = Math.PI / (scrollDuration / 15);
  let scrollCount = 0;

  function scrollToTop() {
    if (scrollCount < scrollDuration) {
      requestAnimationFrame(scrollToTop);
      scrollCount += 15;
      reelContainer.scrollTop = easeInOutCubic(scrollCount, scrollOffset, targetOffset, scrollDuration);
    }
  }

  scrollToTop();
}

// Easing function for smooth scrolling
function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
}

reelItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    scrollToReel(index);
    playReel(index);
    currentReelIndex = index;
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (currentReelIndex > 0) {
      currentReelIndex--;
      scrollToReel(currentReelIndex);
      playReel(currentReelIndex);
    }
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (currentReelIndex < reelItems.length - 1) {
      currentReelIndex++;
      scrollToReel(currentReelIndex);
      playReel(currentReelIndex);
    }
  }
});

playReel(currentReelIndex);

document.addEventListener('DOMContentLoaded', function() {
    var menu4 = document.getElementById('menu4');
    var notificationPopup = document.getElementById('notification-popup');
    var toggleButton = document.querySelector('.toggle-button');
    
    menu4.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent event bubbling to the toggle button
      notificationPopup.classList.toggle('show');
    });
  
    toggleButton.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent event bubbling to the menu item
      document.querySelector('.sidebar').classList.toggle('closed');
    });
  
    document.addEventListener('click', function() {
      if (!notificationPopup.classList.contains('show')) {
        document.querySelector('.sidebar').classList.remove('closed');
      }
    });
  });
  function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('closed');
  }
  function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    var toggleButton = document.querySelector('.toggle-button');
    sidebar.classList.toggle('show');
    toggleButton.classList.toggle('show');
  }
  
  function toggleNotificationPopup() {
    var notificationPopup = document.querySelector('.notification-popup');
    notificationPopup.classList.toggle('show');
  }
  
  window.addEventListener('click', function(event) {
    var sidebar = document.querySelector('.sidebar');
    var toggleButton = document.querySelector('.toggle-button');
    if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
      sidebar.classList.remove('show');
      toggleButton.classList.remove('show');
    }
  });
  