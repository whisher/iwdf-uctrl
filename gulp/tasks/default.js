'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('default', function() {
    if (release) { 
        runSequence(
                'clean',
                ['index', 'styles', 'fonts', 'assets','images', 'templates'],
                ['hint'],
                ['vendor','scripts','externals']
               );
    } else {
        runSequence(
                'clean',
               ['index', 'styles', 'fonts', 'assets', 'images', 'templates'],
                ['hint'],
                ['vendor','scripts','externals'],
                'watch'
       );
    }
}
);


