var Rules = {

  key: null,
  value: null,
  chosen: null,
  rule: null,
  submit: null,

  init: function() {
    if ( window.location.pathname.indexOf('rules') < 0 ) return false;

    Rules.key = $('.form-rules #key');
    Rules.value = $('.form-rules #value');
    Rules.chosen = $('.form-rules #chosen');
    Rules.rule = $('.form-rules #rule');
    Rules.submit = $('.form-rules button');

    Rules.key.change(Rules.getChosens);
    Rules.chosen.change(Rules.setValue);
    Rules.getChosens();
  },

  enableForm: function( enable ) {
    if ( typeof enable === 'undefined' ) enable = true;
    Rules.key.prop( "disabled", !enable );
    Rules.value.prop( "disabled", !enable );
    Rules.chosen.prop( "disabled", !enable );
    Rules.rule.prop( "disabled", !enable );
    Rules.submit.prop( "disabled", !enable );
  },

  getChosens: function() {
    Rules.enableForm(false);
    $.get('/rules/' + Rules.key.val() + '/values', function(response) {
      Rules.chosen.empty();
      if ( response.success ) {
        for( var data in response.data) {
          var option = document.createElement('option');
          option.chosen = data;
          option.text = response.data[data];
          Rules.chosen.append(option);
        }
        Rules.enableForm(true);
      } else {
        console.error(response);
      }
    });
  },

  setValue: function() {
    if ( Rules.value.val() ) {
      if ( confirm('Desea reemplazar el Valor?') )  {
        Rules.value.val(Rules.chosen.val());
      }
    } else {
      Rules.value.val(Rules.chosen.val());
    }
  }
};

$(Rules.init());