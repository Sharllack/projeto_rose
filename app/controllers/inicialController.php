<?php

namespace Name\Controllers;

use Name\Core\Controller;
use Name\Models\Config\Conexao;
use Name\Models\inicialModel;

class inicialController extends Controller
{
    private $con;

    public function __construct()
    {
        $this->con = Conexao::getConexao();
    }

    public function index()
    {
        if (!isset($_SESSION['user'])) {
            $this->carregarView("notUser");
        } else {
            $this->carregarTemplate("inicial");
        }
    }

    public function logout()
    {
        session_destroy();
        echo json_encode(['status' => 'success', 'message' => 'Logout efetuado com sucesso.']);
    }

    // Funções para entregas
    public function cadastrarEntrega()
    {
        $inicialModels = new inicialModel();
        $resposta = $inicialModels->cadastrarEntrega($_POST);

        echo $resposta;
    }

    public function getEntregasPeriodo()
    {
        $inicialModels = new inicialModel();
        $dados = $inicialModels->getEntregasPeriodo($_POST);

        echo json_encode($dados);
    }

    public function getFinanceiroTotal()
    {
        $inicialModels = new inicialModel();
        $dados = $inicialModels->getFinanceiroTotal($_POST);

        echo json_encode($dados);
    }

    public function getEntregasGerais()
    {
        $inicialModels = new inicialModel();
        $dados = $inicialModels->getEntregasGerais($_POST);

        echo json_encode($dados);
    }

    public function getEntregasIndividuais()
    {
        $inicialModels = new inicialModel();
        $dados = $inicialModels->getEntregasIndividuais($_POST);

        echo json_encode($dados);
    }

    public function getDadosEditar($id)
    {
        $inicialModels = new inicialModel();
        $dados = $inicialModels->getDadosEditar($id);

        echo json_encode($dados);
    }

    public function editarEntrega()
    {
        $inicialModels = new inicialModel();
        $resposta = $inicialModels->editarEntrega($_POST);

        echo $resposta;
    }

    // Funções para funcionários
    public function getFuncionarios($pag)
    {
        $inicialModels = new inicialModel();
        $dados = $inicialModels->getFuncionarios($pag);

        echo json_encode($dados);
    }

    public function cadastrarFuncionario()
    {
        $inicialModels = new inicialModel();
        $resposta = $inicialModels->cadastrarFuncionario($_POST);

        echo $resposta;
    }

    public function excluirFuncionario($id)
    {
        $inicialModels = new inicialModel();
        $resposta = $inicialModels->excluirFuncionario($id);

        echo $resposta;
    }

    public function editarFuncionario($id)
    {
        $inicialModels = new inicialModel();
        $resposta = $inicialModels->editarFuncionario($id);

        echo json_encode($resposta);
    }

    public function atualizarFuncionario()
    {
        $inicialModels = new inicialModel();
        $resposta = $inicialModels->atualizarFuncionario($_POST);

        echo $resposta;
    }

    public function getFuncionariosCadastrados()
    {
        $inicialModels = new inicialModel();
        $dados = $inicialModels->getFuncionariosCadastrados();

        echo json_encode($dados);
    }
}
