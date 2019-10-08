
var gulp = require('gulp'),
    cssmin = require('gulp-minify-css'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create();

gulp.task('html:build', (done) => {
    gulp.src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/template/'
          }))
        .pipe(gulp.dest('build/'))
    done();
});
gulp.task('css:build', (done) => {
    gulp.src("src/css/*.css")
        .pipe(cssmin())
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());

    done();
});
gulp.task('img:build', (done) => {
    gulp.src("src/img/*.*")
        .pipe(gulp.dest("build/img"))

    done();
});
gulp.task('font:build', (done) => {
    gulp.src("src/font/*.*")
        .pipe(gulp.dest("build/font"))

    done();
});
gulp.task('js:build', (done) => {
    gulp.src("src/js/*.*")
        .pipe(gulp.dest("build/js"))

    done();
});

gulp.task('build', (done) => {
        gulp.series(['css:build','html:build','img:build','font:build','js:build'])
    done();
});
gulp.task('serve', (done) => {
    browserSync.init({
        server: "build/"
    });
    gulp.watch("src/css/*.css").on('change', gulp.series('css:build'));
    gulp.watch("src/*.html").on('change', gulp.series('html:build'));
    gulp.watch("src/img/*.*").on('change', gulp.series('img:build'));
    gulp.watch("src/font/*.*").on('change', gulp.series('font:build'));
    gulp.watch("src/js/*.js").on('change', gulp.series('js:build'));
    done()
});
gulp.task("watch",(done)=>{
    browserSync.init({
        server: "build/"
    });
    gulp.watch("src/css/*.css").on('change', gulp.series(['css:build',browserSync.reload]));
    gulp.watch("src/*.html").on('change', gulp.series(['html:build',browserSync.reload]));
    gulp.watch("src/img/*.*").on('change', gulp.series(['img:build',browserSync.reload]));
    gulp.watch("src/font/*.*").on('change', gulp.series(['font:build',browserSync.reload]));
    gulp.watch("src/js/*.js").on('change', gulp.series(['js:build',browserSync.reload]));
    done()
})

