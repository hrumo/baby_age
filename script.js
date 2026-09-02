/* =========================================================
   START — CONFIGURAÇÕES
   ========================================================= */
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

const GESTATIONAL_REFERENCE_DATE = "2026-08-07";
const GESTATIONAL_REFERENCE_WEEKS = 5;
const GESTATIONAL_REFERENCE_DAYS = 5;

const LIKED_COMMENTS_KEY = "babyAgeLikedComments";
const LIKED_POSTS_KEY = "babyAgeLikedPosts";
const LIKED_PHRASES_KEY = "babyAgeLikedPhrases";

const $ = (id) => document.getElementById(id);
/* =========================================================
   END — CONFIGURAÇÕES
   ========================================================= */

  /* =========================================================
   START — UTILITÁRIOS / DATAS
   ========================================================= */
function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function diffDays(from, to) {
  return Math.max(0, Math.floor((startOfDay(to) - startOfDay(from)) / 86400000));
}

function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit", month: "long", year: "numeric"
  }).format(date);
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  }).format(date);
}

function calculateGestationalAge(now) {
  const referenceDate = parseLocalDate(GESTATIONAL_REFERENCE_DATE);

  const elapsedDays = diffDays(referenceDate, now);

  const referenceTotalDays =
    (GESTATIONAL_REFERENCE_WEEKS * 7) +
    GESTATIONAL_REFERENCE_DAYS;

  const totalDays = referenceTotalDays + elapsedDays;

  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;

  return {
    totalDays,
    weeks,
    days
  };
}
/* =========================================================
   END — UTILITÁRIOS / DATAS
   ========================================================= */

/* =========================================================
   START — IDADE GESTACIONAL / CONTADORES
   ========================================================= */
const quoteSign = document.querySelector('.quote-sign')

