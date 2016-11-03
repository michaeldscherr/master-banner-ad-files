'use strict'; // eslint-disable-line

const gulp = require('gulp');
const del = require('del');
const path = require('path');
const globby = require('globby');
const sequence = require('run-sequence');
const postcss = require('gulp-postcss');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const rollup = require('rollup-stream');
const source = require('vinyl-source-stream');
const pug = require('gulp-pug');

const baseDir = __dirname;
const srcDir = `${baseDir}/src`;
const distDir = `${baseDir}/public`;
const bannerDir = `${srcDir}/banners`;

function errorHandler(error) {
    gutil.log(error.message);
    this.emit('end');
}

function initBrowserSync() {
    browserSync.init({
        logConnections: false,
        logFileChanges: false,
        logLevel: 'info',
        logSnippet: true,
        open: false,
        server: distDir,
    });
}

gulp.task('styles', [], () => {
    gulp.src([
        `${bannerDir}/**/**/index.{scss,sass}`,
    ])
    .pipe(sass({
        includePaths: [`${srcDir}/styles`, 'node_modules'],
        outputStyle: 'compressed',
    }))
    .on('error', errorHandler)
    .pipe(postcss([
        require('autoprefixer')({
            browsers: ['> 1%', 'last 2 version', 'ie 9'],
        }),
    ]))
    .on('error', errorHandler)
    .pipe(gulp.dest(distDir))
    .pipe(browserSync.stream({
        match: `${distDir}/**/**.css`,
    }));
});

const roll = (file) => {
    const destPath = path.dirname(file.replace('src/banners', 'public'));
    return rollup({
        entry: file,
        plugins: [
            require('rollup-plugin-includepaths')({
                paths: [srcDir, 'node_modules'],
            }),
            require('rollup-plugin-buble')(),
            require('rollup-plugin-uglify')(),
        ],
    }).on('error', errorHandler)
    .pipe(source('index.js'))
    .pipe(gulp.dest(destPath));
};

gulp.task('scripts', [], (cb) => {
    globby([
        `${bannerDir}/**/**.js`,
    ]).then(files => {
        const tasks = files.map((file) => roll(file));
        return tasks;
    }).then(() => cb());
});

gulp.task('templates', [], () => {
    gulp.src([
        `${bannerDir}/**/**/index.pug`,
    ])
    .pipe(pug({
        basedir: `${srcDir}/templates`,
    }))
    .on('error', errorHandler)
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
    }))
    .on('error', errorHandler)
    .pipe(gulp.dest(distDir));
});

gulp.task('images', [], () => {
    gulp.src([
        `${bannerDir}/**/images/**.{jpg,png,gif}`,
        `${bannerDir}/**/default.{jpg,png,gif}`,
    ])
        .pipe(gulp.dest(distDir));
});

gulp.task('watch', ['default'], () => {
    if (gutil.env.sync) {
        initBrowserSync();
    }
    gulp.watch([
        `${bannerDir}/**/**/index.scss`,
        `${srcDir}/styles/**/**.scss`,
    ], ['styles']);
    gulp.watch([
        `${bannerDir}/**/**/index.js`,
        `${srcDir}/scripts/**/**.js`,
    ], ['scripts']).on('change', browserSync.reload);
    gulp.watch([
        `${bannerDir}/**/**/index.pug`,
        `${srcDir}/templates/**/**.pug`,
    ], ['templates']).on('change', browserSync.reload);
});

gulp.task('default', ['templates', 'styles', 'scripts', 'images']);
gulp.task('clean', [], () => del([distDir]));
gulp.task('reset', [], (cb) => sequence('clean', 'default', cb));
