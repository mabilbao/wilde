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


// Denied page
Route::get('denied', 'DeviceController@denied');

// Create Fingerprint
Route::post('/create', 'DeviceController@store');

// Example page
Route::get('/example', 'DeviceController@exampleIndex');
Route::post('/example/create', 'DeviceController@exampleStore');

Route::group(['middleware' =>  'wilde.denied'], function () {

    Route::group(['middleware' => 'wilde.auth'], function () {

        Route::post('/add-data', 'DeviceController@addData');

        Route::group(['middleware' => 'wilde.admin'], function () {
            Route::get('/rules', 'RuleController@index');
            Route::post('/rules', 'RuleController@store');
            Route::post('/rules/{id}/delete', 'RuleController@delete');
            Route::get('/rules/{key}/values', 'RuleController@getValues');

            Route::get('/delete-all', 'DeviceController@deleteAll');
        });
    });

    Route::get('/', 'DeviceController@index');
});