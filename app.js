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
    description: "Основной пакет подготовки к ЕГЭ: теория по темам, разбор типовых задач и еженедельный контроль прогресса.",
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
        "24 очных занятия по расписанию (2 раза в неделю)",
        "Теория по всем темам кодификатора ЕГЭ",
        "Разбор типовых задач первой и второй части",
        "Еженедельный контроль прогресса и обратная связь",
        "Доступ к записям всех занятий",
      ],
      format: "Очные занятия по 3-4 часа в малых группах.",
      result: "Системные знания и спокойная подготовка к экзамену без хаоса в голове.",
    },
    selected: false,
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
        "36 очных занятий по расписанию (3 раза в неделю)",
        "Подробный разбор второй части и заданий повышенной сложности",
        "Регулярные пробные экзамены с детальным разбором",
        "Персональные рекомендации по слабым темам",
        "Доступ к записям всех занятий",
      ],
      format: "Очные занятия по 3-4 часа в малых группах.",
      result: "Уверенное решение всех типов задач и максимум баллов на экзамене.",
    },
    selected: false,
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
        "16 очных занятий (4 раза в неделю)",
        "Повторение ключевых тем экзамена",
        "Разбор частых ошибок",
        "Пробные экзамены в формате ЕГЭ",
        "Стратегия распределения времени на экзамене",
        "Доступ к записям всех занятий",
      ],
      format: "Интенсивный режим, очные занятия по 3-4 часа.",
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
        "22 очных занятия (2 раза в неделю)",
        "Повторение школьной программы",
        "Тренировка первой части ОГЭ",
        "Регулярный контроль прогресса",
        "Доступ к записям всех занятий",
      ],
      format: "Очные занятия по 3-4 часа в малых группах.",
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
    description: "Пакет с дополнительной практикой: задания второй части и регулярные мини-пробники.",
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
      intro: "Пакет с дополнительной практикой второй части ОГЭ.",
      includes: [
        "30 очных занятий (3 раза в неделю)",
        "Задания второй части ОГЭ",
        "Регулярные мини-пробники",
        "Доступ к записям всех занятий",
      ],
      format: "Очные занятия по 3-4 часа в малых группах.",
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
        "12 очных занятий (4 раза в неделю)",
        "Диагностика слабых тем",
        "Точечные занятия по пробелам",
        "Финальный пробный экзамен",
        "Разбор ошибок и рекомендации",
        "Доступ к записям всех занятий",
      ],
      format: "Интенсивный режим, очные занятия по 3-4 часа.",
      result: "Закрытые пробелы и уверенность на экзамене.",
    },
    selected: false,
  },
  {
    id: "math-liceists",
    productId: COURSE_ID,
    flowId: 0,
    exam: "ege",
    name: "Математика ЕГЭ - Лицеисты",
    description: "Четыре интенсива по задачам лицейской математики ЕГЭ — №14, №17, №18, №19: самые «дорогие» задания второй части профиля.",
    price: 5500,
    start: "4 июня",
    end: "7 июня 2026",
    schedule: "по расписанию",
    level: "Интенсив",
    art: "14·17·18·19",
    artA: "#1e1b4b",
    artB: "#4c1d95",
    selected: false,
  },
];

