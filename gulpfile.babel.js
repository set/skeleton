import gulp from 'gulp';
import browserSync from 'browser-sync';
const server = browserSync.create();
import sass from 'gulp-sass';
import nunjucks from 'gulp-nunjucks';
import babel from 'gulp-babel';
import minify from 'gulp-minify';
import rename from 'gulp-rename';
import del from 'del';

const paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'assets/styles/',
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'assets/scripts/',
    },
    htmlFiles: {
        src: 'src/**/*.nunjucks',
        dest: 'assets/',
    },
    images: {
        src: 'src/images/**/*',
        dest: 'assets/images/',
    },
    fonts: {
        src: 'src/fonts/**/*',
        dest: 'assets/fonts/',
    },
};

export function styles() {
    return gulp.src(paths.styles.src)
      .pipe(sass())
      .pipe(minify())
      .pipe(gulp.dest(paths.styles.dest));
}

export function scripts() {
    return gulp.src(paths.scripts.src)
      .pipe(babel())
      .pipe(gulp.dest(paths.scripts.dest));
}

export function htmlFiles() {
    return gulp.src(paths.htmlFiles.src)
      .pipe(nunjucks.compile())
      .pipe(rename({
          extname: '.html'
      }))
      .pipe(gulp.dest(paths.htmlFiles.dest));
}

export function images(){
    return gulp.src(paths.images.src)
      .pipe(gulp.dest(paths.images.dest));
}

export function fonts(){
    return gulp.src(paths.fonts.src)
      .pipe(gulp.dest(paths.fonts.dest));
}

function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    server.init({
        server: {
            baseDir: './assets/'
        }
    });
    done();
}

export function clear(){
    return del(['assets']);
}

export function watch() {
    gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
    gulp.watch(paths.styles.src, gulp.series(styles, reload));
    gulp.watch(paths.htmlFiles.src, gulp.series(htmlFiles, reload));
    gulp.watch(paths.images.src, gulp.series(images, reload));
    gulp.watch(paths.fonts.src, gulp.series(fonts, reload));
}

const build = gulp.series(clear, gulp.parallel(styles, scripts, htmlFiles, images, fonts), serve, watch);

export default build;
