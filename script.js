const DEFAULT_BIRTH_DATE = "2026-07-03";
const BIRTH_KEY = "babyAgeBirthDate";
const COMMENTS_KEY = "babyAgeComments";
const LIKES_KEY = "babyAgeLikedComments";

const phrases = [
  "Hoje é mais um capítulo de uma história que está só começando.",
  "Cada dia é uma descoberta. E cada descoberta, uma memória para guardar.",
  "Tão pequeno ainda, e já ocupando um espaço enorme no coração.",
  "O tempo passa depressa. Ainda bem que podemos guardar alguns momentos.",
  "Mais um dia de vida, mais um dia de amor."
];

const $ = (id) => document.getElementById(id);

function getBirthDate() {
  return localStorage.getItem(BIRTH_KEY) || DEFAULT_BIRTH_DATE;
}

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

function addMonths(date, months) {
  const result = new Date(date);
  const originalDay = result.getDate();
  result.setDate(1);
  result.setMonth(result.getMonth() + months);
  const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(originalDay, lastDay));
  return result;
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

function calculateAge(birth, now) {
  const days = diffDays(birth, now);
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;

  let months = 0;
  let cursor = new Date(birth);
  while (addMonths(cursor, 1) <= now) {
    cursor = addMonths(cursor, 1);
    months++;
  }

  return { days, weeks, remainingDays, months };
}

function updateAge() {
  const birth = parseLocalDate(getBirthDate());
  const now = new Date();

  if (birth > now) {
    $("birthHelper").textContent = "Escolha uma data de nascimento válida.";
    return;
  }

  const age = calculateAge(birth, now);

  $("birthDate").value = getBirthDate();
  $("ageWeeks").textContent = age.weeks;
  $("ageDays").textContent = age.remainingDays;
  $("totalDays").textContent = age.days;
  $("statDays").textContent = age.days;
  $("statWeeks").textContent = age.weeks;
  $("statMonths").textContent = age.months;

  const hours = age.days * 24 + now.getHours();
  const minutes = hours * 60 + now.getMinutes();
  const seconds = minutes * 60 + now.getSeconds();
  $("liveCounter").textContent =
    `${hours.toLocaleString("pt-BR")} horas · ${minutes.toLocaleString("pt-BR")} minutos · ${seconds.toLocaleString("pt-BR")} segundos`;

  const phraseIndex = Math.floor(age.days / 7) % phrases.length;
  $("dailyPhrase").textContent = phrases[phraseIndex];

  updateMilestones(birth, now);
}

function updateMilestones(birth, now) {
  const milestones = [
    { label: "Nascimento", months: 0 },
    { label: "2 meses", months: 2 },
    { label: "3 meses", months: 3 },
    { label: "6 meses", months: 6 },
    { label: "9 meses", months: 9 },
    { label: "1 ano", months: 12 }
  ];

  const timeline = $("timeline");
  timeline.innerHTML = "";

  milestones.forEach((item) => {
    const date = addMonths(birth, item.months);
    const active = now >= date;
    const article = document.createElement("article");
    article.className = `milestone ${active ? "active" : ""}`;
    article.innerHTML = `
      <div class="milestone-dot" aria-hidden="true"></div>
      <div>
        <strong>${item.label}</strong>
        <span>${formatDate(date)}</span>
      </div>
    `;
    timeline.appendChild(article);
  });

  const next = milestones.find(item => addMonths(birth, item.months) > now);
  if (next) {
    const nextDate = addMonths(birth, next.months);
    $("nextTitle").textContent = next.label;
    $("nextDate").textContent = formatDate(nextDate);
    $("nextDays").textContent = diffDays(now, nextDate);
  } else {
    $("nextTitle").textContent = "1 ano completo";
    $("nextDate").textContent = formatDate(addMonths(birth, 12));
    $("nextDays").textContent = "♥";
  }
}

function saveBirthDate() {
  const value = $("birthDate").value;
  if (!value) return;
  const selected = parseLocalDate(value);
  if (selected > new Date()) {
    $("birthHelper").textContent = "A data não pode estar no futuro.";
    return;
  }
  localStorage.setItem(BIRTH_KEY, value);
  $("birthHelper").textContent = "Data salva. A idade será atualizada automaticamente.";
  updateAge();
}

function getComments() {
  try {
    return JSON.parse(localStorage.getItem(COMMENTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function getLikedIds() {
  try {
    return JSON.parse(localStorage.getItem(LIKES_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveComments(comments) {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}

function renderComments() {
  const comments = getComments().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const likedIds = getLikedIds();
  const list = $("commentsList");

  $("commentCount").textContent =
    `${comments.length} ${comments.length === 1 ? "mensagem" : "mensagens"}`;

  list.innerHTML = "";

  if (!comments.length) {
    list.innerHTML = `<div class="empty-comments">Ainda não há mensagens. Seja o primeiro a deixar um carinho. ♥</div>`;
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
    date.textContent = formatDateTime(new Date(comment.createdAt));

    top.append(identity, date);

    const text = document.createElement("div");
    text.className = "comment-text";
    text.textContent = comment.text;

    const like = document.createElement("button");
    like.type = "button";
    like.className = `like-button ${likedIds.includes(comment.id) ? "liked" : ""}`;
    like.dataset.id = comment.id;
    like.setAttribute("aria-label", "Curtir mensagem");
    like.innerHTML = `♥ <span>${comment.likes || 0}</span>`;

    article.append(top, text, like);
    list.appendChild(article);
  });
}

function handleCommentSubmit(event) {
  event.preventDefault();

  const name = $("commentName").value.trim();
  const relation = $("commentRelation").value;
  const text = $("commentText").value.trim();

  if (!name || !relation || !text) {
    $("formNote").textContent = "Preencha nome, parentesco e mensagem antes de publicar.";
    return;
  }

  const comments = getComments();
  comments.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    relation,
    text,
    createdAt: new Date().toISOString(),
    likes: 0
  });

  saveComments(comments);
  event.target.reset();
  $("charCount").textContent = "0";
  $("formNote").textContent = "Mensagem publicada com carinho. ♥";
  renderComments();
}

function handleLike(event) {
  const button = event.target.closest(".like-button");
  if (!button) return;

  const id = button.dataset.id;
  const comments = getComments();
  const likedIds = getLikedIds();
  const comment = comments.find(item => item.id === id);
  if (!comment) return;

  const index = likedIds.indexOf(id);

  if (index === -1) {
    comment.likes = (comment.likes || 0) + 1;
    likedIds.push(id);
  } else {
    comment.likes = Math.max(0, (comment.likes || 0) - 1);
    likedIds.splice(index, 1);
  }

  saveComments(comments);
  localStorage.setItem(LIKES_KEY, JSON.stringify(likedIds));
  renderComments();
}

$("saveBirthDate").addEventListener("click", saveBirthDate);
$("commentForm").addEventListener("submit", handleCommentSubmit);
$("commentsList").addEventListener("click", handleLike);
$("commentText").addEventListener("input", () => {
  $("charCount").textContent = $("commentText").value.length;
});

$("birthDate").value = getBirthDate();
updateAge();
renderComments();
setInterval(updateAge, 1000);
