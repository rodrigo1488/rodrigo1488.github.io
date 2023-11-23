var pprova;
var sprova;
var snota;
var participa;
var mf;
var mf_conv;
var bot_calc = document.getElementById("bot_media");
var tema_v
var minp2

window.onload = alert('ATENÇÃO! USAR "PONTO" AO INVES DE "VIRGULA" EM NOTAS COM MAIS DE UMA CASA DECIMAL')

function soma() {
    tema_v = document.calcmedia.tema.value;
    pprova = parseFloat(document.calcmedia.p1.value);
    sprova = parseFloat(document.calcmedia.p2.value);
    snota = parseFloat(document.calcmedia.n2.value);
    participa = parseFloat(document.calcmedia.participa1.value);
    if (isNaN(sprova) || !isFinite(sprova)) {
        sprova = 0;
    }
    mf = (((pprova + sprova) / 2) * 6 + snota * 4) / 10 + participa;
    mf_conv = mf.toFixed(2);
    
    
}


function calculop2() {
    p1 = parseFloat(document.calcmedia.p1.value);
    var n2 = parseFloat(document.calcmedia.n2.value);
    var part = parseFloat(document.calcmedia.participa1.value);
    var nprov = ((n2 * 4) / 10) + part;
    var nm = 6.0;
    var ne = ((((nm - nprov) * 10) / 6) * 2) - p1+0.1;  
    var ne_conv =ne.toFixed(1);
    if(ne_conv>0){
        exibe_p2(ne_conv);
    }else{
        aprovado(ne_conv,ver_p2)

    }
    
    
  }



function botaocalc() {
    var botao = document.createElement("button");
    botao.innerHTML = "novo calculo";
    botao.style.padding = "10px";
    botao.style.backgroundColor = "green";
    botao.style.color = "white";
    botao.style.border = "2px solid white";
    botao.style.borderRadius = "15px";
    botao.style.cursor = "pointer";
    botao.style.boxshadow = "2px 2px 2px black";

    botao.addEventListener("click", function novo_calculo() {
        location.reload();
    });
    document.getElementById("botaoContainer").appendChild(botao);
}


function exibemf() {
    soma();

    if (isNaN(pprova) || isNaN(snota)) {
        alert('Você deve preencher os campos "PROVA 1" e "NOTA 2" para realizar o cálculo');
        var erro = document.getElementById('resultado').innerHTML = 'PREENCHA "PROVA 1" e "NOTA 2" PARA REALIZAR O CALCULO'
    } else if (mf_conv >= 6) {
        bot_calc.style.visibility = "hidden";
        var resultado = document.getElementById('resultado');
        resultado.innerHTML = 'Sua média em ' + tema_v + ' é: ' + mf_conv + ' Parabéns! Você atingiu a média mínima.';
        resultado.style.color = "green";
        vp2()
        botaocalc();
    } else {
        bot_calc.style.visibility = "hidden";
        var falta = 6 - mf_conv;
        var resultado = document.getElementById('resultado');
        resultado.innerHTML = 'Sua média em ' + tema_v + ' é: ' + mf_conv + ' Você precisa de ' + falta.toFixed(2) + ' para atingir a média necessária.';
        resultado.style.color = "red";
        vp2()
        botaocalc();
    }
}
function toggleProva2Input(resposta) {
    var inputProva2 = document.getElementById('prova2');
    var buttonsContainer = document.getElementById('verifica_p2');
    if (resposta === 'sim') {
        document.getElementById('prova_02').style.display = 'table-row';
        inputProva2.required = true; // Torna o campo obrigatório
        buttonsContainer.style.display = 'none'; 
    } else {
        document.getElementById('prova_02').style.display = 'none';
        inputProva2.required = false; // Remove a obrigatoriedade do campo
        buttonsContainer.style.display = 'none'; 
    }
}


  function vp2(){
    var verp2 = document.getElementById('ver_p2');
    document.getElementById('ver_p2').style.display = 'table-row';

  }

function exibe_p2(ne_conv,ver_p2){
    var botao_p2 =document.getElementById('ver_p2')
    var resultado2 = document.getElementById('resultado2');
        resultado.innerHTML = 'você precisa tirar '+ne_conv+' pontos na p2 para atingir a media final';
        resultado.style.color = "red";
        botao_p2.style.display = 'none';
}

function aprovado(ne_conv,ver_p2){
    var botao_p2 =document.getElementById('ver_p2')
    var resultado2 = document.getElementById('resultado2');
        resultado.innerHTML = 'Parabens! você precisa tirar 0 pontos na p2 para atingir a media final';
        resultado.style.color = "green";
        botao_p2.style.display = 'none';
}
