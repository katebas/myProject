var gulp = require('gulp'),
	cleaner = require('gulp-clean-css'),
	prefix = require('gulp-autoprefixer'),
	connect = require('gulp-connect'),
	styl = require('gulp-stylus');

gulp.task('stylus', function(){
	return gulp.src('./stylus/*.styl')
		.pipe(styl())
		.pipe(cleaner())
		.pipe(prefix({
			browsers: ['last 10 versions']
		}))
		.pipe(gulp.dest('./css/'))
		.pipe(connect.reload());
});

gulp.task('go', function(){
	return connect.server({
		livereload: true
	})
});

gulp.task('reload', function(){
	return gulp.src(['./*.html', './js/*.js'])
				.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch(['./*.html', './js/*.js'], gulp.series('reload'));
	gulp.watch(['./stylus/*.styl'], gulp.series('stylus'));
});

gulp.task('default', function(){
	return gulp.parallel('go', 'watch')();
});