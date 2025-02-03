function login() {
  $.ajax({
    url: "home/login",
    type: "POST",
    data: {
      login: $("#login").val(),
      senha: $("#senha").val(),
    },
    dataType: "json",
    success: function (response) {
      if (response.status === "success") {
        $("#res_login").css("marginBottom", "10px");
        $("#res_login").css("padding", "10px");
        $("#res_login").css("color", "green");
        $("#res_login").css("background-color", "rgb(160, 252, 176)");
        $("#res_login").text("Login efetuado.");
        window.location.href = "inicial";
      } else if (response.status === "errorUser") {
        $("#res_login").css("marginBottom", "10px");
        $("#res_login").css("padding", "10px");
        $("#res_login").css("color", "darkred");
        $("#res_login").css("background-color", "rgb(252, 160, 160)");
        $("#res_login").text("Usuário não encontrado.");
      } else if (response.status === "errorPass") {
        $("#res_login").css("marginBottom", "10px");
        $("#res_login").css("padding", "10px");
        $("#res_login").css("color", "darkred");
        $("#res_login").css("background-color", "rgb(252, 160, 160)");
        $("#res_login").text("Senha incorreta.");
      } else {
        $("#res_login").css("marginBottom", "10px");
        $("#res_login").css("padding", "10px");
        $("#res_login").css("color", "darkred");
        $("#res_login").css("background-color", "rgb(252, 160, 160)");
        $("#res_login").text("Preencha todos os dados corretamente.");
      }
    },
    error: function (xhr, status, error) {
      console.log("Status: " + status); // Mostra o status do erro
      console.log("Erro: " + error); // Mostra a descrição do erro
      console.log("Resposta do servidor: " + xhr.responseText); // Exibe a resposta completa
    },
  });
}