function updateAge() {
  const now = new Date();
  const age = calculateGestationalAge(now);

  $("ageWeeks").textContent = age.weeks;
  quoteSign.textContent = `${age.weeks}ª semana`;
  $("ageDays").textContent = age.days;
  $("totalDays").textContent = age.totalDays;

  $("statDays").textContent = age.totalDays;
  $("statWeeks").textContent = age.weeks;

  const trimester =
  age.weeks < 14 ? "1º" :
  age.weeks < 28 ? "2º" :
  "3º";

  $("statTrimester").textContent = trimester;

  // Relógio da gestação
  const referenceDate = parseLocalDate(GESTATIONAL_REFERENCE_DATE);
  const elapsedMilliseconds =
    now.getTime() - referenceDate.getTime();

  const referenceMilliseconds =
    (
      (GESTATIONAL_REFERENCE_WEEKS * 7) +
      GESTATIONAL_REFERENCE_DAYS
    ) * 24 * 60 * 60 * 1000;

  const totalMilliseconds =
    referenceMilliseconds + elapsedMilliseconds;

  const totalSeconds = Math.floor(totalMilliseconds / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  $("liveCounter").textContent =
    `${hours.toLocaleString("pt-BR")} horas · ` +
    `${minutes.toLocaleString("pt-BR")} minutos · ` +
    `${seconds.toString().padStart(2, "0")} segundos`;

  updateMilestones(now);
}

function getGestationalDate(targetWeeks, targetDays = 0) {
  const referenceDate = parseLocalDate(GESTATIONAL_REFERENCE_DATE);

  const referenceTotalDays =
    (GESTATIONAL_REFERENCE_WEEKS * 7) +
    GESTATIONAL_REFERENCE_DAYS;

  const targetTotalDays =
    (targetWeeks * 7) +
    targetDays;

  const differenceInDays =
    targetTotalDays - referenceTotalDays;

  const targetDate = new Date(referenceDate);
  targetDate.setDate(targetDate.getDate() + differenceInDays);

  return targetDate;
}


function updateMilestones(now) {

  const milestones = [
    {
      label: "Início da jornada",
      weeks: 0,
      description: "O começo dessa história"
    },
    {
      label: "12 semanas",
      weeks: 12,
      description: "Fim do primeiro trimestre"
    },
    {
      label: "14 semanas",
      weeks: 14,
      description: "Início do segundo trimestre"
    },
    {
      label: "20 semanas",
      weeks: 20,
      description: "Metade da gestação"
    },
    {
      label: "28 semanas",
      weeks: 28,
      description: "Início do terceiro trimestre"
    },
    {
      label: "36 semanas",
      weeks: 36,
      description: "Reta final"
    },
    {
      label: "40 semanas",
      weeks: 40,
      description: "DPP estimada"
    }
  ];

  const timeline = $("timeline");

  if (!timeline) return;

  timeline.innerHTML = "";

  const currentAge = calculateGestationalAge(now);

const currentMilestoneIndex = milestones.reduce(
    (index, item, i) => {
        return currentAge.totalDays >= item.weeks * 7
            ? i
            : index;
    },
    0
);

milestones.forEach((item, index) => {

    const milestoneTotalDays = item.weeks * 7;

    const isCurrent = index === currentMilestoneIndex;
    const isCompleted = index < currentMilestoneIndex;

    const milestoneDate =
      getGestationalDate(item.weeks);

    const article =
      document.createElement("article");

    article.className =
      `milestone ${
          isCurrent ? "current" :
          isCompleted ? "completed" :
          ""
      }`;

    article.innerHTML = `
      <div class="milestone-dot" aria-hidden="true"></div>

      <div>
        <strong>${item.label}</strong>
        <span>${item.description}</span>
        <small>${formatDate(milestoneDate)}</small>
      </div>
    `;

    timeline.appendChild(article);
  });


  // Próximo marco
  const next =
    milestones.find(item => {
      return (item.weeks * 7) > currentAge.totalDays;
    });


  if (next) {

    const nextTotalDays =
      next.weeks * 7;

    const daysUntil =
      nextTotalDays - currentAge.totalDays;

    const nextDate =
      getGestationalDate(next.weeks);

    $("nextTitle").textContent =
      next.label;

    $("nextDate").textContent =
      formatDate(nextDate);

    $("nextDays").textContent =
      daysUntil;

  } else {

    $("nextTitle").textContent =
      "DPP estimada";

    $("nextDate").textContent =
      formatDate(getGestationalDate(40));

    $("nextDays").textContent =
      "♥";
  }
}

/* =========================================================
   END — IDADE GESTACIONAL / CONTADORES
   ========================================================= */

 /* =========================================================
   START — PHRASE DA SEMANA
   ========================================================= */ 
let currentPhrase = null;

async function loadCurrentPhrase() {
  const age =
    calculateGestationalAge(new Date());

  const {
    data,
    error
  } = await supabaseClient
    .from("phrases")
    .select(
      "id, week, phrase, likes"
    )
    .eq(
      "week",
      age.weeks
    )
    .maybeSingle();

  if (error) {

    console.error(
      "Erro ao carregar Phrase:",
      error
    );

    return;

  }

  if (!data) {

    console.error(
      "Nenhuma Phrase encontrada."
    );

    return;

  }

  $("dailyPhrase").textContent =
    data.phrase;


  $("phraseWeek").textContent =
    `${data.week}ª semana`;

  const button =
    document.getElementById(
      "phraseLikeButton"
    );

  const count =
    document.getElementById(
      "phraseLikeCount"
    );


  if (!button) {

    console.error(
      "phraseLikeButton não encontrado."
    );

    return;

  }

  // ID da Phrase
  button.dataset.id =
    data.id;


  // Contador
  if (count) {

    count.textContent =
      data.likes || 0;

  }


  // Estado de Like
  const alreadyLiked =
    hasLikedPhrase(data.id);


  button.classList.toggle(
    "liked",
    alreadyLiked
  );


  button.disabled =
    alreadyLiked;

}
/* =========================================================
   END — PHRASE DA SEMANA
   ========================================================= */

/* =========================================================
   START — ATUALIZAÇÕES / POSTS
   ========================================================= */

async function getUpdates() {

  const {
    data,
    error
  } = await supabaseClient
    .from("posts")
    .select(`
      id,
      likes,
      title,
      text,
      banner_url,
      media_url,
      media_type,
      published_at
    `)
    .order("published_at", {
      ascending: false
    });


  if (error) {

    console.error(
      "Erro ao carregar atualizações:",
      error
    );

    return [];
  }


  return data || [];
}

async function renderUpdates() {

  const updates =
    await getUpdates();


  const list =
    $("updatesList");


  if (!list) {
    return;
  }


  list.innerHTML = "";


  if (!updates.length) {

    list.innerHTML = `
      <div class="empty-updates">
        Ainda não há atualizações.
      </div>
    `;

    return;
  }


  updates.forEach(update => {

    const article =
      document.createElement("article");

    article.className =
      "update-card";


    const media =
      document.createElement("div");

    media.className =
      "update-media";


    const image =
      document.createElement("img");

    image.className =
      "update-image";

    image.src =
      update.banner_url;

    image.alt =
      update.title || "Atualização da gestação";

    image.loading =
      "lazy";


    media.appendChild(image);

    const content =
      document.createElement("div");

    content.className =
      "update-content";


    /* Data */

    const date =
      document.createElement("div");

    date.className =
      "update-date";

    date.textContent =
      formatDateTime(
        new Date(update.published_at)
      );


    /* Título */

    const title =
      document.createElement("h3");

    title.textContent =
      update.title;


    /* Texto */

    const text =
      document.createElement("p");

    text.textContent =
      update.text;


    content.append(
      date,
      title,
      text
    );

      const footer =
        document.createElement("div");

      footer.className =
        "update-footer";


      const like =
        document.createElement("button");

      like.type =
        "button";
     
        const alreadyLiked =
        hasLikedPost(update.id);

      like.className =
        `like-button post-like-button ${
          alreadyLiked ? "liked" : ""
        }`;

      like.dataset.id =
        update.id;

      like.setAttribute(
        "aria-label",
        alreadyLiked
          ? "Você já curtiu esta publicação"
          : "Curtir publicação"
      );

      like.disabled =
        alreadyLiked;

      like.innerHTML = `
        <span class="like-icon">♥</span>
        <span class="like-count">${update.likes || 0}</span>
      `;

      if (update.media_url) {

        const link =
          document.createElement("a");

        link.className =
          "update-link";

        link.href =
          update.media_url;

        link.target =
          "_blank";

        link.rel =
          "noopener noreferrer";

        link.innerHTML = `
          Ver conteúdo
          <span aria-hidden="true">→</span>
        `;

        footer.appendChild(link);
      }

      footer.prepend(like);

      content.appendChild(footer);
    
    /* -----------------------------------------------------
       CARD
       ----------------------------------------------------- */

    article.append(
      media,
      content
    );


    list.appendChild(article);

  });

}

function setupUpdatesNavigation() {

  const slider =
    $("updatesList");

  const previousButton =
    document.querySelector(
      ".updates-arrow-prev"
    );

  const nextButton =
    document.querySelector(
      ".updates-arrow-next"
    );


  if (
    !slider ||
    !previousButton ||
    !nextButton
  ) {
    return;
  }

  function updateArrowState() {

    const maxScroll =
      slider.scrollWidth -
      slider.clientWidth;


    const currentScroll =
      slider.scrollLeft;


    const hasOverflow =
      maxScroll > 5;


    previousButton.disabled =
      !hasOverflow ||
      currentScroll <= 5;


    nextButton.disabled =
      !hasOverflow ||
      currentScroll >= maxScroll - 5;


    previousButton.style.display =
      hasOverflow ? "" : "none";

    nextButton.style.display =
      hasOverflow ? "" : "none";
  }

  function getScrollAmount() {

    const firstCard =
      slider.querySelector(
        ".update-card"
      );


    if (!firstCard) {
      return slider.clientWidth * 0.85;
    }


    const gap =
      parseFloat(
        getComputedStyle(slider).gap
      ) || 0;


    return firstCard.offsetWidth + gap;
  }


  previousButton.addEventListener(
    "click",
    () => {

      slider.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });

    }
  );

  nextButton.addEventListener(
    "click",
    () => {

      slider.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });

    }
  );


  slider.addEventListener(
    "scroll",
    updateArrowState,
    {
      passive: true
    }
  );

  window.addEventListener(
    "resize",
    updateArrowState
  );

  /* Estado inicial */
  updateArrowState();

}

