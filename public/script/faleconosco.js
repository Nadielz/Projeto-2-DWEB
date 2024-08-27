import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js';

const db = getDatabase();

document.querySelector('.form-fale').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
    const mensagem = document.querySelector('textarea[name="message"]').value;

    const id = Date.now().toString();

    set(ref(db, 'contatos/' + id), {
        nome: nome,
        email: email,
        celular: celular,
        mensagem: mensagem
    }).then(() => {
        alert('Mensagem enviada com sucesso!');
        document.querySelector('.form-fale').reset(); 
    }).catch((error) => {
        console.error('Erro ao enviar mensagem: ', error);
    });
});
