// package vars
const pkg = require('./package.json');
const config = require('./config/site');

// gulp
const gulp = require('gulp');

// load all plugins in 'devDependencies' into the variable $
const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['devDependencies']
});

// these get a bit messy using gulp-load-plugins so we define these
// independently
const notifier = require('node-notifier');
const stream = require('stream-combiner2');
const sequence = require('run-sequence');

// define node environment for production or development build
const environment =
process.env.NODE_ENV === 'production' ? 'production' : 'development';
const isDev = environment === 'development';
const isProd = environment === 'production';

// Our banner
const banner = [
  '/**',
  ' * @project      <%= config.pkg.name %>',
  ' * @build        ' + $.moment().format('llll') + ' ACST',
  ' * @Repo         <%= pkg.repository.url %>',
  ' *',
  ' */',
  '',
  ''
].join('\n');

/**
 * Handle errors
 *  - needs to be a named function to use 'this'
 */
function handleError (err, emitEnd = true) {
  const errorMessage = (typeof err.message !== 'undefined') ? err.message.toString() : null;

  notifier.notify({
    title: 'Error',
    message: errorMessage.split('\n')[0]
  });

  const errorStack = (typeof err.stack !== 'undefined') ? err.stack.toString() : null;

  console.log($.chalk.red(errorStack));

  if (emitEnd) this.emit('end');
};

/**
 * Write versions file
 *  - this will appear in the web/assets/ directory
 */
const writeVersionFile = () => {
  return stream.obj([
    $.rename((path) => {
      path.dirname = path.dirname.replace('web/', '');
    }),
    $.rev.manifest(config.manifest.dest, {
      merge: true,
      base: config.public.assets
    }),
    gulp.dest(config.public.assets)
  ]);
};

/**
 * Synchronous loop
 *  - used for critical css and downloads tasks
 */
const doSynchronousLoop = (data, processData, done) => {
  if (data.length > 0) {
    const loop = (data, i, processData, done) => {
      processData(data[i], i, () => {
        if (++i < data.length) {
          loop(data, i, processData, done);
        } else {
          done();
        }
      });
    };
    loop(data, 0, processData, done);
  } else {
    done();
  }
};

/**
 * Predefine a log style for the start of tasks
 */
const log = (message) => {
  $.fancyLog($.chalk.yellow.bold(`➤ ${message}`));
};

/* Gulp tasks
 *  - clean
 *  - styles
 *  -
 * ========================================================================== */

/**
 * Clean task
 *  - we use this to remove all files created by the gulp tasks
 *  - might look at moving this into the config
 *
 *  1. removes all files from the web/assets/ directory that are created by the
 *     build
 *  2. removes temporary build files
 *  3. remove all critical css from the templates folder
 *  4. remove favicons
 *  5. remove the inline js files from their templates directory
 */
gulp.task('clean', () => {
  log(`Taking out the trash 🗑`);

  gulp.src([
    `${config.public.assets}css`, /* 1 */
    `${config.public.assets}js`, /* 1 */
    `${config.public.assets}fonts`, /* 1 */
    `${config.public.assets}img/site`, /* 1 */
    config.build.base, /* 2 */
    `${config.templates.src}/*.css`, /* 3 */
    `${config.public.base}favicon.ico`, /* 4 */
    `${config.templates.src}/_partials/_favicons.twig`, /* 4 */
    `${config.templates.src}/_inlinejs/*.js` /* 5 */
  ], { read: false })
    .pipe($.clean());
});

/**
 * styles:scss task
 *  - compiles scss into a single css file
 *  - outputs to temp folder
 */
gulp.task('styles:scss', () => {
  log(`Compiling SCSS ✨`);

  return gulp.src(`${config.styles.src}**/*.{${config.styles.extensions}}`)
    .pipe($.plumber({ errorHandler: handleError }))
    .pipe($.if(isDev, $.sourcemaps.init({ loadMaps: true })))
    .pipe($.sass({ includePaths: ['node_modules'] }))
    .pipe($.cached('styles-scss'))
    .pipe($.if(isDev, $.sourcemaps.write()))
    .pipe($.size({ gzip: true, pretty: true, showFiles: true }))
    .pipe(gulp.dest(config.styles.build));
});

