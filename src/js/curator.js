/* global Curator, feedId */
if (typeof Curator !== 'undefined') {
  (function () {
    let numberOfRows = 2;

    if (window.innerWidth > 720) {
      numberOfRows = 2;
    };

    let widget = new Curator.Widgets.Grid({
      apiEndpoint: 'https://api.curator.io/v1.1',
      grid: {
        showLoadMore: false,
        rows: numberOfRows
      },
      feedId: feedId,
      container: '#curator-feed',
      debug: false,
      maxPosts: 10,
      filter: {
        showNetworks: false,
        showSources: false
      },
      templatePopup: 'curator-popup-template'
    });

    widget.on(Curator.Events.POSTS_LOADED, (evt, post) => {
      window.setTimeout(() => {
        document.querySelector(widget.$container.selector).classList.remove('loading');
      }, 600);
    });
  })();
}
