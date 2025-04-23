const materiaSelecionada = JSON.parse(localStorage.getItem('materiaSelecionada'));
var pprova;
var sprova;
var snota;
var participa;
var resultado2;
var mf;
var mf_conv;
var bot_calc = document.getElementById("bot_media");
var tema_v
var minp2
var aprovado



function soma() {
    tema_v = materiaSelecionada?.materia;
    pprova = parseFloat(document.calcmedia.p1.value);
    sprova = parseFloat(document.calcmedia.p2.value);
    snota = parseFloat(document.calcmedia.n2.value);
    participa = parseFloat(document.calcmedia.participa1.value);
    if (isNaN(sprova) || !isFinite(sprova)) {
        sprova = 0;
    }
    mf = (((pprova + sprova) / 2) * 6 + snota * 4) / 10 + participa;
    mf_conv = mf.toFixed(1);
    
    
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

  function mostrarBotaoSalvar() {
    const botao = document.getElementById('botaoSalvar');
    botao.style.display = 'block';
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

        
        //botaocalc();
        mostrarBotaoSalvar(); // Chama a função para mostrar o botão de salvar
    } else {
        bot_calc.style.visibility = "hidden";
        var falta = 6 - mf_conv;
        var resultado = document.getElementById('resultado');
        resultado.innerHTML = 'Sua média em ' + tema_v + ' é: ' + mf_conv + ' Você precisa de ' + falta.toFixed(2) + ' para atingir a média necessária.';
        resultado.style.color = "red";
        vp2()
       // botaocalc();
        mostrarBotaoSalvar(); // Chama a função para mostrar o botão de salv
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
        resultado.innerHTML = 'Parabens! Voce foi aprovado em '+tema_v+' com a media de '+mf_conv+' pontos';
        resultado.style.color = "green";
        botao_p2.style.display = 'none';
}




function insertData(ne_conv) {
    const SUPABASE_URL = 'https://rfosgikzezrmhzghjjwd.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmb3NnaWt6ZXpybWh6Z2hqandkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNjA5NTYsImV4cCI6MjA2MDkzNjk1Nn0.oRpEXqpBTTHLDewfkCFjR2oCr2qtzazeOvn_NGsG1w4';
    
    const id_materia = materiaSelecionada?.id;
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const nota_p1 = pprova;
    const nota_p2 = sprova;
    const nota_n2 = snota;
    const participacao = participa;
    const materia = tema_v;
    const media_final = mf_conv;
    const id_aluno = localStorage.getItem('user_id');
    const status_aprovado = (media_final >= 6) ? 'aprovado' : 'reprovado'; // Define o status de aprovação com base na média final
    

    const data = {
        nota_p1: nota_p1,
        nota_p2: nota_p2,
        nota_n2: nota_n2,
        participacao: participacao,
        materia: materia,
        media_final: media_final,
        id_aluno: id_aluno,
        id: id_materia,
        aprovado: status_aprovado, // Adiciona o status de aprovação

    };

    supabase
        .from('materias')
        .upsert([data])
        .eq('id', id_materia) // Adiciona a condição para atualizar o registro correto
        .then(({ data, error }) => {
            if (error) {
                console.error('Erro ao inserir dados:', error);
            } else {
                
                localStorage.removeItem('materiaSelecionada');
                alert('Dados inseridos com sucesso!');

                location.reload(); // Recarrega a página após a inserção
            }
            // Aqui você pode adicionar lógica adicional após a inserção, se necessário
        })




}


