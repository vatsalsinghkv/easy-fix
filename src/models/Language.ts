import { ObjectValues } from './ObjectValues';

export const languages = {
  Javascript: 'javascript',
  Css: 'css',
  Html: 'html',
  Typescript: 'typescript',
  Python: 'python',
  Java: 'java',
  Go: 'go',
  Shell: 'shell',
  Rust: 'rust',
  Haskell: 'haskell',
  R: 'r',
  Dart: 'dart',
  Ruby: 'ruby',
  All: 'all',
} as const;

export type Language = ObjectValues<typeof languages>;

export const sortedLanguages = Object.values(languages).sort((a, b) => {
  return a.localeCompare(b);
});

/* 

export const languages = [
  'javascript',
  'css',
  'html',
  'typescript',
  'python',
  'java',
  'go',
  'shell',
  'rust',
  'haskell',
  'r',
  'dart',
  'ruby',
  'all',
] as const;

export type Language = (typeof languages)[number];

export const sortedLanguages = [...languages].sort((a, b) => {
  return a.localeCompare(b);
});


*/
