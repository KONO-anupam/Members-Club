document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burgerToggle');
  const sidebar = document.getElementById('sidebarMenu');

  burger.addEventListener('click', () => {
    sidebar.classList.toggle('is-active');
  });
});