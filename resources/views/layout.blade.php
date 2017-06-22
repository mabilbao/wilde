<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="favicon.png" />

    <title>Wilde</title>
    <!-- Styles -->
    <link href="/css/app.css" rel="stylesheet" type="text/css">
</head>
<body>
@include('status-nav')

<div class="container container-loader">
    <div class="loader"></div>
</div>

<div class="container container-content">
    @yield('content')
    <div id="dataheaders" data-headers='{{ isset($headers) ? json_encode($headers) : '' }}'></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.3.2/gl-matrix-min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/seedrandom/2.4.3/seedrandom.min.js"></script>
@stack('scripts')
</body>
</html>
