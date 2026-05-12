const API_BASE = "https://api.soholms.com/api/v1";
const SOHO_TOKEN = window.SOHO_API_TOKEN || "";
const COURSE_ID = 23978;
const TARGET_FLOW_ID = 34749;
const TARGET_PRODUCT_NAME = 'Интенсив "Постойнное Повторение"';

const fallbackCourses = [
  {
    id: "ege-base",
    productId: COURSE_ID,
    flowId: 2397801,
    exam: "ege",
    name: "ЕГЭ База",
    description: "Основной пакет подготовки к ЕГЭ: теория по темам, домашние задания, разбор типовых задач и еженедельный контроль прогресса.",
    price: 18900,
    start: "1 июня",
    end: "31 августа 2026",
    schedule: "2 занятия в неделю",
    lessons: 24,
    level: "Базовый пакет",
    tag: "Хит",
    art: "ЕГЭ",
    artA: "#0f172a",
    artB: "#1f7a4e",
    details: {
      intro: "Полный цикл подготовки к ЕГЭ — от повторения теории до уверенного результата.",
      includes: [
        "24 онлайн-занятия по расписанию (2 раза в неделю)",
        "Теория по всем темам кодификатора ЕГЭ",
        "Домашние задания с проверкой преподавателем",
        "Разбор типовых задач первой и второй части",
        "Еженедельный контроль прогресса и обратная связь",
        "Доступ к записям всех занятий",
      ],
      format: "Живые онлайн-занятия по 3-4 часа в малых группах.",
      result: "Системные знания и спокойная подготовка к экзамену без хаоса в голове.",
    },
    selected: true,
  },
  {
    id: "ege-pro",
    productId: COURSE_ID,
    flowId: 2397802,
    exam: "ege",
    name: "ЕГЭ Профиль",
    description: "Интенсив для сильного результата: вторая часть, сложные задания, регулярные пробники и персональные рекомендации.",
    price: 24900,
    start: "1 июня",
    end: "31 августа 2026",
    schedule: "3 занятия в неделю",
    lessons: 36,
    level: "Расширенный пакет",
    tag: "Максимум",
    art: "100",
    artA: "#0f766e",
    artB: "#164e63",
    details: {
      intro: "Интенсив для высокого балла: упор на сложные задания и вторую часть.",
      includes: [
        "36 онлайн-занятий по расписанию (3 раза в неделю)",
        "Подробный разбор второй части и заданий повышенной сложности",
        "Регулярные пробные экзамены с детальным разбором",
        "Персональные рекомендации по слабым темам",
        "Домашние задания с развёрнутой проверкой",
        "Доступ к записям всех занятий",
      ],
      format: "Живые онлайн-занятия по 3-4 часа в малых группах.",
      result: "Уверенное решение всех типов задач и максимум баллов на экзамене.",
    },
    selected: true,
  },
  {
    id: "ege-final",
    productId: COURSE_ID,
    flowId: 2397803,
    exam: "ege",
    name: "ЕГЭ Финальный рывок",
    description: "Короткий пакет перед экзаменом: повторение ключевых тем, разбор ошибок, пробники и стратегия распределения времени.",
    price: 12900,
    start: "15 апреля",
    end: "25 мая 2026",
    schedule: "4 занятия в неделю",
    lessons: 16,
    level: "Интенсив",
    art: "май",
    artA: "#111827",
    artB: "#0f766e",
    details: {
      intro: "Короткий пакет перед экзаменом — закрываем пробелы и тренируем стратегию.",
      includes: [
        "16 онлайн-занятий (4 раза в неделю)",
        "Повторение ключевых тем экзамена",
        "Разбор частых ошибок",
        "Пробные экзамены в формате ЕГЭ",
        "Стратегия распределения времени на экзамене",
        "Доступ к записям всех занятий",
      ],
      format: "Интенсивный режим, живые онлайн-занятия по 3-4 часа.",
      result: "Спокойствие и чёткий план действий на самом экзамене.",
    },
    selected: false,
  },
  {
    id: "oge-base",
    productId: COURSE_ID,
    flowId: 2397811,
    exam: "oge",
    name: "ОГЭ База",
    description: "Стартовый пакет подготовки к ОГЭ: повторение школьной программы, тренировка первой части и понятный план занятий.",
    price: 14900,
    start: "3 июня",
    end: "28 августа 2026",
    schedule: "2 занятия в неделю",
    lessons: 22,
    level: "Базовый пакет",
    tag: "Хит",
    art: "ОГЭ",
    artA: "#0f172a",
    artB: "#075985",
    details: {
      intro: "Стартовый пакет подготовки к ОГЭ с понятным планом занятий.",
      includes: [
        "22 онлайн-занятия (2 раза в неделю)",
        "Повторение школьной программы",
        "Тренировка первой части ОГЭ",
        "Домашние задания с проверкой преподавателем",
        "Регулярный контроль прогресса",
        "Доступ к записям всех занятий",
      ],
      format: "Живые онлайн-занятия по 3-4 часа в малых группах.",
      result: "Систематизированные знания и снижение стресса перед экзаменом.",
    },
    selected: false,
  },
  {
    id: "oge-plus",
    productId: COURSE_ID,
    flowId: 2397812,
    exam: "oge",
    name: "ОГЭ Плюс",
    description: "Пакет с дополнительной практикой: задания второй части, проверка решений преподавателем и регулярные мини-пробники.",
    price: 19900,
    start: "3 июня",
    end: "28 августа 2026",
    schedule: "3 занятия в неделю",
    lessons: 30,
    level: "Расширенный пакет",
    art: "5",
    artA: "#312e81",
    artB: "#581c87",
    details: {
      intro: "Пакет с дополнительной практикой и проверкой решений преподавателем.",
      includes: [
        "30 онлайн-занятий (3 раза в неделю)",
        "Задания второй части ОГЭ",
        "Проверка решений преподавателем",
        "Регулярные мини-пробники",
        "Домашние задания с обратной связью",
        "Доступ к записям всех занятий",
      ],
      format: "Живые онлайн-занятия по 3-4 часа в малых группах.",
      result: "Готовность к заданиям повышенной сложности и высокий балл.",
    },
    selected: false,
  },
  {
    id: "oge-sprint",
    productId: COURSE_ID,
    flowId: 2397813,
    exam: "oge",
    name: "ОГЭ Спринт",
    description: "Быстрый пакет для закрытия пробелов: диагностика, точечные занятия по слабым темам и финальный пробный экзамен.",
    price: 9900,
    start: "20 апреля",
    end: "25 мая 2026",
    schedule: "4 занятия в неделю",
    lessons: 12,
    level: "Интенсив",
    tag: "Новинка",
    art: "ОГЭ",
    artA: "#0f766e",
    artB: "#164e63",
    details: {
      intro: "Быстрый пакет для закрытия пробелов перед экзаменом.",
      includes: [
        "12 онлайн-занятий (4 раза в неделю)",
        "Диагностика слабых тем",
        "Точечные занятия по пробелам",
        "Финальный пробный экзамен",
        "Разбор ошибок и рекомендации",
        "Доступ к записям всех занятий",
      ],
      format: "Интенсивный режим, живые онлайн-занятия по 3-4 часа.",
      result: "Закрытые пробелы и уверенность на экзамене.",
    },
    selected: false,
  },
];

