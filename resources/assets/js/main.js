var Main = {
  init: function () {

    // Start Phases
    if (ClientData.getWildeFP()) {
      StatusNav.setPhase1();
      Loader.hideLoader();

      Server.checkFP();
    } else {
      Server.phase1();
    }

    // Set events
    $('.submit-form-welcome').click(Main.submitFormWelcome);

    // Open modals
    Main.openPromo();
  },

  openPromo: function() {
    var promoModal = $('#promo');
    if ( promoModal.length > 0 ) {
      promoModal.modal();
    }
  },

  submitFormWelcome: function () {
    var formWelcome = $('.form-welcome');
    var data = {};
    data.name = formWelcome.find('[name="name"]').val();
    Server.addData(data, Main.submitFormWelcomeCB);
  },

  submitFormWelcomeCB: function ( response ) {
    var welcome = $('.welcome');
    var p = document.createElement('p');
    p.innerHTML = "Bienvenido " + response.data.name;
    welcome.append(p);
    $('#welcome').modal('hide');
  }
};

$(Main.init());