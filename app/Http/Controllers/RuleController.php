<?php
namespace App\Http\Controllers;

use App\Models\Devices;
use Illuminate\Http\Request;
use App\Models\Rules;

class RuleController extends Controller
{
    private $actions = [
        'admin' => 'Admin',
        'denied' => 'Denegar',
        'promo' => 'Promocion',
    ];

    private $keys = [
        'wfp' => 'Wilde fingerprint',
        'local_storage' => 'Local Storage',
        'session_storage' => 'Session Storage'
    ];

    public function index( Request $request) {
        $data['rules'] = Rules::all();
        $data['actions'] = $this->actions;
        $data['keys'] = $this->keys;

        return view ('rules', $data);
    }

    public function store( Request $request) {

        $this->validate($request, [
            'key' => 'required',
            'value' => 'required',
            'rule' => 'required'
         ]);

        $rule = new Rules();
        $rule->key = $request->input('key');
        $rule->value = $request->input('value');
        $rule->rule = $request->input('rule');
        $rule->save();

        return redirect('/rules');
    }

    public function delete( Request $request, $id ) {
        Rules::where('_id', $id)->delete();
        return redirect('/rules');
    }

    public function getValues( $key ) {
        if ( !isset($this->keys[$key]) ) {
            return $this->error(['The key does \'t exists.']);
        }
        switch ( $key ) {
            case 'wfp':
                $response = [];
                $devices = Devices::groupBy('wfp')->select('wfp')->get();
                foreach ($devices as $device) {
                    $response[$device->wfp] = $device->wfp;
                }
                return $this->success($response);
                break;
            case 'local_storage':
            case 'session_storage':
                return $this->success([
                    '1' => 'Si',
                    '0' => 'No',
                ]);
                break;
            default:
                return $this->success();
        }
    }
}