/* =========================================================
   HUB DE GESTAÇÃO — ADMIN
   AUTENTICAÇÃO + PUBLICAÇÃO
   ========================================================= */


/* =========================================================
   SUPABASE
   ========================================================= */

const SUPABASE_URL =
  "https://amborvbsyzhalpgxfdac.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_VqccUBZAGdVco1H8ouB-Fg_YypNRDSS";


const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);


/* =========================================================
   CONFIGURAÇÃO DOS ADMINISTRADORES
   ========================================================= */

const ADMIN_EMAILS = [
  "leticia.s.brito123@gmail.com",
  "renangarciaribeiro@gmail.com"
];


/* =========================================================
   CONFIGURAÇÃO DOS POSTS
   ========================================================= */

const POSTS_BUCKET = "post-banners";

const MAX_BANNER_SIZE = 5 * 1024 * 1024;

const ALLOWED_BANNER_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif"
];


/* =========================================================
   ELEMENTOS DA PÁGINA
   ========================================================= */

const adminPage =
  document.querySelector(".admin-page");

const postForm =
  document.querySelector(".post-form");


/* =========================================================
   TELA DE LOGIN
   ========================================================= */

function createLoginScreen() {

  const loginScreen =
    document.createElement("div");

  loginScreen.id = "adminLogin";

  loginScreen.innerHTML = `
    <div class="admin-login-card">

      <div class="admin-login-brand">

        <span class="section-kicker">
          HUB DE GESTAÇÃO
        </span>

        <h1>Área privada</h1>

        <p>
          Este espaço é reservado para acompanhar
          e guardar os momentos dessa história.
        </p>

      </div>


      <form
        id="loginForm"
        class="admin-login-form"
      >

        <div class="form-field">

          <label for="adminEmail">
            E-mail
          </label>

          <input
            type="email"
            id="adminEmail"
            autocomplete="email"
            placeholder="Digite seu e-mail"
            required
          >

        </div>


        <div class="form-field">

          <label for="adminPassword">
            Senha
          </label>

          <input
            type="password"
            id="adminPassword"
            autocomplete="current-password"
            placeholder="Digite sua senha"
            required
          >

        </div>


        <p
          id="loginError"
          class="login-error"
          aria-live="polite"
        ></p>


        <button
          type="submit"
          class="primary-button"
          id="loginButton"
        >
          Entrar
        </button>

      </form>


      <a
        href="/"
        class="login-back-link"
      >
        ← Voltar ao Hub
      </a>

    </div>
  `;


  document.body.prepend(loginScreen);


  return loginScreen;
}


/* =========================================================
   MOSTRAR / ESCONDER ADMIN
   ========================================================= */

function showAdmin() {

  const loginScreen =
    document.getElementById("adminLogin");

  if (loginScreen) {
    loginScreen.remove();
  }

  adminPage.style.display = "";
}


function showLogin() {

  adminPage.style.display = "none";

  const existingLogin =
    document.getElementById("adminLogin");

  if (!existingLogin) {
    createLoginScreen();
  }
}


/* =========================================================
   LOGIN
   ========================================================= */

async function handleLogin(event) {

  event.preventDefault();


  const emailInput =
    document.getElementById("adminEmail");

  const passwordInput =
    document.getElementById("adminPassword");

  const loginButton =
    document.getElementById("loginButton");

  const loginError =
    document.getElementById("loginError");


  const email =
    emailInput.value.trim().toLowerCase();

  const password =
    passwordInput.value;


  if (!email || !password) {

    loginError.textContent =
      "Informe seu e-mail e sua senha.";

    return;
  }


  if (!ADMIN_EMAILS.includes(email)) {

    loginError.textContent =
      "Este e-mail não possui acesso à área administrativa.";

    passwordInput.value = "";

    return;
  }


  loginButton.disabled = true;
  loginButton.textContent = "Entrando...";
  loginError.textContent = "";


  const {
    data,
    error
  } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });


  if (error) {

    console.error(
      "Erro de autenticação:",
      error
    );

    loginError.textContent =
      "E-mail ou senha incorretos.";

    passwordInput.value = "";
    passwordInput.focus();

    loginButton.disabled = false;
    loginButton.textContent = "Entrar";

    return;
  }


  if (data.session) {

    showAdmin();

  } else {

    loginError.textContent =
      "Não foi possível iniciar a sessão.";

    loginButton.disabled = false;
    loginButton.textContent = "Entrar";
  }
}


/* =========================================================
   VALIDAÇÃO DO BANNER
   ========================================================= */

