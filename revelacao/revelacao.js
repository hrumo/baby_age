
const SUPABASE_URL = "https://amborvbsyzhalpgxfdac.supabase.co";

const SUPABASE_KEY = "sb_publishable_VqccUBZAGdVco1H8ouB-Fg_YypNRDSS";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  }
);

// =====================================================
// VALIDAÇÕES E FORMATAÇÃO DO FORMULÁRIO
// =====================================================

const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const whatsappInput = document.getElementById('whatsapp');


// =====================================================
// NOME — CAPITALIZAÇÃO
// =====================================================

const palavrasMinusculas = [
    'da', 'de', 'do', 'das', 'dos', 'e'
];

function titularizarNome(nome) {

    return nome
        .toLocaleLowerCase('pt-BR')
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map((palavra, index) => {

            if (
                index > 0 &&
                palavrasMinusculas.includes(palavra)
            ) {
                return palavra;
            }

            return palavra.charAt(0).toLocaleUpperCase('pt-BR') +
                   palavra.slice(1);
        })
        .join(' ');
}

nomeInput.addEventListener('blur', () => {
    nomeInput.value = titularizarNome(nomeInput.value);
});


// =====================================================
// E-MAIL — VALIDAÇÃO
// =====================================================

function validarEmail(email) {

    const valor = email.trim();

    // Validação básica de estrutura
    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    return regex.test(valor);
}

emailInput.addEventListener('input', () => {

    const valor = emailInput.value.trim();

    // Ainda está digitando
    if (!valor) {
        emailInput.setCustomValidity('');
        return;
    }

    if (!validarEmail(valor)) {

        emailInput.setCustomValidity(
            'Digite um e-mail válido.'
        );

    } else {

        emailInput.setCustomValidity('');
    }
});


// =====================================================
// WHATSAPP — MÁSCARA + VALIDAÇÃO SÍNCRONA
// =====================================================

function formatarWhatsApp(valor) {

    let numeros = valor.replace(/\D/g, '');

    // Limita ao padrão brasileiro
    numeros = numeros.slice(0, 11);

    if (numeros.length <= 2) {
        return numeros;
    }

    if (numeros.length <= 7) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    if (numeros.length <= 10) {
        return `(${numeros.slice(0, 2)}) ` +
               `${numeros.slice(2, 6)}-` +
               `${numeros.slice(6)}`;
    }

    return `(${numeros.slice(0, 2)}) ` +
           `${numeros.slice(2, 7)}-` +
           `${numeros.slice(7)}`;
}


function validarWhatsApp(valor) {

    const numeros = valor.replace(/\D/g, '');

    // Celular brasileiro:
    // DDD + 9 + oito dígitos
    if (numeros.length !== 11) {
        return false;
    }

    // O primeiro dígito após o DDD deve ser 9
    if (numeros.charAt(2) !== '9') {
        return false;
    }

    // Evita números compostos por um único dígito repetido
    if (/^(\d)\1+$/.test(numeros)) {
        return false;
    }

    return true;
}


whatsappInput.addEventListener('input', () => {

    whatsappInput.value =
        formatarWhatsApp(whatsappInput.value);

    const numeros =
        whatsappInput.value.replace(/\D/g, '');

    // Ainda incompleto
    if (!numeros.length) {

        whatsappInput.setCustomValidity('');

        return;
    }

    if (validarWhatsApp(whatsappInput.value)) {

        whatsappInput.setCustomValidity('');

    } else {

        whatsappInput.setCustomValidity(
            'Digite um WhatsApp válido com DDD.'
        );
    }
});

document.addEventListener('DOMContentLoaded', () => {

    const bubbleContainer = document.querySelector('.hero-bubbles');

    if (!bubbleContainer) return;


    // =====================================================
    // CONFIGURAÇÕES
    // =====================================================

    const config = {
        images: [
            '../images/boy.webp',
            '../images/girl.webp'
        ],

        // Intervalo entre novas bolhas
        spawnMin: 700,
        spawnMax: 1500,

        // Quantidade máxima simultânea
        maxBubbles: 7
    };


    // =====================================================
    // UTILITÁRIOS
    // =====================================================

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }


    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }


    // =====================================================
    // CRIA UMA BOLHA
    // =====================================================

    function createBubble() {

        if (bubbleContainer.children.length >= config.maxBubbles) {
            return;
        }


        const bubble = document.createElement('div');

        bubble.className = 'hero-bubble';


        // -------------------------------------------------
        // IMAGEM
        // -------------------------------------------------

        const image = document.createElement('img');

        image.src = randomItem(config.images);

        image.alt = '';

        image.draggable = false;


        // -------------------------------------------------
        // TAMANHO
        // -------------------------------------------------

        const size = random(42, 72);


        // -------------------------------------------------
        // POSIÇÃO
        // -------------------------------------------------

        /*
         * As bolhas ficam predominantemente
         * no lado esquerdo do hero.
         *
         * 0% = extrema esquerda
         * 45% = aproximadamente metade da tela
         */

        const left = random(50, 93)


        // -------------------------------------------------
        // VELOCIDADE
        // -------------------------------------------------

        const duration = random(8, 14);


        // -------------------------------------------------
        // MOVIMENTO LATERAL
        // -------------------------------------------------

        const drift = random(-80, 80);

        const wobble = random(8, 24);


        // -------------------------------------------------
        // ROTAÇÃO
        // -------------------------------------------------

        const rotationStart = random(-12, 12);

        const rotationEnd = random(-25, 25);


        // -------------------------------------------------
        // DELAY
        // -------------------------------------------------

        const wobbleDuration = random(2.5, 4.5);


        // -------------------------------------------------
        // CSS VARIABLES
        // -------------------------------------------------

        bubble.style.setProperty(
            '--bubble-size',
            `${size}px`
        );

        bubble.style.setProperty(
            '--bubble-duration',
            `${duration}s`
        );

        bubble.style.setProperty(
            '--bubble-wobble-duration',
            `${wobbleDuration}s`
        );

        bubble.style.setProperty(
            '--bubble-drift',
            `${drift}px`
        );

        bubble.style.setProperty(
            '--bubble-wobble',
            `${wobble}px`
        );

        bubble.style.setProperty(
            '--bubble-rotation-start',
            `${rotationStart}deg`
        );

        bubble.style.setProperty(
            '--bubble-rotation-end',
            `${rotationEnd}deg`
        );


        // -------------------------------------------------
        // POSIÇÃO INICIAL
        // -------------------------------------------------

        bubble.style.left = `${left}%`;


        // -------------------------------------------------
        // PEQUENO DELAY ALEATÓRIO
        // -------------------------------------------------

        bubble.style.animationDelay = `${random(0, 0.5)}s`;


        // -------------------------------------------------
        // INSERE NO DOM
        // -------------------------------------------------

        bubble.appendChild(image);

        bubbleContainer.appendChild(bubble);


        // -------------------------------------------------
        // REMOVE DEPOIS DA ANIMAÇÃO
        // -------------------------------------------------

        bubble.addEventListener('animationend', () => {
            bubble.remove();
        }, {
            once: true
        });
    }


    // =====================================================
    // LOOP DE CRIAÇÃO
    // =====================================================

    function scheduleNextBubble() {

        const delay = random(
            config.spawnMin,
            config.spawnMax
        );


        setTimeout(() => {

            createBubble();

            scheduleNextBubble();

        }, delay);
    }


    // =====================================================
    // INÍCIO
    // =====================================================

    scheduleNextBubble();

});