function handleInitialHash() {

  const hash = window.location.hash;

  const targets = {
    "#novidades": "updates",
    "#newsletter": "newsletter",
    "#capitulos": "milestones",
    "#carinhos": "guestbook"
  };

  const targetId = targets[hash];

  if (!targetId) {
    return;
  }

  const target =
    document.getElementById(targetId);

  if (!target) {
    return;
  }

  requestAnimationFrame(() => {

    const targetRect =
      target.getBoundingClientRect();

    const topOffset = 40;

    window.scrollTo({
      top:
        window.scrollY +
        targetRect.top -
        topOffset,
      behavior: "auto"
    });

  });
}

/* =========================================================
   END — ATUALIZAÇÕES / POSTS
   ========================================================= */

/* =========================================================
   START — LIKES / PERSISTÊNCIA LOCAL
   ========================================================= */
function getLikedComments() {
  try {
    return JSON.parse(
      localStorage.getItem(LIKED_COMMENTS_KEY) || "[]"
    );
  } catch {
    return [];
  }
}


function hasLikedComment(id) {
  return getLikedComments().includes(id);
}


function markCommentAsLiked(id) {
  const likedComments = getLikedComments();

  if (!likedComments.includes(id)) {
    likedComments.push(id);

    localStorage.setItem(
      LIKED_COMMENTS_KEY,
      JSON.stringify(likedComments)
    );
  }
}

