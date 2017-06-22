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

        $id = $_COOKIE['wilde-fp'];
        $rules = Rules::whereRule('admin')->get();
        foreach ($rules as $rule) {
            if ( $rule->value == $id ) {
                return $next($request);
            }
        }
        Session::flash('message', 'Usted no esta autorizado para ingresar a esta seccion.');
        return redirect('denied');
    }
}
