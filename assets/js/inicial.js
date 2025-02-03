// Logout
function logout() {
  $.ajax({
    url: "inicial/logout",
    type: "GET",
    dataType: "json",
    success: function (response) {
      if (response.status === "success") {
        window.location.href = "home";
      }
    },
    error: function (xhr, status, error) {
      console.log("Status: " + status); // Mostra o status do erro
      console.log("Erro: " + error); // Mostra a descrição do erro
      console.log("Resposta do servidor: " + xhr.responseText); // Exibe a resposta completa
    },
  });
}

// Administrar funcionários
$("#cpf").mask("000.000.000-00");
$("#celular").mask("(00) 00000-0000");
$("#cpf_editar").mask("000.000.000-00");
$("#celular_editar").mask("(00) 00000-0000");

function validarCPF(cpf) {
  const numeros = cpf.replace(/\D+/g, ""); // Remove caracteres não numéricos
  if (numeros.length !== 11) return false; // Verifica se o CPF tem 11 dígitos

  // Verifica se todos os dígitos são iguais
  const digitosIguais = numeros
    .split("")
    .every((digito) => digito === numeros[0]);
  if (digitosIguais) return false;

  // Cálculo do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(numeros.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(numeros.charAt(9))) return false;

  // Cálculo do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(numeros.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(numeros.charAt(10))) return false;

  return true; // CPF válido
}

function verificarCPF() {
  const cpfInput = document.getElementById("cpf");
  const cpf1 = cpfInput.value;

  if (validarCPF(cpf1)) {
    document.querySelector("#cpf").style.border = "1px solid green";
    document.querySelector("#cpf").style.filter =
      "drop-shadow(0 0 5px rgb(160, 252, 176))";
    return true;
  } else {
    document.querySelector("#cpf").style.border = "1px solid red";
    document.querySelector("#cpf").style.filter =
      "drop-shadow(0 0 5px rgb(252, 160, 160))";
    return false;
  }
}

function validarCPF2(cpf) {
  const numeros = cpf.replace(/\D+/g, ""); // Remove caracteres não numéricos
  if (numeros.length !== 11) return false; // Verifica se o CPF tem 11 dígitos

  // Verifica se todos os dígitos são iguais
  const digitosIguais = numeros
    .split("")
    .every((digito) => digito === numeros[0]);
  if (digitosIguais) return false;

  // Cálculo do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(numeros.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(numeros.charAt(9))) return false;

  // Cálculo do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(numeros.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(numeros.charAt(10))) return false;

  return true; // CPF válido
}

function verificarCPF2() {
  const cpfInput = document.getElementById("cpf_editar");
  const cpf1 = cpfInput.value;

  if (validarCPF(cpf1)) {
    document.querySelector("#cpf_editar").style.border = "1px solid green";
    document.querySelector("#cpf_editar").style.filter =
      "drop-shadow(0 0 5px rgb(160, 252, 176))";
    return true;
  } else {
    document.querySelector("#cpf_editar").style.border = "1px solid red";
    document.querySelector("#cpf_editar").style.filter =
      "drop-shadow(0 0 5px rgb(252, 160, 160))";
    return false;
  }
}