const courseCopy = [
  {
    test: /Математика.*ЕГЭ/i,
    description: "Повторим основные темы, разберем типовые задания и соберем знания в систему перед экзаменом.",
    accent: "Помогает подойти к ЕГЭ спокойнее, увереннее и без хаоса в голове.",
  },
  {
    test: /Русский.*ЕГЭ/i,
    description: "Повторим правила, отработаем тестовую часть и разберем частые ошибки перед экзаменом.",
    accent: "Помогает быстро освежить правила и увереннее выполнять задания на экзамене.",
  },
  {
    test: /Информатика.*ЕГЭ/i,
    description: "Повторим основные типы заданий, алгоритмы решения и разберем частые ошибки.",
    accent: "Помогает структурировать подход к задачам и не теряться на экзамене.",
  },
  {
    test: /Обществознание.*ЕГЭ/i,
    description: "Повторим основные блоки теории, разберем задания и частые ошибки в ответах.",
    accent: "Помогает собрать большой объем материала в понятную систему перед экзаменом.",
  },
  {
    test: /Физика.*ЕГЭ/i,
    description: "Повторим формулы, типовые задачи и алгоритмы решения перед экзаменом.",
    accent: "Помогает уверенно вспомнить нужные формулы и применять их в задачах.",
  },
  {
    test: /История.*ЕГЭ/i,
    description: "Повторим ключевые даты, события, личности и задания экзаменационного формата.",
    accent: "Помогает быстро освежить материал и связать события в понятную картину.",
  },
  {
    test: /Математика.*ОГЭ/i,
    description: "Повторим основные темы, отработаем типовые задания и разберем ошибки перед экзаменом.",
    accent: "Помогает систематизировать материал и снизить стресс перед экзаменом.",
  },
  {
    test: /Русский.*ОГЭ/i,
    description: "Повторим правила, тестовую часть, изложение и сочинение перед экзаменом.",
    accent: "Помогает прийти на ОГЭ с понятным планом действий и уверенностью.",
  },
];

