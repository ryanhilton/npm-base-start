// Includes
let gulp            = require('gulp');
let gulpUtil        = require('gulp-util');
let browserSync     = require('browser-sync').create();
let nunjucksRender  = require('gulp-nunjucks-render');

// Source Paths
let jsSources = ('dev-assets/js/*.js');
let styleSources = ('dev-assets/scss/*.scss');
let imgSources = ('dev-assets/images/*');

let outputDir = 'assets';

// Compilation of nunjucks templates, etc.
gulp.task('nunjucks', function() {
    return gulp.src('pages/**/*.+(html|nunjucks|njk)')
    .pipe(nunjucksRender ({
        path: ['nunjucks-templates']
    }))
    .pipe(gulp.dest('nunjucks-output'))
});

// Static Server + watching scss/html files
gulp.task('browsersync', function() {
    var files = [
        './assets/css/*.css',
        './*.html',
        './dev-assets/js/*.js',
        '**/*.php',
        './assets/images/**/*.{png,jpg,gif}',
    ];

    browserSync.init(files, {
        server: {
            baseDir: './',
            // ^ For local dev

            // proxy:
            // ^ In case of an actual URL
        }
    });

    gulp.watch('./dev-assets/scss/*.scss', ['styles']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browsersync']);