const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const instructions = document.getElementById('instructions');
const instructionText = document.getElementById('instruction-text');
const textInput = document.getElementById('text-input');
const executeBtn = document.getElementById('execute-btn');

let currentMode = '';

encryptBtn.addEventListener('click', () => {
    currentMode = 'encrypt';
    instructionText.textContent = 'Ingresa el texto que deseas encriptar:';
    instructions.classList.remove('hidden');
});

decryptBtn.addEventListener('click', () => {
    currentMode = 'decrypt';
    instructionText.textContent = 'Ingresa el texto que deseas desencriptar:';
    instructions.classList.remove('hidden');
});

executeBtn.addEventListener('click', () => {
    const text = textInput.value.trim();

    if (!text || /\d/.test(text)) {
        alert('Por favor ingresa un texto válido que no contenga números.');
        return;
    }

    if (currentMode === 'encrypt') {
        if (isEncrypted(text)) {
            alert('La palabra ya está encriptada.');
        } else {
            const encryptedText = encrypt(text);
            alert(`Texto encriptado con éxito: ${encryptedText}`);
        }
    } else if (currentMode === 'decrypt') {
        if (!isEncrypted(text)) {
            alert('La palabra no se encuentra encriptada.');
        } else {
            const decryptedText = decrypt(text);
            alert(`Texto desencriptado con éxito: ${decryptedText}`);
        }
    }
});

function encrypt(text) {
    const encrypted = text.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 1)).join('');
    return `ENC:${encrypted}`;
}

function decrypt(text) {
    const toDecrypt = text.slice(4); // Remove the "ENC:" prefix
    return toDecrypt.split('').map(char => String.fromCharCode(char.charCodeAt(0) - 1)).join('');
}

function isEncrypted(text) {
    return text.startsWith('ENC:');
}