$("#cadastrar_funcionario").on("click", function () {
  if (verificarCPF()) {
    var formData = new FormData();

    formData.append("nome", $("#nome").val());
    formData.append("cpf", $("#cpf").val());
    formData.append("nascimento", $("#nascimento").val());
    formData.append("celular", $("#celular").val());
    formData.append("salario", $("#salario").val());
    formData.append("veiculos", $("#veiculos").val());

    $.ajax({
      url: "inicial/cadastrarFuncionario",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        if (response.status === "success") {
          $("#resposta_funcionario").css("marginBottom", "10px");
          $("#resposta_funcionario").css("padding", "10px");
          $("#resposta_funcionario").text(
            "Funcionário cadastrado com sucesso!"
          );
          $("#resposta_funcionario").css("color", "green");
          $("#resposta_funcionario").css(
            "background-color",
            "rgb(160, 252, 176)"
          );
          $("#nome").val("");
          $("#cpf").val("");
          $("#nascimento").val("");
          $("#celular").val("");
          $("#salario").val("");
        } else if (response.status === "errorCpf") {
          $("#resposta_funcionario").css("marginBottom", "10px");
          $("#resposta_funcionario").css("padding", "10px");
          $("#resposta_funcionario").text("CPF ja cadastrado!");
          $("#resposta_funcionario").css("color", "darkred");
          $("#resposta_funcionario").css(
            "background-color",
            "rgb(252, 160, 160)"
          );
        } else if (response.status === "errorCelular") {
          $("#resposta_funcionario").css("marginBottom", "10px");
          $("#resposta_funcionario").css("padding", "10px");
          $("#resposta_funcionario").text("Celular ja cadastrado!");
          $("#resposta_funcionario").css("color", "darkred");
          $("#resposta_funcionario").css(
            "background-color",
            "rgb(252, 160, 160)"
          );
        } else {
          $("#resposta_funcionario").css("marginBottom", "10px");
          $("#resposta_funcionario").css("padding", "10px");
          $("#resposta_funcionario").text(
            "Preencha todos os dados corretamente!"
          );
          $("#resposta_funcionario").css("color", "darkred");
          $("#resposta_funcionario").css(
            "background-color",
            "rgb(252, 160, 160)"
          );
        }
      },
      error: function (xhr, status, error) {
        console.log("Status: " + status); // Mostra o status do erro
        console.log("Erro: " + error); // Mostra a descrição do erro
        console.log("Resposta do servidor: " + xhr.responseText); // Exibe a resposta completa
      },
    });
  }
});

function getFuncionarios(pag) {
  $("#funcionarios_cadastrados").empty();
  $.ajax({
    url: "inicial/getFuncionarios/" + pag,
    type: "GET",
    dataType: "json",
    success: function (dados) {
      dados.forEach((funcionario) => {
        function formatarData(data) {
          const [ano, mes, dia] = data.split("-");
          return `${dia}/${mes}/${ano}`;
        }

        const dataNascimentoFormatada = formatarData(
          funcionario.data_nascimento
        );
        const dataCadastroFormatada = formatarData(funcionario.data_cadastro);

        $("#funcionarios_cadastrados").append(`
          <div id="cartao_funcionario">
            <div>
              <h2>${funcionario.nome}</h2>
            </div>
            <hr>
            <p><b>CPF:</b> ${funcionario.cpf}</p>
            <p><b>Data de nascimento:</b> ${dataNascimentoFormatada}</p>
            <p><b>Celular:</b> ${funcionario.celular}</p>
            <p><b>Salário base:</b> ${parseFloat(
              funcionario.salario_base
            ).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}</p>
            <p><b>Veículo:</b> ${funcionario.veiculo}</p>
            <p><b>Cadastrado em:</b> ${dataCadastroFormatada}</p>
            <hr>
            <div id="botoes_funcionarios">
            <button id="editar_funcionario" onclick="editarFuncionario(${
              funcionario.id
            })">Editar</button>
              <button id="excluir_funcionario" onclick="excluirFuncionario(${
                funcionario.id
              })">Excluir</button>
            </div>
          </div>
          `);
      });
    },
    error: function (xhr, status, error) {
      console.log("Status: " + status); // Mostra o status do erro
      console.log("Erro: " + error); // Mostra a descrição do erro
      console.log("Resposta do servidor: " + xhr.responseText); // Exibe a resposta completa
    },
  });
}

function excluirFuncionario(id) {
  $.ajax({
    url: "inicial/excluirFuncionario/" + id,
    type: "POST",
    dataType: "json",
    success: function (response) {
      if (response.status === "success") {
        getFuncionarios($(".pag").val());
      }
    },
    error: function (xhr, status, error) {
      console.log("Status: " + status); // Mostra o status do erro
      console.log("Erro: " + error); // Mostra a descrição do erro
      console.log("Resposta do servidor: " + xhr.responseText); // Exibe a resposta completa
    },
  });
}

