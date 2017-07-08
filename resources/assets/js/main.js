var Main = {
  init: function() {

    var cookie = Cookies.get('wilde-fp');
    var phase = Cookies.get('wilde-phase');

    if ( typeof cookie === 'undefined' ) {
      StatusNav.updateHash('Sin hash');
      StatusNav.updateAction('Obteniendo Hash...');
      StatusNav.updatePhase('0');
      StatusNav.updateStatus('No reconocido');

      BrowserFingerprint.getFP();

    } else {
      StatusNav.updateHash(cookie);
      StatusNav.updateAction('-');
      StatusNav.updatePhase(phase);
      StatusNav.updateStatus('Reconocido');
      Loader.hideLoader();
    }
  }
};

$(Main.init());