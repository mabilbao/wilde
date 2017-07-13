var ExtraData = {
  cb: null,

  init: function() {},

  getExtraData: function( cb ) {
    ExtraData.cb = cb;

    var client = new ClientJS(); // Create A New Client Object
    var data = {};

    data.browser = client.getBrowser();
    data.os = client.getOS();
    data.osVersion = client.getOSVersion();
    data.isMobile = client.isMobile();

    console.log( browser );

    ExtraData.cb();
  }
};

$(ExtraData.init());