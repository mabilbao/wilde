getCanvas = function(canvasName) {
    var canvas = $('#' + canvasName);
    if(!canvas[0]){
        $('#test_canvas').append("<canvas id='" + canvasName + "' width='256' height='256'></canvas>");
    }
    return canvas = $('#' + canvasName)[0];
};

getGL = function(canvas, aa) {
    if ( typeof aa === 'undefined' ) {
        var aa = false;
    }

    var gl = null;
    for (var i = 0; i < 4; ++i) {
        gl = canvas.getContext(
            [ "webgl", "experimental-webgl", "moz-webgl", "webkit-3d" ][i], {
                antialias : aa,
                preserveDrawingBuffer : true,
                willReadFrequently : false,
                depth: true
            });
        if (gl)
            break;
    }

    if (!gl) {
        alert('Your browser does not support WebGL');
    }
    return gl;
}

loadImage = function(url, callback) {
    var image;
    image = new Image();
    image.onload = function() {
        return callback(image);
    };
    image.src = url;
    return true;
};

loadTextResource = function(url, callback, caller) {
    var request = new XMLHttpRequest();
    request.open('GET', url + '?please-dont-cache=' + Math.random(), true);
    request.onload = function() {
        if (request.status < 200 || request.status > 299) {
            callback('Error: HTTP Status ' + request.status + ' on resource ' + url);
        } else {
            callback(null, request.responseText, caller);
        }
    };
    request.send();
};

loadJSONResource = function(url, callback) {
    loadTextResource(url, function(err, result) {
        if (err) {
            return callback(err);
        } else {
            try {
                return callback(null, JSON.parse(result));
            } catch (error) {
                return callback(err);
            }
        }
    });
    return true;
};

Uint8Array.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length === 0)
        return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this[i];
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

output = function(inp, container) {
  if ( typeof container === 'undefined' ){
    document.body.appendChild(document.createElement('pre')).innerHTML = inp;
  }else{
    document.querySelector(container).appendChild(document.createElement('pre')).innerHTML = inp;
  }
};

syntaxHighlight = function (json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
};