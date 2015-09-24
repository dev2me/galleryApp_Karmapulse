/*
*	Import Node.js packages
*/
var gulp = require('gulp'),
 	watch = require('gulp-watch'),
 	concat = require('gulp-concat'),
 	sass = require('gulp-ruby-sass'),
 	connect = require('gulp-connect'),
 	plumber = require('gulp-plumber'),
 	sourcemaps = require('gulp-sourcemaps');

/*
*	Sass Config
*/
var sassConfig = {
 	compass: true,
 	sourcemap: true,
 	lineNumbers: true,
 	style: "expanded",
 	require: ["susy", "compass", "breakpoint"]
};

var sassMainFile = 'galleryApp.scss';

/*
*	Javascript Sources
*/
var jsFiles = [
	'./app/public/js/galleryApp.js'
];

/*
*	Gulp default task  Run "grunt"
*		- Compile Sass
*		- Concat Javascript
*		- Up HTTP basic server in port 8082
*/
gulp.task('default', ['sass', 'js-concat', 'server']);

/*
*	Gulp live dev task Run "grunt live"
*		- Compile Sass
*		- Concat Javascript
*		- Up HTTP basic server in port 8082
*		- All restarting the browser when it finds changes
*/
gulp.task('live', ['sass', 'js-concat', 'livereload', 'watch-files']);


/*
*	Server Task ( No liveReload )
*/
gulp.task('server', function() {

 	connect.server({
     	port: 8082,
     	host: 'dev.machinita',
     	root: ['app/', './']
    });

});

/*
*	Server liveReload Task
*/
gulp.task('livereload', function() {

 	connect.server({
     	port: 8082,
     	livereload: true,
     	host: 'dev.machinita',
     	root: ['app/', './']
    });

});

/*
*	Enable Sass watch
*/
gulp.task('watch-files', function() {

	//	Sass Files
 	gulp.watch('./app/public/sass/main.scss', ['sass-reload']);
	gulp.watch('./app/public/sass/base/*.scss', ['sass-reload']);
	gulp.watch('./app/public/sass/modules/*.scss', ['sass-reload']);

	//	Javascript Files
	gulp.watch('./app/public/js/**/*.js', ['js-reload']);

});


/*
*	Sass Compile
*/
gulp.task('sass', function() {

	return sass('./app/public/sass/' +  sassMainFile, sassConfig)
			.pipe(plumber())
			.pipe(sourcemaps.write('./maps'))
			.pipe(gulp.dest('./app/public/build/css'));

});


/*
*	Sass Compile and Reload
*/
gulp.task('sass-reload', function() {

	return sass('./app/public/sass/' +  sassMainFile, sassConfig)
		.pipe(plumber())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./app/public/build/css'))
		.pipe(connect.reload());

});


/*
*	Javascript Concat Files
*/
gulp.task('js-concat', function() {

 	gulp.src(jsFiles)
 		.pipe(plumber())
     	.pipe(sourcemaps.init())
     	.pipe(concat('galleryApp.js'))
     	.pipe(sourcemaps.write('.maps'))
     	.pipe(gulp.dest('./app/public/build/js'));

});

/*
*	Javascript Concat Files and reload
*/
gulp.task('js-reload', function() {

 	gulp.src(jsFiles)
 		.pipe(plumber())
     	.pipe(sourcemaps.init())
     	.pipe(concat('galleryApp.js'))
     	.pipe(sourcemaps.write('.maps'))
     	.pipe(gulp.dest('./app/public/build/js'))
     	.pipe(connect.reload());

});
