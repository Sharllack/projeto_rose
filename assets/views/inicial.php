<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/inicial.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <title>Document</title>
</head>

<body>
    <div id="logout">
        <p onclick="logout()">Logout</p>
    </div>
    <section id="options">
        <div id="entrega" class="opcoes">
            <p class="topicos" id="opcao_entrega">Entregas</p>
            <img src="assets/image/entregas.jpg" alt="Entregas">
        </div>

        <div id="financeiro" class="opcoes">
            <p class="topicos" id="opcao_financas">Financeiro</p>
            <img src="assets/image/financas.webp" alt="Financeiro">
        </div>

        <div id="funcionarios" class="opcoes">
            <p class="topicos" id="opcao_funcionario">Funcionários</p>
            <img src="assets/image/funcionarios.jpeg" alt="Funcionários">
        </div>

    </section>
    <section id="fundo_janelas">
        <div id="janela_cadastrar_entregas" style="display:none">
            <div id="topo_cadastrar_entregas">
                <img src="assets/image/back.png" id="fechar_janela_entrega" alt="Voltar janela">
                <h1>Cadastrar entrega</h1>
            </div>
            <select name="funcionarios" id="select_funcionarios_cadastrados">
            </select>
            <input type="date" name="data_entrega" id="data_entrega">
            <input type="number" min="0" name="total" id="total" placeholder="Total">
            <input type="number" min="0" name="fc" id="fc" placeholder="FC">
            <input type="number" min="0" name="caixa" id="caixa" placeholder="Caixa">
            <input type="number" min="0" name="devolucao" id="devolucao" placeholder="Devolução" oninput="calcular()">
            <input type="number" min="0" name="carta" id="carta" placeholder="Carta" readonly>
            <p id="resposta_entrega" style="text-align: center; border-radius: 10px;"></p>
            <button id="cadastrar_entrega">Cadastrar</button>
        </div>
        <div id="janela_editar_entregas" style="display:none">
            <div id="topo_editar_entregas">
                <img src="assets/image/back.png" id="fechar_janela_editar_entrega" alt="Voltar janela">
                <h1>Cadastrar entrega</h1>
            </div>
            <select name="funcionarios" id="select_funcionarios_cadastrados_editar">
            </select>
            <input type="date" name="data_entrega" id="data_entrega_editar">
            <input type="number" min="0" name="total" id="total_editar" placeholder="Total">
            <input type="number" min="0" name="fc" id="fc_editar" placeholder="FC">
            <input type="number" min="0" name="caixa" id="caixa_editar" placeholder="Caixa">
            <input type="number" min="0" name="devolucao" id="devolucao_editar" placeholder="Devolução"
                oninput="calcular_editar()">
            <input type="number" min="0" name="carta" id="carta_editar" placeholder="Carta" readonly>
            <p id="resposta_editar_entrega" style="text-align: center; border-radius: 10px;"></p>
            <input type="hidden" name="editar_entrega" id="editarEntregaEditada">
            <button id="editar_entrega" onclick="editarEntregaEditada()">Editar</button>
        </div>
        <div id="janela_financeiro" class="janelas">
            <div class="topo_janelas">
                <img src="assets/image/close.png" alt="Fechar janela" class="icons" id="fechar_janela_financeiro">
                <h1>Finanças</h1>
            </div>
            <div id="filtro">
                <div id="filtro_inicio">
                    <label for="dataInicio">Data Início:</label>
                    <input type="date" id="dataInicio" name="dataInicio" class="datas_filtro">
                </div>
                <div id="filtro_final">
                    <label for="dataFim">Data Fim:</label>
                    <input type="date" id="dataFim" name="dataFim" class="datas_filtro">
                </div>
                <button type="button" onclick="filtrarPorPeriodo()" id="btnFil">Filtrar</button>
            </div>
            <input type="search" name="pesquisar" id="pesquisar_financa" placeholder="Pesquisar funcionário">
            <h2 style="text-align: center; margin-top: 20px">Total diário</h2>
            <div id="financeiro_cadastrado">

            </div>
            <div class="paginacao">
                <button type="button" onclick="diminuirPagPeriodo()">Anterior</button>
                <input type="number" name="pag" class="pag" readonly value="1">
                <button type="button" onclick="aumentarPagPeriodo()">Próximo</button>
            </div>
            <h2 style="margin-top: 20px; text-align:center;">Total Período</h2>
            <div id="total_financeiro">

            </div>
            <div id="dashboard">
                <div id="grafico_geral">
                    <h2 style="margin-top: 20px; text-align: center;">Entregas gerais</h2>
                    <canvas id="entregas_gerais"></canvas>
                </div>
                <div class="graficos_individuais">
                    <h2 style="margin-top: 20x; text-align: center;">Entregas individuais</h2>
                    <div id="container_graficos">
                        <canvas id="entregas_individuais"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div id="janela_funcionario" class="janelas">
            <div class="topo_janelas">
                <img src="assets/image/close.png" alt="Fechar janela" class="icons" id="fechar_janela_funcionario">
                <h1>Funcionários</h1>
                <img src="assets/image/add.png" alt="Adicionar funcionário" class="icons"
                    id="janela_adicionar_funcionario">
            </div>
            <input type="search" name="pesquisar" id="pesquisar" placeholder="Pesquisar funcionário">
            <div id="funcionarios_cadastrados">

            </div>
            <div class="paginacao">
                <button type="button" onclick="diminuirPagFuncionarios()">Anterior</button>
                <input type="number" name="pag" class="pag" readonly value="1">
                <button type="button" onclick="aumentarPagFuncionarios()">Próximo</button>
            </div>
        </div>
        <div id="janela_cadastrar_funcionario">
            <div id="topo_cadastrar_funcionarios">
                <img src="assets/image/back.png" alt="Voltar janela" id="voltar_janela_cadastrar_funcionario">
                <h1>Cadastrar funcionário</h1>
            </div>
            <input type="text" name="nome" id="nome" placeholder="Nome">
            <input type="text" name="cpf" id="cpf" placeholder="CPF" oninput="verificarCPF()">
            <input type="date" name="nascimento" id="nascimento">
            <input type="text" name="celular" id="celular" placeholder="Celular">
            <select name="veiculos" id="veiculos">
                <option value="Moto">Moto</option>
                <option value="Bicicleta">Bicicleta</option>
                <option value="Carro">Carro</option>
            </select>
            <input type="text" name="salario" id="salario" placeholder="Salário base">
            <p id="resposta_funcionario" style="text-align: center; border-radius: 10px;"></p>
            <button id="cadastrar_funcionario">Cadastrar</button>
        </div>
        <div id="janela_editar_funcionario">
            <div id="topo_editar_funcionarios">
                <img src="assets/image/back.png" alt="Voltar janela" id="voltar_janela_editar_funcionario">
                <h1>Editar funcionário</h1>
            </div>
            <input type="text" name="nome" id="nome_editar" placeholder="Nome">
            <input type="text" name="cpf" id="cpf_editar" placeholder="CPF" oninput="verificarCPF2()">
            <input type="date" name="nascimento" id="nascimento_editar">
            <input type="text" name="celular" id="celular_editar" placeholder="Celular">
            <select name="veiculos" id="veiculos_editar">
                <option value="Moto">Moto</option>
                <option value="Bicicleta">Bicicleta</option>
                <option value="Carro">Carro</option>
            </select>
            <input type="text" name="salario" id="salario_editar" placeholder="Salário base">
            <p id="resposta_editar_funcionario" style="text-align: center; border-radius: 10px;"></p>
            <input type="hidden" name="id_editar" id="id_editar">
            <button id="editar_funcionario">Editar</button>
        </div>
    </section>

    <script src="assets/js/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.js"></script>
    <script src="assets/js/inicial.js"></script>
</body>

</html>