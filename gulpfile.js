var gulp = require('gulp'),     
    sass = require('gulp-sass') 

gulp.task('test', function() {
  console.log('roar i am default gulp');
});


gulp.task('styles', function() {
    gulp.src('./dist/app/public/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/app/public/stylesheets'));
});

// Rerun the task when a file chang

 gulp.task('default', function() {
     gulp.watch('./dist/app/public/sass/**/*.scss', ['styles', 'test']); 
});

//   gulp.task('default', ['test', 'styles']);
