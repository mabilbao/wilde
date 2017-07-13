var ExtraData = {
  cb: null,

  init: function() {},

  getExtraData: function( cb ) {
    ExtraData.cb = cb;

    var client = new ClientJS(); // Create A New Client Object
    var data = {};

    // $.getJSON('//api.ipinfodb.com/v3/ip-city/?key=<your_api_key>&format=json&callback=?', function(data) {
    //   console.log(data);
    // });

    data.browser = client.getBrowser();
    data.os = client.getOS();
    data.osVersion = client.getOSVersion();
    data.isMobile = client.isMobile();

    data.phase = 2;
    Server.addData(data, ExtraData.cb);
  }
};

$(ExtraData.init());