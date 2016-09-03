var gulp = require('gulp');
var jshint = require('gulp-jshint');
var htmlmin = require('gulp-htmlmin');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('build', ['minify', 'nodejs']);

gulp.task('publish', ['build', 'icons', 'locale']);

gulp.task('icons', function() {
    return gulp.src('src/icons/**/*').pipe(gulp.dest('epr04s/icons'));
});

gulp.task('locale', function() {
    return gulp.src('src/locales/**/*').pipe(gulp.dest('epr04s/locales'));
});

gulp.task('minify', function () {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            minifyJS: true, minifyCSS: true, minifyURLs: true,
            maxLineLength: 120, preserveLineBreaks: false,
            collapseWhitespace: true, collapseInlineTagWhitespace: true, conservativeCollapse: true,
            processScripts:["text/x-red"], quoteCharacter: "'"
        }))
        .pipe(gulp.dest('epr04s'))
});

gulp.task('nodejs', function () {
    return gulp.src('src/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'))
      .pipe(gulp.dest('epr04s'));
});

gulp.task('lint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
});

