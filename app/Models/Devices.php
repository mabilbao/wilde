<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Devices extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'devices';

}