function editarFuncionario(id) {
  $.ajax({
    url: "inicial/editarFuncionario/" + id,
    type: "GET",
    dataType: "json",
    success: function (funcionario) {
      $("#janela_funcionario").css("display", "none");
      $("#janela_editar_funcionario").css("display", "flex");

      $("#nome_editar").val(funcionario.nome);
      $("#cpf_editar").val(funcionario.cpf);
      $("#nascimento_editar").val(funcionario.data_nascimento);
      $("#celular_editar").val(funcionario.celular);
      $("#salario_editar").val(funcionario.salario_base);
      $("#veiculos_editar").val(funcionario.veiculo);
      $("#id_editar").val(funcionario.id);
    },
    error: function (xhr, status, error) {
      console.log("Status: " + status); // Mostra o status do erro
      console.log("Erro: " + error); // Mostra a descrição do erro
      console.log("Resposta do servidor: " + xhr.responseText); // Exibe a resposta completa
    },
  });
}

$("#editar_funcionario").on("click", function () {
  if (verificarCPF2()) {
    $.ajax({
      url: "inicial/atualizarFuncionario",
      type: "POST",
      data: {
        nome: $("#nome_editar").val(),
        cpf: $("#cpf_editar").val(),
        nascimento: $("#nascimento_editar").val(),
        celular: $("#celular_editar").val(),
        salario: $("#salario_editar").val(),
        veiculos: $("#veiculos_editar").val(),
        id: $("#id_editar").val(),
      },
      dataType: "json",
      success: function (response) {
        if (response.status === "success") {
          $("#resposta_editar_funcionario").css("marginBottom", "10px");
          $("#resposta_editar_funcionario").css("padding", "10px");
          $("#resposta_editar_funcionario").text("Funcionário atualizado!");
          $("#resposta_editar_funcionario").css("color", "green");
          $("#resposta_editar_funcionario").css(
            "background-color",
            "rgb(160, 252, 176)"
          );
          getFuncionarios($(".pag").val());
        } else if (response.status === "noChange") {
          $("#resposta_editar_funcionario").css("marginBottom", "10px");
          $("#resposta_editar_funcionario").css("padding", "10px");
          $("#resposta_editar_funcionario").text("Usuário não atualizado!");
          $("#resposta_editar_funcionario").css("color", "darkred");
          $("#resposta_editar_funcionario").css(
            "background-color",
            "rgb(252, 160, 160)"
          );
        } else {
          $("#resposta_editar_funcionario").css("marginBottom", "10px");
          $("#resposta_editar_funcionario").css("padding", "10px");
          $("#resposta_editar_funcionario").text(
            "Preencha todos os dados corretamente!"
          );
        }
      },
      error: function (xhr, status, error) {
        console.log("Status: " + status); // Mostra o status do erro
        console.log("Erro: " + error); // Mostra a descrição do erro
        console.log("Resposta do servidor: " + xhr.responseText); // Exibe a resposta completa
      },
    });
  }
});

$("#veiculos").on("change", function () {
  if ($("#veiculos").val() == "Carro") {
    $("#salario").css("display", "block");
  }
});

$("#veiculos_editar").on("change", function () {
  if ($("#veiculos_editar").val() == "Carro") {
    $("#salario_editar").css("display", "block");
  }
});

function aumentarPagFuncionarios() {
  let pag = $(".pag").val();
  pag++;
  $(".pag").val(pag);
  getFuncionarios(pag);
}

function diminuirPagFuncionarios() {
  let pag = $(".pag").val();
  if (pag > 1) {
    pag--;
    getFuncionarios(pag);
  } else {
    pag;
    getFuncionarios(pag);
  }
  $(".pag").val(pag);
}

document.getElementById("pesquisar").addEventListener("keyup", function () {
  const query = this.value.toLowerCase();
  const rows = document.querySelectorAll("#cartao_funcionario");

  rows.forEach((row) => {
    const cells = row.getElementsByTagName("div");
    const match = Array.from(cells).some((cell) =>
      cell.textContent.toLowerCase().includes(query)
    );

    row.style.display = match ? "" : "none";
  });
});

