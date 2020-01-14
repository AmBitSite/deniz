var gulp = require('gulp'),
    cssmin = require('gulp-minify-css'),
    fileinclude = require('gulp-file-include'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

gulp.task('html:build', (done) => {
    gulp.src('src/*.html')
        .pipe(fileinclude({
            prefix: "@@",
            basepath: "src/template/"
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
gulp.task('img-min:build', (done) => {
    gulp.src("src/img/*.*")
        .pipe(imagemin(
            [
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        { removeViewBox: true },
                        { cleanupIDs: false }
                    ]
                })
            ]
        ))
        .pipe(gulp.dest("build/img"))
    done();
});
gulp.task('ru:build', (done) => {
    gulp.src("src/ru/*.html")
        .pipe(fileinclude({
            prefix: "@@",
            basepath: "./src/template/"
        }))
        .pipe(gulp.dest("build/ru"))
    done();
});
gulp.task('font:build', (done) => {
    gulp.src("src/font/*.*")
        .pipe(gulp.dest("build/font"))
    done();
});
gulp.task('js:build', (done) => {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
    done();
});
gulp.task('build', (done) => {
    gulp.parallel(['css:build', 'html:build', 'img:build', 'font:build', 'js:build'])
    done();
});
gulp.task("watch", (done) => {
    browserSync.init({
        server: "build/"
    });
    gulp.watch("src/css/*.css").on('change', gulp.parallel(['css:build', browserSync.reload]));
    gulp.watch("src/*.html").on('change', gulp.parallel(['html:build', browserSync.reload]));
    gulp.watch("src/template/*.html").on('change', gulp.parallel(['html:build', browserSync.reload]));
    gulp.watch("src/img/*.*").on('change', gulp.parallel(['img:build', browserSync.reload]));
    gulp.watch("src/font/*.*").on('change', gulp.parallel(['font:build', browserSync.reload]));
    gulp.watch("src/js/*.js").on('change', gulp.parallel(['js:build', browserSync.reload]));
    gulp.watch("src/ru/*.html").on('change', gulp.parallel(['ru:build', browserSync.reload]));
    done()
})
