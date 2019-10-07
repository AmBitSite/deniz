
var gulp = require('gulp'),
    cssmin = require('gulp-minify-css'),
    fileinclude = require('gulp-file-include'),
    watch = require("gulp-watch"),
    livereload = require('gulp-livereload');
    var browserSync  = require('browser-sync').create();
 
gulp.task('html:build',(done)=>{
    gulp.src('src/*.html')
        .pipe(fileinclude())
        .pipe(gulp.dest('build/'))
        // .pipe(livereload({ start: true }))
        done();
});
gulp.task('css:build', (done)=> {
    gulp.src("src/css/*.css")
        .pipe(cssmin())
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());

done();
});
gulp.task('img:build', (done)=> {
    gulp.src("src/img/*.*")
        .pipe(gulp.dest("build/img"))

done();
});
gulp.task('font:build', (done)=> {
    gulp.src("src/font/*.*")
        .pipe(gulp.dest("build/font"))

done();
});
gulp.task('js:build', (done)=> {
    gulp.src("src/js/*.*")
        .pipe(gulp.dest("build/js"))

done();
});
gulp.task(
    'default', 
        gulp.series('html:build', 'css:build', 'img:build', 'font:build', 'js:build')
);





gulp.task('serve', (done)=> {
    browserSync.init({
    server: "src/"
    });
    gulp.watch("src/css/*.css").on('change', browserSync.reload);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    
    done()
});

gulp.task('watch', (done)=> {
    watch("glob", ['change'], ['html:build', 'css:build', 'img:build', 'font:build', 'js:build'])
    done()
});

