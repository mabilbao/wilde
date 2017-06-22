<?php

namespace App\Http\Controllers;

use App\Models\Devices;
use App\Models\Rules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use DB;
use Session;
use Response;

class DeviceController
{
    public function index( Request $request ) {
        $data['headers'] = $request->headers->all();
        return view('index', $data);
    }

    public function denied ( Request $request ) {
        $data['headers'] = $request->headers->all();
        if ( Session::has('message') ) {
            $data['message'] = Session::get('message');
        }
        return view('denied', $data);
    }

    public function exampleIndex( Request $request ) {
        $data['headers'] = $request->headers->all();
        return view('example-index', $data);
    }

    public function store( Request $request ) {
        $data = $this->sortInput($request->input());
        $id = md5(json_encode($data));

        if ( Devices::where('id', $id)->count() == 0 ) {
            $device = new Devices();
            $device->setRawAttributes($data);
            $device->id = $id;

            $device->save();
        }
        return $this->success(['id' => $id]);
    }

    public function exampleStore ( Request $request ) {
        $data = $this->sortInput($request->input());
        $id = md5(json_encode($data));
//        dd($id, $data);
        return $this->success(['id' => $id]);
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