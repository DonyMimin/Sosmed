document.addEventListener("DOMContentLoaded", async function() {
  const profileNameElement = document.querySelector(".profile-username");

  try {
    const response = await fetch('/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const userData = await response.json();
      profileNameElement.textContent = userData.username;
    } else {
      const errorMessage = await response.text();
      alert(errorMessage);
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again.');
  }
});

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

