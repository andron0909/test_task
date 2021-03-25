const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass");
const cssmin = require("gulp-cssmin");
const jsmin = require("gulp-jsmin");
const babel = require("gulp-babel");
const rename = require("gulp-rename");

const sourceList = {
  sass: "./src/sass/*.scss",
  jsMain: "./src/js/*.js",
};

const compileList = {
  sass: "./public/css",
  js: "./public/js",
};

function compileSass(done) {
  src(sourceList.sass)
    .pipe(sass().on("error", sass.logError))
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(compileList.sass));
  done();
}

// function minJs(done) {
//   src(sourceList.jsMain)
//     .pipe(jsmin())
//     .pipe(rename({ suffix: ".min" }))
//     .pipe(dest(compileList.js));
//   done();
// }

function babelJs(done) {
  src(sourceList.jsMain)
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(jsmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(compileList.js));
  done();
}

function watchSass() {
  watch(sourceList.sass, compileSass);
  //   watch(sourceList.jsMain, minJs);
  watch(sourceList.jsMain, babelJs);
}

exports.watchSass = watchSass;
