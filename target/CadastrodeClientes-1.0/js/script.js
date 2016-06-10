$(function () {
	
	alert(jQuery);
    var operacao = "A";
    var indice_selecionado = -1;
    var tbClientes = localStorage.getItem("tbClientes");
    tbClientes = JSON.parse(tbClientes);
    if (tbClientes == null)
        tbClientes = [];

    $("#formCadastro").on("submit", function () {

        if (operacao == "A")
            adicionarElemento();
        else
            editarElemento();
    });
    
    $("#tbLista").on("click", "#btnEditar", function(){
        operacao = "E";
        indice_selecionado = parseInt($(this).attr("alt"));
        
        var cli = JSON.parse(tbClientes[indice_selecionado]);
        $("#txtnome").val(cli.nome);
        $("#txtprofissao").val(cli.profissao);
		$("#txttelefone").val(cli.telefone);
		$("#txtsalario").val(cli.salario);
        $("#txtnome").focus();
    });
    
    $("#tbLista").on("click", "#btnExcluir", function(){
        indice_selecionado = parseInt($(this).attr("alt"));
        excluir();
        listar();
    });
    

    function adicionarElemento() {
        var cliente = JSON.stringify({
            nome: $("#txtnome").val(),
            profissao: $("#txtprofissao").val(),
			telefone: $("#txttelefone").val(),
			salario: $("#txtsalario").val()
        });
        tbClientes.push(cliente);
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Registro adicionado com sucesso");
        return true;
    }
    
    function editarElemento(){
         tbClientes[indice_selecionado] = JSON.stringify({
            nome: $("#txtnome").val(),
            profissao: $("#txtprofissao").val(),
			telefone: $("#txttelefone").val(),
			salario: $("#txtsalario").val()
        });
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Registro editado com sucesso");
        operacao = "A";
        return true;
    }
    
    function excluir(){
        tbClientes.splice(indice_selecionado, 1);
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Registro Exluido com Sucesso");
    }

    function listar() {
        $("#tbLista").html("");
        $("#tbLista").html(
                "<thead>" +
                "   <tr>" +
                "   	<th>Nome</th>" +
				"       <th>Profissão</th>" +
				"       <th>Telefone</th>" +
				"       <th>Salario</th>" +
				"       <th></th>" +
                "   </tr>" +
                "</thead>" +
                "<tbody>" +
                "</tbody>"
                );
        for (var i in tbClientes) {
            var cli = JSON.parse(tbClientes[i]);
            $("#tbLista tbody").append("<td>" + cli.nome + "</td>");
            $("#tbLista tbody").append("<td>" + cli.profissao + "</td>");
			$("#tbLista tbody").append("<td>" + cli.telefone + "</td>");
			$("#tbLista tbody").append("<td>" + cli.salario + "</td>");
            $("#tbLista tbody").append(
                    "<td> "+
                        " <img src='img/edit.png' alt='" + 
                        i + "' id='btnEditar'></img>"+
                        "<img src='img/delete.png' alt='" + 
                        i + "' id='btnExcluir'></img>"+
                    "</td>");
            $("#tbLista tbody").append("</tr>");
        }
    }

    listar();
});
	
