'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat'),
      pug = require('gulp-pug'),
      browserSync = require('browser-sync').create(),
      plumber = require('gulp-plumber'),
      sourcemaps = require('gulp-sourcemaps'),
      gulpPugBeautify = require('gulp-pug-beautify'),
      autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src('./src/sass/styles.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('pug', function() {
  return gulp.src('./src/pug/pages/*.pug')
      .pipe(pug({pretty: true}))
      .pipe(pug())
      .pipe(gulpPugBeautify({ omit_empty: true }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('css', function() {

  gulp.src('./src/sass/style.sass')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 5 versions', 'Android >= 3', 'Firefox ESR', 'Opera 12.1']
    }))
    .pipe(gulp.dest('./dist/css'));

});

gulp.task('js', function() {
    gulp.src('src/js/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(concat('script.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/js'))
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
  browserSync.init({ // Выполняем browserSync
    server: {
      baseDir: "./dist"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
  });
});

gulp.task('watch', ['pug', 'sass'], function() {

  gulp.watch('./src/pug/**/*.pug', ['pug']);
  gulp.watch('./src/sass/*.sass', ['css']);
  gulp.watch('./src/js/*.js', ['js']);

  gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
  gulp.watch('./dist/css/*.css').on('change', browserSync.reload);
  gulp.watch('./dist/*.html').on('change', browserSync.reload);

});

gulp.task('default', ['watch', 'browser-sync']);