function getLikedPosts() {

  try {

    return JSON.parse(
      localStorage.getItem(
        LIKED_POSTS_KEY
      ) || "[]"
    );

  } catch {

    return [];

  }

}


function hasLikedPost(id) {

  return getLikedPosts().includes(id);

}


function markPostAsLiked(id) {

  const likedPosts =
    getLikedPosts();

  if (!likedPosts.includes(id)) {

    likedPosts.push(id);

    localStorage.setItem(
      LIKED_POSTS_KEY,
      JSON.stringify(likedPosts)
    );

  }

}

function getLikedPhrases() {
  try {

    return JSON.parse(
      localStorage.getItem(
        LIKED_PHRASES_KEY
      ) || "[]"
    );

  } catch {

    return [];

  }

}


function hasLikedPhrase(id) {

  return getLikedPhrases().includes(id);

}


function markPhraseAsLiked(id) {

  const likedPhrases =
    getLikedPhrases();

  if (!likedPhrases.includes(id)) {

    likedPhrases.push(id);

    localStorage.setItem(
      LIKED_PHRASES_KEY,
      JSON.stringify(likedPhrases)
    );

  }

}

/* =========================================================
   END — LIKES / PERSISTÊNCIA LOCAL
   ========================================================= */

   /* =========================================================
   START — COMENTÁRIOS / GUESTBOOK
   ========================================================= */

let commentsVisibleCount = null;
let commentsUserInteracted = false;
let commentsFullyExpanded = false;


function getCommentsVisibleLimit() {

  return window.matchMedia("(max-width: 650px)").matches
    ? 5
    : 3;

}

