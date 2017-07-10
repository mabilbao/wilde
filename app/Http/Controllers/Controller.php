<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use View;
use Response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $me;

    public function __construct(Request $request) {
        $this->middleware(function ($request, $next) {
            $this->me = $request->attributes->get('me');
            View::share('me', $this->me);
            View::share('headers', $request->headers->all());
            return $next($request);
        });
    }

    protected function success ( $data = null ) {
        $dataResponse = ['success' => true];
        if ( $data ) {
            $dataResponse['data'] = $data;
        }
        return Response::json($dataResponse, 200);
    }

    protected function error ( $data = null ) {
        $dataResponse = ['success' => false];
        if ( $data ) {
            $dataResponse['errors'] = $data;
        }
        return Response::json($dataResponse, 400);
    }
}
