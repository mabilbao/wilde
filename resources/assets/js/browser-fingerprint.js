var BrowserFingerprint = {
  sizeCanvas: 192,
  testList : [],
  dataFingerprint : {},
  generalTestDone : false,
  webGlTestDone : false,

  firstSample : null,
  secondSample : null,
  thirdSample : null,

  firstTexture: null,
  secondTexture: null,

  getFP : function() {
    BrowserFingerprint.initSamples();
  },

  initSamples : function() {

    loadJSONResource('/assets/first.json', function(error, firstSample ) {
      BrowserFingerprint.firstSample = {};
      BrowserFingerprint.firstSample.vertices = firstSample.meshes[0].vertices;
      BrowserFingerprint.firstSample.indices = [].concat.apply([], firstSample.meshes[0].faces);
      BrowserFingerprint.firstSample.texCoords = firstSample.meshes[0].texturecoords[0];
      BrowserFingerprint.firstSample.normals = firstSample.meshes[0].normals;

      BrowserFingerprint.combineSamples();
    });

    loadJSONResource('/assets/second.json', function(error, secondSample) {
      BrowserFingerprint.secondSample = {};

      // BrowserFingerprint.secondSample.vertices = secondSample.meshes[0].vertices;
      BrowserFingerprint.secondSample.vertices = (function() {
        var j, len, ref, results;
        ref = secondSample.meshes[0].vertices;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          vert = ref[j];
          results.push(vert / 20.0);
        }
        return results;
      }).call(BrowserFingerprint, secondSample);
      BrowserFingerprint.secondSample.indices = [].concat.apply([], secondSample.meshes[0].faces);
      BrowserFingerprint.secondSample.texCoords = secondSample.meshes[0].texturecoords[0];
      BrowserFingerprint.secondSample.normals = secondSample.meshes[0].normals;

      BrowserFingerprint.combineSamples();
    });

    loadImage('/assets/color.png', function( texture ) {
      BrowserFingerprint.firstTexture = texture;
      BrowserFingerprint.executeTests();
    });

    loadImage('/assets/color2.png', function( texture ) {
      BrowserFingerprint.secondTexture = texture;
      BrowserFingerprint.executeTests();
    });
  },

  combineSamples : function() {

    var i, index, j, k, maxFirst, ref, ref2, ref4;

    if ( !BrowserFingerprint.firstSample || !BrowserFingerprint.secondSample ) return false;

    BrowserFingerprint.thirdSample = {};
    BrowserFingerprint.thirdSample.vertices = new Array(BrowserFingerprint.secondSample.indices.length + BrowserFingerprint.firstSample.indices.length);
    for (i = j = 0, BrowserFingerprint.firstSample.vertices.length; j < BrowserFingerprint.firstSample.vertices.length; i = j += 3) {
      BrowserFingerprint.thirdSample.vertices[i + 0] = BrowserFingerprint.firstSample.vertices[i + 0];
      BrowserFingerprint.thirdSample.vertices[i + 1] = BrowserFingerprint.firstSample.vertices[i + 1] + 1.3;
      BrowserFingerprint.thirdSample.vertices[i + 2] = BrowserFingerprint.firstSample.vertices[i + 2];
    }
    for (i = k = 0, BrowserFingerprint.secondSample.vertices.length; k < BrowserFingerprint.secondSample.vertices.length; i = k += 3) {
      BrowserFingerprint.thirdSample.vertices[i + 0 + BrowserFingerprint.firstSample.vertices.length] = BrowserFingerprint.secondSample.vertices[i + 0];
      BrowserFingerprint.thirdSample.vertices[i + 1 + BrowserFingerprint.firstSample.vertices.length] = BrowserFingerprint.secondSample.vertices[i + 1] - 1.3;
      BrowserFingerprint.thirdSample.vertices[i + 2 + BrowserFingerprint.firstSample.vertices.length] = BrowserFingerprint.secondSample.vertices[i + 2];
    }
    BrowserFingerprint.thirdSample.indices = new Array(BrowserFingerprint.secondSample.indices.length + BrowserFingerprint.firstSample.indices.length);

    [].splice.apply(
      BrowserFingerprint.thirdSample.indices,
      [0, BrowserFingerprint.firstSample.indices.length - 0].concat(ref2 = BrowserFingerprint.firstSample.indices)),
      ref2
    ;

    maxFirst = BrowserFingerprint.firstSample.indices.reduce(function(a, b) {
      return Math.max(a, b);
    });

    [].splice.apply(
      BrowserFingerprint.thirdSample.indices,
      [BrowserFingerprint.firstSample.indices.length, (BrowserFingerprint.thirdSample.indices.length - BrowserFingerprint.firstSample.indices.length)]
        .concat(
          ref4 = (
            function() {
              var l, len, ref5, results;
              ref5 = this.secondSample.indices;
              results = [];
              for (l = 0, len = ref5.length; l < len; l++) {
                index = ref5[l];
                results.push(index + 1 + maxFirst);
              }
              return results;
            }).call(BrowserFingerprint)
        )),
      ref4
    ;

    BrowserFingerprint.thirdSample.texCoords = BrowserFingerprint.firstSample.texCoords.concat(BrowserFingerprint.secondSample.texCoords);
    BrowserFingerprint.thirdSample.normals = BrowserFingerprint.firstSample.normals.concat(BrowserFingerprint.secondSample.normals);

    BrowserFingerprint.executeTests();
  },

  executeTests : function () {

    if ( !BrowserFingerprint.firstSample || !BrowserFingerprint.secondSample || !BrowserFingerprint.thirdSample || !BrowserFingerprint.firstTexture || !BrowserFingerprint.secondTexture) return false;

    // Tests to Execute

    BrowserFingerprint.testList.push({id: 'general', name: 'General', test: new General(), cb: BrowserFingerprint.testGeneralDone, description: 'todooooo'});

    BrowserFingerprint.testList.push({id: 'cube', name: 'Cubo', test: new CubeTest('normal'), cb: BrowserFingerprint.testDone, description: 'Cubo generado sin AntiAliasing'});
    BrowserFingerprint.testList.push({id: 'cube_aa', name: 'Cubo AA', test: new CubeTest('aa'), cb: BrowserFingerprint.testDone, description: 'Cubo generado con AntiAliasing'});
    BrowserFingerprint.testList.push({id: 'line', name: 'Lineas y Curvas', test: new LineTest('normal'), cb: BrowserFingerprint.testDone, description: 'Lineas y Curvas sin AntiAliasing'});
    BrowserFingerprint.testList.push({id: 'line_aa', name: 'Lineas y Curvas AA', test: new LineTest('aa'), cb: BrowserFingerprint.testDone, description: 'Lineas y Curvas con AntiAliasing'});
    BrowserFingerprint.testList.push({id: 'texture', name: 'Texturas', test: new TextureTest(BrowserFingerprint.firstSample.vertices, BrowserFingerprint.firstSample.indices, BrowserFingerprint.firstSample.texCoords, BrowserFingerprint.firstTexture), cb: BrowserFingerprint.testDone, description: 'Texturas'});
    // BrowserFingerprint.testList.push({id: 'texture_combined', name: 'Texturas Combinado', test: new TextureTest(BrowserFingerprint.thirdSample.vertices, BrowserFingerprint.thirdSample.indices, BrowserFingerprint.thirdSample.texCoords, BrowserFingerprint.firstTexture), cb: BrowserFingerprint.testDone, description: 'Texturas Combinado'});
    BrowserFingerprint.testList.push({id: 'light_simple', name: 'Luz Simple', test: new SimpleLightTest(BrowserFingerprint.firstSample.vertices, BrowserFingerprint.firstSample.indices, BrowserFingerprint.firstSample.texCoords, BrowserFingerprint.firstSample.normals, BrowserFingerprint.firstTexture), cb: BrowserFingerprint.testDone, description: 'Luz Simple'});
    BrowserFingerprint.testList.push({id: 'light_combined', name: 'Luz Combinada', test: new SimpleLightTest(BrowserFingerprint.thirdSample.vertices, BrowserFingerprint.thirdSample.indices, BrowserFingerprint.thirdSample.texCoords, BrowserFingerprint.thirdSample.normals, BrowserFingerprint.firstTexture), cb: BrowserFingerprint.testDone, description: 'Luz Combinada'});
    BrowserFingerprint.testList.push({id: 'more_light_combined', name: 'Luz Combinada 2', test: new MoreLightTest(BrowserFingerprint.thirdSample.vertices, BrowserFingerprint.thirdSample.indices, BrowserFingerprint.thirdSample.texCoords, BrowserFingerprint.thirdSample.normals, BrowserFingerprint.firstTexture, 'normal'), cb: BrowserFingerprint.testDone, description: 'Luz Combinada 2'});
    BrowserFingerprint.testList.push({id: 'more_light_combined_aa', name: 'Luz Combinada con Antialising', test: new MoreLightTest(BrowserFingerprint.thirdSample.vertices, BrowserFingerprint.thirdSample.indices, BrowserFingerprint.thirdSample.texCoords, BrowserFingerprint.thirdSample.normals, BrowserFingerprint.firstTexture, 'aa'), cb: BrowserFingerprint.testDone, description: 'Luz Combinada Con Antialising'});
    BrowserFingerprint.testList.push({id: 'more_light_texture_combined', name: 'Luz y Textura Combinada', test: new LightAndTextureTest(BrowserFingerprint.thirdSample.vertices, BrowserFingerprint.thirdSample.indices, BrowserFingerprint.thirdSample.texCoords, BrowserFingerprint.thirdSample.normals, BrowserFingerprint.firstTexture, BrowserFingerprint.secondTexture), cb: BrowserFingerprint.testDone, description: 'Luz Y Textura Combinada'});
    BrowserFingerprint.testList.push({id: 'transparent', name: 'Transparencia', test: new TransparentTest(BrowserFingerprint.thirdSample.vertices, BrowserFingerprint.thirdSample.indices, BrowserFingerprint.thirdSample.texCoords, BrowserFingerprint.thirdSample.normals, BrowserFingerprint.firstTexture), cb: BrowserFingerprint.testDone, description: 'Transparencia'});
    BrowserFingerprint.testList.push({id: 'lighting', name: 'Luz', test: new LightingTest('normal'), cb: BrowserFingerprint.testDone, description: 'This test uses multiple moving lights of different colors that illuminate a screen of 5000 metalic rings. The color and texture of the rings is calculated by the GPU as opposed to loading in a image.'});
    BrowserFingerprint.testList.push({id: 'lighting_aa', name: 'Luz con Antialising', test: new LightingTest('aa'), cb: BrowserFingerprint.testDone, description: 'This test uses multiple moving lights of different colors that illuminate a screen of 5000 metalic rings with Antialising. The color and texture of the rings is calculated by the GPU as opposed to loading in a image.'});
    BrowserFingerprint.testList.push({id: 'camera', name: 'Camara', test: new CameraTest(), cb: BrowserFingerprint.testDone, description: 'Camera'});


    // Run Tests
    for (var i = 0 ; i < BrowserFingerprint.testList.length ; i ++ ) {
      if ( BrowserFingerprint.testList[i].id === 'general') {
        BrowserFingerprint.testGeneralStart( BrowserFingerprint.testList[i] );
      } else {
        BrowserFingerprint.testStart( BrowserFingerprint.testList[i] );
      }
    }

  },

  testGeneralStart : function ( test ) {
    test.test.begin(test.cb);
  },

  testStart : function( test ) {
    var canvas = document.createElement('canvas');
    canvas.dataset.id = test.id;
    canvas.id = test.name;
    canvas.height = BrowserFingerprint.sizeCanvas;
    canvas.width = BrowserFingerprint.sizeCanvas;

    test.test.begin(canvas, test.cb);
  },

  testGeneralDone : function ( data ) {
    for (var i  = 0 ; i < BrowserFingerprint.testList.length ; i ++ ) {
      if ( BrowserFingerprint.testList[i].id === 'general' ) {
        BrowserFingerprint.testList[i].result = data;
      }
    }
    for ( var key in data ) {
      BrowserFingerprint.dataFingerprint[key] = data[key];
    }
    BrowserFingerprint.generalTestDone = true;
    BrowserFingerprint.checkIsReady();
  },

  testDone : function( gl ) {
    var pixels = new Uint8Array(256 * 256 * 4);
    gl.readPixels(0, 0, 256, 256, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    var hash = pixels.hashCode();
    BrowserFingerprint.setResult(gl.canvas, hash);

    for( var t in BrowserFingerprint.testList ) {
      var test = BrowserFingerprint.testList[t];
      if (typeof test['result'] === 'undefined') return false
    }
    BrowserFingerprint.webGlTestDone = true;

    BrowserFingerprint.checkIsReady();

    // this.toServer(WebGL, ven, ren, hash, id, pixels);
    // if (sumRGB(pixels) > 1.0) {
    //     return hashRGB(pixels);
    // } else {
    //     return 0;
    // }
  },

  setResult: function ( canvas, hash ) {
    var id = canvas.dataset.id;
    for (var i = 0; i < BrowserFingerprint.testList.length; i++) {
      if (BrowserFingerprint.testList[i].id === id) {
        BrowserFingerprint.testList[i].result = hash;
      }
    }
    if (typeof BrowserFingerprint.dataFingerprint['webgl'] === 'undefined') {
      BrowserFingerprint.dataFingerprint['webgl'] = {};
    }
    BrowserFingerprint.dataFingerprint['webgl'][id] = hash;
  },

  checkIsReady: function () {
    if ( BrowserFingerprint.generalTestDone && BrowserFingerprint.webGlTestDone ) {
      $('.status').text('Obteniendo Hash Fingerprint...');

      $.post('/create', BrowserFingerprint.dataFingerprint, BrowserFingerprint.callbackResponse);
    }
  },

  callbackResponse: function( response ) {
    if ( response.success ) {
      StatusNav.updateHash(response.data.id);
      StatusNav.updateAction('-');
      StatusNav.updateStatus('Reconocido');

      Cookies.set('wilde-fp', response.data.id);
      Loader.hideLoader();

    } else {
      StatusNav.updateHash('-');
      StatusNav.updateAction('-');
      StatusNav.updateStatus('Error al intentar guardar al dispositivo');
      console.error(response.data);
    }
  }

};