function updateCommentsVisibility(total, animate = true) {

  const shells =
    document.querySelectorAll(
      "#commentsList .comment-shell"
    );

  const initialLimit =
    getCommentsVisibleLimit();


  if (!commentsUserInteracted) {

    commentsVisibleCount =
      Math.min(
        initialLimit,
        total
      );

  }

  commentsVisibleCount =
    Math.min(
      Math.max(
        commentsVisibleCount,
        initialLimit
      ),
      total
    );


  shells.forEach((shell, index) => {

    const hidden =
      index >= commentsVisibleCount;


    shell.classList.toggle(
      "is-hidden",
      hidden
    );


    shell.setAttribute(
      "aria-hidden",
      hidden ? "true" : "false"
    );


    shell.inert =
      hidden;

  });


  const moreButton =
    $("commentsMore");


  if (!moreButton) {
    return;
  }


  const hasMore =
    total > initialLimit;


  moreButton.hidden =
    !hasMore;


  if (!hasMore) {

    return;

  }


  if (
    commentsVisibleCount >= total
  ) {

    moreButton.textContent =
      "Ocultar comentários ↑";

    moreButton.setAttribute(
      "aria-expanded",
      "true"
    );

  } else {

    moreButton.textContent =
      "Ver mais comentários ↓";

    moreButton.setAttribute(
      "aria-expanded",
      "false"
    );

  }

}

async function getComments() {
  const { data, error } = await supabaseClient
    .from("comments")
    .select("id, name, relation, text, created_at, likes")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao carregar comentários:", error);
    return [];
  }

  return data || [];
}

async function renderComments() {

  const comments = await getComments();

  const list = $("commentsList");
  const moreButton = $("commentsMore");

  $("commentCount").textContent =
    `${comments.length} ${
      comments.length === 1 ? "mensagem" : "mensagens"
    }`;

  list.innerHTML = "";

  if (!comments.length) {

    list.innerHTML = `
      <div class="empty-comments">
        Ainda não há mensagens.
        Seja o primeiro a deixar um carinho. ♥
      </div>
    `;

    if (moreButton) {
      moreButton.hidden = true;
    }

    return;
  }

  comments.forEach((comment, index) => {

    const article =
      document.createElement("article");

    article.className = "comment";

    const top =
      document.createElement("div");

    top.className =
      "comment-top";


    const identity =
      document.createElement("div");


    const name =
      document.createElement("div");

    name.className =
      "comment-name";

    name.textContent =
      comment.name;


    const relation =
      document.createElement("div");

    relation.className =
      "comment-relation";

    relation.textContent =
      comment.relation;


    identity.append(
      name,
      relation
    );


    const date =
      document.createElement("div");

    date.className =
      "comment-date";

    date.textContent =
      formatDateTime(
        new Date(comment.created_at)
      );


    top.append(
      identity,
      date
    );

    const text =
      document.createElement("div");

    text.className =
      "comment-text";

    text.textContent =
      comment.text;

    const like =
      document.createElement("button");

    like.type =
      "button";


    const alreadyLiked =
      hasLikedComment(comment.id);


    like.className =
      `like-button comment-like-button ${
        alreadyLiked ? "liked" : ""
      }`;


    like.dataset.id =
      comment.id;


    like.setAttribute(
      "aria-label",
      alreadyLiked
        ? "Você já curtiu esta mensagem"
        : "Curtir mensagem"
    );


    like.disabled =
      alreadyLiked;


    like.innerHTML = `
      <span class="like-icon">♥</span>
      <span class="like-count">
        ${comment.likes || 0}
      </span>
    `;

    article.append(
      top,
      text,
      like
    );


    const shell =
      document.createElement("div");

    shell.className =
      "comment-shell";

    shell.appendChild(
      article
    );

    list.appendChild(
      shell
    );

  });

  updateCommentsVisibility(comments.length);


}

