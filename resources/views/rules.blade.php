@extends('layout')


@section('content')
    <div style="text-align: center">
        <a href="/">
            <img src="wicon2.png" width="150">
        </a>
        <h1>Reglas</h1>
    </div>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div style="margin: 50px 0 0 0; text-align: center">
        {{--<h2>Crear Regla</h2>--}}
        <form class="form-inline" method="post" action="/rules">
            <div class="form-group">
                <label class="sr-only" for="key">Clave</label>
                <input type="text" name="key" class="form-control" id="key" placeholder="Clave">
            </div>
            <div class="form-group">
                <label class="sr-only" for="value">Valor</label>
                <input type="text" name="value" class="form-control" id="value" placeholder="Valor">
            </div>
            <div class="form-group">
                <label class="sr-only" for="value">Regla</label>
                <select name="rule" class="form-control" id="rule" placeholder="Regla">
                    <option value="admin" selected>Admin</option>
                    <option value="denied">Denegar</option>
                    <option value="offer">Oferta</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Crear!</button>
        </form>
    </div>

    <div style="margin: 50px 0; text-align: center">
        @if ( !$rules->isEmpty() )
            <div class="row">
                <div class="col-lg-3">
                    <h2>Clave</h2>
                </div>
                <div class="col-lg-3">
                    <h2>Valor</h2>
                </div>
                <div class="col-lg-3">
                    <h2>Regla</h2>
                </div>
                <div class="col-lg-3">
                    <h2>Acciones</h2>
                </div>
            </div>
            @foreach( $rules as $rule )
                <div class="row">
                    <div class="col-lg-3">
                        <p>{{$rule->key}}</p>
                    </div>
                    <div class="col-lg-3">
                        <p>{{$rule->value}}</p>
                    </div>
                    <div class="col-lg-3">
                        <p>{{$rule->rule}}</p>
                    </div>
                    <div class="col-lg-3">
                        <form action="/rules/{{$rule->_id}}/delete" method="post">
                            <button type="submit" class="btn btn-danger">Borrar</button>
                        </form>
                    </div>
                </div>
            @endforeach
        @endif
    </div>
@endsection

@push('scripts')
    <script src="/js/app.js"></script>
@endpush