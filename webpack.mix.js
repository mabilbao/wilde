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
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    'node_modules/clientjs/dist/client.min.js',
    'node_modules/detect-zoom/detect-zoom.min.js',
    'node_modules/gl-matrix/dist/gl-matrix-min.js',
    'node_modules/three/three.min.js',
    'node_modules/seedrandom/seedrandom.min.js',
    'node_modules/blueimp-md5/js/md5.min.js',
    'node_modules/fingerprintjs2/dist/fingerprint2.min.js',
    'resources/assets/js/phase-one/sample/first.js',
    'resources/assets/js/phase-one/tests/CubeTest.js',
    'resources/assets/js/phase-one/tests/CameraTest.js',
    'resources/assets/js/phase-one/tests/LineTest.js',
    'resources/assets/js/phase-one/tests/TextureTest.js',
    'resources/assets/js/phase-one/tests/SimpleLightTest.js',
    'resources/assets/js/phase-one/tests/MoreLightTest.js',
    'resources/assets/js/phase-one/tests/LightAndTextureTest.js',
    'resources/assets/js/phase-one/tests/TransparentTest.js',
    'resources/assets/js/phase-one/tests/LightingTest.js',
    'resources/assets/js/phase-one/tests/GeneralTest.js',
    'resources/assets/js/phase-one/util.js',
    'resources/assets/js/phase-two/extra-data.js',
    'resources/assets/js/partial/loader.js',
    'resources/assets/js/partial/status-nav.js',
    'resources/assets/js/main-test.js'
], 'public/js/app-test.js');

mix.scripts([
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
  'node_modules/clientjs/dist/client.min.js',
  'node_modules/detect-zoom/detect-zoom.min.js',
  'node_modules/js-cookie/src/js.cookie.js',
  'node_modules/gl-matrix/dist/gl-matrix-min.js',
  'node_modules/three/three.min.js',
  'node_modules/blueimp-md5/js/md5.min.js',
  'node_modules/seedrandom/seedrandom.min.js',
  'node_modules/fingerprintjs2/dist/fingerprint2.min.js',
  'resources/assets/js/phase-one/sample/first.js',
  'resources/assets/js/phase-one/tests/CubeTest.js',
  'resources/assets/js/phase-one/tests/CameraTest.js',
  'resources/assets/js/phase-one/tests/LineTest.js',
  'resources/assets/js/phase-one/tests/TextureTest.js',
  'resources/assets/js/phase-one/tests/SimpleLightTest.js',
  'resources/assets/js/phase-one/tests/MoreLightTest.js',
  'resources/assets/js/phase-one/tests/LightAndTextureTest.js',
  'resources/assets/js/phase-one/tests/TransparentTest.js',
  'resources/assets/js/phase-one/tests/LightingTest.js',
  'resources/assets/js/phase-one/tests/GeneralTest.js',
  'resources/assets/js/phase-one/util.js',
  'resources/assets/js/phase-one/browser-fingerprint.js',
  'resources/assets/js/phase-two/extra-data.js',
  'resources/assets/js/partial/client-data.js',
  'resources/assets/js/partial/loader.js',
  'resources/assets/js/partial/rules.js',
  'resources/assets/js/partial/status-nav.js',
  'resources/assets/js/server.js',
  'resources/assets/js/main.js'
], 'public/js/app.js');

mix.browserSync({
    proxy: 'local.tfg.com'
});