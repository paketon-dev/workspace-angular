export * from './lib/ui-lib.service';
export * from './lib/ui-lib.component';
export * from './lib/components/sidebar/sidebar.component';
export * from './lib/components/table/table.component';
export * from './lib/components/nav-bar/nav-bar.component';
export * from './lib/components/modal/modal.component';
export * from './lib/components/progress-bar/progress-bar.component';
export * from './lib/components/toast/toast.component';
export * from './lib/components/chart/chart.component';
export * from './lib/components/gauge/gauge.component';


export * from './lib/components/toast/toast.service';


export * from './lib/utils/date.utils';
export * from './lib/utils/helpers';
export * from './lib/utils/logger';
export * from './lib/utils/storage.utils';
export * from './lib/utils/validation.utils';








// 1️⃣ Компоненты графиков

// ChartComponent (Line / Area / Bar) – базовый компонент для линейных и столбчатых графиков.

// PieChartComponent / DoughnutChartComponent – круговые графики с возможностью подсветки сегментов.

// RadarChartComponent / PolarChartComponent – для визуализации нескольких категорий на радиальной сетке.

// SparklineComponent – мини-графики для компактных панелей или таблиц.

// StackedBarChartComponent – для наглядного сравнения категорий и их долей.

// 💡 Для построения графиков можно использовать Chart.js, ngx-charts или D3.js в качестве движка.

// 2️⃣ Индикаторы и KPI

// GaugeComponent / DialComponent – круговой индикатор прогресса или уровня (как спидометр).

// MiniStatCardComponent – карточка с KPI + мини-иконкой/графиком.

// SparklineProgressComponent – маленький горизонтальный/вертикальный график внутри карточки.

// 3️⃣ Таблицы и визуальные элементы

// DataTableComponent – продвинутая таблица с сортировкой, фильтрацией и пагинацией.

// HeatMapComponent – для визуализации интенсивности данных (например, количество пользователей по часам).

// TimelineComponent – для показа событий во времени.

// 4️⃣ Диаграммы потоков / сетей

// FlowChartComponent – для отображения процессов и связей.

// NetworkGraphComponent – визуализация графов (узлы и связи).

// 5️⃣ Мелкие визуальные элементы

// Badge / Label / TagComponent – для индикации статусов.

// TooltipComponent – всплывающая подсказка с возможностью HTML-контента.

// SkeletonLoaderComponent – скелетон-загрузчик для таблиц и списков.



// 🔹 Что уже есть

// ✅ Компоненты:

// SidebarComponent — боковое меню

// TableComponent — динамическая таблица

// NavBarComponent — горизонтальное меню

// UiLibComponent — базовый тестовый компонент

// ✅ Утилиты:

// date.utils — форматирование дат

// helpers — вспомогательные функции

// logger — логирование

// storage.utils — работа с localStorage/sessionStorage

// validation.utils — валидации

// ✅ Сервис:

// ui-lib.service — центральный сервис библиотеки

// 🔸 Что можно добавить — чтобы библиотека была завершённой и профессиональной
// 🧩 1. Компоненты (UI)

// Добавь простые, часто используемые компоненты для переиспользования:

// Компонент	Назначение	Файл
// ButtonComponent	Универсальная кнопка с разными темами (primary, danger, outline)	components/button/button.component.ts
// ModalComponent	Модальное окно с событиями open / close	components/modal/modal.component.ts
// LoaderComponent	Индикатор загрузки (спиннер / прогресс)	components/loader/loader.component.ts
// BadgeComponent	Маленький бейдж (для количества уведомлений, статусов)	components/badge/badge.component.ts
// CardComponent	Карточка с заголовком и контентом	components/card/card.component.ts
// ToastComponent	Всплывающее уведомление (успех, ошибка, инфо)	components/toast/toast.component.ts

// 💡 Эти компоненты универсальны и легко комбинируются в реальных проектах.

// ⚙️ 2. Директивы
// Директива	Назначение
// DebounceClickDirective — предотвращает множественные клики по кнопке.	
// TooltipDirective — выводит подсказку при наведении.	
// AutoFocusDirective — автоматически фокусирует элемент при отображении.	

// 📁 lib/directives/tooltip.directive.ts, debounce-click.directive.ts, и т.д.

// 🧠 3. Пайпы (Pipes)
// Пайп	Назначение
// TruncatePipe — обрезает длинные строки ("Some very long text..." → "Some very…")	
// SafeHtmlPipe — безопасное отображение HTML	
// CurrencyPipe (расширение) — форматирование чисел по валюте	
// DateAgoPipe — вывод даты как "5 минут назад", "вчера", "3 дня назад"	

// 📁 lib/pipes/truncate.pipe.ts, safe-html.pipe.ts, и т.д.

// 🧰 4. Утилиты (Utils)
// Файл	Назначение
// string.utils.ts — капитализация, преобразование в slug, trimming и т.д.	
// number.utils.ts — округление, форматирование, процентовка	
// array.utils.ts — уникальные элементы, сортировка, chunk()	
// api.utils.ts — базовые функции работы с API (fetch с токеном, retry)	
// color.utils.ts — генерация случайных цветов, контраст, преобразование HEX↔RGB	
// 🧑‍💻 5. Сервисы
// Сервис	Назначение
// ToastService — управляет уведомлениями (для ToastComponent)	
// ThemeService — управление светлой/тёмной темой	
// BreakpointService — централизованный отслеживатель ширины экрана (responsive)	