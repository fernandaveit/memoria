var imagensDificil = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9]; //2 vezes cada imagem = 18 imagens
var imagensFacil = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]; 
//O id da div é a posição no array
var posicoesViradas = [];
var paresEncontrados = [];
var posicoesEncontradas = [];
var idImg = [];
var tentativas = 0;

const cartasDificeis = document.querySelectorAll('.dificil');

//Seletor níver fácil ou difícil
const select = document.getElementById("select");
var index = select.selectedIndex;

function reiniciar() {
    location.reload();
}

select.addEventListener("change", () => { 
    index = select.selectedIndex;
    if(index == 0){
        reiniciar();
    } else {
        defineArray(index);
        mostraMaisCartas();
        //exibe todos os versos
    }
})

// Função para embaralhar as posições
function shuffleArray(cartas) {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
    return cartas;
}

function defineArray(index){
    if(index == 0){
        idImg = (shuffleArray(imagensFacil));
    } else {
        idImg = (shuffleArray(imagensDificil));
    }
}
defineArray(index);

function virar(id) {

    let div = document.getElementById(id);
    let imagem = `<img class="mx-auto" src="./img/${idImg[id]}.png">`
    const verso = `<img class="mx-auto" src="./img/verso.png">`
    let validaPar = true;

    //se o clique não for em um par já aberto
    //for para percorrer e if na posicoes encontradas

    if (posicoesEncontradas.length > 0) {
        for (let j = 0; j < posicoesEncontradas.length; j++) {
            if (id === posicoesEncontradas[j]) {
                //Não faz nada, pq já achou esse par
                validaPar = false;
            }
        }
    }

    if (validaPar) {
        if (posicoesViradas.length == 0) {
            div.innerHTML = imagem
            posicoesViradas.push(id)

        } else if (posicoesViradas.length == 1) {
            if (id === posicoesViradas[0]) {//se o clique for na div que já está virada, apresentar o verso:               
                div.innerHTML = verso
                posicoesViradas = posicoesViradas.filter(numero => numero != id)
            } else { //se o clique for no verso, exibe a carta
                div.innerHTML = imagem
                posicoesViradas.push(id)
                tentativas++
                //e valida se formou par
                let cartaUm = idImg[posicoesViradas[0]] //4
                let cartaDois = idImg[posicoesViradas[1]]//6
                if (cartaUm === cartaDois) {
                    paresEncontrados.push(cartaUm)
                    posicoesEncontradas.push(posicoesViradas[0])
                    posicoesEncontradas.push(posicoesViradas[1])
                    //remover os dados do array e não deixar mais clicar nessas divs
                    if (posicoesEncontradas.length === idImg.length) { //Encontrou todos os pares
                        exibeModal();
                    }
                    while (posicoesViradas.length) {
                        posicoesViradas.pop();
                    }
                } //evolução: else > desvira a carta em dois segundos
            }
        } else {
            for (let i = 0; i < posicoesViradas.length; i++) {
                if (id === posicoesViradas[i]) {//se o clique for na div que já está virada, apresentar o verso:
                    div.innerHTML = verso
                    posicoesViradas = posicoesViradas.filter(numero => numero != id)
                } else {
                    //console.log("Ja tem duas cartas viradas")
                }
            }
        }
    }
}

function mostraMaisCartas(){
    cartasDificeis.forEach((element) => { 
        element.style.display = 'flex';
    });
}

//Controlar exibição do modal de jogar novamente
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
function exibeModal() {
    overlay.style.display = 'block';
    modal.style.display = 'block';
}

