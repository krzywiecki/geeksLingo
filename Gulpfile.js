var gulp = require('gulp');
var twig = require('gulp-twig');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');

const htmlDir = "./html/";
const assetsDir = "./assets/";
const distDir = './assets/dist/';

gulp.task('webserver', ['styles', 'twig'], function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true,
            port: 8081
        }));
});

gulp.task('copyfonts', function() {
    gulp.src(assetsDir + 'fontello/font/*.{ttf,woff,woff2,eof,eot,svg}')
        .pipe(gulp.dest(distDir + 'fontello/'));
});

gulp.task('icons', function() {
    gulp.src(assetsDir + 'fontello/css/*.css')
        .pipe(concat('icons.css'))
        .pipe(gulp.dest(distDir + 'fontello/'));
});

gulp.task('styles', function () {
    gulp.src(assetsDir + 'styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest( distDir + 'css'));
});

gulp.task('twig', function() {
    gulp.src([assetsDir + 'html/*.twig', '!' + assetsDir + 'html/layout.twig'])
        .pipe(twig())
        .pipe(gulp.dest(htmlDir));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(assetsDir + 'html/', function(){
        gulp.src(assetsDir + 'html/').pipe(livereload());
    });
    gulp.watch(htmlDir, function(){
        gulp.src(assetsDir + 'styles/').pipe(livereload());
    });

    gulp.watch( assetsDir + 'styles/*', ['styles']);
    gulp.watch( assetsDir + 'html/**/*.twig', ['twig']);
});

gulp.task('default', ['build'], function() {});
gulp.task('build', ['styles', 'copyfonts', 'icons', 'twig'], function () {});