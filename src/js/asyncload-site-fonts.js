/* -- A listener to ensure the fonts we need to use have been loaded */

/* global FontFaceObserver */

if (!document.documentElement.classList.contains('fonts-loaded')) {
  var fonts = [
    'dewnrger',
    'fontello'
  ];

  var observers = [];
  var loadedFonts = [];

  fonts.forEach((family) => {
    var obs = new FontFaceObserver(family);
    observers.push(obs.load());
  });

  Promise.all(observers)
    .then((fonts) => {
      fonts.forEach((font) => {
        loadedFonts.push(font.family);
      });
    })
    .catch((error) => {
      console.warn(`Fonts didn't load: `, error);
    })
    .finally(() => {
      loadedFonts.forEach((font) => {
        document.documentElement.classList.add(font);
      });
      document.documentElement.classList.add('fonts-loaded');
    });
}
