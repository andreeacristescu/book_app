import gulp from "gulp";
import notify from "gulp-notify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import uglify from "gulp-uglify";
import gutil from "gulp-util";
import imagemin from "gulp-imagemin";
import browserify from "browserify";
import tsify from "tsify";
import ngAnnotate from "browserify-ngannotate";
import BrowserSync from "browser-sync";
import rename from "gulp-rename";
import templateCache from "gulp-angular-templatecache";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import sassdoc from "sassdoc";
import minifyCSS from "gulp-minify-css";
import del from "del";

/** Paths Config - START **/
let paths = {
    srcPath: './src'
};

Object.assign(paths, {
    appPath: `${paths.srcPath}/app`,
    buildPath: "./build",
    templateFile: "app.templates.ts",
    appTsFile: 'app.ts',
    appJsFile: 'app.js'
});

Object.assign(paths, {
    tsFilesPath: `${paths.appPath}/**/*.ts`,
    viewFilesPath: `${paths.appPath}/**/*.html`,
    sassFilesPath: `${paths.srcPath}/**/*.scss`,
    styleSassFilePath: `${paths.srcPath}/scss/style.scss`,
});

/** Paths Config - DONE **/

const interceptErrors = function(error) {
    const args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};

gulp.task('clean', () => {
    return del([paths.buildPath, `${paths.appPath}/_config/app.constants.ts`]);
});

gulp.task('html:index', () => {
    return gulp
        .src(`${paths.srcPath}/index.html`)
        .on('error', interceptErrors)
        .pipe(gulp.dest(`${paths.buildPath}/`));
});

gulp.task('env:constants', () => {
    return gulp
        .src(`${paths.appPath}/_config/env/${gutil.env.env}/app.constants.ts`)
        .on('error', interceptErrors)
        .pipe(gulp.dest(`${paths.appPath}/_config/`));
});

gulp.task('html:healthy', () => {
    return gulp
        .src(`${paths.srcPath}/healthy.html`)
        .on('error', interceptErrors)
        .pipe(gulp.dest(`${paths.buildPath}/`));
});

gulp.task('assets:fonts', () => {
    return gulp
        .src([`${paths.srcPath}/assets/fonts/**`])
        .on('error', interceptErrors)
        .pipe(gulp.dest(`${paths.buildPath}/fonts/`));
});

gulp.task('assets:favicon', () => {
    return gulp
        .src([`${paths.srcPath}/assets/favicon.ico`])
        .on('error', interceptErrors)
        .pipe(gulp.dest(`${paths.buildPath}/`));
});

gulp.task('assets:images', () => {
    return gulp
        .src([`${paths.srcPath}/assets/images/**`])
        .pipe((!gutil.env.imagemin) ? gutil.noop() : imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 7 }),
            imagemin.svgo({ plugins: [{ removeViewBox: true }] })
        ], {
            verbose: true
        }))
        .on('error', interceptErrors)
        .pipe(gulp.dest(`${paths.buildPath}/images/`));
});

gulp.task('html:views', () => {
    return gulp
        .src(paths.viewFilesPath)
        .pipe(templateCache({
            standalone: true
        }))
        .on('error', interceptErrors)
        .pipe(rename(paths.templateFile))
        .pipe(gulp.dest(`${paths.appPath}/_config/`));
});

gulp.task('browserify', () => {
    return browserify(`${paths.appPath}/${paths.appTsFile}`, {
            insertGlobals: true,
            debug: gutil.env.env !== 'prod'
        })
        .plugin(tsify)
        .transform(ngAnnotate)
        .bundle()
        .pipe(source(paths.appJsFile))
        .pipe((gutil.env.env !== 'prod') ? gutil.noop() : buffer())
        .pipe((gutil.env.env !== 'prod') ? gutil.noop() : uglify({
            mangle: false
        }))
        .pipe(gulp.dest(`${paths.buildPath}/`))
        .on('error', interceptErrors);
});

gulp.task('sass:style', () => {
    return gulp
        .src(paths.styleSassFilePath)
        .pipe((gutil.env.env === 'prod') ? gutil.noop() : sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded'
        }).on('error', interceptErrors))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        }))
        .pipe(minifyCSS())
        .pipe((gutil.env.env === 'prod') ? gutil.noop() : sourcemaps.write('.'))
        .pipe(gulp.dest(`${paths.buildPath}/`))
        //.pipe((gutil.env.env === 'prod') ? gutil.noop() : sassdoc({dest: `${paths.buildPath}/sassdoc`}))
        .resume();
});

gulp.task('build', gulp.series('clean', 'env:constants', 'html:index', 'html:healthy', 'assets:fonts', 'assets:favicon', 'assets:images', 'html:views', 'browserify', 'sass:style'));

gulp.task('notify:browser-refresh', (done) => {
    const args = Array.prototype.slice.call(arguments);

    notify.onError({
        title: 'You can Refresh',
        message: 'Refresh your browser'
    }).apply(this, args);

    done();
});

gulp.task('watch', (done) => {
    gulp.watch(`${paths.appPath}/index.html`, gulp.series('html:index', 'notify:browser-refresh'));
    gulp.watch(paths.viewFilesPath, gulp.series('html:views'));
    gulp.watch(paths.tsFilesPath, gulp.series('browserify', 'notify:browser-refresh'));
    gulp.watch(paths.sassFilesPath, gulp.series('sass:style', 'notify:browser-refresh'));
    done();
});

gulp.task('default', gulp.series('build', 'notify:browser-refresh', 'watch', (done) => {

    const browserSync = BrowserSync.create();

    browserSync.init([`${paths.buildPath}/**/**.**`], {
        server: paths.buildPath,
        open: false,
        https: (gutil.env.env !== 'dev'),
        codeSync: false,
        port: 8000,
        notify: false,
        ui: {
            port: 8001
        }
    });

    done();
}));