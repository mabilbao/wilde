var StatusNav = {
  init: function() {},

  setPhase0 : function() {
    StatusNav.updateHash('Sin hash');
    StatusNav.updateAction('Obteniendo Hash...');
    StatusNav.updatePhase('0');
    StatusNav.updateStatus('No reconocido');
  },

  setPhase1 : function() {
    StatusNav.updateHash(ClientData.getWildeFP());
    StatusNav.updateAction('Preparando Fase 2...');
    StatusNav.updatePhase(ClientData.getWildePhase());
    StatusNav.updateStatus('Reconocido');
  },

  setPhase2 : function() {
    StatusNav.updateHash(ClientData.getWildeFP());
    StatusNav.updateAction('Completo');
    StatusNav.updatePhase(ClientData.getWildePhase());
    StatusNav.updateStatus('Reconocido');
  },

  setChecking : function() {
    StatusNav.updateHash(ClientData.getWildeFP());
    StatusNav.updateAction('Chequeando Hash...');
    StatusNav.updatePhase(ClientData.getWildePhase());
    StatusNav.updateStatus('Reconocido');
  },

  setError : function() {
    StatusNav.updateHash('-');
    StatusNav.updateAction('-');
    StatusNav.updatePhase('-');
    StatusNav.updateStatus('Error al intentar guardar al dispositivo');
  },

  setTest : function() {
    StatusNav.updateHash('Sin hash');
    StatusNav.updateAction('Obteniendo Hash...');
    StatusNav.updatePhase('Test');
    StatusNav.updateStatus('Esto es una prueba');
  },

  updateStatus: function ( status ){
    $('.status-nav .status').text(status);
  },

  updateHash: function ( hash ) {
    $('.hash').text(hash);
  },

  updatePhase: function ( action ) {
    $('.phase').text(action);
  },

  updateAction: function ( action ) {
    $('.status-nav .action').text(action);
  }
};

$(StatusNav.init());