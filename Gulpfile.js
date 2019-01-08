var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var pug = require('gulp-pug');
const minify = require('gulp-minify');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/scss/*/*.scss",['sass']).on('change', browserSync.reload);
    gulp.watch("app/*.pug",['html']).on('change', browserSync.reload);
    gulp.watch("app/**/*.pug",['html']).on('change', browserSync.reload);
    gulp.watch("app/js/*.js",['js']).on('change', browserSync.reload);
    gulp.watch("app/js/*/*.js",['js']).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(minify())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src("app/*.pug")
        .pipe(pug())
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src("app/js/**/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
