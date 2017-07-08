ClientData = {

  wildeFP: null,
  wildePhase: null,

  init : function() {
    ClientData.getWildeFP();
    ClientData.getWildePhase();
  },

  getWildeFP : function() {
    if ( ClientData.wildeFP ) {
      return ClientData.wildeFP;
    } else {
      var value = ClientData.getData('wilde-fp');
      if ( typeof value === "undefined" ) {
        return null;
      } else {
        ClientData.wildeFP = value;
        return ClientData.wildeFP;
      }
    }
  },

  setWildeFP : function( value ) {
    ClientData.setData('wilde-fp', value);
    ClientData.wildeFP = value;
    return true;
  },

  getWildePhase : function() {
    if ( ClientData.wildePhase ) {
      return ClientData.wildePhase;
    } else {
      var value = ClientData.getData('wilde-phase');
      if ( typeof value === "undefined" ) {
        return null;
      } else {
        ClientData.wildePhase = value;
        return ClientData.wildePhase;
      }
    }
  },

  setWildePhase : function( value ) {
    ClientData.setData('wilde-phase', value);
    ClientData.wildePhase = value;
    return true;
  },

  getData: function( key ) {
    return Cookies.get(key);
  },

  setData: function( key, value ) {
    return Cookies.set(key, value);
  }
};

$(ClientData.init());