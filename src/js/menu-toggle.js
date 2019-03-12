(function () {
  const html = document.documentElement;
  const menuToggle = document.querySelector('#menu-toggle');

  function handleMenuVisibility (event) {
    event.preventDefault();
    if (!html.classList.contains('has-nav-open')) {
      html.classList.add('has-nav-open');
    } else {
      html.classList.remove('has-nav-open');
      html.classList.remove('has-search-open');
    }
  };

  menuToggle.addEventListener('click', handleMenuVisibility, false);
})();
