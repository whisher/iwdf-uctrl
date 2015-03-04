'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');

module.exports = gulp.task('externals', function () {
	return gulp.src(config.paths.src.externals,{base: config.paths.src.externalsBase})
    	.pipe(gulpif(release, gulp.dest(config.paths.dest.dist.externals), gulp.dest(config.paths.dest.build.externals)));
});
