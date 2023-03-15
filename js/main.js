const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")

//consultando se existe elementos no localstorage, caso sim, convertendo as strings para JS.
const itens = JSON.parse(localStorage.getItem('itens')) || []

//Será criado um elemento para cada objeto do array, que forem encontrados no localstorage.
itens.forEach((elemento) =>{
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome'];
    const quantidade =  evento.target.elements['quantidade'];
    
    const existe = itens.find( elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe){
        itemAtual.id = existe.id

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

        } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

    //passando o objeto itemAtual para a função criaElemento.
    criaElemento(itemAtual)

    //inserindo no array novos elementos que forem criados.
    itens.push(itemAtual)
    }

    //inserindo no localStorage uma chave "itens" e convertendo para string os objetos presentes no array.
    localStorage.setItem("itens", JSON.stringify(itens))

    //limpando os input após o evento de submit.
    nome.value = ""
    quantidade.value = ""

})



function criaElemento(objeto) {
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = objeto.quantidade
    numeroItem.dataset.id = objeto.id

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += objeto.nome

    novoItem.appendChild(botaoDeleta(objeto.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

//Função para criar botão com evento de click nos itens, e retornar os itens clicados
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

//Função para deletar os itens enviados da função botaoDeleta no array de itens e no navegador

function deletaElemento(tag, id) { 
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}