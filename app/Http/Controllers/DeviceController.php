<?php

namespace App\Http\Controllers;

use App\Models\Devices;
use App\Models\Rules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use DB;
use Response;

class DeviceController
{
    public function index( Request $request ) {
        $data['headers'] = $request->headers->all();
        return view('index', $data);
    }

    public function exampleIndex( Request $request ) {
        $data['headers'] = $request->headers->all();
        return view('example-index', $data);
    }

    public function store( Request $request ) {
        $id = md5(json_encode($request->input()));

        $device = new Devices();
        $device->id = $id;
        $device->setRawAttributes($request->input());

//        $device->save();
        return $this->success(['id' => $id]);
    }

    public function exampleStore ( Request $request ) {
        $id = md5(json_encode($request->input()));
        return $this->success(['id' => $id]);
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

        $input = [
            'hola' => 'chau',
            'webgl' => [
                'lineas' => 12345,
                'curvas' => 67890
            ]
        ];
        $device = new Devices();
        $device->setRawAttributes($input);

//        $device->id = 'abc123';
//        foreach ($request->input() as $key => $value) {
//            $device->{$key} = $value;
//        }

        $device->save();

        dd(Devices::all()->toArray());
    }

}