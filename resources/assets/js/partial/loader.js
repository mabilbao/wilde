Loader = {
  init: function() {
    Loader.showLoader();
  },

  showLoader: function() {
    $('.container-loader').show();
    $('.container-content').hide();
  },

  hideLoader: function() {
    $('.container-loader').hide();
    $('.container-content').show();
  }
};

$(Loader.init());