/**
 * styles task
 *  - collect any css files that have ended up in the temp css directory
 *  - merge them together
 *  - prefix all of the css and sort them alphabetically
 *    - minify if it is the development build
 *  - add our banner to the top
 *  - output to distribution folder
 */
gulp.task('styles', ['styles:scss'], () => {
  log(`Merging CSS partials into main stylesheet 📦`);

  const postCssPlugins = [$.autoprefixer(), $.cssDeclarationSorter()];
  if (isProd) {
    postCssPlugins.push(
      $.cssnano({
        safe: true,
        autoprefixer: false,
        discardComments: {
          removeAll: true
        },
        discardDuplicates: true,
        discardEmpty: true,
        minifyFontValues: false,
        minifySelectors: true
      })
    );
  };

  return gulp.src([
    config.styles.build + '**/*.css',
    '!' + config.styles.build + '**/style-guide.css',
    '!' + config.styles.build + '**/open-forms.css',
    config.fontello.build + 'css/fontello-codes.css'
  ])
    .pipe($.plumber({ errorHandler: handleError }))
    .pipe($.if(isDev, $.sourcemaps.init({ loadMaps: true })))
    .pipe($.concat(config.vars.siteCssName))
    .pipe($.postcss(postCssPlugins))
    .pipe($.header(banner, { pkg: pkg, config: config }))
    .pipe($.if(isDev, $.sourcemaps.write()))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe($.rename({ dirname: config.styles.dest }))
    .pipe($.if(isProd, $.rev()))
    .pipe(gulp.dest('.'))
    .pipe($.if(isProd, writeVersionFile()))
    .pipe($.browserSync.stream({ match: '**/*.css' }));
});

gulp.task('styleGuide', ['styles:scss'], () => {
  log(`Creating style guide css`);

  return gulp.src([config.styles.build + '**/style-guide.css'])
    .pipe($.plumber({ errorHandler: handleError }))
    .pipe($.if(isDev, $.sourcemaps.init({ loadMaps: true })))
    .pipe($.if(isDev, $.sourcemaps.write()))
    .pipe(gulp.dest(config.styles.dest))
    .pipe($.browserSync.stream({ match: '**/*.css' }));
});

gulp.task('openForms', ['styles:scss'], () => {
  log(`Creating open-forms css`);

  return gulp.src([config.styles.build + '**/open-forms.css'])
    .pipe($.postcss([
      $.autoprefixer(),
      $.cssDeclarationSorter(),
      $.cssnano({
        safe: true,
        autoprefixer: false,
        discardComments: {
          removeAll: true
        },
        discardDuplicates: true,
        discardEmpty: true,
        minifyFontValues: false,
        minifySelectors: true
      })
    ]))
    .pipe(gulp.dest(config.styles.dest));
});

/**
 * js:babel task
 *  - collect all of our js and run it through babel
 *  - output to temporary js folder
 */
gulp.task('js:babel', () => {
  log(`Transpiling Javascript via Babel... ⚙️`);

  return gulp.src(config.globs.babelJs)
    .pipe($.plumber({ errorHandler: handleError }))
    .pipe($.newer({ dest: config.js.dest }))
    .pipe($.babel())
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(config.js.build));
});

/**
 * js:inline task
 *  - get any scripts that need to be included directly in templates
 *  - output them to their own templates directory
 *  - any files that aren't minified, minify them and append .min.js
 */
gulp.task('js:inline', ['js:babel'], () => {
  log(`Copying inline js to templates 📝`);

  return gulp.src(config.globs.inlineJs)
    .pipe($.plumber({ errorHandler: handleError }))
    .pipe($.if(['*.js', '!*.min.js'],
      $.newer({ dest: config.templates.src + '_inlinejs', ext: '.min.js' }),
      $.newer({ dest: config.templates.src + '_inlinejs' })
    ))
    .pipe($.if(['*.js', '!*.min.js'],
      $.uglify()
    ))
    .pipe($.if(['*.js', '!*.min.js'],
      $.rename({ suffix: '.min' })
    ))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(config.templates.src + '_inlinejs'))
    .pipe($.browserSync.stream({ match: '**/*.js' }));
});

