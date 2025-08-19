import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, ru } from '@/shared/locales';

// 🔁 Шаг 1: Сначала инициализируем i18n с пустыми ресурсами
i18n.use(initReactI18next).init({
  lng: 'en', // временный язык
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en,
    ru,
  }, // пусто — заполним потом
  defaultNS: 'common',
  initImmediate: false, // важно: чтобы не стартовал до добавления ресурсов
});

// 🔁 Шаг 2: Теперь можно безопасно добавлять бандлы
const modules = import.meta.glob('/src/**/i18n/*.json', { eager: true });

Object.keys(modules).forEach((path) => {
  const match = path.match(/\/src\/(.*)\/i18n\/([^.]+)\.json$/);
  if (match) {
    const [, dirPath, lang] = match; // dirPath: ../../features/operation/operation-list

    // Извлекаем относительный путь после '../../'
    const relativePath = dirPath.replace('../..', '').replace(/^\//, ''); // → features/operation/operation-list

    // Преобразуем в dotted namespace
    const namespace = relativePath.replace(/\//g, '.'); // → features.operation.operation-list
    console.log(namespace);
    const data = (modules[path] as { default: Record<string, unknown> }).default;

    // Добавляем бандл, если ещё не добавлен
    if (!i18n.hasResourceBundle(lang, namespace)) {
      i18n.addResourceBundle(lang, namespace, data);
    }
  }
});

export default i18n;
