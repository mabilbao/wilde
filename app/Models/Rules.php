<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Rules extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'rules';

}