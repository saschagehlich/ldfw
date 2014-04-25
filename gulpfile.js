var gulp = require('gulp');

var rename = require('gulp-rename');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap-umd');

var paths = {
  scripts: ['src/**/*.coffee']
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(coffee())
    .pipe(wrap({
      deps: ['jquery']
    }))
    .pipe(concat('ldfw.js'))
    .pipe(gulp.dest('.'))
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename = "ldfw.min"
    }))
    .pipe(gulp.dest('.'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts']);
