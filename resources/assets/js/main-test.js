var BrowserFingerprintTest = {
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

  init : function() {

    StatusNav.setTest();

    // Prepare Samples
    BrowserFingerprintTest.initSamples();
  },

  initSamples : function() {

    loadJSONResource('/assets/first.json', function(error, firstSample ) {
      BrowserFingerprintTest.firstSample = {};
      BrowserFingerprintTest.firstSample.vertices = firstSample.meshes[0].vertices;
      BrowserFingerprintTest.firstSample.indices = [].concat.apply([], firstSample.meshes[0].faces);
      BrowserFingerprintTest.firstSample.texCoords = firstSample.meshes[0].texturecoords[0];
      BrowserFingerprintTest.firstSample.normals = firstSample.meshes[0].normals;

      BrowserFingerprintTest.combineSamples();
    });

    loadJSONResource('/assets/second.json', function(error, secondSample) {
      BrowserFingerprintTest.secondSample = {};

      // BrowserFingerprint.secondSample.vertices = secondSample.meshes[0].vertices;
      BrowserFingerprintTest.secondSample.vertices = (function() {
        var j, len, ref, results;
        ref = secondSample.meshes[0].vertices;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          vert = ref[j];
          results.push(vert / 20.0);
        }
        return results;
      }).call(BrowserFingerprintTest, secondSample);
      BrowserFingerprintTest.secondSample.indices = [].concat.apply([], secondSample.meshes[0].faces);
      BrowserFingerprintTest.secondSample.texCoords = secondSample.meshes[0].texturecoords[0];
      BrowserFingerprintTest.secondSample.normals = secondSample.meshes[0].normals;

      BrowserFingerprintTest.combineSamples();
    });

    loadImage('/assets/color.png', function( texture ) {
      BrowserFingerprintTest.firstTexture = texture;
      BrowserFingerprintTest.executeTests();
    });

    loadImage('/assets/color2.png', function( texture ) {
      BrowserFingerprintTest.secondTexture = texture;
      BrowserFingerprintTest.executeTests();
    });
  },

  combineSamples : function() {

    var i, index, j, k, maxFirst, ref, ref2, ref4;

    if ( !BrowserFingerprintTest.firstSample || !BrowserFingerprintTest.secondSample ) return false;

    BrowserFingerprintTest.thirdSample = {};
    BrowserFingerprintTest.thirdSample.vertices = new Array(BrowserFingerprintTest.secondSample.indices.length + BrowserFingerprintTest.firstSample.indices.length);
    for (i = j = 0, BrowserFingerprintTest.firstSample.vertices.length; j < BrowserFingerprintTest.firstSample.vertices.length; i = j += 3) {
      BrowserFingerprintTest.thirdSample.vertices[i + 0] = BrowserFingerprintTest.firstSample.vertices[i + 0];
      BrowserFingerprintTest.thirdSample.vertices[i + 1] = BrowserFingerprintTest.firstSample.vertices[i + 1] + 1.3;
      BrowserFingerprintTest.thirdSample.vertices[i + 2] = BrowserFingerprintTest.firstSample.vertices[i + 2];
    }
    for (i = k = 0, BrowserFingerprintTest.secondSample.vertices.length; k < BrowserFingerprintTest.secondSample.vertices.length; i = k += 3) {
      BrowserFingerprintTest.thirdSample.vertices[i + 0 + BrowserFingerprintTest.firstSample.vertices.length] = BrowserFingerprintTest.secondSample.vertices[i + 0];
      BrowserFingerprintTest.thirdSample.vertices[i + 1 + BrowserFingerprintTest.firstSample.vertices.length] = BrowserFingerprintTest.secondSample.vertices[i + 1] - 1.3;
      BrowserFingerprintTest.thirdSample.vertices[i + 2 + BrowserFingerprintTest.firstSample.vertices.length] = BrowserFingerprintTest.secondSample.vertices[i + 2];
    }
    BrowserFingerprintTest.thirdSample.indices = new Array(BrowserFingerprintTest.secondSample.indices.length + BrowserFingerprintTest.firstSample.indices.length);

    [].splice.apply(
      BrowserFingerprintTest.thirdSample.indices,
      [0, BrowserFingerprintTest.firstSample.indices.length - 0].concat(ref2 = BrowserFingerprintTest.firstSample.indices)),
      ref2
    ;

    maxFirst = BrowserFingerprintTest.firstSample.indices.reduce(function(a, b) {
      return Math.max(a, b);
    });

    [].splice.apply(
      BrowserFingerprintTest.thirdSample.indices,
      [BrowserFingerprintTest.firstSample.indices.length, (BrowserFingerprintTest.thirdSample.indices.length - BrowserFingerprintTest.firstSample.indices.length)]
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
            }).call(BrowserFingerprintTest)
        )),
      ref4
    ;

    BrowserFingerprintTest.thirdSample.texCoords = BrowserFingerprintTest.firstSample.texCoords.concat(BrowserFingerprintTest.secondSample.texCoords);
    BrowserFingerprintTest.thirdSample.normals = BrowserFingerprintTest.firstSample.normals.concat(BrowserFingerprintTest.secondSample.normals);

    BrowserFingerprintTest.executeTests();
  },

  executeTests : function () {

    if ( !BrowserFingerprintTest.firstSample || !BrowserFingerprintTest.secondSample || !BrowserFingerprintTest.thirdSample || !BrowserFingerprintTest.firstTexture || !BrowserFingerprintTest.secondTexture) return false;

    // Tests to Execute

    BrowserFingerprintTest.testList.push({id: 'general', name: 'General', test: new General(), cb: BrowserFingerprintTest.testGeneralDone, description: 'todooooo'});

    BrowserFingerprintTest.testList.push({id: 'cube', name: 'Cubo', test: new CubeTest('normal'), cb: BrowserFingerprintTest.testDone, description: 'Cubo generado sin AntiAliasing'});
    BrowserFingerprintTest.testList.push({id: 'cube_aa', name: 'Cubo AA', test: new CubeTest('aa'), cb: BrowserFingerprintTest.testDone, description: 'Cubo generado con AntiAliasing'});
    BrowserFingerprintTest.testList.push({id: 'line', name: 'Lineas y Curvas', test: new LineTest('normal'), cb: BrowserFingerprintTest.testDone, description: 'Lineas y Curvas sin AntiAliasing'});
    BrowserFingerprintTest.testList.push({id: 'line_aa', name: 'Lineas y Curvas AA', test: new LineTest('aa'), cb: BrowserFingerprintTest.testDone, description: 'Lineas y Curvas con AntiAliasing'});
    BrowserFingerprintTest.testList.push({id: 'texture', name: 'Texturas', test: new TextureTest(BrowserFingerprintTest.firstSample.vertices, BrowserFingerprintTest.firstSample.indices, BrowserFingerprintTest.firstSample.texCoords, BrowserFingerprintTest.firstTexture), cb: BrowserFingerprintTest.testDone, description: 'Texturas'});
      BrowserFingerprintTest.testList.push({id: 'texture_combined', name: 'Texturas Combinado', test: new TextureTest(BrowserFingerprintTest.thirdSample.vertices, BrowserFingerprintTest.thirdSample.indices, BrowserFingerprintTest.thirdSample.texCoords, BrowserFingerprintTest.firstTexture), cb: BrowserFingerprintTest.testDone, description: 'Texturas Combinado'});
    BrowserFingerprintTest.testList.push({id: 'light_simple', name: 'Luz Simple', test: new SimpleLightTest(BrowserFingerprintTest.firstSample.vertices, BrowserFingerprintTest.firstSample.indices, BrowserFingerprintTest.firstSample.texCoords, BrowserFingerprintTest.firstSample.normals, BrowserFingerprintTest.firstTexture), cb: BrowserFingerprintTest.testDone, description: 'Luz Simple'});
    BrowserFingerprintTest.testList.push({id: 'light_combined', name: 'Luz Combinada', test: new SimpleLightTest(BrowserFingerprintTest.thirdSample.vertices, BrowserFingerprintTest.thirdSample.indices, BrowserFingerprintTest.thirdSample.texCoords, BrowserFingerprintTest.thirdSample.normals, BrowserFingerprintTest.firstTexture), cb: BrowserFingerprintTest.testDone, description: 'Luz Combinada'});
    BrowserFingerprintTest.testList.push({id: 'more_light_combined', name: 'Luz Combinada 2', test: new MoreLightTest(BrowserFingerprintTest.thirdSample.vertices, BrowserFingerprintTest.thirdSample.indices, BrowserFingerprintTest.thirdSample.texCoords, BrowserFingerprintTest.thirdSample.normals, BrowserFingerprintTest.firstTexture, 'normal'), cb: BrowserFingerprintTest.testDone, description: 'Luz Combinada 2'});
    BrowserFingerprintTest.testList.push({id: 'more_light_combined_aa', name: 'Luz Combinada con Antialising', test: new MoreLightTest(BrowserFingerprintTest.thirdSample.vertices, BrowserFingerprintTest.thirdSample.indices, BrowserFingerprintTest.thirdSample.texCoords, BrowserFingerprintTest.thirdSample.normals, BrowserFingerprintTest.firstTexture, 'aa'), cb: BrowserFingerprintTest.testDone, description: 'Luz Combinada Con Antialising'});
    BrowserFingerprintTest.testList.push({id: 'more_light_texture_combined', name: 'Luz y Textura Combinada', test: new LightAndTextureTest(BrowserFingerprintTest.thirdSample.vertices, BrowserFingerprintTest.thirdSample.indices, BrowserFingerprintTest.thirdSample.texCoords, BrowserFingerprintTest.thirdSample.normals, BrowserFingerprintTest.firstTexture, BrowserFingerprintTest.secondTexture), cb: BrowserFingerprintTest.testDone, description: 'Luz Y Textura Combinada'});
    BrowserFingerprintTest.testList.push({id: 'transparent', name: 'Transparencia', test: new TransparentTest(BrowserFingerprintTest.thirdSample.vertices, BrowserFingerprintTest.thirdSample.indices, BrowserFingerprintTest.thirdSample.texCoords, BrowserFingerprintTest.thirdSample.normals, BrowserFingerprintTest.firstTexture), cb: BrowserFingerprintTest.testDone, description: 'Transparencia'});
    // BrowserFingerprintTest.testList.push({id: 'lighting', name: 'Luz', test: new LightingTest('normal'), cb: BrowserFingerprintTest.testDone, description: 'This test uses multiple moving lights of different colors that illuminate a screen of 5000 metalic rings. The color and texture of the rings is calculated by the GPU as opposed to loading in a image.'});
    // BrowserFingerprintTest.testList.push({id: 'lighting_aa', name: 'Luz con Antialising', test: new LightingTest('aa'), cb: BrowserFingerprintTest.testDone, description: 'This test uses multiple moving lights of different colors that illuminate a screen of 5000 metalic rings with Antialising. The color and texture of the rings is calculated by the GPU as opposed to loading in a image.'});
    BrowserFingerprintTest.testList.push({id: 'camera', name: 'Camara', test: new CameraTest(), cb: BrowserFingerprintTest.testDone, description: 'Camera'});


    // Run Tests
    for (var i = 0 ; i < BrowserFingerprintTest.testList.length ; i ++ ) {
      if ( BrowserFingerprintTest.testList[i].id === 'general') {
        BrowserFingerprintTest.testGeneralStart( BrowserFingerprintTest.testList[i] );
      } else {
        BrowserFingerprintTest.testStart( BrowserFingerprintTest.testList[i] );
      }
    }

  },

  testGeneralStart : function ( test ) {
    // alert('testGeneralStart');

    test.test.begin(test.cb);
  },

  testStart : function( test ) {
    var row = document.querySelector('.results .row');

    var divContainer = document.createElement('div');
    divContainer.classList.add(test.id);
    divContainer.classList.add('col-md-6');

    var rowContainer = document.createElement('div');
    rowContainer.classList.add('row');
    rowContainer.dataset.id = test.id;

    var div1 = document.createElement('div');
    div1.classList.add('col-md-5');

    var div2 = document.createElement('div');
    div2.classList.add('col-md-7');
    div2.classList.add('results');

    var canvas = document.createElement('canvas');
    canvas.id = test.name;
    canvas.height = BrowserFingerprintTest.sizeCanvas;
    canvas.width = BrowserFingerprintTest.sizeCanvas;

    div2.innerHTML = '<h2>' + test.name + '</h2><p>Descripcion: ' + test.description + '</p>';
    div1.appendChild(canvas);

    rowContainer.appendChild(div1);
    rowContainer.appendChild(div2);
    divContainer.appendChild(rowContainer);

    row.appendChild(divContainer);
    test.test.begin(canvas, test.cb);
  },

  testGeneralDone : function ( data ) {
    output(syntaxHighlight(JSON.stringify(data, undefined, 4)), '#general');
    for (var i  = 0 ; i < BrowserFingerprintTest.testList.length ; i ++ ) {
      if ( BrowserFingerprintTest.testList[i].id === 'general' ) {
        BrowserFingerprintTest.testList[i].result = data;
      }
    }
    for ( var key in data ) {
      BrowserFingerprintTest.dataFingerprint[key] = data[key];
    }
    BrowserFingerprintTest.generalTestDone = true;
    BrowserFingerprintTest.checkIsReady();
  },

  testDone : function( gl ) {
    var pixels = new Uint8Array(256 * 256 * 4);
    gl.readPixels(0, 0, 256, 256, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    var hash = pixels.hashCode();
    BrowserFingerprintTest.setAndShowResult(gl.canvas, hash);

    for( var t in BrowserFingerprintTest.testList ) {
      var test = BrowserFingerprintTest.testList[t];
      if (typeof test['result'] === 'undefined') return false
    }
    BrowserFingerprintTest.webGlTestDone = true;
    BrowserFingerprintTest.checkIsReady();

    // console.log(BrowserFingerprint.testList);

    // console.log(WebGL, ven, ren, hash, id, pixels);
    // console.log(hash);

    // this.toServer(WebGL, ven, ren, hash, id, pixels);
    // if (sumRGB(pixels) > 1.0) {
    //     return hashRGB(pixels);
    // } else {
    //     return 0;
    // }
  },

  setAndShowResult: function ( canvas, hash ) {

    // Show
    var row = canvas.parentNode.parentNode;
    var results = canvas.parentNode.nextSibling;

    var p = document.createElement('p');
    p.innerText = 'Result: ' + hash;

    results.appendChild(p);

    // Set
    var id = row.dataset.id;
    for (var i  = 0 ; i < BrowserFingerprintTest.testList.length ; i ++ ) {
      if ( BrowserFingerprintTest.testList[i].id === id ) {
        BrowserFingerprintTest.testList[i].result = hash;
      }
    }
    if (typeof BrowserFingerprintTest.dataFingerprint['webgl'] === 'undefined') {
      BrowserFingerprintTest.dataFingerprint['webgl'] = {};
    }
    BrowserFingerprintTest.dataFingerprint['webgl'][id] = hash;
  },

  checkIsReady: function () {
    if ( BrowserFingerprintTest.generalTestDone && BrowserFingerprintTest.webGlTestDone ) {
      $.post('/example/create', BrowserFingerprintTest.dataFingerprint, BrowserFingerprintTest.callbackResponse);
    }
  },

  callbackResponse: function( response ) {
    if ( response.success ) {
      StatusNav.updateHash(response.data.id);
      StatusNav.updateAction('-');
      StatusNav.updatePhase('-');
      StatusNav.updateStatus('Fin de la prueba');

      Loader.hideLoader();

    } else {
      StatusNav.setError();
      console.error(response.data);
    }
  }
};

jQuery(BrowserFingerprintTest.init());
