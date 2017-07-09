@extends('layout')


@section('content')
    <div class="container">
        <div style="text-align: center">
            <a href="/">
                <img src="wicon2.png" width="150">
            </a>
            <h1>{{isset($message) ? $message : 'Acceso Denegado'}}</h1>

            <div style="margin-top: 50px">
                <img src="/triste.jpg" width="200">
            </div>

        </div>
    </div>

@endsection

@push('scripts')
    <script src="/js/app.js"></script>
@endpush