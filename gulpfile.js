var del = require('del');
var exec = require('child_process').exec;
var gulp = require('gulp');

function clean() {
  del(['dist']);
}

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

gulp.task('clean', function() {
  return clean();
});

gulp.task('smash', ['clean'], function(fn) {
  return smash(fn);
});

gulp.task('default', ['smash']);
