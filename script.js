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

const phrases = [
  "Toda grande história começa antes mesmo de sabermos que ela está acontecendo. E, de algum jeito, a nossa já começou.",

  "Ainda não sabemos quem você será, mas a vida já começa a preparar o caminho para que, um dia, possamos te encontrar.",

  "Enquanto tudo ainda parece pequeno e invisível, uma das maiores histórias das nossas vidas começa a ganhar forma.",

  "Talvez você ainda seja apenas uma possibilidade aos olhos do mundo. Para nós, já existe uma história esperando para ser contada.",

  "Pequeno no tamanho, imenso no significado. Nesta semana, seu desenvolvimento acontece em um ritmo extraordinário — e nossa imaginação já começa a correr longe.",

  "Seu coração está começando a entrar em cena, enquanto estruturas fundamentais do seu corpo continuam se formando. E aqui fora, dois corações já aprenderam a bater diferente por você.",

  "A cada dia, novas estruturas se desenvolvem e o corpo ganha contornos cada vez mais definidos. Você ainda é tão pequeno, mas já ocupa um espaço enorme na nossa vida.",

  "Você está crescendo depressa. Pequenas partes começam a se tornar mais reconhecíveis, enquanto uma pessoa inteira, com uma história só sua, começa a tomar forma.",

  "A fase embrionária chega ao fim e uma nova etapa começa. Daqui para frente, crescer, amadurecer e descobrir serão partes cada vez maiores da sua jornada.",

  "Seu corpo continua se organizando de maneira impressionante. E nós seguimos descobrindo que esperar por alguém também é uma forma de conhecê-lo.",

  "Você cresce, se movimenta e continua amadurecendo, mesmo que ainda não possamos sentir tudo isso daqui. A espera também tem seus pequenos sinais.",

  "Doze semanas. Um primeiro grande capítulo se completa. O que começou quase invisível já se transformou em uma pequena vida cheia de possibilidades.",

  "O segundo trimestre se aproxima trazendo uma nova fase de crescimento. Para nós, cada nova semana parece dizer a mesma coisa: você está cada vez mais perto de nós.",

  "Agora, crescer passa a ser uma parte ainda mais importante da sua jornada. E, enquanto você ganha espaço por aí, ganha também espaço cada vez maior dentro da nossa história.",

  "Seus movimentos ainda podem ser silenciosos para nós, mas nada sobre essa espera é silencioso por aqui. Cada dia traz uma nova pergunta, uma nova descoberta e um pouco mais de amor.",

  "Você já está se tornando cada vez mais proporcional e definido. Nós, por outro lado, continuamos tentando imaginar como será finalmente olhar para você.",

  "Enquanto seus sentidos e movimentos continuam se desenvolvendo, nossa espera também ganha novas formas. Já conseguimos imaginar o som da sua voz, o seu olhar e o primeiro abraço.",

  "Você continua crescendo e descobrindo o mundo antes mesmo de chegar a ele. E nós seguimos descobrindo, pouco a pouco, o que significa ser sua família.",

  "Quase metade da gestação. Parece que foi ontem que descobrimos você, mas já existe uma quantidade enorme de histórias que só aconteceram porque você chegou.",

  "Metade do caminho. Vinte semanas de crescimento, descobertas e expectativas. Ainda falta um pouco para o encontro, mas a nossa vida já mudou para sempre.",

  "Você continua crescendo, seus movimentos ganham força e seus sentidos amadurecem. Enquanto isso, começamos a perceber que esperar por você também está criando memórias.",

  "Cada semana acrescenta um novo detalhe à pessoa que você está se tornando. Nós ainda não conhecemos seu rosto, mas já reconhecemos o sentimento que você despertou em nós.",

  "Seu corpo continua amadurecendo e seus movimentos podem ficar cada vez mais perceptíveis. É curioso pensar que, antes mesmo do primeiro encontro, você já consegue nos fazer sorrir sem dizer uma palavra.",

  "Seis meses se aproximam e a ideia de te conhecer começa a parecer cada vez menos distante. Você ainda está crescendo, e nós já estamos crescendo junto com você.",

  "O tempo passa e você ganha cada vez mais força. Por aqui, a expectativa também ganha peso — mas é daquele tipo bom, que transforma cada dia comum em parte de uma história especial.",

  "Você já percorreu um longo caminho desde aquelas primeiras semanas. Agora, cada novo dia é uma pequena preparação para o mundo que espera por você.",

  "O segundo trimestre está chegando ao fim. Você continua amadurecendo, crescendo e se preparando, enquanto nós começamos a perceber que a reta final está logo ali.",

  "Bem-vindo ao terceiro trimestre. A última grande etapa da gestação começa, e o encontro que parecia tão distante agora já consegue ser imaginado no calendário.",

  "Seu cérebro, seus sentidos e seu corpo continuam amadurecendo. Você está se preparando para conhecer o mundo; nós estamos nos preparando para finalmente conhecê-lo com você.",

  "Trinta semanas. Já existe uma história inteira entre o dia em que descobrimos você e o momento em que finalmente poderemos te segurar nos braços.",

  "Cada movimento, cada consulta e cada nova semana nos aproxima um pouco mais. Você ainda está crescendo aí dentro, enquanto o amor já encontrou espaço suficiente aqui fora.",

  "A reta final começa a ganhar forma. Você continua ganhando força e maturidade, e nós começamos a contar não apenas semanas, mas os dias que faltam para te conhecer.",

  "Seu corpo continua se preparando para a vida fora do útero. E nós continuamos preparando tudo por aqui — inclusive o coração, embora ele provavelmente nunca esteja completamente preparado.",

  "Falta cada vez menos. Entre consultas, planos, expectativas e pequenas ansiedades, existe uma certeza que permanece: estamos esperando por você.",

  "Você já percorreu quase toda essa jornada. Em breve, aquilo que durante meses foi imaginado, acompanhado e esperado terá um rosto, um nome, um choro e um primeiro abraço.",

  "A reta final chegou. Seu desenvolvimento continua avançando enquanto, por aqui, cada detalhe parece ganhar outro significado. Você está quase chegando.",

  "A partir daqui, cada dia pode carregar uma expectativa diferente. O tempo continua passando, mas agora existe uma sensação nova: o nosso encontro pode estar muito perto.",

  "Trinta e oito semanas. Durante todo esse tempo, você foi crescendo sem que pudéssemos te abraçar. Em breve, finalmente vamos trocar a espera pelo encontro.",

  "Quase tudo já está pronto para você. Talvez ainda faltem alguns dias, talvez menos do que imaginamos. Mas uma coisa é certa: estamos prontos para te conhecer.",

  "Quarenta semanas de espera, crescimento, descobertas, consultas, sonhos e amor. Uma história inteira chegou até aqui — e agora começa o capítulo que mais esperamos: finalmente conhecer você."
];

