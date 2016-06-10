$(function () {
    $("#cpf").on("blur", function () {
        var i;
        s = $("#cpf").val();
        var c = s.substr(0, 9);
        var dv = s.substr(9, 2);
        var d1 = 0;
        var v = false;

        for (i = 0; i < 9; i++) {
            d1 += c.charAt(i) * (10 - i);
        }
        if (d1 == 0) {
            alert("Campo Obrigatório - Por favor informe um CPF!");
            //document.cadastro.cpf.focus();
            $("#cpf").focus();
            v = true;
            return false;
        }
        d1 = 11 - (d1 % 11);
        if (d1 > 9)
            d1 = 0;
        if (dv.charAt(0) != d1 || dv.charAt(0) =="") {
            alert("Campo Obrigatório - Por favor informe um CPF válido");
            //document.cadastro.cpf.focus();
            $("#cpf").focus();
            v = true;
            return false;
        }

        d1 *= 2;
        for (i = 0; i < 9; i++) {
            d1 += c.charAt(i) * (11 - i);
        }
        d1 = 11 - (d1 % 11);
        if (d1 > 9)
            d1 = 0;
        if (dv.charAt(1) != d1 || dv.charAt(1) =="") {
            alert("Campo Obrigatório - Por favor informe um CPF válido");
            //document.cadastro.cpf.focus();
            $("#cpf").focus();
            v = true;
            return false;
        }
//        if (!v) {
//            alert(c + "CPF com Sucesso!");
//        }
    });

});

$(function () {
    $("#cpf").keyup(function () {


        var valor = $("#cpf").val().replace(/([a-zA-Z])/g, "");
        $("#cpf").val(valor);
    });
});

// Somente letras maiúsculas e minúsculas e numeros
$(function () {
    $("#nome").keyup(function () {


        var valor = $("#nome").val().replace(/([0-9])/g, "");
        $("#nome").val(valor);
    });
});


$(function () {
    $("#nome").on("blur", function () {

        var campo = $("#nome").val();
        //se não desejar números é só remover da regex abaixo 
        var regex = '[^a-zA-Z]+';
        if (campo.match(regex)) {

            //encontrou então não passa na validação
            alert("Campo Obrigatório - Não é permitido números ou caracteres especiais!!!");
            //document.cadastro.nome.focus();
            $("#nome").focus();

            return false;
        } else {

            //document.cadastro.endereco.focus();
            $("#endereco").focus();
            //não encontrou caracteres especiais 

            return true;
        }
    });
});


$(function () {
    $("#campo").on("blur", function () {

        if (valor == "") {
            alert("Esse Campo é Obrigatório!!!");
            $("#campo").focus();
            return false;
        } else {


        }

    });
});


$(function () {
    $("#email").on("blur", function () {
        if ($("#email").val() == ""
                || $("#email").val().indexOf('@') == -1
                || $("#email").val().indexOf('.') == -1)
        {
            alert("Campo Obrigatório - Por favor, informe um E-MAIL válido!");
            $("#email").focus();
            return false;
        }


    });
});


$(function () {
    $("#sexo").on("blur", function () {
        var comboSexo = $("#sexo").val();
        if (comboSexo == "--Escolher Sexo--") {
            alert("Selecione uma opção antes de prosseguir");
            $("#sexo").focus();
        }

        if (comboSexo != "--Escolher Sexo--") {
            $("#telefone").focus();
        }
    });
});

$(function () {
    $("#sim").on("click", function () {

        if ($("#sim").prop("checked", true)) {
            alert("Campo x é Obrigatório");
            $("#sim").focus();
            return false;
        }
    });
});
//funcao chamada quando o html é carregado
$(document).ready(function () {
    $("#cpf").focus();



    if ($("#sim").prop("checked", true)) {
        document.getElementById("msgPromo").style.visibility = 'visible';
    } else {
        document.getElementById("msgPromo").style.visibility = 'hidden';
    }

});

$(function () {

    var operacao = "A";
    var indice_selecionado = -1;
    var tbClientes = localStorage.getItem("tbClientes");
    tbClientes = JSON.parse(tbClientes);
    if (tbClientes == null)
        tbClientes = [];

    $("#formCadastro").on("submit", function () {

        if (operacao == 'A')
            adicionarElemento();
        else
            editarElemento();
    });

    $("#tbLista").on("click", "#btnEditar", function () {
        operacao = "E";
        indice_selecionado = parseInt($(this).attr("alt"));

        var cli = JSON.parse(tbClientes[indice_selecionado]);
        $("#cpf").val(cli.cpf);
        $("#nome").val(cli.nome);
        $("#cpf").focus();
    });

    $("#tbLista").on("click", "#btnExcluir", function () {
        indice_selecionado = parseInt($(this).attr("alt"));
        excluir();
        listar();
    });


    function adicionarElemento() {
        var cliente = JSON.stringify({
            cpf: $("#cpf").val(),
            nome: $("#nome").val()

        });
        tbClientes.push(cliente);
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Registro adicionado com sucesso");
        return true;
    }

    function editarElemento() {
        tbClientes[indice_selecionado] = JSON.stringify({
            cpf: $("#cpf").val(),
            nome: $("#nome").val()
        });
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Registro editado com sucesso");
        operacao = "A";
        return true;
    }

    function excluir() {
        tbClientes.splice(indice_selecionado, 1);
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Registro Exluido com Sucesso");
    }

    function listar() {
        $("#tbLista").html("");
        $("#tbLista").html(
                "<thead>" +
                "   <tr>" +
                "   	<th>CPF</th>" +
                "       <th>Nome</th>" +
                "       <th></th>" +
                "   </tr>" +
                "</thead>" +
                "<tbody>" +
                "</tbody>"
                );
        for (var i in tbClientes) {
            var cli = JSON.parse(tbClientes[i]);

            var novaLinha = $("<tr>");
            var cols = "";


            cols += "<td>" + cli.cpf + "</td>";
            cols += "<td>" + cli.nome + "</td>";
            cols += "<td>" +
                    " <img src='img/edit.png' alt='" +
                    i + "' id='btnEditar'></img>" +
                    "<img src='img/delete.png' alt='" +
                    i + "' id='btnExcluir'></img>" + "</td>";
            novaLinha.append(cols);
            $("#tbLista").append(novaLinha);
        }
    }

    listar();
});

