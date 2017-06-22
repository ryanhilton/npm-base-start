var gulp        = require('gulp');
var gulpUtil    = require('gulp-util');
var sass        = require('gulp-sass');
var plumber     = require('gulp-plumber');
var browserSync = require('browser-sync').create();

// Compile sass into CSS & auto-inject into browsers
gulp.task('styles', function() {
	/* Gulp Plumber, and Gulp Util to prevent Gulp from stopping on a style
	error, and to show the location of errors */
	return gulp.src("./assets/scss/*.scss")
		.pipe(plumber(function(error) {
			gulpUtil.log(gulpUtil.colors.red(error.message));
			this.emit('end');
		}))
		.pipe(sass({
			outputStyle: 'expanded',
			includePaths: ['assets/scss']
		}))
		.pipe(gulp.dest("./assets/css"))
		.pipe(browserSync.stream())
});

// Static Server + watching scss/html files
gulp.task('browsersync', function() {
	var files = [
	'./assets/css/*.css',
	'./*.html',
	'./assets/js/*.js',
    '**/*.php',
    './assets/images/**/*.{png,jpg,gif}',
	];

	browserSync.init(files, {
		server: {
			baseDir: "./",
			// ^ For local dev

			// proxy:
			// ^ In case of an actual URL
		}
	});

	gulp.watch("./assets/scss/*.scss", ['styles']);
	gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', ['browsersync']);
