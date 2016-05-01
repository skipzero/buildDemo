'use strict';

let gulp 				= require('gulp');
let gulputil 		= require('gulp-util');
let sass 				= require('gulp-sass');
let runSequence = require('run-sequence');
let uglify 			= require('gulp-uglify');
let watch 			= require('gulp-watch');
let del 				= require('del');


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
	return gulp.src(['./src/**/*.scss', './src/vendor/**.*.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./build/')); 
});

// uglify our JS and move to build
gulp.task('js', function() {
	return gulp.src(['./src/**/*.js'])
	// .pipe(uglify())
	.pipe(gulp.dest('./build/'))
})

gulp.task('clean', function () {
	return del(['./build/index.html', './build/css/**/*', './build/js/**/*' ])
});