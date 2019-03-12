(function () {
  const html = document.documentElement;
  const menuToggle = document.querySelector('#menu-toggle');

  function handleMenuVisibility () {
    if (html.classList.contains('has-nav-open')) {
      html.classList.remove('has-nav-open');
    } else {
      html.classList.add('has-nav-open');
    }
  };

  menuToggle.addEventListener('click', handleMenuVisibility, false);
})();
