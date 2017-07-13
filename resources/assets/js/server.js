var Server = {
  init: function(){},

  phase1: function() {
    BrowserFingerprint.getFP(Server.phase1CB);
    StatusNav.setPhase0();
  },

  phase1CB: function( response ){
    if ( response.success ) {
      ClientData.setWildeFP(response.data.wfp);
      ClientData.setWildePhase('1');

      if ( response.data.new ) {
        StatusNav.setPhase1();
        Loader.hideLoader();

        $('#welcome').modal();

        Server.phase2();
      } else {
        window.location.reload(true);
      }

    } else {

      StatusNav.setError();
      console.error(response.data);
    }
  },

  checkFP: function(){
    StatusNav.setChecking();
    BrowserFingerprint.getFP(Server.checkFPCB);
  },

  checkFPCB: function( response ) {
    if ( response.success ) {
      if ( ClientData.getWildeFP() != response.data.wfp ) {
        ClientData.setWildeFP(response.data.wfp);
        ClientData.setWildePhase('1');
      }
      Server.phase2();
    }
  },

  phase2: function() {
    ExtraData.getExtraData(Server.phase2CB);
  },

  phase2CB: function( response ) {
    if ( response.success ) {
      ClientData.setWildePhase('2');
      StatusNav.setPhase2();
    }
  },

  addData: function(data, cb) {
    $.post('add-data', data, function(response) {
      if ( response.success ) {
        cb( response );
      }else {
        console.error(response);
      }
    })
  },
};

$(Server.init());

