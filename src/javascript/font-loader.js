import FontFaceObserver from 'fontfaceobserver/fontfaceobserver.standalone';

const html = document.documentElement;

const fontA = new FontFaceObserver('Dewnrger');
const fontB = new FontFaceObserver('Frutiger');

if (!sessionStorage.fontsLoaded) {
  Promise.all([
    // load Dewnrger
    fontA.load()
  ]).then(() => {
    html.classList.add('fonts-stage-1');
    // load Frutiger
    fontB.load().then(() => {
      html.classList.add('fonts-stage-2');
      // add token to session storage
      sessionStorage.fontsLoaded = true;
    });
  }).catch((err) => {
    // remove token from session storage
    sessionStorage.fontsLoaded = false;
    console.error('Error: ', err);
  });
} else {
  // Add all font classes to html tag
  html.classList.add('fonts-stage-1', 'fonts-stage-2');
};
