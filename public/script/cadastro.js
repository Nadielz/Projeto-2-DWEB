import { db } from './firebase-config.js';
import { ref, set, push, child } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js';

let varNome = document.getElementById("nome");
let varCPF = document.getElementById("cpf");
let varSexo = document.getElementById("sexo");
let varCelular = document.getElementById("celular");
let varEmail = document.getElementById("email");
let varSenha = document.getElementById("senha");
let varRua = document.getElementById("rua");
let varBairro = document.getElementById("bairro");
let varCidade = document.getElementById("cidade");
let gravar = document.getElementById("btGravar");

gravar.addEventListener('click', inserirDados);

const form = document.getElementById("meuForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    inserirDados();
});

function inserirDados() {
    const nome = varNome.value;
    const cpf = varCPF.value;
    const sexo = varSexo.value;
    const celular = varCelular.value;
    const email = varEmail.value;
    const senha = varSenha.value;
    const rua = varRua.value;
    const bairro = varBairro.value;
    const cidade = varCidade.value;

    const novaChave = push(child(ref(db), 'Usuarios')).key;

    set(ref(db, "Usuarios/" + novaChave), {
        nome: nome, 
        CPF: cpf,
        sexo: sexo,
        Celular: celular,
        Email: email,
        Senha: senha,
        Rua: rua,
        Bairro: bairro,
        Cidade: cidade
    }).then(() => {
        console.log("Cadastrado");
        limparFormulario();
    }).catch((error) => {
        console.log("Erro de cadastro:", error);
    });
}

function limparFormulario() {
    varNome.value = '';
    varCPF.value = '';
    varSexo.value = '';
    varCelular.value = '';
    varEmail.value = '';
    varSenha.value = '';
    varRua.value = '';
    varBairro.value = '';
    varCidade.value = '';
}
