<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/home.css">
    <title>Document</title>
</head>

<body>
    <div id="log">
        <h1>Seja bem-vindo(a)</h1>
        <input type="text" name="login" id="login" class="inputs_principais" placeholder="Usuário">
        <input type="password" name="senha" id="senha" class="inputs_principais" placeholder="Senha">
        <p id="res_login"></p>
        <button onclick="login()">Entrar</button>
    </div>


    <script src="assets/js/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.js"></script>
    <script src="assets/js/home.js"></script>
</body>

</html>