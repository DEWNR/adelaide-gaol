(function () {
  const html = document.documentElement;
  const searchToggle = document.querySelector('#search-toggle');
  const searchInput = document.querySelector('#site-search');

  function handleSearchVisibility (event) {
    event.preventDefault();
    if (!html.classList.contains('has-search-open') && window.innerWidth < 1024) {
      html.classList.add('has-search-open');
      searchInput.focus();
      html.classList.add('has-nav-open');
    } else if (!html.classList.contains('has-search-open') && window.innerWidth >= 1024) {
      html.classList.add('has-search-open');
      searchInput.focus();
    } else {
      html.classList.remove('has-search-open');
    }
  };

  if (searchToggle) {
    searchToggle.addEventListener('click', handleSearchVisibility, false);
  }
})();
