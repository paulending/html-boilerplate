'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();

var src = './src';
var dest = './dist';

// TODO: minify js
// TODO: move and optimize images
// TODO: add css autoprefixer

/// Compile SASS
gulp.task('sass', function() {
    return gulp.src(src + '/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest + '/css'))
        .pipe(browserSync.stream());
});

/// Compile LESS
gulp.task('less', function() {
    return gulp.src(src + '/less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest + '/css'))
        .pipe(browserSync.stream());
});

/// Watch styles and html
gulp.task('watch', function() {
    gulp.watch(src + '/sass/**/*.scss', ['sass']);
    gulp.watch(src + '/less/**/*.less', ['less']);
    gulp.watch(src + "/*.html");
});

/// Browsersync
// Static Server + watching less/scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch(src + "/scss/*.scss", ['sass']);
    gulp.watch(src + "/less/*.less", ['less']);
    gulp.watch(src + "/*.html").on('change', browserSync.reload);
});

/// Gulp tasks
gulp.task('default', ['serve']); // run browsersync and watch sources