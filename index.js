var pprova;
var sprova;
var snota;
var participa;
var mf;
var mf_conv;
var bot_calc = document.getElementById("bot_media");
var tema_v

function soma() {
    tema_v = document.calcmedia.tema.value;
    pprova = parseFloat(document.calcmedia.p1.value);
    sprova = parseFloat(document.calcmedia.p2.value);
    snota = parseFloat(document.calcmedia.n2.value);
    participa = parseFloat(document.calcmedia.participa1.value);
    mf = (((pprova + sprova) / 2) * 6 + snota * 4) / 10 + participa;
    mf_conv = mf.toFixed(2);
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
        botaocalc();
    } else {
        bot_calc.style.visibility = "hidden";
        var falta = 6 - mf_conv;
        var resultado = document.getElementById('resultado');
        resultado.innerHTML = 'Sua média em ' + tema_v + ' é: ' + mf_conv + ' Você precisa de ' + falta.toFixed(2) + ' para atingir a média necessária.';
        resultado.style.color = "red";
        botaocalc();
    }
}