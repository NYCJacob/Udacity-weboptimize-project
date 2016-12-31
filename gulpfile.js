/**
 * Created by jsherman on 12/18/16.
 */
var gulp = require('gulp');

// automatically load plugins listed in package.json
var gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

// recompress plugin not loading automatically   :/
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

// default
gulp.task('default', function() {
    console.log("default task started");
});

//  file change watch task
gulp.task('watch', function () {
    gulp.watch('./build/*.html', ['minHTML']);
});

gulp.task('minHTML', function() {
    return gulp.src('./build/**/*.html')
        .pipe(plugins.replace(/\perfmatters.js/g, "perfmatters.min.js"))
        .pipe(plugins.replace(/\main.js/g, "main.min.js"))
        .pipe(plugins.htmlmin({collapseWhitespace: true, minifyCSS: true, removeComments: true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('csslint', function () {
    return gulp.src('./build/views/css/*.css')
        .pipe(plugins.csslint())
        .pipe(plugins.csslint.formatter());
});


gulp.task('styles', function() {
    return gulp.src('build/views/css/*.css' )
        .pipe(plugins.concatCss('bundled.css'))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.cssnano())
        .pipe(gulp.dest('dist/views/css'))
        .pipe(plugins.notify({ message: 'Styles task complete' }));
});

gulp.task('jslint', function () {
    return gulp.src(['./build/js/*.js', './build/views/js/main.js'])
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.notify({message: 'jslint task complete'}));
});

gulp.task('scripts', function() {
    return gulp.src(['./build/js/*.js', './build/views/js/main.js'])
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(plugins.notify({ message: 'Scripts task complete' }));
});

gulp.task('oneScript', function () {
    return gulp.src('./build/views/js/main.js')
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('./dist/views/js'))
        .pipe(plugins.notify({ message: 'oneScript task complete' }));
});


// gulp-imagemin:   Minify PNG, JPEG, GIF and SVG images

gulp.task('images', function() {
    return gulp.src(['./build/img/*', './build/views/images/*.+(jpg|png)',  '!./views/img/pizzeria.jpg' ], {base: 'build'})
        .pipe(plugins.imagemin({
            use:[imageminJpegRecompress({
                loops:6,
                min: 60,
                max: 90,
                quality:'medium'
            })]
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(plugins.notify({ message: 'Images task complete' }));
});
