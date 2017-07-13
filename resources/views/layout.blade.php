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
    @include('partial.nav')
    @include('partial.loader')
    @include('partial.data-headers')

    <div class="container-content">
        @yield('content')
    </div>

    <script>
//        console.log('hola');
//      new Fingerprint2().get(function(result, components){
//        console.log(result); //a hash, representing your device fingerprint
//        console.log(components); // an array of FP components
//      });
    </script>
    @stack('scripts')
</body>
</html>
