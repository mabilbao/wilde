@extends('layout')


@section('content')
    <div class="container page-rule">
        <div class="page-rule__title">
            <img src="wicon2.png">
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

        <h3>Crear Reglas</h3>

        <form class="form-rules" method="post" action="/rules">
            <div class="form-group">
                <label for="key">Clave</label>
                <select name="key" class="form-control" id="key" placeholder="Clave">
                    @foreach( $keys as $key => $value )
                        <option value="{{$key}}">{{$value}}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label for="value">Valor</label>
                <input name="value" class="form-control" id="value" placeholder="Valor">
            </div>
            <div class="form-group">
                <label for="value">o Seleccione uno:</label>
                <select class="form-control" id="chosen" placeholder="Valor"></select>
            </div>
            <div class="form-group">
                <label for="value">Regla</label>
                <select name="rule" class="form-control" id="rule" placeholder="Regla">
                    @foreach( $actions as $key => $value )
                        <option value="{{$key}}">{{$value}}</option>
                    @endforeach
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Crear!</button>
        </form>

        <h3>Reglas Creadas</h3>

        <div class="table-responsive" style="margin: 50px 0">
            <table class="table">
                <thead>
                    <tr>
                        <th>Clave</th>
                        <th>Valor</th>
                        <th>Regla</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach( $rules as $rule )
                        <tr>
                            <td>{{$rule->key}}</td>
                            <td>{{$rule->value}}</td>
                            <td>{{$rule->rule}}</td>
                            <td>
                                <form action="/rules/{{$rule->_id}}/delete" method="post">
                                    <button type="submit" class="btn btn-danger">Borrar</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="/js/app.js"></script>
@endpush