/* -- A listener to ensure the fonts we need to use have been loaded */
/* global FontFaceObserver, Cookie */

if (!document.documentElement.classList.contains('fonts-loaded')) {
  var fontello = new FontFaceObserver('fontello');
  var dewnrger = new FontFaceObserver('Dewnrger');
  var frutiger = new FontFaceObserver('Frutiger');

  Promise.all([
    fontello.load(''),
    dewnrger.load(),
    frutiger.load()

  ]).then(function () {
    document.documentElement.classList.add('fonts-loaded');
    Cookie.set('fonts-loaded', 1, { expires: '7D', secure: true });
  });
}
