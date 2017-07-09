<?php

namespace App\Http\Controllers;

use App\Models\Devices;
use App\Models\Rules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use DB;
use Session;
use Response;

class DeviceController extends Controller
{
    public function index( Request $request ) {
        return view('index');
    }

    public function denied ( Request $request ) {
        $data = [];
        if ( Session::has('message') ) {
            $data['message'] = Session::get('message');
        }
        return view('denied', $data);
    }

    public function exampleIndex( Request $request ) {
        return view('example-index');
    }

    public function store( Request $request ) {
        $data = $this->sortInput($request->input());
        $wfp = md5(json_encode($data));

        if ( Devices::where('wfp', $wfp)->count() == 0 ) {
            $device = new Devices();
            $device->setRawAttributes($data);
            $device->wfp = $wfp;

            $device->save();
        }
        return $this->success(['wfp' => $wfp]);
    }

    public function exampleStore ( Request $request ) {
        $data = $this->sortInput($request->input());
        $wfp = md5(json_encode($data));
        return $this->success(['wfp' => $wfp]);
    }

    private function sortInput( $data ) {
        $dataSorted = $data;
        if ( isset($dataSorted['webgl']) && is_array($dataSorted['webgl']) ) {
            ksort($dataSorted['webgl']);
        }
        ksort($dataSorted);
        return $dataSorted;
    }

    private function success ( $data = null ) {
        $dataResponse = ['success' => true];
        if ( $data ) {
            $dataResponse['data'] = $data;
        }
        return Response::json($dataResponse, 200);
    }








    public function deleteAll() {
        foreach (Devices::all() as $item) {
            $item->delete();
        }

        foreach (Rules::all() as $item) {
            $item->delete();
        }
        return 'DB is Clean!';
    }

    public function test( Request $request ){

        dd(Rules::first()->_id);
    }

}