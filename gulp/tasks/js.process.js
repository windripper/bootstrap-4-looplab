const cleanup = require("rollup-plugin-cleanup");
const {plugin: analyze} = require("rollup-plugin-analyzer");
const buble = require("rollup-plugin-buble");
const {uglify} = require("rollup-plugin-uglify");
const rollup = require('rollup');

module.exports = function () {
    $.gulp.task('js.process', function () {
        return rollup.rollup({
            input: './source/js/main.js',
            plugins: [
                buble(),
                uglify(),
                cleanup({
                    comments: ['eslint']
                }),
                analyze()
            ]
        }).then(bundle => {
            return bundle.write({
                file: './app/assets/js/bundle.js',
                format: 'iife',
                name: 'bundle',
                sourcemap: true
            });
        }).catch((err) => {
            console.log(err);
        });
    })
};
