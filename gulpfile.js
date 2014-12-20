var Promise = global.Promise = require('lodash-next').Promise;
require('6to5/polyfill');

var del = require('del');
var es6to5 = require('gulp-6to5');
var exec = require('child_process').exec;
var gulp = require('gulp');
var gutil = require('gulp-util');
var insert = require('gulp-insert');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var stylish = require('jshint-stylish');

function smash(fn) {
  exec('smash.sh', function(err, out, warn) {
    if(warn) {
      console.warn(warn);
    }
    if(err) {
      return fn(err);
    }
    return fn(null, out);
  });
}

function lint() {
  return gulp.src('src/**/*.js')
  .pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
}

function build() {
  return gulp.src('src/**/*.js')
  .pipe(plumber())
  .pipe(insert.prepend(
    'require(\'6to5/polyfill\'); ' +
    'const Promise = (global || window).Promise = require(\'lodash-next\').Promise; ' +
    'const __DEV__ = (process.env.NODE_ENV !== \'production\'); ' +
    'const __PROD__ = !__DEV__; ' +
    'const __BROWSER__ = (typeof window === \'object\'); ' +
    'const __NODE__ = !__BROWSER__; '))
  .pipe(es6to5())
  .pipe(gulp.dest('dist'));
}

function clean() {
  del(['dist']);
}

gulp.task('smash', function(fn) {
  return smash(fn);
});

gulp.task('lint', function() {
  return lint();
});

gulp.task('clean', function() {
  return clean();
});

gulp.task('build', ['lint', 'clean'], function() {
  return build();
});

gulp.task('default', ['build']);
