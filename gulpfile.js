/**
 * Created by jsherman on 12/18/16.
 */
var gulp = require('gulp');

// automatically load plugins listed in package.json
var gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

// recompress plugin not loading automatically
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
    return gulp.src('./build/*.html')
        .pipe(plugins.htmlmin({collapseWhitespace: true, minifyCSS: true, removeComments: true}))
        .pipe(gulp.dest('./dist'));
});

// gulp.task('styles', function() {
//     return gulp.src('css/*.css')
//         .pipe(plugins.rename({suffix: '.min'}))
//         .pipe(plugins.cssnano())
//         .pipe(gulp.dest('dist/css'))
//         .pipe(plugins.notify({ message: 'Styles task complete' }));
// });

gulp.task('scripts', function() {
    return gulp.src(['./build/js/*.js'])
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('default'))
        //  .pipe(plugins.concat('scipts.js'))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(plugins.notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
    return gulp.src(['dist/img/*', '!pizzeria.jpg' ])
        .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/img'))
        .pipe(plugins.notify({ message: 'Images task complete' }));
});

//  this task is custom for the one large file that needs to be resized and then compressed
// gulp.task('imResizeMin', function () {
//     gulp.src('dev/img/pizzeria.jpg')
//         .pipe(plugins.rename({suffix: '.sm'}))
//         .pipe(plugins.imageResize({
//             width : 600,
//             height : 400,
//             crop : true,
//             upscale : false
//         }))
//         .pipe(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
//         .pipe(gulp.dest('dist/img'));
// });

gulp.task('optimize', function () {
    return gulp.src(['./build/img/*'])
        .pipe(plugins.imagemin({
            use:[imageminJpegRecompress({
                loops:4,
                min: 60,
                max: 85,
                quality:'high'
            })]
        }))
        .pipe(gulp.dest('./dist/img'))
});

gulp.task('tinypng', function () {
    gulp.src('./build/img/*.{png,jpg,jpeg}')
        .pipe(plugins.tinypngCompress({
            key: 'M5ZRFJdR9SZM0VS4E855UWO0d8cUdQIS',
            sigFile: 'dist/img/tinypng/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('./dist/img/tinypng'));
});