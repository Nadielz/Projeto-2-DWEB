import { auth } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        const loginLink = document.querySelector('a[href="login.html"]');

        if (user) {
            // Redireciona imediatamente se o usuário estiver autenticado
            if (window.location.pathname.endsWith('login.html')) {
                window.location.href = "../src/usuario.html";
            }
        } else {
            // Adiciona o evento de clique somente se o usuário não estiver autenticado
            if (loginLink) {
                loginLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = "../src/login.html";
                });
            } else {
                console.error('O link de login não foi encontrado.');
            }
        }
    });
});
