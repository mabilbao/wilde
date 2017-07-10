<?php

namespace App\Http\Middleware;

use App\Models\Devices;
use App\Models\Rules;
use Closure;
use Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class WildeInit
{
    public function handle( Request $request, Closure $next, $guard = null) {

        if ( isset($_COOKIE['wilde-fp']) ) {
            $wfp = $_COOKIE['wilde-fp'];
            $me = Devices::where('wfp', $wfp)->first();

            $rules = Rules::whereRule('admin')->get();
            foreach ($rules as $rule) {
                if ( $rule->value == $wfp ) {
                    $prop = 'is'.ucwords(strtolower($rule->rule));
                    $me->{$prop} = true;
                }
            }
            $request->attributes->add(['me' => $me]);
        } else {
            $request->offsetSet('me', null);
        }
        return $next($request);
    }
}