let courses = [...fallbackCourses];
let activeExam = "ege";

class SohoApiError extends Error {
  constructor(message, data) {
    super(message);
    this.name = "SohoApiError";
    this.data = data;
  }
}

const els = {
  courseList: document.querySelector("#courseList"),
  detailsModal: document.querySelector("#detailsModal"),
  detailsModalBody: document.querySelector("#detailsModalBody"),
  orderItems: document.querySelector("#orderItems"),
  selectedCounter: document.querySelector("#selectedCounter"),
  orderCount: document.querySelector("#orderCount"),
  subtotal: document.querySelector("#subtotal"),
  discount: document.querySelector("#discount"),
  promoInput: document.querySelector("#promoInput"),
  promoDiscountLine: document.querySelector("#promoDiscountLine"),
  total: document.querySelector("#total"),
  buttonTotal: document.querySelector("#buttonTotal"),
  sortSelect: document.querySelector("#sortSelect"),
  examTabs: document.querySelectorAll("[data-exam-tab]"),
  paymentForm: document.querySelector("#paymentForm"),
  payButton: document.querySelector("#payButton"),
  checkoutResult: document.querySelector("#checkoutResult"),
  clientName: document.querySelector("#clientName"),
  clientPhone: document.querySelector("#clientPhone"),
  studentName: document.querySelector("#studentName"),
  studentPhone: document.querySelector("#studentPhone"),
};

const money = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

function formatMoney(value) {
  return money.format(value).replace("RUB", "₽");
}

function icon(name) {
  const icons = {
    calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    monitor: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>',
  };
  return icons[name];
}

function selectedCourses() {
  return courses.filter((course) => course.selected);
}

function selectedCourse() {
  return selectedCourses()[0] || null;
}

function totals() {
  const subtotal = selectedCourses().reduce((sum, course) => sum + course.price, 0);
  const promo = els.promoInput.value.trim().toUpperCase();
  const discount = promo === "PLANCK10" ? Math.round(subtotal * 0.1) : 0;
  return { subtotal, discount, total: subtotal - discount };
}

function selectedStudentName() {
  return els.studentName.value.trim() || "ученик";
}

function normalizeRussianName(value) {
  return value.replace(/\s+/g, " ").trim();
}

function isRussianFullName(value) {
  return /^[А-ЯЁа-яё]+ [А-ЯЁа-яё]+$/.test(normalizeRussianName(value));
}

function phoneDigits(value) {
  return value.replace(/\D/g, "");
}

function normalizeRussianPhone(value) {
  const digits = phoneDigits(value);
  if (digits.length !== 11 || !/^[78]/.test(digits)) return "";
  return `7${digits.slice(1)}`;
}

function splitRussianFullName(value) {
  const [lastName, firstName] = normalizeRussianName(value).split(" ");
  return { firstName, lastName };
}