async function handleCommentSubmit(event) {
  event.preventDefault();

  const name = $("commentName").value.trim();
  const relation = $("commentRelation").value;
  const text = $("commentText").value.trim();

  if (!name || !relation || !text) {
    $("formNote").textContent =
      "Preencha nome, parentesco e mensagem antes de publicar.";
    return;
  }

  const button = event.target.querySelector(".primary-button");

  button.disabled = true;
  button.textContent = "Publicando...";

  const { error } = await supabaseClient
    .from("comments")
    .insert({
      name,
      relation,
      text,
      likes: 0
    });

  if (error) {
    console.error("Erro ao publicar comentário:", error);

    $("formNote").textContent =
      "Não foi possível publicar agora. Tente novamente.";

    return;
  }

const notificationDate =
  formatDateTime(new Date());

const notificationContent =
  `<strong>Nome:</strong> ${name}<br>` +
  `<strong>Parentesco:</strong> ${relation}<br><br>` +
  `${text}`;


const { error: serviceEmailError } =
  await supabaseClient.functions.invoke(
    "send-service-email",
    {
      body: {
        subject:
          "Novo carinho para o bebê",

        content:
          notificationContent,

        date:
          notificationDate
      }
    }
  );


if (serviceEmailError) {

  console.error(
    "Erro ao enviar notificação do comentário:",
    serviceEmailError
  );

}

event.target.reset();

$("charCount").textContent = "0";

$("formNote").textContent =
  "Mensagem publicada com carinho. ♥";

await renderComments();

button.disabled = false;
button.textContent = "Publicar carinho ♥";

}

async function handlePhraseLike(event) {
  const button = event.currentTarget;

  if (!button) return;

  const id = Number(button.dataset.id);

  if (!id) {
    console.error("Phrase sem ID para curtir.");
    return;
  }

  // Já curtiu esta Phrase neste navegador
  if (hasLikedPhrase(id)) {
    return;
  }

  button.disabled = true;

  const { error } = await supabaseClient.rpc(
    "increment_phrase_like",
    {
      phrase_id: id
    }
  );

  if (error) {
    console.error(
      "Erro ao curtir Phrase:",
      error
    );

    button.disabled = false;

    return;
  }

  // Registra localmente que este navegador já curtiu
  markPhraseAsLiked(id);

  // Atualiza visualmente o estado do botão
  button.classList.add("liked");

  // Mantém o botão bloqueado após o like
  button.disabled = true;

const count =
  document.getElementById(
    "phraseLikeCount"
  );

if (count) {
  const currentLikes =
    parseInt(
      count.textContent || "0",
      10
    );

  count.textContent =
    currentLikes + 1;
}

}

async function handlePostLike(event) {

  const button =
    event.target.closest(".post-like-button");

  if (!button) {
    return;
  }


  const id =
    Number(button.dataset.id);


  if (!id) {

    console.error(
      "Post sem ID para curtir."
    );

    return;

  }

  if (hasLikedPost(id)) {
    return;
  }

  button.disabled = true;

  const { error } =
    await supabaseClient.rpc(
      "increment_post_like",
      {
        post_id: id
      }
    );


  if (error) {

    console.error(
      "Erro ao curtir Post:",
      error
    );

    button.disabled = false;

    return;
  }

  markPostAsLiked(id);

  button.classList.add("liked");

  const count =
    button.querySelector(".like-count");


  if (count) {

    const currentLikes =
      parseInt(
        count.textContent || "0",
        10
      );


    count.textContent =
      currentLikes + 1;

  }

  button.disabled = true;

}

$("updatesList").addEventListener(
  "click",
  handlePostLike
);

$("commentsList").addEventListener(
  "click",
  handleCommentLike
);

$("commentsMore").addEventListener(
  "click",
  () => {

    const total =
      document.querySelectorAll(
        "#commentsList .comment-shell"
      ).length;

    const step =
      getCommentsVisibleLimit();

    const initialLimit =
      getCommentsVisibleLimit();


    if (!total) {
      return;
    }


    commentsUserInteracted = true;

    if (commentsVisibleCount >= total) {

      commentsVisibleCount =
        Math.min(
          initialLimit,
          total
        );

      commentsFullyExpanded = false;
      commentsCollapsing = false;

    }

    else {

      commentsVisibleCount =
        Math.min(
          total,
          commentsVisibleCount + step
        );

      commentsFullyExpanded =
        commentsVisibleCount >= total;

    }


    updateCommentsVisibility(total);

  }
);

