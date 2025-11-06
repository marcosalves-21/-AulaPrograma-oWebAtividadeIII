/**
 * script.js
 * * Funções auxiliares, como o Menu Responsivo.
 */

// 1. Menu Responsivo
export function toggleMenu() {
    const menu = document.getElementById('navMenu');
    // Adiciona ou remove a classe 'show' (definida no CSS)
    menu.classList.toggle('show'); 
}

// 2. Máscaras de Input (Se necessário, você pode adicionar aqui)
// (Mantive este bloco apenas como placeholder, pois as máscaras não são obrigatórias,
// mas você pode ter adicionado antes.)

/*
document.addEventListener('DOMContentLoaded', () => {
    // Se você tiver inputs de CPF, Telefone, CEP...
    // const cpf = document.getElementById("cpf");
    // ...
});
*/