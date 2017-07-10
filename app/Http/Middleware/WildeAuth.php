<?php

namespace App\Http\Middleware;

use App\Models\Devices;
use App\Models\Rules;
use Closure;
use Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class WildeAuth
{
    public function handle( Request $request, Closure $next, $guard = null) {

        if ( $request->get('me') ) {
            return $next($request);
        }

        return redirect('denied');
    }
}
