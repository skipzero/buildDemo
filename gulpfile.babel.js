'use strict';

const gulp 				= require('gulp');
const gulputil 		= require('gulp-util');
const sass 				= require('gulp-sass');
const runSequence = require('run-sequence');
const uglify 			= require('gulp-uglify');
const watch 			= require('gulp-watch');
const del 				= require('del');


gulp.task('watch', () => {
	watch(['src/**/*.scss', 'src/**/*.js', 'src/**/*.html'], () => {
		gulp.start();
	})
});

gulp.task('default', () => { runSequence(['clean'], ['build'], ['sass'], ['js'] )});

// move our templates and/or static files
gulp.task('build', () => {
	return gulp.src(['./src/**/*.html'])
	.pipe(gulp.dest('./build/'));
});

// processes and moves our stylesheets.
gulp.task('sass', () => {
	return gulp.src(['./src/**/*.scss', './src/vendor/**.*.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./build/'));
});

// uglify our JS and move to build
gulp.task('js', () => {
	return gulp.src(['./src/**/*.js'])
	// .pipe(uglify())
	.pipe(gulp.dest('./build/'))
})

gulp.task('clean', () => {
	return del(['./build/index.html', './build/css/**/*', './build/js/**/*' ])
});
