import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import { getDatabase, ref, push, set } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js';

function obterCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
}

function atualizarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function adicionarAoCarrinho(produto) {
    const carrinho = obterCarrinho();
    carrinho.push(produto);
    atualizarCarrinho(carrinho);
    atualizarExibicaoCarrinho();
}

function removerDoCarrinho(index) {
    const carrinho = obterCarrinho();
    carrinho.splice(index, 1);
    atualizarCarrinho(carrinho);
    atualizarExibicaoCarrinho();
}

window.removerDoCarrinho = removerDoCarrinho;

function atualizarExibicaoCarrinho() {
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalElement = document.getElementById('total');
    const carrinho = obterCarrinho();
    
    itensCarrinho.innerHTML = '';
    let total = 0;
    
    carrinho.forEach((item, index) => {
        total += item.preco;
        itensCarrinho.innerHTML += `
            <div class="item-carrinho">
                <img src="${item.imagem}" alt="${item.nome}">
                <div>
                    <h3>${item.nome}</h3>
                    <p>Preço: R$ ${item.preco.toFixed(2)}</p>
                    <button onclick="removerDoCarrinho(${index})" class="btn">Remover</button>
                </div>
            </div>
        `;
    });
    
    totalElement.textContent = `R$ ${total.toFixed(2)}`;
}

function salvarPedidoNoDatabase(user, carrinho, total) {
    const db = getDatabase();
    const pedidosRef = ref(db, 'pedidos');
    const novoPedidoRef = push(pedidosRef);
    const pedido = {
        usuario: user.email,
        itens: carrinho,
        total: total
    };
    set(novoPedidoRef, pedido);
}

function verificarAutenticacao(callback) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}

document.getElementById('finalizar-compra').addEventListener('click', () => {
    verificarAutenticacao((user) => {
        if (user) {
            const carrinho = obterCarrinho();
            const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
            salvarPedidoNoDatabase(user, carrinho, total);
            alert('Compra finalizada! O produto será entregue em até 3 dias úteis.');
            localStorage.removeItem('carrinho');
            atualizarExibicaoCarrinho();
        } else {
            alert('Você precisa estar logado para finalizar a compra.');
        }
    });
});

atualizarExibicaoCarrinho();