document
  .getElementById("pesquisar_financa")
  .addEventListener("keyup", function () {
    const query = this.value.toLowerCase();
    const rows = document.querySelectorAll(".cartao_financeiro");

    rows.forEach((row) => {
      // Seleciona textos dentro de <div>, <p> e qualquer <h*> (h1, h2, h3...)
      const cells = row.querySelectorAll("div, p, h1, h2, h3, h4, h5, h6");
      const match = Array.from(cells).some((cell) =>
        cell.textContent.toLowerCase().includes(query)
      );

      row.style.display = match ? "" : "none";
    });
  });

$("#opcao_funcionario").on("click", function () {
  $("#fundo_janelas").css("display", "flex");
  $("#janela_funcionario").css("display", "block");
});

$("#fechar_janela_funcionario").on("click", function () {
  $("#fundo_janelas").css("display", "none");
  $("#janela_funcionario").css("display", "none");
});

$("#janela_adicionar_funcionario").on("click", function () {
  $("#janela_funcionario").css("display", "none");
  $("#janela_cadastrar_funcionario").css("display", "flex");
});

$("#voltar_janela_cadastrar_funcionario").on("click", function () {
  $("#janela_cadastrar_funcionario").css("display", "none");
  $("#janela_funcionario").css("display", "block");
  getFuncionarios($(".pag").val());
});

$("#voltar_janela_editar_funcionario").on("click", function () {
  $("#janela_editar_funcionario").css("display", "none");
  $("#janela_funcionario").css("display", "block");
  getFuncionarios($(".pag").val());
});

// Administrar entregas
$("#opcao_entrega").on("click", function () {
  $("#fundo_janelas").css("display", "flex");
  $("#janela_cadastrar_entregas").css("display", "flex");
});

$("#fechar_janela_entrega").on("click", function () {
  $("#resposta_entrega").css("marginBottom", "0");
  $("#resposta_entrega").css("padding", "0");
  $("#resposta_entrega").text("");
  $("#fundo_janelas").css("display", "none");
  $("#janela_cadastrar_entregas").css("display", "none");
});

function getFuncionariosCadastrados() {
  $("#select_funcionarios_cadastrados").empty();
  $.ajax({
    url: "inicial/getFuncionariosCadastrados",
    type: "GET",
    dataType: "json",
    success: function (dados) {
      dados.forEach((funcionario) => {
        $("#select_funcionarios_cadastrados").append(`
          <option value="${funcionario.id}">${funcionario.nome}</option>
        `);
        $("#select_funcionarios_cadastrados_editar").append(`
          <option value="${funcionario.id}">${funcionario.nome}</option>
        `);
      });
    },
    error: function (xhr, status, error) {
      console.log("Status: " + status); // Mostra o status do erro
      console.log("Erro: " + error); // Mostra a descrição do erro
      console.log("Resposta do servidor: " + xhr.responseText); // Exibe a resposta completa
    },
  });
}

function calcular() {
  var valorTotal = $("#total").val();
  var valorFc = $("#fc").val();
  var valorCaixa = $("#caixa").val();
  var valorDevolucao = $("#devolucao").val();
  var valorCarta = parseInt(valorTotal - valorFc - valorCaixa - valorDevolucao);

  $("#carta").val(valorCarta);
}

function calcular_editar() {}

