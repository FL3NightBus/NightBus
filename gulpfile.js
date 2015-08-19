var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    streamqueue  = require('streamqueue');
gulp.task('script', function() {
  return streamqueue({ objectMode: true },
          gulp.src('dev/templates/onLineTrafficViewTemplate.js'),
          gulp.src('dev/templates/chatTemplate.js'),
          gulp.src('dev/templates/searchcViewTemplate.js'),
          gulp.src('dev/js/mapAndMarkers.js'),
          gulp.src('dev/js/search.js'),
          gulp.src('dev/js/chat.js'),
          gulp.src('dev/js/menu.js'),
          gulp.src('dev/js/time.js')
      )
      .pipe(concat('app.js'))
      .pipe(gulp.dest('dist/js'))
      //.pipe(sourcemaps.init())
      .pipe(uglify())
      //.pipe(sourcemaps.write())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('dist/js'));
});
gulp.task('sass', function() {
    gulp.src('dev/scss/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('dist/css'))
      .pipe(concat('style.css'))
      //.pipe(sourcemaps.init())
      .pipe(cssmin())
      //.pipe(sourcemaps.write())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('dist/css'));
});
gulp.task('watch', function() {
    gulp.watch('dev/*/*.js', ['script']);
    gulp.watch('dev/scss/*.scss', ['sass']);
});
gulp.task('build', ['sass', 'script', 'watch']);
