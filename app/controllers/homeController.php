<?php

namespace Name\Controllers;

use Name\Core\Controller;
use Name\Models\homeModel;

class homeController extends Controller
{
    public function index()
    {
        $this->carregarTemplate("home");
    }

    public function login()
    {
        $homeModels = new homeModel();
        $resposta = $homeModels->login($_POST);

        echo $resposta;
    }
}
