var Main = {
  init: function () {

    if (ClientData.getWildeFP()) {
      StatusNav.setPhase1();
      Loader.hideLoader();

      Server.checkFP();
    } else {
      Server.phase0();
    }

    $('.submit-form-welcome').click(Main.submitFormWelcome);
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

    ClientData.setWildePhase(2);
    StatusNav.setPhase2();

    $('#welcome').modal('hide');
  }
};

$(Main.init());