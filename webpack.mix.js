const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/assets/js/app.js', 'public/js');
mix.sass('resources/assets/sass/app.scss', 'public/css');

mix.scripts([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/clientjs/dist/client.min.js',
    'node_modules/detect-zoom/detect-zoom.min.js',
    'resources/assets/js/sample/first.js',
    'resources/assets/js/tests/CubeTest.js',
    'resources/assets/js/tests/CameraTest.js',
    'resources/assets/js/tests/LineTest.js',
    'resources/assets/js/tests/TextureTest.js',
    'resources/assets/js/tests/SimpleLightTest.js',
    'resources/assets/js/tests/MoreLightTest.js',
    'resources/assets/js/tests/LightAndTextureTest.js',
    'resources/assets/js/tests/TransparentTest.js',
    'resources/assets/js/tests/LightingTest.js',
    'resources/assets/js/tests/GeneralTest.js',
    'resources/assets/js/util.js',
    'resources/assets/js/loader.js',
    'resources/assets/js/status-nav.js',
    'resources/assets/js/main-test.js'
], 'public/js/app-test.js');

mix.scripts([
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/clientjs/dist/client.min.js',
  'node_modules/detect-zoom/detect-zoom.min.js',
  'node_modules/js-cookie/src/js.cookie.js',
  'resources/assets/js/sample/first.js',
  'resources/assets/js/tests/CubeTest.js',
  'resources/assets/js/tests/CameraTest.js',
  'resources/assets/js/tests/LineTest.js',
  'resources/assets/js/tests/TextureTest.js',
  'resources/assets/js/tests/SimpleLightTest.js',
  'resources/assets/js/tests/MoreLightTest.js',
  'resources/assets/js/tests/LightAndTextureTest.js',
  'resources/assets/js/tests/TransparentTest.js',
  'resources/assets/js/tests/LightingTest.js',
  'resources/assets/js/tests/GeneralTest.js',
  'resources/assets/js/util.js',
  'resources/assets/js/browser-fingerprint.js',
  'resources/assets/js/loader.js',
  'resources/assets/js/status-nav.js',
  'resources/assets/js/main.js'
], 'public/js/app.js');

mix.browserSync({
    proxy: 'local.tfg.com'
});