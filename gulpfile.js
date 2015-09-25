/* Just setting up the basic structure of the gulp file.
 * I may add minifying later. For now just transfering
 * the src to dist and then deploying on gh-pages
 */

// Include gulp
var gulp = require('gulp');

// Have not installed the commented out plugins

// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var minifyCSS = require('gulp-minify-css');
// var removeCode = require('gulp-remove-code');
// var inject = require('gulp-inject');
// var sourcemaps = require('gulp-sourcemaps');
// var concat = require('gulp-concat');
// var minifyhtml = require('gulp-minify-html');
// var stripDebug = require('gulp-strip-debug');
// var stripComments = require('gulp-strip-comments');
var ghPages = require('gulp-gh-pages');

// paths to files
var paths =  {
    scripts: ['src/js/**.js'],
    styles: ['src/css/style.css'],
    content: ['src/index.html'],
    images: ['src/images/**.png']
};

// move js files to dist folder

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
    .pipe(gulp.dest('./dist/js'));
});

// move images files to dist folder
gulp.task('images', function() {
    return gulp.src(paths.images)
    .pipe(gulp.dest('./dist/images'));
});

// move content files to dist folder
gulp.task('content', function() {
    return gulp.src(paths.content)
    .pipe(gulp.dest('./dist'));
});

// move styles files to dist folder
gulp.task('styles', function() {
    return gulp.src(paths.styles)
    .pipe(gulp.dest('./dist/css'));
});

// put up folder on gh-pages
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

// run using "gulp watch". This is not in default list
// gulp.task('watch', function() {
// });

// NOTE: You need to run "gulp watch" independently -- see above
gulp.task('default', [ 'scripts', 'images', 'content', 'styles']);
