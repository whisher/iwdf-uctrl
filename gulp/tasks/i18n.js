'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');

module.exports = gulp.task('i18n', function () {
  return gulp.src(config.paths.src.i18n)
    .pipe(gulpif(release, gulp.dest(config.paths.dest.dist.i18n), gulp.dest(config.paths.dest.build.i18n)));
});
