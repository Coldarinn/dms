let projectFolder = "dist"
let sourceFolder = "src"
let path = {
    build: {
        html: projectFolder + "/",
        css: projectFolder + "/styles/",
        js: projectFolder + "/js/",
        img: projectFolder + "/images/",
        fonts: projectFolder + "/fonts/",
    },
    src: {
        html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
        css: sourceFolder + "/styles/styles.scss",
        js: sourceFolder + "/js/index.js",
        img: sourceFolder + "/images/**/*.{jpg,jpeg,png,gif,svg,ico,pdf,webp}",
        fonts: sourceFolder + "/fonts/*",
    },
    watch: {
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/styles/**/*.scss",
        js: sourceFolder + "/js/**/*.js",
        img: sourceFolder + "/images/**/*.{jpg,jpeg,png,svg,gif,ico,pdf,webp}",
    },
    clean: "./" + projectFolder + "/"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webphtml = require('gulp-webp-html'),
    webpcss = require('gulp-webp-css'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream')

function browserSync(params) {
    setTimeout(() => {
        browsersync.init({
            server: {
                baseDir: "./" + projectFolder + "/",
            },
            port: 3000,
            notify: false
        })
    }, 1000)
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expended"
            })
        )
        .pipe(webpcss())
        .pipe(group_media())
        .pipe(
            autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(webpackStream({
            mode: 'development',
            output: {
                filename: 'index.js',
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }]
            },
        }))
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                interlaced: true,
                optimizationLevel: 3,
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}

function mail() {
    return src('./src/mail.php')
        .pipe(dest('./dist/'))
}

function mailsec() {
    return src('./src/mailsec.php')
        .pipe(dest('./dist/'))
}

function mailer() {
    return src('./src/phpmailer/**/*')
        .pipe(dest('./dist/phpmailer'))
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean(param) {
    return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel(images, fonts, html, css, js, mailer, mail, mailsec))
let watch = gulp.parallel(build, watchFiles, browserSync)

exports.mailer = mailer
exports.mail = mail
exports.mailsec = mailsec
exports.fonts = fonts
exports.images = images
exports.js = js
exports.css = css
exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch