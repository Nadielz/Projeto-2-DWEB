import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js';
import { getStorage, ref as storageRef, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js';
import { db, storage } from './firebase-config.js';

let produtos = [];


function criarCardProduto(produto) {
    const card = document.createElement('div');
    card.className = 'produto-card';
    card.id = produto.categoria; 

    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem">
        <h2 class="produto-nome">${produto.nome}</h2>
        <p class="produto-preco">R$ ${produto.preco}</p>
        <button class="comprar-btn" data-nome="${produto.nome}" data-preco="${produto.preco}" data-imagem="${produto.imagem}">Adicionar ao Carrinho</button>
    `;

    document.getElementById('galeria-produtos').appendChild(card);
}


function carregarProdutos() {
    const produtosRef = ref(db, 'produtos');

    onValue(produtosRef, (snapshot) => {
        const dados = snapshot.val();
        produtos = []; 

        document.getElementById('galeria-produtos').innerHTML = ''; 

        const promises = Object.keys(dados).map(async (chave) => {
            const produto = dados[chave];
            const imagemPath = produto.imagem;
            
            
            const url = produto.imagem;
            produto.imagem = url;

            produtos.push(produto);
            criarCardProduto(produto);
        });

        Promise.all(promises).then(() => {
            console.log('Todos os produtos carregados e cards criados.');
        }).catch((error) => {
            console.error('Erro ao carregar produtos:', error);
        });
    });
}


function filtrarProdutos(categoria) {
    const cards = document.querySelectorAll('.produto-card');
    cards.forEach((card) => {
        if (categoria === 'todos' || card.id == categoria) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function ordenarPorNome() {
    produtos.sort((a, b) => a.nome.localeCompare(b.nome));
    renderizarProdutosOrdenados();
}

function ordenarPorPrecoCrescente() {
    produtos.sort((a, b) => a.preco - b.preco);
    renderizarProdutosOrdenados();
}

function renderizarProdutosOrdenados() {
    document.getElementById('galeria-produtos').innerHTML = ''; 
    produtos.forEach(produto => {
        criarCardProduto(produto);
    });
}

function adicionarAoCarrinho(produto) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`Produto ${produto.nome} adicionado ao carrinho!`);
}

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();

    document.getElementById('filtro-categorias').addEventListener('click', (event) => {
        const categoria = event.target.getAttribute('data-categoria');
        if (categoria) {
            filtrarProdutos(categoria);
        }
    });

    document.getElementById('ordenar-alfabetico').addEventListener('click', () => {
        ordenarPorNome();
    });

    document.getElementById('ordenar-preco-crescente').addEventListener('click', () => {
        ordenarPorPrecoCrescente();
    });
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('comprar-btn')) {
        const nomeProduto = event.target.getAttribute('data-nome');
        const precoProduto = parseFloat(event.target.getAttribute('data-preco'));
        const imagemProduto = event.target.getAttribute('data-imagem');

        const produto = {
            nome: nomeProduto,
            preco: precoProduto,
            imagem: imagemProduto
        };

        adicionarAoCarrinho(produto);
    }
});
