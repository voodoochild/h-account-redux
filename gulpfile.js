var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var fileinclude = require('gulp-file-include');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

function clean () {
    del.sync(['./dist/*'], { force: true }, function (err, paths) {
        if (err) { return console.error(err); }
        console.log('Deleted files/folders:\n', paths.join('\n'));
    });
}

function buildHTML () {
    return gulp.src('./src/*.html')
        .pipe(fileinclude({ basepath: './src/partials' }))
        .pipe(gulp.dest('./dist'))
        .pipe(reload({ stream: true }));
}

function buildImages () {
    return gulp.src('./src/images/**/*.png')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/images'))
        .pipe(reload({ stream: true }));
}

function buildFonts () {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'))
        .pipe(reload({ stream: true }));
}

function buildCSS () {
    gulp.src('./src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
        .pipe(gulp.dest('./dist/styles'))
        .pipe(sourcemaps.write())
        .pipe(reload({ stream: true }));
}

function buildJS () {
    var jsFiles = [
        './bower_components/zepto/zepto.min.js',
        './bower_components/velocity/velocity.min.js',
        './src/js/bookings-data.js',  // needs to be loaded before app.js
        './src/js/**/*.js'
    ];
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('bundle.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(sourcemaps.write())
        .pipe(reload({ stream: true }));
}

gulp.task('build', function () {
    clean();
    buildHTML();
    buildImages();
    buildFonts();
    buildCSS();
    buildJS();
});

gulp.task('serve', ['build'], function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('src/**/*.html', buildHTML);
    gulp.watch('src/images/**/*.png', buildImages);
    gulp.watch('src/fonts/**/*', buildFonts);
    gulp.watch('src/styles/**/*.scss', buildCSS);
    gulp.watch('src/js/**/*.js', buildJS);
});

gulp.task('clean', function () { clean(); });
gulp.task('default', ['serve']);
