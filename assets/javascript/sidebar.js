var sidebarOpen = false;
checkScreenWidthAndCloseSidebar();
window.addEventListener('resize', checkScreenWidthAndCloseSidebar);

function checkScreenWidthAndCloseSidebar() {
  if (window.innerWidth <= 660) {
    closeNav();
  }
}

function toggleNav() {
  if (window.innerWidth > 660) {
    return; // If screen width is greater than 600, exit the function
  }
  
  if (!sidebarOpen) {
    openNav();
  } else {
    closeNav();
  }
}

function openNav() {
  document.getElementById("mySidebar").style.width = "260px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("hamburger").style.marginLeft = "200px";
  sidebarOpen = true;
}

function closeNav() {
  if (window.innerWidth > 660) {
    return;
  }
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("hamburger").style.marginLeft = "0";
  sidebarOpen = false;
  document.removeEventListener('click', closeNavOnOutsideClick);
}

function closeNavOnOutsideClick(event) {
  if (window.innerWidth <= 660) {
    if (!event.target.matches('#mySidebar') && !event.target.matches('button')) {
      closeNav();
    }
  }
}
