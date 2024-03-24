import gulp from 'gulp';
import gulpLess from 'gulp-less';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import pug from 'gulp-pug'

var paths = {
    styles: {
        src: 'src/style/*.less',
        dest: 'assets/styles/'
    },
    scripts: {
        src: 'src/*.js',
        dest: 'assets/scripts/'
    },
    views: {
        src: 'src/views/*.pug',
        dest: 'assets/views/'
    },
    images: {
        src: 'public/images/*',
        dest:'assets/images/'
    }
};

function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(gulpLess())
        .pipe(cleanCSS())
        // pass in options to the stream
        .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
    return gulp
        .src(paths.scripts.src)
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
}

function views() {
    return gulp
        .src(paths.views.src)
        .pipe(pug())
        .pipe(gulp.dest(paths.views.dest));
}

function copyImages() {
    return gulp
        .src(path.images.src)
        .pipe(gulp.dest(path.images.dest))
}
function dev() {
    styles();
    scripts();
    views();
    setTimeout(() => console.log('done'), 5000);
}

var build = gulp.series(gulp.parallel(styles, scripts, views));

export { build };