async function getCurrentPhrase() {
  const age = calculateGestationalAge(new Date());

  const { data, error } = await supabaseClient
    .from("phrases")
    .select("id, week, phrase, likes")
    .eq("week", age.weeks)
    .single();

  if (error) {
    console.error("Erro ao carregar phrase:", error);
    return null;
  }

  return data;
}

const $ = (id) => document.getElementById(id);

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

  // ---------------------------------------------
  // Texto
  // ---------------------------------------------

  $("dailyPhrase").textContent =
    data.phrase;


  // ---------------------------------------------
  // Semana
  // ---------------------------------------------

  $("phraseWeek").textContent =
    `${data.week}ª semana`;


  // ---------------------------------------------
  // Botão
  // ---------------------------------------------

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
   ATUALIZAÇÕES
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


/* =========================================================
   RENDERIZAR ATUALIZAÇÕES
   ========================================================= */

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


    /* -----------------------------------------------------
       MÍDIA / BANNER
       ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       CONTEÚDO
       ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       LINK EXTERNO — OPCIONAL
       ----------------------------------------------------- */

      /* -----------------------------------------------------
      RODAPÉ DO POST
      ----------------------------------------------------- */

      const footer =
        document.createElement("div");

      footer.className =
        "update-footer";


      /* -----------------------------------------------------
        LIKE
        ----------------------------------------------------- */

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


      /* -----------------------------------------------------
        LINK EXTERNO — OPCIONAL
        ----------------------------------------------------- */

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


      /* -----------------------------------------------------
        ADICIONAR LIKE + LINK
        ----------------------------------------------------- */

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
    return;
  }

  comments.forEach(comment => {
    const article = document.createElement("article");
    article.className = "comment";

    const top = document.createElement("div");
    top.className = "comment-top";

    const identity = document.createElement("div");

    const name = document.createElement("div");
    name.className = "comment-name";
    name.textContent = comment.name;

    const relation = document.createElement("div");
    relation.className = "comment-relation";
    relation.textContent = comment.relation;

    identity.append(name, relation);

    const date = document.createElement("div");
    date.className = "comment-date";
    date.textContent = formatDateTime(
      new Date(comment.created_at)
    );

    top.append(identity, date);

    const text = document.createElement("div");
    text.className = "comment-text";
    text.textContent = comment.text;

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
      <span class="like-count">${comment.likes || 0}</span>
    `;

    article.append(top, text, like);
    list.appendChild(article);
  });
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

  button.disabled = false;
  button.textContent = "Publicar carinho ♥";

  if (error) {
    console.error("Erro ao publicar comentário:", error);

    $("formNote").textContent =
      "Não foi possível publicar agora. Tente novamente.";

    return;
  }

  event.target.reset();

  $("charCount").textContent = "0";

  $("formNote").textContent =
    "Mensagem publicada com carinho. ♥";

  await renderComments();
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


  // ---------------------------------------------
  // Já curtiu este Post neste navegador
  // ---------------------------------------------

  if (hasLikedPost(id)) {
    return;
  }


  // ---------------------------------------------
  // Bloqueia durante a requisição
  // ---------------------------------------------

  button.disabled = true;


  // ---------------------------------------------
  // Incrementa no Supabase
  // ---------------------------------------------

  const { error } =
    await supabaseClient.rpc(
      "increment_post_like",
      {
        post_id: id
      }
    );


  // ---------------------------------------------
  // Erro
  // ---------------------------------------------

  if (error) {

    console.error(
      "Erro ao curtir Post:",
      error
    );

    button.disabled = false;

    return;
  }


  // ---------------------------------------------
  // Salva Like localmente
  // ---------------------------------------------

  markPostAsLiked(id);


  // ---------------------------------------------
  // Estado visual
  // ---------------------------------------------

  button.classList.add("liked");


  // ---------------------------------------------
  // Atualiza contador
  // ---------------------------------------------

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


  // ---------------------------------------------
  // Mantém bloqueado
  // ---------------------------------------------

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


  // ---------------------------------------------
  // Já curtiu este comentário neste navegador
  // ---------------------------------------------

  if (hasLikedComment(id)) {
    return;
  }


  // ---------------------------------------------
  // Bloqueia durante a requisição
  // ---------------------------------------------

  button.disabled = true;


  // ---------------------------------------------
  // Incrementa no Supabase
  // ---------------------------------------------

  const { error } =
    await supabaseClient.rpc(
      "increment_comment_like",
      {
        comment_id: id
      }
    );


  // ---------------------------------------------
  // Erro
  // ---------------------------------------------

  if (error) {

    console.error(
      "Erro ao curtir comentário:",
      error
    );

    button.disabled = false;

    return;
  }


  // ---------------------------------------------
  // Salva Like localmente
  // ---------------------------------------------

  markCommentAsLiked(id);


  // ---------------------------------------------
  // Estado visual
  // ---------------------------------------------

  button.classList.add(
    "liked"
  );


  // ---------------------------------------------
  // Atualiza contador
  // ---------------------------------------------

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


  // ---------------------------------------------
  // Mantém bloqueado
  // ---------------------------------------------

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
   NAVEGAÇÃO DAS ATUALIZAÇÕES
   ========================================================= */

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


  /* -------------------------------------------------------
     ATUALIZAR ESTADO DAS SETAS
     ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     DISTÂNCIA DE CADA MOVIMENTO
     ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     SETA ESQUERDA
     ------------------------------------------------------- */

  previousButton.addEventListener(
    "click",
    () => {

      slider.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });

    }
  );


  /* -------------------------------------------------------
     SETA DIREITA
     ------------------------------------------------------- */

  nextButton.addEventListener(
    "click",
    () => {

      slider.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });

    }
  );


  /* -------------------------------------------------------
     ATUALIZAR DURANTE O SCROLL
     ------------------------------------------------------- */

  slider.addEventListener(
    "scroll",
    updateArrowState,
    {
      passive: true
    }
  );


  /* -------------------------------------------------------
     ATUALIZAR AO REDIMENSIONAR
     ------------------------------------------------------- */

  window.addEventListener(
    "resize",
    updateArrowState
  );


  /* Estado inicial */

  updateArrowState();

}


/* =========================================================
   MENU DO HUB
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


  /* -------------------------------------------------------
     ABRIR / FECHAR
     ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     BOTÃO
     ------------------------------------------------------- */

  toggle.addEventListener(
    "click",
    function(event) {

      event.stopPropagation();

      const isOpen =
        menu.classList.contains("is-open");

      setMenuState(!isOpen);
    }
  );


  /* -------------------------------------------------------
     FECHAR AO CLICAR FORA
     ------------------------------------------------------- */

  document.addEventListener(
    "click",
    function(event) {

      if (!menu.contains(event.target)) {
        setMenuState(false);
      }

    }
  );


  /* -------------------------------------------------------
     NAVEGAÇÃO
     ------------------------------------------------------- */

  items.forEach(function(item) {

    item.addEventListener(
      "click",
      function() {

        const targetId =
          item.dataset.scrollTarget;

      let target =
        document.getElementById(targetId);


      /* -------------------------------------------------------
        MENSAGENS → LEVAR DIRETAMENTE AO FORMULÁRIO
        ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     ESC
     ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     ESTADO INICIAL
     ------------------------------------------------------- */

  setMenuState(false);

}

setupHubMenu();

updateAge();

loadCurrentPhrase();

renderUpdates();

setupUpdatesNavigation();

renderComments();

startRealtime();

setInterval(updateAge, 1000);

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

