import { ObjectValues } from './ObjectValues';

export const languages = {
  Javascript: 'javascript',
  Css: 'css',
  Html: 'html',
  Typescript: 'typescript',
  Python: 'python',
  Java: 'java',
  All: 'all',
  Ruby: 'ruby',
  Go: 'go',
  C: 'c',
  CPP: 'c++',
  PHP: 'php',
  Kotlin: 'kotlin',
  Rust: 'rust',
} as const;

export type Language = ObjectValues<typeof languages>;

export const sortedLanguages = Object.values(languages).sort((a, b) => {
  return a.localeCompare(b);
});
