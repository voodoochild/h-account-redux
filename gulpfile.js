var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

function clean () {
    del.sync(['./dist/*'], { force: true }, function (err, paths) {
        if (err) { return console.error(err); }
        console.log('Deleted files/folders:\n', paths.join('\n'));
    });
}

function moveStaticFiles () {
    gulp.src('./src/**/*.html').pipe(gulp.dest('./dist')).pipe(reload({ stream: true }));
    gulp.src('./src/images/**/*').pipe(gulp.dest('./dist/images')).pipe(reload({ stream: true }));
    gulp.src('./src/fonts/**/*').pipe(gulp.dest('./dist/fonts')).pipe(reload({ stream: true }));
}

function buildCSS () {
    gulp.src('./src/styles/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/styles'))
        .pipe(reload({ stream: true }));
}

function buildJS () {
    gulp.src('./src/js/**/*.js')
        .pipe(babel())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({ stream: true }));
}

gulp.task('build', function () {
    clean();
    moveStaticFiles();
    buildCSS();
    buildJS();
});

gulp.task('serve', ['build'], function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch(['src/**/*.html', 'src/images/**/*', 'src/fonts/**/*'], moveStaticFiles);
    gulp.watch('src/styles/**/*.scss', buildCSS);
    gulp.watch('src/js/**/*.js', buildJS);
});

gulp.task('clean', function () { clean(); });
gulp.task('default', ['serve']);
