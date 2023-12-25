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
  