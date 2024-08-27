import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login'); 
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('senha');

  if (loginButton && emailInput && passwordInput) {
    loginButton.addEventListener('click', function (event) {
      event.preventDefault(); 

      signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then((userCredential) => {
          
          const user = userCredential.user;
          alert('Login bem-sucedido! Bem-vindo, ' + user.email);
          
          window.location.href = '../index.html';
        })
        .catch((error) => {
          console.error(error.code);
          console.error(error.message);
          alert('Falha ao autenticar, verifique o erro no console.');
        });
    });
  } else {
    console.error('Um ou mais elementos não foram encontrados no DOM');
  }
});