/**
 * js task
 *  - filter files so that we don't have any of the files that we are inlining,
 *    in our distJS.
 *  - concatenate any remaining files.
 *  - output to distribution folder.
 */
gulp.task('js', ['js:inline'], () => {
  log(`Building js 🔨`);

  const filterJsFiles = () => {
    const srcFiles = config.globs.distJs;
    const ignoreFiles = [];

    // filter the inlineJs arr so it only contains files that come from the
    // 'temp' dir.
    const inlineFiles = config.globs.inlineJs.filter((path) => path.indexOf('/temp/') >= 0);

    // add an '!' to each item in the inlineFiles arr then push it to the
    // ignoreFiles arr.
    inlineFiles.forEach((element) => {
      element = '!' + element;
      ignoreFiles.push(element);
    });

    // return a single array that contains the source files and the files we
    // want to ignore.
    return srcFiles.concat(ignoreFiles);
  };

  return gulp.src(filterJsFiles())
    .pipe($.plumber({ errorHandler: handleError }))
    .pipe($.if(isDev, $.sourcemaps.init({ loadMaps: true })))
    .pipe($.concat('main.js'))
    .pipe($.newer({ dest: config.js.dest }))
    .pipe($.if(isProd, $.uglify()))
    .pipe($.header(banner, { pkg: pkg, config: config }))
    .pipe($.if(isDev, $.sourcemaps.write()))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe($.rename({ dirname: config.js.dest }))
    .pipe($.if(isProd, $.rev()))
    .pipe(gulp.dest('.'))
    .pipe($.if(isProd, writeVersionFile()))
    .pipe($.browserSync.stream({ match: '**/*.js' }));
});

/**
 * Process critical css using, this will be output to the templates folder so
 * that it can be included inline.
 *  -
 */
const processCriticalCSS = (element, i, done) => {
  const criticalSrc = config.urls.critical + element.url;
  const criticalDest = config.templates.src + element.template + '_critical.min.css';

  const regex = /main(-(.){10}?).css/;

  let criticalWidth = 1200;
  let criticalHeight = 1200;
  if (element.template.indexOf('amp_') !== -1) {
    criticalWidth = 600;
    criticalHeight = 1920;
  }
  $.fancyLog('Generating critical CSS: ' + $.chalk.cyan(criticalSrc) + ' -> ' + $.chalk.magenta(criticalDest));
  $.critical.generate({
    src: criticalSrc,
    dest: criticalDest,
    penthouse: {
      blockJSRequests: false,
      forceInclude: config.globs.criticalWhitelist
    },
    inline: false,
    ignore: [],
    css: [
      config.styles.dest + regex
    ],
    minify: true,
    width: criticalWidth,
    height: criticalHeight
  }, (err, output) => {
    if (err) {
      $.fancyLog($.chalk.red(err));
    }
    done();
  });
};

/**
 * criticalcss task
 *  - simply invokes the processCriticalCSS function on the files specified in
 *    the config.
 */
gulp.task('criticalcss', ['styles'], (done) => {
  doSynchronousLoop(config.globs.critical, processCriticalCSS, () => {
    // all done
    done();
  });
});

/**
 * Download neccessary javascript files that we are going to include locally
 *  -
 */
function processDownload (element, i, done) {
  const downloadSrc = element.url;
  const downloadDest = element.dest;

  $.fancyLog('Download URL: ' + $.chalk.cyan(downloadSrc) + ' -> ' + $.chalk.magenta(downloadDest));
  $.download(downloadSrc)
    .pipe(gulp.dest(downloadDest));
  done();
};

/**
 * download task
 *  - simply invokes the processDownload function on the files specified in the
 *    config.
 */
gulp.task('download', (done) => {
  doSynchronousLoop(config.globs.download, processDownload, () => {
    // all done
    done();
  });
});

/**
 * Generate favicons
 */
