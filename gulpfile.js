var gulp = require('gulp');
var gulpIf = require('gulp-if');
var argv = require('yargs').argv;
var pkg = require('./package.json');
var config = pkg['emitter-configs'].default;

var runSequence = require('run-sequence');
var path = require('path');
var del = require('del');

var plugin = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
//var buffer = require('vinyl-buffer');

gulp.task('clean', function (callback) {
    del(path.join(config.dest.dir, '*'), callback);
});

gulp.task('build', function () {
    var isProduction = !!argv.prod;

    return gulp.src(config.src.js)
        .pipe(gulpIf(!isProduction, plugin.sourcemaps.init()))
        .pipe(plugin.babel())
        .pipe(gulpIf(isProduction, plugin.concat(config.bundle.js)))
        .pipe(gulpIf(isProduction, plugin.uglify()))
        .pipe(gulpIf(!isProduction, plugin.sourcemaps.write(".")))
        .pipe(gulp.dest(config.dest.js));
});

gulp.task('tests', function () {
    return browserify({
        entries: ['tests/src/test.js'],
        transform: [babelify],
        debug: false,
        fullPaths: false
    })
        .bundle()
        .pipe(source(config.bundle.tests))
        .pipe(gulp.dest(config.dest.tests));
});

gulp.task('default', function (callback) {
    runSequence('clean', ['build'], callback);
});
