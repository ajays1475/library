var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
    return gulp.src(jsFiles) //Passing the types of files in which to check code syntax
        .pipe(jshint()) //Piping the source files to jshint for syntax checking
        .pipe(jshint.reporter('jshint-stylish', { //Piping result to jshint stylish to display errors
            verbose: true
        }))
        .pipe(jscs()); //Piping results to jscs to check style
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css',
        './public/js/*.js'
    ], {
        read: false
    });
    var injectOptions = {
        ignorePath: '/public'
    };
    var options = {
        bowerJson: require('./bower.json'), //Path of bower.json to tell wiredep what dependencies it need to inject
        directory: './public/lib', //Path of directory where dependencies specified in bower.json are installe
        ignorePath: '../../public'
    };
    gulp.src('./src/views/*.jade') //Path of html files where dependencies have to be injected.Changed to jade to inject in jade file
        .pipe(wiredep(options)) //Piping the html files to wiredep for injecting dependencies
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views/')); //Piping the results back to destination folder
});

gulp.task('serve',['style','inject'],function() {
    var options = {
        script:'app.js',
        delayTime:1,
        env:{
            'PORT':3000
        },
        watch:jsFiles
    };
    return nodemon(options)
    .on('restart',function(ev) {
        console.log('Restarting.......');
    });
});