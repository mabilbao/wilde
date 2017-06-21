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

Route::post('/create', 'DeviceController@store');
Route::get('/rules', 'RuleController@index');
Route::post('/rules', 'RuleController@store');

//Route::get('/test', 'DeviceController@test');
Route::get('/delete-all', 'DeviceController@deleteAll');
Route::get('/example', 'DeviceController@exampleIndex');
Route::post('/example/create', 'DeviceController@exampleStore');


Route::get('/', 'DeviceController@index');
