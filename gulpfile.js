var gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    ngmin = require('gulp-ngmin'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    ngHtml2Js = require("gulp-ng-html2js"),
    inject = require("gulp-inject"),
    refresh = require('gulp-livereload'),
    replace = require('gulp-replace'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    pkg = require('./package.json'),
    livereloadport = 35729,
    serverport = 8080
    ngAppBase = pkg.name;

//We only configure the server here and start it only when running the watch task
var server = express();
//Add livereload middleware before static-middleware
server.use(livereload({
  port: livereloadport
}));

server.use(express.static(__dirname + '/build'));    

var nitrous_server = express();
nitrous_server.use(express.static(__dirname + '/build'));    

// =====================================
//            File Bundles
// =====================================
var base = { base: './src/app/' };

var vendorJS = [
    './src/_vendor/angular/angular.min.js',
    './src/_vendor/angular-ui-router/release/angular-ui-router.min.js'
];

var appJS = [
    './src/buid_head.js',
    './temp/**/**/*.tmpl.js',
    './src/app/app.js',
    './src/app/**/*-module.js',
    './src/app/**/*.js',
    './src/buid_foot.js',
    '!./src/app/**/*.spec.js'
];


// =====================================
//              Tasks
// =====================================

gulp.task('clean', function(){
  gulp
    .src(['./build/*', './temp/*'], {read:false})
    .pipe(clean());
});

// uglify task
gulp.task('js', function() {

    var vendorStream = gulp.src(vendorJS)
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('./build/app'));

    // Concatenate AND minify app sources
    var appStream = gulp.src(appJS)
        .pipe(concat('app.js'))
        .pipe(ngmin())
        //.pipe(uglify())
        .pipe(gulp.dest('./build/app'));


    gulp.src('./src/index.html')
        .pipe(inject(vendorStream, {starttag: '<!-- inject:vendor:{{ext}} -->', ignorePath: '/build'}))
        .pipe(inject(appStream, {starttag: '<!-- inject:app:{{ext}} -->', ignorePath: '/build'}))
        .pipe(gulp.dest('./build'))
        .pipe(refresh(lrserver));
});

// templatify
gulp.task('templatify', function () {
    gulp.src("./src/**/*.tmpl.html")
    .pipe(ngHtml2Js({
        moduleName: ngAppBase + '.templates',
        prefix: "/",
        rename: function (url) {
            var last = url.split('/').pop();
            return '/partials/' + last;
        }
    }))
    .pipe(gulp.dest("./temp"));
});

gulp.task('move', function () {
    gulp
        .src(['./src/css/**/*.*'])
        .pipe(gulp.dest('./build/css'));
});

gulp.task('serve', function() {
  //Set up your static fileserver, which serves files in the build dir
  server.listen(serverport);
  console.log('serving app on: ' + serverport);
});

gulp.task('nitrous_serve', function() {
  //Set up your static fileserver, which serves files in the build dir
  nitrous_server.listen(serverport);
  console.log('serving app on: ' + serverport);
});

gulp.task('livereload', function() {
  //Set up your livereload server
  lrserver.listen(livereloadport);
});

gulp.task('watch', function () {
    gulp.watch([
            './src/partials/**/*.js',
            './src/**/*.html',
            './src/app/**/*.js'
    ], base, function () {
        gulp.run('build');
    });
});

gulp.task('rename', function(){
  gulp.src([
           './src/**/*.js',
           '!./src/_vendor/*.js',
           './src/**/*.html',
        ])
    .pipe(replace('jobney.angular-starter', ngAppBase))
    .pipe(gulp.dest('src/'));
});

gulp.task('default', ['build', 'watch', 'serve', 'livereload']);
  
gulp.task('nitrous', ['build', 'watch', 'nitrous_serve']);

gulp.task('build', ['move','templatify', 'js']);