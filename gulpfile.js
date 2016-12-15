  const gulp = require('gulp'),
      cache = require('gulp-cache'),
      gutil = require("gulp-util"),
      clean = require("gulp-clean"),
      webpack = require("webpack"),
      runSequence = require('run-sequence');


/***********************************************打包生成 yuapt-ui       start      ************************************/
gulp.task('clean', function() {
     return gulp.src(['build', 'dist'], { read: false }).pipe(clean());
 });



const webpackConfig = require("./webpack.config.js");
gulp.task("webpack-dev", function(callback) {
    webpack(Object.create(webpackConfig), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});



const webpackServerConfig = require("./webpack.server.config.js");
gulp.task("webpack-server", function(callback) {
    webpack(Object.create(webpackServerConfig), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});






gulp.task("build",function(){
    runSequence("clean","webpack-dev","webpack-server");
})



/***********************************************打包生成 yuapt-ui       end        ************************************/








