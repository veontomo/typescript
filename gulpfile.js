/*jslint plusplus: true, white: true */

var gulp   = require('gulp');
var ts    = require('gulp-typescript');
var uglify  = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var tsPath = 'typescript/*.ts';
var compilePath = 'js/compiled';
var dist = 'js/dist';


gulp.task('compressScripts', function () {
    gulp.src([compilePath + 'typescript/*.js'])
        .pipe(plumber())
        .pipe(concat('scripts.min.js')).
        pipe(uglify())
        .pipe(gulp.dest(dist));
});

gulp.task('typescript', function () {
    var tsResult = gulp.src(tsPath)
        .pipe(ts({
            target: 'ES5',
            declarationFiles: false,
            noExternalResolve: true
        }));
    tsResult.dts.pipe(gulp.dest(compilePath + '/tsdefinitions'));
    return tsResult.js.pipe(gulp.dest(compilePath + '/typescript'));
});

gulp.task('watch', function(){
    gulp.watch([tsPath], ['typescript']);
});

gulp.task('default', ['typescript', 'watch', 'compressScripts']);