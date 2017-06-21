var Main = {
  init: function() {

    var cookie = Cookies.get('wilde-fp');

    if ( typeof cookie === 'undefined' ) {
      StatusNav.updateHash('Sin hash');
      StatusNav.updateAction('Obteniendo Hash...');
      StatusNav.updateStatus('No reconocido');

      BrowserFingerprint.getFP();

    } else {
      StatusNav.updateHash(cookie);
      StatusNav.updateAction('-');
      StatusNav.updateStatus('Reconocido');
      Loader.hideLoader();
    }
  }
};

$(Main.init());