$("commentForm").addEventListener(
  "submit",
  handleCommentSubmit
);

const phraseLikeButton =
  document.getElementById("phraseLikeButton");

if (phraseLikeButton) {
  phraseLikeButton.addEventListener(
    "click",
    handlePhraseLike
  );
}


async function handleCommentLike(event) {

  const button =
    event.target.closest(
      ".comment-like-button"
    );

  if (!button) {
    return;
  }


  const id =
    button.dataset.id;


  if (!id) {

    console.error(
      "Comentário sem ID para curtir."
    );

    return;
  }

  if (hasLikedComment(id)) {
    return;
  }

  button.disabled = true;

  const { error } =
    await supabaseClient.rpc(
      "increment_comment_like",
      {
        comment_id: id
      }
    );

  if (error) {

    console.error(
      "Erro ao curtir comentário:",
      error
    );

    button.disabled = false;

    return;
  }

  markCommentAsLiked(id);

  button.classList.add(
    "liked"
  );

  const count =
    button.querySelector(
      ".like-count"
    );


  if (count) {

    const currentLikes =
      parseInt(
        count.textContent || "0",
        10
      );


    count.textContent =
      currentLikes + 1;
  }


  button.disabled = true;

}

$("commentText").addEventListener("input", () => {
  $("charCount").textContent = $("commentText").value.length;
});


function startRealtime() {

  supabaseClient
    .channel("baby-age-comments")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "comments"
      },
      async () => {

        await renderComments();

      }
    )
    .subscribe();

}
/* =========================================================
   END — COMENTÁRIOS / GUESTBOOK
   ========================================================= */

/* =========================================================
   START — MENU DO HUB
   ========================================================= */

function setupHubMenu() {

  const menu = document.getElementById("hubMenu");
  const toggle = document.getElementById("hubMenuToggle");
  const panel = document.getElementById("hubMenuPanel");

  if (!menu || !toggle || !panel) {
    return;
  }

  const items =
    menu.querySelectorAll(".hub-menu-item");

  function setMenuState(isOpen) {

    menu.classList.toggle(
      "is-open",
      isOpen
    );

    toggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    toggle.setAttribute(
      "aria-label",
      isOpen
        ? "Fechar menu do Hub"
        : "Abrir menu do Hub"
    );

    panel.setAttribute(
      "aria-hidden",
      String(!isOpen)
    );
  }

  toggle.addEventListener(
    "click",
    function(event) {

      event.stopPropagation();

      const isOpen =
        menu.classList.contains("is-open");

      setMenuState(!isOpen);
    }
  );

  document.addEventListener(
    "click",
    function(event) {

      if (!menu.contains(event.target)) {
        setMenuState(false);
      }

    }
  );

  items.forEach(function(item) {

    item.addEventListener(
      "click",
      function() {

        const targetId =
          item.dataset.scrollTarget;

      let target =
        document.getElementById(targetId);

      if (targetId === "guestbook") {

        const guestbook =
          document.getElementById("guestbook");

        if (guestbook) {

          const targetRect =
            guestbook.getBoundingClientRect();

          const topOffset = -5;

          window.scrollTo({
            top:
              Math.max(
                0,
                window.scrollY +
                targetRect.top -
                topOffset
              ),

            behavior:
              window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches
                ? "auto"
                : "smooth"
          });

          setMenuState(false);

          return;
        }

      }

        if (!target) {

          console.warn(
            "Destino do menu não encontrado:",
            targetId
          );

          return;
        }


        /*
         * Fecha o menu antes do scroll.
         * Isso evita que o painel fique sobre
         * o conteúdo durante a animação.
         */

        setMenuState(false);


        /*
         * Centraliza a seção na viewport.
         */

        const targetRect =
          target.getBoundingClientRect();

        const targetCenter =
          targetRect.top +
          (targetRect.height / 2);

        const viewportCenter =
          window.innerHeight / 2;

        const scrollPosition =
          window.scrollY +
          targetCenter -
          viewportCenter;


        window.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior:
            window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches
              ? "auto"
              : "smooth"
        });

      }
    );

  });

  document.addEventListener(
    "keydown",
    function(event) {

      if (
        event.key === "Escape" &&
        menu.classList.contains("is-open")
      ) {
        setMenuState(false);
        toggle.focus();
      }

    }
  );

  setMenuState(false);

}