// =====================================================
// VALIDAÇÃO DO FORMULÁRIO — SUBMIT
// =====================================================

const rsvpForm = document.getElementById('rsvp-form');

const parentescoInput = document.getElementById('parentesco');
const acompanhantesInput = document.getElementById('acompanhantes');
const rsvpNote = document.getElementById('rsvp-note');

// =====================================================
// MENSAGEM DE ERRO
// =====================================================

function mostrarErro(campo, mensagem) {

    campo.setCustomValidity(mensagem);

    // Dispara a mensagem nativa do navegador
    campo.reportValidity();
}


// =====================================================
// LIMPA ERROS PERSONALIZADOS
// =====================================================

function limparErros() {

    nomeInput.setCustomValidity('');
    emailInput.setCustomValidity('');
    whatsappInput.setCustomValidity('');
    parentescoInput.setCustomValidity('');
    acompanhantesInput.setCustomValidity('');
}


// =====================================================
// SUBMIT
// =====================================================

rsvpForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    limparErros();

    // =================================================
    // NOME
    // =================================================
    const nome = nomeInput.value.trim();
    if (!nome) {

        mostrarErro(
            nomeInput,
            'Digite seu nome.'
        );

        return;
    }

    // =================================================
    // PARENTESCO
    // =================================================
    if (!parentescoInput.value) {

        mostrarErro(
            parentescoInput,
            'Escolha seu parentesco.'
        );

        return;
    }

    // =================================================
    // E-MAIL
    // =================================================
    const email = emailInput.value.trim();
    if (!email) {

        mostrarErro(
            emailInput,
            'Digite seu e-mail.'
        );

        return;
    }

    if (!validarEmail(email)) {

        mostrarErro(
            emailInput,
            'Digite um e-mail válido.'
        );

        return;
    }

    // =================================================
    // WHATSAPP
    // =================================================
    const whatsapp = whatsappInput.value.trim();

    if (!whatsapp) {

        mostrarErro(
            whatsappInput,
            'Digite seu WhatsApp.'
        );

        return;
    }

    if (!validarWhatsApp(whatsapp)) {

        mostrarErro(
            whatsappInput,
            'Digite um WhatsApp válido com DDD.'
        );

        return;
    }

    // =================================================
    // ACOMPANHANTES
    // =================================================
    if (!acompanhantesInput.value) {

        mostrarErro(
            acompanhantesInput,
            'Informe quantos acompanhantes irão com você.'
        );

        return;
    }

// =================================================
// TUDO OK
// =================================================

const { error } = await supabaseClient
    .from('revelacao_rsvp')
    .upsert(
        {
            nome: nome,
            parentesco: parentescoInput.value,
            email: email,
            whatsapp: whatsapp.replace(/\D/g, ''),
            acompanhantes: Number(acompanhantesInput.value)
        },
        {
            onConflict: 'nome,whatsapp'
        }
    );

if (error) {

    console.error('Erro ao salvar RSVP:', error);

    setTimeout(() => {
        rsvpNote.innerHTML = `
            <strong>Não conseguimos confirmar sua presença ❌</strong><br>
            Tente novamente em alguns instantes.
        `;

        rsvpNote.classList.add('is-error');
    }, 250);

    return;
}

// =================================================
// SUCESSO
// =================================================

rsvpNote.classList.add('is-changing');

setTimeout(() => {
    rsvpNote.innerHTML = `
        <strong>Presença confirmada! ✅</strong><br>
        Ficamos muito felizes em ter você com a gente nesse momento tão especial.
    `;

    rsvpNote.classList.remove('is-changing');
    rsvpNote.classList.add('is-success');
}, 250);

});

