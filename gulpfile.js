var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
const reload = browserSync.reload;
const prefix = require('gulp-autoprefixer');
const nunjucksRender = require('gulp-nunjucks-render');


gulp.task('browser-sync', function () {
  browserSync.init({
    notify: false, //yenilemedeki bildirimi kapatıyor.
    server: {
      baseDir: "./"
      // baseDir: "app/"
    }
  });
  
  gulp.watch('app/**/*.nunjucks', gulp.parallel('nunjucks'));
  gulp.watch('scss/**/*.scss', gulp.series('css'));
});

gulp.task('css', () => {
  return gulp.src('./scss/main.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
});


gulp.task('nunjucks', () => {
  return gulp.src('app/pages/**/*.nunjucks')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
      path: ['app/templates']
    }))
    // output files in app folder  
    .pipe(gulp.dest('./'))
    // .pipe(gulp.dest('app/'))
    .pipe(browserSync.stream())
});

gulp.task('default', gulp.parallel('browser-sync', 'css', 'nunjucks'));