<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use View;
use Response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $request = \Request::instance();
        View::share('headers', $request->headers->all());
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
