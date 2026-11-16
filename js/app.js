(function () {
  'use strict';

  const TOPICS = window.WDPAI_TOPICS;
  const QUESTIONS = window.WDPAI_QUESTIONS;
  const SESSION_KEY = 'wdpai-quiz-session';
  const SETTINGS_KEY = 'wdpai-quiz-settings';
  const LETTERS = ['A', 'B', 'C', 'D'];
  const COUNT_OPTIONS = [10, 20, 40, 0]; // 0 = wszystkie z wybranych działów
  const GROUPS = [
    { id: 'css', name: 'Lista zagadnień: CSS' },
    { id: 'labs', name: 'Pozostałe tematy z laboratoriów 1-6' }
  ];

  const $ = (id) => document.getElementById(id);

  // ---------- Dane ----------

  function dataProblems() {
    if (!Array.isArray(TOPICS) || !Array.isArray(QUESTIONS)) {
      return ['Brak pliku z działami lub pytaniami.'];
    }
    if (QUESTIONS.length === 0) return ['Lista pytań jest pusta.'];
    const topicIds = new Set(TOPICS.map((t) => t.id));
    const seen = new Set();
    const problems = [];
    for (const q of QUESTIONS) {
      if (seen.has(q.id)) problems.push(`Powtórzony identyfikator pytania: ${q.id}`);
      seen.add(q.id);
      if (!topicIds.has(q.t)) problems.push(`${q.id}: nieznany dział "${q.t}"`);
      if (!Array.isArray(q.a) || q.a.length !== 4) problems.push(`${q.id}: pytanie musi mieć 4 odpowiedzi`);
      if (!Number.isInteger(q.c) || q.c < 0 || q.c > 3) problems.push(`${q.id}: niepoprawny indeks odpowiedzi`);
      if (!q.q || !q.why) problems.push(`${q.id}: brak treści lub wyjaśnienia`);
    }
    return problems;
  }

  const problems = dataProblems();
  if (problems.length > 0) {
    $('load-error').hidden = false;
    $('load-error-detail').textContent = problems.slice(0, 5).join(' · ');
    return;
  }

  const questionById = new Map(QUESTIONS.map((q) => [q.id, q]));
  const topicById = new Map(TOPICS.map((t) => [t.id, t]));
  const countByTopic = new Map(TOPICS.map((t) => [t.id, 0]));
  for (const q of QUESTIONS) countByTopic.set(q.t, countByTopic.get(q.t) + 1);

  // ---------- Pamięć przeglądarki ----------

  function load(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function store(key, value) {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Bez localStorage test działa, tylko nie przetrwa odświeżenia.
    }
  }

  // ---------- Pomocnicze ----------

  function plural(n, one, few, many) {
    if (n === 1) return one;
    const lastTwo = n % 100;
    const last = n % 10;
    if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return few;
    return many;
  }

  const questionsWord = (n) => `${n} ${plural(n, 'pytanie', 'pytania', 'pytań')}`;

  function shuffled(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // Tekst w `odwrotnych apostrofach` staje się elementem <code>. Wszystko przez textContent, bez innerHTML.
  function fillInline(el, text) {
    el.textContent = '';
    String(text).split('`').forEach((part, index) => {
      if (part === '') return;
      if (index % 2 === 1) {
        const code = document.createElement('code');
        code.textContent = part;
        el.appendChild(code);
      } else {
        el.appendChild(document.createTextNode(part));
      }
    });
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) fillInline(node, text);
    return node;
  }

  function codeBlock(source) {
    const pre = el('pre', 'code');
    const code = document.createElement('code');
    code.textContent = source;
    pre.appendChild(code);
    return pre;
  }

  function showScreen(name) {
    for (const id of ['screen-start', 'screen-quiz', 'screen-result']) {
      $(id).hidden = id !== `screen-${name}`;
    }
    document.body.dataset.screen = name;
  }

  // ---------- Ustawienia i ekran startowy ----------

  const defaultSettings = {
    topics: TOPICS.map((t) => t.id),
    count: 20,
    mode: 'learn'
  };

  function validSettings(value) {
    if (!value || !Array.isArray(value.topics)) return null;
    return {
      topics: value.topics.filter((id) => topicById.has(id)),
      count: COUNT_OPTIONS.includes(value.count) ? value.count : 20,
      mode: value.mode === 'exam' ? 'exam' : 'learn'
    };
  }

  let settings = validSettings(load(SETTINGS_KEY)) || { ...defaultSettings };
  let session = null;

  const form = $('setup');

  function buildStart() {
    $('start-lead').textContent =
      `${questionsWord(QUESTIONS.length)} jednokrotnego wyboru. Najwięcej dotyczy pozycjonowania, nakładek, ` +
      'Flexboxa, Media Queries i @media print, reszta obejmuje PHP, MVC, Dockera, Gita, HTML, Figmę i pracę z AI z laboratoriów 1\u20116.';

    const groupsRoot = $('topic-groups');
    for (const group of GROUPS) {
      const box = el('div', 'topic-group');
      box.appendChild(el('h3', 'topic-group__title', group.name));
      for (const topic of TOPICS.filter((t) => t.group === group.id)) {
        const label = el('label', 'choice choice--check');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'topic';
        input.value = topic.id;
        label.appendChild(input);
        const text = el('span', 'choice__text', topic.name);
        text.appendChild(el('span', 'choice__count', ` (${questionsWord(countByTopic.get(topic.id))})`));
        label.appendChild(text);
        box.appendChild(label);
      }
      groupsRoot.appendChild(box);
    }

    const countRoot = $('count-options');
    for (const value of COUNT_OPTIONS) {
      const label = el('label', 'choice choice--pill');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'count';
      input.value = String(value);
      label.appendChild(input);
      label.appendChild(el('span', '', value === 0 ? 'Wszystkie' : String(value)));
      countRoot.appendChild(label);
    }
  }

  function applySettingsToForm() {
    for (const box of form.querySelectorAll('input[name="topic"]')) {
      box.checked = settings.topics.includes(box.value);
    }
    for (const radio of form.querySelectorAll('input[name="count"]')) {
      radio.checked = Number(radio.value) === settings.count;
    }
    for (const radio of form.querySelectorAll('input[name="mode"]')) {
      radio.checked = radio.value === settings.mode;
    }
    updateStartButton();
  }

  function readSettingsFromForm() {
    settings = {
      topics: Array.from(form.querySelectorAll('input[name="topic"]:checked'), (box) => box.value),
      count: Number(form.querySelector('input[name="count"]:checked')?.value ?? 20),
      mode: form.querySelector('input[name="mode"]:checked')?.value === 'exam' ? 'exam' : 'learn'
    };
    store(SETTINGS_KEY, settings);
  }

  function availableCount(topicIds) {
    return topicIds.reduce((sum, id) => sum + (countByTopic.get(id) || 0), 0);
  }

  function plannedCount(s) {
    const available = availableCount(s.topics);
    return s.count === 0 ? available : Math.min(s.count, available);
  }

  function updateStartButton() {
    const button = $('start-btn');
    const hint = $('start-hint');
    const available = availableCount(settings.topics);
    const planned = plannedCount(settings);

    if (available === 0) {
      button.disabled = true;
      button.textContent = 'Rozpocznij test';
      hint.textContent = 'Zaznacz co najmniej jeden dział, żeby zacząć.';
      return;
    }
    button.disabled = false;
    button.textContent = `Rozpocznij test (${questionsWord(planned)})`;
    hint.textContent = settings.count !== 0 && settings.count > available
      ? `W wybranych działach jest tylko ${questionsWord(available)}, więc test będzie krótszy.`
      : '';
  }

  form.addEventListener('change', () => {
    readSettingsFromForm();
    updateStartButton();
  });

  form.querySelector('.presets').addEventListener('click', (event) => {
    const preset = event.target.closest('[data-preset]')?.dataset.preset;
    if (!preset) return;
    for (const box of form.querySelectorAll('input[name="topic"]')) {
      const group = topicById.get(box.value).group;
      box.checked = preset === 'all' || (preset === 'css' && group === 'css');
    }
    readSettingsFromForm();
    updateStartButton();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    readSettingsFromForm();
    if (plannedCount(settings) === 0) return;
    const pool = QUESTIONS.filter((q) => settings.topics.includes(q.t)).map((q) => q.id);
    startSession(shuffled(pool).slice(0, plannedCount(settings)), settings);
  });

  // ---------- Sesja ----------

  function startSession(ids, s) {
    session = {
      ids,
      // Kolejność A-D losowana zawsze: w danych poprawna odpowiedź najczęściej stoi na pierwszym miejscu.
      perms: ids.map(() => shuffled([0, 1, 2, 3])),
      answers: ids.map(() => null),
      current: 0,
      mode: s.mode,
      settings: { ...s }
    };
    saveSession();
    showQuiz();
  }

  function saveSession() {
    store(SESSION_KEY, session);
  }

  function restoreSession() {
    const saved = load(SESSION_KEY);
    if (!saved || !Array.isArray(saved.ids) || saved.ids.length === 0) return null;
    if (!saved.ids.every((id) => questionById.has(id))) return null;
    if (!Array.isArray(saved.answers) || saved.answers.length !== saved.ids.length) return null;
    if (!Array.isArray(saved.perms) || saved.perms.length !== saved.ids.length) return null;
    saved.current = Math.min(Math.max(0, saved.current | 0), saved.ids.length - 1);
    saved.mode = saved.mode === 'exam' ? 'exam' : 'learn';
    saved.settings = validSettings(saved.settings) || { ...defaultSettings };
    return saved;
  }

  const isCorrect = (i) => session.answers[i] === questionById.get(session.ids[i]).c;
  const answeredCount = () => session.answers.filter((a) => a !== null).length;

  // ---------- Ekran pytania ----------

  const answersRoot = $('answers');

  function showQuiz() {
    showScreen('quiz');
    renderQuestion();
    $('q-text').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  function answerTag(state) {
    return {
      selected: 'Twoja odpowiedź',
      chosenCorrect: 'Twoja odpowiedź, poprawna',
      chosenWrong: 'Twoja odpowiedź',
      correct: 'Poprawna odpowiedź'
    }[state] || '';
  }

  function renderQuestion() {
    const i = session.current;
    const total = session.ids.length;
    const q = questionById.get(session.ids[i]);
    const chosen = session.answers[i];
    const reveal = session.mode === 'learn' && chosen !== null;

    $('quiz-counter').textContent = `Pytanie ${i + 1} z ${total}`;
    $('progress-fill').style.width = `${(answeredCount() / total) * 100}%`;
    $('q-topic').textContent = topicById.get(q.t).name;
    fillInline($('q-text'), `${i + 1}. ${q.q}`);

    const codeRoot = $('q-code');
    codeRoot.textContent = '';
    if (q.code) codeRoot.appendChild(codeBlock(q.code));

    answersRoot.textContent = '';
    answersRoot.classList.toggle('is-locked', reveal);
    session.perms[i].forEach((orig, pos) => {
      const li = document.createElement('li');
      const button = el('button', 'answer');
      button.type = 'button';
      button.dataset.orig = String(orig);

      let state = '';
      if (reveal) {
        if (orig === q.c) state = orig === chosen ? 'chosenCorrect' : 'correct';
        else if (orig === chosen) state = 'chosenWrong';
      } else if (orig === chosen) {
        state = 'selected';
      }
      if (state) button.classList.add(`is-${state}`);
      button.setAttribute('aria-pressed', String(orig === chosen));
      if (reveal) button.setAttribute('aria-disabled', 'true');

      button.appendChild(el('span', 'answer__letter', LETTERS[pos]));
      const body = el('span', 'answer__body');
      body.appendChild(el('span', 'answer__text', q.a[orig]));
      if (state) body.appendChild(el('span', 'answer__tag', answerTag(state)));
      button.appendChild(body);
      li.appendChild(button);
      answersRoot.appendChild(li);
    });

    const feedback = $('feedback');
    feedback.textContent = '';
    feedback.className = 'feedback';
    if (reveal) {
      const good = chosen === q.c;
      const correctLetter = LETTERS[session.perms[i].indexOf(q.c)];
      feedback.classList.add(good ? 'feedback--good' : 'feedback--bad');
      feedback.appendChild(el('p', 'feedback__verdict', good ? 'Dobrze.' : `Źle. Poprawna odpowiedź to ${correctLetter}.`));
      feedback.appendChild(el('p', 'feedback__why', q.why));
      if (q.src) feedback.appendChild(el('p', 'feedback__src', `Źródło: ${q.src}`));
    }

    $('prev-btn').disabled = i === 0;
    $('next-btn').textContent = i === total - 1 ? 'Zobacz wynik' : 'Następne';

    renderCard();
  }

  function cellState(i) {
    if (session.answers[i] === null) return 'empty';
    if (session.mode === 'exam') return 'answered';
    return isCorrect(i) ? 'correct' : 'wrong';
  }

  const cellLabels = {
    empty: 'bez odpowiedzi',
    answered: 'odpowiedziano',
    correct: 'poprawnie',
    wrong: 'błędnie'
  };

  function renderCard() {
    const grid = $('card-grid');
    grid.textContent = '';
    session.ids.forEach((id, i) => {
      const li = document.createElement('li');
      const state = cellState(i);
      const button = el('button', `cell cell--${state}`, String(i + 1));
      button.type = 'button';
      button.dataset.index = String(i);
      button.setAttribute('aria-label', `Pytanie ${i + 1}: ${cellLabels[state]}`);
      if (i === session.current) button.setAttribute('aria-current', 'step');
      li.appendChild(button);
      grid.appendChild(li);
    });

    const answered = answeredCount();
    let summary = `Odpowiedzi: ${answered} z ${session.ids.length}`;
    if (session.mode === 'learn') {
      const good = session.answers.filter((a, i) => a !== null && isCorrect(i)).length;
      summary += `, poprawnych: ${good}`;
    }
    $('card-summary').textContent = summary;

    const legend = $('legend');
    legend.textContent = '';
    const items = session.mode === 'learn'
      ? [['current', 'bieżące'], ['correct', 'poprawnie'], ['wrong', 'błędnie'], ['empty', 'bez odpowiedzi']]
      : [['current', 'bieżące'], ['answered', 'odpowiedziano'], ['empty', 'bez odpowiedzi']];
    for (const [state, label] of items) {
      const li = el('li', 'legend__item');
      li.appendChild(el('span', `cell cell--sample cell--${state === 'current' ? 'empty' : state}${state === 'current' ? ' cell--current' : ''}`));
      li.appendChild(document.createTextNode(label));
      legend.appendChild(li);
    }
  }

  function choose(orig) {
    const i = session.current;
    if (session.mode === 'learn' && session.answers[i] !== null) return;
    session.answers[i] = orig;
    saveSession();
    renderQuestion();
    answersRoot.querySelector(`[data-orig="${orig}"]`)?.focus();
  }

  function go(index) {
    if (index < 0 || index >= session.ids.length) return;
    session.current = index;
    saveSession();
    renderQuestion();
    const question = $('question');
    $('q-text').focus({ preventScroll: true });
    if (question.getBoundingClientRect().top < 0) question.scrollIntoView({ block: 'start' });
  }

  answersRoot.addEventListener('click', (event) => {
    const button = event.target.closest('.answer');
    if (button) choose(Number(button.dataset.orig));
  });

  $('card-grid').addEventListener('click', (event) => {
    const button = event.target.closest('.cell');
    if (button) go(Number(button.dataset.index));
  });

  $('prev-btn').addEventListener('click', () => go(session.current - 1));
  $('next-btn').addEventListener('click', () => {
    if (session.current === session.ids.length - 1) requestFinish();
    else go(session.current + 1);
  });
  $('finish-btn').addEventListener('click', requestFinish);

  const dialog = $('finish-dialog');

  function requestFinish() {
    const missing = session.ids.length - answeredCount();
    if (missing === 0) {
      finish();
      return;
    }
    $('finish-dialog-text').textContent =
      `Bez odpowiedzi: ${missing} z ${questionsWord(session.ids.length)}. Pominięte liczą się jako błędne.`;
    dialog.showModal();
    $('finish-cancel').focus();
  }

  $('finish-cancel').addEventListener('click', () => dialog.close());
  $('finish-confirm').addEventListener('click', () => {
    dialog.close();
    finish();
  });

  document.addEventListener('keydown', (event) => {
    if (document.body.dataset.screen !== 'quiz' || dialog.open) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const target = event.target;
    if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;

    const key = event.key.toLowerCase();
    const letterPos = LETTERS.findIndex((l) => l.toLowerCase() === key);
    const digitPos = ['1', '2', '3', '4'].indexOf(key);
    const pos = letterPos !== -1 ? letterPos : digitPos;
    if (pos !== -1) {
      event.preventDefault();
      choose(session.perms[session.current][pos]);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(session.current + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(session.current - 1);
    }
  });

  // ---------- Wynik ----------

  function finish() {
    store(SESSION_KEY, null);
    showScreen('result');
    renderResult();
    $('result-title').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  function renderResult() {
    const total = session.ids.length;
    const good = session.ids.filter((id, i) => isCorrect(i)).length;
    const missing = total - answeredCount();
    const percent = Math.round((good / total) * 100);

    $('result-score').textContent = `${good} / ${total}`;
    const meta = [`${percent}% poprawnych`, session.mode === 'learn' ? 'tryb nauki' : 'tryb egzaminu'];
    if (missing > 0) meta.push(`bez odpowiedzi: ${missing}`);
    $('result-meta').textContent = meta.join(', ');

    const wrongIds = session.ids.filter((id, i) => !isCorrect(i));
    const retry = $('retry-wrong');
    retry.disabled = wrongIds.length === 0;
    retry.textContent = wrongIds.length === 0
      ? 'Brak błędnych do powtórzenia'
      : `Powtórz błędne i pominięte (${wrongIds.length})`;

    const rows = $('topic-rows');
    rows.textContent = '';
    for (const topic of TOPICS) {
      const indexes = session.ids.map((id, i) => i).filter((i) => questionById.get(session.ids[i]).t === topic.id);
      if (indexes.length === 0) continue;
      const ok = indexes.filter(isCorrect).length;
      const tr = document.createElement('tr');
      const th = el('th', '', topic.name);
      th.scope = 'row';
      tr.appendChild(th);
      tr.appendChild(el('td', 'num', String(ok)));
      tr.appendChild(el('td', 'num', String(indexes.length)));
      tr.appendChild(el('td', 'num', `${Math.round((ok / indexes.length) * 100)}%`));
      rows.appendChild(tr);
    }

    renderReview();
  }

  function renderReview() {
    const onlyWrong = document.querySelector('input[name="review"]:checked')?.value !== 'all';
    const list = $('review');
    list.textContent = '';
    let shown = 0;

    session.ids.forEach((id, i) => {
      if (onlyWrong && isCorrect(i)) return;
      shown++;
      const q = questionById.get(id);
      const chosen = session.answers[i];
      const item = el('li', `review__item ${isCorrect(i) ? 'review__item--good' : 'review__item--bad'}`);

      const head = el('p', 'review__head');
      head.appendChild(el('span', 'review__num', `Pytanie ${i + 1}`));
      head.appendChild(el('span', 'review__status', chosen === null ? 'bez odpowiedzi' : (isCorrect(i) ? 'poprawnie' : 'błędnie')));
      head.appendChild(el('span', 'review__topic', topicById.get(q.t).name));
      item.appendChild(head);
      item.appendChild(el('h3', 'review__q', q.q));
      if (q.code) item.appendChild(codeBlock(q.code));

      const answers = el('ol', 'review__answers');
      session.perms[i].forEach((orig, pos) => {
        const li = el('li', 'review__answer');
        if (orig === q.c) li.classList.add('is-correct');
        if (orig === chosen && orig !== q.c) li.classList.add('is-wrong');
        li.appendChild(el('span', 'answer__letter', LETTERS[pos]));
        const body = el('span', 'answer__body');
        body.appendChild(el('span', 'answer__text', q.a[orig]));
        if (orig === q.c) body.appendChild(el('span', 'answer__tag', orig === chosen ? 'Twoja odpowiedź, poprawna' : 'Poprawna odpowiedź'));
        else if (orig === chosen) body.appendChild(el('span', 'answer__tag', 'Twoja odpowiedź'));
        li.appendChild(body);
        answers.appendChild(li);
      });
      item.appendChild(answers);
      item.appendChild(el('p', 'review__why', q.why));
      if (q.src) item.appendChild(el('p', 'feedback__src', `Źródło: ${q.src}`));
      list.appendChild(item);
    });

    const empty = $('review-empty');
    empty.hidden = shown > 0;
    empty.textContent = shown > 0 ? '' : 'Wszystkie odpowiedzi są poprawne, nie ma czego poprawiać.';
  }

  for (const radio of document.querySelectorAll('input[name="review"]')) {
    radio.addEventListener('change', renderReview);
  }

  $('retry-wrong').addEventListener('click', () => {
    const wrongIds = session.ids.filter((id, i) => !isCorrect(i));
    if (wrongIds.length > 0) startSession(shuffled(wrongIds), session.settings);
  });

  $('retry-same').addEventListener('click', () => {
    const s = session.settings;
    const pool = QUESTIONS.filter((q) => s.topics.includes(q.t)).map((q) => q.id);
    const planned = plannedCount(s);
    if (planned === 0) {
      showStart();
      return;
    }
    startSession(shuffled(pool).slice(0, planned), s);
  });

  $('back-setup').addEventListener('click', showStart);
  $('print-btn').addEventListener('click', () => window.print());

  // ---------- Start ----------

  function showStart() {
    const saved = restoreSession();
    const resume = $('resume');
    if (saved) {
      const answered = saved.answers.filter((a) => a !== null).length;
      $('resume-text').textContent =
        `Masz przerwany test: pytanie ${saved.current + 1} z ${saved.ids.length}, ` +
        `${saved.mode === 'learn' ? 'tryb nauki' : 'tryb egzaminu'}, odpowiedzi: ${answered}.`;
      resume.hidden = false;
    } else {
      resume.hidden = true;
    }
    applySettingsToForm();
    showScreen('start');
  }

  $('resume-continue').addEventListener('click', () => {
    const saved = restoreSession();
    if (!saved) {
      showStart();
      return;
    }
    session = saved;
    showQuiz();
  });

  $('resume-discard').addEventListener('click', () => {
    store(SESSION_KEY, null);
    $('resume').hidden = true;
    $('start-btn').focus();
  });

  buildStart();
  showStart();
})();
