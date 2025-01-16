const form = document.querySelector('form');
const messageSent = document.querySelector('.messageSent');

//funcao para limpar erros
const clearError = (inputElement) => {
    inputElement.classList.remove('error');
    const errorMessage = inputElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.classList.remove('error'); // Remove o erro da mensagem
    }
};

const showMessageError = (inputElement) => {
    inputElement.classList.add('error');
    const errorContainer = document.querySelector('.error-message');
    if(errorContainer) {
        errorContainer.classList.add('error')
    }
};

//Função de validação de campos de texto
const validateInputs = () => {
    let isValid = true
    const inputs = document.querySelectorAll('.input-group .input')
    inputs.forEach((input) => {
        const inputGroup = input.parentElement;
        const errorContainer = inputGroup.querySelector('.error-message');
        // Se o campo não for preenchido
        if(!input.value) {
            inputGroup.classList.add('error')
            if(errorContainer){
                showMessageError(errorContainer);
                isValid = false;
            }
        } else {
            clearError(inputGroup);
        }
        return isValid;
    })
};

// Função para validar botões de rádio
const validateRadio = (radioGroupName, errorContainerId) => {
    const radioButtons = document.querySelectorAll(`input[name="${radioGroupName}"]`);
    const errorContainer = document.querySelector(`#${errorContainerId}`);
    const hasChecked = Array.from(radioButtons).some(radio => radio.checked)
    if(!hasChecked) {
        showMessageError(errorContainer)
        return false;
    } else {
        clearError(errorContainer);
        return true;
    }
};

// Função para validar checkbox de termos
const validateTerms = () => {
    const inputConsent = document.querySelector('#consent');
    const consentError = document.querySelector('#consentError');
    // Se o consentimento não estiver marcado
    if (!inputConsent.checked) {
        consentError.classList.add('error');
        return false;
    } else {
        clearError(consentError);
        return true;
    }
};

//Adiciona evento ao campos input
const inputs = document.querySelectorAll('.input-group .input');
inputs.forEach((input) => {
    input.addEventListener('input', () => {
        const inputGroup = input.parentElement;
        if(input.value){
            clearError(inputGroup);
        }
    })
});

// Adiciona evento ao radio para validação em tempo real
const radioButtons = document.querySelectorAll(`input[name="queryType"]`);
radioButtons.forEach((radio) => {
    radio.addEventListener('change', () => validateRadio('queryType', 'queryTypeError'))
});

// Adiciona evento ao checkbox para validação em tempo real
const consentCheckbox = document.querySelector('#consent');
consentCheckbox.addEventListener('change', () => {
    if(consentCheckbox.checked) {
        validateTerms();
    }
});
// Exibe mensagem de sucesso
const showMessageSent = () => {
    messageSent.classList.add('show');
    setTimeout(() => {
        messageSent.classList.remove('show')
    }, 3000)
};
// Evento de envio do formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();
   
    const inputsValid = validateInputs();
    const radioValid = validateRadio('queryType', 'queryTypeError');
    const termsValid = validateTerms();

    if (!inputsValid && radioValid && termsValid) {
        showMessageSent();
        form.reset(); // Reseta o formulário após sucesso
    }
    
});