$("#cadastrar_entrega").on("click", function () {
  totalEntrega = 0;
  var totalDocumentos = parseInt($("#total").val());
  var totalFc = $("#fc").val();
  var totalCaixa = $("#caixa").val();
  var devolucao = parseInt($("#devolucao").val());
  var id = $("#select_funcionarios_cadastrados").val();
  var totalCarta =
    parseInt(totalDocumentos) -
    parseInt(totalFc) -
    parseInt(totalCaixa) -
    parseInt(devolucao);
  var totalEntrega =
    parseInt(totalFc) + parseInt(totalCarta) + parseInt(totalCaixa);

  if (totalEntrega + devolucao !== totalDocumentos) {
    $("#resposta_entrega").css("marginBottom", "10px");
    $("#resposta_entrega").css("padding", "10px");
    $("#resposta_entrega").text("A soma dos valores não bate com o total!");
    $("#resposta_entrega").css("color", "darkred");
    $("#resposta_entrega").css("background-color", "rgb(252, 160, 160)");
    return;
  } else {
    var formData = new FormData();
    formData.append("data", $("#data_entrega").val());
    formData.append("total", totalEntrega);
    formData.append("fc", totalFc);
    formData.append("carta", totalCarta);
    formData.append("caixa", totalCaixa);
    formData.append("devolucao", devolucao);
    formData.append("id", id);

    $.ajax({
      url: "inicial/cadastrarEntrega",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        if (response.status === "success") {
          $("#resposta_entrega").css("marginBottom", "10px");
          $("#resposta_entrega").css("padding", "10px");
          $("#resposta_entrega").text("Entrega cadastrada com sucesso!");
          $("#resposta_entrega").css("color", "green");
          $("#resposta_entrega").css("background-color", "rgb(160, 252, 176)");
          $("#data_entrega").val("");
          $("#fc").val("");
          $("#carta").val("");
          $("#caixa").val("");
          $("#devolucao").val("");
          $("#total").val("");
          filtrarPorPeriodo();
        } else {
          $("#resposta_entrega").css("marginBottom", "10px");
          $("#resposta_entrega").css("padding", "10px");
          $("#resposta_entrega").text("Preencha todos os dados corretamente!");
          $("#resposta_entrega").css("color", "darkred");
          $("#resposta_entrega").css("background-color", "rgb(252, 160, 160)");
        }
      },
      error: function (xhr, status, error) {
        console.log("Status: " + status); // Mostra o status do erro
        console.log("Erro: " + error); // Mostra a descrição do erro
        console.log("Resposta do servidor: " + xhr.responseText); // Exibe a resposta completa
      },
    });
  }
});

// Administrar Finanças
$("#opcao_financas").on("click", function () {
  $("#fundo_janelas").css("display", "flex");
  $("#janela_financeiro").css("display", "flex");
});

$("#fechar_janela_financeiro").on("click", function () {
  $("#fundo_janelas").css("display", "none");
  $("#janela_financeiro").css("display", "none");
});

$("#fechar_janela_editar_entrega").on("click", function () {
  $("#janela_editar_entregas").css("display", "none");
  $("#janela_financeiro").css("display", "flex");
  $("#resposta_editar_entrega").css("marginBottom", "0");
  $("#resposta_editar_entrega").css("padding", "0");
  $("#resposta_editar_entrega").text("");
  filtrarPorPeriodo();
});

function editarEntrega(id_editar) {
  $("#fundo_janelas").css("display", "flex");
  $("#janela_editar_entregas").css("display", "flex");
  $("#janela_financeiro").css("display", "none");

  $.ajax({
    url: "inicial/getDadosEditar/" + id_editar,
    type: "GET",
    dataType: "json",
    success: function (dados) {
      dados.forEach((dado) => {
        var total = dado.quantidade_entregas + dado.quantidade_devolucoes;
        $("#select_funcionarios_cadastrados_editar").val(dado.id_funcionario);
        $("#data_entrega_editar").val(dado.data_entrega);
        $("#total_editar").val(total);
        $("#fc_editar").val(dado.fc);
        $("#carta_editar").val(dado.carta);
        $("#caixa_editar").val(dado.caixa);
        $("#devolucao_editar").val(dado.quantidade_devolucoes);
        $("#editarEntregaEditada").val(id_editar);
      });
    },
    error: function (xhr, status, error) {
      console.log("Status: " + status); // Mostra o status do erro
      console.log("Erro: " + error); // Mostra a descrição do erro
      console.log("Resposta do servidor: " + xhr.responseText); // Exibe a resposta completa
    },
  });
}

