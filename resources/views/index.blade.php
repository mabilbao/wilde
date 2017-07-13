@extends('layout')


@section('content')


    <div class="container-fluid">
        <div class="hero">
            <div class="row">
                <div class="col-lg-6 col-md-1">
                    <img class="img-right" src="hero.png">
                </div>
                <div class="col-lg-6 col-md-1">
                    <img class="img-left" src="wicon2.png">
                    <h2>Sistema de trackeo y filtrado</h2>
                </div>
            </div>
            <div class="row">
                <div class="hash-container">
                    <p>HASH: <span class="hash"></span></p>
                </div>
            </div>
        </div>
    </div>

    <div class="container">

        <div class="row">
            <div class="col-lg-12 container-text">
                <h3>¿Que es un Browser?</h3>
                <p>Es un software, aplicación o programa que permite el acceso a la Web, interpretando la información de distintos tipos de archivos y sitios web para que estos puedan ser visualizados.
                    La funcionalidad básica de un navegador web es permitir la visualización de documentos de texto, posiblemente con recursos multimedia incrustados.
                    Además, permite visitar páginas web y hacer actividades en ella, es decir,
                    enlazar un sitio con otro, imprimir, enviar y recibir correo, entre otras funcionalidades más.</p>

                <h3>¿Que es un Fingerprint?</h3>
                <p>Impresión dejada por la fricción de la rugosidad de un dedo humano. Las huellas humanas son precisas,
                    casi únicas, difíciles de alterar y duraderas durante la vida de un individuo,
                    haciéndolas adecuadas como una marca de la identidad humana a largo plazo.</p>

                <h3>¿Que es un Browser-Fingerprint?</h3>
                <p>Una forma en la que los sitios web recuerden y rastrean computadoras o dispositivos individuales,
                    cargando un pequeño paquete de datos en las computadoras de los visitante.
                </p>
            </div>
        </div>
    </div>

    @include('partial.welcome-modal')
    @include('partial.promo-modal')
@endsection

@push('scripts')
    <script src="/js/app.js"></script>
@endpush