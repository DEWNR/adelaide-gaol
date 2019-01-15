/**
 * External dependencies.
 */
const gulp = require('gulp');
const browsersync = require('browser-sync');
const del = require('del');
const fs = require('fs');
const log = require('fancy-log');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const data = require('gulp-data');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const gulpif = require('gulp-if');
const jsonCombine = require('gulp-jsoncombine');
const nunjucksRender = require('gulp-nunjucks-render');
const rev = require('gulp-rev');
const revNapkin = require('gulp-rev-napkin');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const _ = require('lodash');
const webpack = require('webpack-stream');

/**
 * Internal dependencies.
 */
const { isDevEnv } = require('./node-env');
const serverConfig = require('./server-config');
const webpackConfig = require('./webpack.config');
const pkg = require('../package.json');

/**
 * The supported paths.
 */
const paths = {
  src: '../src',
  dev: '../dev',
  build: '../build',
  css: '/css',
  scripts: [
    {
      name: 'plugins',
      source: [
        '../node_modules/@babel/polyfill/dist/polyfill.js',
        '../node_modules/outdatedbrowser/outdatedbrowser/outdatedbrowser.js',
        '../node_modules/fontfaceobserver/fontfaceobserver.standalone.js'
      ]
    },
    {
      name: 'main',
      source: ['../src/javascript/main.js']
    }
  ]
};

/**
 * Handle custom path
 */
const handlePath = (defaultPath, additionalPath) => defaultPath + additionalPath;

/**
 * Exclude custom path
 */
const excludePath = (defaultPath, additionalPath) => '!' + handlePath(defaultPath, additionalPath);

/**
 * Handle node environment paths
 */
const handleNodeEnvPath = (devPath, prodPath) => isDevEnv ? devPath : prodPath;

/**
 * Handle errors
 */
const handleError = function (err) {
  notify.onError({
    title: 'Gulp',
    subtitle: 'Faliure!',
    message: 'Error: <%= error.message %>'
  })(err);

  this.emit('end');
};

/**
 * Handle page reload
 */
const handleReload = () => browsersync(serverConfig);

/**
 * Handle dev folder clean
 */
const handleClean = () => del([paths.dev, paths.build], { force: true });

/**
 * Handle javascript files through webpack
 */
const handleScripts = (done) => gulp
  .src('../src/javascript/main.js')
  .pipe(plumber({ errorHandler: handleError }))
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(handleNodeEnvPath(
    handlePath(paths.dev, '/js/'),
    handlePath(paths.build, '/js/'))));

/**
 * Handle template data
 */
const getTemplateData = (file) => {
  let dataPath = handlePath(paths.src, '/templates/_data/global.json');
  if (dataPath === undefined) {
    dataPath = {};
  } else {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  };
};

/**
 * Handle templates
 */
const handleTemplates = () => gulp
  .src([
    handlePath(paths.src, '/templates/*.{njk, nunjucks, html, htm}'),
    excludePath(paths.src, '**/_*/**')]) // exclude any folders that start with '_'
  .pipe(plumber({ errorHandler: handleError }))
  .pipe(data(getTemplateData))
  .pipe(nunjucksRender({
    path: handlePath(paths.src, '/templates/'),
    envOptions: {
      watch: false
    }
  }))
  .pipe(gulp.dest(handleNodeEnvPath(paths.dev, paths.build)));

const cleanGlobalTemplateFile = () => del(handlePath(paths.src, '/templates/_data/global.json'), { force: true });

const handleTemplateData = () => gulp
  .src([
    handlePath(paths.src, '/templates/_data/**/*.json'),
    excludePath(paths.src, '/**/global.json')
  ])
  .pipe(plumber({ errorHandler: handleError }))
  .pipe(jsonCombine('global.json', (data) => {
    let dataCC = _.mapKeys(data, (value, key) => _.camelCase(key)); // convert keys to camelCase
    let sData = JSON.stringify(dataCC); // convert json to string
    return new Buffer.from(sData); // eslint-disable-line
  }))
  .pipe(gulp.dest(handlePath(paths.src, '/templates/_data')));