function validateBanner(file) {

  if (!file) {

    return {
      valid: false,
      message: "Selecione um banner."
    };

  }


  if (!ALLOWED_BANNER_TYPES.includes(file.type)) {

    return {
      valid: false,
      message:
        "Formato inválido. Use JPG, PNG, WEBP ou GIF."
    };

  }


  if (file.size > MAX_BANNER_SIZE) {

    return {
      valid: false,
      message:
        "O banner deve ter no máximo 5 MB."
    };

  }


  return {
    valid: true
  };
}


/* =========================================================
   NOME SEGURO PARA O ARQUIVO
   ========================================================= */

function createSafeFileName(file) {

  const originalName =
    file.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .toLowerCase();


  const extension =
    originalName.includes(".")
      ? originalName.split(".").pop()
      : "jpg";


  const timestamp =
    Date.now();


  const random =
    Math.random()
      .toString(36)
      .substring(2, 8);


  return `${timestamp}-${random}.${extension}`;
}


/* =========================================================
   PUBLICAÇÃO
   ========================================================= */

async function handlePostSubmit(event) {

  event.preventDefault();


  const submitButton =
    postForm.querySelector(".primary-button");


  const title =
    document
      .getElementById("postTitle")
      .value
      .trim();


  const text =
    document
      .getElementById("postText")
      .value
      .trim();


  const bannerInput =
    document.getElementById("postBanner");


  const mediaUrl =
    document
      .getElementById("postUrl")
      .value
      .trim();


  const mediaType =
    document
      .getElementById("postType")
      .value;


  const banner =
    bannerInput.files[0];


  /* -------------------------------------------------------
     VALIDAÇÕES
     ------------------------------------------------------- */

  if (!title) {

    alert("Informe um título.");

    return;
  }


  if (!text) {

    alert("Informe o texto da publicação.");

    return;
  }


  const bannerValidation =
    validateBanner(banner);


  if (!bannerValidation.valid) {

    alert(bannerValidation.message);

    return;
  }


  /* -------------------------------------------------------
     VERIFICAR SESSÃO
     ------------------------------------------------------- */

  const {
    data: sessionData,
    error: sessionError
  } = await supabaseClient.auth.getSession();


  if (
    sessionError ||
    !sessionData.session
  ) {

    alert(
      "Sua sessão expirou. Entre novamente."
    );

    showLogin();

    return;
  }


  const session =
    sessionData.session;


  const user =
    session.user;


  const userEmail =
    user.email
      ?.trim()
      .toLowerCase();


  if (
    !userEmail ||
    !ADMIN_EMAILS.includes(userEmail)
  ) {

    alert(
      "Sua conta não possui permissão para publicar."
    );

    return;
  }


  /* -------------------------------------------------------
     ESTADO DO BOTÃO
     ------------------------------------------------------- */

  submitButton.disabled = true;

  submitButton.textContent =
    "Publicando...";


  let uploadedFilePath = null;


  try {

    /* -----------------------------------------------------
       1. UPLOAD DO BANNER
       ----------------------------------------------------- */

    const fileName =
      createSafeFileName(banner);


    uploadedFilePath =
      `${user.id}/${fileName}`;


    const {
      error: uploadError
    } = await supabaseClient
      .storage
      .from(POSTS_BUCKET)
      .upload(
        uploadedFilePath,
        banner,
        {
          cacheControl: "3600",
          contentType: banner.type,
          upsert: false
        }
      );


    if (uploadError) {

      console.error(
        "Erro ao enviar banner:",
        uploadError
      );

      throw new Error(
        "Não foi possível enviar o banner."
      );
    }


    /* -----------------------------------------------------
       2. URL PÚBLICA DO BANNER
       ----------------------------------------------------- */

    const {
      data: publicUrlData
    } =
      supabaseClient
        .storage
        .from(POSTS_BUCKET)
        .getPublicUrl(
          uploadedFilePath
        );


    const bannerUrl =
      publicUrlData?.publicUrl;


    if (!bannerUrl) {

      throw new Error(
        "Não foi possível obter a URL do banner."
      );
    }


    /* -----------------------------------------------------
       3. INSERIR POST NO BANCO
       ----------------------------------------------------- */

    const postData = {

      title,

      text,

      banner_url:
        bannerUrl,

      media_url:
        mediaUrl || null,

      media_type:
        mediaType || null,

      published_at:
        new Date().toISOString(),

      created_by:
        user.id
    };


    const {
      error: insertError
    } = await supabaseClient
      .from("posts")
      .insert(postData);


    if (insertError) {

      console.error(
        "Erro ao salvar publicação:",
        insertError
      );

      throw new Error(
        "O banner foi enviado, mas não foi possível salvar a publicação."
      );
    }


    /* -----------------------------------------------------
       4. SUCESSO
       ----------------------------------------------------- */

    alert(
      "Publicação criada com sucesso! ❤️"
    );


    postForm.reset();


    /* -----------------------------------------------------
       5. ATUALIZAR CONTADOR DO TEXTO
       ----------------------------------------------------- */

    updateTextCounter();


  } catch (error) {

    console.error(
      "Erro ao publicar:",
      error
    );


    /*
       Se o upload aconteceu, mas o INSERT falhou,
       removemos o banner para evitar arquivo órfão.
    */

    if (uploadedFilePath) {

      const {
        error: removeError
      } = await supabaseClient
        .storage
        .from(POSTS_BUCKET)
        .remove([
          uploadedFilePath
        ]);


      if (removeError) {

        console.error(
          "Não foi possível remover o banner órfão:",
          removeError
        );

      }

    }


    alert(
      error.message ||
      "Não foi possível publicar o acompanhamento."
    );


  } finally {

    submitButton.disabled = false;

    submitButton.textContent =
      "Publicar acompanhamento ❤";
  }
}


