let votos_bolsonaro = parseInt(0);
let votos_lula = parseInt(0);
let votos_brancos = parseInt(0);
let votos_nulos = parseInt(0);
let votos = parseInt(0);
let quantidade_eleitores;
let fim_eleicao = false;

function configurar() {
    if (quantidade_eleitores) {
        alert('Urna já configurada!');
        return;
    }
    quantidade_eleitores = parseInt(prompt('Digite a quantidade de eleitores que irão participar: '));
}

function resultado() {
    if (!quantidade_eleitores) {
        alert('Eleição ainda não iniciada!');
        return;
    }
    if (!(quantidade_eleitores == votos)) {
        alert('Eleição ainda não terminou!');
        return;
    }

    if (votos_bolsonaro == votos_lula) {
        fim_eleicao = true;
        alert('Houve empate');
        return;
    } else if (votos_bolsonaro == Math.max(votos_bolsonaro, votos_lula)) {
        fim_eleicao = true;
        alert('Bolsonaro vencedor');
        return;
    } else if (votos_lula == Math.max(votos_bolsonaro, votos_lula)) {
        fim_eleicao = true;
        alert('Lula vencedor');
        return;
    }

}

function detalhes() {
    if (!quantidade_eleitores) {
        alert('Eleição ainda não iniciada!');
        return;
    }

    if (!(quantidade_eleitores == votos)) {
        alert('Eleição ainda não terminou!');
        return;
    }

    alert(`Total de votos: ${votos}\nTotal de votos Bolsonaro: ${votos_bolsonaro}\nTotal de votos Lula: ${votos_lula}\nTotal de votos brancos: ${votos_brancos}\nTotal de votos nulos: ${votos_nulos}`);
    return;
}

function reiniciar() {
    let confirmacao = confirm('Tem certeza que deseja reiniciar a eleição?');

    if (confirmacao) {
        let codigo = prompt('Digite "CONFIRMAR" para reiniciar:');
        if (codigo === 'CONFIRMAR') {
            localStorage.removeItem('votosBolsonaro'); 
            localStorage.removeItem('votosLula');
            localStorage.removeItem('votosBrancoDs'); 
            localStorage.removeItem('votosNulos');
            localStorage.removeItem('contadorVotos'); 
            localStorage.removeItem('quantidadeEleitores');
            votos_bolsonaro = 0;
            votos_lula = 0;
            votos_brancos = 0;
            votos_nulos = 0;
            votos = 0;
            quantidade_eleitores = 0;
            fim_eleicao = false;
            alert('Urna reiniciada, configure novamente');
            return
        } else {
            alert('Código inválido, reinicialização cancelada!');
            return;
        }
    } else {
        alert('Reinicialização cancelada!');
        return;
    }
}

function iniciarUrna() {
    localStorage.setItem('votosBolsonaro', votos_bolsonaro);
    localStorage.setItem('votosLula', votos_lula);
    localStorage.setItem('votosBrancos', votos_brancos);
    localStorage.setItem('votosNulos', votos_nulos);
    localStorage.setItem('contadorVotos', votos);   
    localStorage.setItem('quantidadeEleitores', quantidade_eleitores);  
}

function branco() {
    document.getElementById('tela').innerHTML = "VOTO EM BRANCO";
}

function corrige() {
    document.getElementById('tela').innerHTML = "";
}
        
function inserir(num) {
    let numero = document.getElementById('tela').innerHTML;
    document.getElementById('tela').innerHTML = numero + num;
}

function confirmar() {
    if (fim_eleicao) {
        alert('Eleição já finalizada!');
        return;
    }
    if (!quantidade_eleitores) {
        alert('Configure a urna para indicar quantos eleitores participarão da eleição!');
        return;
    }

    let voto = document.getElementById('tela').innerHTML;
    if (voto == "VOTO EM BRANCO" & votos <= quantidade_eleitores) {
        votos_brancos += 1;
        votos += 1;
        localStorage.setItem('votosBrancos', votos_brancos);
        localStorage.setItem('contadorVotos', votos);
        alert("VOTO EM BRANCO");
        document.getElementById('tela').innerHTML = "";
    } else if (voto == "22" & votos <= quantidade_eleitores) {
        votos_bolsonaro += 1;
        votos += 1;
        localStorage.setItem('votosBolsonaro', votos_bolsonaro);
        localStorage.setItem('contadorVotos', votos);
        alert("VOCÊ VOTOU NO BOLSONARO");
        document.getElementById('tela').innerHTML = "";
    } else if (voto == "13" & votos <= quantidade_eleitores) {
        votos_lula += 1;
        votos += 1;
        localStorage.setItem('votosLula', votos_lula);
        localStorage.setItem('contadorVotos', votos);
        alert("VOCÊ VOTOU NO LULA");
        document.getElementById('tela').innerHTML = "";
    } else if (!voto && votos <= quantidade_eleitores) {
        alert("VOTO NÃO COMPUTADO! INSIRA ALGUM NÚMERO NA TELA!");
        document.getElementById('tela').innerHTML = "";
    } else if (votos <= quantidade_eleitores) {
        votos_nulos += 1;
        votos += 1;
        localStorage.setItem('votosNulos', votos_nulos);
        localStorage.setItem('contadorVotos', votos);
        alert("VOTO NULO");
        document.getElementById('tela').innerHTML = "";
    }

    if (votos == quantidade_eleitores) {
        fim_eleicao = true;
        alert('Fim da eleição!');
        return;
    }


}

iniciarUrna();