StatusNav = {
  init: function() {},

  updateStatus: function ( status ){
    $('.status-nav .status').text(status);
  },

  updateHash: function ( hash ) {
    $('.hash').text(hash);
  },

  updateAction: function ( action ) {
    $('.status-nav .action').text(action);
  }
};

// $(StatusNav.init());