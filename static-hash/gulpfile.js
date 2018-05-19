const gulp = require('gulp');
const staticHash = require('gulp-static-hash');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');

gulp.task('hash-url', function () {
    return gulp.src('index.html')
        .pipe(staticHash({asset: 'static'}))
        .pipe(gulp.dest('dest'));
});


gulp.task('hash-rev', function () {
    return gulp.src(['static/*.js', 'static/*.css'])
        .pipe(rev())
        .pipe(gulp.dest('dest'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev'));
})

gulp.task('hash-filename', ['hash-rev'], function () {
    return gulp.src(['rev/*.json', 'index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('dest'));
});