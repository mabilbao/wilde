var General = function() {
  this.cb = null;
  this.clientJs = new ClientJS();

  this.getUserAgent = function() {
    return navigator.userAgent;
  };

  this.getAccept = function() {
    var headers = $('#dataheaders').data('headers');
    return JSON.parse(JSON.stringify(headers))['accept'][0];
  };

  this.getAcceptEncoding = function() {
    var headers = $('#dataheaders').data('headers');
    return JSON.parse(JSON.stringify(headers))['accept-encoding'][0];
  };

  this.getContentLanguage = function() {
    var headers = $('#dataheaders').data('headers');
    return JSON.parse(JSON.stringify(headers))['accept-language'][0];
  };

  this.getPlugins = function() {
    return this.clientJs.getPlugins();
  };

  this.getCookies = function() {
    return this.clientJs.isCookie();
  };

  this.getLocalStorage = function() {
    return this.clientJs.isLocalStorage();
  };

  this.getSessionStorage = function() {
    return this.clientJs.isSessionStorage();
  };

  this.getTimeZone = function() {
    return new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1];
    // return this.clientJs.getTimeZone();
  };

  this.getResolution = function() {
    var width = null;
    var height = null;
    if ( this.clientJs.isMac() ) {
      if ( this.clientJs.isChrome() ) {
        width = Math.round(screen.availWidth * 2);
        height = Math.round(screen.availHeight * 2);
      } else {
        width = Math.round(screen.availWidth * detectZoom.device());
        height = Math.round(screen.availHeight * detectZoom.device());
      }
    }
    // return width+'x'+height;
    return this.clientJs.getCurrentResolution();
  };

  this.getFonts = function() {
    return this.clientJs.getFonts();
  };

  this.getHeaders = function() {
    var headers = $('#dataheaders').data('headers');
    return JSON.parse(JSON.stringify(headers));
  };

  this.getPlatform = function() {
      return navigator.platform;
  };

  this.getCores = function() {
      return navigator.hardwareConcurrency;
  };

  this.getAdBlocker = function() {
    var ads = document.createElement("div");
    ads.innerHTML = "&nbsp;";
    ads.className = "adsbox";
    var result = false;
    try {
      // body may not exist, that's why we need try/catch
      document.body.appendChild(ads);
      result = document.getElementsByClassName("adsbox")[0].offsetHeight === 0;
      document.body.removeChild(ads);
    } catch (e) {
      result = false;
    }
    return result;
  };

  this.getCanvas = function() {
    try {
      var result = [];
      // Very simple now, need to make it more complex (geo shapes etc)
      if ( document.getElementById("wilde-canvas") ) {
        var canvas = document.getElementById("wilde-canvas");
      } else {
        var canvas = document.createElement("canvas");
      }
      canvas.width = 500;
      canvas.height = 200;
      canvas.style.display = "inline";
      var ctx = canvas.getContext("2d");
      // detect browser support of canvas winding
      // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
      // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/canvas/winding.js
      ctx.rect(0, 0, 10, 10);
      ctx.rect(2, 2, 6, 6);
      result.push("canvas winding:" + ((ctx.isPointInPath(5, 5, "evenodd") === false) ? "yes" : "no"));

      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#f60";
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = "#069";
      // https://github.com/Valve/fingerprintjs2/issues/66
      // if (this.options.dontUseFakeFontInCanvas) {
        ctx.font = "11pt Arial";
      // } else {
      //   ctx.font = "11pt no-real-font-123";
      // }
      ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15);
      ctx.fillStyle = "rgba(102, 204, 0, 0.2)";
      ctx.font = "18pt Arial";
      ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45);

      // canvas blending
      // http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
      // http://jsfiddle.net/NDYV8/16/
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = "rgb(255,0,255)";
      ctx.beginPath();
      ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgb(0,255,255)";
      ctx.beginPath();
      ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgb(255,255,0)";
      ctx.beginPath();
      ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgb(255,0,255)";
      // canvas winding
      // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
      // http://jsfiddle.net/NDYV8/19/
      ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
      ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
      ctx.fill("evenodd");

      result.push("canvas fp:" + canvas.toDataURL());
      return result.join("~");
    } catch (e) {
      console.error(e);
    }
  };

  this.getWebGlVendor = function() {
    var vendor = null;
    var gl = undefined;
    var canvas = document.createElement("canvas");
    try {
      gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
    } catch (e) {}
    if ( gl != undefined ) {
      var extension = gl.getExtension('WEBGL_debug_renderer_info');
      if (extension != undefined) {
        vendor = gl.getParameter(extension.UNMASKED_VENDOR_WEBGL);
      } else {
        vendor = gl.getParameter(gl.VENDOR);
      }
    }
    return vendor;
  };

  this.getWebGlRenderer = function() {
    var renderer = null;
    var gl = undefined;
    var canvas = document.createElement("canvas");
    try {
      gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
    } catch (e) {}
    if ( gl != undefined ) {
      var extension = gl.getExtension('WEBGL_debug_renderer_info');
      if (extension != undefined) {
        renderer = gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
      } else {
        renderer = gl.getParameter(gl.RENDERER);
      }
    }
    return renderer;
  };

  this.getWebglCanvas = function() {
    if ( document.getElementById("wilde-webgl") ) {
      var canvas = document.getElementById("wilde-webgl");
    } else {
      var canvas = document.createElement("canvas");
    }
    var gl = null;
    try {
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch(e) { /* squelch */ }
    if (!gl) { gl = null; }
    return gl;
  };

  this.getWebglFp = function() {
    try {
        var gl;
        var fa2s = function(fa) {
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          gl.enable(gl.DEPTH_TEST);
          gl.depthFunc(gl.LEQUAL);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
          return "[" + fa[0] + ", " + fa[1] + "]";
        };
        var maxAnisotropy = function(gl) {
          var anisotropy, ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
          return ext ? (anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === anisotropy && (anisotropy = 2), anisotropy) : null;
        };
        gl = this.getWebglCanvas();
        if(!gl) { return null; }
        // WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
        // First it draws a gradient object with shaders and convers the image to the Base64 string.
        // Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
        // Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.
        var result = [];
        var vShaderTemplate = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
        var fShaderTemplate = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
        var vertexPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
        var vertices = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        vertexPosBuffer.itemSize = 3;
        vertexPosBuffer.numItems = 3;
        var program = gl.createProgram(), vshader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vshader, vShaderTemplate);
        gl.compileShader(vshader);
        var fshader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fshader, fShaderTemplate);
        gl.compileShader(fshader);
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program);
        gl.useProgram(program);
        program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
        program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
        gl.enableVertexAttribArray(program.vertexPosArray);
        gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
        gl.uniform2f(program.offsetUniform, 1, 1);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
        if (gl.canvas != null) { result.push(gl.canvas.toDataURL()); }
        result.push("extensions:" + gl.getSupportedExtensions().join(";"));
        result.push("webgl aliased line width range:" + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
        result.push("webgl aliased point size range:" + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
        result.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
        result.push("webgl antialiasing:" + (gl.getContextAttributes().antialias ? "yes" : "no"));
        result.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
        result.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
        result.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
        result.push("webgl max anisotropy:" + maxAnisotropy(gl));
        result.push("webgl max combined texture image units:" + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
        result.push("webgl max cube map texture size:" + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
        result.push("webgl max fragment uniform vectors:" + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
        result.push("webgl max render buffer size:" + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
        result.push("webgl max texture image units:" + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
        result.push("webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
        result.push("webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS));
        result.push("webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
        result.push("webgl max vertex texture image units:" + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
        result.push("webgl max vertex uniform vectors:" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
        result.push("webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
        result.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
        result.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
        result.push("webgl shading language version:" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
        result.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
        result.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
        result.push("webgl version:" + gl.getParameter(gl.VERSION));

        try {
          // Add the unmasked vendor and unmasked renderer if the debug_renderer_info extension is available
          var extensionDebugRendererInfo = gl.getExtension("WEBGL_debug_renderer_info");
          if (extensionDebugRendererInfo) {
            result.push("webgl unmasked vendor:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL));
            result.push("webgl unmasked renderer:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL));
          }
        } catch(e) { /* squelch */ }

        if (!gl.getShaderPrecisionFormat) {
          return result.join("~");
        }

        result.push("webgl vertex shader high float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).precision);
        result.push("webgl vertex shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).rangeMin);
        result.push("webgl vertex shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).rangeMax);
        result.push("webgl vertex shader medium float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).precision);
        result.push("webgl vertex shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).rangeMin);
        result.push("webgl vertex shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).rangeMax);
        result.push("webgl vertex shader low float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).precision);
        result.push("webgl vertex shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).rangeMin);
        result.push("webgl vertex shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).rangeMax);
        result.push("webgl fragment shader high float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).precision);
        result.push("webgl fragment shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).rangeMin);
        result.push("webgl fragment shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).rangeMax);
        result.push("webgl fragment shader medium float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).precision);
        result.push("webgl fragment shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).rangeMin);
        result.push("webgl fragment shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).rangeMax);
        result.push("webgl fragment shader low float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).precision);
        result.push("webgl fragment shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).rangeMin);
        result.push("webgl fragment shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).rangeMax);
        result.push("webgl vertex shader high int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).precision);
        result.push("webgl vertex shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).rangeMin);
        result.push("webgl vertex shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).rangeMax);
        result.push("webgl vertex shader medium int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).precision);
        result.push("webgl vertex shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).rangeMin);
        result.push("webgl vertex shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).rangeMax);
        result.push("webgl vertex shader low int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).precision);
        result.push("webgl vertex shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).rangeMin);
        result.push("webgl vertex shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).rangeMax);
        result.push("webgl fragment shader high int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).precision);
        result.push("webgl fragment shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).rangeMin);
        result.push("webgl fragment shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).rangeMax);
        result.push("webgl fragment shader medium int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).precision);
        result.push("webgl fragment shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).rangeMin);
        result.push("webgl fragment shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).rangeMax);
        result.push("webgl fragment shader low int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).precision);
        result.push("webgl fragment shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).rangeMin);
        result.push("webgl fragment shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).rangeMax);
        result.join(result);
        return result;
    } catch ( e ) {
      console.error(e);
    }
  };

  this.begin = function(cb) {
    this.cb = cb;
    var data = {};
    var _this = this;

    new Fingerprint2().get(function(result, components){

      for ( var index in components ) {
        if ( components[index].key == 'js_fonts' ) {
          var firefox_fonts = components[index].value.join();
        }
      }
      data['user_agent'] = _this.getUserAgent();
      data['accept'] = _this.getAccept();
      data['accept_encoding'] = _this.getAcceptEncoding();
      data['content_language'] = _this.getContentLanguage();
      data['plugins'] = _this.getPlugins();
      data['cookies'] = _this.getCookies();
      data['local_storage'] = _this.getLocalStorage();
      data['session_storage'] = _this.getSessionStorage();
      data['timezone'] = _this.getTimeZone();
      data['platform'] = _this.getPlatform();
      data['ad_block'] = _this.getAdBlocker();
      data['webgl_fp'] = md5(_this.getWebglFp());
      data['webgl_vendor'] = _this.getWebGlVendor();
      data['webgl_renderer'] = _this.getWebGlRenderer();
      data['cores'] = _this.getCores();
      if ( !_this.clientJs.isFirefox() ) {
        data['resolution'] = _this.getResolution();
        data['fonts'] = _this.getFonts();
        data['canvas'] = _this.getCanvas();
      } else {
        data['fonts'] = firefox_fonts;
      }

      _this.cb(data);

    });
  }
};