import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import { auth } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const auth = getAuth();
    const adminEmail = "administrador@adm.com";
    const adminBtn = document.getElementById('admin-btn');
    const sairBtn = document.getElementById('sair-btn');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.email === adminEmail) {
                adminBtn.style.display = 'block';
            } else {
                adminBtn.style.display = 'none';
            }
        } else {
            window.location.href = 'login.html';    }
    });

    sairBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            alert('Você foi deslogado com sucesso.');
            window.location.href = 'login.html'; 
        }).catch((error) => {
            console.error('Erro ao deslogar:', error);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {

    const adminButton = document.getElementById('admin-btn');
    
    if (adminButton) {
        adminButton.addEventListener('click', function() {
            window.location.href = 'adm.html';
        });
    }
});
