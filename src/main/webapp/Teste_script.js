 
 /*function verificarCPF(c){
    var i;
    s = c;
    var c = s.substr(0,9);
    var dv = s.substr(9,2);
    var d1 = 0;
    var v = false;
 
    for (i = 0; i < 9; i++){
        d1 += c.charAt(i)*(10-i);
    }
    if (d1 == 0){
        alert("Campo Obrigatório - Por favor informe um CPF válido")
		document.cadastro.cpf.focus();
        v = true;
        return false;
    }
    d1 = 11 - (d1 % 11);
    if (d1 > 9) d1 = 0;
    if (dv.charAt(0) != d1){
        alert("Campo Obrigatório - Por favor informe um CPF válido")
		document.cadastro.cpf.focus();
        v = true;
        return false;
    }
 
    d1 *= 2;
    for (i = 0; i < 9; i++){
        d1 += c.charAt(i)*(11-i);
    }
    d1 = 11 - (d1 % 11);
    if (d1 > 9) d1 = 0;
    if (dv.charAt(1) != d1){
        alert("Campo Obrigatório - Por favor informe um CPF válido")
		document.cadastro.cpf.focus();
        v = true;
        return false;
    }
    if (!v) {
       // alert(c + "nCPF Válido")
    }
};*/

function validarCPF(cpf) {  
    cpf = cpf.replace(/[^\d]+/g,'');    
    if(cpf == '') return false; 
    // Elimina CPFs invalidos conhecidos    
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
            return false;       
    // Valida 1o digito 
    add = 0;    
    for (i=0; i < 9; i ++)       
        add += parseInt(cpf.charAt(i)) * (10 - i);  
        rev = 11 - (add % 11);  
        if (rev == 10 || rev == 11)     
            rev = 0
			alert ("Campo Obrigatório - Por Favor Informe um CPF válido!!!") 
		document.cadastro.nome.focus();;    
        if (rev != parseInt(cpf.charAt(9)))     
            return false;       
    // Valida 2o digito 
    add = 0;    
    for (i = 0; i < 10; i ++)        
        add += parseInt(cpf.charAt(i)) * (11 - i);  
    rev = 11 - (add % 11);  
    if (rev == 10 || rev == 11) 
        rev = 0;    
    if (rev != parseInt(cpf.charAt(10)))
        return false;       
    return true;   
};

 
 function validaNome(campo) { 
		//se não desejar números é só remover da regex abaixo 
		var regex = '[^a-zA-Z]+'; 
		if(campo.match(regex)) { 
		//encontrou então não passa na validação
		alert ("Campo Obrigatório - Não é permitido números ou caracteres especiais!!!") 
		document.cadastro.nome.focus();
return false; 
		} else { 
		
		document.cadastro.endereco.focus();
		//não encontrou caracteres especiais 
		
return true;
	}
 };


function validaCampos(valor){
		
	
		if(valor==""){
			alert("Esse Campo é Obrigatório!!!");	
			document.cadastro.nome.focus();
		return false;
		} else{
			
			
		}
		
};
 
 
function validaEmail(){

if( document.cadastro.email.value=="" 
   || document.cadastro.email.value.indexOf('@')==-1 
     || document.cadastro.email.value.indexOf('.')==-1 )
	{
		alert( "Campo Obrigatório - Por favor, informe um E-MAIL válido!" );
		document.cadastro.email.focus();
		return false;
	}
		
};

function validaSelect() {
        var comboSexo = document.getElementById("sexo");
        if (comboSexo.options[comboSexo.selectedIndex].value == "--Escolher Sexo--" ){
                alert("Selecione uma opção antes de prosseguir");
				document.cadastro.sexo.focus();
        }
				
		if (comboSexo.options[comboSexo.selectedIndex].value != "--Escolher Sexo--" ){
                
				document.cadastro.telefone.focus();
		}
    };    
	
function validaChekBox(){
	
	if (document.cadastro.sim.checked) {
		
      alert ("Campo x é Obrigatório");
     //document.cadastro.sim.focus();
     return false;
}
	if(document.cadastro.sim.checked && document.cadastro.nao.checked){
		
		alert ("Selecione Apenas Uma Opção")
		return false;
	}
	
};

function showhidefield()
 
  {
    if (document.cadastro.sim.checked)
    {
      document.getElementById("msgPromo").style.visibility = 'visible';
    }else{
      document.getElementById("msgPromo").style.visibility = 'hidden';
    }
  };