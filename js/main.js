/**
 * /js/main.js
 * Módulo de Validação de Formulário.
 * Atende ao requisito de "verificação de consistência de dados em formulários".
 */

// ----------------------------------------------------
// Módulo de Validação
// ----------------------------------------------------
const ValidationModule = (() => {
    /**
     * Exibe uma mensagem de erro abaixo do campo.
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
        const errorMessageElement = formGroup.querySelector('.error-message');

        formGroup.classList.remove('invalid');
        errorMessageElement.textContent = '';
        errorMessageElement.style.display = 'none';
    }

    /**
     * Valida um campo específico com base em suas regras HTML e data-attributes.
     * @param {HTMLElement} input - O elemento de input a ser validado.
     * @returns {boolean} - true se for válido, false caso contrário.
     */
    function validateInput(input) {
        clearError(input); // Limpa erros anteriores
        
        // 1. Validação Padrão do Navegador (required, pattern, type)
        if (!input.checkValidity()) {
            const errorMessage = input.dataset.error || 'Preenchimento incorreto ou campo obrigatório.';
            displayError(input, errorMessage);
            return false;
        }

        // 2. Validação Personalizada (ex: Nome deve ter mais de 2 caracteres)
        if (input.id === 'nome' && input.value.length < 3) {
             const errorMessage = input.dataset.error || 'O nome deve ter pelo menos 3 caracteres.';
             displayError(input, errorMessage);
             return false;
        }
        
        return true;
    }
    
    /**
     * Configura a validação para o formulário de voluntariado.
     */
    function setupFormValidation() {
        const form = document.getElementById('volunteerForm');
        if (!form) return;
        
        const inputsToValidate = form.querySelectorAll('.validate-input');

        // Adiciona validação em tempo real para cada input
        inputsToValidate.forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => {
                // Limpa o erro ao digitar, mas só valida completamente no blur/submit
                if (input.checkValidity()) {
                    clearError(input);
                }
            });
        });

        // Adiciona o evento de submissão para a validação final
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão

            let isFormValid = true;

            // Percorre todos os campos e verifica a validade
            inputsToValidate.forEach(input => {
                if (!validateInput(input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Simula o envio de dados
                console.log("Formulário Válido! Dados:", new FormData(form));

                // 3. Manipulação do DOM (Feedback de Sucesso)
                const successMessage = document.getElementById('submitSuccess');
                successMessage.style.display = 'block';
                form.reset(); // Limpa o formulário
                
                // Esconde a mensagem após 5 segundos
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                // Se inválido, rola para o primeiro erro para o usuário corrigir
                const firstInvalid = form.querySelector('.form-group.invalid input, .form-group.invalid select');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalid.focus();
                }
            }
        });
    }

    return {
        setupFormValidation // Exporta a função principal para ser usada no router
    };
})();

// Expõe o módulo no escopo global para ser acessado pelo router.js após a injeção do template
window.ValidationModule = ValidationModule;