import { getDatabase, ref, set, get, remove } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js';
import { db, storage } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('add-product-form');
    const searchProductForm = document.getElementById('search-product-form');
    const productDetails = document.getElementById('product-details');

    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const categoria = document.getElementById('categoria').value;
        const preco = document.getElementById('preco').value;
        const imagemInput = document.getElementById('imagem').files[0];

        if (!imagemInput) {
            alert('Por favor, selecione uma imagem.');
            return;
        }

        const produtoId = await obterProximoId();
        const imagemPath = `produtos/${imagemInput.name}`; 
        const imagemRef = storageRef(storage, imagemPath);

        try {
            await uploadBytes(imagemRef, imagemInput);
            const url = await getDownloadURL(imagemRef);
            const produtoRef = ref(db, `produtos/produto${produtoId}`);
            
            await set(produtoRef, {
                nome,
                categoria: Number(categoria),
                preco: Number(preco),
                imagem: url 
            });

            alert(`Produto adicionado com sucesso! ID do produto: produto${produtoId}`);
            addProductForm.reset();
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            alert('Erro ao adicionar produto. Veja o console para mais detalhes.');
        }
    });

    searchProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nomeProduto = document.getElementById('search-nome').value;
        const produtoRef = ref(db, `produtos/${nomeProduto}`);

        try {
            const snapshot = await get(produtoRef);
            if (snapshot.exists()) {
                const produto = snapshot.val();
                const imagemUrl = produto.imagem; 

                productDetails.innerHTML = `
                    <div class="produto-card">
                        <img src="${imagemUrl}" alt="${produto.nome}" class="produto-imagem">
                        <h2 class="produto-nome">${produto.nome}</h2>
                        <p class="produto-preco">R$ ${produto.preco}</p>
                        <button class="enviar-fale" id="remove-btn" data-id="${nomeProduto.replace('produto', '')}">Remover Produto</button>
                    </div>
                `;
            } else {
                productDetails.innerHTML = '<p>Produto não encontrado.</p>';
            }
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            alert('Erro ao buscar produto. Veja o console para mais detalhes.');
        }
    });

    document.addEventListener('click', async (event) => {
        if (event.target.id === 'remove-btn') {
            const produtoId = event.target.getAttribute('data-id');
            const produtoRef = ref(db, `produtos/produto${produtoId}`);
            const produtoSnapshot = await get(produtoRef);

            if (!produtoSnapshot.exists()) {
                alert('Produto não encontrado.');
                return;
            }

            const imagemPath = `produtos/${produtoSnapshot.val().imagem.split('/').pop()}`;
            const imagemRef = storageRef(storage, imagemPath);

            try {
                await remove(produtoRef);
                await deleteObject(imagemRef); 

                alert('Produto removido com sucesso!');
            }finally {
                productDetails.innerHTML = '';
                alert('Produto removido com sucesso');
            }
        }
    });

    async function obterProximoId() {
        const produtosRef = ref(db, 'produtos');
        const snapshot = await get(produtosRef);

        if (!snapshot.exists()) return 1;

        const produtos = snapshot.val();
        const ids = Object.keys(produtos);
        const numeros = ids.map(id => parseInt(id.replace('produto', ''), 10));
        return Math.max(...numeros) + 1;
    }
});
