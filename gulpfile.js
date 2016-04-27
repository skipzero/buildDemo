'use strict';

const gulp 				= require('gulp');
const gulputil 		= require('gulp-util');
const sass 				= require('gulp-sass');
const sourcemaps 	= require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const uglify 			= require('gulp-uglifyjs');
const watch 			= require('gulp-watch');
const del 				= require('del');

gulp.task('watch', function() {
	watch(['src/**/*.scss', 'src/**/*.js', 'src/**/*.html'], function () {
		gulp.start();
	})
});

gulp.task('default', function() { runSequence(['clean'], ['build'], ['sass'], ['js'] )});

// move our templates and/or static files
gulp.task('build', function() {
	return gulp.src(['./src/**/*.html'])
	.pipe(gulp.dest('./build/'));
});

// processes and moves our stylesheets. 
gulp.task('sass', function () {
	return gulp.src(['./src/**/*.scss'])
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./build/')); 
});

// uglify our JS and move to build
gulp.task('js', function() {
	return gulp.src(['./src/**/*.js'])
	.pipe(uglify())
	.pipe(gulp.dest('./build/'))
})

gulp.task('clean', function () {
	return del(['./build/**/*'])
});