function editarEntregaEditada() {
  var totalEntrega_editar = 0;
  var totalCarta_editar = 0;
  var totalDocumentos_editar = parseInt($("#total_editar").val());
  var totalFc_editar = $("#fc_editar").val();
  var totalCaixa_editar = $("#caixa_editar").val();
  var devolucao_editar = parseInt($("#devolucao_editar").val());
  var id = $("#select_funcionarios_cadastrados_editar").val();
  var totalCarta_editar =
    parseInt(totalDocumentos_editar) -
    parseInt(totalFc_editar) -
    parseInt(totalCaixa_editar) -
    parseInt(devolucao_editar);
  var totalEntrega_editar =
    parseInt(totalFc_editar) +
    parseInt(totalCarta_editar) +
    parseInt(totalCaixa_editar);

  if (totalCarta_editar < 0) {
    $("#resposta_editar_entrega").css("marginBottom", "10px");
    $("#resposta_editar_entrega").css("padding", "10px");
    $("#resposta_editar_entrega").text(
      "A soma dos valores não bate com o total!"
    );
    $("#resposta_editar_entrega").css("color", "darkred");
    $("#resposta_editar_entrega").css("background-color", "rgb(252, 160, 160)");
    return;
  } else {
    var formData = new FormData();
    formData.append("data", $("#data_entrega_editar").val());
    formData.append("total", totalEntrega_editar);
    formData.append("fc", totalFc_editar);
    formData.append("carta", totalCarta_editar);
    formData.append("caixa", totalCaixa_editar);
    formData.append("devolucao", devolucao_editar);
    formData.append("id_funcionario", id);
    formData.append("id_entrega", $("#editarEntregaEditada").val());

    $.ajax({
      url: "inicial/editarEntrega",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "json",
      success: function (response) {
        if (response.status === "success") {
          $("#resposta_editar_entrega").css("marginBottom", "10px");
          $("#resposta_editar_entrega").css("padding", "10px");
          $("#resposta_editar_entrega").text("Entrega editada com sucesso!");
          $("#resposta_editar_entrega").css("color", "green");
          $("#resposta_editar_entrega").css(
            "background-color",
            "rgb(160, 252, 176)"
          );
          $("#data_editar_entrega").val("");
          $("#fc_editar").val("");
          $("#carta_editar").val("");
          $("#caixa_editar").val("");
          $("#devolucao_editar").val("");
          $("#total_editar").val("");
        } else {
          $("#resposta_editar_entrega").css("marginBottom", "10px");
          $("#resposta_editar_entrega").css("padding", "10px");
          $("#resposta_editar_entrega").text(
            "Preencha todos os dados corretamente!"
          );
          $("#resposta_editar_entrega").css("color", "darkred");
          $("#resposta_editar_entrega").css(
            "background-color",
            "rgb(252, 160, 160)"
          );
        }
      },
      error: function (xhr, status, error) {
        console.log("Status: " + status); // Mostra o status do erro
        console.log("Erro: " + error); // Mostra a descrição do erro
        console.log("Resposta do servidor: " + xhr.responseText); // Exibe a resposta completa
      },
    });
  }
}

