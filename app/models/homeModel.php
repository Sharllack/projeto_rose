<?php

namespace Name\Models;

use Name\Models\Config\Conexao;
use PDO;

class homeModel
{
    private $con;

    public function __construct()
    {
        $this->con = Conexao::getConexao();
    }

    public function login($data)
    {
        if (
            !empty($data['login']) &&
            !empty($data['senha'])
        ) {
            $cmd = $this->con->prepare("
                SELECT *
                FROM host
                WHERE user = :user
                LIMIT 1
            ");

            $cmd->execute([
                ':user' => $data['login']
            ]);

            $usuario = $cmd->fetch(PDO::FETCH_ASSOC);

            if (!$usuario) {
                return json_encode(['status' => 'errorUser', 'message' => 'Usuário não encontrado.']);
            }

            if (password_verify($data['senha'], $usuario['pass'])) {
                $_SESSION['user'] = $usuario['user'];
                $_SESSION['id_user'] = $usuario['id'];
                return json_encode(['status' => 'success']);
            } else {
                return json_encode(['status' => 'errorPass', 'message' => 'Senha incorreta.']);
            }
        } else {
            return json_encode(['status' => 'error', 'message' => 'Por favor, preencha todos os campos obrigatórios.']);
        }
    }
}
