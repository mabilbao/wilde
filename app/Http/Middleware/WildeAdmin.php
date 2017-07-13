<?php

namespace App\Http\Middleware;

use App\Models\Rules;
use Closure;
use Session;
use Illuminate\Support\Facades\Auth;

class WildeAdmin
{
    public function handle($request, Closure $next, $guard = null) {

        if ( !isset($_COOKIE['wilde-fp']) ) {
            return redirect('/denied');
        }

        $me = $request->attributes->get('me');

        if ( isset($me->isAdmin) && $me->isAdmin ) {
            return $next($request);
        }

        Session::flash('message', 'Usted no esta autorizado para ingresar a esta seccion.');
        return redirect('denied');
    }
}
