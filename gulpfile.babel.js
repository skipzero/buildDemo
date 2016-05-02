'use strict';

const gulp 				= require('gulp');
const gutil 			= require('gulp-util');
const bower 			= require('gulp-bower');
const sass 				= require('gulp-sass');
const notify 			= require('gulp-notify');
const runSequence = require('run-sequence');
const watch 			= require('gulp-watch');
const del 				= require('del');

const config = {
	sass: './src/css',
	js: 	'./src/js',
	bower: './bower_components',
	bowerCss: './bower_components/bootstrap-sass/assets/stylesheets',
	bowerJquery: './bower_components/jquery',
	html: './src/**/*.html'

}


gulp.task('watch', () => {
	watch([config.sass + '/*.scss', config.js + '/*.js', 'src/**/*.html'], () => {
		gulp.start();
	})
});

gulp.task('default', () => { runSequence(['clean'], ['bower'], ['build'], ['sass'], ['js'] )});

// move our templates and/or static files
gulp.task('build', () => {
	return gulp.src([config.html])
	.pipe(gulp.dest('./build/'));
});

gulp.task('bower', () => {
	return bower().pipe(
		gulp.dest(config.bower)) 
})

// processes and moves our stylesheets.
gulp.task('sass', () => {
	return gulp.src([config.sass + '/*.scss', './src/vendor/**.*.scss'])
	.pipe(sass({
		style: 'compressed',
		loadPath: [
			config.sass,
			config.bowerCss + '/**/*.scss'
		 ]
	}).on('error', notify.onError( (error) => {
		return 'ERROR: ' + error.message;
	})))
	.pipe(gulp.dest('./build/css'));
});

// uglify our JS and move to build
gulp.task('js', () => {
	return gulp.src([config.js + '/*.js'])
	// .pipe(uglify())
	.pipe(gulp.dest('./build/js'))
})

gulp.task('clean', () => {
	return del(['./build/index.html', './build/css/**/*', './build/js/**/*' ])
});
