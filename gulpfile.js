const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");

// 画像の圧縮関係
const imagemin = require('gulp-imagemin');
const imageminJpg = require('imagemin-jpeg-recompress');
const imageminPng = require('imagemin-pngquant');
const imageminGif = require('imagemin-gifsicle');
const svgmin = require('gulp-svgmin');

const browserSync = require("browser-sync");
const notifier = require("node-notifier");

var onError = function(error) {
  notifier.notify(
    {
      message: "しっぱいしたワン",
      title: "パグ"
    },
    function() {
      console.log(error.message);
    }
  );
};

gulp.task("default", ["sass", "js", "watch", "browser-sync"]);

// WordPressでの書き出し用
gulp.task("wordpress", ["sass", "js", "image-min", "svg-min"], cb => {
  // Pugに関して
  const pugOption = {
    pretty: true
  };

  // 各ページの生成
  gulp
    .src(["./src/pug/**/*.pug", "!./src/pug/**/_*.pug"])
    .pipe(plumber())
    .pipe(pug(pugOption))
    .pipe(
      rename({
        extname: ".php"
      })
    )
    .pipe(gulp.dest("./wordpress/"));

  // 各パーツの生成
  // gulp
  //   .src("./src/pug/parts/_*.pug")
  //   .pipe(plumber())
  //   .pipe(pug(pugOption))
  //   .pipe(
  //     rename({
  //       extname: ".php"
  //     })
  //   )
  //   .pipe(gulp.dest("./wordpress/parts/"))


  // CSS, JSをコピー
  gulp
    .src(["./static/assets/**/*", "!./static/assets/images/**/*"], {
      base: './static/assets/'
    })
    .pipe(gulp.dest("./wordpress/assets/"));

  // vision.css
  gulp
    .src("./static/assets/css/vision.css")
    .pipe(gulp.dest("./wordpress/"));

  cb();
});

// 画像の圧縮タスク
gulp.task('image-min', ["svg-min"], cb => {
  gulp.src("./static/assets/images/**/*.+(jpg|jpeg|png|gif)")
    .pipe(imagemin([
        imageminPng(),
        imageminJpg(),
        imageminGif({
          interlaced: false,
          optimizationLevel: 3,
          colors:180
        })
      ]
    ))
    .pipe(gulp.dest("./wordpress/assets/images/"));
  cb();
});

// svg画像の圧縮タスク
gulp.task('svg-min', cb => {
  gulp.src("./static/assets/images/**/*.+(svg)")
    .pipe(svgmin())
    .pipe(gulp.dest("./wordpress/assets/images/"));
  cb();
});

gulp.task("browser-sync", cb => {
  browserSync({
    server: {
      baseDir: "./static/"
    }
  });
  cb();
});

gulp.task("watch", cb => {
  gulp.watch("./src/sass/**/*.sass", () => {
    console.log("sass");
    gulp.start(["sass"]);
    gulp.start(["reload"]);
  });
  // gulp.watch("./src/pug/**/*.pug", () => {
  //   console.log("pug");
  //   gulp.start(["pug"]);
  //   gulp.start(["reload"]);
  // });
  gulp.watch("./src/js/**/*.js", () => {
    console.log("js");
    gulp.start(["js"]);
    gulp.start(["reload"]);
  });
  cb();
});

gulp.task("reload", cb => {
  browserSync.reload;
  cb();
});

gulp.task("sass", cb => {
  gulp
    .src(["./src/sass/**/*.scss", "!./src/sass/**/_*.scss", "!./src/sass/app.scss", "!./src/sass/common/*.scss"])
    .pipe(
      plumber({
        errorHandler: onError
      })
    )
    .pipe(
      sass({
        outputStyle: "expanded"
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions", "ie >= 11", "Android >= 4"],
        cascade: false
      })
    )
    .pipe(gulp.dest("./static/assets/css/"))
    .pipe(browserSync.stream());
  cb();
});

// gulp.task("pug", cb => {
//   const option = {
//     pretty: true
//   };
//
//   gulp
//     .src(["./src/pug/**/*.pug", "!./src/pug/**/_*.pug"])
//     .pipe(plumber())
//     .pipe(pug(option))
//     .pipe(
//       rename({
//         extname: ".html"
//       })
//     )
//     .pipe(gulp.dest("./static/"))
//     .pipe(browserSync.stream());
//   cb();
// });

gulp.task("js", cb => {
  gulp
    .src("./src/js/**/*.js")
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest("./static/assets/js/"))
    .pipe(browserSync.stream());
  cb();
});
