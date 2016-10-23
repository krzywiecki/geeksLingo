var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');

const htmlDir = "./html/";
const assetsDir = "./assets/";
const assetsDist = './assets/dist/';

gulp.task('webserver', ['styles'], function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true,
            port: 8081
        }));
});

gulp.task('styles', function () {
    gulp.src(assetsDir + 'styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest( assetsDist + 'css'))    
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(htmlDir, function(){
        gulp.src(htmlDir).pipe(livereload());
    });
    gulp.watch(htmlDir, function(){
        gulp.src(stylesDir).pipe(livereload());
    });

    gulp.watch( assetsDir + 'styles/*', ['styles']);
});

gulp.task('default', ['build'], function() {});
gulp.task('build', ['styles'], function () {});