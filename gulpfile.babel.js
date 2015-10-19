import gulp        from 'gulp';
import sourcemaps  from 'gulp-sourcemaps';
import rename      from 'gulp-rename';
import sass        from 'gulp-sass';
import minifyCss   from 'gulp-minify-css';
import concat      from 'gulp-concat';
import uglify      from 'gulp-uglify';
import browserSync from 'browser-sync';

const paths = {
  bower : './bower_components',
  css   : './assets/css',
  sass  : './assets/dev/sass',
  jsx   : './assets/dev/jsx',
};



gulp.task('default', ['watch']);

gulp.task('watch', () => {
	browserSync({ server: { baseDir: './' }});

	gulp.watch(`${paths.sass}/**/*.scss`, ['styles']);
	gulp.watch(`${paths.jsx}/**/*.js`).on('change', browserSync.reload);
	gulp.watch('./index.html').on('change', browserSync.reload);
});


gulp.task('styles', () => {
  return gulp.src(`${paths.sass}/style.scss`)
    .pipe(sourcemaps.init())
    .pipe(rename('style.min.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});


/* production */
gulp.task('styles-bundle', () => {
  const src = [
    `${paths.bower}/bootstrap/dist/css/bootstrap.min.css`,
    `${paths.css}/style.min.css`,
  ];

  return gulp.src(src)
    .pipe(concat('bundle.min.css'))
    .pipe(gulp.dest(paths.css));
});