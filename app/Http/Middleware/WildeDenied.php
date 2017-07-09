<?php

namespace App\Http\Middleware;

use App\Models\Rules;
use Closure;
use Illuminate\Support\Facades\Auth;

class WildeDenied
{
    public function handle($request, Closure $next, $guard = null) {

        if ( !isset($_COOKIE['wilde-fp']) ) {
            return $next($request);
        }

        $wfp = $_COOKIE['wilde-fp'];
        $rules = Rules::whereRule('denied')->get();
        foreach ($rules as $rule) {
            if ( $rule->value == $wfp ) {
                return redirect('denied');
            }
        }

        return $next($request);
    }
}
