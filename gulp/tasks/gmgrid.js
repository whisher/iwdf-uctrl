'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');

module.exports = gulp.task('gmgrid', function () {
  return gulp.src(config.paths.src.gmgrid)
    .pipe(gulpif(release, gulp.dest(config.paths.dest.dist.gmgrid), gulp.dest(config.paths.dest.build.gmgrid)));
});
