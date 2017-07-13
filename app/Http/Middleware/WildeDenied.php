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
        $me = $request->attributes->get('me');

        if ( isset($me->isDenied) && $me->isDenied ) {
            return redirect('denied');
        }

        return $next($request);
    }
}
