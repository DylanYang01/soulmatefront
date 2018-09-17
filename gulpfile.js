var gulp = require('gulp');  //获取gulp
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var watch = require('gulp-watch');
var browsersync = require('browser-sync').create();//获取browsersync
var reload = browsersync.reload;
// var fontSpider = require( 'gulp-font-spider' );


var _basepcpath = "soulbuild/";

//操作css文件
gulp.task('style', function () {
    gulp.src('./static/scss/*.scss')  //需要编译scss的文件
        .pipe(sass({ outputStyle: 'expanded' })//压缩格式：nested(嵌套)、compact（紧凑）、expanded（扩展）、compressed（压缩）
            .on('error', sass.logError))
        .pipe(gulp.dest('./static/css/'))    //输出路径
        .pipe(reload({ stream: true }));
});


//监听scss文件
gulp.task('browser-sync', ['watch'], function () {
    browsersync.init({
        port: 8050,
        server: {
            baseDir: './'
        },
        files: ['**'],
    })


});

// 生成字体文件
// gulp.task('fontspider', function() {
// 	return gulp.src('./index.html')
// 		.pipe(fontSpider());
// });

gulp.task('watch', function () {
    gulp.watch('./static/scss/*.scss', ['style']);
    watch('./pagetemp/**/*.html', function () {
        gulp.src(['./pagetemp/**/*.html']) //这里的页面都是 待组装的。
            .pipe(fileinclude({
                prefix: '@@',
                basepath: './pagetemp/include',//引用文件路径
                indent: true//保留文件的缩进
            }))
            .pipe(gulp.dest('./page/'))
            .pipe(reload({ stream: true }));
    });
})

//编译scss文件：gulp default
gulp.task('default', ['browser-sync']);

 