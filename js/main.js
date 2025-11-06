/**
 * main.js
 * * Módulo de Validação de Formulário e Lógica Principal da Aplicação.
 * Atende ao requisito de "Verificação de consistência de dados em formulários".
 */

// 1. Módulo de Validação
// Exporta a função ValidationModule para ser acessada no escopo global
export function ValidationModule() {

    /**
     * Exibe uma mensagem de erro abaixo do campo e destaca o grupo como inválido.
     * @param {HTMLElement} input - O elemento de input.
     * @param {string} message - A mensagem de erro a ser exibida.
     */
    function displayError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorMessageElement = formGroup.querySelector('.error-message');

        formGroup.classList.add('invalid');
        errorMessageElement.textContent = message;
        errorMessageElement.style.display = 'block';
    }

    /**
     * Limpa a mensagem de erro e remove o estado de inválido.
     * @param {HTMLElement} input - O elemento de input.
     */
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('invalid');
            const errorMessageElement = formGroup.querySelector('.error-message');
            if (errorMessageElement) {
                errorMessageElement.textContent = '';
                errorMessageElement.style.display = 'none';
            }
        }
    }

    /**
     * Verifica a validade de um campo específico com base em suas regras HTML e customizadas.
     * @param {HTMLElement} input - O elemento de input a ser validado.
     * @returns {boolean} - true se for válido, false caso contrário.
     */
    function validateInput(input) {
        clearError(input); // Limpa erros anteriores

        // 1. Validação Padrão do Navegador (required, pattern, type)
        if (!input.checkValidity()) {
            // Se o campo for requerido e estiver vazio
            if (input.validity.valueMissing) {
                displayError(input, 'Este campo é obrigatório.');
            } 
            // Se for email e estiver no formato errado
            else if (input.validity.typeMismatch && input.type === 'email') {
                displayError(input, 'Por favor, insira um e-mail válido.');
            }
            // Se falhar em outras regras HTML (como pattern)
            else if (input.dataset.error) {
                displayError(input, input.dataset.error);
            } 
            else {
                // Mensagem genérica para outros erros de validade nativa
                displayError(input, 'Preenchimento incorreto.');
            }
            return false;
        }

        // 2. Validação Personalizada (Ex: Nome deve ter mais de 2 caracteres)
        if (input.id === 'nome' && input.value.length < 3) {
            displayError(input, 'O nome deve ter pelo menos 3 caracteres.');
            return false;
        }
        
        // 3. Validação do Select (Obrigatório, se não for o valor inicial 'Selecione uma área')
        if (input.id === 'interesse' && input.value === '') {
            displayError(input, 'Por favor, selecione uma área de interesse.');
            return false;
        }

        return true; // Passou em todas as validações
    }

    /**
     * Configura a validação para o formulário de voluntariado.
     */
    function setupFormValidation() {
        const form = document.getElementById('volunteerForm');

        if (!form) return; // Sai da função se o formulário não existir na página

        const inputsToValidate = form.querySelectorAll('.validate-input');

        // Adiciona validação em tempo real para cada input
        inputsToValidate.forEach(input => {
            // Valida e exibe erro APENAS quando o usuário sair do campo (evento blur)
            input.addEventListener('blur', () => {
                validateInput(input);
            });

            // Limpa o erro ao digitar novamente
            input.addEventListener('input', () => {
                if (input.checkValidity() && input.value.length >= 3) {
                    clearError(input);
                }
            });
        });

        // Adiciona o evento de submissão para a validação final
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão

            let isValidForm = true;

            // Percorre todos os campos e verifica a validade
            inputsToValidate.forEach(input => {
                // Se a validação falhar para qualquer campo, marca o formulário como inválido
                if (!validateInput(input)) {
                    isValidForm = false;
                }
            });

            const successMessage = document.getElementById('submitSuccess');
            const firstInvalid = form.querySelector('.form-group.invalid');

            if (isValidForm) {
                // 1. Formulário Válido: Exibe Sucesso
                console.log('Formulário Válido! Dados:', new FormData(form));

                // Manipulação do DOM (Feedback de Sucesso)
                successMessage.style.display = 'block';
                form.reset(); // Limpa o formulário

                // 2. Esconde a mensagem após 5 segundos
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);

            } else {
                // Formulário Inválido: Rola a tela para o primeiro erro
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Foca no input dentro do primeiro grupo inválido
                    const inputToFocus = firstInvalid.querySelector('input, select, textarea');
                    if (inputToFocus) {
                        inputToFocus.focus();
                    }
                }
            }
        });
    }

    // Retorna a função de setup para o router.js usá-la.
    return {
        setupFormValidation
    };
}

// Expõe o Módulo no escopo global para ser acessado pelo router.js e outras partes
window.ValidationModule = ValidationModule();

// --- No final de main.js (ou em um novo arquivo app.js) ---

import { toggleMenu } from './script.js';

// Expõe a função do menu no escopo global para ser chamada pelo HTML (onclick)
window.toggleMenu = toggleMenu; 

// * O código da ValidationModule e Roteamento já deve estar antes/depois disso
// * Garanta que o window.ValidationModule = ValidationModule(); esteja no seu main.js