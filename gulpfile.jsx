import _ from 'lodash';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import plumber from 'gulp-plumber';
import rimraf from 'rimraf';
import { exec } from 'child_process';

gulp.task('clean', _.partial(rimraf, 'dist'))
gulp.task('lint', () =>
  gulp.src('src/**/*.jsx')
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
)
gulp.task('test', ['lint', 'smash'], () =>
  gulp.src('src/**/__tests__/**/*.jsx')
  .pipe(plumber())
  .pipe(mocha())
);
gulp.task('smash', (fn) =>
  exec('smash.sh', function(err, out, warn) {
    if(warn) {
      console.warn(warn);
    }
    if(err) {
      return fn(err);
    }
    return fn(null, out);
  })
);

gulp.task('default', ['test']);
