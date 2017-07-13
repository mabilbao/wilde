@if ( isset($me->isPromo) && $me->isPromo )
    <div class="modal fade" id="promo" tabindex="-1" role="dialog" aria-labelledby="promoLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Promocion!</h4>
                </div>
                <div class="modal-body">
                    <img src="/promo.png" class="img-responsive" style="margin: 0 auto;">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Muchas Gracias</button>
                </div>
            </div>
        </div>
    </div>
@endif