/* =========================================================
   CONTADOR DO TEXTO
   ========================================================= */

function updateTextCounter() {

  const textInput =
    document.getElementById("postText");

  const counter =
    document.querySelector(
      ".field-note span:last-child"
    );


  if (!textInput || !counter) {
    return;
  }


  counter.textContent =
    `${textInput.value.length} / 1000`;
}


/* =========================================================
   OBSERVAR ESTADO DA AUTENTICAÇÃO
   ========================================================= */

supabaseClient.auth.onAuthStateChange(
  (event, session) => {

    if (session) {

      showAdmin();

    } else {

      showLogin();

    }

  }
);


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

async function initializeAdmin() {

  const {
    data,
    error
  } = await supabaseClient.auth.getSession();


  if (error) {

    console.error(
      "Erro ao verificar sessão:",
      error
    );

    showLogin();

    return;
  }


  if (data.session) {

    showAdmin();

  } else {

    showLogin();

  }
}


/* =========================================================
   EVENTOS
   ========================================================= */

document.addEventListener(
  "submit",
  (event) => {

    if (
      event.target.id === "loginForm"
    ) {

      handleLogin(event);

      return;
    }


    if (
      event.target.classList.contains(
        "post-form"
      )
    ) {

      handlePostSubmit(event);

    }

  }
);


/* =========================================================
   CONTADOR DO TEXTAREA
   ========================================================= */

document.addEventListener(
  "input",
  (event) => {

    document.addEventListener(
      "change",
      (event) => {

        if (
          event.target.id === "postBanner"
        ) {

          updateBannerDisplay();

        }

      }
    );

    if (
      event.target.id === "postText"
    ) {

      updateTextCounter();

    }

  }
);


/* =========================================================
   START
   ========================================================= */

initializeAdmin();

/* =========================================================
   ATUALIZAR PREVIEW DO BANNER
   ========================================================= */

function updateBannerDisplay() {

  const bannerInput =
    document.getElementById("postBanner");

  const uploadPlaceholder =
    document.querySelector(".upload-placeholder");


  if (
    !bannerInput ||
    !uploadPlaceholder
  ) {
    return;
  }


  const file =
    bannerInput.files[0];


  if (!file) {

    uploadPlaceholder.innerHTML = `
      <span class="upload-icon" aria-hidden="true">
        +
      </span>

      <strong>
        Adicionar banner
      </strong>

      <small>
        JPG, PNG, WEBP ou GIF · recomendado 600 × 800 px
      </small>
    `;

    return;
  }


  const validation =
    validateBanner(file);


  if (!validation.valid) {

    uploadPlaceholder.innerHTML = `
      <span class="upload-icon upload-error-icon" aria-hidden="true">
        !
      </span>

      <strong class="upload-error-text">
        Arquivo não permitido
      </strong>

      <small>
        ${validation.message}
      </small>
    `;

    return;
  }


  const sizeInKB =
    Math.round(file.size / 1024);


  uploadPlaceholder.innerHTML = `
    <span class="upload-icon upload-success-icon" aria-hidden="true">
      ✓
    </span>

    <strong>
      ${file.name}
    </strong>

    <small>
      ${sizeInKB} KB · ${file.type.split("/")[1].toUpperCase()}
    </small>

    <small class="upload-change">
      Clique para substituir
    </small>
  `;
}