function formatRussianPhone(value) {
  const normalized = normalizeRussianPhone(value);
  const digits = normalized || phoneDigits(value).replace(/^8/, "7").replace(/^7?/, "7").slice(0, 11);
  const parts = [
    digits.slice(1, 4),
    digits.slice(4, 7),
    digits.slice(7, 11),
  ].filter(Boolean);
  return `+7${parts.length ? ` ${parts.join(" ")}` : ""}`;
}

function setFieldValidity(input, message = "") {
  input.setCustomValidity(message);
  input.closest("label")?.classList.toggle("field-invalid", Boolean(message));
}

function validateNameInput(input) {
  input.value = normalizeRussianName(input.value);
  const message = isRussianFullName(input.value) ? "" : "Введите ровно два слова русскими буквами: фамилию и имя.";
  setFieldValidity(input, message);
  return !message;
}

function validatePhoneInput(input) {
  input.value = formatRussianPhone(input.value);
  const message = normalizeRussianPhone(input.value) ? "" : "Введите российский номер: +7 или 8, затем 10 цифр.";
  setFieldValidity(input, message);
  return !message;
}

function sanitizeNameInput(input) {
  input.value = input.value.replace(/[^А-ЯЁа-яё\s]/g, "").replace(/\s{2,}/g, " ");
  setFieldValidity(input);
}

function sanitizePhoneInput(input) {
  input.value = formatRussianPhone(input.value);
  setFieldValidity(input);
}

function validatedFormData() {
  const nameInputs = [els.clientName, els.studentName];
  const phoneInputs = [els.clientPhone, els.studentPhone];
  const isValid = [
    ...nameInputs.map(validateNameInput),
    ...phoneInputs.map(validatePhoneInput),
  ].every(Boolean);

  if (!isValid) {
    els.paymentForm.reportValidity();
    return null;
  }

  const formData = new FormData(els.paymentForm);
  nameInputs.forEach((input) => formData.set(input.name, normalizeRussianName(input.value)));
  phoneInputs.forEach((input) => formData.set(input.name, formatRussianPhone(input.value)));
  return formData;
}

function sortedCourses() {
  const mode = els.sortSelect.value;
  return courses.filter((course) => course.exam === activeExam).sort((a, b) => {
    if (mode === "priceAsc") return a.price - b.price;
    if (mode === "priceDesc") return b.price - a.price;
    return Number(b.selected) - Number(a.selected);
  });
}

function stripProductName(name) {
  const match = String(name).match(/пакет\s+"([^"]+)"/i);
  return match?.[1] || String(name).replace(TARGET_PRODUCT_NAME, "").replace(/,\s*старт.*$/i, "").trim();
}

function courseExam(name) {
  return /ОГЭ/i.test(name) ? "oge" : "ege";
}

function courseArt(name) {
  if (/100/i.test(name)) return "100";
  if (/ОГЭ/i.test(name)) return "ОГЭ";
  if (/ЕГЭ/i.test(name)) return "ЕГЭ";
  return "PP";
}

function courseImage(name) {
  const images = [
    { test: /Математика.*ОГЭ/i, src: "assets/intensives/math-oge.png" },
    { test: /Русский.*ОГЭ/i, src: "assets/intensives/russian-oge.png" },
    { test: /Информатика.*ОГЭ/i, src: "assets/intensives/informatics-oge.png" },
    { test: /Обществознание.*ОГЭ/i, src: "assets/intensives/social-oge.png" },
    { test: /Физика.*ОГЭ/i, src: "assets/intensives/physics-oge.png" },
    { test: /Математика/i, src: "assets/intensives/math-ege.png" },
    { test: /Русский/i, src: "assets/intensives/russian-ege.png" },
    { test: /Информатика/i, src: "assets/intensives/informatics-ege.png" },
    { test: /Обществознание/i, src: "assets/intensives/social-ege.png" },
    { test: /Физика/i, src: "assets/intensives/physics-ege.png" },
    { test: /История/i, src: "assets/intensives/history-ege.png" },
  ];
  return images.find((item) => item.test.test(name))?.src || "";
}

