import { ObjectValues } from './ObjectValues';

export const languages = {
  Javascript: 'javascript',
  Css: 'css',
  Html: 'html',
  Typescript: 'typescript',
  Python: 'python',
  Java: 'java',
  All: 'all',
} as const;

export type Language = ObjectValues<typeof languages>;

export const sortedLanguages = Object.values(languages).sort((a, b) => {
  return a.localeCompare(b);
});
