var Server = {
  init: function(){},

  phase0: function() {
    BrowserFingerprint.getFP(Server.phase0CB);
    StatusNav.setPhase0();
  },

  phase0CB: function( response ){
    if ( response.success ) {
      ClientData.setWildeFP(response.data.wfp);
      ClientData.setWildePhase('1');

      StatusNav.setPhase1();
      Loader.hideLoader();

      $('#welcome').modal();

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
      if ( ClientData.getWildePhase() == 1 ) {
        StatusNav.setPhase1();
      } else {
        StatusNav.setPhase2();
      }
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

