var Main = {
  init: function() {

    if ( ClientData.getWildeFP() ) {
      StatusNav.setPhase1();
      Loader.hideLoader();
    } else {
      StatusNav.setPhase0();
      BrowserFingerprint.getFP();
    }
  }
};

$(Main.init());