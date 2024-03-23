let textarea = document.getElementById('textarea');
let buttonCriptografar = document.getElementById('buttonCriptografar');
let buttonDescriptografar = document.getElementById('buttonDescriptografar');
let rightContainer = document.getElementById('rightContainer');

//elementos que serão removidos
let sectionImagemSemTexto = document.getElementById('imagemSemTexto');
let sectionMensagemTextoNaoEncontrado = document.getElementById('mensagemTextoNaoEncontrado');

//elementos que serão criados
//seção do texto criptografado ou descriptografado
let secaoTextoResultado = document.createElement('section');
secaoTextoResultado.id = ('secaoTextoResultado');

let textareaTextoResultado = document.createElement('textarea');
textareaTextoResultado.id = 'textareaTextoResultado';
textareaTextoResultado.name = 'textoResultado';

//seção do button copiar
let secaoButtonCopiarTexto = document.createElement('section');
secaoButtonCopiarTexto.id = ('secaoButtonCopiarTexto');

let buttonCopiarTexto = document.createElement('button');
buttonCopiarTexto.id = 'buttonCopiarTexto';
buttonCopiarTexto.value = 'buttonCopiarTexto';
buttonCopiarTexto.title = 'clique para copiar o texto';
buttonCopiarTexto.innerHTML = 'Copiar';

//redimensiona a altura do textarea.
function textAreaMaior() {
    textarea.addEventListener('input', function () {
        this.style.height = '288px';
        textarea.setAttribute('placeholder', 'Digite seu texto');
    });
}
textAreaMaior();

// Função para verificar se o texto contém letras maiúsculas ou acentuadas
function contemLetrasMaiusculasAcentuadas(texto) {
    const letrasAcentuadas = /[áàãâäéèêëíìîïóòõôöúùûü]/i; // Letras acentuadas
    const letrasMaiusculas = /[A-Z]/; // Letras maiúsculas
    return letrasAcentuadas.test(texto) || letrasMaiusculas.test(texto);
}

// Usando replace para substituir caracteres de acordo com as regras estabelecidas
let criptografarTexto = () => {
    let textoDigitado = textarea.value;

    textoDigitado = textoDigitado.replace(/e/g, 'enter');
    textoDigitado = textoDigitado.replace(/i/g, 'imes');
    textoDigitado = textoDigitado.replace(/a/g, 'ai');
    textoDigitado = textoDigitado.replace(/o/g, 'ober');
    textoDigitado = textoDigitado.replace(/u/g, 'ufat');
    return textoDigitado;
}

let descriptografarTexto = () => {
    let textoDigitado = textarea.value;

    textoDigitado = textoDigitado.replace(/enter/g, 'e');
    textoDigitado = textoDigitado.replace(/imes/g, 'i');
    textoDigitado = textoDigitado.replace(/ai/g, 'a');
    textoDigitado = textoDigitado.replace(/ober/g, 'o');
    textoDigitado = textoDigitado.replace(/ufat/g, 'u');
    return textoDigitado;
}

//Remove elementos da página.
let remover = true;
const removeElementos = (condicao, elemento1, elemento2) => {
    if (condicao) {
        elemento1.remove();
        elemento2.remove();
    }
    else {
        rightContainer.appendChild(elemento1);
        rightContainer.appendChild(elemento2);
    }
}

//adiciona elementos a página
const adicionaElementos = (elemento, conteudo, divAppendChild) => {
    elemento.appendChild(conteudo);
    divAppendChild.appendChild(elemento);
}

buttonCriptografar.addEventListener('click', () => {
    // Verifica se o texto contém letras maiúsculas ou acentuadas e mostra no placeholder
    if (contemLetrasMaiusculasAcentuadas(textarea.value)) {
        textarea.value = '';
        textarea.setAttribute('placeholder', 'Apenas letras minúsculas e sem acento.');
        textAreaMaior();
    }
    else if (textarea.value === '') {
        textarea.value = '';
        secaoTextoResultado.remove();
        secaoButtonCopiarTexto.remove();
        remover = false;
        removeElementos(remover, sectionImagemSemTexto, sectionMensagemTextoNaoEncontrado);
        textAreaMaior();
    }
    else {
        remover = true;
        removeElementos(remover, sectionImagemSemTexto, sectionMensagemTextoNaoEncontrado);
        textareaTextoResultado.innerHTML = criptografarTexto();
        adicionaElementos(secaoTextoResultado, textareaTextoResultado, rightContainer);
        adicionaElementos(secaoButtonCopiarTexto, buttonCopiarTexto, rightContainer);
    }

});

buttonDescriptografar.addEventListener('click', () => {
    if (contemLetrasMaiusculasAcentuadas(textarea.value)) {
        textarea.value = '';
        textarea.setAttribute('placeholder', 'Apenas letras minúsculas e sem acento.');
        textAreaMaior();
    }
    else if (textarea.value === '') {
        textarea.value = '';
        secaoTextoResultado.remove();
        secaoButtonCopiarTexto.remove();
        remover = false;
        removeElementos(remover, sectionImagemSemTexto, sectionMensagemTextoNaoEncontrado);
        textAreaMaior();
    }
    else {
        remover = true;
        removeElementos(remover, sectionImagemSemTexto, sectionMensagemTextoNaoEncontrado);
        textareaTextoResultado.innerHTML = descriptografarTexto();
        adicionaElementos(secaoTextoResultado, textareaTextoResultado, rightContainer);
        adicionaElementos(secaoButtonCopiarTexto, buttonCopiarTexto, rightContainer);
    }
});

//copiando o texto cripto ou descriptografado
buttonCopiarTexto.addEventListener('click', () => {
    let textoCopiado = textareaTextoResultado.value;
    navigator.clipboard.writeText(textoCopiado).then(() => {
        alert('Texto copiado');
    });    
});