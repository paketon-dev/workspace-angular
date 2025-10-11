// npm i @angular/animations

// Ядро библиотеки
export * from './lib/ui-lib.service';         // Сервис библиотеки
export * from './lib/ui-lib.component';       // Основной компонент библиотеки

// Навигация
export * from './lib/components/sidebar/sidebar.component';   // Боковая панель
export * from './lib/components/nav-bar/nav-bar.component';   // Навигационная панель

// Отображение данных
export * from './lib/components/table/table.component';       // Таблица
export * from './lib/components/chart/chart.component';       // Графики (Chart.js)
export * from './lib/components/gauge/gauge.component';       // Gauge / индикатор
export * from './lib/components/heat-map/heat-map.component'; // Тепловая карта
export * from './lib/components/timeline/timeline.component'; // Лента событий

// Обратная связь и уведомления
export * from './lib/components/progress-bar/progress-bar.component'; // Прогресс-бар
export * from './lib/components/toast/toast.component';               // Toast уведомления
export * from './lib/components/toast/toast.service';                 // Сервис для Toast уведомлений
export * from './lib/components/modal/modal.component';               // Модальные окна
export * from './lib/components/tooltip/tooltip.component';           // Подсказки (tooltip)
// Пример использования Tooltip:
// <lib-tooltip content="Подсказка сверху">
//   <input type="text">
// </lib-tooltip>

// Загрузка
export * from './lib/components/skeleton-loader/skeleton-loader.component'; // Skeleton loader для таблиц и списков

// Формы
export * from './lib/components/form-field/form-field.component'; // Поле ввода с лейблом, ошибками и иконками
export * from './lib/components/date-picker/date-picker.component'; // Календарь (DatePicker)
export * from './lib/components/time-picker/time-picker.component'; // Таймпикер (TimePicker)
export * from './lib/components/select/select.component';           // Кастомный селект с поиском и мультивыбором
export * from './lib/components/checkbox/checkbox.component';       // Кастомный чекбокс

// Утилиты
export * from './lib/utils/date.utils';       // Работа с датами
export * from './lib/utils/helpers';          // Вспомогательные функции
export * from './lib/utils/logger';           // Логирование
export * from './lib/utils/storage.utils';    // Работа с localStorage/sessionStorage
export * from './lib/utils/validation.utils'; // Валидация данных
export * from './lib/utils/color.utils';      // Генерация цветов, контрастов и палитр
