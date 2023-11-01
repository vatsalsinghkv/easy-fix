import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // General colors
  colorPrimary: '#00ffd5',
  colorSecondary: '#14b8a6',

  // UI
  appBg: '#0f172a',
  appContentBg: '#0f172a',
  appBorderColor: '#334155',
  appBorderRadius: 4,

  // Text colors
  textColor: '#cbd5e1',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#cbd5e1',
  barSelectedColor: '#585C6D',
  barBg: '#0f172a',

  // Form colors
  inputBg: '#1e293b99',
  inputBorder: '#334155',
  inputTextColor: '#cbd5e1',
  inputBorderRadius: 2,

  // Button colors
  buttonBg: '#1e293b99',
  buttonBorder: '#334155',
});
