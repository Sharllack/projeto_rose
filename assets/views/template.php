<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/template.css">
    <title></title>
</head>

<body>
    <header>
        <img src="assets/image/flash_logo.png" alt="Logo da Flash" height="50px" width="150px">
    </header>

    <main id="paginas">
        <?php
        $this->carregarView($nomeView, $dadosModel);
        ?>
    </main>
</body>

</html>