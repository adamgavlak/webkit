// Gulp modules
var gulp = require('gulp');

// Image optimization
var imagemin = require('gulp-imagemin');

// Javascript
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// HTML templating
var jade = require('gulp-jade');

// Stylesheets
var style = require('gulp-stylus');

// Browsersync for faster browser testing
var browsersync = require('browser-sync').create();

// Copies all fonts from ./assets folder and places them
// in ./public/assets/fonts
gulp.task('copy_fonts', function() {
  gulp.src('./assets/**/*.{ttf,woff,eof,svg}')
      .pipe(gulp.dest('./web/assets/fonts'));
});

// Takes all images from ./assets folder, optimizes them
// and places it in ./public/assets/images
gulp.task('process_images', function() {
  gulp.src('./assets/**/*.{png,jpg,jpeg,gif}')
      // TODO: Optimize image filesize
      .pipe(gulp.dest('./web/assets/images'));
});

// Processes all scripts from ./scripts folder
// Result is javascript file called 'app.js'
// placed in ./public/assets and browsersync is refreshed
gulp.task('process_scripts', function() {
  gulp.src('./scripts/**/*.js')
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./web/assets'))
      .pipe(browsersync.stream());
});

// Process CSS in ./stylesheets written using Stylus
// and place files in ./public/assets/style.css
// Partials (files that won't be rendered) start with underscore '_'
gulp.task('process_styles', function() {
  gulp.src(['./styles/**/*.styl', '!./styles/**/_*.styl'])
      .pipe(style({compress: true}))
      .pipe(gulp.dest('./web/assets'))
      .pipe(browsersync.stream());
});

gulp.task('process_views', function() {
  gulp.src(['./views/**/*.jade', '!./views/**/_*.jade'])
      .pipe(jade({pretty: true}))
      .pipe(gulp.dest('./web'));
});

gulp.task('server', function() {
  browsersync.init({server: "./web"});

  gulp.watch('./styles/**/*.styl', ['process_styles']);
  gulp.watch('./scripts/**/*.js', ['process_scripts']);
  gulp.watch('./views/**/*.jade', ['process_views']);
  gulp.watch('./web/**/*').on('change', browsersync.reload);
});

gulp.task('s', ['server']);
gulp.task('default', ['process_styles', 'process_scripts', 'process_views']);