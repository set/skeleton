import gulp from 'gulp';
import browserSync from 'browser-sync';
const server = browserSync.create();
import sass from 'gulp-sass';
import haml from 'gulp-haml';
import babel from 'gulp-babel';
import minify from 'gulp-minify';
import del from 'del';

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

const paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'assets/styles/',
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'assets/scripts/',
    },
    hamlFiles: {
        src: 'src/*.haml',
        dest: 'assets/',
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

export function hamlFiles() {
    return gulp.src(paths.hamlFiles.src)
      .pipe(haml())
      .pipe(gulp.dest(paths.hamlFiles.dest));
}

export function watch() {
    gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
    gulp.watch(paths.styles.src, gulp.series(styles, reload));
    gulp.watch(paths.hamlFiles.src, gulp.series(hamlFiles, reload));
}

export function clean() {
    return del([ 'assets' ]);
}

const build = gulp.series(clean, gulp.parallel(styles, scripts, hamlFiles), serve, watch);

export default build;