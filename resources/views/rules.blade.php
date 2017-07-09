@extends('layout')


@section('content')
    <div class="container">
        <h1>Reglas</h1>

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