gulp.task('favicons-generate', () => {
  log(`Generating favicons ⭐️`);

  return gulp.src(config.favicons.src)
    .pipe($.favicons({
      appName: config.pkg.name,
      appDescription: pkg.description,
      developerName: pkg.author,
      developerUrl: config.urls.live,
      background: '#ffffff',
      path: '/assets/img/site/',
      url: config.urls.live,
      display: 'standalone',
      orientation: 'portrait',
      version: pkg.version,
      logging: false,
      online: false,
      html: `${config.templates.src}/_partials/_favicons.twig`,
      replace: true,
      icons: {
        android: false,
        appleIcon: true,
        appleStartup: false,
        coast: true,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        windows: true,
        yandex: true
      }
    }))
    .pipe(gulp.dest(config.favicons.dest));
});

/**
 * favicons task
 *  - copy favicon from the assets dir to the web root
 */
gulp.task('favicons', ['favicons-generate'], () => {
  log(`Copying favicon.ico ⭐️`);

  return gulp.src(config.globs.siteIcon)
    .pipe(gulp.dest(config.public.base));
});

/**
 * imagemin task
 *  - run all images from the img folder through imagemin
 *  - skip the favicon_src image as it is never used on the site
 */
gulp.task('imagemin', () => {
  log(`Minimizing images in ${config.images.src} 🌉`);
  return gulp.src([
    `${config.images.src}/**/*.{${config.images.extensions}}`,
    `!${config.favicons.src}`
  ])
    .pipe($.newer({ dest: config.images.dest }))
    .pipe($.imagemin([
      $.imagemin.gifsicle({ interlaced: true }),
      $.imagemin.jpegtran({ progressive: true }),
      $.imagemin.optipng({ optimizationLevel: 7 }),
      $.imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe($.cached('images'))
    .pipe(gulp.dest(config.images.dest));
});

/**
 * Generate fontello
 *  - Will end up in the src/fonts/ directory
 *
 *  1. put the fonts in a folder called 'fonts' so that the css path lines up
 *     with the final directory structure.
 */
gulp.task('generate-fontello', () => {
  return gulp.src(config.fontello.src)
    .pipe($.fontello({
      font: 'fonts' /* 1 */
    }))
    .pipe($.print())
    .pipe(gulp.dest(config.fontello.build));
});

/**
 * fonts task
 *  - simply move any font files from the temp folder to the web assets
 */
gulp.task('fonts', ['generate-fontello'], () => {
  return gulp.src([
    config.fonts.src + '**/*.{' + config.fonts.extensions + '}',
    config.fontello.build + 'fonts/*.{' + config.fonts.extensions + '}'
  ])
    .pipe(gulp.dest(config.fonts.dest));
});

/**
 * build task
 *  - sequentially execute all of the tasks that we configured earlier.
 *  - some tasks are not listed in the sequence because they are called by a
 *    main task.
 */
gulp.task('build', (done) => (
  sequence(
    'clean',
    'download',
    'fonts',
    'styles',
    'js',
    'imagemin',
    'favicons',
    // 'criticalcss',
    done
  )
));

/**
 * default task
 *  - initialize browser-sync
 *  - watch source files and live reload the browser on change
 */
gulp.task('default', ['build'], () => {
  log(`Browser-sync listening for changes`);
  $.browserSync.init({
    notifier: false,
    open: 'external',
    host: config.urls.dev.replace('https://', ''),
    proxy: '192.168.10.10',
    port: 443,
    watchOptions: {
      usePolling: true,
      interval: 500
    },
    socket: {
      namespace: (namespace) => {
        return 'localhost:443' + namespace;
      },
      domain: 'localhost:443'
    },
    https: true
  });
  gulp.watch([`${config.styles.src}**/*.{${config.styles.extensions}}`], ['styles']);
  gulp.watch([`${config.js.src}**/*.js`], ['js']);
  gulp.watch([`${config.images.src}**/*.{${config.images.extensions}}`], ['imagemin'])
    .on('change', $.browserSync.reload);
  gulp.watch([`${config.templates.src}**/*.{${config.templates.extensions}}`])
    .on('change', $.browserSync.reload)
    .on('error', (error) => handleError(error, false));
  gulp.watch([`${config.styles.src}**/open-forms.scss`], ['openForms']);
  gulp.watch([`${config.styles.src}**/style-guide.scss`], ['styleGuide']);
});
