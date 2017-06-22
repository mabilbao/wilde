@extends('layout')


@section('content')

    <div style="text-align: center">
        <a href="/">
            <img src="wicon2.png" width="150">
        </a>
        <h1>Demostracion</h1>
    </div>

    <div id="general">
        <h3>Informacion General</h3>
        <div id="general"></div>
    </div>
    <div class="results">
        <h3>Informacion WebGL</h3>
        <div class="row"></div>
    </div>

@endsection

@push('scripts')
    <script src="/js/app-test.js"></script>
@endpush