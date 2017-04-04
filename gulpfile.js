var gulp = require('gulp');
var compass = require('gulp-compass') ;
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var minifyCSS = require('gulp-minify-css');

var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

/*
	`gulp default`
	sasss , js , watch
*/
gulp.task('sass',function(){
	return gulp.src(['./sass/**/*.scss'])
		.pipe(plumber())
		.pipe(compass({
			config_file: './config.rb',
    	css: './dist/css',
    	sass: 'sass',
    	comments: false  // Don't include `comments`
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/css'))
})

gulp.task('js', function(){
	return gulp.src(['./js/**/*.js'])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
})

gulp.task('watch',function(){
	gulp.watch(['./sass/**/*.scss'], ['sass']);
  gulp.watch(['./js/**/*.js'], ['js']);
})

gulp.task('default',['sass','js','watch']);
