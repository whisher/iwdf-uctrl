'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');
var minifyHTML = require('gulp-minify-html');

module.exports = gulp.task('index', function () {
  return gulp.src(config.paths.src.index)
    .pipe(gulpif(release, minifyHTML({comments: true, empty: true, spare: true, quotes: true})))
    .pipe(
      replace('<!--styles-->', '<link rel="stylesheet" href="styles/' + config.filenames.styles + '">')
    )
    .pipe(
      replace('<!--vendor-->', '<script src="scripts/' + config.filenames.vendor + '"></script>')
    )
    .pipe(
      replace('<!--i18n-->', '<script src="scripts/i18n/angular-locale_' + config.filenames.i18n + '.js"></script>')
    )
    .pipe(
      replace('<!--scripts-->', '<script src="scripts/' + config.filenames.scripts + '"></script>')
    )
    .pipe(gulpif(release,
    gulp.dest(config.paths.dest.dist.index),
          gulp.dest(config.paths.dest.build.index)));
});
