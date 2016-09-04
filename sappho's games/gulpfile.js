// 引入gulp
'use strict'
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint'); //检查js
var sass = require('gulp-sass'); //编译Sass
var concat = require('gulp-concat'); //合并
var uglify = require('gulp-uglify'); //uglify 组件（用于压缩 JS）
var rename = require('gulp-rename'); //重命名

// 检查js脚本的任务
gulp.task('lint', function() {
    gulp.src('./scripts/*.js') //可配置你需要检查脚本的具体名字。
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css')); //dest()写入文件
});


// 合并，压缩js文件
// 找到 js/ 目录下的所有 js 文件，压缩，重命名，最后将处理完成的js存放在 dist/js/ 目录下
gulp.task('scripts', function() {
    gulp.src('./scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));

    console.log('gulp task is done'); //自定义提醒信息
});

// 其他任务类似

// 定义默认任务,执行gulp会自动执行的任务
gulp.task('default', function() {
    gulp.run('lint', 'sass', 'scripts');

    // 监听js文件变化，当文件发生变化后会自动执行任务
    gulp.watch('./scripts/*.js', function() {
        gulp.run('lint', 'scripts');
    });

    gulp.watch('./sass/*.scss', ['sass']);
});