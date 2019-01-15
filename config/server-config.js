/**
 * @ Browsersync configs
 */

module.exports = {
  host: 'localhost',
  port: 8080,
  ui: {
    port: 8081
  },
  files: [
    '../dev/**/*.css',
    '../dev/**/*.js',
    '../dev/**/*.html',
    '../src/templates/_data/*.json'
  ],
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn: (snippet, match) => snippet + match
    }
  },
  server: {
    baseDir: '../dev',
    directory: false
  },
  reloadThrottle: 100,
  reloadDebounce: 1000,
  logPrefix: 'server',
  open: 'local',
  browser: 'google chrome',
  cors: true,
  notify: false
};
