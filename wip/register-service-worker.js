/* -- Register service worker */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js', {
      // scope: '/'
    }).then(function (registration) {
      // Successful registration
      console.log('👍 ServiceWorker registration successful with scope: ', registration.scope);

      // // Trim the caches on load
      // NavigationPreloadManager.serviceWorker.controller && navigator.serviceWorker.controller.postMessage({
      //   command: 'trimCahces'
      // });
    }).catch(function (err) {
      // Failed registration :(
      console.log('👎 ServiceWorker registration failed: ', err);
    });
  });
}
