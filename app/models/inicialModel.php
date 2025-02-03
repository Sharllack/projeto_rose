<?php

namespace Name\Models;

use Name\Models\Config\Conexao;
use PDO;

class inicialModel
{
    private $con;

    public function __construct()
    {
        $this->con = Conexao::getConexao();
    }

    // Funções para entregas
    public function cadastrarEntrega($data)
    {
        if (
            !empty($data['id']) &&
            !empty($data['data']) &&
            $data['total'] >= 0 &&
            $data['fc'] >= 0 &&
            $data['caixa'] >= 0 &&
            $data['carta'] >= 0 &&
            $data['devolucao'] >= 0
        ) {
            $cmd = $this->con->prepare('
                INSERT INTO entregas (id_funcionario, data_entrega, fc, carta, caixa, quantidade_entregas, quantidade_devolucoes)
                VALUES (:id_funcionario, :data_entrega, :fc, :carta, :caixa, :entrega, :devolucao)
            ');

            $cmd->execute([
                ':id_funcionario' => $data['id'],
                ':data_entrega' => $data['data'],
                ':fc' => $data['fc'],
                ':caixa' => $data['caixa'],
                ':carta' => $data['carta'],
                ':entrega' => $data['total'],
                ':devolucao' => $data['devolucao']
            ]);

            return json_encode(['status' => 'success', 'message' => 'Entrega cadastrada com sucesso.']);
        } else {
            return json_encode(['status' => 'error', 'message' => 'Por favor, preencha todos os campos obrigatórios.']);
        }
    }

    public function getEntregasPeriodo($data)
    {
        $pagina = isset($data['pag']) && is_numeric($data['pag']) ? (int)$data['pag'] : 1;
        $limite = 9;
        $inicio = max(($pagina * $limite) - $limite, 0);

        $cmd = $this->con->prepare("
        SELECT entregas.*, funcionarios.*, entregas.id AS id_entregas 
        FROM entregas 
        JOIN funcionarios ON entregas.id_funcionario = funcionarios.id
        WHERE data_entrega BETWEEN :dataInicio AND :dataFim
        ORDER BY entregas.data_entrega
        LIMIT :inicio, :limite
    ");

        $cmd->bindValue(':dataInicio', $data['dataInicio']);
        $cmd->bindValue(':dataFim', $data['dataFim']);
        $cmd->bindValue(':inicio', $inicio, PDO::PARAM_INT);
        $cmd->bindValue(':limite', $limite, PDO::PARAM_INT);

        $cmd->execute();

        return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getFinanceiroTotal($data)
    {
        $cmd = $this->con->prepare('
            SELECT 
                funcionarios.id,
                funcionarios.nome,
                funcionarios.veiculo,
                funcionarios.salario_base,
                SUM(entregas.quantidade_entregas) AS total_entregas,
                SUM(entregas.fc) AS total_fc,
                SUM(entregas.carta) AS total_carta,
                SUM(entregas.caixa) AS total_caixa,
                SUM(entregas.quantidade_devolucoes) AS total_devolucao,
                SUM(
                    CASE WHEN funcionarios.veiculo = "Moto" THEN entregas.fc * 1 ELSE 0 END +
                    CASE WHEN funcionarios.veiculo = "Moto" THEN entregas.carta * 1.7 ELSE 0 END +
                    CASE WHEN funcionarios.veiculo = "Moto" THEN entregas.caixa * 2.3 ELSE 0 END +
                    CASE WHEN funcionarios.veiculo = "Carro" THEN entregas.fc * 1 ELSE 0 END +
                    CASE WHEN funcionarios.veiculo = "Carro" THEN entregas.carta * 1 ELSE 0 END +
                    CASE WHEN funcionarios.veiculo = "Carro" THEN entregas.caixa * 2 ELSE 0 END +
                    CASE WHEN funcionarios.veiculo = "Bicicleta" THEN entregas.fc * 1 ELSE 0 END +
                    CASE WHEN funcionarios.veiculo = "Bicicleta" THEN entregas.carta * 1 ELSE 0 END +
                    CASE WHEN funcionarios.veiculo = "Bicicleta" THEN entregas.caixa * 2 ELSE 0 END
                ) AS total_recebido
            FROM entregas
            JOIN funcionarios ON entregas.id_funcionario = funcionarios.id
            WHERE data_entrega BETWEEN :dataInicio AND :dataFim
            GROUP BY funcionarios.id
            ORDER BY total_entregas DESC;
        ');

        $cmd->execute([
            ':dataInicio' => $data['dataInicio'],
            ':dataFim' => $data['dataFim']
        ]);

        return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getEntregasGerais($data)
    {
        $cmd = $this->con->prepare("
            SELECT funcionarios.nome, funcionarios.id,
            SUM(entregas.quantidade_entregas) AS total_entregas
            FROM entregas
            JOIN funcionarios ON entregas.id_funcionario = funcionarios.id
            WHERE data_entrega BETWEEN :dataInicio AND :dataFim
            GROUP BY funcionarios.id
            ORDER BY total_entregas DESC;
        ");

        $cmd->execute([
            ':dataInicio' => $data['dataInicio'],
            ':dataFim' => $data['dataFim']
        ]);

        return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getEntregasIndividuais($data)
    {
        $cmd = $this->con->prepare("
            SELECT funcionarios.nome, funcionarios.id,
            entregas.*
            FROM entregas
            JOIN funcionarios ON entregas.id_funcionario = funcionarios.id
            WHERE data_entrega BETWEEN :dataInicio AND :dataFim
            GROUP BY entregas.id
        ");

        $cmd->execute([
            ':dataInicio' => $data['dataInicio'],
            ':dataFim' => $data['dataFim']
        ]);

        return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getDadosEditar($id)
    {
        $cmd = $this->con->prepare("
            SELECT *
            FROM entregas
            JOIN funcionarios ON entregas.id_funcionario = funcionarios.id
            WHERE entregas.id = :id
        ");

        $cmd->execute([
            ":id" => $id
        ]);

        return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }

    public function editarEntrega($data)
    {
        if (
            !empty($data['id_entrega']) &&
            !empty($data['data']) &&
            $data['fc'] >= 0 &&
            $data['carta'] >= 0 &&
            $data['caixa'] >= 0 &&
            $data['total'] >= 0 &&
            $data['devolucao'] >= 0
        ) {
            $cmd = $this->con->prepare("
                UPDATE entregas 
                SET id = :id_entrega, id_funcionario = :id_funcionario, data_entrega = :data, fc = :fc, carta = :carta, caixa = :caixa, quantidade_entregas = :entregas, quantidade_devolucoes = :devolucoes
                WHERE id = :id_entrega
            ");

            $cmd->execute([
                ':id_entrega' => $data['id_entrega'],
                ':id_funcionario' => $data['id_funcionario'],
                ':data' => $data['data'],
                ':fc' => $data['fc'],
                ':carta' => $data['carta'],
                ':caixa' => $data['caixa'],
                ':entregas' => $data['total'],
                ':devolucoes' => $data['devolucao']
            ]);

            if ($cmd->rowCount() > 0) {
                return json_encode(['status' => 'success', 'message' => 'Entrega editada com sucesso.']);
            } else {
                return json_encode(['status' => 'noChange', 'message' => 'Nenhuma alteração foi feita.']);
            }
        } else {
            return json_encode(['status' => 'error', 'message' => 'Por favor, preencha todos os campos obrigatórios.']);
        }
    }

    // Funções para funcionários
    public function cadastrarFuncionario($data)
    {
        if (
            !empty($data['nome']) &&
            !empty($data['cpf']) &&
            !empty($data['nascimento']) &&
            !empty($data['celular']) &&
            !empty($data['salario']) &&
            !empty($data['veiculos'])
        ) {
            // Verificar duplicidade no banco de dados
            $cmdCheck = $this->con->prepare('
                SELECT * 
                FROM funcionarios
                WHERE ativo = "sim" AND (cpf = :cpf OR celular = :celular)
            ');
            $cmdCheck->execute([
                ':cpf' => $data['cpf'],
                ':celular' => $data['celular']
            ]);

            $existingUser = $cmdCheck->fetch(PDO::FETCH_ASSOC);

            if ($existingUser) {
                if ($existingUser['cpf'] === $data['cpf']) {
                    return json_encode(['status' => 'errorCpf', 'message' => 'CPF já cadastrado.']);
                }
                if ($existingUser['celular'] === $data['celular']) {
                    return json_encode(['status' => 'errorCelular', 'message' => 'Celular já cadastrado.']);
                }
            }

            // Inserir novo usuário
            $cmd = $this->con->prepare('
                INSERT INTO funcionarios (nome, cpf, data_nascimento, veiculo, salario_base, celular) 
                VALUES (:nome, :cpf, :data_nascimento, :veiculo, :salario_base, :celular)
            ');

            $cmd->execute([
                ':nome' => $data['nome'],
                ':cpf' => $data['cpf'],
                ':data_nascimento' => $data['nascimento'],
                ':veiculo' => $data['veiculos'],
                ':salario_base' => $data['salario'],
                ':celular' => $data['celular']
            ]);

            // Retorno de sucesso
            return json_encode(['status' => 'success', 'message' => 'Usuário cadastrado com sucesso.']);
        } else {
            // Caso falte algum campo obrigatósrio
            return json_encode(['status' => 'error', 'message' => 'Por favor, preencha todos os campos obrigatórios.']);
        }
    }

    public function getFuncionarios($pag)
    {
        $pagina = $pag;

        $limite = 36;

        $inicio = ($pagina * $limite) - $limite;

        $cmd = $this->con->prepare("
            SELECT * 
            FROM funcionarios 
            WHERE ativo = 'sim'
            LIMIT $inicio, $limite
        ");

        $cmd->execute();

        return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }

    public function excluirFuncionario($id)
    {
        $cmd = $this->con->prepare('
            UPDATE funcionarios 
            SET ativo = "nao" 
            WHERE id = :id
        ');

        $cmd->execute([':id' => $id]);

        return json_encode(['status' => 'success', 'message' => 'Usuário excluído com sucesso.']);
    }

    public function editarFuncionario($id)
    {
        $cmd = $this->con->prepare('
            SELECT * 
            FROM funcionarios 
            WHERE id = :id
        ');

        $cmd->execute([':id' => $id]);

        return $cmd->fetch(PDO::FETCH_ASSOC);
    }

    public function atualizarFuncionario($data)
    {
        if (
            !empty($data['nome']) &&
            !empty($data['cpf']) &&
            !empty($data['nascimento']) &&
            !empty($data['celular']) &&
            !empty($data['salario']) &&
            !empty($data['veiculos'])
        ) {
            // Atualizar os dados do funcionário
            $cmd = $this->con->prepare('
            UPDATE funcionarios 
            SET nome = :nome, cpf = :cpf, data_nascimento = :data_nascimento, veiculo = :veiculo, salario_base = :salario_base, celular = :celular 
            WHERE id = :id
        ');
            $cmd->execute([
                ':nome' => $data['nome'],
                ':cpf' => $data['cpf'],
                ':data_nascimento' => $data['nascimento'],
                ':veiculo' => $data['veiculos'],
                ':salario_base' => $data['salario'],
                ':celular' => $data['celular'],
                ':id' => $data['id']
            ]);

            // Verifica se alguma linha foi alterada
            if ($cmd->rowCount() > 0) {
                return json_encode(['status' => 'success', 'message' => 'Usuário atualizado com sucesso.']);
            } else {
                return json_encode(['status' => 'noChange', 'message' => 'Nenhuma alteração foi feita.']);
            }
        } else {
            return json_encode(['status' => 'error', 'message' => 'Por favor, preencha todos os campos obrigatórios.']);
        }
    }

    public function getFuncionariosCadastrados()
    {
        $cmd = $this->con->prepare('
            SELECT * 
            FROM funcionarios 
            WHERE ativo = "sim"
        ');

        $cmd->execute();

        return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }
}
