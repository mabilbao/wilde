<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('denied', 'DeviceController@denied');
Route::post('/create', 'DeviceController@store');

//Route::get('/test', 'DeviceController@test');
Route::get('/example', 'DeviceController@exampleIndex');
Route::post('/example/create', 'DeviceController@exampleStore');


Route::group(['middleware' =>  'wilde.denied'], function () {
    Route::group(['middleware' => 'wilde.admin'], function () {
        Route::get('/rules', 'RuleController@index');
        Route::post('/rules', 'RuleController@store');
        Route::post('/rules/{id}/delete', 'RuleController@delete');

        Route::get('/delete-all', 'DeviceController@deleteAll');
    });

    Route::get('/', 'DeviceController@index');
});