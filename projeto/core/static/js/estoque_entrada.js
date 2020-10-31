$(document).ready(function () {
  // Inserindo um classe no primeiro item
  $("#id_estoque-0-produto").addClass("clProduto");
  $("#id_estoque-0-quantidade").addClass("clQuantidade");

  // Pegando a o elemento pai da div que contém o input "estoque-0-quantidade"
  var inputQuantidadeParentElement = document.querySelector(
    '[name = "estoque-0-quantidade"]'
  ).parentElement.parentElement;

  // Pegando uma tag p chamada 'saldo' e mudando seu id
  var pSaldo = document.querySelector("#saldo");

  // Clonando e altereando a propiedade da tag p que vai conter o saldo
  var newPSaldo = pSaldo.cloneNode();

  // Mudando o id
  newPSaldo.setAttribute("id", "saldo-0");

  // Remocendo o hidden
  $(newPSaldo).removeAttr("hidden");

  $(newPSaldo).text("Saldo: 0");

  // Adicionando a tag p para o saldo
  inputQuantidadeParentElement.appendChild(newPSaldo);

  $("#add-item").click(function (ev) {
    ev.preventDefault();

    // Contando quantos formulários ja existem
    var count = $("#estoque").children().length;

    // Pegando o html de um formulário vazio
    var tmplMarkup = $("#item-estoque").html();

    // Substituindo '__prefix__' pelo valor de count em todos os casos no html do foumulário vazio
    var compiledTmpl = tmplMarkup.replace(/__prefix__/g, count);

    // Adicionando o novo foumulário dentro da div com id 'estoque'
    $("div#estoque").append(compiledTmpl);

    // Pegando a o elemento pai da div que contém o input "estoque-0-quantidade"
    var inputQuantidadeParentElement = document.querySelector(
      '[name = "estoque-'+ count +'-quantidade"]'
    ).parentElement.parentElement;

    // Pegando uma tag p chamada 'saldo' e mudando seu id
    var pSaldo = document.querySelector("#saldo");

    // Clonando e altereando a propiedade da tag p que vai conter o saldo
    var newPSaldo = pSaldo.cloneNode();

    // Mudando o id
    newPSaldo.setAttribute("id", "saldo-" + count);

    // Remocendo o hidden
    $(newPSaldo).removeAttr("hidden");

    $(newPSaldo).text("Saldo: 0");


    // Adicionando a tag p para o saldo
    inputQuantidadeParentElement.appendChild(newPSaldo);

    // Atualizando o total de foumulário
    $("#id_estoque-TOTAL_FORMS").attr("value", count + 1);

    // some animate to scroll to view our new form

    $("html, body").animate(
      {
        scrollTop: $("#add-item").position().top - 200,
      },
      800
    );

    $("#id_estoque-" + count + "-produto").addClass("clProduto");
    $("#id_estoque-" + count + "-quantidade").addClass("clQuantidade");
  });
});

let estoque;
let saldo;
let campo;
let campo2;
let quantidade;

$(document).on("change", ".clProduto", function () {
  let self = $(this);
  let pk = $(this).val();
  let url = "/produto/" + pk + "/json/";

  $.ajax({
    url: url,
    type: "GET",
    success: function (response) {
      estoque = response.data[0].estoque;
      campo = self.attr("id").replace("produto", "quantidade");
      //Remover o valor do campo 'quantidade'
      $("#" + campo).val("");
    },
    error: function (xhr) {},
  });
});

$(document).on("change", ".clQuantidade", function () {
  quantidade = $(this).val();
  saldo = Number(quantidade) + Number(estoque);

  // Pegando a o elemento pai da div que contém o input "estoque-x-quantidade"
  const id =  $(this).attr("id") 
  var inputQuantidadeParentElement = document.getElementById(id).parentElement.parentElement
    

  // Pegando a tag p que vai conter o saldo final
  var pSaldo = inputQuantidadeParentElement.lastChild;  

  $(pSaldo).text("Saldo: " + saldo);

  campo = $(this).attr("id").replace("quantidade", "saldo");
  // Atribuindo o saldo ao campo saldo
  $("#" + campo).val(saldo);
});