/* =========================================================
   END — MENU DO HUB
   ========================================================= */

/* =========================================================
   START — NEWSLETTER
   ========================================================= */

const newsletterForm =
  document.getElementById("newsletterForm");

const newsletterName =
  document.getElementById("newsletterName");

const newsletterEmail =
  document.getElementById("newsletterEmail");

const newsletterNote =
  document.getElementById("newsletterNote");

  async function subscribeToNewsletter(event) {

  event.preventDefault();


  const name =
    newsletterName.value.trim();

  const email =
    newsletterEmail.value.trim().toLowerCase();


  if (!name || !email) {

    newsletterNote.textContent =
      "Preencha seu nome e seu melhor e-mail.";

    return;

  }


  newsletterNote.textContent =
    "Salvando sua inscrição...";


  const submitButton =
    newsletterForm.querySelector(
      ".newsletter-submit"
    );


  submitButton.disabled = true;


 const {
    data: subscriberId,
    error: subscriberError
  } = await supabaseClient
    .rpc("subscribe_to_newsletter", {
      p_name: name,
      p_email: email
    });

  if (subscriberError) {

    console.error(
      "Erro ao cadastrar newsletter:",
      {
        message: subscriberError.message,
        details: subscriberError.details,
        hint: subscriberError.hint,
        code: subscriberError.code
      }
    );

    if (subscriberError.code === "23505") {

      newsletterNote.textContent =
        "Este e-mail já está recebendo nossas novidades. ♥";

    } else {

      newsletterNote.textContent =
        "Não foi possível realizar sua inscrição. Tente novamente.";

    }

    submitButton.disabled = false;

    return;
  }

await newsletter.syncSubscriber(subscriberId);

const { error: welcomeEmailError } =
  await supabaseClient.functions.invoke(
    "send-welcome-email",
    {
      body: {
        name,
        email
      }
    }
  );

if (welcomeEmailError) {

  console.error(
    "Erro ao enviar e-mail de boas-vindas:",
    welcomeEmailError
  );

}

const notificationDate =
  formatDateTime(new Date());

const notificationContent =
  `<strong>Nome:</strong> ${name}<br>` +
  `<strong>E-mail:</strong> ${email}`;


const { error: serviceEmailError } =
  await supabaseClient.functions.invoke(
    "send-service-email",
    {
      body: {
        subject:
          "Nova inscrição no Gestação Hub",

        content:
          notificationContent,

        date:
          notificationDate
      }
    }
  );


if (serviceEmailError) {

  console.error(
    "Erro ao enviar notificação interna:",
    serviceEmailError
  );

}

newsletterForm.reset();

newsletterNote.textContent =
  "Pronto! Você receberá os próximos capítulos ♥";

submitButton.disabled = false;


}

if (newsletterForm) {

  newsletterForm.addEventListener(
    "submit",
    subscribeToNewsletter
  );

}

/* =========================================================
   END — NEWSLETTER
   ========================================================= */

  /* =========================================================
  START — INICIALIZAÇÃO
  ========================================================= */
setupHubMenu();

updateAge();

loadCurrentPhrase();

renderUpdates().then(() => {
  setupUpdatesNavigation();
  handleInitialHash();
});

renderComments();

startRealtime();

setInterval(updateAge, 1000);
/* =========================================================
   END — INICIALIZAÇÃO
   ========================================================= */