const courseCopy = [
  {
    // Математика ЕГЭ — «Джентльмен» (5 интенсивов). Должен идти раньше общего матчера по математике ЕГЭ.
    test: /Джентльмен/i,
    description: "Пять интенсивов по «джентльменскому набору» профильной математики — задания, которые приносят балл реальнее всего.",
    accent: "Берём задания, которые приносят балл реальнее всего, и доводим их до автоматизма.",
    details: {
      intro: "Пять интенсивов на крепкий результат: первая часть без потерь плюс заходы №13, №15, №16 — и финальное повторение, чтобы всё это работало вместе.",
      intensiveDates: ["5 июня · 10:00", "онлайн-формат · для всех желающих", "5 июня · 15:00", "6 июня · 10:00", "7 июня · 10:00"],
      includes: [
        "<strong>Интенсив 1 — Первая часть.</strong> Задания 1–12: проценты и графики, теория вероятностей, планиметрия и стереометрия, производная — быстро и без обидных ошибок.",
        "<strong>Интенсив 2 — Задание 13 (уравнения) · Бонусный онлайн.</strong> Тригонометрические, показательные и логарифмические уравнения, отбор корней на отрезке. Открытый онлайн-интенсив — приходят все желающие.",
        "<strong>Интенсив 3 — Задание 15 (неравенства).</strong> Метод интервалов, замены, логарифмические и показательные неравенства — алгоритм под любой тип.",
        "<strong>Интенсив 4 — Задание 16 (экономическая задача).</strong> Кредиты, вклады и оптимизация — строим модель задачи и доводим до полного балла без вычислительных ошибок.",
        "<strong>Интенсив 5 — Повторение.</strong> Полный прогон, пробники, разбор ошибок, тайминг и стратегия на экзамене.",
      ],
      format: "Очные занятия по 3–4 часа: разбор задач у доски, доступ к записям.",
      result: "Уверенная первая часть и решённые №13, №15, №16 — это уже крепкий балл на профиле.",
    },
  },
  {
    // Математика ЕГЭ — «Стобалльник» / «100баллник» (7 интенсивов). Тоже раньше общего матчера.
    test: /Математика ЕГЭ - 100|100\s*ба?лльник|Стобал/i,
    description: "Семь интенсивов на максимум: вся первая часть плюс самые «дорогие» задания второй части профильной математики.",
    accent: "Берём всю вторую часть, включая №18 и №19 — те задания, что отделяют 80 баллов от 100.",
    details: {
      intro: "Семь интенсивов на максимальный результат — от первой части на скорость до параметра, теории чисел и экономической задачи.",
      intensiveDates: ["5 июня · 10:00", "онлайн-формат · для всех желающих", "5 июня · 15:00", "6 июня · 10:00", "6 июня · 15:00", "4 июня · 15:00", "7 июня · 10:00"],
      includes: [
        "<strong>Интенсив 1 — Первая часть.</strong> Задания 1–12 на скорость и без потерь — фундамент стобалльного варианта.",
        "<strong>Интенсив 2 — Задание 13 (уравнения) · Бонусный онлайн.</strong> Тригонометрические, показательные и логарифмические уравнения, отбор корней. Открытый онлайн-интенсив — приходят все желающие.",
        "<strong>Интенсив 3 — Задание 15 (неравенства).</strong> Метод интервалов, замены, логарифмические и показательные неравенства.",
        "<strong>Интенсив 4 — Задание 16 (экономическая задача).</strong> Кредиты, вклады и оптимизация — строим модель задачи и доводим до полного балла.",
        "<strong>Интенсив 5 — Задания 18–19 (параметр и теория чисел).</strong> Графические и аналитические методы для №18, приёмы для №19 — самые «дорогие» баллы варианта.",
        "<strong>Интенсив 6 — Задания 14 и 17 (стереометрия и планиметрия).</strong> Объёмы, углы и расстояния в пространстве в №14; ключевые конфигурации и доказательные задачи планиметрии в №17.",
        "<strong>Интенсив 7 — Повторение.</strong> Полные пробники, разбор ошибок, тайминг и стратегия на 90+.",
      ],
      format: "Очные занятия по 3–4 часа: разбор задач у доски, доступ к записям.",
      result: "Вся вторая часть под контролем, включая №18 и №19 — реальный заход на 90+.",
    },
  },
  {
    // Математика ЕГЭ — «Лицеисты» (4 интенсива). Раньше общего матчера.
    test: /Лице/i,
    description: "Четыре интенсива по задачам лицейской математики ЕГЭ — №14, №17, №18, №19: самые «дорогие» задания второй части профиля.",
    accent: "Берём четыре задания, которые отделяют 85 баллов от 100, и доводим каждое до результата.",
    details: {
      intro: "Курс для тех, кто уже уверен в первой части и хочет добрать баллы в самых сложных заданиях второй части профильной математики.",
      intensiveDates: ["7 июня · 10:00", "6 июня · 15:00", "5 июня · 15:00", "4 июня · 15:00"],
      includes: [
        "<strong>Интенсив 1 — Задание 14 (стереометрия).</strong> Объёмы, углы и расстояния в пространстве: тетраэдры, призмы, пирамиды — строим вспомогательные сечения и доводим решение до полного балла.",
        "<strong>Интенсив 2 — Задание 17 (планиметрия).</strong> Ключевые конфигурации и доказательные задачи: вписанные и описанные окружности, подобие, углы — разбираем чистые геометрические приёмы без координат.",
        "<strong>Интенсив 3 — Задание 18 (параметр).</strong> Уравнения и неравенства с параметром: графические и аналитические методы, разбор случаев, отбор ответов — алгоритм под любой тип задачи.",
        "<strong>Интенсив 4 — Задание 19 (теория чисел).</strong> Делимость, НОД и НОК, алгоритм Евклида, сравнения по модулю — разбираем приёмы и доводим решение до полного оформления.",
      ],
      format: "Очные занятия по 3–4 часа: разбор задач у доски, доступ к записям.",
      result: "Четыре задания второй части отработаны до уверенного решения — реальный заход на 90+.",
    },
  },
  {
    test: /Математика.*ЕГЭ/i,
    description: "Повторим основные темы, разберем типовые задания и соберем знания в систему перед экзаменом.",
    accent: "Помогает подойти к ЕГЭ спокойнее, увереннее и без хаоса в голове.",
  },
  {
    test: /Русский.*ЕГЭ/i,
    description: "Четыре интенсива по русскому ЕГЭ — закрываем вариант по блокам: пунктуация, орфография, текст и сочинение.",
    accent: "Закрываем вариант по блокам — к экзамену не остаётся тем, в которых ты «плаваешь».",
    details: {
      intro: "Курс собран так, чтобы по очереди закрыть все болевые точки варианта ЕГЭ по русскому — от расстановки запятых до сочинения на максимум.",
      intensiveDates: ["1 июня · 15:00", "2 июня · 10:00", "3 июня · 10:00", "4 июня · 10:00"],
      includes: [
        "<strong>Интенсив 1 — Пунктуация (задания 16–21).</strong> Однородные члены, обособления, вводные слова, сложные предложения, тире и двоеточие — со всеми ловушками формата.",
        "<strong>Интенсив 2 — Орфография (задания 9–15).</strong> Корни, приставки, суффиксы, Н/НН, слитно-раздельно, НЕ и НИ — систематизируем правила и доводим до автоматизма.",
        "<strong>Интенсив 3 — Текст, нормы и сочинение (задания 1–8, 22–26, 27).</strong> Работа с текстом, лексические и грамматические нормы, средства связи и выразительности, структура и логика сочинения на полный балл.",
        "<strong>Интенсив 4 — Всё и сразу.</strong> Финальный прогон всего варианта: пробники, разбор ошибок, стратегия и тайминг на экзамене.",
      ],
      format: "Очные занятия по 3–4 часа: тренировка на реальных заданиях, доступ к записям.",
      result: "Каждый блок варианта отработан, сочинение пишется по понятному алгоритму — без паники на экзамене.",
    },
  },
  {
    test: /Информатика.*ЕГЭ/i,
    description: "Четыре интенсива по информатике ЕГЭ — проходим вариант по дням: аналитика, задачи в LibreOffice и программирование на Python от простого к сложному.",
    accent: "Закрываем вариант по блокам — к экзамену не остаётся тем, в которых ты «плаваешь».",
    details: {
      intro: "Курс собран по дням так, чтобы по очереди отработать все типы заданий ЕГЭ по информатике: сначала «ручная» аналитика, затем задачи на электронных таблицах и текстовых документах, и две порции программирования на Python — база и самые «дорогие» задания второй части.",
      intensiveDates: ["14 июня · 10:00", "15 июня · 10:00", "16 июня · 10:00", "17 июня · 10:00"],
      includes: [
        "<strong>Интенсив 1 — День 1: Аналитика.</strong> Задания 1, 4, 7, 8, 11, 12, 15: симметричные и несимметричные графы, кодирование букв и слов по условию Фано, кодирование и передача звуковой и графической информации, кодирование текстовой информации, Машина Тьюринга, параметр в логическом выражении, порядок слов и разбор вопросов.",
        "<strong>Интенсив 2 — День 2: LibreOffice и старт Python.</strong> LibreOffice: поиск в текстовом документе (10), поиск в базе данных (3), исполнитель Робот (18), параллельные и последовательные процессы (22). Первые задачи на Python: таблица истинности логического выражения (2), алгоритм над числом (5), черепаха (6), комбинаторика (8).",
        "<strong>Интенсив 3 — День 3: Python.</strong> Задания 9, 13, 14, 16, 17: построчная обработка чисел файла, IP-адреса, системы счисления, рекурсивные функции, обработка чисел файла.",
        "<strong>Интенсив 4 — День 4: Python (сложные задания).</strong> Задания 19–21, 23, 24, 25: теория игр, траектории программ, поиск подстрок, маска и делители числа — самые «дорогие» задания второй части.",
      ],
      format: "Очные занятия по 3–4 часа: разбор задач за компьютером, доступ к записям.",
      result: "Каждый блок варианта отработан, есть готовые шаблоны решений на Python — без сюрпризов на экзамене.",
    },
  },
  {
    test: /Обществознание.*ЕГЭ/i,
    description: "Три интенсива по обществознанию ЕГЭ — проходим все четыре блока теории, каждый раз сразу закрепляем заданиями 19, 20, 25 и итоговым тестом.",
    accent: "Закрываем вариант по блокам — к экзамену не остаётся тем, в которых ты «плаваешь».",
    details: {
      intro: "Курс построен так, чтобы каждый блок обществознания отработать до конца: сначала теория, сразу — задания 19, 20, 25, потом тест. Так материал ложится в систему, а не рассыпается к экзамену.",
      intensiveDates: ["8 июня · 15:30", "9 июня · 10:00", "10 июня · 10:00"],
      includes: [
        "<strong>Интенсив 1 — День 1: Человек и общество.</strong> Разминка на нескольких тестовых вариантах, повторение теории блока «Человек и общество», написание заданий 19, 20, 25 по блоку.",
        "<strong>Интенсив 2 — День 2: Экономика и социология.</strong> Разминочный тест по блоку «Что»; повторение теории экономики и написание заданий 19, 20, 25; повторение теории социологии и написание заданий 19, 20, 25 по блоку.",
        "<strong>Интенсив 3 — День 3: Политика и право.</strong> Разминочный тест по экономике и социальной сфере; повторение теории политики и права; написание заданий 19, 20, 25 по обоим блокам; итоговый тест по политике и праву.",
      ],
      format: "Очные занятия по 3–4 часа: теория + практика по заданиям 19, 20, 25, доступ к записям.",
      result: "Все четыре блока отработаны с заданиями второй части — к экзамену есть понятный алгоритм для каждого типа вопроса.",
    },
  },
  {
    test: /Физика.*ЕГЭ/i,
    description: "Четыре интенсива по физике ЕГЭ — раскладываем курс по разделам, чтобы к экзамену не осталось «слепых зон».",
    accent: "Закрываем вторую часть так, чтобы на экзамене не было сюрпризов.",
    details: {
      intro: "Системная подготовка ко второй части и сложным заданиям ЕГЭ по физике: проходим все разделы по очереди — от механики до оптики и расчётных задач.",
      intensiveDates: ["8 июня · 15:00", "9 июня · 10:00", "9 июня · 15:00", "10 июня · 10:00"],
      includes: [
        "<strong>Интенсив 1 — Механика.</strong> Кинематика, динамика, законы сохранения, статика и гидростатика — фундамент, на котором держится половина варианта.",
        "<strong>Интенсив 2 — Тепловая и молекулярная физика.</strong> МКТ, газовые законы, термодинамика, агрегатные состояния — учимся не путаться в формулах и графиках процессов.",
        "<strong>Интенсив 3 — Электромагнитные явления.</strong> Электростатика, постоянный ток, магнитное поле, электромагнитная индукция, колебания и волны.",
        "<strong>Интенсив 4 — Оптика и вся вторая часть.</strong> Геометрическая и волновая оптика, элементы СТО и квантовой физики, плюс отработка расчётных задач второй части с правильным оформлением.",
      ],
      format: "Очные занятия по 3–4 часа: разбор задач у доски, доступ к записям.",
      result: "Уверенное решение второй части и понимание, какую формулу когда применять.",
    },
  },
  {
    test: /История.*ЕГЭ/i,
    description: "Два интенсива по истории ЕГЭ — закрываем карты, сложные задания второй части и культуру, каждый день заканчивается прорешкой первой части.",
    accent: "Отрабатываем самые «дорогие» задания второй части и закрепляем первую часть до автоматизма.",
    details: {
      intro: "Курс построен так, чтобы за два дня закрыть всё, на чём чаще всего теряют баллы: работа с картами, сложные задания второй части, культура — и каждый день заканчивается прорешкой первой части для закрепления.",
      intensiveDates: ["30 мая · 10:00", "31 мая · 10:00"],
      includes: [
        "<strong>Интенсив 1 — День 1: Карты и задания 18–19.</strong> Работа с историческими картами и схемами, отработка заданий 18 и 19, закрепление пройденного материала и прорешка первой части экзамена.",
        "<strong>Интенсив 2 — День 2: Культура и задания 20–21.</strong> Работа с заданиями по культуре, отработка заданий 20 и 21, закрепление пройденного материала и прорешка первой части экзамена.",
      ],
      format: "Очные занятия по 3–4 часа: разбор заданий у доски, доступ к записям.",
      result: "Уверенная работа с картами и заданиями второй части, первая часть отработана до автоматизма.",
    },
  },
  {
    test: /Математика.*ОГЭ/i,
    description: "Четыре интенсива по математике ОГЭ — закрываем обе части: алгебра и геометрия первой части, уравнения, текстовые задачи и графики из второй.",
    accent: "Закрываем вариант по блокам — к экзамену не остаётся тем, в которых ты «плаваешь».",
    details: {
      intro: "Курс собран так, чтобы по очереди отработать всё, что приносит баллы на ОГЭ по математике: сначала уверенная первая часть, затем самые «решаемые» задания второй.",
      intensiveDates: ["29 мая · 10:00", "30 мая · 10:00", "31 мая · 10:00", "1 июня · 10:00"],
      includes: [
        "<strong>Интенсив 1 — Первая часть: алгебра.</strong> Вычисления, преобразования выражений, уравнения и неравенства, проценты, прогрессии, чтение графиков и диаграмм — быстро и без обидных ошибок.",
        "<strong>Интенсив 2 — Первая часть: геометрия.</strong> Треугольники, четырёхугольники, окружность, площади, углы, теорема Пифагора — все типовые задачи первой части и практические задачи на «реальную математику».",
        "<strong>Интенсив 3 — Вторая часть: уравнения и текстовые задачи.</strong> Решаем уравнения и системы повышенной сложности, разбираем текстовые задачи на движение, работу, проценты и смеси — с полным оформлением на балл.",
        "<strong>Интенсив 4 — Вторая часть: графики функций.</strong> Построение и исследование графиков, задачи с параметром в графической постановке — учимся оформлять решение так, чтобы эксперт поставил полный балл.",
      ],
      format: "Очные занятия по 3–4 часа: тренировка на реальных заданиях, доступ к записям.",
      result: "Уверенная первая часть и решённые задания второй — это уже крепкий балл на ОГЭ.",
    },
  },
  {
    test: /Физика.*ОГЭ/i,
    description: "Два интенсива по физике ОГЭ — доводим до автоматизма обе части: формулы, типовые задачи и оформление.",
    accent: "Доводим до автоматизма формулы и оформление — баллы не теряются на мелочах.",
    details: {
      intro: "Два интенсива, которые закрывают обе части ОГЭ по физике: сначала формулы и первая часть, затем вторая часть и «защита баллов».",
      intensiveDates: ["14 июня · 10:00", "15 июня · 10:00"],
      includes: [
        "<strong>Интенсив 1 — Формулы, законы и первая часть.</strong> Повторяем все формулы и законы сразу под конкретные задачи, отрабатываем типовые задания первой части в разных форматах.",
        "<strong>Интенсив 2 — Вторая часть и «защита баллов».</strong> Решаем типовые задачи второй части, повторяем ключевые темы и разбираем, за что чаще всего снимают баллы — и как этого не допустить.",
      ],
      format: "Очные занятия по 3–4 часа: много практики, доступ к записям.",
      result: "Полный набор формул в голове и навык оформления второй части без потери баллов.",
    },
  },
  {
    test: /Обществознание.*ОГЭ|Общество.*ОГЭ/i,
    description: "Два интенсива по самым сложным темам обществознания ОГЭ — повторяем то, на чём чаще всего теряют баллы.",
    accent: "Закрываем самые сложные темы обществознания — там, где обычно сыпется балл.",
    details: {
      intro: "Два интенсива по «проваливаемым» темам обществознания: сначала человек, культура и экономика, затем политика и право.",
      intensiveDates: ["14 июня · 10:00", "15 июня · 10:00"],
      includes: [
        "<strong>Интенсив 1 — Человек, культура, экономика, общество.</strong> Познание и мировоззрение, формы и виды культуры, типы обществ, экономические системы, государственное регулирование экономики, рынки, социальные роли и статусы.",
        "<strong>Интенсив 2 — Политика и право.</strong> Форма государства, легитимность власти, политические партии, избирательная система, система права, юридическая ответственность, основы конституционного строя, правоотношения.",
      ],
      format: "Очные занятия по 3–4 часа: разбор заданий и формулировок ответов, доступ к записям.",
      result: "Сложные темы разложены по полочкам — на экзамене они больше не пугают.",
    },
  },
  {
    test: /Русский.*ОГЭ/i,
    description: "Три интенсива по русскому ОГЭ — проходим всю программу: орфография, пунктуация, текст, грамматика, сочинение и изложение.",
    accent: "Проходим всю программу ОГЭ — орфография, пунктуация, текст, сочинение, изложение.",
    details: {
      intro: "Полная отработка ОГЭ по русскому: закрываем тестовую часть, учимся писать сочинение и сжимать изложение. Точная разбивка по дням ещё формируется, но в курс войдёт всё перечисленное.",
      intensiveDates: ["6 июня · 15:00", "7 июня · 15:00", "8 июня · 10:00"],
      includes: [
        "<strong>Орфография и пунктуация.</strong> Повторяем правила и тренируем тестовую часть до автоматизма.",
        "<strong>Текст и грамматика.</strong> Анализ текста, грамматические нормы, средства связи — всё, что проверяет тестовая часть ОГЭ.",
        "<strong>Сочинение и изложение.</strong> Разбираем все типы сочинения ОГЭ, учимся аргументировать по критериям; техника сжатия текста и конспектирования на слух — на реальных аудиозаписях.",
      ],
      format: "Очные занятия по 3–4 часа: много практики, доступ к записям.",
      result: "Готовность ко всем заданиям ОГЭ и понятный план действий на экзамене.",
    },
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
    { test: /Математика.*ОГЭ/i, dates: "29 мая - 1 июня", count: 4 },
    { test: /Русский.*ОГЭ/i, dates: "6-8 июня", count: 3 },
    { test: /Информатика.*ОГЭ/i, dates: "4-5 июня", count: 2 },
    { test: /Физика.*ОГЭ/i, dates: "14-15 июня", count: 2 },
    { test: /Обществознание.*ОГЭ/i, dates: "14-15 июня", count: 2 },
  ];

  return schedule.find((item) => item.test.test(name)) || { dates: "даты уточняются", count: 1 };
}

function courseCopyFor(name) {
  return courseCopy.find((item) => item.test.test(name));
}

function coursePriceOverride(name) {
  const overrides = [
    { test: /Математика ЕГЭ - Джентльмен/i, price: 5500 },
    { test: /Математика ЕГЭ - 100/i, price: 6500 },
    { test: /Лицеист/i, price: 5500 },
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
    return Number(item.flowId) === TARGET_FLOW_ID && (name.includes(TARGET_PRODUCT_NAME) || /Лицеист/i.test(name) || Number(item.productId) === 1831795);
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
      details: copy?.details || null,
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
    .map((course) => ({
      ...course,
      tag: "В продаже",
      selected: false,
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
        ${includes.map((item, i) => {
          const d = details.intensiveDates?.[i];
          return `<li>${icon("check")}<span>${item}${d ? `<small class="intensive-date">${d}</small>` : ""}</span></li>`;
        }).join("")}
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