function courseSchedule(name) {
  const schedule = [
    { test: /Математика ЕГЭ - 100/i, dates: "4-7 июня", count: 7 },
    { test: /Математика ЕГЭ - Джентльмен/i, dates: "5-7 июня", count: 5 },
    { test: /Математика.*Лице/i, dates: "4-7 июня", count: 4 },
    { test: /Русский.*ЕГЭ/i, dates: "1-3 июня", count: 4 },
    { test: /История.*ЕГЭ/i, dates: "30-31 мая", count: 2 },
    { test: /Физика.*ЕГЭ/i, dates: "8-10 июня", count: 4 },
    { test: /Обществознание.*ЕГЭ/i, dates: "8-10 июня", count: 3 },
    { test: /Информатика.*ЕГЭ/i, dates: "14-17 июня", count: 4 },
    { test: /Математика.*ОГЭ/i, dates: "старт 25 мая", count: 4 },
    { test: /Русский.*ОГЭ/i, dates: "старт 25 мая", count: 3 },
    { test: /Информатика.*ОГЭ/i, dates: "старт 25 мая", count: 2 },
    { test: /Физика.*ОГЭ/i, dates: "старт 25 мая", count: 2 },
    { test: /Обществознание.*ОГЭ/i, dates: "старт 25 мая", count: 2 },
  ];

  return schedule.find((item) => item.test.test(name)) || { dates: "старт 25 мая", count: 1 };
}

function courseCopyFor(name) {
  return courseCopy.find((item) => item.test.test(name));
}

function coursePriceOverride(name) {
  const overrides = [
    { test: /Математика ЕГЭ - Джентльмен/i, price: 5500 },
    { test: /Математика ЕГЭ - 100/i, price: 6500 },
  ];
  return overrides.find((item) => item.test.test(name))?.price;
}

function renderCourses() {
  const visibleCourses = sortedCourses();
  els.courseList.innerHTML = visibleCourses.length
    ? visibleCourses
    .map(
      (course) => `
        <article class="course-card ${course.selected ? "selected" : ""}" style="--art-a: ${course.artA}; --art-b: ${course.artB}">
          <div class="course-art">
            ${course.image ? `<img src="${course.image}" alt="${course.name}">` : `<span>${course.art}<small>${course.lessons ? `${course.lessons} занятий` : "старт 25 мая"}</small></span>`}
          </div>
          <div class="course-info">
            <div class="course-title-row">
              <h3>${course.name}</h3>
              ${course.tag ? `<span class="hot">${course.tag}</span>` : ""}
            </div>
            <p>${course.description}</p>
            ${course.accent ? `<p class="course-accent">${course.accent}</p>` : ""}
            <div class="meta-row">
              <span class="meta">${icon("calendar")} ${course.dates}</span>
              <span class="meta">${icon("clock")} ${course.count} ${plural(course.count, ["интенсив", "интенсива", "интенсивов"])}</span>
              <span class="meta">${icon("clock")} 3-4 часа каждый</span>
            </div>
            <div class="tag-row">
              <span class="tag">${course.level}</span>
            </div>
            <button class="course-details-btn" type="button" data-details="${course.id}">Подробнее о пакете</button>
          </div>
          <strong class="course-price">${formatMoney(course.price)}</strong>
          <button class="icon-action" type="button" data-toggle="${course.id}" title="${course.selected ? "Убрать" : "Добавить"}">
            ${course.selected ? icon("trash") : icon("plus")}
          </button>
        </article>
      `,
    )
    .join("")
    : `<div class="order-empty">Пакеты курса ${TARGET_PRODUCT_NAME} не найдены в product/list.</div>`;
}

