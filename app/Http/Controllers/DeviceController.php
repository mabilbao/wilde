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
        $data = $this->sortInput($request->except(['me', 'phase', 'isAdmin', 'isPromo', 'isDenied']));
        $wfp = md5(json_encode($data));

        if ( $this->me && $this->me->wfp ) {
            if ( $this->me->wfp != $wfp ) {

                // Wilde need to update all the browser-device
                $old_wfp = $this->me->wfp;

                // save old information as wfphistory
                if ( !$this->me->wfphistory ) {
                    $this->me->wfphistory = [];
                }
                $old_wfpdata = array_merge($this->me->wfpdata, ['changed_at' => (new \DateTime())->format('Y-m-d H:i:s')]);
                $this->me->wfphistory = array_merge($this->me->wfphistory, [$old_wfp => $old_wfpdata]);

                // device
                $this->me->wfpdata = $data;
                $this->me->wfp = $wfp;

                if( isset($this->me->isAdmin) ) unset($this->me->isAdmin);
                if( isset($this->me->isPromo) ) unset($this->me->isPromo);
                if( isset($this->me->isDenied) ) unset($this->me->isDenied);
                $this->me->save();

                // rules
                Rules::where('value', $old_wfp)->update([
                   'value' => $this->me->wfp
                ]);
            }
            return $this->success(['wfp' => $this->me->wfp, 'new' => false]);

        } else {
            $new = false;
            $device = Devices::where('wfp', $wfp)->first();

            if ( !$device ) {
                $new = true;
                $device = new Devices();
                $device->setRawAttributes(['wfpdata' => $data]);

                $device->wfp = $wfp;
                $device->phase = 1;

                $device->save();
            }
            return $this->success(['wfp' => $device->wfp, 'new' => $new]);
        }
    }

    public function exampleStore ( Request $request ) {
        $data = $this->sortInput($request->input());
        $wfp = md5(json_encode($data));
        return $this->success(['wfp' => $wfp]);
    }


    public function addData( Request $request ) {
        if ( !$this->me->extra ) {
            $this->me->extra = [];
        }
        $this->me->extra = array_merge($this->me->extra, $request->except(['me', 'phase', 'isAdmin', 'isPromo', 'isDenied']));
        if ( $phase = $request->input('phase', false) ) {
            $this->me->phase = $phase;
        }
        if( isset($this->me->isAdmin) ) unset($this->me->isAdmin);
        if( isset($this->me->isPromo) ) unset($this->me->isPromo);
        if( isset($this->me->isDenied) ) unset($this->me->isDenied);

        $this->me->save();

        return $this->success($request->input());
    }


    private function sortInput( $data ) {
        $dataSorted = $data;
        if ( isset($dataSorted['webgl']) && is_array($dataSorted['webgl']) ) {
            ksort($dataSorted['webgl']);
        }
        ksort($dataSorted);
        return $dataSorted;
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