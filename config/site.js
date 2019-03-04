module.exports = {
  pkg: {
    name: 'Adelaide Gaol'
  },
  urls: {
    dev: 'https://adelaidegaol.test',
    live: 'https://www.adelaidegaol.sa.gov.au',
    critical: 'https://www.adelaidegaol.test/'
  },
  public: {
    base: './web/',
    assets: './web/assets/'
  },
  build: {
    base: './temp/'
  },
  js: {
    src: './src/js/',
    build: './temp/js/',
    dest: './web/assets/js/',
    extensions: 'js'
  },
  styles: {
    src: './src/scss/',
    build: './temp/css/',
    dest: './web/assets/css/',
    extensions: ['scss', 'css']
  },
  images: {
    src: './src/img/',
    build: './temp/img/',
    dest: './web/assets/img/',
    extensions: ['png,jpg,jpeg,gif,svg']
  },
  favicons: {
    src: './src/img/favicon_src.png',
    dest: './web/assets/img/site/'
  },
  fonts: {
    src: './src/fonts/',
    build: './temp/fonts/',
    dest: './web/assets/fonts/',
    extensions: ['eot,ttf,woff,woff2,svg']
  },
  templates: {
    src: './templates/',
    extensions: ['twig,html,htm']
  },
  fontello: {
    src: './src/fontello/config.json',
    build: './temp/fontello/',
    dest: './src/fonts/fontello/'
  },
  manifest: {
    dest: 'web/assets/versions.json'
  },
  vars: {
    siteCssName: 'main.css'
  },
  globs: {
    babelJs: [
      './src/js/*.js'
    ],
    inlineJs: [
      './node_modules/fg-loadcss/dist/loadCSS.js',
      './node_modules/fg-loadcss/dist/cssrelpreload.js',
      './node_modules/fontfaceobserver/fontfaceobserver.js',
      './node_modules/tiny-cookie/dist/tiny-cookie.js',
      './temp/js/tab-handler.js',
      './temp/js/register-service-worker.js',
      './temp/js/asyncload-site-fonts.js'
    ],
    distJs: [
      './temp/js/*.js',
      './node_modules/lazysizes/lazysizes.js',
      './node_modules/lazysizes/plugins/bgset/ls.bgset.js',
      './node_modules/picturefill/dist/picturefill.min.js'
    ],
    critical: [
      {
        url: '',
        template: 'index'
      },
      {
        url: 'offline',
        template: 'offline'
      },
      {
        url: 'error',
        template: 'error'
      },
      {
        url: '503',
        template: '503'
      },
      {
        url: '404',
        template: '404'
      }
    ],
    criticalWhitelist: [],
    download: [
      {
        url: 'https://www.google-analytics.com/analytics.js',
        dest: './web/assets/js'
      }
    ],
    siteIcon: './web/assets/img/site/favicon.*'
  }
};
