<div class="status-nav">
    <div class="col-lg-3">
        <p>Status: <span class="status"></span></p>
    </div>
    <div class="col-lg-3">
        <p>Hash: <span class="hash"></span></p>
    </div>
    <div class="col-lg-3">
        <p>Fase: <span class="phase"></span></p>
    </div>
    <div class="col-lg-3">
        <p>Current Action: <span class="action"></span></p>
    </div>
</div>

<div class="nav">
    <div class="col-md-3">
        <div class="logo">
            <a href="/">
                <img src="wicon.png">
            </a>
        </div>
    </div>
    <div class="col-md-6">
        <a href="/" class="nav__title">
            <div>
                <span>Home</span>
            </div>
        </a>
        <a href="/example" class="nav__title">
            <div>
                <span>View FingerPrint</span>
            </div>
        </a>
        @if ( $me && isset($me->isAdmin) && $me->isAdmin )
            <a href="/rules" class="nav__title">
                <div>
                    <span>Rules</span>
                </div>
            </a>
        @endif
    </div>
    <div class="col-md-3 welcome">
        @if ( $me && isset($me->extra['name']) )
            <p>Bienvenido de nuevo {{$me->extra['name']}}</p>
        @endif
    </div>
</div>
