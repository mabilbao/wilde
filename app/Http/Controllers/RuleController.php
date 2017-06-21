<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rules;

class RuleController extends Controller
{
    public function index( Request $request) {
        $data['headers'] = $request->headers->all();
        $data['rules'] = Rules::all();
        return view ('rules', $data);
    }

    public function store( Request $request) {

//        $this->validate([
//            'key' => 'required',
//            'value' => 'required'
//         ]);

        $rule = new Rules();
        $rule->key = $request->input('key');
        $rule->value = $request->input('value');
        $rule->save();

        return redirect('/rules');
    }
}