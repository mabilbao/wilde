<?php

namespace App\Http\Middleware;

use App\Models\Devices;
use App\Models\Rules;
use Closure;
use Illuminate\Support\Str;
use Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class WildeInit
{
    public function handle( Request $request, Closure $next, $guard = null) {

        if ( isset($_COOKIE['wilde-fp']) ) {
            $wfp = $_COOKIE['wilde-fp'];
            $me = Devices::where('wfp', $wfp)->first();

            $rules = Rules::all();
            foreach ($rules as $rule) {
                switch ( $rule->key ) {
                    case 'wfp':
                        if ( $rule->value == $wfp ) {
                            $prop = Str::camel('is '.$rule->rule);
                            $me->{$prop} = true;
                        }
                        break;
                    case 'browser':
                    case 'os':
                        if ( $rule->value == $me->extra[$rule->key] ) {
                            $prop = Str::camel('is '.$rule->rule);
                            $me->{$prop} = true;
                        }
                        break;
                }
            }
            $request->attributes->add(['me' => $me]);
        } else {
            $request->offsetSet('me', null);
        }
        return $next($request);
    }
}
