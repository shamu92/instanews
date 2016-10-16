var gulp = require('gulp'); // Load Gulp!
// Now that we've installed the uglify package we can require it:
var uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    plumber = require('gulp-plumber');
var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify');

var plumberErrorhandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>' //will see error message in compile
    })
}

gulp.task('js', function() {
    gulp.src('./js/*.js') // What files do we want gulp to consume?
        // .pipe(plumber())
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(rename({ extname: '.min.js' })) //  Rename the uglified file
        .pipe(gulp.dest('./build/js')) // Where do we put the result?
});

gulp.task('sass', function() {
    gulp.src('./sass/style.scss')
        .pipe(plumber(plumberErrorhandler))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(cssnano())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./build/css'));
});

// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
gulp.task('browser-sync', function() {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(["build/css/*.css", "build/js/*.js"]).on("change", browserSync.reload);
});

gulp.task('plumber', function() {
    gulp.src('./src/*.ext')
        .pipe(plumber())
        .pipe(gulp.dest('./dist'));
});

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        // Brick on failure to be super strict
        .pipe(eslint.failOnError());
});


gulp.task('watch', function() {
    gulp.watch('js/*.js', ['js', 'lint']);
    gulp.watch('sass/*.scss', ['sass'])
});

gulp.task('default', ['browser-sync', 'watch',]);