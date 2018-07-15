var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

//***************************************************
// JAVASCRIPT
//***************************************************
var jsSrc = ['app/**/*.js', 'config/**/*.js'];
gulp.task('check', function() {
    return gulp.src(jsSrc)
        .pipe(plugins.jshint({esversion: 6}))
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.jshint.reporter('fail'));
});

//***************************************************
// NODEMON
//***************************************************
gulp.task('nodemon', function() {

    var nodemon = plugins.nodemon({
        script: 'index.js',
        tasks: ['check'],
        watch: ['.'],
        ignore: ['./public', 'gulpfile.js'],
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    });

    nodemon.on('crash', function() {
        var delay = 3;
        nodemon.emit('restart', delay);
    });

    return nodemon;
});

//***************************************************
// DEFAULT
//***************************************************
gulp.task('default',    ['nodemon']);

