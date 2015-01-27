var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('minify', function() {
    return gulp.src('randomColor.js')
    .pipe(rename('randomColor.min.js'))
    .pipe(uglify({
        mangle: true

    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['minify'], function() {});