function renderOrder() {
  const selected = selectedCourses();
  const { subtotal, discount, total } = totals();
  const studentName = selectedStudentName();
  els.orderItems.innerHTML = selected.length
    ? selected
        .map(
          (course) => `
            <div class="order-item" style="--art-a: ${course.artA}; --art-b: ${course.artB}">
              <span class="order-thumb">${course.art}</span>
              <div>
                <h3>${course.name}</h3>
                <p>Для: ${studentName}</p>
              </div>
              <strong>${formatMoney(course.price)}</strong>
              <button class="remove-item" type="button" data-toggle="${course.id}" title="Убрать пакет">${icon("x")}</button>
            </div>
          `,
        )
        .join("")
    : `<div class="order-empty">Выберите хотя бы один пакет, чтобы сформировать ссылку на оплату.</div>`;

  els.selectedCounter.textContent = `${selected.length} выбрано`;
  els.orderCount.textContent = `${selected.length} ${plural(selected.length, ["пакет", "пакета", "пакетов"])}`;
  els.subtotal.textContent = formatMoney(subtotal);
  els.discount.textContent = `-${formatMoney(discount)}`;
  els.promoDiscountLine.hidden = discount === 0;
  els.total.textContent = formatMoney(total);
  els.buttonTotal.textContent = formatMoney(total);
  els.payButton.disabled = selected.length === 0;
}

function plural(number, words) {
  const mod10 = number % 10;
  const mod100 = number % 100;
  if (mod10 === 1 && mod100 !== 11) return words[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return words[1];
  return words[2];
}

function toggleCourse(packageId) {
  courses = courses.map((course) => (course.id === packageId ? { ...course, selected: !course.selected } : course));
  render();
}

function setActiveExam(exam) {
  activeExam = exam;
  els.examTabs.forEach((tab) => {
    const isActive = tab.dataset.examTab === exam;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  renderCourses();
}

function render() {
  renderCourses();
  renderOrder();
}

async function sohoRequest(path, body) {
  if (!SOHO_TOKEN) {
    await new Promise((resolve) => setTimeout(resolve, 420));
    return mockResponse(path, body);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: SOHO_TOKEN,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new SohoApiError(data?.error?.message || data?.message || "Ошибка API SOHO.LMS", data);
  }
  return data;
}

async function loadProducts() {
  if (!SOHO_TOKEN) return;
  const data = await sohoRequest("/product/list");
  if (!Array.isArray(data.products)) return;

  const products = data.products.filter((item) => {
    const name = String(item.name || "");
    return Number(item.flowId) === TARGET_FLOW_ID && name.includes(TARGET_PRODUCT_NAME);
  });

  if (!products.length) {
    courses = [];
    render();
    return;
  }

  courses = products
    .map((product) => {
    const name = stripProductName(product.name);
    const template = fallbackCourses.find((course) => course.exam === courseExam(name)) || fallbackCourses[0];
    const schedule = courseSchedule(name);
    const copy = courseCopyFor(name);
    return {
      ...template,
      id: `product-${product.productId}`,
      productId: product.productId,
      flowId: product.flowId,
      name,
      description: copy?.description || `Пакет интенсива "Постойнное Повторение", старт с 25 мая.`,
      accent: copy?.accent || "",
      price: coursePriceOverride(name) ?? (Number(product.price) || 0),
      start: "25 мая",
      dates: schedule.dates,
      count: schedule.count,
      end: "",
      schedule: "3-4 часа",
      lessons: 0,
      level: /100/i.test(name) ? "Расширенный пакет" : "Интенсив",
      tag: "",
      art: courseArt(name),
      image: courseImage(name),
      paymentSchemaId: product.paymentSchemas?.[0]?.id,
      selected: false,
    };
  })
    .sort((a, b) => {
      if (a.exam !== b.exam) return a.exam === "ege" ? -1 : 1;
      return b.price - a.price;
    })
    .map((course, index) => ({
      ...course,
      tag: index < 2 ? "В продаже" : "",
      selected: index === 0,
    }));
  render();
}

function clientIdFromResponse(data) {
  return data?.clientId || data?.id || data?.client?.clientId || data?.client?.id || data?.data?.clientId || data?.data?.id;
}

function clientIdFromMessage(message) {
  const match = String(message).match(/\/crm\/clients\/(\d+)/);
  return match ? Number(match[1]) : 0;
}

async function createClient(name, phone, role) {
  const { firstName, lastName } = splitRussianFullName(name);
  let client;
  try {
    client = await sohoRequest("/client/add_client", {
      firstName,
      lastName,
      phones: [normalizeRussianPhone(phone)],
    });
  } catch (error) {
    const existingClientId = clientIdFromMessage(error.message);
    if (existingClientId) return existingClientId;
    throw error;
  }

  const clientId = clientIdFromResponse(client);

  if (!clientId) {
    throw new Error(`SOHO.LMS создал клиента (${role}), но не вернул clientId.`);
  }

  return clientId;
}

async function createOrderClients(formData) {
  const parentName = formData.get("parentName");
  const parentPhone = formData.get("parentPhone");
  const studentName = formData.get("studentName");
  const studentPhone = formData.get("studentPhone");
  const parentClientId = await createClient(parentName, parentPhone, "родитель");
  const sameClient = normalizeRussianName(parentName) === normalizeRussianName(studentName)
    && normalizeRussianPhone(parentPhone) === normalizeRussianPhone(studentPhone);
  const studentClientId = sameClient ? parentClientId : await createClient(studentName, studentPhone, "ученик");

  return { parentClientId, studentClientId };
}

async function createMasterOrder({ courses, price, clientId, customerId, comment }) {
  if (location.protocol === "file:") {
    return { uid: Math.floor(100000 + Math.random() * 900000), positions: courses };
  }

  const response = await fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courses, price, clientId, customerId, comment }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "SOHO.LMS не создал заказ с выбранными пакетами.");
  }
  return data.order;
}

