'use strict';

const gulp 				= require('gulp');
const gutil 			= require('gulp-util');
const prefixer    = require('gulp-autoprefixer');
const eslint      = require('gulp-eslint');
const babel				= require('gulp-babel');
const bower 			= require('gulp-bower');
const sass 				= require('gulp-sass');
const notify			= require('gulp-notify');
const uglify			= require('gulp-uglify');
const clean 			= require('gulp-clean-css');
const sourcemaps 	= require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const watch 			= require('gulp-watch');
const del 				= require('del');

const config = {
	sass:        './src/css',
	js:          './src/js',
	bower:       './bower_components',
	bowerCss:    './bower_components/bootstrap-sass/assets/stylesheets',
	bowerJquery: './bower_components/jquery/dist/jquery.min.js',
	html:        './src/**/*.html',
	build:       './build'
}

gulp.task('watch', () => {
	watch([config.sass + '/*.scss', config.js + '/*.js', 'src/**/*.html'], () => {
		gulp.start();
	})
});

gulp.task('default', () => {
	runSequence(['clean'], ['bower'], ['build'], ['icons'], ['sass'], ['js'], ['lint'])
});

// move our templates and/or static files
gulp.task('build', () => {
	return gulp.src([config.html])
		.pipe(gulp.dest(config.build));
});

gulp.task('bower', () => {
	return bower()
		.pipe(gulp.dest(config.bower))
});

// processes and moves our stylesheets.
gulp.task('sass', () => {
	return gulp.src([config.sass + '/*.scss', config.bowerCss + '/**/*.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({
			style: 'compressed',
			includePaths: [
				config.sass,
				config.bowerCss
			]
		}).on('error', notify.onError((error) => {
			return '\n\n ERROR: ' + error.formatted, error;
		})))
    .pipe(prefixer())
		.pipe(clean())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/css'));
});

gulp.task('lint', () => {
  return gulp.src([config.js + '/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    // .pipe(eslint.failAfterError())
})

gulp.task('icons', () => {
  return gulp.src([config.bowerBS + '/assets/fonts/bootstrap/**'])
    .pipe(gulp.dest('./build/fonts'))
});

// uglify our JS and move to build
gulp.task('js', () => {
	return gulp.src([config.js + '/*.js', config.bowerJquery])
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify()
			.on('error', notify.onError((error) => {
				return '\n\n ERROR: ' + error.formatted, error;
			})))
		.pipe(gulp.dest(config.build + '/js'))
})

gulp.task('clean', () => {
	return del(['./build/']).then(paths => {
    console.log('Deleted ' + paths.join('\n'));
  })
});
