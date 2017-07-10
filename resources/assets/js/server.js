var Server = {
  init: function(){},

  phase0: function() {
    BrowserFingerprint.getFP();
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

  addData: function(data, cb) {
    $.post('add-data', data, function(response) {
      if ( response.success ) {
        // console.log(response);
        cb( response.data );
      }else {
        console.error(response);
      }
    })
  },


};

$(Server.init());

