<?php

namespace Name\Controllers;

use Name\Core\Controller;

class notUserController extends Controller
{
    public function index()
    {
        $this->carregarView("notUser");
    }
}