/**
 * Handle css files
 */
const handleSass = () => gulp
  .src([handlePath(paths.src, '/styles/**/*.scss')])
  .pipe(gulpif(isDevEnv, sourcemaps.init()))
  .pipe(sassGlob())
  .pipe(sass({
    outputStyle: isDevEnv ? 'compact' : 'compressed'
  }).on('error', handleError))
  .pipe(autoprefixer(pkg.browsersList))
  .pipe(gulpif(isDevEnv, sourcemaps.write()))
  .pipe(gulp.dest(handleNodeEnvPath(
    handlePath(paths.dev, paths.css),
    handlePath(paths.build, paths.css)
  )));

/**
 * Handle image optimization
 */
const handleImageOptimization = () => gulp
  .src([handlePath(paths.src, '/images/**/*')])
  .pipe(gulpif(
    isDevEnv,
    imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true })
    ]),
    imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { cleanupAttrs: true },
          { removeDoctype: true },
          { removeXMLProcInst: true },
          { removeComments: true },
          { removeMetadata: true },
          { removeUselessDefs: true },
          { removeEditorsNSData: true },
          { removeEmptyAttrs: true },
          { removeHiddenElems: false },
          { removeEmptyText: true },
          { removeEmptyContainers: true },
          { cleanupEnableBackground: true },
          { cleanupIDs: false },
          { convertStyleToAttrs: true }
        ]
      })
    ])
  ))
  .pipe(gulp.dest(handleNodeEnvPath(
    handlePath(paths.dev, '/images'),
    handlePath(paths.build, '/images')
  )));

/**
 * Handle fonts
 */
const handleFonts = () => gulp
  .src([handlePath(paths.src, '/fonts/**/*')])
  .pipe(gulp.dest(handleNodeEnvPath(
    handlePath(paths.dev, '/fonts'),
    handlePath(paths.build, '/fonts')
  )));

/**
 * Handle rev
 */
const handleRev = () => gulp
  .src([
    handlePath(paths.build, '/js/**/*.js'),
    handlePath(paths.build, '/css/**/*.css')
  ], { base: './' })
  .pipe(rev())
  .pipe(gulp.dest('./'))
  .pipe(revNapkin({ force: true }))
  .pipe(rev.manifest(handlePath(paths.build, '/rev-manifest.json')), { merge: true })
  .pipe(gulp.dest('./'));

/**
 * Handle folder watch
 */
const handleWatch = () => {
  gulp.watch(
    handlePath(paths.src, '/javascript/**/*.js'),
    handleScripts
  );

  gulp.watch(
    handlePath(paths.src, '/templates/**/*.{njk, nunjucks, htm, html}'),
    handleTemplates
  );

  gulp.watch(
    handlePath(paths.src, '/styles/**/*.scss'),
    handleSass
  );

  gulp.watch(
    handlePath(paths.src, '/images/**/*'),
    handleImageOptimization
  );
  gulp.watch(
    handlePath(paths.src, '/fonts/**/*'),
    handleFonts
  );

  gulp.watch(
    [
      handlePath(paths.src, '/templates/_data/**/*.json'),
      excludePath(paths.src, '/**/global.json')
    ],
    gulp.series(
      cleanGlobalTemplateFile,
      handleTemplateData,
      handleTemplates
    )
  );
};

exports.build = gulp.series(
  handleClean,
  cleanGlobalTemplateFile,
  handleTemplateData,
  handleTemplates,
  handleFonts,
  handleImageOptimization,
  handleSass,
  handleScripts,
  handleRev
);

exports.default = gulp.series(
  handleClean,
  cleanGlobalTemplateFile,
  handleTemplateData,
  handleTemplates,
  handleScripts,
  handleFonts,
  handleSass,
  gulp.parallel(
    handleImageOptimization,
    handleWatch,
    handleReload
  )
);