function filtrarPorPeriodo() {
  $("#financeiro_cadastrado").empty();
  $("#total_financeiro").empty();
  const dataInicio = document.getElementById("dataInicio").value;
  const dataFim = document.getElementById("dataFim").value;

  if (!dataInicio || !dataFim) {
    return;
  }

  function formatarData(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  // Entregas diárias por período
  $.ajax({
    url: "inicial/getEntregasPeriodo",
    type: "POST",
    data: {
      dataInicio: dataInicio,
      dataFim: dataFim,
    },
    dataType: "json",
    success: function (dados) {
      var totalEntrega = 0;

      dados.forEach((financeiro) => {
        const dataEntregaFormatada = formatarData(financeiro.data_entrega);
        if (financeiro.veiculo == "Moto") {
          var fc = parseFloat(financeiro.fc * 1);
          var carta = parseFloat(financeiro.carta * 1.7);
          var caixa = parseFloat(financeiro.caixa * 2.3);
        } else {
          var fc = parseFloat(financeiro.fc * 1);
          var carta = parseFloat(financeiro.carta * 1);
          var caixa = parseFloat(financeiro.caixa * 2);
        }
        totalEntrega = fc + carta + caixa;
        $("#financeiro_cadastrado").append(`
          <div class="cartao_financeiro">
            <div>
              <h2>${financeiro.nome}</h2>
            </div>
            <hr>
            <p><b>Data:</b> ${dataEntregaFormatada}</p>
            <p><b>Veículo:</b> ${financeiro.veiculo}</p>
            <p><b>Total de documentos:</b> ${
              financeiro.quantidade_entregas + financeiro.quantidade_devolucoes
            }</p>
            <p><b>FC:</b> ${
              financeiro.fc
            } <span class="valor_total_entregas"> <b>Total:</b>
              ${fc.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span></p>
            <p><b>Carta:</b> ${
              financeiro.carta
            } <span class="valor_total_entregas"> <b>Total:</b>
              ${carta.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span></p>
            <p><b>Caixa:</b> ${
              financeiro.caixa
            } <span class="valor_total_entregas"> <b>Total:</b>
              ${caixa.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span></p>
            <p><b>Devolução:</b> ${financeiro.quantidade_devolucoes}</p>
            <hr>
            <p><b>Total de entregas:</b> ${
              financeiro.quantidade_entregas
            } <span class="valor_total_entregas"> <b>Valor total:</b>
              ${totalEntrega.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span></p>
            <hr>
            <button id="editar_entregas" onclick="editarEntrega(${
              financeiro.id_entregas
            })">Editar</button>
          </div>
          `);
      });
    },
    error: function (xhr, status, error) {
      console.log("Status: " + status); // Mostra o status do erro
      console.log("Erro: " + error); // Mostra a descrição do erro
      console.log("Resposta do servidor: " + xhr.responseText); // Exibe a resposta completa
    },
  });

  // Entregas totais por período
  $.ajax({
    url: "inicial/getFinanceiroTotal",
    type: "POST",
    data: {
      dataInicio: dataInicio,
      dataFim: dataFim,
    },
    dataType: "json",
    success: function (dados) {
      dados.forEach((financas) => {
        const totalRecebido = Number(financas.total_recebido) || 0;
        const totalRecebidoFormatado = totalRecebido.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        let condicao = "";
        if (financas.veiculo == "Carro") {
          condicao = `<hr><div style="display: flex; justify-content: space-between;">
            <p><b>Salário base:</b> ${
              financas.salario_base
            }</p><p><b>Salário total:</b> ${parseFloat(
            financas.salario_base + totalRecebido
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}</p>
          </div>`;
        } else {
          condicao = `<hr>
          <div style="text-align: center;">
            <p><b>Salário total: </b> ${parseFloat(
              financas.salario_base + totalRecebido
            ).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}</p>
          </div>
        `;
        }
        $("#total_financeiro").append(`
          <div class="cartao_financeiro">
            <div>
              <h2>${financas.nome}</h2>
            </div>
            <hr>
            <div id="periodo">
              <div class="datas_periodo">
                <p style="text-align: center;"><b>Início</b></p>
                <p>${formatarData(dataInicio)}</p>
              </div>
              <div class="datas_periodo">
                <p style="text-align: center;"><b>Fim</b></p>
                <p>${formatarData(dataFim)}</p>
              </div>
            </div>
            <hr>
            <div id="entregas_totais_periodo">
              <p><b>FC's totais:</b> ${financas.total_fc}</p>
              <p><b>Cartas totais:</b> ${financas.total_carta}</p>
              <p><b>Caixas totais:</b> ${financas.total_caixa}</p>
              <p><b>Devoluções totais:</b> ${financas.total_devolucao}</p>
            </div>
            <hr>
            <div id="dados_entregas_funcionarios">
              <p><b>Entregas totais:</b> ${financas.total_entregas}<p> 
              <p><b>Total:</b> ${totalRecebidoFormatado}</p>
            </div>
            <div>
              ${condicao}
            </div>
          </div>
          `);
      });
    },
    error: function (xhr, status, error) {
      console.log("Status: " + status); // Mostra o status do erro
      console.log("Erro: " + error); // Mostra a descrição do erro
      console.log("Resposta do servidor: " + xhr.responseText); // Exibe a resposta completa
    },
  });

  // Dashboard

  // Função para gerar uma cor aleatória em formato hexadecimal
  function gerarCorAleatoria() {
    const letras = "0123456789ABCDEF";
    let cor = "#";
    for (let i = 0; i < 6; i++) {
      cor += letras[Math.floor(Math.random() * 16)];
    }
    return cor;
  }

  // Função para gerar uma lista de cores aleatórias conforme a quantidade de dados
  function gerarListaCores(qtd) {
    return Array.from({ length: qtd }, gerarCorAleatoria);
  }

  var chartEntregasGeraisFuncionarios = null;

  // Gráfico de entregas gerais
  $.ajax({
    url: "inicial/getEntregasGerais",
    type: "POST",
    data: {
      dataInicio: dataInicio,
      dataFim: dataFim,
    },
    dataType: "json",
    success: function (dados) {
      console.log(dados);
      const ctx = document.getElementById("entregas_gerais");

      // Verifica se um gráfico já existe e o destrói
      if (chartEntregasGeraisFuncionarios) {
        chartEntregasGeraisFuncionarios.destroy();
      }

      // Cria o novo gráfico e armazena na variável global
      chartEntregasGeraisFuncionarios = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: dados.map((entregas) => entregas.nome),
          datasets: [
            {
              label: "Volume de vendas por cliente",
              data: dados.map((entregas) => entregas.total_entregas),
              backgroundColor: gerarListaCores(dados.length),
              hoverOffset: 5,
            },
          ],
        },
      });
    },
    error: function (xhr, status, error) {
      console.log("Status: " + status); // Mostra o status do erro
      console.log("Erro: " + error); // Mostra a descrição do erro
      console.log("Resposta do servidor: " + xhr.responseText); // Exibe a resposta completa
    },
  });

  //Gráfico de entregas individuais
  $.ajax({
    url: "inicial/getEntregasIndividuais",
    type: "POST",
    data: {
      dataInicio: dataInicio,
      dataFim: dataFim,
    },
    dataType: "json",
    success: function (dados) {
      console.log(dados);

      $("#container_graficos").empty(); // Remove gráficos antigos

      // Objeto para agrupar os dados por funcionário
      let entregasPorFuncionario = {};

      dados.forEach((dado) => {
        if (!entregasPorFuncionario[dado.nome]) {
          entregasPorFuncionario[dado.nome] = {
            datas: [],
            entregas: [],
          };
        }

        entregasPorFuncionario[dado.nome].datas.push(dado.data_entrega);
        entregasPorFuncionario[dado.nome].entregas.push(
          dado.quantidade_entregas
        );
      });

      // Agora, cria um gráfico para cada funcionário
      Object.keys(entregasPorFuncionario).forEach((nomeFuncionario, index) => {
        const canvasId = `grafico_entregas_${index}`;
        $("#container_graficos").append(
          `<canvas id="${canvasId}" class="entregas"></canvas>`
        );

        const ctx = document.getElementById(canvasId).getContext("2d");

        new Chart(ctx, {
          type: "bar",
          data: {
            labels: entregasPorFuncionario[nomeFuncionario].datas, // Agora é um array de datas!
            datasets: [
              {
                label: `Entregas de ${nomeFuncionario}`,
                data: entregasPorFuncionario[nomeFuncionario].entregas, // Agora é um array de quantidades!
                backgroundColor: gerarListaCores(
                  entregasPorFuncionario[nomeFuncionario].entregas.length
                ),
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    },
    error: function (xhr, status, error) {
      console.log("Status: " + status);
      console.log("Erro: " + error);
      console.log("Resposta do servidor: " + xhr.responseText);
    },
  });
}

// Dados a serem carregados ao abrir a página
getFuncionarios($(".pag").val());
getFuncionariosCadastrados();