$(document).ready(function () {
    $("#cep").blur(function (e) {

        var cepDigitado = $("#cep").val();

        $.get(
                'CepServlet',
                {cep: cepDigitado},
        function (textoDeResposta) {
            alert(textoDeResposta);
            $(textoDeResposta).find('endereco').each(function () {
                var texto = $(this).find('rua').text();
                $('#endereco').val(texto);
            });
            $(textoDeResposta).find('endereco').each(function () {
                var texto = $(this).find('bairro').text();
                $('#bairro').val(texto);
            });
            $(textoDeResposta).find('endereco').each(function () {
                var texto = $(this).find('cidade').text();
                $('#cidade').val(texto);
            });
            $(textoDeResposta).find('endereco').each(function () {
                var texto = $(this).find('estado').text();
                $('#estado').val(texto);
            });
        });
    });
});

$(function () {
    $("#cep").on("blur", function () {
//        fazer uma requisacao para o servlet
//        que devolve os dados dos campos bairro, cidade, estado...
//                
//        igual havia mostrado na aula anterior
    });

});

$(function () {
    $("#cep").keyup(function () {


        var valor = $("#cep").val().replace(/([a-zA-Z])/g, "");
        $("#cep").val(valor);
    });
});

$(function () {
    $("#telefone").keyup(function () {


        var valor = $("#telefone").val().replace(/([a-zA-Z])/g, "");
        $("#telefone").val(valor);
    });
});

$(function () {
    $("#check-sim").click(function () {
        $("p#msg-cancel").toggle();
    });
});

// Testando a validação usando jQuery
$(function () {

    // ## EXEMPLO 1
    // Aciona a validação a cada tecla pressionada
    var temporizador = false;
    $("#cpf").keypress(function () {

        // O input que estamos utilizando
        var input = $(this);

        // Limpa o timeout antigo
        if (temporizador) {
            clearTimeout(temporizador);
        }

        // Cria um timeout novo de 500ms
        temporizador = setTimeout(function () {
            // Remove as classes de válido e inválido
            input.removeClass('valido');
            input.removeClass('invalido');

            // O CPF ou CNPJ
            var cpf = input.val();

            // Valida
            var valida = valida_cpf(cpf);

            // Testa a validação
            if (valida) {
                input.addClass('valido');
            } else {
                input.addClass('invalido');
            }
        });
    });
});

$(function () {
    $("#percent").keypress(function () {
              
        var len = this.value.length;
        if (len >= 200) {
            alert("Número de caractere não pode ser maior que 200");
            this.value = this.value.substring(0, 200);
        }
        //$('#percent').text(200 - len);
        });
});

$(function () {
    $( "#senha" ).keypress( function( event ) {
        if (event.which == 32){
            alert ("Nao digite espaços");
            return false;
        }
        else
            return true;

    });
});
$(function () {
    $("#percent").on("blur",function () {
              
        var len = this.value.length;
        if (len >= 200) {
            alert("Número de caractere não pode ser maior que 200");
            this.value = this.value.substring(0, 200);
        }
        //$('#percent').text(200 - len);
        });
});

//Limite 200 Caracteres Mensagens
//$(document).ready(function(){
//    var totalChars      = 200; //Total characters allowed in textarea
//    var countTextBox    = $('#counttextarea') // Textarea input box
//    var charsCountEl    = $('#countchars'); // Remaining chars count will be displayed here
//    
//    charsCountEl.text(totalChars); //initial value of countchars element
//    countTextBox.keyup(function() { //user releases a key on the keyboard
//        
//        var thisChars = this.value.replace(/{.*}/g, '').length; //get chars count in textarea
//
//        var per = thisChars *100; 
//        var value= (per / totalChars); // total percent complete
//    
//        if(thisChars > totalChars) //if we have more chars than it should be
//        {
//            var CharsToDel = (thisChars-totalChars); // total extra chars to delete
//            this.value = this.value.substring(0,this.value.length-CharsToDel); //remove excess chars from textarea
//        }else{
//            charsCountEl.text( totalChars - thisChars ); //count remaining chars
//            $('#percent').text(value +'%');
//        }
//    }); 
//});