async function createCheckout(formData) {
  const selected = selectedCourses();
  if (!selected.length) {
    throw new Error("Выберите хотя бы один пакет для оплаты.");
  }

  const { total } = totals();
  const { parentClientId, studentClientId } = await createOrderClients(formData);
  const comment = [
    "Единая оплата выбранных пакетов",
    `Курс: learning/courses/${COURSE_ID}/`,
    `Пакеты: ${selected.map((course) => `${course.id} ${course.name}`).join("; ")}`,
    `Родитель: ${formData.get("parentName")}, ${formData.get("parentPhone")}, clientId ${parentClientId}`,
    `Ученик: ${formData.get("studentName")}, ${formData.get("studentPhone")}, clientId ${studentClientId}`,
    `Промокод: ${formData.get("promo") || "не указан"}`,
    "Способ оплаты: СБП",
  ].join("\n");

  const order = await createMasterOrder({
    courses: selected,
    price: total,
    clientId: parentClientId,
    customerId: studentClientId,
    comment,
  });

  const orderId = order.uid || order.orderId || 0;
  if (order.paymentUrl) {
    return { orderId, paymentUrl: order.paymentUrl };
  }

  const existingPayment = order.payments?.find((payment) => payment.paymentUrl);
  if (existingPayment?.paymentUrl) {
    return { orderId, paymentUrl: existingPayment.paymentUrl };
  }

  const payment = await sohoRequest("/order/payment/add", {
    orderId,
    amount: total,
    deadlineAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    comment: "Консолидированный платёж за выбранные курсы",
  });

  if (!payment.paymentUrl) {
    throw new Error("SOHO.LMS создал заказ, но не вернул ссылку на оплату.");
  }

  return { orderId, paymentUrl: payment.paymentUrl };
}

function mockResponse(path) {
  if (path === "/client/add_client") {
    return {
      clientId: Math.floor(100000 + Math.random() * 900000),
    };
  }
  if (path === "/order/add") {
    return {
      orderId: Math.floor(100000 + Math.random() * 900000),
      payments: [],
    };
  }
  if (path === "/order/payment/add") {
    return {
      id: Math.floor(1000 + Math.random() * 9000),
      paymentUrl: "https://pay.example.com/soho-demo-checkout",
    };
  }
  return { result: true };
}

let activeDetailsCourseId = null;

