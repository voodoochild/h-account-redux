var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

function clean () {
    del.sync(['./dist'], { force: true }, function (err, paths) {
        if (err) { return console.error(err); }
        console.log('Deleted files/folders:\n', paths.join('\n'));
    });
}

function moveStaticFiles () {
    gulp.src('./src/**/*.html').pipe(gulp.dest('./dist'));
    gulp.src('./src/images/**/*').pipe(gulp.dest('./dist/images'));
    gulp.src('./src/fonts/**/*').pipe(gulp.dest('./dist/fonts'));
}

function buildCSS () {
    gulp.src('./src/styles/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/styles'));
}

function buildJS () {
    gulp.src('./src/js/**/*.js')
        .pipe(babel())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
}

gulp.task('build', function () {
    clean();
    moveStaticFiles();
    buildCSS();
    buildJS();
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.html', moveStaticFiles);
    gulp.watch('src/styles/**/*.scss', buildCSS);
    gulp.watch('src/js/**/*.js', buildJS);
});

gulp.task('clean', function () { clean(); });
gulp.task('default', ['build', 'watch']);
