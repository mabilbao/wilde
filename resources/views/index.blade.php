@extends('layout')


@section('content')


    <div class="container-fluid">
        <div class="hero">
            <div class="row">
                <div class="col-lg-6">
                    <img class="img-right" src="hero.png">
                </div>
                <div class="col-lg-6">
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
            <div class="col-lg-12">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus blandit dui in aliquet. Donec hendrerit tristique nunc, nec lacinia diam convallis eget. Mauris condimentum id magna quis accumsan. Pellentesque dignissim viverra lorem cursus sollicitudin. Donec at dolor vitae neque gravida pulvinar sit amet sit amet tortor. Fusce sodales posuere consequat. Vivamus et nisl non urna vehicula facilisis sit amet sit amet ligula. Curabitur rhoncus vitae felis vel interdum.

                Aenean in malesuada diam, vitae pretium massa. Sed dapibus diam vitae vulputate mollis. Ut vestibulum finibus neque a euismod. Praesent vel risus massa. Nulla hendrerit vel dolor eget molestie. Duis est felis, pulvinar ut leo non, lacinia malesuada ligula. Suspendisse eget quam maximus, euismod nisi scelerisque, ullamcorper odio. Nunc ut augue nec nibh tincidunt sodales non non mi. Suspendisse potenti. Cras tempus finibus turpis, sed malesuada felis egestas vel.

                Phasellus dui quam, hendrerit quis tempor vitae, vulputate et mi. Duis et lectus tempor, vehicula enim sit amet, semper magna. Suspendisse vestibulum molestie odio et imperdiet. Sed vel orci massa. Ut vulputate, leo eget porttitor fringilla, orci lacus fringilla tortor, vel semper nulla purus eu ipsum. Aliquam sit amet tincidunt turpis. Suspendisse vestibulum libero quis urna eleifend vulputate. Praesent facilisis non sem ac varius. Mauris scelerisque leo nec est tristique efficitur volutpat at justo. Fusce sit amet leo vitae neque pharetra lobortis sit amet nec urna. Praesent rutrum odio ac aliquam pellentesque. Phasellus quis convallis mauris. Donec accumsan urna consectetur purus cursus, id viverra ante blandit. In eget lorem ac eros vestibulum rutrum. Curabitur elementum arcu porttitor, placerat neque a, congue elit. Morbi tincidunt diam ut neque pharetra interdum.

                Integer accumsan, lectus et iaculis eleifend, augue ligula vulputate nulla, eu laoreet tortor tortor sed nunc. Quisque finibus leo non libero pharetra condimentum. Pellentesque porttitor dolor ac accumsan scelerisque. Donec eget eleifend ante, ac scelerisque lectus. Suspendisse potenti. Nulla sollicitudin eu justo nec elementum. Sed vel faucibus nulla. Etiam sed purus id neque semper sagittis id eu libero. Quisque in libero pellentesque, placerat magna at, commodo nulla. Praesent consectetur massa ut scelerisque efficitur. Praesent eros elit, gravida eget lacinia a, mattis vitae eros. Morbi at efficitur massa. Cras laoreet varius purus.
                </p>
            </div>
        </div>
    </div>

    @include('partial.welcome-modal')
@endsection

@push('scripts')
    <script src="/js/app.js"></script>
@endpush