function courseDetailsBodyHtml(course) {
  const details = course.details || {};
  const includes = Array.isArray(details.includes) ? details.includes : [];
  const intro = details.intro || course.description || "";
  return `
    <div class="modal-head" style="--art-a: ${course.artA}; --art-b: ${course.artB}">
      <span class="modal-thumb">${course.image ? `<img src="${course.image}" alt="${course.name}">` : course.art}</span>
      <div class="modal-head-info">
        <div class="course-title-row">
          <h2 id="detailsModalTitle">${course.name}</h2>
          ${course.tag ? `<span class="hot">${course.tag}</span>` : ""}
        </div>
        <p class="modal-price">${formatMoney(course.price)}</p>
      </div>
    </div>
    ${intro ? `<p class="modal-intro">${intro}</p>` : ""}
    ${includes.length ? `
      <h3 class="modal-subtitle">Что входит в пакет</h3>
      <ul class="modal-includes">
        ${includes.map((item) => `<li>${icon("check")}<span>${item}</span></li>`).join("")}
      </ul>` : ""}
    <div class="modal-meta">
      <span class="meta">${icon("calendar")} ${course.dates}</span>
      <span class="meta">${icon("clock")} ${course.schedule}</span>
      ${course.lessons ? `<span class="meta">${icon("monitor")} ${course.lessons} занятий</span>` : ""}
      <span class="tag">${course.level}</span>
    </div>
    ${details.format ? `<p class="modal-note"><strong>Формат:</strong> ${details.format}</p>` : ""}
    ${details.result ? `<p class="modal-note"><strong>Результат:</strong> ${details.result}</p>` : ""}
    <button class="modal-action${course.selected ? " is-remove" : ""}" type="button" data-toggle="${course.id}">
      ${course.selected ? "Убрать из заказа" : "Добавить в заказ"}
    </button>
  `;
}

function openDetailsModal(courseId) {
  const course = courses.find((item) => item.id === courseId);
  if (!course) return;
  activeDetailsCourseId = courseId;
  els.detailsModalBody.innerHTML = courseDetailsBodyHtml(course);
  els.detailsModal.hidden = false;
  els.detailsModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function refreshDetailsModal() {
  if (!activeDetailsCourseId || els.detailsModal.hidden) return;
  const course = courses.find((item) => item.id === activeDetailsCourseId);
  if (!course) {
    closeDetailsModal();
    return;
  }
  els.detailsModalBody.innerHTML = courseDetailsBodyHtml(course);
}

function closeDetailsModal() {
  els.detailsModal.hidden = true;
  els.detailsModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  activeDetailsCourseId = null;
}

document.addEventListener("click", (event) => {
  const examTab = event.target.closest("[data-exam-tab]");
  if (examTab) setActiveExam(examTab.dataset.examTab);

  const details = event.target.closest("[data-details]");
  if (details) openDetailsModal(details.dataset.details);

  if (event.target.closest("[data-modal-close]")) closeDetailsModal();

  const toggle = event.target.closest("[data-toggle]");
  if (toggle) {
    toggleCourse(toggle.dataset.toggle);
    refreshDetailsModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !els.detailsModal.hidden) closeDetailsModal();
});

document.addEventListener("change", (event) => {
  if (event.target.matches("#sortSelect")) renderCourses();
  if (event.target.matches('input[name="method"]')) {
    document.querySelectorAll(".method").forEach((method) => method.classList.remove("active"));
    event.target.closest(".method").classList.add("active");
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches("#promoInput, #studentName")) renderOrder();
  if (event.target.matches("#clientName, #studentName")) sanitizeNameInput(event.target);
  if (event.target.matches("#clientPhone, #studentPhone")) sanitizePhoneInput(event.target);
});

document.addEventListener("blur", (event) => {
  if (event.target.matches("#clientName, #studentName")) validateNameInput(event.target);
  if (event.target.matches("#clientPhone, #studentPhone")) validatePhoneInput(event.target);
}, true);

els.paymentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = validatedFormData();
  if (!formData) return;

  els.payButton.disabled = true;
  els.checkoutResult.hidden = false;
  els.checkoutResult.textContent = "Создаём заказ и готовим ссылку на оплату...";

  try {
    const checkout = await createCheckout(formData);
    els.checkoutResult.innerHTML = `
      Заказ №${checkout.orderId} создан. Переходим к оплате:
      <a href="${checkout.paymentUrl}" target="_blank" rel="noreferrer">${checkout.paymentUrl}</a>
    `;
    window.location.assign(checkout.paymentUrl);
  } catch (error) {
    els.checkoutResult.textContent = error.message;
  } finally {
    els.payButton.disabled = selectedCourses().length === 0;
  }
});

loadProducts().finally(render);
